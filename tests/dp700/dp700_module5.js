// Module 5: CI/CD & Administration
(function() {
  var questions = [
{
    "text": "A Fabric workspace contains a lakehouse, a warehouse, and a semantic model. A user has the Contributor role on the workspace. What can the user do?",
    "options": [
      "Read data from the lakehouse Files folder but not the Tables folder",
      "Create new items in the workspace and run existing items",
      "Only view items but not create or modify them",
      "Manage workspace settings and access"
    ],
    "correct": 1,
    "module": 5,
    "explanation": "Contributor can create, modify, and run items but cannot manage workspace settings or permissions. The Files folder access is not controlled by Contributor role per se; read access to data depends on item permissions and OneLake roles. Contributor can create new items and run existing pipelines, notebooks, etc."
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
    "module": 5,
    "explanation": "Deployment pipelines are the built-in Fabric feature for promoting content between workspaces (e.g., Dev → Test → Prod). Git integration connects to source control but does not directly deploy between workspaces. REST APIs can be used programmatically but are not the primary feature. Workspace apps are for distributing content to consumers."
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
    "module": 5,
    "explanation": "Viewers can see items in the workspace but by default have no access to read data from lakehouses or warehouses; they require explicit OneLake security roles or item permissions to read data. Viewers cannot create, edit, share, or run items."
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
    "module": 5,
    "explanation": "Only Admin can manage workspace settings and access. Member can manage content but not permissions. Contributor can create and modify items but cannot manage settings. Viewer is read-only."
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
    "module": 5,
    "explanation": "Domains provide logical groupings of workspaces to define governance boundaries (e.g., Finance, Sales) and allow delegation of administration (domain admins). They do not replace workspaces or directly control item access; access is still managed at workspace and item level. Domains do not enable Git integration."
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
    "module": 5,
    "explanation": "F64 or higher capacities allow users with Fabric Free licenses to view Power BI content shared to them. Not all features are available on smaller SKUs (e.g., Copilot requires F64). Capacity is managed at the capacity level, not workspace only. Capacity directly affects Spark performance (CU allocation)."
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
    "module": 5,
    "explanation": "Git integration is configured per workspace, connecting to a branch in a GitHub or Azure DevOps repo. It is not tenant-only, does not require special capacity (works with any capacity), and supports many Fabric items, not just Power BI."
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
    "module": 5,
    "explanation": "Monitor Hub is the centralized interface for monitoring job executions (pipelines, dataflows, Spark jobs, etc.). Admin portal holds tenant settings and audit logs. Capacity Metrics app shows capacity usage. Audit logs show user actions, not job execution details."
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
    "module": 5,
    "explanation": "The Deployment Pipeline REST API includes an endpoint like `POST /deployments/{deploymentId}/stages/{stageId}/deploy` to deploy content. GET /workspaces/{workspaceId}/items lists items, does not deploy. POST /git/commit commits to Git, not workspace deployment."
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
    "module": 5,
    "explanation": "Item permissions (e.g., Share, Read, ReadData) can override workspace roles by granting additional access. They are not limited to Read (Share, Build, etc. exist) and are available for many item types. They complement workspace roles, not replace them."
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
    "module": 5,
    "explanation": "Viewer role provides read-only access to item metadata, but to read data from a lakehouse, you must grant ReadData permission (via OneLake security roles or item permissions). Contributor and Member would allow modification. No workspace role would make it hard to discover the lakehouse."
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
    "module": 5,
    "explanation": "Git integration in Fabric is manual: the developer must use the Source control panel to commit changes to the connected branch. Changes are not automatic, nor do they auto-create pull requests."
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
    "module": 5,
    "explanation": "Deployment pipelines perform an upsert: items that exist in both stages are updated, new items are created, and items that exist only in the target stage are left untouched. This allows incremental promotion."
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
    "module": 5,
    "explanation": "Git operations (commit, sync) have dedicated Git REST APIs. Deployment pipeline operations have their own REST APIs. You need both for programmatic CI/CD. Admin and monitoring APIs are not for these operations."
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
    "module": 5,
    "explanation": "The Monitor Hub allows you to drill into a failed pipeline run and view activity-level details, including error messages. Audit logs show who did what, not error details. OneLake catalog Govern tab shows governance metadata. Capacity Metrics shows capacity usage."
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
    "module": 5,
    "explanation": "By default, Viewer role only allows viewing item metadata, not reading data. To read data, you must grant OneLake security roles (e.g., DefaultReader) or item ReadData permissions. The Viewer is not automatically added to DefaultReader."
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
    "module": 5,
    "explanation": "The Fabric admin (tenant admin) controls tenant-wide settings (feature availability, export policies, etc.). Capacity admin manages capacity, domain admin manages domains, workspace admin manages workspace."
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
    "module": 5,
    "explanation": "Tenant settings can include exceptions. Enabling for entire org except a security group means all users not in that group can export. The setting is effective and not overridden by item-level controls unless stricter."
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
    "module": 5,
    "explanation": "Delegating Certification allows the domain admin to define who can certify items (certifiers) within their domain. They cannot override all tenant settings, create capacities, or manage workspaces outside the domain."
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
    "module": 5,
    "explanation": "F64 or higher capacities include Premium capabilities, allowing Free license users to consume Power BI reports if they have Viewer role (or equivalent) on the workspace. Pro or PPU licenses are not required."
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
    "module": 5,
    "explanation": "Audit logs in the Admin portal capture user actions, including exports. You can filter by activity type (e.g., 'Export') and time range. Monitor Hub shows job runs, not user export actions. Capacity Metrics shows utilization. OneLake catalog shows data discovery."
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
    "module": 5,
    "explanation": "Domains are for governance and organization, not for access control. Access is still managed by workspace roles and item permissions. Domains do not automatically restrict access to department users."
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
    "module": 5,
    "explanation": "Workspaces not assigned to a Fabric capacity run on shared capacity (free tier) with limited functionality and performance, not suitable for production. They are not auto-assigned, are accessible, and trial capacity is separate."
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
    "module": 5,
    "explanation": "Branching workspaces in Fabric (using Git integration) allows developers to work in isolation without affecting the shared dev workspace. Changes are later merged via pull request. It does not create production copies, auto-deploy, or grant admin access."
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
    "module": 5,
    "explanation": "The Certification tenant setting allows you to enable certification and specify which security groups can certify items. Limiting to 'Data Stewards' achieves the goal. Disabling would prevent all. Enabling for all would not restrict."
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
    "module": 5,
    "explanation": "Monitor Hub is for detailed job-level monitoring (pipeline runs, dataflow refreshes). The admin monitoring workspace (available to Fabric admins) provides aggregated platform-wide metrics, adoption trends, and capacity usage."
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
    "module": 5,
    "explanation": "The most efficient way is to use Microsoft Entra ID security groups and assign licenses to the groups in the Microsoft 365 admin center. This scales to many users. Individual assignment is manual. Licenses are not auto-assigned."
  },
  {
    "module": 5,
    "text": "You must enforce column-level security on a salary column in a warehouse. Which T-SQL statement is the correct way to deny access to a specific role?",
    "options": [
      "DENY SELECT ON Employees(Salary) TO [FinanceRole]",
      "REVOKE SELECT ON Employees FROM [FinanceRole]",
      "DENY UPDATE ON Employees(Salary) TO [FinanceRole]",
      "ALTER TABLE Employees DISABLE COLUMN Salary"
    ],
    "correct": 0,
    "explanation": "DENY SELECT ON table(column) TO role is the syntax for column-level security. REVOKE removes a grant, not deny. DENY UPDATE is for updates, not selects. DISABLE COLUMN is not a T-SQL command."
  },
  {
    "module": 5,
    "text": "A CI/CD pipeline needs to automatically promote items from a dev workspace to prod after successful validation. Which Fabric feature should be used?",
    "options": [
      "Deployment pipelines",
      "Git integration",
      "REST API",
      "Workspace apps"
    ],
    "correct": 0,
    "explanation": "Deployment pipelines are designed for promoting content between stages (dev/test/prod) and can be automated via REST APIs. Git integration is for source control, not promotion. REST API alone is not a feature, but can be used with deployment pipelines. Workspace apps are for distribution."
  },
  {
    "module": 5,
    "text": "Which role can manage workspace settings and assign permissions in a Fabric workspace?",
    "options": [
      "Admin",
      "Member",
      "Contributor",
      "Viewer"
    ],
    "correct": 0,
    "explanation": "Only Admin can manage workspace settings and assign permissions. Member can manage content but not permissions. Contributor can create/modify content. Viewer is read-only."
  },
  {
    "module": 5,
    "text": "You want to give a service principal read-only access to a specific lakehouse table. Which permission should you grant?",
    "options": [
      "GRANT SELECT ON TableName TO [ServicePrincipal]",
      "GRANT READ TO [ServicePrincipal]",
      "ADD MEMBER ServicePrincipal TO [ReaderRole]",
      "DENY UPDATE ON TableName TO [ServicePrincipal]"
    ],
    "correct": 0,
    "explanation": "GRANT SELECT on the table grants read access to the service principal. GRANT READ is not a valid T-SQL statement for tables. Adding to ReaderRole may grant broader access. DENY UPDATE does not grant read."
  },
  {
    "module": 5,
    "text": "Which of the following is NOT a valid action type in Activator?",
    "options": [
      "Email",
      "Teams",
      "Power Automate",
      "Azure Function"
    ],
    "correct": 3,
    "explanation": "Activator supports Email, Teams, Power Automate, and Fabric item actions. Azure Function is not a direct action type; you can call it via Power Automate."
  },
  {
    "module": 5,
    "text": "You need to schedule a pipeline to run every 15 minutes. Which trigger type should you configure?",
    "options": [
      "Scheduled trigger with recurrence of 15 minutes",
      "Event-driven trigger on blob creation",
      "Manual trigger only",
      "Dataflow refresh trigger"
    ],
    "correct": 0,
    "explanation": "Scheduled trigger with recurrence is the correct way to run a pipeline on a fixed interval (every 15 minutes). Event-driven trigger reacts to events, not time. Manual trigger requires manual start. Dataflow refresh trigger is for dataflows."
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
    "correct": 1,
    "explanation": "The specific permission for viewing query insights is MONITOR QUERY INSIGHTS. VIEW SERVER STATE is for DMVs. READ DATABASE allows reading data. ADMINISTER BULK is for COPY INTO."
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
    "correct": 1,
    "explanation": "COPY INTO supports managed identity (workspace identity) and SAS tokens for authenticating to ADLS. SQL authentication is for the database, not external storage. Windows auth and OAuth client credentials are not supported directly."
  },
  {
    "module": 5,
    "text": "Which function safely incorporates user input into a dynamic SQL string in a Fabric warehouse?",
    "options": [
      "QUOTENAME",
      "CONCAT",
      "STRING_AGG",
      "FORMATMESSAGE"
    ],
    "correct": 0,
    "explanation": "QUOTENAME escapes and quotes identifiers, preventing SQL injection. CONCAT, STRING_AGG, and FORMATMESSAGE do not provide injection protection."
  },
  {
    "module": 5,
    "text": "You need to mask email addresses in a column. Which dynamic data masking function should you use?",
    "options": [
      "email()",
      "partial()",
      "random()",
      "default()"
    ],
    "correct": 0,
    "explanation": "email() is the DDM function specifically for email addresses, showing first letter and '.com' suffix."
  },
  {
    "module": 5,
    "text": "Which Git branch strategy is recommended for a team of 5 developers working on Fabric items?",
    "options": [
      "Direct commits to main branch",
      "Feature branches with pull requests to a development branch",
      "Each developer has their own repository",
      "Git is not recommended for teams"
    ],
    "correct": 1,
    "explanation": "Feature branches with pull requests to a development branch allows code review, testing, and isolation before merging, preventing conflicts and broken deployments to production."
  },
  {
    "module": 5,
    "text": "A deployment pipeline fails with \"cannot overwrite item locked by another deployment\". What is the most likely cause?",
    "options": [
      "The target workspace is full",
      "Another deployment is in progress to the same stage",
      "The source workspace has conflicting items",
      "The user lacks permissions"
    ],
    "correct": 1,
    "explanation": "Deployment pipelines lock the target stage during deployment to prevent conflicts. This error indicates another deployment is already running to the same workspace/stage."
  },
  {
    "module": 5,
    "text": "Which Fabric role allows a user to create and share workspace apps but not manage workspace settings?",
    "options": [
      "Admin",
      "Member",
      "Contributor",
      "Viewer"
    ],
    "correct": 1,
    "explanation": "Member can manage content, including creating and sharing apps, but cannot manage permissions or workspace settings. Admin can manage settings. Contributor can create content but may not share apps. Viewer is read-only."
  },
  {
    "module": 5,
    "text": "You need to audit all access to a specific lakehouse table over the last 90 days. Where should you look?",
    "options": [
      "Monitor Hub",
      "Audit logs (Admin portal) filtered by item ID",
      "OneLake catalog activity pane",
      "Table history via DESCRIBE HISTORY"
    ],
    "correct": 1,
    "explanation": "Audit logs in the Admin portal capture access events and can be filtered by item ID. Monitor Hub shows job runs, not user access. DESCRIBE HISTORY shows table changes, not who read it."
  },
  {
    "module": 5,
    "text": "Which Fabric capacity SKU is the minimum required for Copilot across all workloads?",
    "options": [
      "F2",
      "F16",
      "F64",
      "F128"
    ],
    "correct": 2,
    "explanation": "Copilot requires Fabric capacity F64 or higher (or P1). Smaller SKUs like F2, F16 do not support Copilot features."
  },
  {
    "module": 5,
    "text": "Which of the following describes a Fabric domain?",
    "options": [
      "A security boundary that restricts workspace access to specific users",
      "A logical grouping of workspaces for governance and delegated administration",
      "A container for Fabric capacities",
      "A replacement for workspaces in large organizations"
    ],
    "correct": 1,
    "explanation": "Domains organize workspaces into logical groups (e.g., Finance, Sales) and allow domain admins to delegate governance settings such as certification and data lineage policies. They do not control access."
  },
  {
    "module": 5,
    "text": "Which of the following describes the Fabric Monitor Hub?",
    "options": [
      "A tool to view capacity utilization across the tenant",
      "A centralized interface to track job executions (pipelines, dataflows, Spark jobs) and view detailed run logs",
      "A dashboard for auditing user access to items",
      "A workspace for monitoring Power BI report usage"
    ],
    "correct": 1,
    "explanation": "The Monitor Hub shows the status, start/end times, and details of Fabric job executions. You can drill into failures, retry runs, and view Spark logs. It is the primary operational monitoring tool."
  },
  {
    "module": 5,
    "text": "Which of the following describes the purpose of a deployment pipeline in Fabric?",
    "options": [
      "To synchronize workspace content with a Git repository",
      "To promote content (e.g., lakehouses, reports) between stages (Dev → Test → Prod) using zero-copy cloning and deployment rules",
      "To automate the creation of Fabric capacities",
      "To deploy Fabric items to external cloud providers"
    ],
    "correct": 1,
    "explanation": "Deployment pipelines allow you to assign workspaces to stages and then promote items from one stage to the next. Deployment rules can swap connection strings (e.g., Dev lakehouse → Prod lakehouse) automatically."
  },

  // ── True / False ──────────────────────────────────────────────────────────
  {
    "text": "True or False: Fabric workspace Git integration supports connecting a workspace to both GitHub and Azure DevOps repositories.",
    "options": ["True", "False"],
    "correct": 0,
    "module": 5,
    "explanation": "True. Fabric supports Git integration with both GitHub and Azure DevOps (Repos) as the remote Git provider. Only one repository branch can be connected to a workspace at a time."
  },
  {
    "text": "True or False: In Fabric Git integration, an item's Git sync state of 'Conflict' means the item was modified in both the workspace and the remote Git branch simultaneously.",
    "options": ["True", "False"],
    "correct": 0,
    "module": 5,
    "explanation": "True. The 'Conflict' sync state occurs when the same item has been changed both in the Fabric workspace (uncommitted local changes) and in the remote Git branch (someone pushed a change). The conflict must be resolved before syncing."
  },
  {
    "text": "True or False: In a Fabric deployment pipeline, promotion from Dev to Test requires all items to be promoted simultaneously — partial promotion of selected items is not supported.",
    "options": ["True", "False"],
    "correct": 1,
    "module": 5,
    "explanation": "False. Fabric deployment pipelines allow selective promotion — you can choose which specific items (e.g., only the updated notebook and its linked Lakehouse) to deploy to the next stage, rather than promoting everything at once."
  },
  {
    "text": "True or False: The recommended best practice for Fabric CI/CD is to connect ALL workspace stages (Dev, Test, Prod) to the same Git repository branch.",
    "options": ["True", "False"],
    "correct": 1,
    "module": 5,
    "explanation": "False. The recommended pattern is to connect ONLY the Dev workspace to Git. The Dev workspace is where developers commit changes. Promotion to Test and Prod is handled via deployment pipelines, not by having Test/Prod workspaces connected to different Git branches. This avoids conflicting commits from pipeline-promoted content."
  },
  {
    "text": "True or False: The Fabric REST API can be used to programmatically trigger a Git commit from a workspace to its connected repository.",
    "options": ["True", "False"],
    "correct": 0,
    "module": 5,
    "explanation": "True. The Fabric REST API exposes a 'Commit to Git' endpoint that allows automating the commit step from a CI/CD pipeline (e.g., Azure DevOps pipeline or GitHub Actions). This is used to build fully automated Git-based workflows without manual intervention in the Fabric UI."
  },

  // ── Multi-select ──────────────────────────────────────────────────────────
  {
    "text": "Which of the following Git sync states can appear on a Fabric workspace item after connecting the workspace to a Git repository? (Select all that apply)",
    "type": "multi",
    "options": [
      "Synced (workspace matches the connected Git branch)",
      "Uncommitted changes (workspace has changes not yet committed to Git)",
      "Update required (Git branch has changes not yet pulled into the workspace)",
      "Detached (workspace item has no Git history)"
    ],
    "correct": [0, 1, 2],
    "module": 5,
    "explanation": "A (Synced), B (Uncommitted changes), and C (Update required) are the three valid positive sync states, plus Conflict when both sides changed. D ('Detached') is not a real Fabric Git sync state — all connected items have a tracked state. Items that have never been committed would show as uncommitted, not detached."
  },
  {
    "text": "Which of the following Fabric REST API operations relate to Git integration? (Select all that apply)",
    "type": "multi",
    "options": [
      "Commit workspace changes to Git",
      "Update workspace from Git (pull latest)",
      "Get Git connection status for a workspace",
      "Deploy items from Dev stage to Test stage"
    ],
    "correct": [0, 1, 2],
    "module": 5,
    "explanation": "A (Commit to Git), B (Update from Git), and C (Get status) are all Fabric Git integration REST API operations. D (deploy between pipeline stages) is a Deployment Pipeline API operation, not a Git integration API. The two API groups are separate: Git APIs manage source control sync; Pipeline APIs manage promotion between environments."
  },
  {
    "text": "Which of the following deployment pipeline capabilities help adapt items for each environment without manual editing? (Select all that apply)",
    "type": "multi",
    "options": [
      "Deployment rules to change data source connections per stage",
      "Deployment rules to change parameter values per stage",
      "Automatic renaming of items to include the stage name",
      "Pre-deployment and post-deployment hooks via Azure DevOps"
    ],
    "correct": [0, 1],
    "module": 5,
    "explanation": "A and B are valid deployment rule capabilities. Deployment rules can swap the connected data source (e.g., Dev Lakehouse → Prod Lakehouse) and override parameter values per stage. C is wrong — Fabric does not automatically rename items with stage names. D is wrong — Fabric deployment pipelines do not natively integrate Azure DevOps hooks; REST API calls can be invoked from DevOps pipelines externally, but it is not a built-in hook mechanism."
  },
  {
    "text": "Which of the following are valid reasons to use Fabric deployment pipelines INSTEAD OF (or in addition to) Git branches for environment promotion? (Select all that apply)",
    "type": "multi",
    "options": [
      "Deployment pipelines can swap data source connections per stage without code changes",
      "Deployment pipelines support comparing item differences between stages visually",
      "Deployment pipelines eliminate the need for code review before promotion",
      "Deployment pipelines allow selective item promotion without deploying the entire workspace"
    ],
    "correct": [0, 1, 3],
    "module": 5,
    "explanation": "A, B, and D are valid reasons for deployment pipelines. Connection swapping (A) handles environment-specific config. Visual diff comparison (B) helps reviewers see what changed. Selective promotion (D) avoids promoting untested items. C is wrong — deployment pipelines do not eliminate the need for code review; they complement Git-based review, not replace it."
  }

  ];
  
  if (typeof window.__dp700 === 'undefined') {
    window.__dp700 = { modules: [], questions: [] };
  }
  
  window.__dp700.questions = window.__dp700.questions.concat(questions);
  
  if (window.__dp700.modules.length < 5) {
    window.__dp700.modules[4] = "Module 5: CI/CD & Administration";
  }
})();



