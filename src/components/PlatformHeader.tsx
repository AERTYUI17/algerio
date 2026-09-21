import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import markAsset from "@/assets/algerio-mark.png.asset.json";

export default function PlatformHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2 font-bold">
          <img src={markAsset.url} alt="ALGERIO" className="h-8 w-8 object-contain" />
          <span>ALGERIO</span>
        </Link>
        <nav className="hidden items-center gap-5 text-sm md:flex">
          <Link to="/" className="text-muted-foreground hover:text-foreground">Explore</Link>
          <Link to="/sponsors-hall" className="text-muted-foreground hover:text-foreground">Our Sponsors</Link>
          <Link to="/owner-dashboard" className="text-muted-foreground hover:text-foreground">Site owners</Link>
          <Link to="/sponsors" className="text-muted-foreground hover:text-foreground">Advertise</Link>
          <Button asChild className="rounded-full bg-foreground text-background hover:bg-foreground/90">
            <Link to="/submit">Submit a Site</Link>
          </Button>
        </nav>
        <Button variant="ghost" size="icon" className="rounded-full md:hidden" onClick={() => setOpen((v) => !v)} aria-label="Menu">
          {open ? <X /> : <Menu />}
        </Button>
      </div>
      {open && (
        <nav className="grid gap-1 border-t border-border bg-background p-4 text-sm md:hidden">
          <Link to="/" className="rounded-xl px-3 py-2 hover:bg-muted">Directory</Link>
          <Link to="/sponsors-hall" className="rounded-xl px-3 py-2 hover:bg-muted">Our Sponsors</Link>
          <Link to="/owner-dashboard" className="rounded-xl px-3 py-2 hover:bg-muted">Site owners</Link>
          <Link to="/sponsors" className="rounded-xl px-3 py-2 hover:bg-muted">Advertise</Link>
          <Button asChild className="mt-2 rounded-full bg-foreground text-background"><Link to="/submit">Submit a Site</Link></Button>
        </nav>
      )}
    </header>
  );
}
