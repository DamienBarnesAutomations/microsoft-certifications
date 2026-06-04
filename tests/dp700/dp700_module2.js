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
    "explanation": "The SQL analytics endpoint provides a read-only Tâ€‘SQL interface to Delta tables in a lakehouse and supports Tâ€‘SQL security features such as rowâ€‘level security. The lakehouse explorer does not support Tâ€‘SQL. Notebooks use Spark SQL, not Tâ€‘SQL. Direct Lake mode is for Power BI reporting, not adâ€‘hoc Tâ€‘SQL queries with RLS."
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
    "explanation": "Bronze to silver transformations typically involve complex data cleansing, schema enforcement, and validation, for which Spark notebooks are ideal. Realâ€‘Time Dashboards are for visualization. Direct Lake semantic models are for reporting. KQL Querysets query KQL databases, not batch transform JSON files."
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
    "explanation": "Within the same workspace, Fabric supports crossâ€‘database queries using threeâ€‘part naming: database.schema.table. This allows a warehouse to directly reference a lakehouse table. OPENROWSET is for external files. Linked servers are not used in Fabric. COPY INTO is for loading from files, not from a lakehouse table directly."
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
    "explanation": "Bronze layer is the raw, unaltered data as ingested. Silver is cleaned/validated. Gold is businessâ€‘ready. Bronze can be stored in various formats, not only KQL."
  },
  {
    "text": "You have a Delta table in a lakehouse. You want to update specific rows. Which Delta API method should you use?",
    "options": [
      "update()",
      "delete()",
      "merge()",
      "All of the above"
    ],
    "correct": 3,
    "module": 2,
    "explanation": "All three methods can be used to update specific rows: update() changes rows matching a condition, delete() removes rows, and merge() upserts. Depending on the requirement, any may be appropriate. The question asks 'which method should you use' â€“ all are valid for updating specific rows (merge is common for upserts)."
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
    "explanation": "Partitioning improves performance for large tables when filtering on the partition column, but it can degrade performance for small tables or highâ€‘cardinality columns (too many small files). Partitioning is supported for Delta tables and does not require premium capacity."
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
    "explanation": "Vâ€‘Order is a writeâ€‘time optimization that reorders data to accelerate read performance (Vertiâ€‘Scan) with about 15% overhead on writes. It is not encryption, compression, or version control."
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
    "text": "A bronze Delta table has millions of small files. Which command will improve read performance the most?",
    "options": [
      "VACUUM",
      "OPTIMIZE",
      "REPAIR",
      "DESCRIBE HISTORY"
    ],
    "correct": 1,
    "explanation": "OPTIMIZE compacts small files into larger ones, reducing file count and improving read performance. VACUUM removes old files, REPAIR is not a Delta command, DESCRIBE HISTORY shows log."
  },
  {
    "module": 2,
    "text": "You must ensure a Delta table can be timeâ€‘travelled to a point 12 days ago. Which setting must you adjust?",
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
      "Partition by yearâ€‘monthâ€‘day",
      "No partitioning; rely on file size",
      "Partition by a highâ€‘cardinality string"
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
      "To store curated, businessâ€‘ready data",
      "To hold raw, unvalidated data",
      "To provide fast query performance for reporting",
      "To enforce schema and data quality"
    ],
    "correct": 1,
    "explanation": "The gold layer contains businessâ€‘ready, aggregated, curated data. Raw, unvalidated data belongs in the bronze layer, not gold."
  },
  {
    "module": 2,
    "text": "You have a Delta table with a large number of columns but only a few are used in most queries. Which optimization can reduce I/O?",
    "options": [
      "Create a columnstore index",
      "Enable Vâ€‘Order on frequently accessed columns",
      "Set file format to CSV",
      "Disable transaction log"
    ],
    "correct": 1,
    "explanation": "Vâ€‘Order organizes data to improve column pruning and read performance, reducing I/O by skipping irrelevant columns. Columnstore index is not a Delta feature. CSV is not columnar. Disabling transaction log is not recommended."
  },
  {
    "module": 2,
    "text": "A lakehouse contains both managed and external Delta tables. Which statement best describes the difference?",
    "options": [
      "Managed tables store data in OneLake; external tables reference data outside OneLake.",
      "Managed tables support ACID; external tables do not.",
      "Managed tables can only be created via notebooks; external tables via pipelines.",
      "There is no functional difference."
    ],
    "correct": 0,
    "explanation": "Managed tables store data in the lakehouse's Tables folder (OneLake). External tables reference data elsewhere (e.g., Files folder or external storage). Both support ACID if Delta. Creation methods are not exclusive."
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
    "explanation": "Dataflow Gen2 provides a visual interface with schema mapping and data type enforcement, making it straightforward for bronze to silver transformations with schema enforcement. Spark notebooks are more codeâ€‘intensive. Copy Data has limited schema enforcement. Activator is for realâ€‘time rules."
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
    "explanation": "A shortcut is a zeroâ€‘copy metadata reference to data stored externally (e.g., ADLS Gen2, AWS S3) or in another lakehouse. It appears as local data but no data movement occurs until read."
  },
  {
    "module": 2,
    "text": "Which of the following describes Vâ€‘Order optimization for Delta tables?",
    "options": [
      "A writeâ€‘time optimization that reorders Parquet data to accelerate read performance with about 15% write overhead",
      "A compression algorithm that reduces storage by 50%",
      "An indexing feature for highâ€‘cardinality columns",
      "A method to encrypt data at rest"
    ],
    "correct": 0,
    "explanation": "Vâ€‘Order reorganizes data within Parquet files at write time to enable faster scanning (Vertiâ€‘Scan) by Fabric engines. It adds approximately 15% overhead to writes but significantly improves read performance."
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
      "Aggregated, businessâ€‘ready data for reporting",
      "Data stored only in KQL databases for realâ€‘time queries"
    ],
    "correct": 1,
    "explanation": "The Silver layer contains data that has been validated, deduplicated, typeâ€‘cast, and enriched with basic business logic. It is the authoritative source for cleaned data before aggregation into Gold."
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



