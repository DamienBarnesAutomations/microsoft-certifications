# DP-700 Study Guide: Skills Measured

Skills measured as of the current Microsoft study guide for Exam DP-700: Implementing Data Engineering Solutions Using Microsoft Fabric.

Audience: data engineers with subject matter expertise in data loading patterns, data architectures and orchestration processes, who ingest and transform data, secure and manage an analytics solution, and monitor and optimize it by using SQL, PySpark and KQL.

## Skills at a glance

- Implement and manage an analytics solution (30–35%)
- Ingest and transform data (30–35%)
- Monitor and optimize an analytics solution (30–35%)

## Implement and manage an analytics solution (30–35%)

### Configure Microsoft Fabric workspace settings

- Configure Spark workspace settings
- Configure domain workspace settings
- Configure OneLake workspace settings
- Configure Apache Airflow workspace settings

### Implement lifecycle management in Fabric

- Configure version control
- Implement database projects
- Create and configure deployment pipelines

### Configure security and governance

- Implement workspace-level access controls
- Implement item-level access controls
- Implement row-level, column-level, object-level, and folder/file-level access controls
- Implement dynamic data masking
- Apply sensitivity labels to items
- Endorse items
- Implement and use Microsoft Fabric audit logs
- Configure and implement OneLake security

### Orchestrate processes

- Choose between Dataflow gen 2, a pipeline and a notebook
- Design and implement schedules and event-based triggers
- Implement orchestration patterns with notebooks and pipelines, including parameters and dynamic expressions

## Ingest and transform data (30–35%)

### Design and implement loading patterns

- Design and implement full and incremental data loads
- Prepare data for loading into a dimensional model
- Design and implement a loading pattern for streaming data

### Ingest and transform batch data

- Choose an appropriate data store
- Choose between Dataflows Gen2, notebooks, KQL, and T-SQL for data transformation
- Create and manage OneLake shortcuts
- Implement mirroring
- Ingest data by using pipelines
- Transform data by using PySpark, SQL, and KQL
- Denormalize data
- Group and aggregate data
- Handle duplicate, missing, and late-arriving data

### Ingest and transform streaming data

- Choose an appropriate streaming engine
- Choose between native tables and OneLake shortcuts in Real-Time Intelligence
- Choose between Query acceleration for OneLake shortcuts and standard OneLake shortcuts in Real-Time Intelligence
- Process data by using Eventstream
- Process data by using Spark structured streaming
- Process data by using KQL
- Create windowing functions

## Monitor and optimize an analytics solution (30–35%)

### Monitor Fabric items

- Monitor data ingestion
- Monitor data transformation
- Monitor semantic model refresh
- Configure alerts

### Identify and resolve errors

- Identify and resolve pipeline errors
- Identify and resolve Dataflow Gen2 errors
- Identify and resolve notebook errors
- Identify and resolve Eventhouse errors
- Identify and resolve Eventstream errors
- Identify and resolve T-SQL errors
- Identify and resolve OneLake shortcut errors

### Optimize performance

- Optimize a Lakehouse table
- Optimize a pipeline
- Optimize a data warehouse
- Optimize Eventstream and Eventhouse
- Optimize Spark performance
- Optimize query performance
