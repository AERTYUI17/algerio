import { Eye, Heart, BadgeCheck } from "lucide-react";
import { favicon, type Site } from "@/lib/sites";
import { SiteImage } from "@/components/SiteDetail";

export default function Card({
  site,
  onOpen,
  onLike,
}: {
  site: Site;
  onOpen: () => void;
  onLike: () => void;
}) {
  return (
    <article
      onClick={onOpen}
      className="group cursor-pointer overflow-hidden rounded-2xl border border-border bg-card lift"
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
