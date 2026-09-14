import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { Search, Camera, Menu, X, ChevronDown } from "lucide-react";
import {
  SITES,
  HERO_DOMAINS,
  CATEGORY_META,
  countFor,
  favicon,
  type Site,
} from "@/lib/sites";
import SiteDetail from "@/components/SiteDetail";
import Card from "@/components/SiteCard";
import Directory from "@/components/Directory";
import SiteFooter from "@/components/SiteFooter";
import CookieBanner from "@/components/CookieBanner";
import { RatingModal, AuthModal, SubmitModal } from "@/components/modals";
import logoAsset from "@/assets/logo.png.asset.json";

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
    const word = TYPED[i % TYPED.length] ?? "";
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
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
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
  onHome,
  onExplore,
  onPickCategory,
}: {
  compact?: boolean;
  onAuth: () => void;
  onSubmit: () => void;
  onHome: () => void;
  onExplore: () => void;
  onPickCategory: (key: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [mega, setMega] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mega) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMega(false);
    const onClick = (e: MouseEvent) => {
      if (wrap.current && !wrap.current.contains(e.target as Node)) setMega(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [mega]);

  return (
    <div ref={wrap}>
      <nav
        className={`${compact ? "sticky top-0 z-30 border-b border-border bg-background/90 backdrop-blur" : "relative z-20"}`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4">
          <button onClick={onHome} className="flex items-center gap-2 text-base font-bold">
            <img src={logoAsset.url} alt="The Algerian Index logo" className="h-7 w-7 object-contain" />
            Algerian Index
          </button>

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
            <button onClick={onExplore} className="transition-colors hover:text-foreground">
              Explore
            </button>
            <button
              onClick={() => setMega((v) => !v)}
              className="flex items-center gap-1 transition-colors hover:text-foreground"
            >
              Categories <ChevronDown className="h-4 w-4" />
            </button>
            <button onClick={onSubmit} className="transition-colors hover:text-foreground">
              Submit
            </button>
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
            <button
              onClick={() => {
                setOpen(false);
                onExplore();
              }}
              className="block w-full py-2 text-left text-sm text-muted-foreground"
            >
              Explore
            </button>
            <button
              onClick={() => {
                setOpen(false);
                setMega(true);
              }}
              className="block w-full py-2 text-left text-sm text-muted-foreground"
            >
              Categories
            </button>
            <button
              onClick={() => {
                setOpen(false);
                onSubmit();
              }}
              className="block w-full py-2 text-left text-sm text-muted-foreground"
            >
              Submit
            </button>
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

      {mega && (
        <div className="absolute left-0 right-0 z-40 border-b border-border bg-background shadow-xl">
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-2 px-4 py-6 sm:grid-cols-3 lg:grid-cols-4">
            {CATEGORY_META.map((c) => (
              <button
                key={c.key}
                onClick={() => {
                  setMega(false);
                  onPickCategory(c.key);
                }}
                className="flex items-center justify-between gap-2 rounded-xl px-3 py-2 text-left text-sm transition-colors hover:bg-muted"
              >
                <span className="truncate">
                  {c.emoji} {c.label}
                </span>
                <span className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                  {countFor(c.key)}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function Index() {
  const [screen, setScreen] = useState<"landing" | "directory" | "detail">("landing");
  const [selected, setSelected] = useState<Site | null>(null);
  const [category, setCategory] = useState("All");
  const [rating, setRating] = useState<Site | null>(null);
  const [auth, setAuth] = useState(false);
  const [submit, setSubmit] = useState(false);
  const placeholder = useTypewriter();

  const openSite = (s: Site) => {
    setSelected(s);
    setScreen("detail");
    window.scrollTo({ top: 0 });
  };

  const goDirectory = (cat?: string) => {
    if (cat) setCategory(cat);
    setScreen("directory");
    window.scrollTo({ top: 0 });
  };

  const nav = (
    <Navbar
      compact={screen !== "landing"}
      onAuth={() => setAuth(true)}
      onSubmit={() => setSubmit(true)}
      onHome={() => setScreen("landing")}
      onExplore={() => goDirectory()}
      onPickCategory={(c) => goDirectory(c)}
    />
  );

  const overlays = (
    <>
      <RatingModal open={!!rating} onClose={() => setRating(null)} siteName={rating?.name ?? ""} />
      <AuthModal open={auth} onClose={() => setAuth(false)} />
      <SubmitModal open={submit} onClose={() => setSubmit(false)} />
      <CookieBanner />
    </>
  );

  if (screen === "detail" && selected) {
    return (
      <div className="min-h-screen bg-background font-sans">
        {nav}
        <SiteDetail
          site={selected}
          onBack={() => setScreen("directory")}
          onRate={() => setRating(selected)}
          onNavigate={openSite}
        />
        <SiteFooter />
        {overlays}
      </div>
    );
  }

  if (screen === "directory") {
    return (
      <div className="min-h-screen bg-background font-sans">
        {nav}
        <Directory
          category={category}
          onCategory={setCategory}
          onOpen={openSite}
          onLike={(s) => setRating(s)}
        />
        <SiteFooter />
        {overlays}
      </div>
    );
  }

  const preview = SITES.slice(0, 9);

  return (
    <div className="min-h-screen bg-background font-sans">
      <section className="relative overflow-hidden bg-background pb-20 pt-6">
        <HeroGrid />
        {nav}

        <div className="relative z-20 mx-auto flex max-w-3xl flex-col items-center px-4 pt-16 text-center sm:pt-24">
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

          <button
            onClick={() => goDirectory()}
            className="mt-10 rounded-full bg-primary px-8 py-4 font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            Explore Directory →
          </button>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16">
        <div className="relative">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {preview.map((s) => (
              <Card key={s.url} site={s} onOpen={() => openSite(s)} onLike={() => setRating(s)} />
            ))}
          </div>

          <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-72 bg-gradient-to-b from-transparent to-background" />

          <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center gap-3 pb-4 text-center">
            <p className="text-lg font-semibold">
              You&apos;ve seen only the first 9 Algerian sites
            </p>
            <p className="text-sm text-muted-foreground">
              Sign up to explore all 200+ sites in the full directory
            </p>
            <button
              onClick={() => setAuth(true)}
              className="rounded-full border border-border bg-card px-6 py-3 text-sm font-medium shadow-sm transition-colors hover:bg-muted"
            >
              Continue with Google
            </button>
          </div>
        </div>

        <div className="mt-10 flex justify-center">
          <button
            onClick={() => goDirectory()}
            className="rounded-full bg-primary px-8 py-4 font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            Explore All Algerian Sites →
          </button>
        </div>
      </section>

      <SiteFooter />
      {overlays}
    </div>
  );
}
