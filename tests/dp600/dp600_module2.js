// Module 2: Data Storage & Transformation
(function() {
  var questions = [
    {
      "id": "dp600-2-001",
      "text": "You are building a Dataflow Gen2 that merges data from two different source systems. You notice that query folding is not occurring for the merge step. What is the MOST LIKELY reason?",
      "options": [
        "The dataflow uses the Modern Query Evaluator",
        "The merge is performed after a filter step",
        "The merge uses an INNER JOIN instead of a LEFT JOIN",
        "The two sources are from different data source types"
      ],
      "correct": 3,
      "module": 2,
      "explanation": "Query folding (pushing operations back to the source) generally works only when both sides of a merge come from the same source system. If the two sources are different types (e.g., SQL Server and SharePoint), folding cannot occur because no single source can execute the join. The join type or order of steps does not inherently break folding across different sources."
    },
    {
      "id": "dp600-2-002",
      "text": "A nightly Spark notebook recomputes a result table from a join of two source tables and writes it to a Delta table. The table is fully derived from the sources, and a rerun must leave exactly the current result with no duplicates. Which write mode should you use?",
      "options": [
        "ignore, so that the write is skipped when the target table already exists",
        "overwrite, so that each run replaces the table with the recomputed result",
        "append, so that each run adds the new result and keeps earlier output",
        "errorifexists, so that the write fails if the target table already exists"
      ],
      "correct": 1,
      "module": 2,
      "explanation": "overwrite replaces the table contents with the full recomputed result, so reruns produce the same table. append would add duplicate rows on every run. ignore silently skips the write once the table exists, so the result goes stale. errorifexists makes every run after the first fail. MERGE is the right choice for incremental upserts, not for a full recompute."
    },
    {
      "id": "dp600-2-003",
      "text": "A Dataflow Gen2 uses incremental refresh with a daily bucket size and 'UpdatedTimestamp' as the column used to detect changes. A source row that was loaded 3 days ago is updated in the source. What happens on the next refresh?",
      "options": [
        "A second copy of the row is appended, leaving the old version in the destination",
        "The existing row in the destination is updated in place by a row-level merge",
        "The bucket containing the row is detected as changed and replaced in the destination",
        "The change is ignored because buckets older than one day are never reprocessed"
      ],
      "correct": 2,
      "module": 2,
      "explanation": "Dataflow Gen2 incremental refresh works on time buckets. If the maximum value of the change-detection column in a bucket has changed, the dataflow reprocesses that bucket and replaces its data in the destination. It does not merge individual rows, and replacement avoids duplicates. Buckets inside the configured refresh window are evaluated on every run."
    },
    {
      "id": "dp600-2-004",
      "text": "A data pipeline must load only rows added or changed since the previous run from an Azure SQL Database table that has a LastModified column into a lakehouse. Which pattern should you use?",
      "options": [
        "Keep a watermark: Lookup reads it, Copy filters on it, then the new value is saved",
        "Use a Get Metadata activity to list the individual rows that changed in the source table",
        "Run a ForEach activity that copies each source row individually and compares it to the destination",
        "Run a Copy activity that overwrites the whole destination table on every pipeline run"
      ],
      "correct": 0,
      "module": 2,
      "explanation": "The watermark pattern keeps the last processed LastModified value. A Lookup activity reads it, the Copy activity source query filters rows greater than the watermark, and a final step stores the new maximum value. Full overwrite reloads everything, Get Metadata returns item metadata rather than changed rows, and row-by-row copying is slow and unnecessary."
    },
    {
      "id": "dp600-2-005",
      "text": "You are designing a dimensional model for a retail analytics solution. You have a DimCustomer table with SCD Type 2 tracking. A customer changes their address. How should you model this change?",
      "options": [
        "Create a new DimCustomerAddress table and link it to the fact table",
        "Add a new column DimCustomer[Address2] to store the new address",
        "Insert a new row with the new address, set the old row's EndDate and IsCurrent flag, and set the new row's StartDate and IsCurrent flag",
        "Update the existing row with the new address and set the previous address to NULL"
      ],
      "correct": 2,
      "module": 2,
      "explanation": "SCD Type 2 preserves history by inserting a new row for each change. The old row is flagged as not current (IsCurrent = FALSE) and given an EndDate. The new row gets a StartDate and IsCurrent = TRUE. This allows historical reporting on the address at the time of a fact. The other options either lose history (update) or are not SCD Type 2 patterns."
    },
    {
      "id": "dp600-2-006",
      "text": "You have a Dataflow Gen2 that sources data from an on-premises SQL Server. The dataflow takes a long time to refresh. You discover that query folding is not occurring. Which transformation is MOST LIKELY causing the folding to break?",
      "options": [
        "Adding a custom column that concatenates first and last names",
        "Selecting specific columns from the source table",
        "Sorting the data by a numeric column",
        "Filtering rows based on a date column"
      ],
      "correct": 0,
      "module": 2,
      "explanation": "Custom columns added using Power Query expressions (e.g., Text.Combine) generally break query folding because the source (SQL Server) cannot translate that expression. Filtering, selecting columns, and sorting can be folded back to SQL. Adding a custom column forces the remaining steps to be evaluated in Power Query's engine."
    },
    {
      "id": "dp600-2-007",
      "text": "You have a lakehouse with a Delta table. You need to optimize the file sizes for better query performance. The table currently has thousands of small files. Which command should you run?",
      "options": [
        "ANALYZE table_name",
        "VACUUM table_name",
        "REPAIR table_name",
        "OPTIMIZE table_name"
      ],
      "correct": 3,
      "module": 2,
      "explanation": "The OPTIMIZE command (Delta Lake) compacts small files into larger ones (default 1 GB). This improves query performance by reducing the number of files to scan. VACUUM removes old files no longer referenced, REPAIR updates partition metadata, ANALYZE collects statistics."
    },
    {
      "id": "dp600-2-008",
      "text": "You have a Fabric warehouse with a stored procedure that performs an INSERT, UPDATE, and DELETE operation. You need to ensure that if any operation fails, all changes are rolled back. What should you include in the stored procedure?",
      "options": [
        "Use SET NOCOUNT ON to prevent partial results",
        "Add COMMIT after each individual operation",
        "Use IF @@ERROR <> 0 RETURN to check for errors",
        "SET XACT_ABORT ON and wrap all operations in a TRY...CATCH block with ROLLBACK TRANSACTION"
      ],
      "correct": 3,
      "module": 2,
      "explanation": "To ensure atomicity (all or nothing), use an explicit transaction. SET XACT_ABORT ON ensures that any error rolls back the transaction. Wrap the operations in BEGIN TRAN and COMMIT, and include a TRY...CATCH with ROLLBACK on error. The other options do not provide transactional rollback."
    },
    {
      "id": "dp600-2-009",
      "text": "A Dataflow Gen2 ingests several large files from Azure Data Lake Storage Gen2 into a lakehouse with only light transformations, and refresh is slow. Which Dataflow Gen2 feature speeds up ingestion by using the Copy activity engine?",
      "options": [
        "Fast copy",
        "Query folding",
        "Table.Buffer",
        "Incremental refresh"
      ],
      "correct": 0,
      "module": 2,
      "explanation": "Fast copy lets Dataflow Gen2 ingest large volumes from supported sources by using the same high-throughput engine as the pipeline Copy activity. Table.Buffer caches a table in memory, incremental refresh limits what is reloaded, and query folding pushes work to the source system rather than changing the ingestion engine."
    },
    {
      "id": "dp600-2-010",
      "text": "You have a Dataflow Gen2 that uses Table.Buffer to improve performance. You notice that the dataflow now takes longer to refresh. What is the MOST LIKELY reason?",
      "options": [
        "Table.Buffer is not supported in Dataflows Gen2",
        "Table.Buffer increases memory usage and can cause performance degradation",
        "Table.Buffer prevents query folding, which may reduce performance",
        "Table.Buffer only works with Excel sources"
      ],
      "correct": 2,
      "module": 2,
      "explanation": "Table.Buffer materializes the data in memory, which can break query folding. Once folding is broken, subsequent transformations are performed by Power Query instead of being pushed to the source, often resulting in slower performance. Table.Buffer is supported, but its misuse can degrade performance."
    },
    {
      "id": "dp600-2-011",
      "text": "An analyst needs to query a Fabric warehouse table dbo.Sales as it existed at 2025-03-01T09:00:00 UTC, without restoring or cloning it. Which T-SQL should they run?",
      "options": [
        "SELECT * FROM dbo.Sales TIMESTAMP AS OF '2025-03-01T09:00:00'",
        "SELECT * FROM dbo.Sales OPTION (FOR TIMESTAMP AS OF '2025-03-01T09:00:00')",
        "SELECT * FROM dbo.Sales VERSION AS OF 3",
        "SELECT * FROM dbo.Sales FOR SYSTEM_TIME AS OF '2025-03-01T09:00:00'"
      ],
      "correct": 1,
      "module": 2,
      "explanation": "Fabric Warehouse supports statement-level time travel with the OPTION (FOR TIMESTAMP AS OF '<UTC timestamp>') query hint, within the configured retention period. FOR SYSTEM_TIME AS OF is temporal-table syntax and is not used here. VERSION AS OF and TIMESTAMP AS OF are Spark SQL Delta syntax, not T-SQL."
    },
    {
      "id": "dp600-2-012",
      "text": "Queries on a 500-million-row Fabric warehouse table filter and join on a column and run slowly because of poor cardinality estimates. Which action is supported and appropriate?",
      "options": [
        "Create a nonclustered B-tree index on the filtered column",
        "Add a FORCESEEK table hint to every query that touches the table",
        "Create statistics on the filtered and joined columns and update them after loads",
        "Create a hash-distributed copy of the table on the filtered column"
      ],
      "correct": 2,
      "module": 2,
      "explanation": "Fabric Warehouse does not support user-created B-tree indexes or hash distribution. Statistics on columns used in predicates and joins help the optimizer choose good plans. Fabric creates them automatically, and you can also create and update them manually (CREATE STATISTICS, UPDATE STATISTICS). Hints cannot compensate for missing statistics."
    },
    {
      "id": "dp600-2-013",
      "text": "A Dataflow Gen2 reads a REST API response in which a column holds a list (JSON array) of values per record. You need one output row per list element. Which M function does the 'Expand to New Rows' step use?",
      "options": [
        "Table.ExpandRecordColumn",
        "Json.Document",
        "Table.Transpose",
        "Table.ExpandListColumn"
      ],
      "correct": 3,
      "module": 2,
      "explanation": "A JSON array becomes a List column in Power Query. Table.ExpandListColumn (Expand to New Rows) produces one row per list element. Table.ExpandRecordColumn expands record fields into columns rather than rows, Json.Document only parses JSON text, and Table.Transpose swaps rows and columns."
    },
    {
      "id": "dp600-2-014",
      "text": "You have a Fabric lakehouse with a Delta table. You need to partition the table by year and month to improve query performance. The table currently has no partitions. What is the correct approach?",
      "options": [
        "Partitioning is automatically applied to Delta tables based on file size",
        "Use the OPTIMIZE command with partitioning options",
        "Use ALTER TABLE to add partitioning on the date columns",
        "Create a new table with partitioning and use INSERT OVERWRITE to copy the data"
      ],
      "correct": 3,
      "module": 2,
      "explanation": "In Delta Lake, you cannot add partitions to an existing table using ALTER TABLE. You must create a new partitioned table (using PARTITIONED BY) and then insert the data from the old table using INSERT OVERWRITE or a similar command. OPTIMIZE compacts files but does not add partitions."
    },
    {
      "id": "dp600-2-015",
      "text": "A Fabric warehouse stored procedure loops over rows in a staging table with a WHILE loop and updates the target table one row at a time. It runs too slowly. What should you do?",
      "options": [
        "Add SET NOCOUNT ON at the top of the procedure to suppress row-count messages",
        "Replace the loop with a set-based UPDATE ... FROM join plus an INSERT ... SELECT",
        "Copy the staging rows to a temp table and run the WHILE loop over that table",
        "Wrap the whole WHILE loop in a single explicit transaction to reduce commit overhead"
      ],
      "correct": 1,
      "module": 2,
      "explanation": "Row-by-row processing is slow in a distributed warehouse engine. Rewrite the logic as set-based statements that process all rows in one operation. A transaction, NOCOUNT or looping over a temp table do not remove the per-row overhead."
    },
    {
      "id": "dp600-2-016",
      "text": "You have a Dataflow Gen2 that uses parameterized queries to filter data from a SQL Server source. You need to ensure that the parameter values are passed to the source query for optimal performance. Which approach should you use?",
      "options": [
        "Filter the data in Power Query after loading all data from the source",
        "Create a separate dataflow for each parameter value",
        "Use the parameter directly in the source query and ensure query folding occurs",
        "Use a function to dynamically generate the query based on parameters"
      ],
      "correct": 2,
      "module": 2,
      "explanation": "To achieve source-side filtering, you must incorporate the parameter into the native SQL query (e.g., using Value.NativeQuery with parameters) and ensure query folding (i.e., the entire query is pushed to SQL Server). Filtering after load defeats performance. Dynamically generating strings may work but is more error-prone; the direct parameterized query is the recommended practice."
    },
    {
      "id": "dp600-2-017",
      "text": "You have a Fabric lakehouse with a Delta table. You need to perform a merge operation that updates existing rows and inserts new rows based on a key column. Which command should you use?",
      "options": [
        "MERGE INTO target USING source ON target.key = source.key WHEN MATCHED THEN UPDATE ... WHEN NOT MATCHED THEN INSERT ...",
        "INSERT OVERWRITE INTO target SELECT * FROM source",
        "UPDATE target SET ... FROM target INNER JOIN source ON target.key = source.key",
        "INSERT INTO ... SELECT ... ON DUPLICATE KEY UPDATE"
      ],
      "correct": 0,
      "module": 2,
      "explanation": "The MERGE command in Spark SQL (and supported in Fabric lakehouse Spark) allows you to update existing rows and insert new rows in one operation. This is the standard upsert pattern for Delta tables. The other options are either not valid (ON DUPLICATE KEY is MySQL) or do not handle both update and insert."
    },
    {
      "id": "dp600-2-018",
      "text": "You must refresh a Dataflow Gen2 only after a Copy data activity has loaded a staging table, and send an email if the refresh fails. Which approach should you use?",
      "options": [
        "Add a Dataflow activity after the Copy activity in a pipeline, with an email activity on failure",
        "Set a separate scheduled refresh on the dataflow slightly later than the pipeline run time",
        "Publish the dataflow to an Eventstream that triggers when the copy has completed",
        "Add the dataflow to the refresh schedule of a downstream Power BI semantic model"
      ],
      "correct": 0,
      "module": 2,
      "explanation": "A data pipeline can orchestrate the Copy activity and then run the Dataflow activity on success, with an On fail path to an Office 365 Outlook or Teams activity. A separate schedule gives no dependency guarantee, and semantic model schedules and Eventstreams are not orchestration tools for dataflow refresh."
    },
    {
      "id": "dp600-2-019",
      "text": "A Spark notebook joins a 2 TB fact table with a 5 MB dimension table on an equality key (inner join). The default spark.sql.autoBroadcastJoinThreshold is 10 MB. Which strategy gives the best performance?",
      "options": [
        "Sort-merge join, shuffling and sorting both tables",
        "Broadcast hash join, sending the dimension table to every executor",
        "Shuffle hash join, shuffling both tables by key",
        "Cartesian product join followed by a filter"
      ],
      "correct": 1,
      "module": 2,
      "explanation": "The dimension table is below the default 10 MB broadcast threshold, so Spark can broadcast it and avoid shuffling the 2 TB fact table. You can also force it with the broadcast() hint. Sort-merge and shuffle hash joins shuffle both sides, and a Cartesian product is far more expensive."
    },
    {
      "id": "dp600-2-020",
      "text": "What does enabling staging on a Dataflow Gen2 query do?",
      "options": [
        "It writes query results to system-managed staging items in the workspace, so a SQL engine can process later steps",
        "It sends the query results to an Eventhouse database so they can be analyzed with KQL",
        "It caches the query results in the memory of the on-premises data gateway between runs",
        "It stores the query results as files in the Files folder of the user's default lakehouse"
      ],
      "correct": 0,
      "module": 2,
      "explanation": "With staging enabled, Dataflow Gen2 stores query output in system-managed staging items (a lakehouse and a warehouse) in the workspace. Later queries can then be computed by the SQL engine over the staged data, which can speed up heavy transformations. It does not use the default lakehouse, gateway memory or an Eventhouse."
    },
    {
      "id": "dp600-2-021",
      "text": "Which statement correctly describes how a Fabric warehouse optimizes storage for analytical queries?",
      "options": [
        "Tables are stored as rowstore heaps unless you choose a hash distribution column",
        "Data is stored as Delta Parquet in OneLake with V-Order applied at write by default",
        "You must create a clustered columnstore index on each table before querying it",
        "You must schedule OPTIMIZE and VACUUM commands manually for every table"
      ],
      "correct": 1,
      "module": 2,
      "explanation": "A Fabric warehouse stores data in Delta Parquet format in OneLake, with V-Order applied by default for faster reads, and the engine handles file layout and compaction automatically. Users do not create columnstore indexes or choose distributions, and they do not run OPTIMIZE or VACUUM manually."
    },
    {
      "id": "dp600-2-022",
      "text": "You have a Dataflow Gen2 that sources data from a CSV file. The file contains a header row and 1 million data rows. You need to promote the first row to headers and change the data type of a column. Which order should you apply these transformations?",
      "options": [
        "Promote headers first, then change data type",
        "The order does not matter",
        "Apply both transformations simultaneously using a custom function",
        "Change data type first, then promote headers"
      ],
      "correct": 0,
      "module": 2,
      "explanation": "You should promote headers first, because after promotion the columns have meaningful names. Then you can reference those column names when changing data types. If you change data types first, the columns are still named Column1, Column2, etc., which is less clear and could break if the file structure changes."
    },
    {
      "id": "dp600-2-023",
      "text": "You need to join tables from two different lakehouses in Spark SQL without copying the data. Which approach should you use?",
      "options": [
        "Run a scheduled COPY INTO to replicate the table into the first lakehouse",
        "Export one table to CSV files and import them into the other lakehouse",
        "Joins across lakehouses are not possible, so all tables must live in one lakehouse",
        "Create a OneLake shortcut to the second lakehouse's table and join them as local tables"
      ],
      "correct": 3,
      "module": 2,
      "explanation": "A OneLake shortcut exposes a table from another lakehouse as if it were local, with no data copy, so it can be joined directly. Export/import and COPY INTO duplicate data and must be re-run to stay current."
    },
    {
      "id": "dp600-2-024",
      "text": "In a Fabric notebook, you need to load a table from a Power BI semantic model into a DataFrame for analysis. Which approach uses semantic link?",
      "options": [
        "spark.read.format(\"delta\").load(\"SalesModel/Sales\")",
        "pandas.read_sql(\"SELECT * FROM Sales\", spark)",
        "sempy.fabric.read_table(\"SalesModel\", \"Sales\")",
        "mssparkutils.fs.ls(\"SalesModel/Sales\")"
      ],
      "correct": 2,
      "module": 2,
      "explanation": "Semantic link (the sempy library) provides sempy.fabric.read_table to read a semantic model table into a FabricDataFrame. mssparkutils.fs.ls lists files, spark.read.load reads Delta files rather than a semantic model, and pandas.read_sql needs a database connection."
    },
    {
      "id": "dp600-2-025",
      "text": "A REST API returns data in pages and each response contains a token for the next page. Which Power Query M function is typically used to loop until no token is returned?",
      "options": [
        "Json.Document",
        "List.Generate",
        "Table.FromRecords",
        "Table.Combine"
      ],
      "correct": 1,
      "module": 2,
      "explanation": "List.Generate runs an initial-state, condition and next-state loop, so it can fetch successive pages until the next-page token is empty. Table.Combine is then used to append the pages. Json.Document parses one response, and Table.FromRecords converts records to a table."
    },
    {
      "id": "dp600-2-026",
      "text": "A Spark notebook performs a full outer join between two large Delta tables on an equality key. Broadcast hash join does not support full outer joins. Which strategy does Spark use by default for this join?",
      "options": [
        "Cartesian product join",
        "Sort-merge join",
        "Broadcast hash join",
        "Broadcast nested loop join"
      ],
      "correct": 1,
      "module": 2,
      "explanation": "For equi-joins that cannot be broadcast, Spark's default is a sort-merge join, which scales to large inputs and supports full outer joins. Automatic broadcasting only applies to tables under spark.sql.autoBroadcastJoinThreshold, which defaults to 10 MB, and not to full outer joins. Cartesian and nested loop joins are far more expensive."
    },
    {
      "id": "dp600-2-027",
      "text": "A Dataflow Gen2 query uses a parameter to pick a source. You want the query to return a default value instead of failing if evaluating an expression raises an error. Which M construct should you use?",
      "options": [
        "each <expression>",
        "try <expression> otherwise <default value>",
        "let <name> = <expression> in <name>",
        "if <expression> then <value> else <default value>"
      ],
      "correct": 1,
      "module": 2,
      "explanation": "try ... otherwise evaluates an expression and returns the fallback value when it raises an error. An if expression only branches on a condition and does not catch errors. let...in defines intermediate values, and each defines a shorthand function."
    },
    {
      "id": "dp600-2-028",
      "text": "A team of SQL developers needs multi-table transactions, T-SQL stored procedures and full INSERT/UPDATE/DELETE support over structured data. Which Fabric item should they use?",
      "options": [
        "Lakehouse Files section",
        "Eventhouse",
        "Warehouse",
        "Lakehouse SQL analytics endpoint"
      ],
      "correct": 2,
      "module": 2,
      "explanation": "A Fabric warehouse supports full T-SQL DML, stored procedures and multi-table transactions. The lakehouse SQL analytics endpoint is read-only, an eventhouse is built for append-heavy time-series data queried with KQL, and the Files section holds unmanaged files."
    },
    {
      "id": "dp600-2-029",
      "text": "A Dataflow Gen2 reads a large SQL Server table, and you need to reduce the number of rows retrieved from the source. Which step should you apply early so it folds to the source?",
      "options": [
        "Add an index column",
        "Filter rows on a date column",
        "Choose only the required columns",
        "Sort by a column"
      ],
      "correct": 1,
      "module": 2,
      "explanation": "A row filter folds into the WHERE clause of the source query, so fewer rows leave the server. Choosing columns reduces width rather than rows, sorting does not reduce rows, and an index column usually breaks folding."
    },
    {
      "id": "dp600-2-030",
      "text": "In Spark SQL, you need a running total of SalesAmount per ProductID ordered by OrderDate. Which query is correct?",
      "options": [
        "SELECT *, SUM(SalesAmount) OVER (PARTITION BY ProductID) AS RunningTotal FROM Sales",
        "SELECT *, SUM(SalesAmount) OVER (PARTITION BY ProductID ORDER BY OrderDate DESC ROWS BETWEEN CURRENT ROW AND UNBOUNDED FOLLOWING) AS RunningTotal FROM Sales",
        "SELECT *, SUM(SalesAmount) OVER (PARTITION BY ProductID ORDER BY OrderDate ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS RunningTotal FROM Sales",
        "SELECT *, SUM(SalesAmount) OVER (ORDER BY OrderDate ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS RunningTotal FROM Sales"
      ],
      "correct": 2,
      "module": 2,
      "explanation": "A running total per product needs PARTITION BY to restart for each product, ORDER BY to define the sequence, and a frame from the first row to the current row. Descending order with a forward frame sums the remaining rows (a reverse running total), omitting PARTITION BY runs across all products, and omitting ORDER BY gives a fixed per-product total."
    },
    {
      "id": "dp600-2-031",
      "text": "A SQL query must return each order together with the previous order amount for the same customer. Which expression should you use?",
      "options": [
        "ROW_NUMBER() OVER (PARTITION BY CustomerId ORDER BY OrderDate)",
        "FIRST_VALUE(Amount) OVER (PARTITION BY CustomerId ORDER BY OrderDate)",
        "LEAD(Amount) OVER (PARTITION BY CustomerId ORDER BY OrderDate)",
        "LAG(Amount) OVER (PARTITION BY CustomerId ORDER BY OrderDate)"
      ],
      "correct": 3,
      "module": 2,
      "explanation": "LAG returns the value from the preceding row within the window, here the previous order for the same customer. LEAD returns the next row, FIRST_VALUE returns the first row of the partition, and ROW_NUMBER returns a sequence number rather than an amount."
    },
    {
      "id": "dp600-2-032",
      "module": 2,
      "text": "An organization uses lakehouses for data engineering, warehouses for BI reporting, and an eventhouse for real-time IoT monitoring. What allows all three stores to access data across each other without duplication?",
      "options": [
        "Dataflows Gen2 with scheduled refresh",
        "COPY INTO commands running on a schedule",
        "OneLake shortcuts and cross-database queries",
        "Spark notebooks with JDBC connectors"
      ],
      "correct": 2,
      "explanation": "All three analytical stores (lakehouse, warehouse, eventhouse) store data in OneLake. Shortcuts and cross-database queries let users reference data across stores without copying or moving it. Dataflows, COPY INTO, and JDBC connections involve data movement or duplication."
    },
    {
      "id": "dp600-2-033",
      "module": 2,
      "text": "An eventhouse ingests 100,000 IoT sensor readings per second. The operations team needs to correct some readings after ingestion. What is the expected behavior of UPDATE and DELETE operations on an eventhouse?",
      "options": [
        "They are supported only for the most recent 24 hours of data",
        "They trigger automatic rollback because eventhouses only support SELECT queries",
        "They execute with full ACID support, identical to a warehouse",
        "The eventhouse is optimized for append-only workloads and frequent UPDATE/DELETE operations are not recommended"
      ],
      "correct": 3,
      "explanation": "Eventhouses are optimized for append-heavy, time-series workloads. While some data management operations are possible, frequent UPDATE and DELETE patterns are not recommended. Use a warehouse or lakehouse for workloads that require transactional updates."
    },
    {
      "id": "dp600-2-034",
      "module": 2,
      "text": "A data science team needs to explore structured transaction data and unstructured clickstream logs using Python. The schema is not fully defined and changes frequently. Which Fabric data store should they use?",
      "options": [
        "Lakehouse, because it supports structured, semi-structured, and unstructured data with Spark notebooks",
        "SQL analytics endpoint, because it provides T-SQL access for analysts",
        "Warehouse, because it enforces schema on write for data quality",
        "Eventhouse, because it handles JSON natively with automatic indexing"
      ],
      "correct": 0,
      "explanation": "The lakehouse is the most versatile store, handling structured, semi-structured, and unstructured data with Spark notebook support (Python). The warehouse enforces schema on write and is T-SQL-only. The eventhouse is for time-series data. The SQL endpoint is read-only."
    },
    {
      "id": "dp600-2-035",
      "module": 2,
      "text": "A data modeler is designing a dimensional model for a Power BI semantic model. The dimension tables are relatively small and denormalized. Which schema type is recommended for most Fabric analytics workloads?",
      "options": [
        "Third normal form, because it eliminates all data redundancy",
        "Snowflake schema, because normalized dimensions reduce storage",
        "Star schema, because fewer joins provide faster queries and better Power BI performance",
        "Wide table with all attributes in a single table"
      ],
      "correct": 2,
      "explanation": "Star schema is the recommended approach for most Fabric analytics and Power BI workloads. It uses denormalized dimensions with a central fact table, resulting in fewer joins and faster query performance. Snowflake schemas add join complexity."
    },
    {
      "id": "dp600-2-036",
      "module": 2,
      "text": "A retail company needs to capture the state of inventory for every product at the end of each day. Which type of fact table should they use?",
      "options": [
        "Factless fact table",
        "Periodic snapshot fact table",
        "Transaction fact table",
        "Accumulating snapshot fact table"
      ],
      "correct": 1,
      "explanation": "A periodic snapshot fact table captures the state of something at regular intervals, such as end-of-day inventory levels. Transaction fact tables record individual events. Accumulating snapshots track process milestones. Factless tables capture occurrences without measures."
    },
    {
      "id": "dp600-2-037",
      "module": 2,
      "text": "A sales fact table needs to reference the date dimension three times: for Order Date, Ship Date, and Delivery Date. What is this pattern called?",
      "options": [
        "Junk dimensions",
        "Slowly changing dimensions",
        "Conformed dimensions",
        "Role-playing dimensions"
      ],
      "correct": 3,
      "explanation": "Role-playing dimensions occur when a single physical dimension table is referenced multiple times in one fact table, each representing a different context (Order Date, Ship Date, Delivery Date). Conformed dimensions are shared across fact tables. Junk dimensions consolidate small attributes."
    },
    {
      "id": "dp600-2-038",
      "module": 2,
      "text": "A Dataflow Gen2 processes a large dataset and the developer wants to use incremental refresh. Which destinations support this update method?",
      "options": [
        "Only Lakehouse destinations support incremental refresh",
        "Lakehouse, Warehouse, and Azure SQL Database",
        "Lakehouse, Warehouse, and Eventhouse",
        "All Fabric destinations support incremental refresh"
      ],
      "correct": 1,
      "explanation": "Incremental refresh in Dataflow Gen2 is supported for Fabric Lakehouse, Fabric Warehouse and Azure SQL Database destinations. It divides data into time buckets, and the only update method is replace: each changed bucket is replaced in the destination while other data is left alone. Other destinations can use a staged query but need a full refresh into the final destination."
    },
    {
      "id": "dp600-2-039",
      "module": 2,
      "text": "A developer creates a Dataflow Gen2 that transforms data but does not configure an output destination. What happens when the dataflow is published and runs?",
      "options": [
        "The dataflow automatically creates a default Lakehouse destination",
        "The dataflow fails validation because a destination is required",
        "The dataflow runs but only the first 1000 rows are processed",
        "The dataflow runs successfully and can be consumed by pipelines or Power BI as a data source"
      ],
      "correct": 3,
      "explanation": "A destination is optional in Dataflow Gen2. The dataflow runs and processes transformations, and its output can be consumed by pipelines or connected to from Power BI Desktop. This is a key distinction from pipelines, where every Copy Data activity requires a destination."
    },
    {
      "id": "dp600-2-040",
      "module": 2,
      "text": "A team needs to transform 5 TB of data using complex window functions, custom Python logic, and multi-step joins. The team is proficient in PySpark. Which transformation tool should they use?",
      "options": [
        "Eventstream with KQL transformations",
        "Spark notebooks in Fabric",
        "T-SQL stored procedures in the warehouse",
        "Dataflows Gen2 with Power Query transformations"
      ],
      "correct": 1,
      "explanation": "Spark notebooks are the right choice for complex transformations on large datasets when the team has PySpark skills. Dataflows Gen2 are better for simple-to-moderate transformations and low-code preferences. Stored procedures use T-SQL, not Python."
    },
    {
      "id": "dp600-2-041",
      "module": 2,
      "text": "A developer pins a lakehouse as the default lakehouse in a Spark notebook. How does this affect how tables are referenced in Spark SQL queries?",
      "options": [
        "It sets the Hive metastore context so tables can be referenced by name without full paths",
        "It enables V-Order optimization on all Delta tables in the lakehouse",
        "It replicates all tables to a warehouse for SQL access",
        "It creates SQL analytics endpoint views for all tables in the lakehouse"
      ],
      "correct": 0,
      "explanation": "Pinning a default lakehouse sets the Hive metastore context. Tables in that lakehouse can then be referenced by their simple name (e.g., 'SELECT * FROM sales') instead of requiring a full path. This makes code portable across environments."
    },
    {
      "id": "dp600-2-042",
      "module": 2,
      "text": "A PySpark notebook needs to run a Spark SQL query. The notebook language is set to PySpark. Which magic command should be used at the top of a code cell?",
      "options": [
        "%%sql",
        "%%local",
        "%scala",
        "%python"
      ],
      "correct": 0,
      "explanation": "The %%sql magic command switches the cell language to Spark SQL within a PySpark notebook. This allows mixing SQL and Python in the same notebook. %python would stay in Python, %scala switches to Scala, and %%local is not a Fabric magic command."
    },
    {
      "id": "dp600-2-043",
      "module": 2,
      "text": "In a Fabric Spark notebook you want new Delta tables written with V-Order, which is disabled by default in new workspaces. Which session-level setting enables it?",
      "options": [
        "spark.sql.parquet.vorder.default = true",
        "spark.sql.autoBroadcastJoinThreshold = -1",
        "spark.sql.sources.partitionOverwriteMode = dynamic",
        "spark.sql.shuffle.partitions = 200"
      ],
      "correct": 0,
      "explanation": "V-Order is a write-time Parquet optimization for faster reads. In new workspaces it is off by default, and you can turn it on for a session with spark.sql.parquet.vorder.default=true (or through the workspace resource profile). The other settings control shuffle partitions, broadcasting and partition overwrite behavior."
    },
    {
      "id": "dp600-2-044",
      "module": 2,
      "text": "A developer needs to test a transformation on a 500 GB table without duplicating storage. Which Fabric warehouse feature should they use?",
      "options": [
        "INSERT INTO ... SELECT with TOP 0",
        "CREATE TABLE AS SELECT (CTAS)",
        "CREATE TABLE ... AS CLONE OF",
        "COPY INTO with a new table name"
      ],
      "correct": 2,
      "explanation": "Table clones (CREATE TABLE ... AS CLONE OF) create a zero-copy reference to a table at a point in time. The clone shares the underlying data files with the source table until modified, so no storage is consumed for unchanged data. CTAS and COPY INTO duplicate data."
    },
    {
      "id": "dp600-2-045",
      "module": 2,
      "text": "A transformation query produces a monthly sales summary that must run on a recurring schedule. The logic accepts parameterized year and month values. Which approach should be used?",
      "options": [
        "A stored procedure with parameters using MERGE or DELETE/INSERT patterns",
        "CREATE VIEW with the transformation logic",
        "A Dataflow Gen2 that reads from the warehouse",
        "CREATE TABLE AS SELECT (CTAS) each time new data arrives"
      ],
      "correct": 0,
      "explanation": "Stored procedures are the preferred mechanism for recurring, parameterized transformations. They support parameters, multi-step logic, error handling, and can be scheduled via pipelines. CTAS is for one-time materialization. Views are read-only. A Dataflow would add unnecessary overhead for T-SQL logic."
    },
    {
      "id": "dp600-2-046",
      "module": 2,
      "text": "A data architect needs to decide between a view and a table for a monthly sales aggregation. Consumers require the most current data, and the aggregation logic changes periodically. Which should they choose?",
      "options": [
        "A stored procedure that creates a temporary table each time",
        "An external table linked to a CSV file",
        "A table, because it provides precomputed results for faster queries",
        "A view, because it always reflects current source data and the definition can be updated with ALTER VIEW"
      ],
      "correct": 3,
      "explanation": "Views always reflect the current state of source data because they run the underlying query each time they are accessed. They have no storage cost and can be modified with ALTER VIEW when logic changes. Tables need to be refreshed and recreated when logic changes."
    }
  ];
  
  if (typeof window.__dp600 === 'undefined') {
    window.__dp600 = { modules: [], questions: [] };
  }
  
  window.__dp600.questions = window.__dp600.questions.concat(questions);
  
  if (window.__dp600.modules.length < 2) {
    window.__dp600.modules[1] = "Module 2: Data Storage & Transformation";
  }
})();

