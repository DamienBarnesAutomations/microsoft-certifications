// Module 3: Semantic Modeling & DAX
(function() {
  var questions = [
    {
      "id": "dp600-3-001",
      "text": "You have a Direct Lake semantic model that connects to a warehouse through its SQL analytics endpoint. Reports query a table that is based on a SQL view, and those queries are processed in DirectQuery mode. You need the table to be read in Direct Lake mode. What should you do?",
      "options": [
        "Set Direct Lake behavior to Direct Lake only",
        "Enable query scaleout on the semantic model",
        "Increase the capacity SKU",
        "Materialize the SQL view as a Delta table"
      ],
      "correct": 3,
      "module": 3,
      "explanation": "Direct Lake on SQL analytics endpoint falls back to DirectQuery when a table is based on a non-materialized SQL view. Materializing the view creates a Delta table, which Direct Lake can read directly. Setting Direct Lake only would make the query fail instead of reading Delta, and query scaleout or a larger SKU do not change the fallback cause."
    },
    {
      "id": "dp600-3-002",
      "text": "You have a semantic model with two relationships between FactSales and DimDate: an active relationship on FactSales[OrderDate] and an inactive relationship on FactSales[ShipDate]. You need a measure that totals sales by ship date. What should you use?",
      "options": [
        "TREATAS to override the active OrderDate relationship in the measure",
        "CROSSFILTER inside CALCULATE to activate the ShipDate relationship",
        "USERELATIONSHIP inside CALCULATE for the ShipDate relationship",
        "RELATEDTABLE to traverse the ShipDate relationship from the date table"
      ],
      "correct": 2,
      "module": 3,
      "explanation": "USERELATIONSHIP temporarily activates an inactive relationship for the duration of a CALCULATE expression, so the measure filters by ship date while the model keeps OrderDate as the active relationship. CROSSFILTER changes the filter direction of an existing relationship (or disables it); it cannot activate an inactive one."
    },
    {
      "id": "dp600-3-003",
      "text": "You have a semantic model with 20 base measures. Report authors want each measure available as year-to-date, prior-year, and year-over-year variants without you writing 60 separate measures. What should you create?",
      "options": [
        "A calculation group with time-intelligence items using SELECTEDMEASURE()",
        "A field parameter that lists every base measure",
        "A What-If parameter table with a slicer for the period",
        "A calculated column on the date table for each variant"
      ],
      "correct": 0,
      "module": 3,
      "explanation": "A calculation group applies a calculation item (for example CALCULATE(SELECTEDMEASURE(), DATESYTD(DimDate[Date]))) to any measure in the filter context, so one set of items covers all base measures. A field parameter only switches which field or measure is displayed, a What-If parameter produces a single numeric value, and calculated columns cannot change how measures are evaluated."
    },
    {
      "id": "dp600-3-004",
      "text": "You have a large Import-mode semantic model on a Fabric capacity. Historical data refreshes daily, but users need the current day's rows to be real time without moving the whole model to DirectQuery. What should you configure?",
      "options": [
        "Query scale-out with read-only replicas of the model",
        "Automatic page refresh on every report page with a short interval",
        "A scheduled refresh that runs every 30 minutes all day",
        "Incremental refresh with the real-time DirectQuery option enabled"
      ],
      "correct": 3,
      "module": 3,
      "explanation": "Incremental refresh can include a hybrid table: historical partitions stay in Import mode and the most recent partition is a DirectQuery partition, so the newest rows are always read live from the source. Scheduled refresh and automatic page refresh still depend on a refresh or re-query cycle, and query scale-out only distributes read load."
    },
    {
      "id": "dp600-3-005",
      "text": "You have a semantic model in a star schema with a [Total Sales] measure and a marked date table named DimDate. You need a measure that returns year-over-year growth of sales as a ratio. Which DAX expression is correct?",
      "options": [
        "DIVIDE([Total Sales] - CALCULATE([Total Sales], SAMEPERIODLASTYEAR(DimDate[Date])), CALCULATE([Total Sales], SAMEPERIODLASTYEAR(DimDate[Date])))",
        "DIVIDE([Total Sales], CALCULATE([Total Sales], DATEADD(DimDate[Date], 1, YEAR))) - 1",
        "CALCULATE([Total Sales], DATEADD(DimDate[Date], -1, YEAR)) / [Total Sales] - 1",
        "DIVIDE([Total Sales] - [Total Sales], CALCULATE([Total Sales], SAMEPERIODLASTYEAR(DimDate[Date])))"
      ],
      "correct": 0,
      "module": 3,
      "explanation": "Growth is (current - prior year) / prior year, and SAMEPERIODLASTYEAR returns the same dates one year earlier. The second option subtracts the measure from itself, so the numerator is always zero. The third option shifts the dates forward one year, so it divides by next year's sales. The fourth divides prior-year sales by current sales, which inverts the ratio."
    },
    {
      "id": "dp600-3-006",
      "text": "You need to implement Object-Level Security on a semantic model to restrict access to a table containing confidential product pricing. Users with the Viewer role should not be able to see the table or its columns. How should you configure OLS?",
      "options": [
        "Create a role in Tabular Editor that denies Read permission on the table",
        "Remove the table from the model's description and metadata",
        "Hide the table in Power BI Desktop and publish to the service",
        "Set the table's IsPrivate property to True in the model metadata"
      ],
      "correct": 0,
      "module": 3,
      "explanation": "Object-Level Security (OLS) is configured by creating a role in an external tool like Tabular Editor and setting the Read permission on the table to None (or Deny). Hiding the table only affects report view, not security. There is no IsPrivate property for OLS, and removing metadata does not restrict access."
    },
    {
      "id": "dp600-3-007",
      "text": "You create a native many-to-many cardinality relationship between FactSales and DimProductCategory on a column that is not unique in either table. Which statement about this relationship is TRUE?",
      "options": [
        "It can only be created in models that use DirectQuery mode",
        "Power BI adds a hidden bridge table that you must refresh",
        "It has no one side, so RELATED cannot return columns across it",
        "The engine guarantees unique keys on the category side of it"
      ],
      "correct": 2,
      "module": 3,
      "explanation": "A many-to-many cardinality relationship has no unique side, so RELATED (which requires a many-to-one direction) cannot retrieve values across it; use measures with filter propagation instead. Power BI creates no bridge table, does not enforce uniqueness, and the relationship works in Import mode as well."
    },
    {
      "id": "dp600-3-008",
      "text": "Report consumers must be able to change the thresholds that classify sales as High, Medium, or Low by using a slicer, without anyone editing the model. What is the BEST approach?",
      "options": [
        "A calculated column that uses SWITCH with hardcoded threshold values",
        "A calculated table that contains every possible threshold combination",
        "A calculated column that reads the slicer selection with SELECTEDVALUE",
        "A measure using SWITCH and SELECTEDVALUE on a What-If parameter table"
      ],
      "correct": 3,
      "module": 3,
      "explanation": "Measures are evaluated at query time, so they respond to slicer selections on a parameter table. Calculated columns are computed at refresh and cannot react to slicers, so the column that reads SELECTEDVALUE would not update, and a hardcoded SWITCH needs model edits to change. A table of every combination adds size without making the thresholds interactive."
    },
    {
      "id": "dp600-3-009",
      "text": "You have a Direct Lake semantic model over a lakehouse. A pipeline adds a new column to the underlying Delta table, but the column does not appear in the semantic model. What should you do?",
      "options": [
        "Enable Keep your Direct Lake data up to date",
        "Run a framing refresh of the semantic model",
        "Use Edit tables to refresh the table schema and add the column",
        "Recreate the SQL analytics endpoint of the lakehouse"
      ],
      "correct": 2,
      "module": 3,
      "explanation": "A Direct Lake model only exposes the columns that were added to it. Framing (refresh) repoints the model at the latest Delta version of columns it already has, but it does not change the model schema. Use Edit tables (web modeling or Power BI Desktop) to refresh the table schema and add the new column."
    },
    {
      "id": "dp600-3-010",
      "text": "You have a report where users want to switch the measure shown in a chart (Sales, Cost, Profit) by using a slicer, without creating one visual per measure. What should you create?",
      "options": [
        "A field parameter that lists the measures",
        "A What-If parameter with a numeric range of 1 to 3",
        "A calculated column that concatenates the measure names",
        "A calculation group with an item for each measure"
      ],
      "correct": 0,
      "module": 3,
      "explanation": "A field parameter creates a calculated table of fields or measures that a slicer can swap into a visual's axis or values. A calculation group changes how a measure is calculated rather than which measure is shown, and a numeric What-If parameter or concatenated column does not switch the displayed field."
    },
    {
      "id": "dp600-3-011",
      "text": "You have a semantic model whose 10-billion-row fact table is in DirectQuery mode, and summary queries by month are slow. You need to improve performance without importing the whole fact table. What should you do?",
      "options": [
        "Add an Import-mode month-grain aggregation table and map it with Manage aggregations",
        "Create a DAX calculated table that summarizes the DirectQuery fact table",
        "Increase the maximum connections per data source for the fact table",
        "Set the DirectQuery fact table to Dual storage mode to cache it"
      ],
      "correct": 0,
      "module": 3,
      "explanation": "A user-defined aggregation is a small Import table, mapped to the detail table with GroupBy, Sum, or Count mappings, that the engine uses automatically when a query can be answered at that grain; other queries still go to the DirectQuery fact table. Dual mode is meant for dimension tables, more connections do not reduce scanned rows, and a calculated table over a DirectQuery table does not provide an aggregation mapping."
    },
    {
      "id": "dp600-3-012",
      "text": "You need a measure that shows each category's share of total sales. The denominator must ignore the category filter but count only fact rows where SalesAmount is greater than zero, so returns are excluded. Which expression should you use?",
      "options": [
        "DIVIDE([Total Sales], CALCULATE([Total Sales], FactSales[SalesAmount] > 0, VALUES(DimProduct[Category])))",
        "DIVIDE([Total Sales], CALCULATE([Total Sales], FactSales[SalesAmount] > 0, ALL(DimProduct[Category])))",
        "DIVIDE([Total Sales], CALCULATE(SUM(FactSales[SalesAmount]), FILTER(FactSales, FactSales[SalesAmount] > 0)))",
        "DIVIDE([Total Sales], CALCULATE([Total Sales], REMOVEFILTERS(DimProduct[Category])))"
      ],
      "correct": 1,
      "module": 3,
      "explanation": "The denominator needs two modifiers: a filter that keeps only positive SalesAmount rows and ALL (or REMOVEFILTERS) on the category column. Without the removal, the denominator stays inside the current category and the result is 100 percent. The option with only REMOVEFILTERS still includes returns, and VALUES keeps the category filter."
    },
    {
      "id": "dp600-3-013",
      "text": "Your fiscal year starts on April 1. You have a marked date table named DimDate and need a measure for fiscal year-to-date sales. Which expression is correct?",
      "options": [
        "TOTALYTD([Total Sales], DimDate[Date], \"4/1\")",
        "TOTALYTD([Total Sales], DimDate[Date], \"3/31\")",
        "TOTALYTD([Total Sales], DimDate[Date], \"4/30\")",
        "TOTALYTD([Total Sales], DimDate[Date])"
      ],
      "correct": 1,
      "module": 3,
      "explanation": "The optional year_end_date argument of TOTALYTD is the last day of the fiscal year, so a fiscal year starting April 1 ends on March 31 (\"3/31\"). Omitting it uses December 31, and April 1 or April 30 would start the year in the wrong month."
    },
    {
      "id": "dp600-3-014",
      "text": "You have an Import-mode semantic model over a large sales table. You need a refresh strategy that reloads only recent and changed data instead of the entire table. What should you configure?",
      "options": [
        "A scheduled full refresh of every table once per hour",
        "Incremental refresh policy using RangeStart and RangeEnd parameters",
        "A Dataflow Gen2 destination that is set to append mode",
        "A calculated column that flags new rows and filters on it at refresh"
      ],
      "correct": 1,
      "module": 3,
      "explanation": "Incremental refresh partitions the table by date by using the RangeStart and RangeEnd parameters and refreshes only the recent partitions, optionally detecting changes with a polling column. Hourly full refresh reloads everything, append mode adds duplicates of rows that changed, and a calculated column cannot restrict what the source query loads."
    },
    {
      "id": "dp600-3-015",
      "text": "Your model uses a bridge table, SalesPromotionBridge, to relate FactSales and DimPromotion because one sale can have several promotions. DimPromotion filters the bridge, but selecting a promotion does not filter FactSales. What should you do?",
      "options": [
        "Enable Assume referential integrity on both bridge relationships",
        "Make the DimPromotion relationship inactive and use USERELATIONSHIP",
        "Set cross-filter direction to Both on the bridge-to-FactSales relationship",
        "Change the DimPromotion relationship to many-to-many cardinality"
      ],
      "correct": 2,
      "module": 3,
      "explanation": "A filter flows from the one side to the many side. The bridge is on the many side of its relationship with FactSales, so a promotion filter reaches the bridge but cannot flow back up to FactSales unless that relationship is set to Both. Assume referential integrity is a performance setting for DirectQuery and does not change filter propagation."
    },
    {
      "id": "dp600-3-016",
      "text": "You need to create a measure that calculates the moving average of the last 3 months of sales. Which DAX pattern should you use?",
      "options": [
        "AVERAGEX(FILTER(ALL(DimDate), DimDate[Date] >= LASTDATE(DimDate[Date]) - 3), [Total Sales])",
        "AVERAGEX(DATESINPERIOD(DimDate[Date], LASTDATE(DimDate[Date]), -3, MONTH), [Total Sales])",
        "CALCULATE(AVERAGE(FactSales[SalesAmount]), DATESINPERIOD(DimDate[Date], LASTDATE(DimDate[Date]), -3, MONTH))",
        "MOVINGAVERAGE([Total Sales], 3, MONTH)"
      ],
      "correct": 1,
      "module": 3,
      "explanation": "AVERAGEX with DATESINPERIOD iterates over each date in the last 3 months and averages the total sales per date. This is the correct pattern. CALCULATE(AVERAGE(...)) would average the sales amount across rows, not the daily total. MOVINGAVERAGE is not a DAX function. The FILTER option uses incorrect date arithmetic."
    },
    {
      "id": "dp600-3-017",
      "text": "You have a Direct Lake on OneLake semantic model over a lakehouse. A Delta table grows beyond the Direct Lake guardrail for Parquet files per table. What happens to queries that reference that table?",
      "options": [
        "The table is converted to Import storage mode automatically",
        "They fail until the Delta table is optimized to fall within the guardrail",
        "They are routed to a query scaleout replica",
        "They fall back to DirectQuery against the SQL analytics endpoint"
      ],
      "correct": 1,
      "module": 3,
      "explanation": "Direct Lake on OneLake has no DirectQuery fallback. When a Delta table exceeds a guardrail such as files per table, refresh fails and the model cannot be queried until the table is optimized with OPTIMIZE and VACUUM, or the model moves to a larger SKU. Fallback to DirectQuery exists only for Direct Lake on SQL analytics endpoint, and query scaleout distributes read queries rather than resolving a guardrail breach."
    },
    {
      "id": "dp600-3-018",
      "text": "You have a composite model with a DirectQuery fact table and Import-mode dimension tables from the same source. Queries that mix a dimension slicer with the fact table are slow because the relationship is limited. You want the engine to read the dimensions from cache when possible and push the join to the source when needed. What storage mode should you set on the dimension tables?",
      "options": [
        "Direct Lake",
        "Import with incremental refresh",
        "Dual",
        "DirectQuery with query caching"
      ],
      "correct": 2,
      "module": 3,
      "explanation": "Dual storage mode lets a table behave as Import when queried alone (for example in a slicer) and as DirectQuery when queried together with a DirectQuery table from the same source, which avoids a limited relationship and cross-source joins. Direct Lake is a different engine mode and the other options do not provide this switching."
    },
    {
      "id": "dp600-3-019",
      "text": "A measure evaluates CALCULATE([Total Sales], SAMEPERIODLASTYEAR(DimDate[Date])) twice: once in an IF condition and once in a division. You need to reduce repeated evaluation and improve readability. What should you do?",
      "options": [
        "Wrap each CALCULATE in a FILTER over the fact table",
        "Replace SAMEPERIODLASTYEAR with a hardcoded date range",
        "Convert the measure to a calculated column on DimDate",
        "Store the expression in a VAR and use the variable after RETURN"
      ],
      "correct": 3,
      "module": 3,
      "explanation": "A VAR is evaluated once, in the filter context where it is defined, and can be reused anywhere after RETURN, so the prior-year calculation runs a single time. A calculated column cannot respond to report filters, and FILTER or hardcoded dates do not remove the duplicate evaluation."
    },
    {
      "id": "dp600-3-020",
      "text": "You want to edit a published Import-mode semantic model in Tabular Editor by connecting to its workspace connection. The tool can read the model but fails when you try to save changes. What should you do?",
      "options": [
        "Turn on the large semantic model storage format",
        "Set the XMLA endpoint to Read Write on the capacity",
        "Grant Build permission on the semantic model to yourself",
        "Enable Q&A for the semantic model in its settings"
      ],
      "correct": 1,
      "module": 3,
      "explanation": "External tools write to a published model through the XMLA endpoint, which is read-only by default. A capacity admin must set the XMLA endpoint to Read Write. Q&A, Build permission, and large model storage format do not allow metadata writes."
    },
    {
      "id": "dp600-3-021",
      "text": "The Security table has UserEmail, Region, and ExpiryDate columns, and a user can have several regions. Users must see only regions with an assignment that has not expired. Which RLS filter expression on DimRegion should you use?",
      "options": [
        "LOOKUPVALUE(Security[Region], Security[UserEmail], USERPRINCIPALNAME(), Security[ExpiryDate], TODAY()) = DimRegion[Region]",
        "DimRegion[Region] IN CALCULATETABLE(VALUES(Security[Region]), Security[UserEmail] = USERPRINCIPALNAME(), Security[ExpiryDate] >= TODAY())",
        "DimRegion[Region] = SELECTEDVALUE(Security[Region], USERPRINCIPALNAME())",
        "CONTAINS(Security, Security[UserEmail], USERPRINCIPALNAME(), Security[Region], DimRegion[Region])"
      ],
      "correct": 1,
      "module": 3,
      "explanation": "The IN expression builds the set of regions for the signed-in user whose assignment has not expired, and keeps the DimRegion rows in that set. LOOKUPVALUE errors when a user has more than one region and cannot match the expiry date by equality, SELECTEDVALUE has no user filter on the Security table, and CONTAINS ignores the expiry date, so expired regions stay visible."
    },
    {
      "id": "dp600-3-022",
      "text": "A measure uses CALCULATE([Total Sales], DimProduct[Color] = \"Red\"). A slicer on DimProduct[Color] has Blue selected. What does the measure return?",
      "options": [
        "Blue sales, because the slicer takes priority over CALCULATE",
        "Blank, because the Red and Blue filters are intersected",
        "An error, because Color is filtered twice in one context",
        "Red sales, because the Boolean filter replaces the Color filter"
      ],
      "correct": 3,
      "module": 3,
      "explanation": "A Boolean filter argument in CALCULATE is shorthand for FILTER(ALL(DimProduct[Color]), ...), so it overrides the existing filter on that column and the measure returns Red sales. To intersect the filters instead, wrap the filter in KEEPFILTERS."
    },
    {
      "id": "dp600-3-023",
      "text": "Your model has date columns whose values range from March 15, 2024 to October 20, 2025. You create a calculated table by using CALENDARAUTO(). What date range does it return?",
      "options": [
        "March 1, 2024 to October 31, 2025",
        "January 1, 2024 to December 31, 2025",
        "January 1, 2023 to December 31, 2026",
        "March 15, 2024 to October 20, 2025"
      ],
      "correct": 1,
      "module": 3,
      "explanation": "CALENDARAUTO scans the date and datetime columns in the model (excluding calculated columns) and returns whole calendar years, from January 1 of the earliest year to December 31 of the latest year when the fiscal year end month is the default of December."
    },
    {
      "id": "dp600-3-024",
      "text": "You need a measure that ranks each product by sales within its own category, shown in a visual that lists products under their categories. Which expression should you use?",
      "options": [
        "RANKX(ALLEXCEPT(DimProduct, DimProduct[Category]), [Total Sales], , DESC, DENSE)",
        "RANKX(VALUES(DimProduct[Category]), [Total Sales], , DESC, DENSE)",
        "RANKX(ALLSELECTED(DimProduct[ProductName]), [Total Sales], , DESC, DENSE)",
        "RANKX(ALL(DimProduct[ProductName]), [Total Sales], , DESC, DENSE)"
      ],
      "correct": 0,
      "module": 3,
      "explanation": "ALLEXCEPT removes every filter on DimProduct except Category, so each product is ranked only against products in the same category. ALL and ALLSELECTED on the product name rank against products across all categories, and VALUES on Category ranks categories instead of products."
    },
    {
      "id": "dp600-3-025",
      "text": "A measure must return [Single Category Measure] when exactly one category is in the filter context and [All Categories Measure] otherwise. Which expression should you use?",
      "options": [
        "IF(DISTINCTCOUNT(FactSales[ProductKey]) = 1, [Single Category Measure], [All Categories Measure])",
        "IF(HASONEVALUE(DimProduct[Category]), [Single Category Measure], [All Categories Measure])",
        "IF(ISFILTERED(DimProduct[Category]), [Single Category Measure], [All Categories Measure])",
        "IF(COUNTROWS(DimProduct) = 1, [Single Category Measure], [All Categories Measure])"
      ],
      "correct": 1,
      "module": 3,
      "explanation": "HASONEVALUE returns TRUE only when the column has exactly one distinct value in the current context. COUNTROWS(DimProduct) and DISTINCTCOUNT of ProductKey count products, not categories, and ISFILTERED is TRUE whenever any filter exists, including a selection of several categories."
    },
    {
      "id": "dp600-3-026",
      "text": "You have a Direct Lake on OneLake semantic model over a lakehouse. A fact table is stored as thousands of small Parquet files and Direct Lake queries are slow. You need to improve query performance for that table. What should you do?",
      "options": [
        "Increase the max memory per query for the capacity",
        "Configure DirectQuery fallback for the table",
        "Enable incremental refresh on the semantic model",
        "Run OPTIMIZE and VACUUM on the Delta table to compact the files"
      ],
      "correct": 3,
      "module": 3,
      "explanation": "Direct Lake reads Delta Parquet files directly, so file layout is the storage layout the engine has to scan. Many small files count against the Parquet files-per-table guardrail and slow queries; OPTIMIZE compacts them and VACUUM removes unreferenced files. Direct Lake tables have no model partitions, so incremental refresh does not apply, and Direct Lake on OneLake cannot fall back to DirectQuery."
    },
    {
      "id": "dp600-3-027",
      "text": "A report shows total sales by promotion for the bridge-table model described for FactSales and DimPromotion. The promotion rows add up to more than the grand total. What explains this?",
      "options": [
        "The grand total is calculated without applying the promotion filter",
        "The measure is implicit instead of an explicit DAX measure",
        "A sale with several promotions appears under each, but the total counts it once",
        "The bidirectional relationship is duplicating rows in FactSales"
      ],
      "correct": 2,
      "module": 3,
      "explanation": "In a many-to-many model, one sale can belong to several promotions, so it appears in each promotion row. The grand total counts each sale once, so row subtotals exceed it. This is expected behavior, not duplicated data. Implicit versus explicit measures do not change how filter propagation works."
    },
    {
      "id": "dp600-3-028",
      "text": "You need to create a measure that calculates the percentage of total sales for each product category, but you want to maintain the filter context from the report. Which DAX expression should you use?",
      "options": [
        "DIVIDE([Total Sales], CALCULATE([Total Sales], REMOVEFILTERS(DimProduct[Category])))",
        "DIVIDE([Total Sales], SUM(FactSales[SalesAmount]))",
        "DIVIDE([Total Sales], CALCULATE([Total Sales], ALL(DimProduct[Category])))",
        "DIVIDE([Total Sales], CALCULATE([Total Sales], ALLSELECTED(DimProduct[Category])))"
      ],
      "correct": 3,
      "module": 3,
      "explanation": "ALLSELECTED preserves the filter context from the report (e.g., slicers, page filters) while removing filters from the category column itself. This gives the percentage of total within the selected context. ALL would ignore all filters (including slicers). REMOVEFILTERS is similar to ALL but less common in this pattern. ALLSELECTED is the intended function for maintaining external context."
    },
    {
      "id": "dp600-3-029",
      "text": "A calculated column uses FORMAT(DimDate[Date], \"mmm yyyy\") to create labels such as \"Jan 2025\", and visuals sort the labels alphabetically. How should you fix the sort order?",
      "options": [
        "Hide the label column and rely on the default visual sort order",
        "Add a numeric MonthKey column and sort the label column by it",
        "Change the summarization of the label column to Minimum or Maximum",
        "Set the Data category of the label column to Date or Time"
      ],
      "correct": 1,
      "module": 3,
      "explanation": "Text columns sort alphabetically. Setting Sort by column to a numeric key such as YEAR * 100 + MONTH makes visuals order the labels chronologically. Data category and summarization settings do not affect the text sort order."
    },
    {
      "id": "dp600-3-030",
      "text": "You refresh a Direct Lake semantic model after a pipeline updates its Delta tables. What does the refresh (framing) operation do?",
      "options": [
        "Rewrites the Delta tables with V-Order optimization",
        "Points the model at the latest Delta version without copying data",
        "Copies all table data from OneLake into VertiPaq storage",
        "Runs a T-SQL query against the SQL analytics endpoint for each table"
      ],
      "correct": 1,
      "module": 3,
      "explanation": "Framing is a metadata operation: it points the model at the current Parquet files and Delta version, so the data is loaded on demand later. It does not import all data, query the SQL endpoint, or modify the Delta tables."
    },
    {
      "id": "dp600-3-031",
      "text": "You have one DimDate table and need a report in which one slicer filters FactSales by order date and a second slicer filters it by ship date at the same time. How should you model this?",
      "options": [
        "Keep one date table and set both relationships to bidirectional",
        "Keep one date table and use USERELATIONSHIP in each measure",
        "Create a date table per role, each with an active relationship",
        "Keep one date table and make both relationships active at once"
      ],
      "correct": 2,
      "module": 3,
      "explanation": "To filter by two roles at once you need a separate date table for each role, each with its own active relationship. A single table can have only one active relationship to a table, and USERELATIONSHIP switches one relationship at a time within a measure. The bidirectional setting does not create independent filters."
    },
    {
      "id": "dp600-3-032",
      "text": "You create a calculated table named Series by using GENERATESERIES(1, 1000, 1), which produces a [Value] column. You need a running total column. Which expression should you use?",
      "options": [
        "ADDCOLUMNS(Series, \"RunningTotal\", SUMX(FILTER(Series, Series[Value] <= Series[Value]), Series[Value]))",
        "ADDCOLUMNS(Series, \"RunningTotal\", SUMX(FILTER(Series, TRUE()), Series[Value]) + Series[Value])",
        "ADDCOLUMNS(Series, \"RunningTotal\", COUNTROWS(FILTER(Series, Series[Value] <= EARLIER(Series[Value]))))",
        "ADDCOLUMNS(Series, \"RunningTotal\", SUMX(FILTER(Series, Series[Value] <= EARLIER(Series[Value])), Series[Value]))"
      ],
      "correct": 3,
      "module": 3,
      "explanation": "EARLIER refers to the row context of the current Series row, so the FILTER keeps only rows with a value up to the current one and SUMX adds them. The second option compares a column to itself and always returns the grand total, the third adds the current value to the grand total, and the fourth counts rows instead of summing."
    },
    {
      "id": "dp600-3-033",
      "text": "A disconnected table named Selection supplies a category list for a slicer, but it has no relationship to DimProduct. You need a measure that filters sales to the categories chosen in that slicer. Which expression should you use?",
      "options": [
        "CALCULATE([Total Sales], RELATEDTABLE(Selection))",
        "CALCULATE([Total Sales], USERELATIONSHIP(Selection[Category], DimProduct[Category]))",
        "CALCULATE([Total Sales], TREATAS(VALUES(Selection[Category]), DimProduct[Category]))",
        "CALCULATE([Total Sales], CROSSFILTER(Selection[Category], DimProduct[Category], Both))"
      ],
      "correct": 2,
      "module": 3,
      "explanation": "TREATAS applies the values from one column as a filter on another column, creating a virtual relationship. USERELATIONSHIP and CROSSFILTER require an existing relationship, and RELATEDTABLE is not a filter modifier."
    },
    {
      "id": "dp600-3-034",
      "text": "Report users say a page with several visuals loads slowly. You need to see, in Power BI Desktop, how long each visual spends on its DAX query versus rendering. Which tool should you use?",
      "options": [
        "Performance Analyzer",
        "Power Query query diagnostics",
        "Best Practice Analyzer",
        "Lineage view"
      ],
      "correct": 0,
      "module": 3,
      "explanation": "Performance Analyzer records, for each visual, the duration of the DAX query, visual display, and other work, and lets you copy the query for further testing. Best Practice Analyzer checks model design rules, Power Query diagnostics profile data loading, and lineage view shows dependencies."
    },
    {
      "id": "dp600-3-035",
      "text": "Two products tie for the second-highest sales in a RANKX measure. You need ranks of 1, 2, 2, 3 with no gaps after ties. Which expression should you use?",
      "options": [
        "RANKX(ALL(DimProduct), [Total Sales], , ASC, SKIP)",
        "RANKX(ALL(DimProduct), [Total Sales], , ASC, DENSE)",
        "RANKX(ALL(DimProduct), [Total Sales], , DESC, SKIP)",
        "RANKX(ALL(DimProduct), [Total Sales], , DESC, DENSE)"
      ],
      "correct": 3,
      "module": 3,
      "explanation": "DENSE gives consecutive ranks after ties (1, 2, 2, 3), whereas SKIP gives 1, 2, 2, 4. DESC ranks the highest sales as 1; ASC would rank the lowest sales as 1."
    },
    {
      "id": "dp600-3-036",
      "text": "You have a DirectQuery model over a very large fact table. You want Power BI to learn from query history and automatically build and maintain in-memory aggregations. What should you enable?",
      "options": [
        "Query caching with a short retention",
        "Automatic aggregations",
        "Incremental refresh on the fact table",
        "Query scale-out with replicas"
      ],
      "correct": 1,
      "module": 3,
      "explanation": "Automatic aggregations use query history and machine learning to create and maintain an aggregation table in memory for DirectQuery models, and queries are answered from it when possible. Query caching stores results, incremental refresh partitions Import data, and scale-out adds read replicas."
    },
    {
      "id": "dp600-3-037",
      "text": "You need a measure for the highest daily sales across all dates, ignoring any date slicer. Which expression should you use?",
      "options": [
        "MAXX(REMOVEFILTERS(DimDate[Date]), [Total Sales])",
        "MAXX(VALUES(DimDate[Date]), [Total Sales])",
        "MAXX(ALL(DimDate[Date]), [Total Sales])",
        "MAXX(ALLSELECTED(DimDate[Date]), [Total Sales])"
      ],
      "correct": 2,
      "module": 3,
      "explanation": "ALL can return a table of every date that ignores existing filters, so it works as the table argument of an iterator. REMOVEFILTERS only clears filters as a CALCULATE modifier and cannot return a table. ALLSELECTED keeps the slicer selection and VALUES respects the current filters."
    },
    {
      "id": "dp600-3-038",
      "text": "An Import-mode semantic model is much larger than expected. You need to find which columns use the most memory and have the highest cardinality. Which tool should you use?",
      "options": [
        "Performance Analyzer",
        "Best Practice Analyzer",
        "VertiPaq Analyzer",
        "Impact analysis"
      ],
      "correct": 2,
      "module": 3,
      "explanation": "VertiPaq Analyzer, available in DAX Studio and Tabular Editor, reports table and column size, dictionary size, and cardinality, so you can find columns to remove or reduce. Performance Analyzer measures visual timing, BPA checks design rules, and impact analysis shows downstream dependencies."
    },
    {
      "id": "dp600-3-039",
      "text": "A Direct Lake query references a column that is not yet in memory. What happens?",
      "options": [
        "The column is transcoded from Parquet into memory on first use",
        "The column is rebuilt by a scheduled full refresh at night",
        "The query fails until the next framing refresh completes",
        "The query falls back to DirectQuery on every execution of it"
      ],
      "correct": 0,
      "module": 3,
      "explanation": "In Direct Lake, column data is loaded from Parquet and transcoded into the VertiPaq in-memory structure when a query first needs it, and can be evicted under memory pressure. No refresh or DirectQuery is required for that load; fallback is a separate behavior on certain conditions."
    },
    {
      "id": "dp600-3-040",
      "text": "A model contains many date columns, and Power BI creates hidden date tables for each, increasing the model size. You use a single marked date table. What should you do?",
      "options": [
        "Mark each hidden date table as a date table",
        "Convert the date columns to text data types",
        "Turn off Auto date/time in the file options",
        "Set every date column to Hidden in the model"
      ],
      "correct": 2,
      "module": 3,
      "explanation": "Auto date/time creates a hidden calendar table for each date column. Turning it off removes them and reduces model size, and a dedicated marked date table handles time intelligence. Hiding columns does not remove the generated tables."
    },
    {
      "id": "dp600-3-041",
      "text": "A measure uses CALCULATE([Total Sales], KEEPFILTERS(DimProduct[Color] = \"Red\")). A slicer selects Blue and Red. What does the measure return?",
      "options": [
        "Red sales, because it is intersected with the slicer selection",
        "Blank, because KEEPFILTERS removes the existing filter",
        "Blue sales, because the slicer wins when filters conflict",
        "Blue and Red sales, because the new filter replaces the slicer"
      ],
      "correct": 0,
      "module": 3,
      "explanation": "KEEPFILTERS adds the CALCULATE filter on top of the existing filter instead of replacing it, so only members that satisfy both remain: Red. Without KEEPFILTERS the Boolean filter would override the slicer and return Red regardless."
    },
    {
      "id": "dp600-3-042",
      "text": "You have a measure [Revenue] that must show with a currency symbol that matches the currency chosen in a slicer, while staying numeric so it can be charted. What should you use?",
      "options": [
        "A FORMAT call inside the measure that returns text",
        "The model culture setting",
        "A calculated column that converts values to text",
        "A dynamic format string expression on the measure"
      ],
      "correct": 3,
      "module": 3,
      "explanation": "A dynamic format string lets a DAX expression choose the format string for a measure, so the result remains numeric and chartable while the display changes with the slicer. FORMAT and text columns turn values into strings, which cannot be charted or sorted numerically."
    },
    {
      "id": "dp600-3-043",
      "text": "The denominator of a ratio can be zero or blank. You need a measure that returns 0 when this happens. Which expression should you use?",
      "options": [
        "IF([Denominator] = 0, BLANK(), [Numerator] / [Denominator])",
        "IFERROR([Numerator] / [Denominator], 0)",
        "[Numerator] / [Denominator]",
        "DIVIDE([Numerator], [Denominator], 0)"
      ],
      "correct": 3,
      "module": 3,
      "explanation": "DIVIDE returns its third argument when the denominator is zero or blank. The / operator returns Infinity or NaN instead of an error, so IFERROR never replaces it. The IF version returns blank, not 0."
    },
    {
      "id": "dp600-3-044",
      "text": "In DAX Studio, Server Timings for a slow query show 8 seconds total, with 7.5 seconds in the formula engine and a single fast storage engine query. Where should you focus your optimization?",
      "options": [
        "The measure logic that drives formula engine work",
        "The refresh schedule of the semantic model",
        "The cardinality of the columns scanned by the storage engine",
        "The Delta table file layout in the lakehouse"
      ],
      "correct": 0,
      "module": 3,
      "explanation": "When most of the time is in the formula engine and storage engine queries are quick, the cost comes from DAX evaluation logic like nested row-by-row calculations. Storage layout, column cardinality, and refresh schedules mainly affect storage engine scans or data freshness."
    },
    {
      "id": "dp600-3-045",
      "text": "You need a measure that counts the customers who have no sales in the current filter context. Which expression should you use?",
      "options": [
        "COUNTROWS(FILTER(VALUES(DimCustomer[CustomerKey]), ISBLANK([Total Sales])))",
        "COUNTBLANK(FactSales[CustomerKey]) + COUNTBLANK(DimCustomer[CustomerKey])",
        "COUNTROWS(DimCustomer) - COUNT(FactSales[CustomerKey])",
        "DISTINCTCOUNT(DimCustomer[CustomerKey]) - DISTINCTCOUNT(FactSales[ProductKey])"
      ],
      "correct": 0,
      "module": 3,
      "explanation": "Iterating the visible customers and keeping those whose [Total Sales] is blank counts customers without sales. COUNTBLANK counts blank cells rather than customers without sales, DISTINCTCOUNT of products is unrelated to customers, and subtracting fact row counts from customer rows mixes different row grains."
    },
    {
      "id": "dp600-3-046",
      "text": "An Import-mode semantic model on a Fabric capacity must grow beyond the default size limit of a single model and support faster loading of large partitions. What should you enable?",
      "options": [
        "The large semantic model storage format",
        "Query scale-out for the model",
        "Automatic page refresh on reports",
        "Dual storage mode on all tables"
      ],
      "correct": 0,
      "module": 3,
      "explanation": "The large semantic model storage format lets an Import model grow beyond the default size limit up to the capacity's memory limit and uses on-demand loading from storage. Query scale-out, automatic page refresh, and Dual mode do not change model size limits."
    }
  ];
  
  if (typeof window.__dp600 === 'undefined') {
    window.__dp600 = { modules: [], questions: [] };
  }
  
  window.__dp600.questions = window.__dp600.questions.concat(questions);
  
  if (window.__dp600.modules.length < 3) {
    window.__dp600.modules[2] = "Module 3: Semantic Modeling & DAX";
  }
})();

