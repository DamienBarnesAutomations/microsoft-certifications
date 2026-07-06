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
      "explanation": "Access is evaluated in this order: (1) Microsoft Entra ID authentication â€“ can the user authenticate? (2) Fabric access â€“ is Fabric enabled for the tenant and user? (3) Data security â€“ workspace roles, item permissions, compute permissions, OneLake security. Each level must be satisfied."
    },
    {
      "id": "dp600-5-002",
      "text": "You share a lakehouse with a user and grant the 'Read all Apache Spark and subscribe to events' permission. What OneLake security role is the user automatically added to?",
      "options": [
        "AdminReader",
        "DefaultReader",
        "SparkReader",
        "DataContributor"
      ],
      "correct": 1,
      "module": 5,
      "explanation": "Every lakehouse has an autoâ€‘created DefaultReader role. When you grant 'Read all Apache Spark and subscribe to events' item permission, the user is automatically added to DefaultReader. This role gives them read access to all tables and files in the lakehouse via Spark and OneLake APIs."
    },
    {
      "id": "dp600-5-003",
      "text": "You need to mask a column containing credit card numbers so that nonprivileged users see 'XXXX-XXXX-XXXX-3456' instead of the full number. Which Dynamic Data Masking function should you use?",
      "options": [
        "default()",
        "email()",
        "partial(0, 'XXXX-XXXX-XXXX-', 4)",
        "random(1, 9999)"
      ],
      "correct": 2,
      "module": 5,
      "explanation": "The partial() masking function allows you to expose a prefix and suffix while masking the middle. partial(0, 'XXXX-XXXX-XXXX-', 4) shows a fixed string followed by the last 4 characters of the original value. default() masks the whole column, email() is for email addresses, random() is for numeric/binary."
    },
    {
      "id": "dp600-5-004",
      "text": "You implement Row-Level Security using a filter predicate. Which operations are affected when the predicate returns false for a row?",
      "options": [
        "Only SELECT operations are filtered; UPDATE and DELETE are unaffected",
        "SELECT, UPDATE, and DELETE operations are all filtered; INSERT is not applicable",
        "All operations including INSERT are blocked",
        "Only SELECT and DELETE are filtered; UPDATE is allowed"
      ],
      "correct": 1,
      "module": 5,
      "explanation": "A rowâ€‘level security filter predicate applies to SELECT, UPDATE, and DELETE operations. Rows that do not satisfy the predicate are invisible to those operations. INSERT operations are NOT filtered â€“ a user can insert a row even if the predicate would filter it out on subsequent queries."
    },
    {
      "id": "dp600-5-005",
      "text": "You need to restrict access to the MedicalHistory column in a Patients table so that only Doctors and Nurses can view it. Which approach should you use?",
      "options": [
        "Create a view that excludes the MedicalHistory column for other roles",
        "Use DENY SELECT on the MedicalHistory column for Receptionist and Patient roles",
        "Apply Dynamic Data Masking to the MedicalHistory column",
        "Hide the column in the semantic model"
      ],
      "correct": 1,
      "module": 5,
      "explanation": "Columnâ€‘Level Security (CLS) is implemented by granting SELECT on the table to roles that need the column, and then using DENY SELECT ON table(column) to block access to sensitive columns for unauthorized roles. Views are an alternative but less efficient. DDM masks but does not prevent access; hiding in the semantic model does not protect the underlying warehouse."
    },
    {
      "id": "dp600-5-006",
      "text": "A sensitivity label is applied to a lakehouse. A data engineer creates a semantic model from that lakehouse. What happens to the sensitivity label?",
      "options": [
        "The label must be manually applied to the new semantic model",
        "The label propagates automatically to the downstream semantic model through inheritance",
        "The label is removed because semantic models don't support sensitivity labels",
        "The label only applies to the lakehouse and has no effect on downstream items"
      ],
      "correct": 1,
      "module": 5,
      "explanation": "Sensitivity labels automatically propagate downstream from source items to derived items. A label applied to a lakehouse will be inherited by any semantic model created from that lakehouse (and further to reports). This ensures consistent classification across the data chain."
    },
    {
      "id": "dp600-5-007",
      "text": "Which endorsement level can be applied only to data items like lakehouses and semantic models (not reports or notebooks)?",
      "options": [
        "Promoted",
        "Certified",
        "Master data",
        "Approved"
      ],
      "correct": 2,
      "module": 5,
      "explanation": "Master data endorsement is specifically for data items (lakehouses, semantic models) that represent the authoritative source of truth for core business entities. Promoted and Certified can be applied to reports and notebooks as well. 'Approved' is not an endorsement level (it is related to Copilot settings)."
    },
    {
      "id": "dp600-5-008",
      "text": "You need to connect Microsoft Purview to your Fabric tenant so that Purview can scan and catalog Fabric items. What must you do first?",
      "options": [
        "Install the Purview gateway in Fabric",
        "Register your Fabric tenant as a data source in Purview's Data Map and configure authentication",
        "Enable Purview in the Fabric Admin portal Tenant settings",
        "Create a Purview workspace in Fabric"
      ],
      "correct": 1,
      "module": 5,
      "explanation": "To integrate Purview with Fabric, you must first register your Fabric tenant as a data source in the Purview Data Map, configure authentication (e.g., managed identity), and then create a scan. There is no 'Purview gateway' inside Fabric, and Purview is not enabled from Fabric tenant settings."
    },
    {
      "id": "dp600-5-009",
      "text": "You have an OneLake security role that grants Read access to specific tables. A user is also in the DefaultReader role. What access does the user have?",
      "options": [
        "Only the tables specified in the custom role",
        "Read access to all data through DefaultReader, even though the custom role restricts access",
        "No access because the roles conflict",
        "ReadWrite access to the tables in the custom role"
      ],
      "correct": 1,
      "module": 5,
      "explanation": "Access from OneLake security roles is additive. If a user is in DefaultReader (which grants read access to all tables), they have full read access regardless of any custom role that tries to restrict them. To enforce a restricted role, you must remove the user from DefaultReader."
    },
    {
      "id": "dp600-5-010",
      "text": "You need to create an OneLake security role that allows a user to read data from specific tables but also apply a row filter so they only see rows for their region. Which components must the role include?",
      "options": [
        "Data (tables), Permission (Read), Members (users), and Constraints (row filter)",
        "Data (tables), Permission (ReadWrite), and Members (users)",
        "Only Data (tables) and Members (users)",
        "Data (tables), Permission (Read), and a DENY predicate"
      ],
      "correct": 0,
      "module": 5,
      "explanation": "An OneLake security role consists of four components: Data (which tables/folders), Permission (Read or ReadWrite), Members (users/groups), and Constraints (optional rowâ€‘ or columnâ€‘filters). To restrict to specific rows, you must include a constraint (row filter) as part of the role definition."
    },
    {
      "id": "dp600-5-011",
      "text": "The OneLake catalog has a Govern tab. What is its primary purpose?",
      "options": [
        "To browse and discover data items across the organization",
        "To view governance posture for owned data and see recommended actions for improvement",
        "To manage security roles for all lakehouses",
        "To configure sensitivity labels for the entire tenant"
      ],
      "correct": 1,
      "module": 5,
      "explanation": "The Govern tab in the OneLake catalog provides a governance dashboard for data owners. It shows the governance posture (e.g., items missing sensitivity labels, endorsement status) and recommends actions to improve compliance and discoverability. It is not for general browsing (Explore tab) nor for role management."
    },
    {
      "id": "dp600-5-012",
      "text": "You apply a sensitivity label with a Purview protection policy to a semantic model. A user without the correct security group membership tries to open the model. What happens?",
      "options": [
        "The user can view the model metadata but not the data",
        "The user is blocked from accessing the item entirely due to the protection policy",
        "The user sees a warning but can proceed to open the model",
        "The sensitivity label is ignored for users with workspace access"
      ],
      "correct": 1,
      "module": 5,
      "explanation": "A sensitivity label with an Information Rights Management (IRM) protection policy enforces access control. If the user is not in the authorized security group defined in the Purview protection policy, they are completely blocked from accessing the item â€“ they cannot even see its metadata or open it."
    },
    {
      "id": "dp600-5-013",
      "text": "You need to implement row-level security so that a user sees only their own department's data. You have a security table mapping users to departments. Which DAX pattern correctly implements this dynamic RLS?",
      "options": [
        "CONTAINS(Security, Security[User], USERPRINCIPALNAME(), Security[Dept], DimSales[Dept])",
        "DimSales[Dept] = SELECTEDVALUE(Security[Dept])",
        "LOOKUPVALUE(Security[Dept], Security[User], USERPRINCIPALNAME())",
        "FILTER(DimSales, DimSales[Dept] = RELATED(Security[Dept]))"
      ],
      "correct": 0,
      "module": 5,
      "explanation": "The CONTAINS function checks whether a row in the security table matches both the current user (USERPRINCIPALNAME()) and the department value from the sales table. If true, the row is visible. This is the standard dynamic RLS pattern. The other options either do not reference the sales table correctly or are not valid row filters."
    },
    {
      "id": "dp600-5-014",
      "text": "You export a report from Power BI Desktop that contains items with a sensitivity label. The exported file is a .pbix file. What happens to the sensitivity label?",
      "options": [
        "The label is stripped from the exported file",
        "The label and its protections travel with the .pbix file",
        "The label is converted to a general tag in the file properties",
        "The label only applies within the Fabric portal and does not follow exports"
      ],
      "correct": 1,
      "module": 5,
      "explanation": "When you export a report as a .pbix file, any sensitivity labels applied to the semantic model or report are preserved, including protection policies (e.g., IRM encryption). The label travels with the file and is enforced when the .pbix is opened in Power BI Desktop."
    },
    {
      "id": "dp600-5-015",
      "text": "You need to ensure that new Fabric items automatically receive a baseline sensitivity label even if the creator doesn't manually apply one. Which feature should the administrator enable?",
      "options": [
        "Mandatory labeling for all item types",
        "Default labeling in the tenant settings",
        "Endorsement auto-assignment",
        "Sensitivity label inheritance from workspace"
      ],
      "correct": 1,
      "module": 5,
      "explanation": "Default labeling (configured in the Fabric Admin portal tenant settings) allows an administrator to specify a baseline sensitivity label that is automatically applied to new items when no label is manually assigned. It ensures a minimum classification level across the tenant."
    },
    {
      "id": "dp600-5-016",
      "text": "You need to implement Row-Level Security on a warehouse so that regional managers only see sales data for their region. Which DAX expression should you use in the security filter for the DimRegion table?",
      "options": [
        "[Region] = USERNAME()",
        "[Region] = USERPRINCIPALNAME()",
        "[ManagerEmail] = USERPRINCIPALNAME()",
        "[Region] = LOOKUPVALUE(Users[Region], Users[Email], USERPRINCIPALNAME())"
      ],
      "correct": 2,
      "module": 5,
      "explanation": "Assuming the DimRegion table has a ManagerEmail column containing the email address of the manager responsible for that region, the filter predicate should compare that column to the current userâ€™s UPN. This grants access to all regions where the user is the manager. The other options either compare region to a name (wrong) or use LOOKUPVALUE incorrectly in a row filter."
    },
    {
      "id": "dp600-5-017",
      "text": "You have a Fabric warehouse. A user with the Contributor workspace role needs to read specific columns from a table but must be denied access to a sensitive column containing salary data. Which security feature should you implement?",
      "options": [
        "Row-Level Security with a DAX filter on the salary column",
        "Column-Level Security using DENY SELECT on the salary column",
        "Dynamic Data Masking with the partial() function on the salary column",
        "Object-Level Security to hide the entire table from the user"
      ],
      "correct": 1,
      "module": 5,
      "explanation": "Columnâ€‘Level Security (CLS) using DENY SELECT ON table(column) blocks access to specific columns while allowing SELECT on the rest of the table. RLS filters rows, not columns. DDM masks but does not deny access. OLS would hide the whole table, which is too broad."
    },
    {
      "id": "dp600-5-018",
      "text": "You have a Fabric warehouse. You need to implement column-level security to prevent a group of users from viewing the EmployeeSSN column. Which T-SQL statement should you execute?",
      "options": [
        "DENY SELECT ON Employees(EmployeeSSN) TO [SecurityGroup]",
        "ALTER COLUMN Employees.EmployeeSSN SET SECURITY POLICY",
        "CREATE SECURITY POLICY SSNFilter ADD FILTER PREDICATE",
        "ALTER TABLE Employees SET (RESULT_SET_CACHING = OFF)"
      ],
      "correct": 0,
      "module": 5,
      "explanation": "Columnâ€‘Level Security in Tâ€‘SQL is implemented using DENY SELECT ON table(column) TO role/user. The syntax DENY SELECT ON Employees(EmployeeSSN) TO [SecurityGroup] is correct. Security policies are for RLS, not column masking."
    },
    {
      "id": "dp600-5-019",
      "text": "You have a Fabric warehouse. A user with the Member workspace role needs to grant a service principal access to read data from a specific table. Which permission should the user grant?",
      "options": [
        "GRANT SELECT ON TableName TO [ServicePrincipal]",
        "ALTER TABLE TableName ADD CONSTRAINT",
        "CREATE ROLE CustomRole ADD MEMBER ServicePrincipal",
        "DENY SELECT ON TableName TO [Public]"
      ],
      "correct": 0,
      "module": 5,
      "explanation": "The Member role has permission to grant objectâ€‘level permissions using Tâ€‘SQL GRANT. The correct syntax is GRANT SELECT ON TableName TO [ServicePrincipal] (or the principal's name). The other options are not valid for granting SELECT access."
    },
    {
      "id": "dp600-5-020",
      "text": "You have a Fabric warehouse with a table that contains sensitive data. You need to implement dynamic data masking to show partial SSN values. Which masking function should you use?",
      "options": [
        "default()",
        "email()",
        "partial(prefix, suffix)",
        "random(range)"
      ],
      "correct": 2,
      "module": 5,
      "explanation": "The partial() masking function is designed to expose a prefix and suffix of a string while masking the middle. For SSN, you might use partial(0, 'XXX-XX-', 4) to show last 4 digits. default() masks the whole value, email() is for email addresses, random() for numeric."
    },
    {
      "id": "dp600-5-021",
      "text": "You have a Fabric warehouse. You need to create a view that combines data from multiple tables and applies row-level security. Which approach should you use?",
      "options": [
        "Create a view with a WHERE clause that filters based on the current user",
        "Create a view and apply RLS separately using security policies",
        "Create a stored procedure that returns filtered data based on the user",
        "Create a view and use dynamic data masking to restrict access"
      ],
      "correct": 1,
      "module": 5,
      "explanation": "The best practice is to create a view that combines the data (without userâ€‘specific WHERE clauses), and then apply Rowâ€‘Level Security (RLS) security policies on the underlying tables or on the view itself. Hardâ€‘coding user filtering in the view would require modifying the view for each user, which is not scalable. Security policies provide dynamic, maintainable RLS."
    },
    {
      "id": "dp600-5-022",
      "text": "You have a Fabric warehouse with a table that contains a column with sensitive data. You need to implement dynamic data masking to show only the last 4 digits of a credit card number. Which masking function should you use?",
      "options": [
        "default()",
        "email()",
        "partial(0, '****')",
        "random(1, 100)"
      ],
      "correct": 2,
      "module": 5,
      "explanation": "The partial() function can be used to expose only the last 4 digits by specifying a prefix of '****' (or 'XXXX') and a suffix length of 4. For example, partial(0, '****', 4) would output '****1234'. default() masks the whole value, email() is for email addresses, random() is for numeric."
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

