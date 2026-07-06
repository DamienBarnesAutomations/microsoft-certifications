// Skill Area 5: Plan and configure a high availability and disaster recovery (HA/DR) environment
(function() {
  var questions = [
    {
      "text": "What does Recovery Time Objective (RTO) define in a disaster recovery plan?",
      "options": [
        "The maximum amount of data loss acceptable to the business",
        "The maximum time available to bring resources online after an outage",
        "The minimum amount of time between backups",
        "The time required to restore a single database"
      ],
      "correct": 1,
      "module": 5,
      "explanation": "RTO is the maximum amount of time available to bring resources online after an outage or problem. If recovery takes longer than the RTO, there could be consequences such as financial penalties. RTO can be specified for the entire solution and for individual components."
    },
    {
      "text": "What does Recovery Point Objective (RPO) represent?",
      "options": [
        "The maximum downtime a business can tolerate",
        "The point in time to which a database should be recovered, equating to maximum acceptable data loss",
        "The time required to fail over to a secondary replica",
        "The frequency of full database backups"
      ],
      "correct": 1,
      "module": 5,
      "explanation": "RPO is the point in time to which a database should be recovered and equates to the maximum amount of data loss the business is willing to accept. For example, if an outage occurs at 10:00 AM with an RPO of 15 minutes, the data can be recovered to 9:45 AM or later."
    },
    {
      "text": "Which SQL Server HADR feature provides instance-level protection and requires shared storage?",
      "options": [
        "Always On Availability Group",
        "Always On Failover Cluster Instance (FCI)",
        "Log Shipping",
        "Transactional Replication"
      ],
      "correct": 1,
      "module": 5,
      "explanation": "An FCI provides instance-level protection — the entire SQL Server installation (binaries, logins, Agent jobs, databases) fails over as a unit. It requires shared storage (Azure Shared Disk, Storage Spaces Direct, Premium File Share, or iSCSI) and uses a unique virtual network name for client access."
    },
    {
      "text": "What happens to the SQL Server instance when a Failover Cluster Instance (FCI) fails over to another node?",
      "options": [
        "It continues running without interruption",
        "The entire instance stops and restarts on the other node",
        "Only the affected databases restart on the other node",
        "It switches to read-only mode on the primary node"
      ],
      "correct": 1,
      "module": 5,
      "explanation": "When an FCI fails over, the entire instance stops and restarts on another node. The failover process is a full stop and start of SQL Server. All connected applications are disconnected during failover, and only applications with retry logic can reconnect automatically."
    },
    {
      "text": "What is the main disadvantage of using Azure Site Recovery for SQL Server disaster recovery?",
      "options": [
        "It requires SQL Server Enterprise Edition",
        "It isn't SQL Server transaction-aware, so it may not meet RPO requirements",
        "It doesn't support cross-region replication",
        "It requires a VPN connection between regions"
      ],
      "correct": 1,
      "module": 5,
      "explanation": "Azure Site Recovery is not SQL Server-aware — it replicates at the VM/disk level and knows nothing about database transactions. While it can meet RTO, it may not meet RPO for transactional databases. Database professionals generally prefer database-centric DR solutions (AG, Log Shipping) for lower RPO."
    },
    {
      "text": "Which Azure IaaS availability feature provides anti-affinity within a single datacenter across fault and update domains?",
      "options": [
        "Availability Zones",
        "Availability Sets",
        "Azure Site Recovery",
        "Azure Resource Manager"
      ],
      "correct": 1,
      "module": 5,
      "explanation": "Availability Sets provide anti-affinity rules within a single datacenter. They separate VMs into fault domains (up to 3, shared power/network) and update domains (up to 20, rebooted simultaneously during maintenance). Availability Sets provide a 99.95% SLA."
    },
    {
      "text": "Can Availability Sets and Availability Zones be combined for the same set of VMs?",
      "options": [
        "Yes, for VMs in the same region",
        "No, you must choose one or the other",
        "Yes, but only for VMs running SQL Server",
        "Yes, but only for VMs using Managed Disks"
      ],
      "correct": 1,
      "module": 5,
      "explanation": "Availability Sets and Availability Zones cannot be combined. You must choose one or the other for your VMs. Availability Zones provide datacenter-level separation within a region, while Availability Sets provide anti-affinity within a single datacenter."
    },
    {
      "text": "Which Azure SQL HADR feature provides automatic failover with read-write and read-only listener endpoints?",
      "options": [
        "Active Geo-Replication",
        "Auto-Failover Groups",
        "Azure Site Recovery",
        "Always On Availability Groups"
      ],
      "correct": 1,
      "module": 5,
      "explanation": "Auto-Failover Groups provide AG-like listeners for both read-write and read-only traffic. They support automatic failover (configurable) and update DNS on failover so clients use the abstracted listener name. They work with both Azure SQL Database and Azure SQL Managed Instance."
    },
    {
      "text": "How many auto-failover groups does Azure SQL Managed Instance support?",
      "options": [
        "Unlimited",
        "One per instance",
        "One per database",
        "Up to five per instance"
      ],
      "correct": 1,
      "module": 5,
      "explanation": "Azure SQL Managed Instance supports only one auto-failover group. The name assigned to the auto-failover group must be unique within the *.database.windows.net domain."
    },
    {
      "text": "What is the default value of GracePeriodWithDataLossHours in an auto-failover group?",
      "options": [
        "30 minutes",
        "1 hour",
        "2 hours",
        "24 hours"
      ],
      "correct": 1,
      "module": 5,
      "explanation": "The default value of GracePeriodWithDataLossHours is 1 hour. This controls how long Azure waits before failing over when data loss is possible. A higher value reduces potential data loss by giving the secondary more time to fully synchronize with the primary."
    },
    {
      "text": "Which Accelerated Database Recovery (ADR) statement is correct regarding Azure SQL Database?",
      "options": [
        "ADR is optional and must be enabled per database",
        "ADR is enabled by default and cannot be turned off",
        "ADR is only available in the Business Critical service tier",
        "ADR only affects read-only replicas"
      ],
      "correct": 1,
      "module": 5,
      "explanation": "Accelerated Database Recovery (ADR) is enabled by default in Azure SQL Database and Azure SQL Managed Instance and cannot be turned off. It uses a persisted version store (PVS) and aggressive log truncation to enable instant transaction rollback and fast database recovery."
    },
    {
      "text": "Which database states are NOT supported in Azure SQL Database and Azure SQL Managed Instance?",
      "options": [
        "ONLINE and OFFLINE",
        "OFFLINE and EMERGENCY",
        "RESTORING and RECOVERING",
        "SUSPECT and RECOVERY_PENDING"
      ],
      "correct": 1,
      "module": 5,
      "explanation": "In Azure SQL Database and Azure SQL Managed Instance, you cannot set a database state to OFFLINE (because you can't attach databases like in SQL Server) or EMERGENCY (because Azure manages and maintains the service). RESTRICTED_USER and DAC (dedicated admin connection) are supported."
    },
    {
      "text": "Which witness type is recommended for a Windows Server Failover Cluster in Azure?",
      "options": [
        "Disk witness",
        "File share witness",
        "Cloud witness",
        "No witness is needed in Azure"
      ],
      "correct": 2,
      "module": 5,
      "explanation": "Cloud witness is recommended for Azure-based WSFC deployments, especially those spanning multiple regions or hybrid environments. It's fully Azure-based and available in Windows Server 2016 and later. It uses Azure Blob Storage as an arbitration point."
    },
    {
      "text": "Why must PowerShell be used instead of the Failover Cluster Manager wizard to create a WSFC in Azure?",
      "options": [
        "The wizard doesn't support Azure subscriptions",
        "The IP address cannot be properly configured via the wizard due to DHCP behavior",
        "PowerShell is required for all Azure deployments",
        "The wizard only supports Windows Server 2012 and earlier"
      ],
      "correct": 1,
      "module": 5,
      "explanation": "The Failover Cluster Manager wizard cannot be used in Azure for FCIs or AGs because the IP address must be configured in Azure (not in the VM) and appears as DHCP inside the VM. Using PowerShell with the -StaticAddress parameter is the recommended approach."
    },
    {
      "text": "What is a Distributed Network Name (DNN) in Windows Server 2019 and later?",
      "options": [
        "A replacement for the AG listener",
        "A default WSFC name that eliminates the need for an Azure Load Balancer for FCI",
        "A DNS alias for the primary replica",
        "A network load balancing feature"
      ],
      "correct": 1,
      "module": 5,
      "explanation": "In Windows Server 2019, Microsoft changed how WSFCs are created by default in Azure. The Distributed Network Name (DNN) replaces the Virtual Network Name (VNN) as the connection point for FCI, eliminating the need for an Azure Load Balancer. Clients connect to the DNN DNS name instead of the VNN name."
    },
    {
      "text": "Which component is required for an AG listener to work in Azure?",
      "options": [
        "Azure Traffic Manager",
        "Azure Load Balancer (Internal)",
        "Azure Application Gateway",
        "Azure Front Door"
      ],
      "correct": 1,
      "module": 5,
      "explanation": "An Internal Load Balancer (ILB) must be configured for the AG listener to work in Azure. Without an ILB, applications and users can only connect to the listener if they are connected to the VM hosting the primary replica. Standard LB is required for Availability Zones."
    },
    {
      "text": "What is a probe port in the context of an AG listener in Azure?",
      "options": [
        "A port used to monitor SQL Server health",
        "A unique high port required for each listener IP address in the load balancer",
        "A port for testing network connectivity",
        "A port for database mirroring endpoints"
      ],
      "correct": 1,
      "module": 5,
      "explanation": "A probe port is a unique high-number port (such as 59999) associated with each listener IP address in the Internal Load Balancer. Each listener requires a unique probe port. Without the probe port, the listener won't work properly, even with a correctly configured load balancer."
    },
    {
      "text": "What is a Distributed Availability Group?",
      "options": [
        "An AG that spans multiple subnets without a WSFC",
        "An 'AG of AGs' that connects multiple WSFCs without requiring cross-cluster quorum",
        "An AG that uses distributed file shares instead of local storage",
        "An AG with more than nine replicas"
      ],
      "correct": 1,
      "module": 5,
      "explanation": "A Distributed Availability Group is an Enterprise Edition feature introduced in SQL Server 2016. It's an 'AG of AGs' — multiple availability groups connected together. Each AG maintains its own WSFC and quorum, eliminating cross-cluster dependencies. The global primary synchronizes to a forwarder in the second AG."
    },
    {
      "text": "At what frequency does Azure Site Recovery generate crash-consistent recovery points?",
      "options": [
        "Every 1 minute",
        "Every 5 minutes",
        "Every 15 minutes",
        "Every 30 minutes"
      ],
      "correct": 1,
      "module": 5,
      "explanation": "Azure Site Recovery generates crash-consistent recovery points every 5 minutes. App-consistent recovery points are generated according to the configured replication policy and use Volume Shadow Copy Service (VSS) snapshots."
    },
    {
      "text": "What happens to replica VMs after a failover using Azure Site Recovery?",
      "options": [
        "They are automatically protected in the new region",
        "They are not protected and must be reprotected",
        "They continue replicating back to the original region",
        "They are deleted after the failover completes"
      ],
      "correct": 1,
      "module": 5,
      "explanation": "After an Azure Site Recovery failover to another region, the replica VMs that are brought online are not protected. They must be reprotected to enable failback or continued protection. This is an important consideration after any ASR failover event."
    },
    {
      "text": "Which DMV can be used to check replica status for Business Critical service tier databases?",
      "options": [
        "sys.dm_db_resource_stats",
        "sys.dm_database_replica_states",
        "sys.dm_hadr_availability_replica_states",
        "sys.dm_os_wait_stats"
      ],
      "correct": 1,
      "module": 5,
      "explanation": "sys.dm_database_replica_states provides status information about replicas used in the Business Critical service tier. This DMV shows the synchronization state and health of each replica in the availability group."
    },
    {
      "text": "Which recovery model must be used to enable transaction log backups and point-in-time recovery?",
      "options": [
        "SIMPLE",
        "FULL",
        "BULK_LOGGED",
        "Both FULL and BULK_LOGGED allow log backups"
      ],
      "correct": 1,
      "module": 5,
      "explanation": "The FULL recovery model allows full, differential, and transaction log backups. Transaction log backups are required for point-in-time recovery (PITR). The SIMPLE recovery model does not support log backups, and BULK_LOGGED is a temporary mode that minimizes log space for bulk operations."
    },
    {
      "text": "Which option must be used with RESTORE DATABASE to allow additional differential or log backups to be applied afterward?",
      "options": [
        "WITH RECOVERY",
        "WITH NORECOVERY",
        "WITH STANDBY only",
        "WITH REPLACE"
      ],
      "correct": 1,
      "module": 5,
      "explanation": "WITH NORECOVERY (or WITH STANDBY) keeps the database in a restoring state, allowing additional backups (differential or transaction log) to be applied. If WITH RECOVERY is used, the database becomes operational and no further backups can be applied."
    },
    {
      "text": "What authentication method should be used for backup to URL starting with SQL Server 2016?",
      "options": [
        "Storage account name and access key (page blob)",
        "Shared Access Signature (block blob)",
        "Managed Identity",
        "Service Principal"
      ],
      "correct": 1,
      "module": 5,
      "explanation": "Starting with SQL Server 2016, only block blob is available for backup to URL, which requires a Shared Access Signature (SAS) token. Block blobs are cheaper than page blobs and SAS tokens offer better security control compared to storage account access keys."
    },
    {
      "text": "What is the recommended practice when using automated backups via the SQL Server IaaS Agent Extension?",
      "options": [
        "Also configure transaction log backups at the instance level for redundancy",
        "Do not combine with instance-level transaction log backups to avoid breaking the log chain",
        "Use both Azure Backup and automated backups simultaneously",
        "Disable the SQL Server Agent to avoid conflicts"
      ],
      "correct": 1,
      "module": 5,
      "explanation": "If you use automated backups (especially with transaction log backups), do not also configure log backups at the instance level inside the VM. Uncoordinated log backups break the log chain, making it difficult to piece together backups for a restore."
    },
    {
      "text": "Which restore behavior applies to Azure SQL Database and Azure SQL Managed Instance?",
      "options": [
        "Restore overwrites the existing database",
        "Restore creates a new database — the target database must not exist",
        "Restore can replace a database as long as it's in RESTRICTED_USER mode",
        "Restore requires the database to be dropped first using DROP DATABASE"
      ],
      "correct": 1,
      "module": 5,
      "explanation": "Restore in place is not supported in Azure SQL Database or Azure SQL Managed Instance. A restore operation creates a new database, so the target database must not already exist. You must drop or rename the existing database before restoring."
    },
    {
      "text": "What is the default point-in-time retention period for automated backups in Azure SQL Database?",
      "options": [
        "1 day",
        "7 days",
        "14 days",
        "35 days"
      ],
      "correct": 1,
      "module": 5,
      "explanation": "The default point-in-time retention policy is 7 days for Azure SQL Database. This can be increased up to 35 days for vCore-based databases. Long-term retention (LTR) can be configured for up to 10 years."
    },
    {
      "text": "What happens to Azure SQL Database backups when the logical server is deleted?",
      "options": [
        "Backups are retained for 7 days in case of accidental deletion",
        "Backups are deleted with the server and cannot be recovered",
        "Backups are automatically transferred to a new server",
        "Backups are retained for 35 days by default"
      ],
      "correct": 1,
      "module": 5,
      "explanation": "If the server containing the database is deleted, all backups are deleted at the same time and there is no way to recover them. If only the database is deleted (not the server), the database can be restored normally within the retention period."
    },
    {
      "text": "What type of backup can Azure SQL Managed Instance perform that Azure SQL Database cannot?",
      "options": [
        "Differential backups",
        "COPY_ONLY backups to URL",
        "Transaction log backups",
        "Full backups"
      ],
      "correct": 1,
      "module": 5,
      "explanation": "Azure SQL Managed Instance supports COPY_ONLY backups to URL using the BACKUP DATABASE command. Azure SQL Database does not support this. COPY_ONLY backups do not affect the log chain, which is important since MI already manages its own automated backup schedule."
    },
    {
      "text": "What is the frequency of differential backups in the automated PaaS backup system?",
      "options": [
        "Every 1 hour",
        "Every 5-10 minutes",
        "Every 12 hours",
        "Once per week"
      ],
      "correct": 2,
      "module": 5,
      "explanation": "In the automated backup system for Azure SQL Database and Azure SQL Managed Instance, full backups are created once a week, differential backups every 12 hours, and transaction log backups every 5 to 10 minutes. All backups are stored in RA-GRS blobs."
    },
    {
      "text": "What does Accelerated Database Recovery (ADR) use to enable instant transaction rollback?",
      "options": [
        "Always On Availability Groups",
        "Persisted Version Store (PVS) and aggressive transaction log truncation",
        "In-Memory OLTP",
        "Columnstore indexes"
      ],
      "correct": 1,
      "module": 5,
      "explanation": "ADR uses a Persisted Version Store (PVS) along with aggressive transaction log truncation to enable instant transaction rollback. Instead of scanning the log to undo changes, old versions are maintained in the PVS, allowing rollbacks to complete almost instantaneously regardless of transaction size."
    }
  ];

  if (typeof window.__dp300 === 'undefined') {
    window.__dp300 = { modules: [], questions: [] };
  }

  window.__dp300.questions = window.__dp300.questions.concat(questions);

  if (window.__dp300.modules.length < 5) {
    window.__dp300.modules[4] = "Skill 5: Plan and configure a high availability and disaster recovery (HA/DR) environment";
  }
})();
