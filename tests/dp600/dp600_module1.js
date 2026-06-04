// Module 1: Microsoft Fabric & Analytics Platform
(function() {
  var questions = [
  {
    "text": "Your organization enables Microsoft Fabric. A data engineer asks whether separate storage accounts are needed for Data Engineering, Data Warehouse, and Power BI workloads. What is the correct answer?",
    "options": [
      "Each workload requires its own Azure Data Lake Storage account",
      "OneLake is a tenant-wide data lake automatically available to all Fabric workloads without separate setup",
      "Storage accounts must be provisioned manually for each workspace",
      "Only Data Engineering and Data Warehouse share storage; Power BI requires a separate account"
    ],
    "correct": 1,
    "module": 1,
    "explanation": "OneLake is the unified, tenant-wide data lake in Microsoft Fabric, automatically available to all workloads (Data Engineering, Data Warehouse, Power BI, Real-Time Intelligence, etc.) without separate storage accounts. It eliminates data silos and copying. The other options incorrectly suggest manual provisioning or workload-specific storage, which contradicts Fabric's unified architecture."
  },
  {
    "text": "You need to grant a new analytics team read-only access to a specific lakehouse without giving them access to other items in the workspace. What should you do?",
    "options": [
      "Assign the Viewer workspace role to the team",
      "Share the lakehouse with item-level permissions and grant Read access",
      "Assign the Contributor workspace role and hide other items",
      "Create a custom workspace role for the team"
    ],
    "correct": 1,
    "module": 1,
    "explanation": "Itemâ€‘level permissions allow granting access to a specific item (the lakehouse) without exposing other items in the workspace. The Viewer role would give read access to all items in the workspace, not just the lakehouse. Contributor would allow modifications and also applies to the whole workspace. Custom workspace roles are not supported for this granularity."
  },
  {
    "text": "A data analyst discovers a semantic model in the OneLake catalog. The model has a 'Certified' endorsement badge. What does this indicate?",
    "options": [
      "The model is ready for sharing within a single team",
      "An organization-authorized reviewer verified the model meets quality standards for cross-team use",
      "The model contains the single source of truth for the data it contains",
      "The model was automatically endorsed by Fabric based on usage metrics"
    ],
    "correct": 1,
    "module": 1,
    "explanation": "Certified endorsement means an authorized reviewer (e.g., governance team) has approved the semantic model as meeting quality, reliability, and business standards for organizationâ€‘wide, crossâ€‘team use. Promoted is for teamâ€‘level trust; Master data indicates a single source of truth. Certification is never automatic â€“ it requires human approval."
  },
  {
    "text": "You want to understand how data flows from a source lakehouse through transformations into a final report. Which Fabric feature should you use?",
    "options": [
      "The Monitor Hub activity history",
      "Data lineage view in the workspace",
      "The OneLake catalog Explore tab",
      "The Admin portal audit logs"
    ],
    "correct": 1,
    "module": 1,
    "explanation": "Data lineage view (in workspace or item details) visually shows how data moves from source through transformations (e.g., dataflows, Spark jobs) to downstream items like semantic models and reports. Monitor Hub focuses on activity runs, OneLake catalog is for discovery, and audit logs track administrative actions."
  },
  {
    "text": "Your team needs to discover streaming data sources that other teams have created in Fabric. Where should you navigate?",
    "options": [
      "The OneLake catalog and filter by item type",
      "The Real-Time hub Streaming data page",
      "The Admin portal Data sources section",
      "The workspace settings Integrations tab"
    ],
    "correct": 1,
    "module": 1,
    "explanation": "The Realâ€‘Time hub is the central catalog for discovering and managing streaming data sources such as eventstreams, KQL tables, and IoT data. The OneLake catalog is for batch/stored data, not streaming. Admin portal and workspace settings do not provide this discovery capability."
  },
  {
    "text": "A Fabric administrator needs to disable Copilot for all users except the Data Science team. Where should the administrator configure this?",
    "options": [
      "In each workspace's settings under AI features",
      "In the Admin portal Tenant settings, enabling Copilot only for the Data Science security group",
      "By removing Copilot licenses from all users except the Data Science team",
      "In the Power BI service under Capacity settings"
    ],
    "correct": 1,
    "module": 1,
    "explanation": "Tenant settings in the Admin portal allow enabling or disabling Copilot for specific security groups. This is the recommended centralized control. Workspace settings only affect that workspace, licenses are not granular enough, and capacity settings do not control userâ€‘level Copilot access."
  },
  {
    "text": "Fabric IQ is described as a workload for organizing business vocabulary. Which of the following is NOT one of the three IQ workloads Microsoft provides?",
    "options": [
      "Fabric IQ",
      "Foundry IQ",
      "Work IQ",
      "Data IQ"
    ],
    "correct": 3,
    "module": 1,
    "explanation": "The three IQ workloads are Fabric IQ (business ontologies), Foundry IQ (enterprise knowledge), and Work IQ (collaboration signals). 'Data IQ' is not a Microsoftâ€‘provided IQ workload; it is a distractor."
  },
  {
    "text": "A user asks a data agent a natural language question about sales data. The data agent translates the question into a SQL query against a lakehouse. What is this process called?",
    "options": [
      "Direct Lake querying",
      "Natural language to SQL (NL2SQL) translation",
      "DAX query generation",
      "KQL query compilation"
    ],
    "correct": 1,
    "module": 1,
    "explanation": "The process of converting a natural language question into a structured SQL query is known as NL2SQL (Natural Language to SQL). Direct Lake is a storage mode, DAX is for semantic models, and KQL is for eventhouses."
  },
  {
    "text": "You need to connect to data in another workspace's lakehouse without copying it. You create a shortcut in your lakehouse that references their tables. What does the shortcut do?",
    "options": [
      "Copies the data into your OneLake storage",
      "Creates a reference that makes external data appear as a local folder without duplication",
      "Moves the data to your workspace and deletes it from the source",
      "Creates a scheduled sync that refreshes a local copy every hour"
    ],
    "correct": 1,
    "module": 1,
    "explanation": "A shortcut is a reference (like a symbolic link) that makes data from another location (internal or external) appear as a local folder or table in OneLake. No data is copied or moved â€“ it stays in the source location. Shortcuts avoid duplication and maintain a single source of truth."
  },
  {
    "text": "Which of the following workspace roles can manage permissions for items in the workspace?",
    "options": [
      "Contributor and Viewer",
      "Admin and Member",
      "Member and Contributor",
      "Viewer and Admin"
    ],
    "correct": 1,
    "module": 1,
    "explanation": "Workspace Admins and Members can manage permissions for items (sharing, role assignment). Contributor can create and modify content but cannot manage permissions. Viewer can only view content and cannot manage any permissions."
  },
  {
    "text": "A Fabric workspace contains lakehouses, warehouses, and semantic models. The workspace is assigned to a domain. What does domain assignment affect?",
    "options": [
      "It changes which users can see items in the workspace",
      "It organizes governance policies and grouping but does not change item-level access control",
      "It replaces the need for workspace roles",
      "It restricts which Fabric workloads can be used in the workspace"
    ],
    "correct": 1,
    "module": 1,
    "explanation": "Domains provide logical grouping of workspaces for governance (e.g., applying policies, ownership) and discovery. They do not alter access control â€“ workspace roles and item permissions continue to apply independently. Domains do not replace roles or restrict workloads."
  },
  {
    "text": "You are exploring the OneLake catalog to find a suitable semantic model for a report. You notice one model has a 'Master data' endorsement. What does this designation mean?",
    "options": [
      "The model is ready for team-level sharing",
      "The model is the authoritative source of truth for core organizational data like customer lists or product codes",
      "The model has been approved by Copilot for AI consumption",
      "The model contains the most frequently accessed data in the organization"
    ],
    "correct": 1,
    "module": 1,
    "explanation": "Master data endorsement indicates that the item (lakehouse or semantic model) is the authoritative, organizationâ€‘wide source of truth for critical business entities such as customer, product, or employee data. It is a higher level than Certified and applies only to data items."
  },
  {
    "text": "You create a lakehouse and notice that a dbo schema was created automatically. What is the benefit of organizing tables into schemas?",
    "options": [
      "Schemas prevent data duplication across lakehouses",
      "Schemas enable schema-level permissions and cross-workspace queries using four-part namespace",
      "Schemas are required for Copilot to function",
      "Schemas automatically apply row-level security to all tables"
    ],
    "correct": 1,
    "module": 1,
    "explanation": "Schemas (like dbo) allow logical grouping of tables and enable schemaâ€‘level security (GRANT SELECT on a schema) and crossâ€‘workspace queries using fourâ€‘part naming: workspace.lakehouse.schema.table. They do not prevent duplication, are not required for Copilot, and do not automatically apply RLS."
  },
  {
    "text": "A data engineer wants to verify the schema and data of a lakehouse table before creating a shortcut. Which tool should they use?",
    "options": [
      "The lakehouse explorer Files view",
      "The SQL analytics endpoint to run T-SQL preview queries",
      "The Monitor Hub activity details",
      "The Real-Time hub streaming data page"
    ],
    "correct": 1,
    "module": 1,
    "explanation": "The SQL analytics endpoint of a lakehouse provides readâ€‘only Tâ€‘SQL access to Delta tables. You can run SELECT queries (e.g., SELECT TOP 100 *) to preview data and verify the schema. Files view shows raw files, not table schema. Monitor Hub and Realâ€‘Time hub are not for schema inspection."
  },
  {
    "text": "Which of the following roles can enable Fabric for an organization in the Admin portal?",
    "options": [
      "Fabric administrator, Power Platform administrator, or Global administrator",
      "Only the Fabric administrator",
      "Any workspace Admin",
      "Only the Global administrator"
    ],
    "correct": 0,
    "module": 1,
    "explanation": "Enabling Microsoft Fabric for the tenant requires one of these highâ€‘privilege roles: Fabric Administrator, Power Platform Administrator, or Global Administrator (Entra ID). Workspace Admins have no tenantâ€‘wide authority."
  }
];
  
  if (typeof window.__dp600 === 'undefined') {
    window.__dp600 = { modules: [], questions: [] };
  }
  
  window.__dp600.questions = window.__dp600.questions.concat(questions);
  
  if (window.__dp600.modules.length < 1) {
    window.__dp600.modules[0] = "Module 1: Microsoft Fabric & Analytics Platform";
  }
})();

