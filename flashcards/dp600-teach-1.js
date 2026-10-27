// DP-600 teaching cards, domain 1: Maintain a data analytics solution. Each card is one short idea.
// They appear before a skill's recall cards in the flashcard "Learn path".
window.DP600_TEACH = (window.DP600_TEACH || []).concat([
  // 1.1.1 Workspace-level access
  { skill: '1.1.1', title: 'Four workspace roles', text: 'From most to least access: <b>Admin, Member, Contributor, Viewer</b>. A role applies to <b>every item</b> in the workspace.' },
  { skill: '1.1.1', title: 'What each role can do', text: '<b>Admin</b>: everything, incl. delete the workspace.<br><b>Member</b>: create, edit, share, add people.<br><b>Contributor</b>: create and edit, no sharing.<br><b>Viewer</b>: read only.' },
  { skill: '1.1.1', title: 'Assign groups, not people', text: 'Give roles to <b>security groups</b> so access is managed in one place. In several groups? You get the <b>highest</b> role.' },
  { skill: '1.1.1', title: 'Roles beat finer controls', text: 'Admin, Member and Contributor can read all OneLake data and <b>bypass</b> RLS, OLS and T-SQL DENY. Only a <b>Viewer</b> is restricted.' },

  // 1.1.2 Item-level access
  { skill: '1.1.2', title: 'Share one item, not the workspace', text: 'To give access to a single lakehouse or warehouse, <b>share that item</b> (... > Manage permissions). Least privilege.' },
  { skill: '1.1.2', title: 'Read does not mean data', text: 'Sharing a lakehouse always grants <b>Read</b>: see the item, <b>not</b> its data. Data needs an extra permission.' },
  { skill: '1.1.2', title: 'The extra permissions', text: '<b>Read all SQL endpoint data</b>: T-SQL access.<br><b>Read all Apache Spark</b>: Spark and OneLake access.<br><b>Build reports</b> on the default semantic model.' },
  { skill: '1.1.2', title: 'Watch DefaultReader', text: 'Granting Spark access adds the person to the <b>DefaultReader</b> OneLake role, which reads everything. Remove them from it if you restrict them to a custom role.' },

  // 1.1.3 Row/column/object/file-level
  { skill: '1.1.3', title: 'Row-level security (semantic model)', text: 'A <b>role</b> with a DAX filter, e.g. <code>[Email] = USERPRINCIPALNAME()</code>. Filter <b>dimension</b> tables; relationships carry it to facts.' },
  { skill: '1.1.3', title: 'Dynamic beats static', text: 'One role with <code>USERPRINCIPALNAME()</code> (or a security table) scales. Static filters like <code>[Region] = "West"</code> need a new role per value.' },
  { skill: '1.1.3', title: 'Object-level security', text: 'Hides a whole <b>table or column</b>. Not available in Desktop: set it to <b>None</b> for a role in <b>Tabular Editor</b>.' },
  { skill: '1.1.3', title: 'RLS gotchas', text: 'A Viewer in <b>no role</b> sees <b>all rows</b>. Several roles = <b>union</b> of rows. Admin, Member and Contributor bypass RLS.' },
  { skill: '1.1.3', title: 'In a warehouse: T-SQL', text: '<b>RLS</b>: security policy with a filter predicate.<br><b>Column-level</b>: <code>GRANT SELECT</code> on a column list.<br><b>Dynamic data masking</b>: hides values at query time; <code>UNMASK</code> reveals. Not encryption.' },
  { skill: '1.1.3', title: 'Files and folders: OneLake security', text: '<b>OneLake security roles</b> grant Read or ReadWrite on chosen tables or <b>folders</b>, with optional row and column filters. Same in Spark, SQL and APIs.' },

  // 1.1.4 Sensitivity labels
  { skill: '1.1.4', title: 'What a label is', text: 'A <b>Microsoft Purview</b> sensitivity label (Public, General, Confidential...) applied to an item. It classifies and can restrict access.' },
  { skill: '1.1.4', title: 'Labels travel', text: 'Exports to Excel, PDF, PowerPoint and .pbix <b>keep the label</b>. <b>CSV and TXT do not</b>.' },
  { skill: '1.1.4', title: 'Inheritance does the work', text: 'A label on a lakehouse flows <b>downstream</b> to the SQL endpoint, semantic model and reports. Label the <b>sources</b>.' },
  { skill: '1.1.4', title: 'Default and mandatory', text: '<b>Default labeling</b> gives new items a baseline label. <b>Mandatory labeling</b> blocks saving Power BI items with no label.' },

  // 1.1.5 Endorsement
  { skill: '1.1.5', title: 'Three endorsement levels', text: '<b>Promoted</b>: ready to share. <b>Certified</b>: meets org standards. <b>Master data</b>: the single source of truth.' },
  { skill: '1.1.5', title: 'Who can set them', text: 'Promote: anyone with <b>write</b> access.<br>Certify and master data: only users the <b>Fabric admin</b> authorizes.' },
  { skill: '1.1.5', title: 'Visibility, not access', text: 'Endorsement adds a badge and ranks items higher in search. It <b>never</b> changes who can open the item.' },
  { skill: '1.1.5', title: 'Limits', text: 'Master data applies only to items that <b>hold data</b> (lakehouses, semantic models). <b>Dashboards</b> cannot be endorsed.' },

  // 1.2.1 Version control
  { skill: '1.2.1', title: 'Git integration', text: 'Connect a workspace to a repo in <b>Azure DevOps</b> or <b>GitHub</b>: Workspace settings > Git integration. One workspace = <b>one branch</b>.' },
  { skill: '1.2.1', title: 'Commit and update', text: '<b>Commit</b> sends workspace changes to Git. <b>Update all</b> pulls the latest commit in. A change on both sides is a <b>conflict</b> you must resolve.' },
  { skill: '1.2.1', title: 'Definitions, not data', text: 'Git stores item <b>definitions</b>, not the data inside them. It works for notebooks, pipelines, lakehouses and warehouses too.' },
  { skill: '1.2.1', title: 'Limits', text: 'Only Azure DevOps and cloud GitHub. You cannot update single items: an update brings the <b>whole branch</b> to the latest commit.' },

  // 1.2.2 .pbip
  { skill: '1.2.2', title: 'Why .pbip', text: 'A .pbix is one binary file Git cannot diff. A <b>.pbip</b> project saves report and model as <b>text files</b> so changes are readable.' },
  { skill: '1.2.2', title: 'What is inside', text: '<b>.SemanticModel</b> folder: the model in <b>TMDL</b>.<br><b>.Report</b> folder: the report in <b>PBIR</b> (JSON).<br>The .pbip file is just a shortcut.' },
  { skill: '1.2.2', title: 'Working with it', text: 'Save via <b>File > Save as > Power BI Project</b>. Desktop adds a <code>.gitignore</code> that excludes cache and local settings. It holds no imported data.' },

  // 1.2.3 Deployment pipelines
  { skill: '1.2.3', title: 'Stages', text: 'A pipeline has <b>2 to 10 stages</b> (default Dev, Test, Prod), each linked to its own workspace. Deploying copies <b>items</b>, not data.' },
  { skill: '1.2.3', title: 'Compare and select', text: 'Compare two stages before deploying (orange = different, green = same). You can deploy <b>selected items</b> only.' },
  { skill: '1.2.3', title: 'Deployment rules', text: 'Change settings per stage: <b>data source rules</b> (server, database) and <b>parameter rules</b>. Set on the <b>target</b> stage; they apply on the next deploy.' },
  { skill: '1.2.3', title: 'Git vs pipelines', text: '<b>Git</b>: what changed and who approved it.<br><b>Pipelines</b>: is the right content in the right environment.' },

  // 1.2.4 Impact analysis
  { skill: '1.2.4', title: 'Ask before you change', text: '<b>Impact analysis</b> shows which items depend on a lakehouse, warehouse, dataflow or semantic model, so you know what a change will break.' },
  { skill: '1.2.4', title: 'Two scopes', text: '<b>Child items</b>: one step downstream.<br><b>All downstream items</b>: the full chain, e.g. lakehouse > model > report > app.' },
  { skill: '1.2.4', title: 'Lineage view', text: 'The visual map of data flow. Use it to trace stale data upstream. It only shows items <b>you have permission to see</b>.' },

  // 1.2.5 XMLA
  { skill: '1.2.5', title: 'The XMLA endpoint', text: 'Lets external tools talk to a semantic model. Default <b>read-only</b>; the capacity admin can enable <b>read-write</b>.' },
  { skill: '1.2.5', title: 'Read-write unlocks', text: 'Deploying model changes, scripted operations and <b>refreshing single partitions</b> from tools.' },
  { skill: '1.2.5', title: 'Who connects', text: '<b>Tabular Editor</b> (edit, BPA, OLS), <b>DAX Studio</b> (queries), <b>ALM Toolkit</b> (compare schemas), <b>SSMS</b>, and <b>SemPy</b> in notebooks.' },

  // 1.2.6 Reusable assets
  { skill: '1.2.6', title: '.pbit template', text: 'Report layout, model and queries with <b>no data</b>. Opening it asks for parameters and credentials. Great for a standard report.' },
  { skill: '1.2.6', title: '.pbids data source file', text: 'Holds the connection for <b>one</b> data source. The user just signs in and picks tables.' },
  { skill: '1.2.6', title: 'Shared semantic model', text: 'One central definition of measures. Reports connect to it instead of embedding their own, so "revenue" means one thing.' },
]);
