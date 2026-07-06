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
    },
    {
      "text": "A company runs SQL Server on-premises and wants to extend disaster recovery to Azure. Which built-in SQL Server feature can replicate from an on-premises instance to an Azure SQL Managed Instance subscriber, but only in that direction (not the reverse)?",
      "options": [
        "Transactional replication",
        "Always On Availability Groups",
        "Log shipping",
        "Auto-failover groups"
      ],
      "correct": 0,
      "module": 5,
      "explanation": "SQL Server transactional replication can publish from an on-premises (or other-cloud) instance to an Azure SQL Managed Instance subscriber, but not in the reverse direction. This is the one notable exception that makes a PaaS target reachable from a hybrid topology; otherwise hybrid HADR is effectively always IaaS-based."
    },
    {
      "text": "True or False: In a hybrid HA/DR design that extends an on-premises Always On Availability Group with an Azure-based secondary replica, Active Directory Domain Services and DNS must also be deployed in Azure, not just on-premises.",
      "type": "truefalse",
      "options": ["True", "False"],
      "correct": 0,
      "module": 5,
      "explanation": "Because the AG requires a Windows Server Failover Cluster spanning both locations, the supporting infrastructure — AD DS and DNS — must exist in Azure as well as on-premises, not only in the on-premises datacenter."
    },
    {
      "text": "Which SQL Server HADR feature is best suited to a hybrid on-premises/Azure topology because each side maintains its own Windows Server Failover Cluster and quorum, rather than requiring one cluster stretched across both locations?",
      "options": [
        "A traditional Availability Group spanning a single WSFC",
        "A Distributed Availability Group",
        "A Failover Cluster Instance using Storage Spaces Direct",
        "A Basic Availability Group"
      ],
      "correct": 1,
      "module": 5,
      "explanation": "A distributed availability group is well suited to hybrid scenarios because, unlike a traditional AG, it doesn't require a single WSFC spanning both locations — each side maintains its own cluster and quorum/witness, which is easier when on-premises and Azure networks aren't tightly coupled."
    },
    {
      "text": "Which built-in mechanism should be run against every node of a Windows Server Failover Cluster — and against shared storage for an FCI — before placing an AG or FCI into production, and again whenever the environment changes?",
      "options": [
        "DBCC CHECKDB",
        "Cluster validation (Failover Cluster Manager or Test-Cluster)",
        "sys.dm_database_replica_states query",
        "Azure Advisor recommendations"
      ],
      "correct": 1,
      "module": 5,
      "explanation": "Cluster validation is a mandatory, built-in battery of tests run via Failover Cluster Manager or Test-Cluster. Results come back as error, warning, pass, or not applicable — warnings can be acceptable if expected, but all errors must be resolved before the cluster is considered supported."
    },
    {
      "text": "True or False: Azure Site Recovery allows a full disaster recovery failover test to be performed without taking production VMs offline, making it practical to rehearse a DR plan on a regular schedule.",
      "type": "truefalse",
      "options": ["True", "False"],
      "correct": 0,
      "module": 5,
      "explanation": "ASR's standout testing advantage is that a full DR failover test can be run without disrupting production, which makes it practical to schedule regular DR drills instead of only discovering problems during an actual disaster."
    },
    {
      "text": "A DBA is preparing to cut a new Always On Availability Group listener over to production in Azure, and the Internal Load Balancer has already been confirmed working. What should the DBA do before go-live, and why?",
      "options": [
        "Configure the probe port after go-live, since it can be added without any impact",
        "Test AG failover and listener connectivity before go-live, because adding a probe port later requires briefly taking the listener IP — and therefore the AG — offline",
        "Skip failover testing entirely, since a working ILB already proves the listener works end to end",
        "Wait until a real outage occurs to validate failover, to avoid unnecessary risk to the cluster"
      ],
      "correct": 1,
      "module": 5,
      "explanation": "AG failover and listener connectivity should be tested before go-live once the load balancer is confirmed working, because adding the probe port afterward requires taking the listener's IP (and thus the AG) offline temporarily — something best avoided once the system is live."
    },
    {
      "text": "Which Azure portal feature specifically reveals why a given Azure SQL Managed Instance or database is currently unavailable, aiding root-cause diagnosis of an unplanned failover?",
      "options": [
        "Azure Advisor",
        "Resource Health",
        "Cost Management",
        "Azure Policy"
      ],
      "correct": 1,
      "module": 5,
      "explanation": "Resource Health (in the portal or via REST API) is the documented mechanism for identifying why a specific Managed Instance or database is currently unavailable, distinguishing it from broader dashboards like Azure Status or Service Health."
    },
    {
      "text": "A DBA wants a global, subscription-independent dashboard of ongoing Azure service incidents, with an RSS feed for update notifications, rather than a view scoped to their own subscription's resources. Which tool should they use?",
      "options": [
        "Azure Service Health",
        "Azure Status",
        "Resource Health",
        "Azure Monitor Alerts"
      ],
      "correct": 1,
      "module": 5,
      "explanation": "Azure Status is a global dashboard of ongoing service problems with an RSS feed for change notifications. Azure Service Health, by contrast, is scoped to the subscription and reports issues, planned maintenance, and health advisories relevant to that subscription's resources."
    },
    {
      "text": "Which of the following are valid ways to monitor the health and history of an Azure SQL Database or Managed Instance HA/DR configuration? (Select all that apply)",
      "type": "multi",
      "options": [
        "Azure Service Health for planned maintenance and incident history",
        "sys.dm_database_replica_states for Business Critical tier replica status",
        "Extended Events on Managed Instance to track backup history",
        "Restarting the SQL Server service to force a health status refresh"
      ],
      "correct": [0, 1, 2],
      "module": 5,
      "explanation": "Service Health, the sys.dm_database_replica_states DMV, and Extended Events (on Managed Instance, since no standard backup history view exists on these PaaS platforms) are all legitimate monitoring mechanisms. Restarting the SQL Server service is not a monitoring technique and isn't available or meaningful for these managed platforms."
    },
    {
      "text": "After a network partition, an Always On Availability Group hosted on a Windows Server Failover Cluster becomes completely unavailable, including the primary replica. What is the most likely root cause to check first?",
      "options": [
        "The Internal Load Balancer probe port is misconfigured",
        "The cluster lost quorum because the witness resource is unreachable",
        "The transaction log on the primary is full",
        "GracePeriodWithDataLossHours expired"
      ],
      "correct": 1,
      "module": 5,
      "explanation": "Quorum loss (loss of the witness resource) takes down the whole cluster along with any AG or FCI riding on it, so witness health is the first thing to check when a cluster-based solution goes dark entirely, including the primary."
    },
    {
      "text": "Users report they cannot connect through an Always On Availability Group listener from a client machine other than the VM hosting the primary replica, even though the AG itself reports Healthy. What is the most likely cause, and how should it be isolated?",
      "options": [
        "A corrupt transaction log on the secondary; restore the secondary from a fresh full backup",
        "A load balancer or probe port misconfiguration; isolate it by running Test-NetConnection against the listener IP/port from a machine other than the primary VM",
        "The WSFC lost quorum; check the witness resource",
        "Automatic seeding failed; reseed the secondary database"
      ],
      "correct": 1,
      "module": 5,
      "explanation": "AG listener connectivity failures are commonly a load-balancer or probe-port misconfiguration. Test-NetConnection run from outside the primary VM is the prescribed way to isolate whether the ILB, the probe port, or the SQL Server endpoint itself is at fault — an AG reporting Healthy internally doesn't rule this out."
    },
    {
      "text": "Immediately after Azure Site Recovery completes a regional failover for a set of SQL Server VMs, the DBA realizes a subsequent failure could leave the environment with no DR coverage at all. What commonly missed step causes this, and what should be done?",
      "options": [
        "The replica VMs are unprotected after failover and must be reprotected",
        "ASR automatically re-enables protection back to the original region, so no action is needed",
        "The AG listener must be manually recreated on the new VMs",
        "The transaction log backup chain must be manually restarted using WITH COPY_ONLY"
      ],
      "correct": 0,
      "module": 5,
      "explanation": "After an Azure Site Recovery failover, the replica VMs brought online in the target region are not automatically protected — they must be reprotected. This is a commonly missed step that leaves the environment without DR coverage for a second event."
    },
    {
      "text": "On SQL Server Standard Edition, what are the licensing limits for an Always On Failover Cluster Instance?",
      "options": [
        "Unlimited nodes, one database per instance",
        "A maximum of two nodes",
        "A maximum of four nodes",
        "FCI is not supported on Standard Edition"
      ],
      "correct": 1,
      "module": 5,
      "explanation": "FCIs on SQL Server Standard Edition are capped at two nodes, while Enterprise Edition supports larger multi-node clusters."
    },
    {
      "text": "Which of the following are true of an Always On Availability Group configured on SQL Server Standard Edition, compared to Enterprise Edition? (Select all that apply)",
      "type": "multi",
      "options": [
        "Standard Edition is limited to one database per AG",
        "Standard Edition supports a maximum of one primary and one secondary replica",
        "Standard Edition allows up to eight secondary replicas, the same as Enterprise",
        "Standard Edition secondaries can never be made readable under any circumstance"
      ],
      "correct": [0, 1, 3],
      "module": 5,
      "explanation": "Standard Edition AGs (Basic Availability Groups) are limited to one database per AG and up to two replicas total (one primary, one secondary), and unlike Enterprise Edition, a Basic AG secondary can never be made readable under any circumstance — no read-only routing, no read-intent connections, and no backups from the secondary. Enterprise Edition supports multiple databases per AG and up to nine replicas (one primary, eight secondary), with secondaries readable for offloading read and backup work."
    },
    {
      "text": "True or False: Log shipping provides automatic client redirection to the secondary server after a role switch, similar to an Availability Group listener.",
      "type": "truefalse",
      "options": ["True", "False"],
      "correct": 1,
      "module": 5,
      "explanation": "False. Unlike an AG, log shipping offers no native name abstraction — switching to the secondary means tolerating a name change unless mitigated with something like a DNS alias."
    },
    {
      "text": "Compared with active geo-replication, which of the following are true of Azure SQL Database auto-failover groups? (Select all that apply)",
      "type": "multi",
      "options": [
        "They support automatic failover",
        "They can fail over multiple databases simultaneously",
        "They are supported on Azure SQL Managed Instance, unlike geo-replication",
        "They allow the secondary to reside in the same region as the primary"
      ],
      "correct": [0, 1, 2],
      "module": 5,
      "explanation": "Failover groups add automatic failover, can fail over multiple databases together, and work on Managed Instance — none of which geo-replication supports. Geo-replication (not failover groups) is the one that allows a secondary in the same region and supports multiple replicas."
    },
    {
      "text": "A DBA reviewing an Always On Availability Group notices that the redo queue on a secondary replica is growing continuously and the replica is falling further behind the primary. Which type of issue does this indicate?",
      "options": [
        "A quorum problem on the underlying WSFC",
        "The secondary replica cannot apply transaction log records fast enough to keep pace with the primary, indicating a synchronization/performance lag issue",
        "The AG listener's probe port is misconfigured",
        "The primary's backup chain has been broken"
      ],
      "correct": 1,
      "module": 5,
      "explanation": "A continuously growing redo queue means the secondary is receiving log records faster than it can apply them — a synchronization lag/performance issue on the secondary, not a quorum, listener, or backup-chain problem."
    },
    {
      "text": "True or False: Accelerated Database Recovery (ADR) can be disabled in Azure SQL Database if an application requires the traditional log-scan-based rollback behavior.",
      "type": "truefalse",
      "options": ["True", "False"],
      "correct": 1,
      "module": 5,
      "explanation": "False. ADR is enabled by default in Azure SQL Database and Azure SQL Managed Instance and cannot be turned off."
    },
    {
      "text": "A team configures the SQL Server IaaS Agent Extension to run automated backups, including transaction log backups, against a storage account for a VM-hosted database. A DBA also schedules a nightly SQL Server Agent job to take manual transaction log backups inside the guest. What problem will this most likely cause?",
      "options": [
        "No problem — both backup sets simply provide redundancy",
        "The log chain will be broken, because each independent log backup clears the transaction log, fragmenting the chain needed for point-in-time restore",
        "The automated backup service will automatically disable itself",
        "RPO will improve because log backups occur twice as often"
      ],
      "correct": 1,
      "module": 5,
      "explanation": "Uncoordinated log backups from two separate sources break the log chain, since each log backup independently clears the log. Only one backup method should be used per database, or point-in-time restore becomes an error-prone reassembly of two backup histories."
    },
    {
      "text": "Azure Backup for a SQL Server VM is intermittently failing, and logs show the failures coincide with the VSS snapshot's I/O freeze taking too long. Which fix addresses this?",
      "options": [
        "Switch the database to the SIMPLE recovery model",
        "Set USEVSSCOPYBACKUP to TRUE under HKEY_LOCAL_MACHINE\\SOFTWARE\\MICROSOFT\\BCDRAGENT",
        "Move the database files to temporary storage for faster I/O",
        "Disable Accelerated Database Recovery"
      ],
      "correct": 1,
      "module": 5,
      "explanation": "If snapshot delays are causing backup failures, the documented fix is setting \"USEVSSCOPYBACKUP\"=\"TRUE\" under the registry key HKEY_LOCAL_MACHINE\\SOFTWARE\\MICROSOFT\\BCDRAGENT, which changes how the VSS-based snapshot interacts with SQL Server during the freeze/thaw."
    },
    {
      "text": "After failing over an Always On Availability Group, an application that relies on the Microsoft Distributed Transaction Coordinator (MSDTC) starts failing on the new primary. What is the most likely cause?",
      "options": [
        "The AG listener's DNS entry did not update",
        "MSDTC was not clustered, which requires a shared disk even though the AG itself does not use shared storage",
        "The secondary replica was not seeded correctly",
        "The WSFC quorum witness is offline"
      ],
      "correct": 1,
      "module": 5,
      "explanation": "Clustered MSDTC requires shared disk even when the AG itself doesn't use shared storage. If applications relying on MSDTC fail after a failover, the likely cause is that DTC wasn't clustered with the required shared disk."
    },
    {
      "text": "When configuring a Distributed Availability Group across two Azure regions, what additional load balancer configuration is required compared to an on-premises deployment?",
      "options": [
        "The AG endpoint port (default 5022) must be added to each region's load balancer configuration",
        "A single global load balancer must be shared across both regions",
        "No load balancer is required, because Distributed AGs bypass the WSFC entirely",
        "Only the forwarder replica's region needs load balancer rules"
      ],
      "correct": 0,
      "module": 5,
      "explanation": "Distributed availability groups are configured the same in Azure as on-premises, except that the endpoint port for each AG (default 5022) must be added to each region's load balancer configuration."
    },
    {
      "text": "Which of the following are valid witness types for maintaining quorum in a Windows Server Failover Cluster? (Select all that apply)",
      "type": "multi",
      "options": [
        "Disk witness",
        "File share witness",
        "Cloud witness",
        "Listener witness"
      ],
      "correct": [0, 1, 2],
      "module": 5,
      "explanation": "Valid witness resources are a disk witness, an SMB 2.0+ file share witness, or a cloud witness (Azure Blob Storage-based, recommended for Azure and hybrid/multi-region topologies). \"Listener witness\" is not a real WSFC witness type."
    },
    {
      "text": "An Azure SQL Database auto-failover group experiences a primary region outage. The secondary has not fully caught up, and GracePeriodWithDataLossHours is still set to its default of one hour. If the DBA forces failover immediately instead of waiting, what is the trade-off?",
      "options": [
        "No trade-off — forcing failover immediately always preserves all data",
        "Failing over immediately reduces downtime but risks losing any transactions not yet replicated to the secondary",
        "Forcing failover immediately guarantees zero data loss but increases downtime",
        "GracePeriodWithDataLossHours only affects manual failovers, not forced ones"
      ],
      "correct": 1,
      "module": 5,
      "explanation": "An unplanned/forced failover can lose data if the secondary hasn't fully caught up. GracePeriodWithDataLossHours controls how long Azure waits before forcing failover — waiting longer improves the chance of zero data loss, while forcing immediately reduces downtime at the risk of losing unreplicated transactions."
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
