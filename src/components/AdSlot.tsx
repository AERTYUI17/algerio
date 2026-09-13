import { AD_SPACES, ACTIVE_ADS, AD_CONTACT, type AdSpaceKey } from "@/lib/platform";

export default function AdSlot({
  space,
  className = "",
  fullWidth = false,
}: {
  space: AdSpaceKey;
  className?: string;
  fullWidth?: boolean;
}) {
  const meta = AD_SPACES.find((s) => s.key === space);
  if (!meta) return null;
  const ad = ACTIVE_ADS[space];

  return (
    <div className={`relative mx-auto ${className}`} style={{ maxWidth: fullWidth ? "100%" : meta.width }}>
      <span className="absolute right-1 top-1 z-10 text-[10px] uppercase tracking-wide text-muted-foreground">
        Advertisement
      </span>
      {ad ? (
        <a href={ad.url} target="_blank" rel="noreferrer noopener" className="block">
          <img
            src={ad.image}
            alt={`${ad.sponsor} advertisement`}
            loading="lazy"
            className="w-full rounded-2xl object-cover"
            style={{ aspectRatio: `${meta.width} / ${meta.height}` }}
          />
        </a>
      ) : (
        <div
          className="flex items-center justify-center rounded-2xl border border-dashed border-border bg-muted/40 px-4 text-center"
          style={{ minHeight: meta.height, aspectRatio: fullWidth ? undefined : `${meta.width} / ${meta.height}` }}
        >
          <p className="text-xs text-muted-foreground">
            Ad space available — {AD_CONTACT}
            <span className="ml-2 hidden sm:inline">
              ({meta.width} × {meta.height})
            </span>
          </p>
        </div>
      )}
    </div>
  );
}
