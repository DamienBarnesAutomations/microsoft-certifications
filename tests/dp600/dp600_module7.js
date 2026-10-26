// Module 7: More exam-skill questions (depth round on the skills outline)
(function() {
  var questions = [
    {
      "id": "dp600-7-001",
      "text": "Which workspace roles can create and edit items in a workspace?",
      "options": [
        "Admin, Member and Contributor",
        "Every role, including Viewer",
        "Member, Contributor and Viewer",
        "Admin and Member only"
      ],
      "correct": 0,
      "module": 7,
      "explanation": "Admin, Member and Contributor can create and edit items. Viewer is read-only."
    },
    {
      "id": "dp600-7-002",
      "text": "A user is assigned the Viewer role in a workspace. Which action can they perform?",
      "options": [
        "Create a new lakehouse",
        "Add other users to the workspace",
        "Edit a notebook",
        "Open reports and read the workspace's content"
      ],
      "correct": 3,
      "module": 7,
      "explanation": "Viewers have read access only. Creating or editing items needs Contributor or higher, and adding users needs Member or Admin."
    },
    {
      "id": "dp600-7-003",
      "text": "Fifty analysts need identical access to a workspace. What is the recommended way to grant it?",
      "options": [
        "Assign a workspace role to a Microsoft Entra security group",
        "Assign the role to each analyst individually",
        "Share each item with each analyst",
        "Make all analysts workspace Admins"
      ],
      "correct": 0,
      "module": 7,
      "explanation": "Assigning a role to a security group is simpler to manage and audit than individual assignments, and membership changes flow automatically."
    },
    {
      "id": "dp600-7-004",
      "text": "Where in a workspace do you add a user and choose their role?",
      "options": [
        "Manage access",
        "The deployment pipeline stage",
        "Workspace settings > Git integration",
        "The OneLake catalog"
      ],
      "correct": 0,
      "module": 7,
      "explanation": "Manage access lists the users and groups with access and lets you add people and set their workspace role."
    },
    {
      "id": "dp600-7-005",
      "text": "When sharing a warehouse, what does the option to allow recipients to share the item further control?",
      "options": [
        "Whether recipients can delete the item",
        "Whether recipients can change the item's owner",
        "Whether recipients become workspace Admins",
        "Whether recipients can reshare the item with others"
      ],
      "correct": 3,
      "module": 7,
      "explanation": "The reshare option lets recipients pass on the access they were given. It doesn't change workspace roles or ownership."
    },
    {
      "id": "dp600-7-006",
      "text": "A user was given only the Read permission on a lakehouse through sharing. What can they do?",
      "options": [
        "Read every table through Spark and SQL",
        "Edit the lakehouse tables",
        "Connect to the item but not read table data without an additional data permission",
        "Share the lakehouse with others"
      ],
      "correct": 2,
      "module": 7,
      "explanation": "Read lets a user find and connect to the item. Reading data needs a further permission such as Read all SQL endpoint data or Read all Apache Spark."
    },
    {
      "id": "dp600-7-007",
      "text": "Which semantic model permission lets a user build new reports on top of the model?",
      "options": [
        "Build",
        "Reshare",
        "Write",
        "Read"
      ],
      "correct": 0,
      "module": 7,
      "explanation": "Build lets a user create new content on a semantic model, such as new reports or Excel connections. Read only lets them view existing content."
    },
    {
      "id": "dp600-7-008",
      "text": "You share a semantic model with a colleague and grant only Read. What can they do?",
      "options": [
        "Change row-level security roles",
        "View reports built on the model but not create new content from it",
        "Create reports and edit measures",
        "Download the model as a .pbix file"
      ],
      "correct": 1,
      "module": 7,
      "explanation": "Read allows consumption of existing reports. Creating new content needs Build."
    },
    {
      "id": "dp600-7-009",
      "text": "Which Microsoft service provides the sensitivity labels used on Fabric items?",
      "options": [
        "Microsoft Entra Conditional Access",
        "Microsoft Defender for Cloud",
        "Azure Policy",
        "Microsoft Purview Information Protection"
      ],
      "correct": 3,
      "module": 7,
      "explanation": "Sensitivity labels come from Microsoft Purview Information Protection and are applied to Fabric items to classify and optionally protect them."
    },
    {
      "id": "dp600-7-010",
      "text": "A user can't see a particular sensitivity label to apply to a Fabric item. What is the most likely cause?",
      "options": [
        "The user isn't included in the label policy that publishes that label",
        "The label was applied to a semantic model first",
        "The item is in a Viewer-only workspace",
        "The capacity is paused"
      ],
      "correct": 0,
      "module": 7,
      "explanation": "Users only see labels that are published to them through a label policy. Scope the policy to include the user or group."
    },
    {
      "id": "dp600-7-011",
      "text": "Which tenant setting must be enabled before users can apply sensitivity labels to Fabric content?",
      "options": [
        "Allow users to apply sensitivity labels for content",
        "Allow XMLA endpoints",
        "Certification",
        "Export to Excel"
      ],
      "correct": 0,
      "module": 7,
      "explanation": "The Information protection tenant setting 'Allow users to apply sensitivity labels for content' switches label support on for Fabric and Power BI."
    },
    {
      "id": "dp600-7-012",
      "text": "Does applying a sensitivity label to an item by itself restrict who can open it?",
      "options": [
        "Yes, always, for everyone outside the workspace",
        "Only when the item is in a deployment pipeline",
        "Only if the label includes protection settings such as encryption",
        "No, labels never affect access in any way"
      ],
      "correct": 2,
      "module": 7,
      "explanation": "A label is a classification. Access is enforced only when the label has protection (IRM encryption) settings configured in Purview."
    },
    {
      "id": "dp600-7-013",
      "text": "Which users can promote an item?",
      "options": [
        "Only users with the Viewer role",
        "Item owners and users with write permission on the item",
        "Only users in a deployment pipeline",
        "Only Fabric administrators"
      ],
      "correct": 1,
      "module": 7,
      "explanation": "Promotion is available to the item's owner and to users who have write permission on it. Certification is the restricted level."
    },
    {
      "id": "dp600-7-014",
      "text": "What additional step distinguishes Certified from Promoted?",
      "options": [
        "The item must be stored in a lakehouse",
        "A reviewer authorized by the tenant admin must certify the item",
        "The item must be in Import mode",
        "The item must have Build permission granted to everyone"
      ],
      "correct": 1,
      "module": 7,
      "explanation": "Certification is limited to reviewers specified in the tenant's certification settings, so it signals an organizational quality check."
    },
    {
      "id": "dp600-7-015",
      "text": "Does endorsing an item restrict who can access it?",
      "options": [
        "Only for Certified items",
        "Yes, only the endorsing user can open it",
        "Yes, only workspace Admins can open it",
        "No, endorsement is a trust signal and doesn't change permissions"
      ],
      "correct": 3,
      "module": 7,
      "explanation": "Endorsement helps users find reliable content but doesn't change security. Use roles, sharing and sensitivity labels for access control."
    },
    {
      "id": "dp600-7-016",
      "text": "How can users find endorsed content in the OneLake catalog?",
      "options": [
        "Open Capacity Metrics",
        "Open the Monitoring hub",
        "Filter by endorsement and look for the endorsement badge",
        "Run impact analysis"
      ],
      "correct": 2,
      "module": 7,
      "explanation": "The OneLake catalog shows endorsement badges and can be filtered by endorsement."
    },
    {
      "id": "dp600-7-017",
      "text": "Which workspace role is needed to connect a workspace to a Git repository?",
      "options": [
        "Contributor with no Git role",
        "Admin",
        "Viewer",
        "Any user with Build permission"
      ],
      "correct": 1,
      "module": 7,
      "explanation": "Connecting and disconnecting a workspace to Git is an Admin task. Contributors and Members can commit and update depending on their Git role."
    },
    {
      "id": "dp600-7-018",
      "text": "What does Commit do in a Git-connected workspace?",
      "options": [
        "It saves selected workspace changes to the connected branch",
        "It brings the latest branch changes into the workspace",
        "It deploys the items to the next pipeline stage",
        "It deletes the workspace's unsynced items"
      ],
      "correct": 0,
      "module": 7,
      "explanation": "Commit pushes workspace changes to the Git branch. Update does the reverse and brings branch changes into the workspace."
    },
    {
      "id": "dp600-7-019",
      "text": "A teammate wants to develop in isolation without affecting the shared workspace. Which Fabric Git feature fits?",
      "options": [
        "Delete and reconnect the workspace",
        "Share the workspace as a Viewer",
        "Branch out to a new workspace",
        "Create a deployment rule"
      ],
      "correct": 2,
      "module": 7,
      "explanation": "Branching out creates a new workspace connected to a new branch, so work can be done in isolation and merged later."
    },
    {
      "id": "dp600-7-020",
      "text": "The same item was changed in the workspace and in Git, and Update is disabled. What must you do first?",
      "options": [
        "Grant the item Build permission",
        "Resolve the conflict by choosing which version to keep",
        "Wait for the next scheduled refresh",
        "Delete the item in the workspace"
      ],
      "correct": 1,
      "module": 7,
      "explanation": "A conflict blocks updates until you decide whether the workspace or Git version wins."
    },
    {
      "id": "dp600-7-021",
      "text": "How does the PBIR report format store a report in a Power BI project?",
      "options": [
        "As one large .bim file",
        "As a .pbit template",
        "The whole report in a single binary file",
        "Each page and visual in its own JSON file within a folder structure"
      ],
      "correct": 3,
      "module": 7,
      "explanation": "PBIR splits a report into many small JSON files, which makes changes easy to review and merge in Git."
    },
    {
      "id": "dp600-7-022",
      "text": "Which formats can the semantic model in a Power BI project use?",
      "options": [
        "TMDL (a folder of .tmdl files) or TMSL (a model.bim file)",
        "Only the binary .abf format",
        "Only a .pbit template",
        "Only .pbix inside a zip file"
      ],
      "correct": 0,
      "module": 7,
      "explanation": "A project's semantic model can be saved as a folder of TMDL files or as a single model.bim in TMSL JSON. TMDL is the more readable and merge-friendly option."
    },
    {
      "id": "dp600-7-023",
      "text": "Why would you choose .pbip over .pbix when using Fabric Git integration?",
      "options": [
        "Git integration works with project files, not the single-file .pbix",
        "A .pbip is the only file that can be refreshed",
        "A .pbix can't contain a report",
        "A .pbip file includes the imported data"
      ],
      "correct": 0,
      "module": 7,
      "explanation": "To develop in Power BI Desktop and publish through Git integration, you need the project format, because Git tracks the individual text files."
    },
    {
      "id": "dp600-7-024",
      "text": "Power BI Desktop writes CRLF line endings. What should you do in Git to avoid noisy diffs?",
      "options": [
        "Disable TMDL",
        "Configure Git's autocrlf setting",
        "Delete the .gitignore file",
        "Convert the project to a .pbix"
      ],
      "correct": 1,
      "module": 7,
      "explanation": "Setting autocrlf normalizes line endings so changes made on different systems don't show as whole-file differences."
    },
    {
      "id": "dp600-7-025",
      "text": "How many stages can a Fabric deployment pipeline have?",
      "options": [
        "Between two and ten",
        "Up to five, no fewer than three",
        "Between one and three",
        "Exactly three"
      ],
      "correct": 0,
      "module": 7,
      "explanation": "A pipeline defaults to Development, Test and Production, but you can use from two to ten stages and rename them."
    },
    {
      "id": "dp600-7-026",
      "text": "What does comparing two stages in a deployment pipeline show?",
      "options": [
        "The refresh history of each stage",
        "Which users have access to each stage",
        "The capacity usage of each stage",
        "Which items differ between the stages"
      ],
      "correct": 3,
      "module": 7,
      "explanation": "The stage comparison highlights items that are different, missing or identical so you know what a deployment would change."
    },
    {
      "id": "dp600-7-027",
      "text": "What does Microsoft recommend as the first choice for environment-specific configuration across stages?",
      "options": [
        "Hard-coded values in each item",
        "Manual edits in Production",
        "Separate tenants for each stage",
        "Variable libraries"
      ],
      "correct": 3,
      "module": 7,
      "explanation": "Deployment rules are still supported, but variable libraries are the strategic capability for environment-specific configuration."
    },
    {
      "id": "dp600-7-028",
      "text": "You deploy a semantic model from Test to Production. What is copied?",
      "options": [
        "The item's definition and metadata, not the data",
        "The model's data and refresh history",
        "Only the data, not the model",
        "Row-level security members only"
      ],
      "correct": 0,
      "module": 7,
      "explanation": "Deployment copies item definitions. Data in the target stage comes from refreshing the model there."
    },
    {
      "id": "dp600-7-029",
      "text": "Where can you open impact analysis for an item?",
      "options": [
        "From the deployment rules dialog",
        "From the item's card in lineage view or its details page",
        "From the Monitoring hub only",
        "From Capacity Metrics only"
      ],
      "correct": 1,
      "module": 7,
      "explanation": "Impact analysis is available from lineage view and from the item's details page."
    },
    {
      "id": "dp600-7-030",
      "text": "What can you do from the impact analysis results?",
      "options": [
        "Notify the contacts of the downstream items affected by a change",
        "Delete the downstream items automatically",
        "Grant yourself access to them",
        "Roll back the change in all downstream items"
      ],
      "correct": 0,
      "module": 7,
      "explanation": "The pane lists affected workspaces and items and lets you notify their contacts before making a change."
    },
    {
      "id": "dp600-7-031",
      "text": "You need every item affected two or more steps downstream of a lakehouse. Which scope should you choose?",
      "options": [
        "Upstream items",
        "Only items in the same workspace",
        "All downstream items",
        "Child items"
      ],
      "correct": 2,
      "module": 7,
      "explanation": "Child items show one step downstream. The all-downstream scope shows the full chain."
    },
    {
      "id": "dp600-7-032",
      "text": "What does lineage view show?",
      "options": [
        "How data flows from sources through Fabric items to reports",
        "The items' deployment rules",
        "How much capacity each item uses",
        "Which users edited an item last"
      ],
      "correct": 0,
      "module": 7,
      "explanation": "Lineage view displays dependencies between sources, lakehouses, dataflows, semantic models and reports."
    },
    {
      "id": "dp600-7-033",
      "text": "Which tool can compare a local model with a published one and push selected changes through the XMLA endpoint?",
      "options": [
        "Performance Analyzer",
        "The OneLake catalog",
        "ALM Toolkit",
        "Deployment rules"
      ],
      "correct": 2,
      "module": 7,
      "explanation": "ALM Toolkit compares model schemas and deploys differences by using the XMLA endpoint."
    },
    {
      "id": "dp600-7-034",
      "text": "How does an XMLA client identify a workspace to connect to?",
      "options": [
        "With the workspace connection URL, such as powerbi://api.powerbi.com/v1.0/myorg/<workspace>",
        "With the workspace's Git repository URL",
        "With the OneLake path of its lakehouse",
        "With the capacity's SKU name"
      ],
      "correct": 0,
      "module": 7,
      "explanation": "The XMLA endpoint is addressed by the workspace connection string, which tools such as SSMS and Tabular Editor use."
    },
    {
      "id": "dp600-7-035",
      "text": "Which workspace license mode is required to use the XMLA endpoint?",
      "options": [
        "Premium or Fabric capacity (or Premium Per User)",
        "Any workspace, with no capacity",
        "Only a trial workspace",
        "A Pro-only workspace"
      ],
      "correct": 0,
      "module": 7,
      "explanation": "The XMLA endpoint is a capacity feature, so the workspace must be on Premium, Fabric capacity or PPU."
    },
    {
      "id": "dp600-7-036",
      "text": "Which task generally requires XMLA write access instead of Power BI Desktop alone?",
      "options": [
        "Changing a report theme",
        "Refreshing or managing individual partitions of a table",
        "Creating a basic visual",
        "Adding a slicer"
      ],
      "correct": 1,
      "module": 7,
      "explanation": "Partition-level operations are done through XMLA tools such as SSMS or Tabular Editor."
    },
    {
      "id": "dp600-7-037",
      "text": "You send a .pbit to a colleague so they can connect it to their own server. What do they change when opening it?",
      "options": [
        "The workspace role",
        "The deployment stage",
        "The Power Query parameter values",
        "The sensitivity label"
      ],
      "correct": 2,
      "module": 7,
      "explanation": "A template prompts for parameter values on opening, which is how source details are supplied."
    },
    {
      "id": "dp600-7-038",
      "text": "What permission do report authors need on a shared semantic model to build their own reports on it?",
      "options": [
        "Admin on the capacity",
        "Build",
        "Reshare",
        "Write on the workspace only"
      ],
      "correct": 1,
      "module": 7,
      "explanation": "Build lets authors connect to the model and create reports without copying the model."
    },
    {
      "id": "dp600-7-039",
      "text": "Where can report authors discover shared semantic models to reuse?",
      "options": [
        "Only in the Monitoring hub",
        "Only in Git",
        "In the OneLake catalog or the Get data > Power BI semantic models option in Desktop",
        "Only through deployment rules"
      ],
      "correct": 2,
      "module": 7,
      "explanation": "Shared models are discoverable from the catalog and from Desktop's data hub-style option."
    },
    {
      "id": "dp600-7-040",
      "text": "What is a thin report?",
      "options": [
        "A report with no model of its own, connected live to a shared semantic model",
        "A report with all visuals removed",
        "A report stored as TMDL files",
        "A report saved as a .pbit template"
      ],
      "correct": 0,
      "module": 7,
      "explanation": "A thin report holds only the visuals and connects to a shared semantic model, so the model logic isn't duplicated."
    },
    {
      "id": "dp600-7-041",
      "text": "How can a team reuse a connection without sharing the underlying credentials?",
      "options": [
        "Email the password to each user",
        "Share the connection so others can use it without seeing the credentials",
        "Store the password in a notebook",
        "Create a separate connection per query"
      ],
      "correct": 1,
      "module": 7,
      "explanation": "A shared connection lets other users use it in their items without exposing the stored credentials."
    },
    {
      "id": "dp600-7-042",
      "text": "Which authentication kind suits an unattended pipeline that must not depend on one person's account?",
      "options": [
        "Windows authentication through a laptop",
        "Anonymous access to the source",
        "Service principal",
        "A personal Basic login"
      ],
      "correct": 2,
      "module": 7,
      "explanation": "A service principal is an application identity that isn't tied to a user, so it keeps working when staff change."
    },
    {
      "id": "dp600-7-043",
      "text": "What network access does an on-premises data gateway need?",
      "options": [
        "A VPN to every user's laptop",
        "Inbound access from the internet",
        "Outbound connections only, with no inbound ports opened",
        "Direct access from Fabric to the database port"
      ],
      "correct": 2,
      "module": 7,
      "explanation": "The gateway initiates outbound connections to the cloud service, so you don't open inbound firewall ports."
    },
    {
      "id": "dp600-7-044",
      "text": "With outbound access protection on, how do you allow a pipeline to reach an approved external source?",
      "options": [
        "Share the workspace with the source owner",
        "Add a data connection rule that allows the cloud connection or gateway",
        "Disable all workspace roles",
        "Delete the deployment pipeline"
      ],
      "correct": 1,
      "module": 7,
      "explanation": "Outbound connections are blocked by default under protection, so data connection rules explicitly allow approved ones."
    },
    {
      "id": "dp600-7-045",
      "text": "Which filters does the OneLake catalog offer to narrow down items?",
      "options": [
        "Only the item's size",
        "Domain, item type, endorsement and keyword",
        "Only the owner's department",
        "Only the creation date"
      ],
      "correct": 1,
      "module": 7,
      "explanation": "The catalog lets users browse and filter by domain, item type, endorsement and keyword search."
    },
    {
      "id": "dp600-7-046",
      "text": "In Real-Time hub, where would you look to react to events such as a file landing in Azure Blob Storage?",
      "options": [
        "Capacity Metrics",
        "Azure events",
        "The Git integration panel",
        "Deployment pipelines"
      ],
      "correct": 1,
      "module": 7,
      "explanation": "Real-Time hub lists Azure and Fabric events you can subscribe to and use to trigger actions."
    },
    {
      "id": "dp600-7-047",
      "text": "What kinds of items can you find in Real-Time hub?",
      "options": [
        "Only Git repositories",
        "Only deployment pipelines",
        "Data streams, KQL tables and event sources across the organization",
        "Only semantic models"
      ],
      "correct": 2,
      "module": 7,
      "explanation": "Real-Time hub is the catalog for streaming data and events."
    },
    {
      "id": "dp600-7-048",
      "text": "You find a lakehouse in the OneLake catalog but can't open it. What should you do?",
      "options": [
        "Delete it and recreate it",
        "Request access from its owner",
        "Assign yourself the Admin role",
        "Create a deployment rule"
      ],
      "correct": 1,
      "module": 7,
      "explanation": "Discovering an item doesn't grant access; use the access request or ask the owner."
    },
    {
      "id": "dp600-7-049",
      "text": "Which Fabric engines can read eventhouse data after OneLake availability is turned on?",
      "options": [
        "Only KQL",
        "Only Power Query Online",
        "Spark, SQL engines and Direct Lake semantic models",
        "Only Git integration"
      ],
      "correct": 2,
      "module": 7,
      "explanation": "The Delta copy in OneLake is readable by any engine that reads Delta, including Spark, lakehouse and warehouse SQL, and Direct Lake."
    },
    {
      "id": "dp600-7-050",
      "text": "How do you surface an eventhouse table's OneLake data in a lakehouse?",
      "options": [
        "Create a shortcut to the table's Delta data",
        "Use a deployment rule",
        "Export it to a .pbix",
        "Copy it with a notebook every hour"
      ],
      "correct": 0,
      "module": 7,
      "explanation": "A shortcut references the Delta table in place so the lakehouse can query it without copying."
    },
    {
      "id": "dp600-7-051",
      "text": "What can the eventhouse mirroring policy be used for besides setting latency?",
      "options": [
        "Granting row-level security",
        "Scheduling a refresh",
        "Partitioning the Delta tables written to OneLake",
        "Applying sensitivity labels"
      ],
      "correct": 2,
      "module": 7,
      "explanation": "The mirroring policy that OneLake availability creates can be altered to partition the Delta tables."
    },
    {
      "id": "dp600-7-052",
      "text": "Which Direct Lake source can read an eventhouse's data directly without going through a lakehouse?",
      "options": [
        "DirectQuery only",
        "Import mode only",
        "Dual mode only",
        "Direct Lake on OneLake with OneLake availability on the KQL database"
      ],
      "correct": 3,
      "module": 7,
      "explanation": "A KQL database with OneLake availability can be a source for a Direct Lake on OneLake model."
    },
    {
      "id": "dp600-7-053",
      "text": "Which warehouse object can contain INSERT statements to persist transformed data?",
      "options": [
        "A stored procedure",
        "An inline table-valued function",
        "A scalar function",
        "A view"
      ],
      "correct": 0,
      "module": 7,
      "explanation": "Stored procedures can write data. Views and inline table-valued functions are read-only."
    },
    {
      "id": "dp600-7-054",
      "text": "Which statement runs a stored procedure in T-SQL?",
      "options": [
        "START",
        "CALL",
        "RUN",
        "EXEC"
      ],
      "correct": 3,
      "module": 7,
      "explanation": "T-SQL uses EXEC (or EXECUTE) to run a stored procedure."
    },
    {
      "id": "dp600-7-055",
      "text": "Which construct lets a stored procedure handle errors without aborting all work?",
      "options": [
        "WITH CHECK OPTION",
        "FOR XML",
        "GOTO",
        "TRY...CATCH"
      ],
      "correct": 3,
      "module": 7,
      "explanation": "TRY...CATCH catches errors so the procedure can log them and continue or roll back deliberately."
    },
    {
      "id": "dp600-7-056",
      "text": "Which PySpark call adds a derived column to a DataFrame?",
      "options": [
        "groupBy",
        "withColumn",
        "unionAll",
        "dropDuplicates"
      ],
      "correct": 1,
      "module": 7,
      "explanation": "withColumn adds or replaces a column with an expression."
    },
    {
      "id": "dp600-7-057",
      "text": "In Dataflow Gen2, which feature builds a new column by giving sample output values?",
      "options": [
        "Column from examples",
        "Append queries",
        "Group by",
        "Remove duplicates"
      ],
      "correct": 0,
      "module": 7,
      "explanation": "Column from examples infers the transformation from examples you type."
    },
    {
      "id": "dp600-7-058",
      "text": "How do you create a new warehouse table from a join and aggregation in one statement?",
      "options": [
        "CREATE SYNONYM",
        "ALTER TABLE ADD",
        "INSERT DEFAULT",
        "CREATE TABLE AS SELECT (CTAS)"
      ],
      "correct": 3,
      "module": 7,
      "explanation": "CTAS creates and loads a new table from a SELECT query in one step."
    },
    {
      "id": "dp600-7-059",
      "text": "Which T-SQL expression lets you classify rows into categories such as High, Medium and Low?",
      "options": [
        "UNION",
        "CASE",
        "OFFSET",
        "COALESCE"
      ],
      "correct": 1,
      "module": 7,
      "explanation": "CASE returns different values by condition and is commonly used to derive category columns."
    },
    {
      "id": "dp600-7-060",
      "text": "Which columns typically make a dimension table SCD Type 2?",
      "options": [
        "A second copy of the fact table",
        "Only an identity column",
        "Effective start date, end date and a current-row flag",
        "Only a single updated-timestamp column"
      ],
      "correct": 2,
      "module": 7,
      "explanation": "Type 2 keeps history by adding a new row and tracking validity with dates and/or a current flag."
    },
    {
      "id": "dp600-7-061",
      "text": "Why do dimension tables usually use a surrogate key?",
      "options": [
        "It prevents any data type conversion",
        "It removes the need for a fact table",
        "It is required for Direct Lake",
        "It decouples the dimension from source keys and supports history such as SCD Type 2"
      ],
      "correct": 3,
      "module": 7,
      "explanation": "A surrogate key is a generated identifier, so source key changes or multiple versions of a member don't break relationships."
    },
    {
      "id": "dp600-7-062",
      "text": "What is the grain of a fact table?",
      "options": [
        "The table's storage size",
        "The level of detail that one row represents",
        "The number of columns in the table",
        "The number of dimensions it has"
      ],
      "correct": 1,
      "module": 7,
      "explanation": "Defining the grain, such as one row per order line, is the first step of designing a fact table."
    },
    {
      "id": "dp600-7-063",
      "text": "Which schema design denormalizes dimension tables?",
      "options": [
        "Star schema",
        "Third normal form",
        "Snowflake schema",
        "Fully normalized transactional design"
      ],
      "correct": 0,
      "module": 7,
      "explanation": "A star schema keeps each dimension as a single wide table."
    },
    {
      "id": "dp600-7-064",
      "text": "A modeler suggests adding the product category name to the fact table to avoid a join. What is the better approach?",
      "options": [
        "Store category in a separate fact table",
        "Repeat all dimension columns in the fact table",
        "Keep category in the Product dimension and relate the fact table to it",
        "Remove the Product dimension"
      ],
      "correct": 2,
      "module": 7,
      "explanation": "Facts stay narrow; descriptive attributes belong in dimensions."
    },
    {
      "id": "dp600-7-065",
      "text": "In a Spark notebook, how do you build a flattened dimension from three normalized tables?",
      "options": [
        "Join the DataFrames and write the result as a Delta table",
        "Use dropDuplicates on each table",
        "Run VACUUM on the tables",
        "Use a shortcut for each table"
      ],
      "correct": 0,
      "module": 7,
      "explanation": "Joining the tables and saving the result produces one wide dimension."
    },
    {
      "id": "dp600-7-066",
      "text": "In Dataflow Gen2, how do you flatten related tables into one?",
      "options": [
        "Merge queries, then expand the columns you need",
        "Append queries",
        "Pivot the table",
        "Remove columns"
      ],
      "correct": 0,
      "module": 7,
      "explanation": "Merge queries joins tables on a key and expanding adds the related columns."
    },
    {
      "id": "dp600-7-067",
      "text": "Which T-SQL option adds subtotal and grand total rows to a GROUP BY result?",
      "options": [
        "DISTINCT",
        "OFFSET",
        "ROLLUP",
        "PIVOT without aggregation"
      ],
      "correct": 2,
      "module": 7,
      "explanation": "GROUP BY ROLLUP adds subtotals for the hierarchy of grouping columns, plus a grand total."
    },
    {
      "id": "dp600-7-068",
      "text": "Which KQL query counts events per hour?",
      "options": [
        "T | summarize count() by bin(Timestamp, 1h)",
        "T | take count() by Timestamp",
        "T | distinct bin(Timestamp)",
        "T | project count(1h)"
      ],
      "correct": 0,
      "module": 7,
      "explanation": "summarize with bin() groups rows into time buckets and aggregates."
    },
    {
      "id": "dp600-7-069",
      "text": "You need each row to keep its detail and also show the total for its group. Which Spark approach fits?",
      "options": [
        "dropDuplicates",
        "distinct",
        "groupBy and agg only",
        "A window function with partitionBy"
      ],
      "correct": 3,
      "module": 7,
      "explanation": "A window aggregate adds a group total to every row, whereas groupBy collapses the rows."
    },
    {
      "id": "dp600-7-070",
      "text": "Which operation in Dataflow Gen2 produces one row per group with an aggregate value?",
      "options": [
        "Transpose",
        "Promote headers",
        "Group by",
        "Fill down"
      ],
      "correct": 2,
      "module": 7,
      "explanation": "Group by summarizes rows by key columns with aggregations such as sum or count."
    },
    {
      "id": "dp600-7-071",
      "text": "What is the default join kind when you use Merge queries in Dataflow Gen2?",
      "options": [
        "Inner",
        "Anti",
        "Full outer",
        "Left outer"
      ],
      "correct": 3,
      "module": 7,
      "explanation": "Merge queries defaults to a left outer join, keeping all rows from the first table."
    },
    {
      "id": "dp600-7-072",
      "text": "Which T-SQL pattern keeps only the latest row per customer when duplicates exist?",
      "options": [
        "SELECT DISTINCT CustomerId",
        "GROUP BY * HAVING COUNT(*) = 1",
        "ROW_NUMBER() OVER (PARTITION BY CustomerId ORDER BY ModifiedDate DESC), then keep row 1",
        "TOP 1 WITH TIES without ordering"
      ],
      "correct": 2,
      "module": 7,
      "explanation": "Ranking within each customer and keeping row number 1 selects the latest version."
    },
    {
      "id": "dp600-7-073",
      "text": "A column has blanks where the value from the row above should apply. Which Power Query step fixes it?",
      "options": [
        "Fill down",
        "Split column",
        "Remove duplicates",
        "Unpivot columns"
      ],
      "correct": 0,
      "module": 7,
      "explanation": "Fill down copies the previous non-null value into the nulls below it."
    },
    {
      "id": "dp600-7-074",
      "text": "How do you drop rows with nulls in specific columns in PySpark?",
      "options": [
        "df.dropDuplicates(['col1'])",
        "df.fillna('col1')",
        "df.distinct(['col2'])",
        "df.dropna(subset=['col1','col2'])"
      ],
      "correct": 3,
      "module": 7,
      "explanation": "dropna with subset removes rows with nulls only in the named columns."
    },
    {
      "id": "dp600-7-075",
      "text": "In T-SQL, how do you correctly test whether a column is missing?",
      "options": [
        "WHERE col = NULL",
        "WHERE col <> NULL",
        "WHERE col == ''",
        "WHERE col IS NULL"
      ],
      "correct": 3,
      "module": 7,
      "explanation": "NULL can't be compared with = because the result is unknown; use IS NULL or IS NOT NULL."
    },
    {
      "id": "dp600-7-076",
      "text": "Which data type avoids rounding errors for currency amounts?",
      "options": [
        "Text",
        "Real",
        "Decimal (fixed-point)",
        "Float"
      ],
      "correct": 2,
      "module": 7,
      "explanation": "Fixed-point decimal stores exact values, while floating-point types can introduce small rounding differences."
    },
    {
      "id": "dp600-7-077",
      "text": "Which T-SQL statement converts a datetime column to a date?",
      "options": [
        "UPPER(OrderDateTime)",
        "DATEDIFF(OrderDateTime)",
        "FORMAT(OrderDateTime) AS DATE",
        "CAST(OrderDateTime AS DATE)"
      ],
      "correct": 3,
      "module": 7,
      "explanation": "CAST converts a value to another data type; CAST to DATE removes the time portion."
    },
    {
      "id": "dp600-7-078",
      "text": "A column of dates in dd/mm/yyyy text loads with the wrong values in Power Query. What should you use?",
      "options": [
        "Replace errors",
        "Remove duplicates",
        "Fill down",
        "Change Type using Locale"
      ],
      "correct": 3,
      "module": 7,
      "explanation": "Changing type with locale tells Power Query how to interpret the text, such as day-first date formats."
    },
    {
      "id": "dp600-7-079",
      "text": "Which T-SQL function returns a formatted string, so you shouldn't use it to convert text to a number?",
      "options": [
        "TRY_CAST",
        "FORMAT",
        "TRY_CONVERT",
        "CAST"
      ],
      "correct": 1,
      "module": 7,
      "explanation": "FORMAT returns a string for display. Use CAST or TRY_CAST for conversions."
    },
    {
      "id": "dp600-7-080",
      "text": "Which T-SQL predicate selects dates in an inclusive range?",
      "options": [
        "WHERE OrderDate LIKE '2025'",
        "WHERE OrderDate = 'Q1'",
        "WHERE OrderDate IN ('2025-01-01', '2025-03-31')",
        "WHERE OrderDate BETWEEN '2025-01-01' AND '2025-03-31'"
      ],
      "correct": 3,
      "module": 7,
      "explanation": "BETWEEN is inclusive of both ends and is the usual way to filter a range."
    },
    {
      "id": "dp600-7-081",
      "text": "Which KQL operator filters rows by a condition?",
      "options": [
        "where",
        "project",
        "summarize",
        "extend"
      ],
      "correct": 0,
      "module": 7,
      "explanation": "where keeps rows that match a predicate."
    },
    {
      "id": "dp600-7-082",
      "text": "Which M function filters rows of a table by a condition?",
      "options": [
        "Table.SelectRows",
        "Table.Pivot",
        "Table.AddColumn",
        "Table.Sort"
      ],
      "correct": 0,
      "module": 7,
      "explanation": "Table.SelectRows keeps rows for which the condition is true."
    },
    {
      "id": "dp600-7-083",
      "text": "Why is filtering on a Delta table's partition column fast in Spark?",
      "options": [
        "It copies the table into memory first",
        "Spark skips the partitions that don't match, so less data is read",
        "It disables V-Order",
        "It converts the table to Import mode"
      ],
      "correct": 1,
      "module": 7,
      "explanation": "Partition pruning avoids reading files in partitions that don't satisfy the filter."
    },
    {
      "id": "dp600-7-084",
      "text": "Which Visual query editor operation stacks the rows of two tables with the same columns?",
      "options": [
        "Choose columns",
        "Append queries",
        "Group by",
        "Merge queries"
      ],
      "correct": 1,
      "module": 7,
      "explanation": "Append queries is the union; Merge queries is the join."
    },
    {
      "id": "dp600-7-085",
      "text": "What can you do with a finished visual query?",
      "options": [
        "Deploy it as a stored procedure with one click",
        "Schedule it as a Spark job",
        "Convert it to a .pbix automatically",
        "Save it as a view for others to reuse"
      ],
      "correct": 3,
      "module": 7,
      "explanation": "A visual query can be saved as a view or used as a query for reports."
    },
    {
      "id": "dp600-7-086",
      "text": "Which operation in the Visual query editor returns one row per group with aggregated values?",
      "options": [
        "Sort",
        "Group by",
        "Choose columns",
        "Append queries"
      ],
      "correct": 1,
      "module": 7,
      "explanation": "Group by summarizes rows by key columns."
    },
    {
      "id": "dp600-7-087",
      "text": "How does the Visual query editor differ from Dataflow Gen2?",
      "options": [
        "It can't join tables",
        "It loads data into a lakehouse on a schedule",
        "It builds a SELECT query that runs on the warehouse engine with no refresh step",
        "It requires Spark"
      ],
      "correct": 2,
      "module": 7,
      "explanation": "The Visual query editor generates T-SQL that runs on the warehouse or SQL endpoint, while Dataflow Gen2 is an ETL item with its own refresh."
    },
    {
      "id": "dp600-7-088",
      "text": "Which T-SQL window function returns the value from the next row in a partition?",
      "options": [
        "NTILE",
        "LEAD",
        "FIRST_VALUE with no frame",
        "LAG"
      ],
      "correct": 1,
      "module": 7,
      "explanation": "LEAD looks forward; LAG looks back."
    },
    {
      "id": "dp600-7-089",
      "text": "You try to INSERT into a lakehouse table through its SQL analytics endpoint and it fails. Why?",
      "options": [
        "The table isn't in Delta format",
        "The SQL analytics endpoint of a lakehouse is read-only for data",
        "The query is missing a GO statement",
        "The user needs the Viewer role"
      ],
      "correct": 1,
      "module": 7,
      "explanation": "Use Spark or a warehouse to change data. The endpoint is for querying."
    },
    {
      "id": "dp600-7-090",
      "text": "Which T-SQL feature lets you name an intermediate result set and reference it in the main query?",
      "options": [
        "A synonym",
        "A cursor",
        "A trigger",
        "A common table expression (WITH ...)"
      ],
      "correct": 3,
      "module": 7,
      "explanation": "A CTE defines a named result set for the statement that follows."
    },
    {
      "id": "dp600-7-091",
      "text": "What is the default join kind in KQL when none is specified?",
      "options": [
        "innerunique",
        "inner",
        "fullouter",
        "leftouter"
      ],
      "correct": 0,
      "module": 7,
      "explanation": "KQL's default join is innerunique, which deduplicates the left side on the join key before an inner join."
    },
    {
      "id": "dp600-7-092",
      "text": "Which KQL operator returns the first N rows with no guaranteed order?",
      "options": [
        "summarize",
        "extend",
        "take",
        "sort"
      ],
      "correct": 2,
      "module": 7,
      "explanation": "take (limit) returns arbitrary rows; use top or sort for ordering."
    },
    {
      "id": "dp600-7-093",
      "text": "Which KQL operator adds a calculated column to the result?",
      "options": [
        "join",
        "distinct",
        "extend",
        "where"
      ],
      "correct": 2,
      "module": 7,
      "explanation": "extend adds computed columns while keeping the existing ones."
    },
    {
      "id": "dp600-7-094",
      "text": "Which DAX function evaluates a table expression under modified filters in a query?",
      "options": [
        "SELECTEDVALUE",
        "CALCULATETABLE",
        "LOOKUPVALUE",
        "CALCULATE"
      ],
      "correct": 1,
      "module": 7,
      "explanation": "CALCULATETABLE returns a table with filters applied; CALCULATE returns a scalar."
    },
    {
      "id": "dp600-7-095",
      "text": "Which optional DAX query clause sorts the result?",
      "options": [
        "SORT BY",
        "SEQUENCE",
        "ARRANGE",
        "ORDER BY"
      ],
      "correct": 3,
      "module": 7,
      "explanation": "ORDER BY after the EVALUATE expression sorts the output, optionally with START AT."
    },
    {
      "id": "dp600-7-096",
      "text": "Which DAX function family returns model metadata as tables, such as the list of measures?",
      "options": [
        "INFO.VIEW functions (for example INFO.VIEW.MEASURES)",
        "SUMMARIZE functions",
        "FORMAT functions",
        "TIMEINTELLIGENCE functions"
      ],
      "correct": 0,
      "module": 7,
      "explanation": "INFO.VIEW functions return metadata tables you can query in DAX query view."
    },
    {
      "id": "dp600-7-097",
      "text": "In Power BI Desktop, what does DAX query view let you do?",
      "options": [
        "Manage workspace roles",
        "Write and run DAX queries against the model and update measures from the results",
        "Create deployment pipelines",
        "Edit Power Query steps"
      ],
      "correct": 1,
      "module": 7,
      "explanation": "DAX query view runs EVALUATE queries and can write measures back to the model."
    },
    {
      "id": "dp600-7-098",
      "text": "What must you set up for an Import-mode semantic model so the data stays current?",
      "options": [
        "A deployment rule",
        "A shortcut",
        "A sensitivity label",
        "A scheduled (or triggered) refresh"
      ],
      "correct": 3,
      "module": 7,
      "explanation": "Import copies data into the model, so it only changes when the model is refreshed."
    },
    {
      "id": "dp600-7-099",
      "text": "Which storage mode supports the full range of Power Query transformations and DAX features?",
      "options": [
        "Dual only for dimension tables",
        "Import",
        "Live connection",
        "DirectQuery"
      ],
      "correct": 1,
      "module": 7,
      "explanation": "Import has no restrictions from a source system, so all modelling features are available."
    },
    {
      "id": "dp600-7-100",
      "text": "In the Fabric service, which storage mode does a new semantic model created from a lakehouse or warehouse start in?",
      "options": [
        "Live connection",
        "DirectQuery",
        "Import",
        "Direct Lake"
      ],
      "correct": 3,
      "module": 7,
      "explanation": "Models created from a lakehouse or warehouse in the service default to Direct Lake."
    },
    {
      "id": "dp600-7-101",
      "text": "A DirectQuery fact table and an Import dimension table come from the same source and slicers on the dimension are slow. What is a good fix?",
      "options": [
        "Change the dimension table to Dual storage mode",
        "Change the fact table to Import without a refresh",
        "Add a calculated column to the fact table",
        "Remove the relationship"
      ],
      "correct": 0,
      "module": 7,
      "explanation": "A Dual dimension can answer slicer queries from cache and also be pushed to the source to join with the DirectQuery fact table."
    },
    {
      "id": "dp600-7-102",
      "text": "Which cross-filter direction should relationships in a star schema normally use?",
      "options": [
        "Both directions on every relationship",
        "Single, from the dimension to the fact table",
        "Single, from the fact table to the dimension",
        "None; relationships are not needed"
      ],
      "correct": 1,
      "module": 7,
      "explanation": "Single-direction filtering keeps results predictable and performant."
    },
    {
      "id": "dp600-7-103",
      "text": "Why should a model have a marked date table?",
      "options": [
        "It makes the model Direct Lake",
        "It's required for every relationship",
        "Time-intelligence functions need a contiguous date table that is marked as the date table",
        "It removes the need for measures"
      ],
      "correct": 2,
      "module": 7,
      "explanation": "Functions such as TOTALYTD and SAMEPERIODLASTYEAR depend on a proper marked date table."
    },
    {
      "id": "dp600-7-104",
      "text": "Why is a bridge table preferred over many-to-many relationships between two large dimensions?",
      "options": [
        "It reduces the number of dimension rows",
        "It removes the need for a fact table",
        "It keeps relationships one-to-many and makes the filtering behavior explicit",
        "It makes calculated columns faster"
      ],
      "correct": 2,
      "module": 7,
      "explanation": "A bridge resolves a many-to-many into two one-to-many relationships, which are easier to reason about."
    },
    {
      "id": "dp600-7-105",
      "text": "What is a risk of enabling both-direction cross-filtering on many relationships?",
      "options": [
        "Faster queries with no downside",
        "The model loses its measures",
        "Row-level security stops working",
        "Ambiguous filter paths and slower queries"
      ],
      "correct": 3,
      "module": 7,
      "explanation": "Bidirectional filters can create ambiguity and extra work for the engine, so use them only where needed."
    },
    {
      "id": "dp600-7-106",
      "text": "Which cardinality types can a relationship have in a semantic model?",
      "options": [
        "Only one-to-many",
        "One-to-many and many-to-many only, with no one-to-one",
        "One-to-many, many-to-one, one-to-one and many-to-many",
        "Only one-to-one"
      ],
      "correct": 2,
      "module": 7,
      "explanation": "Power BI supports all four relationship cardinalities."
    },
    {
      "id": "dp600-7-107",
      "text": "When is a both-directions cross-filter relationship commonly justified?",
      "options": [
        "On every relationship by default",
        "Never, it is unsupported",
        "Between the fact table and the date table",
        "On the bridge table in a many-to-many pattern so a dimension can filter through it"
      ],
      "correct": 3,
      "module": 7,
      "explanation": "Both-direction filtering on a bridge is a standard way to let the filter pass through to the other dimension."
    },
    {
      "id": "dp600-7-108",
      "text": "What must be true of the two columns used in a relationship?",
      "options": [
        "They are both calculated tables",
        "They have compatible data types",
        "They have the same column name",
        "They are both measures"
      ],
      "correct": 1,
      "module": 7,
      "explanation": "The related columns must have matching data types; names can differ."
    },
    {
      "id": "dp600-7-109",
      "text": "Which DAX function does a calculation item use to refer to the measure currently being evaluated?",
      "options": [
        "SELECTEDMEASURE",
        "CALCULATE with no arguments",
        "MEASURE",
        "SELECTEDVALUE"
      ],
      "correct": 0,
      "module": 7,
      "explanation": "SELECTEDMEASURE() returns the measure in the current context so one item can apply to any measure."
    },
    {
      "id": "dp600-7-110",
      "text": "Two calculation groups apply to the same measure. What decides which is evaluated first?",
      "options": [
        "The alphabetical order of their names",
        "The size of the tables",
        "The order the measures were created",
        "The precedence value of each calculation group"
      ],
      "correct": 3,
      "module": 7,
      "explanation": "Each calculation group has a precedence property; the higher precedence is applied first."
    },
    {
      "id": "dp600-7-111",
      "text": "What does a dynamic format string expression return?",
      "options": [
        "A Boolean that hides the measure",
        "A numeric value to add to the measure",
        "A table of format options",
        "A text format string, such as \"#,0.00\" or a currency pattern"
      ],
      "correct": 3,
      "module": 7,
      "explanation": "The expression evaluates to the format string used to display the measure while the measure itself stays numeric."
    },
    {
      "id": "dp600-7-112",
      "text": "Which DAX function does a field parameter table use to reference each field?",
      "options": [
        "FORMAT",
        "LOOKUPVALUE",
        "NAMEOF",
        "SELECTEDVALUE"
      ],
      "correct": 2,
      "module": 7,
      "explanation": "Each row of a field parameter table holds a NAMEOF reference to a column or measure."
    },
    {
      "id": "dp600-7-113",
      "text": "Where do you enable the large semantic model storage format for an Import model?",
      "options": [
        "In a deployment rule",
        "In the lakehouse's SQL endpoint",
        "In the Git repository",
        "In the semantic model's settings in the service"
      ],
      "correct": 3,
      "module": 7,
      "explanation": "The large storage format is a model setting in the service."
    },
    {
      "id": "dp600-7-114",
      "text": "What is the upper bound on a large-format model's size?",
      "options": [
        "Always exactly 10 GB",
        "One million rows",
        "The size of the largest workspace",
        "The size limit of the capacity (or the limit the capacity admin sets)"
      ],
      "correct": 3,
      "module": 7,
      "explanation": "With the large format, the model can grow up to the capacity's limit."
    },
    {
      "id": "dp600-7-115",
      "text": "Which scenario is a good reason to enable large format?",
      "options": [
        "An Import model with a very large fact table that must load and refresh efficiently",
        "A report with only one visual",
        "A model built only from a Dataflow",
        "A tiny model used by a few users"
      ],
      "correct": 0,
      "module": 7,
      "explanation": "Large format helps models that outgrow the default size and need efficient partition loading."
    },
    {
      "id": "dp600-7-116",
      "text": "How can you extend a shared semantic model with your own tables and measures without copying it?",
      "options": [
        "Convert it to a .pbip",
        "Use a deployment rule",
        "Build a composite model on top of the shared model (DirectQuery for Power BI semantic models)",
        "Export it as a .pbit and edit the copy"
      ],
      "correct": 2,
      "module": 7,
      "explanation": "A composite model can connect to a published model and add local tables and measures."
    },
    {
      "id": "dp600-7-117",
      "text": "Which relationship type results when tables come from different sources or storage modes?",
      "options": [
        "A bidirectional relationship by default",
        "An inactive relationship only",
        "A limited (weak) relationship",
        "A strong relationship with referential integrity"
      ],
      "correct": 2,
      "module": 7,
      "explanation": "Cross-source or cross-mode relationships are limited, so the engine can't assume matching rows."
    },
    {
      "id": "dp600-7-118",
      "text": "What do user-defined aggregations do in a composite model?",
      "options": [
        "Answer common queries from an Import aggregation table instead of the large DirectQuery table",
        "Hide columns from users",
        "Replace row-level security",
        "Refresh the source automatically"
      ],
      "correct": 0,
      "module": 7,
      "explanation": "Aggregation tables mapped to the detail table let most queries hit in-memory data while rare ones go to the source."
    },
    {
      "id": "dp600-7-119",
      "text": "In a composite model, a visual joins an Import table and a DirectQuery table from the same source. Which mode helps the Import table behave well here?",
      "options": [
        "Direct Lake",
        "Dual",
        "Import with no relationships",
        "Live connection"
      ],
      "correct": 1,
      "module": 7,
      "explanation": "Dual lets the table work as Import for cached queries and as DirectQuery when pushed down with the other table."
    },
    {
      "id": "dp600-7-120",
      "text": "Which report design change typically improves load time on a page with slow visuals?",
      "options": [
        "Switch every visual to a table",
        "Add more slicers",
        "Add more cards",
        "Reduce the number of visuals on the page"
      ],
      "correct": 3,
      "module": 7,
      "explanation": "Each visual runs queries, so fewer visuals means fewer queries."
    },
    {
      "id": "dp600-7-121",
      "text": "Which model change usually reduces memory the most?",
      "options": [
        "Add more calculated columns",
        "Remove unused columns and reduce high-cardinality columns",
        "Convert numbers to text",
        "Duplicate the fact table"
      ],
      "correct": 1,
      "module": 7,
      "explanation": "Columns, especially high-cardinality ones, dominate model size, so removing or reducing them helps most."
    },
    {
      "id": "dp600-7-122",
      "text": "What does adding an Apply button to slicers do for performance?",
      "options": [
        "It converts the model to Import",
        "It disables cross-highlighting permanently",
        "It batches filter changes so one query runs instead of one per change",
        "It caches the report in the browser"
      ],
      "correct": 2,
      "module": 7,
      "explanation": "Query reduction options stop each slicer change from firing queries until the user applies them."
    },
    {
      "id": "dp600-7-123",
      "text": "Why is DIVIDE usually preferred over the / operator?",
      "options": [
        "It always returns zero",
        "It handles divide-by-zero by returning blank or an alternate result and is optimized",
        "It ignores filters",
        "It avoids needing measures"
      ],
      "correct": 1,
      "module": 7,
      "explanation": "DIVIDE safely handles zero denominators without an error-checking IF."
    },
    {
      "id": "dp600-7-124",
      "text": "Which pattern is usually slow because it iterates a whole table?",
      "options": [
        "CALCULATE([Sales], DimProduct[Color] = \"Red\")",
        "CALCULATE([Sales], KEEPFILTERS(DimDate[Year] = 2025))",
        "CALCULATE([Sales], FILTER(ALL(FactSales), FactSales[Qty] > 5))",
        "CALCULATE([Sales], FactSales[Qty] > 5)"
      ],
      "correct": 2,
      "module": 7,
      "explanation": "FILTER over a whole fact table forces row-by-row evaluation; a Boolean column filter is simpler for the engine."
    },
    {
      "id": "dp600-7-125",
      "text": "Which is generally the best place for a row-level arithmetic result used in many measures?",
      "options": [
        "A nested iterator",
        "A calculated table that rebuilds on every query",
        "Compute it upstream in the source or Power Query",
        "A measure in every visual"
      ],
      "correct": 2,
      "module": 7,
      "explanation": "Pre-computed columns are stored once, while repeating row-level logic at query time costs on every evaluation."
    },
    {
      "id": "dp600-7-126",
      "text": "Why can DISTINCTCOUNT on a very high-cardinality column be slow?",
      "options": [
        "It uses the formula engine only for blanks",
        "The engine has to track every unique value",
        "It disables compression",
        "It ignores relationships"
      ],
      "correct": 1,
      "module": 7,
      "explanation": "Distinct counting needs to evaluate each unique value, so cost grows with cardinality."
    },
    {
      "id": "dp600-7-127",
      "text": "What does the 'Keep your Direct Lake data up to date' setting do?",
      "options": [
        "It copies data into Import storage",
        "It encrypts the Delta files",
        "It disables fallback",
        "It lets the model reframe automatically when the underlying Delta tables change"
      ],
      "correct": 3,
      "module": 7,
      "explanation": "With the setting on, the model picks up changes to Delta tables automatically instead of waiting for a manual refresh."
    },
    {
      "id": "dp600-7-128",
      "text": "How can you trigger a Direct Lake refresh (framing) yourself?",
      "options": [
        "Refresh the semantic model manually, or with an API or pipeline activity",
        "Rename the lakehouse",
        "Edit a deployment rule",
        "Add a sensitivity label"
      ],
      "correct": 0,
      "module": 7,
      "explanation": "A refresh reframes the model to the latest Delta table version."
    },
    {
      "id": "dp600-7-129",
      "text": "What can cause Direct Lake guardrails to be exceeded?",
      "options": [
        "A sensitivity label on the lakehouse",
        "Tables with more files, row groups or rows than the capacity SKU supports",
        "A report with too many visuals",
        "A missing date table"
      ],
      "correct": 1,
      "module": 7,
      "explanation": "Direct Lake limits depend on the capacity SKU; exceeding them causes fallback to DirectQuery or an error depending on the flavor."
    },
    {
      "id": "dp600-7-130",
      "text": "Which Direct Lake flavor never falls back to DirectQuery?",
      "options": [
        "Direct Lake on SQL analytics endpoint",
        "Both always fall back",
        "Direct Lake on OneLake",
        "Neither can fall back"
      ],
      "correct": 2,
      "module": 7,
      "explanation": "Direct Lake on OneLake fails instead of falling back when it can't read a table directly."
    },
    {
      "id": "dp600-7-131",
      "text": "Where must row-level security be defined to apply to Direct Lake on SQL analytics endpoint queries, and what is the consequence?",
      "options": [
        "In the SQL analytics endpoint, and those queries fall back to DirectQuery",
        "In Power Query, with no consequence",
        "In OneLake only, with no consequence",
        "It isn't supported at all"
      ],
      "correct": 0,
      "module": 7,
      "explanation": "SQL-layer security is enforced on the endpoint, which means the model must fall back to DirectQuery for those queries."
    },
    {
      "id": "dp600-7-132",
      "text": "What access does Direct Lake on OneLake need from users?",
      "options": [
        "No access to the Delta files at all",
        "SQL endpoint permissions only",
        "Access to the files in OneLake; it doesn't apply SQL-based row-level security",
        "Only a Power BI Pro license"
      ],
      "correct": 2,
      "module": 7,
      "explanation": "This flavor reads Delta files directly, so security is enforced through OneLake permissions and the model, not SQL RLS."
    },
    {
      "id": "dp600-7-133",
      "text": "Which statement about Direct Lake on OneLake connections is correct?",
      "options": [
        "It requires a VNet gateway for every source",
        "It always needs an on-premises gateway",
        "It works only with DirectQuery tables",
        "It supports only cloud connections and can't go through a gateway"
      ],
      "correct": 3,
      "module": 7,
      "explanation": "Direct Lake on OneLake supports cloud connections only."
    },
    {
      "id": "dp600-7-134",
      "text": "What is the difference between the archive period and the refresh period in an incremental refresh policy?",
      "options": [
        "Archive is how much history to keep; refresh is how recent data is reloaded each time",
        "They are the same setting",
        "Archive is for DirectQuery; refresh is for Import",
        "Archive is the backup location; refresh is the source system"
      ],
      "correct": 0,
      "module": 7,
      "explanation": "The archive period defines the stored history window, and the refresh period defines the recent window that is reprocessed."
    },
    {
      "id": "dp600-7-135",
      "text": "Where do you apply the RangeStart and RangeEnd filter?",
      "options": [
        "As a DAX measure",
        "As a filter on the table's date/time column in Power Query",
        "On the report page",
        "In a deployment rule"
      ],
      "correct": 1,
      "module": 7,
      "explanation": "The filter on the date column is the partition boundary, and it must be a foldable, static filter."
    },
    {
      "id": "dp600-7-136",
      "text": "What does turning on 'Get the latest data in real time' add to a table?",
      "options": [
        "An extra relationship",
        "A second Import partition",
        "A calculation group",
        "A DirectQuery partition for rows newer than the refresh period"
      ],
      "correct": 3,
      "module": 7,
      "explanation": "The policy becomes a hybrid table with a DirectQuery partition for the newest data."
    },
    {
      "id": "dp600-7-137",
      "text": "When are the incremental refresh partitions created in the service?",
      "options": [
        "When you press Save in Desktop",
        "When you set up a deployment rule",
        "During the first refresh after publishing the model",
        "When you add the parameters"
      ],
      "correct": 2,
      "module": 7,
      "explanation": "Desktop only loads the sample range. The first service refresh creates the historical and incremental partitions."
    }
  ];

  if (typeof window.__dp600 === 'undefined') {
    window.__dp600 = { modules: [], questions: [] };
  }

  window.__dp600.questions = window.__dp600.questions.concat(questions);

  if (window.__dp600.modules.length < 7) {
    window.__dp600.modules[6] = "Module 7: More Exam-Skill Questions";
  }
})();
