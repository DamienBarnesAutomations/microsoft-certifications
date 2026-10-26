// DP-600 flashcards, tagged with the skill (study guide outline id) each one covers.
window.DP600_FLASHCARDS = [
  {
    "id": "dp600-fc-001",
    "type": "term",
    "skill": "1.1.1",
    "front": "What are the four Fabric workspace roles, from most to least access?",
    "back": "Admin, Member, Contributor, Viewer."
  },
  {
    "id": "dp600-fc-002",
    "type": "compare",
    "skill": "1.1.1",
    "front": "Compare what Admin, Member, Contributor and Viewer can do in a workspace.",
    "back": "<b>Admin:</b> everything, including deleting the workspace and adding admins.<br><b>Member:</b> create and edit items, share items, add people with lower roles.<br><b>Contributor:</b> create and edit items and run pipelines, but can't share items or manage access.<br><b>Viewer:</b> read-only access to content."
  },
  {
    "id": "dp600-fc-003",
    "type": "scenario",
    "skill": "1.1.1",
    "front": "A user must create and edit items and run pipelines but must not share items or manage workspace access. Which role?",
    "back": "Contributor."
  },
  {
    "id": "dp600-fc-004",
    "type": "edge",
    "skill": "1.1.1",
    "front": "Why can a workspace role be too broad for sharing one item?",
    "back": "A workspace role applies to every item in the workspace. To give access to a single item, share just that item (item-level access) instead of adding the user to the workspace."
  },
  {
    "id": "dp600-fc-005",
    "type": "edge",
    "skill": "1.1.1",
    "front": "Which workspace roles bypass object-level T-SQL DENY permissions in a warehouse?",
    "back": "Admin, Member and Contributor effectively have full access to the warehouse, so a DENY doesn't restrict them. Only a Viewer-level user is limited by object-level T-SQL permissions."
  },
  {
    "id": "dp600-fc-006",
    "type": "term",
    "skill": "1.1.2",
    "front": "What does sharing a Fabric item do?",
    "back": "It grants a user or group access to that single item without giving them a workspace role."
  },
  {
    "id": "dp600-fc-007",
    "type": "term",
    "skill": "1.1.2",
    "front": "Name the main item permissions you can grant when sharing a lakehouse.",
    "back": "Read (connect to the item), Read all SQL endpoint data (query through T-SQL), and Read all Apache Spark (read files and tables through Spark and OneLake APIs)."
  },
  {
    "id": "dp600-fc-008",
    "type": "compare",
    "skill": "1.1.2",
    "front": "Compare workspace-level and item-level access.",
    "back": "<b>Workspace-level:</b> a role that applies to all items in the workspace.<br><b>Item-level:</b> permissions on one item, granted by sharing it, with no workspace role needed."
  },
  {
    "id": "dp600-fc-009",
    "type": "edge",
    "skill": "1.1.2",
    "front": "In what order does Fabric evaluate data access?",
    "back": "Microsoft Entra ID authentication, then Fabric access (is Fabric enabled for the user and tenant), then data security (workspace roles, item permissions, compute permissions, OneLake security). Each level must be satisfied."
  },
  {
    "id": "dp600-fc-010",
    "type": "term",
    "skill": "1.1.3",
    "front": "How do you implement row-level security in a semantic model?",
    "back": "Create a role with a DAX filter expression on a table (for example [Email] = USERPRINCIPALNAME()) and add members to the role."
  },
  {
    "id": "dp600-fc-011",
    "type": "term",
    "skill": "1.1.3",
    "front": "How do you implement row-level security in a Fabric warehouse?",
    "back": "With T-SQL: an inline table-valued predicate function plus a security policy (CREATE SECURITY POLICY ... ADD FILTER PREDICATE) on the table."
  },
  {
    "id": "dp600-fc-012",
    "type": "term",
    "skill": "1.1.3",
    "front": "How do you restrict a column for a user in a Fabric warehouse?",
    "back": "Column-level security with T-SQL: GRANT SELECT on only the allowed columns, or DENY SELECT on the sensitive column."
  },
  {
    "id": "dp600-fc-013",
    "type": "term",
    "skill": "1.1.3",
    "front": "What does object-level security (OLS) do in a semantic model?",
    "back": "It hides a table or column from certain roles entirely, so it can't be seen or queried. You set it with an external tool such as Tabular Editor by setting the table or column permission to None."
  },
  {
    "id": "dp600-fc-014",
    "type": "term",
    "skill": "1.1.3",
    "front": "What is dynamic data masking and how is a partial mask written?",
    "back": "It obfuscates column values for users without the UNMASK permission. A partial mask is partial(prefix_length, 'padding', suffix_length), for example partial(0, 'XXXX-XXXX-XXXX-', 4)."
  },
  {
    "id": "dp600-fc-015",
    "type": "compare",
    "skill": "1.1.3",
    "front": "Compare dynamic data masking with column-level security.",
    "back": "<b>Masking:</b> the user can still query the column but sees obfuscated values.<br><b>Column-level security:</b> the user is denied the column and gets a permission error. Masking is not a security boundary against someone who can filter on the data."
  },
  {
    "id": "dp600-fc-016",
    "type": "term",
    "skill": "1.1.3",
    "front": "What are the parts of an OneLake security role?",
    "back": "Data (tables or folders), Permission (Read or ReadWrite), Members (users and groups), and optional Constraints (row or column filters)."
  },
  {
    "id": "dp600-fc-017",
    "type": "edge",
    "skill": "1.1.3",
    "front": "A user is in both DefaultReader and a restrictive OneLake security role. What access do they have?",
    "back": "OneLake security access is additive, so DefaultReader (read all tables and files) wins. To enforce the restriction, remove the user from DefaultReader."
  },
  {
    "id": "dp600-fc-018",
    "type": "term",
    "skill": "1.1.4",
    "front": "What is a sensitivity label in Fabric?",
    "back": "A Microsoft Purview Information Protection label applied to an item to classify it and, optionally, protect it with encryption and access control."
  },
  {
    "id": "dp600-fc-019",
    "type": "scenario",
    "skill": "1.1.4",
    "front": "A sensitivity label is applied to a lakehouse and someone creates a semantic model from it. What happens to the label?",
    "back": "It propagates downstream by inheritance, to the semantic model and then to reports built on it."
  },
  {
    "id": "dp600-fc-020",
    "type": "edge",
    "skill": "1.1.4",
    "front": "What happens when a user outside the allowed group opens an item whose label has an IRM protection policy?",
    "back": "They are blocked from the item entirely, because the label enforces access control, not just a marking."
  },
  {
    "id": "dp600-fc-021",
    "type": "edge",
    "skill": "1.1.4",
    "front": "Where do you set a default sensitivity label for new Fabric items?",
    "back": "In the Microsoft Purview sensitivity label policy (default label setting). The Fabric tenant setting only enables labels for Fabric."
  },
  {
    "id": "dp600-fc-022",
    "type": "edge",
    "skill": "1.1.4",
    "front": "Does a sensitivity label stay with a report exported as a .pbix?",
    "back": "Yes. The label and its protection travel with the file and are enforced when it's opened."
  },
  {
    "id": "dp600-fc-023",
    "type": "term",
    "skill": "1.1.5",
    "front": "What are the endorsement levels for Fabric items?",
    "back": "Promoted, Certified, and Master data."
  },
  {
    "id": "dp600-fc-024",
    "type": "compare",
    "skill": "1.1.5",
    "front": "Compare Promoted, Certified and Master data endorsement.",
    "back": "<b>Promoted:</b> an owner or contributor marks content as worth reusing.<br><b>Certified:</b> an authorized reviewer verifies it meets organizational quality standards.<br><b>Master data:</b> marks a data item as the authoritative source for core business data."
  },
  {
    "id": "dp600-fc-025",
    "type": "edge",
    "skill": "1.1.5",
    "front": "Which endorsement can be applied only to data items such as lakehouses and semantic models?",
    "back": "Master data. Promoted and Certified can also be applied to other items such as reports and notebooks."
  },
  {
    "id": "dp600-fc-026",
    "type": "scenario",
    "skill": "1.1.5",
    "front": "Who can certify an item?",
    "back": "Only users authorized by a Fabric administrator through the tenant's certification settings, usually a reviewer or a specified security group."
  },
  {
    "id": "dp600-fc-027",
    "type": "term",
    "skill": "1.2.1",
    "front": "What does Fabric workspace Git integration do?",
    "back": "It connects a workspace to a branch of a Git repository so item definitions can be committed, versioned and synced back to the workspace."
  },
  {
    "id": "dp600-fc-028",
    "type": "term",
    "skill": "1.2.1",
    "front": "Which Git providers does Fabric support?",
    "back": "Azure DevOps and the cloud version of GitHub. On-premises Git servers, submodules and sovereign clouds aren't supported."
  },
  {
    "id": "dp600-fc-029",
    "type": "edge",
    "skill": "1.2.1",
    "front": "What does the Update action do in a Git-connected workspace?",
    "back": "It syncs the whole branch to its latest commit. You can't pick individual items, and a conflict must be resolved first."
  },
  {
    "id": "dp600-fc-030",
    "type": "term",
    "skill": "1.2.1",
    "front": "What does the status 'Update required' mean on a workspace item?",
    "back": "The connected branch has a newer commit that hasn't been brought into the workspace yet."
  },
  {
    "id": "dp600-fc-031",
    "type": "edge",
    "skill": "1.2.1",
    "front": "What are the size limits for a Git commit?",
    "back": "Up to 50 MB in total per commit with a 25 MB limit per file, and a workspace can hold up to 1,000 items."
  },
  {
    "id": "dp600-fc-032",
    "type": "term",
    "skill": "1.2.2",
    "front": "What is a Power BI project (.pbip)?",
    "back": "A folder-based save format where the report and semantic model are stored as separate text files, which is what you need for source control and Git integration."
  },
  {
    "id": "dp600-fc-033",
    "type": "term",
    "skill": "1.2.2",
    "front": "What does a PBIP folder contain?",
    "back": "A <name>.Report folder (with definition.pbir as its entry point) and a <name>.SemanticModel folder (model as TMDL files such as model.tmdl and a tables folder). The .pbip file is only a shortcut."
  },
  {
    "id": "dp600-fc-034",
    "type": "term",
    "skill": "1.2.2",
    "front": "What is TMDL?",
    "back": "Tabular Model Definition Language, a YAML-like text format for a semantic model where each table, measure and relationship is a readable file."
  },
  {
    "id": "dp600-fc-035",
    "type": "edge",
    "skill": "1.2.2",
    "front": "What does the .gitignore Power BI Desktop creates for a project exclude?",
    "back": "Per-user files: .pbi/localSettings.json and .pbi/cache.abf."
  },
  {
    "id": "dp600-fc-036",
    "type": "edge",
    "skill": "1.2.2",
    "front": "You edit a .tmdl file outside Power BI Desktop. When does Desktop show the change?",
    "back": "Only after you close and reopen Desktop. You also can't save a .pbip directly to OneDrive or SharePoint."
  },
  {
    "id": "dp600-fc-037",
    "type": "term",
    "skill": "1.2.3",
    "front": "What are the default stages of a Fabric deployment pipeline?",
    "back": "Development, Test and Production. A pipeline can have two to ten stages and you can rename them."
  },
  {
    "id": "dp600-fc-038",
    "type": "term",
    "skill": "1.2.3",
    "front": "What do deployment rules do?",
    "back": "They change item settings per stage when content is deployed, for example a data source rule or a parameter rule for a semantic model."
  },
  {
    "id": "dp600-fc-039",
    "type": "edge",
    "skill": "1.2.3",
    "front": "Where do you create a deployment rule, and when does it take effect?",
    "back": "In the target stage, under the item. It only applies after you deploy from the source stage to that stage."
  },
  {
    "id": "dp600-fc-040",
    "type": "compare",
    "skill": "1.2.3",
    "front": "Compare data source rules and parameter rules for a semantic model.",
    "back": "<b>Data source rule:</b> swaps the source connection per stage.<br><b>Parameter rule:</b> sets a Power Query parameter value per stage. If the data source uses parameters you must use a parameter rule, because a data source rule isn't allowed."
  },
  {
    "id": "dp600-fc-041",
    "type": "term",
    "skill": "1.2.4",
    "front": "What is impact analysis?",
    "back": "A lineage feature that lists the workspaces and items that depend on a selected item, so you can see what a change would affect."
  },
  {
    "id": "dp600-fc-042",
    "type": "scenario",
    "skill": "1.2.4",
    "front": "You plan to rename a lakehouse column. How do you find affected semantic models and reports?",
    "back": "Run impact analysis on the lakehouse (from lineage view) and review the downstream items."
  },
  {
    "id": "dp600-fc-043",
    "type": "edge",
    "skill": "1.2.4",
    "front": "Which scopes does impact analysis offer for an item?",
    "back": "Child items (one step downstream) and all downstream items. A data source only offers child items."
  },
  {
    "id": "dp600-fc-044",
    "type": "edge",
    "skill": "1.2.4",
    "front": "Why might impact analysis not list a dependent item?",
    "back": "Lineage only shows items you have permission to see."
  },
  {
    "id": "dp600-fc-045",
    "type": "term",
    "skill": "1.2.5",
    "front": "What is the XMLA endpoint?",
    "back": "An endpoint on a capacity that lets tools such as SSMS, Tabular Editor and ALM Toolkit connect to semantic models to query and manage them."
  },
  {
    "id": "dp600-fc-046",
    "type": "term",
    "skill": "1.2.5",
    "front": "What is the default XMLA endpoint setting and who can change it?",
    "back": "Read-only by default. A capacity admin sets it to read-write in the capacity's semantic model workload settings."
  },
  {
    "id": "dp600-fc-047",
    "type": "scenario",
    "skill": "1.2.5",
    "front": "A tool gets a 'write operations not allowed' error deploying a model through XMLA. What do you check?",
    "back": "That the capacity's XMLA endpoint is set to read-write."
  },
  {
    "id": "dp600-fc-048",
    "type": "edge",
    "skill": "1.2.5",
    "front": "What else does XMLA write access depend on besides the capacity setting?",
    "back": "The tenant setting that allows XMLA endpoints must be on (it is by default), and models authored in Desktop need enhanced metadata."
  },
  {
    "id": "dp600-fc-049",
    "type": "term",
    "skill": "1.2.6",
    "front": "What is a Power BI template (.pbit)?",
    "back": "A file with the report layout, model schema and queries but no data. It prompts for parameter values when opened."
  },
  {
    "id": "dp600-fc-050",
    "type": "term",
    "skill": "1.2.6",
    "front": "What is a Power BI data source file (.pbids)?",
    "back": "A file that stores only connection information for a source. Opening it launches Desktop with the source preconfigured; you still authenticate and choose tables."
  },
  {
    "id": "dp600-fc-051",
    "type": "term",
    "skill": "1.2.6",
    "front": "What is a shared semantic model?",
    "back": "A single governed semantic model that many reports connect to, so logic and measures live in one place."
  },
  {
    "id": "dp600-fc-052",
    "type": "compare",
    "skill": "1.2.6",
    "front": "Compare .pbix, .pbit, .pbids and .pbip.",
    "back": "<b>.pbix:</b> report and data in one package.<br><b>.pbit:</b> template without data.<br><b>.pbids:</b> connection details only.<br><b>.pbip:</b> folder of text files for source control."
  },
  {
    "id": "dp600-fc-053",
    "type": "term",
    "skill": "2.1.1",
    "front": "What is a connection in Fabric?",
    "back": "A stored definition of how to reach a source: its address, authentication kind and credentials. Items such as dataflows and pipelines reuse it."
  },
  {
    "id": "dp600-fc-054",
    "type": "compare",
    "skill": "2.1.1",
    "front": "Compare cloud, on-premises gateway and VNet gateway connections.",
    "back": "<b>Cloud:</b> source reachable over the internet.<br><b>On-premises gateway:</b> source inside your network, via a gateway installed there (outbound connections only).<br><b>VNet gateway:</b> Azure services inside a virtual network, via a managed gateway bound to a capacity."
  },
  {
    "id": "dp600-fc-055",
    "type": "edge",
    "skill": "2.1.1",
    "front": "Which authentication kind works only through an on-premises data gateway?",
    "back": "Windows authentication."
  },
  {
    "id": "dp600-fc-056",
    "type": "term",
    "skill": "2.1.1",
    "front": "What is a workspace identity?",
    "back": "A managed service principal tied to a workspace, used to authenticate to sources (for example firewall-protected ADLS Gen2) without a stored secret. It can't be created in My workspace."
  },
  {
    "id": "dp600-fc-057",
    "type": "scenario",
    "skill": "2.1.1",
    "front": "Where do you manage connections and gateways in the Fabric portal?",
    "back": "Settings (gear icon) > Manage connections and gateways."
  },
  {
    "id": "dp600-fc-058",
    "type": "term",
    "skill": "2.1.2",
    "front": "What is the OneLake catalog?",
    "back": "The place to discover and browse Fabric items across workspaces you can access, with filters such as domain, item type and endorsement. Its Govern tab shows governance recommendations."
  },
  {
    "id": "dp600-fc-059",
    "type": "term",
    "skill": "2.1.2",
    "front": "What is Real-Time hub?",
    "back": "The catalog for streaming data in Fabric: streams, tables and events (including Azure and Fabric events) that you can browse, subscribe to and connect new sources from."
  },
  {
    "id": "dp600-fc-060",
    "type": "scenario",
    "skill": "2.1.2",
    "front": "You find a table in another workspace and want it in your lakehouse without copying. What do you create?",
    "back": "A shortcut."
  },
  {
    "id": "dp600-fc-061",
    "type": "edge",
    "skill": "2.1.2",
    "front": "Which item is the right place to find streams that other teams have created?",
    "back": "Real-Time hub, not the OneLake catalog."
  },
  {
    "id": "dp600-fc-062",
    "type": "compare",
    "skill": "2.1.3",
    "front": "Compare a shortcut with copying data.",
    "back": "<b>Shortcut:</b> references data in place (OneLake, ADLS Gen2, S3), no copy, always current.<br><b>Copy:</b> moves a separate copy into OneLake, giving a point-in-time snapshot you own."
  },
  {
    "id": "dp600-fc-063",
    "type": "term",
    "skill": "2.1.3",
    "front": "What is mirroring?",
    "back": "Continuous replication of an operational database into OneLake as Delta tables, so it can be queried without building a pipeline."
  },
  {
    "id": "dp600-fc-064",
    "type": "compare",
    "skill": "2.1.3",
    "front": "When should you use a pipeline Copy activity versus Dataflow Gen2?",
    "back": "<b>Copy activity:</b> large-scale, no-code data movement on a schedule with retries.<br><b>Dataflow Gen2:</b> Power Query transformations while ingesting. Use a pipeline to orchestrate both."
  },
  {
    "id": "dp600-fc-065",
    "type": "term",
    "skill": "2.1.3",
    "front": "What does the COPY INTO statement do in a Fabric warehouse?",
    "back": "Bulk-loads data from files (such as CSV or Parquet in storage) into a warehouse table."
  },
  {
    "id": "dp600-fc-066",
    "type": "scenario",
    "skill": "2.1.3",
    "front": "A table must be loaded nightly with only new or changed rows. What pattern fits?",
    "back": "An incremental load using a watermark column (such as LastModified) with a Lookup and Copy activity, or Dataflow Gen2 incremental refresh."
  },
  {
    "id": "dp600-fc-067",
    "type": "term",
    "skill": "2.1.3",
    "front": "What does the Load to Table feature in a lakehouse do?",
    "back": "It converts a supported file (such as CSV or Parquet) in the Files area into a managed Delta table with no code."
  },
  {
    "id": "dp600-fc-068",
    "type": "compare",
    "skill": "2.1.4",
    "front": "Compare lakehouse, warehouse and eventhouse.",
    "back": "<b>Lakehouse:</b> files and Delta tables, Spark, read-only SQL endpoint.<br><b>Warehouse:</b> relational, full T-SQL read/write, multi-table transactions.<br><b>Eventhouse:</b> streaming and time-series data queried with KQL."
  },
  {
    "id": "dp600-fc-069",
    "type": "scenario",
    "skill": "2.1.4",
    "front": "A team of SQL developers needs multi-table transactions and full INSERT/UPDATE/DELETE. Which store?",
    "back": "A warehouse."
  },
  {
    "id": "dp600-fc-070",
    "type": "scenario",
    "skill": "2.1.4",
    "front": "A team needs to explore structured and unstructured data with Python and an evolving schema. Which store?",
    "back": "A lakehouse."
  },
  {
    "id": "dp600-fc-071",
    "type": "term",
    "skill": "2.1.4",
    "front": "What is OneLake?",
    "back": "The single, tenant-wide data lake behind Fabric. All workloads store data in it in open Delta Parquet format, with no separate storage accounts."
  },
  {
    "id": "dp600-fc-072",
    "type": "edge",
    "skill": "2.1.4",
    "front": "What is the difference between the Tables and Files areas of a lakehouse?",
    "back": "Tables holds managed Delta tables; Files holds unstructured or raw files in any format."
  },
  {
    "id": "dp600-fc-073",
    "type": "term",
    "skill": "2.1.5",
    "front": "What is OneLake availability for an eventhouse?",
    "back": "A setting that keeps a Delta Lake copy of KQL database data in OneLake so Spark, SQL, Direct Lake and other engines can read it."
  },
  {
    "id": "dp600-fc-074",
    "type": "term",
    "skill": "2.1.5",
    "front": "Which policy and setting control the latency of OneLake availability?",
    "back": "The mirroring policy's TargetLatencyInMinutes. Very short values can create many small files."
  },
  {
    "id": "dp600-fc-075",
    "type": "edge",
    "skill": "2.1.5",
    "front": "What can't you do to a table while OneLake availability is on?",
    "back": "Rename it or change a column type. Turn availability off, make the change, then turn it back on."
  },
  {
    "id": "dp600-fc-076",
    "type": "edge",
    "skill": "2.1.5",
    "front": "What does OneLake integration for a semantic model export?",
    "back": "Import-mode tables as Delta tables in OneLake. Direct Lake and DirectQuery tables, measures and calculation groups can't be exported."
  },
  {
    "id": "dp600-fc-077",
    "type": "compare",
    "skill": "2.2.1",
    "front": "Compare a view, an inline table-valued function, a scalar function and a stored procedure.",
    "back": "<b>View:</b> reusable read-only SELECT, no parameters.<br><b>Inline TVF:</b> single SELECT with parameters, queried in FROM.<br><b>Scalar function:</b> returns one value (preview in Fabric warehouse).<br><b>Stored procedure:</b> multi-step logic that can write data, with parameters and TRY...CATCH."
  },
  {
    "id": "dp600-fc-078",
    "type": "term",
    "skill": "2.2.1",
    "front": "What can a stored procedure do that a view can't?",
    "back": "Write data (INSERT, UPDATE, DELETE, CREATE TABLE), take parameters, run several steps in order and handle errors with TRY...CATCH."
  },
  {
    "id": "dp600-fc-079",
    "type": "edge",
    "skill": "2.2.1",
    "front": "What are limits of scalar user-defined functions in a Fabric warehouse?",
    "back": "They're a preview feature, must be inlineable to use in SELECT ... FROM on tables, can't use nondeterministic built-ins like NEWID() or RAND(), and don't support INLINE, ENCRYPTION or EXECUTE AS."
  },
  {
    "id": "dp600-fc-080",
    "type": "scenario",
    "skill": "2.2.1",
    "front": "You need the same filtered query reused with a different year each time. Which object?",
    "back": "An inline table-valued function with a @year parameter."
  },
  {
    "id": "dp600-fc-081",
    "type": "term",
    "skill": "2.2.1",
    "front": "What does a transaction around INSERT, UPDATE and DELETE statements give you in a warehouse?",
    "back": "All-or-nothing behaviour: if any statement fails the whole set can be rolled back (BEGIN TRANSACTION ... COMMIT or ROLLBACK)."
  },
  {
    "id": "dp600-fc-082",
    "type": "term",
    "skill": "2.2.2",
    "front": "How do you add a derived column to existing data without changing stored data?",
    "back": "Create a view that selects the base columns and calculates the new one."
  },
  {
    "id": "dp600-fc-083",
    "type": "term",
    "skill": "2.2.2",
    "front": "How do you add a column in Dataflow Gen2?",
    "back": "Use Add column in Power Query (custom, conditional or from examples) and the step is applied on refresh."
  },
  {
    "id": "dp600-fc-084",
    "type": "term",
    "skill": "2.2.2",
    "front": "How do you add a column to a Spark DataFrame?",
    "back": "df.withColumn('NewCol', expression)."
  },
  {
    "id": "dp600-fc-085",
    "type": "term",
    "skill": "2.2.2",
    "front": "What is the Eventstream manage fields operation used for?",
    "back": "Adding, renaming, removing or changing the type of fields on events as they stream."
  },
  {
    "id": "dp600-fc-086",
    "type": "term",
    "skill": "2.2.3",
    "front": "What are the parts of a star schema?",
    "back": "A central fact table (keys and measures) surrounded by denormalized dimension tables (descriptive attributes) related by keys."
  },
  {
    "id": "dp600-fc-087",
    "type": "compare",
    "skill": "2.2.3",
    "front": "Compare star and snowflake schemas.",
    "back": "<b>Star:</b> denormalized dimensions, fewer joins, faster and simpler.<br><b>Snowflake:</b> normalized dimensions split into sub-tables, less repetition but more joins."
  },
  {
    "id": "dp600-fc-088",
    "type": "compare",
    "skill": "2.2.3",
    "front": "Compare transaction, periodic snapshot and accumulating snapshot fact tables.",
    "back": "<b>Transaction:</b> one row per event.<br><b>Periodic snapshot:</b> one row per entity per period, such as end-of-day inventory.<br><b>Accumulating snapshot:</b> one row per process instance, updated as milestones occur."
  },
  {
    "id": "dp600-fc-089",
    "type": "term",
    "skill": "2.2.3",
    "front": "What is a role-playing dimension?",
    "back": "One dimension (such as Date) referenced several times by a fact table for different roles (Order Date, Ship Date, Delivery Date)."
  },
  {
    "id": "dp600-fc-090",
    "type": "compare",
    "skill": "2.2.3",
    "front": "Compare SCD Type 1 and Type 2.",
    "back": "<b>Type 1:</b> overwrite the old value, no history.<br><b>Type 2:</b> add a new row with effective dates or a current flag, preserving history."
  },
  {
    "id": "dp600-fc-091",
    "type": "edge",
    "skill": "2.2.3",
    "front": "Are foreign key constraints enforced in a Fabric warehouse?",
    "back": "They're supported only as NOT ENFORCED, so they document relationships but don't validate data."
  },
  {
    "id": "dp600-fc-092",
    "type": "term",
    "skill": "2.2.4",
    "front": "What does denormalizing a dimension mean?",
    "back": "Flattening related tables (such as Product, Subcategory, Category) into one wide table so queries need fewer joins."
  },
  {
    "id": "dp600-fc-093",
    "type": "term",
    "skill": "2.2.4",
    "front": "What is the trade-off of denormalization?",
    "back": "Repeated values use more storage and are harder to update, in exchange for simpler, faster queries."
  },
  {
    "id": "dp600-fc-094",
    "type": "term",
    "skill": "2.2.4",
    "front": "How can you build a flattened dimension in a Fabric warehouse?",
    "back": "Join the normalized tables in a CREATE TABLE AS SELECT (CTAS) statement."
  },
  {
    "id": "dp600-fc-095",
    "type": "scenario",
    "skill": "2.2.4",
    "front": "A snowflake schema is slow because of many joins. What do you change?",
    "back": "Denormalize the dimensions into a star schema."
  },
  {
    "id": "dp600-fc-096",
    "type": "edge",
    "skill": "2.2.4",
    "front": "Where do descriptive attributes belong in a star schema?",
    "back": "In dimension tables. Keep fact tables narrow (keys and measures)."
  },
  {
    "id": "dp600-fc-097",
    "type": "term",
    "skill": "2.2.5",
    "front": "In T-SQL, what is the difference between WHERE and HAVING?",
    "back": "WHERE filters rows before grouping; HAVING filters groups after aggregation."
  },
  {
    "id": "dp600-fc-098",
    "type": "term",
    "skill": "2.2.5",
    "front": "How do you aggregate in PySpark?",
    "back": "df.groupBy('col').agg(sum('x'), count('*'))."
  },
  {
    "id": "dp600-fc-099",
    "type": "term",
    "skill": "2.2.5",
    "front": "Which window frame produces a running total in SQL?",
    "back": "SUM(x) OVER (PARTITION BY key ORDER BY date ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW)."
  },
  {
    "id": "dp600-fc-100",
    "type": "term",
    "skill": "2.2.5",
    "front": "What does a materialized view in a KQL database do?",
    "back": "It stores a continuously updated aggregation of a source table so queries read pre-aggregated data."
  },
  {
    "id": "dp600-fc-101",
    "type": "compare",
    "skill": "2.2.6",
    "front": "Compare inner, left outer and full outer joins.",
    "back": "<b>Inner:</b> only matching rows.<br><b>Left outer:</b> all left rows plus matches.<br><b>Full outer:</b> all rows from both sides."
  },
  {
    "id": "dp600-fc-102",
    "type": "term",
    "skill": "2.2.6",
    "front": "What does the T-SQL MERGE statement do?",
    "back": "Upserts: it inserts new rows and updates (or deletes) existing ones from a source into a target in one statement."
  },
  {
    "id": "dp600-fc-103",
    "type": "term",
    "skill": "2.2.6",
    "front": "How do you query across a warehouse and a lakehouse in the same workspace?",
    "back": "Use three-part naming (database.schema.table) in the SQL analytics endpoint or warehouse; no data copy is needed."
  },
  {
    "id": "dp600-fc-104",
    "type": "term",
    "skill": "2.2.6",
    "front": "What is query folding in Power Query?",
    "back": "Pushing transformations back to the source as a native query. Steps that break folding force processing in the dataflow engine, which is slower."
  },
  {
    "id": "dp600-fc-105",
    "type": "edge",
    "skill": "2.2.6",
    "front": "Which join types can Spark broadcast hash join not handle?",
    "back": "A full outer join; Spark falls back to sort-merge join. Broadcast works when one side is smaller than spark.sql.autoBroadcastJoinThreshold (10 MB by default)."
  },
  {
    "id": "dp600-fc-106",
    "type": "term",
    "skill": "2.2.6",
    "front": "How do you merge in Dataflow Gen2?",
    "back": "Use Merge queries to join two queries on matching columns, then expand the columns you need."
  },
  {
    "id": "dp600-fc-107",
    "type": "term",
    "skill": "2.2.7",
    "front": "How do you replace NULL with a default value in T-SQL?",
    "back": "COALESCE(col, default) or ISNULL(col, default). NULLIF does the opposite: it returns NULL when two values are equal."
  },
  {
    "id": "dp600-fc-108",
    "type": "term",
    "skill": "2.2.7",
    "front": "How do you remove duplicate rows in Dataflow Gen2?",
    "back": "Select the key columns and use Remove duplicates."
  },
  {
    "id": "dp600-fc-109",
    "type": "term",
    "skill": "2.2.7",
    "front": "How do you remove duplicates in Spark?",
    "back": "df.dropDuplicates(['key']) keeps one row per key; df.distinct() removes fully identical rows."
  },
  {
    "id": "dp600-fc-110",
    "type": "term",
    "skill": "2.2.7",
    "front": "How do you handle nulls in Spark?",
    "back": "df.fillna(value) to replace them, or df.dropna() to drop rows that contain them."
  },
  {
    "id": "dp600-fc-111",
    "type": "term",
    "skill": "2.2.8",
    "front": "How do you convert types in T-SQL without errors on bad values?",
    "back": "TRY_CAST or TRY_CONVERT return NULL on failure; CAST and CONVERT raise an error."
  },
  {
    "id": "dp600-fc-112",
    "type": "term",
    "skill": "2.2.8",
    "front": "Which M function changes column types?",
    "back": "Table.TransformColumnTypes."
  },
  {
    "id": "dp600-fc-113",
    "type": "term",
    "skill": "2.2.8",
    "front": "How do you change a column type in PySpark?",
    "back": "df.withColumn('col', col('col').cast('date'))."
  },
  {
    "id": "dp600-fc-114",
    "type": "scenario",
    "skill": "2.2.8",
    "front": "A date arrives as text and some values are invalid. How do you load it safely in a warehouse?",
    "back": "Convert with TRY_CAST so invalid values become NULL and can be reviewed, instead of failing the load."
  },
  {
    "id": "dp600-fc-115",
    "type": "term",
    "skill": "2.2.9",
    "front": "Why filter early in a Dataflow Gen2?",
    "back": "Early filters can fold to the source, so fewer rows are retrieved and later steps process less data."
  },
  {
    "id": "dp600-fc-116",
    "type": "term",
    "skill": "2.2.9",
    "front": "How do you filter rows in a PySpark DataFrame?",
    "back": "df.filter(condition) or df.where(condition)."
  },
  {
    "id": "dp600-fc-117",
    "type": "compare",
    "skill": "2.2.9",
    "front": "Compare WHERE and HAVING for filtering.",
    "back": "<b>WHERE:</b> filters individual rows before grouping.<br><b>HAVING:</b> filters aggregated groups."
  },
  {
    "id": "dp600-fc-118",
    "type": "edge",
    "skill": "2.2.9",
    "front": "What can Table.Buffer do to refresh performance?",
    "back": "It loads a table into memory to stop repeated evaluation, but on large tables it can make a refresh slower."
  },
  {
    "id": "dp600-fc-119",
    "type": "term",
    "skill": "2.3.1",
    "front": "What is the Visual query editor?",
    "back": "A no-code, Power Query-style editor for building read-only queries in a warehouse or a lakehouse SQL analytics endpoint."
  },
  {
    "id": "dp600-fc-120",
    "type": "term",
    "skill": "2.3.1",
    "front": "Which operations does it offer?",
    "back": "Choose or remove columns, filter rows, sort, group by, merge queries (join) and append queries (union)."
  },
  {
    "id": "dp600-fc-121",
    "type": "edge",
    "skill": "2.3.1",
    "front": "Can the Visual query editor write data?",
    "back": "No, it only generates SELECT queries. Use T-SQL for INSERT, UPDATE or stored procedures."
  },
  {
    "id": "dp600-fc-122",
    "type": "term",
    "skill": "2.3.1",
    "front": "How can you see the T-SQL behind a visual query?",
    "back": "Use View SQL. You can also save the result as a view."
  },
  {
    "id": "dp600-fc-123",
    "type": "term",
    "skill": "2.3.2",
    "front": "What does LAG do in SQL?",
    "back": "A window function that returns a value from a previous row in the partition, such as the previous order amount."
  },
  {
    "id": "dp600-fc-124",
    "type": "term",
    "skill": "2.3.2",
    "front": "How do you query a warehouse table as it existed at an earlier time?",
    "back": "Time travel: SELECT ... OPTION (FOR TIMESTAMP AS OF '<UTC timestamp>')."
  },
  {
    "id": "dp600-fc-125",
    "type": "term",
    "skill": "2.3.2",
    "front": "Which magic command runs Spark SQL in a PySpark notebook cell?",
    "back": "%%sql."
  },
  {
    "id": "dp600-fc-126",
    "type": "edge",
    "skill": "2.3.2",
    "front": "Which SQL surface of a lakehouse is read-only?",
    "back": "The SQL analytics endpoint. Use a warehouse for read/write T-SQL."
  },
  {
    "id": "dp600-fc-127",
    "type": "term",
    "skill": "2.3.2",
    "front": "What do statistics do in a Fabric warehouse?",
    "back": "They give the optimizer cardinality estimates; updating or creating statistics improves plans on large tables."
  },
  {
    "id": "dp600-fc-128",
    "type": "term",
    "skill": "2.3.3",
    "front": "What is the basic KQL query shape?",
    "back": "Table | operator | operator ..., a pipeline such as Events | where Temp > 40 | summarize avg(Temp) by Sensor."
  },
  {
    "id": "dp600-fc-129",
    "type": "term",
    "skill": "2.3.3",
    "front": "Which KQL operator groups and aggregates?",
    "back": "summarize, often with bin() to group by time buckets."
  },
  {
    "id": "dp600-fc-130",
    "type": "edge",
    "skill": "2.3.3",
    "front": "Are KQL table names case-sensitive?",
    "back": "Yes. 'stock | take 10' fails if the table is named Stock."
  },
  {
    "id": "dp600-fc-131",
    "type": "term",
    "skill": "2.3.3",
    "front": "Can you query a KQL database with SQL?",
    "back": "Yes, a subset of T-SQL is supported, but KQL is the native language."
  },
  {
    "id": "dp600-fc-132",
    "type": "term",
    "skill": "2.3.3",
    "front": "What is a KQL stored function for?",
    "back": "A reusable named query that others can call by name."
  },
  {
    "id": "dp600-fc-133",
    "type": "term",
    "skill": "2.3.4",
    "front": "What is the only required keyword in a DAX query?",
    "back": "EVALUATE, followed by a table expression."
  },
  {
    "id": "dp600-fc-134",
    "type": "term",
    "skill": "2.3.4",
    "front": "What does DEFINE do in a DAX query?",
    "back": "Declares query-scoped measures, variables, tables and columns. A measure defined there overrides a model measure of the same name for that query only."
  },
  {
    "id": "dp600-fc-135",
    "type": "term",
    "skill": "2.3.4",
    "front": "What does SUMMARIZECOLUMNS do?",
    "back": "Returns a table grouped by the given columns, with optional filters and name/expression pairs for aggregations. Rows where every expression is blank are dropped."
  },
  {
    "id": "dp600-fc-136",
    "type": "compare",
    "skill": "2.3.4",
    "front": "Compare ADDCOLUMNS and SELECTCOLUMNS.",
    "back": "<b>ADDCOLUMNS:</b> keeps every column and appends calculated ones.<br><b>SELECTCOLUMNS:</b> returns only the columns you name."
  },
  {
    "id": "dp600-fc-137",
    "type": "term",
    "skill": "2.3.4",
    "front": "How do you return the top N rows in a DAX query?",
    "back": "TOPN(n, table, expression, DESC), combined with ORDER BY because TOPN output isn't sorted."
  },
  {
    "id": "dp600-fc-138",
    "type": "edge",
    "skill": "2.3.4",
    "front": "Does a DAX query use the sort order defined in the model?",
    "back": "No. Sort columns must be in the query output and ORDER BY must reference them."
  },
  {
    "id": "dp600-fc-139",
    "type": "compare",
    "skill": "3.1.1",
    "front": "Compare Import, DirectQuery and Direct Lake.",
    "back": "<b>Import:</b> data copied into the model, fastest and most flexible, refreshed on a schedule.<br><b>DirectQuery:</b> queries sent to the source, always current, speed depends on the source.<br><b>Direct Lake:</b> reads Delta files from OneLake into memory, near-Import speed without a full data copy."
  },
  {
    "id": "dp600-fc-140",
    "type": "term",
    "skill": "3.1.1",
    "front": "What is Dual storage mode?",
    "back": "A table that can be answered from cache or from the source depending on the query. It's the usual choice for dimensions related to a DirectQuery fact table."
  },
  {
    "id": "dp600-fc-141",
    "type": "scenario",
    "skill": "3.1.1",
    "front": "Which storage mode should you start with in Fabric?",
    "back": "Direct Lake for lakehouse or warehouse data, then move to Import or DirectQuery only for specific needs such as non-Fabric sources."
  },
  {
    "id": "dp600-fc-142",
    "type": "edge",
    "skill": "3.1.1",
    "front": "What limits DirectQuery models?",
    "back": "Performance depends on the source, Power Query steps must fold, and some modelling features are reduced."
  },
  {
    "id": "dp600-fc-143",
    "type": "term",
    "skill": "3.1.2",
    "front": "How should a dimension relate to a fact table in a semantic model?",
    "back": "One-to-many from the dimension to the fact with single-direction filtering."
  },
  {
    "id": "dp600-fc-144",
    "type": "term",
    "skill": "3.1.2",
    "front": "Why use a star schema in a semantic model?",
    "back": "Simpler DAX, fewer and more predictable relationships, better compression and performance."
  },
  {
    "id": "dp600-fc-145",
    "type": "term",
    "skill": "3.1.2",
    "front": "Which columns should you hide in a star schema?",
    "back": "Foreign key columns on the fact table, so users filter by dimension attributes."
  },
  {
    "id": "dp600-fc-146",
    "type": "scenario",
    "skill": "3.1.2",
    "front": "Where should a calculated attribute be created for a smaller model?",
    "back": "At the source or in Power Query, not as a DAX calculated column."
  },
  {
    "id": "dp600-fc-147",
    "type": "compare",
    "skill": "3.1.3",
    "front": "Compare active and inactive relationships.",
    "back": "<b>Active:</b> used by default for filtering (only one per pair of tables).<br><b>Inactive:</b> ignored until a measure activates it with USERELATIONSHIP inside CALCULATE."
  },
  {
    "id": "dp600-fc-148",
    "type": "term",
    "skill": "3.1.3",
    "front": "How do you model a many-to-many relationship properly?",
    "back": "With a bridge table related to both sides, using single-direction one-to-many relationships (or both on the bridge to fact link where needed)."
  },
  {
    "id": "dp600-fc-149",
    "type": "edge",
    "skill": "3.1.3",
    "front": "Why can many-to-many totals exceed the grand total?",
    "back": "A fact row can match several related rows (for example several promotions per sale), so a visual by that dimension repeats the sale; this is expected, not an error."
  },
  {
    "id": "dp600-fc-150",
    "type": "term",
    "skill": "3.1.3",
    "front": "Which function lets a measure use an inactive relationship?",
    "back": "USERELATIONSHIP, used as a filter argument of CALCULATE."
  },
  {
    "id": "dp600-fc-151",
    "type": "scenario",
    "skill": "3.1.3",
    "front": "One date table must filter sales by order date and ship date at once on separate slicers. What do you do?",
    "back": "Create one date table per role (or role-playing copies), each with its own relationship to the fact table."
  },
  {
    "id": "dp600-fc-152",
    "type": "term",
    "skill": "3.1.4",
    "front": "What does a DAX variable (VAR) give you?",
    "back": "A value evaluated once and reused in the expression, which improves readability and performance."
  },
  {
    "id": "dp600-fc-153",
    "type": "compare",
    "skill": "3.1.4",
    "front": "Compare SUM and SUMX.",
    "back": "<b>SUM:</b> adds a column.<br><b>SUMX:</b> an iterator that evaluates an expression for each row of a table, then sums the results."
  },
  {
    "id": "dp600-fc-154",
    "type": "compare",
    "skill": "3.1.4",
    "front": "Compare ISFILTERED and ISCROSSFILTERED.",
    "back": "<b>ISFILTERED:</b> TRUE only if the column is directly filtered.<br><b>ISCROSSFILTERED:</b> TRUE if the column or another column in the same or a related table is filtered."
  },
  {
    "id": "dp600-fc-155",
    "type": "term",
    "skill": "3.1.4",
    "front": "What does HASONEVALUE return?",
    "back": "TRUE when the filter context leaves exactly one distinct value in the column. SELECTEDVALUE returns that value or an alternate result."
  },
  {
    "id": "dp600-fc-156",
    "type": "term",
    "skill": "3.1.4",
    "front": "Which DAX windowing functions exist?",
    "back": "INDEX, OFFSET, WINDOW, RANK and ROWNUMBER. Supply orderBy, and optionally partitionBy to restart per group."
  },
  {
    "id": "dp600-fc-157",
    "type": "term",
    "skill": "3.1.4",
    "front": "How do you compute a fiscal year-to-date with a March 31 year end?",
    "back": "TOTALYTD([Measure], 'Date'[Date], \"3/31\")."
  },
  {
    "id": "dp600-fc-158",
    "type": "edge",
    "skill": "3.1.4",
    "front": "What does CALCULATE([Sales], DimProduct[Color] = \"Red\") return if a slicer has Blue selected?",
    "back": "Blank. The Boolean filter replaces the slicer filter on Color. Use KEEPFILTERS to intersect instead."
  },
  {
    "id": "dp600-fc-159",
    "type": "term",
    "skill": "3.1.4",
    "front": "What does DIVIDE do that / doesn't?",
    "back": "Handles divide-by-zero by returning blank (or an alternate result) instead of an error."
  },
  {
    "id": "dp600-fc-160",
    "type": "term",
    "skill": "3.1.5",
    "front": "What is a calculation group?",
    "back": "A set of calculation items (such as YTD, prior year, YoY) that apply to any measure via SELECTEDMEASURE(), so you don't write each variant per measure."
  },
  {
    "id": "dp600-fc-161",
    "type": "term",
    "skill": "3.1.5",
    "front": "What is a dynamic format string?",
    "back": "A DAX expression for a measure's format, such as showing the currency symbol that matches a slicer, while the measure stays numeric."
  },
  {
    "id": "dp600-fc-162",
    "type": "term",
    "skill": "3.1.5",
    "front": "What is a field parameter?",
    "back": "A calculated table that lets report users switch the measures or dimensions in a visual with a slicer."
  },
  {
    "id": "dp600-fc-163",
    "type": "edge",
    "skill": "3.1.5",
    "front": "What does a field parameter's table contain?",
    "back": "One row per field: a display name, a NAMEOF reference and an order column. It's a disconnected table."
  },
  {
    "id": "dp600-fc-164",
    "type": "edge",
    "skill": "3.1.5",
    "front": "How do you create calculation groups in Power BI?",
    "back": "With an external tool such as Tabular Editor, or the model view in newer Desktop versions."
  },
  {
    "id": "dp600-fc-165",
    "type": "term",
    "skill": "3.1.6",
    "front": "What is the large semantic model storage format?",
    "back": "A storage setting that lets a model grow beyond the service default size, up to the capacity's size limit."
  },
  {
    "id": "dp600-fc-166",
    "type": "term",
    "skill": "3.1.6",
    "front": "Which feature does the large format enable on an Import model?",
    "back": "Query scale-out, among other things such as semantic model version history."
  },
  {
    "id": "dp600-fc-167",
    "type": "edge",
    "skill": "3.1.6",
    "front": "Do you enable the large format manually for Direct Lake?",
    "back": "No, Direct Lake models use it automatically."
  },
  {
    "id": "dp600-fc-168",
    "type": "term",
    "skill": "3.1.7",
    "front": "What is a composite model?",
    "back": "A model that mixes storage modes (such as Import and DirectQuery) or several data sources."
  },
  {
    "id": "dp600-fc-169",
    "type": "term",
    "skill": "3.1.7",
    "front": "What is a limited relationship?",
    "back": "A relationship between tables from different sources or storage modes. It doesn't enforce referential integrity and can drop non-matching rows."
  },
  {
    "id": "dp600-fc-170",
    "type": "scenario",
    "skill": "3.1.7",
    "front": "Which storage mode for dimensions related to a DirectQuery fact table from the same source?",
    "back": "Dual."
  },
  {
    "id": "dp600-fc-171",
    "type": "term",
    "skill": "3.1.7",
    "front": "What are user-defined aggregations?",
    "back": "Pre-aggregated Import tables mapped to a detailed DirectQuery table so most queries are answered from memory."
  },
  {
    "id": "dp600-fc-172",
    "type": "term",
    "skill": "3.2.1",
    "front": "What does Performance Analyzer show?",
    "back": "How long each visual takes, split into DAX query, visual display and other time."
  },
  {
    "id": "dp600-fc-173",
    "type": "term",
    "skill": "3.2.1",
    "front": "What does VertiPaq Analyzer help you find?",
    "back": "Which tables and columns use the most memory and have the highest cardinality, so you can remove or reduce them."
  },
  {
    "id": "dp600-fc-174",
    "type": "term",
    "skill": "3.2.1",
    "front": "Why turn off Auto date/time?",
    "back": "It creates hidden date tables for each date column and bloats the model; use one marked date table instead."
  },
  {
    "id": "dp600-fc-175",
    "type": "term",
    "skill": "3.2.1",
    "front": "What do automatic aggregations do for DirectQuery models?",
    "back": "Power BI learns from query history and builds and maintains in-memory aggregations for common queries."
  },
  {
    "id": "dp600-fc-176",
    "type": "edge",
    "skill": "3.2.1",
    "front": "How do you reduce load from many high-cardinality columns?",
    "back": "Remove unused columns, reduce cardinality (for example split datetime), and use appropriate data types."
  },
  {
    "id": "dp600-fc-177",
    "type": "term",
    "skill": "3.2.2",
    "front": "In DAX Studio Server Timings, what does a high formula engine share indicate?",
    "back": "The time is in single-threaded formula engine work (complex calculations or iterators), so rewrite the DAX rather than the data."
  },
  {
    "id": "dp600-fc-178",
    "type": "term",
    "skill": "3.2.2",
    "front": "How can you cut repeated evaluation in a measure?",
    "back": "Store the value in a VAR and reuse it."
  },
  {
    "id": "dp600-fc-179",
    "type": "edge",
    "skill": "3.2.2",
    "front": "Why prefer a Boolean column filter over FILTER of a whole table in CALCULATE?",
    "back": "A simple column filter can be resolved by the storage engine; iterating a whole table with FILTER pushes work to the slower formula engine."
  },
  {
    "id": "dp600-fc-180",
    "type": "edge",
    "skill": "3.2.2",
    "front": "What makes nested iterators slow?",
    "back": "The rows processed multiply across the levels. Pre-aggregate or restructure to reduce iteration."
  },
  {
    "id": "dp600-fc-181",
    "type": "term",
    "skill": "3.2.3",
    "front": "What does framing (refresh) do in a Direct Lake model?",
    "back": "It updates the model's metadata to point at the latest Delta table version. It doesn't copy data."
  },
  {
    "id": "dp600-fc-182",
    "type": "term",
    "skill": "3.2.3",
    "front": "What are the three Direct Lake behavior settings?",
    "back": "Automatic (default, falls back to DirectQuery where possible), Direct Lake only (queries fail instead of falling back) and DirectQuery only."
  },
  {
    "id": "dp600-fc-183",
    "type": "term",
    "skill": "3.2.3",
    "front": "What can trigger fallback to DirectQuery for Direct Lake on SQL endpoint?",
    "back": "Non-materialized views, unframed tables, SQL-layer security (RLS, OLS, masking), guardrails exceeded, memory pressure or transient errors."
  },
  {
    "id": "dp600-fc-184",
    "type": "edge",
    "skill": "3.2.3",
    "front": "How do you see why a table fell back?",
    "back": "EVALUATE TABLETRAITS() and read the DirectLakeFallbackInfo column."
  },
  {
    "id": "dp600-fc-185",
    "type": "edge",
    "skill": "3.2.3",
    "front": "What do you do when many small Parquet files slow Direct Lake?",
    "back": "Run OPTIMIZE (and VACUUM) on the Delta table to compact files."
  },
  {
    "id": "dp600-fc-186",
    "type": "compare",
    "skill": "3.2.4",
    "front": "Compare Direct Lake on OneLake and Direct Lake on SQL analytics endpoint.",
    "back": "<b>On OneLake:</b> reads Delta from one or more items, supports composite models with Import tables, never falls back to DirectQuery.<br><b>On SQL endpoint:</b> one source, can use SQL views and SQL-layer security, can't mix with DirectQuery or Dual tables, falls back to DirectQuery when it can't read Delta."
  },
  {
    "id": "dp600-fc-187",
    "type": "scenario",
    "skill": "3.2.4",
    "front": "You need Direct Lake plus Import tables in one model. Which flavor?",
    "back": "Direct Lake on OneLake."
  },
  {
    "id": "dp600-fc-188",
    "type": "scenario",
    "skill": "3.2.4",
    "front": "A table is a SQL view and permissions live in the SQL endpoint. Which flavor?",
    "back": "Direct Lake on SQL analytics endpoint, accepting DirectQuery fallback for those queries."
  },
  {
    "id": "dp600-fc-189",
    "type": "edge",
    "skill": "3.2.4",
    "front": "What happens when Direct Lake on OneLake can't read a table directly?",
    "back": "The query or refresh fails; there's no DirectQuery fallback."
  },
  {
    "id": "dp600-fc-190",
    "type": "term",
    "skill": "3.2.5",
    "front": "What does incremental refresh do?",
    "back": "Partitions a table so each refresh reloads only recent data, cutting refresh time, memory and source load."
  },
  {
    "id": "dp600-fc-191",
    "type": "term",
    "skill": "3.2.5",
    "front": "Which parameters does incremental refresh require?",
    "back": "RangeStart and RangeEnd, case-sensitive, Date/Time type, used in a filter on a date column."
  },
  {
    "id": "dp600-fc-192",
    "type": "term",
    "skill": "3.2.5",
    "front": "What is 'Detect data changes'?",
    "back": "A setting that uses an audit column such as LastUpdated to refresh only periods whose data changed. It should be different from the partitioning column."
  },
  {
    "id": "dp600-fc-193",
    "type": "term",
    "skill": "3.2.5",
    "front": "What does 'Get the latest data in real time' add?",
    "back": "A DirectQuery partition for rows newer than the refresh period (a hybrid table); it needs Premium or Fabric capacity."
  },
  {
    "id": "dp600-fc-194",
    "type": "edge",
    "skill": "3.2.5",
    "front": "Does incremental refresh apply to Direct Lake tables?",
    "back": "No. Direct Lake tables have no model partitions; partitioning happens at the Delta table."
  }
];
