// DP-600 teaching cards, domain 3: Implement and manage semantic models.
window.DP600_TEACH = (window.DP600_TEACH || []).concat([
  // 3.1.1 Storage mode
  { skill: '3.1.1', title: 'Direct Lake', text: 'Reads <b>Delta tables in OneLake</b> into memory on demand. Fast and near real time. The <b>default</b> for Fabric-native data.' },
  { skill: '3.1.1', title: 'Import', text: 'A compressed <b>copy in the model</b>. Fastest, but only as fresh as the last refresh. Best for non-Fabric sources.' },
  { skill: '3.1.1', title: 'DirectQuery', text: 'Queries go to the <b>source</b> every time. Real-time, no stored data; speed depends on the source. For huge or must-stay-at-source data.' },
  { skill: '3.1.1', title: 'Dual and composite', text: '<b>Composite</b>: tables use different modes. <b>Dual</b>: a table acts as Import or DirectQuery per query.' },
  { skill: '3.1.1', title: 'Direct Lake "refresh"', text: 'It is <b>framing</b>: a metadata update pointing at the latest Delta files. No data is imported.' },

  // 3.1.2 Star schema for model
  { skill: '3.1.2', title: 'Filters flow downhill', text: 'Dimensions filter facts through <b>one-to-many</b> relationships, dimension to fact. Prefer <b>single-direction</b> filters.' },
  { skill: '3.1.2', title: 'Flatten snowflakes', text: 'Merge Product, Subcategory, Category into one table before the model. Fewer tables = simpler DAX and clearer for Copilot.' },
  { skill: '3.1.2', title: 'When to keep a snowflake', text: 'Many-level hierarchies, a sub-dimension shared by several facts, or RLS needed at a specific level.' },
  { skill: '3.1.2', title: 'Date table', text: 'Use a proper date table and <b>mark it as the date table</b> so time intelligence works.' },

  // 3.1.3 Relationships
  { skill: '3.1.3', title: 'Many-to-many', text: 'Use a <b>bridge table</b>: unique key pairs, with one-to-many relationships from each dimension to the bridge. E.g. customers and accounts.' },
  { skill: '3.1.3', title: 'Filter direction', text: 'Single direction by default. <b>Bi-directional</b> is sometimes needed for many-to-many but can hurt performance and surprise you.' },
  { skill: '3.1.3', title: 'One active relationship', text: 'Only one active relationship between two tables. Others are <b>inactive</b>; switch on in a measure with <code>USERELATIONSHIP</code>.' },
  { skill: '3.1.3', title: 'Assume referential integrity', text: 'Lets the engine use <b>INNER</b> joins (faster in Direct Lake and DirectQuery). If wrong, unmatched rows silently vanish.' },

  // 3.1.4 DAX
  { skill: '3.1.4', title: 'Two contexts', text: '<b>Row context</b>: the current row (iterators, calculated columns). <b>Filter context</b>: rows left by slicers and relationships (measures).' },
  { skill: '3.1.4', title: 'Variables', text: '<code>VAR x = ... RETURN ...</code> evaluates once, reads better, and is easy to debug by returning <code>x</code>.' },
  { skill: '3.1.4', title: 'Iterators', text: '<code>SUMX</code>, <code>AVERAGEX</code>, <code>RANKX</code>... evaluate an expression <b>per row</b>, then aggregate. <code>SUM(col)</code> is shorthand for <code>SUMX</code>.' },
  { skill: '3.1.4', title: 'Table filtering', text: '<code>FILTER</code> returns rows that pass. <code>ALL</code> / <code>REMOVEFILTERS</code> clear filters. <code>KEEPFILTERS</code> intersects instead of replacing.' },
  { skill: '3.1.4', title: 'Windowing functions', text: '<code>INDEX</code>, <code>OFFSET</code>, <code>WINDOW</code>, <code>RANK</code>, <code>ROWNUMBER</code>: rows relative to the current one. Set <code>orderBy</code>; <code>partitionBy</code> restarts per group.' },
  { skill: '3.1.4', title: 'Information functions', text: '<b>HASONEVALUE</b>: one value in context.<br><b>ISFILTERED</b>: column directly filtered.<br><b>ISCROSSFILTERED</b>: filtered directly or via relationships.<br><b>ISINSCOPE</b>: current hierarchy level.' },

  // 3.1.5 Calc groups etc
  { skill: '3.1.5', title: 'Calculation groups', text: 'Items that modify <b>whichever measure</b> is in context via <code>SELECTEDMEASURE()</code>. One group replaces YTD/QTD/MTD copies of every measure.' },
  { skill: '3.1.5', title: 'When to use', text: 'Three or more measures sharing a pattern: time intelligence, currency conversion, actual vs budget. Implicit measures do not work with them.' },
  { skill: '3.1.5', title: 'Dynamic format strings', text: 'A format expression on a calculation item, e.g. <code>"0.0%"</code> for a YoY % item, so one measure shows as currency or percent.' },
  { skill: '3.1.5', title: 'Field parameters', text: 'Let report users <b>swap the measure or axis field</b> of a visual with a slicer. Built from <code>NAMEOF</code>; disconnected from the model.' },

  // 3.1.6 Large format
  { skill: '3.1.6', title: 'Why it exists', text: 'Service default model limit is <b>1 GB</b>. The large format lets a model grow on refresh up to the <b>capacity size</b>. (10 GB is the Desktop upload ceiling.)' },
  { skill: '3.1.6', title: 'What it unlocks', text: 'Prerequisite for <b>XMLA read-write</b>, <b>query scale-out</b> and <b>version history</b>. Also faster XMLA writes.' },
  { skill: '3.1.6', title: 'Direct Lake and scale-out', text: 'Direct Lake models enable it <b>automatically</b>. Query scale-out spreads reads across replicas for many concurrent users.' },

  // 3.1.7 Composite models
  { skill: '3.1.7', title: 'When to use', text: 'Mix Fabric and non-Fabric sources, keep real-time beside cached tables, or <b>extend a published model</b> with extra tables.' },
  { skill: '3.1.7', title: 'Limited relationships', text: 'A relationship across <b>source groups</b> is <b>limited</b>: many-to-many with INNER join semantics; unmatched rows disappear.' },
  { skill: '3.1.7', title: 'Dual dimensions', text: 'Set shared dimension tables to <b>Dual</b> to avoid limited relationships. It is a performance optimisation; a stale cache can differ from the source.' },
  { skill: '3.1.7', title: 'Aggregations', text: 'Classic composite pattern: an <b>Import summary table</b> answers common queries; the <b>DirectQuery detail table</b> handles the rest.' },

  // 3.2.1 Query and visual performance
  { skill: '3.2.1', title: 'Find it first', text: '<b>Performance analyzer</b>: Start recording, interact, Stop. Clear the cache first. It splits time into <b>DAX query</b>, visual display, direct query and other.' },
  { skill: '3.2.1', title: 'Go deeper', text: 'Copy a visual\'s query to <b>DAX query view</b> or <b>DAX Studio</b> (server timings, query plan, model metrics).' },
  { skill: '3.2.1', title: 'Lighter pages', text: 'Fewer visuals and slicers; avoid <b>high-cardinality</b> fields in visuals.' },
  { skill: '3.2.1', title: 'Reduce cardinality', text: 'Remove unused columns (GUIDs, free text), truncate datetime to date, bucket values, filter old rows, use numeric keys.' },

  // 3.2.2 DAX performance
  { skill: '3.2.2', title: 'Variables stop repeats', text: 'An expression used twice (like prior year) is calculated <b>once</b> with a variable.' },
  { skill: '3.2.2', title: 'Column filter over FILTER', text: '<code>CALCULATE([Sales], Sales[Amount] &gt; 1000)</code> beats <code>FILTER(Sales, ...)</code>. Use FILTER only for measures, multiple columns or OR.' },
  { skill: '3.2.2', title: 'Avoid heavy patterns', text: '<code>COUNTROWS(FILTER(...))</code> > use <code>CALCULATE(COUNTROWS(...), cond)</code>. Avoid deep nested CALCULATE and iterators over huge tables when <code>SUM</code> works.' },
  { skill: '3.2.2', title: 'Move work upstream', text: 'Do static calculations in <b>Power Query or the source</b>. DAX calculated columns compress worse and slow refresh.' },

  // 3.2.3 Direct Lake fallback/refresh
  { skill: '3.2.3', title: 'Fallback', text: 'Only <b>Direct Lake on SQL endpoint</b> can fall back to DirectQuery. Direct Lake on OneLake fails instead.' },
  { skill: '3.2.3', title: 'Causes', text: 'A <b>SQL view</b>; <b>RLS, OLS or masking</b> in the SQL endpoint; table not framed; guardrails exceeded; memory pressure.' },
  { skill: '3.2.3', title: 'Direct Lake behavior', text: '<b>Automatic</b> (default): fall back. <b>Direct Lake only</b>: error instead. <b>DirectQuery only</b>: for testing.' },
  { skill: '3.2.3', title: 'Diagnose and fix', text: '<code>EVALUATE TABLETRAITS()</code> > <b>DirectLakeFallbackInfo</b>. Fix: <b>materialize the view</b> as a Delta table, move SQL RLS into the model, <code>OPTIMIZE</code>.' },
  { skill: '3.2.3', title: 'Refresh = framing', text: 'Automatic updates are <b>on by default</b>. With them off and no refresh, the model keeps serving the last framed version.' },

  // 3.2.4 DL on OneLake vs SQL
  { skill: '3.2.4', title: 'Direct Lake on OneLake', text: 'Reads Delta from <b>one or more</b> Fabric items. No SQL layer, <b>never falls back</b>. Supports composite with Import tables.' },
  { skill: '3.2.4', title: 'Direct Lake on SQL endpoint', text: 'Single source, goes through the endpoint. Can use <b>views</b> and SQL security, but can <b>fall back</b> to DirectQuery.' },
  { skill: '3.2.4', title: 'Which to pick', text: 'Default to <b>OneLake</b>. Pick <b>SQL endpoint</b> when you need a SQL view or permissions enforced in the endpoint, and accept fallback.' },

  // 3.2.5 Incremental refresh
  { skill: '3.2.5', title: 'The idea', text: 'Partition a big Import table so each refresh reloads only <b>recent</b> data. Saves refresh time, memory and source load, <b>not</b> visual render time.' },
  { skill: '3.2.5', title: 'Setup', text: 'Date/Time parameters <b>RangeStart</b> and <b>RangeEnd</b> > filter the date column (<code>&gt;=</code> start, <code>&lt;</code> end) > Incremental refresh policy > publish.' },
  { skill: '3.2.5', title: 'Periods', text: '<b>Archive period</b>: history to keep. <b>Refresh period</b>: recent window reloaded each time. The window rolls forward.' },
  { skill: '3.2.5', title: 'First refresh', text: 'Partitions are created in the <b>service</b> on the first refresh. The filter must <b>fold</b> to the source to help.' },
]);
