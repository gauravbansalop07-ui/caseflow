"use client";

import { useState } from "react";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PdfViewer } from "@/components/analysis/pdf-viewer";
import { InsightsPanel } from "@/components/analysis/insights-panel";
import { ChatPanel } from "@/components/chat/chat-panel";
import { BriefPreview } from "@/components/brief/brief-preview";
import { FadeIn } from "@/components/shared/animated-container";
import { FileText, MessageSquare, BookOpen } from "lucide-react";

export function AnalysisView() {
  const [activeTab, setActiveTab] = useState("insights");

  return (
    <FadeIn className="h-[calc(100vh-8rem)]">
      {/* Mobile: stacked layout */}
      <div className="md:hidden flex flex-col h-full gap-4 overflow-auto">
        <div className="min-h-[300px]">
          <PdfViewer />
        </div>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1">
          <TabsList className="w-full bg-white/5 border border-glass-border">
            <TabsTrigger
              value="insights"
              className="flex-1 data-[state=active]:bg-gold/10 data-[state=active]:text-gold"
            >
              <FileText size={14} className="mr-1.5" />
              Insights
            </TabsTrigger>
            <TabsTrigger
              value="chat"
              className="flex-1 data-[state=active]:bg-gold/10 data-[state=active]:text-gold"
            >
              <MessageSquare size={14} className="mr-1.5" />
              Chat
            </TabsTrigger>
            <TabsTrigger
              value="brief"
              className="flex-1 data-[state=active]:bg-gold/10 data-[state=active]:text-gold"
            >
              <BookOpen size={14} className="mr-1.5" />
              Brief
            </TabsTrigger>
          </TabsList>
          <TabsContent value="insights" className="mt-4">
            <InsightsPanel />
          </TabsContent>
          <TabsContent value="chat" className="mt-4 h-[500px]">
            <ChatPanel />
          </TabsContent>
          <TabsContent value="brief" className="mt-4">
            <BriefPreview />
          </TabsContent>
        </Tabs>
      </div>

      {/* Desktop: resizable split layout */}
      <div className="hidden md:block h-full">
        <ResizablePanelGroup orientation="horizontal" className="h-full rounded-xl">
          <ResizablePanel defaultSize={45} minSize={30}>
            <div className="h-full pr-2">
              <PdfViewer />
            </div>
          </ResizablePanel>

          <ResizableHandle className="w-1.5 bg-transparent hover:bg-gold/20 transition-colors mx-1 rounded-full" />

          <ResizablePanel defaultSize={55} minSize={35}>
            <div className="h-full pl-2">
              <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="h-full flex flex-col"
              >
                <TabsList className="w-full bg-white/5 border border-glass-border shrink-0">
                  <TabsTrigger
                    value="insights"
                    className="flex-1 data-[state=active]:bg-gold/10 data-[state=active]:text-gold"
                  >
                    <FileText size={14} className="mr-1.5" />
                    Insights
                  </TabsTrigger>
                  <TabsTrigger
                    value="chat"
                    className="flex-1 data-[state=active]:bg-gold/10 data-[state=active]:text-gold"
                  >
                    <MessageSquare size={14} className="mr-1.5" />
                    Chat
                  </TabsTrigger>
                  <TabsTrigger
                    value="brief"
                    className="flex-1 data-[state=active]:bg-gold/10 data-[state=active]:text-gold"
                  >
                    <BookOpen size={14} className="mr-1.5" />
                    Brief
                  </TabsTrigger>
                </TabsList>
                <TabsContent
                  value="insights"
                  className="flex-1 overflow-auto mt-4"
                >
                  <InsightsPanel />
                </TabsContent>
                <TabsContent
                  value="chat"
                  className="flex-1 overflow-hidden mt-4"
                >
                  <ChatPanel />
                </TabsContent>
                <TabsContent
                  value="brief"
                  className="flex-1 overflow-auto mt-4"
                >
                  <BriefPreview />
                </TabsContent>
              </Tabs>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </FadeIn>
  );
}
