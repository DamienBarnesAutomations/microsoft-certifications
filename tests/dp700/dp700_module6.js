// Module 6: Activator
(function() {
  var questions = [
  {
    "text": "You need to detect when a streaming metric in an Eventstream exceeds a threshold and send a Teams message. Which component should you configure?",
    "options": [
      "Activator",
      "Update policy on a KQL table",
      "A pipeline with a condition activity",
      "A Real-Time Dashboard alert"
    ],
    "correct": 0,
    "module": 6,
    "explanation": "Activator is the Fabric component designed for real-time monitoring and rule-based actions on streaming data, including sending Teams messages when thresholds are exceeded. Update policies transform data on ingestion but don't send alerts. Pipelines are batch-oriented. Real-Time Dashboard alerts use the Activator engine under the hood, but the component doing the work is Activator."
  },
  {
    "text": "Which of the following is NOT a valid action type in Activator?",
    "options": [
      "Email",
      "Teams",
      "Power Automate",
      "Azure Function"
    ],
    "correct": 3,
    "module": 6,
    "explanation": "Activator supports Email, Teams, Power Automate, and Fabric item actions. Azure Function is not a built-in Activator action type. You could indirectly call one via Power Automate, but it is not a direct Activator action."
  },
  {
    "text": "You configure Activator as a destination for an Eventstream. You need to monitor temperature readings for individual packages. Which field should you select as the unique identifier when creating the business object?",
    "options": [
      "Temperature (the property to monitor)",
      "PackageId (the field that uniquely identifies each package)",
      "Timestamp (when the reading was taken)",
      "City (the delivery location)"
    ],
    "correct": 1,
    "module": 6,
    "explanation": "The unique identifier should be the field that distinguishes each object instance. PackageId creates a separate monitored object per package. Selecting Temperature, Timestamp, or City as the identifier would not produce meaningful per-package objects — they don't uniquely identify business entities."
  },
  {
    "text": "You want to monitor the average temperature of packages over 10-minute windows, recalculating every 5 minutes. In Activator, what do the window size and step size control respectively?",
    "options": [
      "Window size controls how often the rule is checked; step size controls how much historical data is included",
      "Window size controls how much historical data to include; step size controls how often to recalculate",
      "Both control the frequency of email alerts",
      "They control the data retention period in the Eventstream"
    ],
    "correct": 1,
    "module": 6,
    "explanation": "Window size defines the historical period for summarization (e.g., last 10 minutes of data). Step size defines how often the aggregation is recalculated (e.g., every 5 minutes). They are independent — a 10-minute window evaluated every 5 minutes is a sliding window pattern."
  },
  {
    "text": "You configure an Activator rule that sends a Teams message when a package temperature exceeds 68°F. Which section of the Activator rule defines the condition 'Temperature > 68°F'?",
    "options": [
      "The Monitor section",
      "The Condition section",
      "The Property filter section",
      "The Action configuration"
    ],
    "correct": 1,
    "module": 6,
    "explanation": "The Condition section holds the threshold logic (e.g., greater than 68). The Monitor section selects which property to watch and configures aggregation. Property filters narrow which objects the rule applies to. The Action section defines what to do when triggered."
  },
  {
    "text": "You want to apply an Activator rule only to packages containing medicine, not all packages. Which section of the rule configuration should you use?",
    "options": [
      "The Monitor section to select only medicine-related attributes",
      "The Property filter section with a filter like ColdChainType equals 'medicine'",
      "The Condition section to set a medicine-specific threshold",
      "The Action section to route medicine packages differently"
    ],
    "correct": 1,
    "module": 6,
    "explanation": "Property filters restrict rule evaluation to objects matching specific categorical values. Adding ColdChainType = 'medicine' ensures the rule only evaluates packages carrying medicine. Up to 3 property filters can be combined per rule."
  },
  {
    "text": "An Activator rule condition is met. You need to automatically execute a multi-step business process that creates a support ticket in Salesforce and logs it in SharePoint. Which action type should you configure?",
    "options": [
      "Email action",
      "Teams action",
      "Power Automate action",
      "Fabric item action"
    ],
    "correct": 2,
    "module": 6,
    "explanation": "Power Automate integrates with hundreds of external systems and can execute multi-step workflows across applications like Salesforce and SharePoint. Email and Teams are simple notifications. Fabric item action runs Fabric-native items (pipelines, notebooks) but cannot reach external SaaS systems directly."
  },
  {
    "text": "In Activator, what is the correct relationship between events, objects, and properties?",
    "options": [
      "Events represent business entities; objects represent data values; properties represent timestamps",
      "Events contain incoming data records; objects are business entities identified by a unique field in events; properties are the data attributes of those objects",
      "Objects are static definitions created before events arrive; events only update existing objects",
      "Properties are the rules; objects are the actions; events are the triggers"
    ],
    "correct": 1,
    "module": 6,
    "explanation": "Events are incoming data records from a stream. Objects are business entities (e.g., Package001) derived from a unique identifier field within those events. Properties are the attributes of each object (e.g., Temperature, DeliveryState) that are updated dynamically as events arrive and are what rules evaluate against."
  },
  {
    "text": "You configure an Activator rule to detect when no new temperature events have arrived for more than 30 minutes, indicating a possible sensor failure. Which condition type should you use?",
    "options": [
      "Threshold monitoring with Temperature > 0",
      "Change detection for temperature trends",
      "Missing data detection",
      "Range monitoring for safe operating zones"
    ],
    "correct": 2,
    "module": 6,
    "explanation": "Missing data detection fires when expected events do not arrive within a configured time window — exactly what is needed for sensor failure detection. Threshold, change detection, and range monitoring all require actual data values to arrive before they can evaluate."
  },
  {
    "text": "You configure an Activator rule with Occurrence set to 'When it has been true for 15 minutes' instead of 'Every time'. What is the practical effect?",
    "options": [
      "The rule triggers an action every time the condition is met, regardless of duration",
      "The rule only fires if the condition remains continuously true for 15 minutes, filtering out brief spikes",
      "The rule checks the condition every 15 minutes instead of continuously",
      "The rule accumulates all matching evaluations over 15 minutes and then averages them"
    ],
    "correct": 1,
    "module": 6,
    "explanation": "'When it has been true for N minutes' is a debounce mechanism — the condition must hold continuously for the full duration before the action fires. This eliminates false alerts from transient spikes. 'Every time' fires on every individual evaluation that meets the condition."
  },
  {
    "text": "You need to trigger a Fabric notebook to cleanse data when an Activator rule detects a critical anomaly. Which action type should you use?",
    "options": [
      "Email action",
      "Teams action",
      "Power Automate action",
      "Fabric item action"
    ],
    "correct": 3,
    "module": 6,
    "explanation": "Fabric item action directly triggers Fabric-native items such as notebooks and data pipelines. Email and Teams are notification-only actions. Power Automate could indirectly run a notebook, but Fabric item action is the direct and appropriate choice for running Fabric compute in response to a condition."
  },
  {
    "text": "Which of the following statements about Activator is FALSE?",
    "options": [
      "Activator can only be triggered by Eventstream data sources",
      "Activator supports threshold-based conditions on aggregated values",
      "Activator can invoke a Power Automate flow",
      "Activator can send notifications via Teams"
    ],
    "correct": 0,
    "module": 6,
    "explanation": "False: Activator can be triggered from multiple sources — Eventstream destinations, Real-Time Dashboard alerts, KQL Queryset alerts, and Fabric system event alerts. It is not limited to Eventstream. The other three statements are all true."
  },
  {
    "text": "You want to configure an Activator rule to monitor a 10-minute sliding average of CPU metrics and alert when it exceeds 80%. Which configuration achieves this?",
    "options": [
      "Summarization: Average, Window size: 10 minutes, Step size: 1 minute, Condition: Threshold > 80",
      "Summarization: Total, Window size: 80 minutes, Step size: 10 minutes, Condition: Threshold > 10",
      "Summarization: Max, Window size: 1 minute, Step size: 10 minutes, Condition: Threshold > 80",
      "Summarization: Count, Window size: 10 minutes, Step size: 80 minutes, Condition: Threshold > 1"
    ],
    "correct": 0,
    "module": 6,
    "explanation": "Average summarization over a 10-minute window recalculated every 1 minute creates a sliding average. The threshold condition > 80 then triggers when the 10-minute average exceeds 80%. Total, Max, and Count are the wrong aggregations for a CPU average use case."
  },
  {
    "text": "A delivery sensor sends temperature readings every 5 seconds. You want to alert only when temperature stays above 40°C for at least 2 continuous minutes to avoid reacting to brief fluctuations. Which Activator configuration achieves this?",
    "options": [
      "Condition: Threshold > 40, Occurrence: Every time",
      "Condition: Threshold > 40, Occurrence: When it has been true for 2 minutes",
      "Condition: Change detection, Window size: 2 minutes",
      "Condition: Range monitoring, Step size: 2 minutes"
    ],
    "correct": 1,
    "module": 6,
    "explanation": "Threshold > 40 with 'When it has been true for 2 minutes' ensures the condition must hold continuously for 2 minutes before the alert fires, preventing false positives from 5-second spikes. 'Every time' would fire on each qualifying reading, which would cause alert storms."
  },
  {
    "text": "You monitor 500 delivery trucks via Activator. You want temperature alerts only for trucks on cold-chain routes (field: RouteType = 'cold_chain') passing through Seattle (field: City = 'Seattle'). How many property filters do you need?",
    "options": [
      "One filter with combined logic",
      "Two property filters",
      "Three property filters",
      "This is not possible with property filters — use a separate Eventstream instead"
    ],
    "correct": 1,
    "module": 6,
    "explanation": "Two property filters: RouteType = 'cold_chain' AND City = 'Seattle'. Activator supports up to 3 property filters per rule, so two is within the limit. Each filter is configured separately and combined with AND logic."
  },
  {
    "text": "Which Activator summarization type would you use to detect when a sensor stops sending events (count drops to zero)?",
    "options": [
      "Average",
      "Maximum",
      "Count",
      "Total"
    ],
    "correct": 2,
    "module": 6,
    "explanation": "Count tracks how many events arrive within the window. If events stop, the count drops to zero, which can be detected with a threshold condition (Count equals 0). Missing data detection is the dedicated feature for this, but Count is the summarization method that enables it. Average, Max, and Total require actual values and cannot detect absence."
  },
  {
    "text": "Dashboard alerts, system event alerts, and KQL query alerts all share what underlying infrastructure?",
    "options": [
      "They each have independent alert engines",
      "They all use the Activator engine",
      "They use the Monitor Hub engine",
      "They use Azure Monitor under the hood"
    ],
    "correct": 1,
    "module": 6,
    "explanation": "Dashboard alerts, system event alerts, and KQL query alerts are all alternative entry points into the same Activator engine. They differ in how the data/condition is expressed, but the evaluation and action engine is Activator in all three cases."
  },
  {
    "text": "What happens when you connect an Eventstream to Activator and multiple events arrive with the same PackageId?",
    "options": [
      "Each event creates a new separate object for that PackageId",
      "The events are ignored after the first one is processed",
      "The events update the existing object's property values for that PackageId",
      "Activator merges them into a single average event before processing"
    ],
    "correct": 2,
    "module": 6,
    "explanation": "When events share the same unique identifier (PackageId), they update the property values of the existing object rather than creating new objects. New unique identifier values automatically create new objects. This is how Activator maintains per-entity state as the stream flows in."
  },
  {
    "text": "You need to send a Slack message when an Activator condition is met. Activator does not have a native Slack action. Which action type provides the best path to achieve this?",
    "options": [
      "Email action (Slack has email integration)",
      "Teams action (Teams can forward to Slack)",
      "Power Automate action (Power Automate has a Slack connector)",
      "Fabric item action (trigger a notebook that calls Slack API)"
    ],
    "correct": 2,
    "module": 6,
    "explanation": "Power Automate has a native Slack connector and can send messages directly. This is the cleanest integration path. Email could work via Slack's email-to-channel feature, but Power Automate is the proper approach. Fabric item triggering a notebook to call the Slack API would work but is unnecessarily complex."
  },
  {
    "text": "An Activator rule is configured without selecting a unique identifier field. How does Activator process the incoming events?",
    "options": [
      "It creates one object per event record",
      "It treats all events as a single stream-wide object and evaluates rules against the aggregate",
      "It rejects the configuration and requires a unique identifier",
      "It uses the event timestamp as the automatic identifier"
    ],
    "correct": 1,
    "module": 6,
    "explanation": "Without a unique identifier, Activator treats all incoming events as belonging to a single global object. Rules evaluate against the combined stream rather than per-entity. This means you cannot detect 'package A is overheating' — only 'the stream as a whole is overheating'. A unique identifier is required for per-entity monitoring."
  },
  {
    "text": "You want Activator to trigger when a stock's value drops more than 5% from its value at the start of the evaluation window. Which Activator condition type fits?",
    "options": [
      "Threshold monitoring",
      "Change detection",
      "Range monitoring",
      "Missing data detection"
    ],
    "correct": 1,
    "module": 6,
    "explanation": "Change detection fires when a value changes by a specified relative amount (percentage) or absolute amount from a baseline. A 5% drop from the start of the window is a relative change condition. Threshold requires a fixed absolute value. Range monitors entry/exit from a band. Missing data detects absence of events."
  },
  {
    "text": "Which Activator action type is best suited when the response to a detected condition must remain entirely within Microsoft Fabric (running a pipeline to reload affected data)?",
    "options": [
      "Email action",
      "Teams action",
      "Power Automate action",
      "Fabric item action"
    ],
    "correct": 3,
    "module": 6,
    "explanation": "Fabric item action directly triggers Fabric-native items (pipelines, notebooks) with no external dependency. Power Automate could also trigger a pipeline, but it introduces an external service dependency and higher latency. For responses entirely within Fabric, Fabric item action is the direct and recommended choice."
  },
  {
    "text": "A real-time dashboard visualizes KQL query results. You want to alert a manager when a specific visualization crosses a threshold. Which approach uses the Activator engine without requiring a separate Eventstream?",
    "options": [
      "Configure a system event alert in Activator",
      "Configure a dashboard alert on the visualization",
      "Create an Eventstream and route to Activator",
      "Write a KQL update policy that emails the manager"
    ],
    "correct": 1,
    "module": 6,
    "explanation": "Dashboard alerts can be configured directly on Real-Time Dashboard visualizations and use the Activator engine under the hood — no separate Eventstream required. System event alerts monitor Fabric workspace events (not dashboard values). Eventstream routing would work but is unnecessary. KQL update policies transform data, not send alerts."
  },
  {
    "text": "You need Activator to monitor Fabric workspace system events — such as alerting when a specific data pipeline fails. Which alerting approach should you use?",
    "options": [
      "Eventstream destination configured for pipeline failures",
      "System event alerts in Activator",
      "A Monitor Hub webhook integration",
      "A KQL query alert on a failure log table"
    ],
    "correct": 1,
    "module": 6,
    "explanation": "System event alerts in Activator monitor Fabric workspace activities and OneLake file operations directly, including pipeline failures, without requiring an Eventstream. Monitor Hub has no webhook feature. KQL query alerts require a KQL data source. System event alerts are the purpose-built path for Fabric operational events."
  },
  {
    "text": "In the context of Activator, what is the purpose of the 'Property filter' section in a rule?",
    "options": [
      "It selects which property (attribute) to monitor with the rule",
      "It narrows which objects the rule applies to based on categorical attribute values",
      "It defines what type of condition to evaluate (threshold, change, range)",
      "It configures how often the rule is evaluated"
    ],
    "correct": 1,
    "module": 6,
    "explanation": "Property filters restrict the scope of a rule to objects where specific categorical properties match given values (e.g., only evaluate packages where ColdChainType = 'medicine'). The Monitor section selects which property to watch. The Condition section defines the evaluation logic. Step size controls evaluation frequency."
  }

  ];

  if (typeof window.__dp700 === 'undefined') {
    window.__dp700 = { modules: [], questions: [] };
  }

  window.__dp700.questions = window.__dp700.questions.concat(questions);

  if (window.__dp700.modules.length < 6) {
    window.__dp700.modules[5] = "Module 6: Activator";
  }
})();
