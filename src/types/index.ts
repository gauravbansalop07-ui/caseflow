// ========== Analysis Types ==========

export interface CaseAnalysis {
  id: string;
  documentId: string;
  caseName: string;
  court: string;
  year: number;
  dateOfJudgment?: string;
  judges?: string[];
  summary: string;
  facts: string[];
  issues: string[];
  provisions: LegalProvision[];
  reasoning: string;
  holding: string;
  keyTakeaways: string[];
  precedents: Precedent[];
  rawText: string;
  createdAt: string;
}

export interface LegalProvision {
  name: string;
  section: string;
  description: string;
}

export interface Precedent {
  caseName: string;
  court: string;
  year: number;
  citation: string;
  similarityScore: number;
  keyHolding: string;
  relevance: string;
}

// ========== Document Types ==========

export interface Document {
  id: string;
  userId: string;
  fileName: string;
  fileUrl: string;
  fileSize: number;
  status: DocumentStatus;
  createdAt: string;
  updatedAt: string;
}

export type DocumentStatus = "pending" | "processing" | "completed" | "failed";

// ========== Chat Types ==========

export interface ChatMessage {
  id: string;
  analysisId: string;
  role: "user" | "assistant";
  content: string;
  sources?: ChatSource[];
  createdAt: string;
}

export interface ChatSource {
  title: string;
  section: string;
  pageNumber?: number;
}

// ========== Brief Types ==========

export interface LegalBrief {
  id: string;
  analysisId: string;
  title: string;
  content: BriefContent;
  createdAt: string;
}

export interface BriefContent {
  facts: string;
  issues: string;
  arguments: string;
  relevantLaws: string;
  precedents: string;
  conclusion: string;
}

// ========== Search Types ==========

export interface SearchResult {
  id: string;
  caseName: string;
  court: string;
  year: number;
  snippet: string;
  relevanceScore: number;
  type: "case" | "section" | "judge";
}

export interface SearchSuggestion {
  text: string;
  type: "case" | "section" | "judge" | "keyword";
}

// ========== Bookmark Types ==========

export interface Bookmark {
  id: string;
  analysisId: string;
  note?: string;
  analysis: CaseAnalysis;
  createdAt: string;
}

// ========== User Types ==========

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  avatarUrl?: string;
  subscription: SubscriptionTier;
  casesAnalyzed: number;
  briefsGenerated: number;
}

export type SubscriptionTier = "free" | "pro" | "enterprise";

// ========== Analysis Pipeline Types ==========

export interface AnalysisStep {
  id: string;
  label: string;
  description: string;
  status: StepStatus;
  progress: number;
  duration?: number;
}

export type StepStatus = "pending" | "active" | "completed" | "error";

// ========== Navigation Types ==========

export interface NavItem {
  title: string;
  href: string;
  icon: string;
  badge?: string;
  disabled?: boolean;
}
