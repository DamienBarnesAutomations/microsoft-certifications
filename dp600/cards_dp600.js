export const cards_dp600 = [
  {
    title: "Microsoft Fabric & OneLake",
    whatItIs: "Microsoft Fabric is an end-to-end, unified SaaS analytics platform that provides a single, integrated environment where data professionals and business users can collaborate on data projects. It is built on a unified data lake called OneLake, which ensures that all data is stored in a single open format and is accessible to all compute engines within the platform without the need for data movement.",
    keyDetails: [
      "Fabric Workloads: Microsoft Fabric offers a diverse range of integrated workloads to support the entire data lifecycle. Data Engineering uses lakehouses and Spark for large-scale processing, while Data Factory provides pipelines and dataflows for orchestration and ingestion. The Data Warehouse workload provides enterprise-scale relational capabilities with full T-SQL support, and Real-Time Intelligence enables the ingestion and analysis of streaming data. Additionally, Data Science workloads leverage notebooks and machine learning, while Power BI provides the consumption layer for reporting and analytics.",
      "Administration and Governance: Fabric administration is centralized through the Admin portal, where administrators can manage groups, permissions, data sources, gateways, and monitor usage and performance. Governance is enhanced through the use of domains to group workspaces by business area and the OneLake catalog to help users discover and manage data assets. Integration with Microsoft Purview allows for advanced data classification, sensitivity labeling, and lineage tracking across the entire tenant.",
      "OneLake and Shortcuts: OneLake serves as the centralized, tenant-wide storage layer for Microsoft Fabric, acting as a single logical lake that eliminates data silos. It is built on Azure Data Lake Storage Gen2 and stores data in open formats like Delta-Parquet, ensuring that all compute engines can access the same data without duplication. OneLake supports shortcuts, which allow users to reference data in external or internal locations—such as Amazon S3 or other OneLake locations—without physically copying it, maintaining data consistency and reducing storage costs.",
      "Discovery and Streaming: The OneLake catalog provides a searchable inventory of all data assets across the tenant, allowing users to browse by workspace or domain and view metadata like ownership, refresh status, and endorsement status. For streaming data, the Real-Time hub serves as a centralized catalog for discovering and managing eventstreams and KQL tables. This hub enables users to connect to diverse streaming sources and build real-time analytics solutions that respond to events as they happen.",
      "AI Capabilities: Microsoft Fabric is designed to be AI-ready, providing powerful tools like Copilot to assist users with code generation, data transformation, and report creation. Advanced intelligence is provided through Fabric IQ, which includes Fabric IQ for business ontologies, Foundry IQ for enterprise knowledge, and Work IQ for collaboration signals. Furthermore, Fabric data agents allow users to interact with their data through conversational interfaces, using natural language to query lakehouses, warehouses, and semantic models."
    ],
    architecturalLogic: "",
    examGotchas: [
      "Unified Foundation: OneLake provides a single source of truth that is accessible to all Fabric engines, eliminating the need for data duplication.",
      "Shortcuts vs. Copying: Shortcuts provide access to data without duplicating it, but they are not suitable for point-in-time snapshots or when compliance requires physical separation.",
      "Workspace Roles vs. Item Permissions: Workspace roles apply to all items in a workspace, while item permissions allow for more granular, per-item access control.",
      "OneLake Catalog vs. Real-Time Hub: The OneLake Catalog is for batch and stored data, whereas the Real-Time Hub is for streaming and in-motion data.",
      "Copilot Capacity: Using Copilot requires a Fabric capacity of F2 or higher, and Trial SKUs do not support Copilot in all scenarios."
    ]
  },
  {
    title: "Lakehouse",
    whatItIs: "A Lakehouse in Microsoft Fabric combines the flexibility and scalability of a data lake with the analytical power and ACID transaction support of a data warehouse. By using the Delta Lake format in OneLake, it allows for the storage of structured, semi-structured, and unstructured data in a single, unified location.",
    keyDetails: [
      "Storage Areas: A lakehouse is organized into two primary areas: the Tables area and the Files area. The Tables area contains managed Delta Lake tables that provide schema enforcement, ACID transactions, and direct SQL accessibility. The Files area is used for storing raw or semi-structured data in its native format, such as CSV, JSON, or Parquet, providing maximum flexibility for data exploration and staging.",
      "Access and Querying: Users can interact with a lakehouse through several different modes depending on their requirements. The Lakehouse explorer provides a management interface for files and tables, while the SQL analytics endpoint offers read-only T-SQL access to Delta tables for analysts. Data engineers and scientists typically use Spark notebooks to perform read/write operations using PySpark, Spark SQL, or Scala. For high-performance reporting, Power BI uses Direct Lake mode to read Delta files directly from OneLake.",
      "Ingestion and Transformation: Data can be brought into a lakehouse through various methods, including direct uploads, the Load to Table feature for Parquet and CSV files, and automated pipelines. More complex ETL processes can be handled using Dataflows Gen2 for a low-code experience or Spark notebooks for programmatic, large-scale transformations. Shortcuts also allow users to integrate external data into their lakehouse without the need for physical movement.",
      "Schemas and Security: Lakehouses support schemas, with a `dbo` schema being created by default, allowing for better organization of tables. Security is managed through a combination of workspace roles, item-level sharing, and granular security controls like RLS and CLS on the SQL analytics endpoint."
    ],
    architecturalLogic: "",
    examGotchas: [
      "Tables vs. Files: Tables are Delta-formatted, SQL-queryable, and schema-enforced, whereas Files are raw and do not support direct SQL access.",
      "SQL Analytics Endpoint: The SQL endpoint is strictly read-only; you cannot perform DML (INSERT, UPDATE, DELETE) operations through it.",
      "Load to Table: This no-code feature is specifically designed to support Parquet and CSV files.",
      "Direct Lake Fallback: If resource thresholds are exceeded or unsupported operations are used, Power BI can fall back from Direct Lake to DirectQuery mode.",
      "Cross-Workspace Queries: These require the use of the four-part naming convention (`workspace.lakehouse.schema.table`)."
    ]
  },
  {
    title: "Data Warehouse",
    whatItIs: "A Fabric Data Warehouse is a fully managed, enterprise-scale relational database that provides full T-SQL capabilities, including both DDL and DML support. It is designed to handle structured analytical workloads with multi-table ACID compliance while storing all data in the open Delta format on OneLake.",
    keyDetails: [
      "Capabilities and Tooling: The warehouse supports a wide array of T-SQL operations, such as `CREATE`, `ALTER`, `INSERT`, `UPDATE`, `DELETE`, and `MERGE`, making it ideal for transactional ETL. Users can interact with the warehouse using the web-based SQL query editor, the Visual Query Editor for a no-code experience, or external tools like SSMS and Azure Data Studio.",
      "Dimensional Modeling: The warehouse is optimized for dimensional modeling, using star schemas to organize data into fact and dimension tables. This structure enables efficient querying and provides a robust foundation for Power BI semantic models. Modeling includes the use of surrogate keys to insulate the warehouse from source system changes and the implementation of slowly changing dimensions (SCD) to track historical attribute changes.",
      "Ingestion and Querying: Data can be ingested into the warehouse using the `COPY INTO` command for bulk loading from files, `OPENROWSET` for querying external files, or through Data Factory pipelines and Dataflows. Once loaded, data can be queried using T-SQL or joined with data in other warehouses and lakehouses through cross-database queries using three-part naming.",
      "Security and Monitoring: Security is managed through workspace roles, item permissions, and granular SQL security features like row-level security (RLS), column-level security (CLS), and dynamic data masking. Performance and usage are monitored through Query Insights, which provides 30-day historical data, and Dynamic Management Views (DMVs) for real-time tracking."
    ],
    architecturalLogic: "",
    examGotchas: [
      "Warehouse vs. Lakehouse Endpoint: The Warehouse provides full read/write T-SQL capabilities, whereas the Lakehouse SQL endpoint is read-only.",
      "No Foreign Key Enforcement: Fabric does not enforce referential integrity via FK constraints at the engine level; this must be managed in the ETL logic.",
      "Table Clones: These are zero-copy operations that only consume additional storage for changed data.",
      "Query Insights: Historical query data is retained for 30 days.",
      "KILL Command: Only Workspace Admins have the authority to terminate active sessions.",
      "Cross-Database Queries: Use three-part naming (`database.schema.table`) to join data across warehouses and lakehouses within the same workspace."
    ]
  },
  {
    title: "Real-Time Intelligence",
    whatItIs: "Real-Time Intelligence is an integrated suite of Fabric components designed to ingest, process, store, and act on streaming data with minimal latency. It enables organizations to move from batch-based historical analysis to real-time, event-driven decision making.",
    keyDetails: [
      "Core Components: The suite includes Eventstreams for capturing and transforming data in motion, and Eventhouses for high-performance, time-series storage using KQL databases. KQL Querysets provide a dedicated workspace for running and managing KQL queries, while Real-Time Dashboards offer automatically refreshing visualizations. For automated responses, Activator monitors data against predefined rules and triggers actions like notifications or workflows.",
      "Ingestion and Transformation: Data can be ingested into the Real-Time Intelligence ecosystem via Eventstreams, which can filter, aggregate, and route data to various destinations. Alternatively, data can be directly ingested into KQL databases within an Eventhouse. Transformations can occur in-motion via Eventstream processing or after landing via KQL update policies.",
      "KQL and Analytics: Kusto Query Language (KQL) is the primary engine for analysis, optimized for high-volume, time-series data. KQL supports a pipeline-based syntax that allows for efficient filtering, aggregation, and pattern matching. Real-Time Dashboards and Power BI provide the visualization layer, allowing users to monitor both current trends and historical patterns."
    ],
    architecturalLogic: "",
    examGotchas: [
      "Eventstream vs. KQL Update Policy: Eventstream transformations happen *during* stream processing (in-motion), while update policies happen *after* data lands in a KQL database.",
      "Hub vs. Catalog: The Real-Time Hub is for streaming and event data, whereas the OneLake Catalog is for batch and stored data.",
      "Power BI Integration: Power BI connects to Eventhouses via DirectQuery, not Direct Lake.",
      "Append-Only Model: Eventhouses are optimized for append-only streaming and are not intended for frequent UPDATE or DELETE operations.",
      "KQL Case-Sensitivity: KQL is strictly case-sensitive for all identifiers, including table names, column names, and operators.",
      "Join Order: In KQL, you should place the smaller table first in a join to optimize performance."
    ]
  },
  {
    title: "Analytical Data Store Options",
    whatItIs: "Microsoft Fabric provides three primary analytical data stores: the Lakehouse, the Warehouse, and the Eventhouse. While all three are built on the OneLake foundation and support open formats like Delta and Parquet, they are optimized for different data patterns, query languages, and workload requirements.",
    keyDetails: [
      "Lakehouse: This is the most versatile option, designed for flexible analytics and data engineering. It supports structured, semi-structured, and unstructured data. The primary development tool is Apache Spark (Python, Scala, SQL, R), and it supports batch ingestion via Spark notebooks, pipelines, and dataflows. It provides a dual-access model: read/write access via Spark and read-only T-SQL access through the SQL analytics endpoint.",
      "Warehouse: This is optimized for structured analytics and enterprise BI reporting. It provides full transactional T-SQL capabilities, including complete DDL and DML support (such as `MERGE`). The primary development tool is T-SQL, and it is the preferred choice for SQL-first teams building star schemas and dimensional models.",
      "Eventhouse: This is purpose-built for real-time analytics on streaming and time-series data. It handles high-volume, append-heavy workloads with minimal latency. The primary development tool is Kusto Query Language (KQL), and it is ideal for monitoring telemetry, logs, and IoT sensor data.",
      "Decision Framework: When choosing a data store, consider several key factors. The **data format** (structured vs. unstructured) and **write pattern** (transactional vs. streaming) are critical. **Query language preference** (T-SQL vs. Spark vs. KQL) and the **team's existing skill set** also play a major role. Finally, the **workload type**—whether it is batch analytics, exploratory data science, or real-time monitoring—will ultimately determine the best fit.",
      "AI Readiness: Each store supports different AI scenarios. The Lakehouse is the natural home for machine learning training and feature stores, especially when using Spark. The Warehouse provides the structured, governed data that Copilot and data agents rely on for answering natural language questions. The Eventhouse enables real-time AI scoring and anomaly detection on live, streaming event data."
    ],
    architecturalLogic: "",
    examGotchas: [
      "OneLake Integration: All three stores write to OneLake, meaning data can be accessed across workloads via shortcuts or cross-database queries without duplication.",
      "Lakehouse SQL Access: The SQL analytics endpoint on a lakehouse is strictly read-only for T-SQL users.",
      "Warehouse Transactions: Only the Warehouse provides full multi-table ACID transaction support through T-SQL.",
      "Eventhouse Optimization: The Eventhouse is optimized for append-only streaming and is not intended for frequent `UPDATE` or `DELETE` operations.",
      "Workload Overlap: Many real-world solutions use multiple stores together (e.g., a Lakehouse for staging and a Warehouse for curated BI)."
    ]
  },
  {
    title: "DAX Calculations & Model Components",
    whatItIs: "Semantic models are enhanced through three types of DAX (Data Analysis Expressions) calculations: **Calculated Tables**, **Calculated Columns**, and **Measures**. These allow for the creation of sophisticated logic, from adding new dimensions to performing complex, dynamic aggregations.",
    keyDetails: [
      "Calculated Tables: These are created with DAX formulas that return a table object. They are useful for duplicating existing tables to handle multiple relationships (e.g., creating a 'Ship Date' table from a 'Date' table) or for generating specialized tables like date tables using `CALENDARAUTO`.",
      "Calculated Columns: These add a new column to an existing table, with the formula evaluated in **row context** during data refresh. While useful for adding attributes like 'Fiscal Year,' they increase model size and should be used sparingly in favor of Power Query or measures.",
      "Measures: These are dynamic aggregations evaluated in **filter context** at query time. Measures do not store values in the model, making them highly efficient for large datasets. They are the primary tool for business metrics like 'Total Revenue' or 'Profit Margin.'",
      "Iterator Functions: Functions like `SUMX`, `AVERAGEX`, and `RANKX` evaluate an expression row-by-row over a specified table. They are essential for complex calculations that require row-level logic before aggregation.",
      "Key Concepts: Calculated columns operate in row context (the current row), while measures operate in filter context (the set of rows currently filtered by slicers or visuals). In complex models, measures can use the `USERELATIONSHIP` function to activate inactive relationships, allowing a single dimension (like Date) to support multiple roles (like Order Date and Ship Date)."
    ],
    architecturalLogic: "",
    examGotchas: [
      "Measure Efficiency: Measures are more efficient than calculated columns because they do not consume storage and are computed only when needed.",
      "Iterators: Use iterators when you need to perform a calculation on each row (e.g., `Quantity * UnitPrice`) before aggregating the result.",
      "Calculated Tables: These are useful for creating role-playing dimensions to solve multiple relationship challenges."
    ]
  },
  {
    title: "Designing for Scale & Storage Modes",
    whatItIs: "Designing for scale involves making strategic decisions about how data flows into the model and how it is structured to support growing volumes of data and increasing numbers of concurrent users.",
    keyDetails: [
      "Storage Modes: The choice of storage mode directly impacts query performance, data freshness, and feature availability: Direct Lake (Default), Import Mode, DirectQuery, and Composite Mode.",
      "Star Schema & Relationships: A well-designed star schema is fundamental to performance. Relationships should connect dimension tables to fact tables using a one-to-many pattern, with filters flowing from the dimension to the fact. For complex models, designers must manage inactive relationships using `USERELATIONSHIP` and handle many-to-many scenarios using bridge tables.",
      "Scaling Settings: To support large-scale environments, several advanced settings can be configured: Large Semantic Model Storage Format, XMLA Endpoint, Query Scaleout, and Direct Lake Fallback."
    ],
    architecturalLogic: "",
    examGotchas: [
      "Direct Lake is the default: In Fabric, start with Direct Lake and only move to other modes if specific requirements (like non-Fabric sources) necessitate it.",
      "Relationship direction: Standard star schemas use single-direction filtering from dimension to fact to ensure predictable performance.",
      "Fallback behavior: In production, you may choose to 'Disallow Fallback' to enforce consistent performance, even if it means some queries return errors.",
      "OneLake Integration: Enabling this allows downstream Fabric items (like notebooks) to consume the semantic model data directly as Delta tables."
    ]
  },
  {
    title: "Performance Optimization",
    whatItIs: "Optimization involves diagnosing bottlenecks and applying targeted fixes to ensure reports and AI-powered experiences (Copilot, Agents) remain responsive.",
    keyDetails: [
      "Diagnostic Tools: Performance Analyzer, DAX Studio, and Best Practice Analyzer (BPA).",
      "Optimization Strategies: DAX Tuning (using Variables, avoiding expensive FILTER), Reducing Cardinality, and implementing Aggregations.",
      "Troubleshooting Workflow: Identify (Performance Analyzer) $\\rightarrow$ Isolate (DAX Studio) $\\rightarrow$ Fix & Verify."
    ],
    architecturalLogic: "",
    examGotchas: [
      "The 'Small File' Problem: In Direct Lake, a large number of small files can degrade performance; use `OPTIMIZE` in Spark to compact them.",
      "Cardinality is Key: High-cardinality columns (like GUIDs or high-precision timestamps) are major contributors to slow models and high memory usage.",
      "Aggregations are Transparent: When correctly configured, the engine automatically uses aggregations, so users don't need to know they exist.",
      "Variables save time: Using `VAR` in DAX can often cut execution time in half by preventing the engine from recalculating the same expression multiple times."
    ]
  },
  {
    title: "Semantic Model Security",
    whatItIs: "Semantic model security controls which data users can see when they query a model. Implementing security ensures that data visibility is restricted to only authorized users, protecting sensitive information across all consumption paths.",
    keyDetails: [
      "Row-Level Security (RLS): RLS restricts *which rows* are visible based on DAX filter expressions. Includes Static RLS, Dynamic RLS (using `USERPRINCIPALNAME()`), and the Security Table Pattern.",
      "Object-Level Security (OLS): OLS restricts access to *specific tables or columns*. When an object is secured with OLS, it and its metadata are completely hidden from unauthorized users. Must be implemented using external tools like Tabular Editor.",
      "Testing and Management: Use the **View as** feature for testing. Manage role membership in the Power BI service, preferably by mapping roles to Microsoft Entra security groups. Properly configured RLS and OLS ensure that Copilot and Fabric data agents only access and surface authorized data."
    ],
    architecturalLogic: "",
    examGotchas: [
      "RLS is Additive: If a user is assigned to multiple roles, they see the **union** of all rows permitted by those roles.",
      "Workspace Roles vs. RLS: Workspace roles (Admin, Member, Contributor) bypass RLS entirely. Only users with Viewer permissions are subject to RLS.",
      "OLS and Metadata: When an object is secured with OLS, it is completely invisible to unauthorized users, including its metadata.",
      "Relationship Integrity: When implementing RLS, ensure that relationship chains are not broken, as this can cause unintended data visibility."
    ]
  },
  {
    title: "Development Lifecycle Management",
    whatItIs: "Lifecycle management (LCM) provides a structured process—**Develop $\\rightarrow$ Validate $\\rightarrow$ Deploy $\\rightarrow$ Monitor**—to manage semantic models from creation to production.",
    keyDetails: [
      "Develop: Use Reusable Assets (Shared Semantic Models, Power BI Templates) and Version Control (Power BI Desktop Projects/TMDL for Git integration).",
      "Validate: Use Programmatic Validation (XMLA endpoint and SemPy in Fabric notebooks) and External Tools (Tabular Editor, DAX Studio).",
      "Deploy: Use Deployment Pipelines (Dev $\\rightarrow$ Test $\\rightarrow$ Prod) and Deployment Rules (to adjust configurations automatically).",
      "Monitor: Use Scheduled Refresh and the Fabric Monitoring Hub."
    ],
    architecturalLogic: "",
    examGotchas: [
      "Git vs. Pipelines: Git is for tracking *what* changed and facilitating collaboration, while Deployment Pipelines are for managing *where* content is deployed across environments.",
      "SemPy Advantage: SemPy allows for automated, repeatable validation in notebooks, which is more scalable than manual checks.",
      "Deployment Rules Timing: Always configure deployment rules *before* the first deployment to ensure environments are correctly configured upon promotion."
    ]
  },
  {
    title: "AI-Ready Semantic Layer",
    whatItIs: "Preparing a semantic model for AI consumption involves grounding AI tools like Copilot and data agents with clear naming, thorough documentation, and linguistic modeling so that Retrieval-Augmented Generation (RAG) produces accurate natural-language answers.",
    keyDetails: [
      "Grounding: The process of providing AI with contextual information (table names, column names, relationships, descriptions, linguistic schema) to improve response accuracy. This involves the RAG (Retrieval-Augmented Generation) process.",
      "Linguistic Modeling: Configured via Q&A Setup. Includes **Synonyms** (e.g., 'Revenue' maps to 'Sales') and **Linguistic Relationships** (e.g., 'Customers purchase Products').",
      "Prep for AI Features: Includes AI Data Schema (controls visibility), AI Instructions (business rules/terminology), and Verified Answers (predefined visual responses).",
      "Approved for Copilot: A setting in the Power BI service that removes friction-treatment banners from Copilot answers."
    ],
    architecturalLogic: "AI tools lack inherent business knowledge; they rely entirely on the grounding data retrieved during the RAG process. The semantic model serves as the critical interface between data engineering (upstream) and AI consumption (downstream). High-quality grounding (clear names, rich descriptions, and linguistic modeling) directly improves the quality of AI-generated answers.",
    examGotchas: [
      "Grounding vs. Ontology: Grounding is per-model context (descriptions, synonyms); Ontology is organization-wide shared business vocabulary (Fabric IQ).",
      "First 200 Characters: Descriptions are truncated at 200 characters for grounding—put the most important context first.",
      "Implicit vs. Explicit Measures: Copilot may aggregate a column without an explicit measure, potentially mismatching business logic. Always use explicit measures for key metrics.",
      "Hidden Fields: Hiding a field in the model removes it from AI consideration entirely (both columns and tables).",
      "Verified Answers: These are predefined visual responses that bypass AI generation to ensure consistency for common questions.",
      "Prep for AI updates: Changes persist on the semantic model and sync via Git/pipelines, but require a model refresh in the service after deployment."
    ]
  },
  {
    title: "Fabric IQ (Ontology)",
    whatItIs: "Fabric IQ is a workload that creates **ontologies**—organization-wide, machine-understandable vocabularies of business concepts (entities, properties, relationships) bound to OneLake data (lakehouse tables or eventhouse streams).",
    keyDetails: [
      "Build-Bind-Query Workflow: 1. **Build** (Define entity types, properties, and relationship types); 2. **Bind** (Map ontology definitions to OneLake sources); 3. **Query** (Use Graph (GQL), Query Builder, or Data Agents).",
      "Entity Type Components: Includes Name, Properties (Attributes: Static or Time Series), and a Key (required before binding).",
      "Relationship Types: Directional connections between two different entity types.",
      "Data Binding Types: Static Bindings (lakehouse tables for static data) and Time Series Bindings (eventhouse tables for streaming, timestamped observations).",
      "Creation Paths: Generate from Semantic Model (using Direct Lake model) or Build from OneLake (manual creation).",
      "Data Agents: Conversational Q&A powered by Azure OpenAI. Can use up to five data sources (lakehouses, warehouses, KQL databases, semantic models, or ontologies).",
      "Graph in Microsoft Fabric: Native graph storage using a labeled property graph model (nodes and edges), queried via GQL."
    ],
    architecturalLogic: "Fabric IQ separates business meaning from physical data structures. The ontology defines *what* a 'Patient' is, while bindings map that concept to *where* the data lives in OneLake. This enables federated queries across lakehouse (static) and eventhouse (time-series) data using a consistent business vocabulary.",
    examGotchas: [
      "Direct Lake requirement for generation: Full automated generation (including data bindings) is only supported when using a Direct Lake semantic model with inbound public access.",
      "Static Binding First: In dual-binding scenarios, static bindings must be configured before time-series bindings.",
      "Entity Key requirement: A key (string or integer) must be defined before an entity can be bound to data.",
      "Graph vs. Query Builder: Use Graph (GQL) for complex multi-hop traversal; use Query Builder for simple filtering and exploration.",
      "Data Agent source limit: An agent can use up to five data sources in any combination.",
      "Ontology vs. Semantic Model: Semantic models are for reporting domains; ontologies are for organization-wide standardization and AI consumption."
    ]
  },
  {
    title: "Fabric Security Model",
    whatItIs: "Microsoft Fabric's layered security model evaluates access sequentially across Microsoft Entra ID, Fabric access, and data security — the data security layer has four controls (workspace roles, item permissions, compute permissions, OneLake security) that narrow from workspace-wide to per-table/folder, implementing the principle of least privilege.",
    keyDetails: [
      "Three levels of access evaluation (sequential): 1. Microsoft Entra ID authentication; 2. Fabric access; 3. Data security.",
      "Four primary access controls at the data security level: 1. Workspace roles (broadest); 2. Item permissions; 3. Compute/granular permissions (T-SQL DCL); 4. OneLake security (narrowest).",
      "Workspace roles (4): Admin, Member, Contributor, and Viewer. Note that Viewers see items but have NO underlying OneLake data access by default.",
      "Item permissions: Read permission grants access to metadata and associated reports, but NO data access to SQL or OneLake. Additional permissions include Read all SQL endpoint data and Read all Apache Spark and subscribe to events. Both grant access to ALL data in the lakehouse by default.",
      "Compute/granular permissions (T-SQL DCL): Supports GRANT, DENY, and REVOKE for SELECT, INSERT, UPDATE, and DELETE. DENY always supersedes GRANT.",
      "OneLake security roles (RBAC within a lakehouse item): Includes Data (tables/folders), Permission (Read/ReadWrite), Members, and Constraints. Only workspace Admin and Member roles can create/modify these. Admin/Member/Contributor workspace roles **bypass** OneLake security.",
      "DefaultReader role: Every lakehouse has a DefaultReader role. Users granted 'Read all Apache Spark' are automatically added. ALWAYS remove them from DefaultReader when adding to a custom restricted role."
    ],
    architecturalLogic: "The layered model follows the principle of least privilege by starting broad (workspace role for collaboration) and narrowing as needed (item permissions for specific items, compute permissions for engine-specific control, OneLake security for within-item table/folder access). Each layer is independently configurable but works additively — access is the intersection of what the workspace role, item permissions, compute permissions, and OneLake security give. Because Admin/Member/Contributor bypass OneLake security, use workspace roles for broad collaboration and OneLake security specifically for restricting Viewers and Read-permission users who should only see subsets of data.",
    examGotchas: [
      "Viewer role and OneLake data: Viewers see items listed but have NO underlying OneLake data access by default. Use OneLake security roles to grant data access to viewers.",
      "DefaultReader: Automatically created in every lakehouse. Adding Read all Apache Spark permission auto-adds recipient to DefaultReader. ALWAYS remove from DefaultReader before adding to a custom restricted role — otherwise the user retains full read access through DefaultReader.",
      "Admin/Member/Contributor bypass OneLake security: OneLake security roles only restrict Viewers and Read-permission users. If a workspace Admin needs restricted access, they cannot be restricted via OneLake security — must remove from Admin role.",
      "Read permission alone does not grant data access: Read item permission only shows metadata. Users need Read all SQL endpoint data OR Read all Apache Spark to access actual data.",
      "OneLake security is cross-engine: Enforced consistently across Spark, SQL, and OneLake APIs — not engine-specific like T-SQL permissions.",
      "DENY supersedes GRANT: If a user is in a role with GRANT and another with DENY on the same permission, DENY wins."
    ]
  },
  {
    title: "Data Warehouse Security",
    whatItIs: "Fabric data warehouse provides four T-SQL-based data protection features — Dynamic Data Masking (DDM), Row-Level Security (RLS), Column-Level Security (CLS), and SQL granular permissions (SELECT/INSERT/UPDATE/DELETE) — all enforced at the SQL engine level.",
    keyDetails: [
      "Dynamic Data Masking (DDM): Masks column values in query results without altering stored data. Includes functions: default(), email(), partial(), and random(). Applied via ALTER TABLE.",
      "Row-Level Security (RLS): Filters rows at query time based on group membership or execution context. Implemented via an inline table-valued function (security predicate) and a security policy. Applies to SELECT, UPDATE, and DELETE, but NOT INSERT.",
      "Column-Level Security (CLS): Restricts access to specific columns at query time. Implemented by granting SELECT on the table and then denying SELECT on specific columns. More granular and efficient than Views.",
      "SQL Granular Permissions (DCL): Fundamental permissions include SELECT, INSERT, UPDATE, and DELETE. Applied via GRANT, DENY, and REVOKE. DENY always supersedes GRANT. Use QUOTENAME() in dynamic SQL to prevent injection."
    ],
    architecturalLogic: "All four features (DDM, RLS, CLS, granular permissions) are enforced at the SQL engine level and operate transparently — queries return masked/filtered/hidden data without application changes. This makes them suitable for securing existing applications that cannot be rewritten. Use DDM to obscure data, RLS to filter rows by identity, and CLS to hide sensitive columns. Use views when you also need row-level filtering and data transformation in a single object.",
    examGotchas: [
      "DDM does not change stored data: It only masks query results. Users with query permissions can infer actual data through inference attacks.",
      "RLS side-channel attacks: Risk of information leakage through crafted WHERE clauses that cause exceptions.",
      "DENY supersedes GRANT: If a user inherits GRANT through one role and DENY through another, DENY wins.",
      "CLS vs. Views: CLS is transparent (users query the same table), more granular, more efficient, and auto-adapts to table changes. Views are more flexible (can combine row filtering, column filtering, and data transformation in one object).",
      "SECURITY POLICY with STATE = ON/OFF: Policy must be ON for RLS to be active.",
      "Schema binding in predicates: RLS predicate functions must be created WITH SCHEMABINDING.",
      "INSERT not affected by filter predicates: Filter predicates do not apply to INSERT operations — only SELECT, UPDATE, DELETE."
    ]
  },
  {
    title: "Microsoft Purview (Fabric Governance)",
    whatItIs: "Microsoft Purview provides advanced cross-platform data governance — Data Map, Unified Catalog, Information Protection, Data Loss Prevention, and Audit — extending beyond Fabric's built-in governance capabilities through a registered connection between the Fabric tenant and Microsoft Purview.",
    keyDetails: [
      "Built-in Fabric governance (no Purview license required): Admin Portal, Domains, Workspaces, Capacity, Metadata scanning, Data tags (sensitivity/retention), Workspace roles, Data-level controls, OneLake data hub, Endorsement, Data lineage, Monitoring Hub, and Capacity Metrics App.",
      "Purview pillars (require Purview license + Fabric registration): Data Map (scans assets), Unified Catalog (searchable catalog), Information Protection (classify/label/protect), Data Loss Prevention (detect/monitor/control movement), and Audit (automated logging).",
      "Purview hub in Fabric: Surfaces Purview's governance findings (sensitivity labels, endorsement, domains) within the Fabric UI."
    ],
    architecturalLogic: "Purview sits outside Fabric as a cross-platform governance layer. It connects to Fabric via a registered tenant connection and scanning process — Purview does not access Fabric data continuously; it scans metadata on a schedule to populate the Data Map and Unified Catalog. Use Purview over built-in Fabric governance when the organization needs cross-platform data estate visibility, DLP, advanced auditing, or Information Rights Management encryption.",
    examGotchas: [
      "Fabric built-in vs. Purview: Built-in features work without extra licensing and cover basic governance. Purview adds cross-platform scanning, Data Map/Unified Catalog, DLP, IRM, and advanced audit.",
      "Purview hub is a gateway: It does not replace the Purview Portal — it surfaces Purview governance data inside Fabric.",
      "Connection must be registered in Purview first: The Purview hub in Fabric only appears after registering the Fabric tenant in Purview's Data Map and creating a scan.",
      "Fabric compliance certifications: HIPAA BAA, ISO/IEC 27017, 27018, 27001, 27701."
    ]
  },
  {
    title: "Analytics Data Governance",
    whatItIs: "Governing analytics data in Fabric involves sensitivity labels (classification with downstream inheritance), endorsement (Promoted/Certified/Master data trust signals), documentation (descriptions, tags, lineage, domains), and AI-specific governance (Approved for Copilot gate, endorsement-prioritized AI agent data selection) — all aggregated in the OneLake catalog.",
    keyDetails: [
      "Sensitivity labels: Classify data (Public, General, Confidential, etc.) with Purview. Labels propagate downstream (lakehouse $\\rightarrow$ SQL endpoint $\\rightarrow$ semantic model $\\rightarrow$ report). Labels are preserved on export to Excel, PDF, and .pbix, but NOT on CSV or TXT.",
      "Endorsement levels: Promoted (team-level trust), Certified (organization-authorized), and Master data (authoritative single source of truth, applies ONLY to data items like lakehouses/semantic models).",
      "Documentation: Use item descriptions (first 200 characters are critical for AI), tags, domains, and data lineage.",
      "AI Governance: Includes AI Data Schema (visibility), AI Instructions (context/rules), Verified Answers (predefined responses), and the Approved for Copilot gate (removes friction)."
    ],
    architecturalLogic: "Governance signals flow from source items downstream through inheritance. The OneLake catalog aggregates these signals into a single searchable/governable surface. AI agents process these signals programmatically — they cannot 'know' which data is trustworthy or sensitive without explicit metadata. Sensitivity labels provide the access boundary, while endorsement provides trust ranking for AI prioritization.",
    examGotchas: [
      "Label propagation: A single label on a source (e.g., lakehouse) propagates automatically through the entire chain.",
      "Master data distinction: Only applies to data items (lakehouses, semantic models) — not reports, notebooks, or pipelines.",
      "Approved for Copilot propagation: Reports inherit the status from their semantic model. Changes can take up to 24 hours (most within 1 hour).",
      "Verified answers vs. AI instructions: Verified answers are predefined visual responses for specific trigger phrases. AI instructions provide broad business context.",
      "Endorsement exception: Power BI dashboards do NOT support endorsement.",
      "CSV/TXT export warning: Sensitivity labels are NOT preserved on CSV or TXT exports."
    ]
  }
];
