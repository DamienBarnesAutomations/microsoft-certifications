// Aggregator - combines all DP-300 skill-area files
// Skill files must be loaded before this script

var DP300_MODULES = window.__dp300 ? window.__dp300.modules : [
  "Skill 1: Plan and implement data platform resources",
  "Skill 2: Implement a secure environment",
  "Skill 3: Monitor, configure, and optimize database resources",
  "Skill 4: Configure and manage automation of tasks",
  "Skill 5: Plan and configure a high availability and disaster recovery (HA/DR) environment"
];

var DP300_QUESTIONS = window.__dp300 ? window.__dp300.questions : [];
