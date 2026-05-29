```json
[
  {
    "text": "You have a Direct Lake semantic model connected to a lakehouse. A user runs a complex DAX query that scans millions of rows. The query takes longer than expected. You discover that the query fell back to DirectQuery mode. What is the PRIMARY reason this fallback occurred?",
    "options": [
      "The semantic model does not have an aggregation table defined",
      "The query exceeded the memory threshold for Direct Lake processing",
      "The lakehouse table is not in Delta format",
      "The user does not have ReadData permission on the lakehouse"
    ],
    "correct": 1
  },
  {
    "text": "You need to implement Row-Level Security on a warehouse so that regional managers only see sales data for their region. Which DAX expression should you use in the security filter for the DimRegion table?",
    "options": [
      "[Region] = USERNAME()",
      "[Region] = USERPRINCIPALNAME()",
      "[ManagerEmail] = USERPRINCIPALNAME()",
      "[Region] = LOOKUPVALUE(Users[Region], Users[Email], USERPRINCIPALNAME())"
    ],
    "correct": 2
  },
  {
    "text": "You have a semantic model with an inactive relationship between FactSales[OrderDate] and DimDate[Date]. You need to calculate total sales using the ship date instead of the order date in a specific measure. What should you use?",
    "options": [
      "CROSSFILTER to activate the relationship",
      "USERELATIONSHIP to specify the inactive relationship in the measure",
      "TREATAS to override the active relationship",
      "RELATEDTABLE to navigate the inactive relationship"
    ],
    "correct": 1
  },
  {
    "text": "A Power BI report uses a semantic model in Direct Lake mode. You import a new version of the semantic model to test. Which statement about the new import is TRUE?",
    "options": [
      "The new import will automatically replace the existing Direct Lake semantic model",
      "The new import creates a separate copy and does not affect the Direct Lake model until deployed",
      "The new import must use the same storage mode as the original",
      "The new import will cause the Direct Lake model to fall back to Import mode"
    ],
    "correct": 1
  },
  {
    "text": "You have a Fabric warehouse. A user with the Contributor workspace role needs to read specific columns from a table but must be denied access to a sensitive column containing salary data. Which security feature should you implement?",
    "options": [
      "Row-Level Security with a DAX filter on the salary column",
      "Column-Level Security using DENY SELECT on the salary column",
      "Dynamic Data Masking with the partial() function on the salary column",
      "Object-Level Security to hide the entire table from the user"
    ],
    "correct": 1
  },
  {
    "text": "You are building a Dataflow Gen2 that merges data from two different source systems. You notice that query folding is not occurring for the merge step. What is the MOST LIKELY reason?",
    "options": [
      "The merge uses an INNER JOIN instead of a LEFT JOIN",
      "The two sources are from different data source types",
      "The merge is performed after a filter step",
      "The dataflow uses the Modern Query Evaluator"
    ],
    "correct": 1
  },
  {
    "text": "You have a lakehouse with a Delta table containing 500 GB of data. You need to write a Spark notebook that performs a full outer join between this table and a dimension table, then writes the results to a new Delta table. Which write mode should you use to ensure the operation is idempotent?",
    "options": [
      "append mode",
      "overwrite mode",
      "merge mode",
      "update mode"
    ],
    "correct": 1
  },
  {
    "text": "A semantic model uses Import mode. You need to ensure that when the scheduled refresh fails, users can still see the last successfully loaded data rather than receiving an error. What should you configure?",
    "options": [
      "Enable query scaleout for the semantic model",
      "Set the refresh failure behavior to 'Use existing data'",
      "Configure composite mode with DirectQuery fallback",
      "Enable automatic aggregations on the model"
    ],
    "correct": 1
  },
  {
    "text": "You have a Fabric warehouse with a fact table and several dimension tables in a star schema. You need to create a measure that calculates the year-over-year growth of sales. Which DAX pattern is CORRECT?",
    "options": [
      "DIVIDE([Total Sales] - CALCULATE([Total Sales], SAMEPERIODLASTYEAR(DimDate[Date])), CALCULATE([Total Sales], SAMEPERIODLASTYEAR(DimDate[Date])))",
      "DIVIDE([Total Sales] - [Total Sales], CALCULATE([Total Sales], DATEADD(DimDate[Date], -1, YEAR)))",
      "[Total Sales] / CALCULATE([Total Sales], SAMEPERIODLASTYEAR(DimDate[Date])) - 1",
      "CALCULATE([Total Sales], YEAR(DimDate[Date]) = YEAR(TODAY()) - 1)"
    ],
    "correct": 0
  },
  {
    "text": "You need to implement Object-Level Security on a semantic model to restrict access to a table containing confidential product pricing. Users with the Viewer role should not be able to see the table or its columns. How should you configure OLS?",
    "options": [
      "Hide the table in Power BI Desktop and publish to the service",
      "Create a role in Tabular Editor that denies Read permission on the table",
      "Set the table's IsPrivate property to True in the model metadata",
      "Remove the table from the model's description and metadata"
    ],
    "correct": 1
  },
  {
    "text": "You have a Dataflow Gen2 that uses incremental refresh. The source table contains an 'UpdatedTimestamp' column. You configure the refresh to load data from the last 7 days. What happens when a record from 3 days ago is updated?",
    "options": [
      "The updated record is ignored because it was already loaded",
      "The updated record is loaded as a new row, creating a duplicate",
      "The refresh detects the timestamp change and replaces the existing record",
      "The refresh deletes the old record and inserts the new one"
    ],
    "correct": 2
  },
  {
    "text": "You have a semantic model with a many-to-many relationship between FactSales and DimProductCategory. A user creates a measure that sums sales amounts. Which behavior should you EXPECT when this measure is used in a report?",
    "options": [
      "Sales amounts are duplicated for each category in the relationship",
      "Sales amounts are correctly allocated to each category without duplication",
      "The measure returns an error due to the many-to-many relationship",
      "Sales amounts are averaged across all categories"
    ],
    "correct": 1
  },
  {
    "text": "You need to create a calculated column in a semantic model that classifies sales into 'High', 'Medium', or 'Low' based on the SalesAmount. The classification thresholds should be configurable by end users without modifying the model. What is the BEST approach?",
    "options": [
      "Create a calculated column using a hardcoded SWITCH statement",
      "Create a measure using SWITCH with a parameter table that users can modify",
      "Create a calculated column that references a separate threshold table using RELATED",
      "Create a calculated table that contains all possible combinations of thresholds and classifications"
    ],
    "correct": 1
  },
  {
    "text": "You have a Fabric lakehouse with a Delta table. You run a DELETE statement using T-SQL through the SQL analytics endpoint. What is the result?",
    "options": [
      "The rows are permanently removed from the Delta table",
      "The rows are marked as deleted in the Delta transaction log but not physically removed",
      "The statement fails because the SQL analytics endpoint is read-only",
      "The rows are removed from the SQL view but remain in the underlying Delta files"
    ],
    "correct": 2
  },
  {
    "text": "You are designing a dimensional model for a retail analytics solution. You have a DimCustomer table with SCD Type 2 tracking. A customer changes their address. How should you model this change?",
    "options": [
      "Update the existing row with the new address and set the previous address to NULL",
      "Insert a new row with the new address, set the old row's EndDate and IsCurrent flag, and set the new row's StartDate and IsCurrent flag",
      "Create a new DimCustomerAddress table and link it to the fact table",
      "Add a new column DimCustomer[Address2] to store the new address"
    ],
    "correct": 1
  },
  {
    "text": "You have a semantic model in Direct Lake mode. You add a new column to the underlying Delta table in the lakehouse. What happens to the semantic model?",
    "options": [
      "The new column automatically appears in the semantic model after the next refresh",
      "The new column is available immediately without any refresh action",
      "You must manually add the column to the semantic model in Power BI Desktop",
      "The semantic model must be reimported to recognize the new column"
    ],
    "correct": 1
  },
  {
    "text": "You need to implement dynamic Row-Level Security so that each user sees only data for their assigned business unit. You have a security table that maps users to business units. Which DAX expression correctly implements this?",
    "options": [
      "CONTAINS(Security, Security[User], USERPRINCIPALNAME(), Security[BusinessUnit], DimSales[BusinessUnit])",
      "LOOKUPVALUE(Security[BusinessUnit], Security[User], USERPRINCIPALNAME()) = DimSales[BusinessUnit]",
      "FILTER(DimSales, DimSales[BusinessUnit] = RELATED(Security[BusinessUnit]))",
      "DimSales[BusinessUnit] = CALCULATE(SELECTEDVALUE(Security[BusinessUnit]))"
    ],
    "correct": 0
  },
  {
    "text": "You have a Fabric warehouse with a fact table containing 10 billion rows. You need to optimize query performance by implementing aggregations. Which approach should you use?",
    "options": [
      "Create an aggregation table at the month level and configure it as a user-defined aggregation in the semantic model",
      "Create a materialized view at the month level in the warehouse",
      "Create a summarized table using a stored procedure that runs nightly",
      "Enable automatic aggregations on the warehouse"
    ],
    "correct": 0
  },
  {
    "text": "You have a Dataflow Gen2 that sources data from an on-premises SQL Server. The dataflow takes a long time to refresh. You discover that query folding is not occurring. Which transformation is MOST LIKELY causing the folding to break?",
    "options": [
      "Filtering rows based on a date column",
      "Selecting specific columns from the source table",
      "Adding a custom column that concatenates first and last names",
      "Sorting the data by a numeric column"
    ],
    "correct": 2
  },
  {
    "text": "You need to create a measure that calculates the percentage of total sales for each product category, but you want to exclude products with zero sales from the denominator. Which DAX expression should you use?",
    "options": [
      "DIVIDE([Total Sales], CALCULATE([Total Sales], DimProduct[Sales] > 0))",
      "DIVIDE([Total Sales], CALCULATE(SUM(FactSales[SalesAmount]), DimProduct[SalesAmount] > 0))",
      "DIVIDE([Total Sales], CALCULATE([Total Sales], FILTER(DimProduct, DimProduct[TotalSales] > 0)))",
      "DIVIDE([Total Sales], SUM(FactSales[SalesAmount]))"
    ],
    "correct": 2
  },
  {
    "text": "You have a semantic model with a date table. You create a measure that uses TOTALYTD to calculate year-to-date sales. The date table is marked as a date table. A user reports that the measure returns incorrect results when the fiscal year starts in April. What should you do?",
    "options": [
      "Use TOTALYTD with the year_end_date parameter set to '0430'",
      "Replace TOTALYTD with DATESYTD using the fiscal year end date",
      "Create a separate fiscal date table and use TOTALYTD with that table",
      "Use CALCULATE with DATESBETWEEN to manually define the fiscal year range"
    ],
    "correct": 0
  },
  {
    "text": "You have a Fabric warehouse. You need to implement column-level security to prevent a group of users from viewing the EmployeeSSN column. Which T-SQL statement should you execute?",
    "options": [
      "DENY SELECT ON Employees(EmployeeSSN) TO [SecurityGroup]",
      "ALTER COLUMN Employees.EmployeeSSN SET SECURITY POLICY",
      "CREATE SECURITY POLICY SSNFilter ADD FILTER PREDICATE",
      "ALTER TABLE Employees SET (RESULT_SET_CACHING = OFF)"
    ],
    "correct": 0
  },
  {
    "text": "You have a semantic model with Import mode. You need to implement a refresh strategy that loads only new and modified rows from the source. Which approach should you use?",
    "options": [
      "Configure incremental refresh with a filter on an UpdatedTimestamp column",
      "Schedule a full refresh every hour",
      "Use Dataflows Gen2 with append mode to add new rows",
      "Create a calculated column that identifies new rows and filter on it during refresh"
    ],
    "correct": 0
  },
  {
    "text": "You have a lakehouse with a Delta table. You need to optimize the file sizes for better query performance. The table currently has thousands of small files. Which command should you run?",
    "options": [
      "VACUUM table_name",
      "OPTIMIZE table_name",
      "REPAIR table_name",
      "ANALYZE table_name"
    ],
    "correct": 1
  },
  {
    "text": "You have a semantic model with a many-to-many relationship between FactSales and DimPromotion. You need to ensure that sales amounts are correctly attributed to promotions without double-counting. Which setting should you configure?",
    "options": [
      "Set the relationship cross-filter direction to both directions",
      "Enable 'Apply security filter in both directions' on the relationship",
      "Set the 'Is this relationship bidirectional' property to True",
      "Configure the relationship to use 'Assume referential integrity'"
    ],
    "correct": 0
  },
  {
    "text": "You need to create a measure that calculates the moving average of the last 3 months of sales. Which DAX pattern should you use?",
    "options": [
      "AVERAGEX(DATESINPERIOD(DimDate[Date], LASTDATE(DimDate[Date]), -3, MONTH), [Total Sales])",
      "CALCULATE(AVERAGE(FactSales[SalesAmount]), DATESINPERIOD(DimDate[Date], LASTDATE(DimDate[Date]), -3, MONTH))",
      "AVERAGEX(FILTER(ALL(DimDate), DimDate[Date] >= LASTDATE(DimDate[Date]) - 3), [Total Sales])",
      "MOVINGAVERAGE([Total Sales], 3, MONTH)"
    ],
    "correct": 0
  },
  {
    "text": "You have a Fabric warehouse with a stored procedure that performs an INSERT, UPDATE, and DELETE operation. You need to ensure that if any operation fails, all changes are rolled back. What should you include in the stored procedure?",
    "options": [
      "SET XACT_ABORT ON and wrap all operations in a TRY...CATCH block with ROLLBACK TRANSACTION",
      "Use SET NOCOUNT ON to prevent partial results",
      "Add COMMIT after each individual operation",
      "Use IF @@ERROR <> 0 RETURN to check for errors"
    ],
    "correct": 0
  },
  {
    "text": "You have a semantic model with Direct Lake mode. You need to ensure that complex DAX queries that scan large datasets fall back to DirectQuery gracefully rather than timing out. What should you configure?",
    "options": [
      "Increase the memory threshold for Direct Lake processing",
      "Enable query scaleout to distribute the query load",
      "Configure the fallback behavior to DirectQuery in the semantic model settings",
      "Add an aggregation table to reduce the data scanned"
    ],
    "correct": 2
  },
  {
    "text": "You have a Fabric lakehouse with a Delta table. You run a MERGE operation using T-SQL through the SQL analytics endpoint. What is the result?",
    "options": [
      "The merge operation completes successfully and updates the Delta table",
      "The merge operation fails because the SQL analytics endpoint only supports read operations",
      "The merge operation is queued and executes during the next refresh",
      "The merge operation creates a new Delta table with the merged results"
    ],
    "correct": 1
  },
  {
    "text": "You need to create a semantic model that supports both Import mode for frequently accessed data and DirectQuery for real-time data. Which storage mode should you use?",
    "options": [
      "Direct Lake mode",
      "Composite mode",
      "Import mode with incremental refresh",
      "DirectQuery mode with caching"
    ],
    "correct": 1
  },
  {
    "text": "You have a Dataflow Gen2 that uses Table.Buffer to improve performance. You notice that the dataflow now takes longer to refresh. What is the MOST LIKELY reason?",
    "options": [
      "Table.Buffer increases memory usage and can cause performance degradation",
      "Table.Buffer is not supported in Dataflows Gen2",
      "Table.Buffer prevents query folding, which may reduce performance",
      "Table.Buffer only works with Excel sources"
    ],
    "correct": 2
  },
  {
    "text": "You have a semantic model with a measure that uses COUNTROWS(FILTER(FactSales, FactSales[Amount] > 1000)). You need to optimize this measure for better performance. Which alternative approach should you use?",
    "options": [
      "COUNTROWS(CALCULATETABLE(FactSales, FactSales[Amount] > 1000))",
      "COUNT(FILTER(FactSales, FactSales[Amount] > 1000))",
      "SUMX(FactSales, IF(FactSales[Amount] > 1000, 1, 0))",
      "CALCULATE(COUNTROWS(FactSales), FactSales[Amount] > 1000)"
    ],
    "correct": 3
  },
  {
    "text": "You have a Fabric warehouse. A user with the Member workspace role needs to grant a service principal access to read data from a specific table. Which permission should the user grant?",
    "options": [
      "GRANT SELECT ON TableName TO [ServicePrincipal]",
      "ALTER TABLE TableName ADD CONSTRAINT",
      "CREATE ROLE CustomRole ADD MEMBER ServicePrincipal",
      "DENY SELECT ON TableName TO [Public]"
    ],
    "correct": 0
  },
  {
    "text": "You have a semantic model with a calculated column that uses RELATED to pull data from a related table. The calculated column is evaluated during refresh. You notice that the refresh takes a long time. What is the MOST LIKELY cause?",
    "options": [
      "RELATED is not supported in calculated columns",
      "The calculated column requires row-by-row evaluation of the relationship, which is expensive for large tables",
      "The related table has too many rows",
      "The relationship between the tables is inactive"
    ],
    "correct": 1
  },
  {
    "text": "You have a Fabric lakehouse with a Delta table. You need to time-travel to view the data as it existed 3 days ago. Which T-SQL query should you use through the SQL analytics endpoint?",
    "options": [
      "SELECT * FROM table_name FOR SYSTEM_TIME AS OF '2026-05-26'",
      "SELECT * FROM table_name VERSION AS OF 3",
      "SELECT * FROM table_name TIMESTAMP AS OF DATEADD(day, -3, GETDATE())",
      "SELECT * FROM table_name FOR SYSTEM_TIME BETWEEN DATEADD(day, -3, GETDATE()) AND GETDATE()"
    ],
    "correct": 0
  },
  {
    "text": "You need to implement a security pattern where users see data only for their assigned region, and the region assignment can change over time. The security table contains UserEmail, Region, and EffectiveDate. Which DAX expression should you use for RLS?",
    "options": [
      "CONTAINS(Security, Security[UserEmail], USERPRINCIPALNAME(), Security[Region], DimRegion[Region], Security[EffectiveDate], MAX(Security[EffectiveDate]))",
      "LOOKUPVALUE(Security[Region], Security[UserEmail], USERPRINCIPALNAME()) = DimRegion[Region]",
      "FILTER(DimRegion, DimRegion[Region] = RELATED(Security[Region]))",
      "CALCULATE(SELECTEDVALUE(Security[Region]), Security[UserEmail] = USERPRINCIPALNAME())"
    ],
    "correct": 0
  },
  {
    "text": "You have a semantic model with a measure that uses CALCULATE with a filter context modification. You notice that the measure returns unexpected results when used with a slicer. Which DAX function should you use to preserve the external filter context?",
    "options": [
      "FILTER to override the filter context",
      "KEEPFILTERS to preserve the existing filter context",
      "ALL to remove all filters",
      "VALUES to return unique values"
    ],
    "correct": 1
  },
  {
    "text": "You have a Fabric warehouse with a table that contains 500 million rows. You need to create an index to improve query performance for a column that is frequently used in WHERE clauses. Which type of index should you create?",
    "options": [
      "B-tree index on the frequently filtered column",
      "Columnstore index for analytical queries",
      "Hash index for exact match lookups",
      "Full-text index for text searches"
    ],
    "correct": 0
  },
  {
    "text": "You have a Dataflow Gen2 that sources data from a REST API. The API returns JSON data with nested arrays. You need to flatten the nested arrays into separate rows. Which Power Query transformation should you use?",
    "options": [
      "Expand the nested array column using the Expand button",
      "Use the Parse JSON function to convert the array to a table",
      "Use Table.ExpandRecordColumn to expand each array element",
      "All of the above are valid approaches depending on the data structure"
    ],
    "correct": 3
  },
  {
    "text": "You have a semantic model with a calculated table that uses CALENDARAUTO(). The model has data from January 2024 to December 2025. What date range will the calculated table return?",
    "options": [
      "January 1, 2024 to December 31, 2025",
      "January 1, 2023 to December 31, 2026",
      "January 1, 2024 to December 31, 2026",
      "The full range of dates found in any date column in the model"
    ],
    "correct": 3
  },
  {
    "text": "You need to create a measure that calculates the rank of each product by sales amount within its category. Which DAX pattern should you use?",
    "options": [
      "RANKX(ALL(DimProduct), [Total Sales], , DESC, DENSE)",
      "RANKX(ALLSELECTED(DimProduct), [Total Sales], , DESC, DENSE)",
      "RANKX(VALUES(DimProduct[Category]), [Total Sales], , DESC, DENSE)",
      "RANKX(FILTER(ALL(DimProduct), DimProduct[Category] = EARLIER(DimProduct[Category])), [Total Sales])"
    ],
    "correct": 0
  },
  {
    "text": "You have a Fabric lakehouse with a Delta table. You need to partition the table by year and month to improve query performance. The table currently has no partitions. What is the correct approach?",
    "options": [
      "Use ALTER TABLE to add partitioning on the date columns",
      "Create a new table with partitioning and use INSERT OVERWRITE to copy the data",
      "Use the OPTIMIZE command with partitioning options",
      "Partitioning is automatically applied to Delta tables based on file size"
    ],
    "correct": 1
  },
  {
    "text": "You have a semantic model with a measure that uses HASONEVALUE. You need to create a measure that shows a different value when a single value is selected versus when multiple values are selected. Which pattern should you use?",
    "options": [
      "IF(HASONEVALUE(DimProduct[Category]), [Single Category Measure], [All Categories Measure])",
      "IF(COUNTROWS(VALUES(DimProduct[Category])) = 1, [Single Category Measure], [All Categories Measure])",
      "SWITCH(SELECTEDVALUE(DimProduct[Category]), [Single Category Measure], [All Categories Measure])",
      "Both A and B are correct approaches"
    ],
    "correct": 3
  },
  {
    "text": "You have a Fabric warehouse with a stored procedure that uses a cursor to process rows one at a time. You need to optimize the stored procedure for better performance. Which approach should you use?",
    "options": [
      "Replace the cursor with a set-based operation using MERGE",
      "Increase the cursor fetch size to 1000",
      "Use a WHILE loop instead of a cursor",
      "Add NOCOUNT ON to reduce network traffic"
    ],
    "correct": 0
  },
  {
    "text": "You have a semantic model with Direct Lake mode. You need to ensure that the model can handle queries that scan large datasets without falling back to DirectQuery. What is the BEST approach?",
    "options": [
      "Increase the memory allocation for the semantic model",
      "Create aggregation tables at different granularities",
      "Enable query scaleout to distribute the query load",
      "Convert the model to Import mode"
    ],
    "correct": 1
  },
  {
    "text": "You have a Dataflow Gen2 that uses parameterized queries to filter data from a SQL Server source. You need to ensure that the parameter values are passed to the source query for optimal performance. Which approach should you use?",
    "options": [
      "Use the parameter directly in the source query and ensure query folding occurs",
      "Filter the data in Power Query after loading all data from the source",
      "Use a function to dynamically generate the query based on parameters",
      "Create a separate dataflow for each parameter value"
    ],
    "correct": 0
  },
  {
    "text": "You have a semantic model with a many-to-many relationship. A user creates a visual that shows total sales by product category. The sales amounts appear to be duplicated. What is the MOST LIKELY cause?",
    "options": [
      "The many-to-many relationship is configured with bidirectional filtering",
      "The fact table has duplicate rows for the same transaction",
      "The dimension table has duplicate values in the key column",
      "The measure is using an implicit calculation instead of an explicit measure"
    ],
    "correct": 0
  },
  {
    "text": "You need to create a measure that calculates the percentage of total sales for each product category, but you want to maintain the filter context from the report. Which DAX expression should you use?",
    "options": [
      "DIVIDE([Total Sales], CALCULATE([Total Sales], ALL(DimProduct[Category])))",
      "DIVIDE([Total Sales], CALCULATE([Total Sales], ALLSELECTED(DimProduct[Category])))",
      "DIVIDE([Total Sales], SUM(FactSales[SalesAmount]))",
      "DIVIDE([Total Sales], CALCULATE([Total Sales], REMOVEFILTERS(DimProduct[Category])))"
    ],
    "correct": 1
  },
  {
    "text": "You have a Fabric warehouse with a table that contains sensitive data. You need to implement dynamic data masking to show partial SSN values. Which masking function should you use?",
    "options": [
      "default()",
      "email()",
      "partial(prefix, suffix)",
      "random(range)"
    ],
    "correct": 2
  },
  {
    "text": "You have a semantic model with a calculated column that uses FORMAT to create a month-year string. You notice that the sort order is incorrect in visuals. What should you do?",
    "options": [
      "Create a MonthKey calculated column using YEAR and MONTH functions and sort by it",
      "Use the FORMAT function with a different format string",
      "Add a sort-by-column property to the formatted column",
      "Both A and C are correct approaches"
    ],
    "correct": 3
  },
  {
    "text": "You have a Fabric lakehouse with a Delta table. You need to perform a merge operation that updates existing rows and inserts new rows based on a key column. Which command should you use?",
    "options": [
      "INSERT INTO ... SELECT ... ON DUPLICATE KEY UPDATE",
      "MERGE INTO target USING source ON target.key = source.key WHEN MATCHED THEN UPDATE ... WHEN NOT MATCHED THEN INSERT ...",
      "UPDATE target SET ... FROM target INNER JOIN source ON target.key = source.key",
      "INSERT OVERWRITE INTO target SELECT * FROM source"
    ],
    "correct": 1
  },
  {
    "text": "You have a semantic model with a measure that uses SUMX. The measure calculates total sales by multiplying quantity and price for each row. You notice that the measure is slow for large datasets. What is the BEST optimization approach?",
    "options": [
      "Create a calculated column for the line total (quantity * price) and use SUM on it",
      "Replace SUMX with SUM to reduce iteration",
      "Use FILTER to reduce the number of rows before SUMX",
      "Create an aggregation table at a higher level"
    ],
    "correct": 0
  },
  {
    "text": "You have a Dataflow Gen2 that sources data from a SharePoint list. You need to refresh the dataflow every 15 minutes. What is the MINIMUM refresh interval you can configure?",
    "options": [
      "15 minutes",
      "30 minutes",
      "1 hour",
      "The refresh interval depends on the capacity plan"
    ],
    "correct": 0
  },
  {
    "text": "You have a semantic model with a role-playing dimension for Date. You need to create measures that use different date relationships (OrderDate, ShipDate, DeliveryDate). How should you model this?",
    "options": [
      "Create three separate date tables and link each to the fact table with an active relationship",
      "Use USERELATIONSHIP in each measure to specify the correct date relationship",
      "Create a single date table with three inactive relationships and use USERELATIONSHIP in measures",
      "Both B and C are valid approaches"
    ],
    "correct": 3
  },
  {
    "text": "You have a Fabric warehouse. You need to create a view that combines data from multiple tables and applies row-level security. Which approach should you use?",
    "options": [
      "Create a view with a WHERE clause that filters based on the current user",
      "Create a view and apply RLS separately using security policies",
      "Create a stored procedure that returns filtered data based on the user",
      "Create a view and use dynamic data masking to restrict access"
    ],
    "correct": 1
  },
  {
    "text": "You have a semantic model with a calculated table that uses GENERATESERIES. The table generates a series of numbers from 1 to 1000. You need to add a column that calculates the cumulative sum of these numbers. Which DAX expression should you use?",
    "options": [
      "ADDCOLUMNS(Series, \"CumulativeSum\", SUMX(FILTER(Series, Series[Index] <= EARLIER(Series[Index])), Series[Index]))",
      "ADDCOLUMNS(Series, \"CumulativeSum\", SUMX(FILTER(Series, Series[Index] <= Series[Index]), Series[Index]))",
      "Series[CumulativeSum] = SUMX(FILTER(Series, Series[Index] <= EARLIER(Series[Index])), Series[Index])",
      "Both A and C are correct approaches"
    ],
    "correct": 3
  },
  {
    "text": "You have a Fabric lakehouse with a Delta table containing 2TB of data. You need to write a Spark notebook that performs a join with a 10GB dimension table. Which join strategy should you use for optimal performance?",
    "options": [
      "Broadcast join to send the small dimension table to all executors",
      "Sort-merge join to handle the large datasets efficiently",
      "Shuffle-hash join for balanced distribution",
      "Nested loop join for precise matching"
    ],
    "correct": 0
  },
  {
    "text": "You have a semantic model with a measure that uses CALCULATE with a date filter. You need to ensure that the measure always calculates relative to the current date, regardless of the report's filter context. Which DAX function should you use?",
    "options": [
      "TODAY()",
      "NOW()",
      "DATE(TODAY(), 1, 1)",
      "YEAR(TODAY())"
    ],
    "correct": 0
  },
  {
    "text": "You have a Dataflow Gen2 that uses staging to improve performance. You need to reference a staging table from another dataflow. What is the maximum number of staging tables you can reference?",
    "options": [
      "1 staging table per dataflow",
      "5 staging tables per dataflow",
      "10 staging tables per dataflow",
      "There is no limit to the number of staging tables you can reference"
    ],
    "correct": 3
  },
  {
    "text": "You have a semantic model with a calculated column that uses RELATED to pull data from a dimension table. The column is used in a visual that shows sales by category. You notice that some rows show blank values for the category. What is the MOST LIKELY cause?",
    "options": [
      "The RELATED function is not supported in calculated columns",
      "The fact table has foreign key values that do not match any row in the dimension table",
      "The relationship between the tables is inactive",
      "The dimension table has duplicate values in the key column"
    ],
    "correct": 1
  },
  {
    "text": "You have a Fabric warehouse with a table that contains 100 million rows. You need to create a columnstore index to improve analytical query performance. Which statement should you use?",
    "options": [
      "CREATE NONCLUSTERED INDEX IX_Table_Column ON Table(Column)",
      "CREATE CLUSTERED COLUMNSTORE INDEX CCI ON Table",
      "CREATE INDEX IX_Table_Column ON Table(Column) WITH (DATA_COMPRESSION = COLUMNSTORE)",
      "ALTER TABLE Table ADD INDEX (Column) TYPE = COLUMNSTORE"
    ],
    "correct": 1
  },
  {
    "text": "You have a semantic model with a measure that uses RANKX. You need to rank products by sales amount within each category. Which expression should you use?",
    "options": [
      "RANKX(ALL(DimProduct), [Total Sales], , DESC, DENSE)",
      "RANKX(VALUES(DimProduct[ProductID]), [Total Sales], , DESC, DENSE)",
      "RANKX(FILTER(ALL(DimProduct), DimProduct[Category] = EARLIER(DimProduct[Category])), [Total Sales])",
      "RANKX(ALLSELECTED(DimProduct), [Total Sales], , DESC, DENSE)"
    ],
    "correct": 0
  },
  {
    "text": "You have a Dataflow Gen2 that sources data from a CSV file. The file contains a header row and 1 million data rows. You need to promote the first row to headers and change the data type of a column. Which order should you apply these transformations?",
    "options": [
      "Change data type first, then promote headers",
      "Promote headers first, then change data type",
      "The order does not matter",
      "Apply both transformations simultaneously using a custom function"
    ],
    "correct": 1
  },
  {
    "text": "You have a semantic model with a calculated table that uses CROSSJOIN to create all combinations of two tables. The first table has 100 rows and the second table has 50 rows. How many rows will the calculated table contain?",
    "options": [
      "150 rows",
      "5,000 rows",
      "100 rows",
      "50 rows"
    ],
    "correct": 1
  },
  {
    "text": "You have a Fabric lakehouse with a Delta table. You need to run a SQL query that joins data from two different lakehouses. What is the correct approach?",
    "options": [
      "Use multi-catalog queries to join tables from different lakehouses",
      "Create shortcuts to the other lakehouse and query them together",
      "Export data from one lakehouse and import it into the other",
      "Both A and B are valid approaches"
    ],
    "correct": 3
  },
  {
    "text": "You have a semantic model with a measure that uses CALCULATE with a filter on a date column. You need to ensure that the filter applies to the entire date range, not just the visible dates. Which DAX function should you use?",
    "options": [
      "FILTER to override the filter context",
      "ALL to remove all filters on the date column",
      "ALLSELECTED to keep the external filter context",
      "REMOVEFILTERS to remove filters from the date column"
    ],
    "correct": 1
  },
  {
    "text": "You have a Dataflow Gen2 that uses a custom function to process data. The function is slow for large datasets. You need to optimize the function for better performance. Which approach should you use?",
    "options": [
      "Use Table.Buffer to cache the input data",
      "Use List.Buffer to cache list operations",
      "Parallelize the function using List.ParallelTransform",
      "All of the above are valid optimization approaches"
    ],
    "correct": 3
  },
  {
    "text": "You have a semantic model with a calculated column that uses LOOKUPVALUE to pull data from a dimension table. The column is used in a visual that shows sales by region. You notice that some rows show the default value instead of the expected region name. What is the MOST LIKELY cause?",
    "options": [
      "LOOKUPVALUE does not support calculated columns",
      "The lookup value does not exist in the dimension table, so the default value is returned",
      "The relationship between the tables is inactive",
      "The dimension table has duplicate values in the key column"
    ],
    "correct": 1
  },
  {
    "text": "You have a Fabric warehouse with a table that contains a column with sensitive data. You need to implement dynamic data masking to show only the last 4 digits of a credit card number. Which masking function should you use?",
    "options": [
      "default()",
      "email()",
      "partial(0, '****')",
      "random(1, 100)"
    ],
    "correct": 2
  },
  {
    "text": "You have a semantic model with a measure that uses SUMX to calculate the total profit. The profit is calculated as (SalesAmount - CostAmount). You notice that the measure is slow for large datasets. What is the BEST optimization approach?",
    "options": [
      "Create a calculated column for the profit (SalesAmount - CostAmount) and use SUM on it",
      "Replace SUMX with SUM to reduce iteration",
      "Use FILTER to reduce the number of rows before SUMX",
      "Create an aggregation table at a higher level"
    ],
    "correct": 0
  },
  {
    "text": "You have a Dataflow Gen2 that sources data from a REST API. The API returns paginated results. You need to combine all pages into a single table. Which Power Query function should you use?",
    "options": [
      "Table.Combine to merge all pages",
      "List.Generate to iterate through pages",
      "Json.Document to parse each page",
      "Both A and B are valid approaches"
    ],
    "correct": 3
  },
  {
    "text": "You have a semantic model with a calculated table that uses DISTINCT to extract unique values from a column. The source column contains 10,000 unique values. How many rows will the calculated table contain?",
    "options": [
      "10,000 rows",
      "More than 10,000 rows if there are duplicates",
      "Less than 10,000 rows if there are duplicates",
      "The exact number depends on the data distribution"
    ],
    "correct": 0
  },
  {
    "text": "You have a Fabric lakehouse with a Delta table. You need to perform a full outer join between this table and a dimension table. The fact table has 1 billion rows and the dimension table has 100,000 rows. Which join strategy should you use?",
    "options": [
      "Broadcast join to send the dimension table to all executors",
      "Sort-merge join to handle the large datasets efficiently",
      "Shuffle-hash join for balanced distribution",
      "Nested loop join for precise matching"
    ],
    "correct": 1
  },
  {
    "text": "You have a semantic model with a measure that uses CALCULATE with a filter on a category column. You need to ensure that the filter applies even when the category is filtered in the report. Which DAX function should you use?",
    "options": [
      "FILTER to override the filter context",
      "ALL to remove all filters on the category column",
      "ALLSELECTED to keep the external filter context",
      "KEEPFILTERS to preserve the existing filter context"
    ],
    "correct": 3
  },
  {
    "text": "You have a Dataflow Gen2 that uses a parameter to dynamically select a data source. You need to ensure that the parameter value is validated before the dataflow runs. Which approach should you use?",
    "options": [
      "Use a try-catch block in Power Query to handle invalid values",
      "Validate the parameter value in a separate dataflow before calling the main dataflow",
      "Use a function to validate the parameter and return an error if invalid",
      "All of the above are valid approaches"
    ],
    "correct": 3
  },
  {
    "text": "You have a semantic model with a calculated column that uses FORMAT to create a percentage string. You need to sort the column by the underlying numeric value. What should you do?",
    "options": [
      "Create a numeric calculated column and use the Sort by Column property on the formatted column",
      "Use the FORMAT function with a different format string that preserves sort order",
      "Add a sort-by-column property to the formatted column",
      "Both A and C are correct approaches"
    ],
    "correct": 3
  },
  {
    "text": "You have a Fabric warehouse with a table that contains 50 million rows. You need to create a partitioned table to improve query performance. Which column should you partition by?",
    "options": [
      "A column with high cardinality (many unique values)",
      "A column with low cardinality (few unique values)",
      "A column that is frequently used in WHERE clauses",
      "Both B and C are correct considerations"
    ],
    "correct": 3
  },
  {
    "text": "You have a semantic model with a measure that uses DIVIDE. The denominator can be zero. You need to ensure that the measure returns blank when the denominator is zero. Which expression should you use?",
    "options": [
      "DIVIDE([Numerator], [Denominator], BLANK())",
      "IF([Denominator] = 0, BLANK(), [Numerator] / [Denominator])",
      "DIVIDE([Numerator], [Denominator])",
      "Both A and B are correct approaches"
    ],
    "correct": 3
  },
  {
    "text": "You have a Dataflow Gen2 that sources data from a SQL Server table. You need to filter the data at the source to improve performance. Which transformation should you apply first?",
    "options": [
      "Filter rows based on the date column",
      "Select specific columns to retrieve",
      "Sort the data by a column",
      "Group the data by a column"
    ],
    "correct": 0
  },
  {
    "text": "You have a semantic model with a calculated table that uses CALENDAR. The function generates dates from January 1, 2024 to December 31, 2025. How many rows will the calculated table contain?",
    "options": [
      "365 rows",
      "730 rows",
      "731 rows",
      "The number depends on whether 2024 is a leap year"
    ],
    "correct": 2
  },
  {
    "text": "You have a Fabric lakehouse with a Delta table. You need to run a Spark SQL query that uses a window function to calculate a running total. Which syntax should you use?",
    "options": [
      "SELECT *, SUM(SalesAmount) OVER (ORDER BY OrderDate) AS RunningTotal FROM Sales",
      "SELECT *, SUM(SalesAmount) OVER (PARTITION BY ProductID ORDER BY OrderDate) AS RunningTotal FROM Sales",
      "SELECT *, SUM(SalesAmount) OVER (ROWS UNBOUNDED PRECEDING) AS RunningTotal FROM Sales",
      "All of the above are valid window function syntaxes"
    ],
    "correct": 3
  },
  {
    "text": "You have a semantic model with a measure that uses COUNTBLANK. The measure counts blank values in a column. You need to ensure that the measure only counts blanks for the current filter context. Which DAX function should you use?",
    "options": [
      "ALL to remove all filters",
      "ALLSELECTED to keep the external filter context",
      "FILTER to override the filter context",
      "KEEPFILTERS to preserve the existing filter context"
    ],
    "correct": 1
  },
  {
    "text": "You have a Dataflow Gen2 that uses a custom function to process each row of a table. The function is slow for large datasets. You need to optimize the function for better performance. Which approach should you use?",
    "options": [
      "Use Table.Buffer to cache the input data",
      "Use List.Buffer to cache list operations",
      "Parallelize the function using List.ParallelTransform",
      "All of the above are valid optimization approaches"
    ],
    "correct": 3
  },
  {
    "text": "You have a semantic model with a calculated column that uses RELATEDTABLE to count the number of orders for each customer. The column is used in a visual that shows customers by order count. You notice that some rows show zero instead of the expected count. What is the MOST LIKELY cause?",
    "options": [
      "RELATEDTABLE is not supported in calculated columns",
      "The relationship between the tables is inactive",
      "The customer has no orders in the fact table",
      "The dimension table has duplicate values in the key column"
    ],
    "correct": 2
  }
]
```
