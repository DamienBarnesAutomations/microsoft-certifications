# Specifications_3.md
# RetailIQ — Project 3: Load Historical Sales Data
**Domain:** Ingest & Transform Data  
**Estimated Effort:** 5–8 hours  
**Fabric Items Created:** Bronze Delta tables, Silver Delta tables, Gold dimensional model, Shortcuts, Dataflow Gen2 (completed), PySpark notebooks (completed)

---

## 1. Overview

This project implements the full batch ingestion and transformation pipeline for RetailIQ's three years of historical sales data. You will generate synthetic source data, land it in the bronze layer, transform it through silver using PySpark, load the dimensional model into gold using both PySpark and SQL, and configure an incremental load pattern so that only new records are processed on subsequent runs.

This project completes the notebook and dataflow stubs created in Project 2.

---

## 2. Prerequisites

- Projects 1 and 2 completed
- `retailiq_lakehouse` exists with the bronze/silver/gold folder structure
- Stub notebooks and pipelines from Project 2 are in place
- Git integration active on `dev` branch

---

## 3. Repository Structure for This Project

```
retailiq-fabric/
└── ingestion/
    └── batch/
        ├── notebooks/
        │   ├── nb_generate_synthetic_data.py
        │   ├── nb_transform_bronze_to_silver_sales.py
        │   ├── nb_load_gold_dimensions.py
        │   └── nb_load_gold_fact_sales.py
        └── dataflows/
            └── df_dim_product.json   (updated from Project 2 stub)
```

---

## 4. Source Data Specification

### 4.1 Synthetic Data Schema

Since RetailIQ is a fictitious company, you will generate synthetic data. The following schema must be used exactly — all downstream transforms and the dimensional model depend on it.

#### Raw Sales File Schema (`bronze/sales/`)
File format: **CSV with header**, one file per day, named `sales_YYYY-MM-DD.csv`

| Column | Type | Description | Example |
|---|---|---|---|
| `transaction_id` | string | UUID | `a1b2c3d4-...` |
| `transaction_date` | string | `YYYY-MM-DD` | `2022-01-15` |
| `store_id` | string | `STR_001` to `STR_020` | `STR_007` |
| `product_id` | string | `PRD_001` to `PRD_200` | `PRD_042` |
| `quantity_sold` | integer | 1–50 | `3` |
| `unit_price` | float | 1.00–500.00 | `29.99` |
| `unit_cost` | float | unit_price * 0.4–0.7 | `14.50` |
| `discount_pct` | float | 0.0–0.3 | `0.10` |
| `customer_id` | string | nullable, `CUST_00001`+ | `CUST_00234` |
| `payment_method` | string | `CASH`, `CARD`, `ONLINE` | `CARD` |
| `region` | string | `North`,`South`,`East`,`West` | `North` |

**Intentional data quality issues to inject** (for Project 3 cleaning):
- 2% of rows: duplicate `transaction_id` (exact duplicates)
- 1% of rows: `quantity_sold` = NULL
- 0.5% of rows: `unit_price` = 0 or negative
- 3% of rows: `transaction_date` = a future date (late-arriving simulation — use dates 1–5 days ahead of the file date)
- 1% of rows: `store_id` not in the valid store list (orphan records)

#### Raw Products File Schema (`bronze/products/`)
File format: **CSV with header**, one file named `products.csv`

| Column | Type | Description |
|---|---|---|
| `product_id` | string | `PRD_001` to `PRD_200` |
| `product_name` | string | Descriptive name |
| `category` | string | `Electronics`, `Clothing`, `Food`, `Home`, `Sports` |
| `subcategory` | string | Category-specific |
| `unit_price` | float | Retail price |
| `unit_cost` | float | Cost price |
| `supplier_id` | string | `SUP_01` to `SUP_20` |
| `is_active` | boolean | true/false |
| `created_date` | string | `YYYY-MM-DD` |

#### Raw Stores File Schema (`bronze/stores/`)
File format: **CSV with header**, one file named `stores.csv`

| Column | Type | Description |
|---|---|---|
| `store_id` | string | `STR_001` to `STR_020` |
| `store_name` | string | e.g. `RetailIQ North Sydney` |
| `region` | string | `North`, `South`, `East`, `West` |
| `city` | string | City name |
| `state` | string | State abbreviation |
| `open_date` | string | `YYYY-MM-DD` |
| `store_size_sqft` | integer | 5000–50000 |
| `manager_email` | string | `manager.region@retailiq.com` |

---

### 4.2 Synthetic Data Generation Notebook

Create a notebook named `nb_generate_synthetic_data` in `retailiq-dev`. This only needs to be run once to populate the bronze layer.

`ingestion/batch/notebooks/nb_generate_synthetic_data.py`:

```python
# ============================================================
# RetailIQ — Synthetic Data Generator
# Run once to populate bronze layer with 3 years of sales data
# ============================================================

# Cell 1 — Imports
import random
import uuid
from datetime import date, timedelta
from pyspark.sql import SparkSession
from pyspark.sql.types import *
import pyspark.sql.functions as F

spark = SparkSession.builder.getOrCreate()

# Cell 2 — Configuration
LAKEHOUSE_PATH = "abfss://retailiq_lakehouse@onelake.dfs.fabric.microsoft.com"
BRONZE_PATH = f"{LAKEHOUSE_PATH}/Files/bronze"
START_DATE = date(2022, 1, 1)
END_DATE = date(2024, 12, 31)
NUM_PRODUCTS = 200
NUM_STORES = 20
ROWS_PER_DAY = 500   # Approx rows per day — adjust down for faster generation

REGIONS = ["North", "South", "East", "West"]
CATEGORIES = {
    "Electronics": ["Phones", "Laptops", "Tablets", "Accessories"],
    "Clothing": ["Mens", "Womens", "Kids", "Footwear"],
    "Food": ["Snacks", "Beverages", "Produce", "Dairy"],
    "Home": ["Furniture", "Decor", "Kitchen", "Bedding"],
    "Sports": ["Outdoor", "Gym", "Team Sports", "Cycling"]
}
PAYMENT_METHODS = ["CASH", "CARD", "ONLINE"]

# Cell 3 — Generate stores
stores = []
region_assignment = {i: REGIONS[(i-1) % 4] for i in range(1, NUM_STORES + 1)}
cities = {
    "North": ["Manchester", "Leeds", "Newcastle", "Sheffield"],
    "South": ["London", "Brighton", "Southampton", "Oxford"],
    "East": ["Norwich", "Cambridge", "Ipswich", "Peterborough"],
    "West": ["Bristol", "Cardiff", "Exeter", "Plymouth"]
}
for i in range(1, NUM_STORES + 1):
    region = region_assignment[i]
    city = random.choice(cities[region])
    stores.append({
        "store_id": f"STR_{i:03d}",
        "store_name": f"RetailIQ {city} {i}",
        "region": region,
        "city": city,
        "state": region[:2].upper(),
        "open_date": str(START_DATE - timedelta(days=random.randint(100, 1000))),
        "store_size_sqft": random.randint(5000, 50000),
        "manager_email": f"manager.{region.lower()}@retailiq.com"
    })

stores_schema = StructType([
    StructField("store_id", StringType()),
    StructField("store_name", StringType()),
    StructField("region", StringType()),
    StructField("city", StringType()),
    StructField("state", StringType()),
    StructField("open_date", StringType()),
    StructField("store_size_sqft", IntegerType()),
    StructField("manager_email", StringType())
])

df_stores = spark.createDataFrame(stores, schema=stores_schema)
df_stores.coalesce(1).write.mode("overwrite").option("header", True).csv(f"{BRONZE_PATH}/stores/")
print(f"Written {df_stores.count()} stores")

# Cell 4 — Generate products
products = []
category_list = list(CATEGORIES.keys())
for i in range(1, NUM_PRODUCTS + 1):
    category = random.choice(category_list)
    subcategory = random.choice(CATEGORIES[category])
    unit_price = round(random.uniform(1.0, 500.0), 2)
    unit_cost = round(unit_price * random.uniform(0.4, 0.7), 2)
    products.append({
        "product_id": f"PRD_{i:03d}",
        "product_name": f"{subcategory} Product {i}",
        "category": category,
        "subcategory": subcategory,
        "unit_price": unit_price,
        "unit_cost": unit_cost,
        "supplier_id": f"SUP_{random.randint(1,20):02d}",
        "is_active": random.random() > 0.05,
        "created_date": str(START_DATE - timedelta(days=random.randint(0, 500)))
    })

products_schema = StructType([
    StructField("product_id", StringType()),
    StructField("product_name", StringType()),
    StructField("category", StringType()),
    StructField("subcategory", StringType()),
    StructField("unit_price", FloatType()),
    StructField("unit_cost", FloatType()),
    StructField("supplier_id", StringType()),
    StructField("is_active", BooleanType()),
    StructField("created_date", StringType())
])

df_products = spark.createDataFrame(products, schema=products_schema)
df_products.coalesce(1).write.mode("overwrite").option("header", True).csv(f"{BRONZE_PATH}/products/")
print(f"Written {df_products.count()} products")

# Cell 5 — Generate sales (one file per day)
valid_store_ids = [f"STR_{i:03d}" for i in range(1, NUM_STORES + 1)]
valid_product_ids = [f"PRD_{i:03d}" for i in range(1, NUM_PRODUCTS + 1)]

current_date = START_DATE
total_rows = 0

while current_date <= END_DATE:
    rows = []
    num_rows = int(random.gauss(ROWS_PER_DAY, ROWS_PER_DAY * 0.1))

    for _ in range(num_rows):
        transaction_id = str(uuid.uuid4())
        transaction_date = str(current_date)
        store_id = random.choice(valid_store_ids)
        product_id = random.choice(valid_product_ids)
        quantity_sold = random.randint(1, 50)
        unit_price = round(random.uniform(1.0, 500.0), 2)
        unit_cost = round(unit_price * random.uniform(0.4, 0.7), 2)
        discount_pct = round(random.choice([0.0, 0.0, 0.0, 0.05, 0.10, 0.15, 0.20, 0.30]), 2)
        customer_id = f"CUST_{random.randint(1,10000):05d}" if random.random() > 0.2 else None
        payment_method = random.choice(PAYMENT_METHODS)
        region = store_id_to_region = stores[int(store_id.split("_")[1]) - 1]["region"]

        rows.append((transaction_id, transaction_date, store_id, product_id,
                     quantity_sold, unit_price, unit_cost, discount_pct,
                     customer_id, payment_method, region))

    # Inject data quality issues
    # 2% duplicates
    num_dupes = max(1, int(len(rows) * 0.02))
    for row in random.sample(rows, num_dupes):
        rows.append(row)

    # 1% null quantity
    for i in random.sample(range(len(rows)), max(1, int(len(rows) * 0.01))):
        row = list(rows[i])
        row[4] = None
        rows[i] = tuple(row)

    # 0.5% zero/negative price
    for i in random.sample(range(len(rows)), max(1, int(len(rows) * 0.005))):
        row = list(rows[i])
        row[5] = random.choice([0.0, -1.0])
        rows[i] = tuple(row)

    # 3% late-arriving (future date)
    for i in random.sample(range(len(rows)), max(1, int(len(rows) * 0.03))):
        row = list(rows[i])
        future_offset = random.randint(1, 5)
        row[1] = str(current_date + timedelta(days=future_offset))
        rows[i] = tuple(row)

    # 1% orphan store IDs
    for i in random.sample(range(len(rows)), max(1, int(len(rows) * 0.01))):
        row = list(rows[i])
        row[2] = "STR_999"
        rows[i] = tuple(row)

    sales_schema = StructType([
        StructField("transaction_id", StringType()),
        StructField("transaction_date", StringType()),
        StructField("store_id", StringType()),
        StructField("product_id", StringType()),
        StructField("quantity_sold", IntegerType()),
        StructField("unit_price", FloatType()),
        StructField("unit_cost", FloatType()),
        StructField("discount_pct", FloatType()),
        StructField("customer_id", StringType()),
        StructField("payment_method", StringType()),
        StructField("region", StringType())
    ])

    df_day = spark.createDataFrame(rows, schema=sales_schema)
    output_path = f"{BRONZE_PATH}/sales/sales_{current_date}.csv"
    df_day.coalesce(1).write.mode("overwrite").option("header", True).csv(output_path)

    total_rows += len(rows)
    current_date += timedelta(days=1)

print(f"Total rows generated across all days: {total_rows:,}")
print(f"Date range: {START_DATE} to {END_DATE}")
print("Bronze layer populated.")
```

---

## 5. Bronze to Silver Transformation Notebook

This completes the stub created in Project 2.

`ingestion/batch/notebooks/nb_transform_bronze_to_silver_sales.py`:

```python
# ============================================================
# RetailIQ — Bronze to Silver Sales Transform
# Handles: dedup, null imputation, late-arrival, orphan removal
# ============================================================

# Cell 1 — Parameters (tag as parameters cell)
region = "ALL"
execution_date = ""
incremental = True

# Cell 2 — Imports
from pyspark.sql import SparkSession
from pyspark.sql import functions as F
from pyspark.sql.window import Window
from datetime import datetime, date, timedelta

spark = SparkSession.builder.getOrCreate()

LAKEHOUSE_PATH = "abfss://retailiq_lakehouse@onelake.dfs.fabric.microsoft.com"
BRONZE_PATH = f"{LAKEHOUSE_PATH}/Files/bronze/sales"
SILVER_PATH = f"{LAKEHOUSE_PATH}/Files/silver/sales"
MAX_FUTURE_DAYS = 3  # Late-arriving records beyond 3 days are excluded

exec_date = execution_date if execution_date else str(date.today())
print(f"Execution date: {exec_date} | Region: {region} | Incremental: {incremental}")

# Cell 3 — Read bronze data
if incremental:
    # Read only today's file in incremental mode
    read_path = f"{BRONZE_PATH}/sales_{exec_date}.csv"
    print(f"Incremental read from: {read_path}")
else:
    # Full load reads all files
    read_path = BRONZE_PATH
    print(f"Full load read from: {read_path}")

df_bronze = spark.read \
    .option("header", True) \
    .option("inferSchema", True) \
    .csv(read_path)

print(f"Bronze records read: {df_bronze.count():,}")

# Cell 4 — Cast types explicitly (do not rely on inferSchema for production)
df_typed = df_bronze.select(
    F.col("transaction_id").cast("string"),
    F.to_date(F.col("transaction_date"), "yyyy-MM-dd").alias("transaction_date"),
    F.col("store_id").cast("string"),
    F.col("product_id").cast("string"),
    F.col("quantity_sold").cast("integer"),
    F.col("unit_price").cast("double"),
    F.col("unit_cost").cast("double"),
    F.col("discount_pct").cast("double"),
    F.col("customer_id").cast("string"),
    F.col("payment_method").cast("string"),
    F.col("region").cast("string")
)

# Cell 5 — Remove exact duplicates
df_deduped = df_typed.dropDuplicates(["transaction_id"])
dupes_removed = df_typed.count() - df_deduped.count()
print(f"Duplicates removed: {dupes_removed:,}")

# Cell 6 — Handle null quantity_sold (impute with median per product)
median_qty = df_deduped.filter(F.col("quantity_sold").isNotNull()) \
    .groupBy("product_id") \
    .agg(F.expr("percentile_approx(quantity_sold, 0.5)").alias("median_qty"))

df_qty_fixed = df_deduped.join(median_qty, on="product_id", how="left") \
    .withColumn(
        "quantity_sold",
        F.when(F.col("quantity_sold").isNull(), F.col("median_qty"))
         .otherwise(F.col("quantity_sold"))
    ) \
    .drop("median_qty")

nulls_imputed = df_deduped.filter(F.col("quantity_sold").isNull()).count()
print(f"Null quantity_sold imputed: {nulls_imputed:,}")

# Cell 7 — Remove invalid prices (zero or negative)
df_valid_price = df_qty_fixed.filter(F.col("unit_price") > 0)
invalid_prices = df_qty_fixed.count() - df_valid_price.count()
print(f"Invalid price records removed: {invalid_prices:,}")

# Cell 8 — Handle late-arriving records
# Records with transaction_date more than MAX_FUTURE_DAYS in the future
# relative to execution date are quarantined
exec_date_lit = F.lit(exec_date).cast("date")
max_allowed_date = F.date_add(exec_date_lit, MAX_FUTURE_DAYS)

df_on_time = df_valid_price.filter(F.col("transaction_date") <= max_allowed_date)
df_late = df_valid_price.filter(F.col("transaction_date") > max_allowed_date)

late_count = df_late.count()
print(f"Late-arriving records quarantined: {late_count:,}")

# Write late-arriving records to a quarantine folder for reprocessing
if late_count > 0:
    quarantine_path = f"{LAKEHOUSE_PATH}/Files/bronze/sales_quarantine/late_{exec_date}"
    df_late.write.mode("overwrite").parquet(quarantine_path)
    print(f"Late records written to quarantine: {quarantine_path}")

# Cell 9 — Remove orphan store IDs
# Load valid store IDs from the stores reference file
df_stores_ref = spark.read \
    .option("header", True) \
    .csv(f"{LAKEHOUSE_PATH}/Files/bronze/stores/")

valid_store_ids = [row["store_id"] for row in df_stores_ref.select("store_id").collect()]
df_no_orphans = df_on_time.filter(F.col("store_id").isin(valid_store_ids))
orphans_removed = df_on_time.count() - df_no_orphans.count()
print(f"Orphan store records removed: {orphans_removed:,}")

# Cell 10 — Add derived columns
df_enriched = df_no_orphans \
    .withColumn("total_revenue",
        F.round(F.col("quantity_sold") * F.col("unit_price") * (1 - F.col("discount_pct")), 2)) \
    .withColumn("gross_margin",
        F.round((F.col("unit_price") - F.col("unit_cost")) * F.col("quantity_sold"), 2)) \
    .withColumn("gross_margin_pct",
        F.round((F.col("unit_price") - F.col("unit_cost")) / F.col("unit_price"), 4)) \
    .withColumn("_ingestion_timestamp", F.current_timestamp()) \
    .withColumn("_source_file_date", F.lit(exec_date).cast("date"))

# Cell 11 — Filter by region if specified
if region != "ALL":
    df_final = df_enriched.filter(F.col("region") == region)
    print(f"Filtered to region: {region} ({df_final.count():,} records)")
else:
    df_final = df_enriched

# Cell 12 — Write to silver as Delta table (partitioned by region and date)
silver_table_path = f"{SILVER_PATH}"

if incremental:
    # Merge/upsert logic for incremental — use Delta MERGE
    df_final.createOrReplaceTempView("silver_updates")
    spark.sql(f"""
        CREATE TABLE IF NOT EXISTS retailiq_lakehouse.silver_sales
        USING DELTA
        PARTITIONED BY (region, transaction_date)
        LOCATION '{silver_table_path}'
        AS SELECT * FROM silver_updates WHERE 1=0
    """)
    spark.sql("""
        MERGE INTO retailiq_lakehouse.silver_sales AS target
        USING silver_updates AS source
        ON target.transaction_id = source.transaction_id
        WHEN MATCHED THEN UPDATE SET *
        WHEN NOT MATCHED THEN INSERT *
    """)
else:
    # Full overwrite for full load
    df_final.write \
        .format("delta") \
        .mode("overwrite") \
        .partitionBy("region", "transaction_date") \
        .save(silver_table_path)

print(f"Silver write complete. Records written: {df_final.count():,}")

# Cell 13 — Quality summary log
print("\n===== Data Quality Summary =====")
print(f"Input records (bronze):     {df_typed.count():,}")
print(f"Duplicates removed:         {dupes_removed:,}")
print(f"Nulls imputed:              {nulls_imputed:,}")
print(f"Invalid prices removed:     {invalid_prices:,}")
print(f"Late records quarantined:   {late_count:,}")
print(f"Orphan records removed:     {orphans_removed:,}")
print(f"Output records (silver):    {df_final.count():,}")
print("================================")

mssparkutils.notebook.exit("success")
```

---

## 6. Gold Layer — Dimension Loading

### 6.1 dim_date (Generate in PySpark)

```python
# nb_load_gold_dimensions.py — Cell 1: dim_date

from pyspark.sql import SparkSession
from pyspark.sql import functions as F
from pyspark.sql.types import *
import pandas as pd
from datetime import date

spark = SparkSession.builder.getOrCreate()
LAKEHOUSE_PATH = "abfss://retailiq_lakehouse@onelake.dfs.fabric.microsoft.com"

# Generate date spine from 2022-01-01 to 2025-12-31
date_range = pd.date_range("2022-01-01", "2025-12-31", freq="D")
dates = [{
    "date_key": int(d.strftime("%Y%m%d")),
    "full_date": d.date(),
    "day_of_week": d.dayofweek,
    "day_name": d.day_name(),
    "day_of_month": d.day,
    "day_of_year": d.dayofyear,
    "week_of_year": d.isocalendar()[1],
    "month_number": d.month,
    "month_name": d.month_name(),
    "quarter": (d.month - 1) // 3 + 1,
    "year": d.year,
    "is_weekend": d.dayofweek >= 5,
    "is_holiday": False  # Extend with real holiday logic as needed
} for d in date_range]

df_date = spark.createDataFrame(pd.DataFrame(dates))
df_date.write.format("delta").mode("overwrite") \
    .save(f"{LAKEHOUSE_PATH}/Files/gold/dim_date")
spark.sql(f"""
    CREATE TABLE IF NOT EXISTS retailiq_lakehouse.gold_dim_date
    USING DELTA LOCATION '{LAKEHOUSE_PATH}/Files/gold/dim_date'
""")
print(f"dim_date loaded: {df_date.count():,} rows")
```

### 6.2 dim_store

```python
# nb_load_gold_dimensions.py — Cell 2: dim_store

df_silver_stores = spark.read.option("header", True) \
    .csv(f"{LAKEHOUSE_PATH}/Files/bronze/stores/")

df_dim_store = df_silver_stores \
    .withColumn("store_key", F.monotonically_increasing_id()) \
    .withColumn("open_date", F.to_date("open_date", "yyyy-MM-dd")) \
    .withColumn("_loaded_at", F.current_timestamp()) \
    .select("store_key", "store_id", "store_name", "region",
            "city", "state", "open_date", "store_size_sqft")

df_dim_store.write.format("delta").mode("overwrite") \
    .save(f"{LAKEHOUSE_PATH}/Files/gold/dim_store")
print(f"dim_store loaded: {df_dim_store.count():,} rows")
```

### 6.3 fact_sales

```python
# nb_load_gold_fact_sales.py

from pyspark.sql import SparkSession
from pyspark.sql import functions as F

spark = SparkSession.builder.getOrCreate()
LAKEHOUSE_PATH = "abfss://retailiq_lakehouse@onelake.dfs.fabric.microsoft.com"

df_silver = spark.read.format("delta") \
    .load(f"{LAKEHOUSE_PATH}/Files/silver/sales")

df_dim_store = spark.read.format("delta") \
    .load(f"{LAKEHOUSE_PATH}/Files/gold/dim_store")

df_dim_product = spark.read.format("delta") \
    .load(f"{LAKEHOUSE_PATH}/Files/gold/dim_product")

df_dim_date = spark.read.format("delta") \
    .load(f"{LAKEHOUSE_PATH}/Files/gold/dim_date")

# Join to get surrogate keys
df_fact = df_silver \
    .join(df_dim_store.select("store_key", "store_id"),
          on="store_id", how="left") \
    .join(df_dim_product.select("product_key", "product_id"),
          on="product_id", how="left") \
    .join(df_dim_date.select("date_key", "full_date"),
          df_silver.transaction_date == df_dim_date.full_date,
          how="left") \
    .select(
        F.col("transaction_id").alias("sale_id"),
        F.col("date_key"),
        F.col("store_key"),
        F.col("product_key"),
        F.col("quantity_sold"),
        F.col("unit_price"),
        F.col("unit_cost"),
        F.col("discount_pct"),
        F.col("total_revenue"),
        F.col("gross_margin"),
        F.col("gross_margin_pct"),
        F.col("customer_id"),
        F.col("payment_method"),
        F.col("region"),
        F.col("_ingestion_timestamp")
    )

df_fact.write.format("delta") \
    .mode("overwrite") \
    .partitionBy("region") \
    .save(f"{LAKEHOUSE_PATH}/Files/gold/fact_sales")

print(f"fact_sales loaded: {df_fact.count():,} rows")
```

---

## 7. Complete the Dataflow Gen2 (df_dim_product)

Update the stub `df_dim_product` from Project 2 with the following completed M query:

```powerquery
let
    Source = Csv.Document(
        AzureStorage.BlobContents(
            "https://onelake.dfs.fabric.microsoft.com/retailiq_lakehouse/Files/bronze/products/"
        ),
        [Delimiter=",", Columns=9, Encoding=65001, QuoteStyle=QuoteStyle.None]
    ),
    PromoteHeaders = Table.PromoteHeaders(Source, [PromoteAllScalars=true]),
    TypedTable = Table.TransformColumnTypes(PromoteHeaders, {
        {"product_id", type text},
        {"product_name", type text},
        {"category", type text},
        {"subcategory", type text},
        {"unit_price", type number},
        {"unit_cost", type number},
        {"supplier_id", type text},
        {"is_active", type logical},
        {"created_date", type date}
    }),
    RemovedDuplicates = Table.Distinct(TypedTable, {"product_id"}),
    AddedSurrogateKey = Table.AddColumn(
        RemovedDuplicates,
        "product_key",
        each Number.From(Text.AfterDelimiter([product_id], "_")),
        Int64.Type
    ),
    AddedLoadTimestamp = Table.AddColumn(
        AddedSurrogateKey,
        "_loaded_at",
        each DateTime.LocalNow(),
        type datetime
    ),
    ReorderedColumns = Table.ReorderColumns(AddedLoadTimestamp,
        {"product_key", "product_id", "product_name", "category",
         "subcategory", "unit_price", "unit_cost", "supplier_id",
         "is_active", "created_date", "_loaded_at"})
in
    ReorderedColumns
```

Set destination to `retailiq_lakehouse` → `Tables` → `gold_dim_product`, update method: **Replace**.

---

## 8. Implement Shortcuts

**Action:** Create a shortcut in the lakehouse that points to an external ADLS Gen2 location (simulating the source system's storage).

In the Fabric portal, inside `retailiq_lakehouse`:
1. Go to **Files → bronze → New shortcut**
2. Choose **Azure Data Lake Storage Gen2** as source
3. URL: Use your own ADLS account, or document this step as requiring an external ADLS account
4. Name the shortcut: `external_sales_archive`
5. Point it to a container/folder path of your choice

**Exam note:** Understand the difference between shortcuts and mirroring:
- **Shortcuts** = virtual pointers, data stays in source, read-only
- **Mirroring** = replicates data into OneLake, data is materialised and writable

Document this distinction in `docs/architecture.md`.

---

## 9. Validation Checklist

- [ ] `nb_generate_synthetic_data` ran successfully and files exist in `Files/bronze/sales/`, `Files/bronze/products/`, `Files/bronze/stores/`
- [ ] At least 1 day of CSV data is visible in the bronze sales folder
- [ ] `nb_transform_bronze_to_silver_sales` runs without error for at least one execution date
- [ ] Silver Delta table `silver_sales` exists and is partitioned by `region` and `transaction_date`
- [ ] Data quality summary log shows correct counts for dupes, nulls, invalid prices, late records, orphans
- [ ] Late-arriving records are written to the quarantine folder
- [ ] `gold_dim_date`, `gold_dim_store`, `gold_dim_product`, `gold_fact_sales` all exist as Delta tables
- [ ] `df_dim_product` Dataflow Gen2 has been updated with the full M query and runs successfully
- [ ] At least one shortcut exists in the lakehouse
- [ ] All notebooks committed to `ingestion/batch/notebooks/` in the repo

---

## 10. Exam Topics Covered

| Exam Objective | Covered In |
|---|---|
| Design and implement full and incremental data loads | Sections 5, 6.3 |
| Prepare data for loading into a dimensional model | Section 6 |
| Choose an appropriate data store | Section 8 |
| Choose between dataflows, notebooks, KQL, T-SQL | Sections 5, 7 |
| Create and manage shortcuts | Section 8 |
| Ingest data by using pipelines | Via Project 2 pipelines calling these notebooks |
| Transform data using PySpark | Section 5 |
| Transform data using Power Query (M) | Section 7 |
| Handle duplicate, missing, and late-arriving data | Cells 5–8 of transform notebook |
| Denormalize data | Section 6.3 (fact_sales join) |
| Group and aggregate data | Cells 5, 10 of transform notebook |

---

## 11. Further Reading

- [Delta Lake in Microsoft Fabric](https://learn.microsoft.com/en-us/fabric/data-engineering/lakehouse-and-delta-tables)
- [OneLake shortcuts](https://learn.microsoft.com/en-us/fabric/onelake/onelake-shortcuts)
- [Dataflow Gen2 transformations](https://learn.microsoft.com/en-us/fabric/data-factory/dataflows-gen2-overview)
- [PySpark in Fabric notebooks](https://learn.microsoft.com/en-us/fabric/data-engineering/how-to-use-notebook)
