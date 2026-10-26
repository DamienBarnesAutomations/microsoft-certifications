// Aggregator - combines all DP-600 module files
// Module files must be loaded before this script

var DP600_MODULES = window.__dp600 ? window.__dp600.modules : [
  "Module 1: Microsoft Fabric & Analytics Platform",
  "Module 2: Data Storage & Transformation",
  "Module 3: Semantic Modeling & DAX",
  "Module 4: AI & Ontology",
  "Module 5: Security & Governance",
  "Module 6: Additional Exam-Skill Questions"
];

var DP600_QUESTIONS = window.__dp600 ? window.__dp600.questions : [];
