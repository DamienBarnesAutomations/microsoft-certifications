// DP-700 flashcards, tagged with the skill (study guide outline id) each one covers.
window.DP700_FLASHCARDS = [
  {
    "id": "m1-c18",
    "type": "term",
    "skill": "1.1.1",
    "front": "What is Apache Spark in Microsoft Fabric?",
    "back": "A distributed processing framework for large-scale data analytics. Fabric provides managed Spark pools with autoscaling, dynamic allocation, native execution engine optimization, and support for Python, Scala, R, Java, and SQL."
  },
  {
    "id": "m1-c19",
    "type": "term",
    "skill": "1.1.1",
    "front": "What are the two Spark pool types in Fabric and how do they differ?",
    "back": "<b>Starter pools:</b> Default pools with pre-configured settings, suitable for development and testing. They start quickly and are shared across workspaces.<br><br><b>Custom pools:</b> User-defined pools with specific node families, sizes, autoscale ranges, and dynamic allocation settings. Tailored for production workloads with predictable resource requirements."
  },
  {
    "id": "m1-c20",
    "type": "term",
    "skill": "1.1.1",
    "front": "What is node family in Spark pool configuration?",
    "back": "The VM hardware type assigned to Spark nodes. Options include <b>Memory Optimized</b> (E-series, for data-intensive workloads), <b>Compute Optimized</b> (F-series, for CPU-heavy jobs), etc. Choosing the right node family impacts performance and cost."
  },
  {
    "id": "m1-c21",
    "type": "term",
    "skill": "1.1.1",
    "front": "What is autoscale in Spark pools?",
    "back": "A feature that automatically adds or removes nodes (within a configured min-max range) based on workload demand. Helps optimize cost during idle periods and scale out during peak processing."
  },
  {
    "id": "m1-c22",
    "type": "term",
    "skill": "1.1.1",
    "front": "What is dynamic allocation in Spark?",
    "back": "A Spark-level setting (vs pool-level autoscale) that allows executors to scale up/down within a Spark application based on task queue size. Controlled by <code>spark.dynamicAllocation.enabled</code>, <code>spark.dynamicAllocation.minExecutors</code>, and <code>spark.dynamicAllocation.maxExecutors</code>."
  },
  {
    "id": "m1-c25",
    "type": "term",
    "skill": "1.1.1",
    "front": "What is high concurrency mode in Fabric Spark?",
    "back": "A session mode that allows multiple users to share a single Spark session, reducing startup latency. It enables interactive analytics where users can run notebooks concurrently against the same session without waiting for individual session initialization."
  },
  {
    "id": "m1-c26",
    "type": "term",
    "skill": "1.1.1",
    "front": "What is MLflow in the context of Fabric Spark?",
    "back": "An open-source platform for managing the ML lifecycle, integrated into Fabric Spark. It provides experiment tracking (metrics, parameters, artifacts), model registry, and model deployment capabilities within the Fabric environment."
  },
  {
    "id": "m1-c27",
    "type": "compare",
    "skill": "1.1.1",
    "front": "Compare Spark runtimes vs environments in Fabric.",
    "back": "<b>Spark runtimes:</b> Pre-defined versions of Spark, libraries, and connectors (e.g., Runtime 1.1, 1.2). They determine the base Spark version and built-in package versions. Immutable after creation.<br><br><b>Environments:</b> Customizable configurations layered on top of runtimes. Allow you to install additional libraries (Python/R/Java), set Spark properties, and define session configurations without changing the runtime."
  },
  {
    "id": "m1-c29",
    "type": "compare",
    "skill": "1.1.1",
    "front": "Compare Starter vs Custom Spark pools.",
    "back": "<b>Starter pools:</b> Pre-configured, shared across workspaces, quick to start. Limited configuration control. Best for dev/test and ad-hoc exploration.<br><br><b>Custom pools:</b> Fully configurable (node family, size, autoscale range, dynamic allocation). Dedicated to specific workspaces. Best for production workloads with predictable compute needs and performance requirements."
  },
  {
    "id": "m1-c30",
    "type": "term",
    "skill": "1.1.1",
    "front": "What are Spark sessions in Fabric?",
    "back": "A Spark session is the unified entry point for interacting with Spark functionality. In Fabric, sessions are created per notebook or job definition. Settings include session timeouts, executor count, memory, and environment references. Sessions persist for the lifetime of the notebook or job unless explicitly terminated."
  },
  {
    "id": "m1-c31",
    "type": "scenario",
    "skill": "1.1.1",
    "front": "Your team of 10 data analysts needs to run interactive Spark queries simultaneously with minimal startup delay. What feature should you use?",
    "back": "<b>Solution:</b> High concurrency mode.<br><br><b>Reasoning:</b> High concurrency mode allows multiple users to share a single Spark session, eliminating per-user session startup time. Analysts get near-instant query execution without waiting 1-3 minutes for a new Spark session to initialize."
  },
  {
    "id": "m5-c25",
    "type": "term",
    "skill": "1.1.2",
    "front": "What is the five-level hierarchy in Microsoft Fabric?",
    "back": "<b>Tenant → Capacity → Domains → Workspaces → Items</b>. The tenant is the top-level Azure AD tenant; capacity provides billable compute; domains group workspaces logically; workspaces contain items (reports, notebooks, etc.)."
  },
  {
    "id": "m5-c26",
    "type": "term",
    "skill": "1.1.2",
    "front": "What are the four tiers of admin roles in Fabric?",
    "back": "1. <b>Fabric Admin</b> — full tenant-wide control via Admin portal<br>2. <b>Capacity Admin</b> — manages a specific capacity (pause/resume/scale, assign workspaces)<br>3. <b>Domain Admin</b> — manages a domain and its workspaces<br>4. <b>Workspace Admin</b> — manages a single workspace (roles, content)"
  },
  {
    "id": "m5-c28",
    "type": "term",
    "skill": "1.1.2",
    "front": "What are Domains in Fabric and what capabilities do they provide?",
    "back": "Domains are <b>logical groupings</b> of workspaces (e.g., by department or data domain). They provide <b>no access control</b> (purely organizational). Domains support <b>delegated admin</b> (Domain Admin role) and <b>subdomains</b> for hierarchical nesting."
  },
  {
    "id": "m5-c33",
    "type": "compare",
    "skill": "1.1.2",
    "front": "Compare Fabric Admin, Capacity Admin, Domain Admin, and Workspace Admin.",
    "back": "<b>Fabric Admin</b>: tenant-wide, all settings, Azure AD role<br><b>Capacity Admin</b>: per-capacity, manage SKU/settings/assignments<br><b>Domain Admin</b>: per-domain, assign workspaces, subdomains<br><b>Workspace Admin</b>: per-workspace, manage roles/content/sharing"
  },
  {
    "id": "m5-c39",
    "type": "edge",
    "skill": "1.1.2",
    "front": "Do Domains provide any access control or security boundaries?",
    "back": "<b>No.</b> Domains are purely <b>logical/organizational</b> groupings of workspaces. They do NOT provide access control, security isolation, or RBAC boundaries. A user with access to workspaces in different domains can access data across those domains freely."
  },
  {
    "id": "m2-c1",
    "type": "term",
    "skill": "1.1.3",
    "front": "What is Microsoft Fabric and how does OneLake relate to ADLS Gen2?",
    "back": "Microsoft Fabric is a unified SaaS platform for analytics.<br>OneLake is the single-tenant, multi-workspace data lake built on <code>ADLS Gen2</code> with <code>Delta-Parquet</code> as the native storage format. Every workspace gets its own OneLake folder automatically."
  },
  {
    "id": "dp700-fc-001",
    "type": "term",
    "skill": "1.1.3",
    "front": "Where is the OneLake shortcut cache set up?",
    "back": "Workspace settings, OneLake tab: a toggle, a retention period of 1 to 28 days (reset on each access) and a Reset cache button."
  },
  {
    "id": "dp700-fc-002",
    "type": "edge",
    "skill": "1.1.3",
    "front": "Which shortcuts does the OneLake shortcut cache help, and what does it skip?",
    "back": "It helps external shortcuts to GCS, S3, S3-compatible storage and on-premises gateway sources. Files over 1 GB are not cached."
  },
  {
    "id": "dp700-fc-003",
    "type": "term",
    "skill": "1.1.3",
    "front": "What does OneLake diagnostics record?",
    "back": "Data access events from OneLake, written to a lakehouse you choose. Control-plane changes such as roles, shortcuts and sharing go to the Fabric audit log."
  },
  {
    "id": "dp700-fc-004",
    "type": "term",
    "skill": "1.1.4",
    "front": "What is an Apache Airflow job in Fabric?",
    "back": "A managed Airflow environment in Data Factory where you author orchestration as Python DAGs. It runs Airflow 2.10 on Python 3.12."
  },
  {
    "id": "dp700-fc-005",
    "type": "compare",
    "skill": "1.1.4",
    "front": "Compare an Airflow job with a pipeline.",
    "back": "<b>Airflow job:</b> code-first, Python DAGs, complex custom dependencies.<br><b>Pipeline:</b> visual, low-code activities, copy and notebook orchestration."
  },
  {
    "id": "dp700-fc-006",
    "type": "edge",
    "skill": "1.1.4",
    "front": "Can you change the Airflow version of an existing job?",
    "back": "No. Create a new job on the version you need."
  },
  {
    "id": "dp700-fc-007",
    "type": "term",
    "skill": "1.1.4",
    "front": "Which features do Fabric Airflow jobs support?",
    "back": "Git sync for DAGs, Azure Key Vault as a secrets backend, private package requirements, autoscale, high availability and deferrable operators. Private networks are not supported."
  },
  {
    "id": "m5-c1",
    "type": "term",
    "skill": "1.2.1",
    "front": "How is Git integration configured in Microsoft Fabric?",
    "back": "Git integration is configured <b>per workspace</b>. Each workspace connects to a single Git repository (GitHub or Azure DevOps) where items are synchronized as <b>platform-native</b> files (not exported)."
  },
  {
    "id": "m5-c2",
    "type": "term",
    "skill": "1.2.1",
    "front": "What are the two branching strategies supported by Fabric Git integration?",
    "back": "1. <b>Isolated workspace</b> — each branch maps to its own workspace, branches are kept separate<br>2. <b>Client tool</b> — a single workspace switches branches using git commands in VS Code or other tools; branch is changed client-side"
  },
  {
    "id": "m5-c5",
    "type": "term",
    "skill": "1.2.1",
    "front": "What REST APIs are available for CI/CD in Fabric?",
    "back": "Fabric exposes <b>Git REST APIs</b> (connect/disconnect workspace, get/update status, commit changes) and <b>Deployment Pipeline REST APIs</b> (create pipeline, assign workspace, deploy, list stages, manage rules) for programmatic CI/CD."
  },
  {
    "id": "m5-c6",
    "type": "compare",
    "skill": "1.2.1",
    "front": "Compare isolated workspace vs. client tool branching strategies.",
    "back": "<b>Isolated workspace</b>: each branch has its own workspace (strong isolation, ideal for team collaboration).<br><br><b>Client tool</b>: single workspace switches branches via git in client (simpler setup, suitable for individual dev; risk of unintended changes if branch forgotten)."
  },
  {
    "id": "m5-c8",
    "type": "scenario",
    "skill": "1.2.1",
    "front": "Your team of 5 developers needs to work on different features simultaneously in Fabric. Each feature may take days and should not interfere. Which branching strategy should you use?",
    "back": "Use <b>Isolated workspace</b> branching. Each developer (or feature team) gets their own workspace connected to their feature branch. This provides strong isolation so work-in-progress changes never affect others."
  },
  {
    "id": "m5-c9",
    "type": "edge",
    "skill": "1.2.1",
    "front": "What happens to existing workspace content when you first connect a workspace to a Git repo that already has files?",
    "back": "The workspace enters a <b>conflict state</b>. You must choose to either overwrite the workspace with the repo content or resolve conflicts manually. Fabric does NOT auto-merge. Always commit workspace content to an empty repo or a new branch first."
  },
  {
    "id": "dp700-fc-008",
    "type": "term",
    "skill": "1.2.2",
    "front": "What is a SQL database project?",
    "back": "A set of T-SQL source files that declare a database schema. Building it produces a .dacpac that SqlPackage can publish."
  },
  {
    "id": "dp700-fc-009",
    "type": "scenario",
    "skill": "1.2.2",
    "front": "Schema changes to a warehouse must be reviewed in pull requests and deployed by CI/CD. What do you use?",
    "back": "A database project in Git, built into a .dacpac and published with SqlPackage from the pipeline."
  },
  {
    "id": "dp700-fc-010",
    "type": "term",
    "skill": "1.2.2",
    "front": "How do you publish a .dacpac to a Fabric SQL database?",
    "back": "Use SqlPackage with the Publish action. The target database must already exist, and a package from another platform needs /p:AllowIncompatiblePlatform=true."
  },
  {
    "id": "dp700-fc-011",
    "type": "term",
    "skill": "1.2.2",
    "front": "Which editor creates and builds SQL database projects?",
    "back": "Visual Studio Code with the SQL Database Projects extension (SDK-style projects)."
  },
  {
    "id": "m2-c26",
    "type": "scenario",
    "skill": "1.2.3",
    "front": "Why is CI/CD especially critical for the Gold layer of the medallion architecture?",
    "back": "Gold tables are consumed directly by Power BI datasets, paginated reports, and external applications. A breaking schema change (renamed column, removed measure, changed data type) can <b>immediately break production dashboards</b>.<br><br>CI/CD ensures changes are validated, versioned, and deployed with rollback capability. Bronze and Silver can tolerate more ad-hoc changes since fewer downstream consumers depend on them."
  },
  {
    "id": "m5-c3",
    "type": "term",
    "skill": "1.2.3",
    "front": "What are Deployment Pipelines in Fabric and what stages do they use?",
    "back": "Deployment Pipelines allow content to flow through <b>Dev → Test → Production</b> stages. Stages include content <b>cloning</b> (copying items forward) and optional <b>deployment rules</b> (e.g., swapping connection strings or parameter values per stage)."
  },
  {
    "id": "m5-c4",
    "type": "term",
    "skill": "1.2.3",
    "front": "What is the 'combined approach' for CI/CD in Fabric?",
    "back": "In the combined approach, only the <b>Dev</b> stage is connected to Git. Changes flow Dev (Git-connected) → Test → Production, merging Git-based source control with deployment pipeline automation."
  },
  {
    "id": "m5-c7",
    "type": "compare",
    "skill": "1.2.3",
    "front": "Compare Deployment Pipelines with Git integration for CI/CD.",
    "back": "<b>Git integration</b>: source-control focused, item-level sync, branching/merging, works with GitHub/Azure DevOps, developer-oriented.<br><br><b>Deployment Pipelines</b>: environment-oriented (Dev/Test/Prod), content cloning with deployment rules, no merge conflicts, admin-friendly promotion flow."
  },
  {
    "id": "m2-c2",
    "type": "term",
    "skill": "1.3.1",
    "front": "What are the four workspace roles in Fabric and what can each do?",
    "back": "<b>Admin:</b> Full access, manage roles, share workspace<br><b>Member:</b> Read & write items, publish reports<br><b>Contributor:</b> Read & write items, cannot share<br><b>Viewer:</b> Read-only — can only view items (no write access)"
  },
  {
    "id": "m4-c19",
    "type": "term",
    "skill": "1.3.1",
    "front": "What tools can connect to Fabric Warehouse and what authentication is required?",
    "back": "Tools like <b>SSMS</b> (SQL Server Management Studio) and <b>ADS</b> (Azure Data Studio) can connect via TDS port <b>1433</b>. Only <b>Entra ID</b> (Azure AD) authentication is supported &mdash; SQL Server authentication is not available. You must specify the database name when connecting."
  },
  {
    "id": "m4-c30",
    "type": "term",
    "skill": "1.3.1",
    "front": "What are the requirements to connect SSMS to Fabric Warehouse?",
    "back": "Requirements:<br><b>Authentication:</b> Entra ID (Azure AD) only &mdash; no SQL Server auth<br><b>Port:</b> TDS port 1433<br><b>Database name:</b> Required in connection string<br><b>Server:</b> The Fabric Warehouse endpoint URL<br><b>Note:</b> SSMS 18.0 or later recommended for best compatibility."
  },
  {
    "id": "m5-c31",
    "type": "term",
    "skill": "1.3.1",
    "front": "Compare workspace apps vs. workspace roles for sharing.",
    "back": "<b>Workspace roles</b> (Admin/Member/Contributor/Viewer) grant direct access to the workspace and all its contents.<br><br><b>Workspace apps</b> are curated, read-only packages of reports/dashboards published to specific users or groups — they don't grant workspace access."
  },
  {
    "id": "m4-c46",
    "type": "term",
    "skill": "1.3.2",
    "front": "Differentiate workspace roles and item permissions in Fabric.",
    "back": "<b>Workspace roles</b> (Admin, Member, Contributor, Viewer) control access to the entire workspace. <b>Item permissions</b> are granular permissions on individual items (Read, ReadData, ReadAll) that can override workspace roles. For example, a Viewer can be granted ReadData on a specific Warehouse."
  },
  {
    "id": "dp700-fc-012",
    "type": "term",
    "skill": "1.3.2",
    "front": "What are the main item permissions on a Fabric item?",
    "back": "Read (metadata), ReadData (SQL data in delegated mode), ReadAll (OneLake data through DefaultReader) and Write."
  },
  {
    "id": "dp700-fc-013",
    "type": "edge",
    "skill": "1.3.2",
    "front": "How do item permissions combine with workspace roles?",
    "back": "They are additive. Item permissions can add access but never remove what a workspace role grants."
  },
  {
    "id": "dp700-fc-014",
    "type": "compare",
    "skill": "1.3.2",
    "front": "Compare user identity mode and delegated mode on a SQL analytics endpoint.",
    "back": "<b>User identity:</b> the caller's own permissions apply.<br><b>Delegated:</b> the item owner's identity reads the data, and ReadData is enough for callers."
  },
  {
    "id": "m2-c28",
    "type": "compare",
    "skill": "1.3.3",
    "front": "How do security requirements differ across Bronze, Silver, and Gold?",
    "back": "<b>Bronze:</b> Least restricted — raw data may still contain PII, but access is limited to engineering teams.<br><br><b>Silver:</b> Moderate — cleansed data shared with data analysts. RLS can be applied.<br><br><b>Gold:</b> Most restricted — business reports contain aggregated, presentation-ready data. Strict RLS/CLS, row-level permissions per department. Audit requirements are highest."
  },
  {
    "id": "m2-c33",
    "type": "term",
    "skill": "1.3.3",
    "front": "What security features do both Warehouse and SQL Analytics Endpoint share?",
    "back": "Both support:<br>• <b>RLS</b> (Row-Level Security) — filter rows by user predicate<br>• <b>CLS</b> (Column-Level Security) — mask/restrict sensitive columns<br>• <b>Views</b> — encapsulate and restrict access<br>• <b>Stored Procedures</b> — encapsulate logic<br><br>These are configured via T-SQL <code>CREATE SECURITY POLICY</code> and <code>GRANT</code> statements."
  },
  {
    "id": "m4-c48",
    "type": "term",
    "skill": "1.3.3",
    "front": "How does Row-Level Security (RLS) work in Fabric Warehouse?",
    "back": "RLS uses a <b>filter predicate</b> (inline table-valued function) applied via a <b>security policy</b> (<code>CREATE SECURITY POLICY ... ADD FILTER PREDICATE</code>). The predicate is evaluated automatically for every query. RLS has <b>no effect on INSERT</b> statements &mdash; only SELECT, UPDATE, and DELETE are filtered."
  },
  {
    "id": "m4-c49",
    "type": "term",
    "skill": "1.3.3",
    "front": "How does Column-Level Security (CLS) work and what is the DENY precedence rule?",
    "back": "CLS uses <b>GRANT</b> and <b>DENY</b> permissions on specific columns (<code>GRANT SELECT ON COLUMN</code> / <code>DENY SELECT ON COLUMN</code>). <b>DENY always wins</b> over GRANT &mdash; if a user is a member of one role with GRANT and another with DENY, DENY takes precedence. This is the same as the SQL Server security model."
  },
  {
    "id": "m4-c47",
    "type": "term",
    "skill": "1.3.4",
    "front": "What is Dynamic Data Masking (DDM) and what is its key security limitation?",
    "back": "DDM masks sensitive data at <b>query time</b> using the <code>MASKED WITH</code> clause (e.g. <code>ALTER TABLE ... ALTER COLUMN ... ADD MASKED WITH (FUNCTION = 'partial(0,\"XXX\",4)')</code>). <b>Key limitation:</b> DDM has a <b>side-channel risk</b> &mdash; users can infer masked values through aggregate queries or comparison logic if they have permission to write queries."
  },
  {
    "id": "dp700-fc-015",
    "type": "term",
    "skill": "1.3.4",
    "front": "Name the Dynamic Data Masking functions in a warehouse.",
    "back": "default(), email(), random(start, end) for numbers, and partial(prefix, padding, suffix) for custom strings."
  },
  {
    "id": "dp700-fc-016",
    "type": "edge",
    "skill": "1.3.4",
    "front": "Who sees unmasked data, and what grants it?",
    "back": "Admin, Member and Contributor (they have CONTROL). Others need the UNMASK permission. ALTER ANY MASK lets someone manage masks."
  },
  {
    "id": "dp700-fc-017",
    "type": "term",
    "skill": "1.3.4",
    "front": "Syntax to mask an email column.",
    "back": "ALTER TABLE t ALTER COLUMN Email ADD MASKED WITH (FUNCTION = 'email()')"
  },
  {
    "id": "dp700-fc-018",
    "type": "term",
    "skill": "1.3.5",
    "front": "Where do Fabric sensitivity labels come from?",
    "back": "Microsoft Purview Information Protection. Labels can carry protection settings and follow exports to Excel, PowerPoint and PDF."
  },
  {
    "id": "dp700-fc-019",
    "type": "edge",
    "skill": "1.3.5",
    "front": "How does label inheritance work for downstream items?",
    "back": "A report or dataset can inherit the label of the item it reads from, so a labeled semantic model labels its reports."
  },
  {
    "id": "dp700-fc-020",
    "type": "term",
    "skill": "1.3.5",
    "front": "Who can apply labels to items?",
    "back": "Users the tenant admin has allowed in the label tenant setting who also have edit permission on the item."
  },
  {
    "id": "dp700-fc-021",
    "type": "edge",
    "skill": "1.3.5",
    "front": "Are sensitivity labels stored when an item is exported to Git?",
    "back": "No. Sensitivity labels aren't supported in the Git export."
  },
  {
    "id": "m5-c32",
    "type": "term",
    "skill": "1.3.6",
    "front": "What is the difference between promoted and certified content in Fabric governance?",
    "back": "<b>Promoted</b> content is endorsed by the workspace owner or team — signals quality/readiness to the organization.<br><br><b>Certified</b> content has passed a formal <b>admin-defined review process</b> and carries the highest trust level. Certification is restricted to designated certifiers."
  },
  {
    "id": "m5-c34",
    "type": "compare",
    "skill": "1.3.6",
    "front": "Compare promoted vs. certified content endorsement.",
    "back": "<b>Promoted</b>: promoted by workspace members, no formal review, appears in 'Promoted' filter, easy to promote/demote.<br><br><b>Certified</b>: only certifiers (designated by admin) can certify, requires formal validation, appears in 'Certified' filter, stricter governance, higher trust."
  },
  {
    "id": "dp700-fc-022",
    "type": "compare",
    "skill": "1.3.6",
    "front": "Compare Promoted, Certified and Master data endorsement.",
    "back": "<b>Promoted:</b> anyone with write permission.<br><b>Certified:</b> only authorized certifiers after review.<br><b>Master data:</b> data items such as lakehouses that are the authoritative source."
  },
  {
    "id": "dp700-fc-023",
    "type": "term",
    "skill": "1.3.6",
    "front": "Where is certification enabled and who can certify?",
    "back": "The Certification tenant setting in the admin portal, with a certifier group. It can be delegated to a domain."
  },
  {
    "id": "dp700-fc-024",
    "type": "term",
    "skill": "1.3.7",
    "front": "Where do you search Fabric audit events?",
    "back": "The unified audit log in Microsoft Purview. Admins can also pull activity events through the admin activity events API or PowerShell."
  },
  {
    "id": "dp700-fc-025",
    "type": "edge",
    "skill": "1.3.7",
    "front": "Which events go to the Fabric audit log rather than OneLake diagnostics?",
    "back": "Control-plane changes: security roles, shortcuts, sharing and domain changes. OneLake diagnostics holds data access events."
  },
  {
    "id": "dp700-fc-026",
    "type": "scenario",
    "skill": "1.3.7",
    "front": "Compliance asks who exported a report last month. Where do you look?",
    "back": "The audit log in Microsoft Purview, filtered by the export activity and the date range."
  },
  {
    "id": "dp700-fc-027",
    "type": "term",
    "skill": "1.3.7",
    "front": "What does the admin monitoring workspace contain?",
    "back": "Prebuilt reports and semantic models on tenant usage and activity for admins to analyze."
  },
  {
    "id": "m5-c18",
    "type": "term",
    "skill": "1.3.8",
    "front": "What are OneLake Security Roles?",
    "back": "OneLake Security Roles provide <b>RBAC for tables, folders, and files</b> within a lakehouse. Permissions are <b>consistent across all compute engines</b> (Spark, SQL analytics endpoint, semantic models reading from OneLake)."
  },
  {
    "id": "m5-c19",
    "type": "term",
    "skill": "1.3.8",
    "front": "What is the DefaultReader role and when is it created?",
    "back": "The <b>DefaultReader</b> role is <b>auto-created</b> when you create a lakehouse. It grants read access to all workspace users at the OneLake level, ensuring existing workspace viewers can still read data by default."
  },
  {
    "id": "m5-c20",
    "type": "term",
    "skill": "1.3.8",
    "front": "What are the four components of an OneLake Security Role?",
    "back": "1. <b>Data</b> — the specific tables/folders/files the role applies to<br>2. <b>Permission</b> — Read or Read+Execute for each item<br>3. <b>Members</b> — users, groups, or service principals assigned<br>4. <b>Constraints</b> — optional row-level security filters using Spark SQL expressions"
  },
  {
    "id": "m5-c21",
    "type": "term",
    "skill": "1.3.8",
    "front": "What is the scope and limitation of OneLake Security Roles?",
    "back": "Roles are <b>per-lakehouse</b>. They <b>only affect Viewer and Read-only users</b> — members with higher workspace roles (Admin, Member, Contributor) bypass them. They restrict access at the OneLake storage layer."
  },
  {
    "id": "m5-c22",
    "type": "compare",
    "skill": "1.3.8",
    "front": "Compare OneLake Security Roles with Workspace Roles.",
    "back": "<b>OneLake Security Roles</b>: fine-grained, per-lakehouse, table/folder/file level, affects only Viewer/Read-only, defined in lakehouse security UI.<br><br><b>Workspace Roles</b>: coarse-grained, per-workspace, affects all items, Admin/Member/Contributor/Viewer, defined in workspace management."
  },
  {
    "id": "m5-c23",
    "type": "scenario",
    "skill": "1.3.8",
    "front": "You have a lakehouse with a 'Sales' table that should only be visible to the finance team, while other tables should be visible to all Viewers. How do you achieve this?",
    "back": "Create an <b>OneLake Security Role</b> for the Sales table with Read permission, assign only the finance team as members. The DefaultReader role already grants access to other tables for all workspace Viewers."
  },
  {
    "id": "m5-c24",
    "type": "edge",
    "skill": "1.3.8",
    "front": "Who can create and manage OneLake Security Roles?",
    "back": "Only <b>Workspace Admins and Members</b> can create and manage OneLake Security Roles. Contributors and Viewers cannot create them, even though members with Contributor role or higher bypass the role restrictions when accessing data."
  },
  {
    "id": "m1-c14",
    "type": "compare",
    "skill": "1.4.1",
    "front": "Compare control flow vs data transformation in Fabric Pipelines.",
    "back": "<b>Control flow:</b> Orchestration activities that govern execution order — <code>If Condition</code>, <code>ForEach</code>, <code>Until</code>, <code>Wait</code>, <code>Get Metadata</code>, etc. These do not move or transform data directly.<br><br><b>Data transformation:</b> Actual data movement and shaping done by <code>Copy Data</code>, <code>Dataflow</code>, <code>Notebook</code>, and <code>Stored Procedure</code> activities. These read, write, or process data."
  },
  {
    "id": "m1-c28",
    "type": "compare",
    "skill": "1.4.1",
    "front": "Compare Notebooks vs Spark Job Definitions in Fabric.",
    "back": "<b>Notebooks:</b> Interactive web-based development environments for ad-hoc analysis, exploration, and iterative development. Support multiple languages in cells, visualizations, and inline markdown. Best for data exploration and prototyping.<br><br><b>Spark Job Definitions:</b> Batch-oriented job configurations for production scheduling. They define a specific script/entry point, input parameters, and a target Spark pool. Best for automated, scheduled, or CI/CD-driven workloads."
  },
  {
    "id": "m2-c27",
    "type": "term",
    "skill": "1.4.1",
    "front": "What is the role of transformation vs orchestration in the medallion architecture?",
    "back": "<b>Transformation</b> (Dataflows Gen2, Notebooks) — moves & reshapes data between layers (Bronze → Silver → Gold). Handles the actual data processing logic.<br><br><b>Orchestration</b> (Pipelines) — schedules, sequences, and monitors the transformation executions. Manages dependencies, retries, and alerts.<br><br>Common pattern: Pipeline triggers a Notebook which performs a Bronze→Silver transformation."
  },
  {
    "id": "dp700-fc-028",
    "type": "scenario",
    "skill": "1.4.1",
    "front": "Small Excel cleanup by an analyst, low code. Which item?",
    "back": "Dataflow Gen2."
  },
  {
    "id": "m1-c11",
    "type": "term",
    "skill": "1.4.2",
    "front": "What are triggers in Fabric Data Pipelines?",
    "back": "Mechanisms that automatically execute pipelines based on a schedule (e.g., daily at 6 AM), on blob creation/events, or via a tumbling window. Triggers are the primary way to operationalize pipelines in production."
  },
  {
    "id": "dp700-fc-029",
    "type": "term",
    "skill": "1.4.2",
    "front": "What are the pipeline trigger types?",
    "back": "Run on demand, schedule, and event-based triggers (Azure Blob Storage, OneLake, job and workspace events)."
  },
  {
    "id": "dp700-fc-030",
    "type": "edge",
    "skill": "1.4.2",
    "front": "What are event-based pipeline triggers built on?",
    "back": "Activator, with events from Real-Time hub. Creating a trigger creates an Activator item."
  },
  {
    "id": "dp700-fc-031",
    "type": "edge",
    "skill": "1.4.2",
    "front": "Why is a schedule's parameter value ignored?",
    "back": "The parameter names in the schedule must match the pipeline parameter names exactly."
  },
  {
    "id": "m1-c10",
    "type": "term",
    "skill": "1.4.3",
    "front": "What are pipeline parameters in Fabric Data Pipelines?",
    "back": "Variables that allow pipelines to be dynamic and reusable. Parameters can be passed at runtime from triggers, child pipelines, or manual execution. They support default values and can be used in activities, datasets, and linked services."
  },
  {
    "id": "m1-c15",
    "type": "scenario",
    "skill": "1.4.3",
    "front": "You need to orchestrate a daily workflow: copy data from an on-premises SQL Server to a lakehouse, then run a Spark notebook to clean the data, then send a success/failure email. What should you use?",
    "back": "<b>Solution:</b> A Data Pipeline with activities: <code>Copy Data</code> (SQL to lakehouse) -> <code>Notebook</code> (Spark cleaning) -> <code>Web</code>/<code>Office 365 Outlook</code> (notification).<br><br><b>Reasoning:</b> Pipelines provide orchestration and control flow (sequencing, conditional logic, retry policies). A single pipeline chains these steps with dependency tracking and logging."
  },
  {
    "id": "dp700-fc-032",
    "type": "term",
    "skill": "1.4.3",
    "front": "Which expression returns a pipeline parameter and the current ForEach item?",
    "back": "@pipeline().parameters.name and @item()."
  },
  {
    "id": "dp700-fc-033",
    "type": "term",
    "skill": "1.4.3",
    "front": "How do you run one notebook from another and run several in parallel?",
    "back": "notebookutils.notebook.run(name, timeout, params) and notebookutils.notebook.runMultiple([...]) for a DAG of notebooks."
  },
  {
    "id": "m4-c12",
    "type": "term",
    "skill": "2.1.1",
    "front": "What is the purpose of staging tables in data warehouse loading?",
    "back": "Staging tables are intermediate tables used to <b>land raw source data</b> before transformation. They are typically truncated and reloaded (full load) and help isolate the warehouse from source system volatility. Staging tables can be hidden from end users in the semantic model."
  },
  {
    "id": "m4-c20",
    "type": "term",
    "skill": "2.1.1",
    "front": "How does the COPY INTO command ingest data into a Warehouse?",
    "back": "<code>COPY INTO</code> loads data from external storage (e.g. Azure Blob, ADLS Gen2) using <code>CREDENTIAL</code> for authentication (SAS token, Managed Identity, or Service Principal). It supports CSV, Parquet, and JSON formats and provides error handling options like MAXERRORS and ERRORFILE."
  },
  {
    "id": "m4-c21",
    "type": "term",
    "skill": "2.1.1",
    "front": "What are OPENROWSET and CTAS used for in data ingestion?",
    "back": "<b>OPENROWSET</b> reads external files directly (e.g. <code>SELECT * FROM OPENROWSET(BULK '...', FORMAT = 'CSV')</code>) without loading into a table. <b>CTAS</b> (CREATE TABLE AS SELECT) creates a new table from a query result &mdash; commonly used together as <code>CTAS WITH OPENROWSET</code> to load external data into a warehouse table in one step."
  },
  {
    "id": "m4-c22",
    "type": "compare",
    "skill": "2.1.1",
    "front": "Compare full load and incremental load ETL patterns.",
    "back": "<b>Full load:</b> Truncate the target table and reload all data. Simple, but inefficient for large datasets. Best for small reference tables or first-time loads.<br><br><b>Incremental load:</b> Only load new/changed data since the last run using watermark columns (LastModifiedDate, high-water mark). Efficient for large tables, reduces processing time and resource consumption."
  },
  {
    "id": "m4-c6",
    "type": "term",
    "skill": "2.1.2",
    "front": "What are the characteristics of a fact table in dimensional modeling?",
    "back": "Fact tables contain <b>measures</b> (numeric, quantifiable data) and <b>foreign keys</b> referencing dimension tables. Measures can be <b>additive</b> (summable across all dimensions), <b>semi-additive</b> (summable across some dimensions, e.g. account balances across time), or <b>non-additive</b> (cannot be summed, e.g. ratios)."
  },
  {
    "id": "m4-c7",
    "type": "term",
    "skill": "2.1.2",
    "front": "What are dimension tables and what keys do they contain?",
    "back": "Dimension tables provide descriptive context for facts. They contain a <b>surrogate key</b> (artificial, system-generated unique identifier, typically an identity column) and an <b>alternate key</b> (natural/business key from the source system, e.g. ProductCode or CustomerID)."
  },
  {
    "id": "m4-c8",
    "type": "compare",
    "skill": "2.1.2",
    "front": "Compare star schema and snowflake schema.",
    "back": "<b>Star schema:</b> Dimension tables are denormalized (all attributes in a single table). Simplest to query, fewer joins, best query performance.<br><br><b>Snowflake schema:</b> Dimension tables are normalized into sub-dimensions. Saves storage, but requires more joins and typically reduces query performance. In Fabric, star schema is preferred for most workloads."
  },
  {
    "id": "m4-c9",
    "type": "term",
    "skill": "2.1.2",
    "front": "What is SCD Type 2 and what columns are typically used to implement it?",
    "back": "SCD (Slowly Changing Dimension) Type 2 tracks historical changes by creating a new row for each change. Typical columns include:<br><code>EffectiveDate</code> (start date)<br><code>ExpiryDate</code> (end date, NULL for current)<br><code>IsCurrent</code> (1/0 flag for current row)<br><code>SurrogateKey</code> (unique per row)<br><code>NaturalKey</code> (same for all versions of an entity)"
  },
  {
    "id": "m4-c10",
    "type": "term",
    "skill": "2.1.2",
    "front": "What do SCD Types 0 through 6 cover in dimensional modeling?",
    "back": "<b>Type 0:</b> Fixed (no changes)<br><b>Type 1:</b> Overwrite (no history)<br><b>Type 2:</b> Row versioning (full history, effective/expiry dates)<br><b>Type 3:</b> Add alternate attribute column (limited history)<br><b>Type 4:</b> Mini-dimension (frequently changing attributes)<br><b>Type 5, 6:</b> Hybrid approaches combining Type 1, 2, and/or 3"
  },
  {
    "id": "m4-c11",
    "type": "term",
    "skill": "2.1.2",
    "front": "What is a time dimension and why is it important?",
    "back": "A time dimension is a standard dimension table with attributes like Year, Quarter, Month, Week, Day, DayOfWeek, FiscalPeriod, etc. It is critical because nearly all fact tables have a date foreign key, enabling time-based analysis, period-over-period comparisons, and date range filtering."
  },
  {
    "id": "m4-c15",
    "type": "scenario",
    "skill": "2.1.2",
    "front": "A Customer dimension tracks customer attributes like address and phone. When a customer changes address, you need to preserve the previous address for historical reporting on old orders. Which SCD type do you use?",
    "back": "Use <b>SCD Type 2</b>. It creates a new row with effective/expiry dates and an IsCurrent flag, so old fact rows still join to the correct customer version. The natural (business) key is shared across rows while the surrogate key is unique per version."
  },
  {
    "id": "dp700-fc-034",
    "type": "term",
    "skill": "2.1.3",
    "front": "What makes a Structured Streaming load restartable?",
    "back": "A checkpointLocation on the write stream. It stores offsets and state."
  },
  {
    "id": "dp700-fc-035",
    "type": "compare",
    "skill": "2.1.3",
    "front": "Compare trigger options for a streaming load.",
    "back": "<b>processingTime:</b> a micro-batch every interval.<br><b>availableNow:</b> process all available data and stop (incremental batch).<br><b>continuous:</b> low-latency experimental mode."
  },
  {
    "id": "dp700-fc-036",
    "type": "scenario",
    "skill": "2.1.3",
    "front": "The stream delivers duplicates at least once. How do you load silver?",
    "back": "foreachBatch with a Delta MERGE on the event ID, or dropDuplicates within a watermark."
  },
  {
    "id": "dp700-fc-037",
    "type": "scenario",
    "skill": "2.1.3",
    "front": "Raw events to a lakehouse and the latest to an Eventhouse. Pattern?",
    "back": "One Eventstream with two destinations."
  },
  {
    "id": "m2-c3",
    "type": "term",
    "skill": "2.2.1",
    "front": "What is the difference between Tables and Files in a Fabric Lakehouse?",
    "back": "<b>Tables</b> — managed Delta-Parquet directories registered in the Hive metastore. Queryable via SQL Analytics Endpoint, Spark, and Direct Lake.<br><br><b>Files</b> — raw storage area for unstructured or semi-structured data (JSON, images, etc.). Not queryable via SQL — accessed via Spark or shortcuts."
  },
  {
    "id": "m2-c4",
    "type": "term",
    "skill": "2.2.1",
    "front": "What is the SQL Analytics Endpoint and what are its limitations?",
    "back": "An auto-generated, <b>read-only</b> T-SQL interface over Lakehouse Delta tables. Supports <code>SELECT</code>, views, stored procedures, RLS/CLS.<br><br><b>Limitations:</b> No <code>INSERT/UPDATE/DELETE</code>, no <code>CREATE TABLE</code>, no <code>MERGE</code>, no DDL of any kind. It reflects the live state of your Delta tables."
  },
  {
    "id": "m2-c5",
    "type": "term",
    "skill": "2.2.1",
    "front": "How do schemas work in a Fabric Lakehouse and what is the four-part namespace?",
    "back": "Schemas are <b>enabled by default</b> on new Lakehouses. A schema named <code>dbo</code> is auto-created.<br><br>Four-part namespace: <code>[workspace].[lakehouse].[schema].[table]</code><br><br>Example: <code>SalesAnalytics.WWILakehouse.dbo.Orders</code>"
  },
  {
    "id": "m2-c9",
    "type": "compare",
    "skill": "2.2.1",
    "front": "Compare Tables vs Files in a Lakehouse.",
    "back": "<b>Tables</b>: Registered in Hive metastore, Delta-Parquet format, queryable via SQL Analytics Endpoint and Spark.<br><br><b>Files</b>: Raw storage area, any format, NOT registered, NOT queryable via SQL — only via Spark or shortcuts."
  },
  {
    "id": "m2-c22",
    "type": "term",
    "skill": "2.2.1",
    "front": "What is the Medallion Architecture and what are its three layers?",
    "back": "A data design pattern that organizes data into progressively refined layers:<br><br><b>Bronze:</b> Raw ingested data, unaltered — the immutable source of truth<br><b>Silver:</b> Cleansed, validated, deduplicated — ready for analytics<br><b>Gold:</b> Business-ready — star schemas, aggregated, curated for reporting<br><br>Data flows left-to-right (Bronze → Silver → Gold) with increasing structure."
  },
  {
    "id": "m2-c23",
    "type": "term",
    "skill": "2.2.1",
    "front": "What is the purpose and key characteristic of the Bronze layer?",
    "back": "The Bronze layer holds <b>raw, unaltered</b> data exactly as received from the source. It is the <b>immutable source of truth</b> — never modified or deleted.<br><br>Use cases: Full audit trail, re-processing from scratch, debugging ingestion issues. Data is usually full snapshots or append-only logs."
  },
  {
    "id": "m2-c25",
    "type": "term",
    "skill": "2.2.1",
    "front": "What is the Gold layer optimized for?",
    "back": "The Gold layer contains <b>business-ready</b> data models — typically star schemas with fact and dimension tables. Optimized for:<br>• Power BI reports & dashboards<br>• ML feature engineering<br>• Downstream consumption by analysts<br><br>This layer is the most sensitive to schema changes — <b>CI/CD is critical</b> to prevent breaking reports."
  },
  {
    "id": "m2-c29",
    "type": "term",
    "skill": "2.2.1",
    "front": "What is a Fabric Warehouse and how does it differ from the SQL Analytics Endpoint?",
    "back": "A Fabric Warehouse is a <b>standalone, full read-write</b> relational database with complete T-SQL support:<br><br>• <b>DDL:</b> <code>CREATE TABLE/VIEW/PROCEDURE</code><br>• <b>DML:</b> <code>INSERT/UPDATE/DELETE/MERGE</code><br>• <b>ACID</b> via Delta Lake under the hood<br>• Independent of any Lakehouse<br><br>By contrast, the SQL Analytics Endpoint is <b>read-only</b> and auto-created with a Lakehouse."
  },
  {
    "id": "m2-c30",
    "type": "compare",
    "skill": "2.2.1",
    "front": "Compare Fabric Warehouse vs SQL Analytics Endpoint (read/write, DDL, use cases).",
    "back": "<b>Fabric Warehouse:</b><br>• Read-write T-SQL<br>• Full DDL/DML/MERGE<br>• Standalone (no Lakehouse required)<br>• Use for ETL, staging, data engineering<br><br><b>SQL Analytics Endpoint:</b><br>• Read-only T-SQL<br>• SELECT + views/stored procedures only<br>• Auto-created with Lakehouse<br>• Use for BI & ad-hoc queries over lakehouse tables<br><br>Both support: views, stored procedures, RLS, CLS."
  },
  {
    "id": "m2-c31",
    "type": "scenario",
    "skill": "2.2.1",
    "front": "You need to run a MERGE statement to upsert data into a table. You also need RLS and CLS. You do NOT have a Lakehouse. What do you use?",
    "back": "Use a <b>Fabric Warehouse</b>. It supports <code>MERGE</code> (DML), RLS, and CLS — and is standalone, so no Lakehouse is required.<br><br>The SQL Analytics Endpoint cannot run <code>MERGE</code> (read-only) and always requires a Lakehouse."
  },
  {
    "id": "m2-c32",
    "type": "edge",
    "skill": "2.2.1",
    "front": "What happens if you try to run CREATE TABLE or INSERT against the SQL Analytics Endpoint?",
    "back": "It <b>fails</b>. The SQL Analytics Endpoint is strictly <b>read-only</b>. It auto-generates from the Lakehouse's Delta tables and cannot be modified via T-SQL.<br><br>To write data, you must either:<br>1. Use Spark/Notebook to write to the Lakehouse<br>2. Use a Fabric Warehouse (which supports full DDL/DML)"
  },
  {
    "id": "m4-c1",
    "type": "term",
    "skill": "2.2.1",
    "front": "What DDL and DML operations are allowed in a Fabric Warehouse?",
    "back": "Full DDL (CREATE, ALTER, DROP) and full DML (INSERT, UPDATE, DELETE, MERGE) are supported. Warehouses provide ACID transactions via T-SQL and support cross-database three-part naming (Database.Schema.Table) within the same workspace."
  },
  {
    "id": "m4-c2",
    "type": "term",
    "skill": "2.2.1",
    "front": "What is the SQL Analytics Endpoint and how is it created?",
    "back": "The SQL Analytics Endpoint is a read-only T-SQL interface that is <b>auto-created</b> when you create a Lakehouse. It cannot be created independently and does not support DDL or DML operations."
  },
  {
    "id": "m4-c3",
    "type": "compare",
    "skill": "2.2.1",
    "front": "Compare Fabric Warehouse and SQL Analytics Endpoint.",
    "back": "<table><tr><td><b>Feature</b></td><td><b>Warehouse</b></td><td><b>SQL Analytics Endpoint</b></td></tr><tr><td>DDL/DML</td><td>Full support</td><td>Read-only</td></tr><tr><td>ACID</td><td>Yes</td><td>No</td></tr><tr><td>MERGE</td><td>Supported</td><td>Not supported</td></tr><tr><td>Cross-db 3-part naming</td><td>Within workspace</td><td>No</td></tr><tr><td>Creation</td><td>Explicitly created</td><td>Auto-created with Lakehouse</td></tr></table>"
  },
  {
    "id": "m4-c4",
    "type": "scenario",
    "skill": "2.2.1",
    "front": "You need to load and transform data from multiple sources into a central repository with full ACID guarantees, then run MERGE operations for upserts. Should you use a Warehouse or a SQL Analytics Endpoint?",
    "back": "Use a <b>Warehouse</b>. The SQL Analytics Endpoint is read-only and does not support DDL, DML, MERGE, or ACID transactions. A Warehouse is required when you need to write data, run transformations, or enforce transactional consistency."
  },
  {
    "id": "m4-c16",
    "type": "term",
    "skill": "2.2.1",
    "front": "What storage format does Fabric Warehouse use and where is data stored?",
    "back": "Fabric Warehouse stores all data in <b>Delta format</b> (Parquet + transaction log) on <b>OneLake</b>. This means data is automatically available to other Fabric experiences (Lakehouse, Notebooks, Semantic Models) without duplication, and benefits from Delta's ACID transactions, time travel, and schema evolution."
  },
  {
    "id": "m1-c1",
    "type": "term",
    "skill": "2.2.2",
    "front": "What is Dataflows Gen2 in Microsoft Fabric?",
    "back": "A cloud-scale ETL technology built on Power Query Online. It allows you to ingest, transform, and load data using a visual UI or code, with destinations being optional (output can be used downstream). It supports horizontal partitioning for large-scale data processing."
  },
  {
    "id": "m1-c2",
    "type": "term",
    "skill": "2.2.2",
    "front": "What is Power Query Online in the context of Dataflows Gen2?",
    "back": "The web-based version of Power Query used as the transformation interface in Dataflows Gen2. It provides a visual, step-by-step editor with M-expression language support for building data transformations."
  },
  {
    "id": "m1-c3",
    "type": "term",
    "skill": "2.2.2",
    "front": "What is horizontal partitioning in Dataflows Gen2?",
    "back": "A scalability feature that splits large datasets into smaller partitions processed in parallel. Each partition is handled independently, improving throughput for large-scale ETL workloads."
  },
  {
    "id": "m1-c4",
    "type": "compare",
    "skill": "2.2.2",
    "front": "Compare ETL vs ELT patterns in the context of Dataflows Gen2.",
    "back": "<b>ETL (Extract-Transform-Load):</b> Data is extracted from source, transformed in a staging layer (Dataflows Gen2), then loaded to the destination. Best when heavy transformations are needed before storage.<br><br><b>ELT (Extract-Load-Transform):</b> Data is extracted and loaded raw into the destination first, then transformed using the destination's compute (e.g., Spark SQL or T-SQL). Best when raw data must be preserved or source transformation power is limited."
  },
  {
    "id": "m1-c5",
    "type": "scenario",
    "skill": "2.2.2",
    "front": "Your team needs to build a reusable ETL transformation that combines data from three different sources (SQL Server, SharePoint, and a CSV file) using a visual interface. Non-technical analysts need to modify the logic later. What should you use?",
    "back": "<b>Solution:</b> Dataflows Gen2 with Power Query Online.<br><br><b>Reasoning:</b> Dataflows Gen2 provides a visual, low-code interface (Power Query Online) ideal for analysts. It supports multiple source types including databases, SharePoint, and files. The output can feed downstream artifacts like datasets or pipelines."
  },
  {
    "id": "m1-c6",
    "type": "edge",
    "skill": "2.2.2",
    "front": "What happens when a Dataflows Gen2 has no destination configured?",
    "back": "Destinations in Dataflows Gen2 are optional. When no destination is set, the transformed output is still available as a staging output that can be consumed by downstream artifacts (e.g., a Data Pipeline using the <code>Dataflow</code> activity or a DirectQuery dataset). This enables a &#39;transform-only&#39; pattern where data doesn&#39;t need to be persisted in a lakehouse."
  },
  {
    "id": "m1-c7",
    "type": "edge",
    "skill": "2.2.2",
    "front": "What are the key limitations of Dataflows Gen2?",
    "back": "Key limitations include: (1) No support for real-time streaming data — batch-only. (2) Limited to Power Query Online transformations — complex custom logic may require notebooks. (3) Scaling large data volumes can require careful partitioning strategy. (4) Not suitable for very large (>100 GB) single-table transformations without partitioning. (5) No built-in scheduling — relies on pipeline triggers."
  },
  {
    "id": "m1-c13",
    "type": "compare",
    "skill": "2.2.2",
    "front": "Compare Copy Data activity vs Dataflows Gen2 for data movement.",
    "back": "<b>Copy Data:</b> Fast, scalable data movement at the row level with optional column mapping. Best for bulk copy between two systems. Supports staging and schema evolution.<br><br><b>Dataflows Gen2:</b> Transformation-focused with Power Query engine. Best when you need complex data shaping, merging, or cleansing during ingestion. Has higher overhead but richer transformation capabilities."
  },
  {
    "id": "m2-c7",
    "type": "term",
    "skill": "2.2.3",
    "front": "What are OneLake shortcuts and where can they point?",
    "back": "Shortcuts are virtual references to data stored elsewhere — no data is copied.<br><br>Can point to:<br>• Another Fabric Lakehouse / Warehouse<br>• ADLS Gen2 (with ACLs)<br>• Amazon S3<br>• Dataverse<br><br>The referenced data appears <b>as if</b> it is local in OneLake."
  },
  {
    "id": "dp700-fc-038",
    "type": "term",
    "skill": "2.2.3",
    "front": "What happens when you delete a shortcut versus a file through a shortcut?",
    "back": "Deleting the shortcut leaves the target alone. Deleting files through it deletes them in the target if you have write permission."
  },
  {
    "id": "dp700-fc-039",
    "type": "term",
    "skill": "2.2.3",
    "front": "Shortcut placement rules in a lakehouse.",
    "back": "In Tables only at the top level (or schema level). In Files anywhere. Names can't contain % or +."
  },
  {
    "id": "dp700-fc-040",
    "type": "term",
    "skill": "2.2.3",
    "front": "Which sources can a shortcut reference?",
    "back": "OneLake items, ADLS Gen2, Amazon S3, S3-compatible, Google Cloud Storage, Azure Blob, Dataverse and more."
  },
  {
    "id": "dp700-fc-041",
    "type": "term",
    "skill": "2.2.4",
    "front": "What is mirroring?",
    "back": "Continuous replication of an external database into Delta tables in OneLake, with a SQL analytics endpoint over them. Latency is seconds."
  },
  {
    "id": "dp700-fc-042",
    "type": "term",
    "skill": "2.2.4",
    "front": "How is mirroring billed?",
    "back": "Replication compute is free. Storage is free up to 1 TB per capacity unit purchased. Query compute is billed as usual."
  },
  {
    "id": "dp700-fc-043",
    "type": "compare",
    "skill": "2.2.4",
    "front": "Compare database mirroring, metadata mirroring and open mirroring.",
    "back": "<b>Database mirroring:</b> replicates data from a supported source.<br><b>Metadata mirroring:</b> syncs catalog metadata and uses shortcuts (Azure Databricks).<br><b>Open mirroring:</b> your application writes change files in the documented format."
  },
  {
    "id": "dp700-fc-044",
    "type": "term",
    "skill": "2.2.4",
    "front": "Where do you monitor mirroring?",
    "back": "Monitor replication on the mirrored database: status and replicated rows per table, with stop and start."
  },
  {
    "id": "m1-c8",
    "type": "term",
    "skill": "2.2.5",
    "front": "What is a Data Pipeline in Microsoft Fabric?",
    "back": "A cloud-based orchestration engine built on Azure Data Factory (ADF) architecture. It provides 200+ connectors, control flow activities, copy activities, and triggers for scheduling and orchestrating data movement and transformation across services."
  },
  {
    "id": "m1-c9",
    "type": "term",
    "skill": "2.2.5",
    "front": "What is the Copy Data activity in Fabric Data Pipelines?",
    "back": "A built-in activity that ingests data from a source connector to a destination connector with optional column mapping and transformations. It handles schema drift, supports staged copy, and can be used with or without a staging area."
  },
  {
    "id": "m1-c17",
    "type": "term",
    "skill": "2.2.5",
    "front": "What are pipeline templates in Fabric?",
    "back": "Pre-built pipeline definitions for common scenarios (e.g., incremental load, data copy from common sources). Templates accelerate development by providing reusable patterns that can be customized with parameters."
  },
  {
    "id": "m2-c8",
    "type": "edge",
    "skill": "2.2.5",
    "front": "What file formats does 'Load to Table' support in Fabric Lakehouse?",
    "back": "Only <b>CSV</b> and <b>Parquet</b>. If you try to load JSON, XML, or any other format via the UI Load to Table option, it will fail.<br><br>For other formats, use a Notebook or Dataflow Gen2."
  },
  {
    "id": "m1-c32",
    "type": "term",
    "skill": "2.2.6",
    "front": "What is a Spark DataFrame?",
    "back": "A distributed collection of data organized into named columns, conceptually equivalent to a table in a relational database or a DataFrame in Python pandas. DataFrames are lazily evaluated and distributed across cluster nodes for parallel processing."
  },
  {
    "id": "m1-c33",
    "type": "term",
    "skill": "2.2.6",
    "front": "How do you load data into a Spark DataFrame in Fabric?",
    "back": "Use the <code>spark.read</code> API with appropriate format: <code>spark.read.format(&#39;delta&#39;).load(&#39;path&#39;)</code>, <code>spark.read.csv(&#39;path&#39;)</code>, <code>spark.read.parquet(&#39;path&#39;)</code>, or <code>spark.read.table(&#39;tableName&#39;)</code>. Fabric also supports the <code>Lakehouse</code> shortcut for easy table references."
  },
  {
    "id": "m1-c34",
    "type": "compare",
    "skill": "2.2.6",
    "front": "Compare schema inference vs explicit schema in Spark DataFrames.",
    "back": "<b>Schema inference:</b> Spark automatically detects column names and types by sampling data (<code>spark.read.option(&#39;inferSchema&#39;, &#39;true&#39;).csv(...)</code>). Convenient but slower as it requires an extra pass through the data. Best for exploration.<br><br><b>Explicit schema:</b> You define the schema using <code>StructType</code> and <code>StructField</code> before reading. Faster (no inference pass) and ensures type correctness. Best for production pipelines where schema is known upfront."
  },
  {
    "id": "m1-c35",
    "type": "term",
    "skill": "2.2.6",
    "front": "What are common DataFrame operations in Spark?",
    "back": "Common operations include: <code>select()</code> (choose columns), <code>where()</code>/<code>filter()</code> (row filtering), <code>groupBy()</code> (aggregation), <code>orderBy()</code>/<code>sort()</code> (ordering), <code>join()</code> (merge DataFrames), <code>withColumn()</code> (add/modify columns), <code>drop()</code> (remove columns), and <code>distinct()</code> (deduplication)."
  },
  {
    "id": "m1-c36",
    "type": "compare",
    "skill": "2.2.6",
    "front": "Compare overwrite vs append save modes in Spark DataFrames.",
    "back": "<b>Overwrite (<code>mode(&#39;overwrite&#39;)</code>):</b> Replaces the entire target data directory/table with the current DataFrame content. All existing partitions are removed. Best for full refreshes.<br><br><b>Append (<code>mode(&#39;append&#39;)</code>):</b> Adds new data to the existing target while preserving existing rows. Best for incremental loads. Additional modes include <code>ignore</code> (skip if exists) and <code>errorIfExists</code> (default — throw if target exists)."
  },
  {
    "id": "m1-c40",
    "type": "term",
    "skill": "2.2.6",
    "front": "What is the Spark catalog and how do managed vs external tables differ?",
    "back": "<b>Spark catalog:</b> A metastore that stores table metadata (schema, location, format). In Fabric, it&#39;s backed by the lakehouse.<br><br><b>Managed tables:</b> Spark controls both the metadata and the data location (under the warehouse directory). Dropping the table deletes the data.<br><br><b>External tables:</b> Spark controls only the metadata; data lives at a user-specified location. Dropping the table preserves the data files."
  },
  {
    "id": "m1-c41",
    "type": "compare",
    "skill": "2.2.6",
    "front": "Compare managed vs external tables in the Spark catalog.",
    "back": "<b>Managed tables:</b> Data stored in the default warehouse directory. Dropping the table DROPS both metadata and data. Simpler to use. Best for temp/transform data.<br><br><b>External tables:</b> Data stored at a user-specified external path. Dropping the table preserves the underlying data files. Best for data shared across systems or when you need to keep raw data after table deletion."
  },
  {
    "id": "m1-c42",
    "type": "term",
    "skill": "2.2.6",
    "front": "What are temp views in Spark?",
    "back": "Temporary named references to DataFrames that are scoped to the current Spark session. Created with <code>df.createOrReplaceTempView(&#39;name&#39;)</code>. They allow you to run Spark SQL queries against DataFrame content but disappear after the session ends. Use <code>createGlobalTempView()</code> for session-spanning visibility."
  },
  {
    "id": "m1-c43",
    "type": "term",
    "skill": "2.2.6",
    "front": "What is the %%sql magic in Fabric Spark notebooks?",
    "back": "A cell magic command in Spark notebooks (Python kernel) that switches the cell context from Python to SQL. Allows running Spark SQL queries directly using the current Spark session. Example: <code>%%sql<br>SELECT region, SUM(sales) FROM sales_data GROUP BY region</code>"
  },
  {
    "id": "m1-c44",
    "type": "term",
    "skill": "2.2.6",
    "front": "What is toPandas() in Spark DataFrames?",
    "back": "A method that converts a Spark DataFrame to a pandas DataFrame (<code>spark_df.toPandas()</code>). Used for visualization (e.g., with matplotlib or seaborn) and small-scale analysis. <b>Warning:</b> collects all data to the driver node — only use with small/aggregated results to avoid out-of-memory errors."
  },
  {
    "id": "m2-c10",
    "type": "term",
    "skill": "2.2.6",
    "front": "What is Delta Lake and what is its underlying file structure?",
    "back": "Delta Lake is an <b>open-source storage layer</b> that brings ACID transactions to data lakes.<br><br>Structure: <code>Parquet</code> data files + a <code>_delta_log</code> directory containing JSON transaction logs. Each change appends a new log entry — data files are never mutated in-place."
  },
  {
    "id": "m2-c11",
    "type": "term",
    "skill": "2.2.6",
    "front": "What ACID properties does Delta Lake guarantee?",
    "back": "<b>A</b>tomicity — transactions either fully commit or roll back<br><b>C</b>onsistency — data constraints enforced via schema<br><b>I</b>solation — serializable isolation (concurrent writers via optimistic concurrency)<br><b>D</b>urability — committed data persists in OneLake"
  },
  {
    "id": "m2-c12",
    "type": "term",
    "skill": "2.2.6",
    "front": "What is schema enforcement in Delta Lake?",
    "back": "Delta Lake enforces schema <b>on write</b> — every write must match the table schema (name + data type). Mismatched columns or types cause the write to <b>fail</b>.<br><br>Use <code>mergeSchema</code> (true) or <code>overwriteSchema</code> for deliberate schema evolution."
  },
  {
    "id": "m2-c13",
    "type": "term",
    "skill": "2.2.6",
    "front": "How does time travel work in Delta Lake?",
    "back": "Three methods:<br>1. <code>VERSION AS OF &lt;version&gt;</code> — query by Delta log version<br>2. <code>TIMESTAMP AS OF &lt;timestamp&gt;</code> — query by point in time<br>3. <code>DESCRIBE HISTORY</code> — list all versions with timestamps<br><br>Time travel requires the <code>_delta_log</code> to still contain the relevant commit entry. <code>VACUUM</code> breaks time travel beyond its retention period."
  },
  {
    "id": "m2-c17",
    "type": "term",
    "skill": "2.2.6",
    "front": "What is the difference between managed and external Delta tables?",
    "back": "<b>Managed table:</b> Dropping the table <b>deletes</b> the underlying data files. Both schema and data are removed.<br><br><b>External table:</b> Dropping the table removes only the <b>metadata</b> (Hive metastore registration). The underlying Parquet files in the external location are <b>preserved</b>."
  },
  {
    "id": "m2-c18",
    "type": "compare",
    "skill": "2.2.6",
    "front": "Compare Managed vs External Delta tables — when would you use each?",
    "back": "<b>Managed:</b> Use for transient, curated, or Gold-layer data where you want Fabric to own the full lifecycle. Drop = full cleanup.<br><br><b>External:</b> Use when data is produced outside Fabric (e.g., ADLS Gen2 from upstream pipelines) and you only want to register it. Drop = lose the pointer, keep the data."
  },
  {
    "id": "m2-c19",
    "type": "term",
    "skill": "2.2.6",
    "front": "How do you create Delta tables programmatically using the Delta Lake API?",
    "back": "Two approaches:<br><br>1. <b>DeltaTableBuilder (Scala/Python):</b><br><code>DeltaTable.create()<br>  .addColumn(\"id\", \"INT\")<br>  .addColumn(\"name\", \"STRING\")<br>  .location(\"/path\")<br>  .execute()</code><br><br>2. <b>DeltaTable API for reads/updates:</b><br><code>DeltaTable.forPath(spark, \"/path\")<br>  .update(...)</code><br><br>Spark SQL <code>USING DELTA</code> is the most common approach in notebooks."
  },
  {
    "id": "m4-c5",
    "type": "edge",
    "skill": "2.2.6",
    "front": "You need to query tables from a Warehouse and a Lakehouse in the same query. Is this possible?",
    "back": "Yes, if both are in the <b>same workspace</b>. Warehouses support cross-database three-part naming (Database.Schema.Table) within the same workspace. However, cross-workspace queries are <b>not supported</b> in either Warehouse or SQL Analytics Endpoint."
  },
  {
    "id": "m4-c18",
    "type": "term",
    "skill": "2.2.6",
    "front": "What are table clones and what makes them unique?",
    "back": "Table clones are a <b>zero-copy</b>, <b>metadata-only</b> operation that creates a <b>point-in-time</b> snapshot of a table. They do not duplicate underlying data files &mdash; only metadata is copied. Clones are useful for backups, testing, and creating development environments without additional storage cost."
  },
  {
    "id": "m4-c23",
    "type": "term",
    "skill": "2.2.6",
    "front": "What cross-database query patterns are supported in Fabric Warehouse?",
    "back": "Three-part naming (<code>DatabaseName.Schema.TableName</code>) is supported <b>within the same workspace</b>. This allows queries across multiple Warehouses and Lakehouses. Cross-workspace queries are <b>not supported</b>. Examples: <code>SELECT * FROM SalesWarehouse.dbo.Orders</code> or <code>SELECT * FROM LakehouseName.dbo.Customers</code>."
  },
  {
    "id": "m4-c24",
    "type": "edge",
    "skill": "2.2.6",
    "front": "You create a zero-copy clone of a table. After the clone is created, original rows are modified. What happens to the clone's data?",
    "back": "The clone remains a <b>point-in-time snapshot</b> of the original table at the moment the clone was created. Since clones use zero-copy metadata, the original row versions are preserved in storage for the clone to reference. Modifications to the original after cloning do not affect the clone's data."
  },
  {
    "id": "m4-c25",
    "type": "term",
    "skill": "2.2.6",
    "front": "What features does the SQL Query Editor in Fabric Warehouse provide?",
    "back": "Features include <b>IntelliSense</b> (auto-complete for T-SQL), <b>Copilot</b> (AI-assisted code generation), <b>10,000 row preview</b> limit, and <b>saved queries</b> that persist across sessions. Results can be exported to Excel, explored in a visual editor, or visualized directly."
  },
  {
    "id": "m4-c26",
    "type": "term",
    "skill": "2.2.6",
    "front": "What is the Visual Query Editor and what does it generate?",
    "back": "The Visual Query Editor is a <b>drag-and-drop</b> query builder that lets users join tables, filter, and aggregate without writing T-SQL. It <b>auto-generates T-SQL</b> behind the scenes, which users can view and modify. Useful for less technical users or rapid prototyping."
  },
  {
    "id": "m4-c27",
    "type": "term",
    "skill": "2.2.6",
    "front": "What options are available in the query Results Toolbar?",
    "back": "The Results Toolbar provides:<br><b>Excel</b> &mdash; export results to Excel<br><b>Explore this data</b> &mdash; create an automatic semantic model<br><b>Visualize</b> &mdash; create a chart (note: <b>Visualize does not support ORDER BY</b> in the query)<br><b>Save as view</b> &mdash; save as a reusable view<br><b>Save as table</b> &mdash; persist results as a new table"
  },
  {
    "id": "m4-c36",
    "type": "term",
    "skill": "2.2.6",
    "front": "Why are views recommended as a stable interface for reporting?",
    "back": "Views provide a <b>stable, abstraction layer</b> over underlying tables. If source tables are renamed, restructured, or reloaded, the view can be updated without breaking downstream reports. This decouples the physical storage from the logical schema that consumers depend on."
  },
  {
    "id": "m4-c50",
    "type": "edge",
    "skill": "2.2.6",
    "front": "How does QUOTENAME prevent dynamic SQL injection in Fabric Warehouse?",
    "back": "<code>QUOTENAME()</code> wraps a string with square brackets (<code>[ ]</code>) and escapes any embedded brackets, preventing injection through malformed identifiers. Example:<br><code>DECLARE @SchemaName NVARCHAR(128) = 'dbo';<br>DECLARE @SafeName NVARCHAR(258) = QUOTENAME(@SchemaName);<br>EXEC('SELECT * FROM ' + @SafeName + '.Orders');</code><br><br>Always use QUOTENAME for any user-supplied schema, table, or column names in dynamic SQL."
  },
  {
    "id": "m4-c29",
    "type": "term",
    "skill": "2.2.7",
    "front": "What is the typical query pattern for querying a snowflake schema?",
    "back": "Query a snowflake schema by joining the fact table to the central dimension tables, then joining those to sub-dimensions. Example:<br><code>SELECT f.OrderAmount, d.CustomerName, r.RegionName<br>FROM FactOrders f<br>JOIN DimCustomer d ON f.CustomerKey = d.CustomerKey<br>JOIN DimRegion r ON d.RegionKey = r.RegionKey</code><br><br>Star schema is preferred for performance as it requires fewer joins."
  },
  {
    "id": "dp700-fc-045",
    "type": "term",
    "skill": "2.2.7",
    "front": "What does denormalizing mean and what does it cost?",
    "back": "Combining tables to avoid joins. Reads are faster; storage grows and updates touch repeated values."
  },
  {
    "id": "dp700-fc-046",
    "type": "term",
    "skill": "2.2.7",
    "front": "Which functions expand arrays into rows?",
    "back": "PySpark: explode. KQL: mv-expand."
  },
  {
    "id": "dp700-fc-047",
    "type": "scenario",
    "skill": "2.2.7",
    "front": "Persist a joined result in a Warehouse.",
    "back": "CTAS over the joined tables."
  },
  {
    "id": "m4-c13",
    "type": "term",
    "skill": "2.2.8",
    "front": "What is APPROX_COUNT_DISTINCT and how does it work?",
    "back": "<code>APPROX_COUNT_DISTINCT</code> approximates the number of distinct non-null values using the <b>HyperLogLog</b> algorithm. It returns results with approximately <b>2% error</b> but uses far less memory and is much faster than <code>COUNT(DISTINCT ...)</code> on large datasets. Ideal for high-cardinality columns where exact counts are not critical."
  },
  {
    "id": "m4-c14",
    "type": "term",
    "skill": "2.2.8",
    "front": "Explain additive, semi-additive, and non-additive measures with examples.",
    "back": "<b>Additive:</b> Summable across all dimensions (e.g. SalesAmount, Quantity)<br><b>Semi-additive:</b> Summable across some dimensions but not all (e.g. AccountBalance &mdash; summable across customers but not across time; last value is meaningful)<br><b>Non-additive:</b> Cannot be summed at all (e.g. ProfitMargin, Percentage, UnitPrice &mdash; averaging might be appropriate)"
  },
  {
    "id": "m4-c28",
    "type": "term",
    "skill": "2.2.8",
    "front": "Explain ROW_NUMBER, RANK, DENSE_RANK, and NTILE ranking functions.",
    "back": "<b>ROW_NUMBER()</b> &mdash; assigns a <b>unique sequential</b> number to each row (no ties, deterministic with ORDER BY)<br><b>RANK()</b> &mdash; same rank for ties, <b>skips numbers</b> after ties (1,1,3,4)<br><b>DENSE_RANK()</b> &mdash; same rank for ties, <b>no gaps</b> (1,1,2,3)<br><b>NTILE(N)</b> &mdash; divides rows into <b>N approximately equal groups</b> (1..N)"
  },
  {
    "id": "m4-c31",
    "type": "compare",
    "skill": "2.2.8",
    "front": "When would you use DENSE_RANK instead of ROW_NUMBER or RANK?",
    "back": "Use <b>ROW_NUMBER</b> for pagination or when every row needs a unique identifier (no ties).<br>Use <b>RANK</b> when ties should share a rank but you want to show the gap (e.g. '3rd place' means 3rd distinct ranking).<br>Use <b>DENSE_RANK</b> when ties should share a rank with <b>no gaps</b> (e.g. top 5 products with ties &mdash; 1,1,2,2,3)."
  },
  {
    "id": "m2-c21",
    "type": "scenario",
    "skill": "2.2.9",
    "front": "You're streaming data into a Delta table with Spark Structured Streaming. Your source can have late-arriving data or schema drift. What options do you need to set?",
    "back": "Use the Delta sink with:<br><br><code>.option(\"checkpointLocation\", \"/path\")</code> — <b>required</b> for exactly-once guarantees<br><br><code>.option(\"mergeSchema\", \"true\")</code> — handle schema drift<br><br><code>.option(\"ignoreChanges\", \"true\")</code> — ignore data changes in source (reprocesses)<br><br><code>.option(\"ignoreDeletes\", \"true\")</code> — ignore deleted source records<br><br>Without <code>checkpointLocation</code>, streaming will fail."
  },
  {
    "id": "m2-c24",
    "type": "term",
    "skill": "2.2.9",
    "front": "What transformations happen in the Silver layer?",
    "back": "Silver cleanses and enriches:<br>• Data type casting & formatting<br>• NULL handling & default values<br>• Deduplication (remove duplicates)<br>• Validation rules & constraint checks<br>• Joins across Bronze tables<br><br>Result: Clean, queryable, analytics-ready data — but not yet aggregated for specific business reports."
  },
  {
    "id": "dp700-fc-048",
    "type": "term",
    "skill": "2.2.9",
    "front": "Keep the latest row per key in PySpark.",
    "back": "row_number() over Window.partitionBy(key).orderBy(ts.desc()), then filter row_number = 1."
  },
  {
    "id": "dp700-fc-049",
    "type": "term",
    "skill": "2.2.9",
    "front": "Handle nulls in PySpark.",
    "back": "fillna to replace, na.drop (dropna) to remove rows."
  },
  {
    "id": "m1-c46",
    "type": "term",
    "skill": "2.3.1",
    "front": "What is an Eventhouse in Microsoft Fabric?",
    "back": "A container (workspace-level resource) that holds one or more KQL databases. It provides the compute and storage infrastructure for Real-Time Intelligence workloads, optimized for append-only time-series data."
  },
  {
    "id": "m3-c1",
    "type": "term",
    "skill": "2.3.1",
    "front": "What is Real-Time Intelligence (RTI) in Microsoft Fabric?",
    "back": "An integrated set of components for processing and analyzing streaming data in real time. The five core components are: <code>Eventstreams</code>, <code>Eventhouse</code>, <code>KQL Queryset</code>, <code>Real-Time Dashboards</code>, and <code>Activator</code>."
  },
  {
    "id": "m3-c2",
    "type": "term",
    "skill": "2.3.1",
    "front": "What is the difference between an event and a stream?",
    "back": "An <b>event</b> is an individual data point or occurrence (e.g., a single sensor reading). A <b>stream</b> is an ordered, continuous sequence of events flowing from a source."
  },
  {
    "id": "m3-c3",
    "type": "term",
    "skill": "2.3.1",
    "front": "What are the four categories in the Real-Time Hub?",
    "back": "1. <b>Data sources</b> - streaming sources like Event Hubs, IoT Hub<br>2. <b>Azure sources</b> - Azure-specific event sources<br>3. <b>Fabric events</b> - events generated within Fabric (e.g., job completions, pipeline status)<br>4. <b>Azure events</b> - Azure platform-level events"
  },
  {
    "id": "m3-c5",
    "type": "scenario",
    "skill": "2.3.1",
    "front": "An e-commerce platform needs to flag fraudulent transactions within seconds. Which RTI use case and components apply?",
    "back": "Use case: <b>Fraud detection</b>. Use <b>Eventstream</b> to ingest transaction events, apply filters/transformations, and route to <b>Eventhouse</b> for real-time KQL analysis detecting suspicious patterns."
  },
  {
    "id": "m3-c14",
    "type": "term",
    "skill": "2.3.1",
    "front": "What is an Eventhouse in Fabric Real-Time Intelligence?",
    "back": "A <b>high-performance analytics database</b> optimized for streaming and time-series data. Features: automatic ingestion-time partitioning, append-only immutable storage, native KQL support, and OneLake integration via Delta Parquet."
  },
  {
    "id": "m1-c49",
    "type": "term",
    "skill": "2.3.2",
    "front": "What are database shortcuts in KQL?",
    "back": "References (symlinks) to data stored in other KQL databases or Eventhouses. Shortcuts avoid data duplication — queries transparently access remote data as if it were local. They can reference databases in the same or different workspaces."
  },
  {
    "id": "m1-c50",
    "type": "term",
    "skill": "2.3.2",
    "front": "What is OneLake availability in KQL?",
    "back": "A feature that automatically makes KQL database data available as parquet files in OneLake. This allows Spark, SQL, and other Fabric engines to read KQL data without exporting or copying. Enabled per database via the &#39;OneLake availability&#39; setting."
  },
  {
    "id": "m3-c23",
    "type": "term",
    "skill": "2.3.2",
    "front": "What are database shortcuts in Eventhouse?",
    "back": "Shortcuts allow referencing tables from <b>another Eventhouse</b> in the same workspace or across workspaces via OneLake, enabling cross-database queries without data movement or duplication."
  },
  {
    "id": "m3-c26",
    "type": "term",
    "skill": "2.3.2",
    "front": "How does Eventhouse integrate with OneLake?",
    "back": "Eventhouse data is automatically available in OneLake as <b>Delta Parquet</b> files, enabling cross-analysis with Lakehouse, Notebooks, Data Pipelines, and Semantic Models without data duplication."
  },
  {
    "id": "dp700-fc-050",
    "type": "term",
    "skill": "2.3.3",
    "front": "What is query acceleration for OneLake shortcuts?",
    "back": "A policy that indexes and caches shortcut data in the Eventhouse for a hot period, for near-native query speed."
  },
  {
    "id": "dp700-fc-051",
    "type": "compare",
    "skill": "2.3.3",
    "front": "Compare an accelerated shortcut with a standard shortcut.",
    "back": "<b>Accelerated:</b> indexed and cached, faster, billed on the OneLake Premium cache.<br><b>Standard:</b> reads from OneLake each time, no extra cost, slower."
  },
  {
    "id": "dp700-fc-052",
    "type": "edge",
    "skill": "2.3.3",
    "front": "What isn't supported on accelerated shortcuts?",
    "back": "Materialized views and update policies. They behave as external tables."
  },
  {
    "id": "dp700-fc-053",
    "type": "scenario",
    "skill": "2.3.3",
    "front": "Delta table written by Spark, queried constantly from KQL, no copies allowed.",
    "back": "Create a shortcut in the KQL database and enable query acceleration."
  },
  {
    "id": "m3-c7",
    "type": "term",
    "skill": "2.3.4",
    "front": "What is an Eventstream in Microsoft Fabric?",
    "back": "A visual, no-code <b>drag-and-drop canvas</b> for ingesting, transforming, and routing streaming data. The workflow flows <b>left-to-right</b>: sources on the left, transformations in the middle, destinations on the right."
  },
  {
    "id": "m3-c8",
    "type": "term",
    "skill": "2.3.4",
    "front": "What are the supported sources in an Eventstream?",
    "back": "Event Hubs, IoT Hub, Service Bus, CDC (Change Data Capture), Blob Storage, Fabric events, Kafka, Google Pub/Sub, and MQTT."
  },
  {
    "id": "m3-c9",
    "type": "term",
    "skill": "2.3.4",
    "front": "What transformations are available in the Eventstream canvas?",
    "back": "<b>Filter</b> - keep events matching conditions<br><b>Manage fields</b> - add, remove, or rename columns<br><b>Aggregate</b> - calculate summaries over time<br><b>Group by</b> with tumbling or sliding windows<br><b>Union</b> - combine multiple streams<br><b>Join</b> - merge streams on a common key<br><b>Expand</b> - unpack nested arrays/JSON into rows"
  },
  {
    "id": "m3-c11",
    "type": "term",
    "skill": "2.3.4",
    "front": "What destinations can an Eventstream route data to?",
    "back": "<b>Eventhouse</b> (KQL Database) - real-time analytics<br><b>Lakehouse</b> (Delta format) - long-term storage<br><b>Derived streams</b> - branching pipelines for multiple paths<br><b>Activator</b> - rules and alerting engine<br><b>Custom endpoints</b> - HTTP/s custom destinations"
  },
  {
    "id": "m3-c12",
    "type": "scenario",
    "skill": "2.3.4",
    "front": "Sensor data arrives via IoT Hub. You must filter errors, aggregate average temperature every 1 min, and store in Eventhouse (live dashboards) and Lakehouse (ML training). Design the Eventstream.",
    "back": "Source: <b>IoT Hub</b> → <b>Filter</b> (remove error codes) → <b>Group by</b> (tumbling window, 1 min, average temp) → branch to two destinations: <b>Eventhouse</b> and <b>Lakehouse</b>."
  },
  {
    "id": "m3-c13",
    "type": "edge",
    "skill": "2.3.4",
    "front": "Can transformations be applied to data after it reaches an Eventhouse destination from an Eventstream?",
    "back": "<b>No.</b> Transformations must be applied <b>within the Eventstream canvas</b> before data reaches the destination. Once ingested into Eventhouse, data is <b>append-only immutable</b>. You can use KQL queries, materialized views, or stored functions for query-time transformation, but the raw ingested data is never modified."
  },
  {
    "id": "dp700-fc-054",
    "type": "term",
    "skill": "2.3.5",
    "front": "Read and write a Delta stream in Spark.",
    "back": "spark.readStream.format('delta').load(path) and df.writeStream.format('delta').option('checkpointLocation', cp).start(path)."
  },
  {
    "id": "dp700-fc-055",
    "type": "compare",
    "skill": "2.3.5",
    "front": "Compare the output modes.",
    "back": "<b>append:</b> new rows (with a watermark, finalized windows).<br><b>update:</b> changed rows.<br><b>complete:</b> the entire result each trigger."
  },
  {
    "id": "dp700-fc-056",
    "type": "term",
    "skill": "2.3.5",
    "front": "What is foreachBatch for?",
    "back": "Running batch logic such as a MERGE on each micro-batch."
  },
  {
    "id": "dp700-fc-057",
    "type": "term",
    "skill": "2.3.5",
    "front": "What does withWatermark do?",
    "back": "Defines how late events may arrive so Spark can finalize windows and drop old state."
  },
  {
    "id": "m1-c47",
    "type": "term",
    "skill": "2.3.6",
    "front": "What is a KQL database in Fabric?",
    "back": "A database within an Eventhouse optimized for append-only, time-series data storage and querying via the Kusto Query Language (KQL). It uses columnar storage and indexes (extent tags, row groups) for high-performance analytics on streaming and batch data."
  },
  {
    "id": "m1-c48",
    "type": "term",
    "skill": "2.3.6",
    "front": "What ingestion methods does KQL support in Fabric?",
    "back": "Methods include: (1) <b>Event streaming</b> via Event Streams, (2) <b>Batch ingestion</b> via OneLake shortcuts, (3) <b>GET request</b> / REST API, (4) <b>KQL SDKs</b> (.NET, Python, Java, Node.js), (5) <b>OneLake file/folder shortcuts</b> for data already in lakehouses, (6) <b>Update policies</b> for derived ingestion."
  },
  {
    "id": "m1-c51",
    "type": "term",
    "skill": "2.3.6",
    "front": "What is a KQL Queryset?",
    "back": "A Fabric item that provides an interactive query editor for running KQL queries against KQL databases. It supports multiple tabs, result set downloads, and sharing. Similar to a SQL query editor but for the Kusto Query Language."
  },
  {
    "id": "m1-c54",
    "type": "term",
    "skill": "2.3.6",
    "front": "What are the core KQL operators for querying data?",
    "back": "Core operators include: <code>where</code> (filter rows), <code>project</code> (select columns), <code>take</code>/<code>limit</code> (sample rows), <code>summarize</code> (aggregate), <code>sort</code> / <code>order by</code> (ordering), <code>join</code> (merge tables), <code>extend</code> (add computed columns), <code>distinct</code> (dedup), and <code>count</code> (row count). Operators are piped with <code>|</code>."
  },
  {
    "id": "m1-c57",
    "type": "term",
    "skill": "2.3.6",
    "front": "What are stored functions in KQL?",
    "back": "Reusable query logic saved as named functions in a KQL database, created with <code>.create function</code>. Stored functions can accept parameters, encapsulate complex logic, and be reused across querysets. They are schema-bound and can reference tables or other functions."
  },
  {
    "id": "m1-c59",
    "type": "scenario",
    "skill": "2.3.6",
    "front": "Your team frequently uses complex KQL logic (e.g., a multi-step time-series normalization) across many querysets. How should you share this logic?",
    "back": "<b>Solution:</b> Encapsulate the logic in a stored function using <code>.create function NormalizeTimeSeries(...)</code>.<br><br><b>Reasoning:</b> Stored functions provide reusable, centrally managed query logic. All team members call the function by name with their parameters, ensuring consistency and reducing code duplication across querysets."
  },
  {
    "id": "m1-c60",
    "type": "edge",
    "skill": "2.3.6",
    "front": "What happens when you try to update a single row in a KQL database?",
    "back": "KQL databases are designed for <b>append-only</b> storage — individual row updates are not supported. To &#39;update&#39; data, you must use a <b>table update policy</b> that applies transformations as data is ingested, or perform a <b>data purge</b> (for deletions) combined with re-ingestion of corrected data. For full row-level updates, consider using a Spark Delta table instead."
  },
  {
    "id": "m3-c15",
    "type": "term",
    "skill": "2.3.6",
    "front": "How does the KQL pipeline work using the pipe operator?",
    "back": "Queries use <code>|</code> to pass tabular results from one operator to the next. Example:<br><code>StormEvents | where State == 'FLORIDA' | project EventType, Damage | take 10</code><br>Each operator filters, transforms, or aggregates data as it flows through the pipeline."
  },
  {
    "id": "m3-c16",
    "type": "term",
    "skill": "2.3.6",
    "front": "What are the core KQL operators?",
    "back": "<code>take</code> - limit rows<br><code>where</code> - filter rows<br><code>project</code> - select/rename/drop columns<br><code>summarize</code> - aggregate by groups<br><code>sort by</code> - order results<br><code>join</code> - merge two tables on a key<br><code>limit</code> - constrain result set size"
  },
  {
    "id": "m3-c20",
    "type": "term",
    "skill": "2.3.6",
    "front": "How do you create a stored function in KQL?",
    "back": "Use <code>.create-or-alter function</code>:<br><br><code>.create-or-alter function GetHighPriorityAlerts() {<br>  Alerts | where Priority == 'High'<br>  | project Timestamp, DeviceId, Message<br>}</code><br><br>Call it like a table: <code>GetHighPriorityAlerts()</code>"
  },
  {
    "id": "m3-c22",
    "type": "edge",
    "skill": "2.3.6",
    "front": "What does 'append-only immutable' mean for Eventhouse and what operations are NOT allowed?",
    "back": "New records can be added, but existing records cannot be updated or deleted (unless using retention/soft-delete policies). You <b>cannot</b> perform row-level <code>UPDATE</code>, <code>DELETE</code>, or <code>MERGE</code> like in OLTP databases. This ensures data integrity and enables high-performance columnar compression."
  },
  {
    "id": "m3-c24",
    "type": "term",
    "skill": "2.3.6",
    "front": "What is a KQL Queryset?",
    "back": "A Fabric item that stores and organizes KQL queries for execution against an Eventhouse. Provides a query editor with syntax highlighting, results viewer with charting, parameter support, and sharing capabilities."
  },
  {
    "id": "m3-c25",
    "type": "term",
    "skill": "2.3.6",
    "front": "Does Eventhouse support T-SQL?",
    "back": "Yes, a <b>T-SQL subset</b> is supported, enabling SQL-skilled users to query KQL tables without learning full KQL. However, <b>native KQL</b> is recommended for optimal performance and access to time-series functions."
  },
  {
    "id": "m3-c10",
    "type": "compare",
    "skill": "2.3.7",
    "front": "Compare tumbling windows vs sliding windows in Eventstream Group By.",
    "back": "<b>Tumbling windows</b>: Fixed, non-overlapping intervals (e.g., every 5 min). Each event belongs to exactly <b>one</b> window. Best for periodic reporting.<br><br><b>Sliding windows</b>: Overlapping intervals moving forward by a step size. An event can appear in <b>multiple</b> windows. Best for continuous fine-grained monitoring with updates more frequent than the window size."
  },
  {
    "id": "dp700-fc-058",
    "type": "compare",
    "skill": "2.3.7",
    "front": "Compare tumbling, hopping, sliding, session and snapshot windows.",
    "back": "<b>Tumbling:</b> fixed, no overlap.<br><b>Hopping:</b> fixed size, overlapping hops.<br><b>Sliding:</b> evaluated as events enter or leave.<br><b>Session:</b> closes after a gap.<br><b>Snapshot:</b> same timestamp."
  },
  {
    "id": "dp700-fc-059",
    "type": "term",
    "skill": "2.3.7",
    "front": "Tumbling windows in KQL.",
    "back": "summarize ... by bin(Timestamp, 5m)."
  },
  {
    "id": "dp700-fc-060",
    "type": "term",
    "skill": "2.3.7",
    "front": "Windows in Spark.",
    "back": "window(timeColumn, windowDuration, slideDuration). A slide shorter than the duration makes overlapping windows."
  },
  {
    "id": "m4-c45",
    "type": "term",
    "skill": "3.1.1",
    "front": "What is the Capacity Metrics App used for?",
    "back": "The Capacity Metrics App is a Fabric monitoring tool that tracks <b>capacity consumption</b>, including CU (Capacity Unit) usage for Warehouse operations. It helps identify bottlenecks, throttling, and usage patterns across all Fabric workloads within a capacity."
  },
  {
    "id": "m5-c10",
    "type": "term",
    "skill": "3.1.1",
    "front": "What is the Monitor Hub in Microsoft Fabric?",
    "back": "The Monitor Hub is a <b>centralized activity monitoring</b> interface in Fabric. Users can see their own activities; <b>admins</b> can see all activities across the tenant. It provides a 30-day activity history."
  },
  {
    "id": "m5-c11",
    "type": "term",
    "skill": "3.1.1",
    "front": "Which activities are monitored in the Monitor Hub?",
    "back": "Monitored activities include: <b>pipelines</b>, <b>dataflows</b>, <b>semantic models</b> (refreshes), <b>Spark jobs</b>, and <b>Eventstreams</b>."
  },
  {
    "id": "m5-c12",
    "type": "term",
    "skill": "3.1.1",
    "front": "What filtering options are available in the Monitor Hub?",
    "back": "Filters include: <b>Status</b> (succeeded/failed/in-progress), <b>Type</b> (pipeline, dataflow, etc.), <b>Time</b> (custom range within 30 days), <b>User</b>, and <b>Workspace</b>."
  },
  {
    "id": "m5-c13",
    "type": "term",
    "skill": "3.1.1",
    "front": "What drill-down capabilities does the Monitor Hub provide?",
    "back": "From the Monitor Hub you can: <b>Open</b> the item directly, <b>Retry</b> failed activities, view detailed <b>Logs</b>, and see execution <b>History</b> for the selected item."
  },
  {
    "id": "m5-c14",
    "type": "term",
    "skill": "3.1.1",
    "front": "What Spark-specific monitoring details are available?",
    "back": "For <b>Spark jobs</b>, the Monitor Hub shows: application ID, session type, state, duration, total cores, total memory, and Spark UI link for deep debugging."
  },
  {
    "id": "m5-c15",
    "type": "compare",
    "skill": "3.1.1",
    "front": "Compare what a regular user sees vs. an admin in the Monitor Hub.",
    "back": "<b>Regular user</b>: sees only activities they initiated or items they own.<br><br><b>Admin (Fabric/Capacity/Domain/Workspace admin)</b>: sees all activities across the scope they administer — including other users' activities."
  },
  {
    "id": "m5-c17",
    "type": "edge",
    "skill": "3.1.1",
    "front": "Can the Monitor Hub show activities older than 30 days?",
    "back": "<b>No.</b> The Monitor Hub maintains exactly <b>30 days</b> of history. For longer retention, you must route audit logs to Azure Log Analytics or a storage account via diagnostic settings."
  },
  {
    "id": "m4-c43",
    "type": "term",
    "skill": "3.1.2",
    "front": "What DMVs are available in Fabric Warehouse and what is the KILL command restriction?",
    "back": "Key DMVs include:<br><code>sys.dm_exec_connections</code> &mdash; active connections<br><code>sys.dm_exec_sessions</code> &mdash; active sessions<br><code>sys.dm_exec_requests</code> &mdash; running requests<br><br>The <b>KILL</b> command requires <b>Admin workspace role</b>. Members, Contributors, and Viewers cannot terminate sessions even if they can see them in the DMVs."
  },
  {
    "id": "m4-c44",
    "type": "term",
    "skill": "3.1.2",
    "front": "What are Query Insights and how does data retention work?",
    "back": "Query Insights provides query performance history with <b>30-day retention</b>. Data has a <b>15-minute delay</b> before appearing. Queries are <b>parameterized and deduplicated</b> so similar queries (e.g. same query with different parameter values) are grouped together for analysis."
  },
  {
    "id": "dp700-fc-061",
    "type": "term",
    "skill": "3.1.2",
    "front": "Which tools monitor transformations?",
    "back": "Monitor hub for runs, Spark UI and history server for jobs, refresh history for dataflows, and query insights for warehouse queries."
  },
  {
    "id": "dp700-fc-062",
    "type": "term",
    "skill": "3.1.2",
    "front": "Name the warehouse monitoring objects.",
    "back": "DMVs sys.dm_exec_connections, sys.dm_exec_sessions, sys.dm_exec_requests and the queryinsights views, which keep about 30 days."
  },
  {
    "id": "dp700-fc-063",
    "type": "term",
    "skill": "3.1.3",
    "front": "Where do you see semantic model refresh results?",
    "back": "Refresh history on the semantic model and the Monitor hub. Configure failure notifications for the owner and contacts."
  },
  {
    "id": "dp700-fc-064",
    "type": "term",
    "skill": "3.1.3",
    "front": "What is a Direct Lake refresh?",
    "back": "A framing operation that points the model to the latest Delta table versions. It does not copy data, so it is fast."
  },
  {
    "id": "dp700-fc-065",
    "type": "scenario",
    "skill": "3.1.3",
    "front": "Refresh the model right after a pipeline loads the lakehouse.",
    "back": "Add a semantic model refresh activity at the end of the pipeline."
  },
  {
    "id": "dp700-fc-066",
    "type": "edge",
    "skill": "3.1.3",
    "front": "Why does an Import refresh fail often?",
    "back": "Expired credentials, an offline gateway, or exceeding refresh time limits. The refresh history shows the error."
  },
  {
    "id": "m3-c6",
    "type": "scenario",
    "skill": "3.1.4",
    "front": "A logistics company wants to track delivery trucks, monitor package temperatures, and get instant alerts when refrigerated units go out of range. Which RTI components should they use?",
    "back": "Use <b>Eventstream</b> to ingest IoT sensor data, <b>Eventhouse</b> for real-time analytics, <b>Real-Time Dashboards</b> for live fleet monitoring, and <b>Activator</b> to trigger alerts on temperature threshold violations."
  },
  {
    "id": "m3-c33",
    "type": "term",
    "skill": "3.1.4",
    "front": "What is Activator in Fabric Real-Time Intelligence?",
    "back": "An <b>event detection and rules engine</b>. Core object model: <b>Events</b> (raw data) → <b>Objects</b> (grouped entities) → <b>Properties</b> (time-series metrics) → <b>Rules</b> (conditions + actions)."
  },
  {
    "id": "m3-c34",
    "type": "term",
    "skill": "3.1.4",
    "front": "What is configured in the Monitor section of an Activator rule?",
    "back": "<b>Attribute</b> - dimension grouping events into objects (e.g., DeviceId)<br><b>Summarization</b> - aggregation: average, min, max, count, total<br><b>Window size</b> - lookback time period<br><b>Step size</b> - how frequently the window slides forward"
  },
  {
    "id": "m3-c35",
    "type": "term",
    "skill": "3.1.4",
    "front": "What condition detection types does Activator support?",
    "back": "<b>Threshold</b> - value crosses a boundary<br><b>Change detection</b> - significant deviation from baseline<br><b>Range</b> - value inside/outside a min-max range<br><b>Missing data</b> - no data received within expected interval"
  },
  {
    "id": "m3-c36",
    "type": "compare",
    "skill": "3.1.4",
    "front": "Compare 'Every time' vs 'When it has been true for' occurrence behavior in Activator.",
    "back": "<b>Every time</b>: Fires on each evaluation where the condition is true. Best for rare events needing immediate notification.<br><br><b>When it has been true for</b>: Fires only after the condition remains true for a sustained duration. Prevents alert fatigue (e.g., temperature over 90F for 5 consecutive minutes)."
  },
  {
    "id": "m3-c37",
    "type": "term",
    "skill": "3.1.4",
    "front": "What are Property filters in Activator and what is the limit?",
    "back": "Property filters narrow rule evaluation to specific object subsets. You can define <b>up to 3 conditions</b> per filter combined with AND logic. Example: <code>Region == 'East' AND Priority == 'High'</code>"
  },
  {
    "id": "m3-c38",
    "type": "term",
    "skill": "3.1.4",
    "front": "What actions can an Activator rule trigger?",
    "back": "<b>Email</b> - notify recipients<br><b>Teams</b> - post to a channel<br><b>Power Automate</b> - trigger a cloud flow<br><b>Fabric item actions</b> - start/stop items, trigger pipelines"
  },
  {
    "id": "m3-c39",
    "type": "scenario",
    "skill": "3.1.4",
    "front": "CPU exceeds 90% and stays above that threshold for 3 consecutive minutes, but only for production servers. Configure the Activator rule.",
    "back": "<b>Monitor</b>: Summarization = <b>average</b>, Window = <b>3 min</b>, Step = <b>1 min</b><br><b>Property filter</b>: <code>Environment == 'Production'</code><br><b>Condition</b>: Threshold > 90, Occurrence = <b>When it has been true for</b> = 3 min<br><b>Action</b>: Teams + Email to on-call engineer"
  },
  {
    "id": "m3-c40",
    "type": "edge",
    "skill": "3.1.4",
    "front": "Do dashboard alerts, system event alerts, and query alerts use different engines than Activator?",
    "back": "<b>No.</b> All three — <b>dashboard alerts</b>, <b>system event alerts</b>, and <b>query alerts</b> — use the <b>same Activator engine</b> under the hood. They provide different entry points and UIs but all execute through Activator for evaluation and action dispatch."
  },
  {
    "id": "m6-c1",
    "type": "term",
    "skill": "3.1.4",
    "front": "What is the core object model of Fabric Activator?",
    "back": "Activator has four core concepts:<br>1. <b>Events</b> — incoming data streams (from Eventstreams, Eventhouses, or other sources)<br>2. <b>Objects</b> — entities derived from events (identified by a unique ID property)<br>3. <b>Properties</b> — numeric or categorical attributes of objects that are monitored<br>4. <b>Rules</b> — conditions defined on properties that trigger actions"
  },
  {
    "id": "m6-c2",
    "type": "term",
    "skill": "3.1.4",
    "front": "How are objects created from Eventstreams in Activator?",
    "back": "When connecting an Eventstream to Activator, you select a <b>unique ID property</b> (e.g., device ID, order ID) from the event schema. Activator <b>auto-creates objects</b> for each unique value of that property as new events arrive."
  },
  {
    "id": "m6-c3",
    "type": "term",
    "skill": "3.1.4",
    "front": "What is the Monitor section in an Activator rule?",
    "back": "The <b>Monitor</b> section defines a <b>property</b> (numerical attribute) to track and the <b>aggregation</b> method: <b>Average</b>, <b>Min</b>, <b>Max</b>, <b>Count</b>, or <b>Total</b>. It also defines the <b>Window Size</b> (lookback period) and <b>Step Size</b> (evaluation frequency), which are independent of each other."
  },
  {
    "id": "m6-c4",
    "type": "term",
    "skill": "3.1.4",
    "front": "What is the Condition section in an Activator rule?",
    "back": "The <b>Condition</b> section defines the triggering logic:<br>• <b>Threshold</b> — fire when value goes above/below a fixed number<br>• <b>Change detection</b> — fire when value changes by X% or absolute amount<br>• <b>Range</b> — fire when value is inside/outside a range<br>• <b>Missing data</b> — fire when no data received for a duration"
  },
  {
    "id": "m6-c5",
    "type": "term",
    "skill": "3.1.4",
    "front": "What occurrence behaviors are available in Activator conditions?",
    "back": "Two modes:<br>1. <b>'Every time'</b> — fires on every individual event that meets the condition<br>2. <b>'When it has been true for'</b> — fires only after the condition has been continuously true for a specified duration (debouncing/de-glitching)"
  },
  {
    "id": "m6-c6",
    "type": "term",
    "skill": "3.1.4",
    "front": "What are Property Filters and what limits apply?",
    "back": "Property filters allow you to <b>narrow rule evaluation</b> to objects matching specific categorical criteria (e.g., only devices in 'Region=US'). You can apply <b>up to 3 property filters</b> per rule."
  },
  {
    "id": "m6-c7",
    "type": "term",
    "skill": "3.1.4",
    "front": "What Actions can Activator rules trigger?",
    "back": "Actions include:<br>• <b>Email</b> — send notification to specified recipients<br>• <b>Teams</b> — post to a Microsoft Teams channel<br>• <b>Power Automate</b> — trigger a Power Automate flow<br>• <b>Fabric item actions</b> — activate other Fabric items (e.g., start a pipeline, refresh a semantic model)"
  },
  {
    "id": "m6-c8",
    "type": "term",
    "skill": "3.1.4",
    "front": "What are the alternative alerting methods that use the Activator engine?",
    "back": "Three methods all <b>use the Activator engine</b> under the hood:<br>1. <b>Dashboard alerts</b> — set thresholds on visual elements in real-time dashboards<br>2. <b>System event alerts</b> — alerts on Fabric system events (e.g., report viewed, refresh completed)<br>3. <b>Query alerts</b> — alerts defined directly on KQL or SQL query results"
  },
  {
    "id": "m6-c9",
    "type": "compare",
    "skill": "3.1.4",
    "front": "Compare auto-created objects from Eventstream vs. manually created objects.",
    "back": "<b>Auto-created (Eventstream)</b>: objects are created dynamically as new unique IDs arrive; schema comes from the event stream; simpler setup; best for streaming IoT or event sources.<br><br><b>Manual</b>: objects and properties defined by the user; supports additional data sources; more control over object hierarchy."
  },
  {
    "id": "m6-c10",
    "type": "compare",
    "skill": "3.1.4",
    "front": "Compare 'Every time' vs. 'When it has been true for' occurrence behavior.",
    "back": "<b>'Every time'</b>: immediately fires on each qualifying event — can produce many alerts for noisy signals.<br><br><b>'When it has been true for'</b>: requires the condition to remain true for a specified duration (e.g., 5 minutes) before firing — reduces alert fatigue, acts as a debounce/deglitch filter."
  },
  {
    "id": "m6-c11",
    "type": "compare",
    "skill": "3.1.4",
    "front": "Compare Window Size vs. Step Size in the Monitor section.",
    "back": "<b>Window Size</b>: the lookback period over which data is aggregated (e.g., 'last 10 minutes') — determines how much historical data is considered for the current value.<br><br><b>Step Size</b>: how often the rule is evaluated (e.g., 'every 1 minute') — independent of window size, so you can evaluate more or less frequently than the aggregation window."
  },
  {
    "id": "m6-c12",
    "type": "scenario",
    "skill": "3.1.4",
    "front": "You have IoT temperature sensors sending data every 30 seconds. You need to alert when a sensor's average temperature exceeds 85°F over the last 5 minutes, but only if it stays over for 2 minutes to avoid transient spikes. How do you configure this?",
    "back": "In the Activator rule:<br><b>Monitor</b>: Property = Temperature, Aggregation = Average, Window Size = 5 minutes, Step Size = 1 minute<br><b>Condition</b>: Threshold > 85<br><b>Occurrence</b>: 'When it has been true for' = 2 minutes<br>This ensures only sustained overheating triggers an alert."
  },
  {
    "id": "m6-c13",
    "type": "edge",
    "skill": "3.1.4",
    "front": "What happens to an Activator rule if no data arrives for an object?",
    "back": "If no data arrives, you can configure the <b>Missing data</b> condition to trigger after a specified duration of inactivity. Without it, the rule simply does not fire — objects remain in their last known state and no alert is generated."
  },
  {
    "id": "m6-c14",
    "type": "edge",
    "skill": "3.1.4",
    "front": "How many property filters can you apply to a single Activator rule?",
    "back": "You can apply a maximum of <b>3 property filters</b> per rule. Each filter narrows the rule evaluation to objects matching specific categorical property values."
  },
  {
    "id": "m6-c15",
    "type": "edge",
    "skill": "3.1.4",
    "front": "True or false: Dashboard alerts, system event alerts, and query alerts are independent alerting systems separate from Activator.",
    "back": "<b>False.</b> All three — dashboard alerts, system event alerts, and query alerts — <b>use the Activator engine</b> under the hood. They are simply different entry points into the same alerting infrastructure."
  },
  {
    "id": "m6-c16",
    "type": "edge",
    "skill": "3.1.4",
    "front": "Can Window Size and Step Size be set independently in an Activator rule?",
    "back": "<b>Yes.</b> Window size and step size are <b>independent</b> of each other. For example, you can aggregate over a 1-hour window (Window Size) while evaluating every 5 minutes (Step Size). This allows flexible monitoring patterns without coupling aggregation span to evaluation frequency."
  },
  {
    "id": "m6-c17",
    "type": "scenario",
    "skill": "3.1.4",
    "front": "A temperature sensor exceeds threshold. Your team needs to immediately discuss the response together. Which Activator action type should you configure?",
    "back": "<b>Teams action.</b> Teams sends immediate messages to channels or individuals, enabling real-time team coordination and discussion. Use Email when the recipient needs comprehensive context and response within hours/days. Use Teams when immediate group coordination is required."
  },
  {
    "id": "m6-c18",
    "type": "scenario",
    "skill": "3.1.4",
    "front": "A stock level drops below a reorder threshold. You need to automatically create a purchase order in your ERP system and log it in SharePoint. Which Activator action type should you use?",
    "back": "<b>Power Automate action.</b> Power Automate connects to external apps and services, executing multi-step workflows across different systems that would otherwise require manual intervention. Use it when the response spans multiple applications (e.g., ERP + SharePoint)."
  },
  {
    "id": "m6-c19",
    "type": "scenario",
    "skill": "3.1.4",
    "front": "An anomaly is detected in a data stream. The response requires cleansing the affected data using complex Spark logic and reloading it into the lakehouse. Which Activator action should you configure?",
    "back": "<b>Fabric item action</b> — specifically trigger a <b>Spark Notebook</b> or <b>Data Pipeline</b>. Fabric item actions execute data engineering operations in response to detected conditions. This is the right choice when the response requires Fabric-native compute (Spark, pipelines)."
  },
  {
    "id": "m6-c20",
    "type": "scenario",
    "skill": "3.1.4",
    "front": "A compliance audit needs to be notified when a shipment's temperature exceeded 40°C, with a full report attached. Time sensitivity is low. Which Activator action fits best?",
    "back": "<b>Email action.</b> Email is best when the recipient needs comprehensive context, can review at their own pace, and immediate response is not critical. Teams is for immediate coordination; Power Automate for multi-system workflows; Email for audit/compliance/non-urgent notifications."
  },
  {
    "id": "m6-c21",
    "type": "edge",
    "skill": "3.1.4",
    "front": "What happens in Activator if you do NOT select a unique identifier field when creating objects from an Eventstream?",
    "back": "Without a unique identifier, all incoming events are treated as a <b>single stream-wide object</b>. Rules evaluate against the aggregate stream rather than per-entity. To monitor individual entities (e.g., temperature <em>per truck</em>, not average across all trucks), a unique identifier is mandatory."
  },
  {
    "id": "m6-c22",
    "type": "term",
    "skill": "3.1.4",
    "front": "What are the different ways data can be fed into Activator?",
    "back": "Three entry points:<br>1. <b>Eventstream destination</b> — direct streaming data from Eventstream; most common for IoT/event-driven scenarios.<br>2. <b>Real-Time Dashboard alerts</b> — trigger rules from dashboard visual thresholds.<br>3. <b>KQL Queryset alerts</b> — trigger rules when a KQL query result meets a condition (e.g., count of anomalies > 0).<br>4. <b>System event alerts</b> — trigger on Fabric workspace events like report views or refresh completions."
  },
  {
    "id": "m6-c23",
    "type": "compare",
    "skill": "3.1.4",
    "front": "Compare Activator and KQL for real-time condition evaluation.",
    "back": "<b>Activator:</b> Visual rule editor; event-driven; evaluates conditions on streaming object properties; triggers automated actions. No KQL needed to define rules.<br><br><b>KQL (Eventhouse):</b> Query language for ad-hoc and scheduled queries against stored data; results can <em>feed into</em> Activator but KQL itself doesn't trigger actions.<br><br>Key: Activator is the <em>response layer</em>; KQL is the <em>query layer</em>. They complement each other — use KQL to detect complex patterns, feed results to Activator to act."
  },
  {
    "id": "m6-c24",
    "type": "compare",
    "skill": "3.1.4",
    "front": "You need to investigate why a pipeline failed yesterday. You also need to auto-email a team when a pipeline fails in future. Which tool handles each?",
    "back": "<b>Monitor Hub</b> — investigate the past failure. It stores 30 days of execution history with drill-down into error details.<br><br><b>Activator</b> — auto-email on future failures. Set a system event alert on pipeline failure as the trigger condition and configure an Email action.<br><br>Monitor Hub = retrospective investigation. Activator = proactive automated response."
  },
  {
    "id": "m6-c25",
    "type": "scenario",
    "skill": "3.1.4",
    "front": "Your delivery sensors send a reading every 5 seconds. You need to alert when NO reading arrives for more than 10 minutes (indicating sensor failure). How do you configure this in Activator?",
    "back": "Use the <b>Missing data</b> condition type in the Condition section.<br>Set the duration to <b>10 minutes</b>.<br>This fires an alert when Activator detects a gap in events for an object exceeding the specified duration — designed exactly for sensor dead/failure detection."
  },
  {
    "id": "m6-c26",
    "type": "scenario",
    "skill": "3.1.4",
    "front": "You monitor 500 delivery trucks. You only want temperature alerts for trucks carrying medicine (field: ColdChainType = 'medicine') on routes in Seattle (field: City = 'Seattle'). How do you scope this in Activator?",
    "back": "Use <b>Property Filters</b> in the rule definition.<br>Add filter 1: ColdChainType equals 'medicine'<br>Add filter 2: City equals 'Seattle'<br>The rule will now only evaluate temperature conditions for events matching both filters. Maximum <b>3 property filters</b> per rule can be combined."
  },
  {
    "id": "m6-c27",
    "type": "edge",
    "skill": "3.1.4",
    "front": "A temperature threshold is briefly exceeded for 30 seconds due to a sensor fluctuation, then returns to normal. Does Activator fire an alert using the default 'Every time' occurrence?",
    "back": "<b>Yes, it would fire</b> with 'Every time' — that mode fires on each qualifying event regardless of duration.<br><br>To prevent false alerts from transient spikes, use <b>'When it has been true for'</b> occurrence mode with a duration longer than typical fluctuations (e.g., 2 minutes). This debounces the condition and only alerts on sustained breaches."
  },
  {
    "id": "m6-c28",
    "type": "term",
    "skill": "3.1.4",
    "front": "What is the end-to-end workflow to set up Activator monitoring for an IoT Eventstream?",
    "back": "1. Create and configure an <b>Eventstream</b> to capture streaming data from the IoT source.<br>2. Add <b>Activator</b> as a destination in the Eventstream.<br>3. Open the Activator item → select <b>Create object</b>.<br>4. Choose the <b>unique identifier field</b> (e.g., DeviceID) to create per-device objects.<br>5. Select which fields become <b>monitored properties</b>.<br>6. Create <b>Rules</b>: configure Monitor, Condition, and Property Filter.<br>7. Configure the <b>Action</b> (Email, Teams, Power Automate, or Fabric item)."
  },
  {
    "id": "m6-c29",
    "type": "edge",
    "skill": "3.1.4",
    "front": "True or false: Activator is only available as part of Real-Time Intelligence in Fabric.",
    "back": "<b>True.</b> Activator is a component within <b>Real-Time Intelligence</b> in Microsoft Fabric. It is the event detection and rules engine of that workload. It is not a standalone external service."
  },
  {
    "id": "m6-c30",
    "type": "scenario",
    "skill": "3.1.4",
    "front": "You're tracking stock prices updated every second. You want to detect when a stock's 5-minute average price drops more than 10% from its value at the start of the window. Which Activator condition type fits?",
    "back": "<b>Change detection</b> condition type — detects when a value changes by a relative amount (percentage) or absolute amount from a baseline within the window.<br><br>Configure: Attribute = Price, Summarization = Average, Window Size = 5 min, Condition = Change detection (decreases by 10%)."
  },
  {
    "id": "m6-c31",
    "type": "compare",
    "skill": "3.1.4",
    "front": "When would you choose a Fabric item action over a Power Automate action in Activator?",
    "back": "<b>Fabric item action:</b> When the response is entirely within Fabric — run a pipeline to reload data, execute a Spark notebook to cleanse records, or trigger another Fabric process. Lower latency, no external dependency.<br><br><b>Power Automate:</b> When the response spans multiple external systems — create a ticket in Jira, update records in Salesforce, send an SMS, etc. More flexible but introduces an external dependency."
  },
  {
    "id": "m6-c32",
    "type": "edge",
    "skill": "3.1.4",
    "front": "Can Activator monitor Fabric system events (like pipeline failures or report views) without an Eventstream?",
    "back": "<b>Yes.</b> Activator supports <b>system event alerts</b> that monitor Fabric workspace activities and OneLake file operations directly — no Eventstream required. This is one of the alternative alerting approaches (along with dashboard alerts and KQL query alerts) built on the Activator engine."
  },
  {
    "id": "m1-c12",
    "type": "term",
    "skill": "3.2.1",
    "front": "What are pipeline runs and validation in Fabric Data Pipelines?",
    "back": "<b>Pipeline runs:</b> An execution instance of a pipeline triggered manually or by a trigger. Each run has a unique run ID, status, and log.<br><br><b>Validation:</b> A static check that verifies pipeline definitions, parameter completeness, and activity references before execution. Helps catch configuration errors early."
  },
  {
    "id": "m1-c16",
    "type": "edge",
    "skill": "3.2.1",
    "front": "What happens when a pipeline activity fails mid-execution?",
    "back": "By default, the pipeline continues unless the activity has &#39;retry&#39; and &#39;retry interval&#39; configured. For sequential activities, the default behavior marks it as failed. You can add &#39;on failure&#39; dependency paths to run fallback logic (e.g., send an alert). The pipeline run status will show as &#39;Failed&#39; or &#39;Failed with retries exhausted&#39;. You can also configure &#39;on skip&#39; paths for conditional branching."
  },
  {
    "id": "dp700-fc-067",
    "type": "term",
    "skill": "3.2.1",
    "front": "Lookup activity limits.",
    "back": "Up to 5,000 rows and 4 MB of output; one result set. Use firstRow or value in expressions."
  },
  {
    "id": "dp700-fc-068",
    "type": "edge",
    "skill": "3.2.1",
    "front": "Copy activity workspace staging times out. Fix?",
    "back": "Use external staging storage such as ADLS Gen2. Workspace staging has a 60-minute limit."
  },
  {
    "id": "m5-c16",
    "type": "scenario",
    "skill": "3.2.2",
    "front": "A dataflow refresh failed overnight. You need to understand why and retry it. What do you do?",
    "back": "Open the <b>Monitor Hub</b>, filter by Type = Dataflow and Status = Failed, set the time range to last 24 hours. Find the failed run, select <b>Drill-down</b> to view Logs, fix the issue, then use the <b>Retry</b> option to re-run."
  },
  {
    "id": "dp700-fc-069",
    "type": "term",
    "skill": "3.2.2",
    "front": "What causes slow Dataflow Gen2 refreshes?",
    "back": "Lost query folding, no staging for heavy work, and large source data. Filter early and check View data source query."
  },
  {
    "id": "dp700-fc-070",
    "type": "edge",
    "skill": "3.2.2",
    "front": "What is the formula firewall error?",
    "back": "Two sources with incompatible privacy levels are combined in one step. Fix privacy levels or separate the queries."
  },
  {
    "id": "dp700-fc-071",
    "type": "term",
    "skill": "3.2.2",
    "front": "Where do you find the failing query of a dataflow refresh?",
    "back": "The refresh history details for the run."
  },
  {
    "id": "dp700-fc-072",
    "type": "term",
    "skill": "3.2.3",
    "front": "Notebook OutOfMemory fix.",
    "back": "Avoid collect and toPandas on big data, aggregate in Spark, use larger nodes or more executors."
  },
  {
    "id": "dp700-fc-073",
    "type": "edge",
    "skill": "3.2.3",
    "front": "Library not found after install.",
    "back": "Publish the environment and attach it to the notebook."
  },
  {
    "id": "dp700-fc-074",
    "type": "term",
    "skill": "3.2.3",
    "front": "Where do you see a failed notebook run's details?",
    "back": "The notebook snapshot of the run in the Monitor hub, plus the Spark UI for job stages."
  },
  {
    "id": "dp700-fc-075",
    "type": "term",
    "skill": "3.2.3",
    "front": "Delta schema mismatch on append.",
    "back": "Delta enforces schema on write. Fix the DataFrame or use mergeSchema for intended evolution."
  },
  {
    "id": "m1-c52",
    "type": "term",
    "skill": "3.2.4",
    "front": "Is KQL case-sensitive?",
    "back": "KQL is <b>case-sensitive</b> for table names, column names, function names, and string comparisons by default. However, operators like <code>==</code> vs <code>=~</code> control case sensitivity: <code>==</code> is case-sensitive, <code>=~</code> is case-insensitive for string matching."
  },
  {
    "id": "m1-c53",
    "type": "edge",
    "skill": "3.2.4",
    "front": "What happens when you use a column name with wrong casing in a KQL query?",
    "back": "The query will fail with an error like &#39;Column &#39;column_name&#39; not found&#39; because KQL is case-sensitive for column and table names. Always verify casing in the schema. Use <code>.show schema</code> or the schema explorer to check exact column names before writing queries."
  },
  {
    "id": "m1-c62",
    "type": "term",
    "skill": "3.2.4",
    "front": "How does case sensitivity work with KQL string comparison operators?",
    "back": "<code>==</code> and <code>!=</code> are case-sensitive. Use <code>=~</code> for case-insensitive equality and <code>!~</code> for case-insensitive not-equal. Example: <code>where name == &#39;Alice&#39;</code> matches exactly &#39;Alice&#39; but not &#39;alice&#39;; <code>where name =~ &#39;alice&#39;</code> matches both."
  },
  {
    "id": "m3-c21",
    "type": "edge",
    "skill": "3.2.4",
    "front": "Is KQL case-sensitive?",
    "back": "<b>Yes.</b> KQL is case-sensitive. Table names, column names, and string comparisons use exact casing. For case-insensitive matching, use <code>=~</code> instead of <code>==</code>."
  },
  {
    "id": "dp700-fc-076",
    "type": "term",
    "skill": "3.2.5",
    "front": "Where do you find Eventstream errors?",
    "back": "Authoring errors and Test result tabs in the editor, plus Data insights and Runtime logs on a node."
  },
  {
    "id": "dp700-fc-077",
    "type": "edge",
    "skill": "3.2.5",
    "front": "Edits don't take effect in an Eventstream.",
    "back": "Publish the changes in the event processing editor."
  },
  {
    "id": "dp700-fc-078",
    "type": "scenario",
    "skill": "3.2.5",
    "front": "Event Hub source fails intermittently.",
    "back": "Check connection string, network access and use a dedicated consumer group."
  },
  {
    "id": "dp700-fc-079",
    "type": "term",
    "skill": "3.2.5",
    "front": "Operators before a non-Lakehouse destination.",
    "back": "Add a derived stream, then place operators before it."
  },
  {
    "id": "dp700-fc-080",
    "type": "term",
    "skill": "3.2.6",
    "front": "Error 24556 or 24706 in a warehouse.",
    "back": "Snapshot isolation update conflict. The first committer wins; retry the other transaction."
  },
  {
    "id": "dp700-fc-081",
    "type": "edge",
    "skill": "3.2.6",
    "front": "Which isolation level does a warehouse use?",
    "back": "Snapshot isolation only. SET TRANSACTION ISOLATION LEVEL changes are ignored."
  },
  {
    "id": "dp700-fc-082",
    "type": "term",
    "skill": "3.2.6",
    "front": "New lakehouse table missing from the SQL analytics endpoint.",
    "back": "Refresh the endpoint metadata on demand (portal, REST API or pipeline activity)."
  },
  {
    "id": "dp700-fc-083",
    "type": "edge",
    "skill": "3.2.6",
    "front": "Unsupported in a warehouse transaction.",
    "back": "Savepoints, named and marked transactions and distributed transactions."
  },
  {
    "id": "dp700-fc-084",
    "type": "term",
    "skill": "3.2.7",
    "front": "Common shortcut errors.",
    "back": "Expired connection credentials, a moved or deleted target, missing permission at the target, and names with % or +."
  },
  {
    "id": "dp700-fc-085",
    "type": "edge",
    "skill": "3.2.7",
    "front": "New shortcut not seen by the Table API.",
    "back": "Allow about a minute for it to be recognized."
  },
  {
    "id": "dp700-fc-086",
    "type": "edge",
    "skill": "3.2.7",
    "front": "OneLake security with shortcuts fails for external readers.",
    "back": "Enable the tenant setting Users can access data stored in OneLake with apps external to Fabric."
  },
  {
    "id": "dp700-fc-087",
    "type": "edge",
    "skill": "3.2.7",
    "front": "Shortcut in Tables isn't a table.",
    "back": "The data must be Delta and the shortcut at the top level of Tables."
  },
  {
    "id": "m1-c37",
    "type": "term",
    "skill": "3.3.1",
    "front": "What is partitionBy in Spark DataFrames?",
    "back": "A write option (<code>df.write.partitionBy(&#39;column&#39;).format(&#39;delta&#39;).save(&#39;path&#39;)</code>) that organizes data into subdirectories based on column values. Enables partition pruning at read time, reducing the amount of data scanned. Common partition columns include date, region, or category."
  },
  {
    "id": "m1-c38",
    "type": "term",
    "skill": "3.3.1",
    "front": "What is partition pruning in Spark?",
    "back": "A performance optimization where Spark automatically skips irrelevant partitions when reading partitioned data. If a WHERE clause filters on a partition column, Spark reads only the matching partition directories, dramatically reducing I/O and execution time."
  },
  {
    "id": "m1-c39",
    "type": "edge",
    "skill": "3.3.1",
    "front": "What happens when you use too many partitions (over-partitioning) in Spark?",
    "back": "Over-partitioning creates many small files and tasks, leading to: (1) task scheduling overhead outweighing processing time, (2) metadata and driver memory pressure from tracking many small tasks, (3) poor file sizes on disk (many tiny files hurting read performance). Rule of thumb: target 128 MB – 1 GB per partition after shuffles."
  },
  {
    "id": "m1-c45",
    "type": "scenario",
    "skill": "3.3.1",
    "front": "You have a daily sales table partitioned by sale_date with 2 years of data. Users frequently query last week's sales by sale_date. How should you design the storage?",
    "back": "<b>Solution:</b> Partition the Delta table by <code>sale_date</code> (<code>df.write.partitionBy(&#39;sale_date&#39;).format(&#39;delta&#39;).save(&#39;path&#39;)</code>).<br><br><b>Reasoning:</b> Partitioning by the frequently filtered column enables partition pruning. When a user filters on <code>sale_date >= &#39;2026-06-02&#39;</code>, Spark reads only the relevant partition subdirectories instead of scanning all 2 years of data."
  },
  {
    "id": "m2-c14",
    "type": "term",
    "skill": "3.3.1",
    "front": "What is OptimizeWrite and OPTIMIZE in Delta Lake?",
    "back": "<b>OptimizeWrite</b> — <i>default enabled</i> in Fabric. Dynamically reduces partition file count during writes.<br><br><b>OPTIMIZE</b> — post-write command (<code>OPTIMIZE table</code>) that consolidates small Parquet files into larger ones (bin-packing). Improves read performance, especially for Direct Lake and Spark."
  },
  {
    "id": "m2-c15",
    "type": "term",
    "skill": "3.3.1",
    "front": "What is V-Order in Fabric and what are its trade-offs?",
    "back": "V-Order is a special encoding applied during Delta writes in Fabric that <b>reorders data rows</b> within Parquet files to maximize Verti-Scan compression.<br><br><b>Write overhead:</b> ~15% slower writes<br><b>Read benefit:</b> Significant performance gain for Fabric engines (Power BI, SQL Analytics Endpoint, Spark) due to better min/max statistics and skipping."
  },
  {
    "id": "m2-c16",
    "type": "edge",
    "skill": "3.3.1",
    "front": "What happens when you run VACUUM on a Delta table and why does it break time travel?",
    "back": "<code>VACUUM</code> physically removes Parquet files older than the retention threshold (default <b>7 days</b>). It does NOT delete transaction logs — but once data files are gone, you cannot time travel to a version that required them.<br><br>Any <code>TIMESTAMP AS OF</code> or <code>VERSION AS OF</code> query pointing beyond the retention window will <b>fail</b>."
  },
  {
    "id": "m2-c20",
    "type": "edge",
    "skill": "3.3.1",
    "front": "When is partitioning in Delta Lake an anti-pattern?",
    "back": "Partitioning is an <b>anti-pattern when the partition column has high cardinality</b> (e.g., partitioning by <code>user_id</code> or <code>transaction_id</code>). Thousands of small partitions → thousands of small Parquet files → poor read performance.<br><br>Good partition columns: <code>year</code>, <code>month</code>, <code>region</code> (low cardinality, naturally filtered)."
  },
  {
    "id": "dp700-fc-088",
    "type": "term",
    "skill": "3.3.2",
    "front": "Copy activity performance settings.",
    "back": "Intelligent throughput optimization (4 to 256 units), degree of copy parallelism, partition options and staging."
  },
  {
    "id": "dp700-fc-089",
    "type": "term",
    "skill": "3.3.2",
    "front": "ForEach parallelism.",
    "back": "Clear Sequential and set a batch count. Default 20, max 50."
  },
  {
    "id": "dp700-fc-090",
    "type": "edge",
    "skill": "3.3.2",
    "front": "What slows a Copy activity on purpose?",
    "back": "Data consistency verification re-reads data to compare source and sink."
  },
  {
    "id": "dp700-fc-091",
    "type": "scenario",
    "skill": "3.3.2",
    "front": "Bulk load Parquet into a Warehouse.",
    "back": "COPY INTO with many files of about 100 MB to 1 GB, in parallel."
  },
  {
    "id": "m4-c17",
    "type": "term",
    "skill": "3.3.3",
    "front": "How does compute auto-scaling work in Fabric Warehouse?",
    "back": "Fabric Warehouse uses <b>auto-scaling compute</b> that automatically adjusts resources based on workload demand. Compute is separate from storage (OneLake). The Warehouse cold-starts on first query after inactivity and scales up/down transparently &mdash; no user configuration is needed."
  },
  {
    "id": "dp700-fc-092",
    "type": "term",
    "skill": "3.3.3",
    "front": "Warehouse tuning basics.",
    "back": "Fresh statistics, small data types, bulk loads instead of trickle inserts, CLUSTER BY for file skipping."
  },
  {
    "id": "dp700-fc-093",
    "type": "edge",
    "skill": "3.3.3",
    "front": "What is special about V-Order in a warehouse?",
    "back": "On by default. If you disable it you can't re-enable it."
  },
  {
    "id": "dp700-fc-094",
    "type": "term",
    "skill": "3.3.3",
    "front": "Why avoid trickle inserts?",
    "back": "Every small insert writes a small Parquet file, which slows queries. Use set-based loads."
  },
  {
    "id": "m1-c56",
    "type": "term",
    "skill": "3.3.4",
    "front": "What are materialized views in KQL?",
    "back": "Pre-computed aggregation results that are maintained incrementally as new data arrives. Defined with <code>.create materialized-view</code>. They improve query performance for repeated aggregation queries (e.g., daily counts by category) by avoiding full table scans on every execution."
  },
  {
    "id": "m1-c58",
    "type": "scenario",
    "skill": "3.3.4",
    "front": "You have a high-volume IoT telemetry table with billions of rows. Analysts repeatedly query hourly aggregates by device. How should you optimize?",
    "back": "<b>Solution:</b> Create a materialized view that pre-computes hourly aggregations by device.<br><br><b>Reasoning:</b> Materialized views incrementally maintain aggregated results as new data arrives, so analysts query pre-computed data instead of scanning the full table each time. This dramatically reduces query latency and resource consumption."
  },
  {
    "id": "m3-c18",
    "type": "term",
    "skill": "3.3.4",
    "front": "What is a materialized view in Eventhouse?",
    "back": "An <b>auto-updating pre-aggregated view</b> with two parts: a <b>materialized part</b> (pre-computed, persisted) and a <b>delta part</b> (recent changes not yet materialized). Queries merge both transparently for up-to-date results."
  },
  {
    "id": "m3-c19",
    "type": "compare",
    "skill": "3.3.4",
    "front": "Compare the materialized part vs the delta part of a materialized view.",
    "back": "<b>Materialized part</b>: Fully computed aggregation stored on disk, updated periodically in background. Fastest query performance.<br><br><b>Delta part</b>: Recent data changes not yet merged. Queries compute delta on-the-fly and merge with materialized results, ensuring you always see <b>fresh data</b>."
  },
  {
    "id": "m1-c23",
    "type": "term",
    "skill": "3.3.5",
    "front": "What is the native execution engine in Fabric Spark?",
    "back": "A performance-optimized engine that leverages vectorized query execution and code generation. To enable it, two Spark properties must be set: <code>spark.native.enabled</code> and <code>spark.native.codegen.enabled</code> (or <code>spark.native.codegen.enabled</code> and <code>spark.sql.parquet.enableVectorizedReader</code> depending on version). It accelerates query performance for SQL and DataFrame operations."
  },
  {
    "id": "m1-c24",
    "type": "edge",
    "skill": "3.3.5",
    "front": "What two Spark properties are required to enable the native execution engine in Fabric?",
    "back": "The two properties are <code>spark.native.enabled</code> (set to <code>true</code>) and <code>spark.native.codegen.enabled</code> (set to <code>true</code>). These enable vectorized execution and runtime code generation for accelerated query performance."
  },
  {
    "id": "dp700-fc-095",
    "type": "term",
    "skill": "3.3.5",
    "front": "Native execution engine.",
    "back": "Vectorized engine for supported Spark operators. Enable with spark.native.enabled or the environment setting."
  },
  {
    "id": "dp700-fc-096",
    "type": "term",
    "skill": "3.3.5",
    "front": "Spark resource profiles.",
    "back": "Presets such as writeHeavy and readHeavyForSpark that tune Spark settings for a workload."
  },
  {
    "id": "m1-c55",
    "type": "compare",
    "skill": "3.3.6",
    "front": "What are the three key KQL query optimization strategies?",
    "back": "<b>1. Filter early:</b> Place <code>where</code> clauses as early as possible in the query pipeline to reduce rows flowing through subsequent operators.<br><br><b>2. Reduce columns:</b> Use <code>project</code> early to limit columns to only those needed, reducing memory and shuffle overhead.<br><br><b>3. Optimize join order:</b> Put the smallest (most reduced) table on the left side of <code>join</code> to minimize the build side of the hash join."
  },
  {
    "id": "m3-c17",
    "type": "scenario",
    "skill": "3.3.6",
    "front": "A KQL join of a 1B-row sensor table with a 10M-row device table is slow. What three optimizations should you apply?",
    "back": "1. <b>Filter early on time</b> - add <code>where Timestamp between (..)</code> to sensor table before join<br>2. <b>Reduce columns</b> - <code>project</code> to keep only needed columns on both sides<br>3. <b>Smaller table first</b> - put device metadata (10M rows) on the <b>left</b> of the join"
  },
  {
    "id": "dp700-fc-097",
    "type": "term",
    "skill": "3.3.6",
    "front": "KQL query performance rules.",
    "back": "Filter by time first, filter before joins, put the smaller table on the left of a join, and project only needed columns."
  },
  {
    "id": "dp700-fc-098",
    "type": "term",
    "skill": "3.3.6",
    "front": "Spark SQL performance basics.",
    "back": "Select only needed columns, filter on the partition or clustered columns, and broadcast small tables."
  }
];
