# DP-600 coverage audit

Checked against `study-guide.md` (skills measured as of October 19, 2026). Every skill has module material, at least 4 practice questions and at least 3 flashcards. 27 questions on topics outside the outline (AI, Copilot, Purview, platform admin) are excluded from test mode.

Material added for former gaps: data connections (M1.2), DAX queries (M3.1), denormalization (M2.2), Visual query editor details (M1.4), PBIP structure and Git limits (M3.5), plus UDFs (M2.5), DAX information functions (M3.1) and Eventhouse OneLake availability (M1.5).

Questions come from modules 1-6 (module 6 fills the outline gaps); flashcards are in `flashcards/dp600.js`.

## Maintain a data analytics solution 25-30%

### Implement security and governance

| Skill | Questions | Flashcards |
|---|---|---|
| Implement workspace-level access controls | 4 | 5 |
| Implement item-level access controls | 4 | 4 |
| Implement row-level, column-level, object-level, and file-level access control | 15 | 8 |
| Apply sensitivity labels to items | 4 | 5 |
| Endorse items | 4 | 4 |

### Maintain the analytics development lifecycle

| Skill | Questions | Flashcards |
|---|---|---|
| Configure version control for a workspace | 4 | 5 |
| Create and manage a Power BI Desktop project (.pbip) | 4 | 5 |
| Create and configure deployment pipelines | 4 | 4 |
| Perform impact analysis of downstream dependencies | 4 | 4 |
| Deploy and manage semantic models by using the XMLA endpoint | 4 | 4 |
| Create and update reusable assets (.pbit, .pbids, shared semantic models) | 4 | 4 |

## Prepare data 45-50%

### Get data

| Skill | Questions | Flashcards |
|---|---|---|
| Create a data connection | 4 | 5 |
| Discover data by using OneLake catalog and Real-Time hub | 4 | 4 |
| Ingest or access data as needed | 18 | 6 |
| Choose between different data stores | 18 | 5 |
| Implement OneLake integration for Eventhouse and semantic models | 4 | 4 |

### Transform data

| Skill | Questions | Flashcards |
|---|---|---|
| Create views, functions, and stored procedures | 5 | 5 |
| Enrich data by adding new columns or tables | 4 | 4 |
| Implement a star schema for a lakehouse or warehouse | 5 | 6 |
| Denormalize data | 4 | 5 |
| Aggregate data | 4 | 4 |
| Merge or join data | 7 | 6 |
| Identify and resolve duplicate data, missing data, or null values | 4 | 4 |
| Convert column data types | 4 | 4 |
| Filter data | 4 | 4 |

### Query and analyze data

| Skill | Questions | Flashcards |
|---|---|---|
| Visual query editor | 4 | 4 |
| SQL | 5 | 5 |
| KQL | 5 | 5 |
| DAX | 4 | 6 |

## Implement and manage semantic models 25-30%

### Design and build semantic models

| Skill | Questions | Flashcards |
|---|---|---|
| Choose a storage mode | 4 | 4 |
| Implement a star schema for a semantic model | 4 | 4 |
| Implement relationships, such as bridge tables and many-to-many | 5 | 5 |
| Write DAX calculations (variables, iterators, table filtering, windowing, information functions) | 17 | 8 |
| Implement calculation groups, dynamic format strings, and field parameters | 4 | 5 |
| Identify use cases for and configure large semantic model storage format | 4 | 3 |
| Design and build composite models | 4 | 4 |

### Optimize enterprise-scale semantic models

| Skill | Questions | Flashcards |
|---|---|---|
| Implement performance improvements in queries and report visuals | 5 | 5 |
| Improve DAX performance | 4 | 4 |
| Configure Direct Lake, including default fallback and refresh behavior | 5 | 5 |
| Choose between Direct Lake on OneLake and Direct Lake on SQL analytics endpoint | 4 | 4 |
| Implement incremental refresh for semantic models | 4 | 5 |

Totals: 226 in-outline questions, 194 flashcards.
