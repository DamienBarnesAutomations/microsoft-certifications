# Specifications_6.md
# RetailIQ — Project 6: Optimize for Scale
**Domain:** Monitor & Optimize an Analytics Solution  
**Estimated Effort:** 4–6 hours  
**Fabric Items Modified:** Lakehouse tables, pipelines, data warehouse, eventstreams, Spark configuration, KQL queries

---

## 1. Overview

RetailIQ has been running for two years and the platform is showing its age — query times are creeping up, nightly pipelines are taking longer to complete, and the eventhouse is under increasing load. This project systematically identifies and resolves performance bottlenecks across every layer of the platform. For each optimization, you will measure before and after so results are quantifiable.

This is the final project and ties together every component built in Projects 1–5.

---

## 2. Prerequisites

- Projects 1–5 completed
- At least some data in the silver and gold layers (from Project 3)
- At least some streaming data in SensorDB (from Project 4)
- Monitoring notebook from Project 5 is working

---

## 3. Repository Structure for This Project

```
retailiq-fabric/
└── optimization/
    └── notebooks/
        ├── nb_optimize_lakehouse.py
        ├── nb_optimize_spark.py
        ├── nb_benchmark.py
        └── optimization_results.md
```

---

## 4. Benchmarking Before Optimization

Before making any changes, establish a baseline. Run this benchmark notebook and record all results in `optimization/notebooks/optimization_results.md`.

`optimization/notebooks/nb_benchmark.py`:

```python
# ============================================================
# RetailIQ — Benchmark Notebook
# Run BEFORE and AFTER each optimization to measure improvement
# Record results in optimization_results.md
# ============================================================

# Cell 1 — Setup
from pyspark.sql import SparkSession
from pyspark.sql import functions as F
import time

spark = SparkSession.builder.getOrCreate()
LAKEHOUSE_PATH = "abfss://retailiq_lakehouse@onelake.dfs.fabric.microsoft.com"
results = {}

def timed_query(name, fn):
    """Run fn(), measure elapsed time, print and store result"""
    start = time.time()
    result = fn()
    elapsed = round(time.time() - start, 2)
    results[name] = {"elapsed_seconds": elapsed}
    if hasattr(result, 'count'):
        results[name]["row_count"] = result.count()
    print(f"[{name}]: {elapsed}s")
    return result

# Cell 2 — Benchmark 1: Full scan of silver_sales
def query_silver_full_scan():
    return spark.read.format("delta") \
        .load(f"{LAKEHOUSE_PATH}/Files/silver/sales") \
        .agg(F.sum("total_revenue"), F.count("*"))

timed_query("silver_full_scan", query_silver_full_scan)

# Cell 3 — Benchmark 2: Regional filter on silver_sales (partition pruning test)
def query_silver_regional():
    return spark.read.format("delta") \
        .load(f"{LAKEHOUSE_PATH}/Files/silver/sales") \
        .filter(F.col("region") == "North") \
        .agg(F.sum("total_revenue"))

timed_query("silver_regional_filter", query_silver_regional)

# Cell 4 — Benchmark 3: fact_sales join to dim_store
def query_fact_join():
    df_fact = spark.read.format("delta").load(f"{LAKEHOUSE_PATH}/Files/gold/fact_sales")
    df_store = spark.read.format("delta").load(f"{LAKEHOUSE_PATH}/Files/gold/dim_store")
    return df_fact.join(df_store, on="store_key").groupBy("region") \
        .agg(F.sum("total_revenue").alias("revenue"))

timed_query("fact_store_join", query_fact_join)

# Cell 5 — Benchmark 4: Count of small files in silver
def count_files():
    files = mssparkutils.fs.ls(f"{LAKEHOUSE_PATH}/Files/silver/sales")
    total = len(files)
    print(f"Total files in silver/sales: {total}")
    results["silver_file_count"] = {"count": total}
    return None

count_files()

# Cell 6 — Print full benchmark summary
print("\n===== Benchmark Results =====")
for test, metrics in results.items():
    print(f"  {test}: {metrics}")
print("Record these in optimization_results.md BEFORE making any changes.")
print("==============================")
```

**After running:** Copy the output to `optimization_results.md` under the heading `## Baseline (Before Optimization)`.

---

## 5. Optimize the Lakehouse

### 5.1 Understand the Small Files Problem

When the nightly pipeline runs `nb_transform_bronze_to_silver_sales` in incremental mode, each daily run appends a new set of small Parquet/Delta files. After 365 runs, the `silver/sales` directory has hundreds of small files. Delta Lake must open and scan each file individually, making reads slow.

**Diagnose:**
```python
# Run this to see current file sizes
files = mssparkutils.fs.ls("abfss://retailiq_lakehouse@onelake.dfs.fabric.microsoft.com/Files/silver/sales")
sizes = [f.size for f in files if f.size > 0]
print(f"File count: {len(sizes)}")
print(f"Average file size: {sum(sizes)/len(sizes)/1024/1024:.2f} MB")
print(f"Files < 128MB: {sum(1 for s in sizes if s < 128*1024*1024)}")
```

Target: files should be 128MB–1GB each. If most are under 128MB, compaction is needed.

### 5.2 OPTIMIZE and Z-ORDER

`optimization/notebooks/nb_optimize_lakehouse.py`:

```python
# ============================================================
# RetailIQ — Lakehouse Optimization
# ============================================================

# Cell 1 — Setup
from pyspark.sql import SparkSession
import time

spark = SparkSession.builder.getOrCreate()

# Cell 2 — OPTIMIZE silver_sales (compacts small files)
# This rewrites small files into larger ones within each partition
print("Running OPTIMIZE on silver_sales...")
start = time.time()
spark.sql("OPTIMIZE retailiq_lakehouse.silver_sales")
print(f"OPTIMIZE complete in {round(time.time()-start, 2)}s")

# Cell 3 — OPTIMIZE with Z-ORDER on commonly filtered columns
# Z-ORDER co-locates related data within each file, improving skip rates
# Use for columns that appear in WHERE clauses but are NOT partition columns
print("Running OPTIMIZE with ZORDER on fact_sales...")
start = time.time()
spark.sql("""
    OPTIMIZE retailiq_lakehouse.gold_fact_sales
    ZORDER BY (store_key, product_key, date_key)
""")
print(f"OPTIMIZE ZORDER complete in {round(time.time()-start, 2)}s")

# Cell 4 — VACUUM to remove old file versions (saves storage)
# Default: removes files older than 7 days (168 hours)
# WARNING: Do not reduce the retention period below 7 days if time travel is needed
print("Running VACUUM on silver_sales...")
spark.sql("VACUUM retailiq_lakehouse.silver_sales RETAIN 168 HOURS")
print("VACUUM complete.")

# Cell 5 — Enable V-Order on new writes
# V-Order is a Microsoft extension to Parquet that improves read performance
# It is enabled by default in Fabric but verify:
spark.conf.set("spark.sql.parquet.vorder.enabled", "true")
spark.conf.set("spark.microsoft.delta.optimizeWrite.enabled", "true")
spark.conf.set("spark.microsoft.delta.optimizeWrite.binSize", "1073741824")  # 1GB target
print("V-Order and Optimized Write enabled")

# Cell 6 — Analyze table statistics (helps query optimizer)
spark.sql("ANALYZE TABLE retailiq_lakehouse.silver_sales COMPUTE STATISTICS FOR ALL COLUMNS")
spark.sql("ANALYZE TABLE retailiq_lakehouse.gold_fact_sales COMPUTE STATISTICS FOR ALL COLUMNS")
print("Statistics computed for silver_sales and gold_fact_sales")

# Cell 7 — Verify improvement: check file count after OPTIMIZE
files_after = mssparkutils.fs.ls(
    "abfss://retailiq_lakehouse@onelake.dfs.fabric.microsoft.com/Files/silver/sales"
)
sizes_after = [f.size for f in files_after if f.size > 0]
print(f"\nAfter OPTIMIZE:")
print(f"  File count: {len(sizes_after)}")
if sizes_after:
    print(f"  Average size: {sum(sizes_after)/len(sizes_after)/1024/1024:.2f} MB")
```

### 5.3 Partition Strategy Review

**Assess the current partitioning:**
- `silver_sales` is partitioned by `(region, transaction_date)` — is this optimal?
- `region` has 4 values × `transaction_date` has ~1095 values = ~4,380 partitions over 3 years
- Each partition directory contains one or more small files per incremental run
- This is actually a **partition explosion problem** — too many small partitions

**Recommended fix:** Change the partitioning strategy to `(region, year, month)` instead:

```python
# Cell 8 — Repartition silver_sales with better partition strategy
df_silver = spark.read.format("delta") \
    .load("abfss://retailiq_lakehouse@onelake.dfs.fabric.microsoft.com/Files/silver/sales")

df_silver_repartitioned = df_silver \
    .withColumn("year", F.year("transaction_date")) \
    .withColumn("month", F.month("transaction_date"))

df_silver_repartitioned.write \
    .format("delta") \
    .mode("overwrite") \
    .option("overwriteSchema", "true") \
    .partitionBy("region", "year", "month") \
    .save("abfss://retailiq_lakehouse@onelake.dfs.fabric.microsoft.com/Files/silver/sales_optimized")

print("Repartitioned silver_sales written to silver/sales_optimized")
print("After validating, rename this to replace the original")
```

---

## 6. Optimize Pipelines

### 6.1 Identify Slow Pipeline Stages

In the Monitor hub, review the last 5 runs of `master_pipeline`:

Look for:
- Which child pipeline consistently takes the longest?
- Is there a single activity that accounts for > 50% of total runtime?
- Are any activities running sequentially that could run in parallel?

**Common findings and fixes:**

| Finding | Fix |
|---|---|
| `pl_load_silver_sales` takes 45 min | Notebook is doing a full scan instead of partition-pruned incremental read — fix the WHERE clause to use the date parameter |
| `pl_load_dimensions` takes 20 min | Dataflow is refreshing unnecessarily on days when product data hasn't changed — add a conditional check before triggering the dataflow |
| Bronze copy and silver transform run sequentially | They are already sequential by design (silver needs bronze) — cannot parallelise without changing architecture |
| For-each over 4 regions runs serially | Set `batchCount = 4` on the ForEach to run all regions in parallel |

### 6.2 Add Pipeline-Level Optimisations

**Update `pl_load_bronze_sales`** to skip processing if no new source file exists:

```json
// Add a "Get Metadata" activity before the Copy activity:
// Activity: GetSourceFileMetadata
// Dataset: the source HTTP/ADLS path
// Field list: ["exists", "size"]
//
// Then add an If Condition:
// Condition: @equals(activity('GetSourceFileMetadata').output.exists, true)
// If True: run CopyRawSalesToBronze
// If False: skip (log "No source file for {date}, skipping")
```

**Add a timeout** to the master pipeline:
- Pipeline settings → Timeout: `04:00:00` (4 hours)
- This prevents hung pipelines from blocking the next day's run

---

## 7. Optimize the Data Warehouse

If a Fabric Data Warehouse has been added (optional extension), apply these optimisations.

### 7.1 Statistics

```sql
-- Create statistics on join columns
-- (Fabric Data Warehouse does not auto-create statistics like SQL Server)

CREATE STATISTICS stat_fact_store_key ON fact_sales (store_key);
CREATE STATISTICS stat_fact_product_key ON fact_sales (product_key);
CREATE STATISTICS stat_fact_date_key ON fact_sales (date_key);
CREATE STATISTICS stat_store_key ON dim_store (store_key);
CREATE STATISTICS stat_product_key ON dim_product (product_key);
CREATE STATISTICS stat_date_key ON dim_date (date_key);
```

### 7.2 Query Optimisation — Result Set Caching

```sql
-- Enable result set caching for expensive queries that don't change frequently
-- In Fabric Data Warehouse, use query hints:

-- Original slow query (runs full aggregation each time):
SELECT
    d.year,
    d.month_name,
    s.region,
    p.category,
    SUM(f.total_revenue) AS total_revenue,
    SUM(f.gross_margin) AS total_margin,
    COUNT(DISTINCT f.customer_id) AS unique_customers
FROM fact_sales f
JOIN dim_date d ON f.date_key = d.date_key
JOIN dim_store s ON f.store_key = s.store_key
JOIN dim_product p ON f.product_key = p.product_key
GROUP BY d.year, d.month_name, s.region, p.category;

-- Materialise this as a pre-aggregated table:
CREATE TABLE gold_monthly_summary AS
SELECT
    d.year,
    d.month_number,
    d.month_name,
    d.quarter,
    s.region,
    s.city,
    p.category,
    p.subcategory,
    SUM(f.total_revenue)       AS total_revenue,
    SUM(f.gross_margin)        AS total_margin,
    SUM(f.quantity_sold)       AS total_units,
    COUNT(DISTINCT f.customer_id) AS unique_customers,
    COUNT(*)                   AS transaction_count
FROM fact_sales f
JOIN dim_date d    ON f.date_key    = d.date_key
JOIN dim_store s   ON f.store_key   = s.store_key
JOIN dim_product p ON f.product_key = p.product_key
GROUP BY d.year, d.month_number, d.month_name, d.quarter,
         s.region, s.city, p.category, p.subcategory;

-- Refresh this table nightly at the end of master_pipeline
```

### 7.3 Identify Slow Query Execution Plans

```sql
-- Use EXPLAIN to inspect query plan (Fabric Data Warehouse)
EXPLAIN
SELECT s.region, SUM(f.total_revenue)
FROM fact_sales f
JOIN dim_store s ON f.store_key = s.store_key
GROUP BY s.region;

-- Look for:
-- "BroadcastHashJoin" = good (dim table is small, broadcast is fast)
-- "SortMergeJoin" = potentially slow if no statistics exist
-- "Repartition" steps = indicates missing or wrong partition keys
```

---

## 8. Optimize Eventstreams and Eventhouses

### 8.1 Eventhouse Caching Policy Review

```kql
// Check current caching policy
.show table sensor_raw policy caching

// If queries frequently go beyond the 30-day hot cache window,
// increase the cache. If the eventhouse is memory-constrained,
// decrease it for less-queried tables.

// Update caching for sensor_alerts (frequently queried, keep 90 days hot):
.alter table sensor_alerts policy caching
    hot = 90d

// Update caching for sensor_raw (raw events, mostly queried within 7 days):
.alter table sensor_raw policy caching
    hot = 7d
```

### 8.2 Materialized View Refresh Health

```kql
// Check materialized view health and freshness
.show materialized-views
| project Name, IsHealthy, LastRunTime,
          AgeInMinutes = datetime_diff('minute', now(), LastRunTime),
          RowCount
| extend status = iif(AgeInMinutes > 10, "LAGGING", "OK")

// If a materialized view is lagging, check if the source table
// has excessive ingestion load. Options:
// 1. Reduce ingestion frequency (batch events, not per-event)
// 2. Increase eventhouse capacity
// 3. Simplify the materialized view query
```

### 8.3 Eventstream Throughput Optimisation

In the eventstream `es_sensor_events`, add a **Transform** step between source and destination to:

1. **Filter** out `DOOR_EVENT` events that are not needed in the hot path (reduce volume):
   - Add a Filter transform: `event_type != "DOOR_EVENT"`
   - Route `DOOR_EVENT` events to the OneLake archive destination only

2. **Project** only needed columns before writing to Eventhouse (reduce payload size):
   ```
   Keep columns: event_id, event_type, store_id, sensor_id, timestamp_utc, value, region
   Drop columns: firmware_ver, battery_pct (only needed for low-battery alert, infrequent)
   ```

3. **Aggregate** foot traffic at the eventstream level (optional — reduces write volume):
   - Add a Group By transform: group by `store_id`, window 1 minute, aggregate `avg(value)`
   - This writes 20 rows/minute instead of 20 rows/30 seconds (50% volume reduction)

---

## 9. Optimize Spark Performance

`optimization/notebooks/nb_optimize_spark.py`:

```python
# ============================================================
# RetailIQ — Spark Performance Optimisation
# ============================================================

# Cell 1 — Understand current Spark configuration
spark = SparkSession.builder.getOrCreate()
print("Current shuffle partitions:", spark.conf.get("spark.sql.shuffle.partitions"))
print("AQE enabled:", spark.conf.get("spark.sql.adaptive.enabled"))
print("Default parallelism:", spark.sparkContext.defaultParallelism)

# Cell 2 — Enable Adaptive Query Execution (AQE)
# AQE dynamically adjusts shuffle partitions, join strategies, and skew handling
spark.conf.set("spark.sql.adaptive.enabled", "true")
spark.conf.set("spark.sql.adaptive.coalescePartitions.enabled", "true")
spark.conf.set("spark.sql.adaptive.coalescePartitions.minPartitionNum", "1")
spark.conf.set("spark.sql.adaptive.skewJoin.enabled", "true")

# Cell 3 — Tune shuffle partitions
# Default is 200, which is often too high for small-medium datasets
# and too low for very large ones.
# Rule of thumb: aim for ~128MB per partition

df_silver = spark.read.format("delta") \
    .load("abfss://retailiq_lakehouse@onelake.dfs.fabric.microsoft.com/Files/silver/sales")

total_bytes = sum(
    f.size for f in mssparkutils.fs.ls(
        "abfss://retailiq_lakehouse@onelake.dfs.fabric.microsoft.com/Files/silver/sales"
    ) if f.size > 0
)
target_partition_size_bytes = 128 * 1024 * 1024  # 128MB
optimal_partitions = max(1, total_bytes // target_partition_size_bytes)

print(f"Total data size: {total_bytes/1024/1024:.0f} MB")
print(f"Recommended shuffle partitions: {optimal_partitions}")

spark.conf.set("spark.sql.shuffle.partitions", str(optimal_partitions))

# Cell 4 — Broadcast join optimisation
# When joining a large fact table to a small dimension table,
# broadcast the small table to avoid shuffle

from pyspark.sql import functions as F

df_fact = spark.read.format("delta") \
    .load("abfss://retailiq_lakehouse@onelake.dfs.fabric.microsoft.com/Files/gold/fact_sales")

df_dim_store = spark.read.format("delta") \
    .load("abfss://retailiq_lakehouse@onelake.dfs.fabric.microsoft.com/Files/gold/dim_store")

# Hint to broadcast dim_store (it's small — 20 rows)
df_optimised_join = df_fact.join(
    F.broadcast(df_dim_store),
    on="store_key",
    how="left"
)

# Explain to verify BroadcastHashJoin is used
df_optimised_join.groupBy("region").agg(F.sum("total_revenue")).explain(mode="formatted")

# Cell 5 — Cache frequently reused DataFrames
# If a DataFrame is used multiple times in the same notebook session,
# cache it to avoid recomputing from disk

df_dim_product = spark.read.format("delta") \
    .load("abfss://retailiq_lakehouse@onelake.dfs.fabric.microsoft.com/Files/gold/dim_product")

df_dim_product.cache()
df_dim_product.count()  # Trigger the cache
print("dim_product cached in memory")

# Important: unpersist when done to free memory
# df_dim_product.unpersist()

# Cell 6 — Partition pruning verification
# Verify that partition filters are being pushed down (not scanning all partitions)

df_pruned = spark.read.format("delta") \
    .load("abfss://retailiq_lakehouse@onelake.dfs.fabric.microsoft.com/Files/silver/sales") \
    .filter((F.col("region") == "North") & (F.col("year") == 2024))

# Check the physical plan — look for "PartitionFilters" in the output
df_pruned.explain(mode="formatted")
# Expected: you should see PartitionFilters: [isnotnull(region), (region = North), ...]
# If you see a full scan: the filter columns are not partition columns — restructure

# Cell 7 — Skew detection and handling
# Check if any partition has significantly more data than others
df_silver_with_partition = spark.read.format("delta") \
    .load("abfss://retailiq_lakehouse@onelake.dfs.fabric.microsoft.com/Files/silver/sales") \
    .withColumn("partition_id", F.spark_partition_id())

partition_sizes = df_silver_with_partition.groupBy("partition_id").count()
partition_sizes.orderBy(F.desc("count")).show(10)

# If one partition has 10x more rows: data is skewed
# Fix: use salting on the skewed join key, or enable AQE skew join handling (already enabled in Cell 2)
```

---

## 10. Optimize Query Performance

### 10.1 Query Optimisation in KQL

```kql
// ============================================================
// KQL Query Performance Optimisation
// ============================================================

// BEFORE (slow — full table scan):
sensor_raw
| where event_type == "FOOT_TRAFFIC"
| summarize avg_traffic = avg(value) by store_id

// AFTER (fast — use datetime filter to leverage time index):
sensor_raw
| where timestamp_utc > ago(24h)    // Always filter by time first in KQL
| where event_type == "FOOT_TRAFFIC"
| summarize avg_traffic = avg(value) by store_id

// Rule: In KQL, the datetime column is always the primary index.
// Filtering by timestamp first reduces the scan range dramatically.
// Never run an aggregation without a time filter in production.

// ----

// BEFORE (slow — string search):
sensor_raw
| where store_id contains "STR_00"

// AFTER (fast — exact match or has_any):
sensor_raw
| where store_id in ("STR_001", "STR_002", "STR_003")
// or for dynamic lists:
| where store_id has_any ("STR_001", "STR_002", "STR_003")

// ----

// BEFORE (slow — computing on every row):
sensor_raw
| extend hour_of_day = hourofday(timestamp_utc)
| where hour_of_day between (8 .. 18)

// AFTER (fast — use datetime arithmetic directly):
sensor_raw
| where timestamp_utc > ago(24h)
| where timestamp_utc % 1d between (8h .. 18h)
```

### 10.2 Delta Table Query Optimisation in SQL/PySpark

```sql
-- Check if Delta table has statistics
DESCRIBE DETAIL retailiq_lakehouse.gold_fact_sales;
-- Look for "numFiles", "sizeInBytes", and "statistics" fields

-- Check data skipping effectiveness using Delta log:
-- After running a filtered query, check the Spark UI → SQL tab
-- Look for "files pruned" vs "files read"
-- Good: 90%+ pruning on filtered columns
-- Bad: 0% pruning = no data skipping = slow

-- Force a query to use a specific partition:
SELECT * FROM fact_sales
WHERE region = 'North'   -- This should prune all non-North partitions
AND date_key BETWEEN 20240101 AND 20240131;
```

---

## 11. Run Post-Optimization Benchmark

Re-run `nb_benchmark.py` after all optimisations and record results in `optimization_results.md`:

```markdown
# optimization_results.md

## Baseline (Before Optimization)

| Test | Elapsed (s) | Row Count | Notes |
|---|---|---|---|
| silver_full_scan | ___ | ___ | |
| silver_regional_filter | ___ | ___ | |
| fact_store_join | ___ | ___ | |
| silver_file_count | ___ files | — | |

## After Optimization

| Test | Elapsed (s) | Row Count | Improvement | Change Made |
|---|---|---|---|---|
| silver_full_scan | ___ | ___ | ___% | V-Order, OPTIMIZE |
| silver_regional_filter | ___ | ___ | ___% | Re-partitioned to (region, year, month) |
| fact_store_join | ___ | ___ | ___% | Z-ORDER on store_key, broadcast join |
| silver_file_count | ___ files | — | ___% fewer files | OPTIMIZE compaction |

## Key Takeaways
- (Fill in after running benchmarks)
- Which optimization had the biggest impact?
- What surprised you?
- What would you do differently on a larger dataset?
```

---

## 12. Validation Checklist

- [ ] Baseline benchmark results recorded before any changes
- [ ] `OPTIMIZE` and `ZORDER` run on `silver_sales` and `gold_fact_sales`
- [ ] `VACUUM` run on `silver_sales`
- [ ] V-Order and Optimized Write are confirmed enabled
- [ ] Table statistics computed on all gold tables
- [ ] Partition strategy reviewed — `silver_sales` repartitioned to `(region, year, month)` if applicable
- [ ] Pipeline timeout configured, ForEach batch count set to 4
- [ ] Eventhouse caching policies updated per table access patterns
- [ ] Materialized view health verified in KQL
- [ ] Eventstream transform added to filter and project events before destination
- [ ] AQE enabled in Spark configuration
- [ ] Shuffle partition count set based on data size calculation
- [ ] Broadcast join confirmed via `.explain()` for fact/dim join
- [ ] KQL time-first filter pattern applied to all analysis queries
- [ ] Post-optimization benchmark results recorded
- [ ] `optimization_results.md` completed with before/after comparison
- [ ] All optimization notebooks committed to `optimization/notebooks/`

---

## 13. Exam Topics Covered

| Exam Objective | Covered In |
|---|---|
| Optimize a lakehouse table | Sections 5.1, 5.2, 5.3 |
| Optimize a pipeline | Section 6 |
| Optimize a data warehouse | Section 7 |
| Optimize eventstreams and eventhouses | Section 8 |
| Optimize Spark performance | Section 9 |
| Optimize query performance | Section 10 |

---

## 14. Further Reading

- [Delta Lake OPTIMIZE in Fabric](https://learn.microsoft.com/en-us/fabric/data-engineering/delta-optimization-and-v-order)
- [V-Order write optimisation](https://learn.microsoft.com/en-us/fabric/data-engineering/delta-optimization-and-v-order)
- [Adaptive Query Execution in Spark](https://learn.microsoft.com/en-us/azure/databricks/optimizations/aqe)
- [KQL best practices](https://learn.microsoft.com/en-us/azure/data-explorer/kusto/query/best-practices)
- [Eventhouse performance tuning](https://learn.microsoft.com/en-us/fabric/real-time-intelligence/eventhouse)
- [Fabric Data Warehouse performance](https://learn.microsoft.com/en-us/fabric/data-warehouse/guidelines-warehouse-performance)
