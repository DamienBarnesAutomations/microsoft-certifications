# DP-600 coverage audit

Checked against `study-guide.md` (skills measured as of October 19, 2026). Every skill has module material, practice questions (8 or more) and at least 4 Learn cards. 27 questions on topics outside the outline (AI, Copilot, Purview, platform admin) are excluded from test mode.

Questions come from modules 1-7 (modules 6 and 7 fill outline gaps and add depth); the Learn tab (information only, no questions) is the teaching cards in `flashcards/dp600-teach-*.js`, checked by `node scripts/check_learn_cards.js`. Every fact in the old recall deck (`flashcards/dp600.js`, no longer shown) is now taught by a Learn card, as are the key facts the practice questions test. Module 8 (40 questions) adds the exam formats: 5 case studies (4 questions each, shared scenario), 10 ordering and 10 yes/no-series questions (each case also ends with one yes/no). Test tab has a Mock exam (50 questions, 100-minute countdown, domain-weighted, answers revealed at the end). Module 9 (84 questions) adds 30 multi-select ("select two/three"), 16 complete-the-code (T-SQL, KQL, DAX, PySpark, M) and 38 Prepare-data depth questions. In-outline pool is now 487 questions.

## Maintain a data analytics solution 25-30%

### Implement security and governance

| Skill | Questions | Learn cards |
|---|---|---|
| Implement workspace-level access controls | 10 | 8 |
| Implement item-level access controls | 9 | 10 |
| Implement row-level, column-level, object-level, and file-level access control | 19 | 21 |
| Apply sensitivity labels to items | 9 | 8 |
| Endorse items | 10 | 7 |

### Maintain the analytics development lifecycle

| Skill | Questions | Learn cards |
|---|---|---|
| Configure version control for a workspace | 11 | 12 |
| Create and manage a Power BI Desktop project (.pbip) | 10 | 9 |
| Create and configure deployment pipelines | 11 | 15 |
| Perform impact analysis of downstream dependencies | 9 | 6 |
| Deploy and manage semantic models by using the XMLA endpoint | 10 | 8 |
| Create and update reusable assets (.pbit, .pbids, shared semantic models) | 9 | 8 |

## Prepare data 45-50%

### Get data

| Skill | Questions | Learn cards |
|---|---|---|
| Create a data connection | 12 | 10 |
| Discover data by using OneLake catalog and Real-Time hub | 12 | 7 |
| Ingest or access data as needed | 25 | 18 |
| Choose between different data stores | 24 | 16 |
| Implement OneLake integration for Eventhouse and semantic models | 11 | 6 |

### Transform data

| Skill | Questions | Learn cards |
|---|---|---|
| Create views, functions, and stored procedures | 12 | 10 |
| Enrich data by adding new columns or tables | 10 | 8 |
| Implement a star schema for a lakehouse or warehouse | 11 | 13 |
| Denormalize data | 10 | 5 |
| Aggregate data | 11 | 7 |
| Merge or join data | 13 | 9 |
| Identify and resolve duplicate data, missing data, or null values | 13 | 8 |
| Convert column data types | 12 | 5 |
| Filter data | 11 | 8 |

### Query and analyze data

| Skill | Questions | Learn cards |
|---|---|---|
| Visual query editor | 11 | 4 |
| SQL | 13 | 8 |
| KQL | 15 | 9 |
| DAX | 12 | 9 |

## Implement and manage semantic models 25-30%

### Design and build semantic models

| Skill | Questions | Learn cards |
|---|---|---|
| Choose a storage mode | 9 | 9 |
| Implement a star schema for a semantic model | 8 | 7 |
| Implement relationships, such as bridge tables and many-to-many | 10 | 12 |
| Write DAX calculations (variables, iterators, table filtering, windowing, information functions) | 22 | 18 |
| Implement calculation groups, dynamic format strings, and field parameters | 11 | 10 |
| Identify use cases for and configure large semantic model storage format | 9 | 4 |
| Design and build composite models | 10 | 8 |

### Optimize enterprise-scale semantic models

| Skill | Questions | Learn cards |
|---|---|---|
| Implement performance improvements in queries and report visuals | 9 | 10 |
| Improve DAX performance | 10 | 9 |
| Configure Direct Lake, including default fallback and refresh behavior | 11 | 11 |
| Choose between Direct Lake on OneLake and Direct Lake on SQL analytics endpoint | 11 | 7 |
| Implement incremental refresh for semantic models | 12 | 8 |

Totals: 487 in-outline questions, 385 Learn cards.
