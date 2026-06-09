var MODULE4_CARDS = [
  {
    id: "m4-c1",
    type: "term",
    topic: "Warehouse vs SQL Analytics Endpoint",
    front: "What DDL and DML operations are allowed in a Fabric Warehouse?",
    back: "Full DDL (CREATE, ALTER, DROP) and full DML (INSERT, UPDATE, DELETE, MERGE) are supported. Warehouses provide ACID transactions via T-SQL and support cross-database three-part naming (Database.Schema.Table) within the same workspace."
  },
  {
    id: "m4-c2",
    type: "term",
    topic: "Warehouse vs SQL Analytics Endpoint",
    front: "What is the SQL Analytics Endpoint and how is it created?",
    back: "The SQL Analytics Endpoint is a read-only T-SQL interface that is <b>auto-created</b> when you create a Lakehouse. It cannot be created independently and does not support DDL or DML operations."
  },
  {
    id: "m4-c3",
    type: "compare",
    topic: "Warehouse vs SQL Analytics Endpoint",
    front: "Compare Fabric Warehouse and SQL Analytics Endpoint.",
    back: "<table><tr><td><b>Feature</b></td><td><b>Warehouse</b></td><td><b>SQL Analytics Endpoint</b></td></tr><tr><td>DDL/DML</td><td>Full support</td><td>Read-only</td></tr><tr><td>ACID</td><td>Yes</td><td>No</td></tr><tr><td>MERGE</td><td>Supported</td><td>Not supported</td></tr><tr><td>Cross-db 3-part naming</td><td>Within workspace</td><td>No</td></tr><tr><td>Creation</td><td>Explicitly created</td><td>Auto-created with Lakehouse</td></tr></table>"
  },
  {
    id: "m4-c4",
    type: "scenario",
    topic: "Warehouse vs SQL Analytics Endpoint",
    front: "You need to load and transform data from multiple sources into a central repository with full ACID guarantees, then run MERGE operations for upserts. Should you use a Warehouse or a SQL Analytics Endpoint?",
    back: "Use a <b>Warehouse</b>. The SQL Analytics Endpoint is read-only and does not support DDL, DML, MERGE, or ACID transactions. A Warehouse is required when you need to write data, run transformations, or enforce transactional consistency."
  },
  {
    id: "m4-c5",
    type: "edge",
    topic: "Warehouse vs SQL Analytics Endpoint",
    front: "You need to query tables from a Warehouse and a Lakehouse in the same query. Is this possible?",
    back: "Yes, if both are in the <b>same workspace</b>. Warehouses support cross-database three-part naming (Database.Schema.Table) within the same workspace. However, cross-workspace queries are <b>not supported</b> in either Warehouse or SQL Analytics Endpoint."
  },
  {
    id: "m4-c6",
    type: "term",
    topic: "Dimensional Modeling",
    front: "What are the characteristics of a fact table in dimensional modeling?",
    back: "Fact tables contain <b>measures</b> (numeric, quantifiable data) and <b>foreign keys</b> referencing dimension tables. Measures can be <b>additive</b> (summable across all dimensions), <b>semi-additive</b> (summable across some dimensions, e.g. account balances across time), or <b>non-additive</b> (cannot be summed, e.g. ratios)."
  },
  {
    id: "m4-c7",
    type: "term",
    topic: "Dimensional Modeling",
    front: "What are dimension tables and what keys do they contain?",
    back: "Dimension tables provide descriptive context for facts. They contain a <b>surrogate key</b> (artificial, system-generated unique identifier, typically an identity column) and an <b>alternate key</b> (natural/business key from the source system, e.g. ProductCode or CustomerID)."
  },
  {
    id: "m4-c8",
    type: "compare",
    topic: "Dimensional Modeling",
    front: "Compare star schema and snowflake schema.",
    back: "<b>Star schema:</b> Dimension tables are denormalized (all attributes in a single table). Simplest to query, fewer joins, best query performance.<br><br><b>Snowflake schema:</b> Dimension tables are normalized into sub-dimensions. Saves storage, but requires more joins and typically reduces query performance. In Fabric, star schema is preferred for most workloads."
  },
  {
    id: "m4-c9",
    type: "term",
    topic: "Dimensional Modeling",
    front: "What is SCD Type 2 and what columns are typically used to implement it?",
    back: "SCD (Slowly Changing Dimension) Type 2 tracks historical changes by creating a new row for each change. Typical columns include:<br><code>EffectiveDate</code> (start date)<br><code>ExpiryDate</code> (end date, NULL for current)<br><code>IsCurrent</code> (1/0 flag for current row)<br><code>SurrogateKey</code> (unique per row)<br><code>NaturalKey</code> (same for all versions of an entity)"
  },
  {
    id: "m4-c10",
    type: "term",
    topic: "Dimensional Modeling",
    front: "What do SCD Types 0 through 6 cover in dimensional modeling?",
    back: "<b>Type 0:</b> Fixed (no changes)<br><b>Type 1:</b> Overwrite (no history)<br><b>Type 2:</b> Row versioning (full history, effective/expiry dates)<br><b>Type 3:</b> Add alternate attribute column (limited history)<br><b>Type 4:</b> Mini-dimension (frequently changing attributes)<br><b>Type 5, 6:</b> Hybrid approaches combining Type 1, 2, and/or 3"
  },
  {
    id: "m4-c11",
    type: "term",
    topic: "Dimensional Modeling",
    front: "What is a time dimension and why is it important?",
    back: "A time dimension is a standard dimension table with attributes like Year, Quarter, Month, Week, Day, DayOfWeek, FiscalPeriod, etc. It is critical because nearly all fact tables have a date foreign key, enabling time-based analysis, period-over-period comparisons, and date range filtering."
  },
  {
    id: "m4-c12",
    type: "term",
    topic: "Dimensional Modeling",
    front: "What is the purpose of staging tables in data warehouse loading?",
    back: "Staging tables are intermediate tables used to <b>land raw source data</b> before transformation. They are typically truncated and reloaded (full load) and help isolate the warehouse from source system volatility. Staging tables can be hidden from end users in the semantic model."
  },
  {
    id: "m4-c13",
    type: "term",
    topic: "Dimensional Modeling",
    front: "What is <code>APPROX_COUNT_DISTINCT</code> and how does it work?",
    back: "<code>APPROX_COUNT_DISTINCT</code> approximates the number of distinct non-null values using the <b>HyperLogLog</b> algorithm. It returns results with approximately <b>2% error</b> but uses far less memory and is much faster than <code>COUNT(DISTINCT ...)</code> on large datasets. Ideal for high-cardinality columns where exact counts are not critical."
  },
  {
    id: "m4-c14",
    type: "term",
    topic: "Dimensional Modeling",
    front: "Explain additive, semi-additive, and non-additive measures with examples.",
    back: "<b>Additive:</b> Summable across all dimensions (e.g. SalesAmount, Quantity)<br><b>Semi-additive:</b> Summable across some dimensions but not all (e.g. AccountBalance &mdash; summable across customers but not across time; last value is meaningful)<br><b>Non-additive:</b> Cannot be summed at all (e.g. ProfitMargin, Percentage, UnitPrice &mdash; averaging might be appropriate)"
  },
  {
    id: "m4-c15",
    type: "scenario",
    topic: "Dimensional Modeling",
    front: "A Customer dimension tracks customer attributes like address and phone. When a customer changes address, you need to preserve the previous address for historical reporting on old orders. Which SCD type do you use?",
    back: "Use <b>SCD Type 2</b>. It creates a new row with effective/expiry dates and an IsCurrent flag, so old fact rows still join to the correct customer version. The natural (business) key is shared across rows while the surrogate key is unique per version."
  },
  {
    id: "m4-c16",
    type: "term",
    topic: "Fabric Warehouse Architecture",
    front: "What storage format does Fabric Warehouse use and where is data stored?",
    back: "Fabric Warehouse stores all data in <b>Delta format</b> (Parquet + transaction log) on <b>OneLake</b>. This means data is automatically available to other Fabric experiences (Lakehouse, Notebooks, Semantic Models) without duplication, and benefits from Delta's ACID transactions, time travel, and schema evolution."
  },
  {
    id: "m4-c17",
    type: "term",
    topic: "Fabric Warehouse Architecture",
    front: "How does compute auto-scaling work in Fabric Warehouse?",
    back: "Fabric Warehouse uses <b>auto-scaling compute</b> that automatically adjusts resources based on workload demand. Compute is separate from storage (OneLake). The Warehouse cold-starts on first query after inactivity and scales up/down transparently &mdash; no user configuration is needed."
  },
  {
    id: "m4-c18",
    type: "term",
    topic: "Fabric Warehouse Architecture",
    front: "What are table clones and what makes them unique?",
    back: "Table clones are a <b>zero-copy</b>, <b>metadata-only</b> operation that creates a <b>point-in-time</b> snapshot of a table. They do not duplicate underlying data files &mdash; only metadata is copied. Clones are useful for backups, testing, and creating development environments without additional storage cost."
  },
  {
    id: "m4-c19",
    type: "term",
    topic: "Fabric Warehouse Architecture",
    front: "What tools can connect to Fabric Warehouse and what authentication is required?",
    back: "Tools like <b>SSMS</b> (SQL Server Management Studio) and <b>ADS</b> (Azure Data Studio) can connect via TDS port <b>1433</b>. Only <b>Entra ID</b> (Azure AD) authentication is supported &mdash; SQL Server authentication is not available. You must specify the database name when connecting."
  },
  {
    id: "m4-c20",
    type: "term",
    topic: "Fabric Warehouse Architecture",
    front: "How does the <code>COPY INTO</code> command ingest data into a Warehouse?",
    back: "<code>COPY INTO</code> loads data from external storage (e.g. Azure Blob, ADLS Gen2) using <code>CREDENTIAL</code> for authentication (SAS token, Managed Identity, or Service Principal). It supports CSV, Parquet, and JSON formats and provides error handling options like MAXERRORS and ERRORFILE."
  },
  {
    id: "m4-c21",
    type: "term",
    topic: "Fabric Warehouse Architecture",
    front: "What are OPENROWSET and CTAS used for in data ingestion?",
    back: "<b>OPENROWSET</b> reads external files directly (e.g. <code>SELECT * FROM OPENROWSET(BULK '...', FORMAT = 'CSV')</code>) without loading into a table. <b>CTAS</b> (CREATE TABLE AS SELECT) creates a new table from a query result &mdash; commonly used together as <code>CTAS WITH OPENROWSET</code> to load external data into a warehouse table in one step."
  },
  {
    id: "m4-c22",
    type: "compare",
    topic: "Fabric Warehouse Architecture",
    front: "Compare full load and incremental load ETL patterns.",
    back: "<b>Full load:</b> Truncate the target table and reload all data. Simple, but inefficient for large datasets. Best for small reference tables or first-time loads.<br><br><b>Incremental load:</b> Only load new/changed data since the last run using watermark columns (LastModifiedDate, high-water mark). Efficient for large tables, reduces processing time and resource consumption."
  },
  {
    id: "m4-c23",
    type: "term",
    topic: "Fabric Warehouse Architecture",
    front: "What cross-database query patterns are supported in Fabric Warehouse?",
    back: "Three-part naming (<code>DatabaseName.Schema.TableName</code>) is supported <b>within the same workspace</b>. This allows queries across multiple Warehouses and Lakehouses. Cross-workspace queries are <b>not supported</b>. Examples: <code>SELECT * FROM SalesWarehouse.dbo.Orders</code> or <code>SELECT * FROM LakehouseName.dbo.Customers</code>."
  },
  {
    id: "m4-c24",
    type: "edge",
    topic: "Fabric Warehouse Architecture",
    front: "You create a zero-copy clone of a table. After the clone is created, original rows are modified. What happens to the clone's data?",
    back: "The clone remains a <b>point-in-time snapshot</b> of the original table at the moment the clone was created. Since clones use zero-copy metadata, the original row versions are preserved in storage for the clone to reference. Modifications to the original after cloning do not affect the clone's data."
  },
  {
    id: "m4-c25",
    type: "term",
    topic: "Querying the Warehouse",
    front: "What features does the SQL Query Editor in Fabric Warehouse provide?",
    back: "Features include <b>IntelliSense</b> (auto-complete for T-SQL), <b>Copilot</b> (AI-assisted code generation), <b>10,000 row preview</b> limit, and <b>saved queries</b> that persist across sessions. Results can be exported to Excel, explored in a visual editor, or visualized directly."
  },
  {
    id: "m4-c26",
    type: "term",
    topic: "Querying the Warehouse",
    front: "What is the Visual Query Editor and what does it generate?",
    back: "The Visual Query Editor is a <b>drag-and-drop</b> query builder that lets users join tables, filter, and aggregate without writing T-SQL. It <b>auto-generates T-SQL</b> behind the scenes, which users can view and modify. Useful for less technical users or rapid prototyping."
  },
  {
    id: "m4-c27",
    type: "term",
    topic: "Querying the Warehouse",
    front: "What options are available in the query Results Toolbar?",
    back: "The Results Toolbar provides:<br><b>Excel</b> &mdash; export results to Excel<br><b>Explore this data</b> &mdash; create an automatic semantic model<br><b>Visualize</b> &mdash; create a chart (note: <b>Visualize does not support ORDER BY</b> in the query)<br><b>Save as view</b> &mdash; save as a reusable view<br><b>Save as table</b> &mdash; persist results as a new table"
  },
  {
    id: "m4-c28",
    type: "term",
    topic: "Querying the Warehouse",
    front: "Explain ROW_NUMBER, RANK, DENSE_RANK, and NTILE ranking functions.",
    back: "<b>ROW_NUMBER()</b> &mdash; assigns a <b>unique sequential</b> number to each row (no ties, deterministic with ORDER BY)<br><b>RANK()</b> &mdash; same rank for ties, <b>skips numbers</b> after ties (1,1,3,4)<br><b>DENSE_RANK()</b> &mdash; same rank for ties, <b>no gaps</b> (1,1,2,3)<br><b>NTILE(N)</b> &mdash; divides rows into <b>N approximately equal groups</b> (1..N)"
  },
  {
    id: "m4-c29",
    type: "term",
    topic: "Querying the Warehouse",
    front: "What is the typical query pattern for querying a snowflake schema?",
    back: "Query a snowflake schema by joining the fact table to the central dimension tables, then joining those to sub-dimensions. Example:<br><code>SELECT f.OrderAmount, d.CustomerName, r.RegionName<br>FROM FactOrders f<br>JOIN DimCustomer d ON f.CustomerKey = d.CustomerKey<br>JOIN DimRegion r ON d.RegionKey = r.RegionKey</code><br><br>Star schema is preferred for performance as it requires fewer joins."
  },
  {
    id: "m4-c30",
    type: "term",
    topic: "Querying the Warehouse",
    front: "What are the requirements to connect SSMS to Fabric Warehouse?",
    back: "Requirements:<br><b>Authentication:</b> Entra ID (Azure AD) only &mdash; no SQL Server auth<br><b>Port:</b> TDS port 1433<br><b>Database name:</b> Required in connection string<br><b>Server:</b> The Fabric Warehouse endpoint URL<br><b>Note:</b> SSMS 18.0 or later recommended for best compatibility."
  },
  {
    id: "m4-c31",
    type: "compare",
    topic: "Querying the Warehouse",
    front: "When would you use DENSE_RANK instead of ROW_NUMBER or RANK?",
    back: "Use <b>ROW_NUMBER</b> for pagination or when every row needs a unique identifier (no ties).<br>Use <b>RANK</b> when ties should share a rank but you want to show the gap (e.g. '3rd place' means 3rd distinct ranking).<br>Use <b>DENSE_RANK</b> when ties should share a rank with <b>no gaps</b> (e.g. top 5 products with ties &mdash; 1,1,2,2,3)."
  },
  {
    id: "m4-c32",
    type: "term",
    topic: "Data Modeling and Semantic Layer",
    front: "What capabilities does the model view provide in the semantic layer?",
    back: "The model view allows you to:<br><b>Hide staging tables</b> from end users<br><b>Rename columns</b> to business-friendly names<br><b>Add descriptions</b> to tables and columns<br><b>Create relationships</b> between tables<br><b>Organize tables</b> into display folders<br>This creates a clean, understandable layer for report consumers."
  },
  {
    id: "m4-c33",
    type: "term",
    topic: "Data Modeling and Semantic Layer",
    front: "What is the default cross-filter direction for relationships and when should bidirectional be used?",
    back: "The default is <b>single cross-filter direction</b> (many-to-one, from dimension to fact). <b>Bidirectional</b> filtering should be used <b>sparingly</b> because it can create ambiguous filter propagation and performance issues. Only enable bidirectional when both directions of filtering are explicitly needed."
  },
  {
    id: "m4-c34",
    type: "term",
    topic: "Data Modeling and Semantic Layer",
    front: "What are DAX measures and why are they important?",
    back: "DAX measures are calculations (e.g. <code>Total Sales = SUM(Sales[Amount])</code>) defined in the semantic model. They provide a <b>single source of truth</b> for business logic &mdash; defined once in the model, used consistently across all reports. Changes propagate automatically to all downstream reports."
  },
  {
    id: "m4-c35",
    type: "term",
    topic: "Data Modeling and Semantic Layer",
    front: "What is Direct Lake mode and how does it differ from Import and DirectQuery?",
    back: "<b>Direct Lake</b> mode reads Delta Parquet files <b>directly from OneLake</b> without importing data into memory (Import mode) or querying the SQL engine (DirectQuery). It offers near-Import-level performance without requiring data refresh or a running warehouse. Changes in OneLake are immediately available."
  },
  {
    id: "m4-c36",
    type: "term",
    topic: "Data Modeling and Semantic Layer",
    front: "Why are views recommended as a stable interface for reporting?",
    back: "Views provide a <b>stable, abstraction layer</b> over underlying tables. If source tables are renamed, restructured, or reloaded, the view can be updated without breaking downstream reports. This decouples the physical storage from the logical schema that consumers depend on."
  },
  {
    id: "m4-c37",
    type: "edge",
    topic: "Data Modeling and Semantic Layer",
    front: "You enable bidirectional cross-filtering in a many-to-many relationship. What risk does this introduce?",
    back: "Bidirectional cross-filtering can cause <b>ambiguous filter propagation</b>, creating unexpected or incorrect filter contexts. This can lead to performance degradation and confusing results. Use bidirectional only when necessary and always test thoroughly. The default single-direction filter is safer for most scenarios."
  },
  {
    id: "m4-c38",
    type: "term",
    topic: "Copilot for Data Warehouse",
    front: "What are the prerequisites and limitations for using Copilot in Fabric Warehouse?",
    back: "Prerequisites: Requires <b>F2 or higher</b> SKU capacity, <b>English only</b> (single-language support), and must be <b>enabled at the tenant level</b> by the admin. Copilot may not work in all regions. Copilot for data warehouse generates T-SQL code and provides chat assistance."
  },
  {
    id: "m4-c39",
    type: "term",
    topic: "Copilot for Data Warehouse",
    front: "How does Copilot code completion work in the SQL Query Editor?",
    back: "Copilot provides <b>ghost text</b> (inline suggestions) as you type. Press <b>Tab</b> to accept the suggestion. Copilot infers intent from your T-SQL code and <b>comments</b> written in natural language above the code. Writing clear comments helps Copilot generate more accurate SQL."
  },
  {
    id: "m4-c40",
    type: "term",
    topic: "Copilot for Data Warehouse",
    front: "What slash commands are available in the Copilot Chat pane for Fabric Warehouse?",
    back: "Available slash commands:<br><code>/generate-sql</code> &mdash; generate T-SQL from natural language<br><code>/explain</code> &mdash; explain selected SQL code<br><code>/fix</code> &mdash; fix errors in selected code<br><code>/question</code> &mdash; ask a general question<br><code>/help</code> &mdash; get help with using Copilot"
  },
  {
    id: "m4-c41",
    type: "term",
    topic: "Copilot for Data Warehouse",
    front: "What Quick Actions does Copilot provide in the SQL Query Editor?",
    back: "Quick Actions appear as buttons on hover:<br><b>Explain</b> &mdash; adds comments explaining the selected code<br><b>Fix</b> &mdash; only appears when a query error is detected; suggests a fix<br><b>Note:</b> The Fix option only activates after a query has been executed and returned an error &mdash; it does not proactively detect errors."
  },
  {
    id: "m4-c42",
    type: "scenario",
    topic: "Copilot for Data Warehouse",
    front: "What best practices should you follow when using Copilot for generating T-SQL in Fabric Warehouse?",
    back: "<b>Best practices:</b><br>1. Use <b>descriptive names</b> for tables and columns<br>2. Define <b>clear relationships</b> in the semantic model<br>3. Write <b>comments</b> above code to guide Copilot's suggestions<br>4. Always <b>review generated code</b> before executing<br>5. Use <b>specific, actionable</b> natural language descriptions<br>6. Iterate by accepting, modifying, or rejecting suggestions"
  },
  {
    id: "m4-c43",
    type: "term",
    topic: "Monitoring and Security",
    front: "What DMVs are available in Fabric Warehouse and what is the KILL command restriction?",
    back: "Key DMVs include:<br><code>sys.dm_exec_connections</code> &mdash; active connections<br><code>sys.dm_exec_sessions</code> &mdash; active sessions<br><code>sys.dm_exec_requests</code> &mdash; running requests<br><br>The <b>KILL</b> command requires <b>Admin workspace role</b>. Members, Contributors, and Viewers cannot terminate sessions even if they can see them in the DMVs."
  },
  {
    id: "m4-c44",
    type: "term",
    topic: "Monitoring and Security",
    front: "What are Query Insights and how does data retention work?",
    back: "Query Insights provides query performance history with <b>30-day retention</b>. Data has a <b>15-minute delay</b> before appearing. Queries are <b>parameterized and deduplicated</b> so similar queries (e.g. same query with different parameter values) are grouped together for analysis."
  },
  {
    id: "m4-c45",
    type: "term",
    topic: "Monitoring and Security",
    front: "What is the Capacity Metrics App used for?",
    back: "The Capacity Metrics App is a Fabric monitoring tool that tracks <b>capacity consumption</b>, including CU (Capacity Unit) usage for Warehouse operations. It helps identify bottlenecks, throttling, and usage patterns across all Fabric workloads within a capacity."
  },
  {
    id: "m4-c46",
    type: "term",
    topic: "Monitoring and Security",
    front: "Differentiate workspace roles and item permissions in Fabric.",
    back: "<b>Workspace roles</b> (Admin, Member, Contributor, Viewer) control access to the entire workspace. <b>Item permissions</b> are granular permissions on individual items (Read, ReadData, ReadAll) that can override workspace roles. For example, a Viewer can be granted ReadData on a specific Warehouse."
  },
  {
    id: "m4-c47",
    type: "term",
    topic: "Monitoring and Security",
    front: "What is Dynamic Data Masking (DDM) and what is its key security limitation?",
    back: "DDM masks sensitive data at <b>query time</b> using the <code>MASKED WITH</code> clause (e.g. <code>ALTER TABLE ... ALTER COLUMN ... ADD MASKED WITH (FUNCTION = 'partial(0,\"XXX\",4)')</code>). <b>Key limitation:</b> DDM has a <b>side-channel risk</b> &mdash; users can infer masked values through aggregate queries or comparison logic if they have permission to write queries."
  },
  {
    id: "m4-c48",
    type: "term",
    topic: "Monitoring and Security",
    front: "How does Row-Level Security (RLS) work in Fabric Warehouse?",
    back: "RLS uses a <b>filter predicate</b> (inline table-valued function) applied via a <b>security policy</b> (<code>CREATE SECURITY POLICY ... ADD FILTER PREDICATE</code>). The predicate is evaluated automatically for every query. RLS has <b>no effect on INSERT</b> statements &mdash; only SELECT, UPDATE, and DELETE are filtered."
  },
  {
    id: "m4-c49",
    type: "term",
    topic: "Monitoring and Security",
    front: "How does Column-Level Security (CLS) work and what is the DENY precedence rule?",
    back: "CLS uses <b>GRANT</b> and <b>DENY</b> permissions on specific columns (<code>GRANT SELECT ON COLUMN</code> / <code>DENY SELECT ON COLUMN</code>). <b>DENY always wins</b> over GRANT &mdash; if a user is a member of one role with GRANT and another with DENY, DENY takes precedence. This is the same as the SQL Server security model."
  },
  {
    id: "m4-c50",
    type: "edge",
    topic: "Monitoring and Security",
    front: "How does <code>QUOTENAME</code> prevent dynamic SQL injection in Fabric Warehouse?",
    back: "<code>QUOTENAME()</code> wraps a string with square brackets (<code>[ ]</code>) and escapes any embedded brackets, preventing injection through malformed identifiers. Example:<br><code>DECLARE @SchemaName NVARCHAR(128) = 'dbo';<br>DECLARE @SafeName NVARCHAR(258) = QUOTENAME(@SchemaName);<br>EXEC('SELECT * FROM ' + @SafeName + '.Orders');</code><br><br>Always use QUOTENAME for any user-supplied schema, table, or column names in dynamic SQL."
  }
];
