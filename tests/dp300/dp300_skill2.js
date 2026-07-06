// Skill Area 2: Implement a secure environment
(function() {
  var questions = [
    {
      "id": "dp300-2-001",
      "text": "A company wants to use Microsoft Entra ID authentication for Azure SQL Database. Which best practice should they follow when configuring the Microsoft Entra admin?",
      "options": [
        "Assign a single user account as the Microsoft Entra admin",
        "Assign a Microsoft Entra group as the admin so access isn't dependent on a single login",
        "Use SQL Server authentication and sync passwords manually",
        "Create a contained user for each person"
      ],
      "correct": 1,
      "module": 2,
      "explanation": "The best practice is to make the Microsoft Entra admin a Microsoft Entra group rather than a single user. This ensures that if an individual leaves or their account is disabled, the group retains administrative access and a new member can be added without service interruption."
    },
    {
      "id": "dp300-2-002",
      "text": "Which Azure RBAC role allows a user to create and manage Azure SQL databases but prevents them from connecting to the database and reading data?",
      "options": [
        "SQL Server Contributor",
        "SQL DB Contributor",
        "SQL Security Manager",
        "Contributor"
      ],
      "correct": 1,
      "module": 2,
      "explanation": "SQL DB Contributor can create and manage databases but cannot access the database (connect and read data). SQL Server Contributor manages servers and databases but cannot access them. SQL Security Manager manages security policies but cannot access data."
    },
    {
      "id": "dp300-2-003",
      "text": "You need to create a database user in Azure SQL Database that only has access to a single database without creating a login in the master database. What should you create?",
      "options": [
        "A SQL Server authentication login in master mapped to a user",
        "A contained database user with password",
        "A Microsoft Entra user mapped to a server login",
        "A Windows authenticated user"
      ],
      "correct": 1,
      "module": 2,
      "explanation": "A contained database user is created at the database level and does not require a login in the master database. This is the recommended pattern for Azure SQL Database. The user only has access to the specific database where it is created."
    },
    {
      "id": "dp300-2-004",
      "text": "Which built-in database role should you assign to a user who needs to INSERT, UPDATE, and DELETE data in any table in Azure SQL Database?",
      "options": [
        "db_datareader",
        "db_datawriter",
        "db_ddladmin",
        "db_owner"
      ],
      "correct": 1,
      "module": 2,
      "explanation": "db_datawriter allows users to INSERT, UPDATE, and DELETE data from every table and view within the database. db_datareader only allows reading data. db_ddladmin allows creating/modifying objects but not data operations."
    },
    {
      "id": "dp300-2-005",
      "text": "A user is granted SELECT permission on a table and then DENY SELECT on the same table. What is the effective permission?",
      "options": [
        "The user can SELECT because GRANT was applied first",
        "The user cannot SELECT because DENY always overrides GRANT",
        "The permissions cancel out and the user has no explicit permission",
        "The result depends on the order of the statements"
      ],
      "correct": 1,
      "module": 2,
      "explanation": "DENY always overrides GRANT in SQL Server and Azure SQL Database. Even if a user is granted a permission and then denied the same permission, the deny takes precedence, and the user is denied access."
    },
    {
      "id": "dp300-2-006",
      "text": "Which of the following database roles does NOT provide data access permissions in Azure SQL Database?",
      "options": [
        "db_datareader",
        "db_ddladmin",
        "db_datawriter",
        "db_backupoperator"
      ],
      "correct": 3,
      "module": 2,
      "explanation": "db_backupoperator allows users to back up a database in SQL Server or SQL Managed Instance, but this role has no effect in Azure SQL Database because backup is managed automatically by the platform. It does not grant any data access."
    },
    {
      "id": "dp300-2-007",
      "text": "A stored procedure accesses tables in the Production schema using dynamic SQL with sp_executesql. The procedure owner matches the table owner. Does the user need direct SELECT permission on the Production schema tables?",
      "options": [
        "No, ownership chains allow the user to inherit access through the procedure",
        "Yes, dynamic SQL breaks ownership chains so the user needs direct permissions",
        "Only if the user is not a member of db_datareader",
        "No, stored procedures always bypass table permissions"
      ],
      "correct": 1,
      "module": 2,
      "explanation": "Dynamic SQL breaks ownership chains because the dynamic SQL executes outside the context of the calling stored procedure. The user must have direct table permissions on the objects accessed via dynamic SQL. This is a key exam distinction."
    },
    {
      "id": "dp300-2-008",
      "text": "Which master database role in Azure SQL Database allows a user to create new logins for the server?",
      "options": [
        "dbmanager",
        "loginmanager",
        "securityadmin",
        "dbcreator"
      ],
      "correct": 1,
      "module": 2,
      "explanation": "The loginmanager role in the virtual master database allows members to create logins for the database server. It is the equivalent of the securityadmin fixed server role in on-premises SQL Server. The dbmanager role allows creating databases."
    },
    {
      "id": "dp300-2-009",
      "text": "An application experiences a transient connection error to Azure SQL Database. What is the maximum expected duration of a typical transient fault?",
      "options": [
        "5 seconds",
        "60 seconds",
        "5 minutes",
        "30 minutes"
      ],
      "correct": 1,
      "module": 2,
      "explanation": "Transient faults during database reconfiguration typically take no longer than 60 seconds to complete. If connectivity errors persist longer than 60 seconds or occur more than once in a day, you should file an Azure support request."
    },
    {
      "id": "dp300-2-010",
      "text": "What is the recommended retry delay for the first retry attempt after a transient failure in Azure SQL Database?",
      "options": [
        "1 second",
        "5 seconds minimum",
        "30 seconds",
        "60 seconds maximum"
      ],
      "correct": 1,
      "module": 2,
      "explanation": "The recommended approach is to wait at least 5 seconds before the first retry, then increase the delay exponentially up to a maximum of 60 seconds. For SELECT failures, you should retry in a new connection rather than the same connection."
    },
    {
      "id": "dp300-2-011",
      "text": "At what level does Transparent Data Encryption (TDE) encrypt data in Azure SQL Database?",
      "options": [
        "Column level",
        "Table level",
        "Page level",
        "Row level"
      ],
      "correct": 2,
      "module": 2,
      "explanation": "TDE encrypts data at the page level. Data is encrypted as it is written to the data page on disk and decrypted when read into memory, resulting in all data pages on disk being encrypted. It does NOT encrypt at the column or table level."
    },
    {
      "id": "dp300-2-012",
      "text": "A database was created in Azure SQL Database in January 2017. Is TDE enabled by default?",
      "options": [
        "Yes, TDE is enabled by default for all Azure SQL databases",
        "No, TDE is only enabled by default for databases created after May 2017",
        "Yes, but only in the Business Critical tier",
        "No, TDE must always be manually enabled"
      ],
      "correct": 1,
      "module": 2,
      "explanation": "Databases created in Azure SQL Database after May 2017 have TDE enabled automatically. Databases created before that date need TDE to be manually enabled. For Azure SQL Managed Instance, the cutoff is February 2019."
    },
    {
      "id": "dp300-2-013",
      "text": "What happens when a customer-managed key used for TDE is removed from Azure Key Vault?",
      "options": [
        "The database continues to work but new writes are blocked",
        "Database connections are closed and access to the database is denied",
        "The database automatically falls back to a service-managed key",
        "TDE is disabled and data becomes unencrypted"
      ],
      "correct": 1,
      "module": 2,
      "explanation": "If the customer-managed key used as the TDE protector is removed from Azure Key Vault, the database closes all existing connections and denies new access. There is no automatic fallback to a service-managed key."
    },
    {
      "id": "dp300-2-014",
      "text": "Which type of Always Encrypted encryption allows equality comparisons, joins, grouping, and indexing?",
      "options": [
        "Randomized encryption",
        "Deterministic encryption",
        "Both types support these operations",
        "Neither type supports these operations"
      ],
      "correct": 1,
      "module": 2,
      "explanation": "Deterministic encryption always encodes the same value the same way, allowing for equality comparisons, joins, grouping, and indexing. Randomized encryption is more secure but only supports returning the column in results — it cannot be compared, joined, grouped, or indexed."
    },
    {
      "id": "dp300-2-015",
      "text": "What is the recommended location for generating Always Encrypted keys to ensure maximum security?",
      "options": [
        "On the SQL Server hosting the database",
        "In a third-party key store such as Azure Key Vault",
        "In the application code as configuration settings",
        "On the client machine using a PowerShell script"
      ],
      "correct": 1,
      "module": 2,
      "explanation": "For the highest level of security, the column master key should be stored in a third-party key store such as Azure Key Vault. Keys should NEVER be generated on the server hosting the database, as the key could be extracted from memory on that server."
    },
    {
      "id": "dp300-2-016",
      "text": "What is the primary purpose of secure enclaves in the context of Always Encrypted?",
      "options": [
        "To compress encrypted data for storage efficiency",
        "To enable pattern matching, comparison, and indexing on randomized encrypted columns",
        "To accelerate deterministic encryption by caching keys",
        "To replicate encrypted data across regions"
      ],
      "correct": 1,
      "module": 2,
      "explanation": "Secure enclaves create a trusted execution environment within SQL Server memory that can process encrypted data. This enables pattern matching, comparison operations, and indexing on columns using randomized encryption, overcoming the primary limitation of that encryption type."
    },
    {
      "id": "dp300-2-017",
      "text": "Which connection string setting must an application include to use Always Encrypted?",
      "options": [
        "TrustServerCertificate=True",
        "Column Encryption Setting=enabled",
        "ApplicationIntent=ReadOnly",
        "MultipleActiveResultSets=True"
      ],
      "correct": 1,
      "module": 2,
      "explanation": "The application's connection string needs `Column Encryption Setting=enabled` to enable Always Encrypted. This causes a metadata lookup for each column used by the application. To minimize metadata lookups, set SqlCommandColumnEncryptionSetting on individual query objects."
    },
    {
      "id": "dp300-2-018",
      "text": "You need to configure TLS encryption for a SQL Server instance. What happens if the SQL Server service account does not have permission to access the certificate?",
      "options": [
        "TLS is still enabled but a warning is logged",
        "Restarting the SQL Server service fails",
        "The certificate is automatically granted access",
        "SQL Server falls back to unencrypted connections"
      ],
      "correct": 1,
      "module": 2,
      "explanation": "If the SQL Server service account does not have the correct access permissions to the certificate, restarting the SQL Server service will fail. The certificate must be in the local computer certificate store or current user certificate store, and the service account must have access."
    },
    {
      "id": "dp300-2-019",
      "text": "Which tool must be used to install certificates for TLS encryption in SQL Server?",
      "options": [
        "SQL Server Management Studio",
        "SQL Server Configuration Manager with local administrator account",
        "Azure portal",
        "PowerShell with SQL Server module"
      ],
      "correct": 1,
      "module": 2,
      "explanation": "SQL Server Configuration Manager must be run with a local administrator account to install certificates for use by SQL Server. The certificate must be located in the local computer certificate store or current user certificate store."
    },
    {
      "id": "dp300-2-020",
      "text": "A company is using Azure Key Vault to store TDE certificates for SQL Server on Azure VM. Who has automatic access to the Key Vault?",
      "options": [
        "Subscription administrators",
        "Only users explicitly granted access through Key Vault's RBAC policies",
        "All Azure SQL administrators",
        "The SQL Server IaaS Agent Extension"
      ],
      "correct": 1,
      "module": 2,
      "explanation": "Azure Key Vault has its own RBAC policies separate from the Azure subscription. Someone who is a subscription admin does NOT automatically have access to the Key Vault unless explicitly granted. This is an important security separation."
    },
    {
      "id": "dp300-2-021",
      "text": "A DBA needs to configure a firewall rule that allows a specific IP address to connect to only one database on an Azure SQL Database server (blocking access to all other databases). Which approach should they use?",
      "options": [
        "Configure a server-level firewall rule in the Azure portal",
        "Configure a database-level firewall rule using sp_set_database_firewall_rule T-SQL",
        "Use the Allow Azure Services setting",
        "Configure a Virtual Network service endpoint"
      ],
      "correct": 1,
      "module": 2,
      "explanation": "Database-level firewall rules can restrict access so that a specific IP address can connect only to the database where the rule is configured. They are configured through T-SQL only using the `sp_set_database_firewall_rule` stored procedure from within the user database. Server-level rules, by contrast, apply to all databases on the server."
    },
    {
      "id": "dp300-2-022",
      "text": "In what order does Azure SQL Database check firewall rules when a connection attempt is made?",
      "options": [
        "Server-level rules first, then database-level rules",
        "Database-level rules first, then server-level rules",
        "Both levels are checked simultaneously",
        "Only the most restrictive rule is applied"
      ],
      "correct": 1,
      "module": 2,
      "explanation": "Azure SQL Database first checks for a database-level firewall rule corresponding to the database name in the connection string. If no such rule exists, it then checks server-level IP firewall rules. If a matching rule is found at either level, the connection is established."
    },
    {
      "id": "dp300-2-023",
      "text": "What is the scope of a Virtual Network service endpoint rule for Azure SQL Database?",
      "options": [
        "It applies at the database level",
        "It applies at the server level only",
        "It applies at the subscription level",
        "It applies at the resource group level"
      ],
      "correct": 1,
      "module": 2,
      "explanation": "Virtual Network service endpoint rules apply at the server level, not the database level. Additionally, the service endpoint applies to only one region, which is the underlying endpoint's region."
    },
    {
      "id": "dp300-2-024",
      "text": "Which feature allows Azure SQL Database connections to go entirely over the Azure backbone network without traversing the public internet?",
      "options": [
        "Virtual Network service endpoints",
        "Private Link with private endpoint",
        "Azure ExpressRoute",
        "Allow Azure Services firewall setting"
      ],
      "correct": 1,
      "module": 2,
      "explanation": "Private Link allows connections to Azure SQL Database using a private endpoint, keeping traffic entirely over the Azure backbone network and not the public internet. It provides a private IP address on your VNet and supports ExpressRoute connections."
    },
    {
      "id": "dp300-2-025",
      "text": "The 'Allow Azure Services and resources to access this server' firewall setting counts as how many firewall rules?",
      "options": [
        "Zero — it is not a firewall rule",
        "One — it counts as a single firewall rule",
        "One rule per Azure service",
        "One rule per database on the server"
      ],
      "correct": 1,
      "module": 2,
      "explanation": "The 'Allow Azure Services and resources to access this server' setting counts as a single firewall rule when enabled. This is a specific exam detail."
    },
    {
      "id": "dp300-2-026",
      "text": "How does the data classification engine in Azure SQL Database identify columns that might contain sensitive data?",
      "options": [
        "By analyzing the actual data values in the column",
        "By scanning column names for patterns suggesting sensitive information",
        "By checking the column data type",
        "By examining foreign key relationships"
      ],
      "correct": 1,
      "module": 2,
      "explanation": "The classification engine scans the database to identify columns with names suggesting they might contain sensitive information. For instance, a column named 'email' would be flagged. However, a column named 'column1' containing actual email addresses would NOT be auto-detected."
    },
    {
      "id": "dp300-2-027",
      "text": "Which T-SQL command is used to add sensitivity classification to a column?",
      "options": [
        "CREATE SENSITIVITY CLASSIFICATION",
        "ADD SENSITIVITY CLASSIFICATION",
        "ALTER TABLE ... ADD SENSITIVITY",
        "UPDATE SENSITIVITY CLASSIFICATION"
      ],
      "correct": 1,
      "module": 2,
      "explanation": "The T-SQL command is `ADD SENSITIVITY CLASSIFICATION TO ... WITH (LABEL='...', INFORMATION_TYPE='...')`. This stores the classification metadata in the sys.sensitivity_classifications catalog view."
    },
    {
      "id": "dp300-2-028",
      "text": "An administrator needs to configure a custom sensitivity label taxonomy for data classification in Azure SQL Database. What permission is required?",
      "options": [
        "SQL Server sysadmin role",
        "Administrative rights on the organization's root management group",
        "db_owner role on each database",
        "Subscription Owner role"
      ],
      "correct": 1,
      "module": 2,
      "explanation": "Only users with administrative rights on the organization's root management group can create and manage sensitivity labels. This is a higher permission than SQL Server or subscription roles."
    },
    {
      "id": "dp300-2-029",
      "text": "What is the recommended approach for configuring auditing in Azure SQL Database?",
      "options": [
        "Enable both server-level and database-level auditing for maximum coverage",
        "Enable only server-level auditing unless a specific database needs different settings",
        "Enable only database-level auditing for all databases",
        "Auditing is enabled by default and requires no configuration"
      ],
      "correct": 1,
      "module": 2,
      "explanation": "The best practice is to enable only server-level auditing and leave database-level auditing disabled for all databases. Database-level auditing should only be used when a different storage account, retention period, or Log Analytics Workspace is needed for a specific database."
    },
    {
      "id": "dp300-2-030",
      "text": "Which audit action groups are included in the default auditing policy for Azure SQL Database?",
      "options": [
        "BATCH_COMPLETED_GROUP only",
        "BATCH_COMPLETED_GROUP, SUCCESSFUL_DATABASE_AUTHENTICATION_GROUP, and FAILED_DATABASE_AUTHENTICATION_GROUP",
        "All action groups are included by default",
        "No action groups are configured by default"
      ],
      "correct": 1,
      "module": 2,
      "explanation": "The default auditing policy for SQL Database includes three action groups: BATCH_COMPLETED_GROUP (all queries and stored procedures), SUCCESSFUL_DATABASE_AUTHENTICATION_GROUP, and FAILED_DATABASE_AUTHENTICATION_GROUP."
    },
    {
      "id": "dp300-2-031",
      "text": "A user without UNMASK permission exports data from a table that has Dynamic Data Masking configured. What is the result?",
      "options": [
        "The export fails with a permission error",
        "The exported data file contains masked data",
        "The export succeeds but the imported database automatically removes masking",
        "Only unmasked columns are exported"
      ],
      "correct": 1,
      "module": 2,
      "explanation": "When a user without UNMASK privilege runs SQL Server Import and Export, the exported data file contains masked data. The imported database will contain inactively masked data. Also, SELECT INTO or INSERT INTO from a masked column copies masked data."
    },
    {
      "id": "dp300-2-032",
      "text": "Which Dynamic Data Masking function should be used to display a credit card number showing only the last four digits?",
      "options": [
        "default()",
        "email()",
        "partial(0,\"XXXX-XXXX-XXXX-\",4)",
        "random(1,12)"
      ],
      "correct": 2,
      "module": 2,
      "explanation": "The custom string masking function `partial(0,\"XXXX-XXXX-XXXX-\",4)` masks all but the final four characters, displaying in credit card format XXXX-XXXX-XXXX-1234. This is useful for customer service agents who need the last four digits."
    },
    {
      "id": "dp300-2-033",
      "text": "What type of RLS security policy prevents a user from updating rows to values that would violate the predicate?",
      "options": [
        "Filter predicate on UPDATE",
        "Block predicate with AFTER UPDATE",
        "Block predicate with BEFORE UPDATE",
        "Filter predicate on INSERT"
      ],
      "correct": 1,
      "module": 2,
      "explanation": "A block predicate with AFTER UPDATE prevents users from updating rows to values that violate the predicate. BEFORE UPDATE prevents users from updating rows that currently violate the predicate. Filter predicates on UPDATE prevent updating rows that violate the predicate altogether."
    },
    {
      "id": "dp300-2-034",
      "text": "What is a potential security risk when using Row-Level Security that involves specially crafted WHERE clauses?",
      "options": [
        "SQL injection attacks",
        "Side-channel attacks using divide-by-zero errors to infer data",
        "Denial of service through excessive predicate execution",
        "Privilege escalation through the security policy"
      ],
      "correct": 1,
      "module": 2,
      "explanation": "There is a risk of side-channel attacks where an attacker writes a query with a specially crafted WHERE clause and a divide-by-zero error to force an exception if the condition is true. It is wise to limit users' ability to run unplanned queries when using RLS."
    },
    {
      "id": "dp300-2-035",
      "text": "What is the recommended level for enabling Microsoft Defender for SQL to get vulnerability assessment recommendations?",
      "options": [
        "At the database level only",
        "At the subscription level",
        "At the resource group level",
        "At the server level only"
      ],
      "correct": 1,
      "module": 2,
      "explanation": "To see recommendations for SQL Database and SQL Managed Instance, you must enable Microsoft Defender for SQL at the subscription level (recommended). You also need to provide a storage account for scan results."
    },
    {
      "id": "dp300-2-036",
      "text": "Which Advanced Threat Protection alert is triggered when an attacker is actively attempting a SQL injection attack?",
      "options": [
        "Vulnerability to SQL injection",
        "Potential SQL injection",
        "Access from unusual location",
        "Brute force SQL credentials"
      ],
      "correct": 1,
      "module": 2,
      "explanation": "'Potential SQL injection' is triggered when an attacker is actively attempting to execute a SQL injection attack. 'Vulnerability to SQL injection' detects T-SQL code coming into the database that may be vulnerable to SQL injection attacks."
    },
    {
      "id": "dp300-2-037",
      "text": "Which Azure RBAC role is required to manage Microsoft Defender for SQL settings?",
      "options": [
        "Reader role only",
        "SQL security manager role, or database/server admin role",
        "Subscription Owner",
        "SQL DB Contributor"
      ],
      "correct": 1,
      "module": 2,
      "explanation": "To manage Microsoft Defender for SQL settings, you must belong to either the SQL security manager role, or one of the database or server admin roles. The SQL security manager role is designed specifically for this purpose."
    },
    {
      "id": "dp300-2-038",
      "text": "When can the Ledger feature be enabled for an Azure SQL Database?",
      "options": [
        "At any time using ALTER DATABASE",
        "Only during database creation",
        "Only for databases in the Business Critical tier",
        "Only for databases that already have TDE enabled"
      ],
      "correct": 1,
      "module": 2,
      "explanation": "Ledger can only be enabled during the database creation process. Once the database is created, you cannot modify the ledger setting. It is configured under the Security tab of the Create SQL Database page in the Azure portal."
    },
    {
      "id": "dp300-2-039",
      "text": "Which type of ledger table blocks UPDATE and DELETE operations at the API level?",
      "options": [
        "Updatable ledger tables",
        "Append-only ledger tables",
        "System-versioned ledger tables",
        "All ledger tables block UPDATE and DELETE"
      ],
      "correct": 1,
      "module": 2,
      "explanation": "Append-only ledger tables are designed for insert-only applications such as accounting systems or SIEM. They block all UPDATE and DELETE operations at the API level. Updatable ledger tables allow modifications and track history using a system-versioned history table."
    },
    {
      "id": "dp300-2-040",
      "text": "What cryptographic algorithm does Azure SQL Database Ledger use to hash transactions?",
      "options": [
        "MD5",
        "SHA-256",
        "AES-256",
        "RSA-2048"
      ],
      "correct": 1,
      "module": 2,
      "explanation": "Each transaction in the Ledger is cryptographically hashed using SHA-256. The function cryptographically links all transactions together, like a blockchain, making tampering evident."
    },
    {
      "id": "dp300-2-041",
      "text": "Which authentication method is NOT supported when using self-hosted integration runtime for Microsoft Purview scanning of Azure SQL Database?",
      "options": [
        "Service Principal",
        "SQL Authentication",
        "System-assigned managed identity",
        "User-assigned managed identity"
      ],
      "correct": 2,
      "module": 2,
      "explanation": "Both system-assigned and user-assigned managed identities cannot currently be used with a self-hosted integration runtime for Azure SQL. When using a self-hosted IR, you must use service principal authentication or SQL authentication."
    },
    {
      "id": "dp300-2-042",
      "text": "Which roles are required in Microsoft Purview to register a data source and manage it?",
      "options": [
        "Data Source Administrator only",
        "Data Reader only",
        "Data Source Administrator and Data Reader",
        "Collection Admin and Data Curator"
      ],
      "correct": 2,
      "module": 2,
      "explanation": "To register a source and manage it in the Microsoft Purview governance portal, you need to be both a Data Source Administrator and a Data Reader. These roles are specific to Purview's permission model."
    },
    {
      "id": "dp300-2-043",
      "text": "How often do Microsoft Purview lineage extraction scans run for Azure SQL Database by default?",
      "options": [
        "Every hour",
        "Every 6 hours",
        "Every 12 hours",
        "Every 24 hours"
      ],
      "correct": 1,
      "module": 2,
      "explanation": "Once a scan with lineage extraction is successfully set up, a new scan type called 'Lineage extraction' runs incremental scans every 6 hours to extract lineage from Azure SQL Database. Lineage is extracted based on actual stored procedure runs."
    },
    {
      "id": "dp300-2-044",
      "text": "What is the recommended action if an application encounters connectivity errors to Azure SQL Database for longer than 60 seconds?",
      "options": [
        "Retry indefinitely with shorter intervals",
        "File an Azure support request through the Azure portal",
        "Restart the application server",
        "Rebuild the database connection pool"
      ],
      "correct": 1,
      "module": 2,
      "explanation": "If connectivity errors persist for longer than 60 seconds or occur more than once in a given day, you should file an Azure support request through the Azure portal. Transient faults typically resolve within 60 seconds."
    },
    {
      "id": "dp300-2-045",
      "text": "A reporting application only needs to run three specific stored procedures against the Sales tables and never issues ad hoc queries. Following the principle of least privilege, what should the application's database login be granted?",
      "options": [
        "EXECUTE permission on only the three stored procedures the application needs, with no direct table access",
        "Membership in the db_datareader role",
        "Membership in the db_owner role",
        "SELECT permission on every table in the Sales schema"
      ],
      "correct": 0,
      "module": 2,
      "explanation": "Least privilege means granting only what is required to complete the task. Since the application only needs to run three procedures, EXECUTE on those procedures alone is sufficient — if the procedure owner matches the table owner, ownership chaining lets the procedure read the tables without the application needing any direct table permissions. db_datareader, db_owner, and schema-wide SELECT are all broader than necessary."
    },
    {
      "id": "dp300-2-046",
      "text": "A security review finds that an application login was added to db_owner solely so it could execute five stored procedures that are owned by the same schema owner as the tables they access. Which changes would enforce least privilege while preserving functionality? (Select all that apply)",
      "type": "multi",
      "options": [
        "Remove the login from db_owner and grant EXECUTE only on the five stored procedures",
        "Rely on ownership chaining so the login inherits table access through the procedures without any direct table grants",
        "Grant db_datareader and db_datawriter instead of db_owner",
        "Grant SELECT, INSERT, UPDATE, DELETE directly on every underlying table in addition to EXECUTE"
      ],
      "correct": [
        0,
        1
      ],
      "module": 2,
      "explanation": "Because the procedures and tables share the same owner, ownership chaining lets a user with only EXECUTE permission run the procedures and have them access the tables, without any standing table-level rights. Removing db_owner and granting only EXECUTE achieves least privilege. Granting db_datareader/db_datawriter or direct table permissions is unnecessary and broader than required, since the ownership chain already provides the needed access."
    },
    {
      "id": "dp300-2-047",
      "text": "True or False: Ownership chaining allows a stored procedure to access underlying tables through the caller's inherited permissions even when the procedure uses dynamic SQL (sp_executesql) to build and execute the query.",
      "type": "truefalse",
      "options": [
        "True",
        "False"
      ],
      "correct": 1,
      "module": 2,
      "explanation": "False. Dynamic SQL executes outside the calling procedure's context, which breaks the ownership chain. When dynamic SQL is used, the executing user's own permissions are checked against the underlying tables, so the user must be granted direct access rather than relying on the chain."
    },
    {
      "id": "dp300-2-048",
      "text": "A specific SQL login can no longer connect to a Managed Instance, and the client receives 'Login failed for user <name>'. Querying sys.sql_logins shows is_disabled = 1 for that login. What should the DBA do first to restore access?",
      "options": [
        "Run ALTER LOGIN <name> ENABLE;",
        "Drop and recreate the login with a new password",
        "Restart the SQL Server or Managed Instance service",
        "Grant the login membership in sysadmin"
      ],
      "correct": 0,
      "module": 2,
      "explanation": "The standard troubleshooting sequence for 'Login failed for user' starts by checking sys.sql_logins to see whether the login is disabled. If it is, ALTER LOGIN <name> ENABLE; re-enables it. Dropping and recreating the login, restarting the service, or granting sysadmin are unnecessary and don't address the actual cause."
    },
    {
      "id": "dp300-2-049",
      "text": "After restoring an on-premises database backup to a different SQL Server instance, users can connect to the server but receive permission errors inside the restored database, even though their user accounts still appear in sys.database_principals. What is the most likely cause?",
      "options": [
        "The database users are orphaned because their SIDs no longer match any server login SIDs on the new instance",
        "The Transparent Data Encryption certificate is missing on the new instance",
        "The database is still in single-user restore mode",
        "A server-level firewall rule is blocking the connection"
      ],
      "correct": 0,
      "module": 2,
      "explanation": "Restoring a database to a different instance commonly leaves database users 'orphaned': the user's SID stored in the database no longer matches the SID of any login on the new server, so authentication to the server succeeds but authorization inside the database fails. This is fixed by remapping the user to a login (e.g., ALTER USER ... WITH LOGIN = or sp_change_users_login), not by TDE, restore mode, or firewall changes."
    },
    {
      "id": "dp300-2-050",
      "text": "True or False: A contained database user created with CREATE USER [name] FROM EXTERNAL PROVIDER for a Microsoft Entra identity requires a matching server-level login to exist in the master database before it can authenticate.",
      "type": "truefalse",
      "options": [
        "True",
        "False"
      ],
      "correct": 1,
      "module": 2,
      "explanation": "False. This is exactly the contained-user pattern: the Microsoft Entra identity itself is the authentication source, so no separate server-level login is required in master. This differs from the traditional SQL login pattern, where a login must be created in master first and then mapped to a database user."
    },
    {
      "id": "dp300-2-051",
      "text": "Which stored procedure enables Change Data Capture (CDC) at the database level in SQL Server?",
      "options": [
        "EXEC sys.sp_cdc_enable_db",
        "EXEC sys.sp_cdc_enable_table",
        "ALTER DATABASE <db> SET CHANGE_TRACKING = ON",
        "EXEC sp_configure 'cdc', 1"
      ],
      "correct": 0,
      "module": 2,
      "explanation": "sys.sp_cdc_enable_db enables Change Data Capture for a database. Once enabled at the database level, individual tables are enabled with sys.sp_cdc_enable_table. ALTER DATABASE ... SET CHANGE_TRACKING = ON instead enables the separate Change Tracking feature."
    },
    {
      "id": "dp300-2-052",
      "text": "What is a key difference between Change Data Capture (CDC) and Change Tracking in SQL Server?",
      "options": [
        "CDC captures the actual historical column values of each change using an asynchronous process that reads the transaction log, while Change Tracking only records synchronously that a row changed and its current state",
        "Change Tracking requires SQL Server Agent while CDC does not",
        "CDC is available in every edition of SQL Server while Change Tracking requires Enterprise edition",
        "CDC and Change Tracking are two names for the same feature"
      ],
      "correct": 0,
      "module": 2,
      "explanation": "CDC asynchronously reads the transaction log via capture jobs and stores the actual before/after data values of changes in change tables. Change Tracking is lightweight and synchronous, recording only that a row changed (and its current version), not the historical values — it does not use SQL Server Agent the way CDC does."
    },
    {
      "id": "dp300-2-053",
      "text": "Which of the following are true about Change Data Capture (CDC) in SQL Server? (Select all that apply)",
      "type": "multi",
      "options": [
        "CDC relies on SQL Server Agent jobs to asynchronously capture changes from the transaction log and periodically clean up change tables",
        "CDC records the actual before/after column values for each DML change in dedicated change tables",
        "A table must be individually enabled for CDC with sys.sp_cdc_enable_table after the database itself has been enabled with sys.sp_cdc_enable_db",
        "CDC is enabled on a table using ALTER TABLE ... ENABLE CHANGE_TRACKING"
      ],
      "correct": [
        0,
        1,
        2
      ],
      "module": 2,
      "explanation": "CDC uses SQL Server Agent capture and cleanup jobs, stores actual column values of each change in change tables, and must be enabled first at the database level (sys.sp_cdc_enable_db) and then per table (sys.sp_cdc_enable_table). ALTER TABLE ... ENABLE CHANGE_TRACKING is the syntax for the separate Change Tracking feature, not CDC."
    },
    {
      "id": "dp300-2-054",
      "text": "A DBA runs EXECUTE AS USER = 'AppUser' to test that user's permissions in a session. Which command returns the session to its original execution context?",
      "options": [
        "REVERT",
        "EXECUTE AS CALLER",
        "ALTER LOGIN ... WITH PASSWORD",
        "sp_change_users_login"
      ],
      "correct": 0,
      "module": 2,
      "explanation": "REVERT switches the session's execution context back to what it was before the most recent EXECUTE AS statement. EXECUTE AS CALLER is not valid T-SQL syntax for this purpose, ALTER LOGIN changes login properties, and sp_change_users_login remaps orphaned users."
    },
    {
      "id": "dp300-2-055",
      "text": "Which of the following, by themselves, give a principal the ability to connect to and query data in an Azure SQL Database? (Select all that apply)",
      "type": "multi",
      "options": [
        "The SQL DB Contributor RBAC role",
        "Membership in the db_datareader database role",
        "The SQL Security Manager RBAC role",
        "Being configured as the Microsoft Entra admin for the logical server"
      ],
      "correct": [
        1,
        3
      ],
      "module": 2,
      "explanation": "db_datareader grants read access to data within the database, and the Microsoft Entra admin effectively receives sysadmin-equivalent access across the server and every database it hosts. SQL DB Contributor and SQL Security Manager are Azure RBAC (control-plane) roles that let a principal manage databases or security policy settings but grant no ability to connect to or read data."
    },
    {
      "id": "dp300-2-056",
      "text": "True or False: If a database user has no default schema explicitly assigned, unqualified object references for that user resolve against the dbo schema.",
      "type": "truefalse",
      "options": [
        "True",
        "False"
      ],
      "correct": 0,
      "module": 2,
      "explanation": "True. An unqualified reference is resolved first against the user's default schema; if a user has no default schema assigned, it defaults to dbo, and the reference is then resolved against dbo."
    },
    {
      "id": "dp300-2-057",
      "text": "What database-level setting must be enabled to allow contained database users, and what is its default state in Azure SQL Database?",
      "options": [
        "Partial containment, which is enabled by default in Azure SQL Database",
        "Full containment, which must be manually enabled in Azure SQL Database",
        "Partial containment, which is disabled by default in Azure SQL Database and must be turned on",
        "No special database setting is required"
      ],
      "correct": 0,
      "module": 2,
      "explanation": "Contained users require the database to be configured for partial containment. This is enabled by default in Azure SQL Database, while it is optional (and must be manually enabled) in on-premises SQL Server."
    },
    {
      "id": "dp300-2-058",
      "text": "A Microsoft Purview scan with lineage extraction enabled for an Azure SQL Database source is not returning any lineage derived from stored procedure runs. The Purview managed identity has already been created as a database user with CREATE USER ... FROM EXTERNAL PROVIDER. What additional step is required?",
      "options": [
        "Add the Purview managed identity to the db_owner role and create a master key in the target database",
        "Enable Transparent Data Encryption on the database",
        "Enable Change Tracking on the tables being scanned",
        "Switch the scan authentication method to SQL authentication"
      ],
      "correct": 0,
      "module": 2,
      "explanation": "Lineage extraction specifically requires the Purview managed identity to be added to db_owner (via sp_addrolemember) and a master key to be created in the target database (CREATE MASTER KEY), in addition to the external-provider user. TDE, Change Tracking, and the scan authentication method are unrelated to enabling lineage extraction."
    },
    {
      "id": "dp300-2-059",
      "text": "Which statement correctly distinguishes a Virtual Network (VNet) service endpoint from Private Link for Azure SQL Database?",
      "options": [
        "A VNet service endpoint adds a server-level firewall rule and is scoped to a single Azure region, while Private Link provides a private endpoint that routes traffic over the Azure backbone and supports cross-region connectivity",
        "A VNet service endpoint and Private Link are functionally identical, differing only in name",
        "Private Link operates at the database level while VNet service endpoints operate at the schema level",
        "VNet service endpoints remove the public IP path entirely, while Private Link still relies on the public IP"
      ],
      "correct": 0,
      "module": 2,
      "explanation": "VNet service endpoints add a server-level (not database-level) firewall rule and are bound to a single Azure region matching the endpoint. Private Link instead provisions a private endpoint so traffic travels entirely over the Azure backbone network rather than the public internet, and it supports cross-region private connectivity as well as ExpressRoute."
    },
    {
      "id": "dp300-2-060",
      "text": "True or False: Server-level firewall rules for Azure SQL Database can be configured through the Azure portal, while database-level firewall rules can only be configured using T-SQL (sp_set_database_firewall_rule).",
      "type": "truefalse",
      "options": [
        "True",
        "False"
      ],
      "correct": 0,
      "module": 2,
      "explanation": "True. Server-level firewall rules can be set via the Azure portal or sp_set_firewall_rule in master, but database-level firewall rules can only be configured with T-SQL, using sp_set_database_firewall_rule executed from within the target user database."
    },
    {
      "id": "dp300-2-061",
      "text": "Which of the following are valid enforcement points for a Row-Level Security block predicate? (Select all that apply)",
      "type": "multi",
      "options": [
        "AFTER INSERT",
        "AFTER UPDATE",
        "BEFORE UPDATE",
        "BEFORE DELETE",
        "AFTER DELETE"
      ],
      "correct": [
        0,
        1,
        2,
        3
      ],
      "module": 2,
      "explanation": "Block predicates are evaluated at four points: AFTER INSERT (blocks inserting rows that violate the predicate), AFTER UPDATE (blocks updating rows to violate it), BEFORE UPDATE (blocks updating rows that already violate it), and BEFORE DELETE (blocks deleting rows that violate it). There is no AFTER DELETE block predicate type."
    },
    {
      "id": "dp300-2-062",
      "text": "A DBA is deciding who to add to the db_securityadmin database role. Why should membership in this role be restricted to trusted users?",
      "options": [
        "Members can grant permissions to other users, including themselves, effectively allowing self-escalation of privileges",
        "Members can restore database backups without any additional permissions",
        "Members automatically gain the sysadmin fixed server role",
        "Membership has no meaningful security implications since it only manages roles"
      ],
      "correct": 0,
      "module": 2,
      "explanation": "db_securityadmin can grant access to other users, including granting permissions to themselves, which is effectively a path to privilege escalation. This is why, along with db_owner, membership should be restricted to trusted users. It does not grant backup rights or automatic sysadmin."
    },
    {
      "id": "dp300-2-063",
      "text": "What must be provided as part of enabling the Ledger feature when creating a new Azure SQL Database?",
      "options": [
        "A storage location for the ledger's cryptographic database digests",
        "A customer-managed TDE key in Azure Key Vault",
        "A Key Vault access policy granting db_owner UNMASK rights",
        "A SQL Server Agent job schedule for digest generation"
      ],
      "correct": 0,
      "module": 2,
      "explanation": "Enabling Ledger requires specifying a storage location for the database digests — the cryptographic proofs used to verify that data hasn't been tampered with. A customer-managed TDE key, Key Vault UNMASK policy, and Agent job schedule are unrelated requirements."
    }
  ];

  if (typeof window.__dp300 === 'undefined') {
    window.__dp300 = { modules: [], questions: [] };
  }

  window.__dp300.questions = window.__dp300.questions.concat(questions);

  if (window.__dp300.modules.length < 2) {
    window.__dp300.modules[1] = "Skill 2: Implement a secure environment";
  }
})();
