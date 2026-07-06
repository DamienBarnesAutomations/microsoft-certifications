// Module 4: AI & Ontology
(function() {
  var questions = [
    {
      "id": "dp600-4-001",
      "text": "When Copilot in Power BI answers a question, it first retrieves grounding data from the semantic model. What is the purpose of this grounding step?",
      "options": [
        "To cache the user's query for performance optimization",
        "To collect contextual metadata that helps the AI interpret the question and map it to the right tables, columns, and measures",
        "To encrypt the query before sending it to Azure OpenAI",
        "To validate that the user has permission to access the data"
      ],
      "correct": 1,
      "module": 4,
      "explanation": "Grounding is the process of gathering schema metadata (table/column names, descriptions, relationships, linguistic synonyms) from the semantic model. This contextual information is added to the prompt so that Azure OpenAI can interpret the natural language question accurately and map it to the correct data elements."
    },
    {
      "id": "dp600-4-002",
      "text": "You are configuring the Prep for AI features for a semantic model. Which of the following is part of the AI data schema configuration?",
      "options": [
        "Defining DAX measures for common business calculations",
        "Hiding technical columns and tables so Copilot focuses on business-relevant data",
        "Creating verified answers for frequent questions",
        "Setting up row-level security for AI agents"
      ],
      "correct": 1,
      "module": 4,
      "explanation": "AI data schema (in Prep for AI) allows you to select which tables and columns are visible to Copilot and data agents. Hiding technical fields (like surrogate keys or ETL timestamps) reduces noise and improves accuracy. Measures, verified answers, and RLS are configured separately."
    },
    {
      "id": "dp600-4-003",
      "text": "You create a verified answer in Power BI for the question 'What were total sales last quarter?'. What happens when a user asks this question to Copilot?",
      "options": [
        "Copilot generates a new response from scratch using the semantic model",
        "Copilot returns the predefined visual and data associated with the verified answer instead of generating a response",
        "Copilot ignores the verified answer and uses the default Copilot behavior",
        "Copilot requires administrator approval before showing the verified answer"
      ],
      "correct": 1,
      "module": 4,
      "explanation": "A verified answer is a predefined response (visual + data) that Copilot returns when a user asks a matching question. It bypasses the generation step, ensuring consistency and accuracy for critical or common questions. Copilot does not generate a new answer for that trigger phrase."
    },
    {
      "id": "dp600-4-004",
      "text": "You need to help Copilot understand that 'turnover' and 'income' are synonyms for the 'Revenue' measure in your model. Which feature should you configure?",
      "options": [
        "AI instructions in the Prep for AI settings",
        "Linguistic modeling through Q&A setup to add synonyms",
        "Verified answers with trigger phrases",
        "The model's description field in Power BI Desktop"
      ],
      "correct": 1,
      "module": 4,
      "explanation": "Linguistic modeling (configured in Q&A Setup) allows you to define synonyms for terms (e.g., 'turnover' â†’ 'Revenue') and linguistic relationships. This teaches Copilot (and Q&A) the business vocabulary. AI instructions are for broader business rules, verified answers are for specific Q&A pairs, and descriptions provide context but not synonym mapping."
    },
    {
      "id": "dp600-4-005",
      "text": "You want to generate an ontology from an existing Power BI semantic model. Which storage mode must the semantic model use for data bindings to be created during ontology generation?",
      "options": [
        "Import mode",
        "DirectQuery mode",
        "Direct Lake mode with inbound public access enabled",
        "Composite mode"
      ],
      "correct": 2,
      "module": 4,
      "explanation": "Full automated ontology generation, including data bindings to OneLake sources, requires the semantic model to be in Direct Lake mode and have inbound public access enabled (so Fabric IQ can read the mapping). Import and DirectQuery models do not support automatic binding creation; Composite mode may not fully support the feature."
    },
    {
      "id": "dp600-4-006",
      "text": "A data agent is configured with a lakehouse, a warehouse, and a Power BI semantic model as data sources. When a user asks a question, how does the data agent determine which query language to generate?",
      "options": [
        "It always uses SQL regardless of the data source",
        "It generates SQL for lakehouses/warehouses, DAX for semantic models, and KQL for KQL databases based on the identified relevant source",
        "It requires the user to specify the query language in their question",
        "It uses a generic REST API call to all data sources simultaneously"
      ],
      "correct": 1,
      "module": 4,
      "explanation": "The data agent analyzes the question and identifies which data source(s) contain the relevant information. It then generates the appropriate query language: SQL for lakehouses/warehouses, DAX for semantic models, and KQL for KQL databases. The user does not need to specify the language."
    },
    {
      "id": "dp600-4-007",
      "text": "You have a semantic model with complex DAX patterns and duplicate field names across tables. How does this affect Copilot's ability to answer questions?",
      "options": [
        "Copilot automatically resolves ambiguities using machine learning",
        "Complex patterns and duplicate names increase the chance of misinterpretation because Copilot relies on clear metadata and unambiguous field names",
        "Copilot ignores duplicate fields and only uses uniquely named columns",
        "Complex DAX patterns improve Copilot accuracy because they provide more context"
      ],
      "correct": 1,
      "module": 4,
      "explanation": "Copilot depends on clear, unambiguous metadata (table/column names, descriptions, relationships). Duplicate field names and overly complex DAX patterns create ambiguity, increasing the risk of misinterpretation. It cannot automatically resolve these; the model must be designed with AIâ€‘ready naming and structure."
    },
    {
      "id": "dp600-4-008",
      "text": "You mark a semantic model as 'Approved for Copilot' in the Power BI service. What is the effect on standalone Copilot responses generated from that model?",
      "options": [
        "Copilot will only answer questions about that model and ignore all others",
        "The standalone Copilot experience removes friction treatment such as warning banners from answers generated using that model",
        "Copilot performance is automatically optimized for that model",
        "The model is automatically promoted in the OneLake catalog"
      ],
      "correct": 1,
      "module": 4,
      "explanation": "The 'Approved for Copilot' setting is a governance gate that tells Copilot that the model has been reviewed and is ready for AI consumption. When this is enabled, Copilot will suppress frictionâ€‘treatment banners (like 'This response was generated by AI') for answers derived from that model, providing a cleaner user experience."
    },
    {
      "id": "dp600-4-009",
      "text": "You are designing gold layer tables for AI consumption. Which of the following practices is MOST important for helping Copilot interpret your data correctly?",
      "options": [
        "Use technical prefixes like fact_ and dim_ in all table names",
        "Use business-friendly table names like Customers and Sales Transactions instead of technical abbreviations",
        "Include as many columns as possible to give Copilot more options",
        "Hide all relationships in the semantic model to simplify the schema"
      ],
      "correct": 1,
      "module": 4,
      "explanation": "Copilot relies on the names of tables and columns to understand their meaning. Using clear, businessâ€‘friendly names (e.g., 'Customers' instead of 'dim_cust_v2') drastically improves the accuracy of natural language interpretation. Technical prefixes and excessive columns add noise; hiding relationships breaks model navigation."
    },
    {
      "id": "dp600-4-010",
      "text": "In Fabric IQ, what is the relationship between the ontology and Graph in Microsoft Fabric?",
      "options": [
        "Graph is a separate system that requires manual data synchronization with the ontology",
        "When you create an ontology item, a managed graph is automatically created from the ontology's entity types and relationships",
        "Graph replaces the need for ontologies in Fabric IQ",
        "The ontology and Graph operate on different data sources and cannot share data"
      ],
      "correct": 1,
      "module": 4,
      "explanation": "When you create an ontology item in Fabric IQ, a managed graph (labeled property graph) is automatically generated from the entity types and relationship types defined in the ontology. The graph is the physical representation that can be queried using GQL. They are tightly coupled, not separate systems."
    },
    {
      "id": "dp600-4-011",
      "text": "You write an AI instruction for your semantic model: 'When users ask about revenue, use the Revenue (USD) measure, not the Revenue (local currency) measure.' What is the purpose of this instruction?",
      "options": [
        "To set row-level security rules for AI agents",
        "To guide Copilot to the correct measure when users ask about revenue, reducing ambiguity",
        "To create a verified answer for the revenue question",
        "To configure linguistic modeling synonyms for the revenue measure"
      ],
      "correct": 1,
      "module": 4,
      "explanation": "AI instructions are freeâ€‘form text that provide Copilot with business rules, preferred measures, and disambiguation guidance. This instruction explicitly tells Copilot to use the USD measure when users ask about 'revenue', reducing the chance of picking the wrong measure. It does not affect security or verified answers."
    },
    {
      "id": "dp600-4-012",
      "text": "You are testing your semantic model with the Copilot pane in Power BI Desktop. Which skill picker option should you enable to simulate the standalone Copilot experience?",
      "options": [
        "Enable all three capabilities: Answer questions, Analyze report visuals, and Create new report pages",
        "Enable only 'Answer questions about the data'",
        "Enable only 'Analyze report visuals'",
        "Disable the skill picker entirely"
      ],
      "correct": 1,
      "module": 4,
      "explanation": "The standalone Copilot experience (e.g., in Fabric portal or Power BI service) focuses on answering natural language questions about the data â€“ not on analyzing visuals or creating pages. To simulate that, enable only 'Answer questions about the data'. The other skills are specific to the report authoring experience."
    },
    {
      "id": "dp600-4-013",
      "text": "You generate an ontology from a Power BI semantic model. After generation, you notice that entity type keys are not configured for some entity types. What must you do?",
      "options": [
        "Regenerate the ontology with a different semantic model",
        "Manually add entity type keys by selecting properties that uniquely identify each instance",
        "Keys are optional and the ontology will work without them",
        "Contact Microsoft support to fix the generation process"
      ],
      "correct": 1,
      "module": 4,
      "explanation": "Entity type keys (one or more properties that uniquely identify an instance) are required before an entity can be bound to data. The automatic generation may not always infer the correct key. You must manually edit the ontology and designate the appropriate properties as keys (e.g., CustomerID)."
    },
    {
      "id": "dp600-4-014",
      "text": "In Fabric IQ, what are the two types of data bindings that connect entity properties to data sources?",
      "options": [
        "SQL bindings and DAX bindings",
        "Static bindings for lakehouse tables and time series bindings for eventhouse streams",
        "Import bindings and DirectQuery bindings",
        "Schema bindings and semantic bindings"
      ],
      "correct": 1,
      "module": 4,
      "explanation": "Fabric IQ supports two binding types: static bindings (connect to lakehouse tables for infrequently changing data) and time series bindings (connect to eventhouse/KQL tables for streaming, timestamped observations). The other options refer to Power BI storage modes or unrelated concepts."
    },
    {
      "id": "dp600-4-015",
      "text": "A Copilot-generated answer is incorrect. You use the 'How Copilot arrived at this' diagnostic feature. It shows Copilot used the wrong measure. Which of the following would MOST likely resolve this?",
      "options": [
        "Adding more tables to the semantic model",
        "Improving measure descriptions and potentially adding a verified answer for that question pattern",
        "Increasing the capacity assigned to the workspace",
        "Converting the semantic model to Import mode"
      ],
      "correct": 1,
      "module": 4,
      "explanation": "Copilot relies on measure descriptions and grounding metadata. If it picked the wrong measure, adding or improving descriptions (e.g., 'Total Sales (USD) â€“ use this for revenue') will guide it. A verified answer directly maps the question to the correct measure. Adding tables or changing capacity/mode does not address the semantic ambiguity."
    },
    {
      "id": "dp600-4-016",
      "text": "Which three intelligence layers across the Microsoft ecosystem does your semantic model work connect to for AI?",
      "options": [
        "Azure ML, Azure Cognitive Services, and Azure OpenAI",
        "Fabric IQ, Foundry IQ, and Work IQ",
        "Power BI, Excel, and Teams",
        "OneLake, Data Factory, and Data Science"
      ],
      "correct": 1,
      "module": 4,
      "explanation": "The semantic model connects to the three IQ workloads: Fabric IQ (ontology & graph), Foundry IQ (enterprise knowledge), and Work IQ (collaboration signals). These provide the AIâ€‘ready business vocabulary and context. The other options are Azure AI services or Fabric components, not the three IQ layers."
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

