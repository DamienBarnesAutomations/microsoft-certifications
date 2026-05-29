# Specifications_5.md
# RetailIQ — Project 5: Monitor the Platform
**Domain:** Monitor & Optimize an Analytics Solution  
**Estimated Effort:** 4–6 hours  
**Fabric Items Created:** Alert rules, monitoring notebook (completed), Data Activator, diagnostic queries

---

## 1. Overview

Things go wrong in production. This project simulates a series of realistic failure scenarios across the RetailIQ platform — pipeline failures, dataflow hangs, notebook Spark errors, eventhouse ingestion drops, and shortcut misconfiguration — and walks through how to diagnose and resolve each one. You will also build a proactive monitoring notebook and configure alerting.

This project is deliberately structured as a **break/fix exercise**: each section introduces a fault, explains how to find it, and explains the fix.

---

## 2. Prerequisites

- Projects 1–4 completed
- Data is flowing (at least some batch runs have completed, some sensor data in SensorDB)
- Workspace logging is enabled (from Project 1, Step 4.12)

---

## 3. Repository Structure for This Project

```
retailiq-fabric/
└── monitoring/
    ├── notebooks/
    │   └── nb_monitoring_check.py        (completed from Project 2 stub)
    └── alerts/
        ├── alert_pipeline_failure.json
        ├── alert_ingestion_freshness.json
        └── alert_queue_threshold.kql
```

---

## 4. Monitor Data Ingestion

### 4.1 Monitor Pipeline Run History

**Action:** In the Fabric portal, go to `retailiq-dev` → **Monitor hub** (left sidebar, monitor icon).

The Monitor hub shows all activity in the workspace. Learn to navigate:

- **Pipeline runs tab**: Shows all pipeline executions, their status, duration, start/end times
- **Filter by**: Pipeline name, status (Succeeded/Failed/Running), date range
- **Click any run**: Drill into individual activity-level status and logs
- **Input/Output**: Click on a specific activity to see its input parameters and output metrics (rows copied, bytes written, etc.)

**Exercise:** Find the most recent run of `master_pipeline`. Identify:
1. How long each child pipeline took
2. Whether the parallel streaming validation branch ran independently
3. The total rows processed by `pl_load_bronze_sales`

### 4.2 Monitor Data Transformation

**Action:** In the Monitor hub, check the **Spark job definitions** and **Notebook runs** tabs.

For `nb_transform_bronze_to_silver_sales`:
- Find the run and click into it
- The Spark UI link is available — click it to see the Spark execution plan, stage details, task distribution
- Check for any skewed partitions (one task taking 10x longer than others — indicates data skew)
- Check shuffle read/write bytes — excessive shuffle indicates missing partition pruning

### 4.3 Monitor Semantic Model Refresh

If you have a Power BI semantic model connected to the gold layer (optional):
- Go to the workspace → click the semantic model → **Refresh history**
- Check refresh duration and any error messages
- For the exam: know that slow semantic model refreshes are often caused by large delta tables without proper partitioning, or DirectQuery without aggregations

### 4.4 Configure Alerts

**Alert 1: Pipeline Failure Alert**

In the Monitor hub, find `master_pipeline` → click **Set alert**:

`monitoring/alerts/alert_pipeline_failure.json`:
```json
{
  "alertName": "master_pipeline_failure",
  "description": "Fires when master_pipeline fails or is cancelled",
  "triggerCondition": {
    "pipelineName": "master_pipeline",
    "status": ["Failed", "Cancelled"]
  },
  "notificationChannels": [
    {
      "type": "Email",
      "recipients": ["dataengineer@retailiq.com"]
    }
  ],
  "cooldownPeriodMinutes": 60
}
```

**Alert 2: Ingestion Freshness Alert**

Use **Data Activator** to trigger an alert when the silver table hasn't been updated in 26 hours (the nightly job should complete by 03:00 UTC, so anything older than 26h at 04:00 UTC is a problem).

In the Fabric portal → **Data Activator** → New Reflex:
- Data source: `retailiq_lakehouse` → `silver_sales` table
- Property to monitor: `max(_ingestion_timestamp)`
- Condition: `value < now() - 26h`
- Action: Send email to `dataengineer@retailiq.com`
- Name the reflex: `reflex_ingestion_freshness`

`monitoring/alerts/alert_ingestion_freshness.json`:
```json
{
  "reflexName": "reflex_ingestion_freshness",
  "dataSource": "retailiq_lakehouse.silver_sales",
  "property": "max(_ingestion_timestamp)",
  "condition": {
    "operator": "lessThan",
    "value": "now() - 26h"
  },
  "action": {
    "type": "email",
    "to": "dataengineer@retailiq.com",
    "subject": "RetailIQ: Silver layer ingestion is stale",
    "body": "The silver_sales table has not been updated in over 26 hours."
  }
}
```

**Alert 3: KQL Queue Threshold Alert**

In the Eventhouse, create an alert on the anomaly detection query:

`monitoring/alerts/alert_queue_threshold.kql`:
```kql
// Alert definition — run this in SensorDB to create the alert
// This fires when any store has a queue > 15 people for > 5 consecutive minutes

sensor_raw
| where ingested_at > ago(6m)
| where event_type == "QUEUE_LENGTH"
| where value > 15
| summarize consecutive_readings = count() by store_id
| where consecutive_readings >= 5
| project store_id, consecutive_readings,
          alert_message = strcat("CRITICAL: Queue at ", store_id,
                                 " has exceeded 15 for 5+ consecutive readings")
```

---

## 5. Identify and Resolve Errors — Break/Fix Scenarios

### 5.1 Pipeline Error: Silent Copy Activity Failure

**The symptom:** `master_pipeline` shows as "Succeeded" but no new data appears in the bronze layer.

**How to find it:**
1. In the Monitor hub, click into the `master_pipeline` run
2. Click the `RunBronzeLoad` → `CopyRawSalesToBronze` activity
3. Click the **Output** tab
4. You will see `rowsCopied: 0` and a warning: `"No files matched the source path pattern"`

**Root cause:** The source path in the Copy Activity used a hardcoded date (`2024-01-15`) instead of the dynamic expression `@formatDateTime(utcnow(), 'yyyy-MM-dd')`.

**Fix:**
1. Open `pl_load_bronze_sales` in edit mode
2. Click `CopyRawSalesToBronze` → Source settings
3. Change the file path from the hardcoded date to:
   ```
   @concat('sales_', formatDateTime(utcnow(), 'yyyy-MM-dd'), '.csv')
   ```
4. Save and re-run the pipeline
5. Verify `rowsCopied > 0` in the output

**Exam takeaway:** Always check activity-level output, not just pipeline-level status. A pipeline can succeed even when individual activities copy zero rows.

---

### 5.2 Dataflow Error: Refresh Timeout

**The symptom:** `df_dim_product` fails with error `"Mashup Engine timed out after 600 seconds"`.

**How to find it:**
1. In the Monitor hub → **Dataflow runs** tab
2. Click the failed run → **Error details**
3. Error: `DataSource.Error: The operation was cancelled after 600 seconds`

**Root cause:** The CSV source file has grown too large for the default Dataflow timeout. Alternatively, the source connection is misconfigured and hanging.

**Fix options (choose one based on root cause):**
1. **If the file is too large:** Switch the dataflow to use chunked reads via pagination, or migrate the transformation to a PySpark notebook which handles large files natively.
2. **If it's a connection hang:** In Power Query, check the data source credentials — go to the dataflow settings → Data source credentials → verify the connection string and key are valid.
3. **If it's a gateway issue:** In dataflow settings → Gateway connection → ensure no gateway is configured (for cloud sources, gateway should be set to None).

**Exam takeaway:** Dataflow timeouts are a common failure mode. The exam tests whether you know to check the data source credentials, gateway config, and query fold (pushed-down queries execute faster than local ones).

---

### 5.3 Notebook Error: PySpark AnalysisException

**The symptom:** `nb_transform_bronze_to_silver_sales` fails with:
```
AnalysisException: Cannot resolve column name 'transaction_date' among
(transaction_id, sale_date, store_id, ...)
```

**How to find it:**
1. Monitor hub → **Notebook runs** tab → find the failed run
2. The error is visible in the run output, including the cell number and full stack trace
3. The Spark UI link shows the failed job and the last attempted stage

**Root cause:** The source CSV column was renamed from `transaction_date` to `sale_date` in a schema update, but the notebook still references the old column name.

**Fix:**
```python
# Before (broken):
F.to_date(F.col("transaction_date"), "yyyy-MM-dd").alias("transaction_date")

# After (fixed):
F.to_date(F.col("sale_date"), "yyyy-MM-dd").alias("transaction_date")

# Better practice — add schema validation at the top of the notebook:
expected_columns = {
    "transaction_id", "sale_date", "store_id", "product_id",
    "quantity_sold", "unit_price", "unit_cost", "discount_pct",
    "customer_id", "payment_method", "region"
}
actual_columns = set(df_bronze.columns)
missing = expected_columns - actual_columns
if missing:
    raise ValueError(f"Source schema mismatch. Missing columns: {missing}")
```

**Exam takeaway:** Always validate schema at ingestion. Use explicit selects with known column names rather than `select *`. Know how to navigate to a failed Spark stage in the Spark UI.

---

### 5.4 Eventhouse Error: Ingestion Failures

**The symptom:** `sensor_raw` table row count stops increasing despite the eventstream showing events passing through.

**How to find it:**
Run this KQL query in SensorDB:

```kql
// Check ingestion failures in the last hour
.show ingestion failures
| where FailedOn > ago(1h)
| project FailedOn, Table, IngestionSourcePath, Details, ErrorCode
| order by FailedOn desc
```

**Common error codes and fixes:**

| Error Code | Meaning | Fix |
|---|---|---|
| `BadRequest_InvalidBlob` | JSON is malformed | Validate event payload schema; add error handling in the eventstream transform |
| `Schema_DataTypeMismatch` | A field's type doesn't match the table schema | Fix the ingestion mapping or update the table schema |
| `General_LimitsExceeded` | Ingestion rate limit hit | Reduce event frequency or upgrade Eventhouse capacity |
| `BadRequest_EmptyBlob` | Empty event received | Add a filter in the eventstream to drop empty events |

**Fix for Schema_DataTypeMismatch** (most common for this project):

If the `value` field sometimes arrives as a string `"42"` instead of a number `42`:

```kql
// Update the table to accept both types via update policy
.alter table sensor_raw policy update
@'[{"Source": "sensor_raw_staging", "Query": "sensor_raw_staging | extend value = todouble(value)", "IsEnabled": true}]'
```

**Exam takeaway:** Know the `.show ingestion failures` command. Understand that eventhouse ingestion errors are silent — rows are simply not written, with no pipeline-level error raised.

---

### 5.5 Eventstream Error: Source Disconnection

**The symptom:** The eventstream shows 0 events/second for the past 30 minutes.

**How to find it:**
1. In the Fabric portal, open `es_sensor_events`
2. The eventstream canvas shows a red indicator on the source node
3. Click the source node → **Details** panel → Error: `"Connection to Event Hub lost. Last successful connection: 30 minutes ago"`

**Fix:**
1. Click the source node → **Edit**
2. Verify the Event Hub connection string (SAS key may have expired — Event Hub SAS keys have configurable expiry)
3. Regenerate the SAS key in the Azure portal → Event Hub → Shared Access Policies
4. Update the connection string in the eventstream source
5. Click **Save and restart**

**Exam takeaway:** Eventstream sources can lose connectivity silently. Always configure ingestion freshness alerts (as in Step 4.4) to catch this.

---

### 5.6 T-SQL Error: Warehouse Query Failure

If a Fabric Data Warehouse is used alongside the lakehouse (optional extension), a common exam scenario is:

**The symptom:**
```sql
-- This query fails:
SELECT s.region, SUM(f.total_revenue) AS revenue
FROM fact_sales f
JOIN dim_store s ON f.store_key = s.store_key
GROUP BY s.region
```
Error: `Msg 8120: Column 'dim_store.store_key' is invalid in the select list because it is not contained in either an aggregate function or the GROUP BY clause`

**Fix:** The `store_key` referenced in the JOIN must either be in GROUP BY or wrapped in an aggregate. The correct query is:
```sql
SELECT s.region, SUM(f.total_revenue) AS revenue
FROM fact_sales f
JOIN dim_store s ON f.store_key = s.store_key
GROUP BY s.region  -- region is the grouping column, not store_key
```

---

### 5.7 Shortcut Error: Access Denied

**The symptom:** Querying the `external_sales_archive` shortcut (created in Project 3) returns:
`Error: Access to the shortcut target is denied. Check the credential configuration.`

**How to find it:**
1. In the lakehouse, right-click the shortcut → **Properties**
2. The credential type shows `Anonymous` — the ADLS source requires authentication

**Fix:**
1. Delete the shortcut
2. Recreate it: in the shortcut wizard, select **Authentication kind: Account key** or **Service principal**
3. Enter the ADLS storage account key from Azure Portal → Storage Account → Access keys
4. Save and re-test by querying the shortcut

---

## 6. Complete the Monitoring Notebook

This completes the `nb_monitoring_check` stub from Project 2.

`monitoring/notebooks/nb_monitoring_check.py`:

```python
# ============================================================
# RetailIQ — Platform Monitoring Check
# Run daily after master_pipeline completes
# Checks ingestion freshness, table sizes, error counts
# ============================================================

# Cell 1 — Imports
from pyspark.sql import SparkSession
from pyspark.sql import functions as F
from datetime import datetime, date, timedelta
import json

spark = SparkSession.builder.getOrCreate()
LAKEHOUSE_PATH = "abfss://retailiq_lakehouse@onelake.dfs.fabric.microsoft.com"
report = {}

# Cell 2 — Check silver_sales ingestion freshness
df_silver = spark.read.format("delta") \
    .load(f"{LAKEHOUSE_PATH}/Files/silver/sales")

latest_ingestion = df_silver.agg(
    F.max("_ingestion_timestamp").alias("latest_ts"),
    F.count("*").alias("total_records")
).collect()[0]

freshness_hours = (datetime.utcnow() - latest_ingestion["latest_ts"].replace(tzinfo=None)).total_seconds() / 3600
is_fresh = freshness_hours < 26

report["silver_sales"] = {
    "latest_ingestion": str(latest_ingestion["latest_ts"]),
    "freshness_hours": round(freshness_hours, 2),
    "total_records": latest_ingestion["total_records"],
    "status": "OK" if is_fresh else "STALE"
}

print(f"Silver sales freshness: {round(freshness_hours, 2)}h | Status: {report['silver_sales']['status']}")

# Cell 3 — Check gold fact_sales
df_fact = spark.read.format("delta") \
    .load(f"{LAKEHOUSE_PATH}/Files/gold/fact_sales")

fact_count = df_fact.count()
report["fact_sales"] = {
    "total_records": fact_count,
    "status": "OK" if fact_count > 0 else "EMPTY"
}
print(f"fact_sales record count: {fact_count:,} | Status: {report['fact_sales']['status']}")

# Cell 4 — Check Delta table history for recent operations
df_history = spark.sql("DESCRIBE HISTORY retailiq_lakehouse.silver_sales LIMIT 5")
df_history.show(truncate=False)

# Cell 5 — Check for quarantined late-arriving records
try:
    df_quarantine = spark.read.parquet(f"{LAKEHOUSE_PATH}/Files/bronze/sales_quarantine/")
    quarantine_count = df_quarantine.count()
    report["quarantine"] = {
        "records": quarantine_count,
        "status": "WARNING" if quarantine_count > 1000 else "OK"
    }
    print(f"Quarantined records: {quarantine_count:,}")
except Exception:
    report["quarantine"] = {"records": 0, "status": "OK"}
    print("No quarantine records found")

# Cell 6 — Overall health summary
all_statuses = [v.get("status", "UNKNOWN") for v in report.values()]
overall = "HEALTHY" if all(s == "OK" for s in all_statuses) else "DEGRADED"

print("\n===== RetailIQ Platform Health Report =====")
print(f"Run time: {datetime.utcnow()} UTC")
print(f"Overall status: {overall}")
for item, details in report.items():
    print(f"  {item}: {details}")
print("===========================================")

# Cell 7 — Exit with status for pipeline to consume
mssparkutils.notebook.exit(json.dumps({"overall_status": overall, "report": report}))
```

---

## 7. Validation Checklist

- [ ] Monitor hub explored — can navigate to pipeline runs, activity details, and Spark UI
- [ ] Alert `master_pipeline_failure` configured and tested (manually cancel a run to trigger it)
- [ ] Data Activator reflex `reflex_ingestion_freshness` configured
- [ ] KQL queue alert query runs successfully in `qs_sensor_analysis`
- [ ] All 7 break/fix scenarios have been worked through and documented
- [ ] `.show ingestion failures` query has been run and results interpreted
- [ ] `nb_monitoring_check` runs end-to-end and outputs a valid health report JSON
- [ ] Monitoring notebook is wired into `master_pipeline` as the final activity (verify in Project 2 pipeline)
- [ ] All monitoring artefacts committed to `monitoring/` in the repo

---

## 8. Exam Topics Covered

| Exam Objective | Covered In |
|---|---|
| Monitor data ingestion | Sections 4.1, 4.2 |
| Monitor data transformation | Section 4.2 |
| Monitor semantic model refresh | Section 4.3 |
| Configure alerts | Section 4.4 |
| Identify and resolve pipeline errors | Section 5.1 |
| Identify and resolve dataflow errors | Section 5.2 |
| Identify and resolve notebook errors | Section 5.3 |
| Identify and resolve eventhouse errors | Section 5.4 |
| Identify and resolve eventstream errors | Section 5.5 |
| Identify and resolve T-SQL errors | Section 5.6 |
| Identify and resolve shortcut errors | Section 5.7 |

---

## 9. Further Reading

- [Monitor pipeline runs in Fabric](https://learn.microsoft.com/en-us/fabric/data-factory/monitor-pipeline-runs)
- [Eventhouse ingestion failure diagnostics](https://learn.microsoft.com/en-us/azure/data-explorer/kusto/management/ingestionfailures)
- [Data Activator overview](https://learn.microsoft.com/en-us/fabric/data-activator/data-activator-introduction)
- [Fabric Monitor hub](https://learn.microsoft.com/en-us/fabric/admin/monitoring-hub)
