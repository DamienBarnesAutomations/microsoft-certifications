// Hands-on Labs / projects view (DP-700 only, as in the legacy app — hard-coded project list).
function renderProjects() {
  const container = document.getElementById('concepts-projects-container');
  if (!container) return;

  const projects = [
    {
      num: '1', title: 'Build the Foundation', domain: 'Implement & Manage an Analytics Solution', effort: '4–6 hours',
      description: 'Creates workspace, lakehouse with medallion folders, Spark/OneLake settings, RLS/CLS/DDM, Git integration, deployment pipeline, sensitivity labels, endorsements. This is the bedrock everything else builds on.',
      examTopics: 'Spark settings, domain config, workspace roles, RLS/CLS/DDM, sensitivity labels, endorsements, deployment pipelines, Git, OneLake security',
    },
    {
      num: '2', title: 'Orchestrate the Data Platform', domain: 'Implement & Manage an Analytics Solution', effort: '3–5 hours',
      description: 'Builds the orchestration layer — master pipeline coordinating child pipelines, Dataflow Gen2 for dimension loading, parameterised notebooks, schedule and event-based triggers. Focus on wiring and architecture.',
      examTopics: 'Choose between Dataflow Gen2/pipeline/notebook, schedule & event triggers, orchestration patterns, parameters & dynamic expressions',
    },
    {
      num: '3', title: 'Load Historical Sales Data', domain: 'Ingest & Transform Data', effort: '5–8 hours',
      description: 'Generates 3 years of synthetic sales data with intentional data-quality issues. Implements bronze→silver→gold pipeline: dedup, null imputation, late-arrival handling, orphan removal, Delta MERGE for incremental loads, dimensional model loading.',
      examTopics: 'Full & incremental loads, dimensional model prep, shortcuts, PySpark/M transforms, dedup/null/late-arrival handling, denormalization, aggregation',
    },
    {
      num: '4', title: 'Stream Live Sensor Data', domain: 'Ingest & Transform Data', effort: '4–6 hours',
      description: 'Builds the real-time pipeline — Eventhouse/KQL DB, Eventstream from IoT sensors, KQL anomaly detection queries, tumbling/sliding/session windowing aggregations, materialized views, and Spark Structured Streaming comparison.',
      examTopics: 'Streaming engine choice, native vs mirrored vs shortcuts, Eventstream processing, Spark SS, KQL processing, windowing functions, streaming load patterns',
    },
    {
      num: '5', title: 'Monitor the Platform', domain: 'Monitor & Optimize an Analytics Solution', effort: '4–6 hours',
      description: 'Break/fix simulation containing 7 failure scenarios (pipeline silent failure, dataflow timeout, Spark AnalysisException, Eventhouse ingestion drop, Eventstream disconnect, T-SQL GROUP BY error, shortcut access denied). Plus Monitor hub exploration, alert configuration, and a completed monitoring notebook.',
      examTopics: 'Monitor ingestion/transformation/refresh, configure alerts, identify & resolve pipeline/dataflow/notebook/eventhouse/eventstream/T-SQL/shortcut errors',
    },
    {
      num: '6', title: 'Optimize for Scale', domain: 'Monitor & Optimize an Analytics Solution', effort: '4–6 hours',
      description: 'Systematic performance optimization with before/after benchmarking. Covers OPTIMIZE/ZORDER/VACUUM, partition strategy redesign, pipeline parallelism, warehouse stats/CTAS, Eventhouse caching/materialized views/eventstream transforms, Spark AQE/broadcast/shuffle tuning, KQL time-filter optimization.',
      examTopics: 'Optimize lakehouse/pipeline/warehouse/eventstreams/eventhouses/Spark/query performance',
    },
  ];

  container.innerHTML = '';

  projects.forEach((p) => {
    const card = document.createElement('div');
    card.className = 'glass-panel project-card';

    card.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 12px;">
        <div>
          <h2 style="margin:0; font-size: 1.3rem;"><span style="color:var(--accent-teal); font-weight: 800;">${p.num}.</span> ${p.title}</h2>
          <div style="display:flex; gap: 8px; flex-wrap: wrap; margin-top: 8px;">
            <span style="font-size: 0.7rem; color: var(--accent-teal); background: var(--accent-teal-glow); padding: 2px 8px; border-radius: 12px; font-weight: 600; text-transform: uppercase;">${p.domain}</span>
            <span style="font-size: 0.7rem; color: var(--text-secondary); background: var(--surface-border); padding: 2px 8px; border-radius: 12px; font-weight: 600;">⏱️ ${p.effort}</span>
          </div>
        </div>
        <a href="dp700/projects/Specifications_${p.num}.html" target="_blank" class="btn btn-primary" style="padding: 8px 16px; font-size: 0.85rem;">Open Spec ↗</a>
      </div>

      <p style="font-size: 0.95rem; color: var(--text-secondary); line-height: 1.5; margin: 0;">${p.description}</p>

      <div style="border-top: 1px solid var(--surface-border); padding-top: 12px; font-size: 0.8rem; color: var(--text-muted);">
        <strong>Tested Skills:</strong> ${p.examTopics}
      </div>
    `;
    container.appendChild(card);
  });
}
