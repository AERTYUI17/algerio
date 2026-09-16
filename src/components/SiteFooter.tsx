import { Plus } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SITES, CATEGORY_META } from "@/lib/sites";
import logoAsset from "@/assets/logo.png.asset.json";

const FAQ = [
  {
    q: "What is Algerio?",
    a: "A curated directory of Algerian websites, tools and platforms.",
  },
  {
    q: "How do I submit my website?",
    a: "Click Submit in the navbar, fill the form, and our AI verifies if your site is Algerian.",
  },
  { q: "Is it free?", a: "Yes, listing your site is completely free." },
];

const COLUMNS: { title: string; links: string[] }[] = [
  { title: "Directory", links: ["News", "Jobs", "E-commerce", "Startups"] },
  { title: "Explore", links: ["Categories", "Submit", "Trending", "Creators"] },
  { title: "Company", links: ["About", "Contact", "Privacy Policy", "Advertise"] },
];

export default function SiteFooter() {
  const verified = SITES.filter((s) => s.verified).length;

  return (
    <footer className="bg-background pt-16">
      <div className="mx-auto max-w-3xl px-4">
        <h2 className="text-center text-2xl font-bold tracking-tight">
          Answers to common questions
        </h2>
        <Accordion type="single" collapsible className="mt-6">
          {FAQ.map((f) => (
            <AccordionItem key={f.q} value={f.q}>
              <AccordionTrigger className="text-left text-sm font-medium">{f.q}</AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <p className="mt-10 text-center text-sm text-muted-foreground">
          Crafted with 🇩🇿 and some ☕ by M7M Holdings
        </p>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-sm">
          <span className="rounded-full bg-muted px-4 py-1.5 font-medium">
            {SITES.length} sites listed
          </span>
          <span className="rounded-full bg-muted px-4 py-1.5 font-medium">
            {CATEGORY_META.length} categories
          </span>
          <span className="rounded-full bg-muted px-4 py-1.5 font-medium">{verified} verified</span>
        </div>

        <p className="mt-10 text-center text-xs uppercase tracking-widest text-muted-foreground">
          Sponsored by
        </p>
        <div className="mt-4 flex items-center justify-center gap-3">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="h-14 w-28 rounded-2xl border border-dashed border-border bg-card"
            />
          ))}
          <button
            aria-label="Add your logo"
            className="flex h-14 w-14 items-center justify-center rounded-2xl border border-border transition-colors hover:bg-muted"
          >
            <Plus className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="mx-auto mt-16 max-w-5xl px-4">
        <div className="rounded-3xl border border-border bg-card p-10">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            {COLUMNS.map((c) => (
              <div key={c.title}>
                <p className="text-sm font-semibold">{c.title}</p>
                <div className="mt-2 h-px w-10 bg-border" />
                <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                  {c.links.map((l) => (
                    <li key={l}>
                      <a href="#" className="transition-colors hover:text-foreground">
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-10 flex items-center gap-4">
            <div className="h-px flex-1 bg-border" />
            <img src={logoAsset.url} alt="Algerio logo" className="h-8 w-8 object-contain" />
            <div className="h-px flex-1 bg-border" />
          </div>
          <p className="mt-4 text-center text-sm text-muted-foreground">
            © 2024–2026 M7M Holdings
          </p>
          <p className="text-center text-sm text-muted-foreground">All rights reserved.</p>
        </div>
      </div>

      <div className="pointer-events-none select-none overflow-hidden">
        <p className="whitespace-nowrap text-center text-[120px] font-black leading-none tracking-widest text-muted">
          ALGERIAN INDEX
        </p>
      </div>
    </footer>
  );
}
