var MODULE3_CARDS = [
  // ===== REAL-TIME INTELLIGENCE OVERVIEW =====
  {
    id: "m3-c1",
    type: "term",
    topic: "Real-Time Intelligence Overview",
    front: "What is Real-Time Intelligence (RTI) in Microsoft Fabric?",
    back: "An integrated set of components for processing and analyzing streaming data in real time. The five core components are: <code>Eventstreams</code>, <code>Eventhouse</code>, <code>KQL Queryset</code>, <code>Real-Time Dashboards</code>, and <code>Activator</code>."
  },
  {
    id: "m3-c2",
    type: "term",
    topic: "Real-Time Intelligence Overview",
    front: "What is the difference between an event and a stream?",
    back: "An <b>event</b> is an individual data point or occurrence (e.g., a single sensor reading). A <b>stream</b> is an ordered, continuous sequence of events flowing from a source."
  },
  {
    id: "m3-c3",
    type: "term",
    topic: "Real-Time Intelligence Overview",
    front: "What are the four categories in the Real-Time Hub?",
    back: "1. <b>Data sources</b> - streaming sources like Event Hubs, IoT Hub<br>2. <b>Azure sources</b> - Azure-specific event sources<br>3. <b>Fabric events</b> - events generated within Fabric (e.g., job completions, pipeline status)<br>4. <b>Azure events</b> - Azure platform-level events"
  },
  {
    id: "m3-c4",
    type: "term",
    topic: "Real-Time Intelligence Overview",
    front: "How does Copilot assist in Real-Time Intelligence?",
    back: "Copilot helps with <b>natural language to KQL query generation</b>, explaining query results, and providing guidance on building real-time solutions within the Fabric RTI experience."
  },
  {
    id: "m3-c5",
    type: "scenario",
    topic: "Real-Time Intelligence Overview",
    front: "An e-commerce platform needs to flag fraudulent transactions within seconds. Which RTI use case and components apply?",
    back: "Use case: <b>Fraud detection</b>. Use <b>Eventstream</b> to ingest transaction events, apply filters/transformations, and route to <b>Eventhouse</b> for real-time KQL analysis detecting suspicious patterns."
  },
  {
    id: "m3-c6",
    type: "scenario",
    topic: "Real-Time Intelligence Overview",
    front: "A logistics company wants to track delivery trucks, monitor package temperatures, and get instant alerts when refrigerated units go out of range. Which RTI components should they use?",
    back: "Use <b>Eventstream</b> to ingest IoT sensor data, <b>Eventhouse</b> for real-time analytics, <b>Real-Time Dashboards</b> for live fleet monitoring, and <b>Activator</b> to trigger alerts on temperature threshold violations."
  },

  // ===== EVENTSTREAM =====
  {
    id: "m3-c7",
    type: "term",
    topic: "Eventstream",
    front: "What is an Eventstream in Microsoft Fabric?",
    back: "A visual, no-code <b>drag-and-drop canvas</b> for ingesting, transforming, and routing streaming data. The workflow flows <b>left-to-right</b>: sources on the left, transformations in the middle, destinations on the right."
  },
  {
    id: "m3-c8",
    type: "term",
    topic: "Eventstream",
    front: "What are the supported sources in an Eventstream?",
    back: "Event Hubs, IoT Hub, Service Bus, CDC (Change Data Capture), Blob Storage, Fabric events, Kafka, Google Pub/Sub, and MQTT."
  },
  {
    id: "m3-c9",
    type: "term",
    topic: "Eventstream",
    front: "What transformations are available in the Eventstream canvas?",
    back: "<b>Filter</b> - keep events matching conditions<br><b>Manage fields</b> - add, remove, or rename columns<br><b>Aggregate</b> - calculate summaries over time<br><b>Group by</b> with tumbling or sliding windows<br><b>Union</b> - combine multiple streams<br><b>Join</b> - merge streams on a common key<br><b>Expand</b> - unpack nested arrays/JSON into rows"
  },
  {
    id: "m3-c10",
    type: "compare",
    topic: "Eventstream",
    front: "Compare tumbling windows vs sliding windows in Eventstream Group By.",
    back: "<b>Tumbling windows</b>: Fixed, non-overlapping intervals (e.g., every 5 min). Each event belongs to exactly <b>one</b> window. Best for periodic reporting.<br><br><b>Sliding windows</b>: Overlapping intervals moving forward by a step size. An event can appear in <b>multiple</b> windows. Best for continuous fine-grained monitoring with updates more frequent than the window size."
  },
  {
    id: "m3-c11",
    type: "term",
    topic: "Eventstream",
    front: "What destinations can an Eventstream route data to?",
    back: "<b>Eventhouse</b> (KQL Database) - real-time analytics<br><b>Lakehouse</b> (Delta format) - long-term storage<br><b>Derived streams</b> - branching pipelines for multiple paths<br><b>Activator</b> - rules and alerting engine<br><b>Custom endpoints</b> - HTTP/s custom destinations"
  },
  {
    id: "m3-c12",
    type: "scenario",
    topic: "Eventstream",
    front: "Sensor data arrives via IoT Hub. You must filter errors, aggregate average temperature every 1 min, and store in Eventhouse (live dashboards) and Lakehouse (ML training). Design the Eventstream.",
    back: "Source: <b>IoT Hub</b> → <b>Filter</b> (remove error codes) → <b>Group by</b> (tumbling window, 1 min, average temp) → branch to two destinations: <b>Eventhouse</b> and <b>Lakehouse</b>."
  },
  {
    id: "m3-c13",
    type: "edge",
    topic: "Eventstream",
    front: "Can transformations be applied to data after it reaches an Eventhouse destination from an Eventstream?",
    back: "<b>No.</b> Transformations must be applied <b>within the Eventstream canvas</b> before data reaches the destination. Once ingested into Eventhouse, data is <b>append-only immutable</b>. You can use KQL queries, materialized views, or stored functions for query-time transformation, but the raw ingested data is never modified."
  },

  // ===== EVENTHOUSE & KQL DATABASES =====
  {
    id: "m3-c14",
    type: "term",
    topic: "Eventhouse",
    front: "What is an Eventhouse in Fabric Real-Time Intelligence?",
    back: "A <b>high-performance analytics database</b> optimized for streaming and time-series data. Features: automatic ingestion-time partitioning, append-only immutable storage, native KQL support, and OneLake integration via Delta Parquet."
  },
  {
    id: "m3-c15",
    type: "term",
    topic: "Eventhouse",
    front: "How does the KQL pipeline work using the pipe operator?",
    back: "Queries use <code>|</code> to pass tabular results from one operator to the next. Example:<br><code>StormEvents | where State == 'FLORIDA' | project EventType, Damage | take 10</code><br>Each operator filters, transforms, or aggregates data as it flows through the pipeline."
  },
  {
    id: "m3-c16",
    type: "term",
    topic: "Eventhouse",
    front: "What are the core KQL operators?",
    back: "<code>take</code> - limit rows<br><code>where</code> - filter rows<br><code>project</code> - select/rename/drop columns<br><code>summarize</code> - aggregate by groups<br><code>sort by</code> - order results<br><code>join</code> - merge two tables on a key<br><code>limit</code> - constrain result set size"
  },
  {
    id: "m3-c17",
    type: "scenario",
    topic: "Eventhouse",
    front: "A KQL join of a 1B-row sensor table with a 10M-row device table is slow. What three optimizations should you apply?",
    back: "1. <b>Filter early on time</b> - add <code>where Timestamp between (..)</code> to sensor table before join<br>2. <b>Reduce columns</b> - <code>project</code> to keep only needed columns on both sides<br>3. <b>Smaller table first</b> - put device metadata (10M rows) on the <b>left</b> of the join"
  },
  {
    id: "m3-c18",
    type: "term",
    topic: "Eventhouse",
    front: "What is a materialized view in Eventhouse?",
    back: "An <b>auto-updating pre-aggregated view</b> with two parts: a <b>materialized part</b> (pre-computed, persisted) and a <b>delta part</b> (recent changes not yet materialized). Queries merge both transparently for up-to-date results."
  },
  {
    id: "m3-c19",
    type: "compare",
    topic: "Eventhouse",
    front: "Compare the materialized part vs the delta part of a materialized view.",
    back: "<b>Materialized part</b>: Fully computed aggregation stored on disk, updated periodically in background. Fastest query performance.<br><br><b>Delta part</b>: Recent data changes not yet merged. Queries compute delta on-the-fly and merge with materialized results, ensuring you always see <b>fresh data</b>."
  },
  {
    id: "m3-c20",
    type: "term",
    topic: "Eventhouse",
    front: "How do you create a stored function in KQL?",
    back: "Use <code>.create-or-alter function</code>:<br><br><code>.create-or-alter function GetHighPriorityAlerts() {<br>  Alerts | where Priority == 'High'<br>  | project Timestamp, DeviceId, Message<br>}</code><br><br>Call it like a table: <code>GetHighPriorityAlerts()</code>"
  },
  {
    id: "m3-c21",
    type: "edge",
    topic: "Eventhouse",
    front: "Is KQL case-sensitive?",
    back: "<b>Yes.</b> KQL is case-sensitive. Table names, column names, and string comparisons use exact casing. For case-insensitive matching, use <code>=~</code> instead of <code>==</code>."
  },
  {
    id: "m3-c22",
    type: "edge",
    topic: "Eventhouse",
    front: "What does 'append-only immutable' mean for Eventhouse and what operations are NOT allowed?",
    back: "New records can be added, but existing records cannot be updated or deleted (unless using retention/soft-delete policies). You <b>cannot</b> perform row-level <code>UPDATE</code>, <code>DELETE</code>, or <code>MERGE</code> like in OLTP databases. This ensures data integrity and enables high-performance columnar compression."
  },
  {
    id: "m3-c23",
    type: "term",
    topic: "Eventhouse",
    front: "What are database shortcuts in Eventhouse?",
    back: "Shortcuts allow referencing tables from <b>another Eventhouse</b> in the same workspace or across workspaces via OneLake, enabling cross-database queries without data movement or duplication."
  },
  {
    id: "m3-c24",
    type: "term",
    topic: "Eventhouse",
    front: "What is a KQL Queryset?",
    back: "A Fabric item that stores and organizes KQL queries for execution against an Eventhouse. Provides a query editor with syntax highlighting, results viewer with charting, parameter support, and sharing capabilities."
  },
  {
    id: "m3-c25",
    type: "term",
    topic: "Eventhouse",
    front: "Does Eventhouse support T-SQL?",
    back: "Yes, a <b>T-SQL subset</b> is supported, enabling SQL-skilled users to query KQL tables without learning full KQL. However, <b>native KQL</b> is recommended for optimal performance and access to time-series functions."
  },
  {
    id: "m3-c26",
    type: "term",
    topic: "Eventhouse",
    front: "How does Eventhouse integrate with OneLake?",
    back: "Eventhouse data is automatically available in OneLake as <b>Delta Parquet</b> files, enabling cross-analysis with Lakehouse, Notebooks, Data Pipelines, and Semantic Models without data duplication."
  },

  // ===== REAL-TIME DASHBOARDS =====
  {
    id: "m3-c27",
    type: "term",
    topic: "Real-Time Dashboards",
    front: "What are Real-Time Dashboards in Fabric?",
    back: "Interactive, auto-refreshing dashboards composed of <b>pages</b> with <b>tiles</b> (charts, grids, maps). Built on KQL queries against Eventhouse data for live real-time monitoring."
  },
  {
    id: "m3-c28",
    type: "compare",
    topic: "Real-Time Dashboards",
    front: "Compare pass-through identity vs editor identity authorization in Real-Time Dashboards.",
    back: "<b>Pass-through identity</b>: Each viewer's own credentials authenticate when the dashboard queries Eventhouse. Row-level security is enforced per user.<br><br><b>Editor identity</b>: All viewers see data based on the editor's credentials. Simpler setup but <b>bypasses per-user RLS</b>."
  },
  {
    id: "m3-c29",
    type: "term",
    topic: "Real-Time Dashboards",
    front: "How are parameters defined in Real-Time Dashboards?",
    back: "Parameters are <b>underscore-prefixed</b> variables (e.g., <code>_startTime</code>, <code>_threshold</code>, <code>_deviceId</code>). Defined at dashboard level, referenced in tile KQL queries via <code>let</code> statements, and support dynamic user input via dropdowns/text fields."
  },
  {
    id: "m3-c30",
    type: "term",
    topic: "Real-Time Dashboards",
    front: "How does auto refresh work in Real-Time Dashboards?",
    back: "The <b>editor</b> sets the default auto-refresh interval at publish time. <b>Viewers</b> can override the interval for their session, but only the editor can change the permanent dashboard-level default."
  },
  {
    id: "m3-c31",
    type: "term",
    topic: "Real-Time Dashboards",
    front: "What are base queries in Real-Time Dashboards?",
    back: "Shared query definitions at the dashboard level referenced by multiple tiles. Changing a base query automatically updates all dependent tiles, reducing duplication and simplifying maintenance."
  },
  {
    id: "m3-c32",
    type: "term",
    topic: "Real-Time Dashboards",
    front: "How does drill-down work in Real-Time Dashboards?",
    back: "Clicking a tile navigates to <b>more detailed data</b> — either another dashboard page with filtered context, or an external item like a KQL Queryset with the selection passed as parameters."
  },

  // ===== ACTIVATOR =====
  {
    id: "m3-c33",
    type: "term",
    topic: "Activator",
    front: "What is Activator in Fabric Real-Time Intelligence?",
    back: "An <b>event detection and rules engine</b>. Core object model: <b>Events</b> (raw data) → <b>Objects</b> (grouped entities) → <b>Properties</b> (time-series metrics) → <b>Rules</b> (conditions + actions)."
  },
  {
    id: "m3-c34",
    type: "term",
    topic: "Activator",
    front: "What is configured in the Monitor section of an Activator rule?",
    back: "<b>Attribute</b> - dimension grouping events into objects (e.g., DeviceId)<br><b>Summarization</b> - aggregation: average, min, max, count, total<br><b>Window size</b> - lookback time period<br><b>Step size</b> - how frequently the window slides forward"
  },
  {
    id: "m3-c35",
    type: "term",
    topic: "Activator",
    front: "What condition detection types does Activator support?",
    back: "<b>Threshold</b> - value crosses a boundary<br><b>Change detection</b> - significant deviation from baseline<br><b>Range</b> - value inside/outside a min-max range<br><b>Missing data</b> - no data received within expected interval"
  },
  {
    id: "m3-c36",
    type: "compare",
    topic: "Activator",
    front: "Compare 'Every time' vs 'When it has been true for' occurrence behavior in Activator.",
    back: "<b>Every time</b>: Fires on each evaluation where the condition is true. Best for rare events needing immediate notification.<br><br><b>When it has been true for</b>: Fires only after the condition remains true for a sustained duration. Prevents alert fatigue (e.g., temperature over 90F for 5 consecutive minutes)."
  },
  {
    id: "m3-c37",
    type: "term",
    topic: "Activator",
    front: "What are Property filters in Activator and what is the limit?",
    back: "Property filters narrow rule evaluation to specific object subsets. You can define <b>up to 3 conditions</b> per filter combined with AND logic. Example: <code>Region == 'East' AND Priority == 'High'</code>"
  },
  {
    id: "m3-c38",
    type: "term",
    topic: "Activator",
    front: "What actions can an Activator rule trigger?",
    back: "<b>Email</b> - notify recipients<br><b>Teams</b> - post to a channel<br><b>Power Automate</b> - trigger a cloud flow<br><b>Fabric item actions</b> - start/stop items, trigger pipelines"
  },
  {
    id: "m3-c39",
    type: "scenario",
    topic: "Activator",
    front: "CPU exceeds 90% and stays above that threshold for 3 consecutive minutes, but only for production servers. Configure the Activator rule.",
    back: "<b>Monitor</b>: Summarization = <b>average</b>, Window = <b>3 min</b>, Step = <b>1 min</b><br><b>Property filter</b>: <code>Environment == 'Production'</code><br><b>Condition</b>: Threshold > 90, Occurrence = <b>When it has been true for</b> = 3 min<br><b>Action</b>: Teams + Email to on-call engineer"
  },
  {
    id: "m3-c40",
    type: "edge",
    topic: "Activator",
    front: "Do dashboard alerts, system event alerts, and query alerts use different engines than Activator?",
    back: "<b>No.</b> All three — <b>dashboard alerts</b>, <b>system event alerts</b>, and <b>query alerts</b> — use the <b>same Activator engine</b> under the hood. They provide different entry points and UIs but all execute through Activator for evaluation and action dispatch."
  }
];
