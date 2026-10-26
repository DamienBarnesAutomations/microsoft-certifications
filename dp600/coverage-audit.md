# DP-600 coverage audit

Checked against `study-guide.md` (skills measured as of October 19, 2026). Every skill has module material, practice questions (7 or more) and at least 3 flashcards. 27 questions on topics outside the outline (AI, Copilot, Purview, platform admin) are excluded from test mode.

Questions come from modules 1-7 (modules 6 and 7 fill outline gaps and add depth); flashcards are in `flashcards/dp600.js`. Module 8 (40 questions) adds the exam formats: 5 case studies (4 questions each, shared scenario), 10 ordering and 10 yes/no-series questions (each case also ends with one yes/no). Test tab has a Mock exam (50 questions, 100-minute countdown, domain-weighted, answers revealed at the end). Still thin: genuine multi-select questions (about 7).

## Maintain a data analytics solution 25-30%

### Implement security and governance

| Skill | Questions | Flashcards |
|---|---|---|
| Implement workspace-level access controls | 8 | 5 |
| Implement item-level access controls | 8 | 4 |
| Implement row-level, column-level, object-level, and file-level access control | 15 | 8 |
| Apply sensitivity labels to items | 8 | 5 |
| Endorse items | 8 | 4 |

### Maintain the analytics development lifecycle

| Skill | Questions | Flashcards |
|---|---|---|
| Configure version control for a workspace | 8 | 5 |
| Create and manage a Power BI Desktop project (.pbip) | 8 | 5 |
| Create and configure deployment pipelines | 8 | 4 |
| Perform impact analysis of downstream dependencies | 8 | 4 |
| Deploy and manage semantic models by using the XMLA endpoint | 8 | 4 |
| Create and update reusable assets (.pbit, .pbids, shared semantic models) | 8 | 4 |

## Prepare data 45-50%

### Get data

| Skill | Questions | Flashcards |
|---|---|---|
| Create a data connection | 8 | 5 |
| Discover data by using OneLake catalog and Real-Time hub | 8 | 4 |
| Ingest or access data as needed | 18 | 6 |
| Choose between different data stores | 18 | 5 |
| Implement OneLake integration for Eventhouse and semantic models | 8 | 4 |

### Transform data

| Skill | Questions | Flashcards |
|---|---|---|
| Create views, functions, and stored procedures | 8 | 5 |
| Enrich data by adding new columns or tables | 8 | 4 |
| Implement a star schema for a lakehouse or warehouse | 8 | 6 |
| Denormalize data | 8 | 5 |
| Aggregate data | 8 | 4 |
| Merge or join data | 8 | 6 |
| Identify and resolve duplicate data, missing data, or null values | 8 | 4 |
| Convert column data types | 8 | 4 |
| Filter data | 8 | 4 |

### Query and analyze data

| Skill | Questions | Flashcards |
|---|---|---|
| Visual query editor | 8 | 4 |
| SQL | 8 | 5 |
| KQL | 8 | 5 |
| DAX | 8 | 6 |

## Implement and manage semantic models 25-30%

### Design and build semantic models

| Skill | Questions | Flashcards |
|---|---|---|
| Choose a storage mode | 8 | 4 |
| Implement a star schema for a semantic model | 8 | 4 |
| Implement relationships, such as bridge tables and many-to-many | 8 | 5 |
| Write DAX calculations (variables, iterators, table filtering, windowing, information functions) | 17 | 8 |
| Implement calculation groups, dynamic format strings, and field parameters | 8 | 5 |
| Identify use cases for and configure large semantic model storage format | 7 | 3 |
| Design and build composite models | 8 | 4 |

### Optimize enterprise-scale semantic models

| Skill | Questions | Flashcards |
|---|---|---|
| Implement performance improvements in queries and report visuals | 8 | 5 |
| Improve DAX performance | 8 | 4 |
| Configure Direct Lake, including default fallback and refresh behavior | 8 | 5 |
| Choose between Direct Lake on OneLake and Direct Lake on SQL analytics endpoint | 8 | 4 |
| Implement incremental refresh for semantic models | 8 | 5 |

Totals: 363 in-outline questions, 194 flashcards.
