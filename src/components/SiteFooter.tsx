import { Plus, Mail } from "lucide-react";
import { Link } from "@tanstack/react-router";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SITES, CATEGORY_META } from "@/lib/sites";
import { AD_CONTACT, ALGERIO_PRODUCTS } from "@/lib/platform";
import logoAsset from "@/assets/logo.png.asset.json";

const FAQ = [
  {
    q: "What is ALGERIO?",
    a: "A curated directory of Algerian websites, tools and platforms.",
  },
  {
    q: "How do I submit my website?",
    a: "Click Submit in the navbar, fill the form, and our AI verifies if your site is Algerian.",
  },
  { q: "Is it free?", a: "Yes, listing your site is completely free." },
  {
    q: "How can I advertise on ALGERIO?",
    a: `Sponsor spaces are available across the directory. Reach us at ${AD_CONTACT}.`,
  },
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
          Crafted with 🇩🇿 and some ☕ by ALGERIO
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
          <Link
            to="/sponsors"
            aria-label="Add your logo"
            className="flex h-14 w-14 items-center justify-center rounded-2xl border border-border transition-colors hover:bg-muted"
          >
            <Plus className="h-5 w-5" />
          </Link>
        </div>
      </div>

      <div className="mx-auto mt-16 max-w-5xl px-4">
        <div className="rounded-3xl border border-border bg-card p-10">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-4">
            <div>
              <p className="text-sm font-semibold">Directory</p>
              <div className="mt-2 h-px w-10 bg-border" />
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                {CATEGORY_META.slice(0, 4).map((c) => (
                  <li key={c.key}>{c.label}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-sm font-semibold">Explore</p>
              <div className="mt-2 h-px w-10 bg-border" />
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link to="/submit" className="transition-colors hover:text-foreground">
                    Submit a site
                  </Link>
                </li>
                <li>
                  <Link to="/sponsors-hall" className="transition-colors hover:text-foreground">
                    Our Sponsors
                  </Link>
                </li>
                <li>
                  <Link to="/owner-dashboard" className="transition-colors hover:text-foreground">
                    Site owners
                  </Link>
                </li>
                <li>
                  <Link to="/sponsors" className="transition-colors hover:text-foreground">
                    Advertise
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <p className="text-sm font-semibold">Our Products</p>
              <div className="mt-2 h-px w-10 bg-border" />
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                {ALGERIO_PRODUCTS.map((p) => (
                  <li key={p.name}>
                    {p.name}
                    {p.soon && <span className="ml-1 text-xs">(soon)</span>}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-sm font-semibold">Advertise with us</p>
              <div className="mt-2 h-px w-10 bg-border" />
              <p className="mt-3 text-sm text-muted-foreground">
                Put your brand in front of the Algerian web.
              </p>
              <a
                href={`mailto:${AD_CONTACT}`}
                className="mt-3 inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
              >
                <Mail className="h-4 w-4" /> Contact us
              </a>
            </div>
          </div>

          <div className="mt-10 flex items-center gap-4">
            <div className="h-px flex-1 bg-border" />
            <img src={logoAsset.url} alt="ALGERIO logo" className="h-8 w-8 object-contain" />
            <div className="h-px flex-1 bg-border" />
          </div>
          <p className="mt-4 text-center text-sm text-muted-foreground">© 2024–2026 ALGERIO</p>
          <p className="text-center text-sm text-muted-foreground">All rights reserved.</p>
        </div>
      </div>

      <div className="pointer-events-none select-none overflow-hidden">
        <p className="whitespace-nowrap text-center text-[120px] font-black leading-none tracking-widest text-muted">
          ALGERIO
        </p>
      </div>
    </footer>
  );
}
