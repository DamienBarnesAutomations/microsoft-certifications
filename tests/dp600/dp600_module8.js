// Module 8: Exam-format questions (case studies, ordering and yes/no series)
(function() {
  var questions = [
    {
      "id": "dp600-8-001",
      "text": "You need to make the Parquet files in ADLS Gen2 available in a Fabric lakehouse without copying the data. What should you create?",
      "case": "c1",
      "caseTitle": "Contoso Retail",
      "scenario": "Contoso Retail runs Microsoft Fabric on an F64 capacity.<ul><li>Daily sales files (about 2 TB of Parquet) land in Azure Data Lake Storage Gen2. Data engineers use Spark; analysts use T-SQL.</li><li>Analysts built a view named <b>vw_SalesByRegion</b> in the lakehouse SQL analytics endpoint. It joins three tables.</li><li>A Power BI semantic model must show new data soon after it lands, without importing a copy of the data.</li><li>Regional managers must see only the rows for their own region in reports.</li></ul>",
      "options": [
        "A OneLake shortcut to the ADLS Gen2 folder",
        "A copy activity in a pipeline that runs daily",
        "A Dataflow Gen2 with the files as the source",
        "A mirrored database"
      ],
      "correct": 0,
      "module": 8,
      "explanation": "A shortcut references the data in place, so nothing is copied or duplicated. Copy activities and dataflows both create a second copy."
    },
    {
      "id": "dp600-8-002",
      "text": "Reports on a Direct Lake semantic model run slowly because queries on the table based on vw_SalesByRegion are processed in DirectQuery mode. What should you do?",
      "case": "c1",
      "caseTitle": "Contoso Retail",
      "scenario": "Contoso Retail runs Microsoft Fabric on an F64 capacity.<ul><li>Daily sales files (about 2 TB of Parquet) land in Azure Data Lake Storage Gen2. Data engineers use Spark; analysts use T-SQL.</li><li>Analysts built a view named <b>vw_SalesByRegion</b> in the lakehouse SQL analytics endpoint. It joins three tables.</li><li>A Power BI semantic model must show new data soon after it lands, without importing a copy of the data.</li><li>Regional managers must see only the rows for their own region in reports.</li></ul>",
      "options": [
        "Materialize the view as a Delta table and use that table in the model",
        "Enable query scale-out on the model",
        "Change the model to Import mode and schedule a refresh",
        "Add an index to the view"
      ],
      "correct": 0,
      "module": 8,
      "explanation": "Direct Lake on the SQL analytics endpoint cannot read views in Direct Lake mode, so those tables fall back to DirectQuery. A Delta table can be read directly."
    },
    {
      "id": "dp600-8-003",
      "text": "You need regional managers to see only their own region in the reports. What should you do?",
      "case": "c1",
      "caseTitle": "Contoso Retail",
      "scenario": "Contoso Retail runs Microsoft Fabric on an F64 capacity.<ul><li>Daily sales files (about 2 TB of Parquet) land in Azure Data Lake Storage Gen2. Data engineers use Spark; analysts use T-SQL.</li><li>Analysts built a view named <b>vw_SalesByRegion</b> in the lakehouse SQL analytics endpoint. It joins three tables.</li><li>A Power BI semantic model must show new data soon after it lands, without importing a copy of the data.</li><li>Regional managers must see only the rows for their own region in reports.</li></ul>",
      "options": [
        "Create a role in the semantic model with a DAX filter on the region table, and add the managers to the role",
        "Remove the Build permission from the managers",
        "Create one report per region and share each one separately",
        "Apply a sensitivity label to the semantic model"
      ],
      "correct": 0,
      "module": 8,
      "explanation": "Row-level security roles in the semantic model filter rows for the members of each role. Separate reports or labels do not restrict rows."
    },
    {
      "id": "dp600-8-004",
      "text": "For each statement, select Yes if it is true.",
      "type": "yesno",
      "case": "c1",
      "caseTitle": "Contoso Retail",
      "scenario": "Contoso Retail runs Microsoft Fabric on an F64 capacity.<ul><li>Daily sales files (about 2 TB of Parquet) land in Azure Data Lake Storage Gen2. Data engineers use Spark; analysts use T-SQL.</li><li>Analysts built a view named <b>vw_SalesByRegion</b> in the lakehouse SQL analytics endpoint. It joins three tables.</li><li>A Power BI semantic model must show new data soon after it lands, without importing a copy of the data.</li><li>Regional managers must see only the rows for their own region in reports.</li></ul>",
      "options": [
        "A shortcut lets the lakehouse read the ADLS Gen2 files without copying them.",
        "During a Direct Lake refresh (framing), the data is imported into the model.",
        "With Direct Lake on the SQL analytics endpoint, tables can fall back to DirectQuery.",
        "Direct Lake on OneLake falls back to DirectQuery when a query needs a view."
      ],
      "correct": [
        true,
        false,
        true,
        false
      ],
      "module": 8,
      "explanation": "Shortcuts reference data in place. A Direct Lake refresh only updates metadata (framing) to point at the latest Delta files; data is loaded on demand. Direct Lake on the SQL analytics endpoint can fall back to DirectQuery, while Direct Lake on OneLake does not fall back."
    },
    {
      "id": "dp600-8-005",
      "text": "Where should you store the telemetry so dispatchers get second-level dashboards and analysts can query it with KQL?",
      "case": "c2",
      "caseTitle": "Fabrikam Logistics",
      "scenario": "Fabrikam Logistics streams truck telemetry (about 50,000 events per second) through Azure Event Hubs.<ul><li>Dispatchers need dashboards that update within seconds.</li><li>Analysts need to query the last 30 days of telemetry with KQL.</li><li>Data scientists need the same history as Delta tables in Spark notebooks, with no extra ETL.</li></ul>",
      "options": [
        "An Eventhouse (KQL database)",
        "A lakehouse Delta table",
        "A warehouse table",
        "A semantic model in Import mode"
      ],
      "correct": 0,
      "module": 8,
      "explanation": "An Eventhouse is built for high-volume streaming data with low-latency KQL queries."
    },
    {
      "id": "dp600-8-006",
      "text": "Data scientists need the history as Delta tables in Spark with no extra ETL. What should you do?",
      "case": "c2",
      "caseTitle": "Fabrikam Logistics",
      "scenario": "Fabrikam Logistics streams truck telemetry (about 50,000 events per second) through Azure Event Hubs.<ul><li>Dispatchers need dashboards that update within seconds.</li><li>Analysts need to query the last 30 days of telemetry with KQL.</li><li>Data scientists need the same history as Delta tables in Spark notebooks, with no extra ETL.</li></ul>",
      "options": [
        "Enable OneLake availability on the KQL database tables",
        "Export the tables to CSV each night",
        "Create a Dataflow Gen2 that copies the tables to a lakehouse",
        "Build a semantic model over the KQL database"
      ],
      "correct": 0,
      "module": 8,
      "explanation": "OneLake availability exposes KQL tables as Delta tables in OneLake, which Spark and other engines can read."
    },
    {
      "id": "dp600-8-007",
      "text": "Which query returns the average speed per truck in 5-minute buckets for the last hour?",
      "case": "c2",
      "caseTitle": "Fabrikam Logistics",
      "scenario": "Fabrikam Logistics streams truck telemetry (about 50,000 events per second) through Azure Event Hubs.<ul><li>Dispatchers need dashboards that update within seconds.</li><li>Analysts need to query the last 30 days of telemetry with KQL.</li><li>Data scientists need the same history as Delta tables in Spark notebooks, with no extra ETL.</li></ul>",
      "options": [
        "Telemetry | where Timestamp > ago(1h) | summarize avg(Speed) by TruckId, bin(Timestamp, 5m)",
        "SELECT TruckId, AVG(Speed) FROM Telemetry WHERE Timestamp > ago(1h) GROUP BY TruckId",
        "Telemetry | where Timestamp > ago(1h) | group by TruckId, bin(Timestamp, 5m) | avg(Speed)",
        "Telemetry | summarize avg(Speed) by TruckId | where Timestamp > ago(1h)"
      ],
      "correct": 0,
      "module": 8,
      "explanation": "Filter first with where, then summarize with bin() to bucket time. The T-SQL form has no time bucket, there is no group by operator in KQL, and after summarize the Timestamp column no longer exists."
    },
    {
      "id": "dp600-8-008",
      "text": "For each statement, select Yes if it is true.",
      "type": "yesno",
      "case": "c2",
      "caseTitle": "Fabrikam Logistics",
      "scenario": "Fabrikam Logistics streams truck telemetry (about 50,000 events per second) through Azure Event Hubs.<ul><li>Dispatchers need dashboards that update within seconds.</li><li>Analysts need to query the last 30 days of telemetry with KQL.</li><li>Data scientists need the same history as Delta tables in Spark notebooks, with no extra ETL.</li></ul>",
      "options": [
        "An eventstream can send the same stream to both an Eventhouse and a lakehouse.",
        "Real-Time hub helps you discover streaming sources you have access to.",
        "Update policies run inside the semantic model to transform ingested data.",
        "Enabling OneLake availability makes a KQL table readable as a Delta table by other engines."
      ],
      "correct": [
        true,
        true,
        false,
        true
      ],
      "module": 8,
      "explanation": "Eventstreams support several destinations at once. Real-Time hub is the catalog of streams. Update policies belong to KQL tables, not semantic models."
    },
    {
      "id": "dp600-8-009",
      "text": "You need model changes to be reviewable as text diffs in source control. How should developers save their work in Power BI Desktop?",
      "case": "c3",
      "caseTitle": "Northwind Finance",
      "scenario": "Northwind Finance develops semantic models and reports in a Dev workspace, with Test and Prod workspaces after it.<ul><li>Changes must be reviewable as text diffs in Azure DevOps.</li><li>Each stage reads from a different lakehouse.</li><li>Finance reports must be marked as officially approved by the finance team.</li></ul>",
      "options": [
        "As a Power BI project (.pbip)",
        "As a template (.pbit)",
        "As a .pbix file",
        "As a data source file (.pbids)"
      ],
      "correct": 0,
      "module": 8,
      "explanation": "A .pbip project stores the model and report as folders of text files that work well with Git. A .pbix is a single binary file."
    },
    {
      "id": "dp600-8-010",
      "text": "Each stage must read from a different lakehouse after deployment. What should you configure?",
      "case": "c3",
      "caseTitle": "Northwind Finance",
      "scenario": "Northwind Finance develops semantic models and reports in a Dev workspace, with Test and Prod workspaces after it.<ul><li>Changes must be reviewable as text diffs in Azure DevOps.</li><li>Each stage reads from a different lakehouse.</li><li>Finance reports must be marked as officially approved by the finance team.</li></ul>",
      "options": [
        "Deployment rules in the deployment pipeline",
        "A separate Git branch per stage",
        "A sensitivity label per stage",
        "Row-level security per stage"
      ],
      "correct": 0,
      "module": 8,
      "explanation": "Deployment rules (data source and parameter rules) change connections per stage when content is deployed. Microsoft now recommends variable libraries as the first choice for environment-specific settings; deployment rules remain valid."
    },
    {
      "id": "dp600-8-011",
      "text": "Which statement about certifying the finance reports is true?",
      "case": "c3",
      "caseTitle": "Northwind Finance",
      "scenario": "Northwind Finance develops semantic models and reports in a Dev workspace, with Test and Prod workspaces after it.<ul><li>Changes must be reviewable as text diffs in Azure DevOps.</li><li>Each stage reads from a different lakehouse.</li><li>Finance reports must be marked as officially approved by the finance team.</li></ul>",
      "options": [
        "Only users in groups that the Fabric admin has authorized can certify items",
        "Any user with Read permission can certify an item",
        "Certification restricts access to the item to the finance team",
        "Certification requires a sensitivity label"
      ],
      "correct": 0,
      "module": 8,
      "explanation": "The tenant setting limits certification to specific users or security groups. Endorsement is a badge; it does not change access."
    },
    {
      "id": "dp600-8-012",
      "text": "For each statement, select Yes if it is true.",
      "type": "yesno",
      "case": "c3",
      "caseTitle": "Northwind Finance",
      "scenario": "Northwind Finance develops semantic models and reports in a Dev workspace, with Test and Prod workspaces after it.<ul><li>Changes must be reviewable as text diffs in Azure DevOps.</li><li>Each stage reads from a different lakehouse.</li><li>Finance reports must be marked as officially approved by the finance team.</li></ul>",
      "options": [
        "A workspace can be connected to only one Git branch at a time.",
        "Git integration tracks item definitions, not the data inside the items.",
        "Deploying through a pipeline copies the data from Dev to Prod.",
        "Endorsement badges change who can access an item."
      ],
      "correct": [
        true,
        true,
        false,
        false
      ],
      "module": 8,
      "explanation": "A workspace syncs with one branch. Git and deployment pipelines move definitions, so Prod needs its own refresh. Endorsement is metadata and does not change permissions."
    },
    {
      "id": "dp600-8-013",
      "text": "You need to model the many-to-many relationship between customers and accounts. What should you do?",
      "case": "c4",
      "caseTitle": "Adventure Works",
      "scenario": "Adventure Works has a star schema with FactSales, DimDate, DimProduct, DimCustomer and DimAccount.<ul><li>DimDate is marked as the date table.</li><li>A customer can hold many accounts, and an account can have many customers.</li><li>Analysts need Year-to-date, Prior-year and Year-over-year versions of about 20 measures.</li><li>Some measures are slow and use nested FILTER calls over FactSales.</li></ul>",
      "options": [
        "Add a bridge table with one-to-many relationships from DimCustomer and DimAccount to the bridge",
        "Merge DimCustomer and DimAccount into one table",
        "Create a many-to-many relationship directly on FactSales",
        "Duplicate the account rows for every customer in DimAccount"
      ],
      "correct": 0,
      "module": 8,
      "explanation": "A bridge table with a row per customer and account pair resolves the many-to-many with two one-to-many relationships."
    },
    {
      "id": "dp600-8-014",
      "text": "Which measure returns year-to-date sales, given that [Total Sales] exists?",
      "case": "c4",
      "caseTitle": "Adventure Works",
      "scenario": "Adventure Works has a star schema with FactSales, DimDate, DimProduct, DimCustomer and DimAccount.<ul><li>DimDate is marked as the date table.</li><li>A customer can hold many accounts, and an account can have many customers.</li><li>Analysts need Year-to-date, Prior-year and Year-over-year versions of about 20 measures.</li><li>Some measures are slow and use nested FILTER calls over FactSales.</li></ul>",
      "options": [
        "TOTALYTD([Total Sales], DimDate[Date])",
        "TOTALYTD([Total Sales], FactSales[OrderDate])",
        "CALCULATE([Total Sales], DATESMTD(DimDate[Date]))",
        "SUM(FactSales[Amount]) + YEAR(TODAY())"
      ],
      "correct": 0,
      "module": 8,
      "explanation": "Time-intelligence functions should use the marked date table column. DATESMTD is month to date, and the last option is not a valid YTD calculation."
    },
    {
      "id": "dp600-8-015",
      "text": "You need YTD, Prior-year and YoY versions of about 20 measures without writing 60 measures. What should you create?",
      "case": "c4",
      "caseTitle": "Adventure Works",
      "scenario": "Adventure Works has a star schema with FactSales, DimDate, DimProduct, DimCustomer and DimAccount.<ul><li>DimDate is marked as the date table.</li><li>A customer can hold many accounts, and an account can have many customers.</li><li>Analysts need Year-to-date, Prior-year and Year-over-year versions of about 20 measures.</li><li>Some measures are slow and use nested FILTER calls over FactSales.</li></ul>",
      "options": [
        "A calculation group with items that use SELECTEDMEASURE()",
        "A field parameter listing the 20 measures",
        "A calculated table for each time period",
        "60 calculated columns"
      ],
      "correct": 0,
      "module": 8,
      "explanation": "Calculation items apply to whichever measure is in context through SELECTEDMEASURE(). A field parameter only switches which field a visual shows."
    },
    {
      "id": "dp600-8-016",
      "text": "For each statement, select Yes if it is true.",
      "type": "yesno",
      "case": "c4",
      "caseTitle": "Adventure Works",
      "scenario": "Adventure Works has a star schema with FactSales, DimDate, DimProduct, DimCustomer and DimAccount.<ul><li>DimDate is marked as the date table.</li><li>A customer can hold many accounts, and an account can have many customers.</li><li>Analysts need Year-to-date, Prior-year and Year-over-year versions of about 20 measures.</li><li>Some measures are slow and use nested FILTER calls over FactSales.</li></ul>",
      "options": [
        "A DAX variable is evaluated once and can be reused in the measure.",
        "FILTER over a whole fact table is usually slower than a simple column predicate in CALCULATE.",
        "DIVIDE should be avoided because it is much slower than the / operator.",
        "Iterators such as SUMX over very large tables can be slower than SUM."
      ],
      "correct": [
        true,
        true,
        false,
        true
      ],
      "module": 8,
      "explanation": "Variables avoid repeated evaluation, and column predicates let the engine filter without iterating rows. DIVIDE is fine and safely handles division by zero."
    },
    {
      "id": "dp600-8-017",
      "text": "For incremental refresh to be efficient, what must be true of the filter on the date column?",
      "case": "c5",
      "caseTitle": "Tailspin Toys",
      "scenario": "Tailspin Toys has an Import-mode semantic model over a 400-million-row fact table in a Fabric warehouse.<ul><li>A full refresh takes six hours, but only the last three days of rows ever change.</li><li>The model is expected to grow beyond 10 GB.</li><li>The team refreshes single partitions from a pipeline by using external tools.</li></ul>",
      "options": [
        "It uses the RangeStart and RangeEnd parameters and folds to the source",
        "It is applied in DAX after the data loads",
        "It uses a text parameter named Period",
        "It is applied by a calculated column"
      ],
      "correct": 0,
      "module": 8,
      "explanation": "The Power Query filter on RangeStart and RangeEnd must fold so the source only returns the partition being refreshed."
    },
    {
      "id": "dp600-8-018",
      "text": "The model will exceed 10 GB. Which setting should you enable?",
      "case": "c5",
      "caseTitle": "Tailspin Toys",
      "scenario": "Tailspin Toys has an Import-mode semantic model over a 400-million-row fact table in a Fabric warehouse.<ul><li>A full refresh takes six hours, but only the last three days of rows ever change.</li><li>The model is expected to grow beyond 10 GB.</li><li>The team refreshes single partitions from a pipeline by using external tools.</li></ul>",
      "options": [
        "Large semantic model storage format",
        "Query scale-out",
        "Automatic page refresh",
        "Direct Lake fallback"
      ],
      "correct": 0,
      "module": 8,
      "explanation": "The large semantic model storage format lets a model grow beyond the default size limit and improves XMLA write operations."
    },
    {
      "id": "dp600-8-019",
      "text": "The team will refresh single partitions with external tools. What do they need on the capacity?",
      "case": "c5",
      "caseTitle": "Tailspin Toys",
      "scenario": "Tailspin Toys has an Import-mode semantic model over a 400-million-row fact table in a Fabric warehouse.<ul><li>A full refresh takes six hours, but only the last three days of rows ever change.</li><li>The model is expected to grow beyond 10 GB.</li><li>The team refreshes single partitions from a pipeline by using external tools.</li></ul>",
      "options": [
        "The XMLA endpoint set to read-write",
        "The XMLA endpoint set to read-only",
        "Dataflow Gen2 enabled",
        "Git integration enabled"
      ],
      "correct": 0,
      "module": 8,
      "explanation": "Partition-level refresh and other write operations through external tools need the XMLA endpoint in read-write mode."
    },
    {
      "id": "dp600-8-020",
      "text": "For each statement, select Yes if it is true.",
      "type": "yesno",
      "case": "c5",
      "caseTitle": "Tailspin Toys",
      "scenario": "Tailspin Toys has an Import-mode semantic model over a 400-million-row fact table in a Fabric warehouse.<ul><li>A full refresh takes six hours, but only the last three days of rows ever change.</li><li>The model is expected to grow beyond 10 GB.</li><li>The team refreshes single partitions from a pipeline by using external tools.</li></ul>",
      "options": [
        "RangeStart and RangeEnd must be Date/Time parameters.",
        "Incremental refresh partitions are created in Power BI Desktop when you publish.",
        "The filter should include one boundary and exclude the other (>= RangeStart and < RangeEnd).",
        "Incremental refresh has no performance cost when the filter does not fold."
      ],
      "correct": [
        true,
        false,
        true,
        false
      ],
      "module": 8,
      "explanation": "The parameters are Date/Time. Partitions are created in the service during the first refresh. Using >= and < avoids duplicates at the boundary. Without folding, the whole table is read on each partition."
    },
    {
      "id": "dp600-8-021",
      "text": "Put the steps to connect a workspace to a Git repository in the correct order.",
      "type": "ordering",
      "options": [
        "Open the workspace settings and select Git integration",
        "Choose the Git provider and sign in",
        "Select the organization, project, repository, branch and folder",
        "Select Connect and sync",
        "Choose the sync direction for the first commit or update"
      ],
      "module": 8,
      "explanation": "You open Git integration, pick the provider, point at the repository, branch and folder, connect, then resolve the first sync."
    },
    {
      "id": "dp600-8-022",
      "text": "Put the steps to set up incremental refresh in the correct order.",
      "type": "ordering",
      "options": [
        "Create the RangeStart and RangeEnd Date/Time parameters",
        "Filter the date column by using the parameters in Power Query",
        "Load the table and define the incremental refresh policy",
        "Publish the model to the service",
        "Run the first refresh to create the partitions"
      ],
      "module": 8,
      "explanation": "Parameters and the filter come first, then the policy, then publish. The service builds the partitions on the first refresh."
    },
    {
      "id": "dp600-8-023",
      "text": "Put the steps to promote content through a deployment pipeline in the correct order.",
      "type": "ordering",
      "options": [
        "Create the deployment pipeline",
        "Assign the Dev workspace to the first stage",
        "Assign the Test and Prod workspaces to the later stages",
        "Configure deployment rules for the Test stage",
        "Deploy from Dev to Test and validate",
        "Deploy from Test to Prod"
      ],
      "module": 8,
      "explanation": "Create the pipeline and assign a workspace to each stage. Rules are set on the target stage, so its workspace must be assigned first, and they only take effect on the next deployment. Then deploy to Test, validate, and deploy to Prod."
    },
    {
      "id": "dp600-8-024",
      "text": "Put the steps to build a time-intelligence calculation group in the correct order.",
      "type": "ordering",
      "options": [
        "Open Model view in Power BI Desktop",
        "Create a new calculation group",
        "Add calculation items that use SELECTEDMEASURE()",
        "Set the calculation item order and format strings",
        "Test the group in a visual"
      ],
      "module": 8,
      "explanation": "Create the group in Model view, add items, order and format them, then test."
    },
    {
      "id": "dp600-8-025",
      "text": "Put the parts of this KQL query in the correct order: it should return the 10 busiest trucks in the last day.",
      "type": "ordering",
      "options": [
        "Telemetry",
        "| where Timestamp > ago(1d)",
        "| summarize Events = count() by TruckId",
        "| top 10 by Events desc"
      ],
      "module": 8,
      "explanation": "Start from the table, filter, aggregate, then take the top rows."
    },
    {
      "id": "dp600-8-026",
      "text": "Put the T-SQL clauses in the order the database logically processes them.",
      "type": "ordering",
      "options": [
        "FROM",
        "WHERE",
        "GROUP BY",
        "HAVING",
        "SELECT",
        "ORDER BY"
      ],
      "module": 8,
      "explanation": "Logical processing is FROM, WHERE, GROUP BY, HAVING, SELECT, ORDER BY. This is why a column alias from SELECT can be used in ORDER BY but not in WHERE."
    },
    {
      "id": "dp600-8-027",
      "text": "Put the steps to build a star schema in the correct order.",
      "type": "ordering",
      "options": [
        "Identify the business process and the grain of the fact table",
        "Identify the dimensions that describe the facts",
        "Create dimension tables with surrogate keys",
        "Build the fact table by looking up the surrogate keys",
        "Create relationships in the semantic model"
      ],
      "module": 8,
      "explanation": "Decide the grain first, build dimensions and keys, then load the fact table and relate them."
    },
    {
      "id": "dp600-8-028",
      "text": "Put the events in the order they happen when a Direct Lake model serves a query after new data arrives.",
      "type": "ordering",
      "options": [
        "New data is written to the Delta table",
        "The model is refreshed (framing) to point at the latest files",
        "A visual sends a query to the model",
        "The columns the query needs are loaded into memory",
        "Later queries use the columns already in memory"
      ],
      "module": 8,
      "explanation": "Framing only repoints the model. Columns are loaded on demand when first queried, and then cached."
    },
    {
      "id": "dp600-8-029",
      "text": "Put the steps to load data into a lakehouse with Dataflow Gen2 in the correct order.",
      "type": "ordering",
      "options": [
        "Create the lakehouse",
        "Create a Dataflow Gen2 and connect to the source",
        "Apply the transformations",
        "Set the lakehouse as the data destination",
        "Publish and refresh the dataflow"
      ],
      "module": 8,
      "explanation": "The destination must exist before you can select it, and the dataflow loads data only when published and refreshed."
    },
    {
      "id": "dp600-8-030",
      "text": "Put the steps to set up row-level security on a semantic model in the correct order.",
      "type": "ordering",
      "options": [
        "Create the roles and DAX filters in Power BI Desktop",
        "Test the roles with View as",
        "Publish the model to the service",
        "Add users or groups to each role"
      ],
      "module": 8,
      "explanation": "Define and test the roles before publishing, then assign members in the service."
    },
    {
      "id": "dp600-8-031",
      "text": "For each statement about workspace roles, select Yes if it is true.",
      "type": "yesno",
      "options": [
        "An Admin can delete the workspace.",
        "A Viewer can edit a notebook.",
        "A Contributor can add users to the workspace.",
        "A Member can add Contributors and Viewers."
      ],
      "correct": [
        true,
        false,
        false,
        true
      ],
      "module": 8,
      "explanation": "Admins can delete a workspace. Viewers are read-only. Adding people needs Member or Admin."
    },
    {
      "id": "dp600-8-032",
      "text": "For each statement, select Yes if it is true.",
      "type": "yesno",
      "options": [
        "Sensitivity labels come from Microsoft Purview Information Protection.",
        "Anyone with write permission can promote an item.",
        "Endorsement hides an item from users who lack access.",
        "Certified status can only be given by authorized users."
      ],
      "correct": [
        true,
        true,
        false,
        true
      ],
      "module": 8,
      "explanation": "Labels are defined in Purview. Promotion is open to item owners and writers, certification is limited to authorized groups, and endorsement never changes access."
    },
    {
      "id": "dp600-8-033",
      "text": "For each statement about storage modes, select Yes if it is true.",
      "type": "yesno",
      "options": [
        "Import tables can be refreshed on a schedule.",
        "DirectQuery models cache the data in memory.",
        "A Dual table can act as Import or DirectQuery depending on the query.",
        "Direct Lake reads Delta tables from OneLake."
      ],
      "correct": [
        true,
        false,
        true,
        true
      ],
      "module": 8,
      "explanation": "DirectQuery sends queries to the source rather than caching data."
    },
    {
      "id": "dp600-8-034",
      "text": "For each statement about joins, select Yes if it is true.",
      "type": "yesno",
      "options": [
        "A left anti join returns left rows with no match on the right.",
        "An inner join returns unmatched rows from the left table.",
        "A full outer join returns all rows from both tables.",
        "A cross join needs an ON clause."
      ],
      "correct": [
        true,
        false,
        true,
        false
      ],
      "module": 8,
      "explanation": "Inner joins drop unmatched rows, and cross joins return every combination so they have no ON clause."
    },
    {
      "id": "dp600-8-035",
      "text": "For each statement about nulls and duplicates in T-SQL, select Yes if it is true.",
      "type": "yesno",
      "options": [
        "COUNT(column) ignores NULL values.",
        "COUNT(*) counts every row, including rows with NULL values.",
        "SELECT DISTINCT removes duplicate rows from the result.",
        "WHERE Column = NULL returns the rows where the column is NULL."
      ],
      "correct": [
        true,
        true,
        true,
        false
      ],
      "module": 8,
      "explanation": "COUNT(column) skips NULLs, COUNT(*) counts every row, and DISTINCT removes duplicates. Comparing with = NULL is never true; use IS NULL."
    },
    {
      "id": "dp600-8-036",
      "text": "For each statement about security in a Fabric warehouse, select Yes if it is true.",
      "type": "yesno",
      "options": [
        "Dynamic data masking changes how data is shown without changing the stored data.",
        "Users granted UNMASK see the original values.",
        "Column-level security uses GRANT or DENY on columns.",
        "Dynamic data masking is a substitute for encryption."
      ],
      "correct": [
        true,
        true,
        true,
        false
      ],
      "module": 8,
      "explanation": "Masking is applied at query time and is not encryption."
    },
    {
      "id": "dp600-8-037",
      "text": "For each statement about composite models, select Yes if it is true.",
      "type": "yesno",
      "options": [
        "A composite model can combine Import and DirectQuery tables.",
        "A composite model can extend a published semantic model with extra tables.",
        "Composite models cannot use aggregations.",
        "A relationship across source groups is a limited (weak) relationship."
      ],
      "correct": [
        true,
        true,
        false,
        true
      ],
      "module": 8,
      "explanation": "Aggregation tables are a common composite-model feature, and relationships that span sources are limited."
    },
    {
      "id": "dp600-8-038",
      "text": "For each statement about Direct Lake, select Yes if it is true.",
      "type": "yesno",
      "options": [
        "Both flavors read Delta tables from OneLake.",
        "Direct Lake on the SQL analytics endpoint can fall back to DirectQuery.",
        "Direct Lake on OneLake falls back to DirectQuery.",
        "Direct Lake on the SQL analytics endpoint reads views in Direct Lake mode."
      ],
      "correct": [
        true,
        true,
        false,
        false
      ],
      "module": 8,
      "explanation": "Only the SQL analytics endpoint flavor can fall back. Views are not read in Direct Lake mode."
    },
    {
      "id": "dp600-8-039",
      "text": "For each statement about the visual query editor, select Yes if it is true.",
      "type": "yesno",
      "options": [
        "It is available in a warehouse.",
        "It is available in a lakehouse SQL analytics endpoint.",
        "You can save a query built in it as a view.",
        "You can run INSERT and UPDATE statements with it."
      ],
      "correct": [
        true,
        true,
        true,
        false
      ],
      "module": 8,
      "explanation": "The visual query editor builds read-only SELECT queries, which can be saved as views."
    },
    {
      "id": "dp600-8-040",
      "text": "For each statement about choosing a data store, select Yes if it is true.",
      "type": "yesno",
      "options": [
        "A warehouse supports multi-table transactions.",
        "The lakehouse SQL analytics endpoint is read-only for T-SQL data changes.",
        "A warehouse stores its data as Delta tables in OneLake.",
        "You can INSERT into a lakehouse table through its SQL analytics endpoint."
      ],
      "correct": [
        true,
        true,
        true,
        false
      ],
      "module": 8,
      "explanation": "Use a warehouse for T-SQL writes and transactions. Lakehouse tables are written with Spark, pipelines or dataflows."
    }
  ];

  if (typeof window.__dp600 === 'undefined') {
    window.__dp600 = { modules: [], questions: [] };
  }

  window.__dp600.questions = window.__dp600.questions.concat(questions);

  if (window.__dp600.modules.length < 8) {
    window.__dp600.modules[7] = "Module 8: Exam-Format Questions";
  }
})();
