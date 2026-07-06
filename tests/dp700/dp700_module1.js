// Module 1: Dataflows, Pipelines & Spark
(function() {
  var questions = [
    {
      "id": "dp700-1-001",
      "text": "A data engineer creates a pipeline that copies data from an Azure Blob Storage container to a lakehouse. The pipeline must be triggered every 15 minutes. What should the engineer configure?",
      "options": [
        "A scheduled pipeline run with a recurrence of 15 minutes",
        "A dataflow Gen2 scheduled refresh",
        "An event-driven trigger on blob creation",
        "A stored procedure called from a notebook"
      ],
      "correct": 0,
      "module": 1,
      "explanation": "The requirement is a time-based trigger every 15 minutes. Scheduled pipeline run with recurrence is the standard way to achieve this. Dataflow refresh would run a dataflow, not the pipeline. Event-driven trigger reacts to blob creation, not a fixed schedule. A stored procedure in a notebook is overkill and not a trigger mechanism."
    },
    {
      "id": "dp700-1-002",
      "text": "Which of the following statements about Dataflows Gen2 is TRUE?",
      "options": [
        "Dataflows Gen2 can be used as a direct replacement for a data warehouse",
        "Dataflows Gen2 support row-level security (RLS)",
        "Dataflows Gen2 require a Fabric capacity workspace",
        "Dataflows Gen2 can only load data to lakehouses"
      ],
      "correct": 2,
      "module": 1,
      "explanation": "Dataflows Gen2 run on Fabric capacity and require a capacity workspace. They are not a warehouse replacement, do not support RLS (RLS is applied in the destination or semantic model), and can load to many destinations including warehouses, lakehouses, and SQL databases."
    },
    {
      "id": "dp700-1-003",
      "text": "Which of the following is a limitation of Dataflows Gen2 compared to a data warehouse?",
      "options": [
        "Dataflows Gen2 cannot connect to cloud sources",
        "Dataflows Gen2 do not support row-level security",
        "Dataflows Gen2 cannot be scheduled",
        "Dataflows Gen2 cannot load to lakehouses"
      ],
      "correct": 1,
      "module": 1,
      "explanation": "Dataflows Gen2 do not support row-level security (RLS); RLS is enforced in the destination (e.g., warehouse or semantic model). They can connect to cloud sources, can be scheduled (as dataflow refreshes or via pipelines), and can load to lakehouses."
    },
    {
      "id": "dp700-1-004",
      "text": "You need to create a Spark notebook that reads a CSV file. You want the schema to be inferred automatically. Which option should you use?",
      "options": [
        "spark.read.csv(path, header=True)",
        "spark.read.load(path, format='csv', inferSchema=True)",
        "spark.read.schema(structType).csv(path)",
        "Both A and B"
      ],
      "correct": 1,
      "module": 1,
      "explanation": "The correct method to infer schema is to use inferSchema=True. spark.read.csv(...) alone does not infer schema unless inferSchema is explicitly set. Option B sets format='csv' and inferSchema=True, which works. Option A lacks inferSchema. Option C uses an explicit schema, not inference."
    },
    {
      "id": "dp700-1-005",
      "text": "You need to configure a pipeline activity that transforms data before loading it to a destination. Which activity type should you use?",
      "options": [
        "Copy Data",
        "Data Flow or Dataflow",
        "Stored Procedure",
        "Delete Data"
      ],
      "correct": 1,
      "module": 1,
      "explanation": "Data Flow or Dataflow activity (Dataflow Gen2) is designed for transformations. Copy Data moves data without transformation. Stored Procedure activity executes a procedure but is not for general transformations. Delete Data removes data."
    },
    {
      "id": "dp700-1-006",
      "text": "You need to run a Spark notebook that uses a specific Python library not available in the default runtime. How should you provide the library?",
      "options": [
        "Use a Spark Environment to specify the library",
        "Install the library in the notebook cell using pip",
        "Upload the library to the lakehouse Files folder",
        "All of the above"
      ],
      "correct": 0,
      "module": 1,
      "explanation": "The recommended and supported way in Fabric is to create a Spark Environment that includes custom libraries; the environment is then attached to the notebook or workspace. Installing via pip in a cell is temporary and not guaranteed across sessions. Uploading to Files folder does not make it available to Spark. Therefore, the best answer is using a Spark Environment."
    },
    {
      "id": "dp700-1-007",
      "text": "You have a pipeline that runs a Dataflow Gen2 activity. The dataflow needs to connect to a Salesforce source. Which of the following is true?",
      "options": [
        "Dataflows Gen2 can connect to Salesforce as it supports hundreds of sources",
        "You must use a notebook instead",
        "You need to install a custom connector",
        "Salesforce is not supported in Fabric"
      ],
      "correct": 0,
      "module": 1,
      "explanation": "Dataflows Gen2 in Fabric support many cloud sources, including Salesforce, via Power Query connectors. No custom connector or notebook is required."
    },
    {
      "id": "dp700-1-008",
      "text": "You need to query a lakehouse table using Spark SQL. Which statement creates a temporary view that can be used in Spark SQL?",
      "options": [
        "createOrReplaceTempView",
        "createTempTable",
        "registerTempTable",
        "createGlobalTempView"
      ],
      "correct": 0,
      "module": 1,
      "explanation": "createOrReplaceTempView is the DataFrame method that registers a temporary view accessible via Spark SQL. createTempTable is not a method; registerTempTable is deprecated. createGlobalTempView creates a global temp view with different scope."
    },
    {
      "id": "dp700-1-009",
      "text": "Which of the following is true about the HIGH CONCURRENCY mode for Spark in Fabric?",
      "options": [
        "It runs each notebook in a separate session",
        "It shares Spark sessions across multiple users",
        "It requires a custom Spark pool",
        "It disables autoscaling"
      ],
      "correct": 1,
      "module": 1,
      "explanation": "High concurrency mode allows multiple notebooks and users to share the same Spark session, reducing overhead. It does not require a custom pool (works with starter pool) and does not disable autoscaling."
    },
    {
      "id": "dp700-1-010",
      "text": "You have a pipeline with a loop activity that iterates over a list of files. Which activity type is this?",
      "options": [
        "Data transformation activity",
        "Control flow activity",
        "Copy Data activity",
        "Dataflow activity"
      ],
      "correct": 1,
      "module": 1,
      "explanation": "Looping (e.g., ForEach, Until) is a control flow activity, not a data transformation. Copy Data and Dataflow are data movement/transformation activities."
    },
    {
      "id": "dp700-1-011",
      "text": "You need to ingest data from a CSV file into a Lakehouse and then apply complex transformations using a visual interface. Which approach should you use?",
      "options": [
        "Copy Data activity in a pipeline only",
        "Dataflows Gen2 with Power Query Online",
        "A Spark notebook with PySpark code",
        "Direct COPY INTO T-SQL statement"
      ],
      "correct": 1,
      "module": 1,
      "explanation": "Dataflows Gen2 provide a visual (Power Query) interface for complex transformations. Copy Data has no transformations. Notebooks are code-based. COPY INTO is T-SQL for loading, not visual transformations."
    },
    {
      "id": "dp700-1-012",
      "text": "A data engineer wants to combine a Dataflows Gen2 activity with additional downstream activities such as executing a stored procedure. What is the recommended approach?",
      "options": [
        "Add the stored procedure as a transformation step inside the Dataflows Gen2",
        "Use a data pipeline to orchestrate the Dataflows Gen2 activity followed by a Stored Procedure activity",
        "Schedule the Dataflows Gen2 to run first, then manually run the stored procedure",
        "Embed the stored procedure logic as a custom M function in the dataflow"
      ],
      "correct": 1,
      "module": 1,
      "explanation": "Orchestration of multiple activities (Dataflow Gen2 then stored procedure) is done via a pipeline. Dataflows Gen2 do not support invoking stored procedures directly. Manual steps are not recommended."
    },
    {
      "id": "dp700-1-013",
      "text": "You are building a Spark notebook that reads a large Parquet dataset. You want to optimize query performance by running Spark operations directly on lakehouse infrastructure. Which Spark property should you configure?",
      "options": [
        "spark.sql.shuffle.partitions",
        "spark.native.enabled set to true",
        "spark.executor.memory",
        "spark.dynamicAllocation.enabled"
      ],
      "correct": 1,
      "module": 1,
      "explanation": "The native execution engine (spark.native.enabled=true) runs Spark operations directly on lakehouse infrastructure, improving performance. Shuffle partitions, executor memory, and dynamic allocation are general tuning, not specific to lakehouse direct execution."
    },
    {
      "id": "dp700-1-014",
      "text": "Multiple data engineers need to share the same Spark session across concurrent notebooks while ensuring code isolation. Which feature should you enable?",
      "options": [
        "Dynamic allocation",
        "High concurrency mode",
        "Native execution engine",
        "Auto MLFlow logging"
      ],
      "correct": 1,
      "module": 1,
      "explanation": "High concurrency mode allows multiple notebooks to share a Spark session with isolated variable namespaces. Dynamic allocation scales executors, native engine optimizes performance, MLFlow logs experiments."
    },
    {
      "id": "dp700-1-015",
      "text": "You need to load data from a CSV file into a Spark dataframe, but the file has no header row and you want to ensure correct data types from the start. What should you do?",
      "options": [
        "Use spark.read.load with header=True and let Spark infer the schema",
        "Define an explicit StructType schema and set header=False when loading",
        "Use the %%sql magic to create the table first, then load the CSV",
        "Convert the CSV to Parquet externally before loading into Spark"
      ],
      "correct": 1,
      "module": 1,
      "explanation": "Without a header, defining an explicit StructType schema ensures correct data types and avoids schema inference (which requires scanning data). header=True would treat first row as header, which doesn't exist. %%sql and external conversion add unnecessary complexity."
    },
    {
      "id": "dp700-1-016",
      "text": "You saved a Spark dataframe as partitioned Parquet files using partitionBy('Category'). When you later read the data for a specific category using a file path filter, what happens to the Category column in the resulting dataframe?",
      "options": [
        "The Category column is included with the filtered value for all rows",
        "The Category column is omitted from the resulting dataframe",
        "The Category column contains null values",
        "The Category column is renamed to partition_category"
      ],
      "correct": 1,
      "module": 1,
      "explanation": "When reading from a partitioned directory via direct path filter, Spark omits the partition column from the resulting DataFrame because all rows share the same value, which is implied by the folder structure. The column is not included."
    },
    {
      "id": "dp700-1-017",
      "text": "You create a temporary view in Spark using createOrReplaceTempView. When is this view automatically deleted?",
      "options": [
        "When the notebook cell completes execution",
        "When the Spark session ends",
        "When you manually drop the view",
        "It persists until explicitly deleted"
      ],
      "correct": 1,
      "module": 1,
      "explanation": "Temporary views are session-scoped; they are automatically removed when the Spark session ends (notebook detached or timed out). They are not cell-scoped and do not persist beyond the session unless manually dropped."
    },
    {
      "id": "dp700-1-018",
      "text": "You need to write a Spark SQL query in a notebook cell that queries the Spark catalog. Which magic command should you use at the beginning of the cell?",
      "options": [
        "%%pyspark",
        "%%spark",
        "%%sql",
        "%%python"
      ],
      "correct": 2,
      "module": 1,
      "explanation": "The %%sql magic tells the notebook to interpret the cell content as Spark SQL. %%pyspark and %%python are for Python code. %%spark is not a standard magic."
    },
    {
      "id": "dp700-1-019",
      "text": "You want to create a managed Delta table in the Spark catalog so it persists beyond the current session and its data is stored in the Tables storage location. Which method should you use?",
      "options": [
        "createOrReplaceTempView",
        "saveAsTable with format='delta'",
        "write.mode('overwrite').parquet()",
        "createExternalTable"
      ],
      "correct": 1,
      "module": 1,
      "explanation": "saveAsTable with delta format creates a managed table (metadata and data in the Tables folder). createOrReplaceTempView creates a temporary view. write.parquet writes files but not a managed table. createExternalTable creates an external table."
    },
    {
      "id": "dp700-1-020",
      "text": "In an Eventhouse, what is the key characteristic of time-series data that enables KQL databases to automatically partition data by ingestion time?",
      "options": [
        "Data is stored in JSON format",
        "Events are immutable and tied to specific moments in time",
        "Data is compressed using delta format",
        "Tables are organized in a star schema"
      ],
      "correct": 1,
      "module": 1,
      "explanation": "Eventhouse leverages the immutable, time-based nature of events to automatically partition by ingestion time, enabling efficient time-range queries. JSON format, compression, and star schema are not the key characteristic."
    },
    {
      "id": "dp700-1-021",
      "text": "You write a KQL query that filters by time, then by vendor, then by fare amount. According to KQL optimization best practices, what is the correct order for these filters?",
      "options": [
        "fare_amount filter first, then vendor, then time",
        "vendor filter first, then time, then fare_amount",
        "Time filter first (eliminates most data), then vendor, then fare_amount",
        "All filters can be in any order since KQL optimizes automatically"
      ],
      "correct": 2,
      "module": 1,
      "explanation": "KQL best practice: filter on time first because the time column is indexed and can eliminate the largest amount of data early. Then apply other filters. Order matters for performance; it is not fully automatic."
    },
    {
      "id": "dp700-1-022",
      "text": "You need to join a small VendorInfo table with a large TaxiTrips table in KQL. According to best practices, how should you structure the join for optimal performance?",
      "options": [
        "Put TaxiTrips first since it's the main table",
        "Put VendorInfo first since it's the smaller table",
        "Use a broadcast join hint",
        "Create a materialized view of the join first"
      ],
      "correct": 1,
      "module": 1,
      "explanation": "In KQL, for optimal join performance, put the smaller table on the left side of the join (first). The join operator processes the left input to match against the right. So VendorInfo (small) first, then TaxiTrips."
    },
    {
      "id": "dp700-1-023",
      "text": "You create a materialized view in a KQL database. When you query it, the system combines two parts to return fresh results. What are these two parts?",
      "options": [
        "The raw table and the indexed table",
        "The materialized part (precomputed) and the delta (new data since last update)",
        "The source table and the destination table",
        "The hot partition and the cold partition"
      ],
      "correct": 1,
      "module": 1,
      "explanation": "A KQL materialized view consists of a materialized part (precomputed historical aggregations) and a delta part (new data not yet materialized). The query combines both for fresh results."
    },
    {
      "id": "dp700-1-024",
      "text": "You create a stored function in KQL with the command .create-or-alter function trips_by_min_passenger_count(num_passengers:long). How do you call this function?",
      "options": [
        "trips_by_min_passenger_count WHERE num_passengers >= 3",
        "trips_by_min_passenger_count(3)",
        "SELECT * FROM trips_by_min_passenger_count(3)",
        ".invoke trips_by_min_passenger_count(3)"
      ],
      "correct": 1,
      "module": 1,
      "explanation": "KQL stored functions are called like a table, passing parameters in parentheses: `function_name(parameter_value)`. The WHERE clause is part of the function body. SELECT * FROM is T-SQL style. .invoke is not used."
    },
    {
      "id": "dp700-1-025",
      "text": "You want to enable high concurrency mode for Spark in Microsoft Fabric. Where is this setting configured?",
      "options": [
        "In the notebook settings before running code",
        "In the Data Engineering/Science section of workspace settings",
        "In the Spark pool configuration under node family settings",
        "In the environment configuration file"
      ],
      "correct": 1,
      "module": 1,
      "explanation": "High concurrency mode is enabled at the workspace level under Data Engineering/Science settings. It is not in notebook settings, Spark pool node family, or environment file."
    },
    {
      "id": "dp700-1-026",
      "module": 1,
      "text": "You need to orchestrate a multi-step ETL pipeline that extracts data from Azure Blob Storage, transforms it with Spark, and loads it into a lakehouse. Which Fabric service should you use to define and schedule this workflow?",
      "options": [
        "Dataflow Gen2",
        "Pipeline",
        "Notebook",
        "Activator"
      ],
      "correct": 1,
      "explanation": "Pipelines are the orchestration engine in Fabric, allowing you to chain activities like Copy Data, Notebook, and Dataflow. Dataflows Gen2 focus on transformation, not orchestration of multiple steps. Notebooks execute code but don't schedule complex workflows. Activator is for real-time alerts."
    },
    {
      "id": "dp700-1-027",
      "module": 1,
      "text": "A data engineer wants to run a Spark notebook that reads a large CSV file but must limit memory usage. Which Spark configuration is the BEST way to control memory consumption?",
      "options": [
        "spark.driver.memory",
        "spark.sql.shuffle.partitions",
        "spark.memory.fraction",
        "spark.executor.cores"
      ],
      "correct": 2,
      "explanation": "spark.memory.fraction controls the fraction of JVM heap used for Spark memory (execution and storage). Tuning this can limit overall memory usage. Driver memory affects the driver, not executors. Shuffle partitions affect parallelism, not total memory. Executor cores affect concurrency."
    },
    {
      "id": "dp700-1-028",
      "module": 1,
      "text": "In a Dataflow Gen2, you notice that after adding a custom column the query folding is lost. What is the most likely reason?",
      "options": [
        "Custom column uses a non-foldable function",
        "Dataflow has reached its row limit",
        "Dataflow is set to Manual Refresh",
        "The source does not support folding"
      ],
      "correct": 0,
      "explanation": "Query folding breaks when a transformation uses a function that cannot be translated into the source's native query language (e.g., complex M functions). Row limits, manual refresh, and source folding capability are not the direct cause after adding a custom column."
    },
    {
      "id": "dp700-1-029",
      "module": 1,
      "text": "You need to process streaming data from Azure Event Hubs and write the results to a KQL database in real time. Which combination provides the lowest latency?",
      "options": [
        "Eventstream → Activator → KQL",
        "Eventstream → Pipeline → KQL",
        "Dataflow Gen2 → Lakehouse → KQL",
        "Notebook → Eventstream → KQL"
      ],
      "correct": 0,
      "explanation": "Eventstream directly to Activator to KQL database is the most direct real-time path with minimal latency. Pipelines and Dataflows introduce batch-oriented delays. Notebooks add overhead."
    },
    {
      "id": "dp700-1-030",
      "module": 1,
      "text": "A notebook uses Spark Structured Streaming with a foreachBatch sink to write to a lakehouse. Which setting ensures exactly-once semantics?",
      "options": [
        "checkpointLocation",
        "outputMode = Append",
        "trigger = ProcessingTime('5 minutes')",
        "spark.sql.streaming.allowMultipleContexts"
      ],
      "correct": 0,
      "explanation": "checkpointLocation stores offsets and state, enabling fault-tolerance and exactly-once semantics. OutputMode and trigger affect behavior but not exactly-once. allowMultipleContexts is not related."
    },
    {
      "id": "dp700-1-031",
      "module": 1,
      "text": "Which of the following statements about Dataflows Gen2 is FALSE?",
      "options": [
        "They support query folding when possible.",
        "They can be scheduled independently of pipelines.",
        "They automatically duplicate data to a warehouse.",
        "They can write directly to Delta tables."
      ],
      "correct": 2,
      "explanation": "Dataflows Gen2 do not automatically duplicate data to a warehouse. They write to destinations as configured. Query folding, independent scheduling, and writing to Delta tables are true."
    },
    {
      "id": "dp700-1-032",
      "module": 1,
      "text": "You have a Dataflow Gen2 that reads from a REST API with pagination. Which Power Query function helps retrieve all pages efficiently?",
      "options": [
        "List.Generate",
        "Table.Combine",
        "Json.Document",
        "Web.Contents with relativePath"
      ],
      "correct": 0,
      "explanation": "List.Generate is a powerful function for creating lists with custom logic, often used to handle pagination by iterating over pages. Table.Combine merges tables, Json.Document parses JSON, Web.Contents fetches a single page."
    },
    {
      "id": "dp700-1-033",
      "module": 1,
      "text": "A pipeline needs to pass a runtime value to a Spark notebook as a parameter. Which activity type should you use?",
      "options": [
        "Copy Data",
        "Notebook",
        "Data Flow",
        "Stored Procedure"
      ],
      "correct": 1,
      "explanation": "Notebook activity allows passing parameters to the notebook. Copy Data, Data Flow, and Stored Procedure activities do not provide this parameter passing mechanism for notebooks."
    },
    {
      "id": "dp700-1-034",
      "module": 1,
      "text": "You must enforce schema validation on incoming JSON files before they are written to the bronze layer. Which tool provides the most flexible validation?",
      "options": [
        "Dataflow Gen2 with Power Query M",
        "Notebook with Spark",
        "Eventstream with mapping",
        "Pipeline with Data Flow activity"
      ],
      "correct": 1,
      "explanation": "Spark notebooks offer the most flexible schema validation through explicit schema definitions, complex logic, and error handling. Dataflows Gen2 are less flexible for custom validation. Eventstream mapping is limited. Pipeline Data Flow activity is similar to Dataflow."
    },
    {
      "id": "dp700-1-035",
      "module": 1,
      "text": "When configuring an Eventstream, which destination supports both KQL queries and T-SQL access?",
      "options": [
        "Lakehouse (Delta)",
        "KQL database",
        "Warehouse",
        "Eventhouse"
      ],
      "correct": 1,
      "explanation": "A KQL database supports both KQL and a subset of T-SQL. The KQL Queryset connected to the KQL database allows users to query the same data using either language. Lakehouses support T-SQL only via the SQL analytics endpoint. Warehouses are T-SQL only. Eventhouse is the container, not a destination."
    },
    {
      "id": "dp700-1-036",
      "module": 1,
      "text": "A pipeline contains a ForEach activity that iterates over 100 items. By default, how many iterations run in parallel?",
      "options": [
        "1",
        "10",
        "20",
        "50"
      ],
      "correct": 2,
      "explanation": "In Fabric pipelines (and Azure Data Factory), the ForEach activity defaults to 20 parallel iterations. You can adjust this using the batchCount property (range 1-50)."
    },
    {
      "id": "dp700-1-037",
      "module": 1,
      "text": "Which Spark configuration property must be set to enable the native execution engine, in addition to `spark.native.enabled`?",
      "options": [
        "spark.sql.adaptive.enabled",
        "spark.shuffle.manager",
        "spark.sql.legacy.allowUntrustedColumnar",
        "spark.executor.memoryOverhead"
      ],
      "correct": 1,
      "explanation": "You must set spark.shuffle.manager to org.apache.spark.shuffle.sort.ColumnarShuffleManager. Both properties together enable the native vectorized execution engine."
    },
    {
      "id": "dp700-1-038",
      "module": 1,
      "text": "A Spark notebook writes a DataFrame using `df.write.mode(\"overwrite\").partitionBy(\"year\").parquet(\"path\")`. What happens to existing data in `year=2023` folder?",
      "options": [
        "It is overwritten only if the new data contains 2023 records",
        "The entire destination path is deleted before writing",
        "Only partitions that exist in the new data are overwritten",
        "An error occurs because partitionBy cannot be used with overwrite"
      ],
      "correct": 1,
      "explanation": "When using mode(\"overwrite\") with partitionBy on a directory path, Spark overwrites the entire destination directory, not just the partitions present in the new data. To preserve existing partitions, use mode(\"overwrite\") with insertInto() on a Hive-partitioned table."
    },
    {
      "id": "dp700-1-039",
      "module": 1,
      "text": "A Dataflow Gen2 has a source query that takes 10 minutes to run. After adding a filter step, the refresh time becomes 11 minutes. What does this indicate?",
      "options": [
        "The filter step is causing a data type conversion",
        "Query folding is occurring",
        "Query folding is not occurring",
        "The source does not support parallel processing"
      ],
      "correct": 2,
      "explanation": "If the filter step was folding into the source query, the total time would be roughly the same (still 10 minutes). The extra 1 minute indicates the filter is applied after data is loaded into memory (no query folding), adding overhead."
    },
    {
      "id": "dp700-1-040",
      "module": 1,
      "text": "Which of the following pipeline activities can be used inside a ForEach loop to execute a dynamic SQL statement against a warehouse?",
      "options": [
        "Copy Data",
        "Script",
        "Stored Procedure",
        "Lookup"
      ],
      "correct": 2,
      "explanation": "Stored Procedure activity executes a stored procedure in a Fabric warehouse. It can be parameterized, making it suitable inside a loop to run dynamic SQL."
    },
    {
      "id": "dp700-1-041",
      "module": 1,
      "text": "A Spark job writes 1 GB of data to a Delta table with OptimizeWrite enabled. Approximately how much data will be written temporarily during the operation?",
      "options": [
        "500 MB",
        "1 GB",
        "2 GB",
        "4 GB"
      ],
      "correct": 1,
      "explanation": "OptimizeWrite coalesces writes in memory but does not duplicate data. The write will still write approximately 1 GB of Parquet data to storage. It reduces the number of small files, not the total bytes written."
    },
    {
      "id": "dp700-1-042",
      "module": 1,
      "text": "A pipeline must copy data from a REST API to a lakehouse only if the API returns a success status code. Which control flow activity should you use to check the status?",
      "options": [
        "Until",
        "If Condition",
        "Switch",
        "Wait"
      ],
      "correct": 1,
      "explanation": "If Condition activity allows branching based on an expression. You can use it after a Web activity (calling the API) to check the status code and proceed only if successful."
    },
    {
      "id": "dp700-1-043",
      "module": 1,
      "text": "Which Spark DataFrame method is most efficient for removing duplicate rows based on a subset of columns?",
      "options": [
        "df.distinct()",
        "df.dropDuplicates([\"col1\", \"col2\"])",
        "df.groupBy(\"col1\", \"col2\").agg(first(\"*\"))",
        "df.drop_duplicates(subset=[\"col1\", \"col2\"])"
      ],
      "correct": 1,
      "explanation": "dropDuplicates(subset) removes duplicates based on the specified columns, keeping the first occurrence. It is optimized for this purpose. distinct() uses all columns. groupBy with first is a workaround but less efficient."
    },
    {
      "id": "dp700-1-044",
      "module": 1,
      "text": "A Dataflow Gen2 is failing with a \"timeout\" error after 1 hour. Which setting can you adjust to allow longer execution?",
      "options": [
        "Dataflow size limit",
        "Query folding timeout",
        "Dataflow Gen2 does not support timeout adjustment",
        "The timeout is controlled by the pipeline's activity policy"
      ],
      "correct": 3,
      "explanation": "When a Dataflow Gen2 is run as a pipeline activity, the timeout is configured in the pipeline activity settings. Standalone dataflows have different limits."
    },
    {
      "id": "dp700-1-045",
      "module": 1,
      "text": "Which of the following best describes a Spark Environment in Microsoft Fabric?",
      "options": [
        "A container for notebook code and execution history",
        "A combination of a runtime, custom libraries, Spark properties, and resource files attached to a workspace or notebook",
        "A managed Spark pool with predefined node sizes",
        "A built-in MLFlow tracking server for experiments"
      ],
      "correct": 1,
      "explanation": "A Spark Environment defines the runtime version, custom libraries (PyPI, jar), Spark configuration properties, and resource files. It can be attached to a workspace or specific notebook, ensuring consistent execution across sessions."
    },
    {
      "id": "dp700-1-046",
      "module": 1,
      "text": "Which of the following describes the purpose of query folding in Dataflows Gen2?",
      "options": [
        "Combining multiple dataflows into a single query",
        "Pushing transformation steps back to the source system for execution",
        "Splitting a large dataflow into smaller parallel queries",
        "Creating a materialized view of the dataflow output"
      ],
      "correct": 1,
      "explanation": "Query folding means that Power Query transforms (e.g., filter, join, group by) are translated into the source system's native query language (SQL, OData, etc.) and executed there, reducing the amount of data pulled into the dataflow."
    },
    {
      "id": "dp700-1-047",
      "module": 1,
      "text": "Which of the following describes the role of the driver in a Spark pool?",
      "options": [
        "Executes data processing tasks on worker nodes",
        "Coordinates the distributed job, schedules tasks, and collects results",
        "Manages storage of Delta tables in OneLake",
        "Provides autoscaling decisions based on workload"
      ],
      "correct": 1,
      "explanation": "The driver runs on the head node and coordinates the execution of Spark jobs, schedules tasks on executors, and collects results. Executors on worker nodes perform the actual data processing."
    },
    {
      "id": "dp700-1-048",
      "module": 1,
      "text": "Which of the following best describes a control flow activity in a Fabric pipeline?",
      "options": [
        "An activity that moves data from a source to a destination",
        "An activity that transforms data using Spark or Dataflows",
        "An activity that manages branching, looping, and variable handling (e.g., ForEach, If Condition, Until)",
        "An activity that deletes data after processing"
      ],
      "correct": 2,
      "explanation": "Control flow activities include ForEach, If Condition, Until, Set Variable, and Wait. They orchestrate execution logic but do not move or transform data directly."
    },
    {
      "id": "dp700-1-049",
      "module": 1,
      "text": "A data engineer needs to create a Dataflow Gen2 that will be shared across multiple analytics teams, each needing different subsets of the data. What is the recommended approach?",
      "options": [
        "Create one large dataflow and have each team filter in their own reports",
        "Create a global dataflow first, then specialized dataflows that reference it",
        "Create separate pipelines for each team",
        "Duplicate the source queries for each team"
      ],
      "correct": 1,
      "explanation": "Horizontal partitioning using a global dataflow with specialized child dataflows allows different teams to work with subsets of the data without duplicating the extraction and transformation logic. This is the recommended approach for multi-team scenarios in Fabric."
    },
    {
      "id": "dp700-1-050",
      "module": 1,
      "text": "A developer wants to understand the M code generated by their Power Query transformations. Where in the Power Query Online interface can they view this code?",
      "options": [
        "The Data Preview pane",
        "The Advanced Editor in the Query Settings pane",
        "The Diagram view",
        "The Queries pane"
      ],
      "correct": 1,
      "explanation": "The Advanced Editor, located in the Query Settings pane, shows the M code that Power Query generates behind the scenes for every transformation. The Data Preview shows sample data, the Diagram view shows query relationships, and the Queries pane lists the data sources."
    },
    {
      "id": "dp700-1-051",
      "module": 1,
      "text": "In the Power Query Online interface, what is the difference between how data sources are named during editing versus after they are loaded to a destination?",
      "options": [
        "They are called queries during editing and tables once loaded to a destination",
        "They are called tables during editing and queries once loaded",
        "The naming never changes",
        "They are called sources during editing and datasets once loaded"
      ],
      "correct": 0,
      "explanation": "In Power Query Online, data sources are called 'queries' during the editing phase. Once the dataflow is published and data is loaded to a destination, those same sources become 'tables'. This terminology distinction is a common exam point."
    },
    {
      "id": "dp700-1-052",
      "module": 1,
      "text": "A data engineer creates a Dataflow Gen2 without configuring a destination. Which statement is true about this dataflow?",
      "options": [
        "It will fail to publish because a destination is required",
        "It can be published and used as a logical data source for pipelines or Power BI Desktop",
        "It will only work if a pipeline is created first",
        "It automatically creates a default lakehouse destination"
      ],
      "correct": 1,
      "explanation": "Adding a destination to a dataflow is optional. A dataflow can exist without a configured destination and still serve as a logical data source for downstream pipelines or for report developers connecting through Power BI Desktop. This is different from pipelines where every Copy Data activity requires both source and destination."
    },
    {
      "id": "dp700-1-053",
      "module": 1,
      "text": "A pipeline must pass a folder name to a Copy Data activity so the same pipeline can ingest different folders without modification. Which feature should be used?",
      "options": [
        "A trigger with custom properties",
        "A pipeline parameter defined in pipeline settings and referenced in the activity",
        "A global variable in the workspace settings",
        "A configuration file in OneLake"
      ],
      "correct": 1,
      "explanation": "Parameters make pipelines reusable by accepting dynamic values each time the pipeline runs. They are defined in pipeline settings and referenced within activities. This allows the same pipeline to process different folders, files, or sources without manual modification."
    },
    {
      "id": "dp700-1-054",
      "module": 1,
      "text": "Before executing a pipeline for the first time, a developer wants to check for configuration errors. What should they do?",
      "options": [
        "Run the pipeline in debug mode",
        "Use the Validate option in the pipeline editor",
        "Check the pipeline run history for errors",
        "Manually review each activity configuration"
      ],
      "correct": 1,
      "explanation": "The Validate option checks the pipeline configuration for errors before execution. It helps catch issues like missing source connections, invalid parameter references, or incomplete activity settings. Running without validation may waste time and resources on failed executions."
    },
    {
      "id": "dp700-1-055",
      "module": 1,
      "text": "A data engineer needs to create a pipeline that copies data from Azure Blob Storage to a lakehouse. Which activity provides the highest performance for this raw data movement?",
      "options": [
        "Dataflow Gen2 activity",
        "Copy Data activity",
        "Notebook activity with PySpark",
        "Stored Procedure activity"
      ],
      "correct": 1,
      "explanation": "Copy Data activity is optimized for high-performance raw data movement between supported sources and destinations without transformations. It is the best choice for moving large volumes of data. Dataflow Gen2 is better when transformations are needed during ingestion."
    },
    {
      "id": "dp700-1-056",
      "module": 1,
      "text": "A developer creates a pipeline using a prebuilt ingestion scenario. Where can they find these templates?",
      "options": [
        "The Templates tile when creating a new pipeline",
        "The Fabric documentation site",
        "The workspace settings page",
        "The Admin portal Templates section"
      ],
      "correct": 0,
      "explanation": "Microsoft Fabric provides predefined pipeline templates for common ingestion scenarios. These are accessed from the Templates tile when creating a new pipeline. After selecting a template, you can customize the resulting activities on the canvas to fit your specific needs."
    },
    {
      "id": "dp700-1-057",
      "module": 1,
      "text": "A pipeline run fails and the engineer needs to find the error details. What unique identifier should they look for in the run history?",
      "options": [
        "The pipeline name",
        "The workspace ID",
        "The unique run ID generated for each pipeline execution",
        "The trigger name"
      ],
      "correct": 2,
      "explanation": "Each time a pipeline is executed, a unique run ID is generated. This ID is used for monitoring and troubleshooting in the run history. You can review run details to confirm success or investigate failures using this identifier."
    },
    {
      "id": "dp700-1-058",
      "module": 1,
      "text": "A Fabric administrator needs to ensure that Spark jobs start quickly with minimal configuration. What should they use?",
      "options": [
        "A custom Spark pool with specific node configurations",
        "The starter pool provided by default in each workspace",
        "A third-party Spark cluster",
        "An Azure Databricks workspace"
      ],
      "correct": 1,
      "explanation": "The starter pool is provided by default in each workspace and enables Spark jobs to start quickly with minimal setup. Custom pools require explicit configuration and are for specialized workloads. The starter pool can be configured to optimize nodes for specific workloads or cost constraints."
    },
    {
      "id": "dp700-1-059",
      "module": 1,
      "text": "A Spark administrator wants to control whether executor processes are dynamically allocated on worker nodes based on data volumes. Which setting should they configure?",
      "options": [
        "Autoscale",
        "Dynamic allocation",
        "Node family",
        "Native execution engine"
      ],
      "correct": 1,
      "explanation": "Dynamic allocation controls whether executor processes are dynamically allocated on worker nodes based on data volumes. Autoscale controls whether nodes are automatically provisioned. These two settings work together but are independent of each other."
    },
    {
      "id": "dp700-1-060",
      "module": 1,
      "text": "A data scientist wants to ensure that their Spark notebook uses the same Python libraries as their production Spark job. What should they configure?",
      "options": [
        "A Spark pool with specific node types",
        "A Spark Environment that includes the runtime plus custom libraries and configurations",
        "The workspace default lakehouse",
        "The starter pool configuration"
      ],
      "correct": 1,
      "explanation": "An Environment consists of a runtime (Spark, Delta Lake, Python versions) plus custom public libraries, uploaded packages, Spark configuration properties, and resource files. Environments ensure parity between development in notebooks and production in Spark jobs."
    },
    {
      "id": "dp700-1-061",
      "module": 1,
      "text": "A Spark developer needs to deploy a production ETL script that runs on a schedule without interactive debugging. Which option is most appropriate?",
      "options": [
        "A Spark notebook with %%sql magic commands",
        "A Spark Job Definition that is script-based and supports scheduled execution",
        "A Dataflow Gen2 with Power Query transformations",
        "A Fabric Activator rule"
      ],
      "correct": 1,
      "explanation": "Spark Job Definitions are script-based and support on-demand or scheduled execution. They are best suited for production automation where reliability, scheduling, and repeatability are required. Notebooks are interactive and better for exploration and development."
    },
    {
      "id": "dp700-1-062",
      "module": 1,
      "text": "When does a Spark session begin in a Fabric notebook?",
      "options": [
        "When the notebook is created",
        "When the first cell is executed",
        "When the workspace is created",
        "When the lakehouse is attached"
      ],
      "correct": 1,
      "explanation": "A Spark session is initiated when you execute the first cell in a notebook. The session persists until it is stopped or times out from inactivity. This is important to understand for session management and resource planning."
    },
    {
      "id": "dp700-1-063",
      "module": 1,
      "text": "A data scientist wants to disable automatic ML experiment tracking in Fabric. Where should they configure this?",
      "options": [
        "In the notebook settings",
        "In the workspace settings under Data Engineering and Science",
        "In the Spark Environment configuration",
        "In the Admin portal"
      ],
      "correct": 1,
      "explanation": "Automatic MLFlow logging is enabled by default in Fabric. It can be disabled in the workspace settings under the Data Engineering and Science section. It does not need to be disabled at the notebook level or in the Admin portal."
    },
    {
      "id": "dp700-1-064",
      "module": 1,
      "text": "A Spark developer loads a CSV file using spark.read.load with format='csv' and does not specify a schema. What happens?",
      "options": [
        "The load fails because schema is required for CSV files",
        "Spark infers the schema by scanning the data, which is slower but automatic",
        "Spark uses a default schema with all columns as strings",
        "Spark reads the file header as the schema automatically"
      ],
      "correct": 1,
      "explanation": "When no schema is specified, Spark infers the schema by scanning the data. This requires a full data scan pass, making it slower than providing an explicit schema. Inferred schemas can also result in type mismatches if the data contains unexpected values."
    },
    {
      "id": "dp700-1-065",
      "module": 1,
      "text": "A Spark developer writes a DataFrame using df.write.mode('overwrite').parquet('path'). If the path already contains data, what happens?",
      "options": [
        "Only files matching the new data are overwritten",
        "The entire destination is deleted and replaced with the new data",
        "An error is thrown to prevent accidental data loss",
        "New files are appended alongside existing files"
      ],
      "correct": 1,
      "explanation": "The overwrite mode replaces the entire existing data at the specified path with the new data. It does not selectively overwrite only matching files. The append mode adds new data without removing existing data."
    },
    {
      "id": "dp700-1-066",
      "module": 1,
      "text": "A Spark developer creates a DataFrame and wants to save it as a managed Delta table in the Spark catalog. Which code should they use?",
      "options": [
        "df.write.parquet('Tables/MyTable')",
        "df.write.saveAsTable('MyTable')",
        "df.createOrReplaceTempView('MyTable')",
        "df.write.format('delta').save('Files/MyTable')"
      ],
      "correct": 1,
      "explanation": "saveAsTable creates a managed table in the Spark catalog, storing both metadata and data in the Fabric-managed Tables location. Writing to the Tables folder manually creates files but does not register them in the catalog. Temporary views are session-scoped only."
    },
    {
      "id": "dp700-1-067",
      "module": 1,
      "text": "A Spark DataFrame is partitioned by a high-cardinality column containing 1 million unique values. What performance issue is most likely to occur?",
      "options": [
        "The data becomes read-only",
        "Too many small files are created, degrading read and write performance",
        "The partition column is automatically dropped from the schema",
        "Spark automatically converts to a non-partitioned format"
      ],
      "correct": 1,
      "explanation": "Over-partitioning on high-cardinality columns creates too many small files, which degrades performance. The optimal pattern is to partition only on columns that are frequently used in WHERE filters and have a reasonable number of distinct values (e.g., year, month, region)."
    },
    {
      "id": "dp700-1-068",
      "module": 1,
      "text": "A developer creates a global temporary view in Spark. How long does this view persist?",
      "options": [
        "Only for the duration of the current notebook cell",
        "For the lifetime of the Spark application, accessible across sessions",
        "Until the next workspace save operation",
        "It persists forever in the Spark catalog"
      ],
      "correct": 1,
      "explanation": "Global temporary views are scoped to the Spark application and are accessible across sessions within that application. They are automatically deleted when the application ends. Regular temporary views (createOrReplaceTempView) are session-scoped."
    },
    {
      "id": "dp700-1-069",
      "module": 1,
      "text": "A data analyst wants to create a visualization from Spark DataFrame results using Matplotlib. What must they do first?",
      "options": [
        "Register the DataFrame as a temporary view",
        "Convert the Spark DataFrame to a Pandas DataFrame using toPandas()",
        "Save the DataFrame to a lakehouse first",
        "Use the %%python magic in a notebook cell"
      ],
      "correct": 1,
      "explanation": "Matplotlib requires Pandas DataFrames, not Spark DataFrames. You must convert using the toPandas() method. However, this conversion pulls data to the driver node, so it should be used selectively on aggregated or subset data rather than on full datasets."
    },
    {
      "id": "dp700-1-070",
      "module": 1,
      "text": "A developer wants to make KQL database data accessible to Power BI, Warehouse, and other Fabric services. What should they enable?",
      "options": [
        "A database shortcut to the KQL database",
        "OneLake availability for the KQL database or specific tables",
        "A KQL Queryset shared with the workspace",
        "An Eventstream connected to the KQL database"
      ],
      "correct": 1,
      "explanation": "OneLake availability makes KQL database data accessible throughout the Fabric ecosystem for cross-service integration with Power BI, Warehouse, Lakehouse, and other Fabric services. Database shortcuts are for querying external KQL databases without copying data."
    },
    {
      "id": "dp700-1-071",
      "module": 1,
      "text": "A team has KQL databases in multiple Eventhouses and wants to query them all from a single location without copying data. What should they use?",
      "options": [
        "OneLake availability",
        "Database shortcuts to reference external KQL databases",
        "A Union query in a KQL Queryset",
        "A Dataflow Gen2 to consolidate the data"
      ],
      "correct": 1,
      "explanation": "Database shortcuts allow you to query data from external KQL databases in other Eventhouses or Azure Data Explorer without copying the data. The external data appears as if it were stored locally in your Eventhouse."
    },
    {
      "id": "dp700-1-072",
      "module": 1,
      "text": "Which Fabric component supports both KQL queries and a subset of T-SQL for querying real-time data?",
      "options": [
        "KQL Queryset",
        "SQL analytics endpoint",
        "Lakehouse",
        "Data Warehouse"
      ],
      "correct": 0,
      "explanation": "The KQL Queryset supports both KQL and T-SQL queries against KQL databases. While T-SQL is a subset of what KQL provides for time-series analysis, it allows users familiar with SQL to query the same data. The SQL analytics endpoint and Warehouse support T-SQL only, not KQL."
    },
    {
      "id": "dp700-1-073",
      "module": 1,
      "text": "A developer wants to analyze IoT sensor data in KQL. They need to find the maximum temperature recorded by each sensor. Which KQL operators should they use?",
      "options": [
        "where and project",
        "summarize with max() and by",
        "take and limit",
        "join and sort by"
      ],
      "correct": 1,
      "explanation": "The summarize operator with max() and the by clause performs aggregations grouped by a column. For example: 'sensors | summarize maxTemperature = max(temperature) by sensorID'. The where operator filters, project selects columns, and take/limit return sample rows."
    },
    {
      "id": "dp700-1-074",
      "module": 1,
      "text": "A KQL developer needs to reorder query results by a numeric column in descending order. Which operator should they use?",
      "options": [
        "order by",
        "sort by",
        "project",
        "summarize"
      ],
      "correct": 1,
      "explanation": "The sort by operator orders results by one or more columns in ascending or descending direction. For example: 'Table | sort by ColumnName desc'. The order of the sort specification (asc/desc) determines the sorting direction."
    },
    {
      "id": "dp700-1-075",
      "module": 1,
      "text": "A developer wants to use Copilot to help write KQL queries against an Eventhouse. What must an administrator do first?",
      "options": [
        "Create a KQL Queryset for each database",
        "Enable Copilot in the Fabric tenant settings and ensure it is not disabled for the user",
        "Install a Copilot extension in the KQL database",
        "Enable OneLake availability for the Eventhouse"
      ],
      "correct": 1,
      "explanation": "Copilot for Real-Time Intelligence must be enabled by an administrator in the Fabric tenant settings. Once enabled, it provides AI-powered KQL code generation in the KQL Queryset as a side pane, generating KQL code based on natural language questions."
    },
    {
      "id": "dp700-1-076",
      "module": 1,
      "text": "A data engineer needs to ingest data from Azure Event Hubs into a KQL database with minimal latency. Which ingestion method should they use?",
      "options": [
        "Schedule a Dataflow Gen2 to read from Event Hubs every minute",
        "Use an Eventstream connected to Event Hubs with a KQL database destination",
        "Copy data first to a lakehouse, then to the KQL database",
        "Use a Spark notebook with a foreachBatch sink"
      ],
      "correct": 1,
      "explanation": "Eventstream provides the lowest latency path for streaming data from Azure Event Hubs to a KQL database. The Eventstream captures data in real time and routes it directly to the KQL database destination. Batch approaches like Dataflows or lakehouse staging introduce unnecessary delays."
    },
    {
      "id": "dp700-1-077",
      "module": 1,
      "text": "A KQL developer runs a query against a table named TaxiTrips but gets an error. The same query works when typed as taxitrips. What is the most likely cause?",
      "options": [
        "The table was recently renamed",
        "KQL is case-sensitive and TaxiTrips does not match the actual table name",
        "The table is in a different database",
        "The query exceeded the row limit"
      ],
      "correct": 1,
      "explanation": "KQL is strictly case-sensitive for all identifiers, including table names, column names, function names, and operators. TaxiTrips, taxitrips, and TAXITRIPS are all different identifiers. This is a common source of query errors and a frequently tested exam concept."
    },
    {
      "id": "dp700-1-078",
      "module": 1,
      "text": "A Fabric administrator needs to prevent workspace users from customizing Spark pool settings. How can this be enforced?",
      "options": [
        "Remove the Contributor role from all users",
        "Disable Spark pool customization at the Fabric capacity level",
        "Delete all custom Spark pools",
        "Set the starter pool as the default for all workspaces"
      ],
      "correct": 1,
      "explanation": "The ability to customize Spark pool settings can be disabled by Fabric administrators at the Fabric capacity level. This prevents users from modifying pool configurations regardless of their workspace role. Workspace roles do not control this capability directly."
    },
    {
      "id": "dp700-1-079",
      "module": 1,
      "text": "A Spark developer needs to select specific columns from a DataFrame and then filter rows where the value exceeds 100. Which method chaining is correct?",
      "options": [
        "df.filter('value > 100').select('col1', 'col2')",
        "df.select('col1', 'col2').where('value > 100')",
        "df.groupBy('col1', 'col2').count()",
        "Both A and B are valid depending on optimization needs"
      ],
      "correct": 3,
      "explanation": "Both select followed by where, and filter followed by select are valid in PySpark. The order can affect performance: filtering before selecting columns can reduce data volume earlier. The where and filter methods are interchangeable in PySpark."
    },
    {
      "id": "dp700-1-080",
      "module": 1,
      "text": "A pipeline runs a notebook activity and then a stored procedure activity. The stored procedure should only run if the notebook succeeds. How should the pipeline be configured?",
      "options": [
        "Place both activities in parallel",
        "Connect the stored procedure activity with a success dependency from the notebook activity",
        "Use an If Condition activity to check notebook status",
        "Run the stored procedure in a separate pipeline"
      ],
      "correct": 1,
      "explanation": "Pipeline activities can be connected with dependency conditions. By default, an activity runs only after the preceding activity succeeds. You can also configure completion, failure, or skipped dependencies. This allows sequential execution with proper error handling."
    },
    {
      "id": "dp700-1-081",
      "module": 1,
      "text": "A developer creates a KQL materialized view for a frequently used aggregation query. How does the system ensure fresh results?",
      "options": [
        "It re-runs the full aggregation on every query",
        "It stores precomputed results and combines them with new data not yet materialized",
        "It refreshes the view once per day on a schedule",
        "It caches results for 5 minutes before re-querying"
      ],
      "correct": 1,
      "explanation": "A KQL materialized view consists of a materialized part (precomputed historical aggregations) and a delta part (new data since last background update). At query time, the system combines both parts transparently to return fresh, up-to-date results."
    },
    {
      "id": "dp700-1-082",
      "module": 1,
      "text": "A data engineer creates a Dataflow Gen2 in ETL mode. What describes this pattern?",
      "options": [
        "A pipeline extracts and loads raw data first, then a Dataflow transforms it",
        "A single Dataflow Gen2 handles extraction, transformation, and loading in one step",
        "Data is extracted without transformation and loaded to a staging area",
        "Multiple dataflows are chained together with dependencies"
      ],
      "correct": 1,
      "explanation": "In the ETL pattern, a single Dataflow Gen2 handles extraction, transformation, and loading in one step. In the ELT pattern, a pipeline extracts and loads raw data first, then a Dataflow Gen2 applies transformations. Distinguishing these patterns is a common exam topic."
    },
    {
      "id": "dp700-1-083",
      "module": 1,
      "text": "A developer needs to create a reusable KQL query that calculates average order value by region and accepts a minimum order count parameter. What should they create?",
      "options": [
        "A materialized view",
        "A stored function with parameters",
        "An update policy",
        "A database shortcut"
      ],
      "correct": 1,
      "explanation": "Stored functions encapsulate KQL queries that accept parameters for reuse and consistency. They are created using the .create-or-alter function command with parameter definitions and a query body. Materialized views store precomputed results, not reusable logic with parameters."
    },
    {
      "id": "dp700-1-084",
      "text": "True or False: A Fabric data pipeline's Copy Data activity can apply transformation logic (filtering rows, renaming columns) to records during the copy operation.",
      "options": [
        "True",
        "False"
      ],
      "correct": 1,
      "module": 1,
      "explanation": "False. Copy Data is a pure extract-and-load activity with no transformation capability. To transform data during ingestion you must use a Dataflow Gen2 activity, a Notebook activity, or a separate Spark notebook in the pipeline."
    },
    {
      "id": "dp700-1-085",
      "text": "True or False: A Dataflow Gen2 in Microsoft Fabric can write its output to multiple destinations in a single run.",
      "options": [
        "True",
        "False"
      ],
      "correct": 0,
      "module": 1,
      "explanation": "True. Dataflows Gen2 support multiple output destinations, allowing a single dataflow to load transformed data into, for example, a Lakehouse table AND an Azure SQL Database in one refresh cycle."
    },
    {
      "id": "dp700-1-086",
      "text": "True or False: V-Order is a read-time optimization that Microsoft Fabric applies automatically when a Spark query reads a Delta table.",
      "options": [
        "True",
        "False"
      ],
      "correct": 1,
      "module": 1,
      "explanation": "False. V-Order is a write-time optimization applied when Delta Parquet files are written (not read). It rearranges data within the file to improve downstream read performance for Power BI Direct Lake and Spark, but no extra work happens at read time."
    },
    {
      "id": "dp700-1-087",
      "text": "True or False: The VACUUM command on a Delta table permanently removes data files that are still within the active transaction log retention window.",
      "options": [
        "True",
        "False"
      ],
      "correct": 1,
      "module": 1,
      "explanation": "False. VACUUM only removes files that are no longer referenced by the current table version AND are older than the retention threshold (default 7 days). Files within the retention window are preserved so time-travel queries remain possible."
    },
    {
      "id": "dp700-1-088",
      "text": "True or False: A Fabric notebook can be scheduled to run automatically using a pipeline Notebook activity on a recurrence trigger.",
      "options": [
        "True",
        "False"
      ],
      "correct": 0,
      "module": 1,
      "explanation": "True. A pipeline with a Notebook activity can be given a scheduled trigger (recurrence), which causes the notebook to run at the defined interval. The pipeline orchestrates the notebook execution."
    },
    {
      "id": "dp700-1-089",
      "text": "Which of the following statements about Dataflows Gen2 in Microsoft Fabric are correct? (Select all that apply)",
      "type": "multi",
      "options": [
        "Dataflows Gen2 use Power Query Online as their authoring interface",
        "Dataflows Gen2 support staging to improve performance on large data volumes",
        "A Dataflow Gen2 can write to only one output destination per run",
        "Dataflows Gen2 can connect to on-premises sources via a Data Gateway"
      ],
      "correct": [
        0,
        1,
        3
      ],
      "module": 1,
      "explanation": "A, B, and D are correct. Dataflows Gen2 use Power Query Online, support staging (an intermediate storage step that improves performance), and can connect to on-premises sources through a Data Gateway. C is wrong — multiple output destinations are supported in a single run."
    },
    {
      "id": "dp700-1-090",
      "text": "Which of the following Delta Lake operations improve read query performance on a large Delta table? (Select all that apply)",
      "type": "multi",
      "options": [
        "OPTIMIZE (compacts small files into larger ones)",
        "VACUUM (removes files older than the retention threshold)",
        "ZORDER BY (co-locates rows with similar filter-column values)",
        "V-Order (Fabric write-time columnar sorting)"
      ],
      "correct": [
        0,
        2,
        3
      ],
      "module": 1,
      "explanation": "A, C, and D improve read performance. OPTIMIZE reduces file-open overhead by compacting small files. ZORDER places related rows together, enabling data skipping for filtered queries. V-Order sorts data within Parquet files for faster reads in Power BI Direct Lake and Spark. VACUUM (B) is storage maintenance — it removes obsolete files but does not improve active query performance."
    },
    {
      "id": "dp700-1-091",
      "text": "Which of the following Fabric pipeline control activities support conditional branching based on an expression or value? (Select all that apply)",
      "type": "multi",
      "options": [
        "If Condition activity",
        "Switch activity",
        "ForEach activity",
        "Until activity"
      ],
      "correct": [
        0,
        1
      ],
      "module": 1,
      "explanation": "A (If Condition) evaluates a boolean expression and routes to a true or false branch. B (Switch) evaluates an expression against multiple case values and routes accordingly. ForEach (C) iterates over a collection — it does not branch. Until (D) loops until a condition is met — it is iteration, not branching."
    },
    {
      "id": "dp700-1-092",
      "text": "A data engineer needs to process data from REST APIs, apply complex business logic, and load results to a Lakehouse. Which Fabric components are suitable for this end-to-end flow? (Select all that apply)",
      "type": "multi",
      "options": [
        "A pipeline with a Copy Data activity to call the REST API",
        "A Dataflow Gen2 with a Web connector to call the REST API",
        "A Spark notebook to call the REST API and apply transformations",
        "A pipeline to orchestrate the notebook and load the Lakehouse"
      ],
      "correct": [
        1,
        2,
        3
      ],
      "module": 1,
      "explanation": "B, C, and D are suitable. Dataflow Gen2 can call REST APIs via the Web connector and transform data. A Spark notebook provides full programmatic control over API calls and complex transformations. A pipeline can orchestrate notebook execution and load results. A (Copy Data) cannot call arbitrary REST APIs with transformation logic — it is designed for supported connector-to-connector bulk copies."
    }
  ];
  
  if (typeof window.__dp700 === 'undefined') {
    window.__dp700 = { modules: [], questions: [] };
  }
  
  window.__dp700.questions = window.__dp700.questions.concat(questions);
  
  if (window.__dp700.modules.length < 1) {
    window.__dp700.modules[0] = "Module 1: Dataflows, Pipelines & Spark";
  }
})();

