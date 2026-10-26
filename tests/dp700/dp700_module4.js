// Module 4: Warehouse & Dimensional Modeling
(function() {
  var questions = [
    {
      "id": "dp700-4-001",
      "text": "You need to run a SQL query against a Fabric warehouse. The query must use dynamic SQL. Which function should you use to safely incorporate user input into the query to prevent injection?",
      "options": [
        "QUOTENAME",
        "CONCAT",
        "STRING_AGG",
        "FORMATMESSAGE"
      ],
      "correct": 0,
      "module": 4,
      "explanation": "QUOTENAME safely wraps identifiers (e.g., column or table names) in brackets, preventing SQL injection when building dynamic SQL. CONCAT, STRING_AGG, and FORMATMESSAGE do not provide any protection against malicious input."
    },
    {
      "id": "dp700-4-002",
      "text": "You are loading data into a Fabric warehouse. The source contains 500 Parquet files in an Azure Blob Storage container. You want to load all files matching a wildcard pattern. Which T-SQL statement should you use?",
      "options": [
        "INSERT INTO SELECT from OPENROWSET",
        "COPY INTO with a wildcard path",
        "BULK INSERT",
        "LOAD DATA FROM URL"
      ],
      "correct": 1,
      "module": 4,
      "explanation": "COPY INTO supports wildcard paths (e.g., '*.parquet') and is the recommended way to load multiple files into a Fabric warehouse. OPENROWSET reads files but does not load into a table. BULK INSERT is limited and not optimized for cloud storage. LOAD DATA FROM URL is not a T-SQL statement in Fabric."
    },
    {
      "id": "dp700-4-003",
      "text": "Which of the following is a valid reason to use a snowflake schema instead of a star schema in a Fabric warehouse?",
      "options": [
        "To reduce the number of JOINs needed for reporting queries",
        "To improve query performance for simple aggregations",
        "To normalize dimension tables and reduce data redundancy",
        "To enable direct Lake mode for Power BI"
      ],
      "correct": 2,
      "module": 4,
      "explanation": "Snowflake schema normalizes dimension tables, reducing redundancy (e.g., storing city details separately instead of repeating them). This comes at the cost of more JOINs and often slower queries. Star schema reduces JOINs and improves performance, so snowflake is chosen for normalization, not performance or Direct Lake."
    },
    {
      "id": "dp700-4-004",
      "text": "A data engineer needs to monitor long-running queries in a Fabric warehouse. Where should the engineer look?",
      "options": [
        "The Monitor Hub",
        "Query insights - long_running_queries",
        "The admin monitoring workspace",
        "The Capacity Metrics app"
      ],
      "correct": 1,
      "module": 4,
      "explanation": "Query insights in Fabric warehouse include a view specifically for long-running queries (e.g., queryinsights.long_running_queries). Monitor Hub shows job status, not query performance. Admin monitoring workspace shows platform usage. Capacity Metrics app shows capacity consumption, not query details."
    },
    {
      "id": "dp700-4-005",
      "text": "You need to apply dynamic data masking to a column in a Fabric warehouse. The column contains email addresses. Which masking function should you use?",
      "options": [
        "email()",
        "partial()",
        "random()",
        "default()"
      ],
      "correct": 0,
      "module": 4,
      "explanation": "The email() masking function is specifically designed for email columns, showing the first letter of the email address and the constant suffix '.com'. partial() is for general partial masking. random() generates random values. default() uses the data type default mask."
    },
    {
      "id": "dp700-4-006",
      "text": "A data engineer wants to use Copilot in the Fabric warehouse query editor. Which slash command generates SQL code from a natural language description?",
      "options": [
        "/generate-sql",
        "/explain",
        "/fix",
        "/question"
      ],
      "correct": 0,
      "module": 4,
      "explanation": "/generate-sql is the Copilot slash command that creates SQL code based on a natural language description. /explain explains existing SQL. /fix corrects errors. /question asks general questions."
    },
    {
      "id": "dp700-4-007",
      "text": "You need to load data into a Fabric warehouse using a COPY statement. The data is in Parquet files in Azure Data Lake Storage. Which authentication method is supported?",
      "options": [
        "SQL authentication",
        "Managed identity or shared access signature (SAS)",
        "Basic authentication",
        "Certificate-based authentication only"
      ],
      "correct": 1,
      "module": 4,
      "explanation": "COPY INTO in Fabric warehouse supports managed identity (the workspace identity) and SAS tokens for authenticating to Azure Data Lake Storage. SQL authentication is for database login, not external storage. Basic and certificate-only are not supported."
    },
    {
      "id": "dp700-4-008",
      "text": "Which of the following is true about row-level security (RLS) in a Fabric warehouse?",
      "options": [
        "RLS is applied to the underlying data files",
        "RLS can only be configured by workspace admins",
        "RLS is enforced through filter predicates in a security policy",
        "RLS does not support dynamic rules"
      ],
      "correct": 2,
      "module": 4,
      "explanation": "RLS in Fabric warehouse is implemented using security policies with filter predicates that restrict rows at query time. It does not alter underlying files. RLS can be configured by users with ALTER permission, not only workspace admins. It supports dynamic rules using user-defined functions."
    },
    {
      "id": "dp700-4-009",
      "text": "You have a Fabric warehouse with a dimension table that tracks product category changes over time. Which SCD type is most appropriate for preserving full history of changes?",
      "options": [
        "SCD Type 0",
        "SCD Type 1",
        "SCD Type 2",
        "SCD Type 3"
      ],
      "correct": 2,
      "module": 4,
      "explanation": "SCD Type 2 preserves full history by adding a new row for each change, with effective dates and a current flag. Type 0 retains original value, Type 1 overwrites history, Type 3 stores only a limited previous value."
    },
    {
      "id": "dp700-4-010",
      "text": "Which of the following is true about the COPY INTO statement in a Fabric warehouse?",
      "options": [
        "It can only load data from Azure Blob Storage",
        "It supports loading from Azure Data Lake Storage and Azure Blob Storage",
        "It cannot load multiple files at once",
        "It only supports CSV format"
      ],
      "correct": 1,
      "module": 4,
      "explanation": "COPY INTO supports both ADLS Gen2 and Azure Blob Storage, can load multiple files (including wildcards), and supports Parquet, CSV, and JSON formats."
    },
    {
      "id": "dp700-4-011",
      "text": "You need to create a semantic model in Fabric that uses Direct Lake mode. Which workload must the semantic model be in?",
      "options": [
        "Data Engineering",
        "Data Factory",
        "Data Science",
        "Power BI"
      ],
      "correct": 3,
      "module": 4,
      "explanation": "Semantic models (formerly datasets) are created in the Power BI workload. Direct Lake mode is a setting within the Power BI semantic model. Data Engineering, Data Factory, and Data Science do not host semantic models."
    },
    {
      "id": "dp700-4-012",
      "text": "Which of the following is true about CLS (Column-level security) in a Fabric warehouse?",
      "options": [
        "CLS requires Fabric premium capacity",
        "CLS is configured at the workspace level",
        "CLS only works with dynamic data masking",
        "CLS uses DENY SELECT to restrict access to specific columns"
      ],
      "correct": 3,
      "module": 4,
      "explanation": "Column-level security is implemented using GRANT/DENY SELECT on specific columns. It is configured at the database/table level, not workspace. It works independently of DDM. It is available on all Fabric warehouse capacities."
    },
    {
      "id": "dp700-4-013",
      "text": "You need to create a table clone in a Fabric warehouse. What is a table clone?",
      "options": [
        "A full copy of the table data and schema",
        "A materialized view of the source table",
        "A zero-copy reference to the same data as the source table",
        "A schema-only copy without data"
      ],
      "correct": 2,
      "module": 4,
      "explanation": "A table clone in Fabric warehouse (via `CREATE TABLE ... CLONE`) is a zero-copy reference that shares the same underlying Delta files. It does not duplicate data. Writes to the clone create new files, leaving the original unchanged."
    },
    {
      "id": "dp700-4-015",
      "text": "Which of the following is true about query insights in Fabric warehouses?",
      "options": [
        "Query insights are available in real-time",
        "Query insights require a separate capacity",
        "Query insights only store data for 7 days",
        "Query insights have up to 15 minutes of delay"
      ],
      "correct": 3,
      "module": 4,
      "explanation": "Query insights have a delay of up to 15 minutes from query execution to visibility. They retain data for 30 days, are available on all capacities, and are not real-time."
    },
    {
      "id": "dp700-4-016",
      "text": "What is the primary difference between a Fabric warehouse and a SQL analytics endpoint?",
      "options": [
        "The warehouse supports read-only access while the SQL analytics endpoint supports write access",
        "The warehouse stores data in Parquet while the SQL analytics endpoint stores data in Delta format",
        "The warehouse supports full read/write T-SQL capabilities while the SQL analytics endpoint is read-only",
        "The warehouse uses KQL while the SQL analytics endpoint uses T-SQL"
      ],
      "correct": 2,
      "module": 4,
      "explanation": "Warehouse supports full DDL/DML/MERGE (read-write). SQL analytics endpoint is read-only, only SELECT queries. Both use T-SQL, and both store data in Delta format (warehouse also Delta)."
    },
    {
      "id": "dp700-4-017",
      "text": "In a dimensional model, what is the purpose of a surrogate key in a dimension table?",
      "options": [
        "It is the natural business key from the source system",
        "It is used to connect to external APIs",
        "It replaces the primary key in fact tables",
        "It is a system-generated unique identifier specific to the data warehouse"
      ],
      "correct": 3,
      "module": 4,
      "explanation": "A surrogate key is a system-generated (usually integer) identifier for each dimension row, independent of source business keys. It allows handling of SCD changes and ensures uniqueness."
    },
    {
      "id": "dp700-4-018",
      "text": "You need to track changes to a customer's address over time in your data warehouse while preserving the full history of changes. Which SCD type should you implement?",
      "options": [
        "Type 0 SCD",
        "Type 1 SCD",
        "Type 2 SCD",
        "Type 3 SCD"
      ],
      "correct": 2,
      "module": 4,
      "explanation": "SCD Type 2 preserves full history by adding a new row for each change, with effective dates and current flag. Type 1 overwrites, Type 0 retains original, Type 3 stores limited previous value."
    },
    {
      "id": "dp700-4-019",
      "text": "You want to load data into a Fabric warehouse from an external CSV file in Azure Blob Storage using T-SQL. Which statement should you use?",
      "options": [
        "COPY INTO",
        "INSERT INTO ... SELECT",
        "CREATE TABLE AS SELECT",
        "OPENROWSET"
      ],
      "correct": 0,
      "module": 4,
      "explanation": "COPY INTO is the primary T-SQL statement for loading external files (CSV, Parquet, JSON) into a warehouse table. OPENROWSET queries but does not load. INSERT...SELECT and CTAS work with existing tables."
    },
    {
      "id": "dp700-4-020",
      "text": "You need to query data across a warehouse and a lakehouse in the same workspace without copying data. Which T-SQL feature enables this?",
      "options": [
        "COPY INTO with external tables",
        "Linked servers",
        "OPENROWSET with SQL authentication",
        "Cross-database queries using three-part naming"
      ],
      "correct": 3,
      "module": 4,
      "explanation": "Three-part naming (database.schema.table) allows cross-database queries within the same workspace. Linked servers are not in Fabric. OPENROWSET is for external files. COPY INTO loads, not queries."
    },
    {
      "id": "dp700-4-021",
      "text": "You want to create a zero-copy clone of a warehouse table for development and testing. What does the cloned table share with the original?",
      "options": [
        "Separate data files but the same metadata",
        "The same underlying data files in OneLake but separate metadata",
        "Both the same underlying data files and the same metadata",
        "Separate copies of both data and metadata"
      ],
      "correct": 1,
      "module": 4,
      "explanation": "A table clone is zero-copy: it gets its own metadata but references the same underlying data files in OneLake. Later writes to either table create new files, so the two tables diverge independently."
    },
    {
      "id": "dp700-4-022",
      "text": "When querying a Fabric warehouse, you want to estimate the number of distinct orders without requiring an exact count on a very large table. Which function should you use?",
      "options": [
        "COUNT_BIG(...)",
        "COUNT(DISTINCT ...)",
        "APPROX_COUNT_DISTINCT(...)",
        "DISTINCT_COUNT(...)"
      ],
      "correct": 2,
      "module": 4,
      "explanation": "APPROX_COUNT_DISTINCT uses HyperLogLog to estimate distinct counts quickly with ~2% error, ideal for large tables. COUNT(DISTINCT) is exact but slow. COUNT_BIG counts rows, not distinct."
    },
    {
      "id": "dp700-4-023",
      "text": "You are using RANK and DENSE_RANK functions on products partitioned by category. Two products share the same list price and both rank 3rd. What value does DENSE_RANK assign to the next product?",
      "options": [
        "6",
        "5",
        "3",
        "4"
      ],
      "correct": 3,
      "module": 4,
      "explanation": "DENSE_RANK does not leave gaps. After two rows ranked 3, the next rank is 4. RANK would assign 5. So answer is 4."
    },
    {
      "id": "dp700-4-024",
      "text": "You want to connect to a Fabric warehouse from SQL Server Management Studio (SSMS). Which authentication method is supported?",
      "options": [
        "SQL authentication with username and password",
        "Microsoft Entra ID authentication only",
        "Windows authentication only",
        "Both SQL authentication and Microsoft Entra ID"
      ],
      "correct": 1,
      "module": 4,
      "explanation": "Connections to a Fabric warehouse use Microsoft Entra ID authentication (user accounts or service principals). SQL authentication with a username and password is not supported."
    },
    {
      "id": "dp700-4-025",
      "text": "Copilot in Fabric Data Warehouse requires a minimum capacity SKU to function. What is the minimum required SKU?",
      "options": [
        "F2 or higher, or P SKU",
        "Any SKU with Copilot enabled",
        "F64 or higher",
        "Trial SKU"
      ],
      "correct": 3,
      "module": 4,
      "explanation": "Copilot in Fabric is available on F2 or higher, or on a P SKU. It is not available on trial capacities."
    },
    {
      "id": "dp700-4-026",
      "text": "You run a query in the Fabric warehouse SQL editor that contains syntax errors. Which Copilot quick action can automatically resolve these errors?",
      "options": [
        "Explain query",
        "Question",
        "Fix query errors",
        "Generate SQL"
      ],
      "correct": 2,
      "module": 4,
      "explanation": "The 'Fix query errors' quick action analyzes syntax errors and suggests corrections. Explain explains the query, Generate SQL creates new SQL from natural language, Question answers general queries."
    },
    {
      "id": "dp700-4-027",
      "text": "You want to monitor currently running queries in your Fabric warehouse and identify which ones have been executing the longest. Which DMV should you query?",
      "options": [
        "sys.dm_exec_connections",
        "sys.dm_exec_requests",
        "sys.dm_exec_sessions",
        "queryinsights.long_running_queries"
      ],
      "correct": 1,
      "module": 4,
      "explanation": "sys.dm_exec_requests shows currently executing queries, including start time and status. Connections shows connection info, sessions shows session info. queryinsights is for historical data."
    },
    {
      "id": "dp700-4-028",
      "text": "Query insights in Fabric data warehouse retains historical query data for how long?",
      "options": [
        "30 days",
        "15 minutes",
        "7 days",
        "90 days"
      ],
      "correct": 0,
      "module": 4,
      "explanation": "Query insights retain data for 30 days. Delay is up to 15 minutes, but retention is 30 days."
    },
    {
      "id": "dp700-4-029",
      "text": "You want to mask the Email column in a Customers table so nonprivileged users see only the first letter and '.com' suffix. Which Dynamic Data Masking function should you apply?",
      "options": [
        "default()",
        "partial(1, '@contoso.com', 4)",
        "email()",
        "random(0, 9999)"
      ],
      "correct": 2,
      "module": 4,
      "explanation": "email() masks email addresses to show first letter and '.com' suffix. partial() can be customized but email() is the standard function for emails. default() masks based on type."
    },
    {
      "id": "dp700-4-030",
      "text": "You implement Row-Level Security with a filter predicate on a Sales table. A user runs a SELECT query. What happens if the predicate function returns false for certain rows?",
      "options": [
        "The rows are excluded from the query results entirely",
        "The rows are returned but marked as restricted",
        "An error is returned to the user",
        "The rows are returned with NULL values"
      ],
      "correct": 0,
      "module": 4,
      "explanation": "RLS filter predicates exclude rows where the predicate returns false. Those rows are simply not returned; no error, no NULLs, no marking."
    },
    {
      "id": "dp700-4-031",
      "text": "You need to restrict access to the MedicalHistory column in a Patients table so only Doctors and Nurses can view it. Which approach should you use?",
      "options": [
        "Column-level security with DENY SELECT on the column for other roles",
        "Row-level security on the table",
        "Dynamic data masking with default function",
        "Create separate views for each role"
      ],
      "correct": 0,
      "module": 4,
      "explanation": "Column-level security (CLS) using GRANT/DENY SELECT on specific columns is the direct way to restrict column access. RLS restricts rows, DDM masks but does not prevent access, views are an alternative but CLS is simpler."
    },
    {
      "id": "dp700-4-032",
      "module": 4,
      "text": "You are designing a dimensional model for sales data. Which schema type reduces data redundancy but may increase JOIN complexity?",
      "options": [
        "Star schema",
        "Fact constellation",
        "Galaxy schema",
        "Snowflake schema"
      ],
      "correct": 3,
      "explanation": "Snowflake schema normalizes dimension tables, reducing redundancy but requiring more JOINs. Star schema is denormalized (less JOINs, more redundancy). Galaxy and fact constellation are multiple fact tables."
    },
    {
      "id": "dp700-4-034",
      "module": 4,
      "text": "You need to preserve full history of product attributes. Which Slowly Changing Dimension type should you implement?",
      "options": [
        "SCD Type-3",
        "SCD Type-1",
        "SCD Type-0",
        "SCD Type-2"
      ],
      "correct": 3,
      "explanation": "SCD Type 2 preserves full history by adding a new row for each change. Type 0 keeps original, Type 1 overwrites, Type 3 stores limited previous value."
    },
    {
      "id": "dp700-4-035",
      "module": 4,
      "text": "Which of the following is a valid reason to use a bridge table in a dimensional model?",
      "options": [
        "To enforce row-level security",
        "To store aggregated facts",
        "To resolve many-to-many relationships",
        "To replace a dimension table"
      ],
      "correct": 2,
      "explanation": "Bridge tables are used to resolve many-to-many relationships between fact and dimension tables (e.g., a patient having multiple diagnoses). Aggregated facts go in fact tables, not bridge tables."
    },
    {
      "id": "dp700-4-041",
      "module": 4,
      "text": "Which of the following is TRUE about the HIGH CONCURRENCY mode for Spark in Fabric?",
      "options": [
        "Each notebook runs in a separate session.",
        "It disables autoscaling.",
        "It requires a custom Spark pool.",
        "Spark sessions are shared across users."
      ],
      "correct": 3,
      "explanation": "High concurrency mode shares a Spark session across multiple notebooks and users, reducing overhead. It does not require a custom pool and does not disable autoscaling."
    },
    {
      "id": "dp700-4-043",
      "module": 4,
      "text": "A fact table stores daily sales. You need to track changes to product hierarchy (e.g., product moving from category A to B). Which SCD type is most appropriate for the product dimension?",
      "options": [
        "SCD Type 2",
        "SCD Type 1",
        "SCD Type 3",
        "SCD Type 0"
      ],
      "correct": 0,
      "explanation": "SCD Type 2 preserves full history of changes, including when a product's category changes. This allows historical fact reports to show the correct category at the time of each sale."
    },
    {
      "id": "dp700-4-044",
      "module": 4,
      "text": "Which T-SQL statement creates a new table from a SELECT result without copying data twice?",
      "options": [
        "SELECT INTO",
        "COPY INTO",
        "INSERT INTO ... SELECT",
        "CREATE TABLE AS SELECT (CTAS)"
      ],
      "correct": 3,
      "explanation": "CTAS (CREATE TABLE AS SELECT) creates a new table directly from the SELECT results in a single pass. SELECT INTO is similar but has limitations. INSERT INTO ... SELECT requires pre-creating the table."
    },
    {
      "id": "dp700-4-047",
      "module": 4,
      "text": "You need to create a surrogate key for a Date dimension. Which data type is most efficient for query performance and storage?",
      "options": [
        "INT",
        "BIGINT",
        "DATE",
        "SMALLINT"
      ],
      "correct": 0,
      "explanation": "INT (4 bytes) is sufficient for surrogate keys up to 2 billion rows, offering good performance and storage efficiency. BIGINT is 8 bytes, DATE is less efficient for joins, SMALLINT may be too small."
    },
    {
      "id": "dp700-4-048",
      "module": 4,
      "text": "Which Copilot slash command explains the purpose of a complex SQL query?",
      "options": [
        "/explain",
        "/generate-sql",
        "/fix",
        "/question"
      ],
      "correct": 0,
      "explanation": "/explain provides a natural language description of what the SQL query does. /generate-sql creates SQL, /fix corrects errors, /question answers general questions."
    },
    {
      "id": "dp700-4-051",
      "module": 4,
      "text": "You have a snowflake schema with Product → Subcategory → Category. A query needs product name and category name. How many joins are required?",
      "options": [
        "1",
        "3",
        "2",
        "4"
      ],
      "correct": 2,
      "explanation": "You need to join Fact to Product (1), Product to Subcategory (2), and Subcategory to Category (3). Starting from Product table alone, you need Product -> Subcategory -> Category = 2 joins to get category name. From fact table, it's 3 joins total."
    },
    {
      "id": "dp700-4-052",
      "module": 4,
      "text": "Which isolation level is used by default for transactions in a Fabric warehouse?",
      "options": [
        "READ UNCOMMITTED",
        "SERIALIZABLE",
        "SNAPSHOT",
        "READ COMMITTED"
      ],
      "correct": 1,
      "explanation": "A Fabric warehouse enforces SNAPSHOT isolation for every transaction; T-SQL isolation level changes are ignored. Readers never block writers, and write-write conflicts abort the second committer."
    },
    {
      "id": "dp700-4-053",
      "module": 4,
      "text": "Which of the following describes a surrogate key in a dimension table?",
      "options": [
        "A business key from the source system",
        "A system-generated unique identifier with no business meaning",
        "A foreign key referencing the fact table",
        "A composite key made of two or more natural keys"
      ],
      "correct": 1,
      "explanation": "A surrogate key is an artificial identifier (usually an auto-incrementing integer) assigned to each row in a dimension table. It is independent of source system keys and is used to handle SCD changes and ensure uniqueness."
    },
    {
      "id": "dp700-4-054",
      "module": 4,
      "text": "Which of the following describes a snowflake schema?",
      "options": [
        "A fact table surrounded by denormalized dimension tables",
        "A normalized dimensional model where dimension tables are further normalized into sub-dimensions",
        "A schema with multiple fact tables sharing common dimensions",
        "A single table containing both facts and dimensions"
      ],
      "correct": 1,
      "explanation": "A snowflake schema normalizes dimension tables (e.g., Product → Subcategory → Category) to reduce redundancy. This results in more JOINs but can save storage and simplify maintenance of hierarchical attributes."
    },
    {
      "id": "dp700-4-055",
      "module": 4,
      "text": "Which of the following describes Direct Lake mode in a Power BI semantic model?",
      "options": [
        "Data is imported into the semantic model and fully cached",
        "The semantic model sends live queries to a SQL database",
        "Data is cached for 24 hours and then expires",
        "The semantic model reads Delta Parquet files directly from OneLake without a refresh"
      ],
      "correct": 3,
      "explanation": "Direct Lake mode allows Power BI to read Delta Parquet files directly from OneLake. It combines the speed of import mode (no per-query scanning) with the freshness of DirectQuery (no scheduled refresh)."
    },
    {
      "id": "dp700-4-056",
      "text": "True or False: A Fabric Warehouse supports MERGE (upsert) T-SQL statements, allowing rows to be inserted or updated based on a matching condition in a single operation.",
      "options": [
        "True",
        "False"
      ],
      "correct": 0,
      "module": 4,
      "explanation": "True. Fabric Warehouse supports MERGE statements for upsert logic (insert new rows, update existing ones). This is a key advantage over the read-only SQL analytics endpoint of a Lakehouse, which does not support MERGE."
    },
    {
      "id": "dp700-4-057",
      "text": "True or False: In a star schema, dimension tables are further normalized into sub-dimension tables to reduce data redundancy, creating a snowflake shape.",
      "options": [
        "True",
        "False"
      ],
      "correct": 1,
      "module": 4,
      "explanation": "False. A star schema keeps dimension tables denormalized (all attributes in one table). It is the snowflake schema that normalizes dimensions into sub-dimensions. Star schema prioritizes query simplicity and performance over storage efficiency."
    },
    {
      "id": "dp700-4-058",
      "text": "True or False: The COPY INTO statement in Fabric Warehouse supports loading multiple files using wildcard paths (e.g., 'folder/*.parquet').",
      "options": [
        "True",
        "False"
      ],
      "correct": 0,
      "module": 4,
      "explanation": "True. COPY INTO supports wildcard paths, allowing you to load all files matching a pattern (e.g., all Parquet files in a container folder) in a single statement. This is the recommended bulk-load method for Fabric Warehouse."
    },
    {
      "id": "dp700-4-059",
      "text": "True or False: Power BI Direct Lake mode requires a scheduled dataset refresh to pick up new data added to the underlying Delta tables.",
      "options": [
        "True",
        "False"
      ],
      "correct": 1,
      "module": 4,
      "explanation": "False. Direct Lake mode reads Delta Parquet files directly from OneLake at query time. It automatically reflects new data without a scheduled refresh, unless the semantic model has gone into fallback (DirectQuery) mode due to capacity limits."
    },
    {
      "id": "dp700-4-060",
      "text": "True or False: Row-level security (RLS) in a Fabric Warehouse filters data at the storage layer, so even users with direct table access cannot bypass it via T-SQL queries.",
      "options": [
        "True",
        "False"
      ],
      "correct": 0,
      "module": 4,
      "explanation": "True. RLS in Fabric Warehouse is enforced at the query engine level — all queries against the table have the security predicate applied automatically. Users cannot retrieve rows they are not authorized for even with direct T-SQL access, as long as they do not have elevated permissions (like ALTER TABLE) that bypass the policy."
    },
    {
      "id": "dp700-4-061",
      "text": "Which of the following are valid security features available in a Fabric Warehouse? (Select all that apply)",
      "type": "multi",
      "options": [
        "Row-level security (RLS)",
        "Column-level security (CLS)",
        "Dynamic data masking",
        "Transparent data encryption (TDE) managed by the customer"
      ],
      "correct": [
        0,
        1,
        2
      ],
      "module": 4,
      "explanation": "A (RLS), B (CLS), and C (Dynamic data masking) are all supported in Fabric Warehouse, mirroring standard SQL Server security features. D is wrong — Fabric uses platform-managed encryption (Microsoft-managed keys by default, with option for customer-managed keys at the capacity level), but Fabric Warehouse does not expose TDE as a configurable option the way SQL Server does."
    },
    {
      "id": "dp700-4-062",
      "text": "Which of the following are characteristics of a Type 2 Slowly Changing Dimension (SCD Type 2)? (Select all that apply)",
      "type": "multi",
      "options": [
        "Historical versions of a dimension record are preserved as separate rows",
        "A surrogate key is used to uniquely identify each version of a row",
        "Start and end date (or current-flag) columns track which row is the current version",
        "The source system's natural key is replaced and the old value is discarded"
      ],
      "correct": [
        0,
        1,
        2
      ],
      "module": 4,
      "explanation": "A, B, and C describe SCD Type 2 correctly. Multiple rows per entity exist (A), each differentiated by a surrogate key (B), with effective date or current-flag columns indicating the active record (C). D is wrong — the natural key from the source is retained alongside the surrogate key so historical records can still be linked to the source entity."
    },
    {
      "id": "dp700-4-063",
      "text": "Which of the following statements about Query Insights in Fabric Warehouse are correct? (Select all that apply)",
      "type": "multi",
      "options": [
        "Query Insights exposes pre-built views for monitoring long-running queries",
        "Query Insights is accessible via the Monitor Hub",
        "Query Insights includes a view for frequently run queries",
        "Query Insights data is retained for 30 days"
      ],
      "correct": [
        0,
        2,
        3
      ],
      "module": 4,
      "explanation": "A, C, and D are correct. Query Insights provides views like queryinsights.long_running_queries (A) and queryinsights.frequently_run_queries (C), and data is retained for 30 days (D). B is wrong — Query Insights is accessed from within the Warehouse editor (not Monitor Hub). Monitor Hub shows pipeline/job status, not per-query warehouse metrics."
    },
    {
      "id": "dp700-4-064",
      "text": "A team is designing a Fabric semantic model for Power BI reporting on a Lakehouse. Which connection mode characteristics apply to Direct Lake mode? (Select all that apply)",
      "type": "multi",
      "options": [
        "Data is read directly from OneLake Delta Parquet files at query time",
        "No scheduled dataset refresh is required to reflect new Delta table data",
        "The semantic model maintains an in-memory cache identical to Import mode",
        "If capacity limits are exceeded, it falls back to DirectQuery mode"
      ],
      "correct": [
        0,
        1,
        3
      ],
      "module": 4,
      "explanation": "A, B, and D are correct for Direct Lake. It reads Parquet files directly (A), reflects new data without refresh (B), and falls back to DirectQuery when certain limits are hit (D). C is wrong — Direct Lake does NOT maintain a full in-memory cache like Import mode. Import mode loads all data into memory; Direct Lake reads from storage on demand with smart caching."
    }
  ];
  
  if (typeof window.__dp700 === 'undefined') {
    window.__dp700 = { modules: [], questions: [] };
  }
  
  window.__dp700.questions = window.__dp700.questions.concat(questions);
  
  if (window.__dp700.modules.length < 4) {
    window.__dp700.modules[3] = "Module 4: Warehouse & Dimensional Modeling";
  }
})();



