// DP-600 teaching cards, domain 2: Prepare data.
window.DP600_TEACH = (window.DP600_TEACH || []).concat([
  // 2.1.1 Connections
  { skill: '2.1.1', title: 'What a connection is', text: 'Stores how Fabric reaches a source: address, authentication and credentials. Pipelines and dataflows <b>reuse</b> it instead of embedding secrets.' },
  { skill: '2.1.1', title: 'Three kinds', text: '<b>Cloud</b>: internet-reachable sources, no gateway.<br><b>On-premises gateway</b>: sources in your network.<br><b>VNet gateway</b>: Azure services inside a virtual network.' },
  { skill: '2.1.1', title: 'Authentication', text: 'Basic, organizational account, <b>service principal</b>, <b>workspace identity</b>. <b>Windows auth</b> works only through an on-premises gateway.' },
  { skill: '2.1.1', title: 'Connection or shortcut?', text: 'To read OneLake, ADLS Gen2 or S3 data <b>in place</b>, use a <b>shortcut</b>, not a copy through a connection.' },

  // 2.1.2 Discover
  { skill: '2.1.2', title: 'OneLake catalog', text: 'Search all <b>batch</b> data items you can access. Shows owner, <b>label</b>, <b>endorsement</b> and last refresh.' },
  { skill: '2.1.2', title: 'Catalog tabs', text: '<b>Explore</b>: browse and filter.<br><b>Govern</b>: your governance gaps.<br><b>Secure</b>: workspace and OneLake roles.' },
  { skill: '2.1.2', title: 'Real-Time hub', text: 'The catalog for <b>streaming</b> data: eventstreams and KQL tables. Subscribe, set Activator alerts, or add new sources.' },

  // 2.1.3 Ingest
  { skill: '2.1.3', title: 'No copy: shortcut', text: 'A <b>shortcut</b> references data in ADLS Gen2, S3 or another OneLake location. Nothing is copied, and it uses <b>your identity</b>.' },
  { skill: '2.1.3', title: 'Continuous copy: mirroring', text: '<b>Mirroring</b> replicates an operational database (SQL, Cosmos DB, Snowflake) into OneLake with no pipeline.' },
  { skill: '2.1.3', title: 'Orchestrate: pipeline', text: 'A <b>data pipeline</b> with a <b>Copy activity</b> schedules bulk copies with retries and alerts.' },
  { skill: '2.1.3', title: 'Transform: dataflow or notebook', text: '<b>Dataflow Gen2</b>: low-code Power Query.<br><b>Notebook</b>: Spark code at scale.<br><b>Eventstream</b>: real-time events.' },
  { skill: '2.1.3', title: 'Lakehouse layout', text: '<b>Tables</b>: managed Delta, schema enforced.<br><b>Files</b>: any format, no schema. Land raw in Files, then transform to Tables.' },

  // 2.1.4 Choose a store
  { skill: '2.1.4', title: 'Lakehouse', text: 'Spark plus <b>read-only T-SQL</b>. Structured, semi-structured and unstructured data. Engineering, ML, medallion.' },
  { skill: '2.1.4', title: 'Warehouse', text: 'Full <b>T-SQL</b> (DML and DDL), <b>multi-table transactions</b>, schema on write. SQL-first teams and star schemas.' },
  { skill: '2.1.4', title: 'Eventhouse', text: '<b>KQL</b> database for streaming, logs and <b>time-series</b>. Append-optimized, not for frequent UPDATE or DELETE.' },
  { skill: '2.1.4', title: 'Mix them', text: 'All three store open formats in OneLake and connect by <b>shortcuts</b> and cross-database queries. Choose <b>per workload</b>, not once.' },

  // 2.1.5 OneLake integration
  { skill: '2.1.5', title: 'Eventhouse: OneLake availability', text: 'Turn it on for a KQL database or table and a <b>Delta copy</b> appears in OneLake. Lakehouse, warehouse, Spark and Direct Lake can read it.' },
  { skill: '2.1.5', title: 'Semantic model: OneLake integration', text: 'Exposes the model\'s data as Delta tables in OneLake, but <b>Import tables only</b>. Not DirectQuery, Direct Lake, measures or calc groups.' },

  // 2.2.1 Views, functions, procs
  { skill: '2.2.1', title: 'View', text: 'A named SELECT. Always current, <b>stores no data</b>, hides joins. Read-only.' },
  { skill: '2.2.1', title: 'Functions', text: '<b>Inline table-valued</b>: a parameterized view you query in FROM.<br><b>Scalar</b>: returns one value. Neither writes data.' },
  { skill: '2.2.1', title: 'Stored procedure', text: 'Multi-step, <b>parameterized</b>, can <b>write</b> (INSERT, UPDATE, DELETE, CTAS) and use TRY...CATCH. Pipelines can call it.' },
  { skill: '2.2.1', title: 'Where you can create them', text: 'All in a <b>warehouse</b>. The lakehouse <b>SQL endpoint</b> is read-only for data but allows views and functions.' },

  // 2.2.2 Enrich
  { skill: '2.2.2', title: 'Derive once, use everywhere', text: 'Add calculated columns, categories and date parts in the transformation layer, not in every report.' },
  { skill: '2.2.2', title: 'How, by tool', text: '<b>T-SQL</b>: <code>CASE</code>, <code>YEAR()</code>.<br><b>Spark</b>: <code>withColumn</code>.<br><b>Dataflow</b>: Add column > Custom column.' },
  { skill: '2.2.2', title: 'Add data with joins', text: 'Joins bring in columns (customer name, category). A new table can be a date dimension or a summary built with <b>CTAS</b>.' },

  // 2.2.3 Star schema
  { skill: '2.2.3', title: 'Facts and dimensions', text: '<b>Fact</b>: one row per event; keys and numeric measures. <b>Dimension</b>: describes who, what, when, where.' },
  { skill: '2.2.3', title: 'Define the grain first', text: 'The <b>grain</b> is what one fact row means (e.g. one order line). It decides which keys and measures belong.' },
  { skill: '2.2.3', title: 'Surrogate keys', text: 'A system-generated key on each dimension. It avoids source key clashes and lets <b>SCD Type 2</b> keep several versions of one member.' },
  { skill: '2.2.3', title: 'Dimension patterns', text: '<b>Conformed</b>: shared by facts (Date).<br><b>Role-playing</b>: one Date used as order, ship, delivery.<br><b>Junk</b>: small flags merged.' },
  { skill: '2.2.3', title: 'Slowly changing dimensions', text: '<b>Type 1</b>: overwrite, no history.<br><b>Type 2</b>: new row with start, end and current flag.<br><b>Type 3</b>: a "previous value" column.' },

  // 2.2.4 Denormalize
  { skill: '2.2.4', title: 'What it means', text: 'Flatten related tables into one wide table. A snowflake Product, Subcategory, Category becomes <b>one Product table</b>.' },
  { skill: '2.2.4', title: 'Trade-off', text: '<b>Gain</b>: fewer joins, faster and simpler queries.<br><b>Cost</b>: repeated values and more to update.' },
  { skill: '2.2.4', title: 'How', text: 'Warehouse: join then <b>CTAS</b> or <code>INSERT...SELECT</code>. Spark: join and write Delta. Dataflow: <b>Merge queries</b> then expand.' },
  { skill: '2.2.4', title: 'Dimensions, not facts', text: 'Denormalize <b>dimensions</b>. Keep the fact table narrow: keys and measures only.' },

  // 2.2.5 Aggregate
  { skill: '2.2.5', title: 'GROUP BY and HAVING', text: '<code>GROUP BY</code> collapses rows. <b>WHERE</b> filters rows <b>before</b> grouping; <b>HAVING</b> filters groups <b>after</b>.' },
  { skill: '2.2.5', title: 'Other tools', text: 'PySpark: <code>groupBy().agg()</code>. Power Query: <b>Group by</b> (<code>Table.Group</code>).' },
  { skill: '2.2.5', title: 'Window functions keep rows', text: '<code>OVER (PARTITION BY ... ORDER BY ...)</code> gives running totals and ranks <b>without collapsing</b> rows.' },
  { skill: '2.2.5', title: 'Summary tables', text: 'An <b>aggregate table</b> pre-computes totals at a higher grain so dashboards scan far fewer rows.' },

  // 2.2.6 Merge/join
  { skill: '2.2.6', title: 'Join types', text: '<b>Inner</b>: matches only. <b>Left</b>: all left. <b>Full outer</b>: all rows from both. <b>Cross</b>: every combination.' },
  { skill: '2.2.6', title: 'Anti and semi', text: '<b>Left anti</b>: left rows with <b>no</b> match. <b>Left semi</b>: left rows that <b>have</b> a match (Spark).' },
  { skill: '2.2.6', title: 'Merge vs append', text: 'Dataflow <b>Merge</b> = join (adds columns). <b>Append</b> = union (adds rows).' },
  { skill: '2.2.6', title: 'Spark and upserts', text: '<b>broadcast</b> a small table to avoid a shuffle. <code>MERGE</code> inserts new rows and updates existing ones in one statement.' },

  // 2.2.7 Duplicates/nulls
  { skill: '2.2.7', title: 'Remove duplicates', text: 'SQL: <code>DISTINCT</code> or <code>ROW_NUMBER() ... WHERE rn = 1</code>. Spark: <code>dropDuplicates([keys])</code>. Power Query: Remove Duplicates.' },
  { skill: '2.2.7', title: 'Replace nulls', text: 'T-SQL <code>ISNULL</code> / <code>COALESCE</code>. Spark <code>fillna</code>. Power Query Replace Values.' },
  { skill: '2.2.7', title: 'Drop or fill?', text: 'Fill a missing region with "Unknown". Drop a row missing a key you must join on (<code>IS NOT NULL</code>, <code>dropna</code>).' },
  { skill: '2.2.7', title: 'Null behaviour', text: 'Test with <code>IS NULL</code>, never <code>= NULL</code>. <code>COUNT(col)</code> ignores NULLs; <code>COUNT(*)</code> counts every row.' },

  // 2.2.8 Convert types
  { skill: '2.2.8', title: 'Why it matters', text: 'CSV loads everything as text. Wrong types break sums, sorting and joins. Convert in the transformation layer.' },
  { skill: '2.2.8', title: 'By tool', text: '<b>T-SQL</b>: <code>CAST</code>, <code>CONVERT</code>.<br><b>PySpark</b>: <code>col().cast("decimal(18,2)")</code>.<br><b>Power Query</b>: Change Type.' },
  { skill: '2.2.8', title: 'Safe conversion', text: '<code>TRY_CAST</code> and <code>TRY_CONVERT</code> return <b>NULL</b> instead of an error. In Power Query use <b>Using Locale</b> for culture-specific dates.' },

  // 2.2.9 Filter
  { skill: '2.2.9', title: 'Filter early', text: 'Filter rows and drop columns as the <b>first steps</b>. Every later step handles less data.' },
  { skill: '2.2.9', title: 'Query folding', text: 'Power Query can push a filter to the source as SQL. Right-click a step > <b>View Native Query</b>; greyed out = <b>no folding</b> from there on.' },
  { skill: '2.2.9', title: 'Breaks folding', text: 'Pivot/unpivot, merging different sources, complex custom columns, <code>Table.Buffer</code>. CSV and Excel generally do not fold.' },
  { skill: '2.2.9', title: 'In Spark', text: '<code>df.filter(...)</code>. Filtering on a Delta <b>partition column</b> skips files that cannot match.' },

  // 2.3.1 Visual query editor
  { skill: '2.3.1', title: 'No-code queries', text: 'Drag tables onto a canvas and build a query visually. Available in a <b>warehouse</b> and a lakehouse <b>SQL endpoint</b>.' },
  { skill: '2.3.1', title: 'What it can do', text: 'Choose columns, filter, sort, <b>Group by</b>, <b>Merge</b> (join), <b>Append</b> (union). <b>View SQL</b> shows the T-SQL.' },
  { skill: '2.3.1', title: 'Read-only', text: 'It only generates SELECT. Save it as a <b>view</b>. For DML, procedures or CTEs use the SQL editor.' },

  // 2.3.2 SQL
  { skill: '2.3.2', title: 'Clause order', text: 'Logical order: <b>FROM, WHERE, GROUP BY, HAVING, SELECT, ORDER BY</b>. Why a SELECT alias works in ORDER BY but not WHERE.' },
  { skill: '2.3.2', title: 'Window functions', text: '<code>ROW_NUMBER</code>, <code>RANK</code>, <code>DENSE_RANK</code>, <code>LAG</code>, <code>LEAD</code>, <code>SUM() OVER</code>. Rows are kept.' },
  { skill: '2.3.2', title: 'CTEs and CTAS', text: '<code>WITH name AS (...)</code> names a step you can chain. <code>CREATE TABLE ... AS SELECT</code> saves a result.' },
  { skill: '2.3.2', title: 'Where DML works', text: 'Only a <b>warehouse</b> accepts INSERT, UPDATE, DELETE. The lakehouse endpoint is read-only.' },

  // 2.3.3 KQL
  { skill: '2.3.3', title: 'A pipeline of operators', text: 'Start with a table, then pipe with <code>|</code>: <code>Telemetry | where ... | summarize ... | take 10</code>.' },
  { skill: '2.3.3', title: 'Core operators', text: '<code>where</code> filters, <code>project</code> picks columns, <code>extend</code> adds a column and <b>keeps the rest</b>, <code>summarize ... by</code> aggregates.' },
  { skill: '2.3.3', title: 'Time and top', text: '<code>bin(Timestamp, 5m)</code> buckets time. <code>take n</code> = any n rows; <code>top n by col</code> sorts first. <code>distinct</code>, <code>count</code>.' },
  { skill: '2.3.3', title: 'Automate in the database', text: '<b>Update policies</b> transform data on ingestion. <b>Materialized views</b> pre-compute. <b>Stored functions</b> reuse logic.' },

  // 2.3.4 DAX query
  { skill: '2.3.4', title: 'A DAX query returns a table', text: 'Start with <code>EVALUATE</code>. Use <code>SUMMARIZECOLUMNS(col, "Name", [Measure])</code> to group and aggregate; <code>ORDER BY</code> to sort.' },
  { skill: '2.3.4', title: 'Filter in DAX', text: '<code>CALCULATE([Sales], Product[Color] = "Red")</code>. Prefer a simple <b>column filter</b> to <code>FILTER</code> over a whole table.' },
  { skill: '2.3.4', title: 'Look-ups and counts', text: '<code>RELATED</code> follows a relationship. <code>LOOKUPVALUE</code> matches without one. <code>DISTINCTCOUNT</code> counts unique values.' },
]);
