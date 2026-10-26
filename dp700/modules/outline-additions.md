# Study guide additions

Topics in the current DP-700 study guide that the original modules did not cover. Facts are from Microsoft Learn.

## Apache Airflow jobs (Configure Apache Airflow workspace settings)

- Managed Airflow in Data Factory; DAGs are Python. Runs Airflow 2.10 on Python 3.12. The version of an existing job cannot be changed.
- Supports Git sync, Azure Key Vault as a secrets backend, private packages as requirements, autoscale, high availability and deferrable operators. Private and virtual networks are not supported.
- Pick Airflow for code-first orchestration; pipelines are the low-code option.

## SQL database projects (Implement database projects)

- A project holds T-SQL object scripts that declare the schema. Building produces a `.dacpac`.
- Create and build in VS Code with the SQL Database Projects extension; keep the project in Git; publish with `SqlPackage /Action:Publish`.
- The target database must exist. A package from another platform needs `/p:AllowIncompatiblePlatform=true`.

## Workspace settings (Spark, domain, OneLake)

- Spark: Workspace settings > Data Engineering/Science > Spark compute (workspace Admin). Starter pool starts in seconds; custom pools take minutes. Session timeout defaults to 20 minutes. Spark properties and libraries live in an Environment.
- Domain: only Fabric admins create domains. Domain admins assign workspaces and manage delegated settings (default sensitivity label, certification). Domain contributors must be workspace admins. A domain does not change item access.
- OneLake: shortcut cache (1 to 28 days, external sources only, files over 1 GB skipped) and OneLake diagnostics, which records data access events in a lakehouse.

## Mirroring

- Replicates a source into Delta tables in OneLake and creates a SQL analytics endpoint. Variants: database mirroring, metadata mirroring (Azure Databricks) and open mirroring.
- Replication compute is free; storage is free up to 1 TB per capacity unit.
- Monitor with Monitor replication on the mirrored database.

## Native tables, shortcuts and query acceleration in Real-Time Intelligence

- Native Eventhouse tables are ingested, indexed and cached, and support update policies and materialized views.
- A OneLake shortcut in a KQL database appears as an external table (`external_table()`), keeps the data in OneLake and has no ingestion.
- Query acceleration indexes and caches a shortcut for a hot period. It is billed on the OneLake Premium cache, and does not support materialized views or update policies.

## Errors and performance details

- Warehouse: snapshot isolation only; update conflicts raise error 24556 or 24706 and the loser retries. Savepoints are not supported.
- Lookup activity: up to 5,000 rows and 4 MB. ForEach: batch count 20 by default, 50 at most. Copy activity workspace staging times out at 60 minutes.
- V-Order is on by default in a warehouse (cannot be re-enabled once off) and off by default in new Spark workspaces.
