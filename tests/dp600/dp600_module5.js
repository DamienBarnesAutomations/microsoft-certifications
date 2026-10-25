// Module 5: Security & Governance
(function() {
  var questions = [
    {
      "id": "dp600-5-001",
      "text": "Fabric evaluates data access sequentially across three levels. What is the correct order of evaluation?",
      "options": [
        "Data security, Fabric access, Microsoft Entra ID authentication",
        "Fabric access, Microsoft Entra ID authentication, Data security",
        "Microsoft Entra ID authentication, Fabric access, Data security",
        "Microsoft Entra ID authentication, Data security, Fabric access"
      ],
      "correct": 2,
      "module": 5,
      "explanation": "Access is evaluated in this order: (1) Microsoft Entra ID authentication – can the user authenticate? (2) Fabric access – is Fabric enabled for the tenant and user? (3) Data security – workspace roles, item permissions, compute permissions, OneLake security. Each level must be satisfied."
    },
    {
      "id": "dp600-5-002",
      "text": "You share a lakehouse with a user and grant the 'Read all Apache Spark and subscribe to events' permission. What OneLake security role is the user automatically added to?",
      "options": [
        "DefaultReader",
        "AdminReader",
        "SubscribeReaderForSparkEvents",
        "SparkReaderWithEvents"
      ],
      "correct": 0,
      "module": 5,
      "explanation": "Every lakehouse has an auto-created DefaultReader role. When you grant 'Read all Apache Spark and subscribe to events' item permission, the user is automatically added to DefaultReader. This role gives them read access to all tables and files in the lakehouse via Spark and OneLake APIs."
    },
    {
      "id": "dp600-5-003",
      "text": "You need to mask a column containing credit card numbers so that nonprivileged users see 'XXXX-XXXX-XXXX-3456' instead of the full number. Which Dynamic Data Masking function should you use?",
      "options": [
        "partial(0, 'XXXX-XXXX-XXXX-', 4)",
        "random(1, 9999), which replaces the value with a random number in the range",
        "default(), which replaces the entire value with a fixed mask",
        "email(), which exposes the first letter of the value and masks the rest as an email"
      ],
      "correct": 0,
      "module": 5,
      "explanation": "The partial(prefix_length, 'padding', suffix_length) function exposes a prefix and suffix and replaces the middle with the padding string. partial(0, 'XXXX-XXXX-XXXX-', 4) shows no prefix characters, the padding string, then the last 4 characters of the value. default() masks the whole value, email() is for email addresses, and random() is for numeric types."
    },
    {
      "id": "dp600-5-004",
      "text": "You implement Row-Level Security using a filter predicate. Which operations are affected when the predicate returns false for a row?",
      "options": [
        "SELECT, UPDATE, and DELETE are filtered; INSERT is not",
        "All operations including INSERT are blocked whenever the predicate returns false",
        "Only SELECT operations are filtered, while UPDATE and DELETE are unaffected by the predicate",
        "Only SELECT and DELETE are filtered, while UPDATE is still allowed on every row"
      ],
      "correct": 0,
      "module": 5,
      "explanation": "A row-level security filter predicate silently filters rows for SELECT, UPDATE, and DELETE. INSERT is not affected by a filter predicate; blocking writes requires a block predicate."
    },
    {
      "id": "dp600-5-005",
      "text": "Only Doctors and Nurses may query the MedicalHistory column of a Patients table. All other users must be prevented from reading it at all, not just see obfuscated values. Which approach should you use?",
      "options": [
        "Apply Dynamic Data Masking with default() to the MedicalHistory column",
        "Add a row-level security filter predicate on the Patients table",
        "DENY SELECT on the MedicalHistory column for the other roles",
        "Hide the MedicalHistory column in the semantic model"
      ],
      "correct": 2,
      "module": 5,
      "explanation": "Column-level security uses DENY SELECT ON table(column) so unauthorized principals get a permission error for that column. Dynamic Data Masking only obfuscates values (users can still select the column), hiding in a semantic model does not protect the warehouse, and RLS filters rows, not columns."
    },
    {
      "id": "dp600-5-006",
      "text": "A sensitivity label is applied to a lakehouse. A data engineer creates a semantic model from that lakehouse. What happens to the sensitivity label?",
      "options": [
        "The label must be applied manually to the new semantic model before it is shared",
        "The label only applies to the lakehouse and has no effect on any downstream items",
        "The label is removed because semantic models do not support sensitivity labels at all",
        "The label propagates automatically to the downstream semantic model through inheritance"
      ],
      "correct": 3,
      "module": 5,
      "explanation": "Sensitivity labels automatically propagate downstream from source items to derived items. A label applied to a lakehouse will be inherited by any semantic model created from that lakehouse (and further to reports). This ensures consistent classification across the data chain."
    },
    {
      "id": "dp600-5-007",
      "text": "Which endorsement level can be applied only to data items like lakehouses and semantic models (not reports or notebooks)?",
      "options": [
        "Master data",
        "Promoted",
        "Approved",
        "Certified"
      ],
      "correct": 0,
      "module": 5,
      "explanation": "Master data endorsement is specifically for data items (lakehouses, semantic models) that represent the authoritative source of truth for core business entities. Promoted and Certified can be applied to reports and notebooks as well. 'Approved' is not an endorsement level (it is related to Copilot settings)."
    },
    {
      "id": "dp600-5-008",
      "text": "You need Microsoft Purview to scan and catalog items in your Fabric tenant. Which step is required?",
      "options": [
        "Create a Purview workspace in Fabric and assign it to a Fabric capacity",
        "Export the Fabric items as CSV files and import them into the Purview catalog",
        "Install a Purview gateway inside the Fabric tenant and sign in with an administrator",
        "Register the Fabric tenant as a data source in the Purview Data Map and run a scan"
      ],
      "correct": 3,
      "module": 5,
      "explanation": "Purview scans Fabric by registering the Fabric tenant as a data source in the Data Map, configuring authentication (for example a managed identity), and running a scan. There is no Purview gateway or Purview workspace inside Fabric."
    },
    {
      "id": "dp600-5-009",
      "text": "You have an OneLake security role that grants Read access to specific tables. A user is also in the DefaultReader role. What access does the user have?",
      "options": [
        "Only the tables specified in the custom role, because custom roles take precedence over defaults",
        "Read access to all tables through DefaultReader",
        "ReadWrite access to the tables listed in the custom role",
        "No access at all because the two roles conflict with each other"
      ],
      "correct": 1,
      "module": 5,
      "explanation": "Access from OneLake security roles is additive. If a user is in DefaultReader (which grants read access to all tables), they have full read access regardless of any custom role that tries to restrict them. To enforce a restricted role, you must remove the user from DefaultReader."
    },
    {
      "id": "dp600-5-010",
      "text": "You need to create an OneLake security role that allows a user to read data from specific tables but also apply a row filter so they only see rows for their region. Which components must the role include?",
      "options": [
        "Data (tables) and Members (users), with the row filter applied in the semantic model",
        "Data (tables), Permission (Read), Members (users), and Constraints (row filter)",
        "Data (tables), Permission (Read), and a T-SQL security policy attached to the lakehouse",
        "Data (tables), Permission (ReadWrite), Members (users), and a DENY predicate for other regions"
      ],
      "correct": 1,
      "module": 5,
      "explanation": "An OneLake security role consists of four components: Data (which tables/folders), Permission (Read or ReadWrite), Members (users/groups), and Constraints (optional row- or column-filters). To restrict to specific rows, you must include a constraint (row filter) as part of the role definition."
    },
    {
      "id": "dp600-5-011",
      "text": "The OneLake catalog has a Govern tab. What is its primary purpose?",
      "options": [
        "To view governance posture for owned data and see recommended actions for improvement",
        "To browse and discover data items across the organization",
        "To manage security roles for all lakehouses",
        "To configure sensitivity labels for the entire tenant"
      ],
      "correct": 0,
      "module": 5,
      "explanation": "The Govern tab in the OneLake catalog provides a governance dashboard for data owners. It shows the governance posture (e.g., items missing sensitivity labels, endorsement status) and recommends actions to improve compliance and discoverability. It is not for general browsing (Explore tab) nor for role management."
    },
    {
      "id": "dp600-5-012",
      "text": "You apply a sensitivity label with a Purview protection policy to a semantic model. A user without the correct security group membership tries to open the model. What happens?",
      "options": [
        "The user sees a warning message but can still proceed to open the model",
        "The user can view the model metadata but cannot open the data itself",
        "The user is blocked from accessing the item entirely",
        "The sensitivity label is ignored for any user who already has workspace access"
      ],
      "correct": 2,
      "module": 5,
      "explanation": "A sensitivity label with an Information Rights Management (IRM) protection policy enforces access control. If the user is not in the authorized security group defined in the Purview protection policy, they are completely blocked from accessing the item – they cannot even see its metadata or open it."
    },
    {
      "id": "dp600-5-013",
      "text": "A user must create and edit items and run pipelines in a workspace, but must not be able to share items or manage workspace access. Which workspace role is the best fit?",
      "options": [
        "Viewer",
        "Member",
        "Admin",
        "Contributor"
      ],
      "correct": 3,
      "module": 5,
      "explanation": "Contributor can create, edit, and delete content and run pipelines but cannot share items or manage access. Viewer is read-only, Member can also share items and add users with lower roles, and Admin has full control including role management."
    },
    {
      "id": "dp600-5-014",
      "text": "You export a report from Power BI Desktop that contains items with a sensitivity label. The exported file is a .pbix file. What happens to the sensitivity label?",
      "options": [
        "The label only applies within the Fabric portal and does not follow exports",
        "The label and its protections travel with the .pbix file",
        "The label is stripped from the exported file",
        "The label is converted to a general tag in the file properties"
      ],
      "correct": 1,
      "module": 5,
      "explanation": "When you export a report as a .pbix file, any sensitivity labels applied to the semantic model or report are preserved, including protection policies (e.g., IRM encryption). The label travels with the file and is enforced when the .pbix is opened in Power BI Desktop."
    },
    {
      "id": "dp600-5-015",
      "text": "You need new Fabric items to automatically receive a baseline sensitivity label when the creator does not apply one. Where do you configure this?",
      "options": [
        "The Mandatory labeling toggle that is configured separately for each Fabric item type",
        "A default label in a Purview sensitivity label policy",
        "Endorsement auto-assignment configured in the Fabric admin portal tenant settings",
        "Sensitivity label inheritance from the workspace to every item created inside it"
      ],
      "correct": 1,
      "module": 5,
      "explanation": "A default sensitivity label is set in the Microsoft Purview sensitivity label policy (the policy setting that applies a default label to Power BI/Fabric content). The Fabric tenant setting only turns on sensitivity labels for Fabric. Endorsement is unrelated, and workspaces do not pass labels to items."
    },
    {
      "id": "dp600-5-016",
      "text": "You need row-level security on a semantic model so that regional managers see only sales for their region. The DimRegion table has a ManagerEmail column. Which DAX filter expression should you use in the role on DimRegion?",
      "options": [
        "[Region] = LOOKUPVALUE(Users[Region], Users[Email], USERPRINCIPALNAME())",
        "[Region] = USERPRINCIPALNAME()",
        "[Region] = USERNAME()",
        "[ManagerEmail] = USERPRINCIPALNAME()"
      ],
      "correct": 3,
      "module": 5,
      "explanation": "In a semantic model RLS role, a DAX filter on DimRegion comparing ManagerEmail to USERPRINCIPALNAME() returns only the regions the signed-in manager owns; the relationship then filters the sales table. Comparing Region to a user name is wrong, and LOOKUPVALUE against a separate Users table is unnecessary here."
    },
    {
      "id": "dp600-5-017",
      "text": "You have a Fabric warehouse. A user with only the Viewer workspace role must read the Employees table but be denied the sensitive Salary column. Which security feature should you implement?",
      "options": [
        "Object-level security that hides the entire Employees table",
        "Column-level security using DENY SELECT on the Salary column",
        "Dynamic Data Masking with the partial() function on the Salary column",
        "Row-level security with a filter predicate on the Salary column"
      ],
      "correct": 1,
      "module": 5,
      "explanation": "Column-level security with DENY SELECT ON Employees(Salary) blocks that column while allowing the rest of the table. Note that object-level T-SQL permissions are enforced for Viewer, but Admin, Member, and Contributor roles bypass them. RLS filters rows, DDM only masks, and hiding the whole table is too broad."
    },
    {
      "id": "dp600-5-018",
      "text": "You have a Fabric warehouse. You need to implement column-level security to prevent a group of users from viewing the EmployeeSSN column. Which T-SQL statement should you execute?",
      "options": [
        "DENY SELECT ON Employees(EmployeeSSN) TO [SecurityGroup]",
        "CREATE SECURITY POLICY SSNFilter ADD FILTER PREDICATE",
        "ALTER TABLE Employees SET (RESULT_SET_CACHING = OFF)",
        "ALTER COLUMN Employees.EmployeeSSN SET SECURITY POLICY"
      ],
      "correct": 0,
      "module": 5,
      "explanation": "Column-Level Security in T-SQL is implemented using DENY SELECT ON table(column) TO role/user. The syntax DENY SELECT ON Employees(EmployeeSSN) TO [SecurityGroup] is correct. Security policies are for RLS, not column masking."
    },
    {
      "id": "dp600-5-019",
      "text": "You have a Fabric warehouse. A user with the Member workspace role needs to grant a service principal access to read data from a specific table. Which permission should the user grant?",
      "options": [
        "CREATE ROLE CustomRole ADD MEMBER ServicePrincipal",
        "ALTER TABLE TableName ADD CONSTRAINT",
        "DENY SELECT ON TableName TO [Public]",
        "GRANT SELECT ON TableName TO [ServicePrincipal]"
      ],
      "correct": 3,
      "module": 5,
      "explanation": "The Member role has permission to grant object-level permissions using T-SQL GRANT. The correct syntax is GRANT SELECT ON TableName TO [ServicePrincipal] (or the principal's name). The other options are not valid for granting SELECT access."
    },
    {
      "id": "dp600-5-020",
      "text": "A Fabric warehouse column is protected with Dynamic Data Masking. A data analyst must see the real, unmasked values. What should you do?",
      "options": [
        "Grant VIEW DEFINITION on the table to the analyst",
        "Grant ALTER ANY MASK on the table to the analyst",
        "Grant the UNMASK permission to the analyst",
        "Add the analyst to the db_datareader role"
      ],
      "correct": 2,
      "module": 5,
      "explanation": "Users see masked values unless they are granted the UNMASK permission (or are workspace Admin, Member, or Contributor). VIEW DEFINITION exposes metadata only, db_datareader does not bypass masks, and ALTER ANY MASK lets someone manage masks rather than view unmasked data."
    },
    {
      "id": "dp600-5-021",
      "text": "You have a Fabric warehouse. You need to create a view that combines data from multiple tables and applies row-level security. Which approach should you use?",
      "options": [
        "Create a view with a WHERE clause that filters based on the current user",
        "Create a view and use dynamic data masking to restrict access",
        "Create a view and apply RLS separately using security policies",
        "Create a stored procedure that returns filtered data based on the user"
      ],
      "correct": 2,
      "module": 5,
      "explanation": "The best practice is to create a view that combines the data (without user-specific WHERE clauses), and then apply Row-Level Security (RLS) security policies on the underlying tables or on the view itself. Hard-coding user filtering in the view would require modifying the view for each user, which is not scalable. Security policies provide dynamic, maintainable RLS."
    },
    {
      "id": "dp600-5-022",
      "text": "A postal code column in a Fabric warehouse must be masked so that only the first 2 characters are visible, followed by 'XXXX'. Which Dynamic Data Masking function should you use?",
      "options": [
        "email(), which exposes the first letter and masks the rest as an email address",
        "partial(2, 'XXXX', 0)",
        "random(1, 100), which replaces the value with a random number in the range",
        "default(), which replaces the entire value with the data type's default mask"
      ],
      "correct": 1,
      "module": 5,
      "explanation": "partial(prefix_length, 'padding', suffix_length) exposes the first 2 characters, appends the padding 'XXXX', and exposes 0 trailing characters. default() masks the whole value, email() is for email addresses, and random() applies to numeric types."
    }
  ];
  
  if (typeof window.__dp600 === 'undefined') {
    window.__dp600 = { modules: [], questions: [] };
  }
  
  window.__dp600.questions = window.__dp600.questions.concat(questions);
  
  if (window.__dp600.modules.length < 5) {
    window.__dp600.modules[4] = "Module 5: Security & Governance";
  }
})();

