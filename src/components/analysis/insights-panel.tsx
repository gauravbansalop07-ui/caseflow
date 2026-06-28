"use client";

import { FadeIn, StaggerContainer, StaggerItem } from "@/components/shared/animated-container";
import { InsightCard } from "@/components/analysis/insight-card";
import { PrecedentCard } from "@/components/analysis/precedent-card";
import { INSIGHT_SECTIONS } from "@/lib/constants";
import { Badge } from "@/components/ui/badge";

/* ──────── Mock Data ──────── */

const MOCK_INSIGHTS: Record<string, React.ReactNode> = {
  summary: (
    <p>
      This landmark case established the Basic Structure Doctrine of the Indian
      Constitution. The Supreme Court, in a 7:6 majority, held that Parliament
      has wide powers to amend the Constitution under Article 368, but it cannot
      alter the &quot;basic structure&quot; or essential features of the
      Constitution. This case arose from a challenge to the Kerala Land Reforms
      Act and its placement in the Ninth Schedule.
    </p>
  ),

  facts: (
    <ul className="space-y-2 list-none">
      {[
        "His Holiness Kesavananda Bharati, head of a religious mutt in Kerala, owned extensive property.",
        "The Kerala government enacted the Kerala Land Reforms Act, 1963, affecting the mutt's property rights.",
        "The 29th Amendment placed the Kerala Land Reforms Act in the Ninth Schedule, shielding it from judicial review.",
        "The petitioner challenged the 29th Amendment as unconstitutional, along with the 24th, 25th, and 26th Amendments.",
        "A 13-judge Constitutional Bench was assembled, the largest in Indian judicial history.",
      ].map((fact, i) => (
        <li key={i} className="flex items-start gap-2">
          <span className="mt-1 size-1.5 shrink-0 rounded-full bg-purple-400/60" />
          <span>{fact}</span>
        </li>
      ))}
    </ul>
  ),

  issues: (
    <ul className="space-y-2 list-none">
      {[
        "Whether Parliament's amending power under Article 368 is unlimited.",
        "Whether the 24th, 25th, 26th, and 29th Amendments are constitutionally valid.",
        "Whether fundamental rights under Part III can be abridged or taken away by constitutional amendments.",
        "Whether there exists a basic structure of the Constitution which cannot be amended.",
      ].map((issue, i) => (
        <li key={i} className="flex items-start gap-2">
          <span className="mt-1 size-1.5 shrink-0 rounded-full bg-amber-400/60" />
          <span>{issue}</span>
        </li>
      ))}
    </ul>
  ),

  provisions: (
    <div className="flex flex-wrap gap-2">
      {[
        { name: "Article 368", desc: "Power to amend the Constitution" },
        { name: "Article 13", desc: "Laws inconsistent with fundamental rights" },
        { name: "Article 14", desc: "Right to Equality" },
        { name: "Article 19", desc: "Right to Freedom" },
        { name: "Article 31", desc: "Right to Property (since repealed)" },
        { name: "Article 32", desc: "Right to Constitutional Remedies" },
      ].map((prov, i) => (
        <div
          key={i}
          className="rounded-lg bg-emerald/10 border border-emerald/20 px-3 py-2"
        >
          <span className="text-xs font-bold text-emerald">{prov.name}</span>
          <p className="text-xs text-text-secondary/70 mt-0.5">{prov.desc}</p>
        </div>
      ))}
    </div>
  ),

  reasoning: (
    <div className="space-y-3">
      <p>
        The majority opinion, led by Chief Justice Sikri, held that the
        Constitution confers a limited amending power on Parliament. While
        Article 368 grants wide powers to amend any provision, it does not
        include the power to destroy the essential features or basic structure of
        the Constitution.
      </p>
      <p>
        Justice H.R. Khanna, whose opinion was decisive, agreed that the power
        of amendment is broad but not unlimited. He emphasized that the identity
        of the Constitution must be preserved; Parliament cannot, under the guise
        of amendment, destroy or abrogate the basic structure.
      </p>
      <p>
        The minority opinion, led by Justice A.N. Ray, argued that the amending
        power was plenary and that there were no implied limitations on
        Parliament&apos;s power to amend the Constitution.
      </p>
    </div>
  ),

  holding: (
    <p className="font-medium text-text-primary/90">
      The Supreme Court held that Parliament has the power to amend any provision
      of the Constitution, but it cannot alter the basic structure of the
      Constitution. The 24th Amendment was held valid, while Section 3 of the
      25th Amendment (removing judicial review of adequacy of compensation) was
      held unconstitutional.
    </p>
  ),

  takeaways: (
    <ul className="space-y-2 list-none">
      {[
        "The Basic Structure Doctrine is a cornerstone of Indian constitutional law, protecting the Constitution's identity.",
        "Parliament's amending power, though wide, is not unlimited — it cannot destroy the Constitution's essential features.",
        "Judicial review itself is part of the basic structure and cannot be taken away.",
        "This judgment influenced constitutional law globally and has been cited in courts of Bangladesh, Pakistan, and other nations.",
      ].map((tw, i) => (
        <li key={i} className="flex items-start gap-2">
          <span className="mt-1 size-1.5 shrink-0 rounded-full bg-pink-400/60" />
          <span>{tw}</span>
        </li>
      ))}
    </ul>
  ),
};

const MOCK_PRECEDENTS = [
  {
    caseName: "Golaknath v. State of Punjab",
    court: "Supreme Court of India",
    year: 1967,
    citation: "AIR 1967 SC 1643",
    similarityScore: 92,
    keyHolding:
      "Fundamental rights are not amenable to the parliamentary restriction and that to amend them a new Constituent Assembly would be required.",
  },
  {
    caseName: "Minerva Mills v. Union of India",
    court: "Supreme Court of India",
    year: 1980,
    citation: "AIR 1980 SC 1789",
    similarityScore: 88,
    keyHolding:
      "Judicial review and the balance between fundamental rights and directive principles form part of the basic structure.",
  },
  {
    caseName: "I.R. Coelho v. State of Tamil Nadu",
    court: "Supreme Court of India",
    year: 2007,
    citation: "(2007) 2 SCC 1",
    similarityScore: 79,
    keyHolding:
      "Laws placed in the Ninth Schedule after April 1973 can be challenged if they violate the basic structure of the Constitution.",
  },
];

/* ──────── Component ──────── */

export function InsightsPanel() {
  return (
    <div className="h-full overflow-y-auto px-1 py-4 space-y-3 custom-scrollbar">
      <StaggerContainer staggerDelay={0.08} className="space-y-3">
        {INSIGHT_SECTIONS.map((section, index) => (
          <StaggerItem key={section.id}>
            <InsightCard
              title={section.title}
              icon={section.icon}
              color={section.color}
              defaultOpen={index === 0}
            >
              {MOCK_INSIGHTS[section.id]}
            </InsightCard>
          </StaggerItem>
        ))}
      </StaggerContainer>

      {/* Precedents */}
      <FadeIn delay={0.5}>
        <div className="mt-6">
          <div className="flex items-center gap-2 mb-3 px-1">
            <h3 className="text-sm font-bold text-text-primary">
              Related Precedents
            </h3>
            <Badge variant="secondary" className="text-[10px] bg-gold/10 text-gold border-gold/20">
              {MOCK_PRECEDENTS.length} found
            </Badge>
          </div>
          <div className="space-y-3">
            {MOCK_PRECEDENTS.map((prec, i) => (
              <FadeIn key={prec.citation} delay={0.6 + i * 0.1}>
                <PrecedentCard {...prec} />
              </FadeIn>
            ))}
          </div>
        </div>
      </FadeIn>
    </div>
  );
}
