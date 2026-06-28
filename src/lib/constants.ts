export const APP_NAME = "caseflow";
export const APP_TAGLINE = "Your AI-Powered Indian Legal Research Assistant";
export const APP_DESCRIPTION =
  "Upload any judgment and instantly extract facts, legal issues, precedents, and AI-generated legal insights.";

export const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB
export const ACCEPTED_FILE_TYPES = {
  "application/pdf": [".pdf"],
};

export const ANALYSIS_STEPS = [
  {
    id: "extract",
    label: "Extracting Text",
    description: "Reading and parsing the judgment document...",
  },
  {
    id: "identify",
    label: "Identifying Legal Sections",
    description: "Analyzing document structure and key sections...",
  },
  {
    id: "precedents",
    label: "Finding Precedents",
    description: "Searching for similar judgments and citations...",
  },
  {
    id: "brief",
    label: "Generating Brief",
    description: "Compiling AI-powered legal insights...",
  },
] as const;

export const NAV_ITEMS = [
  { title: "Dashboard", href: "/dashboard", icon: "LayoutDashboard" },
  { title: "Research", href: "/research", icon: "Search" },
  { title: "Documents", href: "/documents", icon: "FileText" },
  { title: "Saved Briefs", href: "/briefs", icon: "BookOpen" },
  { title: "Bookmarks", href: "/bookmarks", icon: "Bookmark" },
  { title: "History", href: "/history", icon: "Clock" },
] as const;

export const INSIGHT_SECTIONS = [
  { id: "summary", title: "Case Summary", icon: "FileText", color: "#3b82f6" },
  { id: "facts", title: "Facts of the Case", icon: "List", color: "#8b5cf6" },
  { id: "issues", title: "Legal Issues", icon: "AlertCircle", color: "#f59e0b" },
  { id: "provisions", title: "Legal Provisions", icon: "Scale", color: "#10b981" },
  { id: "reasoning", title: "Court Reasoning", icon: "Brain", color: "#6366f1" },
  { id: "holding", title: "Final Holding", icon: "Gavel", color: "#F6A623" },
  { id: "takeaways", title: "Key Takeaways", icon: "Lightbulb", color: "#ec4899" },
] as const;

export const SUGGESTED_QUESTIONS = [
  "What was the court's reasoning?",
  "Which precedents were relied upon?",
  "Explain this judgment in simple language.",
  "What are the key legal principles established?",
  "Summarize the facts in 3 sentences.",
  "What provisions of law were cited?",
];

export const DEMO_CASE = {
  caseName: "Kesavananda Bharati v. State of Kerala",
  court: "Supreme Court of India",
  year: 1973,
  citation: "AIR 1973 SC 1461",
};
