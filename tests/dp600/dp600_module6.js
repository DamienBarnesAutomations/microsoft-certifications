// Module 6: Additional exam-skill questions (fill gaps in the skills outline)
(function() {
  var questions = [
    {
      "id": "dp600-6-001",
      "text": "A stakeholder must open reports and read data in a workspace but must not create or edit any items. Which workspace role should you assign?",
      "options": [
        "Viewer",
        "Admin",
        "Contributor",
        "Member"
      ],
      "correct": 0,
      "module": 6,
      "explanation": "Viewer gives read access to the workspace's content without the ability to create or edit items. Contributor, Member and Admin can all create or change items."
    },
    {
      "id": "dp600-6-002",
      "text": "Which workspace role is the only one that can delete a workspace?",
      "options": [
        "Viewer",
        "Admin",
        "Contributor",
        "Member"
      ],
      "correct": 1,
      "module": 6,
      "explanation": "Only the Admin role can delete a workspace or add other Admins. Member, Contributor and Viewer have progressively fewer permissions."
    },
    {
      "id": "dp600-6-003",
      "text": "A user has no workspace role. You need to let them query a lakehouse's tables through its SQL analytics endpoint only. Which item permission should you grant when sharing the lakehouse?",
      "options": [
        "Read all Apache Spark",
        "Read all SQL endpoint data",
        "Build",
        "Reshare"
      ],
      "correct": 1,
      "module": 6,
      "explanation": "Sharing an item grants access to that item without a workspace role. The 'Read all SQL endpoint data' permission lets the user query the data through T-SQL. The Spark permission gives file and table access through Spark, Reshare lets them share the item further, and Build applies to semantic models."
    },
    {
      "id": "dp600-6-004",
      "text": "Which Git providers can you connect to a Fabric workspace for Git integration?",
      "options": [
        "Azure DevOps and the cloud version of GitHub",
        "Bitbucket and GitLab",
        "GitHub Enterprise Server hosted on premises",
        "Azure DevOps Server hosted on premises"
      ],
      "correct": 0,
      "module": 6,
      "explanation": "Fabric Git integration supports Azure DevOps and cloud GitHub. On-premises Git servers, submodules and sovereign clouds aren't supported."
    },
    {
      "id": "dp600-6-005",
      "text": "A Git-connected workspace shows an item with the status 'Update required'. What does this mean?",
      "options": [
        "The connected branch has a newer commit that hasn't been brought into the workspace",
        "The item was changed in the workspace and isn't committed yet",
        "The item type isn't supported by Git integration",
        "The item has been deleted from the repository permanently"
      ],
      "correct": 0,
      "module": 6,
      "explanation": "'Update required' means the branch contains changes not yet in the workspace, so you use Update. Workspace changes not yet in Git show as uncommitted, and unsupported items are flagged separately."
    },
    {
      "id": "dp600-6-006",
      "text": "You select Update in a Git-connected workspace. What does the update bring into the workspace?",
      "options": [
        "Only report items, with models excluded",
        "The entire branch, synced to the latest commit",
        "Only items that changed in the last commit",
        "Only the items you tick in the update dialog"
      ],
      "correct": 1,
      "module": 6,
      "explanation": "Update always syncs the whole branch to the most recent commit; you can't choose individual items. If the same item changed in both places, you must resolve the conflict first."
    },
    {
      "id": "dp600-6-007",
      "text": "A team wants a semantic model's tables, measures and relationships stored as individual text files that produce clean diffs in Git. Which Power BI Desktop save format should they use?",
      "options": [
        "Power BI template (.pbit)",
        "Power BI data source file (.pbids)",
        "Power BI Project (.pbip) with the model in TMDL format",
        "Power BI file (.pbix)"
      ],
      "correct": 2,
      "module": 6,
      "explanation": "A .pbip project saves the report and semantic model as folders of text files, and the model definition uses TMDL. A .pbix is a single binary package, a .pbit is a template, and a .pbids only stores connection details."
    },
    {
      "id": "dp600-6-008",
      "text": "In a Power BI project, which file is the entry point of the report folder, so that opening it lets you edit the report and its semantic model in Desktop?",
      "options": [
        "definition.pbir",
        "model.tmdl",
        "localSettings.json",
        "cache.abf"
      ],
      "correct": 0,
      "module": 6,
      "explanation": "The report folder's definition.pbir is its entry point. The .pbip file is just an optional shortcut to it. model.tmdl belongs to the semantic model, and the other two are per-user files."
    },
    {
      "id": "dp600-6-009",
      "text": "Which files does the .gitignore that Power BI Desktop creates for a project exclude from the repository?",
      "options": [
        "Every .tmdl file in the tables folder",
        "The report folder's page and visual definitions",
        "Per-user files such as .pbi/localSettings.json and .pbi/cache.abf",
        "The definition.pbir and model.tmdl files"
      ],
      "correct": 2,
      "module": 6,
      "explanation": "Desktop excludes only per-user and cache files so they stay out of source control. The report and model definitions are what you want to version."
    },
    {
      "id": "dp600-6-010",
      "text": "You edit a .tmdl file in a text editor while the project is open in Power BI Desktop. What must you do to see the change in Desktop?",
      "options": [
        "Convert the project back to a .pbix file",
        "Republish the project to the workspace first",
        "Close and reopen Power BI Desktop",
        "Nothing, Desktop reloads TMDL files automatically"
      ],
      "correct": 2,
      "module": 6,
      "explanation": "Edits made to TMDL files outside Desktop aren't picked up while it's running; Desktop must be restarted to reload them."
    },
    {
      "id": "dp600-6-011",
      "text": "You want a semantic model to use a different data source in the Production stage than in Development. Where do you configure the deployment rule?",
      "options": [
        "In the Git repository connected to the workspace",
        "In the workspace settings of the Production workspace",
        "In the Production stage, under that semantic model",
        "In the Development stage, under that semantic model"
      ],
      "correct": 2,
      "module": 6,
      "explanation": "Deployment rules are defined in the target stage, under the item they apply to. The Development item isn't changed by the rule."
    },
    {
      "id": "dp600-6-012",
      "text": "A semantic model's data source is defined through Power Query parameters. Which kind of deployment rule can you use to change its source per stage?",
      "options": [
        "A parameter rule",
        "A default lakehouse rule",
        "A sensitivity label rule",
        "A data source rule"
      ],
      "correct": 0,
      "module": 6,
      "explanation": "You can't create a data source rule for a model whose source uses parameters; create a parameter rule instead. Semantic models don't support default lakehouse rules."
    },
    {
      "id": "dp600-6-013",
      "text": "You create a deployment rule in the Test stage. When does the rule take effect?",
      "options": [
        "Only after the pipeline's Production stage is deployed",
        "After you deploy the semantic model from the previous stage to Test",
        "As soon as you save the rule",
        "At the next scheduled refresh of the model"
      ],
      "correct": 1,
      "module": 6,
      "explanation": "Rules don't apply until you deploy the item from the source stage to the stage that holds the rule."
    },
    {
      "id": "dp600-6-014",
      "text": "Before changing a column in a lakehouse table you want to see which semantic models and reports downstream would be affected. Which feature should you use?",
      "options": [
        "Impact analysis",
        "Endorsement",
        "The Monitoring hub",
        "Deployment rules"
      ],
      "correct": 0,
      "module": 6,
      "explanation": "Impact analysis, opened from lineage view, lists the workspaces and items that depend on the selected item so you can notify owners before a change."
    },
    {
      "id": "dp600-6-015",
      "text": "You run impact analysis on a data source. Which scope of downstream items is available for it?",
      "options": [
        "Only items in other tenants",
        "All downstream items across every workspace",
        "Only reports, never models",
        "Only its direct child items"
      ],
      "correct": 3,
      "module": 6,
      "explanation": "A data source shows child items one step downstream. To go further you run impact analysis on those child items."
    },
    {
      "id": "dp600-6-016",
      "text": "Impact analysis for a lakehouse doesn't list a semantic model that you know depends on it. What is a likely reason?",
      "options": [
        "Semantic models are never tracked in lineage",
        "The model was created in Power BI Desktop",
        "The semantic model is in Import mode",
        "You don't have permission to see that item"
      ],
      "correct": 3,
      "module": 6,
      "explanation": "Lineage and impact analysis only show items the viewer has permission to see, so a dependent item can be hidden from you."
    },
    {
      "id": "dp600-6-017",
      "text": "What is the default setting of the XMLA endpoint on a Fabric capacity?",
      "options": [
        "Read-only",
        "Write-only",
        "Off",
        "Read-write"
      ],
      "correct": 0,
      "module": 6,
      "explanation": "The XMLA endpoint starts as read-only, which allows queries. A capacity admin must enable read-write before tools can change models."
    },
    {
      "id": "dp600-6-018",
      "text": "You deploy a semantic model from Tabular Editor to a Fabric workspace and receive an error that write operations aren't allowed. What should you check first?",
      "options": [
        "That the report uses a live connection",
        "That the workspace has Git integration enabled",
        "That the capacity's XMLA endpoint is set to read-write",
        "That the model is set to Direct Lake mode"
      ],
      "correct": 2,
      "module": 6,
      "explanation": "Writing to a model through the XMLA endpoint needs the capacity's semantic model workload set to read-write, which only a capacity admin can change."
    },
    {
      "id": "dp600-6-019",
      "text": "Which Power BI file type contains the report layout, model schema and queries but no data, and prompts for parameter values when opened?",
      "options": [
        "Power BI file (.pbix)",
        "Power BI data source file (.pbids)",
        "Power BI project (.pbip)",
        "Power BI template (.pbit)"
      ],
      "correct": 3,
      "module": 6,
      "explanation": "A .pbit template stores everything except the data. A .pbix includes data, a .pbids stores only connection details, and a .pbip is a folder-based project."
    },
    {
      "id": "dp600-6-020",
      "text": "Which file preserves only the connection details for a data source, so that opening it launches Power BI Desktop with the source preconfigured?",
      "options": [
        "Power BI template (.pbit)",
        "Power BI file (.pbix)",
        "Power BI project (.pbip)",
        "Power BI data source file (.pbids)"
      ],
      "correct": 3,
      "module": 6,
      "explanation": "A .pbids file holds just the connection information. The user still authenticates and picks tables."
    },
    {
      "id": "dp600-6-021",
      "text": "Several report authors need to build reports on one governed semantic model without copying it. What should they do?",
      "options": [
        "Connect to the shared semantic model and build thin reports on it",
        "Export the model to a .pbix and import it into each report",
        "Save the model as a .pbit for each author",
        "Recreate the model's tables in each report"
      ],
      "correct": 0,
      "module": 6,
      "explanation": "A shared semantic model is reused by creating reports that connect to it, so the logic and measures stay in one place."
    },
    {
      "id": "dp600-6-022",
      "text": "A colleague opens a .pbit you shared. What do they need to do to see data?",
      "options": [
        "Nothing, the data is stored in the template",
        "Convert it to a .pbip first",
        "Ask for a .pbids and discard the template",
        "Supply the parameter values and credentials, then refresh"
      ],
      "correct": 3,
      "module": 6,
      "explanation": "A template contains no data. On opening it prompts for parameters, and the data loads when the user authenticates and refreshes."
    },
    {
      "id": "dp600-6-023",
      "text": "A Dataflow Gen2 must read from an on-premises SQL Server. What do you need to create the connection?",
      "options": [
        "A workspace identity",
        "A OneLake shortcut",
        "A virtual network data gateway",
        "An on-premises data gateway installed in the network"
      ],
      "correct": 3,
      "module": 6,
      "explanation": "On-premises sources are reached through an on-premises data gateway, which makes outbound connections only. A VNet gateway is for Azure services in a virtual network."
    },
    {
      "id": "dp600-6-024",
      "text": "A pipeline must read from an Azure data service that is only reachable inside an Azure virtual network. Which option fits?",
      "options": [
        "An on-premises data gateway on a laptop",
        "A virtual network data gateway connection",
        "A cloud connection with Basic authentication",
        "A shortcut to the Azure service"
      ],
      "correct": 1,
      "module": 6,
      "explanation": "A VNet data gateway is a managed service, provisioned in Azure and bound to a Fabric capacity, that reaches Azure services behind a virtual network."
    },
    {
      "id": "dp600-6-025",
      "text": "Which authentication kind is supported only when the connection runs through an on-premises data gateway?",
      "options": [
        "Windows authentication",
        "Organizational account (OAuth 2.0)",
        "Workspace identity",
        "Service principal"
      ],
      "correct": 0,
      "module": 6,
      "explanation": "Windows credentials are supported only for on-premises gateway connections. The other kinds work with cloud connections."
    },
    {
      "id": "dp600-6-026",
      "text": "What is a workspace identity?",
      "options": [
        "A sensitivity label applied to the workspace",
        "A managed service principal tied to a workspace that authenticates to sources without a stored secret",
        "A Microsoft Entra security group of workspace admins",
        "A user account that is shared by all workspace members"
      ],
      "correct": 1,
      "module": 6,
      "explanation": "A workspace identity is an automatically managed service principal. Items can use it to connect to sources such as firewall-protected ADLS Gen2 accounts without storing credentials."
    },
    {
      "id": "dp600-6-027",
      "text": "A user wants to browse and filter items they can access across workspaces by domain, item type and endorsement. Which experience should they use?",
      "options": [
        "Deployment pipelines",
        "Monitoring hub",
        "Capacity Metrics app",
        "OneLake catalog"
      ],
      "correct": 3,
      "module": 6,
      "explanation": "The OneLake catalog is the place to discover items across the tenant and filter them by domain, type and endorsement."
    },
    {
      "id": "dp600-6-028",
      "text": "Where in Fabric do you browse and subscribe to streaming data sources such as Azure events and Fabric events?",
      "options": [
        "Deployment pipelines",
        "OneLake catalog",
        "Real-Time hub",
        "Workspace settings"
      ],
      "correct": 2,
      "module": 6,
      "explanation": "Real-Time hub is the catalog for streams, tables and events across the organization, and where you connect new streaming sources."
    },
    {
      "id": "dp600-6-029",
      "text": "You find a lakehouse table in the OneLake catalog that belongs to another workspace. You want to use it in your own lakehouse without copying the data. What should you create?",
      "options": [
        "A shortcut to the table",
        "A pipeline Copy activity",
        "A Git branch",
        "A deployment pipeline"
      ],
      "correct": 0,
      "module": 6,
      "explanation": "A shortcut references data in place, so your lakehouse can query it without duplicating storage."
    },
    {
      "id": "dp600-6-030",
      "text": "What does turning on OneLake availability for a KQL database do?",
      "options": [
        "It disables KQL queries on the database",
        "It keeps a Delta Lake copy of the data in OneLake so other Fabric engines can read it",
        "It moves the data out of the eventhouse permanently",
        "It converts the KQL tables into a lakehouse"
      ],
      "correct": 1,
      "module": 6,
      "explanation": "OneLake availability exposes eventhouse data as Delta tables in OneLake, readable by Spark, SQL, Direct Lake and others, while KQL still works."
    },
    {
      "id": "dp600-6-031",
      "text": "Which setting in the mirroring policy of an eventhouse with OneLake availability controls how quickly data appears in OneLake?",
      "options": [
        "IngestionBatchSize",
        "CachingPolicy",
        "RetentionPeriodInDays",
        "TargetLatencyInMinutes"
      ],
      "correct": 3,
      "module": 6,
      "explanation": "The mirroring policy's TargetLatencyInMinutes sets the latency. Very short values can create many small files and hurt performance."
    },
    {
      "id": "dp600-6-032",
      "text": "You enable OneLake integration for a semantic model. Which data is written to OneLake as Delta tables?",
      "options": [
        "Direct Lake tables only",
        "Calculation group tables",
        "DirectQuery tables and measures",
        "Import-mode tables only"
      ],
      "correct": 3,
      "module": 6,
      "explanation": "OneLake integration exports Import tables. Direct Lake and DirectQuery tables, measures and calculation groups can't be exported."
    },
    {
      "id": "dp600-6-033",
      "text": "A warehouse needs a derived margin column (revenue minus cost) that many reports reuse. Where is the simplest place to add it?",
      "options": [
        "In a Git branch of the warehouse",
        "In a view that selects the base columns and calculates margin",
        "In every report as a separate measure",
        "In a notebook that rewrites the source files"
      ],
      "correct": 1,
      "module": 6,
      "explanation": "A view adds computed columns to existing tables without changing stored data, and everything that queries the view gets the same definition."
    },
    {
      "id": "dp600-6-034",
      "text": "A snowflake schema splits Product, Subcategory and Category into three tables. Report queries are slow because of the joins. What should you do?",
      "options": [
        "Replace the keys with free-text names",
        "Add a fourth table that links all three",
        "Move the category columns into the fact table",
        "Flatten them into a single Product dimension that carries the category columns"
      ],
      "correct": 3,
      "module": 6,
      "explanation": "Denormalizing a snowflake dimension into one wide table gives a star schema with fewer joins. Descriptive attributes belong in dimensions, not facts."
    },
    {
      "id": "dp600-6-035",
      "text": "What is the main trade-off of denormalizing a dimension table?",
      "options": [
        "Repeated values use more storage and are harder to update",
        "Primary keys are no longer allowed",
        "Relationships can no longer be created",
        "Queries need more joins"
      ],
      "correct": 0,
      "module": 6,
      "explanation": "A denormalized table repeats descriptive values on many rows, which costs storage and makes changes more work, in exchange for simpler, faster queries."
    },
    {
      "id": "dp600-6-036",
      "text": "In a Fabric warehouse, how can you build a flattened dimension from several normalized tables?",
      "options": [
        "Join the tables in a CREATE TABLE AS SELECT (CTAS) statement",
        "Use a shortcut to merge the tables",
        "Enable V-Order on the warehouse",
        "Run OPTIMIZE on the source tables"
      ],
      "correct": 0,
      "module": 6,
      "explanation": "CTAS writes the result of a join as a new table. In Spark you would join DataFrames and write a Delta table."
    },
    {
      "id": "dp600-6-037",
      "text": "Where should descriptive attributes such as product category be stored in a star schema?",
      "options": [
        "In a separate table per attribute",
        "In the dimension tables",
        "In the semantic model's relationships",
        "In the fact table"
      ],
      "correct": 1,
      "module": 6,
      "explanation": "Facts stay narrow (keys and measures). Descriptive attributes live in dimension tables."
    },
    {
      "id": "dp600-6-038",
      "text": "A T-SQL query groups sales by customer and must return only customers whose total sales exceed 10,000. Which clause filters on the aggregated value?",
      "options": [
        "OVER",
        "HAVING",
        "WHERE",
        "ORDER BY"
      ],
      "correct": 1,
      "module": 6,
      "explanation": "WHERE filters rows before grouping. HAVING filters groups after aggregation."
    },
    {
      "id": "dp600-6-039",
      "text": "In a PySpark notebook you need total sales per customer. Which approach is correct?",
      "options": [
        "df.filter('CustomerId').sum('Sales')",
        "df.groupBy('CustomerId').agg(sum('Sales'))",
        "df.select('CustomerId').distinct().sum()",
        "df.orderBy('CustomerId').count('Sales')"
      ],
      "correct": 1,
      "module": 6,
      "explanation": "groupBy followed by agg computes aggregates per group. The other calls don't group the data."
    },
    {
      "id": "dp600-6-040",
      "text": "In a T-SQL query you must show 0 wherever a Discount column is NULL. Which function should you use?",
      "options": [
        "COALESCE(Discount, 0)",
        "DISTINCT Discount",
        "CAST(Discount AS INT)",
        "NULLIF(Discount, 0)"
      ],
      "correct": 0,
      "module": 6,
      "explanation": "COALESCE (or ISNULL) returns the first non-null value. NULLIF does the opposite: it returns NULL when two values are equal."
    },
    {
      "id": "dp600-6-041",
      "text": "In Dataflow Gen2 you need to remove rows that are exact duplicates across all columns. Which transformation should you use?",
      "options": [
        "Fill down",
        "Keep top rows",
        "Remove blank rows",
        "Remove duplicates on all columns"
      ],
      "correct": 3,
      "module": 6,
      "explanation": "Remove duplicates keeps one copy of each row based on the selected columns. Remove blank rows only drops empty rows."
    },
    {
      "id": "dp600-6-042",
      "text": "A Spark notebook must keep one row per OrderId and drop the other duplicates. Which call should you use?",
      "options": [
        "df.dropna('OrderId')",
        "df.fillna('OrderId')",
        "df.dropDuplicates(['OrderId'])",
        "df.distinct('OrderId')"
      ],
      "correct": 2,
      "module": 6,
      "explanation": "dropDuplicates on a column subset keeps one row per key. fillna and dropna handle nulls, not duplicates."
    },
    {
      "id": "dp600-6-043",
      "text": "A staging column holds dates as text. You need a T-SQL conversion that returns NULL, not an error, for values that can't be converted. Which function should you use?",
      "options": [
        "TRY_CAST",
        "CONVERT with style 112 only",
        "FORMAT",
        "CAST"
      ],
      "correct": 0,
      "module": 6,
      "explanation": "TRY_CAST (and TRY_CONVERT) return NULL when the conversion fails. CAST and CONVERT raise an error."
    },
    {
      "id": "dp600-6-044",
      "text": "Which Power Query M function changes the data types of columns in a table?",
      "options": [
        "Table.TransformColumnTypes",
        "Table.ReplaceValue",
        "Table.PromoteHeaders",
        "Table.Distinct"
      ],
      "correct": 0,
      "module": 6,
      "explanation": "Table.TransformColumnTypes applies a type to named columns. It's what the Changed Type step uses."
    },
    {
      "id": "dp600-6-045",
      "text": "In PySpark you must change a string column OrderDate to a date type. Which call is correct?",
      "options": [
        "df.withColumn('OrderDate', col('OrderDate').cast('date'))",
        "df.select('OrderDate').toDate()",
        "df.cast('OrderDate', 'date')",
        "df.alias('OrderDate').date()"
      ],
      "correct": 0,
      "module": 6,
      "explanation": "withColumn with cast replaces the column with a converted version."
    },
    {
      "id": "dp600-6-046",
      "text": "Which Visual query editor operation joins two tables?",
      "options": [
        "Append queries",
        "Merge queries",
        "Choose columns",
        "Group by"
      ],
      "correct": 1,
      "module": 6,
      "explanation": "Merge queries is the join. Append queries stacks rows like a union."
    },
    {
      "id": "dp600-6-047",
      "text": "Where is the Visual query editor available?",
      "options": [
        "Only in a notebook",
        "In a warehouse and in a lakehouse's SQL analytics endpoint",
        "Only in a KQL database",
        "Only in a semantic model"
      ],
      "correct": 1,
      "module": 6,
      "explanation": "You can build no-code queries in both a warehouse and a lakehouse SQL analytics endpoint."
    },
    {
      "id": "dp600-6-048",
      "text": "A colleague asks what the Visual query editor can't do that the SQL query editor can. Which answer is correct?",
      "options": [
        "It can't filter or group rows",
        "It can't be saved as a view",
        "It only reads data, so it can't run write operations such as INSERT or UPDATE",
        "It can't join tables"
      ],
      "correct": 2,
      "module": 6,
      "explanation": "The Visual query editor generates SELECT queries only. Writing data needs T-SQL such as stored procedures. You can still filter, group, join and save the result as a view."
    },
    {
      "id": "dp600-6-049",
      "text": "How can you see the T-SQL that a Visual query editor query generates?",
      "options": [
        "Use View SQL",
        "Export the query to a .pbix",
        "Enable Git integration",
        "Open the Monitoring hub"
      ],
      "correct": 0,
      "module": 6,
      "explanation": "View SQL shows the generated T-SQL, which you can also use as a starting point for a view."
    },
    {
      "id": "dp600-6-050",
      "text": "What is the only required keyword in a DAX query?",
      "options": [
        "RETURN",
        "DEFINE",
        "EVALUATE",
        "ORDER BY"
      ],
      "correct": 2,
      "module": 6,
      "explanation": "A DAX query must have EVALUATE with a table expression. DEFINE and ORDER BY are optional."
    },
    {
      "id": "dp600-6-051",
      "text": "You want to test a new measure in a DAX query without changing the semantic model. What should you use?",
      "options": [
        "A new calculated column",
        "A deployment rule",
        "A measure in a DEFINE block",
        "A calculation group"
      ],
      "correct": 2,
      "module": 6,
      "explanation": "DEFINE MEASURE creates a query-scoped measure that overrides a model measure of the same name for that query only."
    },
    {
      "id": "dp600-6-052",
      "text": "A DAX query must return the top 10 products by sales, sorted by sales. Which approach is correct?",
      "options": [
        "SELECTCOLUMNS(...) alone",
        "TOPN(10, ...) combined with ORDER BY",
        "FILTER(...) alone",
        "SUMMARIZE(...) alone"
      ],
      "correct": 1,
      "module": 6,
      "explanation": "TOPN selects the rows, but its output isn't guaranteed sorted, so you add ORDER BY. Sort order in the model isn't used by DAX queries."
    },
    {
      "id": "dp600-6-053",
      "text": "Which function is the standard way to return a table grouped by columns with named aggregations and filters from the model?",
      "options": [
        "UNION",
        "SUMMARIZECOLUMNS",
        "ADDCOLUMNS",
        "SELECTCOLUMNS"
      ],
      "correct": 1,
      "module": 6,
      "explanation": "SUMMARIZECOLUMNS takes group-by columns, optional filters and name/expression pairs. ADDCOLUMNS appends columns to an existing table."
    },
    {
      "id": "dp600-6-054",
      "text": "Which storage mode lets a table act as Import or DirectQuery depending on the query, which helps avoid limited relationships with a DirectQuery fact table?",
      "options": [
        "Import only",
        "Direct Lake",
        "DirectQuery only",
        "Dual"
      ],
      "correct": 3,
      "module": 6,
      "explanation": "A Dual table can be served from cache or from the source depending on the query. It's the usual choice for dimension tables related to a DirectQuery fact table."
    },
    {
      "id": "dp600-6-055",
      "text": "Your data fits in memory and you want the best design flexibility and query performance. Which storage mode does Microsoft recommend where possible?",
      "options": [
        "DirectQuery",
        "Live connection",
        "Import",
        "Dual for every table"
      ],
      "correct": 2,
      "module": 6,
      "explanation": "Import provides the most modelling flexibility and the best performance when the data can be loaded and refreshed on a schedule."
    },
    {
      "id": "dp600-6-056",
      "text": "Your data is in Delta tables in a Fabric lakehouse and you want near-Import speed without copying the data into the model on a refresh schedule. Which mode fits?",
      "options": [
        "DirectQuery",
        "Direct Lake",
        "Composite with Dual tables",
        "Import"
      ],
      "correct": 1,
      "module": 6,
      "explanation": "Direct Lake reads Delta files from OneLake into memory, combining Import-like speed with fresher data and no full data copy."
    },
    {
      "id": "dp600-6-057",
      "text": "Which statement about DirectQuery mode is correct?",
      "options": [
        "It supports every Power Query transformation without limits",
        "It is the fastest option for every workload",
        "Each visual sends queries to the source, so performance depends on the source system",
        "All data is copied into the model during refresh"
      ],
      "correct": 2,
      "module": 6,
      "explanation": "DirectQuery doesn't import data; queries run against the source, so source performance and query folding matter."
    },
    {
      "id": "dp600-6-058",
      "text": "In a star-schema semantic model, how should a dimension table relate to a fact table?",
      "options": [
        "One-to-one from the fact to the dimension",
        "Many-to-one from the dimension to the fact in both directions",
        "Many-to-many with both-direction filtering",
        "One-to-many from the dimension to the fact, filtering in a single direction"
      ],
      "correct": 3,
      "module": 6,
      "explanation": "The standard star relationship is one-to-many, dimension to fact, with a single cross-filter direction. It's predictable and efficient."
    },
    {
      "id": "dp600-6-059",
      "text": "Which is a benefit of a star schema in a semantic model?",
      "options": [
        "Simpler DAX and fewer, more predictable relationships",
        "Every table can be related to every other table",
        "No need for relationships at all",
        "Larger model size by design"
      ],
      "correct": 0,
      "module": 6,
      "explanation": "A star schema keeps relationships simple, which makes filtering and DAX easier to reason about and typically compresses well."
    },
    {
      "id": "dp600-6-060",
      "text": "Which fact-table columns should you normally hide from report view in a star schema?",
      "options": [
        "The measures themselves",
        "The date column of the date table",
        "The numeric columns used in measures",
        "The foreign key columns used only for relationships"
      ],
      "correct": 3,
      "module": 6,
      "explanation": "Foreign keys exist to relate tables; users should filter by dimension attributes instead, so the keys are hidden."
    },
    {
      "id": "dp600-6-061",
      "text": "To keep a model small, where should a calculated attribute such as Category usually be created?",
      "options": [
        "In the report layer only",
        "In an implicit measure",
        "At the source or in Power Query, not as a DAX calculated column",
        "In a calculated column on the fact table"
      ],
      "correct": 2,
      "module": 6,
      "explanation": "Columns created upstream are stored in the source or loaded efficiently. Calculated columns are computed at refresh and add to model size."
    },
    {
      "id": "dp600-6-062",
      "text": "Which feature requires the large semantic model storage format to be enabled on an Import model?",
      "options": [
        "Field parameters",
        "Row-level security",
        "Query scale-out",
        "Calculation groups"
      ],
      "correct": 2,
      "module": 6,
      "explanation": "Query scale-out requires the large semantic model storage format. RLS, calculation groups and field parameters work without it."
    },
    {
      "id": "dp600-6-063",
      "text": "What does enabling the large semantic model storage format allow?",
      "options": [
        "The model can hold more than one fact table only",
        "The model can use Direct Lake without a lakehouse",
        "The model no longer needs a refresh schedule",
        "The model can grow beyond the service default size, up to the capacity's size limit"
      ],
      "correct": 3,
      "module": 6,
      "explanation": "The default model size limit in the service is small; the large format lets the model grow up to the limit allowed by the capacity."
    },
    {
      "id": "dp600-6-064",
      "text": "Do you need to enable the large semantic model storage format manually for a Direct Lake model?",
      "options": [
        "No, because Direct Lake doesn't support it",
        "Yes, but only for models over 1 TB",
        "Yes, or the model can't be queried",
        "No, Direct Lake models use it automatically"
      ],
      "correct": 3,
      "module": 6,
      "explanation": "Direct Lake models automatically use the large storage format."
    },
    {
      "id": "dp600-6-065",
      "text": "What makes a semantic model a composite model?",
      "options": [
        "It uses row-level security",
        "It contains more than one fact table",
        "It uses more than one storage mode or more than one data source",
        "It has calculation groups"
      ],
      "correct": 2,
      "module": 6,
      "explanation": "A composite model combines storage modes (for example Import and DirectQuery tables) or sources in one model."
    },
    {
      "id": "dp600-6-066",
      "text": "A report relates an Import table to a DirectQuery table from a different source. Some expected rows are missing in visuals. What is the likely cause?",
      "options": [
        "A limited relationship, which drops rows that don't match",
        "The Import table is set to Dual",
        "The date table isn't marked",
        "Row-level security hides the rows"
      ],
      "correct": 0,
      "module": 6,
      "explanation": "Relationships between tables from different sources or modes are limited relationships. They don't enforce referential integrity and can drop non-matching rows."
    },
    {
      "id": "dp600-6-067",
      "text": "In a composite model with a DirectQuery fact table from the same source, which storage mode is usually best for the dimension tables?",
      "options": [
        "Direct Lake",
        "Import with no relationships",
        "DirectQuery",
        "Dual"
      ],
      "correct": 3,
      "module": 6,
      "explanation": "Dual dimension tables can be answered from cache or pushed to the source, so slicers on them join with the DirectQuery fact table efficiently."
    },
    {
      "id": "dp600-6-068",
      "text": "A measure uses FILTER over an entire large fact table to test a single column. Which change typically improves performance?",
      "options": [
        "Convert the measure to a calculated column",
        "Add ALL to the whole fact table",
        "Wrap the FILTER in another FILTER",
        "Use a Boolean column filter directly in CALCULATE"
      ],
      "correct": 3,
      "module": 6,
      "explanation": "A simple column filter in CALCULATE can be resolved by the storage engine, while iterating a whole table with FILTER pushes work to the slower formula engine."
    },
    {
      "id": "dp600-6-069",
      "text": "A measure has nested iterators over two large tables and is very slow. What is the best fix?",
      "options": [
        "Convert every measure to a calculated column",
        "Reduce the iteration, for example by pre-aggregating or using a single aggregation",
        "Add more nested iterators to split the work",
        "Switch the visual to a table"
      ],
      "correct": 1,
      "module": 6,
      "explanation": "Nested iterators multiply the rows processed. Pre-aggregate or restructure so the engine scans fewer rows."
    },
    {
      "id": "dp600-6-070",
      "text": "You need a Direct Lake model that mixes Direct Lake tables with Import tables in a composite model. Which flavor should you use?",
      "options": [
        "DirectQuery only",
        "Live connection",
        "Direct Lake on OneLake",
        "Direct Lake on SQL analytics endpoint"
      ],
      "correct": 2,
      "module": 6,
      "explanation": "Direct Lake on OneLake supports composite models with Import tables. The SQL endpoint flavor can't mix Direct Lake with DirectQuery or Dual tables."
    },
    {
      "id": "dp600-6-071",
      "text": "A required table is a SQL view, and permissions are enforced in the SQL analytics endpoint. Which flavor fits, and what is the trade-off?",
      "options": [
        "Direct Lake on OneLake, which converts the view to Import",
        "Direct Lake on SQL analytics endpoint, accepting DirectQuery fallback for those queries",
        "Import mode only, because views can't be used",
        "Direct Lake on OneLake, with no trade-off"
      ],
      "correct": 1,
      "module": 6,
      "explanation": "Only the SQL endpoint flavor can use views and SQL-layer security, but queries that can't read Delta directly fall back to DirectQuery."
    },
    {
      "id": "dp600-6-072",
      "text": "Which parameters must you create to configure incremental refresh?",
      "options": [
        "StartDate and EndDate, both text",
        "FromDate and ToDate, both Date",
        "RangeStart and RangeEnd, both Date/Time",
        "RefreshStart and RefreshEnd, both Date/Time"
      ],
      "correct": 2,
      "module": 6,
      "explanation": "The parameters must be named RangeStart and RangeEnd (case-sensitive) and be Date/Time type. The service overrides their values per partition."
    },
    {
      "id": "dp600-6-073",
      "text": "The 'Detect data changes' option for incremental refresh uses a date/time column. Which column is appropriate?",
      "options": [
        "The primary key column",
        "Any text column",
        "An audit column such as LastUpdated that is different from the partitioning column",
        "The same column that RangeStart and RangeEnd filter"
      ],
      "correct": 2,
      "module": 6,
      "explanation": "Detect data changes uses a column that records when rows change, so only changed periods are refreshed. It shouldn't be the partitioning column."
    }
  ];

  if (typeof window.__dp600 === 'undefined') {
    window.__dp600 = { modules: [], questions: [] };
  }

  window.__dp600.questions = window.__dp600.questions.concat(questions);

  if (window.__dp600.modules.length < 6) {
    window.__dp600.modules[5] = "Module 6: Additional Exam-Skill Questions";
  }
})();
