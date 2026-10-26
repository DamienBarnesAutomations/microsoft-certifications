// DP-700 skills outline (study guide skills measured) and which practice question tests which skill.
// Domain 4 (inOutline: false) holds questions on topics outside the current outline; the app leaves them out of test mode.
// Skill ids are domain.topic.skill (e.g. 2.1.3); a question belongs to exactly one skill.
window.DP700_OUTLINE = {
  domains: [
  {
    "id": "1",
    "title": "Implement and manage an analytics solution",
    "weight": "30-35%",
    "topics": [
      {
        "id": "1.1",
        "title": "Configure Microsoft Fabric workspace settings",
        "skills": [
          {
            "id": "1.1.1",
            "title": "Configure Spark workspace settings"
          },
          {
            "id": "1.1.2",
            "title": "Configure domain workspace settings"
          },
          {
            "id": "1.1.3",
            "title": "Configure OneLake workspace settings"
          },
          {
            "id": "1.1.4",
            "title": "Configure Apache Airflow workspace settings"
          }
        ]
      },
      {
        "id": "1.2",
        "title": "Implement lifecycle management in Fabric",
        "skills": [
          {
            "id": "1.2.1",
            "title": "Configure version control"
          },
          {
            "id": "1.2.2",
            "title": "Implement database projects"
          },
          {
            "id": "1.2.3",
            "title": "Create and configure deployment pipelines"
          }
        ]
      },
      {
        "id": "1.3",
        "title": "Configure security and governance",
        "skills": [
          {
            "id": "1.3.1",
            "title": "Implement workspace-level access controls"
          },
          {
            "id": "1.3.2",
            "title": "Implement item-level access controls"
          },
          {
            "id": "1.3.3",
            "title": "Implement row-level, column-level, object-level, and folder/file-level access controls"
          },
          {
            "id": "1.3.4",
            "title": "Implement dynamic data masking"
          },
          {
            "id": "1.3.5",
            "title": "Apply sensitivity labels to items"
          },
          {
            "id": "1.3.6",
            "title": "Endorse items"
          },
          {
            "id": "1.3.7",
            "title": "Implement and use Microsoft Fabric audit logs"
          },
          {
            "id": "1.3.8",
            "title": "Configure and implement OneLake security"
          }
        ]
      },
      {
        "id": "1.4",
        "title": "Orchestrate processes",
        "skills": [
          {
            "id": "1.4.1",
            "title": "Choose between Dataflow gen 2, a pipeline and a notebook"
          },
          {
            "id": "1.4.2",
            "title": "Design and implement schedules and event-based triggers"
          },
          {
            "id": "1.4.3",
            "title": "Implement orchestration patterns with notebooks and pipelines, including parameters and dynamic expressions"
          }
        ]
      }
    ]
  },
  {
    "id": "2",
    "title": "Ingest and transform data",
    "weight": "30-35%",
    "topics": [
      {
        "id": "2.1",
        "title": "Design and implement loading patterns",
        "skills": [
          {
            "id": "2.1.1",
            "title": "Design and implement full and incremental data loads"
          },
          {
            "id": "2.1.2",
            "title": "Prepare data for loading into a dimensional model"
          },
          {
            "id": "2.1.3",
            "title": "Design and implement a loading pattern for streaming data"
          }
        ]
      },
      {
        "id": "2.2",
        "title": "Ingest and transform batch data",
        "skills": [
          {
            "id": "2.2.1",
            "title": "Choose an appropriate data store"
          },
          {
            "id": "2.2.2",
            "title": "Choose between Dataflows Gen2, notebooks, KQL, and T-SQL for data transformation"
          },
          {
            "id": "2.2.3",
            "title": "Create and manage OneLake shortcuts"
          },
          {
            "id": "2.2.4",
            "title": "Implement mirroring"
          },
          {
            "id": "2.2.5",
            "title": "Ingest data by using pipelines"
          },
          {
            "id": "2.2.6",
            "title": "Transform data by using PySpark, SQL, and KQL"
          },
          {
            "id": "2.2.7",
            "title": "Denormalize data"
          },
          {
            "id": "2.2.8",
            "title": "Group and aggregate data"
          },
          {
            "id": "2.2.9",
            "title": "Handle duplicate, missing, and late-arriving data"
          }
        ]
      },
      {
        "id": "2.3",
        "title": "Ingest and transform streaming data",
        "skills": [
          {
            "id": "2.3.1",
            "title": "Choose an appropriate streaming engine"
          },
          {
            "id": "2.3.2",
            "title": "Choose between native tables and OneLake shortcuts in Real-Time Intelligence"
          },
          {
            "id": "2.3.3",
            "title": "Choose between Query acceleration for OneLake shortcuts and standard OneLake shortcuts in Real-Time Intelligence"
          },
          {
            "id": "2.3.4",
            "title": "Process data by using Eventstream"
          },
          {
            "id": "2.3.5",
            "title": "Process data by using Spark structured streaming"
          },
          {
            "id": "2.3.6",
            "title": "Process data by using KQL"
          },
          {
            "id": "2.3.7",
            "title": "Create windowing functions"
          }
        ]
      }
    ]
  },
  {
    "id": "3",
    "title": "Monitor and optimize an analytics solution",
    "weight": "30-35%",
    "topics": [
      {
        "id": "3.1",
        "title": "Monitor Fabric items",
        "skills": [
          {
            "id": "3.1.1",
            "title": "Monitor data ingestion"
          },
          {
            "id": "3.1.2",
            "title": "Monitor data transformation"
          },
          {
            "id": "3.1.3",
            "title": "Monitor semantic model refresh"
          },
          {
            "id": "3.1.4",
            "title": "Configure alerts"
          }
        ]
      },
      {
        "id": "3.2",
        "title": "Identify and resolve errors",
        "skills": [
          {
            "id": "3.2.1",
            "title": "Identify and resolve pipeline errors"
          },
          {
            "id": "3.2.2",
            "title": "Identify and resolve Dataflow Gen2 errors"
          },
          {
            "id": "3.2.3",
            "title": "Identify and resolve notebook errors"
          },
          {
            "id": "3.2.4",
            "title": "Identify and resolve Eventhouse errors"
          },
          {
            "id": "3.2.5",
            "title": "Identify and resolve Eventstream errors"
          },
          {
            "id": "3.2.6",
            "title": "Identify and resolve T-SQL errors"
          },
          {
            "id": "3.2.7",
            "title": "Identify and resolve OneLake shortcut errors"
          }
        ]
      },
      {
        "id": "3.3",
        "title": "Optimize performance",
        "skills": [
          {
            "id": "3.3.1",
            "title": "Optimize a Lakehouse table"
          },
          {
            "id": "3.3.2",
            "title": "Optimize a pipeline"
          },
          {
            "id": "3.3.3",
            "title": "Optimize a data warehouse"
          },
          {
            "id": "3.3.4",
            "title": "Optimize Eventstream and Eventhouse"
          },
          {
            "id": "3.3.5",
            "title": "Optimize Spark performance"
          },
          {
            "id": "3.3.6",
            "title": "Optimize query performance"
          }
        ]
      }
    ]
  },
  {
    "id": "4",
    "inOutline": false,
    "title": "Other topics (not in the current outline)",
    "weight": "",
    "topics": [
      {
        "id": "4.1",
        "title": "Semantic models and DAX",
        "skills": [
          {
            "id": "4.1.1",
            "title": "Direct Lake, DAX and semantic model design"
          }
        ]
      },
      {
        "id": "4.2",
        "title": "AI and Copilot",
        "skills": [
          {
            "id": "4.2.1",
            "title": "Copilot in Fabric"
          }
        ]
      },
      {
        "id": "4.3",
        "title": "Platform administration",
        "skills": [
          {
            "id": "4.3.1",
            "title": "Capacity, licensing and tenant settings"
          }
        ]
      },
      {
        "id": "4.4",
        "title": "Real-Time Dashboards",
        "skills": [
          {
            "id": "4.4.1",
            "title": "Real-Time Dashboards"
          }
        ]
      }
    ]
  }
],
  questionsBySkill: {
  "1.1.1": [
    "dp700-1-006",
    "dp700-1-009",
    "dp700-1-014",
    "dp700-1-025",
    "dp700-1-045",
    "dp700-1-058",
    "dp700-1-059",
    "dp700-1-060",
    "dp700-1-062",
    "dp700-1-063",
    "dp700-1-078",
    "dp700-4-041"
  ],
  "1.1.2": [
    "dp700-5-005",
    "dp700-5-019",
    "dp700-5-022",
    "dp700-5-043",
    "dp700-7-071",
    "dp700-7-072",
    "dp700-7-073",
    "dp700-7-074",
    "dp700-7-075"
  ],
  "1.1.3": [
    "dp700-2-046",
    "dp700-7-076",
    "dp700-7-077",
    "dp700-7-078",
    "dp700-7-079",
    "dp700-7-080",
    "dp700-7-081",
    "dp700-7-252"
  ],
  "1.1.4": [
    "dp700-7-082",
    "dp700-7-083",
    "dp700-7-084",
    "dp700-7-085",
    "dp700-7-086",
    "dp700-7-087",
    "dp700-7-088",
    "dp700-7-089"
  ],
  "1.2.1": [
    "dp700-5-007",
    "dp700-5-012",
    "dp700-5-014",
    "dp700-5-024",
    "dp700-5-038",
    "dp700-5-046",
    "dp700-5-047",
    "dp700-5-049",
    "dp700-5-050",
    "dp700-5-051",
    "dp700-5-052"
  ],
  "1.2.2": [
    "dp700-7-090",
    "dp700-7-091",
    "dp700-7-092",
    "dp700-7-093",
    "dp700-7-094",
    "dp700-7-095",
    "dp700-7-096",
    "dp700-7-097"
  ],
  "1.2.3": [
    "dp700-2-055",
    "dp700-5-002",
    "dp700-5-013",
    "dp700-5-029",
    "dp700-5-048",
    "dp700-5-053",
    "dp700-5-054",
    "dp700-7-253"
  ],
  "1.3.1": [
    "dp700-2-044",
    "dp700-4-024",
    "dp700-5-001",
    "dp700-5-003",
    "dp700-5-004",
    "dp700-5-016",
    "dp700-5-030",
    "dp700-5-040"
  ],
  "1.3.2": [
    "dp700-5-010",
    "dp700-5-011",
    "dp700-7-098",
    "dp700-7-099",
    "dp700-7-100",
    "dp700-7-101",
    "dp700-7-102",
    "dp700-7-103"
  ],
  "1.3.3": [
    "dp700-2-002",
    "dp700-2-054",
    "dp700-4-008",
    "dp700-4-012",
    "dp700-4-030",
    "dp700-4-031",
    "dp700-4-060",
    "dp700-4-061",
    "dp700-5-028"
  ],
  "1.3.4": [
    "dp700-4-005",
    "dp700-4-029",
    "dp700-5-037",
    "dp700-7-104",
    "dp700-7-105",
    "dp700-7-106",
    "dp700-7-107",
    "dp700-7-108",
    "dp700-7-109"
  ],
  "1.3.5": [
    "dp700-7-110",
    "dp700-7-111",
    "dp700-7-112",
    "dp700-7-113",
    "dp700-7-114",
    "dp700-7-115",
    "dp700-7-116",
    "dp700-7-117"
  ],
  "1.3.6": [
    "dp700-5-025",
    "dp700-7-118",
    "dp700-7-119",
    "dp700-7-120",
    "dp700-7-121",
    "dp700-7-122",
    "dp700-7-123",
    "dp700-7-124"
  ],
  "1.3.7": [
    "dp700-5-021",
    "dp700-5-026",
    "dp700-5-041",
    "dp700-7-125",
    "dp700-7-126",
    "dp700-7-127",
    "dp700-7-128",
    "dp700-7-129"
  ],
  "1.3.8": [
    "dp700-5-031",
    "dp700-7-130",
    "dp700-7-131",
    "dp700-7-132",
    "dp700-7-133",
    "dp700-7-134",
    "dp700-7-135",
    "dp700-7-136"
  ],
  "1.4.1": [
    "dp700-1-026",
    "dp700-1-061",
    "dp700-1-092",
    "dp700-7-137",
    "dp700-7-138",
    "dp700-7-139",
    "dp700-7-140",
    "dp700-7-141",
    "dp700-7-142"
  ],
  "1.4.2": [
    "dp700-1-001",
    "dp700-1-088",
    "dp700-5-033",
    "dp700-7-143",
    "dp700-7-144",
    "dp700-7-145",
    "dp700-7-146",
    "dp700-7-147",
    "dp700-7-148",
    "dp700-7-149"
  ],
  "1.4.3": [
    "dp700-1-010",
    "dp700-1-012",
    "dp700-1-033",
    "dp700-1-036",
    "dp700-1-040",
    "dp700-1-042",
    "dp700-1-048",
    "dp700-1-053",
    "dp700-1-080",
    "dp700-1-091"
  ],
  "2.1.1": [
    "dp700-2-022",
    "dp700-4-002",
    "dp700-4-007",
    "dp700-4-010",
    "dp700-4-019",
    "dp700-4-056",
    "dp700-4-058",
    "dp700-5-035"
  ],
  "2.1.2": [
    "dp700-4-003",
    "dp700-4-009",
    "dp700-4-017",
    "dp700-4-018",
    "dp700-4-032",
    "dp700-4-034",
    "dp700-4-035",
    "dp700-4-043",
    "dp700-4-047",
    "dp700-4-053",
    "dp700-4-054",
    "dp700-4-057",
    "dp700-4-062"
  ],
  "2.1.3": [
    "dp700-7-001",
    "dp700-7-002",
    "dp700-7-003",
    "dp700-7-004",
    "dp700-7-005",
    "dp700-7-006",
    "dp700-7-007",
    "dp700-7-008"
  ],
  "2.2.1": [
    "dp700-2-010",
    "dp700-2-017",
    "dp700-2-023",
    "dp700-2-038",
    "dp700-2-039",
    "dp700-2-048",
    "dp700-2-056",
    "dp700-2-057",
    "dp700-2-058",
    "dp700-2-059",
    "dp700-2-060",
    "dp700-2-061",
    "dp700-4-016"
  ],
  "2.2.2": [
    "dp700-1-002",
    "dp700-1-003",
    "dp700-1-011",
    "dp700-1-031",
    "dp700-1-032",
    "dp700-1-034",
    "dp700-1-049",
    "dp700-1-050",
    "dp700-1-051",
    "dp700-1-052",
    "dp700-1-082",
    "dp700-1-085",
    "dp700-1-089",
    "dp700-2-042"
  ],
  "2.2.3": [
    "dp700-2-012",
    "dp700-2-030",
    "dp700-2-032",
    "dp700-2-047",
    "dp700-2-063",
    "dp700-2-066",
    "dp700-7-045",
    "dp700-7-046",
    "dp700-7-047",
    "dp700-7-048"
  ],
  "2.2.4": [
    "dp700-7-049",
    "dp700-7-050",
    "dp700-7-051",
    "dp700-7-052",
    "dp700-7-053",
    "dp700-7-054",
    "dp700-7-055",
    "dp700-7-056"
  ],
  "2.2.5": [
    "dp700-1-005",
    "dp700-1-007",
    "dp700-1-055",
    "dp700-1-056",
    "dp700-1-084",
    "dp700-2-045",
    "dp700-7-009",
    "dp700-7-010"
  ],
  "2.2.6": [
    "dp700-1-004",
    "dp700-1-008",
    "dp700-1-015",
    "dp700-1-016",
    "dp700-1-017",
    "dp700-1-018",
    "dp700-1-019",
    "dp700-1-038",
    "dp700-1-064",
    "dp700-1-065",
    "dp700-1-066",
    "dp700-1-068",
    "dp700-1-069",
    "dp700-1-079",
    "dp700-2-006",
    "dp700-2-008",
    "dp700-2-011",
    "dp700-2-013",
    "dp700-2-025",
    "dp700-2-026",
    "dp700-2-029",
    "dp700-2-033",
    "dp700-2-034",
    "dp700-2-037",
    "dp700-2-041",
    "dp700-2-049",
    "dp700-2-050",
    "dp700-2-053",
    "dp700-2-062",
    "dp700-2-065",
    "dp700-4-001",
    "dp700-4-013",
    "dp700-4-020",
    "dp700-4-021",
    "dp700-4-044",
    "dp700-4-052",
    "dp700-5-036"
  ],
  "2.2.7": [
    "dp700-4-051",
    "dp700-7-011",
    "dp700-7-012",
    "dp700-7-013",
    "dp700-7-014",
    "dp700-7-015",
    "dp700-7-016",
    "dp700-7-017"
  ],
  "2.2.8": [
    "dp700-4-022",
    "dp700-4-023",
    "dp700-7-018",
    "dp700-7-019",
    "dp700-7-020",
    "dp700-7-021",
    "dp700-7-022",
    "dp700-7-023"
  ],
  "2.2.9": [
    "dp700-2-003",
    "dp700-2-031",
    "dp700-2-067",
    "dp700-7-024",
    "dp700-7-025",
    "dp700-7-026",
    "dp700-7-027",
    "dp700-7-254"
  ],
  "2.3.1": [
    "dp700-1-076",
    "dp700-3-009",
    "dp700-3-049",
    "dp700-7-028",
    "dp700-7-029",
    "dp700-7-030",
    "dp700-7-031",
    "dp700-7-255"
  ],
  "2.3.2": [
    "dp700-1-070",
    "dp700-1-071",
    "dp700-7-057",
    "dp700-7-058",
    "dp700-7-059",
    "dp700-7-060",
    "dp700-7-061",
    "dp700-7-062"
  ],
  "2.3.3": [
    "dp700-7-063",
    "dp700-7-064",
    "dp700-7-065",
    "dp700-7-066",
    "dp700-7-067",
    "dp700-7-068",
    "dp700-7-069",
    "dp700-7-070"
  ],
  "2.3.4": [
    "dp700-3-001",
    "dp700-3-002",
    "dp700-3-013",
    "dp700-3-014",
    "dp700-3-015",
    "dp700-3-027",
    "dp700-3-050",
    "dp700-3-052",
    "dp700-3-056",
    "dp700-3-058",
    "dp700-1-035"
  ],
  "2.3.5": [
    "dp700-1-030",
    "dp700-2-051",
    "dp700-7-032",
    "dp700-7-033",
    "dp700-7-034",
    "dp700-7-035",
    "dp700-7-036",
    "dp700-7-037"
  ],
  "2.3.6": [
    "dp700-1-020",
    "dp700-1-024",
    "dp700-1-072",
    "dp700-1-073",
    "dp700-1-074",
    "dp700-1-083",
    "dp700-3-004",
    "dp700-3-006",
    "dp700-3-010",
    "dp700-3-011",
    "dp700-3-017",
    "dp700-3-018",
    "dp700-3-019",
    "dp700-3-032",
    "dp700-3-035",
    "dp700-3-038",
    "dp700-3-039",
    "dp700-3-041",
    "dp700-3-046",
    "dp700-3-053",
    "dp700-3-054"
  ],
  "2.3.7": [
    "dp700-3-016",
    "dp700-7-038",
    "dp700-7-039",
    "dp700-7-040",
    "dp700-7-041",
    "dp700-7-042",
    "dp700-7-043",
    "dp700-7-044"
  ],
  "3.1.1": [
    "dp700-5-008",
    "dp700-5-044",
    "dp700-7-150",
    "dp700-7-151",
    "dp700-7-152",
    "dp700-7-153",
    "dp700-7-154",
    "dp700-7-155"
  ],
  "3.1.2": [
    "dp700-4-004",
    "dp700-4-015",
    "dp700-4-027",
    "dp700-4-028",
    "dp700-4-063",
    "dp700-7-156",
    "dp700-7-157",
    "dp700-7-158",
    "dp700-7-159"
  ],
  "3.1.3": [
    "dp700-4-059",
    "dp700-7-160",
    "dp700-7-161",
    "dp700-7-162",
    "dp700-7-163",
    "dp700-7-164",
    "dp700-7-165",
    "dp700-7-166"
  ],
  "3.1.4": [
    "dp700-3-012",
    "dp700-3-023",
    "dp700-3-024",
    "dp700-3-025",
    "dp700-3-026",
    "dp700-3-030",
    "dp700-3-034",
    "dp700-3-043",
    "dp700-3-047",
    "dp700-5-032",
    "dp700-6-001",
    "dp700-6-003",
    "dp700-6-004",
    "dp700-6-005",
    "dp700-6-006",
    "dp700-6-007",
    "dp700-6-008",
    "dp700-6-009",
    "dp700-6-010",
    "dp700-6-011",
    "dp700-6-012",
    "dp700-6-013",
    "dp700-6-014",
    "dp700-6-015",
    "dp700-6-016",
    "dp700-6-017",
    "dp700-6-018",
    "dp700-6-019",
    "dp700-6-020",
    "dp700-6-021",
    "dp700-6-022",
    "dp700-6-023",
    "dp700-6-024",
    "dp700-6-025",
    "dp700-6-026",
    "dp700-6-027",
    "dp700-6-028",
    "dp700-6-030",
    "dp700-6-031",
    "dp700-6-032",
    "dp700-6-033",
    "dp700-6-034",
    "dp700-7-167",
    "dp700-7-168"
  ],
  "3.2.1": [
    "dp700-1-054",
    "dp700-1-057",
    "dp700-5-015",
    "dp700-7-169",
    "dp700-7-170",
    "dp700-7-171",
    "dp700-7-172",
    "dp700-7-173",
    "dp700-7-174",
    "dp700-7-175"
  ],
  "3.2.2": [
    "dp700-7-176",
    "dp700-7-177",
    "dp700-7-178",
    "dp700-7-179",
    "dp700-7-180",
    "dp700-7-181",
    "dp700-7-182",
    "dp700-7-183"
  ],
  "3.2.3": [
    "dp700-7-184",
    "dp700-7-185",
    "dp700-7-186",
    "dp700-7-187",
    "dp700-7-188",
    "dp700-7-189",
    "dp700-7-190",
    "dp700-7-191"
  ],
  "3.2.4": [
    "dp700-1-077",
    "dp700-7-192",
    "dp700-7-193",
    "dp700-7-194",
    "dp700-7-195",
    "dp700-7-196",
    "dp700-7-197",
    "dp700-7-198"
  ],
  "3.2.5": [
    "dp700-7-199",
    "dp700-7-200",
    "dp700-7-201",
    "dp700-7-202",
    "dp700-7-203",
    "dp700-7-204",
    "dp700-7-205",
    "dp700-7-256"
  ],
  "3.2.6": [
    "dp700-7-206",
    "dp700-7-207",
    "dp700-7-208",
    "dp700-7-209",
    "dp700-7-210",
    "dp700-7-211",
    "dp700-7-212",
    "dp700-7-213"
  ],
  "3.2.7": [
    "dp700-7-214",
    "dp700-7-215",
    "dp700-7-216",
    "dp700-7-217",
    "dp700-7-218",
    "dp700-7-219",
    "dp700-7-220",
    "dp700-7-221"
  ],
  "3.3.1": [
    "dp700-1-067",
    "dp700-1-086",
    "dp700-1-087",
    "dp700-1-090",
    "dp700-2-004",
    "dp700-2-005",
    "dp700-2-009",
    "dp700-2-014",
    "dp700-2-015",
    "dp700-2-016",
    "dp700-2-019",
    "dp700-2-020",
    "dp700-2-024",
    "dp700-2-027",
    "dp700-2-035",
    "dp700-2-036",
    "dp700-2-040",
    "dp700-2-052",
    "dp700-2-064",
    "dp700-2-068"
  ],
  "3.3.2": [
    "dp700-7-222",
    "dp700-7-223",
    "dp700-7-224",
    "dp700-7-225",
    "dp700-7-226",
    "dp700-7-227",
    "dp700-7-228",
    "dp700-7-229"
  ],
  "3.3.3": [
    "dp700-7-230",
    "dp700-7-231",
    "dp700-7-232",
    "dp700-7-233",
    "dp700-7-234",
    "dp700-7-235",
    "dp700-7-236",
    "dp700-7-237"
  ],
  "3.3.4": [
    "dp700-3-045",
    "dp700-1-023",
    "dp700-1-081",
    "dp700-3-003",
    "dp700-3-008",
    "dp700-3-031",
    "dp700-3-048",
    "dp700-3-051",
    "dp700-3-057",
    "dp700-7-238",
    "dp700-7-239",
    "dp700-7-240",
    "dp700-7-241",
    "dp700-7-242"
  ],
  "3.3.5": [
    "dp700-1-013",
    "dp700-1-027",
    "dp700-1-047",
    "dp700-2-043",
    "dp700-7-243",
    "dp700-7-244",
    "dp700-7-245",
    "dp700-7-246",
    "dp700-7-247"
  ],
  "3.3.6": [
    "dp700-1-021",
    "dp700-1-022",
    "dp700-1-028",
    "dp700-1-046",
    "dp700-3-044",
    "dp700-7-248",
    "dp700-7-249",
    "dp700-7-250",
    "dp700-7-251"
  ],
  "4.1.1": [
    "dp700-2-007",
    "dp700-4-011",
    "dp700-4-055",
    "dp700-4-064"
  ],
  "4.2.1": [
    "dp700-1-075",
    "dp700-4-006",
    "dp700-4-025",
    "dp700-4-026",
    "dp700-4-048",
    "dp700-5-042"
  ],
  "4.3.1": [
    "dp700-5-006",
    "dp700-5-017",
    "dp700-5-018",
    "dp700-5-020",
    "dp700-5-027"
  ],
  "4.4.1": [
    "dp700-3-007",
    "dp700-3-020",
    "dp700-3-021",
    "dp700-3-022",
    "dp700-3-042"
  ]
},
};
