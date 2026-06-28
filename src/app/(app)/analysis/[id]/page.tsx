// Server component — generateStaticParams works here because there is no "use client"
// The actual interactive UI lives in AnalysisView (a client component).

import { AnalysisView } from "@/components/analysis/analysis-view";

// Pre-generate the demo route at build time for static export.
// Any additional analysis IDs are handled client-side via localStorage.
export function generateStaticParams() {
  return [{ id: "demo-result" }];
}

export default function AnalysisPage() {
  return <AnalysisView />;
}

