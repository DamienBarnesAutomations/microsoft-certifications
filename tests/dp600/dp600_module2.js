// Module 2: Data Storage & Transformation
(function() {
  var questions = [
    {
      "id": "dp600-2-001",
      "text": "You are building a Dataflow Gen2 that merges data from two different source systems. You notice that query folding is not occurring for the merge step. What is the MOST LIKELY reason?",
      "options": [
        "The merge uses an INNER JOIN instead of a LEFT JOIN",
        "The two sources are from different data source types",
        "The merge is performed after a filter step",
        "The dataflow uses the Modern Query Evaluator"
      ],
      "correct": 1,
      "module": 2,
      "explanation": "Query folding (pushing operations back to the source) generally works only when both sides of a merge come from the same source system. If the two sources are different types (e.g., SQL Server and SharePoint), folding cannot occur because no single source can execute the join. The join type or order of steps does not inherently break folding across different sources."
    },
    {
      "id": "dp600-2-002",
      "text": "You have a lakehouse with a Delta table containing 500 GB of data. You need to write a Spark notebook that performs a full outer join between this table and a dimension table, then writes the results to a new Delta table. Which write mode should you use to ensure the operation is idempotent?",
      "options": [
        "append mode",
        "overwrite mode",
        "merge mode",
        "update mode"
      ],
      "correct": 1,
      "module": 2,
      "explanation": "overwrite mode replaces the entire target table with the new result. This is idempotent â€“ running the same notebook multiple times produces the same final table (assuming the source data hasnâ€™t changed). append would add duplicate rows, merge/update are for upsert scenarios."
    },
    {
      "id": "dp600-2-003",
      "text": "You have a Dataflow Gen2 that uses incremental refresh. The source table contains an 'UpdatedTimestamp' column. You configure the refresh to load data from the last 7 days. What happens when a record from 3 days ago is updated?",
      "options": [
        "The updated record is ignored because it was already loaded",
        "The updated record is loaded as a new row, creating a duplicate",
        "The refresh detects the timestamp change and replaces the existing record",
        "The refresh deletes the old record and inserts the new one"
      ],
      "correct": 2,
      "module": 2,
      "explanation": "Incremental refresh in Dataflow Gen2 (and semantic models) uses the updated timestamp column. When a record is updated, its timestamp changes to the current time, which falls within the incremental window (last 7 days). The refresh will detect the row and replace the existing record in the destination (using merge/update logic), not create a duplicate."
    },
    {
      "id": "dp600-2-004",
      "text": "You have a Fabric lakehouse with a Delta table. You run a DELETE statement using T-SQL through the SQL analytics endpoint. What is the result?",
      "options": [
        "The rows are permanently removed from the Delta table",
        "The rows are marked as deleted in the Delta transaction log but not physically removed",
        "The statement fails because the SQL analytics endpoint is read-only",
        "The rows are removed from the SQL view but remain in the underlying Delta files"
      ],
      "correct": 2,
      "module": 2,
      "explanation": "The SQL analytics endpoint of a lakehouse is **readâ€‘only**. It does not support DML statements like DELETE, INSERT, UPDATE, or MERGE. Any such statement will fail. To modify Delta table data, you must use Spark notebooks or the Lakehouse explorer (for files)."
    },
    {
      "id": "dp600-2-005",
      "text": "You are designing a dimensional model for a retail analytics solution. You have a DimCustomer table with SCD Type 2 tracking. A customer changes their address. How should you model this change?",
      "options": [
        "Update the existing row with the new address and set the previous address to NULL",
        "Insert a new row with the new address, set the old row's EndDate and IsCurrent flag, and set the new row's StartDate and IsCurrent flag",
        "Create a new DimCustomerAddress table and link it to the fact table",
        "Add a new column DimCustomer[Address2] to store the new address"
      ],
      "correct": 1,
      "module": 2,
      "explanation": "SCD Type 2 preserves history by inserting a new row for each change. The old row is flagged as not current (IsCurrent = FALSE) and given an EndDate. The new row gets a StartDate and IsCurrent = TRUE. This allows historical reporting on the address at the time of a fact. The other options either lose history (update) or are not SCD Type 2 patterns."
    },
    {
      "id": "dp600-2-006",
      "text": "You have a Dataflow Gen2 that sources data from an on-premises SQL Server. The dataflow takes a long time to refresh. You discover that query folding is not occurring. Which transformation is MOST LIKELY causing the folding to break?",
      "options": [
        "Filtering rows based on a date column",
        "Selecting specific columns from the source table",
        "Adding a custom column that concatenates first and last names",
        "Sorting the data by a numeric column"
      ],
      "correct": 2,
      "module": 2,
      "explanation": "Custom columns added using Power Query expressions (e.g., Text.Combine) generally break query folding because the source (SQL Server) cannot translate that expression. Filtering, selecting columns, and sorting can be folded back to SQL. Adding a custom column forces the remaining steps to be evaluated in Power Query's engine."
    },
    {
      "id": "dp600-2-007",
      "text": "You have a lakehouse with a Delta table. You need to optimize the file sizes for better query performance. The table currently has thousands of small files. Which command should you run?",
      "options": [
        "VACUUM table_name",
        "OPTIMIZE table_name",
        "REPAIR table_name",
        "ANALYZE table_name"
      ],
      "correct": 1,
      "module": 2,
      "explanation": "The OPTIMIZE command (Delta Lake) compacts small files into larger ones (default 1 GB). This improves query performance by reducing the number of files to scan. VACUUM removes old files no longer referenced, REPAIR updates partition metadata, ANALYZE collects statistics."
    },
    {
      "id": "dp600-2-008",
      "text": "You have a Fabric warehouse with a stored procedure that performs an INSERT, UPDATE, and DELETE operation. You need to ensure that if any operation fails, all changes are rolled back. What should you include in the stored procedure?",
      "options": [
        "SET XACT_ABORT ON and wrap all operations in a TRY...CATCH block with ROLLBACK TRANSACTION",
        "Use SET NOCOUNT ON to prevent partial results",
        "Add COMMIT after each individual operation",
        "Use IF @@ERROR <> 0 RETURN to check for errors"
      ],
      "correct": 0,
      "module": 2,
      "explanation": "To ensure atomicity (all or nothing), use an explicit transaction. SET XACT_ABORT ON ensures that any error rolls back the transaction. Wrap the operations in BEGIN TRAN and COMMIT, and include a TRY...CATCH with ROLLBACK on error. The other options do not provide transactional rollback."
    },
    {
      "id": "dp600-2-009",
      "text": "You have a Fabric lakehouse with a Delta table. You run a MERGE operation using T-SQL through the SQL analytics endpoint. What is the result?",
      "options": [
        "The merge operation completes successfully and updates the Delta table",
        "The merge operation fails because the SQL analytics endpoint only supports read operations",
        "The merge operation is queued and executes during the next refresh",
        "The merge operation creates a new Delta table with the merged results"
      ],
      "correct": 1,
      "module": 2,
      "explanation": "The SQL analytics endpoint of a lakehouse is readâ€‘only. It does not support MERGE, INSERT, UPDATE, or DELETE. Any DML operation will fail. To perform MERGE on a Delta table, you must use a Spark notebook or the Lakehouse explorer with Spark SQL."
    },
    {
      "id": "dp600-2-010",
      "text": "You have a Dataflow Gen2 that uses Table.Buffer to improve performance. You notice that the dataflow now takes longer to refresh. What is the MOST LIKELY reason?",
      "options": [
        "Table.Buffer increases memory usage and can cause performance degradation",
        "Table.Buffer is not supported in Dataflows Gen2",
        "Table.Buffer prevents query folding, which may reduce performance",
        "Table.Buffer only works with Excel sources"
      ],
      "correct": 2,
      "module": 2,
      "explanation": "Table.Buffer materializes the data in memory, which can break query folding. Once folding is broken, subsequent transformations are performed by Power Query instead of being pushed to the source, often resulting in slower performance. Table.Buffer is supported, but its misuse can degrade performance."
    },
    {
      "id": "dp600-2-011",
      "text": "You have a Fabric lakehouse with a Delta table. You need to time-travel to view the data as it existed 3 days ago. Which T-SQL query should you use through the SQL analytics endpoint?",
      "options": [
        "SELECT * FROM table_name FOR SYSTEM_TIME AS OF '2026-05-26'",
        "SELECT * FROM table_name VERSION AS OF 3",
        "SELECT * FROM table_name TIMESTAMP AS OF DATEADD(day, -3, GETDATE())",
        "SELECT * FROM table_name FOR SYSTEM_TIME BETWEEN DATEADD(day, -3, GETDATE()) AND GETDATE()"
      ],
      "correct": 0,
      "module": 2,
      "explanation": "The SQL analytics endpoint supports time travel using the FOR SYSTEM_TIME AS OF clause with a timestamp (e.g., a specific date). This is the standard Tâ€‘SQL syntax for querying historical data in Delta tables. VERSION AS OF is Spark SQL syntax, not Tâ€‘SQL. TIMESTAMP AS OF is not valid in Tâ€‘SQL."
    },
    {
      "id": "dp600-2-012",
      "text": "You have a Fabric warehouse with a table that contains 500 million rows. You need to create an index to improve query performance for a column that is frequently used in WHERE clauses. Which type of index should you create?",
      "options": [
        "B-tree index on the frequently filtered column",
        "Columnstore index for analytical queries",
        "Hash index for exact match lookups",
        "Full-text index for text searches"
      ],
      "correct": 0,
      "module": 2,
      "explanation": "For a column frequently used in WHERE clauses (e.g., equality or range filters), a traditional Bâ€‘tree (nonâ€‘clustered) index is appropriate. Columnstore indexes are better for large scans and aggregations, not point lookups. Hash indexes are for memoryâ€‘optimized tables, and fullâ€‘text is for text search."
    },
    {
      "id": "dp600-2-013",
      "text": "You have a Dataflow Gen2 that sources data from a REST API. The API returns JSON data with nested arrays. You need to flatten the nested arrays into separate rows. Which Power Query transformation should you use?",
      "options": [
        "Expand the nested array column using the Expand button",
        "Use the Parse JSON function to convert the array to a table",
        "Use Table.ExpandRecordColumn to expand each array element",
        "All of the above are valid approaches depending on the data structure"
      ],
      "correct": 3,
      "module": 2,
      "explanation": "Depending on the structure (record vs. list), you may use the Expand button, Parse JSON, or Table.ExpandRecordColumn. All are valid Power Query techniques for flattening nested arrays. The question expects 'All of the above' as the correct answer because the exam recognizes multiple valid approaches."
    },
    {
      "id": "dp600-2-014",
      "text": "You have a Fabric lakehouse with a Delta table. You need to partition the table by year and month to improve query performance. The table currently has no partitions. What is the correct approach?",
      "options": [
        "Use ALTER TABLE to add partitioning on the date columns",
        "Create a new table with partitioning and use INSERT OVERWRITE to copy the data",
        "Use the OPTIMIZE command with partitioning options",
        "Partitioning is automatically applied to Delta tables based on file size"
      ],
      "correct": 1,
      "module": 2,
      "explanation": "In Delta Lake, you cannot add partitions to an existing table using ALTER TABLE. You must create a new partitioned table (using PARTITIONED BY) and then insert the data from the old table using INSERT OVERWRITE or a similar command. OPTIMIZE compacts files but does not add partitions."
    },
    {
      "id": "dp600-2-015",
      "text": "You have a Fabric warehouse with a stored procedure that uses a cursor to process rows one at a time. You need to optimize the stored procedure for better performance. Which approach should you use?",
      "options": [
        "Replace the cursor with a set-based operation using MERGE",
        "Increase the cursor fetch size to 1000",
        "Use a WHILE loop instead of a cursor",
        "Add NOCOUNT ON to reduce network traffic"
      ],
      "correct": 0,
      "module": 2,
      "explanation": "Cursors are rowâ€‘byâ€‘row and generally slow. The best optimization is to rewrite the logic as a setâ€‘based operation, e.g., using MERGE, UPDATE, or INSERT with joins. Increasing fetch size or using a WHILE loop still processes rows iteratively. NOCOUNT ON improves minor overhead but does not solve the rowâ€‘byâ€‘row issue."
    },
    {
      "id": "dp600-2-016",
      "text": "You have a Dataflow Gen2 that uses parameterized queries to filter data from a SQL Server source. You need to ensure that the parameter values are passed to the source query for optimal performance. Which approach should you use?",
      "options": [
        "Use the parameter directly in the source query and ensure query folding occurs",
        "Filter the data in Power Query after loading all data from the source",
        "Use a function to dynamically generate the query based on parameters",
        "Create a separate dataflow for each parameter value"
      ],
      "correct": 0,
      "module": 2,
      "explanation": "To achieve sourceâ€‘side filtering, you must incorporate the parameter into the native SQL query (e.g., using Value.NativeQuery with parameters) and ensure query folding (i.e., the entire query is pushed to SQL Server). Filtering after load defeats performance. Dynamically generating strings may work but is more errorâ€‘prone; the direct parameterized query is the recommended practice."
    },
    {
      "id": "dp600-2-017",
      "text": "You have a Fabric lakehouse with a Delta table. You need to perform a merge operation that updates existing rows and inserts new rows based on a key column. Which command should you use?",
      "options": [
        "INSERT INTO ... SELECT ... ON DUPLICATE KEY UPDATE",
        "MERGE INTO target USING source ON target.key = source.key WHEN MATCHED THEN UPDATE ... WHEN NOT MATCHED THEN INSERT ...",
        "UPDATE target SET ... FROM target INNER JOIN source ON target.key = source.key",
        "INSERT OVERWRITE INTO target SELECT * FROM source"
      ],
      "correct": 1,
      "module": 2,
      "explanation": "The MERGE command in Spark SQL (and supported in Fabric lakehouse Spark) allows you to update existing rows and insert new rows in one operation. This is the standard upsert pattern for Delta tables. The other options are either not valid (ON DUPLICATE KEY is MySQL) or do not handle both update and insert."
    },
    {
      "id": "dp600-2-018",
      "text": "You have a Dataflow Gen2 that sources data from a SharePoint list. You need to refresh the dataflow every 15 minutes. What is the MINIMUM refresh interval you can configure?",
      "options": [
        "15 minutes",
        "30 minutes",
        "1 hour",
        "The refresh interval depends on the capacity plan"
      ],
      "correct": 0,
      "module": 2,
      "explanation": "In Dataflow Gen2 (and Power BI dataflows), the minimum scheduled refresh interval is 15 minutes when using premium capacities or Fabric capacities. For shared capacities, it may be higher, but the question generally expects the technical minimum of 15 minutes as the correct answer."
    },
    {
      "id": "dp600-2-019",
      "text": "You have a Fabric lakehouse with a Delta table containing 2TB of data. You need to write a Spark notebook that performs a join with a 10GB dimension table. Which join strategy should you use for optimal performance?",
      "options": [
        "Broadcast join to send the small dimension table to all executors",
        "Sort-merge join to handle the large datasets efficiently",
        "Shuffle-hash join for balanced distribution",
        "Nested loop join for precise matching"
      ],
      "correct": 0,
      "module": 2,
      "explanation": "When one side of the join is small (10GB is considered small relative to 2TB), a broadcast join is optimal. Spark sends the small dimension table to all executors, avoiding a full shuffle of the large table. This is much faster than sortâ€‘merge or shuffleâ€‘hash joins. Nested loop is the worst."
    },
    {
      "id": "dp600-2-020",
      "text": "You have a Dataflow Gen2 that uses staging to improve performance. You need to reference a staging table from another dataflow. What is the maximum number of staging tables you can reference?",
      "options": [
        "1 staging table per dataflow",
        "5 staging tables per dataflow",
        "10 staging tables per dataflow",
        "There is no limit to the number of staging tables you can reference"
      ],
      "correct": 3,
      "module": 2,
      "explanation": "There is no hard limit on the number of staging tables that can be referenced from a Dataflow Gen2. You can reference as many as needed, subject to capacity and performance constraints. The exam expects 'no limit' as the correct answer."
    },
    {
      "id": "dp600-2-021",
      "text": "You have a Fabric warehouse with a table that contains 100 million rows. You need to create a columnstore index to improve analytical query performance. Which statement should you use?",
      "options": [
        "CREATE NONCLUSTERED INDEX IX_Table_Column ON Table(Column)",
        "CREATE CLUSTERED COLUMNSTORE INDEX CCI ON Table",
        "CREATE INDEX IX_Table_Column ON Table(Column) WITH (DATA_COMPRESSION = COLUMNSTORE)",
        "ALTER TABLE Table ADD INDEX (Column) TYPE = COLUMNSTORE"
      ],
      "correct": 1,
      "module": 2,
      "explanation": "The correct Tâ€‘SQL syntax to create a clustered columnstore index is `CREATE CLUSTERED COLUMNSTORE INDEX CCI ON Table`. Columnstore indexes are ideal for large analytical tables. The other options are either for rowstore indexes or incorrect syntax."
    },
    {
      "id": "dp600-2-022",
      "text": "You have a Dataflow Gen2 that sources data from a CSV file. The file contains a header row and 1 million data rows. You need to promote the first row to headers and change the data type of a column. Which order should you apply these transformations?",
      "options": [
        "Change data type first, then promote headers",
        "Promote headers first, then change data type",
        "The order does not matter",
        "Apply both transformations simultaneously using a custom function"
      ],
      "correct": 1,
      "module": 2,
      "explanation": "You should promote headers first, because after promotion the columns have meaningful names. Then you can reference those column names when changing data types. If you change data types first, the columns are still named Column1, Column2, etc., which is less clear and could break if the file structure changes."
    },
    {
      "id": "dp600-2-023",
      "text": "You have a Fabric lakehouse with a Delta table. You need to run a SQL query that joins data from two different lakehouses. What is the correct approach?",
      "options": [
        "Use multi-catalog queries to join tables from different lakehouses",
        "Create shortcuts to the other lakehouse and query them together",
        "Export data from one lakehouse and import it into the other",
        "Both A and B are valid approaches"
      ],
      "correct": 3,
      "module": 2,
      "explanation": "In Fabric, you can join tables across different lakehouses using either multiâ€‘catalog queries (e.g., specifying the workspace and lakehouse in the query) or by creating shortcuts to bring the tables into the same lakehouse. Both are valid. Export/import is not necessary and would create duplication."
    },
    {
      "id": "dp600-2-024",
      "text": "You have a Dataflow Gen2 that uses a custom function to process data. The function is slow for large datasets. You need to optimize the function for better performance. Which approach should you use?",
      "options": [
        "Use Table.Buffer to cache the input data",
        "Use List.Buffer to cache list operations",
        "Parallelize the function using List.ParallelTransform",
        "All of the above are valid optimization approaches"
      ],
      "correct": 3,
      "module": 2,
      "explanation": "Depending on the specific function, using Table.Buffer, List.Buffer, or List.ParallelTransform can improve performance. All are valid optimization techniques in Power Query. The exam expects 'All of the above' as the correct answer because it recognizes multiple strategies."
    },
    {
      "id": "dp600-2-025",
      "text": "You have a Dataflow Gen2 that sources data from a REST API. The API returns paginated results. You need to combine all pages into a single table. Which Power Query function should you use?",
      "options": [
        "Table.Combine to merge all pages",
        "List.Generate to iterate through pages",
        "Json.Document to parse each page",
        "Both A and B are valid approaches"
      ],
      "correct": 3,
      "module": 2,
      "explanation": "To handle pagination, you typically use List.Generate to iterate through page URLs, fetch each page, parse with Json.Document, and then use Table.Combine to merge all pages. Both Table.Combine and List.Generate are part of the solution, so 'Both A and B' (where B implies the iteration approach) is correct. The exam often marks this as the correct answer."
    },
    {
      "id": "dp600-2-026",
      "text": "You have a Fabric lakehouse with a Delta table. You need to perform a full outer join between this table and a dimension table. The fact table has 1 billion rows and the dimension table has 100,000 rows. Which join strategy should you use?",
      "options": [
        "Broadcast join to send the dimension table to all executors",
        "Sort-merge join to handle the large datasets efficiently",
        "Shuffle-hash join for balanced distribution",
        "Nested loop join for precise matching"
      ],
      "correct": 1,
      "module": 2,
      "explanation": "For a full outer join between a large fact table (1B rows) and a moderately sized dimension (100k), broadcast join is not typically used for full outer joins because it would require broadcasting the large table or may not be supported. Sortâ€‘merge join is efficient for large datasets and works well for outer joins. It is a common choice when both sides are large. Broadcast would be fine for an inner join but full outer may still work; however the exam expects sortâ€‘merge as the optimal general strategy for large full outer joins."
    },
    {
      "id": "dp600-2-027",
      "text": "You have a Dataflow Gen2 that uses a parameter to dynamically select a data source. You need to ensure that the parameter value is validated before the dataflow runs. Which approach should you use?",
      "options": [
        "Use a try-catch block in Power Query to handle invalid values",
        "Validate the parameter value in a separate dataflow before calling the main dataflow",
        "Use a function to validate the parameter and return an error if invalid",
        "All of the above are valid approaches"
      ],
      "correct": 3,
      "module": 2,
      "explanation": "Parameter validation can be done using tryâ€‘catch, separate dataflow validation, or a custom validation function. All are valid techniques depending on the scenario. The exam often accepts 'All of the above' for such best practice questions."
    },
    {
      "id": "dp600-2-028",
      "text": "You have a Fabric warehouse with a table that contains 50 million rows. You need to create a partitioned table to improve query performance. Which column should you partition by?",
      "options": [
        "A column with high cardinality (many unique values)",
        "A column with low cardinality (few unique values)",
        "A column that is frequently used in WHERE clauses",
        "Both B and C are correct considerations"
      ],
      "correct": 3,
      "module": 2,
      "explanation": "Good partitioning keys have low cardinality (e.g., year, region) to avoid too many partitions, and they should be frequently used in WHERE clauses to enable partition elimination. High cardinality leads to too many small partitions. Therefore both low cardinality and usage in WHERE clauses are important considerations. Answer D captures both."
    },
    {
      "id": "dp600-2-029",
      "text": "You have a Dataflow Gen2 that sources data from a SQL Server table. You need to filter the data at the source to improve performance. Which transformation should you apply first?",
      "options": [
        "Filter rows based on the date column",
        "Select specific columns to retrieve",
        "Sort the data by a column",
        "Group the data by a column"
      ],
      "correct": 0,
      "module": 2,
      "explanation": "Applying row filters as early as possible reduces the amount of data transferred from the source. Filtering on a date column is an excellent early step. Selecting columns also helps, but row reduction is generally more impactful. The exam emphasizes filtering before other operations."
    },
    {
      "id": "dp600-2-030",
      "text": "You have a Fabric lakehouse with a Delta table. You need to run a Spark SQL query that uses a window function to calculate a running total. Which syntax should you use?",
      "options": [
        "SELECT *, SUM(SalesAmount) OVER (ORDER BY OrderDate) AS RunningTotal FROM Sales",
        "SELECT *, SUM(SalesAmount) OVER (PARTITION BY ProductID ORDER BY OrderDate) AS RunningTotal FROM Sales",
        "SELECT *, SUM(SalesAmount) OVER (ROWS UNBOUNDED PRECEDING) AS RunningTotal FROM Sales",
        "All of the above are valid window function syntaxes"
      ],
      "correct": 3,
      "module": 2,
      "explanation": "All three examples show valid window function syntax in Spark SQL. The first gives a running total over all rows ordered by date, the second partitions by product, the third uses ROWS clause. All are correct, so the answer is 'All of the above'."
    },
    {
      "id": "dp600-2-031",
      "text": "You have a Dataflow Gen2 that uses a custom function to process each row of a table. The function is slow for large datasets. You need to optimize the function for better performance. Which approach should you use?",
      "options": [
        "Use Table.Buffer to cache the input data",
        "Use List.Buffer to cache list operations",
        "Parallelize the function using List.ParallelTransform",
        "All of the above are valid optimization approaches"
      ],
      "correct": 3,
      "module": 2,
      "explanation": "Similar to a previous question, using Table.Buffer, List.Buffer, and List.ParallelTransform are all valid optimization techniques for custom functions in Power Query. The exam expects 'All of the above'."
    },
    {
      "id": "dp600-2-032",
      "module": 2,
      "text": "An organization uses lakehouses for data engineering, warehouses for BI reporting, and an eventhouse for real-time IoT monitoring. What allows all three stores to access data across each other without duplication?",
      "options": [
        "Dataflows Gen2 with scheduled refresh",
        "OneLake shortcuts and cross-database queries",
        "COPY INTO commands running on a schedule",
        "Spark notebooks with JDBC connectors"
      ],
      "correct": 1,
      "explanation": "All three analytical stores (lakehouse, warehouse, eventhouse) store data in OneLake. Shortcuts and cross-database queries let users reference data across stores without copying or moving it. Dataflows, COPY INTO, and JDBC connections involve data movement or duplication."
    },
    {
      "id": "dp600-2-033",
      "module": 2,
      "text": "An eventhouse ingests 100,000 IoT sensor readings per second. The operations team needs to correct some readings after ingestion. What is the expected behavior of UPDATE and DELETE operations on an eventhouse?",
      "options": [
        "They execute with full ACID support, identical to a warehouse",
        "They are supported only for the most recent 24 hours of data",
        "The eventhouse is optimized for append-only workloads and frequent UPDATE/DELETE operations are not recommended",
        "They trigger automatic rollback because eventhouses only support SELECT queries"
      ],
      "correct": 2,
      "explanation": "Eventhouses are optimized for append-heavy, time-series workloads. While some data management operations are possible, frequent UPDATE and DELETE patterns are not recommended. Use a warehouse or lakehouse for workloads that require transactional updates."
    },
    {
      "id": "dp600-2-034",
      "module": 2,
      "text": "A data science team needs to explore structured transaction data and unstructured clickstream logs using Python. The schema is not fully defined and changes frequently. Which Fabric data store should they use?",
      "options": [
        "Warehouse, because it enforces schema on write for data quality",
        "Eventhouse, because it handles JSON natively with automatic indexing",
        "Lakehouse, because it supports structured, semi-structured, and unstructured data with Spark notebooks",
        "SQL analytics endpoint, because it provides T-SQL access for analysts"
      ],
      "correct": 2,
      "explanation": "The lakehouse is the most versatile store, handling structured, semi-structured, and unstructured data with Spark notebook support (Python). The warehouse enforces schema on write and is T-SQL-only. The eventhouse is for time-series data. The SQL endpoint is read-only."
    },
    {
      "id": "dp600-2-035",
      "module": 2,
      "text": "A data modeler is designing a dimensional model for a Power BI semantic model. The dimension tables are relatively small and denormalized. Which schema type is recommended for most Fabric analytics workloads?",
      "options": [
        "Snowflake schema, because normalized dimensions reduce storage",
        "Star schema, because fewer joins provide faster queries and better Power BI performance",
        "Third normal form, because it eliminates all data redundancy",
        "Wide table with all attributes in a single table"
      ],
      "correct": 1,
      "explanation": "Star schema is the recommended approach for most Fabric analytics and Power BI workloads. It uses denormalized dimensions with a central fact table, resulting in fewer joins and faster query performance. Snowflake schemas add join complexity."
    },
    {
      "id": "dp600-2-036",
      "module": 2,
      "text": "A retail company needs to capture the state of inventory for every product at the end of each day. Which type of fact table should they use?",
      "options": [
        "Transaction fact table",
        "Periodic snapshot fact table",
        "Accumulating snapshot fact table",
        "Factless fact table"
      ],
      "correct": 1,
      "explanation": "A periodic snapshot fact table captures the state of something at regular intervals, such as end-of-day inventory levels. Transaction fact tables record individual events. Accumulating snapshots track process milestones. Factless tables capture occurrences without measures."
    },
    {
      "id": "dp600-2-037",
      "module": 2,
      "text": "A sales fact table needs to reference the date dimension three times: for Order Date, Ship Date, and Delivery Date. What is this pattern called?",
      "options": [
        "Conformed dimensions",
        "Junk dimensions",
        "Role-playing dimensions",
        "Slowly changing dimensions"
      ],
      "correct": 2,
      "explanation": "Role-playing dimensions occur when a single physical dimension table is referenced multiple times in one fact table, each representing a different context (Order Date, Ship Date, Delivery Date). Conformed dimensions are shared across fact tables. Junk dimensions consolidate small attributes."
    },
    {
      "id": "dp600-2-038",
      "module": 2,
      "text": "A Dataflow Gen2 processes a large dataset and the developer wants to use incremental refresh. Which destinations support this update method?",
      "options": [
        "Lakehouse, Warehouse, and Azure SQL Database",
        "Lakehouse, Warehouse, and Eventhouse",
        "All Fabric destinations support incremental refresh",
        "Only Lakehouse destinations support incremental refresh"
      ],
      "correct": 0,
      "explanation": "Incremental refresh in Dataflow Gen2 is supported for Fabric Lakehouse, Fabric Warehouse, and Azure SQL Database destinations. It divides data into time-range buckets and refreshes only new or changed data. Other destinations use Replace or Append only."
    },
    {
      "id": "dp600-2-039",
      "module": 2,
      "text": "A developer creates a Dataflow Gen2 that transforms data but does not configure an output destination. What happens when the dataflow is published and runs?",
      "options": [
        "The dataflow fails validation because a destination is required",
        "The dataflow runs successfully and can be consumed by pipelines or Power BI as a data source",
        "The dataflow runs but only the first 1000 rows are processed",
        "The dataflow automatically creates a default Lakehouse destination"
      ],
      "correct": 1,
      "explanation": "A destination is optional in Dataflow Gen2. The dataflow runs and processes transformations, and its output can be consumed by pipelines or connected to from Power BI Desktop. This is a key distinction from pipelines, where every Copy Data activity requires a destination."
    },
    {
      "id": "dp600-2-040",
      "module": 2,
      "text": "A team needs to transform 5 TB of data using complex window functions, custom Python logic, and multi-step joins. The team is proficient in PySpark. Which transformation tool should they use?",
      "options": [
        "Dataflows Gen2 with Power Query transformations",
        "Spark notebooks in Fabric",
        "T-SQL stored procedures in the warehouse",
        "Eventstream with KQL transformations"
      ],
      "correct": 1,
      "explanation": "Spark notebooks are the right choice for complex transformations on large datasets when the team has PySpark skills. Dataflows Gen2 are better for simple-to-moderate transformations and low-code preferences. Stored procedures use T-SQL, not Python."
    },
    {
      "id": "dp600-2-041",
      "module": 2,
      "text": "A developer pins a lakehouse as the default lakehouse in a Spark notebook. How does this affect how tables are referenced in Spark SQL queries?",
      "options": [
        "It replicates all tables to a warehouse for SQL access",
        "It sets the Hive metastore context so tables can be referenced by name without full paths",
        "It enables V-Order optimization on all Delta tables in the lakehouse",
        "It creates SQL analytics endpoint views for all tables in the lakehouse"
      ],
      "correct": 1,
      "explanation": "Pinning a default lakehouse sets the Hive metastore context. Tables in that lakehouse can then be referenced by their simple name (e.g., 'SELECT * FROM sales') instead of requiring a full path. This makes code portable across environments."
    },
    {
      "id": "dp600-2-042",
      "module": 2,
      "text": "A PySpark notebook needs to run a Spark SQL query. The notebook language is set to PySpark. Which magic command should be used at the top of a code cell?",
      "options": [
        "%python",
        "%%sql",
        "%scala",
        "%%local"
      ],
      "correct": 1,
      "explanation": "The %%sql magic command switches the cell language to Spark SQL within a PySpark notebook. This allows mixing SQL and Python in the same notebook. %python would stay in Python, %scala switches to Scala, and %%local is not a Fabric magic command."
    },
    {
      "id": "dp600-2-043",
      "module": 2,
      "text": "Which of the following is true about write-time optimizations in Fabric Spark notebooks?",
      "options": [
        "Both Optimize Write and V-Order are enabled by default",
        "Optimize Write is enabled by default; V-Order is disabled by default",
        "Optimize Write is disabled by default; V-Order is enabled by default",
        "Both Optimize Write and V-Order must be explicitly enabled"
      ],
      "correct": 1,
      "explanation": "Optimize Write is enabled by default in Fabric and consolidates small files during writes. V-Order is disabled by default and must be enabled at the session level using SET spark.sql.parquet.vorder.default=TRUE. V-Order optimizes Parquet files for read-heavy workloads."
    },
    {
      "id": "dp600-2-044",
      "module": 2,
      "text": "A developer needs to test a transformation on a 500 GB table without duplicating storage. Which Fabric warehouse feature should they use?",
      "options": [
        "CREATE TABLE AS SELECT (CTAS)",
        "COPY INTO with a new table name",
        "CREATE TABLE ... AS CLONE OF",
        "INSERT INTO ... SELECT with TOP 0"
      ],
      "correct": 2,
      "explanation": "Table clones (CREATE TABLE ... AS CLONE OF) create a zero-copy reference to a table at a point in time. The clone shares the underlying data files with the source table until modified, so no storage is consumed for unchanged data. CTAS and COPY INTO duplicate data."
    },
    {
      "id": "dp600-2-045",
      "module": 2,
      "text": "A transformation query produces a monthly sales summary that must run on a recurring schedule. The logic accepts parameterized year and month values. Which approach should be used?",
      "options": [
        "CREATE VIEW with the transformation logic",
        "CREATE TABLE AS SELECT (CTAS) each time new data arrives",
        "A stored procedure with parameters using MERGE or DELETE/INSERT patterns",
        "A Dataflow Gen2 that reads from the warehouse"
      ],
      "correct": 2,
      "explanation": "Stored procedures are the preferred mechanism for recurring, parameterized transformations. They support parameters, multi-step logic, error handling, and can be scheduled via pipelines. CTAS is for one-time materialization. Views are read-only. A Dataflow would add unnecessary overhead for T-SQL logic."
    },
    {
      "id": "dp600-2-046",
      "module": 2,
      "text": "A data architect needs to decide between a view and a table for a monthly sales aggregation. Consumers require the most current data, and the aggregation logic changes periodically. Which should they choose?",
      "options": [
        "A table, because it provides precomputed results for faster queries",
        "A view, because it always reflects current source data and the definition can be updated with ALTER VIEW",
        "A stored procedure that creates a temporary table each time",
        "An external table linked to a CSV file"
      ],
      "correct": 1,
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

