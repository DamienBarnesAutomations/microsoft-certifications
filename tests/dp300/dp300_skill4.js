// Skill Area 4: Configure and manage automation of tasks
(function() {
  var questions = [
    {
      "text": "Which deployment model uses a declarative approach where you specify what resources to create and Azure determines the order and dependencies?",
      "options": [
        "Imperative model (PowerShell/Azure CLI)",
        "Declarative model (ARM templates/Bicep)",
        "Azure portal manual deployment",
        "Docker container deployment"
      ],
      "correct": 1,
      "module": 4,
      "explanation": "The declarative model, used by ARM templates and Bicep, specifies what resources to create. Azure Resource Manager determines the deployment order based on dependencies. The imperative model (PowerShell/Azure CLI) specifies a sequence of commands to execute."
    },
    {
      "text": "What does it mean that ARM templates are idempotent?",
      "options": [
        "They can only be deployed once",
        "They can be deployed repeatedly with the same result",
        "They automatically roll back on failure",
        "They generate unique names for each deployment"
      ],
      "correct": 1,
      "module": 4,
      "explanation": "Idempotent means you can deploy the same ARM template repeatedly and get consistent results. Resources are only created if they don't already exist, and existing resources are updated to match the template definition. This enables reliable, repeatable infrastructure deployments."
    },
    {
      "text": "Which PowerShell cmdlet is used to deploy an ARM template to a resource group?",
      "options": [
        "New-AzResourceGroup",
        "New-AzResourceGroupDeployment",
        "Deploy-AzArmTemplate",
        "New-AzDeployment"
      ],
      "correct": 1,
      "module": 4,
      "explanation": "New-AzResourceGroupDeployment deploys an ARM template to a resource group. You specify the template file or URI and any required parameters. For subscription-level deployments, use New-AzSubscriptionDeployment."
    },
    {
      "text": "Which of the following is a benefit of Azure Bicep compared to ARM JSON templates?",
      "options": [
        "Bicep supports deploying remote templates directly via Azure CLI",
        "Bicep files are approximately 60% less verbose than equivalent JSON",
        "Bicep is a general-purpose programming language",
        "Bicep does not require transpilation before deployment"
      ],
      "correct": 1,
      "module": 4,
      "explanation": "Bicep files are approximately 60% less verbose than equivalent ARM JSON templates. Bicep is a declarative DSL (not a general-purpose language) that transpiles to ARM JSON. Azure CLI currently does NOT support deploying remote Bicep files directly."
    },
    {
      "text": "What is required to deploy an ARM template using a remote linked template with a relative path stored in a storage account?",
      "options": [
        "A VPN connection to the storage account",
        "A query-string parameter with a SAS token",
        "The storage account must be in the same region",
        "The template must be converted to Bicep first"
      ],
      "correct": 1,
      "module": 4,
      "explanation": "To deploy remote linked templates with relative path stored in a storage account, you must use a query-string parameter to specify the SAS token. This provides the necessary authentication to access the template file."
    },
    {
      "text": "What are the four scopes at which ARM templates can be deployed?",
      "options": [
        "Resource group, Subscription, Management Group, Tenant",
        "Resource group, Virtual Network, Subscription, Tenant",
        "Database, Server, Subscription, Management Group",
        "Resource group, Subscription, Region, Tenant"
      ],
      "correct": 0,
      "module": 4,
      "explanation": "ARM templates can be deployed to four scopes: Resource group, Subscription, Management Group (collection of subscriptions), and Tenant. The deployment cmdlet differs by scope: New-AzResourceGroupDeployment, New-AzSubscriptionDeployment, New-AzManagementGroupDeployment, and New-AzTenantDeployment."
    },
    {
      "text": "Which parameter is required when creating a new Azure SQL Managed Instance with the New-AzSqlInstance cmdlet?",
      "options": [
        "-DatabaseName",
        "-SubnetId",
        "-StorageAccountName",
        "-ElasticPoolName"
      ],
      "correct": 1,
      "module": 4,
      "explanation": "The New-AzSqlInstance cmdlet requires the -SubnetId parameter because Azure SQL Managed Instance is deployed in a dedicated subnet within a VNet. This provides network isolation and private connectivity."
    },
    {
      "text": "Which Azure CLI command creates a new SQL server?",
      "options": [
        "az sql server new",
        "az sql server create",
        "az sql create server",
        "New-AzSqlServer"
      ],
      "correct": 1,
      "module": 4,
      "explanation": "az sql server create is the Azure CLI command for creating a new SQL server. Parameters include --name, --resource-group, --admin-user, --admin-password. Note that New-AzSqlServer is the PowerShell equivalent, not an Azure CLI command."
    },
    {
      "text": "In the Azure CLI, which command is used to sign in with a web browser?",
      "options": [
        "Connect-AzAccount",
        "az login",
        "az account set",
        "az authentication login"
      ],
      "correct": 1,
      "module": 4,
      "explanation": "az login is the Azure CLI command to sign in with a web browser. Connect-AzAccount is the equivalent PowerShell cmdlet. az account set is used to switch between subscriptions."
    },
    {
      "text": "Which Azure feature enforces governance rules such as region limitations and naming standards for resource deployment?",
      "options": [
        "Azure RBAC",
        "Azure Policy",
        "Azure Blueprints",
        "Management Groups"
      ],
      "correct": 1,
      "module": 4,
      "explanation": "Azure Policy enforces governance rules on Azure resources, including region limitations, naming standards, and resource sizes. Policies can be applied at management group, subscription, or resource group levels and can be grouped into initiatives for broader application."
    },
    {
      "text": "What is the maximum number of tags that can be applied to a single Azure resource?",
      "options": [
        "5",
        "10",
        "15",
        "25"
      ],
      "correct": 2,
      "module": 4,
      "explanation": "Azure supports up to 15 tags per resource. Tags are key-value pairs that can be applied at the subscription, resource group, or individual resource level. They are included in billing information and can be modified at any time."
    },
    {
      "text": "What is a security concern when using Azure resource tags?",
      "options": [
        "Tags cannot be modified after creation",
        "Tags are stored as plain text — never store sensitive values",
        "Tags are visible only to subscription administrators",
        "Tags increase the cost of the resource"
      ],
      "correct": 1,
      "module": 4,
      "explanation": "Tags are stored as plain text, so sensitive values should never be added to them. Sensitive information in tags could be exposed through cost reports, export templates, monitoring logs, and other methods."
    },
    {
      "text": "Which DBCC command should be run regularly to check the logical and physical consistency of every database page?",
      "options": [
        "DBCC CHECKALLOC",
        "DBCC CHECKDB",
        "DBCC CHECKTABLE",
        "DBCC SHRINKDATABASE"
      ],
      "correct": 1,
      "module": 4,
      "explanation": "DBCC CHECKDB checks the logical and physical consistency of each database page and is the only way to check an entire database for corruption. It should be run regularly and the consistency check window should align with your backup retention period."
    },
    {
      "text": "Why is the 'Shrink Database' maintenance task NOT recommended for regular maintenance?",
      "options": [
        "It requires exclusive access to the database",
        "It causes severe index fragmentation and is I/O intensive",
        "It cannot be scheduled",
        "It only works with the SIMPLE recovery model"
      ],
      "correct": 1,
      "module": 4,
      "explanation": "The Shrink Database task is not recommended for regular maintenance because it causes severe index fragmentation (harming query performance) and is both I/O and CPU intensive. It should only be used in specific scenarios, such as after deleting large amounts of data and reducing the required file size."
    },
    {
      "text": "What format does SQL Server use to store Maintenance Plans?",
      "options": [
        "XML documents",
        "Integration Services (SSIS) packages",
        "SQL scripts",
        "PowerShell scripts"
      ],
      "correct": 1,
      "module": 4,
      "explanation": "Maintenance Plans are created and stored as Integration Services (SSIS) packages. This allows them to be scheduled as SQL Server Agent jobs and provides a visual workflow for maintenance tasks."
    },
    {
      "text": "What is the relationship between SQL Server Agent jobs and schedules?",
      "options": [
        "One-to-one — each job has exactly one schedule",
        "One-to-many — each job can have multiple schedules, but a schedule belongs to only one job",
        "Many-to-many — each job can have multiple schedules and each schedule can be assigned to multiple jobs",
        "Schedules are independent of jobs and must be manually linked"
      ],
      "correct": 2,
      "module": 4,
      "explanation": "SQL Server Agent jobs and schedules have a many-to-many relationship. Each job can have multiple schedules, and each schedule can be assigned to multiple jobs. This relationship is stored in the msdb system database."
    },
    {
      "text": "What is a proxy account in SQL Server Agent?",
      "options": [
        "An account that runs all SQL Server Agent jobs by default",
        "A stored credential allowing a job step to execute as a designated user with specific permissions",
        "A temporary account created during job execution",
        "An account used only for multiserver administration"
      ],
      "correct": 1,
      "module": 4,
      "explanation": "A proxy account stores credentials that SQL Server Agent can use to execute specific job steps as a designated user. Proxy accounts are used when specific job steps require granular security rights — for example, backing up to a network share that the SQL Server Agent service account doesn't have access to."
    },
    {
      "text": "Which component in SQL Server Agent acts as an alias for an individual or group that can receive job notifications?",
      "options": [
        "Alert",
        "Notification",
        "Operator",
        "Proxy"
      ],
      "correct": 2,
      "module": 4,
      "explanation": "An Operator is an alias for an individual or group configured to receive notifications of job completions or alerts from the error log. Operators are defined by a name and contact information, typically mapping to an email distribution group."
    },
    {
      "text": "What is the recommended practice for configuring SQL Server Agent job notifications?",
      "options": [
        "Notify on success, failure, and completion for all jobs",
        "Notify only on failure to avoid excessive notifications for successful jobs",
        "Notify on completion only for critical system databases",
        "Disable all notifications and rely on external monitoring"
      ],
      "correct": 1,
      "module": 4,
      "explanation": "The recommended practice is to notify only on job failure. Notifying on every success creates excessive notifications that are usually ignored. Most DBAs configure notifications only for failures to focus on issues that require attention."
    },
    {
      "text": "Which service must be enabled for SQL Server Agent notifications and alerts to send email?",
      "options": [
        "SQL Server Service",
        "SQL Server Browser",
        "SQL Server Agent service",
        "Database Mail"
      ],
      "correct": 3,
      "module": 4,
      "explanation": "Database Mail must be enabled for SQL Server Agent notifications and alerts to send email. Both operators and alert notifications use the Database Mail subsystem to deliver email messages."
    },
    {
      "text": "At what severity level should SQL Server alerts typically be configured to notify administrators?",
      "options": [
        "Level 10 and higher",
        "Level 16 and higher",
        "Level 20 and higher",
        "All severity levels from 1 to 25"
      ],
      "correct": 1,
      "module": 4,
      "explanation": "A common practice is to raise alerts for all SQL Server errors of severity level 16 and higher, as these indicate errors that can be corrected by the user. Additional alerts can be configured for specific critical errors like storage errors or Availability Group failovers."
    },
    {
      "text": "In a multiserver environment, what is the role of the primary server in SQL Server Agent?",
      "options": [
        "It stores local copies of all jobs from target servers",
        "It distributes jobs to target servers and stores the master copy of job definitions",
        "It acts as a backup for the target server jobs",
        "It monitors target server performance metrics"
      ],
      "correct": 1,
      "module": 4,
      "explanation": "In a multiserver environment, the primary server stores the master source of jobs and distributes them to target servers. Target servers periodically connect to the primary server to update their job schedules. This enables defining a job once and deploying it across the enterprise."
    },
    {
      "text": "Which Azure service provides scheduled T-SQL script execution across multiple Azure SQL Databases as an alternative to SQL Agent?",
      "options": [
        "Azure Automation",
        "Elastic Jobs",
        "Logic Apps",
        "Azure Functions"
      ],
      "correct": 1,
      "module": 4,
      "explanation": "Elastic Jobs is the SQL Agent alternative for Azure SQL Database. It allows running T-SQL scripts across multiple servers, elastic pools, or databases on a schedule or as a one-time job. Unlike SQL Agent, Elastic Jobs is limited to executing T-SQL only."
    },
    {
      "text": "Which component of Elastic Jobs defines the collection of servers, elastic pools, or databases where a job will run?",
      "options": [
        "Target Group",
        "Job Agent",
        "Job Database",
        "Job Step"
      ],
      "correct": 0,
      "module": 4,
      "explanation": "The Target Group is the component of Elastic Jobs that defines the collection of servers, elastic pools, or single databases where a job will be executed. Targets can be dynamic (all databases at execution time) or static (specific list)."
    },
    {
      "text": "What is the minimum recommended service tier for the Elastic Jobs job database?",
      "options": [
        "Basic",
        "S0",
        "S1",
        "S3"
      ],
      "correct": 2,
      "module": 4,
      "explanation": "The recommended service tier for the Elastic Jobs job database is S1 or higher, depending on the number and frequency of jobs being executed. A higher service tier may be needed for more frequent or complex job executions."
    },
    {
      "text": "When using Elastic Jobs with a server-level target group, where must credentials be created to allow the job agent to enumerate databases?",
      "options": [
        "In each user database on the server",
        "In the master database of the server",
        "In the job database",
        "In the Azure Key Vault"
      ],
      "correct": 1,
      "module": 4,
      "explanation": "When a server or elastic pool is the target, you need to create a credential within the master database of the server so the job agent can enumerate the databases on that server. For a single database, only a database-level credential is needed."
    },
    {
      "text": "What is a key requirement for T-SQL scripts used in Elastic Jobs?",
      "options": [
        "They must use dynamic SQL",
        "They must be idempotent — safe to run multiple times",
        "They must be less than 100 lines",
        "They must include error handling with TRY/CATCH"
      ],
      "correct": 1,
      "module": 4,
      "explanation": "T-SQL scripts executed by Elastic Jobs should be idempotent, meaning if the job runs multiple times (due to failure and retry), it won't fail or produce unintended results. The same script should be safe to run multiple times without errors."
    },
    {
      "text": "Which PowerShell cmdlet is used to start an Elastic Job execution?",
      "options": [
        "Invoke-AzSqlElasticJob",
        "Start-AzSqlElasticJob",
        "Execute-AzSqlElasticJob",
        "Run-AzSqlElasticJob"
      ],
      "correct": 1,
      "module": 4,
      "explanation": "Start-AzSqlElasticJob is the PowerShell cmdlet used to start an Elastic Job execution. It takes a job object (created with New-AzSqlElasticJob) and initiates the job, returning execution details."
    },
    {
      "text": "In Azure Automation, how should a runbook authenticate to Azure resources?",
      "options": [
        "Using a stored username and password in the runbook code",
        "Using system-managed identity with Connect-AzAccount -Identity",
        "Using certificate-based authentication",
        "Using a service principal with client secret"
      ],
      "correct": 1,
      "module": 4,
      "explanation": "The recommended approach is to use a system-managed identity with Connect-AzAccount -Identity. This avoids storing credentials in the runbook. The Automation account's system identity must be granted the appropriate RBAC permissions on the target resources."
    },
    {
      "text": "What happens if an Azure Automation runbook is interrupted during execution?",
      "options": [
        "It resumes from the point of interruption",
        "It restarts from the beginning",
        "It logs the error and stops",
        "It automatically retries from the last checkpoint"
      ],
      "correct": 1,
      "module": 4,
      "explanation": "If a runbook is interrupted, it restarts from the beginning. This behavior requires runbooks to be written to support restarting if transient issues occur. Runbooks should check progress before initiating actions and handle being restarted gracefully."
    },
    {
      "text": "Which module must be imported into an Azure Automation account to use Azure SQL-related PowerShell cmdlets in a runbook?",
      "options": [
        "Az.Accounts only",
        "Az.SQL only",
        "Both Az.Accounts and Az.SQL",
        "AzureRM.Sql"
      ],
      "correct": 2,
      "module": 4,
      "explanation": "Both Az.Accounts (for authentication) and Az.SQL (for SQL-specific cmdlets) modules must be imported into the Automation account. Az.SQL depends on Az.Accounts, so both should be imported for Azure SQL management cmdlets."
    },
    {
      "text": "Which Azure Automation feature enables running runbooks on on-premises servers or Azure VMs outside the automation service?",
      "options": [
        "Azure Automation Schedules",
        "Hybrid Runbook Worker",
        "Azure Automation Credentials",
        "Update Management"
      ],
      "correct": 1,
      "module": 4,
      "explanation": "The Hybrid Runbook Worker feature enables Azure Automation runbooks to run on on-premises servers or Azure VMs. This is useful for scenarios like starting a VM, performing a SQL Server backup, and shutting down the VM."
    },
    {
      "text": "How can an Automation runbook be triggered when a specific metric threshold is exceeded?",
      "options": [
        "Create a schedule linked to the runbook",
        "Create a metric alert with an action group that includes the runbook",
        "Use the Azure Automation webhook feature",
        "Configure the runbook to run continuously"
      ],
      "correct": 1,
      "module": 4,
      "explanation": "Metric alerts can be configured with action groups that include an Automation Runbook action. When the alert condition is met (e.g., Total Jobs > 10), the action group triggers the specified runbook. This enables automated responses to monitoring conditions."
    },
    {
      "text": "What must be configured before Automation diagnostic logs can be forwarded to a Log Analytics workspace?",
      "options": [
        "A Log Analytics workspace linked to the Automation account",
        "Diagnostic settings for the Automation account",
        "Azure Monitor agent installation",
        "A storage account for log retention"
      ],
      "correct": 1,
      "module": 4,
      "explanation": "Before using Log Analytics to query Automation jobs data, you must configure Diagnostic settings for your Automation Account. This forwards runbook job status and job streams to the Log Analytics workspace for advanced querying."
    },
    {
      "text": "When using T-SQL to monitor Elastic Jobs, which view in the job database shows all execution statuses for all jobs?",
      "options": [
        "sys.job_executions",
        "jobs.job_executions",
        "dbo.JobHistory",
        "sys.dm_elastic_job_executions"
      ],
      "correct": 1,
      "module": 4,
      "explanation": "The jobs.job_executions view in the job database shows all execution statuses for all jobs. You can filter by job_name, and check the is_active column to see currently active executions."
    },
    {
      "text": "Which Azure Logic Apps SQL Server connector action returns a single record from a database table?",
      "options": [
        "Execute Query",
        "Get row",
        "Select",
        "Run stored procedure"
      ],
      "correct": 1,
      "module": 4,
      "explanation": "The Get row action in the SQL Server connector returns a single record from a specified table. It requires a table name and row ID. Other actions include Insert row, Delete row, Execute Query, and Run stored procedure."
    },
    {
      "text": "What is a limitation of Logic Apps SQL Server triggers (e.g., When an item is created)?",
      "options": [
        "They require a Premium Logic Apps plan",
        "They return only one row from the selected table",
        "They only work with Azure SQL Database, not SQL Server",
        "They require a stored procedure to be created first"
      ],
      "correct": 1,
      "module": 4,
      "explanation": "SQL Server triggers in Logic Apps return only one row from the selected table. To process data, you must add actions after the trigger — such as creating a file or sending an email with the returned data."
    },
    {
      "text": "What is a key difference between the built-in SQL Server connector (Standard workflows) and the managed SQL Server connector in Logic Apps?",
      "options": [
        "The built-in connector is faster but more expensive",
        "The built-in connector has no triggers and only the Execute Query action",
        "The built-in connector only supports SQL Server on-premises",
        "The built-in connector requires a gateway installation"
      ],
      "correct": 1,
      "module": 4,
      "explanation": "The built-in SQL Server connector for Standard workflows in single-tenant Logic Apps has no triggers and only supports the Execute Query action. The managed connector supports triggers and multiple actions including Get row, Insert, and Run stored procedure."
    },
    {
      "text": "A Bicep deployment to a resource group fails partway through. Where in the Azure portal should you look first to identify which specific resource operation failed and why?",
      "options": [
        "The subscription-level Activity log",
        "The resource group's Deployments blade, which lists per-operation status and error details",
        "The Cost Management + Billing blade",
        "Azure Monitor Metrics for the resource group"
      ],
      "correct": 1,
      "module": 4,
      "explanation": "The resource group's Deployments blade shows the history of deployments and, for a failed deployment, lets you drill into the individual operations to see which resource failed and the associated error code/message. The Activity log and Metrics blades are useful for other purposes but don't break down a deployment operation-by-operation the way the Deployments blade does."
    },
    {
      "text": "True or False: The Azure CLI command 'az deployment operation group list' can be used to retrieve the status and error details of each individual resource operation within a specific resource group deployment.",
      "options": [
        "True",
        "False"
      ],
      "correct": 0,
      "type": "truefalse",
      "module": 4,
      "explanation": "True. 'az deployment operation group list' (given a resource group and deployment name) returns the operations that make up a deployment, including each operation's provisioning state and error information, which is the primary way to diagnose exactly which resource in a template failed and why."
    },
    {
      "text": "You suspect that a resource originally deployed through an ARM template has since drifted from its source template because someone modified it manually in the Azure portal. Which approach lets you detect that drift?",
      "options": [
        "Enable Azure Policy compliance scanning only",
        "Use the resource group's 'Export template' feature to export the resource's current configuration and diff it against the source template in source control",
        "Run 'az deployment group validate' against the original template",
        "Check the resource's tags for a 'last modified' value"
      ],
      "correct": 1,
      "module": 4,
      "explanation": "Exporting the current template for a resource group (via the Automation section's 'Export template') captures the resource's actual live configuration, which can then be compared against the source template held in version control to identify configuration drift. Validation only checks whether a template is well-formed and deployable, not whether a live resource has since diverged from it."
    },
    {
      "text": "A SQL Server Agent job step that copies a backup file to a network share fails with a permissions error, even though earlier steps in the same job complete successfully. What is the most likely cause and fix?",
      "options": [
        "The job's schedule is misconfigured; recreate the schedule",
        "The SQL Server Agent service account cannot access the share; assign a proxy account with credentials that have access to that step",
        "DBCC CHECKDB has detected corruption; run a repair",
        "The database is in the SIMPLE recovery model; switch to FULL"
      ],
      "correct": 1,
      "module": 4,
      "explanation": "A step-level permissions failure like this is the classic symptom of the SQL Server Agent service account lacking rights to a resource (such as a backup share) that a specific step needs. The fix is to configure a proxy account with credentials that have the required access and assign it to that job step, rather than changing the recovery model or schedule, which are unrelated to the failure."
    },
    {
      "text": "In a multiserver SQL Server Agent environment, a job that runs successfully on the primary server is not executing on one particular target server at its scheduled time. What should you check first?",
      "options": [
        "Whether the target server has recently reconnected to the primary server to pick up job and schedule updates",
        "Whether Database Mail is enabled on the primary server",
        "Whether DBCC CHECKDB has been run on the target server",
        "Whether an operator has been assigned to the job"
      ],
      "correct": 0,
      "module": 4,
      "explanation": "In a multiserver topology, target servers periodically reconnect to the primary server to receive the master copy of jobs and schedule updates. A target server that has fallen out of contact with the primary is the most likely reason it isn't executing a job that runs fine elsewhere. Database Mail, DBCC CHECKDB, and operators are unrelated to a target server failing to pick up scheduled jobs."
    },
    {
      "text": "An elastic job appears to have stalled partway through its most recent execution, and you need to see the status of each individual target database it ran against. Which PowerShell cmdlet provides that per-target detail?",
      "options": [
        "Get-AzSqlElasticJobExecution",
        "Get-AzSqlElasticJobStepExecution",
        "Get-AzSqlElasticJobTargetExecution",
        "Get-AzSqlElasticJob"
      ],
      "correct": 2,
      "module": 4,
      "explanation": "Get-AzSqlElasticJobTargetExecution returns per-target execution detail (which specific databases succeeded, failed, or are still running) for a given job execution. Get-AzSqlElasticJobExecution returns overall job execution status, and Get-AzSqlElasticJobStepExecution returns step-level (not target-level) detail."
    },
    {
      "text": "Select all of the valid scopes at which an ARM or Bicep template can be deployed.",
      "options": [
        "Resource group",
        "Subscription",
        "Availability zone",
        "Management group",
        "Tenant"
      ],
      "correct": [0, 1, 3, 4],
      "type": "multi",
      "module": 4,
      "explanation": "ARM and Bicep templates can be deployed at four scopes: resource group, subscription, management group, and tenant, each with its own deployment cmdlet (New-AzResourceGroupDeployment, New-AzSubscriptionDeployment, New-AzManagementGroupDeployment, New-AzTenantDeployment). 'Availability zone' is not a deployment scope — it's a physical datacenter grouping used for resource resiliency."
    },
    {
      "text": "True or False: Azure SQL Elastic Jobs can execute both T-SQL scripts and PowerShell scripts as job steps, making them a full replacement for SQL Server Agent's scripting capabilities.",
      "options": [
        "True",
        "False"
      ],
      "correct": 1,
      "type": "truefalse",
      "module": 4,
      "explanation": "False. Elastic Jobs execute T-SQL scripts only. They are the SQL Agent equivalent for Azure SQL Database, but unlike SQL Server Agent (which can run PowerShell, CmdExec, SSIS, and other step types), Elastic Jobs are limited strictly to T-SQL."
    },
    {
      "text": "A SQL Server Agent job script that runs correctly on-premises is deployed unmodified to run against an Azure SQL Managed Instance. Which statement about this scenario is most accurate?",
      "options": [
        "It will always fail because Managed Instance does not support SQL Server Agent",
        "It may fail or behave differently because of minor T-SQL differences between SQL Server and Managed Instance",
        "It will run identically because Managed Instance is fully T-SQL compatible with no exceptions",
        "It will fail only if the job uses a proxy account"
      ],
      "correct": 1,
      "module": 4,
      "explanation": "Azure SQL Managed Instance supports most SQL Server Agent capabilities, but there are minor T-SQL surface-area differences between on-premises SQL Server and Managed Instance. A script written and tested on one platform can require adjustment when ported to the other — this is a common root cause when a previously working job script starts failing after a Managed Instance migration."
    },
    {
      "text": "When configuring a metric alert rule on an Azure Automation account's runbook jobs, what happens if you do not specify a dimension to scope the alert?",
      "options": [
        "The alert rule fails to save",
        "The alert defaults to monitoring only the most recently created runbook",
        "No filter is applied, so the alert evaluates the signal across all runbooks and statuses",
        "The alert automatically scopes to the runbook with the highest failure rate"
      ],
      "correct": 2,
      "module": 4,
      "explanation": "A metric alert on an Automation account can optionally be scoped with a dimension (for example, to a specific runbook name or job status). If no dimension is specified, no filter is applied, meaning the alert evaluates the chosen signal across all runbooks and statuses rather than a narrowed subset."
    }
  ];

  if (typeof window.__dp300 === 'undefined') {
    window.__dp300 = { modules: [], questions: [] };
  }

  window.__dp300.questions = window.__dp300.questions.concat(questions);

  if (window.__dp300.modules.length < 4) {
    window.__dp300.modules[3] = "Skill 4: Configure and manage automation of tasks";
  }
})();
