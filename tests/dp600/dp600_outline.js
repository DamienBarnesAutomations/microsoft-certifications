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
    "dp600-6-002"
  ],
  "1.1.2": [
    "dp600-1-002",
    "dp600-5-001",
    "dp600-5-019",
    "dp600-6-003"
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
    "dp600-5-022"
  ],
  "1.1.4": [
    "dp600-5-006",
    "dp600-5-012",
    "dp600-5-014",
    "dp600-5-015"
  ],
  "1.1.5": [
    "dp600-1-003",
    "dp600-1-012",
    "dp600-1-021",
    "dp600-5-007"
  ],
  "1.2.1": [
    "dp600-1-015",
    "dp600-6-004",
    "dp600-6-005",
    "dp600-6-006"
  ],
  "1.2.2": [
    "dp600-6-007",
    "dp600-6-008",
    "dp600-6-009",
    "dp600-6-010"
  ],
  "1.2.3": [
    "dp600-1-024",
    "dp600-6-011",
    "dp600-6-012",
    "dp600-6-013"
  ],
  "1.2.4": [
    "dp600-1-004",
    "dp600-6-014",
    "dp600-6-015",
    "dp600-6-016"
  ],
  "1.2.5": [
    "dp600-1-014",
    "dp600-3-020",
    "dp600-6-017",
    "dp600-6-018"
  ],
  "1.2.6": [
    "dp600-6-019",
    "dp600-6-020",
    "dp600-6-021",
    "dp600-6-022"
  ],
  "2.1.1": [
    "dp600-6-023",
    "dp600-6-024",
    "dp600-6-025",
    "dp600-6-026"
  ],
  "2.1.2": [
    "dp600-1-005",
    "dp600-6-027",
    "dp600-6-028",
    "dp600-6-029"
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
    "dp600-2-039"
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
    "dp600-2-044"
  ],
  "2.1.5": [
    "dp600-1-045",
    "dp600-6-030",
    "dp600-6-031",
    "dp600-6-032"
  ],
  "2.2.1": [
    "dp600-1-035",
    "dp600-2-008",
    "dp600-2-015",
    "dp600-2-045",
    "dp600-2-046"
  ],
  "2.2.2": [
    "dp600-1-039",
    "dp600-1-041",
    "dp600-2-013",
    "dp600-6-033"
  ],
  "2.2.3": [
    "dp600-1-038",
    "dp600-2-005",
    "dp600-2-035",
    "dp600-2-036",
    "dp600-2-037"
  ],
  "2.2.4": [
    "dp600-6-034",
    "dp600-6-035",
    "dp600-6-036",
    "dp600-6-037"
  ],
  "2.2.5": [
    "dp600-1-044",
    "dp600-2-030",
    "dp600-6-038",
    "dp600-6-039"
  ],
  "2.2.6": [
    "dp600-1-032",
    "dp600-1-036",
    "dp600-2-001",
    "dp600-2-017",
    "dp600-2-019",
    "dp600-2-023",
    "dp600-2-026"
  ],
  "2.2.7": [
    "dp600-2-027",
    "dp600-6-040",
    "dp600-6-041",
    "dp600-6-042"
  ],
  "2.2.8": [
    "dp600-2-022",
    "dp600-6-043",
    "dp600-6-044",
    "dp600-6-045"
  ],
  "2.2.9": [
    "dp600-2-006",
    "dp600-2-010",
    "dp600-2-016",
    "dp600-2-029"
  ],
  "2.3.1": [
    "dp600-6-046",
    "dp600-6-047",
    "dp600-6-048",
    "dp600-6-049"
  ],
  "2.3.2": [
    "dp600-2-011",
    "dp600-2-012",
    "dp600-2-031",
    "dp600-2-041",
    "dp600-2-042"
  ],
  "2.3.3": [
    "dp600-1-040",
    "dp600-1-043",
    "dp600-1-046",
    "dp600-1-047",
    "dp600-1-050"
  ],
  "2.3.4": [
    "dp600-6-050",
    "dp600-6-051",
    "dp600-6-052",
    "dp600-6-053"
  ],
  "3.1.1": [
    "dp600-6-054",
    "dp600-6-055",
    "dp600-6-056",
    "dp600-6-057"
  ],
  "3.1.2": [
    "dp600-6-058",
    "dp600-6-059",
    "dp600-6-060",
    "dp600-6-061"
  ],
  "3.1.3": [
    "dp600-3-002",
    "dp600-3-007",
    "dp600-3-015",
    "dp600-3-027",
    "dp600-3-031"
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
    "dp600-3-045"
  ],
  "3.1.5": [
    "dp600-3-003",
    "dp600-3-008",
    "dp600-3-010",
    "dp600-3-042"
  ],
  "3.1.6": [
    "dp600-3-046",
    "dp600-6-062",
    "dp600-6-063",
    "dp600-6-064"
  ],
  "3.1.7": [
    "dp600-3-018",
    "dp600-6-065",
    "dp600-6-066",
    "dp600-6-067"
  ],
  "3.2.1": [
    "dp600-3-011",
    "dp600-3-034",
    "dp600-3-036",
    "dp600-3-038",
    "dp600-3-040"
  ],
  "3.2.2": [
    "dp600-3-019",
    "dp600-3-044",
    "dp600-6-068",
    "dp600-6-069"
  ],
  "3.2.3": [
    "dp600-1-028",
    "dp600-3-009",
    "dp600-3-026",
    "dp600-3-030",
    "dp600-3-039"
  ],
  "3.2.4": [
    "dp600-3-001",
    "dp600-3-017",
    "dp600-6-070",
    "dp600-6-071"
  ],
  "3.2.5": [
    "dp600-3-004",
    "dp600-3-014",
    "dp600-6-072",
    "dp600-6-073"
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
