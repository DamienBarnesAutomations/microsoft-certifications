// DP-600 lessons, domain 3: Implement and manage semantic models. Source: dp600/modules (M3.1-M3.3) and Microsoft Learn.
window.DP600_LESSONS = (window.DP600_LESSONS || []).concat([
  {
    skill: '3.1.1',
    summary: 'Storage mode decides where the model gets its data and how fresh and fast it is. In Fabric, start with Direct Lake and move away only when you must.',
    explain: `
<table>
<tr><th>Mode</th><th>Data lives</th><th>Speed</th><th>Freshness</th><th>Choose when</th></tr>
<tr><td><b>Direct Lake</b></td><td>Delta tables in OneLake, loaded into memory on demand</td><td>Fast</td><td>Near real time</td><td>Fabric-native data (default for models created from a lakehouse or warehouse)</td></tr>
<tr><td><b>Import</b></td><td>Compressed copy inside the model</td><td>Fastest</td><td>As of last refresh</td><td>Non-Fabric sources, maximum speed, features Direct Lake lacks</td></tr>
<tr><td><b>DirectQuery</b></td><td>The source system</td><td>Depends on source</td><td>Real time</td><td>Real-time needs, data too big to import, data must stay at the source</td></tr>
<tr><td><b>Dual</b></td><td>Both: acts as Import or DirectQuery per query</td><td>-</td><td>-</td><td>Dimension tables in a composite model, to avoid limited relationships</td></tr>
<tr><td><b>Composite</b></td><td>Tables use different modes</td><td>Varies</td><td>Mixed</td><td>Cross-source or hybrid needs</td></tr>
</table>
<p><b>Direct Lake detail:</b> there is no import and no full refresh to schedule. A refresh is <b>framing</b>: a metadata update that points the model at the latest Delta table version. Framing runs automatically when <i>Keep your Direct Lake data up to date</i> is on (default), on a schedule, or through the REST API or TOM. Columns load on demand when first queried.</p>
<p>Tip for Import: connect to views, bring only the columns you need and use proper data types to keep the model small.</p>`,
    traps: [
      'Direct Lake does not copy data into the model, and it does not translate to source SQL like DirectQuery.',
      'Import is fastest but only as fresh as its last refresh.',
      'Direct Lake models automatically enable the large semantic model storage format.',
    ],
  },
  {
    skill: '3.1.2',
    summary: 'In a semantic model, a star schema gives clear filter paths from dimensions to facts. Flatten snowflakes unless there is a strong reason not to.',
    explain: `
<ul>
<li>Dimensions filter facts through <b>one-to-many</b> relationships, filtering <b>from the dimension (one) to the fact (many)</b>.</li>
<li>Prefer <b>single-direction</b> filtering. Fewer tables and relationships mean simpler DAX, faster queries and clearer paths for Copilot and data agents.</li>
<li><b>Flatten a snowflake</b> (Product, Subcategory, Category into one Product table) before it reaches the model, with a Power Query merge, a SQL join or a notebook. Hierarchies need columns from a single table.</li>
<li><b>Keep a snowflake</b> only when a hierarchy has many levels and flattening creates dozens of redundant columns, several fact tables share a sub-dimension, or row-level security must apply at a specific level.</li>
<li>Use a proper <b>date table</b> marked as the date table, so time-intelligence functions work.</li>
<li>In Direct Lake and DirectQuery, relationships perform best with <b>low-cardinality</b> keys and intact <b>referential integrity</b> (the engine can use INNER instead of LEFT OUTER joins).</li>
</ul>`,
    traps: [
      'A circular or ambiguous relationship path confuses report authors and AI.',
      'Filter dimension tables for RLS, not fact tables; relationships carry the filter to the facts.',
    ],
  },
  {
    skill: '3.1.3',
    summary: 'Relationships control how filters flow. Know one-to-many, bridge tables for many-to-many, filter direction, inactive relationships and referential integrity.',
    explain: `
<ul>
<li><b>One-to-many</b> is the standard: one unique dimension value to many fact rows.</li>
<li><b>Many-to-many</b> (neither side unique): use a <b>bridge table</b> holding the unique key pairs, with one-to-many relationships from each dimension to the bridge. Or use a many-to-many cardinality relationship. Example: customers and accounts.</li>
<li><b>Filter direction:</b> single from dimension to fact by default. <b>Bi-directional</b> filtering is sometimes needed for many-to-many, but it can hurt performance and cause surprises, so use it sparingly.</li>
<li><b>Only one active relationship</b> can exist between two tables. Make the others <b>inactive</b> and activate one inside a measure with <code>USERELATIONSHIP</code> (order date vs ship date on one Date table: a <b>role-playing dimension</b>).</li>
<li><b>Assume referential integrity</b> lets the engine use INNER JOINs (faster in Direct Lake and DirectQuery). If it is untrue, unmatched fact rows silently disappear.</li>
<li>A relationship across storage or source groups is a <b>limited</b> relationship (INNER join semantics).</li>
</ul>`,
    example: `<pre><code>Shipped Amount =
CALCULATE(
    SUM(Sales[Amount]),
    USERELATIONSHIP(Sales[ShipDate], 'Date'[Date]))</code></pre>`,
    traps: [
      'Inactive relationships do nothing until a measure calls USERELATIONSHIP.',
      'When RLS depends on a relationship, an inactive or broken relationship means filters do not propagate.',
    ],
  },
  {
    skill: '3.1.4',
    summary: 'DAX measures run in filter context. Use variables to keep them readable and fast, iterators for row-level logic, and the right functions for tables, windows and information.',
    explain: `
<h3>Context</h3>
<p><b>Row context</b> is "the current row" (calculated columns, iterators). <b>Filter context</b> is the set of rows left by slicers, visuals and relationships (measures). <code>CALCULATE</code> changes filter context.</p>
<h3>Variables</h3>
<p><code>VAR ... RETURN</code> evaluates an expression once, reuses it and makes formulas readable and debuggable (change RETURN to inspect a variable).</p>
<h3>Iterators</h3>
<p><code>SUMX</code>, <code>AVERAGEX</code>, <code>COUNTX</code>, <code>MAXX</code>, <code>RANKX</code> evaluate an expression per row of a table, then aggregate. Use them for row-level maths such as <code>Quantity * UnitPrice</code>. <code>SUM(col)</code> is shorthand for <code>SUMX(table, col)</code>.</p>
<h3>Table filtering</h3>
<p><code>FILTER(table, condition)</code> returns the rows that pass; <code>ALL</code> / <code>REMOVEFILTERS</code> clear filters; <code>KEEPFILTERS</code> intersects with existing filters instead of replacing them; <code>TREATAS</code> applies values as a filter on another column.</p>
<h3>Windowing</h3>
<p><code>INDEX</code>, <code>OFFSET</code>, <code>WINDOW</code>, <code>RANK</code>, <code>ROWNUMBER</code> return rows relative to the current row (moving averages, previous-row comparisons, top N per group). Give them <code>orderBy</code> explicitly; <code>partitionBy</code> restarts per group, like SQL <code>PARTITION BY</code>. They return tables or positions, so wrap them: <code>SUMX(WINDOW(...), [Measure])</code>.</p>
<h3>Information functions</h3>
<table>
<tr><th>Function</th><th>True when</th></tr>
<tr><td>ISBLANK</td><td>The value is blank (not the same as 0)</td></tr>
<tr><td>HASONEVALUE</td><td>Exactly one value in the filter context</td></tr>
<tr><td>ISFILTERED</td><td>The column itself is directly filtered</td></tr>
<tr><td>ISCROSSFILTERED</td><td>The column, or another column in the same or a related table, is filtered</td></tr>
<tr><td>ISINSCOPE</td><td>The column is the level currently shown in a hierarchy</td></tr>
</table>`,
    example: `<pre><code>Profit Margin =
VAR Revenue = SUM(Sales[Revenue])
VAR Cost = SUM(Sales[Cost])
RETURN DIVIDE(Revenue - Cost, Revenue)

Product Rank =
IF(HASONEVALUE('Product'[Product]),
   RANKX(ALL('Product'[Product]), [Quantity], , , DENSE))</code></pre>`,
    traps: [
      'ISFILTERED vs ISCROSSFILTERED, and HASONEVALUE vs ISINSCOPE, are classic exam distinctions.',
      '<code>HASONEVALUE</code> around <code>RANKX</code> stops the total row from showing a rank.',
      'Measures are computed on demand; calculated columns are stored and increase model size.',
    ],
  },
  {
    skill: '3.1.5',
    summary: 'Calculation groups, dynamic format strings and field parameters reduce duplicated measures and let report users change what a visual shows.',
    explain: `
<h3>Calculation groups</h3>
<p>One group holds <b>calculation items</b> that modify whichever measure is in context, using <code>SELECTEDMEASURE()</code>. 50 measures times YTD, QTD and MTD would be 150 extra measures; one calculation group replaces them. Use one when <b>three or more</b> measures share a pattern (time intelligence, currency conversion, actual vs budget). Create them in Model view.</p>
<h3>Dynamic format strings</h3>
<p>A format-string expression on a calculation item changes how the result displays, for example <code>"0.0%"</code> for a YoY % item, so one base measure can show as currency or as a percentage.</p>
<h3>Field parameters</h3>
<p><b>Modeling > New parameter > Fields</b>. Creates a calculated table with one row per field (display name, <code>NAMEOF</code> reference, order). Put the parameter on a visual's axis (columns) or values (measures) and drive it with a slicer. It can mix measures and dimensions. It is disconnected from the model, so it filters nothing by itself. Keep the three-column shape.</p>
<p>These create calculated tables implicitly; Direct Lake on OneLake supports them, and they are the exception to "no calculated tables" for Direct Lake on SQL analytics endpoint.</p>`,
    example: `<pre><code>// Calculation item: Year-to-Date
CALCULATE(SELECTEDMEASURE(), DATESYTD('Date'[Date]))</code></pre>`,
    traps: [
      'Implicit measures do not work with calculation groups.',
      'A field parameter switches fields on a visual; it does not apply security or schedule anything.',
    ],
  },
  {
    skill: '3.1.6',
    summary: 'The large semantic model storage format lets a model grow past the service default size and unlocks XMLA write, query scale-out and version history.',
    explain: `
<ul>
<li>In the Fabric service the default model size limit is <b>1 GB</b>. <b>10 GB</b> is the Power BI Desktop upload ceiling, which this setting does not change. With the large format on, the model can grow on refresh up to the <b>capacity size</b> (or a limit the capacity admin sets).</li>
<li><b>Direct Lake models enable it automatically.</b> For Import and DirectQuery models you enable it yourself.</li>
<li>It is a prerequisite for <b>XMLA endpoint read-write</b>, <b>query scale-out</b> and <b>semantic model version history</b>. It also improves XMLA write performance.</li>
<li><b>Query scale-out</b> spreads read queries across read-only replicas for high concurrency. Replicas sync after each refresh, so there can be a short delay.</li>
</ul>
<p>Turn it on when volumes exceed the default, you need XMLA write access, you want scale-out, or you need version history. Enable it <b>before the first refresh</b> of a very large model in the service to avoid timeouts and size limits.</p>`,
    traps: [
      'It is not needed for incremental refresh.',
      'Query scale-out needs the large format first.',
    ],
  },
  {
    skill: '3.1.7',
    summary: 'A composite model mixes storage modes or sources in one model. Know why you would, and how relationships across groups behave.',
    explain: `
<p>Use a composite model when you need to:</p>
<ul>
<li>combine Fabric data with non-Fabric sources;</li>
<li>keep real-time tables beside cached ones (a Direct Lake fact with a small Import reference table);</li>
<li>extend a published semantic model with extra tables (DirectQuery for Power BI semantic models);</li>
<li>combine a streaming eventhouse with historical lakehouse data.</li>
</ul>
<p>Rules to know:</p>
<ul>
<li>Set storage mode <b>per table</b>; check cross-source relationships at real volumes.</li>
<li>A relationship across <b>source groups</b> is <b>limited</b>: many-to-many cardinality, INNER JOIN semantics, and rows with no match disappear.</li>
<li>Set shared <b>dimension tables to Dual</b> so they can answer from cache or the source and avoid limited relationships. Dual is a performance optimisation: a stale cache can differ from the source.</li>
<li><b>Aggregations</b> are a classic composite pattern: an Import summary table plus a DirectQuery detail table.</li>
<li>Direct Lake on OneLake supports composite models with Import tables. Direct Lake on SQL analytics endpoint does not mix with DirectQuery or Dual tables.</li>
</ul>`,
    traps: [
      'A dual table related to a DirectQuery table from a different source behaves like an import table, and its relationships are limited.',
      'Cross-source relationships are created as many-to-many by default.',
    ],
  },
  {
    skill: '3.2.1',
    summary: 'Find the slow part first with Performance analyzer, then fix the biggest contributor. Slow visuals are usually a DAX, cardinality or visual-design problem.',
    explain: `
<p><b>Performance analyzer</b> (Optimize ribbon, or View menu in the service in edit mode): <b>Start recording</b>, interact, <b>Stop</b>. Clear the visual cache first so results are real. Each visual's time splits into:</p>
<table>
<tr><th>Metric</th><th>Means</th></tr>
<tr><td>DAX query</td><td>Model and measure time; the most common bottleneck</td></tr>
<tr><td>Visual display</td><td>Rendering time</td></tr>
<tr><td>Direct query</td><td>Time in the external source</td></tr>
<tr><td>Other</td><td>Waiting, preparing, network</td></tr>
</table>
<p>Copy or <b>Run in DAX query view</b> the visual's query to analyse it. <b>DAX Studio</b> adds Server Timings (formula engine vs storage engine), query plans and model metrics.</p>
<p>Fixes:</p>
<ul>
<li>Fewer visuals per page and fewer slicers; avoid high-cardinality fields in visuals.</li>
<li><b>Reduce cardinality</b>: remove unused columns (GUIDs, free text, unused keys), truncate datetime to date, bucket continuous values, filter out old rows, use numeric instead of text keys.</li>
<li>Do calculations in Power Query or the source, not DAX calculated columns (better compression, faster refresh).</li>
<li><b>Aggregations</b> for very large fact tables with summary-level queries; a composite model keeps detail in DirectQuery.</li>
</ul>`,
    traps: [
      'Compare relative timings and repeat measurements; test with production-sized data.',
      'Incremental refresh speeds up refresh, not visual rendering.',
    ],
  },
  {
    skill: '3.2.2',
    summary: 'DAX gets slow from repeated evaluation, row-by-row iteration over big tables, and heavy filter patterns. A few rewrites fix most of it.',
    explain: `
<ul>
<li><b>Use variables</b>: an expression used twice (like a prior-year calculation) is evaluated once.</li>
<li><b>Prefer a Boolean column filter over FILTER on a table</b>: <code>CALCULATE([Sales], Sales[Amount] &gt; 1000)</code> beats <code>CALCULATE([Sales], FILTER(Sales, Sales[Amount] &gt; 1000))</code>. FILTER is still needed when the condition uses a measure, several columns or OR logic.</li>
<li><b>Replace <code>COUNTROWS(FILTER(...))</code></b> with <code>CALCULATE(COUNTROWS(...), condition)</code>.</li>
<li><b>Avoid unnecessary iterators</b> over very large tables: <code>SUM(Sales[LineTotal])</code> beats <code>SUMX</code> when a column already holds the value. Iterators are right when you need row-level logic.</li>
<li>Avoid <b>deeply nested CALCULATE</b>; split into smaller measures.</li>
<li>Avoid <code>LOOKUPVALUE</code> and <code>SEARCH</code> in iterators; use <code>RELATED</code>.</li>
<li><b>Move static calculations upstream</b> (Power Query or source SQL).</li>
<li>Use <code>KEEPFILTERS</code> to <i>preserve</i> existing filters (a correctness tool, not a speed-up).</li>
</ul>
<p>Copilot and data agents run DAX behind the scenes, so slow measures hurt AI answers too.</p>`,
    traps: [
      'DIVIDE is fine; it just handles divide-by-zero for you.',
      'Calculated columns evaluate after load and compress worse than Power Query columns.',
    ],
  },
  {
    skill: '3.2.3',
    summary: 'In Direct Lake on SQL analytics endpoint, some queries fall back to DirectQuery. Know what causes it, how to see it, and how to control it.',
    explain: `
<p><b>Fallback exists only for Direct Lake on SQL analytics endpoint.</b> Direct Lake on OneLake never falls back; the query or refresh fails instead.</p>
<p>Causes of fallback:</p>
<ul>
<li>the table is a non-materialized <b>SQL view</b>;</li>
<li><b>RLS, OLS or dynamic data masking</b> is enforced in the SQL analytics endpoint;</li>
<li>the table is not framed yet, is missing, or the schema drifted;</li>
<li>the Delta table exceeds <b>guardrails</b> (files, row groups, rows);</li>
<li>the capacity is under memory pressure, or a transient error occurs.</li>
</ul>
<p>The model property <b>Direct Lake behavior</b>:</p>
<table>
<tr><th>Setting</th><th>Effect</th></tr>
<tr><td>Automatic (default)</td><td>Falls back to DirectQuery and still returns results (slower)</td></tr>
<tr><td>Direct Lake only</td><td>Errors instead of falling back; use in development to expose fallback</td></tr>
<tr><td>DirectQuery only</td><td>Always DirectQuery; for measuring fallback speed</td></tr>
</table>
<p>Diagnose with <code>EVALUATE TABLETRAITS()</code>: the <b>DirectLakeFallbackInfo</b> column shows the reason per table (None means Direct Lake mode). Then fix the cause: <b>materialize the view as a Delta table</b>, refresh to frame it, move SQL RLS/OLS into the semantic model, or run <code>OPTIMIZE</code> and <code>VACUUM</code>.</p>
<p><b>Refresh = framing</b>, a metadata update to the latest Delta version. Automatic updates ("Keep your Direct Lake data up to date") are on by default. With them off and no refresh, the model keeps serving the last framed version.</p>`,
    traps: [
      'Do not leave fallback as a performance strategy.',
      'A relationship that forces a table to fall back also gives that table DirectQuery relationship behavior.',
    ],
  },
  {
    skill: '3.2.4',
    summary: 'Two Direct Lake flavors: on OneLake (reads Delta directly, no fallback) and on the SQL analytics endpoint (one source, can use views, can fall back).',
    explain: `
<table>
<tr><th></th><th>Direct Lake on OneLake</th><th>Direct Lake on SQL analytics endpoint</th></tr>
<tr><td>Reads from</td><td>Delta tables in one or more Fabric items: lakehouse, warehouse, mirrored database, SQL database, KQL database with OneLake availability</td><td>The SQL analytics endpoint of a <b>single</b> source</td></tr>
<tr><td>SQL views</td><td>No (materialize them)</td><td>Yes, but they trigger fallback</td></tr>
<tr><td>Security</td><td>OneLake security</td><td>Checked through the SQL layer</td></tr>
<tr><td>DirectQuery fallback</td><td><b>Never</b></td><td>Yes (Automatic setting)</td></tr>
<tr><td>Mixing</td><td>Composite with Import tables supported</td><td>Cannot mix with DirectQuery or Dual</td></tr>
</table>
<p><b>Choose OneLake</b> for most Fabric-native models: multiple sources, no SQL layer, no fallback to reason about. <b>Choose SQL endpoint</b> when the table you need is a SQL view, or when permissions are enforced in the SQL endpoint and you accept DirectQuery fallback for those queries.</p>`,
    traps: [
      'Only the SQL endpoint flavor has a Direct Lake behavior setting that matters.',
      'A KQL database must have OneLake availability turned on to be used by Direct Lake on OneLake.',
    ],
  },
  {
    skill: '3.2.5',
    summary: 'Incremental refresh partitions a large Import table so each refresh reloads only recent data. It cuts refresh time, memory and source load, not visual render time.',
    explain: `
<ol>
<li>Create two Power Query parameters named exactly <b>RangeStart</b> and <b>RangeEnd</b> (reserved, case-sensitive, <b>Date/Time</b> type).</li>
<li>Filter the table's date column between them. Use <code>&gt;= RangeStart</code> and <code>&lt; RangeEnd</code> (one boundary inclusive). The filter must be static and must <b>fold</b> to the source, or each partition reads everything.</li>
<li>Right-click the table > <b>Incremental refresh</b>: set the <b>archive period</b> (history to keep) and the <b>refresh period</b> (recent window to reload each time).</li>
<li>Publish. The <b>first refresh in the service</b> creates the historical and incremental partitions and overrides the parameters per partition. Desktop only loads the sample range.</li>
</ol>
<p>Each refresh rolls the window: partitions leaving the refresh period become historical and are merged; partitions older than the archive period are dropped.</p>
<p>Optional <b>Get the latest data in real time</b> adds a DirectQuery partition for the newest rows (a hybrid table; needs Premium or Fabric capacity).</p>
<p>Use it for fact tables that grow and have a reliable date column. Not for small tables or sources that cannot filter by date. It applies to Import (and hybrid) tables; Direct Lake tables have no model partitions (partitioning is at the Delta level and the model just frames the latest files). Advanced scenarios use the XMLA endpoint to refresh specific partitions.</p>`,
    traps: [
      'Incremental refresh is not a query optimisation: slow visuals need Performance analyzer and DAX tuning.',
      'The large storage format is not a prerequisite for incremental refresh.',
      'Partitions are created in the service on first refresh, not on publish in Desktop.',
    ],
  },
]);
