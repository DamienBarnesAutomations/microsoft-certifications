var MODULE1_CARDS = [
  // ===== DATAFLOWS GEN2 =====
  {
    id: "m1-c1",
    type: "term",
    topic: "Dataflows Gen2",
    front: "What is Dataflows Gen2 in Microsoft Fabric?",
    back: "A cloud-scale ETL technology built on Power Query Online. It allows you to ingest, transform, and load data using a visual UI or code, with destinations being optional (output can be used downstream). It supports horizontal partitioning for large-scale data processing."
  },
  {
    id: "m1-c2",
    type: "term",
    topic: "Dataflows Gen2",
    front: "What is Power Query Online in the context of Dataflows Gen2?",
    back: "The web-based version of Power Query used as the transformation interface in Dataflows Gen2. It provides a visual, step-by-step editor with M-expression language support for building data transformations."
  },
  {
    id: "m1-c3",
    type: "term",
    topic: "Dataflows Gen2",
    front: "What is horizontal partitioning in Dataflows Gen2?",
    back: "A scalability feature that splits large datasets into smaller partitions processed in parallel. Each partition is handled independently, improving throughput for large-scale ETL workloads."
  },
  {
    id: "m1-c4",
    type: "compare",
    topic: "Dataflows Gen2",
    front: "Compare ETL vs ELT patterns in the context of Dataflows Gen2.",
    back: "<b>ETL (Extract-Transform-Load):</b> Data is extracted from source, transformed in a staging layer (Dataflows Gen2), then loaded to the destination. Best when heavy transformations are needed before storage.<br><br><b>ELT (Extract-Load-Transform):</b> Data is extracted and loaded raw into the destination first, then transformed using the destination's compute (e.g., Spark SQL or T-SQL). Best when raw data must be preserved or source transformation power is limited."
  },
  {
    id: "m1-c5",
    type: "scenario",
    topic: "Dataflows Gen2",
    front: "Your team needs to build a reusable ETL transformation that combines data from three different sources (SQL Server, SharePoint, and a CSV file) using a visual interface. Non-technical analysts need to modify the logic later. What should you use?",
    back: "<b>Solution:</b> Dataflows Gen2 with Power Query Online.<br><br><b>Reasoning:</b> Dataflows Gen2 provides a visual, low-code interface (Power Query Online) ideal for analysts. It supports multiple source types including databases, SharePoint, and files. The output can feed downstream artifacts like datasets or pipelines."
  },
  {
    id: "m1-c6",
    type: "edge",
    topic: "Dataflows Gen2",
    front: "What happens when a Dataflows Gen2 has no destination configured?",
    back: "Destinations in Dataflows Gen2 are optional. When no destination is set, the transformed output is still available as a staging output that can be consumed by downstream artifacts (e.g., a Data Pipeline using the <code>Dataflow</code> activity or a DirectQuery dataset). This enables a &#39;transform-only&#39; pattern where data doesn&#39;t need to be persisted in a lakehouse."
  },
  {
    id: "m1-c7",
    type: "edge",
    topic: "Dataflows Gen2",
    front: "What are the key limitations of Dataflows Gen2?",
    back: "Key limitations include: (1) No support for real-time streaming data — batch-only. (2) Limited to Power Query Online transformations — complex custom logic may require notebooks. (3) Scaling large data volumes can require careful partitioning strategy. (4) Not suitable for very large (>100 GB) single-table transformations without partitioning. (5) No built-in scheduling — relies on pipeline triggers."
  },
  // ===== DATA PIPELINES =====
  {
    id: "m1-c8",
    type: "term",
    topic: "Data Pipelines",
    front: "What is a Data Pipeline in Microsoft Fabric?",
    back: "A cloud-based orchestration engine built on Azure Data Factory (ADF) architecture. It provides 200+ connectors, control flow activities, copy activities, and triggers for scheduling and orchestrating data movement and transformation across services."
  },
  {
    id: "m1-c9",
    type: "term",
    topic: "Data Pipelines",
    front: "What is the Copy Data activity in Fabric Data Pipelines?",
    back: "A built-in activity that ingests data from a source connector to a destination connector with optional column mapping and transformations. It handles schema drift, supports staged copy, and can be used with or without a staging area."
  },
  {
    id: "m1-c10",
    type: "term",
    topic: "Data Pipelines",
    front: "What are pipeline parameters in Fabric Data Pipelines?",
    back: "Variables that allow pipelines to be dynamic and reusable. Parameters can be passed at runtime from triggers, child pipelines, or manual execution. They support default values and can be used in activities, datasets, and linked services."
  },
  {
    id: "m1-c11",
    type: "term",
    topic: "Data Pipelines",
    front: "What are triggers in Fabric Data Pipelines?",
    back: "Mechanisms that automatically execute pipelines based on a schedule (e.g., daily at 6 AM), on blob creation/events, or via a tumbling window. Triggers are the primary way to operationalize pipelines in production."
  },
  {
    id: "m1-c12",
    type: "term",
    topic: "Data Pipelines",
    front: "What are pipeline runs and validation in Fabric Data Pipelines?",
    back: "<b>Pipeline runs:</b> An execution instance of a pipeline triggered manually or by a trigger. Each run has a unique run ID, status, and log.<br><br><b>Validation:</b> A static check that verifies pipeline definitions, parameter completeness, and activity references before execution. Helps catch configuration errors early."
  },
  {
    id: "m1-c13",
    type: "compare",
    topic: "Data Pipelines",
    front: "Compare Copy Data activity vs Dataflows Gen2 for data movement.",
    back: "<b>Copy Data:</b> Fast, scalable data movement at the row level with optional column mapping. Best for bulk copy between two systems. Supports staging and schema evolution.<br><br><b>Dataflows Gen2:</b> Transformation-focused with Power Query engine. Best when you need complex data shaping, merging, or cleansing during ingestion. Has higher overhead but richer transformation capabilities."
  },
  {
    id: "m1-c14",
    type: "compare",
    topic: "Data Pipelines",
    front: "Compare control flow vs data transformation in Fabric Pipelines.",
    back: "<b>Control flow:</b> Orchestration activities that govern execution order — <code>If Condition</code>, <code>ForEach</code>, <code>Until</code>, <code>Wait</code>, <code>Get Metadata</code>, etc. These do not move or transform data directly.<br><br><b>Data transformation:</b> Actual data movement and shaping done by <code>Copy Data</code>, <code>Dataflow</code>, <code>Notebook</code>, and <code>Stored Procedure</code> activities. These read, write, or process data."
  },
  {
    id: "m1-c15",
    type: "scenario",
    topic: "Data Pipelines",
    front: "You need to orchestrate a daily workflow: copy data from an on-premises SQL Server to a lakehouse, then run a Spark notebook to clean the data, then send a success/failure email. What should you use?",
    back: "<b>Solution:</b> A Data Pipeline with activities: <code>Copy Data</code> (SQL to lakehouse) -> <code>Notebook</code> (Spark cleaning) -> <code>Web</code>/<code>Office 365 Outlook</code> (notification).<br><br><b>Reasoning:</b> Pipelines provide orchestration and control flow (sequencing, conditional logic, retry policies). A single pipeline chains these steps with dependency tracking and logging."
  },
  {
    id: "m1-c16",
    type: "edge",
    topic: "Data Pipelines",
    front: "What happens when a pipeline activity fails mid-execution?",
    back: "By default, the pipeline continues unless the activity has &#39;retry&#39; and &#39;retry interval&#39; configured. For sequential activities, the default behavior marks it as failed. You can add &#39;on failure&#39; dependency paths to run fallback logic (e.g., send an alert). The pipeline run status will show as &#39;Failed&#39; or &#39;Failed with retries exhausted&#39;. You can also configure &#39;on skip&#39; paths for conditional branching."
  },
  {
    id: "m1-c17",
    type: "term",
    topic: "Data Pipelines",
    front: "What are pipeline templates in Fabric?",
    back: "Pre-built pipeline definitions for common scenarios (e.g., incremental load, data copy from common sources). Templates accelerate development by providing reusable patterns that can be customized with parameters."
  },
  // ===== APACHE SPARK IN FABRIC =====
  {
    id: "m1-c18",
    type: "term",
    topic: "Apache Spark in Fabric",
    front: "What is Apache Spark in Microsoft Fabric?",
    back: "A distributed processing framework for large-scale data analytics. Fabric provides managed Spark pools with autoscaling, dynamic allocation, native execution engine optimization, and support for Python, Scala, R, Java, and SQL."
  },
  {
    id: "m1-c19",
    type: "term",
    topic: "Apache Spark in Fabric",
    front: "What are the two Spark pool types in Fabric and how do they differ?",
    back: "<b>Starter pools:</b> Default pools with pre-configured settings, suitable for development and testing. They start quickly and are shared across workspaces.<br><br><b>Custom pools:</b> User-defined pools with specific node families, sizes, autoscale ranges, and dynamic allocation settings. Tailored for production workloads with predictable resource requirements."
  },
  {
    id: "m1-c20",
    type: "term",
    topic: "Apache Spark in Fabric",
    front: "What is node family in Spark pool configuration?",
    back: "The VM hardware type assigned to Spark nodes. Options include <b>Memory Optimized</b> (E-series, for data-intensive workloads), <b>Compute Optimized</b> (F-series, for CPU-heavy jobs), etc. Choosing the right node family impacts performance and cost."
  },
  {
    id: "m1-c21",
    type: "term",
    topic: "Apache Spark in Fabric",
    front: "What is autoscale in Spark pools?",
    back: "A feature that automatically adds or removes nodes (within a configured min-max range) based on workload demand. Helps optimize cost during idle periods and scale out during peak processing."
  },
  {
    id: "m1-c22",
    type: "term",
    topic: "Apache Spark in Fabric",
    front: "What is dynamic allocation in Spark?",
    back: "A Spark-level setting (vs pool-level autoscale) that allows executors to scale up/down within a Spark application based on task queue size. Controlled by <code>spark.dynamicAllocation.enabled</code>, <code>spark.dynamicAllocation.minExecutors</code>, and <code>spark.dynamicAllocation.maxExecutors</code>."
  },
  {
    id: "m1-c23",
    type: "term",
    topic: "Apache Spark in Fabric",
    front: "What is the native execution engine in Fabric Spark?",
    back: "A performance-optimized engine that leverages vectorized query execution and code generation. To enable it, two Spark properties must be set: <code>spark.native.enabled</code> and <code>spark.native.codegen.enabled</code> (or <code>spark.native.codegen.enabled</code> and <code>spark.sql.parquet.enableVectorizedReader</code> depending on version). It accelerates query performance for SQL and DataFrame operations."
  },
  {
    id: "m1-c24",
    type: "edge",
    topic: "Apache Spark in Fabric",
    front: "What two Spark properties are required to enable the native execution engine in Fabric?",
    back: "The two properties are <code>spark.native.enabled</code> (set to <code>true</code>) and <code>spark.native.codegen.enabled</code> (set to <code>true</code>). These enable vectorized execution and runtime code generation for accelerated query performance."
  },
  {
    id: "m1-c25",
    type: "term",
    topic: "Apache Spark in Fabric",
    front: "What is high concurrency mode in Fabric Spark?",
    back: "A session mode that allows multiple users to share a single Spark session, reducing startup latency. It enables interactive analytics where users can run notebooks concurrently against the same session without waiting for individual session initialization."
  },
  {
    id: "m1-c26",
    type: "term",
    topic: "Apache Spark in Fabric",
    front: "What is MLflow in the context of Fabric Spark?",
    back: "An open-source platform for managing the ML lifecycle, integrated into Fabric Spark. It provides experiment tracking (metrics, parameters, artifacts), model registry, and model deployment capabilities within the Fabric environment."
  },
  {
    id: "m1-c27",
    type: "compare",
    topic: "Apache Spark in Fabric",
    front: "Compare Spark runtimes vs environments in Fabric.",
    back: "<b>Spark runtimes:</b> Pre-defined versions of Spark, libraries, and connectors (e.g., Runtime 1.1, 1.2). They determine the base Spark version and built-in package versions. Immutable after creation.<br><br><b>Environments:</b> Customizable configurations layered on top of runtimes. Allow you to install additional libraries (Python/R/Java), set Spark properties, and define session configurations without changing the runtime."
  },
  {
    id: "m1-c28",
    type: "compare",
    topic: "Apache Spark in Fabric",
    front: "Compare Notebooks vs Spark Job Definitions in Fabric.",
    back: "<b>Notebooks:</b> Interactive web-based development environments for ad-hoc analysis, exploration, and iterative development. Support multiple languages in cells, visualizations, and inline markdown. Best for data exploration and prototyping.<br><br><b>Spark Job Definitions:</b> Batch-oriented job configurations for production scheduling. They define a specific script/entry point, input parameters, and a target Spark pool. Best for automated, scheduled, or CI/CD-driven workloads."
  },
  {
    id: "m1-c29",
    type: "compare",
    topic: "Apache Spark in Fabric",
    front: "Compare Starter vs Custom Spark pools.",
    back: "<b>Starter pools:</b> Pre-configured, shared across workspaces, quick to start. Limited configuration control. Best for dev/test and ad-hoc exploration.<br><br><b>Custom pools:</b> Fully configurable (node family, size, autoscale range, dynamic allocation). Dedicated to specific workspaces. Best for production workloads with predictable compute needs and performance requirements."
  },
  {
    id: "m1-c30",
    type: "term",
    topic: "Apache Spark in Fabric",
    front: "What are Spark sessions in Fabric?",
    back: "A Spark session is the unified entry point for interacting with Spark functionality. In Fabric, sessions are created per notebook or job definition. Settings include session timeouts, executor count, memory, and environment references. Sessions persist for the lifetime of the notebook or job unless explicitly terminated."
  },
  {
    id: "m1-c31",
    type: "scenario",
    topic: "Apache Spark in Fabric",
    front: "Your team of 10 data analysts needs to run interactive Spark queries simultaneously with minimal startup delay. What feature should you use?",
    back: "<b>Solution:</b> High concurrency mode.<br><br><b>Reasoning:</b> High concurrency mode allows multiple users to share a single Spark session, eliminating per-user session startup time. Analysts get near-instant query execution without waiting 1-3 minutes for a new Spark session to initialize."
  },
  // ===== SPARK DATAFRAMES AND SPARK SQL =====
  {
    id: "m1-c32",
    type: "term",
    topic: "Spark DataFrames and Spark SQL",
    front: "What is a Spark DataFrame?",
    back: "A distributed collection of data organized into named columns, conceptually equivalent to a table in a relational database or a DataFrame in Python pandas. DataFrames are lazily evaluated and distributed across cluster nodes for parallel processing."
  },
  {
    id: "m1-c33",
    type: "term",
    topic: "Spark DataFrames and Spark SQL",
    front: "How do you load data into a Spark DataFrame in Fabric?",
    back: "Use the <code>spark.read</code> API with appropriate format: <code>spark.read.format(&#39;delta&#39;).load(&#39;path&#39;)</code>, <code>spark.read.csv(&#39;path&#39;)</code>, <code>spark.read.parquet(&#39;path&#39;)</code>, or <code>spark.read.table(&#39;tableName&#39;)</code>. Fabric also supports the <code>Lakehouse</code> shortcut for easy table references."
  },
  {
    id: "m1-c34",
    type: "compare",
    topic: "Spark DataFrames and Spark SQL",
    front: "Compare schema inference vs explicit schema in Spark DataFrames.",
    back: "<b>Schema inference:</b> Spark automatically detects column names and types by sampling data (<code>spark.read.option(&#39;inferSchema&#39;, &#39;true&#39;).csv(...)</code>). Convenient but slower as it requires an extra pass through the data. Best for exploration.<br><br><b>Explicit schema:</b> You define the schema using <code>StructType</code> and <code>StructField</code> before reading. Faster (no inference pass) and ensures type correctness. Best for production pipelines where schema is known upfront."
  },
  {
    id: "m1-c35",
    type: "term",
    topic: "Spark DataFrames and Spark SQL",
    front: "What are common DataFrame operations in Spark?",
    back: "Common operations include: <code>select()</code> (choose columns), <code>where()</code>/<code>filter()</code> (row filtering), <code>groupBy()</code> (aggregation), <code>orderBy()</code>/<code>sort()</code> (ordering), <code>join()</code> (merge DataFrames), <code>withColumn()</code> (add/modify columns), <code>drop()</code> (remove columns), and <code>distinct()</code> (deduplication)."
  },
  {
    id: "m1-c36",
    type: "compare",
    topic: "Spark DataFrames and Spark SQL",
    front: "Compare overwrite vs append save modes in Spark DataFrames.",
    back: "<b>Overwrite (<code>mode(&#39;overwrite&#39;)</code>):</b> Replaces the entire target data directory/table with the current DataFrame content. All existing partitions are removed. Best for full refreshes.<br><br><b>Append (<code>mode(&#39;append&#39;)</code>):</b> Adds new data to the existing target while preserving existing rows. Best for incremental loads. Additional modes include <code>ignore</code> (skip if exists) and <code>errorIfExists</code> (default — throw if target exists)."
  },
  {
    id: "m1-c37",
    type: "term",
    topic: "Spark DataFrames and Spark SQL",
    front: "What is <code>partitionBy</code> in Spark DataFrames?",
    back: "A write option (<code>df.write.partitionBy(&#39;column&#39;).format(&#39;delta&#39;).save(&#39;path&#39;)</code>) that organizes data into subdirectories based on column values. Enables partition pruning at read time, reducing the amount of data scanned. Common partition columns include date, region, or category."
  },
  {
    id: "m1-c38",
    type: "term",
    topic: "Spark DataFrames and Spark SQL",
    front: "What is partition pruning in Spark?",
    back: "A performance optimization where Spark automatically skips irrelevant partitions when reading partitioned data. If a WHERE clause filters on a partition column, Spark reads only the matching partition directories, dramatically reducing I/O and execution time."
  },
  {
    id: "m1-c39",
    type: "edge",
    topic: "Spark DataFrames and Spark SQL",
    front: "What happens when you use too many partitions (over-partitioning) in Spark?",
    back: "Over-partitioning creates many small files and tasks, leading to: (1) task scheduling overhead outweighing processing time, (2) metadata and driver memory pressure from tracking many small tasks, (3) poor file sizes on disk (many tiny files hurting read performance). Rule of thumb: target 128 MB – 1 GB per partition after shuffles."
  },
  {
    id: "m1-c40",
    type: "term",
    topic: "Spark DataFrames and Spark SQL",
    front: "What is the Spark catalog and how do managed vs external tables differ?",
    back: "<b>Spark catalog:</b> A metastore that stores table metadata (schema, location, format). In Fabric, it&#39;s backed by the lakehouse.<br><br><b>Managed tables:</b> Spark controls both the metadata and the data location (under the warehouse directory). Dropping the table deletes the data.<br><br><b>External tables:</b> Spark controls only the metadata; data lives at a user-specified location. Dropping the table preserves the data files."
  },
  {
    id: "m1-c41",
    type: "compare",
    topic: "Spark DataFrames and Spark SQL",
    front: "Compare managed vs external tables in the Spark catalog.",
    back: "<b>Managed tables:</b> Data stored in the default warehouse directory. Dropping the table DROPS both metadata and data. Simpler to use. Best for temp/transform data.<br><br><b>External tables:</b> Data stored at a user-specified external path. Dropping the table preserves the underlying data files. Best for data shared across systems or when you need to keep raw data after table deletion."
  },
  {
    id: "m1-c42",
    type: "term",
    topic: "Spark DataFrames and Spark SQL",
    front: "What are temp views in Spark?",
    back: "Temporary named references to DataFrames that are scoped to the current Spark session. Created with <code>df.createOrReplaceTempView(&#39;name&#39;)</code>. They allow you to run Spark SQL queries against DataFrame content but disappear after the session ends. Use <code>createGlobalTempView()</code> for session-spanning visibility."
  },
  {
    id: "m1-c43",
    type: "term",
    topic: "Spark DataFrames and Spark SQL",
    front: "What is the <code>%%sql</code> magic in Fabric Spark notebooks?",
    back: "A cell magic command in Spark notebooks (Python kernel) that switches the cell context from Python to SQL. Allows running Spark SQL queries directly using the current Spark session. Example: <code>%%sql<br>SELECT region, SUM(sales) FROM sales_data GROUP BY region</code>"
  },
  {
    id: "m1-c44",
    type: "term",
    topic: "Spark DataFrames and Spark SQL",
    front: "What is <code>toPandas()</code> in Spark DataFrames?",
    back: "A method that converts a Spark DataFrame to a pandas DataFrame (<code>spark_df.toPandas()</code>). Used for visualization (e.g., with matplotlib or seaborn) and small-scale analysis. <b>Warning:</b> collects all data to the driver node — only use with small/aggregated results to avoid out-of-memory errors."
  },
  {
    id: "m1-c45",
    type: "scenario",
    topic: "Spark DataFrames and Spark SQL",
    front: "You have a daily sales table partitioned by <code>sale_date</code> with 2 years of data. Users frequently query last week&#39;s sales by <code>sale_date</code>. How should you design the storage?",
    back: "<b>Solution:</b> Partition the Delta table by <code>sale_date</code> (<code>df.write.partitionBy(&#39;sale_date&#39;).format(&#39;delta&#39;).save(&#39;path&#39;)</code>).<br><br><b>Reasoning:</b> Partitioning by the frequently filtered column enables partition pruning. When a user filters on <code>sale_date >= &#39;2026-06-02&#39;</code>, Spark reads only the relevant partition subdirectories instead of scanning all 2 years of data."
  },
  // ===== EVENTHOUSE AND KQL =====
  {
    id: "m1-c46",
    type: "term",
    topic: "Eventhouse and KQL",
    front: "What is an Eventhouse in Microsoft Fabric?",
    back: "A container (workspace-level resource) that holds one or more KQL databases. It provides the compute and storage infrastructure for Real-Time Intelligence workloads, optimized for append-only time-series data."
  },
  {
    id: "m1-c47",
    type: "term",
    topic: "Eventhouse and KQL",
    front: "What is a KQL database in Fabric?",
    back: "A database within an Eventhouse optimized for append-only, time-series data storage and querying via the Kusto Query Language (KQL). It uses columnar storage and indexes (extent tags, row groups) for high-performance analytics on streaming and batch data."
  },
  {
    id: "m1-c48",
    type: "term",
    topic: "Eventhouse and KQL",
    front: "What ingestion methods does KQL support in Fabric?",
    back: "Methods include: (1) <b>Event streaming</b> via Event Streams, (2) <b>Batch ingestion</b> via OneLake shortcuts, (3) <b>GET request</b> / REST API, (4) <b>KQL SDKs</b> (.NET, Python, Java, Node.js), (5) <b>OneLake file/folder shortcuts</b> for data already in lakehouses, (6) <b>Update policies</b> for derived ingestion."
  },
  {
    id: "m1-c49",
    type: "term",
    topic: "Eventhouse and KQL",
    front: "What are database shortcuts in KQL?",
    back: "References (symlinks) to data stored in other KQL databases or Eventhouses. Shortcuts avoid data duplication — queries transparently access remote data as if it were local. They can reference databases in the same or different workspaces."
  },
  {
    id: "m1-c50",
    type: "term",
    topic: "Eventhouse and KQL",
    front: "What is OneLake availability in KQL?",
    back: "A feature that automatically makes KQL database data available as parquet files in OneLake. This allows Spark, SQL, and other Fabric engines to read KQL data without exporting or copying. Enabled per database via the &#39;OneLake availability&#39; setting."
  },
  {
    id: "m1-c51",
    type: "term",
    topic: "Eventhouse and KQL",
    front: "What is a KQL Queryset?",
    back: "A Fabric item that provides an interactive query editor for running KQL queries against KQL databases. It supports multiple tabs, result set downloads, and sharing. Similar to a SQL query editor but for the Kusto Query Language."
  },
  {
    id: "m1-c52",
    type: "term",
    topic: "Eventhouse and KQL",
    front: "Is KQL case-sensitive?",
    back: "KQL is <b>case-sensitive</b> for table names, column names, function names, and string comparisons by default. However, operators like <code>==</code> vs <code>=~</code> control case sensitivity: <code>==</code> is case-sensitive, <code>=~</code> is case-insensitive for string matching."
  },
  {
    id: "m1-c53",
    type: "edge",
    topic: "Eventhouse and KQL",
    front: "What happens when you use a column name with wrong casing in a KQL query?",
    back: "The query will fail with an error like &#39;Column &#39;column_name&#39; not found&#39; because KQL is case-sensitive for column and table names. Always verify casing in the schema. Use <code>.show schema</code> or the schema explorer to check exact column names before writing queries."
  },
  {
    id: "m1-c54",
    type: "term",
    topic: "Eventhouse and KQL",
    front: "What are the core KQL operators for querying data?",
    back: "Core operators include: <code>where</code> (filter rows), <code>project</code> (select columns), <code>take</code>/<code>limit</code> (sample rows), <code>summarize</code> (aggregate), <code>sort</code> / <code>order by</code> (ordering), <code>join</code> (merge tables), <code>extend</code> (add computed columns), <code>distinct</code> (dedup), and <code>count</code> (row count). Operators are piped with <code>|</code>."
  },
  {
    id: "m1-c55",
    type: "compare",
    topic: "Eventhouse and KQL",
    front: "What are the three key KQL query optimization strategies?",
    back: "<b>1. Filter early:</b> Place <code>where</code> clauses as early as possible in the query pipeline to reduce rows flowing through subsequent operators.<br><br><b>2. Reduce columns:</b> Use <code>project</code> early to limit columns to only those needed, reducing memory and shuffle overhead.<br><br><b>3. Optimize join order:</b> Put the smallest (most reduced) table on the left side of <code>join</code> to minimize the build side of the hash join."
  },
  {
    id: "m1-c56",
    type: "term",
    topic: "Eventhouse and KQL",
    front: "What are materialized views in KQL?",
    back: "Pre-computed aggregation results that are maintained incrementally as new data arrives. Defined with <code>.create materialized-view</code>. They improve query performance for repeated aggregation queries (e.g., daily counts by category) by avoiding full table scans on every execution."
  },
  {
    id: "m1-c57",
    type: "term",
    topic: "Eventhouse and KQL",
    front: "What are stored functions in KQL?",
    back: "Reusable query logic saved as named functions in a KQL database, created with <code>.create function</code>. Stored functions can accept parameters, encapsulate complex logic, and be reused across querysets. They are schema-bound and can reference tables or other functions."
  },
  {
    id: "m1-c58",
    type: "scenario",
    topic: "Eventhouse and KQL",
    front: "You have a high-volume IoT telemetry table with billions of rows. Analysts repeatedly query hourly aggregates by device. How should you optimize?",
    back: "<b>Solution:</b> Create a materialized view that pre-computes hourly aggregations by device.<br><br><b>Reasoning:</b> Materialized views incrementally maintain aggregated results as new data arrives, so analysts query pre-computed data instead of scanning the full table each time. This dramatically reduces query latency and resource consumption."
  },
  {
    id: "m1-c59",
    type: "scenario",
    topic: "Eventhouse and KQL",
    front: "Your team frequently uses complex KQL logic (e.g., a multi-step time-series normalization) across many querysets. How should you share this logic?",
    back: "<b>Solution:</b> Encapsulate the logic in a stored function using <code>.create function NormalizeTimeSeries(...)</code>.<br><br><b>Reasoning:</b> Stored functions provide reusable, centrally managed query logic. All team members call the function by name with their parameters, ensuring consistency and reducing code duplication across querysets."
  },
  {
    id: "m1-c60",
    type: "edge",
    topic: "Eventhouse and KQL",
    front: "What happens when you try to update a single row in a KQL database?",
    back: "KQL databases are designed for <b>append-only</b> storage — individual row updates are not supported. To &#39;update&#39; data, you must use a <b>table update policy</b> that applies transformations as data is ingested, or perform a <b>data purge</b> (for deletions) combined with re-ingestion of corrected data. For full row-level updates, consider using a Spark Delta table instead."
  },
  {
    id: "m1-c61",
    type: "term",
    topic: "Eventhouse and KQL",
    front: "What is Copilot in KQL?",
    back: "An AI assistant integrated into the KQL Queryset editor that helps users generate KQL queries using natural language prompts. It can suggest query completions, explain existing queries, and assist with debugging. Part of Microsoft Fabric&#39;s Copilot capabilities."
  },
  {
    id: "m1-c62",
    type: "term",
    topic: "Eventhouse and KQL",
    front: "How does case sensitivity work with KQL string comparison operators?",
    back: "<code>==</code> and <code>!=</code> are case-sensitive. Use <code>=~</code> for case-insensitive equality and <code>!~</code> for case-insensitive not-equal. Example: <code>where name == &#39;Alice&#39;</code> matches exactly &#39;Alice&#39; but not &#39;alice&#39;; <code>where name =~ &#39;alice&#39;</code> matches both."
  }
];
