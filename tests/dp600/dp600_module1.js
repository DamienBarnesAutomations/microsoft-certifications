// Module 1: Microsoft Fabric & Analytics Platform
(function() {
  var questions = [
    {
      "id": "dp600-1-001",
      "text": "Your organization enables Microsoft Fabric. A data engineer asks whether separate storage accounts are needed for Data Engineering, Data Warehouse, and Power BI workloads. What is the correct answer?",
      "options": [
        "Data Engineering and Data Warehouse share storage, but Power BI semantic models need their own account",
        "Each workload requires its own Azure Data Lake Storage Gen2 account in the same region as the capacity",
        "Storage accounts must be provisioned manually and attached to each workspace before items can be created",
        "OneLake is a tenant-wide data lake automatically available to all Fabric workloads without separate setup"
      ],
      "correct": 3,
      "module": 1,
      "explanation": "OneLake is the unified, tenant-wide data lake in Microsoft Fabric, automatically available to all workloads (Data Engineering, Data Warehouse, Power BI, Real-Time Intelligence, etc.) without separate storage accounts. It eliminates data silos and copying. The other options incorrectly suggest manual provisioning or workload-specific storage, which contradicts Fabric's unified architecture."
    },
    {
      "id": "dp600-1-002",
      "text": "You need to grant a new analytics team read-only access to a specific lakehouse without giving them access to other items in the workspace. What should you do?",
      "options": [
        "Assign the Viewer workspace role to the team so they can read the lakehouse",
        "Create a custom workspace role for the team that is scoped to the lakehouse",
        "Share the lakehouse with item-level permissions and grant Read access",
        "Assign the Contributor workspace role to the team and hide the other items"
      ],
      "correct": 2,
      "module": 1,
      "explanation": "Item-level permissions allow granting access to a specific item (the lakehouse) without exposing other items in the workspace. The Viewer role would give read access to all items in the workspace, not just the lakehouse. Contributor would allow modifications and also applies to the whole workspace. Custom workspace roles are not supported for this granularity."
    },
    {
      "id": "dp600-1-003",
      "text": "A data analyst discovers a semantic model in the OneLake catalog. The model has a 'Certified' endorsement badge. What does this indicate?",
      "options": [
        "The model's owner approved it as ready for sharing within a single team or project",
        "An organization-authorized reviewer verified the model meets quality standards for cross-team use",
        "The model was designated the single source of truth for the organization's core business entities",
        "Fabric automatically endorsed the model after it reached a high number of report views and refreshes"
      ],
      "correct": 1,
      "module": 1,
      "explanation": "Certified endorsement means an authorized reviewer (e.g., governance team) has approved the semantic model as meeting quality, reliability, and business standards for organization-wide, cross-team use. Promoted is for team-level trust; Master data indicates a single source of truth. Certification is never automatic – it requires human approval."
    },
    {
      "id": "dp600-1-004",
      "text": "You want to understand how data flows from a source lakehouse through transformations into a final report. Which Fabric feature should you use?",
      "options": [
        "Data lineage view in the workspace",
        "The OneLake catalog Explore tab",
        "The Admin portal audit logs",
        "The Monitor Hub activity history"
      ],
      "correct": 0,
      "module": 1,
      "explanation": "Data lineage view (in workspace or item details) visually shows how data moves from source through transformations (e.g., dataflows, Spark jobs) to downstream items like semantic models and reports. Monitor Hub focuses on activity runs, OneLake catalog is for discovery, and audit logs track administrative actions."
    },
    {
      "id": "dp600-1-005",
      "text": "Your team needs to discover streaming data sources that other teams have created in Fabric. Where should you navigate?",
      "options": [
        "The OneLake catalog and filter by item type",
        "The Real-Time hub Streaming data page",
        "The workspace settings Integrations tab",
        "The Admin portal Data sources section"
      ],
      "correct": 1,
      "module": 1,
      "explanation": "The Real-Time hub is the central catalog for discovering and managing streaming data sources such as eventstreams, KQL tables, and IoT data. The OneLake catalog is for batch/stored data, not streaming. Admin portal and workspace settings do not provide this discovery capability."
    },
    {
      "id": "dp600-1-006",
      "text": "A Fabric administrator needs to disable Copilot for all users except the Data Science team. Where should the administrator configure this?",
      "options": [
        "In the Power BI service under Capacity settings",
        "In the Admin portal Tenant settings, enabling Copilot only for the Data Science security group",
        "In each workspace's settings under the AI features section, one workspace at a time",
        "By removing Copilot licenses from every user outside the Data Science team"
      ],
      "correct": 1,
      "module": 1,
      "explanation": "Tenant settings in the Admin portal allow enabling or disabling Copilot for specific security groups. This is the recommended centralized control. Workspace settings only affect that workspace, licenses are not granular enough, and capacity settings do not control user-level Copilot access."
    },
    {
      "id": "dp600-1-007",
      "text": "A capacity administrator needs to see compute unit (CU) consumption by item and identify when the capacity is being throttled. Which tool should they use?",
      "options": [
        "The Microsoft Fabric Capacity Metrics app",
        "The monitoring hub activity list in a workspace",
        "The Query Insights views of a warehouse",
        "The lineage view of the affected workspace"
      ],
      "correct": 0,
      "module": 1,
      "explanation": "The Microsoft Fabric Capacity Metrics app shows CU utilization, smoothing and throttling by capacity and by item, so it is the tool for diagnosing capacity overload. The monitoring hub lists activity runs, lineage view shows item dependencies, and Query Insights covers query history in a single warehouse."
    },
    {
      "id": "dp600-1-008",
      "text": "A user asks a data agent a natural language question about sales data. The data agent translates the question into a SQL query against a lakehouse. What is this process called?",
      "options": [
        "DAX query generation against a semantic model that is bound to the lakehouse",
        "Natural language to SQL (NL2SQL) translation",
        "Direct Lake querying of the lakehouse tables through a semantic model",
        "KQL query compilation against an Eventhouse database that holds the sales data"
      ],
      "correct": 1,
      "module": 1,
      "explanation": "The process of converting a natural language question into a structured SQL query is known as NL2SQL (Natural Language to SQL). Direct Lake is a storage mode, DAX is for semantic models, and KQL is for eventhouses."
    },
    {
      "id": "dp600-1-009",
      "text": "You need to connect to data in another workspace's lakehouse without copying it. You create a shortcut in your lakehouse that references their tables. What does the shortcut do?",
      "options": [
        "Creates a scheduled sync that refreshes a local copy of the source data every hour",
        "Copies the data into your own OneLake storage so queries run independently of the source",
        "Moves the data into your workspace and removes it permanently from the source lakehouse",
        "Creates a reference that surfaces external data as a local folder without duplicating it"
      ],
      "correct": 3,
      "module": 1,
      "explanation": "A shortcut is a reference (like a symbolic link) that makes data from another location (internal or external) appear as a local folder or table in OneLake. No data is copied or moved – it stays in the source location. Shortcuts avoid duplication and maintain a single source of truth."
    },
    {
      "id": "dp600-1-010",
      "text": "Which pair of workspace roles can both manage item permissions, such as sharing items and adding other users to the workspace?",
      "options": [
        "Contributor and Viewer",
        "Viewer and Admin",
        "Admin and Member",
        "Member and Contributor"
      ],
      "correct": 2,
      "module": 1,
      "explanation": "Admins and Members can share items and add users to the workspace (Members only up to their own role level). Contributors can create and edit content but cannot manage permissions, and Viewers can only view content."
    },
    {
      "id": "dp600-1-011",
      "text": "A Fabric workspace contains lakehouses, warehouses, and semantic models. The workspace is assigned to a domain. What does domain assignment affect?",
      "options": [
        "It changes which users can see items in the workspace by overriding the workspace roles",
        "It restricts which Fabric workloads can be used by the workspaces assigned to the domain",
        "It organizes governance policies and grouping but does not change item-level access control",
        "It replaces the need for workspace roles because domain admins control all access"
      ],
      "correct": 2,
      "module": 1,
      "explanation": "Domains provide logical grouping of workspaces for governance (e.g., applying policies, ownership) and discovery. They do not alter access control – workspace roles and item permissions continue to apply independently. Domains do not replace roles or restrict workloads."
    },
    {
      "id": "dp600-1-012",
      "text": "You are exploring the OneLake catalog to find a suitable semantic model for a report. You notice one model has a 'Master data' endorsement. What does this designation mean?",
      "options": [
        "The model is the authoritative source of truth for core entities such as customers or products",
        "The model is the most frequently queried semantic model across the whole organization",
        "The model's owner has marked it as ready for sharing within a team or project",
        "The model was approved by Copilot for use in AI-generated answers across the tenant"
      ],
      "correct": 0,
      "module": 1,
      "explanation": "Master data endorsement indicates that the item (lakehouse or semantic model) is the authoritative, organization-wide source of truth for critical business entities such as customer, product, or employee data. It is a higher level than Certified and applies only to data items."
    },
    {
      "id": "dp600-1-013",
      "text": "You create a lakehouse and notice that a dbo schema was created automatically. What is the benefit of organizing tables into schemas?",
      "options": [
        "Schemas are required before Copilot can generate any queries against the lakehouse tables",
        "Schemas prevent the same data from being duplicated across multiple lakehouses in a workspace",
        "Schemas automatically apply row-level security to every table that they contain",
        "Schemas enable schema-level permissions and cross-workspace queries using four-part naming"
      ],
      "correct": 3,
      "module": 1,
      "explanation": "Schemas (like dbo) allow logical grouping of tables and enable schema-level security (GRANT SELECT on a schema) and cross-workspace queries using four-part naming: workspace.lakehouse.schema.table. They do not prevent duplication, are not required for Copilot, and do not automatically apply RLS."
    },
    {
      "id": "dp600-1-014",
      "text": "You want to manage a semantic model in a Fabric workspace by using external tools such as SQL Server Management Studio or Tabular Editor. Which connectivity option makes this possible?",
      "options": [
        "The SQL analytics endpoint connection string of a lakehouse in the workspace",
        "The workspace XMLA endpoint, with read-write enabled for the capacity",
        "A Dataflow Gen2 connector that points at the semantic model",
        "OneLake file explorer for Windows synced to the workspace"
      ],
      "correct": 1,
      "module": 1,
      "explanation": "The XMLA endpoint exposes semantic models in a workspace on a Fabric or Premium capacity to client tools such as SSMS, Tabular Editor and ALM Toolkit. Read-write must be enabled to deploy or modify model metadata. The SQL analytics endpoint exposes lakehouse tables, not semantic model metadata."
    },
    {
      "id": "dp600-1-015",
      "text": "A team wants version control for Fabric workspace items, with changes committed to a branch of a repository. Which feature should they configure?",
      "options": [
        "Deployment pipelines, which keep a commit history for each stage",
        "Git integration connected to an Azure DevOps or GitHub branch",
        "OneLake versioning, which retains earlier definitions of every item",
        "Delta Lake time travel on the lakehouse tables in the workspace"
      ],
      "correct": 1,
      "module": 1,
      "explanation": "Git integration connects a workspace to a branch in Azure DevOps or GitHub so item definitions can be committed, updated and branched. Deployment pipelines promote content between stages but are not a source-control system, and Delta time travel versions table data, not item definitions."
    },
    {
      "id": "dp600-1-016",
      "text": "A data scientist needs to build and train ML models using data stored in OneLake. Which Fabric workload and tools are most appropriate?",
      "options": [
        "Data Science workload using notebooks with Python and Spark",
        "Data Warehouse with T-SQL queries and stored procedures for model training",
        "Real-Time Intelligence with KQL querysets and Eventhouse functions",
        "Data Factory with a Copy data activity in a scheduled pipeline"
      ],
      "correct": 0,
      "module": 1,
      "explanation": "The Data Science workload provides notebooks with Python and Spark support for building and testing ML models. Data scientists can store and access data in lakehouses and integrate with Azure Machine Learning. The other options lack the iterative, code-based environment needed for ML model development."
    },
    {
      "id": "dp600-1-017",
      "text": "Your organization wants to adopt a medallion architecture with bronze, silver, and gold layers. How can this be implemented in Fabric lakehouses?",
      "options": [
        "Use a Warehouse for the bronze layer and lakehouses for the silver and gold layers",
        "Store every layer in a single lakehouse using only the Tables folder with no schemas",
        "Create three separate Fabric capacities, one each for the bronze, silver and gold layers",
        "Use separate lakehouses for bronze, silver and gold, linked with shortcuts between them"
      ],
      "correct": 3,
      "module": 1,
      "explanation": "A medallion architecture can be implemented using shortcuts between lakehouses. For example, a bronze lakehouse holds raw data, a silver lakehouse uses shortcuts to reference bronze data and adds transformations, and a gold lakehouse shortcuts from silver for curated datasets. This separation of layers without data duplication is a key Fabric pattern."
    },
    {
      "id": "dp600-1-018",
      "text": "You need to ingest data from a SQL Server database into OneLake with continuous replication as source data changes. Which ingestion method should you use?",
      "options": [
        "Mirroring of the SQL Server or Azure SQL Database into Fabric",
        "Direct upload of exported files through the Fabric interface on a recurring basis",
        "A one-time COPY INTO command run from a warehouse query window",
        "A Dataflow Gen2 refresh run on a scheduled interval"
      ],
      "correct": 0,
      "module": 1,
      "explanation": "Mirroring continuously replicates data from external databases like SQL Server, Azure SQL Database, Cosmos DB, or Snowflake into OneLake. When source data changes, OneLake reflects those changes automatically. Direct upload, COPY INTO, and scheduled dataflows are batch-oriented and do not provide continuous replication."
    },
    {
      "id": "dp600-1-019",
      "text": "A cloud administrator wants to enable Fabric for the entire organization. Which roles have the authority to do this?",
      "options": [
        "Any workspace Admin within Fabric who owns at least one workspace on the capacity",
        "Fabric Administrator, Power Platform Administrator, or Global Administrator",
        "Only the Fabric Administrator, because the role is specific to Fabric",
        "Only the Global Administrator, because tenant-wide settings need the highest role"
      ],
      "correct": 1,
      "module": 1,
      "explanation": "Enabling Fabric requires tenant-level administrative privileges: Fabric Administrator, Power Platform Administrator, or Global Administrator (Entra ID). Workspace Admins have no tenant-wide authority to enable Fabric. This is configured in the Admin portal > Tenant settings."
    },
    {
      "id": "dp600-1-020",
      "text": "A user creates a shortcut to reference data in an Amazon S3 bucket. What happens to the underlying data?",
      "options": [
        "It is cached in OneLake for 24 hours and then removed unless the shortcut is refreshed",
        "It is copied into OneLake and converted to Delta format on a nightly schedule",
        "It remains in Amazon S3 and is read in place through the shortcut reference",
        "It is moved into OneLake and then deleted from the S3 bucket after verification"
      ],
      "correct": 2,
      "module": 1,
      "explanation": "Shortcuts create a reference that allows data to be accessed as if it were stored locally, but the data remains in the original location (Amazon S3 in this case). No data is copied or moved. This maintains data consistency and reduces storage costs. Shortcuts support external sources like ADLS Gen2, Amazon S3, and Dataverse."
    },
    {
      "id": "dp600-1-021",
      "text": "An analyst finds a semantic model in the OneLake catalog with a 'Promoted' endorsement. What does this mean?",
      "options": [
        "A user with write permissions determined the model is ready for sharing within their team",
        "The model is the authoritative source of truth for the organization's core data",
        "The model was automatically promoted by Fabric based on how frequently it is used",
        "The model has been certified by the organization's governance team after a formal review"
      ],
      "correct": 0,
      "module": 1,
      "explanation": "Promoted endorsement means any user with write permissions has determined the item is ready for broader sharing, typically within a team or project. Certified requires authorized reviewers; Master data is the authoritative source of truth. Promotion is a user-driven action, not automatic."
    },
    {
      "id": "dp600-1-022",
      "text": "A team needs a point-in-time snapshot of data from another workspace's lakehouse for compliance auditing. Which approach should they use?",
      "options": [
        "Create a cross-workspace query with four-part naming to read the source tables",
        "Create a shortcut to the source lakehouse tables so the data stays synchronized",
        "Copy the data into their own lakehouse at a specific time to preserve the snapshot",
        "Use the Real-Time hub to capture a stream of the source data at that moment"
      ],
      "correct": 2,
      "module": 1,
      "explanation": "Shortcuts always reflect the current state of source data and are not suitable for point-in-time snapshots or compliance requirements that need physically separate copies. When a stable snapshot is needed, data should be copied at a specific point in time. Cross-workspace queries also reflect live data."
    },
    {
      "id": "dp600-1-023",
      "text": "Which of the following correctly describes the relationship between data mesh architecture and Fabric domains?",
      "options": [
        "Domains allow decentralized data ownership with centralized governance by grouping workspaces",
        "Domains automatically replicate data across all workspaces in the domain",
        "Domains replace workspace roles, so that all of the data becomes accessible to all users",
        "Domains restrict which Fabric workloads can be used within a workspace that they contain"
      ],
      "correct": 0,
      "module": 1,
      "explanation": "Fabric supports a data mesh architecture where domains group workspaces by business area (e.g., Sales, Marketing). This enables decentralized data ownership while maintaining centralized governance through the Admin portal and OneLake catalog. Domains do not replace roles, restrict workloads, or replicate data."
    },
    {
      "id": "dp600-1-024",
      "text": "Your team maintains Dev, Test and Prod workspaces for a set of semantic models and reports. You want to promote content between the stages and switch data source connections automatically for each stage. What should you use?",
      "options": [
        "Shortcuts in each workspace that all point to the items in the Dev workspace",
        "Manual export and re-import of each item, changing the connection after every import",
        "A scheduled Copy data activity that copies the items from Dev to the Prod workspace",
        "A deployment pipeline with rules that override data sources per stage"
      ],
      "correct": 3,
      "module": 1,
      "explanation": "Deployment pipelines promote content between stages (Dev, Test, Prod), and deployment rules let you override data source connections and parameter values for each target stage. Shortcuts reference data, not report or model definitions, and a Copy data activity moves data rather than workspace items."
    },
    {
      "id": "dp600-1-025",
      "text": "A data engineer wants to share a lakehouse with a colleague but only grant access to specific tables, not all tables in the lakehouse. What should they do?",
      "options": [
        "Create a separate lakehouse for each table and share each one individually",
        "Share the lakehouse with Read permission and define OneLake security roles for specific tables",
        "Use the Admin portal to configure table-level permissions on the lakehouse for the colleague",
        "Assign the colleague the Viewer workspace role and then hide the unneeded tables from them"
      ],
      "correct": 1,
      "module": 1,
      "explanation": "Item-level sharing grants access to the lakehouse item. To further restrict which tables the user can see, OneLake security roles (RBAC within the lakehouse) can be configured to limit access to specific tables or folders. The Viewer role would expose all items in the workspace."
    },
    {
      "id": "dp600-1-026",
      "text": "What is the purpose of a schema shortcut in a lakehouse?",
      "options": [
        "It maps a whole schema of Delta tables from another lakehouse or ADLS Gen2 as local tables, moving no data",
        "It creates a new empty schema in the lakehouse for organizing tables loaded later",
        "It copies an entire schema of tables from an external database into the lakehouse as Delta tables",
        "It keeps the table schemas of two lakehouses synchronized through a recurring automatic job"
      ],
      "correct": 0,
      "module": 1,
      "explanation": "A schema shortcut maps an entire schema of Delta tables from another lakehouse location or ADLS Gen2 into the current lakehouse. All referenced tables appear as local tables within the schema, but no data is moved. This is useful for medallion architectures and cross-workspace data sharing."
    },
    {
      "id": "dp600-1-027",
      "text": "A lakehouse has been created and data is being loaded. Which statement correctly describes the difference between the Tables and Files storage areas?",
      "options": [
        "Tables and Files serve identical purposes but are stored in different OneLake locations",
        "Tables accept data in any file format, while Files only supports Parquet and Delta format data",
        "Tables are managed Delta with SQL access and schema enforcement; Files holds raw data in its native format",
        "Tables are intended for unstructured data, while Files is intended for structured tabular data"
      ],
      "correct": 2,
      "module": 1,
      "explanation": "The Tables area contains managed Delta Lake tables that provide schema enforcement, ACID transactions, and direct SQL accessibility through the SQL analytics endpoint. The Files area stores raw or semi-structured data in any format (CSV, JSON, Parquet, images) and does not enforce schema or support direct SQL queries."
    },
    {
      "id": "dp600-1-028",
      "text": "A Power BI report built on a lakehouse semantic model is experiencing slow performance. The model uses Direct Lake mode. What could be a cause?",
      "options": [
        "Direct Lake mode always requires data to be imported into the semantic model beforehand",
        "Many small Delta files in OneLake are degrading Direct Lake read performance",
        "Direct Lake mode cannot read Delta tables that were written by Spark notebook jobs",
        "The SQL analytics endpoint must be restarted before Direct Lake queries can run quickly"
      ],
      "correct": 1,
      "module": 1,
      "explanation": "In Direct Lake mode, Power BI reads Delta Parquet files directly from OneLake. A large number of small files can degrade read performance because each file requires a separate I/O operation. Running OPTIMIZE in Spark compacts small files into larger ones, improving Direct Lake query performance."
    },
    {
      "id": "dp600-1-029",
      "text": "When using the Load to Table feature in a lakehouse, which file formats are supported for no-code table creation?",
      "options": [
        "Parquet and CSV only",
        "Only Delta format files",
        "All file formats including images and documents",
        "CSV, JSON, and Parquet"
      ],
      "correct": 0,
      "module": 1,
      "explanation": "The Load to Table feature is specifically designed to support Parquet and CSV files for no-code table creation. Other formats like JSON or images cannot be loaded directly into tables using this feature and require processing through notebooks or other tools first."
    },
    {
      "id": "dp600-1-030",
      "text": "A developer needs to query Delta tables in a lakehouse using read-write T-SQL operations including INSERT, UPDATE, and DELETE. Which approach should they use?",
      "options": [
        "Use a Spark notebook with PySpark or Spark SQL",
        "Use the Visual Query Editor in the warehouse",
        "Connect to the lakehouse using SSMS with full T-SQL",
        "Use the SQL analytics endpoint of the lakehouse"
      ],
      "correct": 0,
      "module": 1,
      "explanation": "The SQL analytics endpoint is strictly read-only for T-SQL and does not support DML operations. To perform INSERT, UPDATE, or DELETE on lakehouse Delta tables, you must use Spark notebooks (PySpark, Spark SQL, or Scala). The Warehouse provides full read-write T-SQL but is a separate item type."
    },
    {
      "id": "dp600-1-031",
      "text": "What happens to Delta Lake tables in a lakehouse when multiple users write data simultaneously?",
      "options": [
        "The last writer overwrites all earlier data in the table without any conflict checks",
        "Each user is given a separate private copy of the table that is merged nightly",
        "The table is locked and all other writers are blocked until the active write completes",
        "ACID transactions keep the data consistent even with concurrent reads and writes"
      ],
      "correct": 3,
      "module": 1,
      "explanation": "Delta Lake provides ACID transaction support, which ensures data consistency even when multiple users read and write data simultaneously. This is achieved through a transaction log that tracks all changes, enabling features like concurrency control, schema enforcement, and time travel."
    },
    {
      "id": "dp600-1-032",
      "text": "You need to join sales data from a warehouse with customer data from a lakehouse in the same workspace without copying data. How should you write the query?",
      "options": [
        "Use two-part naming: schema.table",
        "Use three-part naming: database.schema.table",
        "Use four-part naming: server.database.schema.table",
        "Cross-workspace queries between warehouses and lakehouses are not supported"
      ],
      "correct": 1,
      "module": 1,
      "explanation": "Cross-database queries within the same workspace use three-part naming (database.schema.table) to join data across warehouses and lakehouses without copying. Four-part naming is for cross-workspace lakehouse queries. Both warehouses and lakehouses support this pattern within the same workspace."
    },
    {
      "id": "dp600-1-033",
      "text": "A data warehouse needs to bulk load data from CSV files stored in Azure Blob Storage. Which T-SQL command should be used?",
      "options": [
        "OPENROWSET with BULK option",
        "BULK INSERT",
        "COPY INTO",
        "INSERT...SELECT"
      ],
      "correct": 2,
      "module": 1,
      "explanation": "COPY INTO is the recommended T-SQL command for bulk loading data from external files (CSV, Parquet) in Azure storage into warehouse tables. It supports various authentication methods including SAS tokens. OPENROWSET queries files directly without loading into tables, and INSERT...SELECT moves data within the warehouse."
    },
    {
      "id": "dp600-1-034",
      "text": "A developer creates a zero-copy clone of a warehouse table for testing. How does this affect storage consumption?",
      "options": [
        "Storage use is halved because the cloned data is compressed more efficiently",
        "Storage doubles immediately because every data file is fully copied for the clone",
        "Storage is only consumed once the clone is queried for the first time by a user",
        "No extra storage is used at first; storage grows only for data changed afterwards"
      ],
      "correct": 3,
      "module": 1,
      "explanation": "Table clones are zero-copy operations that share the same underlying data files as the source table. No additional storage is consumed at creation time. Storage only increases when data is modified in either the source or clone, as new Parquet files are written for the changed data."
    },
    {
      "id": "dp600-1-035",
      "text": "A SQL analyst needs a reusable definition that joins fact and dimension tables with pre-applied filters. Users and Power BI must be able to query it like a table, and results must always reflect current data. What should they create?",
      "options": [
        "A table created with CTAS and reloaded by a nightly pipeline",
        "A stored procedure that returns the joined result set to callers who run EXEC",
        "A zero-copy clone of the joined tables refreshed each morning",
        "A view that encapsulates the join and filters over the source tables"
      ],
      "correct": 3,
      "module": 1,
      "explanation": "A view stores only the SELECT definition, so it can be queried like a table and always returns current source data. A stored procedure cannot be used in a FROM clause or as a table source, and CTAS tables and clones are snapshots that are only as fresh as their last reload."
    },
    {
      "id": "dp600-1-036",
      "text": "A Fabric data warehouse needs to upsert data (insert new rows and update existing ones) from a staging table into a dimension table. Which T-SQL statement should be used?",
      "options": [
        "UPDATE with INNER JOIN",
        "MERGE",
        "CREATE TABLE AS SELECT",
        "INSERT INTO with a WHERE NOT EXISTS subquery"
      ],
      "correct": 1,
      "module": 1,
      "explanation": "The MERGE statement performs insert, update, and delete operations in a single statement based on a source-target relationship. It is the most efficient way to handle upsert scenarios (insert new rows, update existing ones) in a Fabric data warehouse, and is a key capability not available in the lakehouse SQL analytics endpoint."
    },
    {
      "id": "dp600-1-037",
      "text": "An administrator needs to identify which queries are consuming the most resources in a data warehouse over the past week. Where should they look?",
      "options": [
        "The Monitor Hub for pipeline runs",
        "Dynamic Management Views (DMVs) for real-time data",
        "Query Insights for 30-day historical query data",
        "The Capacity Metrics App for capacity consumption"
      ],
      "correct": 2,
      "module": 1,
      "explanation": "Query Insights provides a central location for historical query data with 30 days of retention. It includes system views like queryinsights.exec_requests_history and queryinsights.long_running_queries for analyzing completed queries. DMVs show real-time active sessions but not historical data. Monitor Hub and Capacity Metrics App serve different purposes."
    },
    {
      "id": "dp600-1-038",
      "text": "Which of the following statements about foreign key constraints in Fabric Data Warehouse is correct?",
      "options": [
        "Foreign keys are not enforced by the engine; integrity must be maintained in ETL logic",
        "Foreign keys are automatically enforced in the same way as in SQL Server databases",
        "Foreign keys are enforced only for fact tables and are ignored on dimension tables",
        "Foreign keys are enforced only for rows that are written by a MERGE statement"
      ],
      "correct": 0,
      "module": 1,
      "explanation": "Fabric Data Warehouse supports primary key, foreign key and unique constraints only as NOT ENFORCED, so the engine does not check referential integrity. Integrity must be managed through ETL logic, load order and business rules, unlike traditional SQL Server."
    },
    {
      "id": "dp600-1-039",
      "text": "You have an Eventstream in Fabric that needs to add a timestamp column and filter out irrelevant events before the data reaches its destination. Where should this transformation occur?",
      "options": [
        "In a Spark notebook after the data is stored",
        "After the data lands in the KQL database using an update policy",
        "In Power Query within a Dataflow Gen2",
        "Within the Eventstream itself during stream processing"
      ],
      "correct": 3,
      "module": 1,
      "explanation": "Eventstreams can apply transformations like filtering, field management, aggregation, and enrichment as data flows through the system (in-motion). These transformations happen before data reaches its destination. Update policies are applied after data lands in a KQL database, not during streaming."
    },
    {
      "id": "dp600-1-040",
      "text": "A developer needs to analyze IoT sensor data that is streaming into a KQL database. They want to find the average temperature per sensor over the last 5 minutes. Which KQL statement is correct?",
      "options": [
        "SELECT AVG(temperature) FROM sensors WHERE timestamp > DATEADD(minute, -5, GETDATE()) GROUP BY sensor",
        "FIND avg(temperature) FROM sensors WHERE timestamp > ago(5m)",
        "sensors | where timestamp > ago(5m) | summarize avgTemp = avg(temperature) by sensor",
        "sensors | filter timestamp > 5m | aggregate avg(temperature) group by sensor"
      ],
      "correct": 2,
      "module": 1,
      "explanation": "KQL uses a pipeline-based syntax with the pipe operator. The correct query filters with 'where', then summarizes using 'summarize' with 'ago()' for time filtering. Option A uses T-SQL syntax, which is not native KQL. KQL operators are: take, where, summarize, project, and ago."
    },
    {
      "id": "dp600-1-041",
      "text": "What is the primary difference between Eventstream transformations and KQL update policies?",
      "options": [
        "Update policies can only filter incoming rows, whereas Eventstream transformations can also aggregate them",
        "There is no functional difference between them; they are two names for the same feature in Fabric",
        "Eventstream transformations happen during stream processing (in-motion); update policies happen after data lands in a KQL database",
        "Eventstream transformations always require custom code; update policies are configured with no code at all"
      ],
      "correct": 2,
      "module": 1,
      "explanation": "Eventstream transformations process and modify data as it flows through the stream (in-motion), before it reaches its destination. Update policies are automation mechanisms in KQL databases that trigger when new data is written to a table, transforming it after landing. This timing distinction is a key exam concept."
    },
    {
      "id": "dp600-1-042",
      "text": "An organization needs to automatically send an email alert when a freezer temperature exceeds 40 degrees for more than 5 minutes based on streaming IoT data. Which Fabric component should they use?",
      "options": [
        "Fabric Activator with a rule that monitors the temperature property and sends an email",
        "A scheduled Power BI report subscription that emails a temperature chart each hour",
        "A scheduled Data Factory pipeline that checks the latest temperature every five minutes",
        "A KQL materialized view with built-in email integration for threshold breaches"
      ],
      "correct": 0,
      "module": 1,
      "explanation": "Activator is the Fabric component designed for automated event-driven actions. It monitors streaming data against rules defined on Objects and their Properties. When conditions are met (temperature > 40 for 5 minutes), it can trigger notifications, Power Automate workflows, or Fabric pipelines. The four core Activator concepts are Events, Objects, Properties, and Rules."
    },
    {
      "id": "dp600-1-043",
      "text": "A data analyst needs to query a KQL database using SQL syntax because they are more familiar with T-SQL than KQL. Is this possible?",
      "options": [
        "Yes, KQL databases support a subset of T-SQL alongside native KQL",
        "Only when the report connects through Power BI DirectQuery instead of the portal",
        "Only if the data is first exported to a separate SQL Server database for querying",
        "No, KQL databases accept only Kusto Query Language and reject any T-SQL syntax"
      ],
      "correct": 0,
      "module": 1,
      "explanation": "KQL databases in Eventhouses support a subset of Transact-SQL alongside native Kusto Query Language. This allows users familiar with SQL to query data using familiar SELECT, TOP, WHERE, and GROUP BY syntax. However, KQL is the primary and most optimized language for time-series and streaming data analysis."
    },
    {
      "id": "dp600-1-044",
      "text": "What is the purpose of a materialized view in a KQL database within an Eventhouse?",
      "options": [
        "To replicate the data to another Eventhouse for disaster recovery purposes",
        "To make the data read-only so that nobody can change or delete the rows afterwards",
        "To precalculate and store summary results for faster query performance on aggregations",
        "To transform and reshape the data as it is being ingested into the table"
      ],
      "correct": 2,
      "module": 1,
      "explanation": "A materialized view in a KQL database precalculates and stores summary results (like aggregations) so that queries against the view are much faster than running the same aggregation against the raw data each time. This is one of three key management commands: update policies (transform on ingest), materialized views (precomputed summaries), and stored functions (reusable query logic)."
    },
    {
      "id": "dp600-1-045",
      "text": "A developer wants to build a Direct Lake semantic model over data that is ingested into an Eventhouse KQL database. What makes the KQL tables available to Direct Lake?",
      "options": [
        "A materialized view with Direct Lake storage mode selected in its policy settings",
        "An update policy that writes each ingested record to a lakehouse Files folder as CSV",
        "A KQL queryset that is bound to the semantic model as a Direct Lake data source",
        "OneLake availability on the KQL database, exposing its tables as Delta in OneLake"
      ],
      "correct": 3,
      "module": 1,
      "explanation": "With OneLake availability enabled, Eventhouse tables are also exposed as Delta tables in OneLake, so a Direct Lake semantic model can read them. Without it, Power BI reaches the KQL database through DirectQuery. Querysets, update policies and materialized views have no Direct Lake setting."
    },
    {
      "id": "dp600-1-046",
      "text": "Which approach follows recommended practice for improving the performance of a KQL join?",
      "options": [
        "Add hint.strategy=shuffle to every join regardless of the size of the tables",
        "Join on columns of different data types so that implicit conversion is applied",
        "Filter and project both inputs before the join, putting the smaller table on the left",
        "Join the tables first and filter afterwards so the engine can optimize the complete result"
      ],
      "correct": 2,
      "module": 1,
      "explanation": "KQL guidance is to filter and project each input before joining and to put the table with fewer rows on the left side of the join, which reduces the data the engine must process. Hints such as shuffle help only for specific high-cardinality cases, and mismatched key types add conversion cost."
    },
    {
      "id": "dp600-1-047",
      "text": "The query 'stock | take 10' fails in a KQL database although a table named Stock exists. What is the cause?",
      "options": [
        "Table names in a KQL database can only be written in uppercase letters",
        "Table names in a KQL database must be wrapped in square brackets in every query",
        "A KQL query that uses the take operator must start with a semicolon",
        "Table and column names in KQL are case-sensitive, so stock differs from Stock"
      ],
      "correct": 3,
      "module": 1,
      "explanation": "Kusto Query Language is case-sensitive for entity names such as tables, columns and functions, so stock and Stock refer to different entities. This differs from T-SQL, where identifiers are normally case-insensitive."
    },
    {
      "id": "dp600-1-048",
      "text": "An Eventhouse is designed for streaming data workloads. Which statement best describes its write model?",
      "options": [
        "It supports full transactional CRUD operations exactly like a traditional relational database",
        "It is optimized for append-only streaming and not for frequent UPDATE or DELETE operations",
        "It supports UPDATE and DELETE statements but rejects all INSERT and ingestion commands",
        "It is read-only once created and only supports reading data through KQL querysets"
      ],
      "correct": 1,
      "module": 1,
      "explanation": "Eventhouses (and their underlying KQL databases) are optimized for append-only streaming workloads. They excel at high-velocity data ingestion where new data is continuously appended. Frequent UPDATE or DELETE operations are not recommended because the storage engine is designed for time-series data where data is rarely modified after ingestion."
    },
    {
      "id": "dp600-1-049",
      "text": "A team must copy a large table from Azure SQL Database into a lakehouse table every night, with automatic retries on failure and no custom code. Which approach fits best?",
      "options": [
        "A KQL database update policy that pulls rows from the source table each night",
        "A pipeline with a Copy data activity, scheduled nightly and set to retry",
        "An Eventstream with an Azure SQL Database source and the lakehouse as destination",
        "A OneLake shortcut that points to the Azure SQL Database table and is refreshed nightly"
      ],
      "correct": 1,
      "module": 1,
      "explanation": "A Data Factory pipeline with a Copy data activity is the low-code way to move data on a schedule, and activity retry settings handle transient failures. Shortcuts cannot reference Azure SQL tables, Eventstreams handle streaming sources, and update policies only transform data already inside a KQL database."
    },
    {
      "id": "dp600-1-050",
      "text": "A data engineer needs to create a reusable KQL query that calculates running totals that can be called by multiple users. Which management command should they use?",
      "options": [
        "A materialized view",
        "An Eventstream transformation",
        "An update policy",
        "A stored function"
      ],
      "correct": 3,
      "module": 1,
      "explanation": "A stored function in KQL saves frequently used query logic that can be reused across multiple queries. Update policies transform incoming data, materialized views precompute summaries, and Eventstream transformations process streaming data. Stored functions are specifically for reusable query logic."
    }
  ];
  
  if (typeof window.__dp600 === 'undefined') {
    window.__dp600 = { modules: [], questions: [] };
  }
  
  window.__dp600.questions = window.__dp600.questions.concat(questions);
  
  if (window.__dp600.modules.length < 1) {
    window.__dp600.modules[0] = "Module 1: Microsoft Fabric & Analytics Platform";
  }
})();

