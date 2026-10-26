// Module 9: Multi-select, complete-the-code and Prepare-data depth questions
(function() {
  var questions = [
    {
      "id": "dp600-9-001",
      "text": "Which TWO workspace roles can add other people to a workspace (at the same or a lower level)? Select two.",
      "type": "multi",
      "options": [
        "Admin",
        "Member",
        "Contributor",
        "Viewer"
      ],
      "correct": [
        0,
        1
      ],
      "module": 9,
      "explanation": "Admin and Member can add people. Contributors and Viewers cannot."
    },
    {
      "id": "dp600-9-002",
      "text": "A user must open only one warehouse and nothing else in the workspace. Which TWO actions meet this? Select two.",
      "type": "multi",
      "options": [
        "Share the warehouse with the user",
        "Make the user a workspace Viewer",
        "Grant the user permissions on the warehouse item",
        "Make the user a Member of the workspace"
      ],
      "correct": [
        0,
        2
      ],
      "module": 9,
      "explanation": "Item sharing and item permissions scope access to one item. A workspace role gives access to every item in the workspace."
    },
    {
      "id": "dp600-9-003",
      "text": "Analysts must see only rows for their own region and must not read the Salary column in a warehouse table. Which TWO features do this? Select two.",
      "type": "multi",
      "options": [
        "A row-level security policy",
        "Column-level security with GRANT on the allowed columns",
        "A sensitivity label on the warehouse",
        "Certified endorsement on the warehouse"
      ],
      "correct": [
        0,
        1
      ],
      "module": 9,
      "explanation": "Row-level security filters rows and column-level security limits columns. Labels and endorsement do not filter data."
    },
    {
      "id": "dp600-9-004",
      "text": "Which TWO statements about endorsement are true? Select two.",
      "type": "multi",
      "options": [
        "Users with write permission on an item can promote it",
        "Only users authorized by the Fabric admin can certify an item",
        "Certification restricts who can open the item",
        "Promoted items are automatically certified after 30 days"
      ],
      "correct": [
        0,
        1
      ],
      "module": 9,
      "explanation": "Promotion is open to people with write access, certification is limited to authorized groups, and endorsement never changes access."
    },
    {
      "id": "dp600-9-005",
      "text": "Which TWO Git providers can you connect a Fabric workspace to? Select two.",
      "type": "multi",
      "options": [
        "Azure DevOps",
        "GitHub",
        "Bitbucket",
        "GitLab"
      ],
      "correct": [
        0,
        1
      ],
      "module": 9,
      "explanation": "Fabric Git integration supports Azure DevOps and GitHub."
    },
    {
      "id": "dp600-9-006",
      "text": "Which TWO statements about the Power BI project (.pbip) format are true? Select two.",
      "type": "multi",
      "options": [
        "The report and the semantic model are saved in separate folders",
        "The model definition can be stored as text (TMDL)",
        "The imported data is saved as CSV files in the project",
        "The project can only be opened in the Power BI service"
      ],
      "correct": [
        0,
        1
      ],
      "module": 9,
      "explanation": "A .pbip creates .Report and .SemanticModel folders of text files. Imported data is not stored as CSV, and the project opens in Desktop."
    },
    {
      "id": "dp600-9-007",
      "text": "Which TWO things can you do in a deployment pipeline? Select two.",
      "type": "multi",
      "options": [
        "Compare the content of two stages before deploying",
        "Deploy selected items instead of the whole stage",
        "Copy the data of a semantic model from Dev to Prod",
        "Run the pipeline without any workspace assigned"
      ],
      "correct": [
        0,
        1
      ],
      "module": 9,
      "explanation": "Pipelines compare stages and support selective deployment. They move definitions, not data."
    },
    {
      "id": "dp600-9-008",
      "text": "Which TWO features show the downstream dependencies of a lakehouse? Select two.",
      "type": "multi",
      "options": [
        "Lineage view",
        "Impact analysis",
        "Deployment rules",
        "Capacity metrics app"
      ],
      "correct": [
        0,
        1
      ],
      "module": 9,
      "explanation": "Lineage view and impact analysis show what depends on an item."
    },
    {
      "id": "dp600-9-009",
      "text": "Which TWO tools can connect to a semantic model through the XMLA endpoint? Select two.",
      "type": "multi",
      "options": [
        "SQL Server Management Studio",
        "Tabular Editor",
        "Azure Storage Explorer",
        "OneLake file explorer"
      ],
      "correct": [
        0,
        1
      ],
      "module": 9,
      "explanation": "SSMS and Tabular Editor are XMLA clients. The storage tools read files, not models."
    },
    {
      "id": "dp600-9-010",
      "text": "Which TWO file types hold reusable assets without any report data? Select two.",
      "type": "multi",
      "options": [
        ".pbit (template)",
        ".pbids (data source file)",
        ".pbix (report with data)",
        ".parquet"
      ],
      "correct": [
        0,
        1
      ],
      "module": 9,
      "explanation": "A .pbit has the report and model without data, and a .pbids holds only connection details."
    },
    {
      "id": "dp600-9-011",
      "text": "Which TWO sources typically need an on-premises data gateway when used from a pipeline or Dataflow Gen2? Select two.",
      "type": "multi",
      "options": [
        "SQL Server on a corporate network",
        "A file share on a corporate network",
        "A public Azure Blob container",
        "A public REST API on the internet"
      ],
      "correct": [
        0,
        1
      ],
      "module": 9,
      "explanation": "Sources inside a private network need a gateway. Public cloud endpoints do not."
    },
    {
      "id": "dp600-9-012",
      "text": "Which TWO Fabric features help you discover data? Select two.",
      "type": "multi",
      "options": [
        "OneLake catalog",
        "Real-Time hub",
        "Deployment rules",
        "Git integration"
      ],
      "correct": [
        0,
        1
      ],
      "module": 9,
      "explanation": "OneLake catalog lists items and data, and Real-Time hub lists streams."
    },
    {
      "id": "dp600-9-013",
      "text": "Which TWO options copy source data into OneLake? Select two.",
      "type": "multi",
      "options": [
        "A Copy activity in a data pipeline",
        "A Dataflow Gen2 with a lakehouse destination",
        "A OneLake shortcut",
        "A Direct Lake semantic model"
      ],
      "correct": [
        0,
        1
      ],
      "module": 9,
      "explanation": "Copy activities and dataflows write a copy. A shortcut references data in place and a semantic model does not ingest data."
    },
    {
      "id": "dp600-9-014",
      "text": "Which TWO requirements point to a warehouse rather than a lakehouse? Select two.",
      "type": "multi",
      "options": [
        "Multi-table transactions with T-SQL",
        "A team that writes T-SQL stored procedures to load data",
        "Storing raw image files",
        "Notebook-based machine learning on unstructured data"
      ],
      "correct": [
        0,
        1
      ],
      "module": 9,
      "explanation": "Warehouses suit T-SQL development and transactions. Files and Spark-heavy work suit a lakehouse."
    },
    {
      "id": "dp600-9-015",
      "text": "Which TWO sources can be exposed as Delta tables in OneLake? Select two.",
      "type": "multi",
      "options": [
        "Tables in a KQL database with OneLake availability enabled",
        "Import tables in a semantic model with OneLake integration",
        "DirectQuery tables in a semantic model",
        "Power BI dashboards"
      ],
      "correct": [
        0,
        1
      ],
      "module": 9,
      "explanation": "OneLake availability covers KQL tables and OneLake integration covers import tables of semantic models."
    },
    {
      "id": "dp600-9-016",
      "text": "Which TWO objects can you create in the SQL analytics endpoint of a lakehouse? Select two.",
      "type": "multi",
      "options": [
        "A view",
        "A stored procedure",
        "A table with CREATE TABLE",
        "Rows with INSERT"
      ],
      "correct": [
        0,
        1
      ],
      "module": 9,
      "explanation": "The endpoint supports views, functions and stored procedures, but it is read-only for tables and data."
    },
    {
      "id": "dp600-9-017",
      "text": "Which TWO T-SQL functions replace NULL values with another value? Select two.",
      "type": "multi",
      "options": [
        "COALESCE",
        "ISNULL",
        "NULLIF",
        "COUNT"
      ],
      "correct": [
        0,
        1
      ],
      "module": 9,
      "explanation": "COALESCE and ISNULL substitute a value. NULLIF does the reverse: it returns NULL when two values match."
    },
    {
      "id": "dp600-9-018",
      "text": "Which TWO join types return rows from the left table that have no match in the right table? Select two.",
      "type": "multi",
      "options": [
        "LEFT OUTER JOIN",
        "FULL OUTER JOIN",
        "INNER JOIN",
        "CROSS JOIN"
      ],
      "correct": [
        0,
        1
      ],
      "module": 9,
      "explanation": "Outer joins keep unmatched rows. Inner joins drop them and cross joins have no match condition."
    },
    {
      "id": "dp600-9-019",
      "text": "Which TWO T-SQL functions convert a value to another data type? Select two.",
      "type": "multi",
      "options": [
        "CAST",
        "TRY_CONVERT",
        "TO_TYPE",
        "CHANGETYPE"
      ],
      "correct": [
        0,
        1
      ],
      "module": 9,
      "explanation": "CAST and TRY_CONVERT are T-SQL functions. TO_TYPE and CHANGETYPE do not exist."
    },
    {
      "id": "dp600-9-020",
      "text": "Which TWO KQL operators aggregate rows? Select two.",
      "type": "multi",
      "options": [
        "summarize",
        "count",
        "project",
        "where"
      ],
      "correct": [
        0,
        1
      ],
      "module": 9,
      "explanation": "summarize groups and aggregates, and count returns the number of rows. project picks columns and where filters."
    },
    {
      "id": "dp600-9-021",
      "text": "Which TWO designs resolve a many-to-many relationship between two dimensions? Select two.",
      "type": "multi",
      "options": [
        "A bridge table with one-to-many relationships to both dimensions",
        "A many-to-many relationship between the two tables",
        "A circular relationship through the fact table",
        "Duplicating the fact table rows"
      ],
      "correct": [
        0,
        1
      ],
      "module": 9,
      "explanation": "Use a bridge table or a many-to-many relationship. Circular relationships are not allowed and duplicating facts gives wrong totals."
    },
    {
      "id": "dp600-9-022",
      "text": "Which TWO DAX functions are iterators? Select two.",
      "type": "multi",
      "options": [
        "SUMX",
        "AVERAGEX",
        "SUM",
        "CALCULATE"
      ],
      "correct": [
        0,
        1
      ],
      "module": 9,
      "explanation": "The X functions evaluate an expression row by row. SUM aggregates a column and CALCULATE changes filter context."
    },
    {
      "id": "dp600-9-023",
      "text": "Which TWO things can a field parameter do? Select two.",
      "type": "multi",
      "options": [
        "Let users switch the measure shown in a visual",
        "Let users switch the field on a visual axis",
        "Apply row-level security",
        "Schedule a refresh"
      ],
      "correct": [
        0,
        1
      ],
      "module": 9,
      "explanation": "Field parameters let report users choose which fields a visual shows."
    },
    {
      "id": "dp600-9-024",
      "text": "Which TWO benefits come from the large semantic model storage format? Select two.",
      "type": "multi",
      "options": [
        "The model can grow beyond the default size limit",
        "XMLA write operations can be faster",
        "Row-level security is turned on",
        "DirectQuery is replaced by Import"
      ],
      "correct": [
        0,
        1
      ],
      "module": 9,
      "explanation": "The large format raises the size limit and improves XMLA write performance."
    },
    {
      "id": "dp600-9-025",
      "text": "Which TWO can be combined in a composite model? Select two.",
      "type": "multi",
      "options": [
        "An Import table and a DirectQuery table",
        "Tables from another published semantic model",
        "A dashboard tile",
        "A paginated report"
      ],
      "correct": [
        0,
        1
      ],
      "module": 9,
      "explanation": "Composite models mix storage modes and can extend a published semantic model."
    },
    {
      "id": "dp600-9-026",
      "text": "Which TWO changes reduce the load time of a report page? Select two.",
      "type": "multi",
      "options": [
        "Reduce the number of visuals on the page",
        "Avoid high-cardinality fields in visuals",
        "Add more slicers",
        "Turn on bi-directional filtering on every relationship"
      ],
      "correct": [
        0,
        1
      ],
      "module": 9,
      "explanation": "Fewer visuals and fewer distinct values mean fewer and cheaper queries."
    },
    {
      "id": "dp600-9-027",
      "text": "Which TWO changes improve DAX performance? Select two.",
      "type": "multi",
      "options": [
        "Store repeated sub-expressions in variables",
        "Use a Boolean column filter instead of FILTER over a whole table",
        "Nest iterators over the whole fact table",
        "Replace measures with calculated columns that use RELATEDTABLE"
      ],
      "correct": [
        0,
        1
      ],
      "module": 9,
      "explanation": "Variables avoid repeated evaluation and column filters let the engine skip row iteration."
    },
    {
      "id": "dp600-9-028",
      "text": "Which TWO conditions make a Direct Lake on SQL endpoint table fall back to DirectQuery? Select two.",
      "type": "multi",
      "options": [
        "The table is a SQL view",
        "The SQL analytics endpoint enforces row-level security on the table",
        "The table is a Delta table in the lakehouse",
        "The model has a calculation group"
      ],
      "correct": [
        0,
        1
      ],
      "module": 9,
      "explanation": "Views and endpoint-level security cannot be read in Direct Lake mode."
    },
    {
      "id": "dp600-9-029",
      "text": "Which TWO statements about Direct Lake on OneLake are true? Select two.",
      "type": "multi",
      "options": [
        "It does not depend on the SQL analytics endpoint",
        "It does not fall back to DirectQuery",
        "It reads SQL views directly",
        "It requires an on-premises gateway"
      ],
      "correct": [
        0,
        1
      ],
      "module": 9,
      "explanation": "It reads Delta files in OneLake directly and has no DirectQuery fallback."
    },
    {
      "id": "dp600-9-030",
      "text": "Which THREE steps are part of setting up incremental refresh? Select three.",
      "type": "multi",
      "options": [
        "Create RangeStart and RangeEnd Date/Time parameters",
        "Filter the date column by using the parameters",
        "Define the incremental refresh policy on the table",
        "Switch the table to DirectQuery",
        "Add a calculation group"
      ],
      "correct": [
        0,
        1,
        2
      ],
      "module": 9,
      "explanation": "Parameters, a filter that uses them, and a policy are the three parts."
    },
    {
      "id": "dp600-9-031",
      "text": "Complete the query so it returns only customers with total sales above 10,000.<pre>SELECT CustomerId, SUM(Amount) AS Total\nFROM dbo.Sales\nGROUP BY CustomerId\n<b>____</b> SUM(Amount) &gt; 10000;</pre>",
      "options": [
        "HAVING",
        "WHERE",
        "FILTER",
        "QUALIFY"
      ],
      "correct": 0,
      "module": 9,
      "explanation": "HAVING filters groups after aggregation. WHERE runs before grouping and cannot use SUM."
    },
    {
      "id": "dp600-9-032",
      "text": "Complete the window function so rows are numbered per customer, newest order first.<pre>SELECT OrderId,\n  ROW_NUMBER() OVER (PARTITION BY CustomerId <b>____</b> OrderDate DESC) AS rn\nFROM dbo.Orders;</pre>",
      "options": [
        "ORDER BY",
        "SORT BY",
        "GROUP BY",
        "ORDERED BY"
      ],
      "correct": 0,
      "module": 9,
      "explanation": "The OVER clause takes PARTITION BY and ORDER BY."
    },
    {
      "id": "dp600-9-033",
      "text": "Complete the KQL query to get average speed per truck.<pre>Telemetry\n| where Timestamp &gt; ago(1d)\n| <b>____</b> avg(Speed) by TruckId</pre>",
      "options": [
        "summarize",
        "group by",
        "aggregate",
        "stats"
      ],
      "correct": 0,
      "module": 9,
      "explanation": "summarize is the KQL aggregation operator."
    },
    {
      "id": "dp600-9-034",
      "text": "Complete the KQL query to add a Mph column while keeping all existing columns.<pre>Telemetry\n| <b>____</b> Mph = Kph * 0.621</pre>",
      "options": [
        "extend",
        "project",
        "summarize",
        "evaluate"
      ],
      "correct": 0,
      "module": 9,
      "explanation": "extend adds computed columns and keeps the rest. project would drop the others."
    },
    {
      "id": "dp600-9-035",
      "text": "Complete the measure so revenue is calculated row by row.<pre>Revenue = <b>____</b>(FactSales[Qty] * FactSales[Price])</pre>",
      "options": [
        "SUMX",
        "SUM",
        "COUNTX",
        "CALCULATE"
      ],
      "correct": 0,
      "module": 9,
      "explanation": "SUM accepts only a column. SUMX evaluates the expression for every row and adds the results."
    },
    {
      "id": "dp600-9-036",
      "text": "Complete the measure to return sales for the same period last year.<pre>Sales PY =\nCALCULATE([Total Sales], <b>____</b>(DimDate[Date]))</pre>",
      "options": [
        "SAMEPERIODLASTYEAR",
        "DATESYTD",
        "PREVIOUSDAY",
        "TOTALYTD"
      ],
      "correct": 0,
      "module": 9,
      "explanation": "SAMEPERIODLASTYEAR shifts the date filter back one year."
    },
    {
      "id": "dp600-9-037",
      "text": "Complete the measure so a zero or blank budget does not cause an error.<pre>Pct of Budget =\nVAR Actual = [Total Sales]\nRETURN <b>____</b>(Actual, [Budget])</pre>",
      "options": [
        "DIVIDE",
        "SUM",
        "COALESCE",
        "IFERROR"
      ],
      "correct": 0,
      "module": 9,
      "explanation": "DIVIDE handles division by zero and returns blank by default."
    },
    {
      "id": "dp600-9-038",
      "text": "Complete the statement to create a reusable load routine in a warehouse.<pre>CREATE <b>____</b> dbo.usp_LoadSales\nAS\nBEGIN\n  INSERT INTO dbo.FactSales SELECT * FROM stg.Sales;\nEND</pre>",
      "options": [
        "PROCEDURE",
        "FUNCTION",
        "VIEW",
        "SCHEMA"
      ],
      "correct": 0,
      "module": 9,
      "explanation": "Routines that run statements such as INSERT are stored procedures."
    },
    {
      "id": "dp600-9-039",
      "text": "Complete the query so only the latest row per OrderId is kept.<pre>WITH r AS (\n  SELECT *, ROW_NUMBER() OVER (\n    PARTITION BY OrderId ORDER BY LoadDate DESC) AS rn\n  FROM stg.Orders)\nSELECT * FROM r WHERE rn <b>____</b> 1;</pre>",
      "options": [
        "=",
        "&gt;",
        "&lt;&gt;",
        "&lt;"
      ],
      "correct": 0,
      "module": 9,
      "explanation": "The newest row per key gets rn = 1."
    },
    {
      "id": "dp600-9-040",
      "text": "Complete the PySpark code to change Amount to a decimal.<pre>df = df.withColumn(\"Amount\",\n  col(\"Amount\").<b>____</b>(\"decimal(18,2)\"))</pre>",
      "options": [
        "cast",
        "convert",
        "parse",
        "format"
      ],
      "correct": 0,
      "module": 9,
      "explanation": "Column.cast changes the data type."
    },
    {
      "id": "dp600-9-041",
      "text": "Complete the PySpark join to return orders that have no matching customer.<pre>orders.join(customers, \"CustomerId\", \"<b>____</b>\")</pre>",
      "options": [
        "left_anti",
        "inner",
        "full",
        "cross"
      ],
      "correct": 0,
      "module": 9,
      "explanation": "A left anti join returns rows from the left side with no match on the right."
    },
    {
      "id": "dp600-9-042",
      "text": "Complete the PySpark code to total Amount per Region.<pre>df.groupBy(\"Region\").<b>____</b>(sum(\"Amount\").alias(\"Total\"))</pre>",
      "options": [
        "agg",
        "apply",
        "reduce",
        "summarize"
      ],
      "correct": 0,
      "module": 9,
      "explanation": "groupBy returns grouped data, and agg applies aggregate functions."
    },
    {
      "id": "dp600-9-043",
      "text": "Complete the PySpark code to keep only rows with an email address.<pre>df = df.<b>____</b>(col(\"Email\").isNotNull())</pre>",
      "options": [
        "filter",
        "select",
        "drop",
        "withColumn"
      ],
      "correct": 0,
      "module": 9,
      "explanation": "filter (or where) keeps rows that satisfy a condition."
    },
    {
      "id": "dp600-9-044",
      "text": "Complete the Power Query M step to total Amount per Region.<pre>Table.<b>____</b>(Source, {\"Region\"},\n  {{\"Total\", each List.Sum([Amount]), type number}})</pre>",
      "options": [
        "Group",
        "Summarize",
        "GroupBy",
        "Aggregate"
      ],
      "correct": 0,
      "module": 9,
      "explanation": "Table.Group is the M function behind the Group By transform."
    },
    {
      "id": "dp600-9-045",
      "text": "Complete the DAX query so results are sorted by year.<pre>EVALUATE\nSUMMARIZECOLUMNS(DimDate[Year], \"Sales\", [Total Sales])\n<b>____</b> DimDate[Year]</pre>",
      "options": [
        "ORDER BY",
        "SORT BY",
        "ARRANGE",
        "SORTBY"
      ],
      "correct": 0,
      "module": 9,
      "explanation": "A DAX query sorts with ORDER BY after EVALUATE."
    },
    {
      "id": "dp600-9-046",
      "text": "Complete the measure to count distinct customers who bought.<pre>Customers = <b>____</b>(FactSales[CustomerKey])</pre>",
      "options": [
        "DISTINCTCOUNT",
        "COUNT",
        "COUNTROWS",
        "SUMX"
      ],
      "correct": 0,
      "module": 9,
      "explanation": "DISTINCTCOUNT counts unique values. COUNT counts every non-blank row."
    },
    {
      "id": "dp600-9-047",
      "text": "Several pipelines and dataflows must reuse the same stored credentials for one source. What do you create?",
      "options": [
        "A connection",
        "A shortcut",
        "A domain",
        "A deployment rule"
      ],
      "correct": 0,
      "module": 9,
      "explanation": "Connections store the source details and credentials and can be reused across items."
    },
    {
      "id": "dp600-9-048",
      "text": "A pipeline must read an Azure SQL database that is only reachable through a private endpoint, and you do not want to manage a VM. Which gateway fits?",
      "options": [
        "A virtual network data gateway",
        "An on-premises data gateway in personal mode",
        "No gateway; use a shortcut",
        "A deployment pipeline"
      ],
      "correct": 0,
      "module": 9,
      "explanation": "A virtual network data gateway runs as a managed service in your Azure network."
    },
    {
      "id": "dp600-9-049",
      "text": "Which item type stores the connection details and credentials Fabric uses to reach an external source?",
      "options": [
        "A connection",
        "A lakehouse",
        "A semantic model",
        "A workspace app"
      ],
      "correct": 0,
      "module": 9,
      "explanation": "Connections are managed under Manage connections and gateways."
    },
    {
      "id": "dp600-9-050",
      "text": "You need to find endorsed lakehouses across workspaces you can access. What do you use?",
      "options": [
        "OneLake catalog",
        "Real-Time hub",
        "Deployment pipelines",
        "The XMLA endpoint"
      ],
      "correct": 0,
      "module": 9,
      "explanation": "The OneLake catalog lets you browse and filter items such as endorsed lakehouses."
    },
    {
      "id": "dp600-9-051",
      "text": "You want to find and subscribe to streaming sources you can access. What do you use?",
      "options": [
        "Real-Time hub",
        "OneLake catalog",
        "Git integration",
        "Impact analysis"
      ],
      "correct": 0,
      "module": 9,
      "explanation": "Real-Time hub is the place to discover streams and set up consumers."
    },
    {
      "id": "dp600-9-052",
      "text": "You must copy data nightly from an on-premises database to a lakehouse on a schedule, with retries and notifications. Which item fits best?",
      "options": [
        "A data pipeline with a Copy activity",
        "A OneLake shortcut",
        "A semantic model",
        "A KQL queryset"
      ],
      "correct": 0,
      "module": 9,
      "explanation": "Pipelines orchestrate scheduled copies and handle retries and alerts."
    },
    {
      "id": "dp600-9-053",
      "text": "Analysts want a low-code way to clean data with Power Query and load it to a lakehouse. Which item fits best?",
      "options": [
        "Dataflow Gen2",
        "Eventstream",
        "Notebook",
        "Deployment pipeline"
      ],
      "correct": 0,
      "module": 9,
      "explanation": "Dataflow Gen2 is the Power Query item and can write to a lakehouse destination."
    },
    {
      "id": "dp600-9-054",
      "text": "You need to transform terabytes of files with custom PySpark code. Which item fits best?",
      "options": [
        "A notebook",
        "Dataflow Gen2",
        "The visual query editor",
        "A OneLake shortcut"
      ],
      "correct": 0,
      "module": 9,
      "explanation": "Notebooks run Spark code at scale."
    },
    {
      "id": "dp600-9-055",
      "text": "You want an Azure SQL database continuously replicated into OneLake without building pipelines. What do you use?",
      "options": [
        "Mirroring",
        "A shortcut to the database",
        "Dataflow Gen2 on a timer",
        "Impact analysis"
      ],
      "correct": 0,
      "module": 9,
      "explanation": "Mirroring replicates operational data into OneLake as Delta tables."
    },
    {
      "id": "dp600-9-056",
      "text": "A team keeps raw JSON and Parquet files and works mainly in Spark. Which store fits best?",
      "options": [
        "A lakehouse",
        "A warehouse",
        "An Eventhouse",
        "A SQL database in Fabric"
      ],
      "correct": 0,
      "module": 9,
      "explanation": "Lakehouses hold files and Delta tables and suit Spark."
    },
    {
      "id": "dp600-9-057",
      "text": "You need to store and query very large volumes of time-series log data with KQL. Which store fits best?",
      "options": [
        "An Eventhouse",
        "A warehouse",
        "A lakehouse",
        "A semantic model"
      ],
      "correct": 0,
      "module": 9,
      "explanation": "Eventhouses are optimized for streaming and time-series data queried with KQL."
    },
    {
      "id": "dp600-9-058",
      "text": "An application needs an operational (OLTP) database inside Fabric. Which item fits best?",
      "options": [
        "A SQL database",
        "A warehouse",
        "A lakehouse",
        "An Eventhouse"
      ],
      "correct": 0,
      "module": 9,
      "explanation": "SQL database in Fabric is built for transactional workloads."
    },
    {
      "id": "dp600-9-059",
      "text": "You want Import-mode tables of a semantic model to be readable as Delta tables by other engines. What do you enable?",
      "options": [
        "OneLake integration for semantic models",
        "Direct Lake fallback",
        "Large storage format only",
        "Incremental refresh"
      ],
      "correct": 0,
      "module": 9,
      "explanation": "OneLake integration exports the model's import tables to OneLake as Delta tables."
    },
    {
      "id": "dp600-9-060",
      "text": "You need a reusable, parameterized query that returns a table and can be used in a FROM clause. What do you create?",
      "options": [
        "An inline table-valued function",
        "A scalar function",
        "A schema",
        "A synonym"
      ],
      "correct": 0,
      "module": 9,
      "explanation": "A table-valued function returns a table and can be queried like one."
    },
    {
      "id": "dp600-9-061",
      "text": "Analysts should query a simple object instead of a four-table join. What do you create?",
      "options": [
        "A view",
        "An index",
        "A shortcut",
        "A role"
      ],
      "correct": 0,
      "module": 9,
      "explanation": "A view hides join logic behind a name."
    },
    {
      "id": "dp600-9-062",
      "text": "In Spark, how do you add a derived column to a DataFrame?",
      "options": [
        "withColumn",
        "select *",
        "dropDuplicates",
        "join"
      ],
      "correct": 0,
      "module": 9,
      "explanation": "withColumn adds or replaces a column with an expression."
    },
    {
      "id": "dp600-9-063",
      "text": "You need a FullName column built from FirstName and LastName in Dataflow Gen2. What do you add?",
      "options": [
        "A custom column",
        "A shortcut",
        "A deployment rule",
        "A sensitivity label"
      ],
      "correct": 0,
      "module": 9,
      "explanation": "Add column > Custom column lets you write the expression in M."
    },
    {
      "id": "dp600-9-064",
      "text": "In a star schema, which table holds numeric measures and foreign keys to the dimensions?",
      "options": [
        "The fact table",
        "A dimension table",
        "A bridge table",
        "A date table"
      ],
      "correct": 0,
      "module": 9,
      "explanation": "The fact table stores events and measures, and dimensions describe them."
    },
    {
      "id": "dp600-9-065",
      "text": "Why do dimension tables usually get surrogate keys?",
      "options": [
        "They stay stable even when source-system keys change or collide",
        "They are required for Direct Lake",
        "They compress text columns",
        "They replace relationships"
      ],
      "correct": 0,
      "module": 9,
      "explanation": "Surrogate keys decouple the warehouse from source keys and support history tracking."
    },
    {
      "id": "dp600-9-066",
      "text": "You flatten a snowflaked product hierarchy into one DimProduct table. What is this called?",
      "options": [
        "Denormalizing",
        "Normalizing",
        "Partitioning",
        "Mirroring"
      ],
      "correct": 0,
      "module": 9,
      "explanation": "Denormalizing reduces joins by merging related tables."
    },
    {
      "id": "dp600-9-067",
      "text": "What is the main query benefit of denormalizing dimensions?",
      "options": [
        "Fewer joins at query time",
        "Less storage for repeated values",
        "Fewer rows in the fact table",
        "Automatic row-level security"
      ],
      "correct": 0,
      "module": 9,
      "explanation": "Fewer joins make queries simpler and faster, at the cost of some repeated values."
    },
    {
      "id": "dp600-9-068",
      "text": "Reports on a billion-row fact table are slow even though they only need daily totals. What helps most?",
      "options": [
        "Create an aggregated daily summary table",
        "Add more slicers",
        "Turn on bi-directional filtering",
        "Switch to a smaller capacity"
      ],
      "correct": 0,
      "module": 9,
      "explanation": "A pre-aggregated table answers summary queries without scanning every row."
    },
    {
      "id": "dp600-9-069",
      "text": "In Dataflow Gen2, which merge join kind keeps only rows that match in both queries?",
      "options": [
        "Inner",
        "Left outer",
        "Full outer",
        "Left anti"
      ],
      "correct": 0,
      "module": 9,
      "explanation": "An inner join keeps matches only."
    },
    {
      "id": "dp600-9-070",
      "text": "In Spark, joining a very large table with a very small one, which hint avoids shuffling the large table?",
      "options": [
        "broadcast",
        "repartition",
        "cache",
        "coalesce"
      ],
      "correct": 0,
      "module": 9,
      "explanation": "A broadcast join sends the small table to every executor."
    },
    {
      "id": "dp600-9-071",
      "text": "Which PySpark call removes duplicate rows based on OrderId?",
      "options": [
        "dropDuplicates([\"OrderId\"])",
        "distinctAll(\"OrderId\")",
        "removeDuplicates(\"OrderId\")",
        "groupBy(\"OrderId\").drop()"
      ],
      "correct": 0,
      "module": 9,
      "explanation": "dropDuplicates takes the columns that define a duplicate."
    },
    {
      "id": "dp600-9-072",
      "text": "Which PySpark call replaces nulls in the Discount column with 0?",
      "options": [
        "fillna({\"Discount\": 0})",
        "dropna(\"Discount\")",
        "replace(None)",
        "isNull(\"Discount\")"
      ],
      "correct": 0,
      "module": 9,
      "explanation": "fillna substitutes values for nulls, while dropna removes rows."
    },
    {
      "id": "dp600-9-073",
      "text": "Which T-SQL function returns NULL instead of an error when a conversion fails?",
      "options": [
        "TRY_CAST",
        "CAST",
        "CONVERT",
        "FORMAT"
      ],
      "correct": 0,
      "module": 9,
      "explanation": "TRY_CAST and TRY_CONVERT return NULL on failure."
    },
    {
      "id": "dp600-9-074",
      "text": "In Power Query, dates arrive as text such as \"31/12/2026\" and fail to convert. What should you use?",
      "options": [
        "Change Type with Locale and the correct culture",
        "Sort the column",
        "Replace values with a space",
        "Remove duplicates"
      ],
      "correct": 0,
      "module": 9,
      "explanation": "The text format depends on the culture, so convert with the matching locale."
    },
    {
      "id": "dp600-9-075",
      "text": "In Dataflow Gen2, why is it good for a filter step to fold to the source?",
      "options": [
        "The source does the filtering, so less data is transferred",
        "It makes the data encrypted",
        "It creates a shortcut",
        "It adds a sensitivity label"
      ],
      "correct": 0,
      "module": 9,
      "explanation": "Query folding pushes the operation to the source system."
    },
    {
      "id": "dp600-9-076",
      "text": "In Spark, filtering on a partition column of a Delta table mainly helps because...",
      "options": [
        "Partitions that do not match are skipped",
        "The table becomes read-only",
        "The data is copied to a shortcut",
        "The schema is validated"
      ],
      "correct": 0,
      "module": 9,
      "explanation": "Partition pruning avoids reading files that cannot match."
    },
    {
      "id": "dp600-9-077",
      "text": "Which transform in the visual query editor sums values per category?",
      "options": [
        "Group by",
        "Append queries",
        "Remove columns",
        "Choose columns"
      ],
      "correct": 0,
      "module": 9,
      "explanation": "Group by aggregates rows by one or more columns."
    },
    {
      "id": "dp600-9-078",
      "text": "In the visual query editor, which transform stacks the rows of two tables with the same columns?",
      "options": [
        "Append queries",
        "Merge queries",
        "Group by",
        "Pivot"
      ],
      "correct": 0,
      "module": 9,
      "explanation": "Append adds rows, while merge joins columns."
    },
    {
      "id": "dp600-9-079",
      "text": "Which T-SQL expression counts unique customers?",
      "options": [
        "COUNT(DISTINCT CustomerId)",
        "DISTINCT COUNT(CustomerId)",
        "COUNT(*) DISTINCT",
        "UNIQUE(CustomerId)"
      ],
      "correct": 0,
      "module": 9,
      "explanation": "COUNT(DISTINCT column) ignores repeats."
    },
    {
      "id": "dp600-9-080",
      "text": "You need to reuse an intermediate result several times in one T-SQL query. What do you use?",
      "options": [
        "A common table expression (WITH)",
        "A shortcut",
        "A deployment rule",
        "A schema"
      ],
      "correct": 0,
      "module": 9,
      "explanation": "A CTE names an intermediate result that later parts of the query can reference."
    },
    {
      "id": "dp600-9-081",
      "text": "Which KQL operator returns 10 arbitrary rows without sorting?",
      "options": [
        "take 10",
        "top 10",
        "sort 10",
        "limit by 10"
      ],
      "correct": 0,
      "module": 9,
      "explanation": "take returns any rows. top sorts by a column and then returns the first rows."
    },
    {
      "id": "dp600-9-082",
      "text": "Which KQL operator returns the unique values of a column?",
      "options": [
        "distinct",
        "dedupe",
        "unique",
        "summarize all"
      ],
      "correct": 0,
      "module": 9,
      "explanation": "distinct returns the unique combinations of the listed columns."
    },
    {
      "id": "dp600-9-083",
      "text": "Which DAX function returns a grouped table with calculated columns in a DAX query?",
      "options": [
        "SUMMARIZECOLUMNS",
        "ROW",
        "LOOKUPVALUE",
        "RELATED"
      ],
      "correct": 0,
      "module": 9,
      "explanation": "SUMMARIZECOLUMNS groups by columns and adds measures or expressions."
    },
    {
      "id": "dp600-9-084",
      "text": "Which DAX function returns one value from another table by matching on a column, without a relationship?",
      "options": [
        "LOOKUPVALUE",
        "RELATED",
        "USERELATIONSHIP",
        "TREATAS"
      ],
      "correct": 0,
      "module": 9,
      "explanation": "LOOKUPVALUE searches a column for a match and does not need a relationship."
    }
  ];

  if (typeof window.__dp600 === 'undefined') {
    window.__dp600 = { modules: [], questions: [] };
  }

  window.__dp600.questions = window.__dp600.questions.concat(questions);

  if (window.__dp600.modules.length < 9) {
    window.__dp600.modules[8] = "Module 9: Multi-Select, Code and Prepare-Data Depth";
  }
})();
