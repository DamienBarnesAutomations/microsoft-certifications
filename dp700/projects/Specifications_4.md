# Specifications_4.md
# RetailIQ — Project 4: Stream Live Sensor Data
**Domain:** Ingest & Transform Data  
**Estimated Effort:** 4–6 hours  
**Fabric Items Created:** Eventhouse, KQL Database, Eventstream, KQL Querysets, Real-Time Dashboard (optional)

---

## 1. Overview

RetailIQ's 20 stores each have IoT sensors that emit real-time events — foot traffic counts, checkout queue lengths, and door open/close events. This project builds the entire real-time data pipeline: an eventstream to ingest the sensor data, an eventhouse and KQL database to store and query it, KQL queries for anomaly detection, and windowing aggregations to compute 5-minute rolling averages.

This project runs in parallel with the batch pipeline from Project 3 and feeds the monitoring layer in Project 5.

---

## 2. Prerequisites

- Projects 1 and 2 completed (`retailiq-dev` workspace, orchestration layer in place)
- Project 3 is not required — streaming is independent of batch
- A way to simulate IoT events: either Azure Event Hubs (if available) or Fabric's built-in **sample data** eventstream source

---

## 3. Repository Structure for This Project

```
retailiq-fabric/
└── ingestion/
    └── streaming/
        ├── eventstreams/
        │   └── es_sensor_events_config.md
        ├── kql/
        │   ├── schema.kql
        │   ├── anomaly_detection.kql
        │   ├── windowing_aggregations.kql
        │   └── materialized_views.kql
        └── docs/
            └── streaming_architecture.md
```

---

## 4. Streaming Architecture

Document this in `ingestion/streaming/docs/streaming_architecture.md`:

```
[IoT Sensors (20 stores)]
        |
        | (HTTPS / AMQP events)
        v
[Azure Event Hub: retailiq-sensor-hub]
  OR
[Fabric Eventstream Sample Data Source]
        |
        v
[Fabric Eventstream: es_sensor_events]
        |
        |---> [Eventhouse: retailiq_eventhouse]
        |         └── KQL Database: SensorDB
        |               ├── Table: sensor_raw          (all events, retained 90 days)
        |               ├── Table: sensor_alerts        (anomaly events only)
        |               └── Materialized View: mv_5min_averages
        |
        |---> [OneLake shortcut] (optional: archive raw events to bronze/sensors/)
        |
        v
[KQL Queryset: qs_sensor_analysis]
        |
        v
[Real-Time Dashboard: RetailIQ Live Ops] (optional)
```

---

## 5. Sensor Event Schema

### 5.1 Raw Event Schema

Each IoT sensor emits JSON events via Event Hub. The schema is:

```json
{
  "event_id":       "uuid-v4",
  "event_type":     "FOOT_TRAFFIC | QUEUE_LENGTH | DOOR_EVENT",
  "store_id":       "STR_001 to STR_020",
  "sensor_id":      "SENSOR_STR001_01",
  "timestamp_utc":  "2024-01-15T10:23:45.123Z",
  "value":          42,
  "unit":           "count | people | open/closed",
  "region":         "North | South | East | West",
  "metadata": {
    "firmware_version": "2.1.4",
    "battery_pct": 87
  }
}
```

**Event type definitions:**
- `FOOT_TRAFFIC`: number of people who entered the store in the last 60 seconds (`value` = integer count)
- `QUEUE_LENGTH`: current number of people in checkout queues (`value` = integer count)
- `DOOR_EVENT`: door open/close (`value` = 1 for open, 0 for closed)

**Emit frequency:**
- `FOOT_TRAFFIC`: every 60 seconds per store
- `QUEUE_LENGTH`: every 30 seconds per store
- `DOOR_EVENT`: on change only

---

## 6. Create the Eventhouse and KQL Database

### 6.1 Create Eventhouse

**Action:** In `retailiq-dev`, create a new **Eventhouse** named `retailiq_eventhouse`.

**Steps:**
1. In the workspace, click **New → Eventhouse**
2. Name: `retailiq_eventhouse`
3. This automatically creates a KQL database with the same name — rename the default database to `SensorDB`

**Eventhouse settings to configure:**
- Retention period: 90 days (data older than 90 days is automatically dropped from hot cache)
- Caching period: 30 days (data within 30 days is cached for fast queries)

---

### 6.2 Create KQL Database Tables

Open the KQL queryset inside `SensorDB` and run the following DDL statements.

`ingestion/streaming/kql/schema.kql`:

```kql
// ============================================================
// RetailIQ SensorDB — Schema Definition
// Run in order: tables first, then policies, then views
// ============================================================

// --- Table: sensor_raw ---
// Stores all raw events from all sensor types
.create table sensor_raw (
    event_id:       string,
    event_type:     string,
    store_id:       string,
    sensor_id:      string,
    timestamp_utc:  datetime,
    value:          real,
    unit:           string,
    region:         string,
    firmware_ver:   string,
    battery_pct:    real,
    ingested_at:    datetime
)

// Set retention policy (90 days)
.alter table sensor_raw policy retention
```
{
  "SoftDeletePeriod": "90.00:00:00",
  "Recoverability": "Disabled"
}
```

// Set caching policy (30 days hot cache)
.alter table sensor_raw policy caching
    hot = 30d

// --- Table: sensor_alerts ---
// Stores only anomaly events (queue > 10, foot traffic spikes)
.create table sensor_alerts (
    alert_id:       string,
    alert_type:     string,
    store_id:       string,
    region:         string,
    timestamp_utc:  datetime,
    metric_value:   real,
    threshold:      real,
    severity:       string,   // LOW | MEDIUM | HIGH | CRITICAL
    acknowledged:   bool,
    created_at:     datetime
)

// --- Ingestion mapping for JSON events ---
.create table sensor_raw ingestion json mapping 'sensor_raw_mapping'
```
[
  { "column": "event_id",      "path": "$.event_id" },
  { "column": "event_type",    "path": "$.event_type" },
  { "column": "store_id",      "path": "$.store_id" },
  { "column": "sensor_id",     "path": "$.sensor_id" },
  { "column": "timestamp_utc", "path": "$.timestamp_utc" },
  { "column": "value",         "path": "$.value" },
  { "column": "unit",          "path": "$.unit" },
  { "column": "region",        "path": "$.region" },
  { "column": "firmware_ver",  "path": "$.metadata.firmware_version" },
  { "column": "battery_pct",   "path": "$.metadata.battery_pct" },
  { "column": "ingested_at",   "path": "" }
]
```
```

---

## 7. Create and Configure the Eventstream

### 7.1 Create the Eventstream

**Action:** In `retailiq-dev`, create a new **Eventstream** named `es_sensor_events`.

**Steps:**
1. Click **New → Eventstream**
2. Name: `es_sensor_events`
3. Enable **"Enhanced capabilities"** if prompted (allows routing, filtering, transformations)

### 7.2 Configure the Source

**Option A — If you have Azure Event Hubs:**
- Source type: `Azure Event Hubs`
- Namespace: your Event Hub namespace
- Event Hub name: `retailiq-sensor-hub`
- Consumer group: `$Default`
- Shared Access Key: your key
- Data format: `JSON`

**Option B — If using Fabric Sample Data (recommended for beginners):**
- Source type: `Sample data`
- Sample: `Bicycles` or `Stock market` (use as a stand-in — the schema won't match exactly but the eventstream mechanics are identical)
- Note in `es_sensor_events_config.md` that in a real implementation this would be replaced with Event Hubs

### 7.3 Configure the Destination

Add a destination to the eventstream:
- Destination type: `Eventhouse`
- Workspace: `retailiq-dev`
- Eventhouse: `retailiq_eventhouse`
- KQL Database: `SensorDB`
- Table: `sensor_raw`
- Input data format: `JSON`
- Mapping: `sensor_raw_mapping`
- **Ingestion mode:** Direct ingestion (not via intermediate storage)

### 7.4 Configure an OneLake Archive Destination (Optional)

Add a second destination:
- Destination type: `Lakehouse`
- Workspace: `retailiq-dev`
- Lakehouse: `retailiq_lakehouse`
- Root folder: `Files/bronze/sensors/`
- File format: `Parquet`
- Partitioning: `By date (YYYY/MM/DD)`

**Exam note to document:** This configures native storage in the Eventhouse AND a shortcut/archive in OneLake simultaneously. Understand the trade-offs:
- Eventhouse native storage: optimised for time-series KQL queries, hot cache, fast analytics
- OneLake archive: for long-term retention beyond 90 days, accessible by PySpark/SQL

---

## 8. KQL Anomaly Detection Queries

Create a KQL Queryset named `qs_sensor_analysis` in `SensorDB`. Add the following queries.

`ingestion/streaming/kql/anomaly_detection.kql`:

```kql
// ============================================================
// RetailIQ — Anomaly Detection Queries
// Run against SensorDB.sensor_raw
// ============================================================

// --- Query 1: Current queue lengths above threshold ---
// Find any store where checkout queues currently exceed 10 people
let queue_threshold = 10;
sensor_raw
| where ingested_at > ago(5m)                    // Last 5 minutes
| where event_type == "QUEUE_LENGTH"
| summarize
    latest_value = arg_max(timestamp_utc, value) by store_id, region
| where value > queue_threshold
| extend
    severity = case(
        value > 20, "CRITICAL",
        value > 15, "HIGH",
        value > 10, "MEDIUM",
        "LOW"
    ),
    alert_message = strcat("Queue at ", store_id, " is ", tostring(toint(value)), " people")
| project store_id, region, latest_queue_length = value, severity, alert_message
| order by latest_queue_length desc


// --- Query 2: Foot traffic spikes (>2 std deviations from hourly average) ---
// Detect unusual spikes in foot traffic per store
let lookback = 1h;
let spike_multiplier = 2.0;
let baseline =
    sensor_raw
    | where timestamp_utc between (ago(24h) .. ago(lookback))
    | where event_type == "FOOT_TRAFFIC"
    | summarize
        avg_traffic = avg(value),
        stdev_traffic = stdev(value)
      by store_id, bin(timestamp_utc, 1h)
    | summarize
        mean_hourly = avg(avg_traffic),
        mean_stdev = avg(stdev_traffic)
      by store_id;
sensor_raw
| where timestamp_utc > ago(lookback)
| where event_type == "FOOT_TRAFFIC"
| summarize current_avg = avg(value) by store_id, bin(timestamp_utc, 5m)
| join kind=inner baseline on store_id
| where current_avg > mean_hourly + (spike_multiplier * mean_stdev)
| extend spike_factor = round(current_avg / mean_hourly, 2)
| project store_id, timestamp_utc, current_traffic = current_avg,
          expected_avg = mean_hourly, spike_factor
| order by spike_factor desc


// --- Query 3: Low battery sensor alerts ---
// Identify sensors with battery below 20%
sensor_raw
| where ingested_at > ago(1h)
| summarize latest_battery = arg_max(ingested_at, battery_pct) by sensor_id, store_id, region
| where battery_pct < 20
| extend urgency = iif(battery_pct < 10, "REPLACE NOW", "Replace Soon")
| project sensor_id, store_id, region, battery_pct, urgency
| order by battery_pct asc


// --- Query 4: Stores with no events in last 10 minutes (sensor offline detection) ---
let all_stores = datatable(expected_store_id: string) [
    "STR_001","STR_002","STR_003","STR_004","STR_005",
    "STR_006","STR_007","STR_008","STR_009","STR_010",
    "STR_011","STR_012","STR_013","STR_014","STR_015",
    "STR_016","STR_017","STR_018","STR_019","STR_020"
];
let active_stores =
    sensor_raw
    | where ingested_at > ago(10m)
    | summarize by store_id;
all_stores
| join kind=leftanti active_stores on $left.expected_store_id == $right.store_id
| extend alert = "No sensor events received in last 10 minutes"
| project store_id = expected_store_id, alert
```

---

## 9. KQL Windowing Aggregations

`ingestion/streaming/kql/windowing_aggregations.kql`:

```kql
// ============================================================
// RetailIQ — Windowing Aggregations
// ============================================================

// --- Tumbling Window: 5-minute foot traffic averages ---
// Non-overlapping 5-minute windows, one value per window per store
sensor_raw
| where timestamp_utc > ago(24h)
| where event_type == "FOOT_TRAFFIC"
| summarize
    avg_foot_traffic = avg(value),
    max_foot_traffic = max(value),
    min_foot_traffic = min(value),
    event_count = count()
  by store_id, region, bin(timestamp_utc, 5m)
| order by store_id asc, timestamp_utc asc


// --- Sliding Window: 15-minute rolling average queue length ---
// Overlapping windows — use series functions for true sliding window
sensor_raw
| where timestamp_utc > ago(6h)
| where event_type == "QUEUE_LENGTH"
| make-series
    avg_queue = avg(value)
  on timestamp_utc
  from ago(6h) to now()
  step 1m
  by store_id
| extend rolling_15m = series_fir(avg_queue, repeat(1, 15), true, true)
| project store_id, timestamp_utc, avg_queue, rolling_15m


// --- Session Window: Detect sustained high-queue periods ---
// A "session" is a continuous period where queue > 8 people
// Sessions end when queue drops below threshold for > 5 minutes
let queue_threshold = 8;
let gap_duration = 5m;
sensor_raw
| where timestamp_utc > ago(12h)
| where event_type == "QUEUE_LENGTH"
| where value > queue_threshold
| summarize
    session_start = min(timestamp_utc),
    session_end = max(timestamp_utc),
    avg_queue = avg(value),
    peak_queue = max(value),
    readings = count()
  by store_id, session = bin(timestamp_utc, gap_duration)
| where readings > 2   // At least 3 readings in window (not a one-off spike)
| extend duration_minutes = datetime_diff('minute', session_end, session_start)
| project store_id, session_start, session_end, duration_minutes,
          avg_queue, peak_queue
| order by duration_minutes desc


// --- Hourly summary by region ---
sensor_raw
| where timestamp_utc > ago(24h)
| summarize
    total_foot_traffic = sumif(value, event_type == "FOOT_TRAFFIC"),
    avg_queue_length   = avgif(value, event_type == "QUEUE_LENGTH"),
    max_queue_length   = maxif(value, event_type == "QUEUE_LENGTH"),
    event_count        = count()
  by region, bin(timestamp_utc, 1h)
| order by region asc, timestamp_utc asc
```

---

## 10. Materialized Views

`ingestion/streaming/kql/materialized_views.kql`:

```kql
// ============================================================
// RetailIQ — Materialized Views
// Pre-compute expensive aggregations for dashboard queries
// ============================================================

// Materialized view: 5-minute foot traffic averages (auto-updated)
.create materialized-view with (backfill=true) mv_5min_foot_traffic on table sensor_raw
{
    sensor_raw
    | where event_type == "FOOT_TRAFFIC"
    | summarize
        avg_traffic = avg(value),
        max_traffic = max(value),
        event_count = count()
      by store_id, region, bin(timestamp_utc, 5m)
}

// Materialized view: Latest queue length per store (current state)
.create materialized-view with (backfill=true) mv_latest_queue on table sensor_raw
{
    sensor_raw
    | where event_type == "QUEUE_LENGTH"
    | summarize
        latest_queue  = arg_max(timestamp_utc, value),
        avg_queue_1h  = avg(value)
      by store_id, region
}

// Verify materialized views are healthy
.show materialized-views
| project Name, SourceTable, IsHealthy, LastRunTime, RowCount
```

---

## 11. Eventstream vs Spark Structured Streaming

**Exam note:** Document in `docs/architecture.md` when you would choose each:

| Scenario | Recommended Engine | Reason |
|---|---|---|
| Sub-second latency, KQL analytics | Eventstream → Eventhouse | Native integration, no code required, fastest path |
| Complex stateful streaming (joins across streams) | Spark Structured Streaming (notebook) | More expressive, full PySpark API |
| ML inference on streaming data | Spark Structured Streaming | Access to MLflow models |
| Simple filtering/routing to multiple destinations | Eventstream | Visual no-code configuration |
| Aggregations in KQL windows | Eventstream → Eventhouse + KQL | KQL's `make-series` and `bin()` are purpose-built |

**Implement the Spark Structured Streaming alternative** (as a comparison exercise):

```python
# nb_spark_streaming_alternative.py
# This shows how the same foot traffic aggregation would look in Spark

from pyspark.sql import SparkSession
from pyspark.sql import functions as F
from pyspark.sql.types import *

spark = SparkSession.builder \
    .config("spark.sql.streaming.checkpointLocation",
            "abfss://retailiq_lakehouse@onelake.dfs.fabric.microsoft.com/Files/checkpoints/sensor_stream") \
    .getOrCreate()

# Define schema matching the IoT event JSON
sensor_schema = StructType([
    StructField("event_id", StringType()),
    StructField("event_type", StringType()),
    StructField("store_id", StringType()),
    StructField("sensor_id", StringType()),
    StructField("timestamp_utc", TimestampType()),
    StructField("value", DoubleType()),
    StructField("unit", StringType()),
    StructField("region", StringType())
])

# Read from Event Hub (replace connection string)
df_stream = spark.readStream \
    .format("eventhubs") \
    .option("eventhubs.connectionString", "<YOUR_EVENTHUB_CONNECTION_STRING>") \
    .load() \
    .select(F.from_json(F.col("body").cast("string"), sensor_schema).alias("data")) \
    .select("data.*")

# 5-minute tumbling window aggregation
df_windowed = df_stream \
    .filter(F.col("event_type") == "FOOT_TRAFFIC") \
    .withWatermark("timestamp_utc", "10 minutes") \
    .groupBy(
        F.col("store_id"),
        F.col("region"),
        F.window(F.col("timestamp_utc"), "5 minutes")
    ) \
    .agg(
        F.avg("value").alias("avg_foot_traffic"),
        F.max("value").alias("max_foot_traffic"),
        F.count("*").alias("event_count")
    ) \
    .select(
        "store_id", "region",
        F.col("window.start").alias("window_start"),
        F.col("window.end").alias("window_end"),
        "avg_foot_traffic", "max_foot_traffic", "event_count"
    )

# Write to lakehouse
query = df_windowed.writeStream \
    .format("delta") \
    .outputMode("append") \
    .option("checkpointLocation",
            "abfss://retailiq_lakehouse@onelake.dfs.fabric.microsoft.com/Files/checkpoints/sensor_agg") \
    .start("abfss://retailiq_lakehouse@onelake.dfs.fabric.microsoft.com/Files/silver/sensors/")

query.awaitTermination(timeout=300)  # Run for 5 minutes then stop
```

---

## 12. Native vs Mirrored Storage Decision

**Exam note to document:** In `ingestion/streaming/docs/streaming_architecture.md`, explain the decision:

```
## Storage Strategy for Real-Time Intelligence

### Native Storage (chosen for sensor_raw)
- Data is stored directly inside the Eventhouse KQL database
- Optimised for KQL queries and time-series analytics
- Supports materialized views, retention policies, caching policies
- Use when: primary consumption is via KQL, low-latency dashboards

### Mirrored Storage
- Data in an external source (e.g. Azure SQL, Cosmos DB) is replicated into OneLake
- The mirrored copy is queryable via Fabric SQL analytics endpoint
- Use when: existing operational database needs to be queried in Fabric without ETL

### Shortcuts in Real-Time Intelligence
- Accelerated shortcuts: data is indexed and cached in the Eventhouse for fast querying
- Non-accelerated shortcuts: data is read directly from OneLake/ADLS each query (slower)
- Use accelerated when: frequently queried reference data (e.g. store dimension)
- Use non-accelerated when: occasional ad-hoc queries on large historical files

### Decision for RetailIQ:
- sensor_raw → Native Eventhouse storage (real-time, KQL-optimised)
- sensors archive → OneLake via eventstream destination (long-term, Parquet)
- store dimension → Accelerated shortcut in Eventhouse (fast lookup in KQL joins)
```

---

## 13. Validation Checklist

- [ ] Eventhouse `retailiq_eventhouse` exists in `retailiq-dev`
- [ ] KQL database `SensorDB` exists with tables `sensor_raw` and `sensor_alerts`
- [ ] JSON ingestion mapping `sensor_raw_mapping` is created
- [ ] Retention policy set to 90 days, caching policy set to 30 days on `sensor_raw`
- [ ] Eventstream `es_sensor_events` exists and is connected to a source
- [ ] Eventstream destination is connected to `sensor_raw` in `SensorDB`
- [ ] Data is flowing into `sensor_raw` (run `sensor_raw | count` to verify)
- [ ] All 4 anomaly detection queries run without error in `qs_sensor_analysis`
- [ ] All windowing queries (tumbling, sliding, session) run without error
- [ ] Both materialized views are created and healthy
- [ ] Storage strategy decisions documented in `streaming_architecture.md`
- [ ] All KQL files committed to `ingestion/streaming/kql/`

---

## 14. Exam Topics Covered

| Exam Objective | Covered In |
|---|---|
| Choose an appropriate streaming engine | Sections 11, 12 |
| Choose between native storage, mirrored storage, or shortcuts | Section 12 |
| Choose between accelerated and non-accelerated shortcuts | Section 12 |
| Process data by using eventstreams | Sections 7, 8 |
| Process data by using Spark structured streaming | Section 11 |
| Process data by using KQL | Sections 8, 9 |
| Create windowing functions | Section 9 |
| Design and implement a loading pattern for streaming data | Section 4 |

---

## 15. Further Reading

- [Eventhouse overview](https://learn.microsoft.com/en-us/fabric/real-time-intelligence/eventhouse)
- [KQL quick reference](https://learn.microsoft.com/en-us/azure/data-explorer/kql-quick-reference)
- [Eventstream overview](https://learn.microsoft.com/en-us/fabric/real-time-intelligence/event-streams/overview)
- [Materialized views in KQL](https://learn.microsoft.com/en-us/azure/data-explorer/kusto/management/materialized-views/materialized-view-overview)
- [Spark Structured Streaming](https://learn.microsoft.com/en-us/fabric/data-engineering/how-to-use-notebook)
