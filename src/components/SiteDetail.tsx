import { useState } from "react";
import {
  ArrowLeft,
  Star,
  Eye,
  Heart,
  Share2,
  Bookmark,
  Globe,
  Smartphone,
  BadgeCheck,
  Lock,
  Gift,
  Flag,
  Link2,
  Calendar,
  Tag,
} from "lucide-react";
import { favicon, shot, REVIEWS, SITES, type Site } from "@/lib/sites";

export function SiteImage({
  site,
  className = "",
  iconSize = 64,
}: {
  site: Site;
  className?: string;
  iconSize?: number;
}) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <div className={`flex items-center justify-center bg-muted ${className}`}>
        <img
          src={favicon(site.url, 128)}
          alt={`${site.name} logo`}
          width={iconSize}
          height={iconSize}
          className="rounded-xl"
          style={{ width: iconSize, height: iconSize }}
        />
      </div>
    );
  }
  return (
    <img
      src={shot(site.url)}
      alt={`Screenshot of ${site.name}`}
      loading="lazy"
      onError={() => setFailed(true)}
      className={`object-cover ${className}`}
    />
  );
}

const FEATURES = [
  { icon: Globe, label: "Available online" },
  { icon: Smartphone, label: "Has mobile app" },
  { icon: Flag, label: "Algeria-focused" },
  { icon: BadgeCheck, label: "AI Verified" },
  { icon: Lock, label: "Secure" },
  { icon: Gift, label: "Free to use" },
];

const DIST = [
  [5, 60],
  [4, 30],
  [3, 6],
  [2, 3],
  [1, 1],
];

export default function SiteDetail({
  site,
  onBack,
  onRate,
  onNavigate,
}: {
  site: Site;
  onBack: () => void;
  onRate: () => void;
  onNavigate?: (s: Site) => void;
}) {
  const similar = SITES.filter(
    (s) => s.category === site.category && s.url !== site.url
  ).slice(0, 4);

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <button
        onClick={onBack}
        className="mb-4 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Algerio / {site.category} / {site.name}
      </button>

      <div className="flex flex-wrap items-end justify-between gap-4">
        <h1 className="text-3xl font-bold tracking-tight">{site.name}</h1>
        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1 text-foreground">
            <Star className="h-4 w-4 fill-foreground" /> {site.rating}
          </span>
          <span className="flex items-center gap-1">
            <Eye className="h-4 w-4" /> {site.views} views
          </span>
          <span className="flex items-center gap-1">
            <Heart className="h-4 w-4" /> {site.likes}
          </span>
          <button className="flex items-center gap-1 rounded-full px-3 py-1.5 transition-colors hover:bg-muted">
            <Share2 className="h-4 w-4" /> Share
          </button>
          <button className="flex items-center gap-1 rounded-full px-3 py-1.5 transition-colors hover:bg-muted">
            <Bookmark className="h-4 w-4" /> Save
          </button>
        </div>
      </div>

      <div className="relative mt-6 grid grid-cols-1 gap-2 md:grid-cols-5">
        <div className="overflow-hidden rounded-2xl md:col-span-3">
          <SiteImage site={site} className="h-64 w-full md:h-[26rem]" />
        </div>
        <div className="grid grid-cols-2 gap-2 md:col-span-2">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="overflow-hidden rounded-2xl">
              <SiteImage site={site} className="h-32 w-full md:h-[12.7rem]" iconSize={40} />
            </div>
          ))}
        </div>
        <button className="absolute bottom-4 right-4 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-muted">
          Show all photos
        </button>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-5">
        <div className="space-y-8 lg:col-span-3">
          <section>
            <h2 className="text-xl font-semibold">About {site.name}</h2>
            <div className="mt-3 flex flex-wrap items-center gap-2 text-sm">
              <span className="rounded-full bg-muted px-3 py-1">{site.category}</span>
              <span className="rounded-full bg-muted px-3 py-1">Founded {site.year}</span>
              {site.verified && (
                <span className="flex items-center gap-1 rounded-full bg-muted px-3 py-1">
                  <BadgeCheck className="h-4 w-4" /> Verified
                </span>
              )}
            </div>
            <p className="mt-4 text-muted-foreground">
              {site.description}. {site.name} is part of the Algerian web ecosystem, serving users
              across the country with a platform built around local needs, local language and
              local payment habits.
            </p>
          </section>

          <hr className="border-border" />

          <section>
            <h2 className="text-xl font-semibold">What this platform offers</h2>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {FEATURES.map((f) => (
                <div key={f.label} className="flex items-center gap-3 text-sm">
                  <f.icon className="h-5 w-5 text-muted-foreground" />
                  {f.label}
                </div>
              ))}
            </div>
          </section>

          <hr className="border-border" />

          <section>
            <h2 className="text-xl font-semibold">Founders &amp; Team</h2>
            {site.founder ? (
              <div className="mt-4 flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-muted font-semibold">
                  {site.founder.charAt(0)}
                </div>
                <div>
                  <p className="font-medium">{site.founder}</p>
                  <p className="text-sm text-muted-foreground">
                    Founded {site.name} in {site.year} and leads its product direction.
                  </p>
                </div>
              </div>
            ) : (
              <p className="mt-3 text-sm text-muted-foreground">Founder information not available.</p>
            )}
          </section>

          <hr className="border-border" />

          <section>
            <h2 className="text-xl font-semibold">Ratings &amp; Reviews</h2>
            <div className="mt-4 space-y-2">
              {DIST.map(([stars, pct]) => (
                <div key={stars} className="flex items-center gap-3 text-sm">
                  <span className="w-16 text-muted-foreground">{stars} stars</span>
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                    <div className="h-full bg-foreground" style={{ width: `${pct}%` }} />
                  </div>
                  <span className="w-10 text-right text-muted-foreground">{pct}%</span>
                </div>
              ))}
            </div>

            <div className="mt-6 space-y-4">
              {REVIEWS.map((r) => (
                <div key={r.user} className="rounded-2xl border border-border p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-sm font-semibold">
                      {r.user.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-medium">
                        {r.user}{" "}
                        <span className="text-xs text-muted-foreground">via {r.provider}</span>
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {"⭐".repeat(r.stars)}
                      </p>
                    </div>
                    <Link2 className="ml-auto h-4 w-4 text-muted-foreground" />
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground">{r.text}</p>
                </div>
              ))}
            </div>

            <button
              onClick={onRate}
              className="mt-5 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              Add your rating
            </button>
          </section>
        </div>

        <aside className="lg:col-span-2">
          <div className="sticky top-24 space-y-4 rounded-2xl border border-border bg-card p-6 shadow-lg">
            <p className="flex items-center gap-2 text-sm">
              <Star className="h-4 w-4 fill-foreground" /> {site.rating} ·{" "}
              <span className="text-muted-foreground">{site.views} views</span>
            </p>
            <a
              href={`https://${site.url}`}
              target="_blank"
              rel="noreferrer noopener"
              className="block rounded-full bg-primary py-3 text-center font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              Visit website →
            </a>
            <hr className="border-border" />
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">🇩🇿 Algerian Platform</li>
              <li className="flex items-center gap-2">
                <Calendar className="h-4 w-4" /> Founded: {site.year}
              </li>
              <li className="flex items-center gap-2">
                <Tag className="h-4 w-4" /> Category: {site.category}
              </li>
              <li className="flex items-center gap-2">
                <BadgeCheck className="h-4 w-4" /> AI Verified
              </li>
            </ul>
            <hr className="border-border" />
            <p className="text-sm font-medium">Share this site:</p>
            <div className="flex flex-wrap gap-2">
              {["Twitter", "WhatsApp", "Copy link"].map((s) => (
                <button
                  key={s}
                  className="rounded-full border border-border px-4 py-2 text-sm transition-colors hover:bg-muted"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </aside>
      </div>

      {similar.length > 0 && (
        <section className="mt-12">
          <h2 className="text-xl font-semibold">Similar Algerian Sites</h2>
          <div className="mt-4 flex gap-4 overflow-x-auto pb-2">
            {similar.map((s) => (
              <button
                key={s.url}
                onClick={() => onNavigate?.(s)}
                className="w-56 shrink-0 overflow-hidden rounded-2xl border border-border bg-card text-left transition-shadow hover:shadow-lg"
              >
                <div className="aspect-[16/10] w-full overflow-hidden bg-muted">
                  <SiteImage site={s} className="h-full w-full" iconSize={40} />
                </div>
                <div className="p-3">
                  <p className="truncate text-sm font-semibold">{s.name}</p>
                  <p className="truncate text-xs text-muted-foreground">{s.url}</p>
                </div>
              </button>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
