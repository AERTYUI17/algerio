import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Search, Camera, Eye, Heart, BadgeCheck, Menu, X } from "lucide-react";
import { SITES, CATEGORIES, HERO_DOMAINS, favicon, type Site } from "@/lib/sites";
import SiteDetail, { SiteImage } from "@/components/SiteDetail";
import { RatingModal, AuthModal, SubmitModal } from "@/components/modals";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "The Algerian Index — Every Algerian Website In One Place" },
      {
        name: "description",
        content:
          "A curated directory of Algerian websites: e-commerce, news, jobs, startups, government and more. Discover, rate and submit the Algerian web.",
      },
      { property: "og:title", content: "The Algerian Index" },
      {
        property: "og:description",
        content: "Discover, rate and submit the best Algerian websites — all in one directory.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const TYPED = ["ouedkniss.com", "yassir.app", "weilo.dz", "echoroukonline.com"];

function useTypewriter() {
  const [i, setI] = useState(0);
  const [text, setText] = useState("");
  useEffect(() => {
    const word = TYPED[i % TYPED.length];
    let n = 0;
    const typer = setInterval(() => {
      n += 1;
      setText(word.slice(0, n));
      if (n >= word.length) clearInterval(typer);
    }, 55);
    const swap = setTimeout(() => setI((v) => v + 1), 2000);
    return () => {
      clearInterval(typer);
      clearTimeout(swap);
    };
  }, [i]);
  return `Search ${text}...`;
}

function HeroGrid() {
  const tiles = useMemo(
    () =>
      Array.from({ length: 84 }, (_, i) => ({
        domain: i % 3 === 0 ? HERO_DOMAINS[Math.floor(i / 3) % HERO_DOMAINS.length] : null,
        delay: (i % 7) * 0.6,
      })),
    []
  );
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div className="grid w-[130%] -translate-x-[10%] -translate-y-[6%] rotate-[5deg] grid-cols-7 gap-6 p-6 sm:grid-cols-10 lg:grid-cols-12">
        {tiles.map((t, i) =>
          t.domain ? (
            <div
              key={i}
              className="float-tile flex h-14 w-14 items-center justify-center rounded-2xl bg-card shadow-lg"
              style={{ animationDelay: `${t.delay}s` }}
            >
              <img
                src={favicon(t.domain)}
                alt=""
                loading="lazy"
                className="h-8 w-8 rounded-md"
              />
            </div>
          ) : (
            <div
              key={i}
              className="float-tile h-14 w-14 rounded-2xl bg-muted"
              style={{ animationDelay: `${t.delay}s` }}
            />
          )
        )}
      </div>
      <div className="absolute inset-0 bg-background/70" />
    </div>
  );
}

function Navbar({
  compact,
  onAuth,
  onSubmit,
}: {
  compact?: boolean;
  onAuth: () => void;
  onSubmit: () => void;
}) {
  const [open, setOpen] = useState(false);
  const links = [
    { label: "Explore", href: "#directory" },
    { label: "Categories", href: "#directory" },
    { label: "Submit", href: "#", action: onSubmit },
  ];
  return (
    <nav
      className={`${compact ? "sticky top-0 z-30 border-b border-border bg-background/90 backdrop-blur" : "relative z-20"}`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4">
        <span className="text-base font-bold">🇩🇿 Algerian Index</span>

        {compact && (
          <div className="hidden flex-1 items-center gap-2 rounded-full border border-border bg-card px-4 py-2 shadow-sm md:flex md:max-w-sm">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              placeholder="Search the Algerian web..."
              className="w-full bg-transparent text-sm outline-none"
            />
          </div>
        )}

        <div className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={(e) => {
                if (l.action) {
                  e.preventDefault();
                  l.action();
                }
              }}
              className="transition-colors hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onAuth}
            className="hidden rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 md:block"
          >
            Sign in
          </button>
          <button
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
            className="rounded-full p-2 transition-colors hover:bg-muted md:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-background px-4 py-3 md:hidden">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={(e) => {
                setOpen(false);
                if (l.action) {
                  e.preventDefault();
                  l.action();
                }
              }}
              className="block py-2 text-sm text-muted-foreground"
            >
              {l.label}
            </a>
          ))}
          <button
            onClick={() => {
              setOpen(false);
              onAuth();
            }}
            className="mt-2 w-full rounded-full bg-primary py-2 text-sm font-medium text-primary-foreground"
          >
            Sign in
          </button>
        </div>
      )}
    </nav>
  );
}

function Card({ site, onOpen, onLike }: { site: Site; onOpen: () => void; onLike: () => void }) {
  return (
    <article
      onClick={onOpen}
      className="group cursor-pointer overflow-hidden rounded-2xl border border-border bg-card transition-all duration-200 hover:scale-[1.02] hover:shadow-xl"
    >
      <div className="aspect-[16/10] w-full overflow-hidden bg-muted">
        <SiteImage site={site} className="h-full w-full" />
      </div>
      <div className="space-y-3 p-4">
        <div className="flex items-center gap-2">
          {site.verified && <BadgeCheck className="h-4 w-4 text-foreground" />}
          <img src={favicon(site.url, 64)} alt="" className="h-5 w-5 rounded" />
          <span className="truncate text-sm font-semibold">{site.name}</span>
        </div>
        <p className="truncate text-xs text-muted-foreground">{site.description}</p>
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-muted text-[10px] font-semibold text-foreground">
            {site.name.charAt(0)}
          </span>
          <span className="truncate">{site.url}</span>
          <span className="ml-auto flex items-center gap-1">
            <Eye className="h-3.5 w-3.5" /> {site.views}
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onLike();
            }}
            className="flex items-center gap-1 transition-colors hover:text-foreground"
          >
            <Heart className="h-3.5 w-3.5" /> {site.likes}
          </button>
        </div>
      </div>
    </article>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-10 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-bold">🇩🇿 Algerian Index</p>
          <p className="text-sm text-muted-foreground">Discover the Algerian web</p>
        </div>
        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
          {["About", "Submit a Site", "Categories", "Contact", "Privacy"].map((l) => (
            <a key={l} href="#" className="transition-colors hover:text-foreground">
              {l}
            </a>
          ))}
        </div>
        <div className="text-sm text-muted-foreground md:text-right">
          <p>Made in Algeria</p>
          <p>© 2026 M7M Holdings</p>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-4 pb-10">
        <div className="mx-auto flex h-[90px] w-full max-w-[728px] items-center justify-center rounded-2xl border border-dashed border-border text-xs uppercase tracking-widest text-muted-foreground">
          Advertisement
        </div>
      </div>
    </footer>
  );
}

function Index() {
  const [selected, setSelected] = useState<Site | null>(null);
  const [category, setCategory] = useState("All");
  const [rating, setRating] = useState<Site | null>(null);
  const [auth, setAuth] = useState(false);
  const [submit, setSubmit] = useState(false);
  const placeholder = useTypewriter();

  const list = useMemo(
    () => (category === "All" ? SITES : SITES.filter((s) => s.category === category)),
    [category]
  );

  if (selected) {
    return (
      <div className="min-h-screen bg-background font-sans">
        <Navbar compact onAuth={() => setAuth(true)} onSubmit={() => setSubmit(true)} />
        <SiteDetail
          site={selected}
          onBack={() => setSelected(null)}
          onRate={() => setRating(selected)}
        />
        <Footer />
        <RatingModal
          open={!!rating}
          onClose={() => setRating(null)}
          siteName={rating?.name ?? ""}
        />
        <AuthModal open={auth} onClose={() => setAuth(false)} />
        <SubmitModal open={submit} onClose={() => setSubmit(false)} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background font-sans">
      <section className="relative min-h-screen overflow-hidden bg-background">
        <HeroGrid />
        <Navbar onAuth={() => setAuth(true)} onSubmit={() => setSubmit(true)} />

        <div className="relative z-20 mx-auto flex max-w-3xl flex-col items-center px-4 pb-20 pt-16 text-center sm:pt-24">
          <h1 className="text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl">
            Every Algerian Website.
            <br />
            <span className="text-muted-foreground">In One Place.</span>
          </h1>

          <div className="mt-10 flex w-full items-center gap-3 rounded-full border border-border bg-card px-5 py-4 shadow-lg">
            <Search className="h-5 w-5 shrink-0 text-muted-foreground" />
            <input
              placeholder={placeholder}
              className="w-full bg-transparent text-sm outline-none sm:text-base"
            />
            <button
              title="Search by image, coming soon"
              aria-label="Search by image, coming soon"
              className="shrink-0 rounded-full p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <Camera className="h-5 w-5" />
            </button>
          </div>

          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {["🔥 Ouedkniss", "💼 Emploi Algérie", "🛵 Yassir", "📰 Echorouk"].map((t) => (
              <button
                key={t}
                className="rounded-full border border-border bg-card px-4 py-2 text-sm transition-colors hover:bg-muted"
              >
                {t}
              </button>
            ))}
          </div>

          <a
            href="#directory"
            className="mt-10 rounded-full bg-primary px-8 py-4 font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            Explore Directory →
          </a>
        </div>
      </section>

      <div id="directory" className="bg-surface">
        <Navbar compact onAuth={() => setAuth(true)} onSubmit={() => setSubmit(true)} />
        <section className="mx-auto max-w-7xl px-4 py-10">
          <div className="flex gap-2 overflow-x-auto pb-4">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`shrink-0 rounded-full border px-4 py-2 text-sm transition-colors ${
                  category === c
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card text-muted-foreground hover:text-foreground"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((s) => (
              <Card
                key={s.url}
                site={s}
                onOpen={() => setSelected(s)}
                onLike={() => setRating(s)}
              />
            ))}
          </div>

          {list.length === 0 && (
            <p className="py-16 text-center text-sm text-muted-foreground">
              No sites in this category yet.
            </p>
          )}
        </section>
      </div>

      <Footer />
      <RatingModal open={!!rating} onClose={() => setRating(null)} siteName={rating?.name ?? ""} />
      <AuthModal open={auth} onClose={() => setAuth(false)} />
      <SubmitModal open={submit} onClose={() => setSubmit(false)} />
    </div>
  );
}
