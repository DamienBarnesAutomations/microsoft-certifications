// Module 4: AI & Ontology
(function() {
  var questions = [
    {
      "id": "dp600-4-001",
      "text": "When Copilot in Power BI answers a question, it first retrieves grounding data from the semantic model. What is the purpose of this grounding step?",
      "options": [
        "To encrypt the query before it is sent to the Azure OpenAI service",
        "To cache the user's query so repeated questions return faster",
        "To validate that the user has permission to access the underlying data",
        "To collect contextual metadata that helps the AI interpret the question and map it to the right tables, columns, and measures"
      ],
      "correct": 3,
      "module": 4,
      "explanation": "Grounding is the process of gathering schema metadata (table/column names, descriptions, relationships, linguistic synonyms) from the semantic model. This context is added to the prompt so that the language model can interpret the natural language question accurately and map it to the correct data elements."
    },
    {
      "id": "dp600-4-002",
      "text": "You are configuring the Prep data for AI features for a semantic model. Which of the following is part of the AI data schema configuration?",
      "options": [
        "Defining DAX measures that encode common business calculations for Copilot",
        "Configuring row-level security roles for the AI agents that query the model",
        "Creating verified answers with trigger phrases for frequently asked questions",
        "Choosing which tables and columns Copilot can use"
      ],
      "correct": 3,
      "module": 4,
      "explanation": "The AI data schema lets you select which tables and columns are visible to Copilot. Excluding technical fields (such as surrogate keys or ETL timestamps) reduces noise and improves accuracy. Measures, verified answers, and RLS are configured separately."
    },
    {
      "id": "dp600-4-003",
      "text": "You create a verified answer in Power BI for the question 'What were total sales last quarter?'. What happens when a user asks this question to Copilot?",
      "options": [
        "Copilot ignores the verified answer and uses its default behavior",
        "Copilot asks an administrator to approve the verified answer before showing it",
        "Copilot generates a new response from scratch using the semantic model",
        "Copilot returns the predefined visual associated with the verified answer instead of generating a new response"
      ],
      "correct": 3,
      "module": 4,
      "explanation": "A verified answer is a predefined response (a visual saved on the semantic model) that Copilot returns when a user asks a question matching one of its trigger phrases. It ensures consistency and accuracy for critical or common questions."
    },
    {
      "id": "dp600-4-004",
      "text": "You need to help Copilot understand that 'turnover' and 'income' are synonyms for the 'Revenue' measure in your model. Which feature should you configure?",
      "options": [
        "AI instructions with broader business rules in the Prep data for AI settings",
        "Verified answers with trigger phrases for each synonym",
        "Synonyms through linguistic modeling in Q&A setup",
        "The description field on the semantic model in Power BI Desktop"
      ],
      "correct": 2,
      "module": 4,
      "explanation": "Linguistic modeling (Q&A setup) lets you define synonyms for terms (for example 'turnover' for 'Revenue'). AI instructions are for broader business rules, verified answers are for specific question-to-visual pairs, and descriptions provide context but not synonym mapping."
    },
    {
      "id": "dp600-4-005",
      "text": "You want to generate an ontology from an existing Power BI semantic model so that data bindings to OneLake tables are created automatically. Which storage mode should the semantic model use?",
      "options": [
        "DirectQuery mode, because queries run against the source",
        "Composite mode combining Import and DirectQuery tables",
        "Direct Lake mode over OneLake tables",
        "Import mode, because the data is cached inside the model"
      ],
      "correct": 2,
      "module": 4,
      "explanation": "Generating an ontology from a semantic model creates entity types, properties, relationships and data bindings to the lakehouse tables behind a Direct Lake model. Entity type keys and time series bindings still need manual configuration afterwards."
    },
    {
      "id": "dp600-4-006",
      "text": "A data agent is configured with a lakehouse, a warehouse, and a Power BI semantic model as data sources. When a user asks a question, how does the data agent determine which query language to generate?",
      "options": [
        "It requires the user to state the query language in their question",
        "It generates SQL for lakehouses and warehouses, DAX for semantic models, and KQL for KQL databases based on the identified relevant source",
        "It sends one generic REST call to every data source at the same time",
        "It always uses SQL regardless of the data source"
      ],
      "correct": 1,
      "module": 4,
      "explanation": "The data agent identifies which data source holds the relevant information and generates the matching query language: SQL for lakehouses/warehouses, DAX for semantic models, and KQL for KQL databases. The user does not need to specify it."
    },
    {
      "id": "dp600-4-007",
      "text": "You have a semantic model with complex DAX patterns and duplicate field names across tables. How does this affect Copilot's ability to answer questions?",
      "options": [
        "Ambiguous names raise the risk of misinterpretation",
        "Copilot automatically resolves ambiguities using machine learning, so no changes are needed",
        "Complex DAX patterns improve Copilot accuracy because they give it more context to use",
        "Copilot ignores duplicate fields and only uses columns that have unique names in the model"
      ],
      "correct": 0,
      "module": 4,
      "explanation": "Copilot depends on clear, unambiguous metadata (table/column names, descriptions, relationships). Duplicate field names and overly complex patterns create ambiguity, so the model should be designed with AI-ready naming and structure."
    },
    {
      "id": "dp600-4-008",
      "text": "You mark a semantic model as 'Approved for Copilot' in the Power BI service. What is the effect on answers in the standalone Copilot experience?",
      "options": [
        "Copilot answers only questions about that model and ignores every other semantic model in the tenant",
        "Copilot query performance is automatically optimized and cached for that specific model",
        "The model is automatically promoted to the Certified endorsement level in the OneLake catalog",
        "The standalone Copilot applies no friction treatment to its answers"
      ],
      "correct": 3,
      "module": 4,
      "explanation": "Marking a model Approved for Copilot signals that it has been prepared and reviewed. The standalone Copilot then applies no friction treatment to answers from that model, and reports built on it are also considered approved. It does not change performance or endorsement."
    },
    {
      "id": "dp600-4-009",
      "text": "You are designing gold layer tables for AI consumption. Which of the following practices is MOST important for helping Copilot interpret your data correctly?",
      "options": [
        "Include every available column so that Copilot has more options to choose from",
        "Use business-friendly names such as Customers instead of dim_cust_v2",
        "Hide all relationships in the semantic model to simplify the schema",
        "Use technical prefixes such as fact_ and dim_ in every table name"
      ],
      "correct": 1,
      "module": 4,
      "explanation": "Copilot relies on table and column names to understand meaning. Clear business-friendly names improve the accuracy of natural language interpretation. Technical prefixes and excessive columns add noise; hiding relationships breaks model navigation."
    },
    {
      "id": "dp600-4-010",
      "text": "In Fabric IQ, what is the relationship between the ontology and Graph in Microsoft Fabric?",
      "options": [
        "Graph replaces the need for ontologies in Fabric IQ",
        "When you create an ontology item, a managed graph is automatically created from the ontology's entity types and relationships",
        "The ontology and Graph use different data sources and cannot share data",
        "Graph is a separate system that needs manual data synchronization with the ontology"
      ],
      "correct": 1,
      "module": 4,
      "explanation": "Creating an ontology item generates a managed graph (labeled property graph) from its entity types and relationship types. The graph can be queried with GQL. The two are tightly coupled, not separate systems."
    },
    {
      "id": "dp600-4-011",
      "text": "You write an AI instruction for your semantic model: 'When users ask about revenue, use the Revenue (USD) measure, not the Revenue (local currency) measure.' What is the purpose of this instruction?",
      "options": [
        "To steer Copilot to the right measure",
        "To create a verified answer that returns a saved visual for the revenue question",
        "To configure linguistic modeling synonyms that map terms to the revenue measure",
        "To define row-level security rules that restrict which measures AI agents can read"
      ],
      "correct": 0,
      "module": 4,
      "explanation": "AI instructions are free-form text giving Copilot business rules, preferred measures, and disambiguation guidance. This one tells Copilot which revenue measure to use. It does not affect security, verified answers, or synonyms."
    },
    {
      "id": "dp600-4-012",
      "text": "You are testing your semantic model with the Copilot pane in Power BI Desktop. Which skill picker option should you enable to simulate the standalone Copilot experience?",
      "options": [
        "Only 'Create new report pages', which generates pages from prompts",
        "Only 'Answer questions about the data'",
        "Only 'Analyze report visuals', which interprets the visuals in a report",
        "All three capabilities: Answer questions, Analyze report visuals, and Create new report pages"
      ],
      "correct": 1,
      "module": 4,
      "explanation": "To simulate the standalone Copilot experience (Home), select only 'Answer questions about the data'. Report pane read mode uses answer questions plus analyze visuals; edit mode enables all three."
    },
    {
      "id": "dp600-4-013",
      "text": "You generate an ontology from a Power BI semantic model. After generation, you notice that entity type keys are not configured for some entity types. What must you do?",
      "options": [
        "Manually set the keys on those entity types",
        "Regenerate the ontology from a different semantic model that already defines unique keys",
        "Nothing, because keys are optional and the ontology works fully without them",
        "Contact Microsoft support so that the generation process can be repaired for your tenant"
      ],
      "correct": 0,
      "module": 4,
      "explanation": "Entity type keys (one or more properties that uniquely identify an instance) are required before an entity can be bound to data. Generation may not infer the correct key, so you designate the appropriate properties (for example CustomerID) manually."
    },
    {
      "id": "dp600-4-014",
      "text": "In Fabric IQ, what are the two types of data bindings that connect entity properties to data sources?",
      "options": [
        "Schema bindings that map columns to properties and semantic bindings that map their business meaning",
        "SQL bindings that query lakehouse tables and DAX bindings that query semantic models",
        "Static bindings and time series bindings",
        "Import bindings that cache data in the model and DirectQuery bindings that query it live"
      ],
      "correct": 2,
      "module": 4,
      "explanation": "Fabric IQ supports static bindings (lakehouse tables, for slowly changing data) and time series bindings (eventhouse/KQL tables, for streaming timestamped observations). The other options mix in Power BI storage modes or unrelated concepts."
    },
    {
      "id": "dp600-4-015",
      "text": "A Copilot-generated answer is incorrect. You use the 'How Copilot arrived at this' diagnostic feature and it shows Copilot used the wrong measure. Which action would MOST likely resolve this?",
      "options": [
        "Improve measure descriptions and add a verified answer",
        "Convert the semantic model to Import mode so that Copilot can cache the results",
        "Increase the capacity assigned to the workspace that hosts the semantic model",
        "Add more tables to the semantic model so that Copilot has more context to choose from"
      ],
      "correct": 0,
      "module": 4,
      "explanation": "Copilot relies on measure descriptions and grounding metadata. Clearer descriptions guide it to the right measure, and a verified answer maps the question directly to the correct visual. More tables, capacity, or storage mode changes do not address the ambiguity."
    },
    {
      "id": "dp600-4-016",
      "text": "You want a Fabric data agent to generate correct SQL for a lakehouse by learning from sample question and query pairs. What should you add to the data agent configuration?",
      "options": [
        "Sensitivity labels on the lakehouse tables to guide query generation",
        "Linguistic synonyms defined in Q&A setup of a semantic model",
        "Example queries for the lakehouse data source",
        "Verified answers with trigger phrases, as used by Copilot in Power BI reports"
      ],
      "correct": 2,
      "module": 4,
      "explanation": "A data agent can be tuned with agent instructions, data source instructions, and example queries (question and SQL/KQL pairs) that act as few-shot examples for query generation. Verified answers and linguistic synonyms belong to Copilot and semantic models, and sensitivity labels do not guide query generation."
    }
  ];
  
  if (typeof window.__dp600 === 'undefined') {
    window.__dp600 = { modules: [], questions: [] };
  }
  
  window.__dp600.questions = window.__dp600.questions.concat(questions);
  
  if (window.__dp600.modules.length < 4) {
    window.__dp600.modules[3] = "Module 4: AI & Ontology";
  }
})();

