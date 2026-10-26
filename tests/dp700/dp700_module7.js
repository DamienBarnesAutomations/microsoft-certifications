// Module 7: Study guide coverage (questions written for each skill in the skills outline)
(function() {
  var questions = [
    {
      "id": "dp700-7-001",
      "text": "A Spark Structured Streaming job loads events into a Delta table. After a restart it must continue from where it stopped instead of reprocessing or losing data. What do you configure?",
      "options": [
        "spark.sql.shuffle.partitions",
        "A checkpointLocation on the write stream",
        "outputMode(\"complete\")",
        "trigger(availableNow=True)"
      ],
      "correct": 1,
      "module": 7,
      "explanation": "The checkpoint stores the offsets and state of the query, so a restarted query resumes where it stopped. The trigger and output mode control when and what is written, not recovery."
    },
    {
      "id": "dp700-7-002",
      "text": "Events can arrive up to 10 minutes late and you aggregate them into 5-minute windows. Which call bounds the state kept for late data?",
      "options": [
        "withWatermark(\"eventTime\", \"10 minutes\")",
        "repartition(10)",
        "trigger(processingTime=\"10 minutes\")",
        "cache()"
      ],
      "correct": 0,
      "module": 7,
      "explanation": "A watermark tells Spark how late data may arrive, so it can finalize old windows and drop their state. The other options do not limit state."
    },
    {
      "id": "dp700-7-003",
      "text": "A streaming aggregation is written to a Delta table and each window must be emitted once, after it is final. Which output mode do you use together with a watermark?",
      "options": [
        "complete",
        "update",
        "overwrite",
        "append"
      ],
      "correct": 3,
      "module": 7,
      "explanation": "With a watermark, append mode emits a window only after the watermark passes it, so each window is written once. Complete rewrites the whole result each trigger, update emits changed rows, and overwrite is not a streaming output mode."
    },
    {
      "id": "dp700-7-004",
      "text": "You want a scheduled notebook to process only the data that arrived since the last run and then stop. Which streaming trigger fits?",
      "options": [
        "trigger(processingTime=\"0 seconds\")",
        "trigger(continuous=\"1 second\")",
        "trigger(availableNow=True)",
        "outputMode(\"complete\")"
      ],
      "correct": 2,
      "module": 7,
      "explanation": "availableNow processes all available data in micro-batches and then stops, which suits incremental loads on a schedule. It still uses the checkpoint to know what is new."
    },
    {
      "id": "dp700-7-005",
      "text": "A source delivers events at least once, so the bronze stream contains duplicate event IDs. How do you load silver without duplicates?",
      "options": [
        "Use outputMode(\"complete\") on the bronze stream",
        "Use foreachBatch and MERGE into the silver Delta table on the event ID",
        "Append each micro-batch to silver as it arrives",
        "Increase the checkpoint interval"
      ],
      "correct": 1,
      "module": 7,
      "explanation": "A MERGE keyed on the event ID makes each micro-batch idempotent. Plain appends keep the duplicates, and the other settings do not deduplicate."
    },
    {
      "id": "dp700-7-006",
      "text": "Which Fabric item ingests events from Kafka or Event Hubs with no code and can send them to both a lakehouse and an Eventhouse?",
      "options": [
        "Dataflow Gen2",
        "Eventstream",
        "Copy job",
        "Mirrored database"
      ],
      "correct": 1,
      "module": 7,
      "explanation": "An Eventstream connects streaming sources, optionally transforms events and routes them to several destinations. Dataflow Gen2, Copy job and mirroring are batch or replication tools."
    },
    {
      "id": "dp700-7-007",
      "text": "A streaming job writes thousands of tiny files to a Delta table. Which change reduces them?",
      "options": [
        "Disabling the checkpoint",
        "Running VACUUM every minute",
        "A shorter trigger interval and more shuffle partitions",
        "A longer trigger interval and optimize write"
      ],
      "correct": 3,
      "module": 7,
      "explanation": "Larger micro-batches and optimize write produce fewer, larger files. A shorter trigger or more partitions makes more small files, and VACUUM removes old files rather than compacting."
    },
    {
      "id": "dp700-7-008",
      "text": "You need raw events kept for history in a lakehouse and the latest events queryable in an Eventhouse. What is the simplest pattern?",
      "options": [
        "Schedule a Dataflow Gen2 refresh every minute",
        "Run two pipelines that poll the source",
        "Copy the Eventhouse to the lakehouse nightly with a Copy job",
        "Route one Eventstream to two destinations: the lakehouse and the Eventhouse"
      ],
      "correct": 3,
      "module": 7,
      "explanation": "An Eventstream can fan out the same events to several destinations. Polling pipelines or scheduled refreshes add latency and cost."
    },
    {
      "id": "dp700-7-009",
      "text": "A Copy activity must read from an on-premises SQL Server. What do you need?",
      "options": [
        "An Eventstream custom endpoint",
        "An on-premises data gateway",
        "A custom Spark pool",
        "A OneLake shortcut"
      ],
      "correct": 1,
      "module": 7,
      "explanation": "Pipelines reach on-premises sources through an on-premises data gateway. Spark pools, shortcuts and Eventstream endpoints do not provide that connectivity."
    },
    {
      "id": "dp700-7-010",
      "text": "You want guided data movement with built-in support for full and incremental copy and no pipeline to author. Which item fits?",
      "options": [
        "A Dataflow Gen2",
        "A notebook",
        "A Copy job",
        "An Eventstream"
      ],
      "correct": 2,
      "module": 7,
      "explanation": "A Copy job moves data between stores, supports full and incremental copy, and needs no pipeline. Notebooks and dataflows are for transformation, and Eventstream is for streaming."
    },
    {
      "id": "dp700-7-011",
      "text": "What does denormalizing data for analytics mean?",
      "options": [
        "Splitting a wide table into smaller related tables",
        "Combining related tables into wider tables so queries need fewer joins",
        "Removing all keys from the tables",
        "Compressing the tables with V-Order"
      ],
      "correct": 1,
      "module": 7,
      "explanation": "Denormalization trades some redundancy for fewer joins and faster reads. Splitting tables is normalization."
    },
    {
      "id": "dp700-7-012",
      "text": "A snowflake dimension has Product, Subcategory and Category tables. How do you denormalize it for a star schema in a notebook?",
      "options": [
        "Union the three tables",
        "Keep three tables and add a bridge table",
        "Join the three tables into one wide Product dimension",
        "Pivot the Category table"
      ],
      "correct": 2,
      "module": 7,
      "explanation": "Joining the levels into one table puts the category and subcategory attributes on each product row, which is the star-schema form."
    },
    {
      "id": "dp700-7-013",
      "text": "A Spark DataFrame has an array column and you need one row per array element. Which function do you use?",
      "options": [
        "pivot",
        "explode",
        "array_distinct",
        "collect_list"
      ],
      "correct": 1,
      "module": 7,
      "explanation": "explode returns a row for each element of an array. collect_list does the opposite, and pivot rotates rows into columns."
    },
    {
      "id": "dp700-7-014",
      "text": "Which KQL operator expands a dynamic array into one row per element?",
      "options": [
        "make_list",
        "extend",
        "mv-expand",
        "parse"
      ],
      "correct": 2,
      "module": 7,
      "explanation": "mv-expand creates a row for each value in a dynamic array or property bag. make_list builds an array, extend adds columns, and parse extracts values from a string."
    },
    {
      "id": "dp700-7-015",
      "text": "You must persist the joined result of several normalized tables in a Warehouse so reports do not re-run the joins. Which T-SQL statement fits?",
      "options": [
        "CREATE TABLE AS SELECT (CTAS) over the joined tables",
        "SELECT INTO a session-scoped temp table",
        "CREATE INDEX on each table",
        "ALTER TABLE ... ADD CONSTRAINT"
      ],
      "correct": 0,
      "module": 7,
      "explanation": "CTAS writes the query result as a new table. A temporary table disappears at the end of the session, and indexes or constraints do not materialize a join."
    },
    {
      "id": "dp700-7-016",
      "text": "What is the main trade-off of denormalizing a fact table with dimension attributes?",
      "options": [
        "It stops the table from being stored as Delta",
        "Faster reads, but more storage and harder updates to repeated values",
        "Slower reads and less storage",
        "No effect on storage or updates"
      ],
      "correct": 1,
      "module": 7,
      "explanation": "Repeated attributes speed up queries but take more space and must be updated in many rows when they change."
    },
    {
      "id": "dp700-7-017",
      "text": "In a Dataflow Gen2, how do you bring columns from a related query into the main query?",
      "options": [
        "Pivot the key column",
        "Append the queries",
        "Merge the queries, then expand the merged column",
        "Group by the key"
      ],
      "correct": 2,
      "module": 7,
      "explanation": "A merge is a join; the result is a nested table column that you expand to add the related columns. Append stacks rows instead."
    },
    {
      "id": "dp700-7-018",
      "text": "Which PySpark expression returns the total amount per region?",
      "options": [
        "df.agg(F.sum(\"amount\")).groupBy(\"region\")",
        "df.select(F.sum(\"amount\")).distinct()",
        "df.orderBy(\"region\").sum()",
        "df.groupBy(\"region\").agg(F.sum(\"amount\"))"
      ],
      "correct": 3,
      "module": 7,
      "explanation": "groupBy returns grouped data and agg applies the aggregate to each group. Aggregating first leaves nothing to group."
    },
    {
      "id": "dp700-7-019",
      "text": "Which KQL query returns the average Temperature per device in 1-hour buckets?",
      "options": [
        "T | extend avg(Temperature) by DeviceId, 1h",
        "T | project avg(Temperature), bin(Timestamp, 1h)",
        "T | summarize avg(Temperature) by DeviceId, bin(Timestamp, 1h)",
        "T | where bin(Timestamp, 1h) | count"
      ],
      "correct": 2,
      "module": 7,
      "explanation": "summarize aggregates by the listed columns, and bin rounds the timestamp down to the hour."
    },
    {
      "id": "dp700-7-020",
      "text": "Which T-SQL clause filters groups after the aggregation?",
      "options": [
        "HAVING",
        "QUALIFY",
        "ORDER BY",
        "WHERE"
      ],
      "correct": 0,
      "module": 7,
      "explanation": "HAVING filters the aggregated groups. WHERE filters rows before grouping, and QUALIFY is not T-SQL."
    },
    {
      "id": "dp700-7-021",
      "text": "In Spark SQL, which clause returns subtotals by region and product, region only, and a grand total in one query?",
      "options": [
        "GROUP BY ROLLUP(region, product)",
        "PARTITION BY region, product",
        "ORDER BY ROLLUP(region, product)",
        "GROUP BY region, product"
      ],
      "correct": 0,
      "module": 7,
      "explanation": "ROLLUP adds subtotal and grand total rows to the grouped result. A plain GROUP BY returns only the detail level."
    },
    {
      "id": "dp700-7-022",
      "text": "You need every order row plus the running total of amount per customer. What do you use?",
      "options": [
        "SUM(Amount) GROUP BY CustomerId",
        "SELECT DISTINCT CustomerId, Amount",
        "SUM(Amount) OVER (PARTITION BY CustomerId ORDER BY OrderDate)",
        "COUNT(*) OVER ()"
      ],
      "correct": 2,
      "module": 7,
      "explanation": "A window function keeps the detail rows and adds the aggregate, while GROUP BY collapses the rows."
    },
    {
      "id": "dp700-7-023",
      "text": "Which KQL function returns an exact count of distinct values, unlike dcount()?",
      "options": [
        "arg_max()",
        "count_distinct()",
        "count()",
        "dcount()"
      ],
      "correct": 1,
      "module": 7,
      "explanation": "dcount() estimates the distinct count, which is fast on large data; count_distinct() is exact but costs more."
    },
    {
      "id": "dp700-7-024",
      "text": "A Spark DataFrame has several rows per CustomerId with different UpdatedAt values. How do you keep only the latest row per customer?",
      "options": [
        "Sort by UpdatedAt and call limit(1)",
        "Call dropna() on the DataFrame",
        "Use row_number() over a window partitioned by CustomerId and ordered by UpdatedAt descending, and keep row 1",
        "Call distinct() on the DataFrame"
      ],
      "correct": 2,
      "module": 7,
      "explanation": "distinct() only removes fully identical rows. Ranking within each customer keeps one row per key, while limit(1) would return a single row for the whole table."
    },
    {
      "id": "dp700-7-025",
      "text": "Which PySpark call replaces nulls in the qty column with 0?",
      "options": [
        "df.dropDuplicates([\"qty\"])",
        "df.fillna({\"qty\": 0})",
        "df.distinct()",
        "df.dropna()"
      ],
      "correct": 1,
      "module": 7,
      "explanation": "fillna substitutes values for nulls. dropna removes rows instead."
    },
    {
      "id": "dp700-7-026",
      "text": "A fact row arrives before its dimension row exists. What is the common way to handle this late-arriving dimension?",
      "options": [
        "Fail the whole load",
        "Drop the fact row",
        "Point the fact to the first dimension row",
        "Insert a placeholder (inferred) member in the dimension and update it when the real row arrives"
      ],
      "correct": 3,
      "module": 7,
      "explanation": "An inferred member keeps the fact row and its key valid, and a later dimension load fills in the attributes."
    },
    {
      "id": "dp700-7-027",
      "text": "A Delta MERGE should apply a source row only if it is newer than the target row, so late-arriving older updates are ignored. What do you add?",
      "options": [
        "WHEN NOT MATCHED BY SOURCE THEN DELETE",
        "WHEN MATCHED AND source.UpdatedAt > target.UpdatedAt THEN UPDATE",
        "An extra OPTIMIZE after the merge",
        "A VACUUM with zero retention"
      ],
      "correct": 1,
      "module": 7,
      "explanation": "A condition on the matched clause compares the timestamps so stale rows do not overwrite newer data."
    },
    {
      "id": "dp700-7-028",
      "text": "The team needs a no-code way to ingest Event Hubs events, filter them and write them to an Eventhouse. Which engine fits?",
      "options": [
        "Spark Structured Streaming",
        "A Copy activity on a schedule",
        "A KQL materialized view",
        "Eventstream"
      ],
      "correct": 3,
      "module": 7,
      "explanation": "Eventstream is the no-code option for ingesting and transforming events. Spark needs code, and a scheduled Copy activity is batch."
    },
    {
      "id": "dp700-7-029",
      "text": "You must score events with a Python ML model and join them to a large Delta reference table as they arrive. Which engine fits?",
      "options": [
        "A Dataflow Gen2",
        "Spark Structured Streaming",
        "Eventstream operators",
        "A Real-Time Dashboard tile"
      ],
      "correct": 1,
      "module": 7,
      "explanation": "Spark Structured Streaming runs custom Python code and can join a stream with a static Delta table. Eventstream operators are no-code and limited."
    },
    {
      "id": "dp700-7-030",
      "text": "Analysts need sub-second ad hoc queries over billions of time-stamped telemetry rows. Which engine fits?",
      "options": [
        "Spark notebook with temp views",
        "Dataflow Gen2",
        "Eventhouse with KQL",
        "Warehouse with T-SQL"
      ],
      "correct": 2,
      "module": 7,
      "explanation": "Eventhouse is built for fast analytics on time-series and log data with KQL."
    },
    {
      "id": "dp700-7-031",
      "text": "Which engine writes a stream into Delta tables and recovers from failures by using checkpoints?",
      "options": [
        "Dataflow Gen2",
        "Spark Structured Streaming",
        "Power Query Online",
        "Copy activity"
      ],
      "correct": 1,
      "module": 7,
      "explanation": "Structured Streaming with a checkpoint and a Delta sink recovers from where it stopped. The others are batch tools."
    },
    {
      "id": "dp700-7-032",
      "text": "Which code reads a Delta table as a streaming source?",
      "options": [
        "spark.readStream.format(\"delta\").load(path)",
        "spark.read.format(\"eventstream\").load(path)",
        "spark.stream.delta(path)",
        "spark.read.format(\"delta\").load(path)"
      ],
      "correct": 0,
      "module": 7,
      "explanation": "readStream creates a streaming DataFrame. spark.read is a batch read."
    },
    {
      "id": "dp700-7-033",
      "text": "What does trigger(processingTime=\"1 minute\") do?",
      "options": [
        "Stops the query after one minute",
        "Sets the watermark to one minute",
        "Starts a micro-batch every minute",
        "Keeps data for one minute"
      ],
      "correct": 2,
      "module": 7,
      "explanation": "The processing-time trigger sets the micro-batch interval."
    },
    {
      "id": "dp700-7-034",
      "text": "What does outputMode(\"complete\") write for an aggregation query?",
      "options": [
        "The entire result table on every trigger",
        "Only new rows",
        "Only changed rows",
        "Only finalized windows"
      ],
      "correct": 0,
      "module": 7,
      "explanation": "Complete mode rewrites the whole result each time and needs an aggregation. Append emits new rows and update emits changed rows."
    },
    {
      "id": "dp700-7-035",
      "text": "Where does Structured Streaming store the progress of a query so it can recover?",
      "options": [
        "The Spark driver's memory",
        "The Fabric Monitor hub",
        "The checkpoint location",
        "The Delta transaction log of the sink"
      ],
      "correct": 2,
      "module": 7,
      "explanation": "Offsets and state are written to the checkpoint location. Driver memory is lost on failure."
    },
    {
      "id": "dp700-7-036",
      "text": "How can Spark read events from an endpoint that exposes the Kafka protocol, such as an Eventstream custom endpoint or Event Hubs?",
      "options": [
        "spark.readStream.format(\"delta\")",
        "spark.read.csv with the endpoint URL",
        "spark.readStream.format(\"kafka\") with the endpoint's connection options",
        "spark.sql(\"SELECT * FROM eventstream\")"
      ],
      "correct": 2,
      "module": 7,
      "explanation": "Event Hubs and Eventstream custom endpoints expose a Kafka-compatible surface that the Spark Kafka source can consume."
    },
    {
      "id": "dp700-7-037",
      "text": "Why do you use foreachBatch on a write stream?",
      "options": [
        "To make the query run continuously with no trigger",
        "To disable the checkpoint",
        "To read from several sources at once",
        "To run batch logic such as a Delta MERGE on each micro-batch"
      ],
      "correct": 3,
      "module": 7,
      "explanation": "foreachBatch hands each micro-batch to your function as a DataFrame, so you can use batch APIs like MERGE."
    },
    {
      "id": "dp700-7-038",
      "text": "What defines a tumbling window?",
      "options": [
        "Windows of the events that share one timestamp",
        "Overlapping windows that start at every event",
        "Windows that close after a gap with no events",
        "Fixed-size, non-overlapping intervals where each event belongs to exactly one window"
      ],
      "correct": 3,
      "module": 7,
      "explanation": "Tumbling windows are contiguous and do not overlap, so each event falls in one window."
    },
    {
      "id": "dp700-7-039",
      "text": "A hopping window has a 10-minute size and a 5-minute hop. How many windows does a single event fall into?",
      "options": [
        "Two",
        "One",
        "Five",
        "Ten"
      ],
      "correct": 0,
      "module": 7,
      "explanation": "The hop is shorter than the size, so windows overlap and each event falls in size/hop = 2 windows."
    },
    {
      "id": "dp700-7-040",
      "text": "Which window groups events until there is a gap of inactivity?",
      "options": [
        "Session window",
        "Tumbling window",
        "Hopping window",
        "Snapshot window"
      ],
      "correct": 0,
      "module": 7,
      "explanation": "A session window extends while events keep arriving within the timeout and closes after the gap."
    },
    {
      "id": "dp700-7-041",
      "text": "Which window groups events that have the same timestamp?",
      "options": [
        "Tumbling window",
        "Hopping window",
        "Session window",
        "Snapshot window"
      ],
      "correct": 3,
      "module": 7,
      "explanation": "A snapshot window groups the events that share an identical timestamp."
    },
    {
      "id": "dp700-7-042",
      "text": "Which KQL query produces 5-minute tumbling counts?",
      "options": [
        "T | summarize count() by Timestamp 5m",
        "T | summarize count() by bin(Timestamp, 5m)",
        "T | take 5m",
        "T | top 5 by Timestamp"
      ],
      "correct": 1,
      "module": 7,
      "explanation": "bin() rounds each timestamp down to its 5-minute bucket, giving non-overlapping windows."
    },
    {
      "id": "dp700-7-043",
      "text": "Which Spark function creates 10-minute windows that advance every 5 minutes?",
      "options": [
        "date_trunc(\"minute\", eventTime)",
        "window(\"eventTime\", \"10 minutes\", \"5 minutes\")",
        "window(\"eventTime\", \"5 minutes\", \"10 minutes\")",
        "unix_timestamp(eventTime)"
      ],
      "correct": 1,
      "module": 7,
      "explanation": "window(timeColumn, windowDuration, slideDuration) creates overlapping windows when the slide is shorter than the duration."
    },
    {
      "id": "dp700-7-044",
      "text": "Which window types can the Eventstream Group by operator use?",
      "options": [
        "Tumbling, hopping, sliding, session and snapshot",
        "Only tumbling and hopping",
        "Only tumbling",
        "Only session and snapshot"
      ],
      "correct": 0,
      "module": 7,
      "explanation": "The Group by operator supports the five stream-analytics window types."
    },
    {
      "id": "dp700-7-045",
      "text": "A user deletes a OneLake shortcut in a lakehouse. What happens to the data in the target location?",
      "options": [
        "The target data is deleted",
        "Nothing; only the shortcut is removed",
        "The target data is soft-deleted for 7 days",
        "The target data is moved to the lakehouse"
      ],
      "correct": 1,
      "module": 7,
      "explanation": "Deleting a shortcut removes only the pointer. By contrast, deleting files or folders through the shortcut deletes them in the target if the user has write permission there."
    },
    {
      "id": "dp700-7-046",
      "text": "Where in a lakehouse can you create a shortcut that appears as a table?",
      "options": [
        "In any subfolder of the Tables folder",
        "Only in the Files folder",
        "At the top level of the Tables folder",
        "Only under a schema in a warehouse"
      ],
      "correct": 2,
      "module": 7,
      "explanation": "Under Tables, shortcuts are allowed only at the top level (or at the schema level in schema-enabled lakehouses). In Files you can create them anywhere."
    },
    {
      "id": "dp700-7-047",
      "text": "A shortcut points to an Amazon S3 bucket and users read it often over the internet. Which workspace setting reduces egress cost and latency?",
      "options": [
        "Enable the OneLake shortcut cache",
        "Create a Direct Lake model",
        "Enable V-Order",
        "Enable high concurrency mode"
      ],
      "correct": 0,
      "module": 7,
      "explanation": "The shortcut cache keeps recently read files from external sources such as S3 and GCS in OneLake for a retention period of 1 to 28 days."
    },
    {
      "id": "dp700-7-048",
      "text": "Which sources can a OneLake shortcut point to?",
      "options": [
        "Only other lakehouses in the same workspace",
        "ADLS Gen2, Amazon S3, Google Cloud Storage, Dataverse and other OneLake items",
        "Only ADLS Gen2",
        "Only Azure SQL Database tables"
      ],
      "correct": 1,
      "module": 7,
      "explanation": "Shortcuts reference internal OneLake locations and external stores such as ADLS Gen2, S3, S3-compatible storage, GCS and Dataverse."
    },
    {
      "id": "dp700-7-049",
      "text": "What do you get in Fabric when you mirror an Azure SQL Database?",
      "options": [
        "A copy of the source stored in a warehouse that you must refresh nightly",
        "A lakehouse shortcut to the source database",
        "A mirrored database item (Delta tables in OneLake) and a SQL analytics endpoint",
        "A semantic model in DirectQuery mode"
      ],
      "correct": 2,
      "module": 7,
      "explanation": "Mirroring continuously replicates the source into Delta tables in OneLake and creates a SQL analytics endpoint to query them."
    },
    {
      "id": "dp700-7-050",
      "text": "How is the storage for mirrored data billed?",
      "options": [
        "Billed per replicated row",
        "Free up to 1 TB per capacity unit purchased",
        "Free only on trial capacities",
        "Always billed per GB"
      ],
      "correct": 1,
      "module": 7,
      "explanation": "Mirrored storage is free up to a size equal to 1 TB per CU of the purchased capacity (for example 64 TB for F64), and replication compute is free."
    },
    {
      "id": "dp700-7-051",
      "text": "Which approach lets you mirror a source that Fabric does not support natively, by landing Delta-formatted change files yourself?",
      "options": [
        "A OneLake shortcut",
        "Metadata mirroring",
        "Open mirroring",
        "A Dataflow Gen2"
      ],
      "correct": 2,
      "module": 7,
      "explanation": "Open mirroring lets any application write change data in the documented format into the landing zone of a mirrored database."
    },
    {
      "id": "dp700-7-052",
      "text": "You have Delta tables in Azure Databricks Unity Catalog and want to query them in Fabric without copying data. Which feature fits?",
      "options": [
        "Metadata mirroring of the catalog (mirrored Azure Databricks catalog)",
        "Database mirroring with change data replication",
        "Open mirroring",
        "A Copy job with CDC"
      ],
      "correct": 0,
      "module": 7,
      "explanation": "Mirroring for Azure Databricks syncs catalog metadata and uses shortcuts to the Delta data, so nothing is replicated."
    },
    {
      "id": "dp700-7-053",
      "text": "Which Fabric item mirrors its data to OneLake automatically without any setup?",
      "options": [
        "Azure SQL Database",
        "Snowflake",
        "Fabric SQL database",
        "Azure Cosmos DB"
      ],
      "correct": 2,
      "module": 7,
      "explanation": "A SQL database in Fabric is automatically mirrored to OneLake. The other sources need you to configure mirroring."
    },
    {
      "id": "dp700-7-054",
      "text": "You must query mirrored data with T-SQL, join it to a warehouse in the same workspace, and read it with Spark. How do you do each?",
      "options": [
        "Spark cannot read mirrored data",
        "Mirrored data can only be read with Power BI",
        "Use the SQL analytics endpoint with three-part names for T-SQL and read the Delta tables from OneLake in Spark through a shortcut",
        "Copy it to a warehouse first"
      ],
      "correct": 2,
      "module": 7,
      "explanation": "Mirrored data is Delta in OneLake, so the SQL analytics endpoint serves T-SQL and cross-database queries, and Spark can read it by creating a lakehouse shortcut to the mirrored tables."
    },
    {
      "id": "dp700-7-055",
      "text": "Where do you check whether mirroring is running and how many rows were replicated?",
      "options": [
        "The Capacity Metrics app only",
        "The pipeline run history",
        "The Spark UI",
        "Monitor replication on the mirrored database"
      ],
      "correct": 3,
      "module": 7,
      "explanation": "The mirrored database has a Monitor replication view that shows the status and replicated rows per table. You can also stop and start replication there."
    },
    {
      "id": "dp700-7-056",
      "text": "Compared to a Copy job that copies a table nightly, what is a key advantage of mirroring?",
      "options": [
        "It supports unlimited custom transformations",
        "It needs no capacity",
        "Near real-time replication of changes without building or scheduling a pipeline",
        "It writes into a warehouse table you can update"
      ],
      "correct": 2,
      "module": 7,
      "explanation": "Mirroring continuously replicates changes into OneLake, with latency measured in seconds, and needs no orchestration."
    },
    {
      "id": "dp700-7-057",
      "text": "Which is a reason to ingest data into native Eventhouse tables instead of using a OneLake shortcut?",
      "options": [
        "You want no caching or indexing",
        "You need update policies and materialized views on the data",
        "You want to avoid any ingestion",
        "The data must stay only in the lakehouse"
      ],
      "correct": 1,
      "module": 7,
      "explanation": "Native tables are fully indexed and cached and support update policies and materialized views. Shortcuts behave as external tables and do not."
    },
    {
      "id": "dp700-7-058",
      "text": "Delta tables already live in a lakehouse and analysts occasionally query them with KQL. You want to avoid duplicating the data. What do you create?",
      "options": [
        "A second lakehouse",
        "A Copy job into a native table",
        "A mirrored database",
        "A OneLake shortcut in the KQL database"
      ],
      "correct": 3,
      "module": 7,
      "explanation": "A shortcut in the KQL database exposes the Delta table as an external table you query with external_table(), with no copy."
    },
    {
      "id": "dp700-7-059",
      "text": "How do you query a OneLake shortcut in a KQL database?",
      "options": [
        "external_table(\"TableName\")",
        "materialized_view(\"TableName\")",
        "database(\"TableName\")",
        "table(\"TableName\")"
      ],
      "correct": 0,
      "module": 7,
      "explanation": "Shortcuts surface as external tables, which you reference with external_table()."
    },
    {
      "id": "dp700-7-060",
      "text": "What does OneLake availability do for a native KQL table?",
      "options": [
        "Creates a materialized view of the table",
        "Replicates the table to a warehouse every hour",
        "Deletes the table from the Eventhouse after 30 days",
        "Exposes the table's data in OneLake as Delta so other engines can read it without copying"
      ],
      "correct": 3,
      "module": 7,
      "explanation": "OneLake availability publishes the table as Delta Parquet in OneLake, so Spark, SQL and Power BI can read it while it stays a native table."
    },
    {
      "id": "dp700-7-061",
      "text": "Which statement about native Eventhouse tables compared with shortcuts is true?",
      "options": [
        "Shortcuts support update policies",
        "Native tables hold no data of their own",
        "Native tables are ingested, indexed and cached, so they give the best query speed",
        "Shortcuts are indexed and cached by default"
      ],
      "correct": 2,
      "module": 7,
      "explanation": "Ingested data is indexed and cached for fast queries. Shortcut data stays in OneLake and is read from there unless you enable query acceleration."
    },
    {
      "id": "dp700-7-062",
      "text": "A team shares data between several Eventhouses and wants queries in one without copying data. Which feature fits?",
      "options": [
        "A KQL database shortcut to the other database",
        "A Dataflow Gen2",
        "Copy the tables nightly with a Copy job",
        "A materialized view over the other database"
      ],
      "correct": 0,
      "module": 7,
      "explanation": "Database shortcuts in a KQL database follow the source database without ingesting its data again."
    },
    {
      "id": "dp700-7-063",
      "text": "What does query acceleration for a OneLake shortcut in an Eventhouse do?",
      "options": [
        "Compresses the Delta files in the lakehouse",
        "Copies the data into a native table permanently",
        "Indexes and caches the shortcut's data so queries run close to the speed of ingested data",
        "Enables update policies on the shortcut"
      ],
      "correct": 2,
      "module": 7,
      "explanation": "Query acceleration caches and indexes the external Delta data in the Eventhouse for the period you set, so queries are much faster than on a standard shortcut."
    },
    {
      "id": "dp700-7-064",
      "text": "Which feature is NOT supported on an accelerated OneLake shortcut?",
      "options": [
        "Materialized views",
        "Joining it with a native table",
        "Querying with KQL",
        "Setting a hot-cache period"
      ],
      "correct": 0,
      "module": 7,
      "explanation": "Accelerated shortcuts behave as external tables, so materialized views and update policies are not supported."
    },
    {
      "id": "dp700-7-065",
      "text": "You need fast KQL queries over a Delta table that is also written by Spark, and you must not duplicate the data. Which option fits?",
      "options": [
        "Create a standard shortcut with no policy",
        "Ingest it into a native table with a Copy job",
        "Create a shortcut and enable query acceleration on it",
        "Mirror the lakehouse"
      ],
      "correct": 2,
      "module": 7,
      "explanation": "Acceleration keeps the data in OneLake as the single copy and gives indexed, cached performance for the period you choose."
    },
    {
      "id": "dp700-7-066",
      "text": "How do you control how much of an accelerated shortcut's data is cached?",
      "options": [
        "Set the retention policy of the lakehouse",
        "Set the partitioning policy of the table",
        "Set the hot period in the query acceleration policy",
        "Set the batching policy of the table"
      ],
      "correct": 2,
      "module": 7,
      "explanation": "The query acceleration policy defines how many days of data are cached (hot)."
    },
    {
      "id": "dp700-7-067",
      "text": "Which statement about standard (non-accelerated) OneLake shortcuts in an Eventhouse is true?",
      "options": [
        "Queries read the data from OneLake with no index or cache, so they are slower than on native tables",
        "They are as fast as native tables",
        "They cost an OneLake Premium cache charge",
        "They support materialized views"
      ],
      "correct": 0,
      "module": 7,
      "explanation": "A standard shortcut has no extra indexing or caching, so it costs nothing extra but is slower. Acceleration adds the cache and its cost."
    },
    {
      "id": "dp700-7-068",
      "text": "How is query acceleration billed?",
      "options": [
        "Per query scanned",
        "Per shortcut created",
        "It is free",
        "Through the OneLake Premium cache storage meter, the same as native table caching, plus compute for indexing"
      ],
      "correct": 3,
      "module": 7,
      "explanation": "Accelerated data is stored in the Eventhouse cache and billed like the hot cache of native tables, and indexing consumes capacity units."
    },
    {
      "id": "dp700-7-069",
      "text": "Which is a good reason to choose a standard shortcut over query acceleration?",
      "options": [
        "You need the fastest possible dashboards",
        "You need update policies",
        "The data is queried rarely and you want to avoid cache cost",
        "The data is queried constantly with strict latency targets"
      ],
      "correct": 2,
      "module": 7,
      "explanation": "Rarely queried data does not justify paying for a cache. Frequent, latency-sensitive queries justify acceleration."
    },
    {
      "id": "dp700-7-070",
      "text": "Query acceleration over a Delta table works with which data source type in an Eventhouse?",
      "options": [
        "Only CSV files in the lakehouse Files folder",
        "OneLake shortcuts and external delta tables over Azure Storage, S3 or GCS",
        "Only mirrored databases",
        "Only native tables"
      ],
      "correct": 1,
      "module": 7,
      "explanation": "Acceleration applies to external Delta tables, including OneLake shortcuts and external tables on ADLS, S3 and GCS."
    },
    {
      "id": "dp700-7-071",
      "text": "Who can create a domain in Microsoft Fabric?",
      "options": [
        "A domain contributor",
        "A capacity admin",
        "Any workspace admin",
        "A Fabric administrator"
      ],
      "correct": 3,
      "module": 7,
      "explanation": "Only Fabric admins create, edit and delete domains and assign domain admins. Domain admins manage an existing domain and contributors only assign their own workspaces."
    },
    {
      "id": "dp700-7-072",
      "text": "Which role can assign a workspace to a domain from the workspace's own settings?",
      "options": [
        "Any workspace viewer",
        "A domain contributor who is also an admin of that workspace",
        "A capacity contributor",
        "Any member of the domain"
      ],
      "correct": 1,
      "module": 7,
      "explanation": "Domain contributors, who must be workspace admins, can assign their workspace to the domain in its workspace settings."
    },
    {
      "id": "dp700-7-073",
      "text": "Which settings can be delegated from the tenant to a domain admin?",
      "options": [
        "The domain-level default sensitivity label and the certification settings",
        "Spark pool node sizes",
        "Capacity size and region",
        "Git provider configuration"
      ],
      "correct": 0,
      "module": 7,
      "explanation": "A domain admin can set a default sensitivity label for items in the domain and manage who can certify items, when the tenant admin delegates these settings."
    },
    {
      "id": "dp700-7-074",
      "text": "Does assigning a workspace to a domain change who can see the items in it?",
      "options": [
        "No; domains organize workspaces but do not change item access",
        "Yes, only domain members can open items",
        "Yes, all items become read-only",
        "Yes, the workspace moves to the domain's capacity"
      ],
      "correct": 0,
      "module": 7,
      "explanation": "Domain membership is for organization and governance. Access still comes from workspace roles and item permissions."
    },
    {
      "id": "dp700-7-075",
      "text": "You assign workspaces to a domain by selecting a capacity. Which workspaces does this affect?",
      "options": [
        "Only workspaces created in the future",
        "Only workspaces you own",
        "Every workspace in the tenant",
        "Existing workspaces on that capacity, not My workspace"
      ],
      "correct": 3,
      "module": 7,
      "explanation": "Assigning by capacity or by workspace admin applies to existing workspaces and excludes personal workspaces."
    },
    {
      "id": "dp700-7-076",
      "text": "Where do you configure the OneLake shortcut cache for a workspace?",
      "options": [
        "The Spark compute settings",
        "The lakehouse Home ribbon",
        "The Fabric admin portal, Capacity settings",
        "Workspace settings, OneLake tab"
      ],
      "correct": 3,
      "module": 7,
      "explanation": "The OneLake tab in workspace settings holds the shortcut cache toggle, retention period and the Reset cache button."
    },
    {
      "id": "dp700-7-077",
      "text": "What is the retention range you can set for the OneLake shortcut cache?",
      "options": [
        "Always 24 hours",
        "1 to 28 days",
        "1 to 365 days",
        "1 to 7 days"
      ],
      "correct": 1,
      "module": 7,
      "explanation": "Cached files are kept for 1 to 28 days, and the retention timer resets each time a file is accessed."
    },
    {
      "id": "dp700-7-078",
      "text": "What does OneLake diagnostics capture when you turn it on for a workspace?",
      "options": [
        "Pipeline run history",
        "Spark job logs",
        "Semantic model refreshes",
        "Data access events from the OneLake API, written to a lakehouse you choose"
      ],
      "correct": 3,
      "module": 7,
      "explanation": "OneLake diagnostics records who accessed what data in OneLake into a lakehouse for analysis. Changes to security roles and shortcuts go to the Fabric audit log."
    },
    {
      "id": "dp700-7-079",
      "text": "Which tenant setting must be on for external apps to read OneLake data through the ADLS APIs, such as the OneLake file explorer?",
      "options": [
        "Users can access data stored in OneLake with apps external to Fabric",
        "Users can create Fabric items",
        "Enable Delta sharing",
        "Allow service principals to use Fabric APIs"
      ],
      "correct": 0,
      "module": 7,
      "explanation": "This setting controls whether apps outside Fabric can read OneLake through its ADLS-compatible endpoint."
    },
    {
      "id": "dp700-7-080",
      "text": "Which shortcut sources does the OneLake shortcut cache apply to?",
      "options": [
        "Only lakehouse-to-lakehouse shortcuts",
        "Google Cloud Storage, Amazon S3, S3-compatible storage and shortcuts through an on-premises gateway",
        "Dataverse shortcuts",
        "ADLS Gen2 and OneLake shortcuts"
      ],
      "correct": 1,
      "module": 7,
      "explanation": "Caching targets external sources that cost egress or add latency. It does not apply to internal OneLake or ADLS shortcuts."
    },
    {
      "id": "dp700-7-081",
      "text": "What is the OneLake endpoint format used by ADLS-compatible tools?",
      "options": [
        "https://<workspace>.blob.core.windows.net/<item>",
        "https://fabric.microsoft.com/onelake/<workspace>",
        "https://<tenant>.sharepoint.com/onelake",
        "https://onelake.dfs.fabric.microsoft.com/<workspace>/<item>/..."
      ],
      "correct": 3,
      "module": 7,
      "explanation": "OneLake exposes a single ADLS Gen2 style endpoint, with the workspace as the container and the item as the first folder."
    },
    {
      "id": "dp700-7-082",
      "text": "What is an Apache Airflow job in Microsoft Fabric?",
      "options": [
        "An Eventstream operator",
        "A Spark job definition that runs on a schedule",
        "A no-code pipeline template",
        "A managed Airflow environment in Data Factory where you author orchestration as Python DAGs"
      ],
      "correct": 3,
      "module": 7,
      "explanation": "Apache Airflow jobs let you run Python DAGs in a managed environment inside Fabric, without maintaining Airflow infrastructure."
    },
    {
      "id": "dp700-7-083",
      "text": "A team prefers writing orchestration as code, with sensors and operators in Python. Which Fabric option fits best?",
      "options": [
        "An Apache Airflow job",
        "A pipeline with Copy activities",
        "A KQL queryset",
        "A Dataflow Gen2"
      ],
      "correct": 0,
      "module": 7,
      "explanation": "Airflow is the code-first orchestrator. Pipelines are the no-code option."
    },
    {
      "id": "dp700-7-084",
      "text": "Which feature does a Fabric Apache Airflow job support for storing DAGs?",
      "options": [
        "Git sync",
        "Eventstream sources",
        "Deployment rules",
        "OneLake shortcuts to DAG files"
      ],
      "correct": 0,
      "module": 7,
      "explanation": "Airflow jobs can sync DAG files from a Git repository. They also support Azure Key Vault as a secrets backend."
    },
    {
      "id": "dp700-7-085",
      "text": "You need to add a Python package that your DAGs import. Where do you list it?",
      "options": [
        "In the workspace Spark properties",
        "In a pipeline parameter",
        "In the Airflow job's requirements (requirements.txt) configuration",
        "In the lakehouse Tables folder"
      ],
      "correct": 2,
      "module": 7,
      "explanation": "Extra packages are declared as requirements in the Airflow environment configuration."
    },
    {
      "id": "dp700-7-086",
      "text": "Can you change the Airflow version of an existing Fabric Apache Airflow job?",
      "options": [
        "Yes, but only from the admin portal",
        "Yes, with a deployment pipeline",
        "Yes, from the job's settings page",
        "No; create a new job on the version you need"
      ],
      "correct": 3,
      "module": 7,
      "explanation": "The version of an existing job cannot be changed. You create a new job on a supported version."
    },
    {
      "id": "dp700-7-087",
      "text": "Which Airflow capability is NOT supported in Fabric Apache Airflow jobs?",
      "options": [
        "Autoscale",
        "Git sync",
        "Private or virtual network integration",
        "Deferrable operators"
      ],
      "correct": 2,
      "module": 7,
      "explanation": "Fabric Airflow jobs do not currently support private or virtual networks. Git sync, autoscale, high availability and deferrable operators are supported."
    },
    {
      "id": "dp700-7-088",
      "text": "When is an Apache Airflow job a better choice than a pipeline?",
      "options": [
        "When data must be streamed in real time",
        "When you only copy one table",
        "When you want a visual drag-and-drop design",
        "When you need complex dependencies and custom logic defined in Python"
      ],
      "correct": 3,
      "module": 7,
      "explanation": "Airflow suits code-defined, complex workflows. Pipelines suit visual, low-code orchestration and copying."
    },
    {
      "id": "dp700-7-089",
      "text": "Which Fabric service do Apache Airflow jobs belong to?",
      "options": [
        "Real-Time Intelligence",
        "Data Activator",
        "Data Factory",
        "Data Science"
      ],
      "correct": 2,
      "module": 7,
      "explanation": "Apache Airflow jobs are part of Data Factory in Fabric, and succeed the workflow orchestration manager in Azure Data Factory."
    },
    {
      "id": "dp700-7-090",
      "text": "What does a SQL database project contain?",
      "options": [
        "A copy of the table data",
        "A Spark environment",
        "The schema of a database as T-SQL object scripts, built into a .dacpac",
        "A Power BI report"
      ],
      "correct": 2,
      "module": 7,
      "explanation": "A SQL project stores the object definitions as source files. Building it produces a .dacpac that describes the schema."
    },
    {
      "id": "dp700-7-091",
      "text": "Which file does building a SQL database project produce?",
      "options": [
        ".pbip",
        ".dacpac",
        ".ipynb",
        ".parquet"
      ],
      "correct": 1,
      "module": 7,
      "explanation": "A .dacpac is the data-tier application package that holds the schema, and it can be deployed with SqlPackage."
    },
    {
      "id": "dp700-7-092",
      "text": "Which tool do you use to deploy a .dacpac to a Fabric SQL database or warehouse from a CI/CD pipeline?",
      "options": [
        "The OPTIMIZE command",
        "The Fabric Monitor hub",
        "A Copy activity",
        "SqlPackage publish"
      ],
      "correct": 3,
      "module": 7,
      "explanation": "SqlPackage publishes a .dacpac to a target database and updates an existing database to match the package."
    },
    {
      "id": "dp700-7-093",
      "text": "Which editor offers the SQL Database Projects extension to create and build SQL projects?",
      "options": [
        "The Fabric lakehouse explorer",
        "Power BI Desktop",
        "Excel",
        "Visual Studio Code"
      ],
      "correct": 3,
      "module": 7,
      "explanation": "The SQL Database Projects extension for VS Code (and Azure Data Studio) creates, builds and publishes SQL projects."
    },
    {
      "id": "dp700-7-094",
      "text": "A team wants schema changes to a warehouse reviewed in pull requests before they are deployed. Which approach fits?",
      "options": [
        "Export the data to CSV files",
        "Share the warehouse with every developer",
        "Keep the warehouse schema in a database project in Git and deploy it through CI/CD",
        "Edit the tables directly in production"
      ],
      "correct": 2,
      "module": 7,
      "explanation": "A database project in source control gives reviewable, repeatable schema changes. Direct edits bypass review."
    },
    {
      "id": "dp700-7-095",
      "text": "What must exist before you publish a .dacpac to a Fabric SQL database with SqlPackage?",
      "options": [
        "A deployment pipeline",
        "A semantic model",
        "The target database",
        "A Spark pool"
      ],
      "correct": 2,
      "module": 7,
      "explanation": "SqlPackage updates an existing target; the database must be created in Fabric first."
    },
    {
      "id": "dp700-7-096",
      "text": "A .dacpac extracted from another SQL platform fails to publish to Fabric because of platform differences. Which SqlPackage property lets the publish continue?",
      "options": [
        "/p:BlockOnPossibleDataLoss=false",
        "/Action:Extract",
        "/p:AllowIncompatiblePlatform=true",
        "/p:DropObjectsNotInSource=false"
      ],
      "correct": 2,
      "module": 7,
      "explanation": "AllowIncompatiblePlatform lets SqlPackage deploy a package built for a different platform to Fabric."
    },
    {
      "id": "dp700-7-097",
      "text": "Why use a database project instead of a script that runs CREATE and ALTER statements?",
      "options": [
        "It removes the need for a database",
        "The project declares the desired end state and the deployment works out the changes",
        "It runs faster at query time",
        "It copies production data into Git"
      ],
      "correct": 1,
      "module": 7,
      "explanation": "A declarative project describes the target schema, and SqlPackage computes the incremental change script."
    },
    {
      "id": "dp700-7-098",
      "text": "A user needs to read one lakehouse but must not see other items in the workspace. What do you do?",
      "options": [
        "Add the user as a workspace Viewer",
        "Give the user the Fabric admin role",
        "Add the user as a workspace Member",
        "Share the lakehouse with the user and grant the item permissions they need"
      ],
      "correct": 3,
      "module": 7,
      "explanation": "Item sharing grants access to a single item without any workspace role."
    },
    {
      "id": "dp700-7-099",
      "text": "Which item permission lets a user read OneLake data of a lakehouse through the DefaultReader role?",
      "options": [
        "Execute",
        "ReadAll",
        "Reshare",
        "Read"
      ],
      "correct": 1,
      "module": 7,
      "explanation": "ReadAll gives access to the OneLake data through the DefaultReader role. Read is only metadata access."
    },
    {
      "id": "dp700-7-100",
      "text": "Which item permission lets a user query data through the SQL analytics endpoint when it is in delegated identity mode?",
      "options": [
        "Reshare",
        "ReadData",
        "Write",
        "ReadAll"
      ],
      "correct": 1,
      "module": 7,
      "explanation": "ReadData grants SQL data access in delegated mode, where the SQL endpoint uses the item owner's identity."
    },
    {
      "id": "dp700-7-101",
      "text": "A user has the Viewer workspace role and is also granted Write on one item. What are the user's effective permissions on that item?",
      "options": [
        "Both sets combined, so Write applies to that item",
        "Only Viewer, because workspace roles win",
        "No access, because the permissions conflict",
        "Only Write on all items"
      ],
      "correct": 0,
      "module": 7,
      "explanation": "Permissions are additive. Item permissions add access and never restrict a workspace role."
    },
    {
      "id": "dp700-7-102",
      "text": "A user can see a lakehouse in the workspace but cannot query it. Which permission would they only have?",
      "options": [
        "ReadAll",
        "ReadData",
        "Read",
        "Write"
      ],
      "correct": 2,
      "module": 7,
      "explanation": "Read gives metadata access to the item only, so the user sees it but cannot read its data."
    },
    {
      "id": "dp700-7-103",
      "text": "Which SQL analytics endpoint identity mode uses the identity of the user who runs the query?",
      "options": [
        "Anonymous mode",
        "User identity mode",
        "Delegated mode",
        "Guest mode"
      ],
      "correct": 1,
      "module": 7,
      "explanation": "In user identity mode the caller's own permissions apply. In delegated mode the item owner's identity is used."
    },
    {
      "id": "dp700-7-104",
      "text": "Which Dynamic Data Masking function shows only the first letter of an email address followed by a fixed domain mask?",
      "options": [
        "email()",
        "random()",
        "default()",
        "partial()"
      ],
      "correct": 0,
      "module": 7,
      "explanation": "email() masks an address as aXXX@XXXX.com. default() masks by data type, random() replaces numbers, and partial() exposes a custom prefix and suffix."
    },
    {
      "id": "dp700-7-105",
      "text": "Which masking function replaces a numeric column with a random value from a range you set?",
      "options": [
        "email()",
        "default()",
        "random()",
        "partial()"
      ],
      "correct": 2,
      "module": 7,
      "explanation": "random(start, end) applies to numeric types only."
    },
    {
      "id": "dp700-7-106",
      "text": "Which permission lets a user see unmasked data in a masked column?",
      "options": [
        "UNMASK",
        "ALTER ANY MASK",
        "REFERENCES",
        "SELECT"
      ],
      "correct": 0,
      "module": 7,
      "explanation": "UNMASK on the column or table (or CONTROL on the database) shows the real values. ALTER ANY MASK lets someone manage masks."
    },
    {
      "id": "dp700-7-107",
      "text": "Which T-SQL adds an email mask to an existing column?",
      "options": [
        "ALTER TABLE Customers ADD MASK Email",
        "GRANT MASK ON Customers(Email)",
        "ALTER TABLE Customers ALTER COLUMN Email ADD MASKED WITH (FUNCTION = 'email()')",
        "CREATE MASK ON Customers(Email)"
      ],
      "correct": 2,
      "module": 7,
      "explanation": "Masks are defined per column with ADD MASKED WITH (FUNCTION = ...)."
    },
    {
      "id": "dp700-7-108",
      "text": "Why is dynamic data masking not a replacement for row-level or column-level security?",
      "options": [
        "It deletes the values after the first query",
        "It encrypts the data at rest",
        "Users can infer masked values with filter queries, because the data itself is not changed",
        "It blocks all SELECT statements"
      ],
      "correct": 2,
      "module": 7,
      "explanation": "Masking only changes the query output. Range filters and similar queries can still reveal the underlying value."
    },
    {
      "id": "dp700-7-109",
      "text": "Which users see unmasked data in a warehouse by default?",
      "options": [
        "Every user with Read permission on the item",
        "Workspace Admin, Member and Contributor users",
        "Only the item owner",
        "Workspace Viewer users"
      ],
      "correct": 1,
      "module": 7,
      "explanation": "Admin, Member and Contributor roles have CONTROL on the warehouse, so they see unmasked data. Viewers see masked data."
    },
    {
      "id": "dp700-7-110",
      "text": "What provides the sensitivity labels that you apply to Fabric items?",
      "options": [
        "Microsoft Entra Conditional Access",
        "Microsoft Defender for Cloud",
        "Azure Policy",
        "Microsoft Purview Information Protection"
      ],
      "correct": 3,
      "module": 7,
      "explanation": "Fabric uses the sensitivity labels defined in Microsoft Purview Information Protection."
    },
    {
      "id": "dp700-7-111",
      "text": "A report is built on a labeled semantic model. What can happen to the report's label by default?",
      "options": [
        "It stays unlabeled and blocks viewing",
        "It is always removed",
        "It always becomes Public",
        "It can inherit the label from the semantic model it reads from"
      ],
      "correct": 3,
      "module": 7,
      "explanation": "Downstream items can inherit the sensitivity label from their data source when label inheritance is enabled."
    },
    {
      "id": "dp700-7-112",
      "text": "What happens when you export data from a labeled item to Excel, PowerPoint or PDF?",
      "options": [
        "The label becomes Public",
        "The export is always blocked",
        "The sensitivity label and its protection settings follow the exported file",
        "The label is dropped"
      ],
      "correct": 2,
      "module": 7,
      "explanation": "Fabric applies the label to supported export formats, along with any encryption the label enforces."
    },
    {
      "id": "dp700-7-113",
      "text": "Who can apply a sensitivity label to a Fabric item?",
      "options": [
        "Users the tenant admin has allowed to apply labels, and who have edit permission on the item",
        "Only the Fabric admin",
        "Only the capacity admin",
        "Any viewer of the item"
      ],
      "correct": 0,
      "module": 7,
      "explanation": "A tenant setting controls who may apply labels, and the user also needs permission to change the item."
    },
    {
      "id": "dp700-7-114",
      "text": "Where do you see and change the sensitivity label of an item?",
      "options": [
        "The item's settings or the sensitivity button in the item header",
        "The Spark properties of the workspace",
        "The pipeline run details",
        "The OneLake diagnostics lakehouse"
      ],
      "correct": 0,
      "module": 7,
      "explanation": "Labels are set on the item itself, in its settings or from the header."
    },
    {
      "id": "dp700-7-115",
      "text": "What does a domain-level default sensitivity label do?",
      "options": [
        "Encrypts the OneLake storage",
        "Replaces all item labels with Confidential",
        "Blocks sharing outside the domain",
        "Applies a default label to items created in the domain's workspaces"
      ],
      "correct": 3,
      "module": 7,
      "explanation": "The delegated default label setting lets a domain apply a default label to new items in its workspaces."
    },
    {
      "id": "dp700-7-116",
      "text": "Sensitivity labels and Git integration: what is true when you export an item to a Git repository?",
      "options": [
        "Git blocks any labeled item",
        "Sensitivity labels are not included in the exported item definition",
        "The label is encrypted into the repo",
        "The label is stored as a commit tag"
      ],
      "correct": 1,
      "module": 7,
      "explanation": "Sensitivity labels are not supported in the Git export of an item."
    },
    {
      "id": "dp700-7-117",
      "text": "Which Fabric feature is for protecting data through labels with access restrictions and encryption?",
      "options": [
        "Deployment rules",
        "Domains",
        "Endorsement",
        "Sensitivity labels with protection settings"
      ],
      "correct": 3,
      "module": 7,
      "explanation": "Labels with protection settings restrict access and encrypt content. Endorsement signals trust, not protection."
    },
    {
      "id": "dp700-7-118",
      "text": "Who can promote an item in Fabric?",
      "options": [
        "Only a designated certifier",
        "Any user with write permission on the item",
        "Only the Fabric admin",
        "Only the domain admin"
      ],
      "correct": 1,
      "module": 7,
      "explanation": "Promotion needs write permission. Certification is limited to authorized reviewers."
    },
    {
      "id": "dp700-7-119",
      "text": "Who can certify an item?",
      "options": [
        "Users or groups that the Fabric admin or domain admin has authorized as certifiers",
        "Every workspace admin",
        "Any capacity admin",
        "Any viewer"
      ],
      "correct": 0,
      "module": 7,
      "explanation": "Certification is restricted to specified certifiers set in the tenant or delegated domain settings."
    },
    {
      "id": "dp700-7-120",
      "text": "Which endorsement level is intended for data items that serve as the authoritative source for a business concept?",
      "options": [
        "Verified",
        "Promoted",
        "Shared",
        "Master data"
      ],
      "correct": 3,
      "module": 7,
      "explanation": "Master data is the endorsement for data items such as lakehouses that are the single source of truth."
    },
    {
      "id": "dp700-7-121",
      "text": "What is the difference between Promoted and Certified?",
      "options": [
        "Promoted items are read-only",
        "Certified requires a formal review by an authorized certifier, while promoted does not",
        "Certified items are hidden from search",
        "There is no difference"
      ],
      "correct": 1,
      "module": 7,
      "explanation": "Both signal quality, but certification is controlled by authorized reviewers, so it carries more trust."
    },
    {
      "id": "dp700-7-122",
      "text": "Which benefit does endorsement give users?",
      "options": [
        "Endorsed items are labeled and rank higher in search, so they are easier to trust and find",
        "Endorsed items skip capacity limits",
        "Endorsed items cannot be edited",
        "Endorsed items are encrypted"
      ],
      "correct": 0,
      "module": 7,
      "explanation": "Endorsement badges help users find trusted content, for example in the OneLake catalog."
    },
    {
      "id": "dp700-7-123",
      "text": "You want only data stewards to be able to certify items. Where do you configure this?",
      "options": [
        "The Certification tenant setting in the admin portal, or the delegated domain setting",
        "The workspace Spark settings",
        "A deployment pipeline rule",
        "A Git branch policy"
      ],
      "correct": 0,
      "module": 7,
      "explanation": "The Fabric admin chooses the certifier group in the tenant setting, and can delegate it to domains."
    },
    {
      "id": "dp700-7-124",
      "text": "Is endorsement preserved when a semantic model is deployed to the next deployment pipeline stage?",
      "options": [
        "Only for lakehouses",
        "No; the endorsement is not copied to the target stage",
        "Only for Master data",
        "Yes, always"
      ],
      "correct": 1,
      "module": 7,
      "explanation": "Deployment pipelines do not copy endorsement, so you endorse the item in the target stage again."
    },
    {
      "id": "dp700-7-125",
      "text": "Where do you search the audit log for Fabric activities such as item sharing and exports?",
      "options": [
        "The Monitor hub",
        "The Capacity Metrics app",
        "The Spark UI",
        "The Microsoft Purview portal audit search"
      ],
      "correct": 3,
      "module": 7,
      "explanation": "Fabric activities are recorded in the unified audit log, which you search in Microsoft Purview."
    },
    {
      "id": "dp700-7-126",
      "text": "Which Fabric tool returns a tenant's activity events through an API for custom reporting?",
      "options": [
        "The pipeline run API",
        "The OneLake file API",
        "The Fabric admin activity events API",
        "The semantic model refresh API"
      ],
      "correct": 2,
      "module": 7,
      "explanation": "Admins can retrieve activity events with the activity events REST API or PowerShell for custom analysis."
    },
    {
      "id": "dp700-7-127",
      "text": "Which role is needed to view the Fabric audit logs?",
      "options": [
        "An audit-capable role such as Fabric administrator or audit log reader",
        "Workspace Viewer",
        "Domain contributor",
        "Capacity contributor"
      ],
      "correct": 0,
      "module": 7,
      "explanation": "Auditing is for administrators and users with audit-log permissions."
    },
    {
      "id": "dp700-7-128",
      "text": "What do OneLake diagnostics add to the audit story?",
      "options": [
        "Automatic masking of sensitive columns",
        "A record of Power BI refreshes",
        "A record of data access events through OneLake, stored in a lakehouse",
        "Backups of deleted items"
      ],
      "correct": 2,
      "module": 7,
      "explanation": "OneLake diagnostics captures data-plane access events, while control-plane changes are in the Fabric audit log."
    },
    {
      "id": "dp700-7-129",
      "text": "You must show who changed a OneLake security role last month. Where do you look?",
      "options": [
        "The pipeline Monitor view",
        "The Spark history server",
        "The Fabric audit log, because role changes are control-plane events",
        "Query insights"
      ],
      "correct": 2,
      "module": 7,
      "explanation": "Changes to security roles, shortcuts and sharing are audited in the Fabric audit log."
    },
    {
      "id": "dp700-7-130",
      "text": "What does a OneLake security role define?",
      "options": [
        "Only the capacity SKU",
        "Permissions, the data in scope (tables or folders, with optional row and column rules) and the members",
        "A schedule for refresh",
        "A Git branch"
      ],
      "correct": 1,
      "module": 7,
      "explanation": "A role has a permission (Read or ReadWrite), the data included, and members such as users or groups."
    },
    {
      "id": "dp700-7-131",
      "text": "Which OneLake security role exists in every lakehouse by default and grants read access to users with ReadAll?",
      "options": [
        "DataAdmin",
        "DefaultWriter",
        "WorkspaceReader",
        "DefaultReader"
      ],
      "correct": 3,
      "module": 7,
      "explanation": "DefaultReader gives users with the ReadAll item permission access to all the data, and can be edited or deleted."
    },
    {
      "id": "dp700-7-132",
      "text": "Which workspace roles can create and edit OneLake security roles?",
      "options": [
        "Every role",
        "Viewer only",
        "Admin and Member",
        "Contributor and Viewer"
      ],
      "correct": 2,
      "module": 7,
      "explanation": "Admin and Member can manage OneLake security roles, while Contributor and Viewer cannot."
    },
    {
      "id": "dp700-7-133",
      "text": "A Viewer must read only the Sales table in a lakehouse and nothing else. How do you grant this with OneLake security?",
      "options": [
        "Share the whole lakehouse with Write",
        "Remove or narrow DefaultReader and create a role that includes only the Sales table with the user as member",
        "Add the user as a workspace Admin",
        "Give them the Contributor role"
      ],
      "correct": 1,
      "module": 7,
      "explanation": "OneLake security roles grant least-privilege data access to Viewers at table or folder level."
    },
    {
      "id": "dp700-7-134",
      "text": "Which of these can a OneLake security role apply to restrict data?",
      "options": [
        "Row-level and column-level rules on tables",
        "Only pipeline activities",
        "Only capacity limits",
        "Only whole workspaces"
      ],
      "correct": 0,
      "module": 7,
      "explanation": "A role can include row filters and column lists on its tables so members see only part of the data."
    },
    {
      "id": "dp700-7-135",
      "text": "How is OneLake security different from workspace roles?",
      "options": [
        "OneLake security controls who can run pipelines",
        "OneLake security governs access to the data itself, while workspace roles control what users can do with items",
        "They are identical",
        "Workspace roles control rows and columns"
      ],
      "correct": 1,
      "module": 7,
      "explanation": "Workspace roles and item permissions are the control plane. OneLake security roles are the data plane."
    },
    {
      "id": "dp700-7-136",
      "text": "A user holds the Viewer workspace role and is a member of a OneLake role that grants Read on Tables/Orders. What can they read?",
      "options": [
        "Only the Orders table through OneLake",
        "All tables except Orders",
        "Everything in the lakehouse",
        "Nothing, Viewers cannot be role members"
      ],
      "correct": 0,
      "module": 7,
      "explanation": "Viewers have no data access by default; the role gives them the Orders table."
    },
    {
      "id": "dp700-7-137",
      "text": "A business analyst needs to clean a small Excel file and load it into a lakehouse with a low-code tool. Which item fits?",
      "options": [
        "A Dataflow Gen2",
        "A Spark notebook",
        "A KQL queryset",
        "An Eventstream"
      ],
      "correct": 0,
      "module": 7,
      "explanation": "Dataflow Gen2 is the low-code Power Query tool for small to medium transformations."
    },
    {
      "id": "dp700-7-138",
      "text": "You must transform billions of rows with custom Python and Delta logic. Which item fits best?",
      "options": [
        "A Copy job",
        "A Real-Time Dashboard",
        "A notebook",
        "A Dataflow Gen2"
      ],
      "correct": 2,
      "module": 7,
      "explanation": "Notebooks run Spark at scale with full code control."
    },
    {
      "id": "dp700-7-139",
      "text": "You must run a notebook, then a stored procedure, then send a Teams message on failure. What do you build?",
      "options": [
        "A pipeline",
        "A single notebook",
        "A Dataflow Gen2 with several queries",
        "A mirrored database"
      ],
      "correct": 0,
      "module": 7,
      "explanation": "Pipelines orchestrate activities and handle dependencies and notifications."
    },
    {
      "id": "dp700-7-140",
      "text": "Which item is the best fit to copy a large table between stores with no transformation and high throughput?",
      "options": [
        "A Dataflow Gen2",
        "An Eventhouse update policy",
        "A Spark notebook with row loops",
        "A pipeline Copy activity or a Copy job"
      ],
      "correct": 3,
      "module": 7,
      "explanation": "Copy activity and Copy job are optimized for data movement. Dataflows and notebooks are for transformation."
    },
    {
      "id": "dp700-7-141",
      "text": "Your team needs reusable, code-defined orchestration with complex dependencies written in Python. Which option fits?",
      "options": [
        "An Apache Airflow job",
        "A OneLake shortcut",
        "A Dataflow Gen2",
        "A KQL materialized view"
      ],
      "correct": 0,
      "module": 7,
      "explanation": "Airflow DAGs express orchestration in Python code."
    },
    {
      "id": "dp700-7-142",
      "text": "Which statement about choosing between a Dataflow Gen2 and a notebook is true?",
      "options": [
        "Dataflows suit low-code work on small to medium data; notebooks suit large data and custom code",
        "Dataflows cannot write to a warehouse",
        "Dataflows are faster for any data size",
        "Notebooks cannot write to a lakehouse"
      ],
      "correct": 0,
      "module": 7,
      "explanation": "Pick the tool on skill set, data volume and need for custom logic."
    },
    {
      "id": "dp700-7-143",
      "text": "A pipeline must start when a new file lands in an Azure Blob Storage container. What do you use?",
      "options": [
        "A schedule with a 1-minute recurrence",
        "An event-based trigger on blob creation",
        "A deployment rule",
        "A Dataflow refresh"
      ],
      "correct": 1,
      "module": 7,
      "explanation": "Event triggers react to storage events instead of polling on a schedule."
    },
    {
      "id": "dp700-7-144",
      "text": "Which Fabric component do pipeline event-based triggers rely on?",
      "options": [
        "Data Wrangler",
        "The Monitor hub",
        "Eventhouse",
        "Activator"
      ],
      "correct": 3,
      "module": 7,
      "explanation": "Event triggers are built on Activator and Real-Time hub events, and creating one creates an Activator item."
    },
    {
      "id": "dp700-7-145",
      "text": "Which events can trigger a Fabric pipeline other than Azure Blob Storage events?",
      "options": [
        "Only SQL Server triggers",
        "Only Power BI report views",
        "Only timer events",
        "OneLake events and Fabric job and workspace events"
      ],
      "correct": 3,
      "module": 7,
      "explanation": "Event triggers support Azure Blob Storage, OneLake, job and workspace events."
    },
    {
      "id": "dp700-7-146",
      "text": "How do you pass the name of the file that raised a storage event into a pipeline?",
      "options": [
        "Use the trigger parameter expression @pipeline()?.TriggerEvent?.FileName",
        "Read it from the Monitor hub",
        "Hard-code the file path",
        "Use @variables('file') with no setup"
      ],
      "correct": 0,
      "module": 7,
      "explanation": "Event triggers expose properties such as the file name, which you reference in pipeline expressions."
    },
    {
      "id": "dp700-7-147",
      "text": "A schedule for a pipeline needs a run every weekday at 06:00. Where do you configure it?",
      "options": [
        "On the lakehouse",
        "In a deployment rule",
        "On the pipeline's Schedule settings",
        "In the workspace Spark settings"
      ],
      "correct": 2,
      "module": 7,
      "explanation": "Pipeline schedules are set from the pipeline's Schedule button. Notebooks and dataflows have their own schedules."
    },
    {
      "id": "dp700-7-148",
      "text": "A scheduled pipeline passes a value to a pipeline parameter, but the value is ignored. What is the likely cause?",
      "options": [
        "The schedule's parameter name does not exactly match the pipeline parameter name",
        "The workspace is on a trial capacity",
        "The pipeline has no activities",
        "The pipeline is in a deployment stage"
      ],
      "correct": 0,
      "module": 7,
      "explanation": "Parameter names in the schedule must match the pipeline's parameters exactly."
    },
    {
      "id": "dp700-7-149",
      "text": "Failure notification emails for pipelines are sent for which runs?",
      "options": [
        "Debug runs only",
        "Scheduled runs",
        "Manual runs only",
        "Runs that succeed"
      ],
      "correct": 1,
      "module": 7,
      "explanation": "Pipeline failure notifications apply to scheduled runs, not on-demand ones."
    },
    {
      "id": "dp700-7-150",
      "text": "Where do you see a list of recent pipeline, dataflow, notebook and Spark job runs across a workspace?",
      "options": [
        "The deployment pipeline view",
        "The OneLake catalog",
        "The admin portal Usage metrics",
        "The Monitor hub"
      ],
      "correct": 3,
      "module": 7,
      "explanation": "The Monitor hub lists activities for items such as pipelines, dataflows, notebooks and semantic model refreshes."
    },
    {
      "id": "dp700-7-151",
      "text": "A Copy activity finished but you need the rows read, rows written and throughput. Where do you look?",
      "options": [
        "The Spark UI",
        "The sensitivity label panel",
        "The workspace Git status",
        "The activity's run details in the pipeline run view"
      ],
      "correct": 3,
      "module": 7,
      "explanation": "The output of the Copy activity shows the data read and written, throughput and duration."
    },
    {
      "id": "dp700-7-152",
      "text": "How do you check whether a mirrored database is replicating each table?",
      "options": [
        "Query queryinsights.exec_requests_history",
        "Open the Monitor hub Spark tab",
        "Check the deployment pipeline",
        "Open Monitor replication on the mirrored database"
      ],
      "correct": 3,
      "module": 7,
      "explanation": "Monitor replication shows the status of the mirroring and the replicated rows for each table."
    },
    {
      "id": "dp700-7-153",
      "text": "Which Eventstream feature helps you see whether events are flowing through a node and spot errors?",
      "options": [
        "The Lakehouse explorer",
        "The Git status panel",
        "The Data insights and Runtime logs tabs on the node",
        "The OneLake diagnostics lakehouse"
      ],
      "correct": 2,
      "module": 7,
      "explanation": "Selecting a node in the Eventstream shows data insights, such as incoming and outgoing events, and runtime logs."
    },
    {
      "id": "dp700-7-154",
      "text": "Which tool shows capacity consumption by item so you can find which ingestion jobs use the most compute?",
      "options": [
        "The Microsoft Fabric Capacity Metrics app",
        "The Monitor hub only",
        "Query insights",
        "The Spark Advisor"
      ],
      "correct": 0,
      "module": 7,
      "explanation": "The Capacity Metrics app breaks capacity unit usage down by item and operation."
    },
    {
      "id": "dp700-7-155",
      "text": "How long are activities kept in the Monitor hub?",
      "options": [
        "Forever",
        "24 hours",
        "About 30 days",
        "1 year"
      ],
      "correct": 2,
      "module": 7,
      "explanation": "The Monitor hub keeps a history of recent activities, about 30 days."
    },
    {
      "id": "dp700-7-156",
      "text": "Where do you find the slowest recent queries in a Fabric warehouse?",
      "options": [
        "The Spark UI",
        "queryinsights.long_running_queries",
        "sys.indexes",
        "sys.sql_logins"
      ],
      "correct": 1,
      "module": 7,
      "explanation": "Query insights exposes views such as long_running_queries and frequently_run_queries. They hold about 30 days of history."
    },
    {
      "id": "dp700-7-157",
      "text": "Which tools show the stages, tasks and shuffles of a Spark job in Fabric?",
      "options": [
        "The mirrored database monitor",
        "The Spark UI and Spark history server from the Monitor hub",
        "The Capacity Metrics app only",
        "The Eventstream Data insights tab"
      ],
      "correct": 1,
      "module": 7,
      "explanation": "Spark monitoring shows jobs, stages, tasks and executor details so you can find skew and slow transformations."
    },
    {
      "id": "dp700-7-158",
      "text": "Which view shows the requests currently running in a Fabric warehouse?",
      "options": [
        "sys.dm_exec_requests",
        "sys.sql_modules",
        "sys.dm_os_wait_stats",
        "sys.dm_db_index_usage_stats"
      ],
      "correct": 0,
      "module": 7,
      "explanation": "The warehouse supports sys.dm_exec_connections, sys.dm_exec_sessions and sys.dm_exec_requests for live monitoring."
    },
    {
      "id": "dp700-7-159",
      "text": "Where do you see the refresh duration and failure message of a Dataflow Gen2?",
      "options": [
        "The dataflow's refresh history",
        "The lakehouse SQL endpoint",
        "The OneLake security role editor",
        "The Git status panel"
      ],
      "correct": 0,
      "module": 7,
      "explanation": "Refresh history lists each run with status, duration, and the error details when it fails."
    },
    {
      "id": "dp700-7-160",
      "text": "Where do you find the history of refreshes for a semantic model?",
      "options": [
        "The semantic model's Refresh history, or the Monitor hub",
        "The Git diff view",
        "The warehouse queryinsights schema",
        "The lakehouse Files folder"
      ],
      "correct": 0,
      "module": 7,
      "explanation": "Refresh history lists each scheduled and on-demand refresh with its status and error message, and the Monitor hub shows them too."
    },
    {
      "id": "dp700-7-161",
      "text": "A scheduled refresh of an Import semantic model keeps failing. Which settings are common causes to check?",
      "options": [
        "The sensitivity label",
        "The data source credentials and the gateway connection",
        "The Git branch",
        "The domain assignment"
      ],
      "correct": 1,
      "module": 7,
      "explanation": "Refreshes often fail on expired credentials or an offline gateway, and the refresh history shows the error."
    },
    {
      "id": "dp700-7-162",
      "text": "Who gets an email when a scheduled semantic model refresh fails, if you turn on the failure notification?",
      "options": [
        "Only the Fabric admin",
        "No one, notifications are not supported",
        "The semantic model owner and any contacts you add",
        "Every user of the workspace"
      ],
      "correct": 2,
      "module": 7,
      "explanation": "Refresh settings let you notify the owner and additional contacts when a scheduled refresh fails."
    },
    {
      "id": "dp700-7-163",
      "text": "What does automatic updates do for a Direct Lake semantic model?",
      "options": [
        "Copies the model to a warehouse",
        "Disables framing",
        "Keeps the model in sync by loading new Delta table versions as they change",
        "Runs an Import refresh every night"
      ],
      "correct": 2,
      "module": 7,
      "explanation": "Direct Lake can update automatically when the Delta tables change, and a refresh frames the model on the latest data."
    },
    {
      "id": "dp700-7-164",
      "text": "What is a Direct Lake refresh?",
      "options": [
        "A rebuild of the Delta tables",
        "A full reload of all the data into memory",
        "A refresh of the SQL analytics endpoint metadata",
        "A framing operation that points the model at the latest Delta table versions without copying data"
      ],
      "correct": 3,
      "module": 7,
      "explanation": "A Direct Lake refresh only updates the metadata so the model sees the current Delta files. It is far faster than an Import refresh."
    },
    {
      "id": "dp700-7-165",
      "text": "You need to run a semantic model refresh as soon as a pipeline finishes loading the lakehouse. What is the simplest way?",
      "options": [
        "Wait for the nightly refresh",
        "Add a sensitivity label",
        "Re-publish the report",
        "Add a semantic model refresh activity to the pipeline"
      ],
      "correct": 3,
      "module": 7,
      "explanation": "The pipeline activity triggers a refresh of the model after the load completes."
    },
    {
      "id": "dp700-7-166",
      "text": "Which service limit commonly explains a refresh that times out on a shared capacity?",
      "options": [
        "The Git file size",
        "The number of reports",
        "A refresh duration limit that depends on the capacity type",
        "The sensitivity label"
      ],
      "correct": 2,
      "module": 7,
      "explanation": "Refresh operations have time limits that differ by capacity. Long refreshes need optimization or incremental refresh."
    },
    {
      "id": "dp700-7-167",
      "text": "A pipeline should notify a Teams channel when a Copy activity fails. How do you add this?",
      "options": [
        "Turn on the shortcut cache",
        "Create a OneLake security role",
        "Add a sensitivity label",
        "Add a Teams activity connected to the Copy activity's On fail path"
      ],
      "correct": 3,
      "module": 7,
      "explanation": "Pipelines can call Teams and Outlook activities on the failure path."
    },
    {
      "id": "dp700-7-168",
      "text": "You need an alert when a metric in a KQL database crosses a threshold. Which Fabric feature do you use?",
      "options": [
        "Domains",
        "Deployment rules",
        "Activator",
        "Dataflow Gen2"
      ],
      "correct": 2,
      "module": 7,
      "explanation": "Activator evaluates conditions on streaming and KQL data and triggers actions such as email or Teams messages."
    },
    {
      "id": "dp700-7-169",
      "text": "A Copy activity from an on-premises SQL Server fails with a connection error, but the credentials are correct. What should you check first?",
      "options": [
        "The Eventstream window size",
        "The lakehouse V-Order setting",
        "The sensitivity label",
        "That the on-premises data gateway is online and the connection uses it"
      ],
      "correct": 3,
      "module": 7,
      "explanation": "On-premises sources need a running gateway, so a stopped or unreachable gateway produces connection errors."
    },
    {
      "id": "dp700-7-170",
      "text": "A ForEach activity fails because an inner activity cannot find the item value. Which expression returns the current item?",
      "options": [
        "@variables('item')",
        "@pipeline().parameters.item",
        "@item()",
        "@activity('ForEach').output"
      ],
      "correct": 2,
      "module": 7,
      "explanation": "Inside ForEach, @item() returns the current element of the iterated array."
    },
    {
      "id": "dp700-7-171",
      "text": "A Lookup activity fails because the query returns too much data. What limits apply?",
      "options": [
        "It returns at most 5,000 rows and 4 MB of output",
        "It returns at most 100 rows",
        "It returns at most 1 GB",
        "It has no limit"
      ],
      "correct": 0,
      "module": 7,
      "explanation": "Lookup fails when the result exceeds 5,000 rows or 4 MB. Use a Copy activity or a notebook for larger data."
    },
    {
      "id": "dp700-7-172",
      "text": "A pipeline run shows Failed, but the failing activity shows Succeeded for its error branch. What does the pipeline status reflect?",
      "options": [
        "The failure of an activity that has no handled failure path",
        "Only the first activity",
        "The average of all activities",
        "Only the last activity"
      ],
      "correct": 0,
      "module": 7,
      "explanation": "A pipeline fails when an activity fails without a downstream On fail or On completion path that handles it."
    },
    {
      "id": "dp700-7-173",
      "text": "A Copy activity that stages data in the workspace times out after about an hour. What is the fix?",
      "options": [
        "Increase the Spark pool size",
        "Enable V-Order",
        "Reduce the Eventstream partitions",
        "Use your own external staging storage such as ADLS Gen2"
      ],
      "correct": 3,
      "module": 7,
      "explanation": "Workspace staging has a 60-minute limit, so long copies use external staging."
    },
    {
      "id": "dp700-7-174",
      "text": "A pipeline passes a date parameter to a notebook, but the notebook uses its default value. What is the likely cause?",
      "options": [
        "The notebook uses V-Order",
        "The notebook has no cell marked as a parameters cell, or the names do not match",
        "The notebook is in a different capacity",
        "The pipeline has a sensitivity label"
      ],
      "correct": 1,
      "module": 7,
      "explanation": "Parameters override values only in a cell marked as the parameters cell, and the names must match."
    },
    {
      "id": "dp700-7-175",
      "text": "A Copy activity should skip rows that don't convert instead of failing the whole run. Which setting do you use?",
      "options": [
        "Degree of copy parallelism",
        "Intelligent throughput optimization",
        "Fault tolerance, to skip incompatible rows",
        "Enable staging"
      ],
      "correct": 2,
      "module": 7,
      "explanation": "Fault tolerance lets the copy continue past incompatible rows and log them."
    },
    {
      "id": "dp700-7-176",
      "text": "A Dataflow Gen2 that reads an on-premises source fails at refresh time. What is a common cause?",
      "options": [
        "V-Order is off",
        "The lakehouse has a shortcut",
        "The data gateway is offline or the connection credentials expired",
        "The workspace uses a starter pool"
      ],
      "correct": 2,
      "module": 7,
      "explanation": "On-premises sources need an online gateway and valid credentials."
    },
    {
      "id": "dp700-7-177",
      "text": "A Dataflow Gen2 loads very slowly after you add a custom column that calls a function. What most likely happened?",
      "options": [
        "The destination was deleted",
        "The dataflow lost its staging",
        "The source was converted to Delta",
        "Query folding was lost, so the work moved from the source to the dataflow engine"
      ],
      "correct": 3,
      "module": 7,
      "explanation": "Steps that cannot be translated to the source query break folding, and the mashup engine processes more data."
    },
    {
      "id": "dp700-7-178",
      "text": "How can you check whether a step in Dataflow Gen2 still folds to the source?",
      "options": [
        "Check the sensitivity label",
        "Run OPTIMIZE",
        "Open the Spark UI",
        "Right-click the step and see whether View data source query is available"
      ],
      "correct": 3,
      "module": 7,
      "explanation": "If View data source query is enabled for the step, the step folds."
    },
    {
      "id": "dp700-7-179",
      "text": "A Dataflow Gen2 refresh fails with a data type error when writing to a lakehouse table. What do you fix?",
      "options": [
        "The Git branch",
        "The sensitivity label",
        "The column data types in the query so they match the destination mapping",
        "The Spark pool"
      ],
      "correct": 2,
      "module": 7,
      "explanation": "Destination mappings need compatible types, so fix the types in the query or in the mapping."
    },
    {
      "id": "dp700-7-180",
      "text": "Which feature improves the performance of a Dataflow Gen2 that transforms large intermediate results?",
      "options": [
        "Staging, so the dataflow uses the lakehouse and warehouse compute for transformations",
        "Using a private link",
        "Disabling the destination",
        "Turning off refresh history"
      ],
      "correct": 0,
      "module": 7,
      "explanation": "Staging stores intermediate results in a staging lakehouse so the SQL engine can do the heavy transformations."
    },
    {
      "id": "dp700-7-181",
      "text": "Where do you find which query in a Dataflow Gen2 caused a failed refresh?",
      "options": [
        "The Monitor hub Spark tab",
        "Query insights",
        "The Capacity Metrics app",
        "The refresh history details for the run"
      ],
      "correct": 3,
      "module": 7,
      "explanation": "Refresh history details show the failing query and error message."
    },
    {
      "id": "dp700-7-182",
      "text": "A Dataflow Gen2 fails because it exceeds the time allowed for a refresh. What is a sound mitigation?",
      "options": [
        "Add more sensitivity labels",
        "Reduce the data processed, for example by filtering early so folding applies, or split the dataflow",
        "Change the workspace region",
        "Convert the dataflow to a domain"
      ],
      "correct": 1,
      "module": 7,
      "explanation": "Pushing filters to the source and splitting the work reduces the refresh time."
    },
    {
      "id": "dp700-7-183",
      "text": "A Dataflow Gen2 combines a source requiring privacy levels with another source and fails with a formula firewall error. What causes this?",
      "options": [
        "The pipeline is not scheduled",
        "The two sources have incompatible privacy levels, so the data cannot be combined in one query",
        "The lakehouse is read-only",
        "The dataflow has no description"
      ],
      "correct": 1,
      "module": 7,
      "explanation": "Privacy levels isolate sources, and combining them in one step triggers the formula firewall error."
    },
    {
      "id": "dp700-7-184",
      "text": "A notebook fails with an OutOfMemory error after collecting a large DataFrame to the driver. What is the best fix?",
      "options": [
        "Turn on endorsement",
        "Add a sensitivity label",
        "Avoid collect/toPandas on large data and aggregate or write the data with Spark instead",
        "Increase the number of Eventstream partitions"
      ],
      "correct": 2,
      "module": 7,
      "explanation": "Collecting a big DataFrame loads it all into the driver's memory. Keep the work distributed."
    },
    {
      "id": "dp700-7-185",
      "text": "A notebook fails to import a library that you installed in the notebook environment. What should you check?",
      "options": [
        "The shortcut cache",
        "That the environment with the library was published and attached to the notebook",
        "The warehouse isolation level",
        "The Monitor hub retention"
      ],
      "correct": 1,
      "module": 7,
      "explanation": "Libraries added to an environment are only available after the environment is published and selected."
    },
    {
      "id": "dp700-7-186",
      "text": "An interactive notebook session ends after being idle. What controls how long the session stays alive?",
      "options": [
        "The Spark session timeout in the workspace Spark settings",
        "The OneLake cache retention",
        "The Git sync interval",
        "The Eventhouse caching policy"
      ],
      "correct": 0,
      "module": 7,
      "explanation": "Interactive sessions end after the timeout, which defaults to 20 minutes."
    },
    {
      "id": "dp700-7-187",
      "text": "A pipeline notebook activity fails with a message that a parameter is missing. Where do you look for the stack trace?",
      "options": [
        "The notebook snapshot from the activity run in the Monitor hub",
        "The warehouse query insights",
        "The Eventstream runtime logs",
        "The Git compare view"
      ],
      "correct": 0,
      "module": 7,
      "explanation": "The run snapshot shows each cell's output and the error, so you can see where it failed."
    },
    {
      "id": "dp700-7-188",
      "text": "A Spark job fails with executor lost errors during a wide shuffle. Which action is most likely to help?",
      "options": [
        "Disable the checkpoint",
        "Add a sensitivity label",
        "Reduce the OneLake cache retention",
        "Use larger nodes or more executors, and fix data skew"
      ],
      "correct": 3,
      "module": 7,
      "explanation": "Executor loss often comes from memory pressure caused by large shuffles or skewed keys."
    },
    {
      "id": "dp700-7-189",
      "text": "A notebook throws a schema mismatch error when appending to a Delta table. What is the cause?",
      "options": [
        "The DataFrame schema differs from the table schema, and Delta enforces the schema on write",
        "The shortcut cache is empty",
        "The table is partitioned",
        "V-Order is disabled"
      ],
      "correct": 0,
      "module": 7,
      "explanation": "Delta rejects writes that don't match the schema unless you enable schema evolution (mergeSchema)."
    },
    {
      "id": "dp700-7-190",
      "text": "A notebook run with notebookutils.notebook.run times out. Which parameter do you change?",
      "options": [
        "The sensitivity label",
        "The timeout argument of the call",
        "The checkpoint location",
        "The shortcut cache"
      ],
      "correct": 1,
      "module": 7,
      "explanation": "notebookutils.notebook.run takes a timeout in seconds for the child notebook."
    },
    {
      "id": "dp700-7-191",
      "text": "Two notebooks cannot share a high concurrency session. What is a likely reason?",
      "options": [
        "They use different environments or Spark configurations",
        "They use the same default lakehouse",
        "They run under the same user",
        "They are in the same workspace"
      ],
      "correct": 0,
      "module": 7,
      "explanation": "Sessions are shared only between notebooks with compatible configuration, such as the same environment."
    },
    {
      "id": "dp700-7-192",
      "text": "Which command lists the recent failed ingestions for a KQL database?",
      "options": [
        ".show cache",
        ".show ingestion failures",
        ".show tables",
        ".show queries"
      ],
      "correct": 1,
      "module": 7,
      "explanation": "The .show ingestion failures command returns the reasons that ingestion operations failed."
    },
    {
      "id": "dp700-7-193",
      "text": "An update policy's query has an error, and ingestion into the source table fails. Where do you find the cause?",
      "options": [
        "The Monitor hub Spark tab",
        "The deployment pipeline",
        ".show ingestion failures and the update policy definition",
        "The warehouse queryinsights schema"
      ],
      "correct": 2,
      "module": 7,
      "explanation": "Failures in the update policy query surface as ingestion failures on the source table."
    },
    {
      "id": "dp700-7-194",
      "text": "A KQL query returns a truncated result with a warning. What can you use to return the full result when you really need it?",
      "options": [
        ".alter table T policy cache",
        "set notruncation;",
        "|take 0",
        "set maxmemory=0;"
      ],
      "correct": 1,
      "module": 7,
      "explanation": "Query results are truncated at a default size limit. notruncation removes the limit, but you should aggregate when possible."
    },
    {
      "id": "dp700-7-195",
      "text": "A KQL query fails because it exceeds the memory limit of the engine. What is the best first fix?",
      "options": [
        "Disable the retention policy",
        "Turn on query acceleration",
        "Filter by time and columns earlier and reduce the data processed by joins and summarize",
        "Add more tables"
      ],
      "correct": 2,
      "module": 7,
      "explanation": "Narrowing the data scanned early reduces memory use. Better query shape beats raising limits."
    },
    {
      "id": "dp700-7-196",
      "text": "A KQL query on TaxiTrips works only with the table name written in a different case. What is the explanation?",
      "options": [
        "The table has a retention policy",
        "The database is read-only",
        "The query ran in the Monitor hub",
        "KQL table and column names are case-sensitive"
      ],
      "correct": 3,
      "module": 7,
      "explanation": "KQL is case-sensitive for entity names and for most string operators."
    },
    {
      "id": "dp700-7-197",
      "text": "Data is in an Eventstream destination but not visible in the KQL table yet. What could explain a short delay?",
      "options": [
        "The table is a materialized view",
        "The retention policy is off",
        "OneLake availability is on",
        "Queued ingestion batches data before committing it"
      ],
      "correct": 3,
      "module": 7,
      "explanation": "Queued ingestion uses a batching policy, so data appears after the batch is sealed."
    },
    {
      "id": "dp700-7-198",
      "text": "How do you see the current update policy of a table?",
      "options": [
        ".show database policy retention",
        ".show table MyTable cslschema",
        ".show queryplan",
        ".show table MyTable policy update"
      ],
      "correct": 3,
      "module": 7,
      "explanation": "The .show table policy update command displays the update policy definition."
    },
    {
      "id": "dp700-7-199",
      "text": "Where do you see errors in an Eventstream operator that you are editing?",
      "options": [
        "The warehouse query insights",
        "The Spark UI",
        "The Authoring errors tab in the event processing editor",
        "The Monitor hub Git tab"
      ],
      "correct": 2,
      "module": 7,
      "explanation": "The editor has Test result and Authoring errors tabs to validate operators before you publish."
    },
    {
      "id": "dp700-7-200",
      "text": "An Eventstream cannot deserialize events from an Event Hub source. What is the likely cause?",
      "options": [
        "The workspace has no Git connection",
        "The domain has no admin",
        "The lakehouse has no tables",
        "The data format or schema configured on the source does not match the events"
      ],
      "correct": 3,
      "module": 7,
      "explanation": "Source format settings such as JSON, Avro and CSV must match the incoming data."
    },
    {
      "id": "dp700-7-201",
      "text": "An Eventstream destination to a lakehouse stops receiving events after you change the table's schema. What do you check?",
      "options": [
        "That the destination's schema mapping still matches the events and the table",
        "The workspace Spark properties",
        "The Spark pool",
        "The deployment pipeline"
      ],
      "correct": 0,
      "module": 7,
      "explanation": "A destination fails or drops events when the event fields no longer fit the target table."
    },
    {
      "id": "dp700-7-202",
      "text": "A source connection to Event Hubs keeps failing. Which items should you verify?",
      "options": [
        "The connection string or credentials, the consumer group and network access",
        "The deployment rule",
        "The OneLake cache",
        "The warehouse isolation level"
      ],
      "correct": 0,
      "module": 7,
      "explanation": "Connection failures come from credentials, consumer group conflicts or network restrictions."
    },
    {
      "id": "dp700-7-203",
      "text": "Which tab on an Eventstream node helps you spot dropped or failed events?",
      "options": [
        "Data insights",
        "Git status",
        "Query insights",
        "Capacity Metrics"
      ],
      "correct": 0,
      "module": 7,
      "explanation": "Data insights shows event counts in and out and error indicators for the node."
    },
    {
      "id": "dp700-7-204",
      "text": "An operator in the event processing editor must be placed before the destination, but the destination isn't a lakehouse or Eventhouse. What do you add first?",
      "options": [
        "A OneLake shortcut",
        "A Spark job",
        "A derived stream",
        "A mirrored database"
      ],
      "correct": 2,
      "module": 7,
      "explanation": "For destinations other than Lakehouse, Eventhouse, Activator and derived stream, add a derived stream, then process before it."
    },
    {
      "id": "dp700-7-205",
      "text": "After editing the processing logic in an Eventstream, the changes are not live. What must you do?",
      "options": [
        "Publish the changes",
        "Create a deployment rule",
        "Refresh the workspace",
        "Restart the capacity"
      ],
      "correct": 0,
      "module": 7,
      "explanation": "Edits in the event processing editor take effect only after you publish them."
    },
    {
      "id": "dp700-7-206",
      "text": "Two concurrent UPDATE statements to the same warehouse table fail with error 24556 (snapshot isolation update conflict). What should the failed session do?",
      "options": [
        "Add a clustered index",
        "Increase the Spark session timeout",
        "Retry the transaction",
        "Switch to READ COMMITTED"
      ],
      "correct": 2,
      "module": 7,
      "explanation": "A warehouse uses snapshot isolation with table-level conflict detection. The first committer wins, and the other should retry."
    },
    {
      "id": "dp700-7-207",
      "text": "You run SET TRANSACTION ISOLATION LEVEL READ COMMITTED in a warehouse session. What happens?",
      "options": [
        "Nothing changes; the warehouse always uses snapshot isolation",
        "The session runs at READ COMMITTED",
        "The warehouse switches to serializable",
        "The statement fails with a syntax error"
      ],
      "correct": 0,
      "module": 7,
      "explanation": "Isolation level changes are accepted syntactically but ignored in Fabric warehouse."
    },
    {
      "id": "dp700-7-208",
      "text": "A new Delta table in the lakehouse is missing from its SQL analytics endpoint. What fixes this quickly?",
      "options": [
        "Restart the Spark session",
        "Run a metadata sync of the SQL analytics endpoint",
        "Run OPTIMIZE on the table",
        "Re-create the workspace"
      ],
      "correct": 1,
      "module": 7,
      "explanation": "The endpoint discovers new tables with a short delay. You can refresh the metadata on demand in the portal or through the REST API or a pipeline activity."
    },
    {
      "id": "dp700-7-209",
      "text": "A T-SQL INSERT into a table of the lakehouse SQL analytics endpoint fails. Why?",
      "options": [
        "The identity column is full",
        "The table lacks a primary key",
        "The table is too large",
        "The SQL analytics endpoint is read-only for tables; write with Spark or a warehouse"
      ],
      "correct": 3,
      "module": 7,
      "explanation": "The endpoint only reads Delta tables. Use Spark, a pipeline or a warehouse to write."
    },
    {
      "id": "dp700-7-210",
      "text": "A query on a warehouse fails because a column of a Spark-created table is varchar(8000). What does it suggest?",
      "options": [
        "The table has too many partitions",
        "Spark string columns without a length map to varchar(8000), so set sensible types or lengths when creating the table",
        "The lakehouse lacks V-Order",
        "The warehouse limits all columns to 8000 rows"
      ],
      "correct": 1,
      "module": 7,
      "explanation": "Strings from Spark appear as varchar(8000), which can hurt performance and limit some operations."
    },
    {
      "id": "dp700-7-211",
      "text": "A script tries to create a SAVE TRANSACTION savepoint in a warehouse and fails. Why?",
      "options": [
        "The warehouse is read-only",
        "Transactions are disabled in Fabric",
        "The user lacks Reader role",
        "Savepoints, named and marked transactions are not supported in a warehouse"
      ],
      "correct": 3,
      "module": 7,
      "explanation": "Fabric warehouse supports regular BEGIN/COMMIT/ROLLBACK, but not savepoints or distributed transactions."
    },
    {
      "id": "dp700-7-212",
      "text": "ALTER TABLE ADD of an IDENTITY column fails in a warehouse. What is the way around it?",
      "options": [
        "Run DBCC SHRINKFILE",
        "Add the column in Spark",
        "Create a new table with CTAS or SELECT INTO that defines the IDENTITY column",
        "Use SET IDENTITY_INSERT ON"
      ],
      "correct": 2,
      "module": 7,
      "explanation": "You cannot add an IDENTITY column to an existing table. Create a new table and copy the data."
    },
    {
      "id": "dp700-7-213",
      "text": "A MERGE statement in a warehouse reports a conflict with another session that only appended rows. What do you do?",
      "options": [
        "Create a clustered index",
        "Retry the statement, as a warehouse detects write conflicts at the table level",
        "Raise the isolation level to SERIALIZABLE",
        "Disable V-Order"
      ],
      "correct": 1,
      "module": 7,
      "explanation": "Table-level conflict detection means even MERGE operations on different rows can conflict, and retry resolves it."
    },
    {
      "id": "dp700-7-214",
      "text": "A shortcut to an ADLS Gen2 container stops working after the storage account key rotates. What do you fix?",
      "options": [
        "The lakehouse V-Order setting",
        "The workspace Git branch",
        "The pipeline schedule",
        "Update the credentials of the cloud connection used by the shortcut"
      ],
      "correct": 3,
      "module": 7,
      "explanation": "External shortcuts authenticate through a connection, so expired credentials break them."
    },
    {
      "id": "dp700-7-215",
      "text": "A shortcut shows an error after someone renames the target folder. What is the cause?",
      "options": [
        "The shortcut still points to the old path, so it breaks",
        "The table is partitioned",
        "The shortcut cache is full",
        "Fabric automatically follows renames"
      ],
      "correct": 0,
      "module": 7,
      "explanation": "Shortcuts reference the target path. If the target is moved, renamed or deleted, the shortcut breaks."
    },
    {
      "id": "dp700-7-216",
      "text": "A shortcut created under Tables isn't recognized as a table. Which naming issue can cause this?",
      "options": [
        "The name is in lowercase",
        "The name contains characters such as % or +, or non-Latin characters",
        "The name has an underscore",
        "The name is shorter than 10 characters"
      ],
      "correct": 1,
      "module": 7,
      "explanation": "Shortcut names with some special characters can't be discovered as Delta tables."
    },
    {
      "id": "dp700-7-217",
      "text": "A user opens a shortcut to a lakehouse in another workspace and gets Unauthorized. What do you check?",
      "options": [
        "That the user has permission on the target lakehouse data",
        "The user's sensitivity label",
        "That the user owns a warehouse",
        "The Spark pool size"
      ],
      "correct": 0,
      "module": 7,
      "explanation": "Shortcuts to OneLake items use the caller's identity, so the caller needs access at the target."
    },
    {
      "id": "dp700-7-218",
      "text": "A shortcut to Delta files shows no tables in the SQL analytics endpoint. What could be the issue?",
      "options": [
        "The semantic model is in Direct Lake",
        "The folder under Tables is not valid Delta format, or the shortcut is not at the top level of Tables",
        "The workspace has no domain",
        "The lakehouse has no description"
      ],
      "correct": 1,
      "module": 7,
      "explanation": "Table shortcuts need Delta data at the top level of the Tables folder."
    },
    {
      "id": "dp700-7-219",
      "text": "Which tenant setting must be enabled so OneLake security works with shortcuts and external readers?",
      "options": [
        "Users can create Fabric items",
        "Users can access data stored in OneLake with apps external to Fabric",
        "Allow guest users to browse",
        "Enable Delta sharing"
      ],
      "correct": 1,
      "module": 7,
      "explanation": "OneLake security with shortcuts relies on external app access to OneLake being enabled."
    },
    {
      "id": "dp700-7-220",
      "text": "A Table API request doesn't see a shortcut you just created. What explains this?",
      "options": [
        "A short delay of about a minute before the table API recognizes new shortcuts",
        "The Table API doesn't support shortcuts",
        "Shortcuts take 24 hours to appear",
        "The shortcut is deleted when created"
      ],
      "correct": 0,
      "module": 7,
      "explanation": "The table API takes up to about a minute to discover newly created shortcuts."
    },
    {
      "id": "dp700-7-221",
      "text": "You delete a file through a shortcut to an S3 bucket and the data in S3 disappears. Why?",
      "options": [
        "Shortcuts always copy data",
        "Deleting through a shortcut deletes in the target when you have write permission there",
        "A OneLake security bug",
        "S3 syncs deletions automatically"
      ],
      "correct": 1,
      "module": 7,
      "explanation": "Only deleting the shortcut itself leaves the target alone; deleting the files within it affects the target."
    },
    {
      "id": "dp700-7-222",
      "text": "A Copy activity moves a large table slowly. Which setting increases throughput by using more compute for the copy?",
      "options": [
        "Endorsement",
        "Intelligent throughput optimization (data integration units)",
        "Git sync",
        "Degree of sensitivity labeling"
      ],
      "correct": 1,
      "module": 7,
      "explanation": "Intelligent throughput optimization sets the compute used by the copy, from auto to custom values between 4 and 256 units."
    },
    {
      "id": "dp700-7-223",
      "text": "Which Copy activity setting reads from a partitioned source with several parallel threads?",
      "options": [
        "Enable staging only",
        "Degree of copy parallelism with a partition option",
        "Fault tolerance",
        "Data consistency verification"
      ],
      "correct": 1,
      "module": 7,
      "explanation": "Parallel copy with partition options such as physical partitions or dynamic range reads the source in parallel."
    },
    {
      "id": "dp700-7-224",
      "text": "A ForEach activity runs 100 independent child pipelines one by one. How do you speed it up?",
      "options": [
        "Clear Sequential and set a batch count to run iterations in parallel",
        "Add a Lookup activity",
        "Add a Wait activity",
        "Convert it to an Until activity"
      ],
      "correct": 0,
      "module": 7,
      "explanation": "ForEach runs iterations in parallel when sequential is off, up to the configured batch count."
    },
    {
      "id": "dp700-7-225",
      "text": "What is the default batch count of a parallel ForEach in a pipeline, and the maximum?",
      "options": [
        "50 by default, 100 at most",
        "1 by default, 5 at most",
        "5 by default, 10 at most",
        "20 by default, 50 at most"
      ],
      "correct": 3,
      "module": 7,
      "explanation": "Parallel ForEach runs 20 iterations at a time by default and up to 50."
    },
    {
      "id": "dp700-7-226",
      "text": "Which setting slows a Copy activity but verifies that source and sink data match?",
      "options": [
        "Fault tolerance",
        "Staging",
        "Data consistency verification",
        "Parallel copy"
      ],
      "correct": 2,
      "module": 7,
      "explanation": "Verification re-reads data to compare source and destination, so it adds time."
    },
    {
      "id": "dp700-7-227",
      "text": "You copy a very large number of small files to a lakehouse. What reduces the overhead?",
      "options": [
        "Copy in bigger batches, merge small files at the source, or use parallel copy",
        "Turn off the schedule",
        "Use a Lookup activity per file",
        "Disable the staging"
      ],
      "correct": 0,
      "module": 7,
      "explanation": "Per-file overhead dominates with many small files, so batching or merging helps."
    },
    {
      "id": "dp700-7-228",
      "text": "A pipeline is slow because of a long chain of activities that could run independently. What do you change?",
      "options": [
        "Set every activity to sequential",
        "Add a Wait activity between them",
        "Convert activities to a script",
        "Remove unneeded dependencies so independent activities run in parallel"
      ],
      "correct": 3,
      "module": 7,
      "explanation": "Activities with no dependency on each other start together, so remove artificial ordering."
    },
    {
      "id": "dp700-7-229",
      "text": "Which choice usually speeds up loading a Warehouse from Parquet files?",
      "options": [
        "Use a COPY INTO command with many files of about 100 MB to 1 GB each",
        "Load each file as CSV",
        "Use thousands of single-row INSERT statements",
        "Use a cursor loop"
      ],
      "correct": 0,
      "module": 7,
      "explanation": "COPY INTO is optimized for bulk loads, and files sized 100 MB to 1 GB parallelize well."
    },
    {
      "id": "dp700-7-230",
      "text": "Which actions help warehouse query performance?",
      "options": [
        "Add FORCESEEK hints",
        "Keep statistics current and use the smallest suitable data types",
        "Add a columnstore index to each table",
        "Use SELECT * everywhere"
      ],
      "correct": 1,
      "module": 7,
      "explanation": "The warehouse manages storage automatically and uses statistics, so right-sized data types and fresh statistics help."
    },
    {
      "id": "dp700-7-231",
      "text": "Why should you avoid many single-row INSERT statements in a warehouse?",
      "options": [
        "They are not allowed",
        "Each small insert creates a small Parquet file, which hurts performance",
        "They require a gateway",
        "They disable V-Order"
      ],
      "correct": 1,
      "module": 7,
      "explanation": "Trickle inserts produce many tiny files. Use set-based loads such as COPY INTO, CTAS or INSERT ... SELECT."
    },
    {
      "id": "dp700-7-232",
      "text": "Which statement creates a table and distributes its data so queries filtering on a column can skip files?",
      "options": [
        "CREATE TABLE ... CLUSTER BY (column) or CTAS with CLUSTER BY",
        "CREATE CLUSTERED INDEX",
        "CREATE STATISTICS only",
        "ALTER TABLE ... ADD HASH"
      ],
      "correct": 0,
      "module": 7,
      "explanation": "Data clustering in the warehouse orders data to enable file skipping."
    },
    {
      "id": "dp700-7-233",
      "text": "What happens if you disable V-Order on a Fabric warehouse?",
      "options": [
        "Only reads fail",
        "All tables are deleted",
        "It re-enables automatically after a day",
        "You can't re-enable it afterward"
      ],
      "correct": 3,
      "module": 7,
      "explanation": "V-Order is on by default for warehouses; once disabled it cannot be turned on again."
    },
    {
      "id": "dp700-7-234",
      "text": "A first query on a warehouse is slow, and later runs are fast. What explains this?",
      "options": [
        "A deployment pipeline is running",
        "The statistics are deleted",
        "The warehouse is paused",
        "A cold cache, where data is read from remote storage the first time"
      ],
      "correct": 3,
      "module": 7,
      "explanation": "Data is cached after the first read. Query insights shows the amount read from remote storage."
    },
    {
      "id": "dp700-7-235",
      "text": "Which command helps you reduce repeated expensive transformations when many reports read the same joined result?",
      "options": [
        "CTAS to persist the result in a table",
        "DROP STATISTICS",
        "SET NOCOUNT ON",
        "CREATE INDEX"
      ],
      "correct": 0,
      "module": 7,
      "explanation": "Persisting the result avoids recalculating the joins for every query."
    },
    {
      "id": "dp700-7-236",
      "text": "Which statement about statistics in a Fabric warehouse is true?",
      "options": [
        "They must always be created manually",
        "They don't exist in a warehouse",
        "They are stored in the lakehouse",
        "They are created and updated automatically, and you can create or update them manually"
      ],
      "correct": 3,
      "module": 7,
      "explanation": "The warehouse maintains statistics automatically, and CREATE STATISTICS or UPDATE STATISTICS is available for tuning."
    },
    {
      "id": "dp700-7-237",
      "text": "Why create a column as varchar(50) instead of varchar(8000) when you know the maximum length?",
      "options": [
        "It enables DDM",
        "It enables RLS",
        "It reduces the number of rows",
        "Smaller declared sizes help the engine with memory and plans"
      ],
      "correct": 3,
      "module": 7,
      "explanation": "Right-sized columns reduce memory grants and improve query plans."
    },
    {
      "id": "dp700-7-238",
      "text": "Which Eventhouse policy keeps recent data in fast storage for faster queries?",
      "options": [
        "The retention policy",
        "The update policy",
        "The sharding policy",
        "The caching (hot cache) policy"
      ],
      "correct": 3,
      "module": 7,
      "explanation": "The caching policy sets how many days of data stay in the hot cache. Retention controls when data is deleted."
    },
    {
      "id": "dp700-7-239",
      "text": "How can you reduce Eventhouse storage cost for data you rarely query?",
      "options": [
        "Disable ingestion",
        "Shorten the hot cache period and set a retention policy that matches the need",
        "Increase the hot cache to the maximum",
        "Add more materialized views"
      ],
      "correct": 1,
      "module": 7,
      "explanation": "Only hot data uses the premium cache. Retention deletes data after the period."
    },
    {
      "id": "dp700-7-240",
      "text": "Dashboards repeatedly run the same heavy aggregation on a huge table. What should you create?",
      "options": [
        "A materialized view that keeps the aggregation up to date",
        "A OneLake shortcut",
        "A second table with the same data",
        "A longer retention policy"
      ],
      "correct": 0,
      "module": 7,
      "explanation": "A materialized view precomputes the aggregate and combines it with new data at query time."
    },
    {
      "id": "dp700-7-241",
      "text": "Which Eventstream design reduces downstream cost and load?",
      "options": [
        "Filter and aggregate events in the stream before they reach the destination",
        "Send every event to every destination",
        "Increase the window to the maximum",
        "Remove all operators"
      ],
      "correct": 0,
      "module": 7,
      "explanation": "Processing in the stream sends less data to destinations and speeds up the queries on them."
    },
    {
      "id": "dp700-7-242",
      "text": "What does the ingestion batching policy control in an Eventhouse?",
      "options": [
        "The size of the hot cache",
        "The retention period",
        "How long and how much data is collected before it is committed during queued ingestion",
        "The sensitivity label"
      ],
      "correct": 2,
      "module": 7,
      "explanation": "Batching time, item count and size decide when an ingestion batch is sealed. Smaller values lower latency but make smaller extents."
    },
    {
      "id": "dp700-7-243",
      "text": "Which Fabric Spark feature uses a vectorized C++ engine to speed up supported operations without code changes?",
      "options": [
        "Dynamic data masking",
        "The native execution engine",
        "V-Order",
        "High concurrency mode"
      ],
      "correct": 1,
      "module": 7,
      "explanation": "The native execution engine runs supported Spark operators natively. You enable it with spark.native.enabled or the environment setting."
    },
    {
      "id": "dp700-7-244",
      "text": "A Spark join between a very large table and a small lookup is slow because of a shuffle. What helps?",
      "options": [
        "Repartition the large table to 1 partition",
        "Disable adaptive query execution",
        "Broadcast the small table",
        "Collect the large table"
      ],
      "correct": 2,
      "module": 7,
      "explanation": "A broadcast join sends the small table to every executor and avoids shuffling the large one."
    },
    {
      "id": "dp700-7-245",
      "text": "Which resource profile in Fabric Spark suits write-heavy ingestion workloads?",
      "options": [
        "default only",
        "readHeavyForSpark",
        "readHeavyForPBI",
        "writeHeavy"
      ],
      "correct": 3,
      "module": 7,
      "explanation": "Resource profiles preset the Spark settings for common patterns. writeHeavy targets ingestion."
    },
    {
      "id": "dp700-7-246",
      "text": "Which setting lets Spark reduce the number of shuffle partitions at runtime and handle skewed joins?",
      "options": [
        "High concurrency",
        "Shortcut caching",
        "Adaptive query execution",
        "Checkpointing"
      ],
      "correct": 2,
      "module": 7,
      "explanation": "AQE adjusts plans at runtime, coalescing partitions and splitting skewed ones."
    },
    {
      "id": "dp700-7-247",
      "text": "Which method reduces the number of partitions without a full shuffle?",
      "options": [
        "repartition",
        "groupBy",
        "distinct",
        "coalesce"
      ],
      "correct": 3,
      "module": 7,
      "explanation": "coalesce merges partitions and avoids a full shuffle. repartition shuffles all the data."
    },
    {
      "id": "dp700-7-248",
      "text": "To make a KQL query faster, which filter should come first?",
      "options": [
        "The regex filter",
        "The time filter",
        "The string contains filter",
        "The project operator"
      ],
      "correct": 1,
      "module": 7,
      "explanation": "Filter by the time column first so the engine reads only the relevant extents, then narrow with other predicates."
    },
    {
      "id": "dp700-7-249",
      "text": "Which KQL practice is recommended when a join combines a small and a large table?",
      "options": [
        "Use cross-join",
        "Put the large table on the left side",
        "Disable the hot cache",
        "Put the small table on the left side of the join"
      ],
      "correct": 3,
      "module": 7,
      "explanation": "Kusto joins perform best with the smaller table on the left. Filter both sides before the join."
    },
    {
      "id": "dp700-7-250",
      "text": "In Spark SQL, which design most helps a query that filters on one column of a large Delta table?",
      "options": [
        "Add more columns",
        "Partition or Z-order/cluster on that column so files can be skipped",
        "Use SELECT *",
        "Cache the whole table"
      ],
      "correct": 1,
      "module": 7,
      "explanation": "Data layout that matches the filter allows data skipping."
    },
    {
      "id": "dp700-7-251",
      "text": "Why does SELECT * hurt query performance on columnar Delta data?",
      "options": [
        "It blocks V-Order",
        "It forces a full row-level security check",
        "It reads every column instead of only the ones you need",
        "It disables caching"
      ],
      "correct": 2,
      "module": 7,
      "explanation": "Columnar formats read only the requested columns, so selecting fewer columns reads less data."
    },
    {
      "id": "dp700-7-252",
      "text": "Which files are not cached by the OneLake shortcut cache?",
      "options": [
        "Files larger than 1 GB",
        "Files in a subfolder",
        "Files smaller than 1 MB",
        "CSV files"
      ],
      "correct": 0,
      "module": 7,
      "explanation": "The shortcut cache skips files larger than 1 GB. It applies to external sources such as S3, GCS, S3-compatible storage and gateway shortcuts."
    },
    {
      "id": "dp700-7-253",
      "text": "What is the maximum number of items you can include in a single deployment of a deployment pipeline?",
      "options": [
        "100",
        "1,000",
        "50",
        "300"
      ],
      "correct": 3,
      "module": 7,
      "explanation": "A single deployment supports up to 300 items, so larger workspaces are deployed in several steps."
    },
    {
      "id": "dp700-7-254",
      "text": "Which PySpark call removes every row that has a null in any column?",
      "options": [
        "df.fillna(0)",
        "df.na.drop()",
        "df.distinct()",
        "df.coalesce(1)"
      ],
      "correct": 1,
      "module": 7,
      "explanation": "na.drop (dropna) removes rows with nulls. fillna replaces them, distinct removes duplicates, and coalesce changes the partition count."
    },
    {
      "id": "dp700-7-255",
      "text": "Streaming transformations must run custom Python UDFs and call an external library. Which engine fits?",
      "options": [
        "The Manage fields operator in Eventstream",
        "A KQL materialized view",
        "Spark Structured Streaming in a notebook",
        "A Dataflow Gen2"
      ],
      "correct": 2,
      "module": 7,
      "explanation": "Custom code and libraries need Spark. Eventstream operators are no-code and limited to the built-in set."
    },
    {
      "id": "dp700-7-256",
      "text": "Several applications read the same Event Hub, and the Eventstream source fails intermittently. What do you configure?",
      "options": [
        "A OneLake shortcut",
        "A dedicated consumer group for the Eventstream",
        "A longer Eventhouse retention",
        "A bigger Spark pool"
      ],
      "correct": 1,
      "module": 7,
      "explanation": "Sharing a consumer group between readers causes conflicts. Give the Eventstream its own."
    }
  ];

  if (typeof window.__dp700 === 'undefined') {
    window.__dp700 = { modules: [], questions: [] };
  }

  window.__dp700.questions = window.__dp700.questions.concat(questions);

  if (window.__dp700.modules.length < 7) {
    window.__dp700.modules[6] = "Module 7: Study Guide Coverage";
  }
})();
