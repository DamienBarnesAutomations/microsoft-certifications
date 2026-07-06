// Skill Area 3: Monitor, configure, and optimize database resources
(function() {
  var questions = [
    {
      "text": "How long are Azure Monitor metrics retained for active data by default?",
      "options": [
        "30 days",
        "93 days",
        "365 days",
        "Indefinitely"
      ],
      "correct": 1,
      "module": 3,
      "explanation": "Azure Monitor Metrics retains active data for 93 days, after which it is purged. However, you have the option to archive metrics data to Azure Storage for longer retention."
    },
    {
      "text": "Which Performance Monitor counter indicates CPU pressure in SQL Server when its value is greater than zero?",
      "options": [
        "Processor(_Total)\\% Processor Time",
        "System\\Processor Queue Length",
        "PhysicalDisk(_Total)\\Avg. Disk sec/Read",
        "SQLServer:Buffer Manager\\Page life expectancy"
      ],
      "correct": 1,
      "module": 3,
      "explanation": "The System\\Processor Queue Length counter indicates the number of threads waiting for processor time. If it's greater than zero, it indicates CPU pressure, meaning the workload could benefit from more CPUs."
    },
    {
      "text": "What is the recommended maximum storage latency threshold for SQL Server on Azure Premium SSD storage?",
      "options": [
        "5 ms",
        "10 ms",
        "20 ms",
        "50 ms"
      ],
      "correct": 1,
      "module": 3,
      "explanation": "For SQL Server on Azure, latency values should not be above 20 ms in most cases. With Premium SSD storage, you should see values less than 10 ms. Ultra Disk provides sub-millisecond latency."
    },
    {
      "text": "Which Extended Events channel should only be used when troubleshooting with Microsoft support?",
      "options": [
        "Admin",
        "Operational",
        "Analytic",
        "Debug"
      ],
      "correct": 3,
      "module": 3,
      "explanation": "The Debug channel events are not fully documented and should only be used when troubleshooting with Microsoft support. Admin events target administrators, Operational events are for common diagnostics, and Analytic events relate to high-volume performance data."
    },
    {
      "text": "Which Extended Events target processes data synchronously and counts occurrences of events with low overhead?",
      "options": [
        "Event File",
        "Ring Buffer",
        "Event Counter",
        "Histogram"
      ],
      "correct": 2,
      "module": 3,
      "explanation": "The Event Counter target processes synchronously and counts all events that occurred during a session. It provides workload characteristic information without the overhead of full event collection. Event File and Ring Buffer are asynchronous."
    },
    {
      "text": "When creating an Extended Events session, how do filters apply to events?",
      "options": [
        "Filters apply globally to all events in the session",
        "Filters apply to a single field on a single event",
        "Filters apply at the session level, not the event level",
        "Filters are only available for Admin channel events"
      ],
      "correct": 1,
      "module": 3,
      "explanation": "Filters apply to a single field on a single event. If you want to filter the same condition for multiple events, you need a separate filter configuration for each event. For example, filtering out system queries requires a filter on each event being captured."
    },
    {
      "text": "What is the purpose of causality tracking in Extended Events?",
      "options": [
        "To reduce the overhead of event collection",
        "To add a GUID and sequence number to trace event order",
        "To encrypt event data in transit",
        "To automatically filter system events"
      ],
      "correct": 1,
      "module": 3,
      "explanation": "Causality tracking adds a globally unique identifier (GUID) and sequence number to the output of each event, allowing you to easily step through the order that events occurred. This is useful for understanding event sequences."
    },
    {
      "text": "Which Azure SQL Database feature should you use to identify the top five queries by CPU consumption over the last 24 hours?",
      "options": [
        "Query Store",
        "Query Performance Insight",
        "Database Watcher",
        "Azure Monitor Metrics"
      ],
      "correct": 1,
      "module": 3,
      "explanation": "Query Performance Insight allows administrators to quickly identify expensive queries. It provides views for Long Running Queries, Top Resource Consuming Queries, and a Custom tab with filters for CPU, Data IO, Log IO, and memory metrics."
    },
    {
      "text": "Does Query Performance Insight show the execution plan for a query?",
      "options": [
        "Yes, execution plans are shown by default",
        "No, Query Performance Insight does not show execution plans — use Query Store",
        "Yes, but only for the top 5 queries",
        "No, execution plans are only available in Database Watcher"
      ],
      "correct": 1,
      "module": 3,
      "explanation": "Query Performance Insight identifies queries and their query IDs but does NOT show execution plans. To view execution plans, you must use the Query Store, which correlates with the query IDs from Query Performance Insight."
    },
    {
      "text": "Which data store can Database Watcher use to store monitoring data for Azure SQL Database?",
      "options": [
        "Azure SQL Database only",
        "Azure Data Explorer or Real-Time Analytics in Microsoft Fabric",
        "Azure Blob Storage only",
        "Log Analytics workspace"
      ],
      "correct": 1,
      "module": 3,
      "explanation": "Database Watcher requires a data store for monitoring data. You can use a database on an Azure Data Explorer cluster (including free cluster) or a Real-Time Analytics database in Microsoft Fabric."
    },
    {
      "text": "Which Azure managed disk type provides sub-millisecond latency for mission-critical SQL Server workloads?",
      "options": [
        "Premium SSD",
        "Ultra Disk",
        "Standard SSD",
        "Standard HDD"
      ],
      "correct": 1,
      "module": 3,
      "explanation": "Ultra Disk supports high-IO workloads with sub-millisecond latency, making it ideal for mission-critical databases. Premium SSD provides single-digit millisecond latency. Standard SSD and Standard HDD are for dev/test and backup workloads."
    },
    {
      "text": "What is the recommended storage configuration for SQL Server transaction log files on Azure VMs?",
      "options": [
        "Place on the same volume as data files with read-caching enabled",
        "Place on a separate volume with NO read-caching",
        "Place on the D: drive for lowest latency",
        "Place on Standard HDD to reduce costs"
      ],
      "correct": 1,
      "module": 3,
      "explanation": "Transaction log files should be on a separate volume from data files with NO read-caching enabled. Data files benefit from read-caching. The D: drive is ephemeral and should only be used for TempDB."
    },
    {
      "text": "When striping Premium SSD disks with Storage Spaces for SQL Server, what redundancy level should you configure?",
      "options": [
        "Mirroring for data protection",
        "Parity for space efficiency",
        "No redundancy — Azure provides 3x replication at the platform level",
        "Two-way mirror for performance"
      ],
      "correct": 2,
      "module": 3,
      "explanation": "When using Storage Spaces to stripe disks, you should NOT configure any redundancy because Azure already keeps three copies of all disks in synchronous replication to protect against disk failure. Configuring redundancy would limit performance."
    },
    {
      "text": "A SQL Server workload requires high memory and I/O bandwidth but is not CPU-intensive. Which Azure VM feature should reduce licensing costs?",
      "options": [
        "Reserved Instances",
        "Constrained cores",
        "Azure Hybrid Benefit",
        "Spot VMs"
      ],
      "correct": 1,
      "module": 3,
      "explanation": "Constrained cores allow you to reduce the vCPU count while keeping the full amount of memory, storage, and I/O bandwidth. This reduces SQL Server licensing costs for workloads that are not CPU-intensive but need high memory and I/O."
    },
    {
      "text": "How many TempDB data files does Azure SQL Managed Instance provide by default?",
      "options": [
        "8",
        "12",
        "16",
        "Depends on vCores"
      ],
      "correct": 1,
      "module": 3,
      "explanation": "Azure SQL Managed Instance always provides 12 TempDB data files, independent of the number of vCores. For Azure SQL Database, the number of files scales with vCores (max 16). On-premises SQL Server configures up to 8 files during setup."
    },
    {
      "text": "How does proportional fill distribute data across multiple TempDB data files?",
      "options": [
        "Equally — each file gets the same amount of data",
        "Based on file size — larger files get more data",
        "Round-robin across all available files",
        "Based on the number of CPUs"
      ],
      "correct": 1,
      "module": 3,
      "explanation": "Proportional fill distributes data based on the size of each file. If one file is 10 GB and another is 1 GB, about 900 MB goes into the larger file and 100 MB into the smaller one. This can create bottlenecks in the largest file."
    },
    {
      "text": "Which platform supports Resource Governor for managing CPU, I/O, and memory resources?",
      "options": [
        "Azure SQL Database only",
        "SQL Server and Azure SQL Managed Instance",
        "All Azure SQL platforms including SQL Database",
        "Azure Synapse Analytics only"
      ],
      "correct": 1,
      "module": 3,
      "explanation": "Resource Governor is available in SQL Server and Azure SQL Managed Instance. It is NOT available in Azure SQL Database. It provides granular control over CPU, physical I/O, and memory resources for incoming application requests."
    },
    {
      "text": "When does the Resource Governor classifier function execute?",
      "options": [
        "Every time a query is submitted",
        "At connection time and classifies each connection into a workload group",
        "When resources are under contention",
        "When the resource pool is created"
      ],
      "correct": 1,
      "module": 3,
      "explanation": "The classifier function runs at the time a connection is established to the SQL Server instance and classifies each connection into a workload group. If the function returns NULL, 'default', or the name of a nonexistent group, the session goes to the default workload group."
    },
    {
      "text": "What happens when you change Resource Governor pool settings for a currently running long query?",
      "options": [
        "The change takes effect immediately for all sessions",
        "The change only affects new sessions, not the running query",
        "The running query is terminated and restarted",
        "The change takes effect after the query completes its current batch"
      ],
      "correct": 1,
      "module": 3,
      "explanation": "Changes to a resource pool only impact new sessions, not those already in progress. Therefore, modifying a pool will not restrict the resources of a long-running process. The exception is external pools used with Machine Learning Services."
    },
    {
      "text": "In Resource Governor, when is the min/max CPU percentage a hard limit versus a soft limit?",
      "options": [
        "It is always a hard limit regardless of contention",
        "It only applies when there is CPU contention — without contention, the workload can use up to 100%",
        "It is always a soft limit that can be exceeded",
        "It is only applicable for the internal resource pool"
      ],
      "correct": 1,
      "module": 3,
      "explanation": "The min/max CPU percentage in Resource Governor only applies when there is CPU contention. If you set a maximum of 70%, the workload may use up to 100% of available CPU cycles when there's no contention. All other resource pool settings are hard limits."
    },
    {
      "text": "An index has 35% fragmentation. What is the recommended maintenance action?",
      "options": [
        "No action needed — fragmentation is below 50%",
        "Reorganize the index",
        "Rebuild the index",
        "Drop and recreate the index"
      ],
      "correct": 2,
      "module": 3,
      "explanation": "The common guidance for index maintenance is: 5-30% fragmentation = reorganize, greater than 30% = rebuild. Since this index has 35% fragmentation, a rebuild is recommended. Rebuild can be online or offline depending on edition and requirements."
    },
    {
      "text": "Which statement about index rebuild and index reorganize regarding statistics is correct?",
      "options": [
        "Both rebuild and reorganize update statistics",
        "Only rebuild updates statistics; reorganize does not",
        "Only reorganize updates statistics; rebuild does not",
        "Neither operation updates statistics"
      ],
      "correct": 1,
      "module": 3,
      "explanation": "Index rebuilds cause the statistics on the index to be updated, which can further help performance. Index reorganization does NOT update statistics. This is a key distinction for exam questions about index maintenance."
    },
    {
      "text": "Which SQL Server version introduced resumable index rebuild operations?",
      "options": [
        "SQL Server 2016",
        "SQL Server 2017",
        "SQL Server 2019",
        "SQL Server 2022"
      ],
      "correct": 1,
      "module": 3,
      "explanation": "Microsoft introduced resumable rebuild index operations with SQL Server 2017. With SQL Server 2019, the ability to control an associated maximum degree of parallelism on resumable rebuilds was introduced."
    },
    {
      "text": "Which DMV should you query to check fragmentation levels for columnstore indexes?",
      "options": [
        "sys.dm_db_index_physical_stats",
        "sys.dm_db_column_store_row_group_physical_stats",
        "sys.dm_db_index_usage_stats",
        "sys.dm_os_wait_stats"
      ],
      "correct": 1,
      "module": 3,
      "explanation": "For columnstore indexes, use sys.dm_db_column_store_row_group_physical_stats to check physical stats of row groups. For B-tree indexes, use sys.dm_db_index_physical_stats."
    },
    {
      "text": "An application experiences query performance regression due to a suboptimal execution plan. The estimated CPU gain of the recommended plan is 15 seconds. When automatic plan correction is enabled, after how many executions of the better query will the plan be forced?",
      "options": [
        "Immediately",
        "After 5 executions",
        "After 15 executions",
        "After 30 executions"
      ],
      "correct": 2,
      "module": 3,
      "explanation": "When automatic plan correction is enabled, the engine will force the recommended plan after it performs better than the previous one for 15 executions. The conditions are: previous plan had higher error rate, estimated CPU gain >10 seconds, and forced plan performs better."
    },
    {
      "text": "What requirement must be met before executing ALTER DATABASE SET AUTOMATIC_TUNING (FORCE_LAST_GOOD_PLAN = ON)?",
      "options": [
        "The database must be in the Business Critical tier",
        "Query Store must be enabled and in Read-Write mode",
        "The database must be using compatibility level 150",
        "TDE must be enabled"
      ],
      "correct": 1,
      "module": 3,
      "explanation": "For ALTER DATABASE SET AUTOMATIC_TUNING to succeed, Query Store must be enabled and must be in Read-Write mode. If either of those criteria is not met, the ALTER statement fails."
    },
    {
      "text": "Which Intelligent Query Processing feature enables the query optimizer to defer the choice between hash join and nested loops join based on actual input rows?",
      "options": [
        "Interleaved Execution",
        "Adaptive Joins",
        "Memory Grant Feedback",
        "Batch Mode on Rowstore"
      ],
      "correct": 1,
      "module": 3,
      "explanation": "Adaptive Joins allow the database engine to defer the choice between hash join and nested loops join based on the actual number of rows going into the join. This feature currently only works in batch execution mode."
    },
    {
      "text": "Which Intelligent Query Processing feature improves performance of scalar user-defined functions by transforming them into scalar subqueries?",
      "options": [
        "Batch Mode on Rowstore",
        "Scalar UDF Inlining",
        "Interleaved Execution",
        "Table Variable Deferred Compilation"
      ],
      "correct": 1,
      "module": 3,
      "explanation": "Scalar UDF Inlining transforms scalar user-defined functions into scalar subqueries in place of the UDF operator in the execution plan. This enables parallelism and proper cost estimation, which were limitations of scalar functions in older SQL Server versions."
    },
    {
      "text": "What error rate and confidence interval does APPROX_COUNT_DISTINCT guarantee in SQL Server?",
      "options": [
        "1% error rate at 99% confidence",
        "2% error rate at 97% confidence",
        "5% error rate at 95% confidence",
        "0.5% error rate at 99.5% confidence"
      ],
      "correct": 1,
      "module": 3,
      "explanation": "APPROX_COUNT_DISTINCT guarantees a maximum 2% error rate with a 97% confidence interval. It provides a faster approach to counting distinct values compared to a full COUNT(DISTINCT column) query, which is especially beneficial for large tables."
    },
    {
      "text": "Which Intelligent Query Processing feature addresses the issue of multi-statement table-valued functions (MSTVFs) using a fixed row estimate of one or 100 rows?",
      "options": [
        "Memory Grant Feedback",
        "Adaptive Joins",
        "Interleaved Execution",
        "Table Variable Deferred Compilation"
      ],
      "correct": 2,
      "module": 3,
      "explanation": "Interleaved Execution addresses MSTVFs by generating an actual row count from the function before compiling the rest of the plan. Previously, MSTVFs used a fixed row estimate of one or 100 rows, leading to suboptimal plans. Table Variable Deferred Compilation addresses a similar issue for table variables."
    },
    {
      "text": "Which platforms support automatic index management through automatic tuning?",
      "options": [
        "All SQL Server versions 2017+ and Azure SQL Database",
        "Azure SQL Database only",
        "SQL Server 2019+ and Azure SQL Database",
        "Azure SQL Database and Azure SQL Managed Instance"
      ],
      "correct": 1,
      "module": 3,
      "explanation": "Automatic index management is available only for Azure SQL Database. It is not available for on-premises SQL Server or SQL Managed Instance. The feature learns from workloads and provides recommendations for adding or removing indexes."
    },
    {
      "text": "Which Azure SQL Database feature should you use to automate index maintenance when you do not have access to SQL Agent or Windows Task Scheduler?",
      "options": [
        "Database Watcher",
        "Elastic Jobs",
        "Extended Events",
        "Query Performance Insight"
      ],
      "correct": 1,
      "module": 3,
      "explanation": "For Azure SQL Database, since SQL Agent and Windows Task Scheduler are not available, you can use Elastic Jobs to perform scheduled index maintenance. Other options include Azure Automation runbooks or remote SQL Agent from an Azure VM."
    },
    {
      "text": "When using static metric alerts in Azure Monitor, which operator and aggregation types can be used for threshold comparison?",
      "options": [
        "Only 'greater than' operator with average aggregation",
        "Boolean operators such as 'greater than' or 'less than' with aggregations like average, minimum, maximum, count, and total",
        "Only equality operators",
        "Only 'greater than' and 'less than' operators with count aggregation"
      ],
      "correct": 1,
      "module": 3,
      "explanation": "Static alerts offer Boolean operators such as 'greater than' or 'less than' operators, along with aggregate measurements to select from such as average, minimum, maximum, count, and total. This provides flexibility for constructing enterprise-level alerts."
    },
    {
      "text": "When a query is submitted to SQL Server, what is the correct order of processing steps in the query processor?",
      "options": [
        "Optimize, Parse, Algebrizer, Execute",
        "Parse, Algebrizer, Check plan cache, Optimize, Execute",
        "Algebrizer, Parse, Execute, Cache",
        "Parse, Optimize, Algebrizer, Execute"
      ],
      "correct": 1,
      "module": 3,
      "explanation": "The correct flow is: Parse (check syntax, generate parse tree) → Algebrizer (binding, validate objects) → Check plan cache (query_hash match) → Optimize (cost-based if no cached plan) → Execute."
    },
    {
      "text": "Which type of execution plan is generated without executing the query and shows only estimated row counts?",
      "options": [
        "Actual execution plan",
        "Estimated execution plan",
        "Live Query Statistics",
        "Query Store plan"
      ],
      "correct": 1,
      "module": 3,
      "explanation": "The Estimated Execution Plan is generated by the query optimizer without executing the query. Use SET SHOWPLAN_ALL ON to see it in text format. The query does not run and no results are returned."
    },
    {
      "text": "What is the approximate maximum overhead of lightweight query profiling in SQL Server 2019 and Azure SQL?",
      "options": [
        "75%",
        "25%",
        "2%",
        "10%"
      ],
      "correct": 2,
      "module": 3,
      "explanation": "Lightweight profiling has a maximum overhead of approximately 2%, compared to the legacy profiling which could produce up to 75% overhead. It is enabled by default in SQL Server 2019, Azure SQL Database, and Azure SQL Managed Instance."
    },
    {
      "text": "Which hint should be added to a query to enable lightweight profiling at the individual query level?",
      "options": [
        "OPTION (RECOMPILE)",
        "OPTION (USE HINT ('QUERY_PLAN_PROFILE'))",
        "OPTION (MAXDOP 1)",
        "OPTION (OPTIMIZE FOR UNKNOWN)"
      ],
      "correct": 1,
      "module": 3,
      "explanation": "The USE HINT with QUERY_PLAN_PROFILE enables lightweight profiling at the query level. When a query with this hint completes, a query_plan_profile extended event is generated providing an actual execution plan."
    },
    {
      "text": "What are the three stores that make up the SQL Server Query Store?",
      "options": [
        "Plan store, Index store, Wait stats store",
        "Plan store, Runtime stats store, Wait stats store",
        "Cache store, Statistics store, Plan store",
        "Query store, Execution store, Wait store"
      ],
      "correct": 1,
      "module": 3,
      "explanation": "The Query Store consists of three internal stores: the Plan store (estimated execution plans), the Runtime stats store (execution statistics), and the Wait stats store (wait statistics)."
    },
    {
      "text": "Which stored procedure is used to force a specific query plan in the Query Store?",
      "options": [
        "sp_query_store_force_plan",
        "sp_force_plan",
        "sp_set_plan",
        "sp_plan_force"
      ],
      "correct": 0,
      "module": 3,
      "explanation": "The stored procedure sp_query_store_force_plan is used to force a specific plan for a query. It takes @query_id and @plan_id as parameters. Example: EXEC sp_query_store_force_plan @query_id=73, @plan_id=79."
    },
    {
      "text": "Which of the following predicates is SARGable and allows SQL Server to consider an index seek?",
      "options": [
        "WHERE LEFT(City, 1) = 'M'",
        "WHERE City LIKE 'M%'",
        "WHERE City LIKE '%M%'",
        "WHERE CONVERT(CHAR(10), CreateDate, 121) = '2020-03-22'"
      ],
      "correct": 1,
      "module": 3,
      "explanation": "WHERE City LIKE 'M%' is SARGable because the wildcard is not at the beginning — SQL Server can perform an index seek. Non-SARGable predicates include functions on columns (LEFT, CONVERT) and leading wildcards (LIKE '%M%')."
    },
    {
      "text": "At what threshold does SQL Server escalate multiple row locks to a single table lock?",
      "options": [
        "1,000 rows",
        "5,000 rows",
        "10,000 rows",
        "50,000 rows"
      ],
      "correct": 1,
      "module": 3,
      "explanation": "If more than 5,000 rows on a single object need to be locked in a single statement, SQL Server escalates the multiple row locks to a single table lock. This balances concurrency with the memory cost of managing many individual locks."
    },
    {
      "text": "When a deadlock occurs, how does SQL Server choose which transaction to terminate as the deadlock victim?",
      "options": [
        "The transaction that has performed the most work",
        "The transaction that has performed the least amount of work that needs to be rolled back",
        "The transaction that started first",
        "Both transactions are terminated"
      ],
      "correct": 1,
      "module": 3,
      "explanation": "SQL Server detects deadlocks and kills the transaction that has performed the least amount of work that needs to be rolled back. This minimizes the overall impact of the deadlock resolution."
    },
    {
      "text": "Where are deadlock events recorded by default in SQL Server?",
      "options": [
        "SQL Server error log",
        "system_health extended event session",
        "Windows Application Event Log",
        "Query Store"
      ],
      "correct": 1,
      "module": 3,
      "explanation": "Deadlocks are recorded in the system_health extended event session, which is enabled by default in SQL Server. This session captures various system health information including deadlock graphs."
    },
    {
      "text": "A table contains ProductID, Color1, Color2, and Color3 columns. Which normal form does this violate?",
      "options": [
        "First normal form (1NF) — contains repeating groups",
        "Second normal form (2NF) — partial dependency on composite key",
        "Third normal form (3NF) — transitive dependency",
        "It is fully normalized"
      ],
      "correct": 0,
      "module": 3,
      "explanation": "This violates first normal form because it has repeating groups (multiple color columns). 1NF requires eliminating repeating groups and creating a separate table. The correct design would have a ProductColor table with ProductID and Color columns."
    },
    {
      "text": "A table has a composite primary key on ProductID and Color, and includes a Price column that depends only on ProductID. Which normal form does this violate?",
      "options": [
        "First normal form",
        "Second normal form",
        "Third normal form",
        "It satisfies all normal forms"
      ],
      "correct": 1,
      "module": 3,
      "explanation": "This violates second normal form (2NF). When a table has a composite key, all attributes must depend on the complete key. Since Price depends only on ProductID (not on Color), there is a partial dependency. Price should be in a separate table with ProductID as the key."
    },
    {
      "text": "Which schema design uses normalized dimensions and requires more joins but saves storage space?",
      "options": [
        "Star schema",
        "Snowflake schema",
        "Galaxy schema",
        "Constellation schema"
      ],
      "correct": 1,
      "module": 3,
      "explanation": "The snowflake schema uses a set of more normalized tables for a single business entity, saving storage space but requiring more joins which increases complexity and can decrease performance compared to a star schema."
    },
    {
      "text": "What is the minimum number of rows required for a bulk insert operation to load directly into the compressed columnstore index (rather than the delta store)?",
      "options": [
        "10,000",
        "102,400",
        "1,024,000",
        "500,000"
      ],
      "correct": 1,
      "module": 3,
      "explanation": "The minimum number of rows to load directly into a compressed columnstore rowgroup is 102,400 rows. For smaller loads, the data goes into a delta store (b-tree structure) and is later moved asynchronously by the tuple mover."
    },
    {
      "text": "What is the maximum size of a compressed columnstore rowgroup?",
      "options": [
        "102,400 rows",
        "524,000 rows",
        "1,024,000 rows",
        "Unlimited"
      ],
      "correct": 2,
      "module": 3,
      "explanation": "A compressed columnstore rowgroup can contain up to approximately 1,024,000 rows. Having fewer but fuller rowgroups makes SELECT queries more efficient because fewer rowgroups need to be scanned."
    },
    {
      "text": "Which data types are NOT supported in a clustered columnstore index?",
      "options": [
        "INT, BIGINT, and DECIMAL",
        "XML, CLR, and sql_variant",
        "VARCHAR and NVARCHAR",
        "DATE and DATETIME"
      ],
      "correct": 1,
      "module": 3,
      "explanation": "Clustered columnstore indexes do not support data types such as XML, CLR, sql_variant, ntext, text, and image. For these types, you must use a nonclustered columnstore index or a b-tree index."
    },
    {
      "text": "What is the function of the tuple mover in a columnstore index?",
      "options": [
        "It creates new rowgroups in the columnstore",
        "It asynchronously moves data from the delta store into the compressed columnstore",
        "It updates statistics for the columnstore index",
        "It drops unused segments from the columnstore"
      ],
      "correct": 1,
      "module": 3,
      "explanation": "The tuple mover is an asynchronous process that moves data from the delta store (b-tree structure for small loads) into the compressed columnstore index. This happens in the background without user intervention."
    },
    {
      "text": "Which T-SQL option should be used with ALTER INDEX to force delta store data to be compressed into the columnstore?",
      "options": [
        "REBUILD",
        "REORGANIZE WITH (COMPRESS_ALL_ROW_GROUPS = ON)",
        "ALTER COLUMNSTORE",
        "SET COMPRESSION = ON"
      ],
      "correct": 1,
      "module": 3,
      "explanation": "Using REORGANIZE with the COMPRESS_ALL_ROW_GROUPS option forces all delta stores to be added and compressed into the columnstore indexes. This is useful when you want to ensure all data is in the compressed columnstore format."
    },
    {
      "text": "What is the requirement for using resumable index operations in SQL Server?",
      "options": [
        "The index must be nonclustered",
        "The ONLINE option must be set to ON",
        "The database must be in FULL recovery model",
        "The index must be on a columnstore table"
      ],
      "correct": 1,
      "module": 3,
      "explanation": "Resumable index operations are only supported with ONLINE=ON. The RESUMABLE=ON option can be combined with ONLINE=ON to allow index operations to be paused and resumed. Check status via sys.index_resumable_operations."
    },
    {
      "text": "Which DMV should be queried to check the current execution status of a resumable online index operation?",
      "options": [
        "sys.dm_db_index_physical_stats",
        "sys.index_resumable_operations",
        "sys.dm_exec_index_status",
        "sys.dm_os_wait_stats"
      ],
      "correct": 1,
      "module": 3,
      "explanation": "The sys.index_resumable_operations system view shows the current execution status for a resumable online index operation, including how far along the rebuild or creation has progressed."
    },
    {
      "text": "Which wait type indicates that queries are waiting for memory to become available, often due to excessive memory grants?",
      "options": [
        "PAGEIOLATCH_SH",
        "RESOURCE_SEMAPHORE",
        "LCK_M_X",
        "SOS_SCHEDULER_YIELD"
      ],
      "correct": 1,
      "module": 3,
      "explanation": "RESOURCE_SEMAPHORE indicates that queries are waiting for memory to become available, often due to excessive memory grants to certain queries. This can be caused by out-of-date statistics, missing indexes, or high query concurrency."
    },
    {
      "text": "A high occurrence of PAGEIOLATCH_UP waits on data page 2:1:1 indicates which issue?",
      "options": [
        "Storage subsystem performance problem",
        "TempDB contention on PFS (Page Free Space) data pages",
        "CPU pressure due to excessive parallelism",
        "Memory grant waits"
      ],
      "correct": 1,
      "module": 3,
      "explanation": "PAGEIOLATCH_UP on data pages 2:1:1 indicates TempDB contention on PFS (Page Free Space) data pages. This is typically caused by having only one TempDB data file. Best practice is to use one file per CPU core, up to eight files."
    },
    {
      "text": "Which wait type is commonly associated with high CPU utilization and often correlates with large scans and missing indexes?",
      "options": [
        "CXPACKET",
        "PAGEIOLATCH_SH",
        "SOS_SCHEDULER_YIELD",
        "LCK_M_X"
      ],
      "correct": 2,
      "module": 3,
      "explanation": "SOS_SCHEDULER_YIELD indicates high CPU utilization, which correlates with large scans, missing indexes, and often with high numbers of CXPACKET waits. It means threads are yielding the scheduler voluntarily."
    },
    {
      "text": "Which DMV should be used for Azure SQL Database to view CPU, memory, and I/O resource usage with snapshots every 15 seconds?",
      "options": [
        "sys.dm_os_wait_stats",
        "sys.dm_db_resource_stats",
        "sys.server_resource_stats",
        "sys.dm_exec_query_stats"
      ],
      "correct": 1,
      "module": 3,
      "explanation": "sys.dm_db_resource_stats provides CPU, memory, and I/O resource usage for Azure SQL Database, with snapshots taken every 15 seconds. For SQL Managed Instance, use sys.server_resource_stats instead."
    },
    {
      "text": "Which wait type is expected and normal for the Business Critical service tier in Azure SQL Database?",
      "options": [
        "PAGEIOLATCH_SH",
        "HADR_SYNC_COMMIT",
        "RESOURCE_SEMAPHORE",
        "LCK_M_X"
      ],
      "correct": 1,
      "module": 3,
      "explanation": "HADR_SYNC_COMMIT is a normal wait type for the Business Critical service tier because it uses Always On Availability Group technology to implement its SLA and availability features. These waits are expected and don't necessarily indicate a problem."
    },
    {
      "text": "Which log governance wait type is specific to Azure SQL Managed Instance?",
      "options": [
        "LOG_RATE_GOVERNOR",
        "POOL_LOG_RATE_GOVERNOR",
        "INSTANCE_LOG_GOVERNOR",
        "HADR_THROTTLE_LOG_RATE"
      ],
      "correct": 2,
      "module": 3,
      "explanation": "INSTANCE_LOG_GOVERNOR is the wait type for log rate governance on Azure SQL Managed Instance. LOG_RATE_GOVERNOR is for SQL Database, POOL_LOG_GOVERNOR is for elastic pools."
    },
    {
      "text": "Which DMV should you query to find live wait statistics for currently executing queries?",
      "options": [
        "sys.dm_os_wait_stats",
        "sys.dm_os_waiting_tasks",
        "sys.dm_exec_session_wait_stats",
        "sys.dm_db_wait_stats"
      ],
      "correct": 1,
      "module": 3,
      "explanation": "sys.dm_os_waiting_tasks contains live wait stats for currently executing tasks. sys.dm_os_wait_stats aggregates wait statistics over time since instance startup. sys.dm_exec_session_wait_stats shows waits by session."
    },
    {
      "text": "Which feature allows shaping query plans without modifying application code by using query_id and hint strings?",
      "options": [
        "Plan Guides",
        "Query Store hints (sp_query_store_set_hints)",
        "Query hints with OPTION clause",
        "Database scoped configurations"
      ],
      "correct": 1,
      "module": 3,
      "explanation": "Query Store hints via sp_query_store_set_hints allow shaping query plans without modifying application code. Identify the query_id via Query Store views, then execute sp_query_store_set_hints with the query_id and hint string. This is useful when application code cannot be changed."
    },
    {
      "text": "Which query hint causes SQL Server to generate a new plan each time a query executes and discards it immediately after execution?",
      "options": [
        "OPTION (MAXDOP 1)",
        "OPTION (RECOMPILE)",
        "OPTION (OPTIMIZE FOR UNKNOWN)",
        "OPTION (FAST 10)"
      ],
      "correct": 1,
      "module": 3,
      "explanation": "The RECOMPILE query hint creates a new, temporary plan for the query and discards it immediately after the query is executed. This ensures the plan is recompiled based on the current parameter values every time."
    },
    {
      "text": "In the Query Store hints feature, which stored procedure is used to apply hints to a specific query?",
      "options": [
        "sp_query_store_set_hints",
        "sp_query_store_force_plan",
        "sp_set_query_hints",
        "sp_apply_hints"
      ],
      "correct": 0,
      "module": 3,
      "explanation": "sp_query_store_set_hints is used to apply query hints via the Query Store. It takes @query_id and @query_hints parameters. Example: EXEC sp_query_store_set_hints @query_id=42, @query_hints = N'OPTION(RECOMPILE, MAXDOP 1)'."
    },
    {
      "text": "Which DMV is used to view the actual configuration and capacity settings used by resource governance mechanisms for Azure SQL Database?",
      "options": [
        "sys.dm_instance_resource_governance",
        "sys.dm_user_db_resource_governance",
        "sys.dm_db_resource_stats",
        "sys.dm_os_wait_stats"
      ],
      "correct": 1,
      "module": 3,
      "explanation": "sys.dm_user_db_resource_governance returns the actual configuration and capacity settings used by resource governance mechanisms in the current Azure SQL Database or elastic pool. For SQL Managed Instance, use sys.dm_instance_resource_governance."
    },
    {
      "text": "A query with a LIKE predicate using '%term' at the beginning is considered non-SARGable. What type of index operation will the optimizer likely use?",
      "options": [
        "Index Seek",
        "Index Scan or Table Scan",
        "Key Lookup",
        "Hash Join"
      ],
      "correct": 1,
      "module": 3,
      "explanation": "Non-SARGable predicates with a leading wildcard (LIKE '%term') prevent the optimizer from considering an Index Seek. The optimizer will likely perform an Index Scan or Table Scan instead, reading more data than necessary. The absence of a SARG means the optimizer won't evaluate a seek."
    },
    {
      "text": "A DBA is building an operational performance baseline for a SQL Server instance running on an Azure VM. Select all data sources that should reasonably feed into that baseline.",
      "options": [
        "Perfmon counter Processor(_Total)% Processor Time, sampled over a representative period",
        "Wait statistics from sys.dm_os_wait_stats, correlated with the perfmon data",
        "SQLServer:Buffer Manager\\Page life expectancy trend over time",
        "A single ad-hoc SELECT against sys.dm_exec_requests captured once during a quiet period"
      ],
      "correct": [0, 1, 2],
      "module": 3,
      "type": "multi",
      "explanation": "A useful baseline correlates OS-level and SQL Server-specific data gathered consistently over a representative period: perfmon counters like CPU utilization and Page life expectancy, plus wait statistics from sys.dm_os_wait_stats showing what threads are waiting on. A single ad-hoc query captured once during a quiet period doesn't establish what 'normal' looks like over time and isn't a substitute for ongoing baseline data collection."
    },
    {
      "text": "Which statement about identifying the correct source for a specific performance metric is TRUE?",
      "options": [
        "Data and log file read/write latency for a database is exposed through sys.dm_io_virtual_file_stats, which OS-level disk counters can't break out per database file",
        "Azure Monitor metrics collected for a SQL Server Azure VM through the Marketplace agent are SQL Server-specific metrics, not host/OS-level metrics",
        "Query Performance Insight and Query Store use unrelated, non-correlated query identifiers",
        "Perfmon can only report counters exposed by the Windows OS, never counters registered by installed applications like SQL Server"
      ],
      "correct": 0,
      "module": 3,
      "explanation": "sys.dm_io_virtual_file_stats exposes per-file read/write latency (io_stall_read_ms/io_stall_write_ms) for every database data and log file, a level of detail OS-level tools like Perfmon can't provide since they only see disk-level counters, not per-file SQL Server stalls. The Marketplace VM agent feeds host-level (VM) metrics to Azure Monitor, not SQL Server internals, so SQL Server-specific detail still has to come from inside the VM (perfmon, DMVs). Query Performance Insight's query IDs correlate directly with Query Store's IDs. Perfmon collects counters from both the OS and installed applications, including SQL Server's own registered counter group."
    },
    {
      "text": "A DBA notices intermittent CPU spikes on an Azure SQL Managed Instance during business hours but cannot reproduce the issue on demand. Which approach lets the DBA observe currently executing requests and their wait types in real time to catch the issue as it happens?",
      "options": [
        "Query sys.dm_exec_requests to see a live snapshot of currently executing requests, filtering for wait types such as SOS_SCHEDULER_YIELD",
        "Wait for the next scheduled DBCC CHECKDB run and review its output log",
        "Review the Overall Resource Consumption report in Query Store, which only aggregates historical data over a chosen time window",
        "Check sys.dm_db_stats_properties for the last statistics update time"
      ],
      "correct": 0,
      "module": 3,
      "explanation": "sys.dm_exec_requests gives a live snapshot of currently executing requests, including their wait type and wait state, so filtering for RUNNABLE requests waiting on SOS_SCHEDULER_YIELD helps confirm CPU pressure in the moment. DBCC CHECKDB checks integrity, not activity. Query Store's Overall Resource Consumption view is historical/aggregated rather than a live activity view. sys.dm_db_stats_properties is about statistics freshness, unrelated to observing live CPU activity."
    },
    {
      "text": "How does Intelligent Insights differ from Query Store for an Azure SQL Database?",
      "options": [
        "Intelligent Insights uses AI/machine learning models to automatically detect performance-degrading database issues (e.g., regressed queries, resource bottlenecks) and writes diagnostic logs describing the issue and root cause, whereas Query Store is a passive data-collection store of query plans and runtime statistics that requires the DBA to interpret the data",
        "Intelligent Insights and Query Store are two names for the same underlying feature",
        "Intelligent Insights only stores historical execution plans, while Query Store performs automated anomaly detection",
        "Intelligent Insights is a manual diagnostic tool that must be run on demand, while Query Store continuously monitors in the background with no configuration required"
      ],
      "correct": 0,
      "module": 3,
      "explanation": "Intelligent Insights analyzes Azure SQL Database telemetry with built-in AI/machine learning to proactively detect issues like excessive resource consumption, regressed or missing plans, and increased wait times, then emits diagnostic log entries that describe the detected issue, its root cause, and (where applicable) a recommendation. Query Store is the underlying data collection mechanism (plan, runtime stats, and wait stats stores) that a DBA queries and interprets manually; Intelligent Insights builds automated detection on top of telemetry, including but not limited to Query Store data."
    },
    {
      "text": "A DBA is setting up a maintenance schedule for a large production SQL Server database and wants to detect data corruption before it causes application errors. Which command should be scheduled, and what does it primarily check?",
      "options": [
        "DBCC CHECKDB, which checks the logical and physical integrity of all objects in the database, including allocation consistency and structural integrity of tables and indexes",
        "DBCC SHRINKDATABASE, which reduces the size of the data and log files and reports any corruption found during the shrink",
        "UPDATE STATISTICS, which refreshes cardinality estimates and repairs corrupted index pages as a side effect",
        "sys.dm_db_index_physical_stats, which actively repairs fragmented or corrupted index pages when queried"
      ],
      "correct": 0,
      "module": 3,
      "explanation": "DBCC CHECKDB checks the logical and physical integrity of all objects in a database, including allocation structures, table and index consistency, and catalog consistency, and can report or (with a repair option) attempt to fix corruption. It should be scheduled regularly (e.g., via SQL Server Agent) as a proactive integrity check. DBCC SHRINKDATABASE only resizes files, UPDATE STATISTICS only refreshes cardinality data, and sys.dm_db_index_physical_stats only reports fragmentation - none of them detect or repair corruption the way CHECKDB does."
    }
  ];

  if (typeof window.__dp300 === 'undefined') {
    window.__dp300 = { modules: [], questions: [] };
  }

  window.__dp300.questions = window.__dp300.questions.concat(questions);

  if (window.__dp300.modules.length < 3) {
    window.__dp300.modules[2] = "Skill 3: Monitor, configure, and optimize database resources";
  }
})();
