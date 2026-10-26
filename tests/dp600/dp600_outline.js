// DP-600 skills outline (study guide: skills measured as of October 19, 2026) and which practice
// question tests which skill. Domain 4 (inOutline: false) holds questions on topics outside the
// current outline; the app leaves them out of test mode.
// Skill ids are domain.topic.skill (e.g. 2.1.3); a question belongs to exactly one skill.
window.DP600_OUTLINE = {
  domains: [
  {
    "id": "1",
    "title": "Maintain a data analytics solution",
    "weight": "25-30%",
    "topics": [
      {
        "id": "1.1",
        "title": "Implement security and governance",
        "skills": [
          {
            "id": "1.1.1",
            "title": "Implement workspace-level access controls"
          },
          {
            "id": "1.1.2",
            "title": "Implement item-level access controls"
          },
          {
            "id": "1.1.3",
            "title": "Implement row-level, column-level, object-level, and file-level access control"
          },
          {
            "id": "1.1.4",
            "title": "Apply sensitivity labels to items"
          },
          {
            "id": "1.1.5",
            "title": "Endorse items"
          }
        ]
      },
      {
        "id": "1.2",
        "title": "Maintain the analytics development lifecycle",
        "skills": [
          {
            "id": "1.2.1",
            "title": "Configure version control for a workspace"
          },
          {
            "id": "1.2.2",
            "title": "Create and manage a Power BI Desktop project (.pbip)"
          },
          {
            "id": "1.2.3",
            "title": "Create and configure deployment pipelines"
          },
          {
            "id": "1.2.4",
            "title": "Perform impact analysis of downstream dependencies"
          },
          {
            "id": "1.2.5",
            "title": "Deploy and manage semantic models by using the XMLA endpoint"
          },
          {
            "id": "1.2.6",
            "title": "Create and update reusable assets (.pbit, .pbids, shared semantic models)"
          }
        ]
      }
    ]
  },
  {
    "id": "2",
    "title": "Prepare data",
    "weight": "45-50%",
    "topics": [
      {
        "id": "2.1",
        "title": "Get data",
        "skills": [
          {
            "id": "2.1.1",
            "title": "Create a data connection"
          },
          {
            "id": "2.1.2",
            "title": "Discover data by using OneLake catalog and Real-Time hub"
          },
          {
            "id": "2.1.3",
            "title": "Ingest or access data as needed"
          },
          {
            "id": "2.1.4",
            "title": "Choose between different data stores"
          },
          {
            "id": "2.1.5",
            "title": "Implement OneLake integration for Eventhouse and semantic models"
          }
        ]
      },
      {
        "id": "2.2",
        "title": "Transform data",
        "skills": [
          {
            "id": "2.2.1",
            "title": "Create views, functions, and stored procedures"
          },
          {
            "id": "2.2.2",
            "title": "Enrich data by adding new columns or tables"
          },
          {
            "id": "2.2.3",
            "title": "Implement a star schema for a lakehouse or warehouse"
          },
          {
            "id": "2.2.4",
            "title": "Denormalize data"
          },
          {
            "id": "2.2.5",
            "title": "Aggregate data"
          },
          {
            "id": "2.2.6",
            "title": "Merge or join data"
          },
          {
            "id": "2.2.7",
            "title": "Identify and resolve duplicate data, missing data, or null values"
          },
          {
            "id": "2.2.8",
            "title": "Convert column data types"
          },
          {
            "id": "2.2.9",
            "title": "Filter data"
          }
        ]
      },
      {
        "id": "2.3",
        "title": "Query and analyze data",
        "skills": [
          {
            "id": "2.3.1",
            "title": "Visual query editor"
          },
          {
            "id": "2.3.2",
            "title": "SQL"
          },
          {
            "id": "2.3.3",
            "title": "KQL"
          },
          {
            "id": "2.3.4",
            "title": "DAX"
          }
        ]
      }
    ]
  },
  {
    "id": "3",
    "title": "Implement and manage semantic models",
    "weight": "25-30%",
    "topics": [
      {
        "id": "3.1",
        "title": "Design and build semantic models",
        "skills": [
          {
            "id": "3.1.1",
            "title": "Choose a storage mode"
          },
          {
            "id": "3.1.2",
            "title": "Implement a star schema for a semantic model"
          },
          {
            "id": "3.1.3",
            "title": "Implement relationships, such as bridge tables and many-to-many"
          },
          {
            "id": "3.1.4",
            "title": "Write DAX calculations (variables, iterators, table filtering, windowing, information functions)"
          },
          {
            "id": "3.1.5",
            "title": "Implement calculation groups, dynamic format strings, and field parameters"
          },
          {
            "id": "3.1.6",
            "title": "Identify use cases for and configure large semantic model storage format"
          },
          {
            "id": "3.1.7",
            "title": "Design and build composite models"
          }
        ]
      },
      {
        "id": "3.2",
        "title": "Optimize enterprise-scale semantic models",
        "skills": [
          {
            "id": "3.2.1",
            "title": "Implement performance improvements in queries and report visuals"
          },
          {
            "id": "3.2.2",
            "title": "Improve DAX performance"
          },
          {
            "id": "3.2.3",
            "title": "Configure Direct Lake, including default fallback and refresh behavior"
          },
          {
            "id": "3.2.4",
            "title": "Choose between Direct Lake on OneLake and Direct Lake on SQL analytics endpoint"
          },
          {
            "id": "3.2.5",
            "title": "Implement incremental refresh for semantic models"
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
        "title": "AI, Copilot and Fabric IQ",
        "skills": [
          {
            "id": "4.1.1",
            "title": "Copilot, data agents and ontology"
          }
        ]
      },
      {
        "id": "4.2",
        "title": "Platform administration and governance",
        "skills": [
          {
            "id": "4.2.1",
            "title": "Capacity, domains, tenant settings and real-time alerts"
          },
          {
            "id": "4.2.2",
            "title": "Microsoft Purview governance"
          }
        ]
      }
    ]
  }
],
  questionsBySkill: {
  "1.1.1": [
    "dp600-1-010",
    "dp600-5-013",
    "dp600-6-001",
    "dp600-6-002",
    "dp600-7-001",
    "dp600-7-002",
    "dp600-7-003",
    "dp600-7-004",
    "dp600-8-031",
    "dp600-9-001"
  ],
  "1.1.2": [
    "dp600-1-002",
    "dp600-5-001",
    "dp600-5-019",
    "dp600-6-003",
    "dp600-7-005",
    "dp600-7-006",
    "dp600-7-007",
    "dp600-7-008",
    "dp600-9-002"
  ],
  "1.1.3": [
    "dp600-1-025",
    "dp600-3-006",
    "dp600-3-021",
    "dp600-5-002",
    "dp600-5-003",
    "dp600-5-004",
    "dp600-5-005",
    "dp600-5-009",
    "dp600-5-010",
    "dp600-5-016",
    "dp600-5-017",
    "dp600-5-018",
    "dp600-5-020",
    "dp600-5-021",
    "dp600-5-022",
    "dp600-8-003",
    "dp600-8-030",
    "dp600-8-036",
    "dp600-9-003"
  ],
  "1.1.4": [
    "dp600-5-006",
    "dp600-5-012",
    "dp600-5-014",
    "dp600-5-015",
    "dp600-7-009",
    "dp600-7-010",
    "dp600-7-011",
    "dp600-7-012",
    "dp600-8-032"
  ],
  "1.1.5": [
    "dp600-1-003",
    "dp600-1-012",
    "dp600-1-021",
    "dp600-5-007",
    "dp600-7-013",
    "dp600-7-014",
    "dp600-7-015",
    "dp600-7-016",
    "dp600-8-011",
    "dp600-9-004"
  ],
  "1.2.1": [
    "dp600-1-015",
    "dp600-6-004",
    "dp600-6-005",
    "dp600-6-006",
    "dp600-7-017",
    "dp600-7-018",
    "dp600-7-019",
    "dp600-7-020",
    "dp600-8-012",
    "dp600-8-021",
    "dp600-9-005"
  ],
  "1.2.2": [
    "dp600-6-007",
    "dp600-6-008",
    "dp600-6-009",
    "dp600-6-010",
    "dp600-7-021",
    "dp600-7-022",
    "dp600-7-023",
    "dp600-7-024",
    "dp600-8-009",
    "dp600-9-006"
  ],
  "1.2.3": [
    "dp600-1-024",
    "dp600-6-011",
    "dp600-6-012",
    "dp600-6-013",
    "dp600-7-025",
    "dp600-7-026",
    "dp600-7-027",
    "dp600-7-028",
    "dp600-8-010",
    "dp600-8-023",
    "dp600-9-007"
  ],
  "1.2.4": [
    "dp600-1-004",
    "dp600-6-014",
    "dp600-6-015",
    "dp600-6-016",
    "dp600-7-029",
    "dp600-7-030",
    "dp600-7-031",
    "dp600-7-032",
    "dp600-9-008"
  ],
  "1.2.5": [
    "dp600-1-014",
    "dp600-3-020",
    "dp600-6-017",
    "dp600-6-018",
    "dp600-7-033",
    "dp600-7-034",
    "dp600-7-035",
    "dp600-7-036",
    "dp600-8-019",
    "dp600-9-009"
  ],
  "1.2.6": [
    "dp600-6-019",
    "dp600-6-020",
    "dp600-6-021",
    "dp600-6-022",
    "dp600-7-037",
    "dp600-7-038",
    "dp600-7-039",
    "dp600-7-040",
    "dp600-9-010"
  ],
  "2.1.1": [
    "dp600-6-023",
    "dp600-6-024",
    "dp600-6-025",
    "dp600-6-026",
    "dp600-7-041",
    "dp600-7-042",
    "dp600-7-043",
    "dp600-7-044",
    "dp600-9-011",
    "dp600-9-047",
    "dp600-9-048",
    "dp600-9-049"
  ],
  "2.1.2": [
    "dp600-1-005",
    "dp600-6-027",
    "dp600-6-028",
    "dp600-6-029",
    "dp600-7-045",
    "dp600-7-046",
    "dp600-7-047",
    "dp600-7-048",
    "dp600-8-008",
    "dp600-9-012",
    "dp600-9-050",
    "dp600-9-051"
  ],
  "2.1.3": [
    "dp600-1-009",
    "dp600-1-018",
    "dp600-1-020",
    "dp600-1-022",
    "dp600-1-026",
    "dp600-1-029",
    "dp600-1-033",
    "dp600-1-049",
    "dp600-2-002",
    "dp600-2-003",
    "dp600-2-004",
    "dp600-2-009",
    "dp600-2-018",
    "dp600-2-020",
    "dp600-2-024",
    "dp600-2-025",
    "dp600-2-038",
    "dp600-2-039",
    "dp600-8-001",
    "dp600-8-029",
    "dp600-9-013",
    "dp600-9-052",
    "dp600-9-053",
    "dp600-9-054",
    "dp600-9-055"
  ],
  "2.1.4": [
    "dp600-1-001",
    "dp600-1-013",
    "dp600-1-017",
    "dp600-1-027",
    "dp600-1-030",
    "dp600-1-031",
    "dp600-1-034",
    "dp600-1-048",
    "dp600-2-007",
    "dp600-2-014",
    "dp600-2-021",
    "dp600-2-028",
    "dp600-2-032",
    "dp600-2-033",
    "dp600-2-034",
    "dp600-2-040",
    "dp600-2-043",
    "dp600-2-044",
    "dp600-8-005",
    "dp600-8-040",
    "dp600-9-014",
    "dp600-9-056",
    "dp600-9-057",
    "dp600-9-058"
  ],
  "2.1.5": [
    "dp600-1-045",
    "dp600-6-030",
    "dp600-6-031",
    "dp600-6-032",
    "dp600-7-049",
    "dp600-7-050",
    "dp600-7-051",
    "dp600-7-052",
    "dp600-8-006",
    "dp600-9-015",
    "dp600-9-059"
  ],
  "2.2.1": [
    "dp600-1-035",
    "dp600-2-008",
    "dp600-2-015",
    "dp600-2-045",
    "dp600-2-046",
    "dp600-7-053",
    "dp600-7-054",
    "dp600-7-055",
    "dp600-9-016",
    "dp600-9-038",
    "dp600-9-060",
    "dp600-9-061"
  ],
  "2.2.2": [
    "dp600-1-039",
    "dp600-1-041",
    "dp600-2-013",
    "dp600-6-033",
    "dp600-7-056",
    "dp600-7-057",
    "dp600-7-058",
    "dp600-7-059",
    "dp600-9-062",
    "dp600-9-063"
  ],
  "2.2.3": [
    "dp600-1-038",
    "dp600-2-005",
    "dp600-2-035",
    "dp600-2-036",
    "dp600-2-037",
    "dp600-7-060",
    "dp600-7-061",
    "dp600-7-062",
    "dp600-8-027",
    "dp600-9-064",
    "dp600-9-065"
  ],
  "2.2.4": [
    "dp600-6-034",
    "dp600-6-035",
    "dp600-6-036",
    "dp600-6-037",
    "dp600-7-063",
    "dp600-7-064",
    "dp600-7-065",
    "dp600-7-066",
    "dp600-9-066",
    "dp600-9-067"
  ],
  "2.2.5": [
    "dp600-1-044",
    "dp600-2-030",
    "dp600-6-038",
    "dp600-6-039",
    "dp600-7-067",
    "dp600-7-068",
    "dp600-7-069",
    "dp600-7-070",
    "dp600-9-042",
    "dp600-9-044",
    "dp600-9-068"
  ],
  "2.2.6": [
    "dp600-1-032",
    "dp600-1-036",
    "dp600-2-001",
    "dp600-2-017",
    "dp600-2-019",
    "dp600-2-023",
    "dp600-2-026",
    "dp600-7-071",
    "dp600-8-034",
    "dp600-9-018",
    "dp600-9-041",
    "dp600-9-069",
    "dp600-9-070"
  ],
  "2.2.7": [
    "dp600-2-027",
    "dp600-6-040",
    "dp600-6-041",
    "dp600-6-042",
    "dp600-7-072",
    "dp600-7-073",
    "dp600-7-074",
    "dp600-7-075",
    "dp600-8-035",
    "dp600-9-017",
    "dp600-9-039",
    "dp600-9-071",
    "dp600-9-072"
  ],
  "2.2.8": [
    "dp600-2-022",
    "dp600-6-043",
    "dp600-6-044",
    "dp600-6-045",
    "dp600-7-076",
    "dp600-7-077",
    "dp600-7-078",
    "dp600-7-079",
    "dp600-9-019",
    "dp600-9-040",
    "dp600-9-073",
    "dp600-9-074"
  ],
  "2.2.9": [
    "dp600-2-006",
    "dp600-2-010",
    "dp600-2-016",
    "dp600-2-029",
    "dp600-7-080",
    "dp600-7-081",
    "dp600-7-082",
    "dp600-7-083",
    "dp600-9-043",
    "dp600-9-075",
    "dp600-9-076"
  ],
  "2.3.1": [
    "dp600-6-046",
    "dp600-6-047",
    "dp600-6-048",
    "dp600-6-049",
    "dp600-7-084",
    "dp600-7-085",
    "dp600-7-086",
    "dp600-7-087",
    "dp600-8-039",
    "dp600-9-077",
    "dp600-9-078"
  ],
  "2.3.2": [
    "dp600-2-011",
    "dp600-2-012",
    "dp600-2-031",
    "dp600-2-041",
    "dp600-2-042",
    "dp600-7-088",
    "dp600-7-089",
    "dp600-7-090",
    "dp600-8-026",
    "dp600-9-031",
    "dp600-9-032",
    "dp600-9-079",
    "dp600-9-080"
  ],
  "2.3.3": [
    "dp600-1-040",
    "dp600-1-043",
    "dp600-1-046",
    "dp600-1-047",
    "dp600-1-050",
    "dp600-7-091",
    "dp600-7-092",
    "dp600-7-093",
    "dp600-8-007",
    "dp600-8-025",
    "dp600-9-020",
    "dp600-9-033",
    "dp600-9-034",
    "dp600-9-081",
    "dp600-9-082"
  ],
  "2.3.4": [
    "dp600-6-050",
    "dp600-6-051",
    "dp600-6-052",
    "dp600-6-053",
    "dp600-7-094",
    "dp600-7-095",
    "dp600-7-096",
    "dp600-7-097",
    "dp600-9-035",
    "dp600-9-045",
    "dp600-9-083",
    "dp600-9-084"
  ],
  "3.1.1": [
    "dp600-6-054",
    "dp600-6-055",
    "dp600-6-056",
    "dp600-6-057",
    "dp600-7-098",
    "dp600-7-099",
    "dp600-7-100",
    "dp600-7-101",
    "dp600-8-033"
  ],
  "3.1.2": [
    "dp600-6-058",
    "dp600-6-059",
    "dp600-6-060",
    "dp600-6-061",
    "dp600-7-102",
    "dp600-7-103",
    "dp600-7-104",
    "dp600-7-105"
  ],
  "3.1.3": [
    "dp600-3-002",
    "dp600-3-007",
    "dp600-3-015",
    "dp600-3-027",
    "dp600-3-031",
    "dp600-7-106",
    "dp600-7-107",
    "dp600-7-108",
    "dp600-8-013",
    "dp600-9-021"
  ],
  "3.1.4": [
    "dp600-3-005",
    "dp600-3-012",
    "dp600-3-013",
    "dp600-3-016",
    "dp600-3-022",
    "dp600-3-023",
    "dp600-3-024",
    "dp600-3-025",
    "dp600-3-028",
    "dp600-3-029",
    "dp600-3-032",
    "dp600-3-033",
    "dp600-3-035",
    "dp600-3-037",
    "dp600-3-041",
    "dp600-3-043",
    "dp600-3-045",
    "dp600-8-014",
    "dp600-9-022",
    "dp600-9-036",
    "dp600-9-037",
    "dp600-9-046"
  ],
  "3.1.5": [
    "dp600-3-003",
    "dp600-3-008",
    "dp600-3-010",
    "dp600-3-042",
    "dp600-7-109",
    "dp600-7-110",
    "dp600-7-111",
    "dp600-7-112",
    "dp600-8-015",
    "dp600-8-024",
    "dp600-9-023"
  ],
  "3.1.6": [
    "dp600-3-046",
    "dp600-6-062",
    "dp600-6-063",
    "dp600-6-064",
    "dp600-7-113",
    "dp600-7-114",
    "dp600-7-115",
    "dp600-8-018",
    "dp600-9-024"
  ],
  "3.1.7": [
    "dp600-3-018",
    "dp600-6-065",
    "dp600-6-066",
    "dp600-6-067",
    "dp600-7-116",
    "dp600-7-117",
    "dp600-7-118",
    "dp600-7-119",
    "dp600-8-037",
    "dp600-9-025"
  ],
  "3.2.1": [
    "dp600-3-011",
    "dp600-3-034",
    "dp600-3-036",
    "dp600-3-038",
    "dp600-3-040",
    "dp600-7-120",
    "dp600-7-121",
    "dp600-7-122",
    "dp600-9-026"
  ],
  "3.2.2": [
    "dp600-3-019",
    "dp600-3-044",
    "dp600-6-068",
    "dp600-6-069",
    "dp600-7-123",
    "dp600-7-124",
    "dp600-7-125",
    "dp600-7-126",
    "dp600-8-016",
    "dp600-9-027"
  ],
  "3.2.3": [
    "dp600-1-028",
    "dp600-3-009",
    "dp600-3-026",
    "dp600-3-030",
    "dp600-3-039",
    "dp600-7-127",
    "dp600-7-128",
    "dp600-7-129",
    "dp600-8-002",
    "dp600-8-028",
    "dp600-9-028"
  ],
  "3.2.4": [
    "dp600-3-001",
    "dp600-3-017",
    "dp600-6-070",
    "dp600-6-071",
    "dp600-7-130",
    "dp600-7-131",
    "dp600-7-132",
    "dp600-7-133",
    "dp600-8-004",
    "dp600-8-038",
    "dp600-9-029"
  ],
  "3.2.5": [
    "dp600-3-004",
    "dp600-3-014",
    "dp600-6-072",
    "dp600-6-073",
    "dp600-7-134",
    "dp600-7-135",
    "dp600-7-136",
    "dp600-7-137",
    "dp600-8-017",
    "dp600-8-020",
    "dp600-8-022",
    "dp600-9-030"
  ],
  "4.1.1": [
    "dp600-1-008",
    "dp600-4-001",
    "dp600-4-002",
    "dp600-4-003",
    "dp600-4-004",
    "dp600-4-005",
    "dp600-4-006",
    "dp600-4-007",
    "dp600-4-008",
    "dp600-4-009",
    "dp600-4-010",
    "dp600-4-011",
    "dp600-4-012",
    "dp600-4-013",
    "dp600-4-014",
    "dp600-4-015",
    "dp600-4-016"
  ],
  "4.2.1": [
    "dp600-1-006",
    "dp600-1-007",
    "dp600-1-011",
    "dp600-1-016",
    "dp600-1-019",
    "dp600-1-023",
    "dp600-1-037",
    "dp600-1-042"
  ],
  "4.2.2": [
    "dp600-5-008",
    "dp600-5-011"
  ]
},
};
