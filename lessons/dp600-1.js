// DP-600 lessons, domain 1: Maintain a data analytics solution. One entry per outline skill.
// Source material: dp600/modules (M3.4, M3.5, M5.1, M5.4) and Microsoft Learn.
window.DP600_LESSONS = (window.DP600_LESSONS || []).concat([
  {
    skill: '1.1.1',
    summary: 'A workspace role gives a person the same level of access to every item in the workspace. It is the broadest layer of Fabric security.',
    explain: `
<p>Fabric checks access in layers: Microsoft Entra sign-in, then Fabric access, then <b>data security</b>. Data security has four controls, from broad to narrow: <b>workspace roles</b>, <b>item permissions</b>, <b>compute (T-SQL) permissions</b> and <b>OneLake security</b>. This lesson is the first.</p>
<table>
<tr><th>Role</th><th>Can do</th></tr>
<tr><td>Admin</td><td>Everything, including managing permissions, adding admins and deleting the workspace</td></tr>
<tr><td>Member</td><td>Create, edit and share content; add people at a lower level</td></tr>
<tr><td>Contributor</td><td>Create and edit content and data; cannot share or manage access</td></tr>
<tr><td>Viewer</td><td>View content only; no edit, and no access to the data in OneLake by default</td></tr>
</table>
<p>Roles can go to people, Microsoft Entra security groups, Microsoft 365 groups and distribution lists. Assign <b>groups</b> where you can, so access is managed in one place. Someone in several groups gets the <b>highest</b> role.</p>
<p>Add people from the workspace's <b>Manage access</b> pane.</p>`,
    example: `<p>A new data engineer must create items and read every lakehouse in one workspace. <b>Contributor</b> fits: they can build and read, but cannot share items or manage who has access. If they later only need to read one lakehouse, remove the role and share that single item instead (next lesson).</p>`,
    traps: [
      'A workspace role applies to <b>every</b> item. If the requirement says "only one lakehouse", a workspace role is the wrong answer.',
      'Admin, Member and Contributor have full read and write access to OneLake data, so OneLake security roles and T-SQL DENY do not restrict them.',
      'Viewer sees items listed but has no OneLake data access by default.',
    ],
  },
  {
    skill: '1.1.2',
    summary: 'Item permissions let you share one item (a lakehouse, warehouse or semantic model) without giving access to the rest of the workspace.',
    explain: `
<p>Share an item from the <b>...</b> menu, then <b>Manage permissions</b>. This follows the <b>principle of least privilege</b>: give only what is needed.</p>
<p>When you share a <b>lakehouse</b>, <b>Read</b> is always granted. Read lets the person see the item and its metadata, but <b>not</b> the data. You add data access with extra permissions:</p>
<table>
<tr><th>Extra permission</th><th>What it allows</th></tr>
<tr><td>Read all SQL endpoint data</td><td>Query the SQL analytics endpoint with T-SQL</td></tr>
<tr><td>Read all Apache Spark and subscribe to events</td><td>Read data through Spark and OneLake APIs</td></tr>
<tr><td>Build reports on the default semantic model</td><td>Create Power BI reports on it</td></tr>
</table>
<p>Both data permissions expose <b>all</b> data in the lakehouse. To narrow that, use T-SQL permissions for the SQL endpoint and OneLake security roles for Spark and OneLake access.</p>
<p>Granting <b>Read all Apache Spark</b> also adds the person to the lakehouse's <b>DefaultReader</b> OneLake role, which can read everything.</p>`,
    example: `<p>An engineer who only needs to read one lakehouse: remove them from the Contributor role, then share the lakehouse with <b>Read</b> plus <b>Read all SQL endpoint data</b>. They can query that lakehouse and nothing else in the workspace.</p>`,
    traps: [
      'Read alone does not give data access. Look for the additional permission in the answer.',
      'If you restrict someone to a custom OneLake role, also remove them from <b>DefaultReader</b>, or they keep full read access.',
      'Compute permissions (Read, ReadAll, Write) apply inside one engine, such as the SQL analytics endpoint.',
    ],
  },
  {
    skill: '1.1.3',
    summary: 'Row, column, object and file-level security control what a person sees inside an item. Which feature you use depends on where the data is queried.',
    explain: `
<h3>Semantic model: RLS and OLS</h3>
<p><b>Row-level security (RLS)</b> filters rows with a DAX expression in a <b>role</b> (Modeling > Manage roles). Filter <b>dimension</b> tables; relationships carry the filter to the fact table. The best pattern is <b>dynamic</b> security: one role with <code>[Email] = USERPRINCIPALNAME()</code>, or a security table mapping users to regions. <code>USERPRINCIPALNAME()</code> returns the same format in Desktop and the service; <code>USERNAME()</code> does not.</p>
<p><b>Object-level security (OLS)</b> hides whole tables or columns. It cannot be set in Desktop: use <b>Tabular Editor</b> and set the object to <b>None</b> for the role.</p>
<p>Add members to roles in the service (model <b>...</b> > Security). Use <b>Entra security groups</b>; Microsoft 365 groups are not supported.</p>
<h3>Warehouse and SQL endpoint: T-SQL</h3>
<ul>
<li><b>Row-level security:</b> a security policy with a filter predicate function.</li>
<li><b>Column-level security:</b> <code>GRANT SELECT</code> on an allowed list of columns, or <code>DENY</code>.</li>
<li><b>Dynamic data masking:</b> shows masked values at query time. Not encryption; users with <code>UNMASK</code> see the real value.</li>
</ul>
<h3>Lakehouse files and tables: OneLake security</h3>
<p><b>OneLake security roles</b> grant Read or ReadWrite on chosen tables or <b>folders</b> (file-level), with optional row and column constraints. They apply the same way in Spark, SQL and OneLake APIs. Only Admin and Member can create them.</p>`,
    example: `<pre><code>-- Dynamic RLS filter on the Salesperson table
[SalesPersonEmail] = USERPRINCIPALNAME()

-- Column-level security in a warehouse
GRANT SELECT ON dbo.Employee (EmployeeId, Name, Region) TO [Analysts];</code></pre>
<p>Analysts can read the three granted columns but not <code>Salary</code>.</p>`,
    traps: [
      '<b>Admin, Member and Contributor bypass RLS and OLS.</b> Only Viewers are restricted, so do not give report consumers an edit role.',
      'A Viewer who is in <b>no</b> RLS role sees <b>all</b> rows.',
      'When a user is in several RLS roles, the filters are <b>additive</b> (union), not intersected.',
      'A role with no rules gives access to all rows; <code>FALSE()</code> blocks all rows in a table.',
      'OLS cannot hide a table if that breaks a relationship chain. Measures that use a hidden object are restricted automatically.',
    ],
  },
  {
    skill: '1.1.4',
    summary: 'Sensitivity labels classify items (Public, General, Confidential, Highly Confidential) and can enforce protection that follows the data.',
    explain: `
<p>Labels come from <b>Microsoft Purview Information Protection</b>; a Purview admin defines them. In Fabric you apply them to items: lakehouses, warehouses, semantic models, reports, notebooks and pipelines.</p>
<p>A label:</p>
<ul>
<li>shows on the item in the portal;</li>
<li>can restrict access through a Purview protection policy;</li>
<li>travels with the data when exported to Excel, PDF, PowerPoint or .pbix. <b>CSV and TXT exports do not carry it</b>; Fabric warns you.</li>
</ul>
<p>Labels spread through lineage:</p>
<ul>
<li><b>Default labeling:</b> a baseline label for new items.</li>
<li><b>Mandatory labeling:</b> Power BI items cannot be saved unlabeled.</li>
<li><b>Downstream inheritance:</b> a label on a lakehouse flows to the SQL endpoint, semantic model and reports built on it.</li>
<li><b>Inheritance on creation:</b> new items copy their parent's label.</li>
</ul>
<p>So label <b>sources</b> (lakehouses, warehouses) and let inheritance protect everything downstream.</p>`,
    example: `<p>A lakehouse holding patient records is labeled <b>Highly Confidential</b>. The semantic model and report built on it inherit that label. If a user cannot open the model, a protection policy on its label may be the reason.</p>`,
    traps: [
      'Labels need Purview licensing; without it you can still use endorsement and descriptions.',
      'Labeling is metadata plus optional protection. It is <b>not</b> row or column filtering.',
      'Export to CSV loses the label protection.',
    ],
  },
  {
    skill: '1.1.5',
    summary: 'Endorsement tells people which items to trust. It changes visibility, not access.',
    explain: `
<table>
<tr><th>Level</th><th>Who can set it</th><th>Use for</th></tr>
<tr><td>Promoted</td><td>Anyone with <b>write</b> permission on the item</td><td>Tested, ready for team sharing</td></tr>
<tr><td>Certified</td><td>Only users the <b>Fabric admin</b> authorizes (security groups; can be delegated to domain admins)</td><td>Production assets used across teams</td></tr>
<tr><td>Master data</td><td>Only users the Fabric admin specifies; <b>items that contain data</b> only</td><td>Core reference data, the single source of truth</td></tr>
</table>
<p>Endorsed items show a badge and rank higher in search and in the OneLake catalog. Copilot and data agents also prefer certified and promoted models.</p>
<p>Nearly every item can be promoted or certified. <b>Power BI dashboards cannot be endorsed.</b></p>
<p>Related governance tools: <b>tags</b> (admin-defined labels for categories like Sales or Daily), item <b>descriptions</b>, and <b>domains</b>.</p>`,
    traps: [
      'Endorsement does <b>not</b> restrict or grant access.',
      'Certification is authorized by the admin; any writer can promote.',
      'Master data applies only to items that hold data, such as lakehouses and semantic models.',
    ],
  },
  {
    skill: '1.2.1',
    summary: 'Git integration connects a workspace to a repository so you get version history, branches and pull requests for Fabric items.',
    explain: `
<p>Connect from <b>Workspace settings > Git integration</b>: choose the provider (<b>Azure DevOps</b> or <b>GitHub</b> cloud), then the repository, branch and folder, and complete the first sync. A workspace connects to <b>one branch at a time</b>.</p>
<p>The working cycle:</p>
<ul>
<li><b>Commit</b> from the Source control pane: pick changed items and write a message.</li>
<li><b>Update all</b> pulls the repository's latest commit into the workspace.</li>
<li><b>Branches:</b> use a separate workspace per developer branch.</li>
<li><b>Conflicts:</b> the same item changed in both places blocks updates until you choose which version to keep.</li>
</ul>
<p>Git stores item <b>definitions</b>, not the data inside them. It supports many item types, not only Power BI: notebooks, pipelines, lakehouses and warehouses too.</p>
<p>Limits: no on-premises Git, you cannot update individual items (an update brings the whole branch to the latest commit), up to 1,000 items per workspace, and 50 MB per commit.</p>
<p>Require pull-request review before merging into the main branch.</p>`,
    traps: [
      'Only Azure DevOps and cloud GitHub are supported.',
      'Git tracks "what changed and who approved it". Deployment pipelines handle moving content between environments.',
      'Viewers cannot commit or update.',
    ],
  },
  {
    skill: '1.2.2',
    summary: 'A Power BI project (.pbip) saves a report and its model as folders of text files, so Git can show exactly what changed.',
    explain: `
<p>A <b>.pbix</b> is one binary file, which Git cannot diff. A <b>.pbip</b> project is a folder:</p>
<ul>
<li><code>&lt;name&gt;.SemanticModel/</code>: the model in <b>TMDL</b>, one readable text file per table, measure and relationship.</li>
<li><code>&lt;name&gt;.Report/</code>: the report in <b>PBIR</b> JSON (entry point <code>definition.pbir</code>).</li>
<li>The <code>.pbip</code> file itself is just a shortcut to the report folder.</li>
</ul>
<p>Save with <b>File > Save as > Power BI Project</b>. Desktop also writes a <code>.gitignore</code> that excludes per-user files like <code>.pbi/localSettings.json</code> and <code>.pbi/cache.abf</code>.</p>
<p>Because the model is text, you can edit it with scripts (for example add a description to every measure) and review it in pull requests. Typical flow: author as .pbip locally, commit to Git, and the workspace syncs from the repository.</p>`,
    traps: [
      'The project holds definitions, <b>not</b> imported data.',
      'You cannot save a .pbip directly to OneDrive or SharePoint.',
      'If you edit TMDL outside Desktop, restart Desktop to reload it.',
    ],
  },
  {
    skill: '1.2.3',
    summary: 'A deployment pipeline promotes content through stages (Development, Test, Production), changing configuration per stage with deployment rules.',
    explain: `
<p>A pipeline has <b>2 to 10 stages</b> (default 3). Each stage maps to its own workspace on Fabric or Premium capacity. Deploying copies the selected <b>items</b> to the next stage; it does <b>not</b> copy data, so the target needs its own refresh.</p>
<ul>
<li><b>Compare</b> stages before deploying: orange means different, green identical, "new" means only in the source.</li>
<li><b>Selective deployment</b>: deploy some items and leave others behind.</li>
<li><b>Deployment rules</b> change settings per stage, set on the <b>target</b> stage: <b>data source rules</b> (server or database) and <b>parameter rules</b> (parameter values). They take effect on the next deployment and do not change the source item.</li>
<li><b>Automation</b> through the Fabric REST API, for example deploy after a pull request merges.</li>
</ul>
<p>Microsoft now recommends <b>variable libraries</b> first for environment-specific settings; rules remain valid.</p>`,
    example: `<p>Dev reads a test lakehouse; Prod reads the live one. Add a data source rule on the Prod stage that swaps the connection, then deploy Test to Prod. Prod's model now points at the live source and you refresh it there.</p>`,
    traps: [
      'Git integration answers "what changed and who approved it"; pipelines answer "is the right content in the right environment".',
      'If a rule references a parameter that you later change or remove in the source, deployment fails.',
      'If a source uses parameters, you cannot create a data source rule for it: use a parameter rule.',
    ],
  },
  {
    skill: '1.2.4',
    summary: 'Impact analysis shows what breaks downstream before you change a lakehouse, warehouse, dataflow or semantic model.',
    explain: `
<p>Open it from an item's card in <b>lineage view</b>, or from the item's details page. It lists the workspaces and items that depend on the item, with two scopes:</p>
<ul>
<li><b>Child items:</b> one step downstream. For a <b>data source</b> this is the only view.</li>
<li><b>All downstream items:</b> the full chain, such as lakehouse > semantic model > report > app.</li>
</ul>
<p>Results can be grouped by item type or workspace, and they show who to notify before a schema change, column rename or republish. Lineage only covers items <b>you have permission to see</b>.</p>
<p><b>Lineage view</b> is the visual map from sources through models to reports. Use it for troubleshooting too: if a report shows stale data, trace upstream to the semantic model and check its last refresh.</p>`,
    traps: [
      'Run impact analysis <b>before</b> a schema change, not after something breaks.',
      'Impact analysis shows dependents, not who has security access.',
    ],
  },
  {
    skill: '1.2.5',
    summary: 'The XMLA endpoint lets external tools and notebooks inspect, validate and (with read-write) change semantic models.',
    explain: `
<p>Every Fabric or Premium workspace exposes an XMLA endpoint. The connection string targets the <b>workspace</b>: <code>powerbi://api.powerbi.com/v1.0/[tenant]/[workspace]</code>; you then pick the model.</p>
<ul>
<li><b>Read-only</b> (default): query data and metadata.</li>
<li><b>Read-write</b> (set by the capacity admin): deploy model changes, run scripted operations and <b>refresh single partitions</b>.</li>
</ul>
<p>Who uses it:</p>
<ul>
<li><b>SemPy</b> (Python in Fabric notebooks): <code>list_tables</code>, <code>list_measures</code>, <code>list_relationship_violations</code>, <code>evaluate_measure</code>, <code>evaluate_dax</code>. Good for repeatable checks before deployment.</li>
<li><b>Tabular Editor:</b> edit the model, run the Best Practice Analyzer, set OLS.</li>
<li><b>DAX Studio:</b> write and test DAX queries.</li>
<li><b>ALM Toolkit:</b> compare schemas between two models (for example dev and prod).</li>
<li><b>SSMS:</b> connect and run TMSL scripts.</li>
</ul>
<p>Large models that need XMLA writes should use the <b>large semantic model storage format</b>.</p>`,
    traps: [
      'If the endpoint is disabled, neither SemPy nor external tools work.',
      'Partition-level refresh and model writes need <b>read-write</b>; read-only is not enough.',
    ],
  },
  {
    skill: '1.2.6',
    summary: 'Reusable assets give teams consistent starting points: .pbit templates, .pbids connection files and shared semantic models.',
    explain: `
<table>
<tr><th>Asset</th><th>Holds</th><th>Use when</th></tr>
<tr><td><b>.pbit</b> template</td><td>Report pages, visuals, model, queries and parameters; <b>no data</b></td><td>Many teams need the same report layout; Desktop asks for parameter values and credentials when opened</td></tr>
<tr><td><b>.pbids</b> data source file</td><td>Connection details for <b>one</b> source (optionally Import or DirectQuery)</td><td>People need a preconfigured connection and only have to sign in and pick tables</td></tr>
<tr><td><b>Shared semantic model</b></td><td>A central definition of measures and relationships</td><td>Many reports must use one definition of "revenue"; reports connect to it instead of embedding their own model</td></tr>
</table>
<p>Create a template with <b>File > Export > Power BI template</b>. Create a .pbids from Data source settings > <b>Export PBIDS</b>.</p>
<p>Templates standardise the <b>development</b> stage; shared models standardise <b>consumption</b>. They work well together.</p>`,
    traps: [
      'A .pbids supports a single data source; more than one gives an error.',
      'A .pbit contains no data, so it is small. A .pbix includes data.',
    ],
  },
]);
