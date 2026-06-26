var MODULE2_CARDS = [
  // ── Microsoft Fabric Platform & Lakehouse ──────────────────────────────
  {
    id: "m2-c1",
    type: "term",
    topic: "Fabric Platform",
    front: "What is Microsoft Fabric and how does OneLake relate to ADLS Gen2?",
    back: "Microsoft Fabric is a unified SaaS platform for analytics.<br>OneLake is the single-tenant, multi-workspace data lake built on <code>ADLS Gen2</code> with <code>Delta-Parquet</code> as the native storage format. Every workspace gets its own OneLake folder automatically."
  },
  {
    id: "m2-c2",
    type: "term",
    topic: "Workspace Roles",
    front: "What are the four workspace roles in Fabric and what can each do?",
    back: "<b>Admin:</b> Full access, manage roles, share workspace<br><b>Member:</b> Read & write items, publish reports<br><b>Contributor:</b> Read & write items, cannot share<br><b>Viewer:</b> Read-only — can only view items (no write access)"
  },
  {
    id: "m2-c3",
    type: "term",
    topic: "Lakehouse Structure",
    front: "What is the difference between <code>Tables</code> and <code>Files</code> in a Fabric Lakehouse?",
    back: "<b>Tables</b> — managed Delta-Parquet directories registered in the Hive metastore. Queryable via SQL Analytics Endpoint, Spark, and Direct Lake.<br><br><b>Files</b> — raw storage area for unstructured or semi-structured data (JSON, images, etc.). Not queryable via SQL — accessed via Spark or shortcuts."
  },
  {
    id: "m2-c4",
    type: "term",
    topic: "SQL Analytics Endpoint",
    front: "What is the SQL Analytics Endpoint and what are its limitations?",
    back: "An auto-generated, <b>read-only</b> T-SQL interface over Lakehouse Delta tables. Supports <code>SELECT</code>, views, stored procedures, RLS/CLS.<br><br><b>Limitations:</b> No <code>INSERT/UPDATE/DELETE</code>, no <code>CREATE TABLE</code>, no <code>MERGE</code>, no DDL of any kind. It reflects the live state of your Delta tables."
  },
  {
    id: "m2-c5",
    type: "term",
    topic: "Lakehouse Schemas",
    front: "How do schemas work in a Fabric Lakehouse and what is the four-part namespace?",
    back: "Schemas are <b>enabled by default</b> on new Lakehouses. A schema named <code>dbo</code> is auto-created.<br><br>Four-part namespace: <code>[workspace].[lakehouse].[schema].[table]</code><br><br>Example: <code>SalesAnalytics.WWILakehouse.dbo.Orders</code>"
  },
  {
    id: "m2-c6",
    type: "term",
    topic: "Direct Lake",
    front: "What is Direct Lake mode and how does it differ from Import/DirectQuery?",
    back: "Direct Lake reads Delta-Parquet files directly from OneLake <b>without</b> importing data into memory or sending queries back to the source.<br>Faster than DirectQuery (no round-trips), no refresh overhead like Import. Best for large Delta tables in Power BI. Falls back to DirectQuery if files are unreadable."
  },
  {
    id: "m2-c7",
    type: "term",
    topic: "Shortcuts",
    front: "What are OneLake shortcuts and where can they point?",
    back: "Shortcuts are virtual references to data stored elsewhere — no data is copied.<br><br>Can point to:<br>• Another Fabric Lakehouse / Warehouse<br>• ADLS Gen2 (with ACLs)<br>• Amazon S3<br>• Dataverse<br><br>The referenced data appears <b>as if</b> it is local in OneLake."
  },
  {
    id: "m2-c8",
    type: "edge",
    topic: "Load to Table",
    front: "What file formats does 'Load to Table' support in Fabric Lakehouse?",
    back: "Only <b>CSV</b> and <b>Parquet</b>. If you try to load JSON, XML, or any other format via the UI Load to Table option, it will fail.<br><br>For other formats, use a Notebook or Dataflow Gen2."
  },
  {
    id: "m2-c9",
    type: "compare",
    topic: "Lakehouse Structure",
    front: "Compare <code>Tables</code> vs <code>Files</code> in a Lakehouse.",
    back: "<b>Tables</b>: Registered in Hive metastore, Delta-Parquet format, queryable via SQL Analytics Endpoint and Spark.<br><br><b>Files</b>: Raw storage area, any format, NOT registered, NOT queryable via SQL — only via Spark or shortcuts."
  },

  // ── Delta Lake ─────────────────────────────────────────────────────────
  {
    id: "m2-c10",
    type: "term",
    topic: "Delta Lake",
    front: "What is Delta Lake and what is its underlying file structure?",
    back: "Delta Lake is an <b>open-source storage layer</b> that brings ACID transactions to data lakes.<br><br>Structure: <code>Parquet</code> data files + a <code>_delta_log</code> directory containing JSON transaction logs. Each change appends a new log entry — data files are never mutated in-place."
  },
  {
    id: "m2-c11",
    type: "term",
    topic: "Delta Lake",
    front: "What ACID properties does Delta Lake guarantee?",
    back: "<b>A</b>tomicity — transactions either fully commit or roll back<br><b>C</b>onsistency — data constraints enforced via schema<br><b>I</b>solation — serializable isolation (concurrent writers via optimistic concurrency)<br><b>D</b>urability — committed data persists in OneLake"
  },
  {
    id: "m2-c12",
    type: "term",
    topic: "Delta Lake",
    front: "What is schema enforcement in Delta Lake?",
    back: "Delta Lake enforces schema <b>on write</b> — every write must match the table schema (name + data type). Mismatched columns or types cause the write to <b>fail</b>.<br><br>Use <code>mergeSchema</code> (true) or <code>overwriteSchema</code> for deliberate schema evolution."
  },
  {
    id: "m2-c13",
    type: "term",
    topic: "Delta Lake",
    front: "How does time travel work in Delta Lake?",
    back: "Three methods:<br>1. <code>VERSION AS OF &lt;version&gt;</code> — query by Delta log version<br>2. <code>TIMESTAMP AS OF &lt;timestamp&gt;</code> — query by point in time<br>3. <code>DESCRIBE HISTORY</code> — list all versions with timestamps<br><br>Time travel requires the <code>_delta_log</code> to still contain the relevant commit entry. <code>VACUUM</code> breaks time travel beyond its retention period."
  },
  {
    id: "m2-c14",
    type: "term",
    topic: "Delta Lake",
    front: "What is <code>OptimizeWrite</code> and <code>OPTIMIZE</code> in Delta Lake?",
    back: "<b>OptimizeWrite</b> — <i>default enabled</i> in Fabric. Dynamically reduces partition file count during writes.<br><br><b>OPTIMIZE</b> — post-write command (<code>OPTIMIZE table</code>) that consolidates small Parquet files into larger ones (bin-packing). Improves read performance, especially for Direct Lake and Spark."
  },
  {
    id: "m2-c15",
    type: "term",
    topic: "Delta Lake",
    front: "What is V-Order in Fabric and what are its trade-offs?",
    back: "V-Order is a special encoding applied during Delta writes in Fabric that <b>reorders data rows</b> within Parquet files to maximize Verti-Scan compression.<br><br><b>Write overhead:</b> ~15% slower writes<br><b>Read benefit:</b> Significant performance gain for Fabric engines (Power BI, SQL Analytics Endpoint, Spark) due to better min/max statistics and skipping."
  },
  {
    id: "m2-c16",
    type: "edge",
    topic: "Delta Lake",
    front: "What happens when you run <code>VACUUM</code> on a Delta table and why does it break time travel?",
    back: "<code>VACUUM</code> physically removes Parquet files older than the retention threshold (default <b>7 days</b>). It does NOT delete transaction logs — but once data files are gone, you cannot time travel to a version that required them.<br><br>Any <code>TIMESTAMP AS OF</code> or <code>VERSION AS OF</code> query pointing beyond the retention window will <b>fail</b>."
  },
  {
    id: "m2-c17",
    type: "term",
    topic: "Delta Lake",
    front: "What is the difference between managed and external Delta tables?",
    back: "<b>Managed table:</b> Dropping the table <b>deletes</b> the underlying data files. Both schema and data are removed.<br><br><b>External table:</b> Dropping the table removes only the <b>metadata</b> (Hive metastore registration). The underlying Parquet files in the external location are <b>preserved</b>."
  },
  {
    id: "m2-c18",
    type: "compare",
    topic: "Delta Lake",
    front: "Compare <code>Managed</code> vs <code>External</code> Delta tables — when would you use each?",
    back: "<b>Managed:</b> Use for transient, curated, or Gold-layer data where you want Fabric to own the full lifecycle. Drop = full cleanup.<br><br><b>External:</b> Use when data is produced outside Fabric (e.g., ADLS Gen2 from upstream pipelines) and you only want to register it. Drop = lose the pointer, keep the data."
  },
  {
    id: "m2-c19",
    type: "term",
    topic: "Delta Lake",
    front: "How do you create Delta tables programmatically using the Delta Lake API?",
    back: "Two approaches:<br><br>1. <b>DeltaTableBuilder (Scala/Python):</b><br><code>DeltaTable.create()<br>  .addColumn(\"id\", \"INT\")<br>  .addColumn(\"name\", \"STRING\")<br>  .location(\"/path\")<br>  .execute()</code><br><br>2. <b>DeltaTable API for reads/updates:</b><br><code>DeltaTable.forPath(spark, \"/path\")<br>  .update(...)</code><br><br>Spark SQL <code>USING DELTA</code> is the most common approach in notebooks."
  },
  {
    id: "m2-c20",
    type: "edge",
    topic: "Delta Lake",
    front: "When is partitioning in Delta Lake an anti-pattern?",
    back: "Partitioning is an <b>anti-pattern when the partition column has high cardinality</b> (e.g., partitioning by <code>user_id</code> or <code>transaction_id</code>). Thousands of small partitions → thousands of small Parquet files → poor read performance.<br><br>Good partition columns: <code>year</code>, <code>month</code>, <code>region</code> (low cardinality, naturally filtered)."
  },
  {
    id: "m2-c21",
    type: "scenario",
    topic: "Delta Lake",
    front: "You're streaming data into a Delta table with Spark Structured Streaming. Your source can have late-arriving data or schema drift. What options do you need to set?",
    back: "Use the Delta sink with:<br><br><code>.option(\"checkpointLocation\", \"/path\")</code> — <b>required</b> for exactly-once guarantees<br><br><code>.option(\"mergeSchema\", \"true\")</code> — handle schema drift<br><br><code>.option(\"ignoreChanges\", \"true\")</code> — ignore data changes in source (reprocesses)<br><br><code>.option(\"ignoreDeletes\", \"true\")</code> — ignore deleted source records<br><br>Without <code>checkpointLocation</code>, streaming will fail."
  },

  // ── Medallion Architecture ──────────────────────────────────────────────
  {
    id: "m2-c22",
    type: "term",
    topic: "Medallion Architecture",
    front: "What is the Medallion Architecture and what are its three layers?",
    back: "A data design pattern that organizes data into progressively refined layers:<br><br><b>Bronze:</b> Raw ingested data, unaltered — the immutable source of truth<br><b>Silver:</b> Cleansed, validated, deduplicated — ready for analytics<br><b>Gold:</b> Business-ready — star schemas, aggregated, curated for reporting<br><br>Data flows left-to-right (Bronze → Silver → Gold) with increasing structure."
  },
  {
    id: "m2-c23",
    type: "term",
    topic: "Medallion Architecture",
    front: "What is the purpose and key characteristic of the Bronze layer?",
    back: "The Bronze layer holds <b>raw, unaltered</b> data exactly as received from the source. It is the <b>immutable source of truth</b> — never modified or deleted.<br><br>Use cases: Full audit trail, re-processing from scratch, debugging ingestion issues. Data is usually full snapshots or append-only logs."
  },
  {
    id: "m2-c24",
    type: "term",
    topic: "Medallion Architecture",
    front: "What transformations happen in the Silver layer?",
    back: "Silver cleanses and enriches:<br>• Data type casting & formatting<br>• NULL handling & default values<br>• Deduplication (remove duplicates)<br>• Validation rules & constraint checks<br>• Joins across Bronze tables<br><br>Result: Clean, queryable, analytics-ready data — but not yet aggregated for specific business reports."
  },
  {
    id: "m2-c25",
    type: "term",
    topic: "Medallion Architecture",
    front: "What is the Gold layer optimized for?",
    back: "The Gold layer contains <b>business-ready</b> data models — typically star schemas with fact and dimension tables. Optimized for:<br>• Power BI reports & dashboards<br>• ML feature engineering<br>• Downstream consumption by analysts<br><br>This layer is the most sensitive to schema changes — <b>CI/CD is critical</b> to prevent breaking reports."
  },
  {
    id: "m2-c26",
    type: "scenario",
    topic: "Medallion Architecture",
    front: "Why is CI/CD especially critical for the Gold layer of the medallion architecture?",
    back: "Gold tables are consumed directly by Power BI datasets, paginated reports, and external applications. A breaking schema change (renamed column, removed measure, changed data type) can <b>immediately break production dashboards</b>.<br><br>CI/CD ensures changes are validated, versioned, and deployed with rollback capability. Bronze and Silver can tolerate more ad-hoc changes since fewer downstream consumers depend on them."
  },
  {
    id: "m2-c27",
    type: "term",
    topic: "Medallion Architecture",
    front: "What is the role of transformation vs orchestration in the medallion architecture?",
    back: "<b>Transformation</b> (Dataflows Gen2, Notebooks) — moves & reshapes data between layers (Bronze → Silver → Gold). Handles the actual data processing logic.<br><br><b>Orchestration</b> (Pipelines) — schedules, sequences, and monitors the transformation executions. Manages dependencies, retries, and alerts.<br><br>Common pattern: Pipeline triggers a Notebook which performs a Bronze→Silver transformation."
  },
  {
    id: "m2-c28",
    type: "compare",
    topic: "Medallion Architecture",
    front: "How do security requirements differ across Bronze, Silver, and Gold?",
    back: "<b>Bronze:</b> Least restricted — raw data may still contain PII, but access is limited to engineering teams.<br><br><b>Silver:</b> Moderate — cleansed data shared with data analysts. RLS can be applied.<br><br><b>Gold:</b> Most restricted — business reports contain aggregated, presentation-ready data. Strict RLS/CLS, row-level permissions per department. Audit requirements are highest."
  },

  // ── Warehouse vs SQL Analytics Endpoint ────────────────────────────────
  {
    id: "m2-c29",
    type: "term",
    topic: "Warehouse",
    front: "What is a Fabric Warehouse and how does it differ from the SQL Analytics Endpoint?",
    back: "A Fabric Warehouse is a <b>standalone, full read-write</b> relational database with complete T-SQL support:<br><br>• <b>DDL:</b> <code>CREATE TABLE/VIEW/PROCEDURE</code><br>• <b>DML:</b> <code>INSERT/UPDATE/DELETE/MERGE</code><br>• <b>ACID</b> via Delta Lake under the hood<br>• Independent of any Lakehouse<br><br>By contrast, the SQL Analytics Endpoint is <b>read-only</b> and auto-created with a Lakehouse."
  },
  {
    id: "m2-c30",
    type: "compare",
    topic: "Warehouse vs SQL Analytics Endpoint",
    front: "Compare Fabric Warehouse vs SQL Analytics Endpoint (read/write, DDL, use cases).",
    back: "<b>Fabric Warehouse:</b><br>• Read-write T-SQL<br>• Full DDL/DML/MERGE<br>• Standalone (no Lakehouse required)<br>• Use for ETL, staging, data engineering<br><br><b>SQL Analytics Endpoint:</b><br>• Read-only T-SQL<br>• SELECT + views/stored procedures only<br>• Auto-created with Lakehouse<br>• Use for BI & ad-hoc queries over lakehouse tables<br><br>Both support: views, stored procedures, RLS, CLS."
  },
  {
    id: "m2-c31",
    type: "scenario",
    topic: "Warehouse vs SQL Analytics Endpoint",
    front: "You need to run a <code>MERGE</code> statement to upsert data into a table. You also need RLS and CLS. You do NOT have a Lakehouse. What do you use?",
    back: "Use a <b>Fabric Warehouse</b>. It supports <code>MERGE</code> (DML), RLS, and CLS — and is standalone, so no Lakehouse is required.<br><br>The SQL Analytics Endpoint cannot run <code>MERGE</code> (read-only) and always requires a Lakehouse."
  },
  {
    id: "m2-c32",
    type: "edge",
    topic: "Warehouse vs SQL Analytics Endpoint",
    front: "What happens if you try to run <code>CREATE TABLE</code> or <code>INSERT</code> against the SQL Analytics Endpoint?",
    back: "It <b>fails</b>. The SQL Analytics Endpoint is strictly <b>read-only</b>. It auto-generates from the Lakehouse's Delta tables and cannot be modified via T-SQL.<br><br>To write data, you must either:<br>1. Use Spark/Notebook to write to the Lakehouse<br>2. Use a Fabric Warehouse (which supports full DDL/DML)"
  },
  {
    id: "m2-c33",
    type: "term",
    topic: "Warehouse",
    front: "What security features do both Warehouse and SQL Analytics Endpoint share?",
    back: "Both support:<br>• <b>RLS</b> (Row-Level Security) — filter rows by user predicate<br>• <b>CLS</b> (Column-Level Security) — mask/restrict sensitive columns<br>• <b>Views</b> — encapsulate and restrict access<br>• <b>Stored Procedures</b> — encapsulate logic<br><br>These are configured via T-SQL <code>CREATE SECURITY POLICY</code> and <code>GRANT</code> statements."
  }
];
