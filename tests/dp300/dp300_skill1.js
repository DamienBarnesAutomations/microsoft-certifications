// Skill Area 1: Plan and implement data platform resources
(function() {
  var questions = [
    {
      "text": "A company is migrating a legacy application that requires SQL Server 2016 with SSIS and SSRS on the same machine. Which Azure SQL deployment option should they choose?",
      "options": [
        "Azure SQL Database",
        "Azure SQL Managed Instance",
        "SQL Server on Azure VM",
        "Azure Synapse Analytics"
      ],
      "correct": 2,
      "module": 1,
      "explanation": "SQL Server on Azure VM (IaaS) provides full control over the OS and SQL Server, allowing older SQL versions and additional services like SSIS, SSRS, and SSAS on the same machine. SQL Database and Managed Instance are PaaS options that do not support SSRS/SSAS on the same service."
    },
    {
      "text": "Which of the following is a benefit of Azure SQL Managed Instance over Azure SQL Database?",
      "options": [
        "Support for elastic pools",
        "Support for the Hyperscale service tier",
        "Support for SQL Agent and cross-database queries",
        "Support for the DTU purchasing model"
      ],
      "correct": 2,
      "module": 1,
      "explanation": "SQL Managed Instance supports instance-scoped features like SQL Agent, CLR, cross-database queries, and Service Broker. SQL Database does not support these natively and requires alternatives like elastic jobs. Both Hyperscale and DTU model are not supported on Managed Instance, and elastic pools are a SQL Database feature."
    },
    {
      "text": "A customer needs a fully managed PaaS SQL solution with near 100% compatibility with on-premises SQL Server for a lift-and-shift migration. Which service should they choose?",
      "options": [
        "Azure SQL Database",
        "Azure SQL Managed Instance",
        "SQL Server on Azure VM",
        "Azure SQL Edge"
      ],
      "correct": 1,
      "module": 1,
      "explanation": "Azure SQL Managed Instance offers near 100% compatibility with on-premises SQL Server, making it ideal for lift-and-shift migrations without application changes. SQL Database is only about 95% compatible and may require app modifications."
    },
    {
      "text": "What is the primary purpose of the SQL Server IaaS Agent Extension?",
      "options": [
        "To provide a graphical interface for running queries",
        "To automate backups, patching, and Key Vault integration for SQL Server on Azure VMs",
        "To migrate on-premises databases to Azure SQL Database",
        "To configure Always On Availability Groups automatically"
      ],
      "correct": 1,
      "module": 1,
      "explanation": "The SQL Server IaaS Agent Extension provides automated backup, patching, Azure Key Vault integration, Defender for Cloud integration, and disk utilization views. It is automatically installed when deploying from the Azure Marketplace and also enables flexible licensing toggling between PAYG and BYOL."
    },
    {
      "text": "An organization has existing SQL Server licenses with active Software Assurance. Which option provides the most cost savings when deploying SQL Server on Azure?",
      "options": [
        "Pay-as-you-go (PAYG)",
        "Reserved Instances only",
        "Azure Hybrid Benefit (AHB) with or without Reserved Instances",
        "Bring Your Own License (BYOL) without AHB"
      ],
      "correct": 2,
      "module": 1,
      "explanation": "Azure Hybrid Benefit (AHB) allows organizations with Software Assurance to use their existing SQL Server licenses in Azure, reducing costs. AHB can be combined with Reserved Instances for maximum savings. PAYG is the most expensive option. BYOL without AHB doesn't leverage the license portability benefit properly."
    },
    {
      "text": "How does the Azure Hybrid Benefit (AHB) map licensing from on-premises to Azure for SQL Server?",
      "options": [
        "1 Enterprise core = 1 vCore in any service tier",
        "1 Enterprise core = 1 vCore in Business Critical or 4 vCores in General Purpose",
        "1 Standard core = 4 vCores in any tier",
        "Licensing is per database, not per core"
      ],
      "correct": 1,
      "module": 1,
      "explanation": "AHB mapping: 1 Enterprise Agreement (EA) core = 1 vCore in Business Critical, or 4 EA cores = 1 vCore in Business Critical (4:1 ratio actually is 1 EA core = 1 vCore Business Critical, or 1 Standard core = 1 vCore General Purpose). The correct mapping is: 1 Enterprise core with SA = 1 vCore in Business Critical, or = 4 vCores in General Purpose."
    },
    {
      "text": "Which SLA does SQL Server on Azure VM achieve when deployed across Availability Zones?",
      "options": [
        "99.9%",
        "99.95%",
        "99.99%",
        "99.999%"
      ],
      "correct": 2,
      "module": 1,
      "explanation": "Deploying SQL Server on Azure VMs across Availability Zones provides a 99.99% SLA. Availability Sets provide 99.95%. Availability Zones span separate datacenters within a region, while Availability Sets spread VMs across different racks in the same datacenter."
    },
    {
      "text": "Which of the following is NOT supported by Azure SQL Database but IS supported by Azure SQL Managed Instance?",
      "options": [
        "Automated backups",
        "T-SQL RESTORE command",
        "High availability",
        "Active Directory authentication"
      ],
      "correct": 1,
      "module": 1,
      "explanation": "T-SQL RESTORE is supported only by SQL Managed Instance. SQL Database uses portal, PowerShell, CLI, or REST API for restore operations. Both services support automated backups, high availability, and Active Directory authentication."
    },
    {
      "text": "A company is designing a new cloud-native application with unpredictable usage patterns. They want to minimize costs by having the database automatically pause when idle. Which Azure SQL option should they choose?",
      "options": [
        "SQL Server on Azure VM with auto-shutdown",
        "Azure SQL Database in serverless tier on General Purpose",
        "Azure SQL Managed Instance with auto-pause",
        "Azure SQL Database in Hyperscale serverless tier"
      ],
      "correct": 1,
      "module": 1,
      "explanation": "Azure SQL Database serverless tier in General Purpose supports autopause (1 hour to 7 days delay), billing only for storage when paused. SQL Managed Instance does not support serverless. Hyperscale serverless exists but does not support auto-pause. VM auto-shutdown is not equivalent."
    },
    {
      "text": "What is the unit of failover for an Always On Availability Group compared to a Failover Cluster Instance?",
      "options": [
        "AG = entire instance, FCI = database group",
        "AG = database group, FCI = entire instance",
        "Both fail over at the database level",
        "Both fail over at the instance level"
      ],
      "correct": 1,
      "module": 1,
      "explanation": "Always On Availability Groups fail over at the database group level — select groups of databases fail over together. Failover Cluster Instance (FCI) fails over the entire SQL Server instance. This distinction is important for high availability planning."
    },
    {
      "text": "You are deploying SQL Server on an Azure VM with Premium SSD storage. What is the recommended storage configuration for data files?",
      "options": [
        "Place data and log files on the same disk for simplicity",
        "Use a separate pool for data files with read-caching enabled",
        "Place data files on the OS disk for fastest access",
        "Use Standard HDD for data and Premium SSD for logs"
      ],
      "correct": 1,
      "module": 1,
      "explanation": "Data files should be on a separate Premium SSD or Ultra Disk pool with read-caching enabled. Log files should be on a separate pool with NO read-caching. The OS disk should have no database files. Standard HDD is too slow for production data files."
    },
    {
      "text": "Which type of storage is MOST suitable for SQL Server TempDB on an Azure VM?",
      "options": [
        "The temporary disk (D:\\) for lowest latency",
        "A Premium SSD pool shared with data files",
        "Azure Ultra Disk with read-caching",
        "Standard SSD on a separate pool"
      ],
      "correct": 0,
      "module": 1,
      "explanation": "The temporary disk (D:\\) provides the lowest latency and is ideal for TempDB. However, it is NOT durable — data is lost on VM reboot or maintenance. For production, you may also use a dedicated Premium SSD pool. The key is that TempDB benefits from low latency."
    },
    {
      "text": "You need to achieve the highest possible storage latency for SQL Server transaction log files on an Azure VM. Which storage option should you use?",
      "options": [
        "Premium SSD with read-caching enabled",
        "Ultra Disk with no read-caching",
        "Standard SSD",
        "Temporary disk (D:\\)"
      ],
      "correct": 1,
      "module": 1,
      "explanation": "Ultra Disk provides sub-millisecond latency (1-2ms real-world) and is the best choice for transaction log files. Premium SSD provides 5-10ms latency. The temporary disk is not durable. Log files should use no cache, eliminating read-caching options."
    },
    {
      "text": "A company has a SQL Server on Azure VM that needs automated backup scheduling and retention management. How should this be configured?",
      "options": [
        "Configure a backup job in SQL Server Agent on the VM",
        "Use the SQL Server IaaS Agent Extension automated backup feature",
        "Create a PowerShell script with a scheduled task in Windows",
        "Use Azure Backup for SQL Server on Azure VMs"
      ],
      "correct": 1,
      "module": 1,
      "explanation": "The SQL Server IaaS Agent Extension provides an automated backup feature that configures scheduling and retention through the Azure portal or API. This is the recommended approach and is automatically available when deploying from Marketplace images. While Azure Backup also works, the Agent Extension is purpose-built and simpler."
    },
    {
      "text": "Which of the following is a limitation of using Azure Site Recovery (ASR) for SQL Server disaster recovery?",
      "options": [
        "ASR does not support SQL Server workloads",
        "ASR has higher RPO potential and may cause data loss",
        "ASR requires a third-party tool",
        "ASR only works within the same region"
      ],
      "correct": 1,
      "module": 1,
      "explanation": "Azure Site Recovery for SQL Server typically results in higher RPO (potential data loss) because it replicates at the VM/disk level, not the database transaction level. It is not recommended for transactional databases without supplementary measures like log shipping or Always On AG."
    },
    {
      "text": "You need to estimate the space savings before implementing page compression on a large SQL Server table. Which command should you use?",
      "options": [
        "sp_spaceused",
        "sp_estimate_data_compression_savings",
        "DBCC SHOW_STATISTICS",
        "sys.dm_db_partition_stats"
      ],
      "correct": 1,
      "module": 1,
      "explanation": "sp_estimate_data_compression_savings estimates the space savings for a table or index if you change the compression setting. It shows the current and requested compression sizes. sp_spaceused shows current size only. The DMV and DBCC commands don't estimate compression benefits."
    },
    {
      "text": "What is the purpose of using Storage Spaces to pool disks for SQL Server on Azure VMs?",
      "options": [
        "To create a single volume larger than 4 TB",
        "To increase IOPS and throughput by striping across multiple disks",
        "To enable read-caching on all disks",
        "To reduce the number of managed disks billed"
      ],
      "correct": 1,
      "module": 1,
      "explanation": "Storage Spaces pools multiple Azure disks together and stripes data across them, increasing the total IOPS and throughput available to SQL Server. This is essential for production workloads that need more I/O capacity than a single disk can provide."
    },
    {
      "text": "Which Always On Availability Group replication mode requires the lowest latency between replicas?",
      "options": [
        "Asynchronous commit",
        "Synchronous commit",
        "Automatic seeding",
        "Manual seeding"
      ],
      "correct": 1,
      "module": 1,
      "explanation": "Synchronous commit requires the transaction to be hardened on both the primary and secondary replica before committing, which means low latency is essential. Asynchronous commit does not wait for the secondary and can tolerate higher latency. Synchronous should only be used within the same region."
    },
    {
      "text": "A SQL Server on Azure VM must support cross-region disaster recovery with minimal data loss. Which solution is MOST appropriate?",
      "options": [
        "Failover Cluster Instance (FCI)",
        "Always On Availability Group with asynchronous commit across regions",
        "Always On Availability Group with synchronous commit across regions",
        "Availability Set"
      ],
      "correct": 1,
      "module": 1,
      "explanation": "FCI and Availability Sets provide HA within a single region only, not DR. Synchronous commit across regions would have unacceptable latency. Asynchronous commit across regions provides a balance of data protection and performance for cross-region DR scenarios."
    },
    {
      "text": "Which of the following is a proper use of the temporary disk (D:\\) on a SQL Server Azure VM?",
      "options": [
        "Storing database transaction logs",
        "Storing user database data files",
        "Storing TempDB files",
        "Storing backup files"
      ],
      "correct": 2,
      "module": 1,
      "explanation": "The temporary disk (D:\\) on Azure VMs is ephemeral and not durable — data is lost during VM reboots or maintenance events. It is suitable only for TempDB and page files. Never place user databases, transaction logs, or backups on the temporary disk."
    },
    {
      "text": "A company has multiple databases with small, intermittent workloads. They want to minimize costs by sharing resources. Which deployment option should they use?",
      "options": [
        "Multiple single databases in the Hyperscale tier",
        "An elastic pool with vCore or DTU purchasing",
        "Multiple SQL Managed Instances",
        "SQL Server on Azure VM with multiple instances"
      ],
      "correct": 1,
      "module": 1,
      "explanation": "Elastic pools allow multiple databases to share a pool of resources (vCore or DTU), which is cost-effective for databases with low average utilization. Single databases have dedicated resources that may be underutilized. Managed Instances do not support elastic pools."
    },
    {
      "text": "Which purchasing model decouples compute from storage in Azure SQL Database?",
      "options": [
        "DTU model",
        "vCore model",
        "Serverless model",
        "Provisioned model"
      ],
      "correct": 1,
      "module": 1,
      "explanation": "The vCore model decouples compute and storage, allowing you to scale them independently. The DTU model bundles compute and storage together. Serverless and Provisioned are deployment options within the vCore model."
    },
    {
      "text": "What is the maximum storage size available in the Azure SQL Database Hyperscale service tier?",
      "options": [
        "4 TB",
        "16 TB",
        "100 TB",
        "Unlimited with auto-grow"
      ],
      "correct": 2,
      "module": 1,
      "explanation": "Hyperscale supports up to 100 TB of data with auto-growing storage. The 4 TB limit applies to General Purpose and Business Critical tiers. While storage technically auto-grows with no hard cap, the documented max is 100 TB."
    },
    {
      "text": "A development team needs to restore an Azure SQL Database to a specific point in time within the last 14 days. What is the minimum backup retention period they must configure?",
      "options": [
        "7 days (default)",
        "14 days",
        "35 days",
        "It depends on the service tier"
      ],
      "correct": 1,
      "module": 1,
      "explanation": "For both vCore and DTU (Standard/Premium) Azure SQL Database, backup retention is configurable from 1 to 35 days (default is 7 days). To recover to a point 14 days ago, they must configure retention to at least 14 days. Basic tier in the DTU model has a fixed retention of 7 days."
    },
    {
      "text": "Which of the following backup types is NOT available for Azure SQL Database?",
      "options": [
        "Full (weekly) automated backup",
        "Differential (12-hourly) automated backup",
        "Manual COPY_ONLY backup to URL",
        "Log backups every 5-10 minutes"
      ],
      "correct": 2,
      "module": 1,
      "explanation": "Azure SQL Database does NOT support manual COPY_ONLY backups. Only SQL Managed Instance supports COPY_ONLY backups to URL. SQL Database automated backups include full (weekly), differential (12h), and log (5-10 min) backups."
    },
    {
      "text": "You need to query data across multiple Azure SQL Databases in different regions using T-SQL. Which feature should you use?",
      "options": [
        "Linked servers",
        "Elastic query",
        "Cross-database queries (three-part names)",
        "SQL Server Integration Services"
      ],
      "correct": 1,
      "module": 1,
      "explanation": "Elastic query allows you to run T-SQL queries across multiple Azure SQL databases using three/four-part names. It supports vertical and horizontal partitioning (sharding). Native cross-database queries are not supported in SQL Database — that is a Managed Instance feature."
    },
    {
      "text": "What happens when you fail over an Azure SQL Database geo-replication group to the secondary region?",
      "options": [
        "The connection string must be updated in the application",
        "The read-write and read-only listener endpoints remain the same, so no connection string change is needed",
        "The secondary database must be renamed",
        "The primary database is automatically deleted"
      ],
      "correct": 1,
      "module": 1,
      "explanation": "Failover groups provide read-write and read-only listener endpoints that remain constant after failover. Applications do not need to change their connection strings. This is a key advantage over geo-replication, which requires manual endpoint updates."
    },
    {
      "text": "Which statement about the Hyperscale service tier in Azure SQL Database is correct?",
      "options": [
        "Once created in Hyperscale, you can change to General Purpose later",
        "Hyperscale uses file snapshot backups for instant backup regardless of data size",
        "Hyperscale supports the DTU purchasing model",
        "Hyperscale has a maximum storage of 4 TB"
      ],
      "correct": 1,
      "module": 1,
      "explanation": "Hyperscale uses file snapshots for backups, making backups and restores fast regardless of data size. Once converted to Hyperscale, you CANNOT revert to a standard service tier. Hyperscale supports up to 100 TB and uses the vCore model only."
    },
    {
      "text": "When scaling an Azure SQL Database to a higher service tier, what should the application expect?",
      "options": [
        "No interruption to existing connections",
        "A brief connection interruption requiring retry logic",
        "The database remains in read-only mode for 30 minutes",
        "All existing connections are preserved but queries are queued"
      ],
      "correct": 1,
      "module": 1,
      "explanation": "Scaling operations end with a brief connection interruption while the database transitions to the new tier. Applications must implement retry logic to handle these transient disconnections. The recommended retry pattern is: first retry after 5s, exponential backoff to 60s max."
    },
    {
      "text": "What does Azure SQL Database automatic tuning do when it identifies a missing index opportunity?",
      "options": [
        "Immediately creates the index on the production database",
        "Tests the index on a database copy first before applying to production",
        "Sends an email recommendation to the DBA",
        "Creates the index only during the maintenance window"
      ],
      "correct": 1,
      "module": 1,
      "explanation": "Automatic tuning creates potential indexes on a database copy first to verify performance benefits before applying to the production database. It can also drop unused/duplicate indexes and force the last good execution plan. It uses ML-based analysis to identify opportunities."
    },
    {
      "text": "An organization needs to migrate an application that uses SQL Server Agent jobs and cross-database queries to Azure with minimal changes. Which target should they choose?",
      "options": [
        "Azure SQL Database with elastic jobs",
        "Azure SQL Managed Instance",
        "SQL Server on Azure VM",
        "Azure SQL Database with elastic query"
      ],
      "correct": 1,
      "module": 1,
      "explanation": "SQL Managed Instance supports SQL Agent natively, cross-database queries, CLR, and Service Broker — all features needed by this application. SQL Database would require elastic jobs (replacing Agent) and elastic query (for cross-DB queries), which are workarounds, not native support."
    },
    {
      "text": "Which port must be opened on the network security group to enable public endpoint connectivity to Azure SQL Managed Instance?",
      "options": [
        "1433",
        "3342",
        "3389",
        "443"
      ],
      "correct": 1,
      "module": 1,
      "explanation": "The public endpoint for SQL Managed Instance uses port 3342 (not the standard SQL port 1433). Enabling the public endpoint requires a PowerShell command from the DBA and opening port 3342 on the NSG by the NetAdmin, enforcing separation of duties."
    },
    {
      "text": "What technology does the Managed Instance Link use to replicate data between on-premises SQL Server and Azure SQL Managed Instance?",
      "options": [
        "Log shipping",
        "Transactional replication",
        "Distributed Availability Groups (DAG)",
        "Azure Site Recovery"
      ],
      "correct": 2,
      "module": 1,
      "explanation": "The Managed Instance Link uses Distributed Availability Groups (DAG) for replication. DAG is similar to Always On AG but spans different SQL Server instances. This is different from Log Replay Service (LRS), which uses log shipping technology."
    },
    {
      "text": "A company wants to migrate multiple small SQL Server databases from on-premises to Managed Instance cost-effectively. Which feature should they use?",
      "options": [
        "Elastic pools on Managed Instance",
        "Instance pools",
        "Azure SQL Database elastic pools",
        "Multiple single Managed Instances"
      ],
      "correct": 1,
      "module": 1,
      "explanation": "Instance pools pre-provision compute resources shared across multiple Managed Instances on the same VM. They are designed for migrating small SQL Server instances cost-effectively, with fast deployment (~10 minutes). Managed Instance does not support elastic pools — that is a SQL Database feature."
    },
    {
      "text": "Which backup feature is available for Azure SQL Managed Instance but NOT for Azure SQL Database?",
      "options": [
        "Automated full weekly backups",
        "Point-in-time restore",
        "COPY_ONLY backup to URL",
        "Long-term retention (LTR)"
      ],
      "correct": 2,
      "module": 1,
      "explanation": "COPY_ONLY backup to URL is a SQL Managed Instance feature. SQL Database does not allow manual COPY_ONLY backups — all backups are system-managed. Both services support automated weekly full backups, PITR, and LTR."
    },
    {
      "text": "Which of the following is required for configuring auto-failover groups between two Azure SQL Managed Instances?",
      "options": [
        "Both instances must be in the same VNet",
        "DNS zones must match between primary and secondary",
        "Both instances must use the DTU purchasing model",
        "The secondary instance must be in a different subscription"
      ],
      "correct": 1,
      "module": 1,
      "explanation": "For Managed Instance auto-failover groups, the DNS zone must match between the primary and secondary instances. This is specific to Managed Instance failover groups. DNS zone mismatch is a common deployment error."
    },
    {
      "text": "You need to restore a SQL Server backup file to Azure SQL Managed Instance. Which method should you use?",
      "options": [
        "Use the Azure portal import wizard",
        "Upload the backup to Azure Blob Storage and use T-SQL RESTORE",
        "Use SqlPackage to import the BACPAC",
        "Use Azure DMS with the backup file"
      ],
      "correct": 1,
      "module": 1,
      "explanation": "SQL Managed Instance supports T-SQL RESTORE from URL (Azure Blob Storage). The backup file must first be uploaded to Blob Storage, then RESTORE can be executed. The portal import wizard does not support Managed Instance. BACPAC via SqlPackage works but RESTORE is more efficient for native backups."
    },
    {
      "text": "Which service tier in Azure SQL Managed Instance provides local SSD storage for the lowest possible latency and supports In-Memory OLTP?",
      "options": [
        "General Purpose",
        "Business Critical",
        "Hyperscale",
        "Premium"
      ],
      "correct": 1,
      "module": 1,
      "explanation": "Business Critical in Managed Instance uses local SSD storage for the lowest latency and supports In-Memory OLTP and a readable secondary replica. General Purpose uses remote Premium storage with higher latency. Hyperscale and Premium are not available for Managed Instance."
    },
    {
      "text": "A DBA needs to enable public endpoint access to SQL Managed Instance while maintaining separation of duties. What is the required process?",
      "options": [
        "The DBA enables the public endpoint in the portal and opens the port",
        "The DBA runs a PowerShell command to enable the endpoint, then the NetAdmin opens port 3342 on the NSG",
        "Only the NetAdmin can enable both the endpoint and the NSG rule",
        "The public endpoint is enabled by default and only needs an NSG rule"
      ],
      "correct": 1,
      "module": 1,
      "explanation": "Separation of duties requires the DBA to enable the public endpoint via PowerShell (which only the DBA can do), and separately the NetAdmin must open port 3342 on the NSG. No single person has both permissions, enforcing security best practices."
    },
    {
      "text": "What is the maximum number of databases per Azure SQL Managed Instance?",
      "options": [
        "10",
        "50",
        "100",
        "500"
      ],
      "correct": 2,
      "module": 1,
      "explanation": "Azure SQL Managed Instance supports up to 100 databases per instance. This is a key difference from single Azure SQL Database which is one database per server, though SQL Database servers can have many individual databases."
    },
    {
      "text": "A company needs to migrate a 5 TB SQL Server database to Azure SQL Database with minimal downtime. Which migration method should they use?",
      "options": [
        "BACPAC export/import",
        "Transactional replication",
        "Native backup and restore",
        "Azure Data Factory copy activity"
      ],
      "correct": 1,
      "module": 1,
      "explanation": "Transactional replication is the only online (minimal downtime) migration method for Azure SQL Database. All other methods listed are offline and require full downtime. DMS with transactional replication is the recommended approach for minimizing downtime."
    },
    {
      "text": "A company is migrating to Azure SQL Managed Instance and needs to allow reads on the target during migration with a cutover measured in seconds. Which migration tool should they use?",
      "options": [
        "Log Replay Service (LRS)",
        "Managed Instance Link",
        "BACPAC via SqlPackage",
        "Native backup and restore"
      ],
      "correct": 1,
      "module": 1,
      "explanation": "Managed Instance Link (based on DAG) allows the target to be readable during migration and provides a cutover in seconds. LRS does not support reads during migration (the target is in restoring state). Both BACPAC and native restore are offline methods."
    },
    {
      "text": "Which of the following is a key limitation of the Log Replay Service (LRS) for migrating to SQL Managed Instance?",
      "options": [
        "It requires SQL Server 2019 or later",
        "It has a 30-day time limit",
        "It requires an ExpressRoute connection",
        "It does not support Standard Edition"
      ],
      "correct": 1,
      "module": 1,
      "explanation": "LRS automatically cancels the migration job after 30 days. This is a known limitation. The Managed Instance Link has no such time limit and supports both Standard and Enterprise editions. LRS supports SQL Server 2012+, not just 2019+."
    },
    {
      "text": "An organization is using Azure Arc-enabled SQL Server for migration assessment. How often does it automatically perform assessments?",
      "options": [
        "Daily",
        "Weekly",
        "Monthly",
        "On demand only"
      ],
      "correct": 1,
      "module": 1,
      "explanation": "Azure Arc-enabled SQL Server runs automatic migration assessments every weekend (weekly). It also supports trigger-on-demand assessments. It generates readiness reports with right-sized target recommendations for both Azure SQL Database and Managed Instance."
    },
    {
      "text": "Which assessment tool should be used BEFORE migrating SQL Server databases to Azure to identify compatibility issues and feature parity gaps?",
      "options": [
        "Azure Monitor",
        "Data Migration Assistant (DMA)",
        "SQL Server Profiler",
        "Azure SQL Analytics"
      ],
      "correct": 1,
      "module": 1,
      "explanation": "Data Migration Assistant (DMA) is the tool that assesses on-premises SQL Server databases for compatibility issues with Azure SQL targets, identifies feature parity gaps, and recommends the right target. Azure Migrate does discovery and assessment at a higher level, but DMA is more granular."
    },
    {
      "text": "When migrating a database to Azure SQL Database using Azure DMS, what is the recommended approach for handling the schema?",
      "options": [
        "DMS automatically deploys the schema from the source",
        "The schema must be deployed to the target before data migration",
        "Schema is migrated after data using a separate process",
        "DMS creates an empty target database automatically"
      ],
      "correct": 1,
      "module": 1,
      "explanation": "When using DMS for SQL Database migration, the schema must be deployed to the target database before starting the data migration. DMS handles the data movement but does not automatically migrate the schema. Tools like DMA or SQL Server Schema Comparison can deploy the schema."
    },
    {
      "text": "What is the BEST practice for service tier selection during a migration to Azure SQL Database?",
      "options": [
        "Select the final target tier before starting migration",
        "Scale up to a higher tier during migration, then scale down after",
        "Use the cheapest tier during migration to save costs",
        "Tier selection does not affect migration performance"
      ],
      "correct": 1,
      "module": 1,
      "explanation": "Scaling up to a higher service tier during migration (e.g., Business Critical or Hyperscale) provides more resources for faster data loading. After migration is complete, scale down to the appropriate tier for normal operations. This minimizes migration time."
    },
    {
      "text": "Which of the following is NOT supported when restoring a backup to Azure SQL Managed Instance?",
      "options": [
        "Restoring a backup with a single transaction log file",
        "Restoring a backup with multiple log files",
        "Restoring a database backup without overwriting",
        "Using VERIFYONLY to validate the backup"
      ],
      "correct": 1,
      "module": 1,
      "explanation": "SQL Managed Instance cannot restore backups that contain multiple log files. It also cannot restore backups with multiple backup sets or backups containing In-Memory OLTP or FILESTREAM data. Single log file backups, VERIFYONLY, and non-overwriting restores are all supported."
    },
    {
      "text": "A company needs to connect from on-premises to Azure SQL Managed Instance securely with the lowest latency. Which connectivity option should they choose?",
      "options": [
        "Point-to-Site VPN",
        "Site-to-Site VPN",
        "ExpressRoute",
        "Public endpoint over the internet"
      ],
      "correct": 2,
      "module": 1,
      "explanation": "ExpressRoute provides a private connection (not over the public internet) with the lowest latency and highest throughput. It is the most secure and performant option. P2S and S2S VPNs provide encryption but have higher latency. Public endpoint is the least secure."
    },
    {
      "text": "You are migrating multiple databases using Azure DMS with a self-hosted integration runtime. What is the maximum number of concurrent database migrations per IR node?",
      "options": [
        "5",
        "10",
        "20",
        "Unlimited"
      ],
      "correct": 1,
      "module": 1,
      "explanation": "Azure DMS supports up to 10 concurrent database migrations per self-hosted integration runtime (IR) node. For more concurrency, you can scale out by adding more IR nodes. This is important for large migration projects with many databases."
    },
    {
      "text": "A DBA needs to deploy an identical Azure SQL Database configuration across 20 subscriptions in a fully repeatable, idempotent way that integrates into a CI/CD pipeline. Which deployment method is BEST suited?",
      "options": [
        "The Azure portal, repeated manually for each subscription",
        "An ARM (or Bicep) template that declares the desired end state",
        "Interactively creating the database through SSMS Object Explorer",
        "A one-time PowerShell script run by hand for the first subscription only"
      ],
      "correct": 1,
      "module": 1,
      "explanation": "ARM templates (or Bicep, which compiles to ARM) are declarative — they define the desired end state and let Resource Manager figure out how to get there — making them the recommended approach for large-scale, repeatable deployments that fit into CI/CD pipelines. The Azure portal is easy to start with but is not repeatable, and one-off manual scripts don't scale to 20 subscriptions reliably."
    },
    {
      "text": "Which of the following statements about ARM templates as a deployment method for Azure SQL resources are correct? (Select all that apply)",
      "options": [
        "They are declarative, describing the desired end state rather than the steps to get there",
        "They are imperative, requiring each step to be scripted explicitly in order",
        "They are well suited to large-scale, repeatable deployments",
        "The Azure portal is an easier way to achieve the same repeatability as an ARM template"
      ],
      "type": "multi",
      "correct": [0, 2],
      "module": 1,
      "explanation": "ARM templates are declarative (not imperative — that describes PowerShell/CLI scripting) and are recommended for large-scale, repeatable deployments. The Azure portal, while the easiest way to get started, is not an easily repeatable process and is a poor substitute for template-based automation."
    },
    {
      "text": "A company wants to run both transactional (OLTP) workloads and advanced analytics against the same data, without duplicating it into a separate warehouse, using a single collaborative platform shared by data engineers, analysts, and data scientists. Which Azure SQL offering is designed for this scenario?",
      "options": [
        "SQL Server on Azure VM",
        "Azure SQL Database in Microsoft Fabric",
        "Azure SQL Managed Instance with elastic query",
        "Azure SQL Database Hyperscale"
      ],
      "correct": 1,
      "module": 1,
      "explanation": "SQL Database in Microsoft Fabric integrates operational SQL databases directly into the Fabric ecosystem, supporting both transactional workloads and analytics from the same data without moving it between separate systems. This suits organizations consolidating data infrastructure and streamlining collaboration across teams. The other options don't provide this unified operational-plus-analytics Fabric integration."
    },
    {
      "text": "True or False: Azure SQL Database in Microsoft Fabric requires you to first copy your operational data into a separate Fabric-specific data warehouse before analytics workloads can query it.",
      "type": "truefalse",
      "options": ["True", "False"],
      "correct": 1,
      "module": 1,
      "explanation": "False. SQL Database in Microsoft Fabric is designed so the same data can be created and queried directly by different teams (operational and analytical) without maintaining separate OLTP and analytics stores or manually copying data between them."
    },
    {
      "text": "Which sequence of T-SQL steps correctly implements table partitioning in SQL Server?",
      "options": [
        "Create the table, then create a partition function, then create a partition scheme, then create filegroups",
        "Create the filegroups, then create a partition function, then create a partition scheme mapping the function to the filegroups, then create the table on that scheme",
        "Create a partition scheme, then create the filegroups, then create the table, then create a partition function",
        "Create a partition function, then create the table, then create the filegroups, then create a partition scheme"
      ],
      "correct": 1,
      "module": 1,
      "explanation": "Implementing partitioning is a four-step process in order: create the filegroups that will hold the partitions, create a partition function defining how rows map to partitions based on a column's boundary values, create a partition scheme that maps each partition produced by the function to a specific filegroup, and finally create (or alter) the table on that partition scheme, keyed on the partitioning column."
    },
    {
      "text": "A DBA runs `CREATE TABLE Orders (...) ON MonthlyScheme(OrderDate);` and receives an error that the partition scheme 'MonthlyScheme' does not exist. The DBA confirms the filegroups and the partition function were both created successfully beforehand. What is the most likely cause?",
      "options": [
        "The filegroups referenced don't have enough free disk space",
        "CREATE PARTITION SCHEME mapping the partition function to the filegroups was never executed",
        "The partitioning column OrderDate must first be added to the primary key",
        "Table partitioning is only available in SQL Server Enterprise edition and the current edition doesn't support it"
      ],
      "correct": 1,
      "module": 1,
      "explanation": "A partition scheme is a distinct object created with CREATE PARTITION SCHEME that maps the partitions produced by a partition function onto specific filegroups; a table's ON clause references the scheme, not the function directly. If the scheme step was skipped, the CREATE TABLE statement will fail with exactly this 'does not exist' error even though the filegroups and function are both in place."
    },
    {
      "text": "Which factors correctly describe how the Managed Instance Link differs from Log Replay Service (LRS) when evaluating an online migration strategy to SQL Managed Instance? (Select all that apply)",
      "options": [
        "The Link allows reading data on the target during migration; with LRS the target database stays in a restoring state and cannot be read",
        "LRS supports an unlimited migration duration, while the Link is capped at 30 days",
        "The Link provides a cutover measured in seconds, while LRS cutover takes comparatively longer, especially on Business Critical",
        "LRS requires SQL Server 2016 or later as the source, while the Link supports SQL Server 2012 and later"
      ],
      "type": "multi",
      "correct": [0, 2],
      "module": 1,
      "explanation": "The Link (built on Distributed Availability Groups) allows reads mid-migration and cuts over in seconds; LRS leaves the database in restoring state (unreadable) and has a slower cutover. The duration and version facts are reversed in the other two options: LRS, not the Link, is capped at 30 days, and the Link needs SQL Server 2016+ while LRS supports 2012+."
    },
    {
      "text": "An organization must migrate a 10 TB on-premises SQL Server database to Azure SQL Database. The business requires the application to remain available with near-zero downtime throughout the multi-day migration. Which approach should they choose?",
      "options": [
        "Azure Database Migration Service in offline mode",
        "Transactional replication, the only online migration option for Azure SQL Database",
        "BACPAC export and import via SqlPackage",
        "bcp (Bulk Copy Program) table-by-table export and import"
      ],
      "correct": 1,
      "module": 1,
      "explanation": "For migrating into Azure SQL Database, transactional replication is the only online (minimal-downtime) option — it streams ongoing changes to the target after an initial snapshot, allowing cutover once fully synchronized. ADMS, BACPAC/SqlPackage, and bcp are all offline methods that require application downtime during the data copy."
    },
    {
      "text": "When configuring transactional replication to perform an online migration into Azure SQL Database, which statement is correct?",
      "options": [
        "Replication can be fully configured and monitored from the Azure portal",
        "Configuration must be done through SSMS or T-SQL against the publisher, and monitoring (agent and sync status) is done from SQL Server, not the Azure portal",
        "Azure SQL Database can act as the Distributor in the replication topology",
        "Replication into Azure SQL Database authenticates using Windows Authentication logins"
      ],
      "correct": 1,
      "module": 1,
      "explanation": "Transactional replication for Azure SQL Database must be configured through SSMS/T-SQL against the publisher — there is no portal-based configuration or monitoring, so agent status and synchronization must be checked from SQL Server/SSMS. Azure SQL Database can only act as a Subscriber (not a Distributor), and it authenticates replication connections using SQL Server logins only, not Windows Authentication."
    },
    {
      "text": "True or False: One-way replication with the Managed Instance Link (available from SQL Server 2016/2019 sources) supports failing back the migrated database to the original on-premises SQL Server if needed.",
      "type": "truefalse",
      "options": ["True", "False"],
      "correct": 1,
      "module": 1,
      "explanation": "False. One-way replication (SQL Server 2016/2019) only replicates from SQL Server to Managed Instance and does not support failback. Two-way replication, available starting with SQL Server 2022, adds manual failover and offline failback (with online failback in preview)."
    },
    {
      "text": "A company needs to relocate an Azure SQL Database to a different Azure region for cost optimization, without performing a full logical export/import migration. Which built-in mechanism accomplishes this?",
      "options": [
        "Geo-restore of a geo-redundant backup into the target region",
        "Azure Data Factory copy activity",
        "bcp bulk copy of each table",
        "Transactional replication to a new subscriber in the target region"
      ],
      "correct": 0,
      "module": 1,
      "explanation": "Geo-restore restores a geo-redundant backup into a different Azure region and is available whenever the database's backup storage redundancy is geo-redundant, letting you relocate a database to another region without a full logical migration. Data Factory, bcp, and transactional replication all involve a logical copy of schema/data rather than restoring an existing backup in place."
    },
    {
      "text": "A company needs to move an existing Azure SQL Database workload to Azure SQL Managed Instance because the application now requires SQL Agent jobs and cross-database queries. Which statement about performing this migration is correct?",
      "options": [
        "This move is not possible because both services are PaaS offerings",
        "The same schema/data-movement tools used for on-premises-to-Azure migrations (BACPAC/SqlPackage, bcp) can generally be reused for this Azure-to-Azure move, though Azure SQL Database can't act as a transactional replication Publisher the way an on-premises source can",
        "Only the Managed Instance Link can be used for Azure SQL Database to Managed Instance migrations",
        "This migration requires Azure Arc to be enabled on the source first"
      ],
      "correct": 1,
      "module": 1,
      "explanation": "Migrating between two Azure SQL targets generally reuses the same schema/data-movement tools as on-premises-to-Azure migrations (BACPAC/SqlPackage export-import, bcp), since those work against any SQL endpoint. The one exception is transactional replication, which requires SQL Server or Managed Instance as the Publisher — Azure SQL Database can't fill that role, so it isn't available as a like-for-like option here. The Managed Instance Link is specific to on-premises/IaaS SQL Server sources and isn't the only path for this migration; Azure Arc is unrelated to a source that's already an Azure SQL Database."
    },
    {
      "text": "During an Azure Database Migration Service (ADMS) migration involving hundreds of tables, several large tables containing blob columns are failing outright with timeouts, and overall progress is far slower than expected even for small tables. What is the MOST likely explanation and best remedy?",
      "options": [
        "ADMS is fundamentally incompatible with Azure SQL Database; switch to Log Replay Service instead",
        "Because ADMS is built on Azure Data Factory, each table incurs per-activity startup overhead, and large blob columns commonly time out; migrate those large-blob tables separately (e.g., via bcp or a dedicated pipeline)",
        "The target database's compute tier is too high and is throttling ingestion; scale it down",
        "This indicates a firewall misconfiguration and requires opening port 3342 on the NSG"
      ],
      "correct": 1,
      "module": 1,
      "explanation": "ADMS is built on Azure Data Factory, which incurs noticeable per-activity startup time even for small tables when there are many of them, and tables with large blob columns are a known cause of migration timeouts. The recommended remedy is to migrate those problematic large-blob tables separately (via bcp or a dedicated ADF pipeline) rather than folding them into the bulk ADMS job. LRS is a Managed Instance tool, not applicable here; scaling down and NSG port 3342 (a Managed Instance public endpoint setting) are unrelated to this symptom."
    },
    {
      "text": "True or False: When troubleshooting a failed transactional replication migration into Azure SQL Database, a DBA should check the Snapshot Agent, Log Reader Agent, and Synchronization Status directly within the Azure portal's replication monitoring blade.",
      "type": "truefalse",
      "options": ["True", "False"],
      "correct": 1,
      "module": 1,
      "explanation": "False. Azure SQL Database does not expose replication administration or monitoring in the portal. All troubleshooting — checking Snapshot Agent and Log Reader Agent status, synchronization status, and agent job history — must be done from SQL Server/SSMS on the publisher side."
    }
  ];

  if (typeof window.__dp300 === 'undefined') {
    window.__dp300 = { modules: [], questions: [] };
  }

  window.__dp300.questions = window.__dp300.questions.concat(questions);

  if (window.__dp300.modules.length < 1) {
    window.__dp300.modules[0] = "Skill 1: Plan and implement data platform resources";
  }
})();
