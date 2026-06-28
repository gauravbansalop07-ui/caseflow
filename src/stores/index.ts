import { create } from "zustand";
import type { CaseAnalysis, AnalysisStep, ChatMessage } from "@/types";

// ========== Analysis Store ==========
interface AnalysisState {
  currentAnalysis: CaseAnalysis | null;
  analysisSteps: AnalysisStep[];
  isAnalyzing: boolean;
  setCurrentAnalysis: (analysis: CaseAnalysis | null) => void;
  setAnalysisSteps: (steps: AnalysisStep[]) => void;
  updateStep: (stepId: string, update: Partial<AnalysisStep>) => void;
  setIsAnalyzing: (isAnalyzing: boolean) => void;
  reset: () => void;
}

export const useAnalysisStore = create<AnalysisState>((set) => ({
  currentAnalysis: null,
  analysisSteps: [],
  isAnalyzing: false,
  setCurrentAnalysis: (analysis) => set({ currentAnalysis: analysis }),
  setAnalysisSteps: (steps) => set({ analysisSteps: steps }),
  updateStep: (stepId, update) =>
    set((state) => ({
      analysisSteps: state.analysisSteps.map((step) =>
        step.id === stepId ? { ...step, ...update } : step
      ),
    })),
  setIsAnalyzing: (isAnalyzing) => set({ isAnalyzing }),
  reset: () =>
    set({
      currentAnalysis: null,
      analysisSteps: [],
      isAnalyzing: false,
    }),
}));

// ========== Chat Store ==========
interface ChatState {
  messages: ChatMessage[];
  isLoading: boolean;
  addMessage: (message: ChatMessage) => void;
  setMessages: (messages: ChatMessage[]) => void;
  setIsLoading: (isLoading: boolean) => void;
  clearMessages: () => void;
}

export const useChatStore = create<ChatState>((set) => ({
  messages: [],
  isLoading: false,
  addMessage: (message) =>
    set((state) => ({ messages: [...state.messages, message] })),
  setMessages: (messages) => set({ messages }),
  setIsLoading: (isLoading) => set({ isLoading }),
  clearMessages: () => set({ messages: [] }),
}));

// ========== UI Store ==========
interface UIState {
  searchOpen: boolean;
  chatPanelOpen: boolean;
  setSearchOpen: (open: boolean) => void;
  setChatPanelOpen: (open: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
  searchOpen: false,
  chatPanelOpen: false,
  setSearchOpen: (open) => set({ searchOpen: open }),
  setChatPanelOpen: (open) => set({ chatPanelOpen: open }),
}));
