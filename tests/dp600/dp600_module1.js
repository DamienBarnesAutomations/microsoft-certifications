// Module 1: Microsoft Fabric & Analytics Platform
(function() {
  var questions = [
    {
      "id": "dp600-1-001",
      "text": "Your organization enables Microsoft Fabric. A data engineer asks whether separate storage accounts are needed for Data Engineering, Data Warehouse, and Power BI workloads. What is the correct answer?",
      "options": [
        "Each workload requires its own Azure Data Lake Storage account",
        "OneLake is a tenant-wide data lake automatically available to all Fabric workloads without separate setup",
        "Storage accounts must be provisioned manually for each workspace",
        "Only Data Engineering and Data Warehouse share storage; Power BI requires a separate account"
      ],
      "correct": 1,
      "module": 1,
      "explanation": "OneLake is the unified, tenant-wide data lake in Microsoft Fabric, automatically available to all workloads (Data Engineering, Data Warehouse, Power BI, Real-Time Intelligence, etc.) without separate storage accounts. It eliminates data silos and copying. The other options incorrectly suggest manual provisioning or workload-specific storage, which contradicts Fabric's unified architecture."
    },
    {
      "id": "dp600-1-002",
      "text": "You need to grant a new analytics team read-only access to a specific lakehouse without giving them access to other items in the workspace. What should you do?",
      "options": [
        "Assign the Viewer workspace role to the team",
        "Share the lakehouse with item-level permissions and grant Read access",
        "Assign the Contributor workspace role and hide other items",
        "Create a custom workspace role for the team"
      ],
      "correct": 1,
      "module": 1,
      "explanation": "Itemâ€‘level permissions allow granting access to a specific item (the lakehouse) without exposing other items in the workspace. The Viewer role would give read access to all items in the workspace, not just the lakehouse. Contributor would allow modifications and also applies to the whole workspace. Custom workspace roles are not supported for this granularity."
    },
    {
      "id": "dp600-1-003",
      "text": "A data analyst discovers a semantic model in the OneLake catalog. The model has a 'Certified' endorsement badge. What does this indicate?",
      "options": [
        "The model is ready for sharing within a single team",
        "An organization-authorized reviewer verified the model meets quality standards for cross-team use",
        "The model contains the single source of truth for the data it contains",
        "The model was automatically endorsed by Fabric based on usage metrics"
      ],
      "correct": 1,
      "module": 1,
      "explanation": "Certified endorsement means an authorized reviewer (e.g., governance team) has approved the semantic model as meeting quality, reliability, and business standards for organizationâ€‘wide, crossâ€‘team use. Promoted is for teamâ€‘level trust; Master data indicates a single source of truth. Certification is never automatic â€“ it requires human approval."
    },
    {
      "id": "dp600-1-004",
      "text": "You want to understand how data flows from a source lakehouse through transformations into a final report. Which Fabric feature should you use?",
      "options": [
        "The Monitor Hub activity history",
        "Data lineage view in the workspace",
        "The OneLake catalog Explore tab",
        "The Admin portal audit logs"
      ],
      "correct": 1,
      "module": 1,
      "explanation": "Data lineage view (in workspace or item details) visually shows how data moves from source through transformations (e.g., dataflows, Spark jobs) to downstream items like semantic models and reports. Monitor Hub focuses on activity runs, OneLake catalog is for discovery, and audit logs track administrative actions."
    },
    {
      "id": "dp600-1-005",
      "text": "Your team needs to discover streaming data sources that other teams have created in Fabric. Where should you navigate?",
      "options": [
        "The OneLake catalog and filter by item type",
        "The Real-Time hub Streaming data page",
        "The Admin portal Data sources section",
        "The workspace settings Integrations tab"
      ],
      "correct": 1,
      "module": 1,
      "explanation": "The Realâ€‘Time hub is the central catalog for discovering and managing streaming data sources such as eventstreams, KQL tables, and IoT data. The OneLake catalog is for batch/stored data, not streaming. Admin portal and workspace settings do not provide this discovery capability."
    },
    {
      "id": "dp600-1-006",
      "text": "A Fabric administrator needs to disable Copilot for all users except the Data Science team. Where should the administrator configure this?",
      "options": [
        "In each workspace's settings under AI features",
        "In the Admin portal Tenant settings, enabling Copilot only for the Data Science security group",
        "By removing Copilot licenses from all users except the Data Science team",
        "In the Power BI service under Capacity settings"
      ],
      "correct": 1,
      "module": 1,
      "explanation": "Tenant settings in the Admin portal allow enabling or disabling Copilot for specific security groups. This is the recommended centralized control. Workspace settings only affect that workspace, licenses are not granular enough, and capacity settings do not control userâ€‘level Copilot access."
    },
    {
      "id": "dp600-1-007",
      "text": "Fabric IQ is described as a workload for organizing business vocabulary. Which of the following is NOT one of the three IQ workloads Microsoft provides?",
      "options": [
        "Fabric IQ",
        "Foundry IQ",
        "Work IQ",
        "Data IQ"
      ],
      "correct": 3,
      "module": 1,
      "explanation": "The three IQ workloads are Fabric IQ (business ontologies), Foundry IQ (enterprise knowledge), and Work IQ (collaboration signals). 'Data IQ' is not a Microsoftâ€‘provided IQ workload; it is a distractor."
    },
    {
      "id": "dp600-1-008",
      "text": "A user asks a data agent a natural language question about sales data. The data agent translates the question into a SQL query against a lakehouse. What is this process called?",
      "options": [
        "Direct Lake querying",
        "Natural language to SQL (NL2SQL) translation",
        "DAX query generation",
        "KQL query compilation"
      ],
      "correct": 1,
      "module": 1,
      "explanation": "The process of converting a natural language question into a structured SQL query is known as NL2SQL (Natural Language to SQL). Direct Lake is a storage mode, DAX is for semantic models, and KQL is for eventhouses."
    },
    {
      "id": "dp600-1-009",
      "text": "You need to connect to data in another workspace's lakehouse without copying it. You create a shortcut in your lakehouse that references their tables. What does the shortcut do?",
      "options": [
        "Copies the data into your OneLake storage",
        "Creates a reference that makes external data appear as a local folder without duplication",
        "Moves the data to your workspace and deletes it from the source",
        "Creates a scheduled sync that refreshes a local copy every hour"
      ],
      "correct": 1,
      "module": 1,
      "explanation": "A shortcut is a reference (like a symbolic link) that makes data from another location (internal or external) appear as a local folder or table in OneLake. No data is copied or moved â€“ it stays in the source location. Shortcuts avoid duplication and maintain a single source of truth."
    },
    {
      "id": "dp600-1-010",
      "text": "Which of the following workspace roles can manage permissions for items in the workspace?",
      "options": [
        "Contributor and Viewer",
        "Admin and Member",
        "Member and Contributor",
        "Viewer and Admin"
      ],
      "correct": 1,
      "module": 1,
      "explanation": "Workspace Admins and Members can manage permissions for items (sharing, role assignment). Contributor can create and modify content but cannot manage permissions. Viewer can only view content and cannot manage any permissions."
    },
    {
      "id": "dp600-1-011",
      "text": "A Fabric workspace contains lakehouses, warehouses, and semantic models. The workspace is assigned to a domain. What does domain assignment affect?",
      "options": [
        "It changes which users can see items in the workspace",
        "It organizes governance policies and grouping but does not change item-level access control",
        "It replaces the need for workspace roles",
        "It restricts which Fabric workloads can be used in the workspace"
      ],
      "correct": 1,
      "module": 1,
      "explanation": "Domains provide logical grouping of workspaces for governance (e.g., applying policies, ownership) and discovery. They do not alter access control â€“ workspace roles and item permissions continue to apply independently. Domains do not replace roles or restrict workloads."
    },
    {
      "id": "dp600-1-012",
      "text": "You are exploring the OneLake catalog to find a suitable semantic model for a report. You notice one model has a 'Master data' endorsement. What does this designation mean?",
      "options": [
        "The model is ready for team-level sharing",
        "The model is the authoritative source of truth for core organizational data like customer lists or product codes",
        "The model has been approved by Copilot for AI consumption",
        "The model contains the most frequently accessed data in the organization"
      ],
      "correct": 1,
      "module": 1,
      "explanation": "Master data endorsement indicates that the item (lakehouse or semantic model) is the authoritative, organizationâ€‘wide source of truth for critical business entities such as customer, product, or employee data. It is a higher level than Certified and applies only to data items."
    },
    {
      "id": "dp600-1-013",
      "text": "You create a lakehouse and notice that a dbo schema was created automatically. What is the benefit of organizing tables into schemas?",
      "options": [
        "Schemas prevent data duplication across lakehouses",
        "Schemas enable schema-level permissions and cross-workspace queries using four-part namespace",
        "Schemas are required for Copilot to function",
        "Schemas automatically apply row-level security to all tables"
      ],
      "correct": 1,
      "module": 1,
      "explanation": "Schemas (like dbo) allow logical grouping of tables and enable schemaâ€‘level security (GRANT SELECT on a schema) and crossâ€‘workspace queries using fourâ€‘part naming: workspace.lakehouse.schema.table. They do not prevent duplication, are not required for Copilot, and do not automatically apply RLS."
    },
    {
      "id": "dp600-1-014",
      "text": "A data engineer wants to verify the schema and data of a lakehouse table before creating a shortcut. Which tool should they use?",
      "options": [
        "The lakehouse explorer Files view",
        "The SQL analytics endpoint to run T-SQL preview queries",
        "The Monitor Hub activity details",
        "The Real-Time hub streaming data page"
      ],
      "correct": 1,
      "module": 1,
      "explanation": "The SQL analytics endpoint of a lakehouse provides readâ€‘only Tâ€‘SQL access to Delta tables. You can run SELECT queries (e.g., SELECT TOP 100 *) to preview data and verify the schema. Files view shows raw files, not table schema. Monitor Hub and Realâ€‘Time hub are not for schema inspection."
    },
    {
      "id": "dp600-1-015",
      "text": "Which of the following roles can enable Fabric for an organization in the Admin portal?",
      "options": [
        "Fabric administrator, Power Platform administrator, or Global administrator",
        "Only the Fabric administrator",
        "Any workspace Admin",
        "Only the Global administrator"
      ],
      "correct": 0,
      "module": 1,
      "explanation": "Enabling Microsoft Fabric for the tenant requires one of these highâ€‘privilege roles: Fabric Administrator, Power Platform Administrator, or Global Administrator (Entra ID). Workspace Admins have no tenantâ€‘wide authority."
    },
    {
      "id": "dp600-1-016",
      "text": "A data scientist needs to build and train ML models using data stored in OneLake. Which Fabric workload and tools are most appropriate?",
      "options": [
        "Data Warehouse with T-SQL queries",
        "Data Science workload using notebooks with Python and Spark",
        "Real-Time Intelligence with KQL querysets",
        "Data Factory with Copy Data activity"
      ],
      "correct": 1,
      "module": 1,
      "explanation": "The Data Science workload provides notebooks with Python and Spark support for building and testing ML models. Data scientists can store and access data in lakehouses and integrate with Azure Machine Learning. The other options lack the iterative, code-based environment needed for ML model development."
    },
    {
      "id": "dp600-1-017",
      "text": "Your organization wants to adopt a medallion architecture with bronze, silver, and gold layers. How can this be implemented in Fabric lakehouses?",
      "options": [
        "Create three separate Fabric capacities, one per layer",
        "Use three separate lakehouses with shortcuts between them to separate raw, enriched, and curated data",
        "Store all layers in a single lakehouse using the Tables folder only",
        "Use the Warehouse for bronze and the Lakehouse for silver and gold"
      ],
      "correct": 1,
      "module": 1,
      "explanation": "A medallion architecture can be implemented using shortcuts between lakehouses. For example, a bronze lakehouse holds raw data, a silver lakehouse uses shortcuts to reference bronze data and adds transformations, and a gold lakehouse shortcuts from silver for curated datasets. This separation of layers without data duplication is a key Fabric pattern."
    },
    {
      "id": "dp600-1-018",
      "text": "You need to ingest data from a SQL Server database into OneLake with continuous replication as source data changes. Which ingestion method should you use?",
      "options": [
        "Direct upload via the Fabric interface",
        "Mirroring from Azure SQL Database or SQL Server",
        "A one-time COPY INTO command",
        "A scheduled Dataflow Gen2 refresh"
      ],
      "correct": 1,
      "module": 1,
      "explanation": "Mirroring continuously replicates data from external databases like SQL Server, Azure SQL Database, Cosmos DB, or Snowflake into OneLake. When source data changes, OneLake reflects those changes automatically. Direct upload, COPY INTO, and scheduled dataflows are batch-oriented and do not provide continuous replication."
    },
    {
      "id": "dp600-1-019",
      "text": "A cloud administrator wants to enable Fabric for the entire organization. Which roles have the authority to do this?",
      "options": [
        "Only the Global Administrator",
        "Fabric Administrator, Power Platform Administrator, or Global Administrator",
        "Any workspace Admin within Fabric",
        "Only the Fabric Administrator"
      ],
      "correct": 1,
      "module": 1,
      "explanation": "Enabling Fabric requires tenant-level administrative privileges: Fabric Administrator, Power Platform Administrator, or Global Administrator (Entra ID). Workspace Admins have no tenant-wide authority to enable Fabric. This is configured in the Admin portal > Tenant settings."
    },
    {
      "id": "dp600-1-020",
      "text": "A user creates a shortcut to reference data in an Amazon S3 bucket. What happens to the underlying data?",
      "options": [
        "It is copied to OneLake and stored in Delta format",
        "It remains in Amazon S3 and is accessed in-place through the shortcut reference",
        "It is moved to OneLake and deleted from S3",
        "It is cached in OneLake for 24 hours then removed"
      ],
      "correct": 1,
      "module": 1,
      "explanation": "Shortcuts create a reference that allows data to be accessed as if it were stored locally, but the data remains in the original location (Amazon S3 in this case). No data is copied or moved. This maintains data consistency and reduces storage costs. Shortcuts support external sources like ADLS Gen2, Amazon S3, and Dataverse."
    },
    {
      "id": "dp600-1-021",
      "text": "An analyst finds a semantic model in the OneLake catalog with a 'Promoted' endorsement. What does this mean?",
      "options": [
        "The model has been certified by the organization's governance team",
        "A user with write permissions determined the model is ready for sharing within their team",
        "The model is the authoritative source of truth for the organization",
        "The model was automatically promoted based on usage frequency"
      ],
      "correct": 1,
      "module": 1,
      "explanation": "Promoted endorsement means any user with write permissions has determined the item is ready for broader sharing, typically within a team or project. Certified requires authorized reviewers; Master data is the authoritative source of truth. Promotion is a user-driven action, not automatic."
    },
    {
      "id": "dp600-1-022",
      "text": "A team needs a point-in-time snapshot of data from another workspace's lakehouse for compliance auditing. Which approach should they use?",
      "options": [
        "Create a shortcut to the source lakehouse tables",
        "Copy the data into their own lakehouse tables at a specific time to preserve the snapshot",
        "Use the Real-Time hub to capture the data",
        "Create a cross-workspace query with four-part naming"
      ],
      "correct": 1,
      "module": 1,
      "explanation": "Shortcuts always reflect the current state of source data and are not suitable for point-in-time snapshots or compliance requirements that need physically separate copies. When a stable snapshot is needed, data should be copied at a specific point in time. Cross-workspace queries also reflect live data."
    },
    {
      "id": "dp600-1-023",
      "text": "Which of the following correctly describes the relationship between data mesh architecture and Fabric domains?",
      "options": [
        "Domains replace workspace roles, making all data accessible to all users",
        "Domains allow decentralized data ownership with centralized governance by grouping workspaces",
        "Domains restrict which Fabric workloads can be used within a workspace",
        "Domains automatically replicate data across all workspaces in the domain"
      ],
      "correct": 1,
      "module": 1,
      "explanation": "Fabric supports a data mesh architecture where domains group workspaces by business area (e.g., Sales, Marketing). This enables decentralized data ownership while maintaining centralized governance through the Admin portal and OneLake catalog. Domains do not replace roles, restrict workloads, or replicate data."
    },
    {
      "id": "dp600-1-024",
      "text": "A report developer needs to find streaming data about IoT sensor readings that another team is already ingesting. Where should they look?",
      "options": [
        "OneLake catalog > filter by item type = lakehouse",
        "Real-Time hub > Streaming data page to browse eventstreams and KQL tables",
        "Admin portal > Monitor usage reports",
        "Workspace settings > External data sources"
      ],
      "correct": 1,
      "module": 1,
      "explanation": "The Real-Time hub is the centralized catalog for discovering streaming data sources, including eventstreams and KQL tables. While the OneLake catalog is for batch/stored data, the Real-Time hub shows data in motion. You can browse by workspace, filter by source type, and search for specific streams."
    },
    {
      "id": "dp600-1-025",
      "text": "A data engineer wants to share a lakehouse with a colleague but only grant access to specific tables, not all tables in the lakehouse. What should they do?",
      "options": [
        "Assign the colleague the Viewer workspace role",
        "Use item-level sharing with Read permission plus OneLake security roles to restrict table access",
        "Create a separate lakehouse for each table",
        "Use the Admin portal to configure table-level permissions"
      ],
      "correct": 1,
      "module": 1,
      "explanation": "Item-level sharing grants access to the lakehouse item. To further restrict which tables the user can see, OneLake security roles (RBAC within the lakehouse) can be configured to limit access to specific tables or folders. The Viewer role would expose all items in the workspace."
    },
    {
      "id": "dp600-1-026",
      "text": "What is the purpose of a schema shortcut in a lakehouse?",
      "options": [
        "It copies an entire schema of tables into the lakehouse from an external database",
        "It maps an entire schema of Delta tables from another lakehouse or ADLS Gen2, making them appear as local tables without data movement",
        "It creates a new empty schema for organizing tables",
        "It synchronizes table schemas between two lakehouses automatically"
      ],
      "correct": 1,
      "module": 1,
      "explanation": "A schema shortcut maps an entire schema of Delta tables from another lakehouse location or ADLS Gen2 into the current lakehouse. All referenced tables appear as local tables within the schema, but no data is moved. This is useful for medallion architectures and cross-workspace data sharing."
    },
    {
      "id": "dp600-1-027",
      "text": "A lakehouse has been created and data is being loaded. Which statement correctly describes the difference between the Tables and Files storage areas?",
      "options": [
        "Tables support any file format; Files only support Parquet",
        "Tables are Delta-formatted with SQL accessibility and schema enforcement; Files store raw data in native format without direct SQL access",
        "Tables are for unstructured data; Files are for structured data",
        "Tables and Files serve identical purposes but use different storage locations"
      ],
      "correct": 1,
      "module": 1,
      "explanation": "The Tables area contains managed Delta Lake tables that provide schema enforcement, ACID transactions, and direct SQL accessibility through the SQL analytics endpoint. The Files area stores raw or semi-structured data in any format (CSV, JSON, Parquet, images) and does not enforce schema or support direct SQL queries."
    },
    {
      "id": "dp600-1-028",
      "text": "A Power BI report built on a lakehouse semantic model is experiencing slow performance. The model uses Direct Lake mode. What could be a cause?",
      "options": [
        "Direct Lake mode always requires data to be imported into Power BI first",
        "A large number of small Delta files in OneLake is degrading Direct Lake read performance",
        "Direct Lake mode does not support Delta format files",
        "The SQL analytics endpoint must be restarted"
      ],
      "correct": 1,
      "module": 1,
      "explanation": "In Direct Lake mode, Power BI reads Delta Parquet files directly from OneLake. A large number of small files can degrade read performance because each file requires a separate I/O operation. Running OPTIMIZE in Spark compacts small files into larger ones, improving Direct Lake query performance."
    },
    {
      "id": "dp600-1-029",
      "text": "When using the Load to Table feature in a lakehouse, which file formats are supported for no-code table creation?",
      "options": [
        "CSV, JSON, and Parquet",
        "Parquet and CSV only",
        "All file formats including images and documents",
        "Only Delta format files"
      ],
      "correct": 1,
      "module": 1,
      "explanation": "The Load to Table feature is specifically designed to support Parquet and CSV files for no-code table creation. Other formats like JSON or images cannot be loaded directly into tables using this feature and require processing through notebooks or other tools first."
    },
    {
      "id": "dp600-1-030",
      "text": "A developer needs to query Delta tables in a lakehouse using read-write T-SQL operations including INSERT, UPDATE, and DELETE. Which approach should they use?",
      "options": [
        "Use the SQL analytics endpoint of the lakehouse",
        "Use a Spark notebook with PySpark or Spark SQL",
        "Connect to the lakehouse using SSMS with full T-SQL",
        "Use the Visual Query Editor in the warehouse"
      ],
      "correct": 1,
      "module": 1,
      "explanation": "The SQL analytics endpoint is strictly read-only for T-SQL and does not support DML operations. To perform INSERT, UPDATE, or DELETE on lakehouse Delta tables, you must use Spark notebooks (PySpark, Spark SQL, or Scala). The Warehouse provides full read-write T-SQL but is a separate item type."
    },
    {
      "id": "dp600-1-031",
      "text": "What happens to Delta Lake tables in a lakehouse when multiple users write data simultaneously?",
      "options": [
        "The last write overwrites all previous data",
        "ACID transactions ensure data consistency even with concurrent reads and writes",
        "Each user gets a separate copy of the table",
        "The table becomes locked until all writes complete"
      ],
      "correct": 1,
      "module": 1,
      "explanation": "Delta Lake provides ACID transaction support, which ensures data consistency even when multiple users read and write data simultaneously. This is achieved through a transaction log that tracks all changes, enabling features like concurrency control, schema enforcement, and time travel."
    },
    {
      "id": "dp600-1-032",
      "text": "You need to join sales data from a warehouse with customer data from a lakehouse in the same workspace without copying data. How should you write the query?",
      "options": [
        "Use four-part naming: server.database.schema.table",
        "Use three-part naming: database.schema.table",
        "Use two-part naming: schema.table",
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
        "BULK INSERT",
        "COPY INTO",
        "INSERT...SELECT",
        "OPENROWSET with BULK option"
      ],
      "correct": 1,
      "module": 1,
      "explanation": "COPY INTO is the recommended T-SQL command for bulk loading data from external files (CSV, Parquet) in Azure storage into warehouse tables. It supports various authentication methods including SAS tokens. OPENROWSET queries files directly without loading into tables, and INSERT...SELECT moves data within the warehouse."
    },
    {
      "id": "dp600-1-034",
      "text": "A developer creates a zero-copy clone of a warehouse table for testing. How does this affect storage consumption?",
      "options": [
        "Storage doubles immediately because the data is fully copied",
        "No additional storage is consumed initially; storage only grows for data changes in the clone",
        "Storage consumption is halved because data is compressed",
        "Storage is consumed only when the clone is first queried"
      ],
      "correct": 1,
      "module": 1,
      "explanation": "Table clones are zero-copy operations that share the same underlying data files as the source table. No additional storage is consumed at creation time. Storage only increases when data is modified in either the source or clone, as new Parquet files are written for the changed data."
    },
    {
      "id": "dp600-1-035",
      "text": "A SQL analyst needs to provide a reusable query that joins fact and dimension tables with pre-applied filters, and the result must always show current data. Should they use a view or a stored procedure?",
      "options": [
        "A stored procedure, because it can accept parameters",
        "A view, because it always reflects the current source data and requires no execution parameters",
        "Either one, they work identically for this scenario",
        "A materialized view, because it stores precomputed results"
      ],
      "correct": 1,
      "module": 1,
      "explanation": "A view is a saved SELECT query that always reflects current source data with no storage cost. It is ideal for standardizing access patterns like joining fact/dimension tables with filters. Stored procedures support write operations and parameters but are not needed when the goal is read-only, always-fresh data access."
    },
    {
      "id": "dp600-1-036",
      "text": "A Fabric data warehouse needs to upsert data (insert new rows and update existing ones) from a staging table into a dimension table. Which T-SQL statement should be used?",
      "options": [
        "INSERT INTO with a WHERE NOT EXISTS subquery",
        "MERGE",
        "UPDATE with INNER JOIN",
        "CREATE TABLE AS SELECT"
      ],
      "correct": 1,
      "module": 1,
      "explanation": "The MERGE statement performs insert, update, and delete operations in a single statement based on a source-target relationship. It is the most efficient way to handle upsert scenarios (insert new rows, update existing ones) in a Fabric data warehouse, and is a key capability not available in the lakehouse SQL analytics endpoint."
    },
    {
      "id": "dp600-1-037",
      "text": "An administrator needs to identify which queries are consuming the most resources in a data warehouse over the past week. Where should they look?",
      "options": [
        "Dynamic Management Views (DMVs) for real-time data",
        "Query Insights for 30-day historical query data",
        "The Monitor Hub for pipeline runs",
        "The Capacity Metrics App for capacity consumption"
      ],
      "correct": 1,
      "module": 1,
      "explanation": "Query Insights provides a central location for historical query data with 30 days of retention. It includes system views like queryinsights.exec_requests_history and queryinsights.long_running_queries for analyzing completed queries. DMVs show real-time active sessions but not historical data. Monitor Hub and Capacity Metrics App serve different purposes."
    },
    {
      "id": "dp600-1-038",
      "text": "Which of the following statements about foreign key constraints in Fabric Data Warehouse is correct?",
      "options": [
        "Foreign keys are automatically enforced like SQL Server",
        "Fabric does not enforce foreign key constraints at the engine level; integrity must be maintained in the ETL logic",
        "Foreign keys are enforced only for fact tables, not dimension tables",
        "Foreign key constraints are enforced only when using MERGE statements"
      ],
      "correct": 1,
      "module": 1,
      "explanation": "Fabric Data Warehouse does not enforce referential integrity via foreign key constraints at the engine level. This means you can insert data that violates referential rules. Data integrity must be managed through your ETL logic, loading order, and business rules. This is a key difference from traditional SQL Server databases."
    },
    {
      "id": "dp600-1-039",
      "text": "You have an Eventstream in Fabric that needs to add a timestamp column and filter out irrelevant events before the data reaches its destination. Where should this transformation occur?",
      "options": [
        "After the data lands in the KQL database using an update policy",
        "Within the Eventstream itself during stream processing",
        "In a Spark notebook after the data is stored",
        "In Power Query within a Dataflow Gen2"
      ],
      "correct": 1,
      "module": 1,
      "explanation": "Eventstreams can apply transformations like filtering, field management, aggregation, and enrichment as data flows through the system (in-motion). These transformations happen before data reaches its destination. Update policies are applied after data lands in a KQL database, not during streaming."
    },
    {
      "id": "dp600-1-040",
      "text": "A developer needs to analyze IoT sensor data that is streaming into a KQL database. They want to find the average temperature per sensor over the last 5 minutes. Which KQL statement is correct?",
      "options": [
        "SELECT AVG(temperature) FROM sensors WHERE timestamp > DATEADD(minute, -5, GETDATE()) GROUP BY sensor",
        "sensors | where timestamp > ago(5m) | summarize avgTemp = avg(temperature) by sensor",
        "sensors | filter timestamp > 5m | aggregate avg(temperature) group by sensor",
        "FIND avg(temperature) FROM sensors WHERE timestamp > ago(5m)"
      ],
      "correct": 1,
      "module": 1,
      "explanation": "KQL uses a pipeline-based syntax with the pipe operator. The correct query filters with 'where', then summarizes using 'summarize' with 'ago()' for time filtering. Option A uses T-SQL syntax, which is not native KQL. KQL operators are: take, where, summarize, project, and ago."
    },
    {
      "id": "dp600-1-041",
      "text": "What is the primary difference between Eventstream transformations and KQL update policies?",
      "options": [
        "Eventstream transformations require coding; update policies are no-code",
        "Eventstream transformations happen during stream processing (in-motion); update policies happen after data lands in a KQL database",
        "Update policies can only filter data; Eventstream transformations can aggregate",
        "There is no functional difference; they are two names for the same feature"
      ],
      "correct": 1,
      "module": 1,
      "explanation": "Eventstream transformations process and modify data as it flows through the stream (in-motion), before it reaches its destination. Update policies are automation mechanisms in KQL databases that trigger when new data is written to a table, transforming it after landing. This timing distinction is a key exam concept."
    },
    {
      "id": "dp600-1-042",
      "text": "An organization needs to automatically send an email alert when a freezer temperature exceeds 40 degrees for more than 5 minutes based on streaming IoT data. Which Fabric component should they use?",
      "options": [
        "A scheduled Data Factory pipeline",
        "Fabric Activator with a rule that monitors the temperature property and triggers an action",
        "A Power BI alert on a Real-Time Dashboard",
        "A KQL materialized view with email integration"
      ],
      "correct": 1,
      "module": 1,
      "explanation": "Activator is the Fabric component designed for automated event-driven actions. It monitors streaming data against rules defined on Objects and their Properties. When conditions are met (temperature > 40 for 5 minutes), it can trigger notifications, Power Automate workflows, or Fabric pipelines. The four core Activator concepts are Events, Objects, Properties, and Rules."
    },
    {
      "id": "dp600-1-043",
      "text": "A data analyst needs to query a KQL database using SQL syntax because they are more familiar with T-SQL than KQL. Is this possible?",
      "options": [
        "No, KQL databases only support Kusto Query Language",
        "Yes, KQL databases support a subset of T-SQL alongside native KQL queries",
        "Only if the data is first exported to a SQL Server database",
        "Only when using Power BI DirectQuery mode"
      ],
      "correct": 1,
      "module": 1,
      "explanation": "KQL databases in Eventhouses support a subset of Transact-SQL alongside native Kusto Query Language. This allows users familiar with SQL to query data using familiar SELECT, TOP, WHERE, and GROUP BY syntax. However, KQL is the primary and most optimized language for time-series and streaming data analysis."
    },
    {
      "id": "dp600-1-044",
      "text": "What is the purpose of a materialized view in a KQL database within an Eventhouse?",
      "options": [
        "To make the data read-only",
        "To precalculate and store summary results for faster query performance on aggregations",
        "To replicate data to another Eventhouse",
        "To transform data as it is ingested"
      ],
      "correct": 1,
      "module": 1,
      "explanation": "A materialized view in a KQL database precalculates and stores summary results (like aggregations) so that queries against the view are much faster than running the same aggregation against the raw data each time. This is one of three key management commands: update policies (transform on ingest), materialized views (precomputed summaries), and stored functions (reusable query logic)."
    },
    {
      "id": "dp600-1-045",
      "text": "A developer creates a Power BI report connected to an Eventhouse. Which connectivity mode does Power BI use by default for Eventhouses?",
      "options": [
        "Direct Lake mode reading Delta files from OneLake",
        "DirectQuery mode connecting to the KQL database",
        "Import mode with scheduled refresh",
        "Composite mode with dual storage"
      ],
      "correct": 1,
      "module": 1,
      "explanation": "Power BI connects to Eventhouses via DirectQuery, not Direct Lake. DirectQuery sends queries to the KQL database engine at query time, which is appropriate for real-time streaming data. Direct Lake is used for lakehouses and warehouses where data is stored in Delta Parquet format in OneLake."
    },
    {
      "id": "dp600-1-046",
      "text": "A KQL query is performing a join between two tables. Which table should be placed first in the join to optimize performance?",
      "options": [
        "The larger table should be first",
        "The smaller table should be first",
        "Table order does not affect KQL join performance",
        "The table with more columns should be first"
      ],
      "correct": 1,
      "module": 1,
      "explanation": "In KQL, join performance is optimized when the smaller table is placed first (the left side of the join). The query engine uses the first table as the primary input, so a smaller first table reduces memory and processing requirements. This is a key KQL optimization technique."
    },
    {
      "id": "dp600-1-047",
      "text": "Which of the following is true about KQL case sensitivity?",
      "options": [
        "KQL is case-insensitive for all identifiers",
        "KQL is strictly case-sensitive for all identifiers including table names, column names, and operators",
        "KQL is case-sensitive only for string comparisons, not identifiers",
        "KQL case sensitivity is configurable at the database level"
      ],
      "correct": 1,
      "module": 1,
      "explanation": "Kusto Query Language is strictly case-sensitive for all identifiers, including table names, column names, function names, and operators. For example, 'Stock' and 'stock' refer to different tables. This is a key difference from T-SQL and a common source of errors for users transitioning from SQL to KQL."
    },
    {
      "id": "dp600-1-048",
      "text": "An Eventhouse is designed for streaming data workloads. Which statement best describes its write model?",
      "options": [
        "It supports full transactional CRUD operations like a traditional database",
        "It is optimized for append-only streaming and is not intended for frequent UPDATE or DELETE operations",
        "It supports UPDATE and DELETE but not INSERT",
        "It only supports reading data, not writing"
      ],
      "correct": 1,
      "module": 1,
      "explanation": "Eventhouses (and their underlying KQL databases) are optimized for append-only streaming workloads. They excel at high-velocity data ingestion where new data is continuously appended. Frequent UPDATE or DELETE operations are not recommended because the storage engine is designed for time-series data where data is rarely modified after ingestion."
    },
    {
      "id": "dp600-1-049",
      "text": "What is the correct order of the four core concepts that Activator uses to define automated responses?",
      "options": [
        "Rules, Properties, Objects, Events",
        "Events, Objects, Properties, Rules",
        "Objects, Events, Rules, Properties",
        "Properties, Rules, Events, Objects"
      ],
      "correct": 1,
      "module": 1,
      "explanation": "Activator operates on four core concepts in this order: Events (each record in a data stream), Objects (business entities like a sensor or sales order), Properties (fields mapped to object state, e.g., temperature), and Rules (conditions that trigger actions when property values cross thresholds). Understanding this flow is essential for configuring Activator correctly."
    },
    {
      "id": "dp600-1-050",
      "text": "A data engineer needs to create a reusable KQL query that calculates running totals that can be called by multiple users. Which management command should they use?",
      "options": [
        "An update policy",
        "A materialized view",
        "A stored function",
        "An Eventstream transformation"
      ],
      "correct": 2,
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

