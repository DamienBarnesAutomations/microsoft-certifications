// Aggregator - combines all DP-700 module files
// Module files must be loaded before this script

var DP700_MODULES = window.__dp700 ? window.__dp700.modules : [
  "Module 1: Dataflows, Pipelines & Spark",
  "Module 2: Lakehouse, Delta & Medallion",
  "Module 3: Real-Time Intelligence",
  "Module 4: Warehouse & Dimensional Modeling",
  "Module 5: CI/CD & Administration",
  "Module 6: Activator"
];

var DP700_QUESTIONS = window.__dp700 ? window.__dp700.questions : [];
