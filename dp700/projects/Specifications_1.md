# Specifications_1.md
# RetailIQ — Project 1: Build the Foundation
**Domain:** Implement & Manage an Analytics Solution  
**Estimated Effort:** 4–6 hours  
**Fabric Items Created:** Workspace, Lakehouse, Deployment Pipeline, Eventhouse (logging)

---

## 1. Overview

This project establishes the entire foundational infrastructure for RetailIQ's Microsoft Fabric analytics platform. You will create and configure a Fabric workspace, set up a lakehouse with a medallion architecture folder structure, configure Spark and OneLake settings, implement a full security and governance model, and create a three-stage deployment pipeline (Dev → Test → Prod).

By the end of this project the workspace should be fully configured, secured, and ready to receive data in subsequent projects.

---

## 2. Prerequisites

- A Microsoft Fabric capacity (F2 or higher, or a Fabric Trial)
- Admin access to the Fabric tenant
- A GitHub or Azure DevOps account for Git integration
- The `retailiq-fabric` repository initialised with the folder structure defined in the repo specification
- Familiarity with the Fabric portal UI (no prior build experience required)

---

## 3. Repository Structure for This Project

All artefacts produced in this project should be committed to the following paths in `retailiq-fabric/`:

```
retailiq-fabric/
├── workspace/
│   ├── spark-settings.json
│   ├── onelake-settings.json
│   └── deployment-pipelines/
│       └── retailiq-pipeline.json
├── security/
│   ├── row-level-security.sql
│   ├── workspace-roles.json
│   └── sensitivity-labels.md
└── docs/
    └── architecture.md
```

---

## 4. Step-by-Step Implementation

### 4.1 Create the Fabric Workspace

**Action:** In the Fabric portal, create a new workspace named `retailiq-dev`.

**Configuration requirements:**
- License mode: `Fabric capacity` (attach to your available capacity)
- Description: `"RetailIQ development workspace — data engineering platform"`
- Workspace image: optional, can be skipped

**Repeat** this process to create two additional workspaces:
- `retailiq-test`
- `retailiq-prod`

All three workspaces must be attached to the same Fabric capacity.

**Output:** Three workspaces exist in the Fabric portal.

---

### 4.2 Configure Git Integration

**Action:** Connect the `retailiq-dev` workspace to the `retailiq-fabric` GitHub/Azure DevOps repository.

**Steps:**
1. In `retailiq-dev`, go to **Workspace settings → Git integration**
2. Connect to your Git provider
3. Set the repository to `retailiq-fabric`
4. Set the branch to `dev`
5. Set the sync folder to `/` (root)
6. Click **Connect and sync**

**Note:** `retailiq-test` should be connected to branch `test`, and `retailiq-prod` to branch `main`. Do not configure these yet — they will be set up via the deployment pipeline in step 4.7.

**Commit the following file** to the `dev` branch immediately after connecting:

`workspace/onelake-settings.json`:
```json
{
  "workspaceName": "retailiq-dev",
  "onelakeSettings": {
    "storageRegion": "East US",
    "softDeleteEnabled": true,
    "softDeleteRetentionDays": 7
  }
}
```

---

### 4.3 Create the Lakehouse

**Action:** Inside `retailiq-dev`, create a new Lakehouse item named `retailiq_lakehouse`.

**After creation**, manually create the following folder structure inside the **Files** section of the lakehouse (these are raw file folders, not Delta tables):

```
Files/
├── bronze/
│   ├── sales/
│   ├── products/
│   ├── stores/
│   └── sensors/
├── silver/
│   ├── sales/
│   ├── products/
│   ├── stores/
│   └── sensors/
└── gold/
    ├── fact_sales/
    ├── dim_product/
    ├── dim_store/
    └── dim_date/
```

**Important naming conventions:**
- All folder names must be lowercase with underscores
- No spaces anywhere in paths
- Bronze = raw, unmodified source data
- Silver = cleaned, conformed, deduplicated
- Gold = dimensional model ready for consumption

**Output:** Lakehouse `retailiq_lakehouse` exists with the full medallion folder structure.

---

### 4.4 Configure Spark Workspace Settings

**Action:** Configure the Spark environment for the workspace.

In `retailiq-dev`, go to **Workspace settings → Data Engineering/Science → Spark settings**.

Apply the following configuration:

| Setting | Value | Reason |
|---|---|---|
| Runtime version | `1.3 (Spark 3.5)` | Latest stable runtime |
| High concurrency mode | Enabled | Allows multiple notebooks to share a session |
| Autotune | Enabled | Automatically optimises shuffle partitions |
| Default pool | Starter pool | Sufficient for dev workloads |
| Native execution engine | Enabled | Improves Parquet/Delta performance |

**Commit** the following file to the repo:

`workspace/spark-settings.json`:
```json
{
  "runtime": "1.3",
  "highConcurrencyMode": true,
  "autotuneEnabled": true,
  "defaultPool": "StarterPool",
  "nativeExecutionEngine": true,
  "environmentName": null
}
```

---

### 4.5 Plan Security and Governance (Executed in P3)

**Action:** Review the security requirements below. Implementation happens in Project 3 after the gold layer tables exist.

**Security requirements for RetailIQ:**

| Requirement | Mechanism | When Applied |
|---|---|---|
| Regional managers see only their region | OneLake Security Role (row-level filter on `fact_sales`) | P3, after gold tables exist |
| Analysts cannot see cost/margin columns | OneLake Security Role (column-level restriction) | P3, after gold tables exist |
| Customer PII masked for non-admins | Dynamic Data Masking in Warehouse | P3, after creating warehouse & dim_customer |
| Items labelled by sensitivity | Portal: "..." → Sensitivity label | P3, after items exist |
| Lakehouse endorsed as certified | Portal: "..." → Endorsement | P3, after data is confirmed working |
| All activity captured for audit | Workspace logging to Eventhouse | Applied now (P1, next step) |

**No files to commit for security in this project** — you will configure all of the above in Project 3 after the data is loaded.

---

### 4.6 Configure Workspace Logging

**Action:** Enable logging so that all workspace activity is captured.

In `retailiq-dev`, go to **Workspace settings → Monitoring → Workspace logging**.

Enable the following log categories:
- Item operations (create, update, delete)
- Access operations (who accessed what)
- Pipeline run logs
- Spark session logs

Set log destination to a new Eventhouse item named `retailiq_logs` (create this item in the workspace — it will be used in Project 5 for monitoring).

---

### 4.7 Create and Configure the Deployment Pipeline

**Action:** Create a Fabric deployment pipeline that promotes content from Dev → Test → Prod.

**Steps:**
1. In the Fabric portal, go to **Deployment pipelines → New pipeline**
2. Name it `retailiq-deploy`
3. Assign workspaces:
   - Stage 1 (Development): `retailiq-dev`
   - Stage 2 (Test): `retailiq-test`
   - Stage 3 (Production): `retailiq-prod`

**Configure deployment rules** — these override specific item properties when promoting between stages. Fabric supports three rule types: Data source, Parameter, and Default lakehouse. For our project:

1. **Default lakehouse rule for notebooks:** In the Test stage, set a rule so every notebook uses the Test lakehouse instead of the Dev lakehouse:
   - In the pipeline, select the **Test** stage
   - Click **Deployment rules** (or stage settings gear → Deployment rules)
   - Find your notebooks (e.g., `nb_transform_bronze_to_silver_sales`)
   - Rule type: **Default lakehouse** → select `retailiq_lakehouse` (this will be the Test lakehouse after deployment — note: in reality you'd have a separate Test lakehouse; for this demo, the rule shows the concept)
   - Click **Add**
2. Repeat for the **Production** stage with the Prod lakehouse

**Note:** You won't see rules for pipelines, connections, or Spark pools in the deployment rules UI — those aren't supported rule types. The exam tests what rules exist and which items they apply to (see table below).

**Commit** the pipeline definition to `workspace/deployment-pipelines/retailiq-pipeline.json` after export.

---

### 4.8 Configure Domain Workspace Settings

**Action:** Assign the workspace to a Fabric domain to organize and govern workspaces by business area.

**Note:** Domain management is a tenant-level admin function. If you have Fabric admin rights, follow the steps below. If you do not, read through them to understand the concept — the exam expects you to know how domains work.

**Steps (admin only):**
1. Go to the **Fabric Admin portal** (gear icon → Admin portal)
2. Select **Domains** from the left navigation
3. Click **New domain**
4. Name: `Data Engineering`
5. Description: `"Workspaces for data ingestion, transformation, and orchestration"`
6. (Optional) Set a domain icon and color for visual identification
7. Click **Create**
8. In the domain detail page, click **Assign workspaces**
9. Search for and select: `retailiq-dev`, `retailiq-test`, `retailiq-prod`
10. Click **Assign**

**Non-admin alternative:** Review the Domains page in the Admin portal to see which domains exist and which workspaces they contain. Document the desired assignment in `docs/architecture.md`.

**Exam note:** Domains let you organize workspaces by business area (e.g., Sales, Finance, Data Engineering) and apply consistent governance policies. You should know how to create domains and assign workspaces in the Admin portal.

---

### 4.9 Implement Workspace-Level Access Controls

**Action:** Set up workspace roles to control who can do what in `retailiq-dev`.

**Steps:**
1. In `retailiq-dev`, click the **Manage Access** button (top-right area)
2. Click **Add people** (or **Add members**)
3. Add a test user (or another account you control) with appropriate roles:

| Role | Recommended Assignment | Permissions |
|---|---|---|
| Admin | Your primary account | Full control — manage roles, settings, items |
| Member | Data engineering team | Create/edit items, run pipelines, not manage access |
| Contributor | Analytics team | View and interact with items, not create new ones |
| Viewer | Stakeholders | Read-only access to items and data |

4. If you only have one account, assign a colleague's account as **Member** for demonstration

**Commit** the role assignments to `security/workspace-roles.json`:
```json
{
  "workspace": "retailiq-dev",
  "roles": [
    { "role": "Admin", "members": ["your.name@company.com"] },
    { "role": "Member", "members": ["engineer@company.com"] },
    { "role": "Contributor", "members": ["analyst@company.com"] },
    { "role": "Viewer", "members": ["stakeholder@company.com"] }
  ]
}
```

**Exam note:** Workspace roles (Admin/Member/Contributor/Viewer) control what users can do at the workspace level. Item-level permissions (Share/Manage permissions) provide finer-grained control — those are configured in Project 3 after items exist.

---

## 5. Validation Checklist

Before marking this project complete, verify every item below:

- [ ] Three workspaces exist: `retailiq-dev`, `retailiq-test`, `retailiq-prod`
- [ ] `retailiq-dev` is connected to Git on the `dev` branch
- [ ] `retailiq_lakehouse` exists in `retailiq-dev` with the full bronze/silver/gold folder structure
- [ ] Spark settings are configured with high concurrency, autotune, and native execution engine enabled
- [ ] `workspace/spark-settings.json` and `workspace/onelake-settings.json` are committed to the repo
- [ ] Workspace logging is enabled and pointing to `retailiq_logs` eventhouse (used in P5)
- [ ] Deployment pipeline `retailiq-deploy` exists with all three stages assigned
- [ ] Domains reviewed — workspaces assigned to `Data Engineering` domain (or documented)
- [ ] Workspace-level access controls configured — roles documented in `security/workspace-roles.json`
- [ ] Security requirements reviewed — execution deferred to P3

---

## 6. Exam Topics Covered

| Exam Objective | Covered In |
|---|---|---|
| Configure Fabric workspace settings | Step 4.1 |
| Configure domain workspace settings | Step 4.8 |
| Configure Spark workspace settings | Step 4.4 |
| Configure OneLake workspace settings | Step 4.2 |
| Implement workspace-level access controls | Step 4.9 |
| Apply sensitivity labels to items | Deferred to P3 |
| Endorse items | Deferred to P3 |
| Implement and use workspace logging | Step 4.6 |
| Create and configure deployment pipelines | Step 4.7 |
| Configure version control | Step 4.2 |
| Review security & governance requirements | Step 4.5 |

---

## 7. Further Reading

- [Microsoft Fabric workspace settings](https://learn.microsoft.com/en-us/fabric/get-started/workspaces)
- [OneLake security](https://learn.microsoft.com/en-us/fabric/onelake/security/get-started-security)
- [Row-level security in Fabric](https://learn.microsoft.com/en-us/fabric/data-warehouse/row-level-security)
- [Deployment pipelines](https://learn.microsoft.com/en-us/fabric/cicd/deployment-pipelines/intro-to-deployment-pipelines)
- [Sensitivity labels in Fabric](https://learn.microsoft.com/en-us/fabric/governance/information-protection)
