// Adapter layer: normalizes the legacy global-variable data files (window.DP300_QUESTIONS,
// window.DP300_MODULES, window.DP300_DATA, window.FLASHCARDS_DP700, etc. — loaded via plain
// <script defer> tags before this file, an intentional legacy pattern we didn't want to churn
// the underlying content files to change) into one clean in-memory catalog. Everything else in
// the app reads from DATA.*, not from window.* directly.

const MODULE_CONFIG = {
  dp300: [
    { file: 'S1.md', title: 'Plan and implement data platform resources' },
    { file: 'S2.md', title: 'Implement a secure environment' },
    { file: 'S3.md', title: 'Monitor, configure, and optimize database resources' },
    { file: 'S4.md', title: 'Configure and manage automation of tasks' },
    { file: 'S5.md', title: 'Plan and configure a high availability and disaster recovery (HA/DR) environment' },
  ],
  dp600: [
    { file: 'M1.1.md', title: 'Introduction to end-to-end analytics using Microsoft Fabric' },
    { file: 'M1.2.md', title: 'Discover and connect to data in OneLake' },
    { file: 'M1.3.md', title: 'Get started with lakehouses in Microsoft Fabric' },
    { file: 'M1.4.md', title: 'Get started with data warehouses in Microsoft Fabric' },
    { file: 'M1.5.md', title: 'Get started with Real-Time Intelligence in Microsoft Fabric' },
    { file: 'M2.1.md', title: 'Choose data stores in Microsoft Fabric' },
    { file: 'M2.2.md', title: 'Design dimensional models for analytics in Microsoft Fabric' },
    { file: 'M2.3.md', title: 'Transform data using Dataflows Gen2 in Microsoft Fabric' },
    { file: 'M2.4.md', title: 'Transform data using notebooks in Microsoft Fabric' },
    { file: 'M2.5.md', title: 'Transform data using T-SQL in Microsoft Fabric' },
    { file: 'M3.1.md', title: 'Create DAX calculations in semantic models' },
    { file: 'M3.2.md', title: 'Design semantic models for scale in Microsoft Fabric' },
    { file: 'M3.3.md', title: 'Optimize semantic model performance' },
    { file: 'M3.4.md', title: 'Enforce semantic model security' },
    { file: 'M3.5.md', title: 'Manage the semantic model development lifecycle' },
    { file: 'M4.1.md', title: 'Prepare the semantic layer for AI in Microsoft Fabric' },
    { file: 'M4.2.md', title: 'Understand Microsoft Fabric IQ fundamentals' },
    { file: 'm4.3.md', title: 'Create an ontology with Fabric IQ' },
    { file: 'M5.1.md', title: 'Secure data access in Microsoft Fabric' },
    { file: 'm5.2.md', title: 'Secure a Microsoft Fabric data warehouse' },
    { file: 'M5.3.md', title: 'Govern data in Microsoft Fabric with Purview' },
    { file: 'M5.4.md', title: 'Govern analytics data in Microsoft Fabric' },
  ],
  dp700: [
    { file: 'M1.1.md', title: 'Ingest Data with Dataflows Gen2 in Microsoft Fabric' },
    { file: 'M1.2.md', title: 'Orchestrate processes and data movement with Microsoft Fabric' },
    { file: 'M1.3.md', title: 'Use Apache Spark in Microsoft Fabric' },
    { file: 'M1.4.md', title: 'Work with real-time data in an Eventhouse in Microsoft Fabric' },
    { file: 'M2.1.md', title: 'Introduction to end-to-end analytics using Microsoft Fabric' },
    { file: 'M2.2.md', title: 'Get started with lakehouses in Microsoft Fabric' },
    { file: 'M2.3.md', title: 'Use Apache Spark in Microsoft Fabric' },
    { file: 'M2.4.md', title: 'Work with Delta Lake tables in Microsoft Fabric' },
    { file: 'M2.5.md', title: 'Ingest Data with Dataflows Gen2 in Microsoft Fabric' },
    { file: 'M2.6.md', title: 'Orchestrate processes and data movement with Microsoft Fabric' },
    { file: 'M2.7.md', title: 'Organize a Fabric lakehouse using medallion architecture' },
    { file: 'M3.1.md', title: 'Get started with Real-Time Intelligence in Microsoft Fabric' },
    { file: 'M3.2.md', title: 'Use Eventstream in Microsoft Fabric' },
    { file: 'M3.3.md', title: 'Work with real-time data in an Eventhouse in Microsoft Fabric' },
    { file: 'M3.4.md', title: 'Create Real-Time Dashboards with Microsoft Fabric' },
    { file: 'M3.5.md', title: 'Use Activator in Microsoft Fabric' },
    { file: 'M4.1.md', title: 'Introduction to end-to-end analytics using Microsoft Fabric' },
    { file: 'M4.2.md', title: 'Get started with data warehouses in Microsoft Fabric' },
    { file: 'M4.3.md', title: 'Load data into a Microsoft Fabric data warehouse' },
    { file: 'M4.4.md', title: 'Query a data warehouse in Microsoft Fabric' },
    { file: 'M4.5.md', title: 'Get started with Copilot in Fabric for Data Warehouse' },
    { file: 'M4.6.md', title: 'Monitor a Microsoft Fabric data warehouse' },
    { file: 'M4.7.md', title: 'Secure a Microsoft Fabric data warehouse' },
    { file: 'M5.1.md', title: 'Implement continuous integration and continuous delivery (CI/CD) in Fabric' },
    { file: 'M5.2.md', title: 'Monitor activities in Microsoft Fabric' },
    { file: 'M5.3.md', title: 'Secure data access in Microsoft Fabric' },
    { file: 'M5.4.md', title: 'Administer a Microsoft Fabric environment' },
    { file: 'M6.1.md', title: 'Use Activator in Microsoft Fabric' },
  ],
  dp750: [
    { file: 'M1.1.md', title: 'Explore Azure Databricks' },
    { file: 'M1.2.md', title: 'Understand Azure Databricks architecture' },
    { file: 'M1.3.md', title: 'Understand Azure Databricks Integrations' },
    { file: 'M1.4.md', title: 'Select and Configure Compute in Azure Databricks' },
    { file: 'M1.5.md', title: 'Create and organize objects in Unity Catalog' },
  ],
};

const CERT_DETAILS = [
  { code: 'DP-700', id: 'dp700', title: 'Fabric Data Engineer' },
  { code: 'DP-600', id: 'dp600', title: 'Fabric Analytics Engineer' },
  { code: 'DP-300', id: 'dp300', title: 'Azure Database Administrator' },
  { code: 'DP-750', id: 'dp750', title: 'Azure Databricks Data Engineer (Preview)' },
];

// Full question pool across every cert that has one, each question tagged with its cert id.
// This is the single catalog the SRS review queue and practice-exam pools both read from.
function buildQuestionCatalog() {
  const pools = [
    { cert: 'dp700', questions: window.DP700_QUESTIONS, modules: window.DP700_MODULES },
    { cert: 'dp600', questions: window.DP600_QUESTIONS, modules: window.DP600_MODULES },
    { cert: 'dp300', questions: window.DP300_QUESTIONS, modules: window.DP300_MODULES },
  ];

  const catalog = [];
  pools.forEach(({ cert, questions }) => {
    (questions || []).forEach((q) => {
      catalog.push({ ...q, cert });
    });
  });
  return catalog;
}

function getQuestionModules(cert) {
  if (cert === 'dp700') return window.DP700_MODULES || [];
  if (cert === 'dp600') return window.DP600_MODULES || [];
  if (cert === 'dp300') return window.DP300_MODULES || [];
  return [];
}

function getConceptCardData(certCode) {
  if (certCode === 'DP-700') return window.DP700_DATA || null;
  if (certCode === 'DP-600') return window.DP600_DATA || null;
  if (certCode === 'DP-300') return window.DP300_DATA || null;
  return null;
}

function getFlashcardModules() {
  return window.FLASHCARDS_DP700 || [];
}

const DATA = {
  MODULE_CONFIG,
  CERT_DETAILS,
  buildQuestionCatalog,
  getQuestionModules,
  getConceptCardData,
  getFlashcardModules,
};

window.DATA = DATA;
