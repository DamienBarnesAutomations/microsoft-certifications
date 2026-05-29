# Specifications_2.md
# RetailIQ — Project 2: Orchestrate the Data Platform
**Domain:** Implement & Manage an Analytics Solution  
**Estimated Effort:** 3–5 hours  
**Fabric Items Created:** Master Pipeline, Dataflow Gen2, Notebooks (stubs), Event-Based Triggers, Parameterised Sub-Pipelines

---

## 1. Overview

With the workspace and lakehouse in place from Project 1, this project builds the orchestration layer that will power all of RetailIQ's nightly and event-driven data workflows. You will design and implement a master pipeline that coordinates multiple child pipelines, a Dataflow Gen2 for dimension loading, parameterised notebooks for regional processing, and both schedule-based and event-based triggers.

This project intentionally creates pipeline and notebook stubs that will be filled with real logic in Projects 3 and 4. The focus here is on the orchestration architecture and wiring — not the transformation code itself.

---

## 2. Prerequisites

- Project 1 completed: `retailiq-dev` workspace exists, `retailiq_lakehouse` exists
- Git integration is active on the `dev` branch
- No data is required yet — all pipelines will be built with stub activities

---

## 3. Repository Structure for This Project

```
retailiq-fabric/
└── orchestration/
    ├── pipelines/
    │   ├── master_pipeline.json
    │   ├── pl_load_bronze_sales.json
    │   ├── pl_load_silver_sales.json
    │   ├── pl_load_dimensions.json
    │   └── pl_load_streaming_config.json
    ├── dataflows/
    │   └── df_dim_product.json
    ├── triggers/
    │   ├── schedule_nightly.json
    │   └── trigger_new_file_event.json
    └── parameters/
        └── region_parameters.json
```

---

## 4. Step-by-Step Implementation

### 4.1 Understand the Orchestration Architecture

Before building anything, document the intended orchestration flow in a comment block at the top of `master_pipeline.json`. The architecture is:

```
[Nightly Schedule Trigger @ 02:00 UTC]
        |
        v
[master_pipeline]
        |
        |---> [pl_load_bronze_sales]          (Copy Activity: raw CSVs → bronze)
        |           |
        |           v
        |     [pl_load_silver_sales]           (Notebook Activity: PySpark transforms)
        |           |
        |           v
        |     [pl_load_dimensions]             (Dataflow Gen2: dimension tables)
        |
        |---> [pl_load_streaming_config]       (Eventstream validation - parallel)
        |
        v
[Success/Failure Notification Activity]

[Event Trigger: New file in OneLake bronze/sales/]
        |
        v
[pl_load_bronze_sales] (triggered independently on file arrival)
```

Key design decisions to document:
- Bronze loading runs first (dependency: silver needs bronze to exist)
- Dimension loading runs after silver (dependency: dimensions reference silver product data)
- Streaming config validation runs in parallel (no dependency on batch path)
- The event trigger allows real-time file processing independent of the nightly schedule

---

### 4.2 Create Stub Notebooks

**Action:** Create the following notebooks in `retailiq-dev`. These are stubs — they contain the correct structure and print statements but no real transformation logic yet (that comes in Project 3).

**Notebook 1:** `nb_transform_bronze_to_silver_sales`

Create this notebook in the Fabric portal with the following cells:

```python
# Cell 1 — Parameters (Fabric notebook parameters cell)
# Tag this cell as "parameters" in the cell toolbar
region = "ALL"
execution_date = ""
incremental = True

# Cell 2 — Imports and setup
from pyspark.sql import SparkSession
from datetime import datetime, date

spark = SparkSession.builder.getOrCreate()

print(f"Starting bronze → silver transform")
print(f"Region: {region}")
print(f"Execution date: {execution_date if execution_date else 'today'}")
print(f"Incremental mode: {incremental}")

# Cell 3 — Stub: Bronze read (to be implemented in Project 3)
print("TODO: Read from bronze/sales/")
# df_bronze = spark.read.parquet("abfss://retailiq_lakehouse@onelake.dfs.fabric.microsoft.com/Files/bronze/sales/")

# Cell 4 — Stub: Transform (to be implemented in Project 3)
print("TODO: Apply cleaning, dedup, and late-arrival handling")

# Cell 5 — Stub: Silver write (to be implemented in Project 3)
print("TODO: Write to silver/sales/ as Delta")

# Cell 6 — Exit status
print("Stub execution complete. No data was processed.")
mssparkutils.notebook.exit("stub_success")
```

**Notebook 2:** `nb_validate_streaming_config`

```python
# Cell 1 — Imports
from pyspark.sql import SparkSession
spark = SparkSession.builder.getOrCreate()

# Cell 2 — Stub: Validate eventstream is reachable
print("TODO: Validate eventstream connection to IoT hub")
print("TODO: Check eventhouse is receiving data")

# Cell 3 — Exit
mssparkutils.notebook.exit("stub_success")
```

**Notebook 3:** `nb_monitoring_check` (will be used in Project 5)

```python
# Cell 1 — Monitoring stub
print("TODO: Check pipeline run history")
print("TODO: Flag stale tables")
print("TODO: Send alert if ingestion freshness > 24 hours")
mssparkutils.notebook.exit("stub_success")
```

---

### 4.3 Create the Dataflow Gen2 for Dimension Loading

**Action:** Create a Dataflow Gen2 named `df_dim_product` in `retailiq-dev`.

**Purpose:** This dataflow will eventually load product dimension data from a source CSV into the gold lakehouse layer. For now, configure its structure with a placeholder source.

**Steps:**
1. In `retailiq-dev`, click **New → Dataflow Gen2**
2. Name it `df_dim_product`
3. In the Power Query editor, add a new blank query named `ProductSource`
4. Enter the following M code as a stub:

```powerquery
let
    // TODO in Project 3: Replace with actual source connection
    // This stub creates an empty table with the correct schema
    Source = #table(
        type table [
            product_id = text,
            product_name = text,
            category = text,
            subcategory = text,
            unit_price = number,
            unit_cost = number,
            supplier_id = text,
            is_active = logical
        ],
        {}
    ),
    // TODO: Add cleaning steps here
    // TODO: Add deduplication
    // TODO: Add surrogate key generation
    Output = Source
in
    Output
```

5. Set the **data destination** to: `retailiq_lakehouse` → `Tables` → `gold.dim_product`
6. Set the update method to **Replace** (for now; will change to Append in Project 3)
7. Save and close without publishing (publish will occur when real logic is added in Project 3)

---

### 4.4 Create Child Pipelines

Create each of the following pipelines in `retailiq-dev`. Each should contain a single **Notebook activity** pointing to the relevant stub notebook, plus a **Set variable** activity for logging.

---

#### Pipeline: `pl_load_bronze_sales`

**Activities:**

1. **Set Variable** activity named `SetExecutionDate`
   - Variable name: `executionDate`
   - Variable type: String
   - Value: `@formatDateTime(utcnow(), 'yyyy-MM-dd')`

2. **Copy Data** activity named `CopyRawSalesToBronze` (stub — no real source yet)
   - Source: HTTP (placeholder URL: `https://placeholder.retailiq.com/sales.csv`)
   - Sink: Lakehouse `retailiq_lakehouse` → Files → `bronze/sales/`
   - Sink file format: Parquet
   - **Mark this activity as:** `Continue on error = true` (so the pipeline doesn't fail on stub)

3. **Notebook** activity named `LogBronzeLoad`
   - Notebook: `nb_transform_bronze_to_silver_sales`
   - Base parameters:
     - `region`: `@pipeline().parameters.region`
     - `execution_date`: `@variables('executionDate')`
     - `incremental`: `@pipeline().parameters.incremental`

**Pipeline parameters to define:**

| Parameter Name | Type | Default Value |
|---|---|---|
| `region` | String | `ALL` |
| `incremental` | Bool | `true` |
| `executionDate` | String | `` (empty — set by activity) |

---

#### Pipeline: `pl_load_silver_sales`

**Activities:**

1. **Notebook** activity named `TransformBronzeToSilver`
   - Notebook: `nb_transform_bronze_to_silver_sales`
   - Base parameters:
     - `region`: `@pipeline().parameters.region`
     - `execution_date`: `@pipeline().parameters.executionDate`
     - `incremental`: `true`

2. **Set Variable** named `SetSilverLoadStatus`
   - Variable: `silverLoadStatus`
   - Value: `@activity('TransformBronzeToSilver').output.runStatus`

**Pipeline parameters:**

| Parameter Name | Type | Default Value |
|---|---|---|
| `region` | String | `ALL` |
| `executionDate` | String | `` |

---

#### Pipeline: `pl_load_dimensions`

**Activities:**

1. **Dataflow** activity named `LoadProductDimension`
   - Dataflow: `df_dim_product`

2. **Notebook** activity named `ValidateDimensionLoad` (stub)
   - Notebook: `nb_monitoring_check`

**No parameters required for now.**

---

#### Pipeline: `pl_load_streaming_config`

**Activities:**

1. **Notebook** activity named `ValidateStreamingConfig`
   - Notebook: `nb_validate_streaming_config`

2. **Wait** activity named `WaitForStreamingStabilisation`
   - Wait time in seconds: `10`

---

### 4.5 Create the Master Pipeline

**Action:** Create the main orchestration pipeline named `master_pipeline` in `retailiq-dev`.

**Pipeline variables to define:**

| Variable Name | Type | Default Value |
|---|---|---|
| `executionDate` | String | `` |
| `overallStatus` | String | `running` |
| `failedActivities` | Array | `[]` |

**Activities and their dependencies:**

1. **Set Variable** named `SetExecutionDate`
   - Variable: `executionDate`
   - Value: `@formatDateTime(utcnow(), 'yyyy-MM-dd')`
   - Depends on: nothing (runs first)

2. **Execute Pipeline** named `RunBronzeLoad`
   - Pipeline: `pl_load_bronze_sales`
   - Parameters:
     - `region`: `ALL`
     - `incremental`: `true`
   - Wait on completion: `true`
   - Depends on: `SetExecutionDate` (success)

3. **Execute Pipeline** named `RunSilverLoad`
   - Pipeline: `pl_load_silver_sales`
   - Parameters:
     - `region`: `ALL`
     - `executionDate`: `@variables('executionDate')`
   - Wait on completion: `true`
   - Depends on: `RunBronzeLoad` (success)

4. **Execute Pipeline** named `RunDimensionLoad`
   - Pipeline: `pl_load_dimensions`
   - Wait on completion: `true`
   - Depends on: `RunSilverLoad` (success)

5. **Execute Pipeline** named `RunStreamingValidation`
   - Pipeline: `pl_load_streaming_config`
   - Wait on completion: `false` (run in parallel)
   - Depends on: `SetExecutionDate` (success)

6. **If Condition** named `CheckOverallSuccess`
   - Expression: `@and(equals(activity('RunBronzeLoad').Status, 'Succeeded'), equals(activity('RunSilverLoad').Status, 'Succeeded'), equals(activity('RunDimensionLoad').Status, 'Succeeded'))`
   - Depends on: `RunDimensionLoad` (success or failure), `RunStreamingValidation` (success or failure)
   - If True: **Set Variable** `overallStatus` = `"succeeded"`
   - If False: **Set Variable** `overallStatus` = `"failed"`

7. **Notebook** activity named `RunMonitoringCheck`
   - Notebook: `nb_monitoring_check`
   - Depends on: `CheckOverallSuccess` (success)

---

### 4.6 Configure the Nightly Schedule Trigger

**Action:** Create a scheduled trigger for the master pipeline.

In the master pipeline, click **Add trigger → New/Edit**:

| Setting | Value |
|---|---|
| Name | `trigger_nightly_02utc` |
| Type | Scheduled |
| Start date | Tomorrow's date @ 02:00:00 UTC |
| Time zone | UTC |
| Recurrence | Every 1 day |
| End | No end |

**Do not activate this trigger yet** — leave it in draft/stopped state until Project 3 data is in place.

Commit the trigger definition to `orchestration/triggers/schedule_nightly.json`.

---

### 4.7 Configure the Event-Based Trigger

**Action:** Create a storage event trigger that fires `pl_load_bronze_sales` whenever a new file arrives in the bronze sales folder.

**Note:** Storage event triggers in Fabric require the OneLake path to be registered. If this feature is not available in your tenant version, document the intended configuration below.

In the Fabric portal, create a **Data workflow** (or pipeline trigger) with the following configuration:

`orchestration/triggers/trigger_new_file_event.json`:
```json
{
  "name": "trigger_onelake_new_sales_file",
  "type": "StorageEventTrigger",
  "description": "Fires pl_load_bronze_sales when a new file lands in OneLake bronze/sales/",
  "properties": {
    "storageAccountName": "onelake",
    "containerName": "retailiq_lakehouse",
    "folderPath": "Files/bronze/sales/",
    "events": ["Microsoft.Storage.BlobCreated"],
    "ignoreEmptyBlobs": true
  },
  "pipeline": {
    "pipelineReference": "pl_load_bronze_sales",
    "parameters": {
      "region": "ALL",
      "incremental": true
    }
  },
  "state": "Stopped"
}
```

---

### 4.8 Define and Externalise Region Parameters

**Action:** Create a parameter file that allows the orchestration layer to be driven by configuration rather than hardcoded values. This will allow the same pipelines to process each region independently if needed.

`orchestration/parameters/region_parameters.json`:
```json
{
  "regions": ["North", "South", "East", "West"],
  "defaultRegion": "ALL",
  "processingSchedule": {
    "North": "02:00 UTC",
    "South": "02:15 UTC",
    "East": "02:30 UTC",
    "West": "02:45 UTC"
  },
  "incrementalLoadEnabled": true,
  "fullLoadDayOfWeek": "Sunday"
}
```

**Implementation note:** In the master pipeline, you could use a **ForEach** activity iterating over this regions array to run `pl_load_bronze_sales` once per region in parallel. This is an optional enhancement — implement it if time allows, but document the intent in `docs/architecture.md` regardless.

**ForEach enhancement (optional):**
- Add a **ForEach** activity named `ProcessAllRegions`
- Items: `@json(pipeline().parameters.regionsConfig).regions`
- Inside ForEach → Execute Pipeline: `pl_load_bronze_sales` with `region = @item()`
- Batch count: `4` (run all 4 regions in parallel)

---

### 4.9 Implement Orchestration Patterns — Dynamic Expressions Reference

Document the following dynamic expression patterns in `docs/architecture.md` for exam reference:

```
# Common Dynamic Expressions Used in RetailIQ Pipelines

## Current date as string
@formatDateTime(utcnow(), 'yyyy-MM-dd')

## Yesterday's date (for incremental loads)
@formatDateTime(addDays(utcnow(), -1), 'yyyy-MM-dd')

## Reference a pipeline parameter
@pipeline().parameters.region

## Reference a variable
@variables('executionDate')

## Reference an activity output
@activity('RunBronzeLoad').output.rowsCopied

## Conditional expression
@if(equals(pipeline().parameters.incremental, true), 'incremental', 'full')

## Construct a file path dynamically
@concat('Files/bronze/sales/', formatDateTime(utcnow(), 'yyyy/MM/dd'), '/')

## Check activity status
@equals(activity('RunBronzeLoad').Status, 'Succeeded')
```

---

## 5. Validation Checklist

- [ ] Notebooks `nb_transform_bronze_to_silver_sales`, `nb_validate_streaming_config`, and `nb_monitoring_check` exist as stubs in `retailiq-dev`
- [ ] `df_dim_product` Dataflow Gen2 exists with the stub M query and destination set to `gold.dim_product`
- [ ] All four child pipelines exist: `pl_load_bronze_sales`, `pl_load_silver_sales`, `pl_load_dimensions`, `pl_load_streaming_config`
- [ ] Each child pipeline has the correct parameters defined
- [ ] `master_pipeline` exists with all 7 activities wired in the correct dependency order
- [ ] The parallel branch (streaming validation) runs independently of the batch branch
- [ ] The If Condition activity correctly evaluates all three batch pipeline statuses
- [ ] Nightly schedule trigger exists in Stopped state
- [ ] Event-based trigger is defined (in portal or as JSON in repo) in Stopped state
- [ ] `orchestration/parameters/region_parameters.json` is committed to the repo
- [ ] Dynamic expression reference is added to `docs/architecture.md`
- [ ] All pipeline changes are synced to the Git `dev` branch

---

## 6. Exam Topics Covered

| Exam Objective | Covered In |
|---|---|
| Choose between Dataflow Gen2, a pipeline, and a notebook | Steps 4.1, 4.3, 4.4 |
| Design and implement schedules and event-based triggers | Steps 4.6, 4.7 |
| Implement orchestration patterns with notebooks and pipelines | Steps 4.4, 4.5 |
| Implement parameters and dynamic expressions | Steps 4.4, 4.5, 4.8, 4.9 |

---

## 7. Further Reading

- [Fabric Data pipelines](https://learn.microsoft.com/en-us/fabric/data-factory/data-factory-overview)
- [Dataflow Gen2 overview](https://learn.microsoft.com/en-us/fabric/data-factory/dataflows-gen2-overview)
- [Pipeline expressions and functions](https://learn.microsoft.com/en-us/azure/data-factory/control-flow-expression-language-functions)
- [Schedule and event triggers](https://learn.microsoft.com/en-us/fabric/data-factory/pipeline-runs)
