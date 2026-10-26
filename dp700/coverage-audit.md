# DP-700 coverage audit

Checked against `study-guide.md`. Every skill has practice questions (8 or more) and at least 3 flashcards. 20 questions on topics outside the outline (DAX and Direct Lake modelling, Copilot, capacity and tenant administration, Real-Time Dashboards) are excluded from test mode.

Questions come from modules 1-7 (module 7 was written to fill the study guide gaps); flashcards are in `flashcards/dp700-outline.js`. Not covered: case-study formats. New questions are based on Microsoft Learn and the model's own knowledge, not on a real practice exam.

## Implement and manage an analytics solution 30-35%

### Configure Microsoft Fabric workspace settings

| Skill | Questions | Flashcards |
|---|---|---|
| Configure Spark workspace settings | 12 | 11 |
| Configure domain workspace settings | 9 | 5 |
| Configure OneLake workspace settings | 8 | 4 |
| Configure Apache Airflow workspace settings | 8 | 4 |

### Implement lifecycle management in Fabric

| Skill | Questions | Flashcards |
|---|---|---|
| Configure version control | 11 | 6 |
| Implement database projects | 8 | 4 |
| Create and configure deployment pipelines | 8 | 4 |

### Configure security and governance

| Skill | Questions | Flashcards |
|---|---|---|
| Implement workspace-level access controls | 8 | 4 |
| Implement item-level access controls | 8 | 4 |
| Implement row-level, column-level, object-level, and folder/file-level access controls | 9 | 4 |
| Implement dynamic data masking | 9 | 4 |
| Apply sensitivity labels to items | 8 | 4 |
| Endorse items | 8 | 4 |
| Implement and use Microsoft Fabric audit logs | 8 | 4 |
| Configure and implement OneLake security | 8 | 7 |

### Orchestrate processes

| Skill | Questions | Flashcards |
|---|---|---|
| Choose between Dataflow gen 2, a pipeline and a notebook | 9 | 4 |
| Design and implement schedules and event-based triggers | 10 | 4 |
| Implement orchestration patterns with notebooks and pipelines, including parameters and dynamic expressions | 10 | 4 |

## Ingest and transform data 30-35%

### Design and implement loading patterns

| Skill | Questions | Flashcards |
|---|---|---|
| Design and implement full and incremental data loads | 8 | 4 |
| Prepare data for loading into a dimensional model | 13 | 7 |
| Design and implement a loading pattern for streaming data | 8 | 4 |

### Ingest and transform batch data

| Skill | Questions | Flashcards |
|---|---|---|
| Choose an appropriate data store | 13 | 16 |
| Choose between Dataflows Gen2, notebooks, KQL, and T-SQL for data transformation | 14 | 8 |
| Create and manage OneLake shortcuts | 10 | 4 |
| Implement mirroring | 8 | 4 |
| Ingest data by using pipelines | 8 | 4 |
| Transform data by using PySpark, SQL, and KQL | 37 | 26 |
| Denormalize data | 8 | 4 |
| Group and aggregate data | 8 | 4 |
| Handle duplicate, missing, and late-arriving data | 8 | 4 |

### Ingest and transform streaming data

| Skill | Questions | Flashcards |
|---|---|---|
| Choose an appropriate streaming engine | 8 | 6 |
| Choose between native tables and OneLake shortcuts in Real-Time Intelligence | 8 | 4 |
| Choose between Query acceleration for OneLake shortcuts and standard OneLake shortcuts in Real-Time Intelligence | 8 | 4 |
| Process data by using Eventstream | 11 | 6 |
| Process data by using Spark structured streaming | 8 | 4 |
| Process data by using KQL | 21 | 13 |
| Create windowing functions | 8 | 4 |

## Monitor and optimize an analytics solution 30-35%

### Monitor Fabric items

| Skill | Questions | Flashcards |
|---|---|---|
| Monitor data ingestion | 8 | 8 |
| Monitor data transformation | 9 | 4 |
| Monitor semantic model refresh | 8 | 4 |
| Configure alerts | 44 | 41 |

### Identify and resolve errors

| Skill | Questions | Flashcards |
|---|---|---|
| Identify and resolve pipeline errors | 10 | 4 |
| Identify and resolve Dataflow Gen2 errors | 8 | 4 |
| Identify and resolve notebook errors | 8 | 4 |
| Identify and resolve Eventhouse errors | 8 | 4 |
| Identify and resolve Eventstream errors | 8 | 4 |
| Identify and resolve T-SQL errors | 8 | 4 |
| Identify and resolve OneLake shortcut errors | 8 | 4 |

### Optimize performance

| Skill | Questions | Flashcards |
|---|---|---|
| Optimize a Lakehouse table | 20 | 8 |
| Optimize a pipeline | 8 | 4 |
| Optimize a data warehouse | 8 | 4 |
| Optimize Eventstream and Eventhouse | 14 | 4 |
| Optimize Spark performance | 9 | 4 |
| Optimize query performance | 9 | 4 |

Totals: 569 in-outline questions, 328 flashcards.
