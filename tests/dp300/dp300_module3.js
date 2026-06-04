// Module 3: Performance Monitoring, Resource Configuration & Database Optimization
(function() {
  var questions = [
  // === Performance Monitoring ===
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
  // === Resource Configuration ===
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
  // === Database Optimization ===
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
  }
  ];
  
  if (typeof window.__dp300 === 'undefined') {
    window.__dp300 = { modules: [], questions: [] };
  }
  
  window.__dp300.questions = window.__dp300.questions.concat(questions);
  
  if (window.__dp300.modules.length < 3) {
    window.__dp300.modules[2] = "Module 3: Performance Monitoring, Resource Configuration & Database Optimization";
  }
})();
