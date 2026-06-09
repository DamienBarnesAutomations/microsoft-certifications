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
  }
];
