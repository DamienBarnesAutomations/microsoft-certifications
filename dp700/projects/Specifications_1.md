# Specifications_1.md
# RetailIQ — Project 1: Build the Foundation
**Domain:** Implement & Manage an Analytics Solution  
**Estimated Effort:** 4–6 hours  
**Fabric Items Created:** Workspace, Lakehouse, Deployment Pipeline, Security Rules, Sensitivity Labels

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

### 4.5 Configure Domain Workspace Settings

**Action:** If your Fabric tenant has domain management enabled, assign the `retailiq-dev` workspace to a domain named `Retail Analytics`. If domains are not available on your tenant, document this as a known limitation in `docs/architecture.md`.

**Steps (if domains are available):**
1. Go to the Fabric **Admin portal → Domains**
2. Create a domain named `Retail Analytics` if it does not exist
3. Assign all three workspaces (`retailiq-dev`, `retailiq-test`, `retailiq-prod`) to this domain

---

### 4.6 Implement Workspace-Level Access Controls

**Action:** Assign roles to simulated team members across all three workspaces.

For the purposes of this project, create the following **fictitious user groups** (or use real Entra ID groups if available in your tenant). Document the intended assignments in `security/workspace-roles.json` even if you cannot create real groups.

**Role assignments:**

| Group / User | Workspace | Role |
|---|---|---|
| `grp-fabric-admins` | retailiq-dev, test, prod | Admin |
| `grp-data-engineers` | retailiq-dev | Member |
| `grp-data-engineers` | retailiq-test | Contributor |
| `grp-data-engineers` | retailiq-prod | Viewer |
| `grp-data-analysts` | retailiq-prod | Viewer |
| `grp-regional-managers` | retailiq-prod | Viewer |

**Rationale to document:** Engineers have full edit rights in dev but are restricted in prod. Analysts and managers are read-only in prod only.

`security/workspace-roles.json`:
```json
{
  "roleAssignments": [
    { "group": "grp-fabric-admins", "workspace": "retailiq-dev", "role": "Admin" },
    { "group": "grp-fabric-admins", "workspace": "retailiq-test", "role": "Admin" },
    { "group": "grp-fabric-admins", "workspace": "retailiq-prod", "role": "Admin" },
    { "group": "grp-data-engineers", "workspace": "retailiq-dev", "role": "Member" },
    { "group": "grp-data-engineers", "workspace": "retailiq-test", "role": "Contributor" },
    { "group": "grp-data-engineers", "workspace": "retailiq-prod", "role": "Viewer" },
    { "group": "grp-data-analysts", "workspace": "retailiq-prod", "role": "Viewer" },
    { "group": "grp-regional-managers", "workspace": "retailiq-prod", "role": "Viewer" }
  ]
}
```

---

### 4.7 Implement Row-Level Security (RLS)

**Action:** Define RLS rules that will be applied to the `fact_sales` table once it is created in Project 3. Write the SQL now and store it so it is ready to apply.

The business rule is: **Regional managers should only see sales data for their own region.**

`security/row-level-security.sql`:
```sql
-- ============================================================
-- RetailIQ Row-Level Security Policy
-- Applied to: retailiq_lakehouse.gold.fact_sales
-- ============================================================

-- Step 1: Create a mapping table (to be created in Project 3)
-- This table maps user principal names to their allowed regions
CREATE TABLE IF NOT EXISTS retailiq_lakehouse.gold.dim_user_region_access (
    user_principal_name STRING NOT NULL,
    allowed_region      STRING NOT NULL
);

-- Seed data (representative — expand as needed)
INSERT INTO retailiq_lakehouse.gold.dim_user_region_access VALUES
('manager.north@retailiq.com',   'North'),
('manager.south@retailiq.com',   'South'),
('manager.east@retailiq.com',    'East'),
('manager.west@retailiq.com',    'West'),
('analyst@retailiq.com',         NULL),   -- NULL means access to all regions
('dataengineer@retailiq.com',    NULL);

-- Step 2: RLS Filter Definition
-- In Fabric Warehouse or Power BI semantic model, apply this logic:
-- A user can see a row in fact_sales IF:
--   a) Their UPN maps to NULL (all-access), OR
--   b) Their UPN maps to the store_region of the row

-- Pseudocode for semantic model RLS filter on fact_sales:
-- [store_region] = LOOKUPVALUE(
--     dim_user_region_access[allowed_region],
--     dim_user_region_access[user_principal_name], USERPRINCIPALNAME()
-- ) || ISBLANK(
--     LOOKUPVALUE(
--         dim_user_region_access[allowed_region],
--         dim_user_region_access[user_principal_name], USERPRINCIPALNAME()
--     )
-- )

-- Note: In Fabric Data Warehouse, RLS is implemented via security policies:
-- CREATE SECURITY POLICY SalesRegionFilter
-- ADD FILTER PREDICATE dbo.fn_region_access_predicate(store_region)
-- ON dbo.fact_sales
-- WITH (STATE = ON);
```

---

### 4.8 Implement Column-Level Security

**Action:** Define which columns in `fact_sales` should be restricted from `grp-data-analysts`. Analysts should not see raw cost price or margin data.

Add the following section to `security/row-level-security.sql`:

```sql
-- ============================================================
-- Column-Level Security
-- Restrict cost/margin columns from analysts
-- ============================================================

-- In Fabric Data Warehouse, use DENY on specific columns:
-- DENY SELECT ON dbo.fact_sales (unit_cost, gross_margin_pct)
-- TO [grp-data-analysts];

-- Columns restricted from grp-data-analysts:
--   - unit_cost
--   - gross_margin_pct
--   - supplier_price

-- Columns accessible to all roles:
--   - sale_id, sale_date, store_id, product_id,
--     quantity_sold, unit_price, total_revenue, region
```

---

### 4.9 Implement Dynamic Data Masking

**Action:** Define a masking policy so that customer-identifiable fields in any future customer table are masked for non-admin users.

Add to `security/row-level-security.sql`:

```sql
-- ============================================================
-- Dynamic Data Masking
-- Applied to: any table containing customer PII
-- ============================================================

-- Example: if a dim_customer table is added in future
-- ALTER TABLE dbo.dim_customer
-- ALTER COLUMN customer_email ADD MASKED WITH (FUNCTION = 'email()');

-- ALTER TABLE dbo.dim_customer
-- ALTER COLUMN customer_phone ADD MASKED WITH (FUNCTION = 'partial(0,"XXX-XXX-",4)');

-- ALTER TABLE dbo.dim_customer
-- ALTER COLUMN customer_name ADD MASKED WITH (FUNCTION = 'partial(1,"...",1)');

-- Grant unmask to admins and engineers only:
-- GRANT UNMASK ON dbo.dim_customer TO [grp-fabric-admins];
-- GRANT UNMASK ON dbo.dim_customer TO [grp-data-engineers];
```

---

### 4.10 Apply Sensitivity Labels

**Action:** Document the sensitivity label strategy for RetailIQ's Fabric items. Apply labels in the portal where possible.

`security/sensitivity-labels.md`:

```markdown
# RetailIQ Sensitivity Label Strategy

## Label Definitions (from Microsoft Purview)

| Label | Description | Applied To |
|---|---|---|
| Public | No restrictions | docs/, architecture diagrams |
| General | Internal use only | Bronze layer tables, raw files |
| Confidential | Business sensitive | Silver layer tables, gold dim tables |
| Highly Confidential | Restricted access | fact_sales, cost/margin columns, any PII |

## Application Rules

- All **Gold layer** Lakehouse tables → `Confidential`
- `fact_sales` → `Highly Confidential`
- Any column containing cost, margin, or supplier data → `Highly Confidential`
- Notebooks and pipelines → `General`
- Deployment pipeline configuration → `Confidential`

## How to Apply in Fabric Portal
1. Open the item (e.g. the Lakehouse)
2. Click the item's "..." menu → Sensitivity label
3. Select the appropriate label
4. Click Save

Note: Sensitivity labels require Microsoft Purview to be configured
at the tenant level. If unavailable, document intended labels only.
```

---

### 4.11 Endorse Items

**Action:** Once the lakehouse is confirmed working, endorse it in the Fabric portal.

**Steps:**
1. Open `retailiq_lakehouse` in `retailiq-prod` (after deployment)
2. Click **"..." → Endorsement**
3. Set to **Certified** (requires admin rights) or **Promoted** if certification is unavailable
4. Add the description: `"Certified RetailIQ production lakehouse. Managed by the data engineering team."`

---

### 4.12 Configure Workspace Logging

**Action:** Enable logging so that all workspace activity is captured.

In `retailiq-dev`, go to **Workspace settings → Monitoring → Workspace logging**.

Enable the following log categories:
- Item operations (create, update, delete)
- Access operations (who accessed what)
- Pipeline run logs
- Spark session logs

Set log destination to a new Eventhouse item named `retailiq_logs` (create this item in the workspace — it will be used in Project 5 for monitoring).

---

### 4.13 Create and Configure the Deployment Pipeline

**Action:** Create a Fabric deployment pipeline that promotes content from Dev → Test → Prod.

**Steps:**
1. In the Fabric portal, go to **Deployment pipelines → New pipeline**
2. Name it `retailiq-deploy`
3. Assign workspaces:
   - Stage 1 (Development): `retailiq-dev`
   - Stage 2 (Test): `retailiq-test`
   - Stage 3 (Production): `retailiq-prod`

**Configure deployment rules** (these override settings when promoting between stages):

| Item | Rule Type | Dev Value | Prod Value |
|---|---|---|---|
| Lakehouse connection | Parameter | `retailiq-dev-connection` | `retailiq-prod-connection` |
| Pipeline schedule | On/Off | Off | On |
| Spark pool | Parameter | `StarterPool` | `MediumPool` |

**Commit** the pipeline definition to `workspace/deployment-pipelines/retailiq-pipeline.json` after export.

---

## 5. Validation Checklist

Before marking this project complete, verify every item below:

- [ ] Three workspaces exist: `retailiq-dev`, `retailiq-test`, `retailiq-prod`
- [ ] `retailiq-dev` is connected to Git on the `dev` branch
- [ ] `retailiq_lakehouse` exists in `retailiq-dev` with the full bronze/silver/gold folder structure
- [ ] Spark settings are configured with high concurrency, autotune, and native execution engine enabled
- [ ] `workspace/spark-settings.json` and `workspace/onelake-settings.json` are committed to the repo
- [ ] `security/workspace-roles.json` documents all role assignments
- [ ] `security/row-level-security.sql` contains RLS, CLS, and DDM definitions
- [ ] `security/sensitivity-labels.md` documents the label strategy
- [ ] Workspace logging is enabled and pointing to `retailiq_logs` eventhouse
- [ ] Deployment pipeline `retailiq-deploy` exists with all three stages assigned
- [ ] Lakehouse is endorsed (Promoted or Certified) in prod

---

## 6. Exam Topics Covered

| Exam Objective | Covered In |
|---|---|
| Configure Spark workspace settings | Step 4.4 |
| Configure domain workspace settings | Step 4.5 |
| Configure OneLake workspace settings | Step 4.2 |
| Implement workspace-level access controls | Step 4.6 |
| Implement row-level, column-level, and object-level access controls | Steps 4.7, 4.8 |
| Implement dynamic data masking | Step 4.9 |
| Apply sensitivity labels to items | Step 4.10 |
| Endorse items | Step 4.11 |
| Implement and use workspace logging | Step 4.12 |
| Create and configure deployment pipelines | Step 4.13 |
| Configure version control | Step 4.2 |

---

## 7. Further Reading

- [Microsoft Fabric workspace settings](https://learn.microsoft.com/en-us/fabric/get-started/workspaces)
- [OneLake security](https://learn.microsoft.com/en-us/fabric/onelake/security/get-started-security)
- [Row-level security in Fabric](https://learn.microsoft.com/en-us/fabric/data-warehouse/row-level-security)
- [Deployment pipelines](https://learn.microsoft.com/en-us/fabric/cicd/deployment-pipelines/intro-to-deployment-pipelines)
- [Sensitivity labels in Fabric](https://learn.microsoft.com/en-us/fabric/governance/information-protection)
