"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
} from "@/components/ui/command";
import { FileText, Scale, User, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const RECENT_SEARCHES = [
  "Kesavananda Bharati v. State of Kerala",
  "Article 21 right to life",
  "Writ petition procedures",
];

const MOCK_CASES = [
  { name: "Maneka Gandhi v. Union of India", year: 1978, court: "Supreme Court" },
  { name: "Vishaka v. State of Rajasthan", year: 1997, court: "Supreme Court" },
  { name: "Navtej Singh Johar v. Union of India", year: 2018, court: "Supreme Court" },
  { name: "K.S. Puttaswamy v. Union of India", year: 2017, court: "Supreme Court" },
];

const MOCK_SECTIONS = [
  { name: "Article 14 — Right to Equality", act: "Constitution of India" },
  { name: "Article 19 — Freedom of Speech", act: "Constitution of India" },
  { name: "Section 302 — Punishment for Murder", act: "Indian Penal Code" },
];

const MOCK_JUDGES = [
  { name: "Justice D.Y. Chandrachud", court: "Supreme Court of India" },
  { name: "Justice Sanjiv Khanna", court: "Supreme Court of India" },
  { name: "Justice B.R. Gavai", court: "Supreme Court of India" },
];

import { useUIStore } from "@/stores";

export function CommandSearch() {
  const { searchOpen, setSearchOpen } = useUIStore();
  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setSearchOpen(!searchOpen);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [searchOpen, setSearchOpen]);

  return (
    <CommandDialog
      open={searchOpen}
      onOpenChange={setSearchOpen}
      title="Search"
      description="Search cases, sections, judges..."
      className="glass-strong sm:max-w-lg"
    >
      <CommandInput placeholder="Search cases, sections, judges..." />
      <CommandList className="max-h-80">
        <CommandEmpty>
          <div className="flex flex-col items-center gap-2 py-4 text-text-secondary">
            <Scale size={32} className="text-text-muted" />
            <p>No results found. Try a different search.</p>
          </div>
        </CommandEmpty>

        {/* Recent */}
        <CommandGroup heading="Recent">
          {RECENT_SEARCHES.map((search) => (
            <CommandItem
              key={search}
              onSelect={() => setSearchOpen(false)}
              className="flex items-center gap-3 py-2"
            >
              <Clock size={14} className="text-text-muted" />
              <span className="flex-1 text-text-secondary">{search}</span>
              <Badge variant="secondary" className="text-[10px] bg-white/5 text-text-muted border-0">
                Recent
              </Badge>
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        {/* Cases */}
        <CommandGroup heading="Cases">
          {MOCK_CASES.map((c) => (
            <CommandItem
              key={c.name}
              onSelect={() => {
                setSearchOpen(false);
                router.push("/research");
              }}
              className="flex items-center gap-3 py-2"
            >
              <FileText size={14} className="text-gold" />
              <div className="flex-1 min-w-0">
                <span className="text-text-primary truncate block">{c.name}</span>
                <span className="text-xs text-text-muted">
                  {c.court} · {c.year}
                </span>
              </div>
              <Badge variant="secondary" className="text-[10px] bg-gold/10 text-gold border-0">
                Case
              </Badge>
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        {/* Sections */}
        <CommandGroup heading="Legal Sections">
          {MOCK_SECTIONS.map((s) => (
            <CommandItem
              key={s.name}
              onSelect={() => setSearchOpen(false)}
              className="flex items-center gap-3 py-2"
            >
              <Scale size={14} className="text-emerald" />
              <div className="flex-1 min-w-0">
                <span className="text-text-primary truncate block">{s.name}</span>
                <span className="text-xs text-text-muted">{s.act}</span>
              </div>
              <Badge variant="secondary" className="text-[10px] bg-emerald/10 text-emerald border-0">
                Section
              </Badge>
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        {/* Judges */}
        <CommandGroup heading="Judges">
          {MOCK_JUDGES.map((j) => (
            <CommandItem
              key={j.name}
              onSelect={() => setSearchOpen(false)}
              className="flex items-center gap-3 py-2"
            >
              <User size={14} className="text-blue-400" />
              <div className="flex-1 min-w-0">
                <span className="text-text-primary truncate block">{j.name}</span>
                <span className="text-xs text-text-muted">{j.court}</span>
              </div>
              <Badge variant="secondary" className="text-[10px] bg-blue-400/10 text-blue-400 border-0">
                Judge
              </Badge>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
