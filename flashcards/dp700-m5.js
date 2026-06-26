var MODULE5_CARDS = [
  {
    id: "m5-c1",
    type: "term",
    topic: "CI/CD and Git Integration",
    front: "How is Git integration configured in Microsoft Fabric?",
    back: "Git integration is configured <b>per workspace</b>. Each workspace connects to a single Git repository (GitHub or Azure DevOps) where items are synchronized as <b>platform-native</b> files (not exported)."
  },
  {
    id: "m5-c2",
    type: "term",
    topic: "CI/CD and Git Integration",
    front: "What are the two branching strategies supported by Fabric Git integration?",
    back: "1. <b>Isolated workspace</b> — each branch maps to its own workspace, branches are kept separate<br>2. <b>Client tool</b> — a single workspace switches branches using git commands in VS Code or other tools; branch is changed client-side"
  },
  {
    id: "m5-c3",
    type: "term",
    topic: "CI/CD and Git Integration",
    front: "What are Deployment Pipelines in Fabric and what stages do they use?",
    back: "Deployment Pipelines allow content to flow through <b>Dev → Test → Production</b> stages. Stages include content <b>cloning</b> (copying items forward) and optional <b>deployment rules</b> (e.g., swapping connection strings or parameter values per stage)."
  },
  {
    id: "m5-c4",
    type: "term",
    topic: "CI/CD and Git Integration",
    front: "What is the 'combined approach' for CI/CD in Fabric?",
    back: "In the combined approach, only the <b>Dev</b> stage is connected to Git. Changes flow Dev (Git-connected) → Test → Production, merging Git-based source control with deployment pipeline automation."
  },
  {
    id: "m5-c5",
    type: "term",
    topic: "CI/CD and Git Integration",
    front: "What REST APIs are available for CI/CD in Fabric?",
    back: "Fabric exposes <b>Git REST APIs</b> (connect/disconnect workspace, get/update status, commit changes) and <b>Deployment Pipeline REST APIs</b> (create pipeline, assign workspace, deploy, list stages, manage rules) for programmatic CI/CD."
  },
  {
    id: "m5-c6",
    type: "compare",
    topic: "CI/CD and Git Integration",
    front: "Compare isolated workspace vs. client tool branching strategies.",
    back: "<b>Isolated workspace</b>: each branch has its own workspace (strong isolation, ideal for team collaboration).<br><br><b>Client tool</b>: single workspace switches branches via git in client (simpler setup, suitable for individual dev; risk of unintended changes if branch forgotten)."
  },
  {
    id: "m5-c7",
    type: "compare",
    topic: "CI/CD and Git Integration",
    front: "Compare Deployment Pipelines with Git integration for CI/CD.",
    back: "<b>Git integration</b>: source-control focused, item-level sync, branching/merging, works with GitHub/Azure DevOps, developer-oriented.<br><br><b>Deployment Pipelines</b>: environment-oriented (Dev/Test/Prod), content cloning with deployment rules, no merge conflicts, admin-friendly promotion flow."
  },
  {
    id: "m5-c8",
    type: "scenario",
    topic: "CI/CD and Git Integration",
    front: "Your team of 5 developers needs to work on different features simultaneously in Fabric. Each feature may take days and should not interfere. Which branching strategy should you use?",
    back: "Use <b>Isolated workspace</b> branching. Each developer (or feature team) gets their own workspace connected to their feature branch. This provides strong isolation so work-in-progress changes never affect others."
  },
  {
    id: "m5-c9",
    type: "edge",
    topic: "CI/CD and Git Integration",
    front: "What happens to existing workspace content when you first connect a workspace to a Git repo that already has files?",
    back: "The workspace enters a <b>conflict state</b>. You must choose to either overwrite the workspace with the repo content or resolve conflicts manually. Fabric does NOT auto-merge. Always commit workspace content to an empty repo or a new branch first."
  },
  {
    id: "m5-c10",
    type: "term",
    topic: "Monitor Hub",
    front: "What is the Monitor Hub in Microsoft Fabric?",
    back: "The Monitor Hub is a <b>centralized activity monitoring</b> interface in Fabric. Users can see their own activities; <b>admins</b> can see all activities across the tenant. It provides a 30-day activity history."
  },
  {
    id: "m5-c11",
    type: "term",
    topic: "Monitor Hub",
    front: "Which activities are monitored in the Monitor Hub?",
    back: "Monitored activities include: <b>pipelines</b>, <b>dataflows</b>, <b>semantic models</b> (refreshes), <b>Spark jobs</b>, and <b>Eventstreams</b>."
  },
  {
    id: "m5-c12",
    type: "term",
    topic: "Monitor Hub",
    front: "What filtering options are available in the Monitor Hub?",
    back: "Filters include: <b>Status</b> (succeeded/failed/in-progress), <b>Type</b> (pipeline, dataflow, etc.), <b>Time</b> (custom range within 30 days), <b>User</b>, and <b>Workspace</b>."
  },
  {
    id: "m5-c13",
    type: "term",
    topic: "Monitor Hub",
    front: "What drill-down capabilities does the Monitor Hub provide?",
    back: "From the Monitor Hub you can: <b>Open</b> the item directly, <b>Retry</b> failed activities, view detailed <b>Logs</b>, and see execution <b>History</b> for the selected item."
  },
  {
    id: "m5-c14",
    type: "term",
    topic: "Monitor Hub",
    front: "What Spark-specific monitoring details are available?",
    back: "For <b>Spark jobs</b>, the Monitor Hub shows: application ID, session type, state, duration, total cores, total memory, and Spark UI link for deep debugging."
  },
  {
    id: "m5-c15",
    type: "compare",
    topic: "Monitor Hub",
    front: "Compare what a regular user sees vs. an admin in the Monitor Hub.",
    back: "<b>Regular user</b>: sees only activities they initiated or items they own.<br><br><b>Admin (Fabric/Capacity/Domain/Workspace admin)</b>: sees all activities across the scope they administer — including other users' activities."
  },
  {
    id: "m5-c16",
    type: "scenario",
    topic: "Monitor Hub",
    front: "A dataflow refresh failed overnight. You need to understand why and retry it. What do you do?",
    back: "Open the <b>Monitor Hub</b>, filter by Type = Dataflow and Status = Failed, set the time range to last 24 hours. Find the failed run, select <b>Drill-down</b> to view Logs, fix the issue, then use the <b>Retry</b> option to re-run."
  },
  {
    id: "m5-c17",
    type: "edge",
    topic: "Monitor Hub",
    front: "Can the Monitor Hub show activities older than 30 days?",
    back: "<b>No.</b> The Monitor Hub maintains exactly <b>30 days</b> of history. For longer retention, you must route audit logs to Azure Log Analytics or a storage account via diagnostic settings."
  },
  {
    id: "m5-c18",
    type: "term",
    topic: "OneLake Security Roles",
    front: "What are OneLake Security Roles?",
    back: "OneLake Security Roles provide <b>RBAC for tables, folders, and files</b> within a lakehouse. Permissions are <b>consistent across all compute engines</b> (Spark, SQL analytics endpoint, semantic models reading from OneLake)."
  },
  {
    id: "m5-c19",
    type: "term",
    topic: "OneLake Security Roles",
    front: "What is the DefaultReader role and when is it created?",
    back: "The <b>DefaultReader</b> role is <b>auto-created</b> when you create a lakehouse. It grants read access to all workspace users at the OneLake level, ensuring existing workspace viewers can still read data by default."
  },
  {
    id: "m5-c20",
    type: "term",
    topic: "OneLake Security Roles",
    front: "What are the four components of an OneLake Security Role?",
    back: "1. <b>Data</b> — the specific tables/folders/files the role applies to<br>2. <b>Permission</b> — Read or Read+Execute for each item<br>3. <b>Members</b> — users, groups, or service principals assigned<br>4. <b>Constraints</b> — optional row-level security filters using Spark SQL expressions"
  },
  {
    id: "m5-c21",
    type: "term",
    topic: "OneLake Security Roles",
    front: "What is the scope and limitation of OneLake Security Roles?",
    back: "Roles are <b>per-lakehouse</b>. They <b>only affect Viewer and Read-only users</b> — members with higher workspace roles (Admin, Member, Contributor) bypass them. They restrict access at the OneLake storage layer."
  },
  {
    id: "m5-c22",
    type: "compare",
    topic: "OneLake Security Roles",
    front: "Compare OneLake Security Roles with Workspace Roles.",
    back: "<b>OneLake Security Roles</b>: fine-grained, per-lakehouse, table/folder/file level, affects only Viewer/Read-only, defined in lakehouse security UI.<br><br><b>Workspace Roles</b>: coarse-grained, per-workspace, affects all items, Admin/Member/Contributor/Viewer, defined in workspace management."
  },
  {
    id: "m5-c23",
    type: "scenario",
    topic: "OneLake Security Roles",
    front: "You have a lakehouse with a 'Sales' table that should only be visible to the finance team, while other tables should be visible to all Viewers. How do you achieve this?",
    back: "Create an <b>OneLake Security Role</b> for the Sales table with Read permission, assign only the finance team as members. The DefaultReader role already grants access to other tables for all workspace Viewers."
  },
  {
    id: "m5-c24",
    type: "edge",
    topic: "OneLake Security Roles",
    front: "Who can create and manage OneLake Security Roles?",
    back: "Only <b>Workspace Admins and Members</b> can create and manage OneLake Security Roles. Contributors and Viewers cannot create them, even though members with Contributor role or higher bypass the role restrictions when accessing data."
  },
  {
    id: "m5-c25",
    type: "term",
    topic: "Fabric Administration",
    front: "What is the five-level hierarchy in Microsoft Fabric?",
    back: "<b>Tenant → Capacity → Domains → Workspaces → Items</b>. The tenant is the top-level Azure AD tenant; capacity provides billable compute; domains group workspaces logically; workspaces contain items (reports, notebooks, etc.)."
  },
  {
    id: "m5-c26",
    type: "term",
    topic: "Fabric Administration",
    front: "What are the four tiers of admin roles in Fabric?",
    back: "1. <b>Fabric Admin</b> — full tenant-wide control via Admin portal<br>2. <b>Capacity Admin</b> — manages a specific capacity (pause/resume/scale, assign workspaces)<br>3. <b>Domain Admin</b> — manages a domain and its workspaces<br>4. <b>Workspace Admin</b> — manages a single workspace (roles, content)"
  },
  {
    id: "m5-c27",
    type: "term",
    topic: "Fabric Administration",
    front: "What are Tenant Settings and how quickly do they propagate?",
    back: "Tenant Settings are <b>governance policies</b> configured in the Admin portal (e.g., allow external sharing, enable specific Fabric workloads). Changes take approximately <b>15 minutes to propagate</b> across the tenant."
  },
  {
    id: "m5-c28",
    type: "term",
    topic: "Fabric Administration",
    front: "What are Domains in Fabric and what capabilities do they provide?",
    back: "Domains are <b>logical groupings</b> of workspaces (e.g., by department or data domain). They provide <b>no access control</b> (purely organizational). Domains support <b>delegated admin</b> (Domain Admin role) and <b>subdomains</b> for hierarchical nesting."
  },
  {
    id: "m5-c29",
    type: "term",
    topic: "Fabric Administration",
    front: "What are the key capacity management actions available?",
    back: "Capacity management includes: monitoring <b>CU (Capacity Units)</b> consumption, <b>scaling up/out</b> (increase size or add nodes), <b>pausing/resuming</b> capacity, and using the <b>Capacity Metrics app</b> for detailed usage analysis."
  },
  {
    id: "m5-c30",
    type: "term",
    topic: "Fabric Administration",
    front: "What are the Fabric licensing tiers and the F64 threshold?",
    back: "Licensing tiers: <b>Free</b> (limited trial capacity), <b>Pro</b> (per-user, collaborative), <b>PPU / Premium Per User</b>. The <b>F64 threshold</b> (F64 or higher SKU) unlocks Premium features: XMLA endpoints, deployment pipelines, TMSL scripting, and unlimited item sharing."
  },
  {
    id: "m5-c31",
    type: "term",
    topic: "Fabric Administration",
    front: "Compare workspace apps vs. workspace roles for sharing.",
    back: "<b>Workspace roles</b> (Admin/Member/Contributor/Viewer) grant direct access to the workspace and all its contents.<br><br><b>Workspace apps</b> are curated, read-only packages of reports/dashboards published to specific users or groups — they don't grant workspace access."
  },
  {
    id: "m5-c32",
    type: "term",
    topic: "Fabric Administration",
    front: "What is the difference between promoted and certified content in Fabric governance?",
    back: "<b>Promoted</b> content is endorsed by the workspace owner or team — signals quality/readiness to the organization.<br><br><b>Certified</b> content has passed a formal <b>admin-defined review process</b> and carries the highest trust level. Certification is restricted to designated certifiers."
  },
  {
    id: "m5-c33",
    type: "compare",
    topic: "Fabric Administration",
    front: "Compare Fabric Admin, Capacity Admin, Domain Admin, and Workspace Admin.",
    back: "<b>Fabric Admin</b>: tenant-wide, all settings, Azure AD role<br><b>Capacity Admin</b>: per-capacity, manage SKU/settings/assignments<br><b>Domain Admin</b>: per-domain, assign workspaces, subdomains<br><b>Workspace Admin</b>: per-workspace, manage roles/content/sharing"
  },
  {
    id: "m5-c34",
    type: "compare",
    topic: "Fabric Administration",
    front: "Compare promoted vs. certified content endorsement.",
    back: "<b>Promoted</b>: promoted by workspace members, no formal review, appears in 'Promoted' filter, easy to promote/demote.<br><br><b>Certified</b>: only certifiers (designated by admin) can certify, requires formal validation, appears in 'Certified' filter, stricter governance, higher trust."
  },
  {
    id: "m5-c35",
    type: "scenario",
    topic: "Fabric Administration",
    front: "Your Fabric capacity is consistently near 100% utilization and jobs are throttled. What should you do?",
    back: "Use the <b>Capacity Metrics app</b> to identify the top consumers. Options: <b>scale up</b> (increase SKU size for more CUs), <b>scale out</b> (add nodes for better parallel processing), or <b>pause non-critical workspaces</b> during peak hours. Consider creating separate capacities for critical workloads."
  },
  {
    id: "m5-c36",
    type: "scenario",
    topic: "Fabric Administration",
    front: "You need to prevent users from sharing content externally across the entire tenant. How do you accomplish this?",
    back: "Configure a <b>Tenant Setting</b> in the <b>Admin portal</b> under 'Share content with external users'. Disable the setting and <b>wait ~15 minutes</b> for propagation. Users will then be blocked from external sharing tenant-wide."
  },
  {
    id: "m5-c37",
    type: "edge",
    topic: "Fabric Administration",
    front: "What is the significance of the F64 SKU threshold?",
    back: "Fabric capacities below F64 (F2, F4, F8, ..., F32) operate under <b>shared capacity</b> with limited Premium features. At <b>F64 and above</b>, you get <b>unlimited content consumption</b> (viewers don't need Pro licenses), deployment pipelines, XMLA endpoints, and TMSL scripting support."
  },
  {
    id: "m5-c38",
    type: "edge",
    topic: "Fabric Administration",
    front: "A Fabric admin changes a tenant setting but users report it hasn't taken effect after 5 minutes. Is something wrong?",
    back: "<b>No.</b> Tenant settings have a <b>~15 minute propagation delay</b>. The change is not immediate. If it still hasn't taken effect after 30 minutes, check if a <b>custom group policy</b> overrides the tenant-level setting."
  },
  {
    id: "m5-c39",
    type: "edge",
    topic: "Fabric Administration",
    front: "Do Domains provide any access control or security boundaries?",
    back: "<b>No.</b> Domains are purely <b>logical/organizational</b> groupings of workspaces. They do NOT provide access control, security isolation, or RBAC boundaries. A user with access to workspaces in different domains can access data across those domains freely."
  }
];
