"use client";

import { FileDown, Code } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { FadeIn } from "@/components/shared/animated-container";

interface BriefSection {
  id: string;
  title: string;
  content: string;
}

const BRIEF_SECTIONS: BriefSection[] = [
  {
    id: "facts",
    title: "Facts of the Case",
    content:
      "The petitioner, Kesavananda Bharati, the head of a religious mutt in Kerala, challenged the Kerala Government's attempts to restrict the management of its property under the Kerala Land Reforms Act, 1963. The case was heard by the largest Constitutional Bench of 13 judges in the history of the Supreme Court of India. The central question before the court was whether there are any limitations on Parliament's power to amend the Constitution under Article 368.",
  },
  {
    id: "issues",
    title: "Legal Issues",
    content:
      "The primary issue was whether Parliament's power to amend the Constitution under Article 368 is unlimited, or whether there are inherent limitations. Additionally, the court examined whether the 24th, 25th, and 29th Constitutional Amendments were valid, and whether the doctrine established in Golaknath v. State of Punjab needed to be reconsidered.",
  },
  {
    id: "arguments",
    title: "Arguments Presented",
    content:
      "The petitioner argued that the fundamental rights enshrined in Part III of the Constitution are inviolable and cannot be abrogated by constitutional amendments. The respondent (State of Kerala) contended that Parliament's amending power under Article 368 is plenary and unlimited, relying on the sovereign nature of legislative authority. The Attorney General submitted that no provision of the Constitution is beyond the amending power.",
  },
  {
    id: "laws",
    title: "Relevant Laws & Provisions",
    content:
      "Article 368 of the Constitution of India — Power of Parliament to amend the Constitution. Article 13 — Laws inconsistent with or in derogation of the fundamental rights. The 24th Amendment Act, 1971 — Affirmed Parliament's constituent power. The 25th Amendment Act, 1971 — Restricted judicial review of laws implementing Directive Principles. The Kerala Land Reforms Act, 1963 as amended.",
  },
  {
    id: "precedents",
    title: "Precedents Cited",
    content:
      "Shankari Prasad v. Union of India (1951) — Held that constitutional amendments are not 'law' under Article 13. Sajjan Singh v. State of Rajasthan (1965) — Reaffirmed the position in Shankari Prasad. Golaknath v. State of Punjab (1967) — Reversed earlier decisions and held fundamental rights cannot be amended. This case partially overruled Golaknath while establishing the basic structure doctrine.",
  },
  {
    id: "conclusion",
    title: "Conclusion & Holding",
    content:
      "By a 7-6 majority, the Supreme Court held that while Parliament has wide powers to amend the Constitution, it cannot alter the 'basic structure' or essential features of the Constitution. The basic structure includes the supremacy of the Constitution, republican and democratic form of government, secular character, separation of powers, and the federal character of the Constitution. This landmark judgment established the Basic Structure Doctrine that continues to be the cornerstone of Indian constitutional jurisprudence.",
  },
];

const EXPORT_FORMATS = [
  { label: "PDF", icon: FileDown, format: "PDF" },
  { label: "DOCX", icon: FileDown, format: "DOCX" },
  { label: "Markdown", icon: Code, format: "Markdown" },
] as const;

export function BriefPreview() {
  const handleExport = (format: string) => {
    toast.success(`Brief exported as ${format}`, {
      description: "Your file is ready for download.",
    });
  };

  return (
    <FadeIn className="flex flex-col h-full">
      {/* Top bar */}
      <div className="flex items-center justify-between p-4 border-b border-glass-border">
        <div>
          <h2 className="text-lg font-heading font-bold text-text-primary">
            Legal Brief
          </h2>
          <p className="text-xs text-text-secondary mt-0.5">
            Kesavananda Bharati v. State of Kerala (1973)
          </p>
        </div>
        <div className="flex items-center gap-2">
          {EXPORT_FORMATS.map(({ label, icon: Icon, format }) => (
            <Button
              key={format}
              variant="outline"
              size="sm"
              onClick={() => handleExport(format)}
              className="gap-1.5 text-xs border-glass-border hover:border-gold/30 hover:text-gold"
            >
              <Icon size={14} />
              {label}
            </Button>
          ))}
        </div>
      </div>

      {/* Brief content */}
      <ScrollArea className="flex-1 min-h-0">
        <div className="p-6 space-y-1">
          {BRIEF_SECTIONS.map((section, index) => (
            <div key={section.id}>
              <div className="glass rounded-xl p-5 border-l-4 border-l-gold">
                <h3 className="font-heading font-semibold text-gold text-sm uppercase tracking-wider mb-3">
                  {section.title}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {section.content}
                </p>
              </div>
              {index < BRIEF_SECTIONS.length - 1 && (
                <Separator className="my-1 opacity-30" />
              )}
            </div>
          ))}
        </div>
      </ScrollArea>
    </FadeIn>
  );
}
