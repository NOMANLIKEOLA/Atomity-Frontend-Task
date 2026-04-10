export type ExpenseItem = {
  label: string;
  amount: number;
};

export type Department = {
  id: string;
  name: string;
  shortLabel: string;
  accentVar: "--color-dept-pm" | "--color-dept-engineering" | "--color-dept-procurement" | "--color-dept-safety";
  budget: number;
  spent: number;
  balance: number;
  netReturn: number;
  description: string;
  insights: string[];
  recommendations: string[];
  rationale: string;
  expenses: ExpenseItem[];
};

export type SummaryTotals = {
  budget: number;
  spent: number;
  balance: number;
  weightedReturn: number;
};

export type DashboardData = {
  summary: SummaryTotals;
  departments: Department[];
};

export const dashboardData: DashboardData = {
  summary: {
    budget: 265000,
    spent: 251000,
    balance: 14000,
    weightedReturn: 5.3
  },
  departments: [
    {
      id: "project-management",
      name: "Project Management",
      shortLabel: "Proj. Mgmt",
      accentVar: "--color-dept-pm",
      budget: 10000,
      spent: 9000,
      balance: 1000,
      netReturn: 10,
      description:
        "The project management desk handles scheduling, coordination, reporting, and administrative oversight. Labour and office support drive most of the spend, with software and contingency used to keep delivery controlled.",
      insights: [
        "Labour is the largest line item and accounts for almost half of department spend.",
        "Project tracking software supports reporting and coordination across site activities.",
        "A small contingency buffer is reserved to absorb routine scope changes and admin pressure."
      ],
      recommendations: [
        "Automate recurring reports to trim administrative waste.",
        "Bundle software subscriptions where possible to lower tool costs.",
        "Keep weekly budget checks active so any drift is caught early."
      ],
      rationale:
        "This department combines direct labour with indirect support costs. The mix is consistent with construction overhead planning, where coordination, software, and admin remain essential while still staying within a controlled support budget.",
      expenses: [
        { label: "Labour", amount: 4000 },
        { label: "Equipment", amount: 0 },
        { label: "Materials", amount: 0 },
        { label: "Subcontractors", amount: 0 },
        { label: "Training", amount: 500 },
        { label: "Permits", amount: 0 },
        { label: "Software", amount: 1000 },
        { label: "Travel", amount: 2000 },
        { label: "Contingency", amount: 500 },
        { label: "Admin", amount: 1000 }
      ]
    },
    {
      id: "engineering",
      name: "Engineering",
      shortLabel: "Engineering",
      accentVar: "--color-dept-engineering",
      budget: 50000,
      spent: 48000,
      balance: 2000,
      netReturn: 4,
      description:
        "Engineering is the most labour intensive technical department. Design work, site coordination, specialist subcontract support, CAD software, and training make up the cost structure.",
      insights: [
        "Labour represents roughly half of the total department spend.",
        "CAD software, permits, and technical training are necessary to sustain design quality.",
        "Specialist subcontractor support keeps complex tasks moving without overloading internal staff."
      ],
      recommendations: [
        "Cross train staff to reduce dependence on expensive subcontract support.",
        "Consolidate software licensing to reduce recurring design tool spend.",
        "Standardise permit workflows so approval costs stay predictable."
      ],
      rationale:
        "This budget reflects a technical delivery phase where skilled labour dominates. Supporting items such as permits, software, and training are necessary overhead that helps the department maintain output quality and compliance.",
      expenses: [
        { label: "Labour", amount: 24000 },
        { label: "Equipment", amount: 3000 },
        { label: "Materials", amount: 5000 },
        { label: "Subcontractors", amount: 5000 },
        { label: "Training", amount: 3000 },
        { label: "Permits", amount: 2000 },
        { label: "Software", amount: 3000 },
        { label: "Travel", amount: 2000 },
        { label: "Contingency", amount: 0 },
        { label: "Admin", amount: 1000 }
      ]
    },
    {
      id: "procurement",
      name: "Procurement",
      shortLabel: "Procurement",
      accentVar: "--color-dept-procurement",
      budget: 200000,
      spent: 190000,
      balance: 10000,
      netReturn: 5,
      description:
        "Procurement manages bulk buying, vendor coordination, logistics, and inventory control. Materials dominate the budget, while equipment, software, and contingency protect the company from price shocks.",
      insights: [
        "Materials are by far the largest line item and make up the clear majority of spend.",
        "Equipment and labour support sourcing, handling, and vendor coordination.",
        "A contingency reserve helps absorb commodity movement and supplier variation."
      ],
      recommendations: [
        "Lock in fixed price supply agreements for key materials.",
        "Order strategically in bulk where storage and lead time allow.",
        "Track material usage in real time to prevent over ordering."
      ],
      rationale:
        "This department is built around purchasing power. The cost pattern mirrors a materials heavy construction phase, where disciplined buying and planning are the main levers for preserving margin.",
      expenses: [
        { label: "Labour", amount: 12000 },
        { label: "Equipment", amount: 20000 },
        { label: "Materials", amount: 145000 },
        { label: "Subcontractors", amount: 0 },
        { label: "Training", amount: 0 },
        { label: "Permits", amount: 0 },
        { label: "Software", amount: 5000 },
        { label: "Travel", amount: 3000 },
        { label: "Contingency", amount: 3000 },
        { label: "Admin", amount: 2000 }
      ]
    },
    {
      id: "health-safety",
      name: "Health & Safety",
      shortLabel: "H&S",
      accentVar: "--color-dept-safety",
      budget: 5000,
      spent: 4000,
      balance: 1000,
      netReturn: 20,
      description:
        "Health and safety is a lean department focused on compliance, prevention, protective gear, and training. Even with a small budget, it produces the highest return by avoiding incidents and downtime.",
      insights: [
        "This department carries the strongest net return in the company.",
        "Training and PPE are the main spending categories.",
        "Prevention here reduces much larger costs elsewhere in the business."
      ],
      recommendations: [
        "Run group safety sessions to lower training cost per person.",
        "Make safety routines company wide so incidents fall across every department.",
        "Measure prevention wins so future investment is easy to justify."
      ],
      rationale:
        "The budget is intentionally lean and covers the essentials needed for compliance and prevention. Safety spend is small compared with the cost of disruptions it helps avoid, which is why the return is strongest here.",
      expenses: [
        { label: "Labour", amount: 2000 },
        { label: "Equipment", amount: 800 },
        { label: "Materials", amount: 0 },
        { label: "Subcontractors", amount: 0 },
        { label: "Training", amount: 500 },
        { label: "Permits", amount: 300 },
        { label: "Software", amount: 0 },
        { label: "Travel", amount: 400 },
        { label: "Contingency", amount: 0 },
        { label: "Admin", amount: 0 }
      ]
    }
  ]
};