// DP-600 lessons, domain 2: Prepare data. Source: dp600/modules (M1.2-M1.5, M2.1-M2.5, M3.2) and Microsoft Learn.
window.DP600_LESSONS = (window.DP600_LESSONS || []).concat([
  {
    skill: '2.1.1',
    summary: 'A connection stores how Fabric reaches an external source: the address, the authentication kind and the credentials. Items reference connections instead of embedding secrets.',
    explain: `
<p>Manage connections under <b>Settings > Manage connections and gateways</b>, or create one from the <b>New connection</b> dialog when you add a source. Dataflows Gen2, pipelines and other items can reuse the same connection.</p>
<table>
<tr><th>Connection type</th><th>Reaches</th><th>Needs</th></tr>
<tr><td>Cloud connection</td><td>Sources reachable over the internet (Azure SQL Database, SaaS)</td><td>No gateway</td></tr>
<tr><td>On-premises data gateway</td><td>Sources inside your network (on-premises SQL Server, file shares)</td><td>Gateway installed on a server in that network; outbound connections only</td></tr>
<tr><td>Virtual network (VNet) data gateway</td><td>Azure services locked inside an Azure virtual network</td><td>A managed service you provision in Azure and bind to a capacity; nothing to install</td></tr>
</table>
<p><b>Authentication kinds:</b> Basic, organizational account (OAuth/Entra), service principal and <b>workspace identity</b>. A workspace identity is a managed service principal tied to a workspace; it lets items reach sources such as firewall-protected ADLS Gen2 without storing a secret.</p>
<p><b>Windows authentication works only through an on-premises data gateway.</b></p>
<p>If you only need to <i>read data in place</i> from OneLake, ADLS Gen2 or S3, use a <b>shortcut</b> instead of copying through a connection.</p>`,
    traps: [
      'A gateway is infrastructure; a connection is the reusable item that can run through it.',
      'A VNet gateway cannot reach on-premises sources.',
      'If tenant outbound access protection is on, outbound connections are blocked until a data connection rule allows them.',
    ],
  },
  {
    skill: '2.1.2',
    summary: 'The OneLake catalog finds batch data (lakehouses, warehouses, models). Real-Time hub finds streaming data (eventstreams and KQL tables).',
    explain: `
<h3>OneLake catalog</h3>
<p>A searchable inventory of items across the tenant. It shows only what your permissions allow. Each item shows name, type, owner, last refresh, workspace, <b>sensitivity label</b> and <b>endorsement</b>. It has three tabs: <b>Explore</b> (browse and filter by domain, type, endorsement), <b>Govern</b> (your governance posture and recommendations) and <b>Secure</b> (workspace roles and OneLake security roles).</p>
<p>Once you find a table, connect with a <b>shortcut</b> (no copy). Check it first with the lakehouse's SQL analytics endpoint. A semantic model's details page shows overview, tables, lineage and monitor tabs.</p>
<h3>Real-Time hub</h3>
<p>The catalog for <b>streaming</b> data: eventstreams and KQL tables you can access, with details such as owner, endorsement and whether data is arriving. From a stream you can set <b>Activator</b> alerts, or query a KQL table with a KQL queryset. <b>Add data</b> connects new sources such as Event Hubs, IoT Hub, CDC, Kafka and Kinesis.</p>`,
    traps: [
      'OneLake catalog = batch items; Real-Time hub = streaming items.',
      'Reuse an endorsed item before building a duplicate.',
    ],
  },
  {
    skill: '2.1.3',
    summary: 'Pick the ingestion tool by who builds it and how much data there is: shortcuts and mirroring for no or low copying, pipelines for orchestration, dataflows for low-code, notebooks for code.',
    explain: `
<table>
<tr><th>Need</th><th>Use</th></tr>
<tr><td>Reference data where it is, no copy</td><td><b>Shortcut</b> (ADLS Gen2, S3, other OneLake)</td></tr>
<tr><td>Continuously replicate an operational database</td><td><b>Mirroring</b> (SQL Server, Azure SQL, Cosmos DB, Snowflake)</td></tr>
<tr><td>Orchestrate, schedule, retry, bulk copy</td><td><b>Data pipeline</b> with a Copy activity</td></tr>
<tr><td>Low-code Power Query transformations</td><td><b>Dataflow Gen2</b></td></tr>
<tr><td>Code-based, large-scale transformation</td><td><b>Notebook</b> (Spark)</td></tr>
<tr><td>Real-time events</td><td><b>Eventstream</b></td></tr>
<tr><td>A local CSV or Parquet file</td><td>Upload, then <b>Load to Table</b> (no code)</td></tr>
</table>
<p>A lakehouse has <b>Tables</b> (managed Delta, schema enforced) and <b>Files</b> (any format, no schema). Land raw data in Files, then transform into Tables. Shortcuts use <b>your identity</b> to read the target, so you need permissions there. A shortcut is not right when you need a point-in-time snapshot, when network latency hurts, or when policy requires a separate copy.</p>
<p>Dataflow Gen2 destinations include lakehouse, warehouse, SQL database, ADLS Gen2 and Kusto. Update methods: <b>Replace</b>, <b>Append</b> and <b>Incremental refresh</b>.</p>`,
    traps: [
      'Shortcuts and mirroring avoid building a copy pipeline; shortcuts do not copy at all.',
      'A SQL analytics endpoint is read-only: you cannot load data into a lakehouse through it.',
    ],
  },
  {
    skill: '2.1.4',
    summary: 'Choose the store by data type, query language, write pattern and team skills: lakehouse, warehouse or eventhouse. All three store open formats in OneLake.',
    explain: `
<table>
<tr><th></th><th>Lakehouse</th><th>Warehouse</th><th>Eventhouse</th></tr>
<tr><td>Best for</td><td>Data engineering, ML, mixed data</td><td>SQL-first BI, dimensional models</td><td>Real-time, time-series, logs</td></tr>
<tr><td>Language</td><td>Spark; read-only T-SQL</td><td>Full T-SQL (DML and DDL)</td><td>KQL (plus a T-SQL subset)</td></tr>
<tr><td>Writes</td><td>Spark, pipelines, dataflows</td><td>T-SQL; multi-table ACID transactions</td><td>Streaming and batch ingestion; append-optimized</td></tr>
<tr><td>Data</td><td>Structured, semi-structured, unstructured</td><td>Structured</td><td>Time-series, event, semi-structured</td></tr>
<tr><td>Schema</td><td>On read (Delta enforcement optional)</td><td>On write</td><td>On write, with dynamic fields</td></tr>
</table>
<p>Also in Fabric: <b>SQL database</b> for operational (OLTP) workloads and <b>Cosmos DB</b> for NoSQL and AI scenarios.</p>
<p>Warehouses support single-table and <b>multi-table</b> transactions; a lakehouse supports single-table ACID through Delta only. Solutions often combine all three: lakehouse for engineering, warehouse for the curated BI layer, eventhouse for real-time monitoring. They connect through <b>shortcuts</b> and <b>cross-database queries</b> (three-part names).</p>`,
    traps: [
      '"The team writes T-SQL stored procedures and needs transactions" = warehouse.',
      '"JSON, images and Spark notebooks" = lakehouse. "Sensor telemetry queried with KQL" = eventhouse.',
      'The eventhouse is not for frequent UPDATE and DELETE.',
    ],
  },
  {
    skill: '2.1.5',
    summary: 'OneLake integration makes data from an eventhouse or a semantic model readable as Delta tables by other Fabric engines, with no export pipeline.',
    explain: `
<h3>Eventhouse: OneLake availability</h3>
<p>Turn it on for a KQL database or one table. Fabric keeps a <b>Delta copy</b> in OneLake as data is ingested, so a lakehouse (through a shortcut), warehouse, notebook or <b>Direct Lake on OneLake</b> semantic model can read it. The mirroring policy's <code>TargetLatencyInMinutes</code> sets how quickly data appears; a very short delay creates many small files. While it is on, table renames and column type changes are not allowed: turn it off, change, turn it on.</p>
<h3>Semantic model: OneLake integration</h3>
<p>When enabled, the model's data appears as Delta tables in OneLake for notebooks, pipelines and other items. It exports <b>Import mode tables only</b>. Direct Lake tables, DirectQuery tables, measures and calculation group tables are not exported. (Direct Lake tables already sit in OneLake as Delta.)</p>
<p>Choose OneLake availability when consumers use SQL, Spark or Power BI and need table-format data; keep KQL for low-latency analytics on the stream.</p>`,
    traps: [
      'OneLake integration for semantic models exports Import tables, not DirectQuery or Direct Lake.',
      'Direct Lake on OneLake over a KQL database needs OneLake availability enabled on it.',
    ],
  },
  {
    skill: '2.2.1',
    summary: 'Views, functions and stored procedures package T-SQL logic so you write it once. Pick the object by what it must do.',
    explain: `
<table>
<tr><th>Object</th><th>Does</th><th>Writes data?</th></tr>
<tr><td>View</td><td>A named SELECT. Always current, stores no data, hides joins, can limit columns or rows</td><td>No</td></tr>
<tr><td>Inline table-valued function</td><td>A parameterized view; used in FROM</td><td>No</td></tr>
<tr><td>Scalar function</td><td>Returns one value (preview in a warehouse)</td><td>No</td></tr>
<tr><td>Stored procedure</td><td>Multi-step logic, parameters, TRY...CATCH, INSERT, UPDATE, DELETE, CTAS</td><td>Yes</td></tr>
</table>
<p>In a <b>warehouse</b> you can create all of them. The lakehouse <b>SQL analytics endpoint</b> is read-only for data but still lets you create views and functions over its Delta tables.</p>
<p>View or table? A view is always fresh and uses no storage. Materialize into a table (CTAS or a procedure) when the logic is expensive, the result is large, or dashboards hit it constantly. Stored procedures can be called from <b>pipelines</b> to schedule them.</p>`,
    example: `<pre><code>CREATE FUNCTION gold.fn_sales_by_year (@year INT)
RETURNS TABLE
AS RETURN (
  SELECT product_key, SUM(sales_amount) AS total_sales
  FROM gold.fact_sales WHERE fiscal_year = @year
  GROUP BY product_key);

SELECT * FROM gold.fn_sales_by_year(2025);</code></pre>`,
    traps: [
      'Views and functions cannot write data. Choose a stored procedure for that.',
      'A view on the SQL endpoint is not read in Direct Lake mode: it falls back to DirectQuery.',
    ],
  },
  {
    skill: '2.2.2',
    summary: 'Enrich data by deriving new columns (calculations, categories, date parts) or by adding tables, once in the transformation layer rather than in every report.',
    explain: `
<p>Define a rule once, near the data, so every report agrees.</p>
<ul>
<li><b>T-SQL:</b> <code>quantity * unit_price AS line_total</code>, <code>YEAR(order_date)</code>, <code>CASE WHEN ... THEN ... END</code> for tiers.</li>
<li><b>Spark:</b> <code>df.withColumn("line_total", col("quantity") * col("unit_price"))</code>; <code>when(...).otherwise(...)</code> for conditionals.</li>
<li><b>Dataflow Gen2:</b> Add column > <b>Custom column</b> (M), conditional column, or merge queries to bring in columns from another table.</li>
<li><b>Joins</b> bring in columns from other tables (customer names, product categories).</li>
</ul>
<p>A new table can be a date dimension, a lookup, or a summary table built with <b>CTAS</b> or by writing a Delta table.</p>
<p>In Power Query, a step's gear icon edits it; a step without a gear must be deleted and redone.</p>`,
    traps: [
      'Calculated <i>columns</i> in a semantic model are stored and slow refresh; prefer doing this upstream or as a measure.',
      'In PySpark, wrap each condition in parentheses and use <code>&amp;</code> and <code>|</code>.',
    ],
  },
  {
    skill: '2.2.3',
    summary: 'A star schema puts a fact table in the middle and denormalized dimension tables around it. It is the recommended shape for Fabric analytics and Power BI.',
    explain: `
<ul>
<li><b>Fact table:</b> one row per event. It holds dimension <b>keys</b>, numeric <b>measures</b> and sometimes degenerate attributes like an order number. Keep it narrow.</li>
<li><b>Dimension table:</b> describes who, what, when, where. It has a <b>surrogate key</b> (system-generated primary key), the <b>natural key</b> from the source, and attributes.</li>
</ul>
<p><b>Define the grain first</b> (what one fact row means, for example one order line). The grain decides which dimension keys and measures belong.</p>
<p>Fact types: <b>transaction</b> (one row per event), <b>periodic snapshot</b> (state at intervals, semi-additive), <b>accumulating snapshot</b> (a process with milestone dates, row updated as it progresses), and <b>factless</b> (events without measures). Measures are <b>additive</b> (revenue), <b>semi-additive</b> (balances; not across time) or <b>non-additive</b> (ratios; store the parts instead).</p>
<p>Dimension patterns: <b>conformed</b> (shared across facts, like Date), <b>role-playing</b> (one Date table used as order, ship and delivery date), <b>junk</b> (many small flags merged into one table), and hierarchies.</p>
<p><b>Slowly changing dimensions:</b> Type 1 overwrites (no history), <b>Type 2</b> adds a new row with start date, end date and current flag (full history), Type 3 adds a "previous value" column.</p>`,
    traps: [
      'Surrogate keys let Type 2 keep several versions of one entity and avoid key clashes between sources.',
      'Snowflake normalizes dimensions (more joins). For a semantic model, flatten it back (a view) because hierarchies need columns from one table.',
    ],
  },
  {
    skill: '2.2.4',
    summary: 'Denormalizing flattens related tables into one wide table so queries need fewer joins. Do it to dimensions, not facts.',
    explain: `
<p>A snowflake product dimension (Product, Subcategory, Category as three tables) becomes one <b>Product</b> table that carries Subcategory and Category as columns.</p>
<p><b>Benefit:</b> fewer joins, simpler and faster queries, the shape Power BI and Direct Lake like best. <b>Cost:</b> repeated values, more storage, and more rows to change when a value is updated.</p>
<p>How:</p>
<ul>
<li><b>Warehouse (T-SQL):</b> join the source tables and write with <code>CREATE TABLE AS SELECT</code> (CTAS) or <code>INSERT ... SELECT</code>.</li>
<li><b>Spark:</b> join DataFrames and write a Delta table.</li>
<li><b>Dataflow Gen2:</b> <b>Merge queries</b>, then expand the columns you need.</li>
</ul>
<p>Keep the fact table narrow (keys and measures). Keep a snowflake only when a shared sub-dimension changes often and must stay consistent.</p>`,
    traps: [
      'Denormalize dimensions; keep facts narrow.',
      'Normalization is for transactional systems; denormalization is for analytics.',
    ],
  },
  {
    skill: '2.2.5',
    summary: 'Aggregating collapses detail rows into summaries. Use it to answer questions and to build smaller tables that make reports faster.',
    explain: `
<ul>
<li><b>T-SQL / Spark SQL:</b> <code>GROUP BY</code> with <code>SUM</code>, <code>COUNT</code>, <code>AVG</code>. <code>WHERE</code> filters rows <b>before</b> grouping; <code>HAVING</code> filters groups <b>after</b>.</li>
<li><b>PySpark:</b> <code>df.groupBy("Region").agg(sum("Amount").alias("Total"))</code>.</li>
<li><b>Power Query:</b> <b>Group by</b> (M: <code>Table.Group</code>).</li>
<li><b>Window functions</b> (<code>OVER (PARTITION BY ... ORDER BY ...)</code>) compute running totals and ranks <b>without collapsing</b> rows.</li>
</ul>
<p>An <b>aggregate (summary) table</b> precomputes totals at a higher grain, for example daily from line items, so dashboards scan far fewer rows. Persist it with CTAS or a stored procedure.</p>`,
    example: `<pre><code>SELECT region, SUM(amount) AS total_sales
FROM sales
GROUP BY region
HAVING SUM(amount) &gt; 10000;</code></pre>`,
    traps: [
      'GROUP BY returns one row per group; a window function keeps every row.',
      'You cannot put an aggregate in WHERE; use HAVING.',
    ],
  },
  {
    skill: '2.2.6',
    summary: 'Joins add columns from another table by matching keys; appends (unions) stack rows. Know the join types and which tool to use.',
    explain: `
<table>
<tr><th>Join</th><th>Returns</th></tr>
<tr><td>INNER</td><td>Only rows matching in both tables</td></tr>
<tr><td>LEFT (outer)</td><td>All left rows, matches from the right (nulls where none)</td></tr>
<tr><td>RIGHT (outer)</td><td>All right rows, matches from the left</td></tr>
<tr><td>FULL OUTER</td><td>All rows from both</td></tr>
<tr><td>CROSS</td><td>Every combination (no ON clause)</td></tr>
<tr><td>LEFT ANTI (Spark, Power Query)</td><td>Left rows with <b>no</b> match on the right</td></tr>
<tr><td>LEFT SEMI (Spark)</td><td>Left rows that <b>do</b> have a match, left columns only</td></tr>
</table>
<ul>
<li><b>Dataflow Gen2:</b> <b>Merge queries</b> (join) and <b>Append queries</b> (union).</li>
<li><b>Spark:</b> <code>df.join(other, "key", "left")</code>. Hint <code>broadcast(small)</code> to send a small table to every executor and avoid a shuffle.</li>
<li><b>Warehouse:</b> cross-database joins with three-part names across warehouses and lakehouse SQL endpoints.</li>
</ul>
<p>For fact-to-dimension joins, inner or left joins are usual. <b>Merge</b> (upsert) with <code>MERGE</code> inserts new rows and updates existing ones in one statement, handy for dimensions.</p>`,
    traps: [
      'A merge across <b>different data sources</b> in Power Query breaks query folding.',
      'Inner join silently drops fact rows that have no matching dimension row.',
    ],
  },
  {
    skill: '2.2.7',
    summary: 'Duplicates and nulls distort counts, sums and joins. Remove or replace them explicitly, early in the pipeline.',
    explain: `
<h3>Duplicates</h3>
<ul>
<li>T-SQL / Spark SQL: <code>SELECT DISTINCT</code>, or keep one row per key with <code>ROW_NUMBER() OVER (PARTITION BY key ORDER BY date DESC)</code> and filter <code>rn = 1</code>.</li>
<li>PySpark: <code>df.dropDuplicates(["order_id"])</code>.</li>
<li>Power Query: right-click a column > <b>Remove Duplicates</b>.</li>
</ul>
<h3>Nulls</h3>
<ul>
<li>Replace: T-SQL <code>ISNULL(col, 0)</code> or <code>COALESCE(a, b, 'Unknown')</code>; PySpark <code>fillna({"Discount": 0})</code>; Power Query <b>Replace Values</b>.</li>
<li>Remove unusable rows: <code>WHERE customer_id IS NOT NULL</code>; PySpark <code>dropna()</code>; Power Query filter or <b>Remove Errors</b> / <b>Replace Errors</b>.</li>
<li>Test with <code>IS NULL</code>, never <code>= NULL</code>.</li>
</ul>
<p>Behaviour to remember: <code>COUNT(column)</code> ignores NULLs, <code>COUNT(*)</code> counts every row, and arithmetic with a NULL gives NULL. A null in a grouping column creates an "Unknown" group.</p>`,
    traps: [
      '<code>NULLIF(a, b)</code> returns NULL when the values match: it is not a replacement function.',
      'Choose replace vs drop by business meaning: a missing region can be "Unknown", a missing customer id usually cannot be joined.',
    ],
  },
  {
    skill: '2.2.8',
    summary: 'Convert columns to the right data type so math, sorting, date logic and joins work. CSV loads everything as text.',
    explain: `
<ul>
<li><b>T-SQL:</b> <code>CAST(amount AS DECIMAL(10,2))</code>, <code>CONVERT(...)</code>, and <code>TRY_CAST</code> / <code>TRY_CONVERT</code>, which return <b>NULL instead of an error</b> when conversion fails.</li>
<li><b>Spark SQL:</b> <code>CAST(order_date AS DATE)</code>. <b>PySpark:</b> <code>col("Amount").cast("decimal(18,2)")</code>.</li>
<li><b>Power Query:</b> <b>Change Type</b>; use <b>Using Locale</b> when text dates or numbers depend on culture (for example 31/12/2026).</li>
</ul>
<p>Low-precision decimals round values that matter in finance, so choose precision deliberately. A text column that looks numeric breaks sums. Convert in the transformation layer rather than in the report.</p>`,
    traps: [
      'Changing a type in Power Query folds to the source as a CAST in most relational sources.',
      'Use TRY_ variants when bad values are expected and should not stop the load.',
    ],
  },
  {
    skill: '2.2.9',
    summary: 'Filter early so every later step handles less data. Where the filter runs (at the source, in Spark, in the engine) decides how fast it is.',
    explain: `
<ul>
<li><b>T-SQL:</b> <code>WHERE</code>. <b>PySpark:</b> <code>df.filter((col("a") &gt; 0) &amp; (col("b") == "x"))</code>.</li>
<li><b>Power Query:</b> <b>Filter rows</b>, and filter and remove columns as the <b>first</b> steps.</li>
<li><b>Query folding</b> pushes the filter to the source as SQL so less data travels. Right-click a step and check <b>View Native Query</b>: if it is greyed out, that step and the rest do not fold.</li>
<li>Steps that typically fold: filter, select columns, sort, group, merge within one source, change type, rename. Steps that break folding: complex custom columns, pivot/unpivot, merging different sources, <code>Table.Buffer</code>. After a step breaks folding, everything after it runs locally.</li>
<li><b>Spark partition pruning:</b> filtering on the partition column of a Delta table skips files that cannot match.</li>
</ul>
<p>Other dataflow tuning: disable load on staging queries, use staging dataflows, and mark steps <b>Enable only in previews</b> to sample while authoring.</p>`,
    traps: [
      'File sources (CSV, Excel) generally do not support folding.',
      'Folding outcomes: full, partial or none. Aim for full on large sources.',
    ],
  },
  {
    skill: '2.3.1',
    summary: 'The visual query editor lets you build read-only queries by dragging tables onto a canvas, no code needed. It generates T-SQL.',
    explain: `
<p>Open it with <b>New visual query</b>. It is available in a <b>warehouse</b> and in a lakehouse <b>SQL analytics endpoint</b>. It only <b>reads</b> (it generates a SELECT).</p>
<ul>
<li>Choose or remove columns, <b>filter rows</b>, sort.</li>
<li><b>Group by</b> to aggregate (sum, count, and so on).</li>
<li><b>Merge queries</b> (join) and <b>Append queries</b> (union).</li>
<li><b>View SQL</b> shows the T-SQL it built; <b>Save as view</b> turns the query into a reusable view.</li>
</ul>
<p>Use it for quick exploration and simple joins. Use the SQL query editor when you need stored procedures, DML, window functions or CTEs.</p>`,
    traps: [
      'It cannot run INSERT, UPDATE or DELETE.',
      'Some steps cannot be expressed in SQL; a banner warns they cannot be saved as a view.',
    ],
  },
  {
    skill: '2.3.2',
    summary: 'T-SQL is the language of the warehouse and the lakehouse SQL analytics endpoint. Know the logical order of the clauses and when to use window functions and CTEs.',
    explain: `
<p><b>Logical processing order:</b> FROM, WHERE, GROUP BY, HAVING, SELECT, ORDER BY. That is why an alias from SELECT works in ORDER BY but not in WHERE.</p>
<ul>
<li><b>Filter:</b> <code>WHERE</code> before grouping; <code>HAVING</code> after.</li>
<li><b>Aggregate:</b> <code>GROUP BY</code> with <code>SUM</code>, <code>COUNT(DISTINCT x)</code>, <code>AVG</code>.</li>
<li><b>Window functions:</b> <code>ROW_NUMBER</code>, <code>RANK</code>, <code>DENSE_RANK</code>, <code>LAG</code>, <code>LEAD</code>, and <code>SUM() OVER</code> for running totals. They keep every row.</li>
<li><b>CTEs:</b> <code>WITH name AS (...)</code> name an intermediate result you can chain and reuse.</li>
<li><b>CTAS:</b> <code>CREATE TABLE ... AS SELECT</code> materializes a result.</li>
<li><b>Nulls and types:</b> <code>COALESCE</code>, <code>ISNULL</code>, <code>CAST</code>, <code>TRY_CAST</code>.</li>
</ul>`,
    example: `<pre><code>WITH monthly AS (
  SELECT YEAR(order_date) AS yr, MONTH(order_date) AS mo,
         SUM(amount) AS total
  FROM staging.orders GROUP BY YEAR(order_date), MONTH(order_date))
SELECT yr, mo, total,
       SUM(total) OVER (ORDER BY yr, mo) AS running_total
FROM monthly;</code></pre>`,
    traps: [
      'Only a warehouse accepts DML. The lakehouse endpoint is read-only.',
      'ROW_NUMBER gives unique numbers; RANK leaves gaps after ties.',
    ],
  },
  {
    skill: '2.3.3',
    summary: 'KQL queries a table through a pipeline of operators separated by |. It is built for time-series and log data in an eventhouse.',
    explain: `
<p>A query starts with a table, then pipes it through operators:</p>
<pre><code>Telemetry
| where Timestamp &gt; ago(1h)
| summarize avgSpeed = avg(Speed) by TruckId, bin(Timestamp, 5m)
| order by avgSpeed desc
| take 10</code></pre>
<ul>
<li><code>where</code> filters; <code>project</code> picks columns; <code>extend</code> adds a computed column and keeps the rest.</li>
<li><code>summarize ... by</code> aggregates; <code>bin(Timestamp, 5m)</code> buckets time.</li>
<li><code>take n</code> returns any n rows; <code>top n by col</code> sorts first. <code>distinct</code> returns unique values; <code>count</code> counts rows.</li>
<li>Time-series: <code>make-series</code>, <code>series_decompose_anomalies</code>.</li>
</ul>
<p>Eventhouse features: <b>update policies</b> transform data as it is ingested into another table; <b>materialized views</b> precompute summaries; <b>stored functions</b> reuse logic. A KQL queryset also accepts a subset of T-SQL.</p>`,
    traps: [
      'KQL has no <code>group by</code> operator: use <code>summarize ... by</code>.',
      'Filter first. After <code>summarize</code>, columns that were not grouped or aggregated are gone.',
      'Update policies run inside the KQL table, not in a semantic model.',
    ],
  },
  {
    skill: '2.3.4',
    summary: 'DAX queries start with EVALUATE and return a table. Use them to select, filter and aggregate data from a semantic model.',
    explain: `
<ul>
<li><b>Select and aggregate:</b> <code>SUMMARIZECOLUMNS(DimDate[Year], "Sales", [Total Sales])</code> groups by columns and adds measures.</li>
<li><b>Filter:</b> pass filters inside it, or use <code>CALCULATE([Total Sales], DimProduct[Color] = "Red")</code> in a measure. Prefer a simple <b>Boolean column filter</b> to <code>FILTER</code> over a whole table.</li>
<li><b>Sort:</b> <code>ORDER BY</code> after the table expression. <b>Define local measures:</b> <code>DEFINE MEASURE ...</code>.</li>
<li><b>Look up:</b> <code>RELATED</code> follows a relationship to the one side; <code>LOOKUPVALUE</code> matches on a column without a relationship.</li>
<li><b>Counts:</b> <code>DISTINCTCOUNT</code> counts unique values; <code>COUNTROWS</code> counts rows.</li>
</ul>
<p>Run DAX queries from DAX query view, DAX Studio, or from a notebook with <code>evaluate_dax</code> (SemPy).</p>`,
    example: `<pre><code>EVALUATE
SUMMARIZECOLUMNS(
  DimDate[Year],
  "Sales", [Total Sales])
ORDER BY DimDate[Year]</code></pre>`,
    traps: [
      'A DAX query must return a table, so it starts with EVALUATE.',
      'DIVIDE handles division by zero; use it instead of the / operator when blanks are possible.',
    ],
  },
]);
