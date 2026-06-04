// Module 2: Lakehouse, Delta & Medallion
(function() {
  var questions = [
{
    "text": "A data engineer wants to create a Delta table in a lakehouse. The table should support time travel queries and efficient updates. Which option ensures the table is stored in Delta format?",
    "options": [
      "Save the DataFrame as CSV and rely on schema inference",
      "Use saveAsTable with format set to parquet",
      "Use saveAsTable with format set to delta or omit format (default is delta)",
      "Use the Spark SQL CREATE TABLE statement without specifying FORMAT"
    ],
    "correct": 2,
    "module": 2,
    "explanation": "In Fabric, Delta is the default format for managed tables when using saveAsTable without specifying format or explicitly setting format('delta'). CSV does not support ACID or time travel. Parquet lacks transaction log support. CREATE TABLE without FORMAT defaults to Delta as well, but the most direct answer is saveAsTable with delta format."
  },
  {
    "text": "You have a lakehouse that contains a Delta table. You need to query the table using T-SQL and enforce row-level security. Which endpoint should you use?",
    "options": [
      "The lakehouse explorer in Fabric",
      "The SQL analytics endpoint for the lakehouse",
      "A notebook connected to the lakehouse",
      "Direct Lake mode from Power BI"
    ],
    "correct": 1,
    "module": 2,
    "explanation": "The SQL analytics endpoint provides a read-only T‑SQL interface to Delta tables in a lakehouse and supports T‑SQL security features such as row‑level security. The lakehouse explorer does not support T‑SQL. Notebooks use Spark SQL, not T‑SQL. Direct Lake mode is for Power BI reporting, not ad‑hoc T‑SQL queries with RLS."
  },
  {
    "text": "You are implementing a medallion architecture. The bronze layer contains raw JSON files. You need to clean and validate the data before moving it to the silver layer. Which tool is most appropriate?",
    "options": [
      "A notebook with Spark transformations",
      "A Real-Time Dashboard",
      "A Direct Lake semantic model",
      "A KQL Queryset"
    ],
    "correct": 0,
    "module": 2,
    "explanation": "Bronze to silver transformations typically involve complex data cleansing, schema enforcement, and validation, for which Spark notebooks are ideal. Real‑Time Dashboards are for visualization. Direct Lake semantic models are for reporting. KQL Querysets query KQL databases, not batch transform JSON files."
  },
  {
    "text": "You need to optimize a Delta table that has many small Parquet files. Which command should you run?",
    "options": [
      "VACUUM",
      "OPTIMIZE",
      "DESCRIBE HISTORY",
      "REPAIR"
    ],
    "correct": 1,
    "module": 2,
    "explanation": "OPTIMIZE coalesces small files into larger ones, improving read performance. VACUUM removes old files no longer referenced but does not compact files. DESCRIBE HISTORY shows the transaction log. REPAIR is not a Delta command."
  },
  {
    "text": "You have a Delta table with VACUUM set to the default retention. You want to time travel to a version created 10 days ago. What will happen?",
    "options": [
      "The query will succeed and return the historical data",
      "The query will fail because the files have been removed by VACUUM",
      "The query will return only the current version",
      "The query will return NULL values for the historical data"
    ],
    "correct": 1,
    "module": 2,
    "explanation": "Default VACUUM retention is 7 days. Files older than 7 days are removed, so time travel to a version 10 days ago will fail because the underlying Parquet files no longer exist. The transaction log may still show the version, but the data files are gone."
  },
  {
    "text": "You need to load data from a Fabric lakehouse into a warehouse. The lakehouse table is in Delta format. Which cross-database query syntax should you use?",
    "options": [
      "Three-part naming: lakehouse.schema.table",
      "OPENROWSET with the lakehouse path",
      "A linked server connection",
      "COPY INTO from the lakehouse"
    ],
    "correct": 0,
    "module": 2,
    "explanation": "Within the same workspace, Fabric supports cross‑database queries using three‑part naming: database.schema.table. This allows a warehouse to directly reference a lakehouse table. OPENROWSET is for external files. Linked servers are not used in Fabric. COPY INTO is for loading from files, not from a lakehouse table directly."
  },
  {
    "text": "You need to ensure that a Delta table in a lakehouse can be queried by Power BI using Direct Lake mode. Which of the following is required?",
    "options": [
      "The semantic model must be configured to use Direct Lake mode",
      "The lakehouse must have an SQL analytics endpoint enabled",
      "The Delta table must be partitioned",
      "The table must be in the Gold layer of a medallion architecture"
    ],
    "correct": 0,
    "module": 2,
    "explanation": "Direct Lake mode is a setting on the semantic model, not on the lakehouse. As long as the semantic model uses Direct Lake mode and points to the lakehouse, the Delta table can be queried. SQL analytics endpoint is automatically created but not a requirement. Partitioning and gold layer are optional."
  },
  {
    "text": "Which of the following describes the difference between a managed table and an external table in a Fabric lakehouse?",
    "options": [
      "Managed tables are stored in OneLake; external tables reference data outside OneLake",
      "Managed tables support ACID; external tables do not",
      "Managed tables can only be created with notebooks; external tables use pipelines",
      "There is no difference"
    ],
    "correct": 0,
    "module": 2,
    "explanation": "Managed tables store data in the lakehouse's managed Tables folder (OneLake). External tables reference data elsewhere (e.g., Files folder or external storage) and deleting the table does not delete the data. Both support ACID if stored in Delta format. Creation methods vary but not exclusive."
  },
  {
    "text": "Which of the following is true about the VACUUM command for Delta tables?",
    "options": [
      "It permanently removes old versions of the table",
      "It optimizes the layout of data files",
      "It creates a snapshot of the table",
      "It enables schema enforcement"
    ],
    "correct": 0,
    "module": 2,
    "explanation": "VACUUM removes old Parquet files that are no longer referenced by the current Delta transaction log, permanently deleting historical versions beyond the retention period. OPTIMIZE optimizes layout. DESCRIBE HISTORY shows snapshots. Schema enforcement is automatic."
  },
  {
    "text": "Which of the following describes the Bronze layer in a medallion architecture?",
    "options": [
      "Raw, unvalidated data in its original format",
      "Cleaned and validated data",
      "Enriched, business-ready data aggregated for reporting",
      "Data stored in KQL databases only"
    ],
    "correct": 0,
    "module": 2,
    "explanation": "Bronze layer is the raw, unaltered data as ingested. Silver is cleaned/validated. Gold is business‑ready. Bronze can be stored in various formats, not only KQL."
  },
  {
    "text": "You have a Delta table in a lakehouse. You want to update specific rows. Which Delta API method should you use?",
    "options": [
      "update() only",
      "merge() only",
      "upsert()",
      "Both update() and merge()"
    ],
    "correct": 3,
    "module": 2,
    "explanation": "Both update() and merge() can modify specific rows. update() changes rows matching a condition, merge() performs upserts (insert+update). delete() removes rows entirely, which is not an update operation. merge() is the most common approach for incremental updates."
  },
  {
    "text": "You need to create a shortcut in a lakehouse to reference data stored in an external ADLS Gen2 storage account. What does a shortcut do?",
    "options": [
      "Copies the data into OneLake",
      "Creates a reference to the external data without copying it",
      "Moves the data to the lakehouse Tables folder",
      "Creates a symbolic link that requires periodic sync"
    ],
    "correct": 1,
    "module": 2,
    "explanation": "A shortcut creates a reference to external data without copying it; the data stays in the external location but appears as if it is in OneLake. It does not copy or move data and does not require periodic sync."
  },
  {
    "text": "You have a notebook that reads a Delta table. You want to query a specific version of the table from 2 hours ago. Which function should you use?",
    "options": [
      "versionAsOf",
      "timestampAsOf",
      "timeTravel",
      "history()"
    ],
    "correct": 1,
    "module": 2,
    "explanation": "Delta Lake's time travel uses the `timestamp as of` syntax: `SELECT * FROM table TIMESTAMP AS OF ...`. `version as of` uses version numbers. `timeTravel` is not a function. `history()` shows the history but does not query a version."
  },
  {
    "text": "Which of the following is true about the default VACUUM retention period for Delta tables?",
    "options": [
      "1 day",
      "7 days",
      "30 days",
      "90 days"
    ],
    "correct": 1,
    "module": 2,
    "explanation": "The default retention period for Delta VACUUM is 7 days. This can be changed by setting the table property `delta.deletedFileRetentionDuration`."
  },
  {
    "text": "You need to partition a Delta table in a lakehouse. Which of the following is true about partitioning?",
    "options": [
      "Partitioning is always beneficial regardless of data size",
      "Partitioning is recommended for large datasets but can hurt performance for small or high-cardinality columns",
      "Partitioning is only supported for CSV files",
      "Partitioning requires a Fabric premium capacity"
    ],
    "correct": 1,
    "module": 2,
    "explanation": "Partitioning improves performance for large tables when filtering on the partition column, but it can degrade performance for small tables or high‑cardinality columns (too many small files). Partitioning is supported for Delta tables and does not require premium capacity."
  },
  {
    "text": "Which of the following describes V-Order for Delta tables?",
    "options": [
      "A column-level encryption method",
      "An optimization that speeds up reads at the cost of approximately 15% write overhead",
      "A method for compressing Parquet files",
      "A way to version-control Delta tables"
    ],
    "correct": 1,
    "module": 2,
    "explanation": "V‑Order is a write‑time optimization that reorders data to accelerate read performance (Verti‑Scan) with about 15% overhead on writes. It is not encryption, compression, or version control."
  },
  {
    "text": "Which of the following is true about the Medallion architecture in Fabric?",
    "options": [
      "Each layer must be in a separate workspace",
      "Gold layer data must be stored in a warehouse",
      "You can customize the layers as needed for your use case",
      "Bronze layer data must be in KQL format"
    ],
    "correct": 2,
    "module": 2,
    "explanation": "The Medallion architecture is a pattern, not a rigid rule. You can customize layers (e.g., add Platinum) and store them in lakehouses, warehouses, etc. Layers are not required to be in separate workspaces. Bronze can be any format, not specifically KQL."
  },
  {
    "module": 2,
    "text": "You need to add a new column to a Delta table that must be populated with default values for existing rows without rewriting the entire table. What is the recommended approach?",
    "options": [
      "ALTER TABLE ADD COLUMN with DEFAULT",
      "Create a new table with the column and swap",
      "Use UPDATE with SET on the new column",
      "Recreate the table using CTAS"
    ],
    "correct": 0,
    "explanation": "Delta Lake supports ALTER TABLE ADD COLUMN with a DEFAULT clause. This adds the column and populates existing rows with the default value without rewriting the entire table. UPDATE would require scanning all rows. CTAS or swap would be heavy."
  },
  {
    "module": 2,
    "text": "You want to optimize query performance for range filters on two columns in a large Delta table. Which OPTIMIZE option should you use?",
    "options": [
      "OPTIMIZE with VACUUM",
      "OPTIMIZE with ZORDER BY (col1, col2)",
      "OPTIMIZE with REPAIR",
      "OPTIMIZE alone (default compaction)"
    ],
    "correct": 1,
    "explanation": "OPTIMIZE with ZORDER BY col1, col2 co-locates related data from both columns within files, improving data skipping for multi-column range filters. OPTIMIZE alone only compacts files. VACUUM and REPAIR are unrelated."
  },
  {
    "module": 2,
    "text": "You must ensure a Delta table can be time‑travelled to a point 12 days ago. Which setting must you adjust?",
    "options": [
      "VACUUM retention period",
      "Delta lake versioning to 30 days",
      "Enable streaming checkpoint",
      "Set table property 'retentionHours'"
    ],
    "correct": 0,
    "explanation": "Time travel is possible only within the VACUUM retention period. Default is 7 days; to time travel 12 days back, set VACUUM retention to >=12 days (e.g., 'delta.deletedFileRetentionDuration' = '12 days')."
  },
  {
    "module": 2,
    "text": "When partitioning a Delta table by a date column, which practice yields the best query performance for range queries on recent data?",
    "options": [
      "Partition by year only",
      "Partition by year‑month‑day",
      "No partitioning; rely on file size",
      "Partition by a high‑cardinality string"
    ],
    "correct": 1,
    "explanation": "Partitioning by year-month-day (e.g., 2025-01-15) allows efficient pruning for queries filtering on specific dates or date ranges. Year only is too coarse. No partitioning may scan more data. High cardinality string creates too many small files."
  },
  {
    "module": 2,
    "text": "You need to merge incremental updates from a staging Delta table into a production Delta table. Which Delta command guarantees idempotency?",
    "options": [
      "MERGE INTO target USING source ON ... WHEN MATCHED THEN UPDATE ... WHEN NOT MATCHED THEN INSERT ...",
      "INSERT OVERWRITE target SELECT * FROM source",
      "UPDATE target SET ... FROM source",
      "APPEND mode in Spark write"
    ],
    "correct": 0,
    "explanation": "MERGE is idempotent; running it multiple times with the same source produces the same final state. INSERT OVERWRITE replaces all data, not idempotent for incremental. UPDATE only updates existing rows, ignoring new ones. APPEND mode would duplicate rows."
  },
  {
    "module": 2,
    "text": "Which of the following is NOT a valid reason to use the gold layer in a Medallion architecture?",
    "options": [
      "To store curated, business‑ready data",
      "To hold raw, unvalidated data",
      "To provide fast query performance for reporting",
      "To enforce schema and data quality"
    ],
    "correct": 1,
    "explanation": "The gold layer contains business‑ready, aggregated, curated data. Raw, unvalidated data belongs in the bronze layer, not gold."
  },
  {
    "module": 2,
    "text": "You have a Delta table with a large number of columns but only a few are used in most queries. Which optimization can reduce I/O?",
    "options": [
      "Create a columnstore index",
      "Enable V-Order write-time optimization",
      "Set file format to CSV",
      "Disable transaction log"
    ],
    "correct": 1,
    "explanation": "V-Order is a write-time optimization that reorders Parquet data so that the VertiScan engine can skip irrelevant columns more efficiently, reducing I/O. Columnstore index is not a Delta feature. CSV is not columnar. Disabling transaction log is not recommended."
  },
  {
    "module": 2,
    "text": "What happens to the underlying data when you DROP a managed table vs an external table in a Fabric lakehouse?",
    "options": [
      "Both drop the data because all tables own their data",
      "Managed table data stays in OneLake; external table data is deleted",
      "Managed table data is deleted from OneLake; external table data remains in the external location",
      "Neither drops any data; only metadata is removed"
    ],
    "correct": 2,
    "explanation": "Dropping a managed table deletes both the metadata and the underlying data files from OneLake. Dropping an external table removes only the metadata reference; the data files remain in the external location."
  },
  {
    "module": 2,
    "text": "You need to move data from a bronze Delta table to silver while applying schema enforcement. Which tool provides the most straightforward solution?",
    "options": [
      "Dataflow Gen2 with schema mapping",
      "Spark notebook with DataFrame API",
      "Pipeline Copy Data activity",
      "Activator"
    ],
    "correct": 0,
    "explanation": "Dataflow Gen2 provides a visual interface with schema mapping and data type enforcement, making it straightforward for bronze to silver transformations with schema enforcement. Spark notebooks are more code‑intensive. Copy Data has limited schema enforcement. Activator is for real‑time rules."
  },
  {
    "module": 2,
    "text": "Which command can be used to retrieve a specific version of a Delta table as of 3 hours ago?",
    "options": [
      "SELECT * FROM table VERSION AS OF 3",
      "SELECT * FROM table TIMESTAMP AS OF ...",
      "SELECT * FROM table AS OF TIME 3h",
      "SELECT * FROM table AT VERSION 3"
    ],
    "correct": 1,
    "explanation": "The standard Delta time travel syntax is `SELECT * FROM table TIMESTAMP AS OF '...'`. VERSION AS OF uses version number. The other options are invalid."
  },
  {
    "module": 2,
    "text": "A Delta table has 50 GB of data and you run OPTIMIZE. What is the primary benefit?",
    "options": [
      "Reduced storage cost due to compression",
      "Faster queries due to fewer small files",
      "Automatic schema evolution",
      "Improved time travel range"
    ],
    "correct": 1,
    "explanation": "OPTIMIZE compacts small files into larger ones, reducing file count and improving read query performance. It may slightly increase storage due to rewriting, not reduce it. Schema evolution and time travel are separate features."
  },
  {
    "module": 2,
    "text": "You have a Delta table with VACUUM retention set to 7 days. You run VACUUM on day 10. Which versions can still be time-traveled?",
    "options": [
      "Only the current version",
      "Versions from day 3 to day 10",
      "Versions from day 3 onward (last 7 days)",
      "All versions since table creation"
    ],
    "correct": 2,
    "explanation": "VACUUM removes files older than the retention period (7 days). On day 10, files from day 3 and earlier are removed. Versions from the last 7 days (day 3 to 10) remain accessible for time travel."
  },
  {
    "module": 2,
    "text": "Which operation in Delta Lake requires rewriting the entire Parquet file containing the affected rows?",
    "options": [
      "UPDATE",
      "INSERT",
      "SELECT",
      "DROP TABLE"
    ],
    "correct": 0,
    "explanation": "UPDATE in Delta Lake requires rewriting the Parquet files that contain the rows being updated because Parquet files are immutable. INSERT appends new files, SELECT reads, DROP TABLE removes metadata."
  },
  {
    "module": 2,
    "text": "A lakehouse has a shortcut to an external ADLS Gen2 container. A user deletes the shortcut. What happens to the external data?",
    "options": [
      "The external data is also deleted",
      "The external data is moved to OneLake",
      "The external data remains unchanged",
      "The shortcut enters a soft-delete state for 30 days"
    ],
    "correct": 2,
    "explanation": "A shortcut is just a reference (metadata). Deleting the shortcut removes the reference only; the external data in ADLS Gen2 remains completely unchanged and accessible via other means."
  },
  {
    "module": 2,
    "text": "You have a medallion architecture with Bronze, Silver, and Gold layers. Where should you apply data quality rules such as \"email address must be valid\"?",
    "options": [
      "Only in Bronze during ingestion",
      "Only in Gold before reporting",
      "In Silver during validation and cleansing",
      "At each layer independently"
    ],
    "correct": 2,
    "explanation": "Silver layer is where data is validated, cleansed, and standardized. Data quality rules like email validation belong in Silver. Bronze stores raw data, Gold stores aggregated business-ready data."
  },
  {
    "module": 2,
    "text": "Which of the following is NOT a valid way to create a shortcut in a lakehouse?",
    "options": [
      "To another lakehouse table",
      "To an external ADLS Gen2 container",
      "To an AWS S3 bucket",
      "To a row in a specific Delta table"
    ],
    "correct": 3,
    "explanation": "Shortcuts can point to folders, containers, or tables, but not to individual rows. They operate at the file/folder/table level, not row granularity."
  },
  {
    "module": 2,
    "text": "A Delta table has the property `delta.appendOnly = true`. Which operation will fail?",
    "options": [
      "INSERT",
      "MERGE with only inserts",
      "UPDATE",
      "SELECT"
    ],
    "correct": 2,
    "explanation": "appendOnly = true allows only insert operations (including MERGE that only inserts). UPDATE and DELETE are prohibited because they modify or remove existing data."
  },
  {
    "module": 2,
    "text": "You run `DESCRIBE HISTORY myDeltaTable`. Which information is NOT included in the output?",
    "options": [
      "Version number",
      "Operation type (e.g., WRITE, UPDATE)",
      "User who performed the operation",
      "Physical file paths of Parquet files"
    ],
    "correct": 3,
    "explanation": "DESCRIBE HISTORY shows version, timestamp, operation, operation parameters, user ID, and other metadata, but not the specific Parquet file paths. Use DESCRIBE DETAIL or DeltaTable API for file listings."
  },
  {
    "module": 2,
    "text": "Which Fabric feature allows you to query Delta tables from a warehouse without copying data?",
    "options": [
      "Shortcuts",
      "Cross-database queries (three-part naming)",
      "Dataflows Gen2",
      "COPY INTO"
    ],
    "correct": 1,
    "explanation": "Three-part naming (database.schema.table) allows cross-database queries within the same workspace, so a warehouse can directly query a lakehouse Delta table without copying data."
  },
  {
    "module": 2,
    "text": "You have a Delta table partitioned by `event_date`. A query filters on `event_date = '2025-01-01' AND product_id = 123`. How does partition pruning help?",
    "options": [
      "It scans only the partition for 2025-01-01, then filters by product_id",
      "It builds an index on product_id",
      "It scans all partitions but skips rows with product_id 123",
      "It rewrites the query to avoid scanning Parquet files"
    ],
    "correct": 0,
    "explanation": "Partition pruning eliminates all partitions except the one matching '2025-01-01', then the product_id filter is applied to the remaining data. This dramatically reduces I/O."
  },
  {
    "module": 2,
    "text": "Which of the following describes a shortcut in a Fabric lakehouse?",
    "options": [
      "A physical copy of external data stored in OneLake",
      "A metadata reference to data in another location without copying",
      "A compressed version of Delta table files",
      "A temporary link that expires after 30 days"
    ],
    "correct": 1,
    "explanation": "A shortcut is a zero‑copy metadata reference to data stored externally (e.g., ADLS Gen2, AWS S3) or in another lakehouse. It appears as local data but no data movement occurs until read."
  },
  {
    "module": 2,
    "text": "What does ZORDER BY do when used with OPTIMIZE on a Delta table?",
    "options": [
      "It sorts the entire table by the specified columns",
      "It co-locates related data from the specified columns within files to improve data skipping",
      "It compresses the specified columns to reduce storage",
      "It creates an index on the specified columns"
    ],
    "correct": 1,
    "explanation": "ZORDER BY co-locates related column values within Parquet files, so queries with filters on those columns can skip more files. It does not sort the entire table, compress columns, or create a traditional index."
  },
  {
    "module": 2,
    "text": "Which of the following describes the transaction log in Delta Lake?",
    "options": [
      "A JSON file stored in the `_delta_log` folder that records every change to the table",
      "A Parquet file that stores the current table schema",
      "A system table that logs user access history",
      "A copy of the entire table for disaster recovery"
    ],
    "correct": 0,
    "explanation": "The Delta transaction log is a series of JSON files in the `_delta_log` directory. Each file records atomic changes (add/remove files, schema updates, etc.) and is the source of truth for ACID properties and time travel."
  },
  {
    "module": 2,
    "text": "Which of the following describes the Silver layer in a Medallion architecture?",
    "options": [
      "Raw, unaltered data as ingested",
      "Validated, cleansed, and standardized data serving as the central repository",
      "Aggregated, business‑ready data for reporting",
      "Data stored only in KQL databases for real‑time queries"
    ],
    "correct": 1,
    "explanation": "The Silver layer contains data that has been validated, deduplicated, type‑cast, and enriched with basic business logic. It is the authoritative source for cleaned data before aggregation into Gold."
  },
  {
    "module": 2,
    "text": "A lakehouse stores data in two main folders. Which of the following describes the Tables folder?",
    "options": [
      "Stores raw files in any format for staging before transformation",
      "Stores Delta Lake tables that support SQL queries, ACID transactions, and schema enforcement",
      "Stores only CSV and JSON files for ad-hoc analysis",
      "Stores compressed Parquet files with no schema enforcement"
    ],
    "correct": 1,
    "explanation": "The Tables folder contains Delta Lake tables that provide structured, queryable data with ACID transactions, schema enforcement, and SQL access through the SQL analytics endpoint. The Files folder stores raw or semi-structured data in native formats without schema enforcement."
  },
  {
    "module": 2,
    "text": "Which of the following is true about OptimizeWrite in Microsoft Fabric?",
    "options": [
      "It is disabled by default and must be enabled per table",
      "It reduces the number of small files by writing fewer, larger files at write time",
      "It removes old Parquet files no longer referenced by the transaction log",
      "It reorganizes data within Parquet files to accelerate read performance"
    ],
    "correct": 1,
    "explanation": "OptimizeWrite reduces the number of small files by consolidating data into fewer, larger Parquet files as they are written. It is enabled by default in Fabric. VACUUM removes old files. V-Order reorganizes data within files for faster reads."
  },
  {
    "module": 2,
    "text": "You need to query a Delta table in a lakehouse from a different workspace. Which syntax allows this?",
    "options": [
      "Two-part naming: lakehouse.table",
      "Three-part naming: lakehouse.schema.table",
      "Four-part naming: workspace.lakehouse.schema.table",
      "Use COPY INTO with the target workspace path"
    ],
    "correct": 2,
    "explanation": "Cross-workspace queries use four-part naming: workspace.lakehouse.schema.table. Three-part naming works within the same workspace only. COPY INTO loads files, it does not query tables. Schema-enabled lakehouses support this pattern."
  },
  {
    "module": 2,
    "text": "You are designing a medallion architecture and need to choose between Dataflows Gen2 and a Spark notebook for moving data from silver to gold. Which statement correctly distinguishes them?",
    "options": [
      "Dataflows Gen2 are for orchestration; notebooks are for transformation",
      "Dataflows Gen2 are best for complex transformations on large datasets; notebooks are for simple semantic models",
      "Dataflows Gen2 are suited for simpler transformations with Power Query; notebooks are better for complex transformations on large datasets",
      "There is no difference; both are interchangeable"
    ],
    "correct": 2,
    "explanation": "Dataflows Gen2 use the Power Query interface and are well-suited for simpler transformations and smaller datasets. Spark notebooks provide programmatic control (PySpark/SQL) and are better for complex transformations on large datasets. Pipelines handle orchestration, not Dataflows alone."
  },
  {
    "module": 2,
    "text": "Which Spark optimization in Microsoft Fabric uses a vectorized processing engine to run operations directly on lakehouse infrastructure?",
    "options": [
      "V-Order",
      "OptimizeWrite",
      "The native execution engine",
      "High concurrency mode"
    ],
    "correct": 2,
    "explanation": "The native execution engine is a vectorized processing engine that runs Spark operations directly on lakehouse infrastructure, significantly improving query performance on large Parquet or Delta datasets. V-Order and OptimizeWrite are write-time optimizations. High concurrency mode shares Spark sessions across users."
  }
  ];
  
  if (typeof window.__dp700 === 'undefined') {
    window.__dp700 = { modules: [], questions: [] };
  }
  
  window.__dp700.questions = window.__dp700.questions.concat(questions);
  
  if (window.__dp700.modules.length < 2) {
    window.__dp700.modules[1] = "Module 2: Lakehouse, Delta & Medallion";
  }
})();



