var MODULE6_CARDS = [
  {
    id: "m6-c1",
    type: "term",
    topic: "Activator Core Concepts",
    front: "What is the core object model of Fabric Activator?",
    back: "Activator has four core concepts:<br>1. <b>Events</b> — incoming data streams (from Eventstreams, Eventhouses, or other sources)<br>2. <b>Objects</b> — entities derived from events (identified by a unique ID property)<br>3. <b>Properties</b> — numeric or categorical attributes of objects that are monitored<br>4. <b>Rules</b> — conditions defined on properties that trigger actions"
  },
  {
    id: "m6-c2",
    type: "term",
    topic: "Activator Core Concepts",
    front: "How are objects created from Eventstreams in Activator?",
    back: "When connecting an Eventstream to Activator, you select a <b>unique ID property</b> (e.g., device ID, order ID) from the event schema. Activator <b>auto-creates objects</b> for each unique value of that property as new events arrive."
  },
  {
    id: "m6-c3",
    type: "term",
    topic: "Activator Core Concepts",
    front: "What is the Monitor section in an Activator rule?",
    back: "The <b>Monitor</b> section defines a <b>property</b> (numerical attribute) to track and the <b>aggregation</b> method: <b>Average</b>, <b>Min</b>, <b>Max</b>, <b>Count</b>, or <b>Total</b>. It also defines the <b>Window Size</b> (lookback period) and <b>Step Size</b> (evaluation frequency), which are independent of each other."
  },
  {
    id: "m6-c4",
    type: "term",
    topic: "Activator Core Concepts",
    front: "What is the Condition section in an Activator rule?",
    back: "The <b>Condition</b> section defines the triggering logic:<br>\u2022 <b>Threshold</b> — fire when value goes above/below a fixed number<br>\u2022 <b>Change detection</b> — fire when value changes by X% or absolute amount<br>\u2022 <b>Range</b> — fire when value is inside/outside a range<br>\u2022 <b>Missing data</b> — fire when no data received for a duration"
  },
  {
    id: "m6-c5",
    type: "term",
    topic: "Activator Core Concepts",
    front: "What occurrence behaviors are available in Activator conditions?",
    back: "Two modes:<br>1. <b>'Every time'</b> — fires on every individual event that meets the condition<br>2. <b>'When it has been true for'</b> — fires only after the condition has been continuously true for a specified duration (debouncing/de-glitching)"
  },
  {
    id: "m6-c6",
    type: "term",
    topic: "Activator Core Concepts",
    front: "What are Property Filters and what limits apply?",
    back: "Property filters allow you to <b>narrow rule evaluation</b> to objects matching specific categorical criteria (e.g., only devices in 'Region=US'). You can apply <b>up to 3 property filters</b> per rule."
  },
  {
    id: "m6-c7",
    type: "term",
    topic: "Activator Core Concepts",
    front: "What Actions can Activator rules trigger?",
    back: "Actions include:<br>\u2022 <b>Email</b> — send notification to specified recipients<br>\u2022 <b>Teams</b> — post to a Microsoft Teams channel<br>\u2022 <b>Power Automate</b> — trigger a Power Automate flow<br>\u2022 <b>Fabric item actions</b> — activate other Fabric items (e.g., start a pipeline, refresh a semantic model)"
  },
  {
    id: "m6-c8",
    type: "term",
    topic: "Activator Core Concepts",
    front: "What are the alternative alerting methods that use the Activator engine?",
    back: "Three methods all <b>use the Activator engine</b> under the hood:<br>1. <b>Dashboard alerts</b> — set thresholds on visual elements in real-time dashboards<br>2. <b>System event alerts</b> — alerts on Fabric system events (e.g., report viewed, refresh completed)<br>3. <b>Query alerts</b> — alerts defined directly on KQL or SQL query results"
  },
  {
    id: "m6-c9",
    type: "compare",
    topic: "Activator Core Concepts",
    front: "Compare auto-created objects from Eventstream vs. manually created objects.",
    back: "<b>Auto-created (Eventstream)</b>: objects are created dynamically as new unique IDs arrive; schema comes from the event stream; simpler setup; best for streaming IoT or event sources.<br><br><b>Manual</b>: objects and properties defined by the user; supports additional data sources; more control over object hierarchy."
  },
  {
    id: "m6-c10",
    type: "compare",
    topic: "Activator Core Concepts",
    front: "Compare 'Every time' vs. 'When it has been true for' occurrence behavior.",
    back: "<b>'Every time'</b>: immediately fires on each qualifying event — can produce many alerts for noisy signals.<br><br><b>'When it has been true for'</b>: requires the condition to remain true for a specified duration (e.g., 5 minutes) before firing — reduces alert fatigue, acts as a debounce/deglitch filter."
  },
  {
    id: "m6-c11",
    type: "compare",
    topic: "Activator Core Concepts",
    front: "Compare Window Size vs. Step Size in the Monitor section.",
    back: "<b>Window Size</b>: the lookback period over which data is aggregated (e.g., 'last 10 minutes') — determines how much historical data is considered for the current value.<br><br><b>Step Size</b>: how often the rule is evaluated (e.g., 'every 1 minute') — independent of window size, so you can evaluate more or less frequently than the aggregation window."
  },
  {
    id: "m6-c12",
    type: "scenario",
    topic: "Activator Core Concepts",
    front: "You have IoT temperature sensors sending data every 30 seconds. You need to alert when a sensor's average temperature exceeds 85\u00b0F over the last 5 minutes, but only if it stays over for 2 minutes to avoid transient spikes. How do you configure this?",
    back: "In the Activator rule:<br><b>Monitor</b>: Property = Temperature, Aggregation = Average, Window Size = 5 minutes, Step Size = 1 minute<br><b>Condition</b>: Threshold > 85<br><b>Occurrence</b>: 'When it has been true for' = 2 minutes<br>This ensures only sustained overheating triggers an alert."
  },
  {
    id: "m6-c13",
    type: "edge",
    topic: "Activator Core Concepts",
    front: "What happens to an Activator rule if no data arrives for an object?",
    back: "If no data arrives, you can configure the <b>Missing data</b> condition to trigger after a specified duration of inactivity. Without it, the rule simply does not fire — objects remain in their last known state and no alert is generated."
  },
  {
    id: "m6-c14",
    type: "edge",
    topic: "Activator Core Concepts",
    front: "How many property filters can you apply to a single Activator rule?",
    back: "You can apply a maximum of <b>3 property filters</b> per rule. Each filter narrows the rule evaluation to objects matching specific categorical property values."
  },
  {
    id: "m6-c15",
    type: "edge",
    topic: "Activator Core Concepts",
    front: "True or false: Dashboard alerts, system event alerts, and query alerts are independent alerting systems separate from Activator.",
    back: "<b>False.</b> All three — dashboard alerts, system event alerts, and query alerts — <b>use the Activator engine</b> under the hood. They are simply different entry points into the same alerting infrastructure."
  },
  {
    id: "m6-c16",
    type: "edge",
    topic: "Activator Core Concepts",
    front: "Can Window Size and Step Size be set independently in an Activator rule?",
    back: "<b>Yes.</b> Window size and step size are <b>independent</b> of each other. For example, you can aggregate over a 1-hour window (Window Size) while evaluating every 5 minutes (Step Size). This allows flexible monitoring patterns without coupling aggregation span to evaluation frequency."
  },
  {
    id: "m6-c17",
    type: "scenario",
    topic: "Activator Actions",
    front: "A temperature sensor exceeds threshold. Your team needs to immediately discuss the response together. Which Activator action type should you configure?",
    back: "<b>Teams action.</b> Teams sends immediate messages to channels or individuals, enabling real-time team coordination and discussion. Use Email when the recipient needs comprehensive context and response within hours/days. Use Teams when immediate group coordination is required."
  },
  {
    id: "m6-c18",
    type: "scenario",
    topic: "Activator Actions",
    front: "A stock level drops below a reorder threshold. You need to automatically create a purchase order in your ERP system and log it in SharePoint. Which Activator action type should you use?",
    back: "<b>Power Automate action.</b> Power Automate connects to external apps and services, executing multi-step workflows across different systems that would otherwise require manual intervention. Use it when the response spans multiple applications (e.g., ERP + SharePoint)."
  },
  {
    id: "m6-c19",
    type: "scenario",
    topic: "Activator Actions",
    front: "An anomaly is detected in a data stream. The response requires cleansing the affected data using complex Spark logic and reloading it into the lakehouse. Which Activator action should you configure?",
    back: "<b>Fabric item action</b> — specifically trigger a <b>Spark Notebook</b> or <b>Data Pipeline</b>. Fabric item actions execute data engineering operations in response to detected conditions. This is the right choice when the response requires Fabric-native compute (Spark, pipelines)."
  },
  {
    id: "m6-c20",
    type: "scenario",
    topic: "Activator Actions",
    front: "A compliance audit needs to be notified when a shipment's temperature exceeded 40°C, with a full report attached. Time sensitivity is low. Which Activator action fits best?",
    back: "<b>Email action.</b> Email is best when the recipient needs comprehensive context, can review at their own pace, and immediate response is not critical. Teams is for immediate coordination; Power Automate for multi-system workflows; Email for audit/compliance/non-urgent notifications."
  },
  {
    id: "m6-c21",
    type: "edge",
    topic: "Activator Object Model",
    front: "What happens in Activator if you do NOT select a unique identifier field when creating objects from an Eventstream?",
    back: "Without a unique identifier, all incoming events are treated as a <b>single stream-wide object</b>. Rules evaluate against the aggregate stream rather than per-entity. To monitor individual entities (e.g., temperature <em>per truck</em>, not average across all trucks), a unique identifier is mandatory."
  },
  {
    id: "m6-c22",
    type: "term",
    topic: "Activator Data Sources",
    front: "What are the different ways data can be fed into Activator?",
    back: "Three entry points:<br>1. <b>Eventstream destination</b> — direct streaming data from Eventstream; most common for IoT/event-driven scenarios.<br>2. <b>Real-Time Dashboard alerts</b> — trigger rules from dashboard visual thresholds.<br>3. <b>KQL Queryset alerts</b> — trigger rules when a KQL query result meets a condition (e.g., count of anomalies > 0).<br>4. <b>System event alerts</b> — trigger on Fabric workspace events like report views or refresh completions."
  },
  {
    id: "m6-c23",
    type: "compare",
    topic: "Activator vs KQL",
    front: "Compare Activator and KQL for real-time condition evaluation.",
    back: "<b>Activator:</b> Visual rule editor; event-driven; evaluates conditions on streaming object properties; triggers automated actions. No KQL needed to define rules.<br><br><b>KQL (Eventhouse):</b> Query language for ad-hoc and scheduled queries against stored data; results can <em>feed into</em> Activator but KQL itself doesn't trigger actions.<br><br>Key: Activator is the <em>response layer</em>; KQL is the <em>query layer</em>. They complement each other — use KQL to detect complex patterns, feed results to Activator to act."
  },
  {
    id: "m6-c24",
    type: "compare",
    topic: "Activator vs Monitor Hub",
    front: "You need to investigate why a pipeline failed yesterday. You also need to auto-email a team when a pipeline fails in future. Which tool handles each?",
    back: "<b>Monitor Hub</b> — investigate the past failure. It stores 30 days of execution history with drill-down into error details.<br><br><b>Activator</b> — auto-email on future failures. Set a system event alert on pipeline failure as the trigger condition and configure an Email action.<br><br>Monitor Hub = retrospective investigation. Activator = proactive automated response."
  },
  {
    id: "m6-c25",
    type: "scenario",
    topic: "Activator Rules",
    front: "Your delivery sensors send a reading every 5 seconds. You need to alert when NO reading arrives for more than 10 minutes (indicating sensor failure). How do you configure this in Activator?",
    back: "Use the <b>Missing data</b> condition type in the Condition section.<br>Set the duration to <b>10 minutes</b>.<br>This fires an alert when Activator detects a gap in events for an object exceeding the specified duration — designed exactly for sensor dead/failure detection."
  },
  {
    id: "m6-c26",
    type: "scenario",
    topic: "Activator Rules",
    front: "You monitor 500 delivery trucks. You only want temperature alerts for trucks carrying medicine (field: ColdChainType = 'medicine') on routes in Seattle (field: City = 'Seattle'). How do you scope this in Activator?",
    back: "Use <b>Property Filters</b> in the rule definition.<br>Add filter 1: ColdChainType equals 'medicine'<br>Add filter 2: City equals 'Seattle'<br>The rule will now only evaluate temperature conditions for events matching both filters. Maximum <b>3 property filters</b> per rule can be combined."
  },
  {
    id: "m6-c27",
    type: "edge",
    topic: "Activator Rules",
    front: "A temperature threshold is briefly exceeded for 30 seconds due to a sensor fluctuation, then returns to normal. Does Activator fire an alert using the default 'Every time' occurrence?",
    back: "<b>Yes, it would fire</b> with 'Every time' — that mode fires on each qualifying event regardless of duration.<br><br>To prevent false alerts from transient spikes, use <b>'When it has been true for'</b> occurrence mode with a duration longer than typical fluctuations (e.g., 2 minutes). This debounces the condition and only alerts on sustained breaches."
  },
  {
    id: "m6-c28",
    type: "term",
    topic: "Activator Setup Workflow",
    front: "What is the end-to-end workflow to set up Activator monitoring for an IoT Eventstream?",
    back: "1. Create and configure an <b>Eventstream</b> to capture streaming data from the IoT source.<br>2. Add <b>Activator</b> as a destination in the Eventstream.<br>3. Open the Activator item → select <b>Create object</b>.<br>4. Choose the <b>unique identifier field</b> (e.g., DeviceID) to create per-device objects.<br>5. Select which fields become <b>monitored properties</b>.<br>6. Create <b>Rules</b>: configure Monitor, Condition, and Property Filter.<br>7. Configure the <b>Action</b> (Email, Teams, Power Automate, or Fabric item)."
  },
  {
    id: "m6-c29",
    type: "edge",
    topic: "Activator Core Concepts",
    front: "True or false: Activator is only available as part of Real-Time Intelligence in Fabric.",
    back: "<b>True.</b> Activator is a component within <b>Real-Time Intelligence</b> in Microsoft Fabric. It is the event detection and rules engine of that workload. It is not a standalone external service."
  },
  {
    id: "m6-c30",
    type: "scenario",
    topic: "Activator Rules",
    front: "You're tracking stock prices updated every second. You want to detect when a stock's 5-minute average price drops more than 10% from its value at the start of the window. Which Activator condition type fits?",
    back: "<b>Change detection</b> condition type — detects when a value changes by a relative amount (percentage) or absolute amount from a baseline within the window.<br><br>Configure: Attribute = Price, Summarization = Average, Window Size = 5 min, Condition = Change detection (decreases by 10%)."
  },
  {
    id: "m6-c31",
    type: "compare",
    topic: "Activator Actions",
    front: "When would you choose a Fabric item action over a Power Automate action in Activator?",
    back: "<b>Fabric item action:</b> When the response is entirely within Fabric — run a pipeline to reload data, execute a Spark notebook to cleanse records, or trigger another Fabric process. Lower latency, no external dependency.<br><br><b>Power Automate:</b> When the response spans multiple external systems — create a ticket in Jira, update records in Salesforce, send an SMS, etc. More flexible but introduces an external dependency."
  },
  {
    id: "m6-c32",
    type: "edge",
    topic: "Activator Core Concepts",
    front: "Can Activator monitor Fabric system events (like pipeline failures or report views) without an Eventstream?",
    back: "<b>Yes.</b> Activator supports <b>system event alerts</b> that monitor Fabric workspace activities and OneLake file operations directly — no Eventstream required. This is one of the alternative alerting approaches (along with dashboard alerts and KQL query alerts) built on the Activator engine."
  }
];
