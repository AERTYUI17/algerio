import { useMemo, useState } from "react";
import { SITES, CATEGORY_META, countFor, type Site } from "@/lib/sites";
import Card from "@/components/SiteCard";

type Sort = "views" | "rating" | "likes";

const parseViews = (v: string) => {
  const n = parseFloat(v);
  if (v.includes("M")) return n * 1_000_000;
  if (v.includes("K")) return n * 1_000;
  return n;
};

export default function Directory({
  category,
  onCategory,
  onOpen,
  onLike,
}: {
  category: string;
  onCategory: (c: string) => void;
  onOpen: (s: Site) => void;
  onLike: (s: Site) => void;
}) {
  const [sort, setSort] = useState<Sort>("views");

  const list = useMemo(() => {
    const base = category === "All" ? SITES : SITES.filter((s) => s.category === category);
    return [...base].sort((a, b) =>
      sort === "rating"
        ? b.rating - a.rating
        : sort === "likes"
          ? b.likes - a.likes
          : parseViews(b.views) - parseViews(a.views)
    );
  }, [category, sort]);

  return (
    <div className="mx-auto flex max-w-7xl gap-8 px-4 py-8">
      <aside className="hidden w-[220px] shrink-0 lg:block">
        <p className="px-3 text-sm font-semibold">Browse by Category</p>
        <div className="mt-3 space-y-1">
          <button
            onClick={() => onCategory("All")}
            className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm transition-colors ${
              category === "All"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            <span>🇩🇿 All Sites</span>
            <span className="text-xs">{SITES.length}</span>
          </button>
          {CATEGORY_META.map((c) => {
            const active = category === c.key;
            return (
              <button
                key={c.key}
                onClick={() => onCategory(c.key)}
                className={`flex w-full items-center justify-between gap-2 rounded-xl px-3 py-2 text-left text-sm transition-colors ${
                  active
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <span className="truncate">
                  {c.emoji} {c.label}
                </span>
                <span className="text-xs">{countFor(c.key)}</span>
              </button>
            );
          })}
        </div>
      </aside>

      <section className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-2xl font-bold tracking-tight">
            {category === "All" ? "All Sites" : category} ({list.length})
          </h1>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as Sort)}
            className="rounded-full border border-border bg-card px-4 py-2 text-sm outline-none"
            aria-label="Sort sites"
          >
            <option value="views">Most Viewed</option>
            <option value="rating">Top Rated</option>
            <option value="likes">Most Liked</option>
          </select>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {list.map((s) => (
            <Card key={s.url} site={s} onOpen={() => onOpen(s)} onLike={() => onLike(s)} />
          ))}
        </div>

        {list.length === 0 && (
          <p className="py-16 text-center text-sm text-muted-foreground">
            No sites in this category yet.
          </p>
        )}
      </section>
    </div>
  );
}
