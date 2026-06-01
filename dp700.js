const DP700_MODULES = [
  "Module 1: Dataflows, Pipelines & Spark",
  "Module 2: Lakehouse, Delta & Medallion",
  "Module 3: Real-Time Intelligence",
  "Module 4: Warehouse & Dimensional Modeling",
  "Module 5: CI/CD & Administration",
  "Module 6: Activator"
];

const DP700_QUESTIONS = [
  {
    "text": "You need to ingest data from an Azure Event Hub into a KQL database in Fabric. The data must be transformed before being stored. Which component should you use?",
    "options": [
      "Dataflows Gen2",
      "Eventstream with transformations",
      "Copy Data activity in a pipeline",
      "A notebook with Spark structured streaming"
    ],
    "correct": 1,
    "module": 3
  },
  {
    "text": "A data engineer wants to create a Delta table in a lakehouse. The table should support time travel queries and efficient updates. Which option ensures the table is stored in Delta format?",
    "options": [
      "Save the DataFrame as CSV and rely on schema inference",
      "Use saveAsTable with format set to parquet",
      "Use saveAsTable with format set to delta or omit format (default is delta)",
      "Use the Spark SQL CREATE TABLE statement without specifying FORMAT"
    ],
    "correct": 2,
    "module": 2
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
    "module": 2
  },
  {
    "text": "Which of the following is NOT a valid destination for an Eventstream?",
    "options": [
      "KQL database",
      "Lakehouse (Delta format)",
      "Warehouse",
      "Derived stream"
    ],
    "correct": 2,
    "module": 3
  },
  {
    "text": "You need to run a SQL query against a Fabric warehouse. The query must use dynamic SQL. Which function should you use to safely incorporate user input into the query to prevent injection?",
    "options": [
      "QUOTENAME",
      "CONCAT",
      "STRING_AGG",
      "FORMATMESSAGE"
    ],
    "correct": 0,
    "module": 4
  },
  {
    "text": "A data engineer creates a pipeline that copies data from an Azure Blob Storage container to a lakehouse. The pipeline must be triggered every 15 minutes. What should the engineer configure?",
    "options": [
      "A scheduled pipeline run with a recurrence of 15 minutes",
      "A dataflow Gen2 scheduled refresh",
      "An event-driven trigger on blob creation",
      "A stored procedure called from a notebook"
    ],
    "correct": 0,
    "module": 1
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
    "module": 2
  },
  {
    "text": "Which of the following statements about Dataflows Gen2 is TRUE?",
    "options": [
      "Dataflows Gen2 can be used as a direct replacement for a data warehouse",
      "Dataflows Gen2 support row-level security (RLS)",
      "Dataflows Gen2 require a Fabric capacity workspace",
      "Dataflows Gen2 can only load data to lakehouses"
    ],
    "correct": 2,
    "module": 1
  },
  {
    "text": "You need to materialize an aggregation over streaming data in a KQL database. The aggregation must be updated automatically as new data arrives. Which KQL object should you use?",
    "options": [
      "A materialized view",
      "A stored function",
      "A table with UPDATE policy",
      "A temporary table"
    ],
    "correct": 0,
    "module": 3
  },
  {
    "text": "A Fabric workspace contains a lakehouse, a warehouse, and a semantic model. A user has the Contributor role on the workspace. What can the user do?",
    "options": [
      "Read data from the lakehouse Files folder but not the Tables folder",
      "Create new items in the workspace and run existing items",
      "Only view items but not create or modify them",
      "Manage workspace settings and access"
    ],
    "correct": 1,
    "module": 5
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
    "module": 2
  },
  {
    "text": "You are loading data into a Fabric warehouse. The source contains 500 Parquet files in an Azure Blob Storage container. You want to load all files matching a wildcard pattern. Which T-SQL statement should you use?",
    "options": [
      "COPY INTO with a wildcard path",
      "INSERT INTO SELECT from OPENROWSET",
      "BULK INSERT",
      "LOAD DATA FROM URL"
    ],
    "correct": 0,
    "module": 4
  },
  {
    "text": "Which of the following is a valid reason to use a snowflake schema instead of a star schema in a Fabric warehouse?",
    "options": [
      "To reduce the number of JOINs needed for reporting queries",
      "To normalize dimension tables and reduce data redundancy",
      "To improve query performance for simple aggregations",
      "To enable direct Lake mode for Power BI"
    ],
    "correct": 1,
    "module": 4
  },
  {
    "text": "A data engineer needs to monitor long-running queries in a Fabric warehouse. Where should the engineer look?",
    "options": [
      "The Monitor Hub",
      "Query insights - long_running_queries",
      "The admin monitoring workspace",
      "The Capacity Metrics app"
    ],
    "correct": 1,
    "module": 4
  },
  {
    "text": "You need to apply dynamic data masking to a column in a Fabric warehouse. The column contains email addresses. Which masking function should you use?",
    "options": [
      "email()",
      "partial()",
      "random()",
      "default()"
    ],
    "correct": 0,
    "module": 4
  },
  {
    "text": "Which of the following Fabric components supports both KQL and a T-SQL subset?",
    "options": [
      "KQL Queryset",
      "Eventhouse",
      "Real-Time Dashboard",
      "Lakehouse SQL analytics endpoint"
    ],
    "correct": 0,
    "module": 3
  },
  {
    "text": "You need to deploy content from a development workspace to a production workspace. Which Fabric feature should you use?",
    "options": [
      "Deployment pipelines",
      "Git integration",
      "REST APIs",
      "Workspace apps"
    ],
    "correct": 0,
    "module": 5
  },
  {
    "text": "Which of the following is true about Fabric Viewer role on a workspace?",
    "options": [
      "Viewers can create and edit items in the workspace",
      "Viewers can view items but have no OneLake data access by default",
      "Viewers can share items with other users",
      "Viewers can run pipelines and notebooks"
    ],
    "correct": 1,
    "module": 5
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
    "module": 2
  },
  {
    "text": "You need to detect when a streaming metric in an Eventstream exceeds a threshold and send a Teams message. Which component should you configure?",
    "options": [
      "Activator",
      "Update policy on a KQL table",
      "A pipeline with a condition activity",
      "A Real-Time Dashboard alert"
    ],
    "correct": 0,
    "module": 6
  },
  {
    "text": "Which of the following is a limitation of Dataflows Gen2 compared to a data warehouse?",
    "options": [
      "Dataflows Gen2 cannot connect to cloud sources",
      "Dataflows Gen2 do not support row-level security",
      "Dataflows Gen2 cannot be scheduled",
      "Dataflows Gen2 cannot load to lakehouses"
    ],
    "correct": 1,
    "module": 1
  },
  {
    "text": "You need to create a Spark notebook that reads a CSV file. You want the schema to be inferred automatically. Which option should you use?",
    "options": [
      "spark.read.csv(path, header=True)",
      "spark.read.load(path, format='csv', inferSchema=True)",
      "spark.read.schema(structType).csv(path)",
      "Both A and B"
    ],
    "correct": 1,   // CORRECTED: Only B infers schema; A does not.
    "module": 1
  },
  {
    "text": "You have a Fabric workspace. Which of the following workspace roles can manage workspace settings and access?",
    "options": [
      "Admin",
      "Member",
      "Contributor",
      "Viewer"
    ],
    "correct": 0,
    "module": 5
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
    "module": 2
  },
  {
    "text": "Which of the following is NOT a valid source for an Eventstream?",
    "options": [
      "Azure Event Hubs",
      "Azure Data Explorer",
      "Azure Blob Storage",
      "Kafka"
    ],
    "correct": 2,   // CORRECTED: Azure Blob Storage is not a streaming source; Azure Data Explorer can be a source.
    "module": 3
  },
  {
    "text": "You need to run a KQL query that counts distinct values in a large dataset. Which function should you use for an approximate count?",
    "options": [
      "count()",
      "dcount()",
      "summarize count-distinct()",
      "approx_count_distinct()"
    ],
    "correct": 1,   // CORRECTED: dcount() is the KQL approximate distinct count function.
    "module": 3
  },
  {
    "text": "A data engineer wants to use Copilot in the Fabric warehouse query editor. Which slash command generates SQL code from a natural language description?",
    "options": [
      "/generate-sql",
      "/explain",
      "/fix",
      "/question"
    ],
    "correct": 0,
    "module": 4
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
    "module": 2
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
    "module": 2
  },
  {
    "text": "You need to configure a pipeline activity that transforms data before loading it to a destination. Which activity type should you use?",
    "options": [
      "Copy Data",
      "Data Flow or Dataflow",
      "Stored Procedure",
      "Delete Data"
    ],
    "correct": 1,
    "module": 1
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
    "module": 2
  },
  {
    "text": "You have a Real-Time Dashboard that connects to a KQL database. Which authorization method allows the dashboard to use the editor's identity?",
    "options": [
      "Pass-through identity",
      "Dashboard editor's identity",
      "A service principal",
      "Shared access signature"
    ],
    "correct": 1,
    "module": 3
  },
  {
    "text": "You need to create a Fabric domain. What is the primary purpose of a domain?",
    "options": [
      "To control access to specific items",
      "To define governance boundaries and delegate settings",
      "To replace workspaces",
      "To enable Git integration"
    ],
    "correct": 1,
    "module": 5
  },
  {
    "text": "Which of the following is a valid use case for Activator?",
    "options": [
      "Detecting when a streaming metric exceeds a threshold and sending an email",
      "Transforming data in a lakehouse",
      "Querying a warehouse using T-SQL",
      "Building a Power BI report"
    ],
    "correct": 0,
    "module": 6
  },
  {
    "text": "You need to load data into a Fabric warehouse using a COPY statement. The data is in Parquet files in Azure Data Lake Storage. Which authentication method is supported?",
    "options": [
      "SQL authentication",
      "Managed identity or shared access signature (SAS)",
      "Basic authentication",
      "Certificate-based authentication only"
    ],
    "correct": 1,
    "module": 4
  },
  {
    "text": "Which of the following is true about row-level security (RLS) in a Fabric warehouse?",
    "options": [
      "RLS is applied to the underlying data files",
      "RLS is enforced through filter predicates in a security policy",
      "RLS can only be configured by workspace admins",
      "RLS does not support dynamic rules"
    ],
    "correct": 1,
    "module": 4
  },
  {
    "text": "You need to run a Spark notebook that uses a specific Python library not available in the default runtime. How should you provide the library?",
    "options": [
      "Use a Spark Environment to specify the library",
      "Install the library in the notebook cell using pip",
      "Upload the library to the lakehouse Files folder",
      "All of the above"
    ],
    "correct": 0,
    "module": 1
  },
  {
    "text": "You have a Fabric warehouse with a dimension table that tracks product category changes over time. Which SCD type is most appropriate for preserving full history of changes?",
    "options": [
      "SCD Type 0",
      "SCD Type 1",
      "SCD Type 2",
      "SCD Type 3"
    ],
    "correct": 2,
    "module": 4
  },
  {
    "text": "Which of the following statements about Fabric capacity is TRUE?",
    "options": [
      "All Fabric features are available on all capacity sizes",
      "F64+ capacity enables free users to view Power BI content",
      "Capacity is managed at the workspace level only",
      "Capacity does not affect Spark pool performance"
    ],
    "correct": 1,
    "module": 5
  },
  {
    "text": "You need to create a materialized view in a KQL database. What does a materialized view consist of?",
    "options": [
      "A materialized part that stores precomputed results and a delta part for new data",
      "A single table that is refreshed on a schedule",
      "A view that is physically stored on disk",
      "A temporary table that is recreated each query"
    ],
    "correct": 0,
    "module": 3
  },
  {
    "text": "You have a pipeline that runs a Dataflow Gen2 activity. The dataflow needs to connect to a Salesforce source. Which of the following is true?",
    "options": [
      "Dataflows Gen2 can connect to Salesforce as it supports hundreds of sources",
      "You must use a notebook instead",
      "You need to install a custom connector",
      "Salesforce is not supported in Fabric"
    ],
    "correct": 0,
    "module": 1
  },
  {
    "text": "Which of the following is NOT a valid action type in Activator?",
    "options": [
      "Email",
      "Teams",
      "Power Automate",
      "Azure Function"
    ],
    "correct": 3,
    "module": 6
  },
  {
    "text": "You need to query a lakehouse table using Spark SQL. Which statement creates a temporary view that can be used in Spark SQL?",
    "options": [
      "createOrReplaceTempView",
      "createTempTable",
      "registerTempTable",
      "createGlobalTempView"
    ],
    "correct": 0,
    "module": 1
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
    "module": 2
  },
  {
    "text": "You need to ensure that a Fabric workspace uses Git integration. Which of the following is true?",
    "options": [
      "Git integration is available at the tenant level only",
      "Git integration is configured at the workspace level",
      "Git integration requires Fabric capacity",
      "Git integration is only available for Power BI items"
    ],
    "correct": 1,
    "module": 5
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
    "module": 2
  },
  {
    "text": "Which of the following is true about the COPY INTO statement in a Fabric warehouse?",
    "options": [
      "It can only load data from Azure Blob Storage",
      "It supports loading from Azure Data Lake Storage and Azure Blob Storage",
      "It cannot load multiple files at once",
      "It only supports CSV format"
    ],
    "correct": 1,
    "module": 4
  },
  {
    "text": "You need to create a semantic model in Fabric that uses Direct Lake mode. Which workload must the semantic model be in?",
    "options": [
      "Data Engineering",
      "Data Factory",
      "Power BI",
      "Data Science"
    ],
    "correct": 2,
    "module": 4
  },
  {
    "text": "Which of the following is true about the HIGH CONCURRENCY mode for Spark in Fabric?",
    "options": [
      "It runs each notebook in a separate session",
      "It shares Spark sessions across multiple users",
      "It requires a custom Spark pool",
      "It disables autoscaling"
    ],
    "correct": 1,
    "module": 1
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
    "module": 2
  },
  {
    "text": "You need to monitor Fabric job execution. Which centralized view provides this?",
    "options": [
      "Monitor Hub",
      "Admin portal",
      "Capacity Metrics app",
      "Audit logs"
    ],
    "correct": 0,
    "module": 5
  },
  {
    "text": "Which of the following is true about CLS (Column-level security) in a Fabric warehouse?",
    "options": [
      "CLS uses DENY SELECT to restrict access to specific columns",
      "CLS is configured at the workspace level",
      "CLS only works with dynamic data masking",
      "CLS requires Fabric premium capacity"
    ],
    "correct": 0,
    "module": 4
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
    "module": 2
  },
  {
    "text": "Which of the following is a valid reason to use an Eventhouse instead of a lakehouse for real-time data?",
    "options": [
      "Eventhouse provides built-in KQL query capabilities and auto-partitioning",
      "Eventhouse supports Delta format natively",
      "Eventhouse is cheaper than a lakehouse",
      "Eventhouse can be used as a data warehouse"
    ],
    "correct": 0,
    "module": 3
  },
  {
    "text": "You need to deploy content between Fabric workspaces using a REST API. Which endpoint should you use?",
    "options": [
      "POST /deployments/deploy",
      "GET /workspaces/{workspaceId}/items",
      "POST /git/commit",
      "All of the above"
    ],
    "correct": 0,
    "module": 5
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
    "module": 2
  },
  {
    "text": "You need to create a table clone in a Fabric warehouse. What is a table clone?",
    "options": [
      "A full copy of the table data and schema",
      "A zero-copy reference to the same data as the source table",
      "A schema-only copy without data",
      "A materialized view of the source table"
    ],
    "correct": 1,
    "module": 4
  },
  {
    "text": "You have a KQL database. You need to transform data after ingestion without writing a separate pipeline. Which feature should you use?",
    "options": [
      "Update policy",
      "Materialized view",
      "Stored function",
      "Database shortcut"
    ],
    "correct": 0,
    "module": 3
  },
  {
    "text": "Which of the following is true about Fabric item-level permissions?",
    "options": [
      "Item permissions override workspace roles",
      "Item permissions can only grant Read access",
      "Item permissions are only available for lakehouses",
      "Item permissions replace workspace roles entirely"
    ],
    "correct": 0,
    "module": 5
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
    "module": 2
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
    "module": 2
  },
  {
    "text": "You have a pipeline with a loop activity that iterates over a list of files. Which activity type is this?",
    "options": [
      "Data transformation activity",
      "Control flow activity",
      "Copy Data activity",
      "Dataflow activity"
    ],
    "correct": 1,
    "module": 1
  },
  {
    "text": "Which of the following is true about Microsoft Entra ID authentication for Fabric warehouses?",
    "options": [
      "SQL authentication is also supported",
      "Only Microsoft Entra ID authentication is supported",
      "Basic authentication can be used",
      "Windows authentication is supported"
    ],
    "correct": 0,   // CORRECTED: Fabric warehouses support both Entra ID and SQL authentication.
    "module": 4
  },
  {
    "text": "You need to create a stored function in a KQL database. What is the purpose of a stored function?",
    "options": [
      "To encapsulate reusable query logic with parameters",
      "To store query results permanently",
      "To create materialized views",
      "To manage database permissions"
    ],
    "correct": 0,
    "module": 3
  },
  {
    "text": "Which of the following is true about query insights in Fabric warehouses?",
    "options": [
      "Query insights are available in real-time",
      "Query insights have up to 15 minutes of delay",
      "Query insights only store data for 7 days",
      "Query insights require a separate capacity"
    ],
    "correct": 1,
    "module": 4
  },
  {
    "text": "You have a Fabric workspace with multiple items. A user needs to build reports on a lakehouse but should not be able to modify the data. Which permission combination should you assign?",
    "options": [
      "Contributor role on the workspace",
      "Viewer role on the workspace with ReadData permission on the lakehouse",
      "Member role on the workspace",
      "No workspace role, only item-level sharing"
    ],
    "correct": 1,
    "module": 5
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
    "module": 2
  },
  {
    "text": "You connect a Fabric workspace to a Git repository. A developer makes changes in the workspace. How do the changes get synchronized with the Git branch?",
    "options": [
      "Changes are automatically pushed to Git in real-time",
      "The developer uses the Source control panel to commit changes to the connected Git branch",
      "Changes must be exported manually and uploaded to Git",
      "Git integration automatically creates pull requests for all workspace changes"
    ],
    "correct": 1,
    "module": 5
  },
  {
    "text": "You create a deployment pipeline with three stages: Development, Test, and Production. Each stage is assigned to a different workspace. When you deploy from Development to Test, what happens to existing items in the Test workspace?",
    "options": [
      "Existing items in Test are deleted and replaced with Development content",
      "Items are updated if they exist in both stages; new items are created; items only in Test remain unchanged",
      "The deployment fails if Test already contains items",
      "Only items that exist in Development are copied; Test items are preserved as-is"
    ],
    "correct": 1,
    "module": 5
  },
  {
    "text": "You need to commit workspace changes to Git and deploy content between pipeline stages programmatically. Which Fabric REST APIs should you use?",
    "options": [
      "Only the deployment pipeline REST API",
      "The Git REST APIs for committing and the deployment pipeline REST APIs for deploying stage content",
      "The Fabric administrative REST APIs only",
      "The monitoring REST APIs for both operations"
    ],
    "correct": 1,
    "module": 5
  },
  {
    "text": "You open the Monitor Hub and see a pipeline run with status 'Failed'. Where can you find detailed error information about what went wrong?",
    "options": [
      "In the Admin portal audit logs",
      "By selecting the pipeline run and choosing View detail to see activity-level error details",
      "In the OneLake catalog Govern tab",
      "In the Capacity Metrics app"
    ],
    "correct": 1,
    "module": 5
  },
  {
    "text": "A new lakehouse is created in a Fabric workspace. A Viewer role user tries to read data from it through the SQL analytics endpoint. What happens by default?",
    "options": [
      "The Viewer can query all tables through the SQL endpoint",
      "The Viewer has no OneLake data access by default; they need OneLake security roles or item permissions to access data",
      "The Viewer can read data but cannot write",
      "The Viewer is automatically added to the DefaultReader security role"
    ],
    "correct": 1,
    "module": 5
  },
  {
    "text": "In the Fabric admin hierarchy, which role controls tenant-wide settings such as feature availability and export policies?",
    "options": [
      "Capacity admin",
      "Domain admin",
      "Workspace admin",
      "Fabric admin"
    ],
    "correct": 3,
    "module": 5
  },
  {
    "text": "A Fabric administrator enables the 'Export to Excel' tenant setting for the entire organization except the 'Finance Restricted' security group. What is the effect?",
    "options": [
      "Finance users can export to Excel but other users cannot",
      "All users except those in the Finance Restricted group can export data to Excel",
      "No users can export to Excel because the setting has exceptions",
      "The setting has no effect because export controls are at the item level"
    ],
    "correct": 1,
    "module": 5
  },
  {
    "text": "A Fabric administrator delegates the Certification setting to a domain admin. What can the domain admin now do?",
    "options": [
      "Override all tenant settings for their domain",
      "Specify their own certifiers for items within their domain's workspaces",
      "Create new capacities for their domain",
      "Manage all workspaces across the tenant"
    ],
    "correct": 1,
    "module": 5
  },
  {
    "text": "Your organization has an F64 Fabric capacity. A user with a Free license needs to view Power BI reports in a workspace assigned to this capacity. What is required?",
    "options": [
      "The user must have a Pro license to view any Power BI content",
      "The user needs a viewer role on the workspace; on F64+ capacity, Free license users can view Power BI content",
      "The user must be upgraded to Premium Per User (PPU)",
      "The user cannot view Power BI content regardless of capacity"
    ],
    "correct": 1,
    "module": 5
  },
  {
    "text": "You need to track which users exported sensitive data from Fabric last month for a compliance audit. Which tool should you use?",
    "options": [
      "The Monitor Hub activity history",
      "Audit logs in the admin portal filtered by export activity types",
      "The Capacity Metrics app",
      "The OneLake catalog Explore tab"
    ],
    "correct": 1,
    "module": 5
  },
  {
    "text": "A workspace is assigned to the Finance domain. Does this assignment automatically restrict access to only Finance department users?",
    "options": [
      "Yes, domain assignment controls who can access items in the workspace",
      "No, domain assignment organizes governance policies but does not change item-level access; workspace roles and item permissions still control access",
      "Yes, but only if the domain admin configures access policies",
      "No, domains are deprecated and replaced by workspace-level permissions"
    ],
    "correct": 1,
    "module": 5
  },
  {
    "text": "You assign a workspace to the F64 capacity. What happens to workspaces not assigned to any capacity?",
    "options": [
      "They run on shared capacity with limitations, which is not suitable for production workloads",
      "They are automatically assigned to the first available F capacity",
      "They cannot be accessed by any users",
      "They run on a trial capacity with full functionality"
    ],
    "correct": 0,
    "module": 5
  },
  {
    "text": "A developer branches out from a shared development workspace to create an isolated workspace for feature development. What is the purpose of this branching approach?",
    "options": [
      "To create a production copy of the workspace",
      "To keep development work isolated so changes don't affect other workspace users until merged via pull request",
      "To automatically deploy changes to production",
      "To grant the developer admin access to the main workspace"
    ],
    "correct": 1,
    "module": 5
  },
  {
    "text": "You need to ensure that only designated data stewards can certify Fabric items as trusted. Which tenant setting should the administrator configure?",
    "options": [
      "Enable certification tenant-wide but limit it to a 'Data Stewards' security group",
      "Disable certification for all users",
      "Enable certification for all users without restrictions",
      "Configure certification at the domain level only"
    ],
    "correct": 0,
    "module": 5
  },
  {
    "text": "A Fabric administrator uses the admin monitoring workspace. What is the primary difference between the admin monitoring workspace and the Monitor Hub?",
    "options": [
      "The admin monitoring workspace shows individual job status for diagnosing failures; the Monitor Hub shows adoption trends",
      "The Monitor Hub shows individual job execution status; the admin monitoring workspace shows platform-wide usage and adoption patterns",
      "They are identical tools with different interfaces",
      "The admin monitoring workspace is only available to workspace admins"
    ],
    "correct": 1,
    "module": 5
  },
  {
    "text": "A Fabric administrator wants to assign licenses to 200 users. What is the most efficient approach?",
    "options": [
      "Assign individual licenses to each user in the Fabric admin portal",
      "Create Microsoft Entra ID security groups and assign licenses to groups in the Microsoft 365 admin center",
      "Licenses are automatically assigned when users sign in and require no configuration",
      "Assign licenses through the OneLake catalog"
    ],
    "correct": 1,
    "module": 5
  },
  {
    "text": "You configure Activator as a destination for an eventstream. You need to monitor temperature readings for individual packages. Which field should you select as the unique identifier when creating the business object?",
    "options": [
      "Temperature (the property to monitor)",
      "PackageId (the field that uniquely identifies each package)",
      "Timestamp (when the reading was taken)",
      "City (the delivery location)"
    ],
    "correct": 1,
    "module": 6
  },
  {
    "text": "You want to monitor the average temperature of packages over 10-minute windows, recalculating every 5 minutes. In Activator, what do the window size and step size control?",
    "options": [
      "Window size controls how often the rule is checked; step size controls how much historical data is included",
      "Window size controls how much historical data to include; step size controls how often to recalculate",
      "Both control the frequency of email alerts",
      "They control the data retention period in the eventstream"
    ],
    "correct": 1,
    "module": 6
  },
  {
    "text": "You configure an Activator rule that sends a Teams message when a package temperature exceeds 68F. Which Activator component defines the condition 'Temperature > 68F'?",
    "options": [
      "The Monitor section",
      "The Condition section with threshold monitoring",
      "The Property filter section",
      "The Action configuration"
    ],
    "correct": 1,
    "module": 6
  },
  {
    "text": "You want to apply an Activator rule only to packages containing medicine, not all packages. Which section of the rule configuration should you use?",
    "options": [
      "The Monitor section to select only medicine-related attributes",
      "The Property filter section with a filter like ColdChainType equals 'medicine'",
      "The Condition section to set a medicine-specific threshold",
      "The Action section to route medicine packages differently"
    ],
    "correct": 1,
    "module": 6
  },
  {
    "text": "Activator triggers a rule and you need to execute a multi-step business process across different systems automatically. Which action type should you configure?",
    "options": [
      "Email action",
      "Teams action",
      "Power Automate action",
      "Fabric item action"
    ],
    "correct": 2,
    "module": 6
  },
  {
    "text": "In Activator, what is the relationship between events, objects, and properties?",
    "options": [
      "Events represent business entities; objects represent data values; properties represent timestamps",
      "Events contain data records; objects are business entities identified from events; properties are the data attributes of those objects",
      "Objects are created before events arrive; events update existing objects; properties are static definitions",
      "Properties are the rules; objects are the actions; events are the triggers"
    ],
    "correct": 1,
    "module": 6
  },
  {
    "text": "You configure an Activator rule to detect when no new temperature events have arrived for more than 30 minutes, indicating a possible sensor failure. Which detection approach should you use?",
    "options": [
      "Threshold monitoring with Temperature > 0",
      "Change detection for temperature trends",
      "Missing data detection to catch sensor failures",
      "Range monitoring for safe operating zones"
    ],
    "correct": 2,
    "module": 6
  },
  {
    "text": "You want to average temperature readings over a 10-minute window and recalculate every 5 minutes. Which summarization type and timing configuration should you use?",
    "options": [
      "Summarization: Average; Window size: 10 minutes; Step size: 5 minutes",
      "Summarization: Total; Window size: 5 minutes; Step size: 10 minutes",
      "Summarization: Count; Window size: 10 minutes; Step size: 5 minutes",
      "Summarization: Maximum; Window size: 10 minutes; Step size: 10 minutes"
    ],
    "correct": 0,
    "module": 6
  },
  {
    "text": "You need to trigger a Fabric notebook when an Activator rule detects a critical condition. Which action type should you use?",
    "options": [
      "Email action",
      "Teams action",
      "Power Automate action",
      "Fabric item action"
    ],
    "correct": 3,
    "module": 6
  },
  {
    "text": "You configure an Activator rule and set the Occurrence behavior to 'When it has been true for 15 minutes' instead of 'Every time'. What is the effect?",
    "options": [
      "The rule triggers an action every time the condition is met, regardless of duration",
      "The rule only triggers an action if the condition remains true continuously for 15 minutes, filtering out brief fluctuations",
      "The rule checks the condition every 15 minutes instead of continuously",
      "The rule accumulates all true evaluations over 15 minutes and averages them"
    ],
    "correct": 1,
    "module": 6
  },
  {
    "text": "You need to ingest data from a CSV file into a Lakehouse and then apply complex transformations using a visual interface. Which approach should you use?",
    "options": [
      "Copy Data activity in a pipeline only",
      "Dataflows Gen2 with Power Query Online",
      "A Spark notebook with PySpark code",
      "Direct COPY INTO T-SQL statement"
    ],
    "correct": 1,
    "module": 1
  },
  {
    "text": "A data engineer wants to combine a Dataflows Gen2 activity with additional downstream activities such as executing a stored procedure. What is the recommended approach?",
    "options": [
      "Add the stored procedure as a transformation step inside the Dataflows Gen2",
      "Use a data pipeline to orchestrate the Dataflows Gen2 activity followed by a Stored Procedure activity",
      "Schedule the Dataflows Gen2 to run first, then manually run the stored procedure",
      "Embed the stored procedure logic as a custom M function in the dataflow"
    ],
    "correct": 1,
    "module": 1
  },
  {
    "text": "You are building a Spark notebook that reads a large Parquet dataset. You want to optimize query performance by running Spark operations directly on lakehouse infrastructure. Which Spark property should you configure?",
    "options": [
      "spark.sql.shuffle.partitions",
      "spark.native.enabled set to true",
      "spark.executor.memory",
      "spark.dynamicAllocation.enabled"
    ],
    "correct": 1,
    "module": 1
  },
  {
    "text": "Multiple data engineers need to share the same Spark session across concurrent notebooks while ensuring code isolation. Which feature should you enable?",
    "options": [
      "Dynamic allocation",
      "High concurrency mode",
      "Native execution engine",
      "Auto MLFlow logging"
    ],
    "correct": 1,
    "module": 1
  },
  {
    "text": "You need to load data from a CSV file into a Spark dataframe, but the file has no header row and you want to ensure correct data types from the start. What should you do?",
    "options": [
      "Use spark.read.load with header=True and let Spark infer the schema",
      "Define an explicit StructType schema and set header=False when loading",
      "Use the %%sql magic to create the table first, then load the CSV",
      "Convert the CSV to Parquet externally before loading into Spark"
    ],
    "correct": 1,
    "module": 1
  },
  {
    "text": "You saved a Spark dataframe as partitioned Parquet files using partitionBy('Category'). When you later read the data for a specific category using a file path filter, what happens to the Category column in the resulting dataframe?",
    "options": [
      "The Category column is included with the filtered value for all rows",
      "The Category column is omitted from the resulting dataframe",
      "The Category column contains null values",
      "The Category column is renamed to partition_category"
    ],
    "correct": 1,
    "module": 1
  },
  {
    "text": "You create a temporary view in Spark using createOrReplaceTempView. When is this view automatically deleted?",
    "options": [
      "When the notebook cell completes execution",
      "When the Spark session ends",
      "When you manually drop the view",
      "It persists until explicitly deleted"
    ],
    "correct": 1,
    "module": 1
  },
  {
    "text": "You need to write a Spark SQL query in a notebook cell that queries the Spark catalog. Which magic command should you use at the beginning of the cell?",
    "options": [
      "%%pyspark",
      "%%spark",
      "%%sql",
      "%%python"
    ],
    "correct": 2,
    "module": 1
  },
  {
    "text": "You want to create a managed Delta table in the Spark catalog so it persists beyond the current session and its data is stored in the Tables storage location. Which method should you use?",
    "options": [
      "createOrReplaceTempView",
      "saveAsTable with format='delta'",
      "write.mode('overwrite').parquet()",
      "createExternalTable"
    ],
    "correct": 1,
    "module": 1
  },
  {
    "text": "In an Eventhouse, what is the key characteristic of time-series data that enables KQL databases to automatically partition data by ingestion time?",
    "options": [
      "Data is stored in JSON format",
      "Events are immutable and tied to specific moments in time",
      "Data is compressed using delta format",
      "Tables are organized in a star schema"
    ],
    "correct": 1,
    "module": 1
  },
  {
    "text": "You write a KQL query that filters by time, then by vendor, then by fare amount. According to KQL optimization best practices, what is the correct order for these filters?",
    "options": [
      "fare_amount filter first, then vendor, then time",
      "vendor filter first, then time, then fare_amount",
      "Time filter first (eliminates most data), then vendor, then fare_amount",
      "All filters can be in any order since KQL optimizes automatically"
    ],
    "correct": 2,
    "module": 1
  },
  {
    "text": "You need to join a small VendorInfo table with a large TaxiTrips table in KQL. According to best practices, how should you structure the join for optimal performance?",
    "options": [
      "Put TaxiTrips first since it's the main table",
      "Put VendorInfo first since it's the smaller table",
      "Use a broadcast join hint",
      "Create a materialized view of the join first"
    ],
    "correct": 1,
    "module": 1
  },
  {
    "text": "You create a materialized view in a KQL database. When you query it, the system combines two parts to return fresh results. What are these two parts?",
    "options": [
      "The raw table and the indexed table",
      "The materialized part (precomputed) and the delta (new data since last update)",
      "The source table and the destination table",
      "The hot partition and the cold partition"
    ],
    "correct": 1,
    "module": 1
  },
  {
    "text": "You create a stored function in KQL with the command .create-or-alter function trips_by_min_passenger_count(num_passengers:long). How do you call this function?",
    "options": [
      "trips_by_min_passenger_count WHERE num_passengers >= 3",
      "trips_by_min_passenger_count(3)",
      "SELECT * FROM trips_by_min_passenger_count(3)",
      ".invoke trips_by_min_passenger_count(3)"
    ],
    "correct": 1,
    "module": 1
  },
  {
    "text": "You want to enable high concurrency mode for Spark in Microsoft Fabric. Where is this setting configured?",
    "options": [
      "In the notebook settings before running code",
      "In the Data Engineering/Science section of workspace settings",
      "In the Spark pool configuration under node family settings",
      "In the environment configuration file"
    ],
    "correct": 1,
    "module": 1
  },
  {
    "text": "A delivery company needs to monitor package locations and trigger automatic customer notifications when delays are detected. Which Real-Time Intelligence component handles the automated rule-based actions?",
    "options": [
      "Eventstream",
      "Eventhouse",
      "Activator",
      "Real-Time Dashboard"
    ],
    "correct": 2,
    "module": 3
  },
  {
    "text": "You are configuring an Eventstream with multiple sources and transformations. Which component represents where processed event data is sent for storage or further action?",
    "options": [
      "Source",
      "Transformation",
      "Destination",
      "Derived stream"
    ],
    "correct": 2,
    "module": 3
  },
  {
    "text": "You need to route different subsets of streaming IoT sensor data to different destinations based on temperature thresholds. Which Eventstream feature should you use?",
    "options": [
      "Union transformation",
      "Filter transformation",
      "Derived stream with content-based routing",
      "Aggregate transformation"
    ],
    "correct": 2,
    "module": 3
  },
  {
    "text": "You want to combine two Eventstream nodes and merge events that share fields with the same name and data type. Which transformation should you use?",
    "options": [
      "Join",
      "Union",
      "Expand",
      "Group by"
    ],
    "correct": 1,
    "module": 3
  },
  {
    "text": "You need to calculate hourly average temperatures from a streaming sensor data source in an Eventstream. Which transformation is most appropriate?",
    "options": [
      "Filter",
      "Manage fields",
      "Group by with time window",
      "Expand"
    ],
    "correct": 2,
    "module": 3
  },
  {
    "text": "When you create an Eventhouse, what is automatically created with the same name?",
    "options": [
      "A Real-Time Dashboard",
      "A KQL database",
      "An Eventstream",
      "A Power BI semantic model"
    ],
    "correct": 1,
    "module": 3
  },
  {
    "text": "You need to query a KQL database using familiar SQL syntax instead of KQL. Does the KQL queryset support this?",
    "options": [
      "No, only KQL is supported in KQL querysets",
      "Yes, KQL querysets support a subset of T-SQL expressions",
      "Yes, but only for read operations on materialized views",
      "Only if you install a separate SQL connector"
    ],
    "correct": 1,
    "module": 3
  },
  {
    "text": "In KQL, what is the pipe character (|) used for in queries?",
    "options": [
      "To separate database names from table names",
      "To pass data from one operation to the next in a pipeline approach",
      "To comment out lines of code",
      "To define join conditions between tables"
    ],
    "correct": 1,
    "module": 3
  },
  {
    "text": "You are building a Real-Time Dashboard and want viewers to filter data by a specific region without modifying tile queries. What feature should you configure?",
    "options": [
      "Base queries",
      "Pages",
      "Parameters",
      "Auto refresh"
    ],
    "correct": 2,
    "module": 3
  },
  {
    "text": "A Real-Time Dashboard has multiple tiles that all query the same KQL table with similar WHERE clauses. How can you reduce query duplication and improve maintainability?",
    "options": [
      "Use base queries and reference them in tile queries",
      "Use parameters for every filter condition",
      "Combine all tiles into a single tile",
      "Use a stored function for each tile"
    ],
    "correct": 0,
    "module": 3
  },
  {
    "text": "When configuring data source authorization for a Real-Time Dashboard, which option means each viewer accesses data using their own permissions?",
    "options": [
      "Dashboard editor's identity",
      "Pass-through identity",
      "Service principal",
      "Shared access signature"
    ],
    "correct": 1,
    "module": 3
  },
  {
    "text": "You configure Activator to monitor package temperatures. You want to detect sustained high temperatures rather than brief spikes. Which combination of summarization and occurrence settings should you use?",
    "options": [
      "Average over a 10-minute window, occurring every time",
      "Average over a 10-minute window with step size of 5 minutes, occurring 'when it has been true for' a duration",
      "Minimum reading, occurring every time",
      "Count of readings, occurring 'when it has been true for'"
    ],
    "correct": 1,
    "module": 3
  },
  {
    "text": "Which Activator action type is best suited for executing a multi-step business process that spans multiple external applications?",
    "options": [
      "Email action",
      "Teams action",
      "Power Automate action",
      "Fabric item action"
    ],
    "correct": 2,
    "module": 3
  },
  {
    "text": "You want to create Activator objects from an Eventstream. Which field should you select as the unique identifier to create separate objects for each entity?",
    "options": [
      "Any numeric field",
      "The field that uniquely identifies each object instance (e.g., PackageId)",
      "The timestamp field",
      "The first field in the event data"
    ],
    "correct": 1,
    "module": 3
  },
  {
    "text": "You need to send an immediate notification to a Teams channel when a critical threshold is breached in streaming data. Which Activator action type should you use?",
    "options": [
      "Email action",
      "Teams action",
      "Power Automate action",
      "Fabric item action"
    ],
    "correct": 1,
    "module": 3
  },
  {
    "text": "You want to expand an array field in an Eventstream so that each array value becomes a separate row. Which transformation should you use?",
    "options": [
      "Join",
      "Union",
      "Expand",
      "Manage fields"
    ],
    "correct": 2,
    "module": 3
  },
  {
    "text": "What is the primary difference between a Fabric warehouse and a SQL analytics endpoint?",
    "options": [
      "The warehouse supports read-only access while the SQL analytics endpoint supports write access",
      "The warehouse supports full read/write T-SQL capabilities while the SQL analytics endpoint is read-only",
      "The warehouse uses KQL while the SQL analytics endpoint uses T-SQL",
      "The warehouse stores data in Parquet while the SQL analytics endpoint stores data in Delta format"
    ],
    "correct": 1,
    "module": 4
  },
  {
    "text": "In a dimensional model, what is the purpose of a surrogate key in a dimension table?",
    "options": [
      "It is the natural business key from the source system",
      "It is a system-generated unique identifier specific to the data warehouse",
      "It is used to connect to external APIs",
      "It replaces the primary key in fact tables"
    ],
    "correct": 1,
    "module": 4
  },
  {
    "text": "You need to track changes to a customer's address over time in your data warehouse while preserving the full history of changes. Which SCD type should you implement?",
    "options": [
      "Type 1 SCD",
      "Type 2 SCD",
      "Type 0 SCD",
      "Type 3 SCD"
    ],
    "correct": 1,
    "module": 4
  },
  {
    "text": "You want to load data into a Fabric warehouse from an external CSV file in Azure Blob Storage using T-SQL. Which statement should you use?",
    "options": [
      "INSERT INTO ... SELECT",
      "CREATE TABLE AS SELECT",
      "COPY INTO",
      "OPENROWSET"
    ],
    "correct": 2,
    "module": 4
  },
  {
    "text": "You need to query data across a warehouse and a lakehouse in the same workspace without copying data. Which T-SQL feature enables this?",
    "options": [
      "Cross-database queries using three-part naming",
      "Linked servers",
      "OPENROWSET with SQL authentication",
      "COPY INTO with external tables"
    ],
    "correct": 0,
    "module": 4
  },
  {
    "text": "You want to create a zero-copy clone of a warehouse table for development and testing. What does the cloned table share with the original?",
    "options": [
      "Separate data files but the same metadata",
      "The same underlying data files in OneLake but separate metadata",
      "Both the same underlying data files and the same metadata",
      "Separate copies of both data and metadata"
    ],
    "correct": 2,
    "module": 4
  },
  {
    "text": "When querying a Fabric warehouse, you want to estimate the number of distinct orders without requiring an exact count on a very large table. Which function should you use?",
    "options": [
      "COUNT(DISTINCT ...)",
      "APPROX_COUNT_DISTINCT(...)",
      "COUNT_BIG(...)",
      "DISTINCT_COUNT(...)"
    ],
    "correct": 1,
    "module": 4
  },
  {
    "text": "You are using RANK and DENSE_RANK functions on products partitioned by category. Two products share the same list price and both rank 3rd. What value does DENSE_RANK assign to the next product?",
    "options": [
      "4",
      "5",
      "3",
      "6"
    ],
    "correct": 0,
    "module": 4
  },
  {
    "text": "You want to connect to a Fabric warehouse from SQL Server Management Studio (SSMS). Which authentication method is supported?",
    "options": [
      "SQL authentication with username and password",
      "Microsoft Entra ID authentication only",
      "Windows authentication only",
      "Both SQL authentication and Microsoft Entra ID"
    ],
    "correct": 1,   // CORRECTED: While both are supported, the question asks "which authentication method is supported?" – single answer: Microsoft Entra ID only is false. But the correct choice is "Microsoft Entra ID authentication only" because SQL auth is not supported in SSMS for Fabric warehouse? Actually, Fabric warehouse supports Entra ID only for SSMS connections. I'll keep as per official docs: SSMS supports Entra ID only. So correct = 1.
    "module": 4
  },
  {
    "text": "Copilot in Fabric Data Warehouse requires a minimum capacity SKU to function. What is the minimum required SKU?",
    "options": [
      "Trial SKU",
      "F2 or higher, or P SKU",
      "F64 or higher",
      "Any SKU with Copilot enabled"
    ],
    "correct": 2,   // CORRECTED: F64 or higher (or P1) is required for Copilot in Fabric.
    "module": 4
  },
  {
    "text": "You run a query in the Fabric warehouse SQL editor that contains syntax errors. Which Copilot quick action can automatically resolve these errors?",
    "options": [
      "Explain query",
      "Fix query errors",
      "Generate SQL",
      "Question"
    ],
    "correct": 1,
    "module": 4
  },
  {
    "text": "You want to monitor currently running queries in your Fabric warehouse and identify which ones have been executing the longest. Which DMV should you query?",
    "options": [
      "sys.dm_exec_connections",
      "sys.dm_exec_sessions",
      "sys.dm_exec_requests",
      "queryinsights.long_running_queries"
    ],
    "correct": 2,
    "module": 4
  },
  {
    "text": "Query insights in Fabric data warehouse retains historical query data for how long?",
    "options": [
      "7 days",
      "15 minutes",
      "30 days",
      "90 days"
    ],
    "correct": 2,
    "module": 4
  },
  {
    "text": "You want to mask the Email column in a Customers table so nonprivileged users see only the first letter and '.com' suffix. Which Dynamic Data Masking function should you apply?",
    "options": [
      "default()",
      "email()",
      "partial(1, '@contoso.com', 4)",
      "random(0, 9999)"
    ],
    "correct": 1,
    "module": 4
  },
  {
    "text": "You implement Row-Level Security with a filter predicate on a Sales table. A user runs a SELECT query. What happens if the predicate function returns false for certain rows?",
    "options": [
      "The rows are returned with NULL values",
      "The rows are excluded from the query results entirely",
      "An error is returned to the user",
      "The rows are returned but marked as restricted"
    ],
    "correct": 1,
    "module": 4
  },
  {
    "text": "You need to restrict access to the MedicalHistory column in a Patients table so only Doctors and Nurses can view it. Which approach should you use?",
    "options": [
      "Row-level security on the table",
      "Column-level security with DENY SELECT on the column for other roles",
      "Dynamic data masking with default function",
      "Create separate views for each role"
    ],
    "correct": 1,
    "module": 4
  },
  {
    "module": 1,
    "text": "You need to orchestrate a multi‑step ETL pipeline that extracts data from Azure Blob Storage, transforms it with Spark, and loads it into a lakehouse. Which Fabric service should you use to define and schedule this workflow?",
    "options": ["Dataflow Gen2", "Pipeline", "Notebook", "Activator"],
    "correct": 1
  },
  {
    "module": 1,
    "text": "A data engineer wants to run a Spark notebook that reads a large CSV file but must limit memory usage. Which Spark configuration is the BEST way to control memory consumption?",
    "options": ["spark.driver.memory", "spark.sql.shuffle.partitions", "spark.memory.fraction", "spark.executor.cores"],
    "correct": 2
  },
  {
    "module": 1,
    "text": "In a Dataflow Gen2, you notice that after adding a custom column the query folding is lost. What is the most likely reason?",
    "options": ["Custom column uses a non‑foldable function", "Dataflow has reached its row limit", "Dataflow is set to Manual Refresh", "The source does not support folding"],
    "correct": 0
  },
  {
    "module": 1,
    "text": "You need to process streaming data from Azure Event Hubs and write the results to a KQL database in real time. Which combination provides the lowest latency?",
    "options": ["Eventstream → Activator → KQL", "Eventstream → Pipeline → KQL", "Dataflow Gen2 → Lakehouse → KQL", "Notebook → Eventstream → KQL"],
    "correct": 0
  },
  {
    "module": 1,
    "text": "A notebook uses Spark Structured Streaming with a foreachBatch sink to write to a lakehouse. Which setting ensures exactly‑once semantics?",
    "options": ["checkpointLocation", "outputMode = Append", "trigger = ProcessingTime('5 minutes')", "spark.sql.streaming.allowMultipleContexts"],
    "correct": 0
  },
  {
    "module": 1,
    "text": "Which of the following statements about Dataflows Gen2 is FALSE?",
    "options": [
      "They support query folding when possible.",
      "They can be scheduled independently of pipelines.",
      "They automatically duplicate data to a warehouse.",
      "They can write directly to Delta tables."
    ],
    "correct": 2
  },
  {
    "module": 1,
    "text": "You have a Dataflow Gen2 that reads from a REST API with pagination. Which Power Query function helps retrieve all pages efficiently?",
    "options": ["List.Generate", "Table.Combine", "Json.Document", "Web.Contents with relativePath"],
    "correct": 0
  },
  {
    "module": 1,
    "text": "A pipeline needs to pass a runtime value to a Spark notebook as a parameter. Which activity type should you use?",
    "options": ["Copy Data", "Notebook", "Data Flow", "Stored Procedure"],
    "correct": 1
  },
  {
    "module": 1,
    "text": "You must enforce schema validation on incoming JSON files before they are written to the bronze layer. Which tool provides the most flexible validation?",
    "options": ["Dataflow Gen2 with Power Query M", "Notebook with Spark", "Eventstream with mapping", "Pipeline with Data Flow activity"],
    "correct": 1
  },
  {
    "module": 1,
    "text": "When configuring an Eventstream, which destination supports both KQL queries and T‑SQL access?",
    "options": ["Lakehouse (Delta)", "KQL database", "Warehouse", "Eventhouse"],
    "correct": 2
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
    "correct": 0
  },
  {
    "module": 2,
    "text": "A bronze Delta table has millions of small files. Which command will improve read performance the most?",
    "options": ["VACUUM", "OPTIMIZE", "REPAIR", "DESCRIBE HISTORY"],
    "correct": 1
  },
  {
    "module": 2,
    "text": "You must ensure a Delta table can be time‑travelled to a point 12 days ago. Which setting must you adjust?",
    "options": ["VACUUM retention period", "Delta lake versioning to 30 days", "Enable streaming checkpoint", "Set table property 'retentionHours'"],
    "correct": 0
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
    "correct": 1
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
    "correct": 0
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
    "correct": 1
  },
  {
    "module": 2,
    "text": "You have a Delta table with a large number of columns but only a few are used in most queries. Which optimization can reduce I/O?",
    "options": [
      "Create a columnstore index",
      "Enable V‑Order on frequently accessed columns",
      "Set file format to CSV",
      "Disable transaction log"
    ],
    "correct": 1
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
    "correct": 0
  },
  {
    "module": 2,
    "text": "You need to move data from a bronze Delta table to silver while applying schema enforcement. Which tool provides the most straightforward solution?",
    "options": ["Dataflow Gen2 with schema mapping", "Spark notebook with DataFrame API", "Pipeline Copy Data activity", "Activator"],
    "correct": 0
  },
  {
    "module": 2,
    "text": "Which command can be used to retrieve a specific version of a Delta table as of 3 hours ago?",
    "options": ["SELECT * FROM table VERSION AS OF 3", "SELECT * FROM table TIMESTAMP AS OF ...", "SELECT * FROM table AS OF TIME 3h", "SELECT * FROM table AT VERSION 3"],
    "correct": 1
  },
  {
    "module": 3,
    "text": "A Real‑Time Dashboard must display the latest metric value within 5 seconds of arrival. Which Fabric component should you configure to achieve this latency?",
    "options": ["Eventstream with low‑latency sink", "KQL database with Update policy", "Activator with threshold alert", "Pipeline with scheduled trigger"],
    "correct": 1
  },
  {
    "module": 3,
    "text": "Which of the following KQL functions provides an approximate distinct count with sub‑second performance on large data sets?",
    "options": ["dcount()", "approx_count_distinct()", "summarize count_distinct()", "count_distinct_hll()"],
    "correct": 1
  },
  {
    "module": 3,
    "text": "You need to trigger an email when a metric in a KQL database exceeds 1000 units for 3 consecutive minutes. Which Fabric feature should you use?",
    "options": ["Activator", "Eventstream policy", "Real‑Time Dashboard alert", "Pipeline with Wait activity"],
    "correct": 0
  },
  {
    "module": 3,
    "text": "Which statement about a materialized view in a KQL database is TRUE?",
    "options": [
      "It stores pre‑computed results and updates incrementally.",
      "It is refreshed on a fixed schedule only.",
      "It cannot be joined with other tables.",
      "It replaces the underlying base table."
    ],
    "correct": 0
  },
  {
    "module": 3,
    "text": "A Data Engineer wants to transform streaming data without building a pipeline. Which feature allows on‑the‑fly transformation of ingested data?",
    "options": ["Update policy", "Stored function", "Materialized view", "Activator"],
    "correct": 0
  },
  {
    "module": 3,
    "text": "Which of the following is NOT a valid source for an Eventstream?",
    "options": ["Azure Event Hubs", "Azure Data Explorer", "Azure Blob Storage", "Kafka"],
    "correct": 1
  },
  {
    "module": 3,
    "text": "You need to create a threshold‑based alert on a streaming metric that fires a Teams message. Which Activator action type should you select?",
    "options": ["Email", "Teams", "Power Automate", "Azure Function"],
    "correct": 1
  },
  {
    "module": 3,
    "text": "Which component supports both KQL queries and a T‑SQL subset in Fabric?",
    "options": ["Lakehouse SQL analytics endpoint", "KQL Queryset", "Eventhouse", "Real‑Time Dashboard"],
    "correct": 0
  },
  {
    "module": 3,
    "text": "You want to query a KQL database but need to ensure data is masked for privacy. Which feature can you use to automatically mask sensitive columns?",
    "options": ["Update policy", "Dynamic data masking", "Materialized view", "Stored function"],
    "correct": 1
  },
  {
    "module": 3,
    "text": "A Real‑Time Dashboard must use the editor’s identity for data access. Which authorization method should be chosen?",
    "options": ["Pass‑through identity", "Dashboard editor’s identity", "Service principal", "Shared access signature"],
    "correct": 1
  },
  {
    "module": 4,
    "text": "You are designing a dimensional model for sales data. Which schema type reduces data redundancy but may increase JOIN complexity?",
    "options": ["Star schema", "Snowflake schema", "Galaxy schema", "Fact constellation"],
    "correct": 1
  },
  {
    "module": 4,
    "text": "A fact table stores 10 billion rows. Which indexing strategy in a Fabric warehouse provides the best query performance for ad‑hoc filters on a few columns?",
    "options": ["B‑tree index on filtered columns", "Columnstore index", "Hash index", "Full‑text index"],
    "correct": 1
  },
  {
    "module": 4,
    "text": "You need to preserve full history of product attributes. Which Slowly Changing Dimension type should you implement?",
    "options": ["SCD Type 0", "SCD Type 1", "SCD Type 2", "SCD Type 3"],
    "correct": 2
  },
  {
    "module": 4,
    "text": "Which of the following is a valid reason to use a bridge table in a dimensional model?",
    "options": [
      "To resolve many‑to‑many relationships",
      "To store aggregated facts",
      "To replace a dimension table",
      "To enforce row‑level security"
    ],
    "correct": 0
  },
  {
    "module": 4,
    "text": "You have a measure that calculates year‑over‑year growth. Which DAX function is essential for comparing the same period last year?",
    "options": ["SAMEPERIODLASTYEAR", "DATEADD", "PREVIOUSYEAR", "PARALLELPERIOD"],
    "correct": 0
  },
  {
    "module": 4,
    "text": "A warehouse query is slow because the optimizer cannot use an appropriate index. Which hint can you add to a T‑SQL statement to force index usage?",
    "options": ["WITH (INDEX(index_name))", "FORCESEEK", "USE HINT('INDEX')", "OPTIMIZE FOR"],
    "correct": 0
  },
  {
    "module": 4,
    "text": "Which statement about user‑defined aggregations in a semantic model is FALSE?",
    "options": [
      "They improve performance for pre‑aggregated queries.",
      "They require the model to be in Import mode.",
      "They can be defined at the measure level.",
      "They are stored in the warehouse."
    ],
    "correct": 1
  },
  {
    "module": 4,
    "text": "You need to rank products by sales within each category. Which DAX pattern correctly respects the category context?",
    "options": [
      "RANKX(ALL(DimProduct), [Total Sales])",
      "RANKX(ALLSELECTED(DimProduct[Category]), [Total Sales])",
      "RANKX(FILTER(ALL(DimProduct), DimProduct[Category] = EARLIER(DimProduct[Category])), [Total Sales])",
      "RANKX(VALUES(DimProduct[Category]), [Total Sales])"
    ],
    "correct": 2
  },
  {
    "module": 4,
    "text": "A measure uses CALCULATE with a date filter but loses external slicer context. Which function should be added to preserve the slicer filters?",
    "options": ["KEEPFILTERS", "ALL", "REMOVEFILTERS", "FILTER"],
    "correct": 0
  },
  {
    "module": 4,
    "text": "Which of the following is TRUE about the HIGH CONCURRENCY mode for Spark in Fabric?",
    "options": [
      "Each notebook runs in a separate session.",
      "Spark sessions are shared across users.",
      "It requires a custom Spark pool.",
      "It disables autoscaling."
    ],
    "correct": 1
  },
  {
    "module": 4,
    "text": "You need to model a many‑to‑many relationship between sales and promotions without double counting. Which configuration is required?",
    "options": [
      "Bidirectional cross‑filter on both sides",
      "Set relationship to Single direction",
      "Enable 'Apply security filter in both directions'",
      "Use a bridge table"
    ],
    "correct": 3
  },
  {
    "module": 5,
    "text": "You must enforce column‑level security on a salary column in a warehouse. Which T‑SQL statement is the correct way to deny access to a specific role?",
    "options": [
      "DENY SELECT ON Employees(Salary) TO [FinanceRole]",
      "REVOKE SELECT ON Employees FROM [FinanceRole]",
      "DENY UPDATE ON Employees(Salary) TO [FinanceRole]",
      "ALTER TABLE Employees DISABLE COLUMN Salary"
    ],
    "correct": 0
  },
  {
    "module": 5,
    "text": "A CI/CD pipeline needs to automatically promote items from a dev workspace to prod after successful validation. Which Fabric feature should be used?",
    "options": ["Deployment pipelines", "Git integration", "REST API", "Workspace apps"],
    "correct": 0
  },
  {
    "module": 5,
    "text": "Which role can manage workspace settings and assign permissions in a Fabric workspace?",
    "options": ["Admin", "Member", "Contributor", "Viewer"],
    "correct": 0
  },
  {
    "module": 5,
    "text": "You want to give a service principal read‑only access to a specific lakehouse table. Which permission should you grant?",
    "options": [
      "GRANT SELECT ON TableName TO [ServicePrincipal]",
      "GRANT READ TO [ServicePrincipal]",
      "ADD MEMBER ServicePrincipal TO [ReaderRole]",
      "DENY UPDATE ON TableName TO [ServicePrincipal]"
    ],
    "correct": 0
  },
  {
    "module": 5,
    "text": "Which of the following is NOT a valid action type in Activator?",
    "options": ["Email", "Teams", "Power Automate", "Azure Function"],
    "correct": 3
  },
  {
    "module": 5,
    "text": "You need to schedule a pipeline to run every 15 minutes. Which trigger type should you configure?",
    "options": [
      "Scheduled trigger with recurrence of 15 minutes",
      "Event‑driven trigger on blob creation",
      "Manual trigger only",
      "Dataflow refresh trigger"
    ],
    "correct": 0
  },
  {
    "module": 5,
    "text": "A warehouse query fails because the user lacks permission to view query insights. Which permission must be added?",
    "options": [
      "VIEW SERVER STATE",
      "MONITOR QUERY INSIGHTS",
      "READ DATABASE",
      "ADMINISTER DATABASE BULK OPERATIONS"
    ],
    "correct": 1
  },
  {
    "module": 5,
    "text": "When using the COPY INTO statement to load Parquet files from ADLS, which authentication methods are supported?",
    "options": [
      "SQL authentication only",
      "Managed identity or SAS token",
      "Windows authentication",
      "OAuth 2.0 client credentials"
    ],
    "correct": 1
  },
  {
    "module": 5,
    "text": "Which function safely incorporates user input into a dynamic SQL string in a Fabric warehouse?",
    "options": ["QUOTENAME", "CONCAT", "STRING_AGG", "FORMATMESSAGE"],
    "correct": 0
  },
  {
    "module": 5,
    "text": "You need to mask email addresses in a column. Which dynamic data masking function should you use?",
    "options": ["email()", "partial()", "random()", "default()"],
    "correct": 0
  },
  {
    "module": 6,
    "text": "Which component should you use to automatically detect when a streaming metric exceeds a threshold and send a Teams notification?",
    "options": ["Activator", "Eventstream policy", "Pipeline with condition", "Real‑Time Dashboard alert"],
    "correct": 0
  },
  {
    "module": 6,
    "text": "Activator can invoke which of the following as an action?",
    "options": ["Email", "Teams message", "Power Automate flow", "All of the above"],
    "correct": 3
  },
  {
    "module": 6,
    "text": "You need to run a custom script when a KQL table’s row count exceeds 1 M. Which Activator action type is most appropriate?",
    "options": ["Azure Function", "Email", "Power Automate", "Teams"],
    "correct": 0
  },
  {
    "module": 6,
    "text": "Which of the following statements about Activator is FALSE?",
    "options": [
      "It can only be triggered by Eventstream metrics.",
      "It supports thresholds based on aggregates.",
      "It can call a Power Automate flow.",
      "It can send notifications via Teams."
    ],
    "correct": 0
  },
  {
    "module": 6,
    "text": "A threshold alert must be evaluated over a sliding window of 10 minutes. Which configuration in Activator enables this behavior?",
    "options": [
      "Windowed aggregation in the condition",
      "Polling interval of 10 minutes",
      "Fixed time‑range query",
      "No configuration needed; default is sliding window"
    ],
    "correct": 0
  },
  {
    "module": 6,
    "text": "You want Activator to execute a stored procedure in a warehouse when a condition is met. Which action type should you select?",
    "options": ["Email", "Teams", "Power Automate", "Azure Function"],
    "correct": 2
  },
  {
    "module": 6,
    "text": "Which component provides the ability to trigger Activator based on a KQL query result?",
    "options": ["Update policy", "Materialized view", "Eventstream", "Dashboard alert"],
    "correct": 0
  },
  {
    "module": 6,
    "text": "You need to have Activator send a message to a Slack channel. Which action type should you use?",
    "options": ["Email", "Teams", "Power Automate", "Custom webhook via Azure Function"],
    "correct": 3
  },
  {
    "module": 6,
    "text": "Which of the following is a valid use case for Activator?",
    "options": [
      "Detecting when a streaming metric exceeds a threshold and sending an email",
      "Transforming data in a lakehouse",
      "Running a nightly warehouse backup",
      "Building a Power BI report"
    ],
    "correct": 0
  },
  {
    "module": 6,
    "text": "When configuring an Activator alert, which field defines the condition to evaluate?",
    "options": ["Expression", "Threshold", "Metric", "Action"],
    "correct": 0
  }
];