# DP-600 Study Guide: Skills Measured

Skills measured as of October 19, 2026.

## Skills at a glance

- Maintain a data analytics solution (25–30%)
- Prepare data (45–50%)
- Implement and manage semantic models (25–30%)

## Maintain a data analytics solution (25–30%)

### Implement security and governance

- Implement workspace-level access controls
- Implement item-level access controls
- Implement row-level, column-level, object-level, and file-level access control
- Apply sensitivity labels to items
- Endorse items

### Maintain the analytics development lifecycle

- Configure version control for a workspace
- Create and manage a Power BI Desktop project (.pbip)
- Create and configure deployment pipelines
- Perform impact analysis of downstream dependencies from lakehouses, warehouses, dataflows, and semantic models
- Deploy and manage semantic models by using the XMLA endpoint
- Create and update reusable assets, including Power BI template (.pbit) files, Power BI data source (.pbids) files, and shared semantic models

## Prepare data (45–50%)

### Get data

- Create a data connection
- Discover data by using OneLake catalog and Real-Time hub
- Ingest or access data as needed
- Choose between different data stores
- Implement OneLake integration for Eventhouse and semantic models

### Transform data

- Create views, functions, and stored procedures
- Enrich data by adding new columns or tables
- Implement a star schema for a lakehouse or warehouse
- Denormalize data
- Aggregate data
- Merge or join data
- Identify and resolve duplicate data, missing data, or null values
- Convert column data types
- Filter data

### Query and analyze data

- Select, filter, and aggregate data by using the Visual query editor
- Select, filter, and aggregate data by using SQL
- Select, filter, and aggregate data by using KQL
- Select, filter, and aggregate data by using DAX

## Implement and manage semantic models (25–30%)

### Design and build semantic models

- Choose a storage mode
- Implement a star schema for a semantic model
- Implement relationships, such as bridge tables and many-to-many relationships
- Write calculations that use DAX variables and functions, such as iterators, table filtering, windowing, and information functions
- Implement calculation groups, dynamic format strings, and field parameters
- Identify use cases for and configure large semantic model storage format
- Design and build composite models

### Optimize enterprise-scale semantic models

- Implement performance improvements in queries and report visuals
- Improve DAX performance
- Configure Direct Lake, including default fallback and refresh behavior
- Choose between Direct Lake on OneLake and Direct Lake on SQL analytics endpoint
- Implement incremental refresh for semantic models
