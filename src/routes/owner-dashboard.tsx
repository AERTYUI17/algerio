import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { BarChart3, BadgeCheck, Check, ChevronRight, Copy, Globe2, Mail, Search, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import PlatformHeader from "@/components/PlatformHeader";
import { Button } from "@/components/ui/button";
import { SITES, favicon } from "@/lib/sites";

export const Route = createFileRoute("/owner-dashboard")({
  head: () => ({ meta: [
    { title: "Website Owner Dashboard — Algerio" },
    { name: "description", content: "Claim and manage your Algerian website listing on Algerio." },
    { property: "og:title", content: "Website Owner Dashboard — Algerio" },
    { property: "og:description", content: "Verify ownership and manage your Algerio listing." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" },
  ]}), component: OwnerDashboard,
});

type Method = "meta" | "file" | "dns";
const methods: { key: Method; label: string; detail: string }[] = [
  { key: "meta", label: "Meta tag", detail: "Add a verification tag to your homepage head." },
  { key: "file", label: "HTML file", detail: "Upload a small verification file to your website." },
  { key: "dns", label: "DNS TXT", detail: "Add a TXT record at your domain provider." },
];

function OwnerDashboard() {
  const [signedIn, setSignedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [view, setView] = useState<"dashboard" | "claim">("dashboard");
  const [domain, setDomain] = useState("");
  const [method, setMethod] = useState<Method>("meta");
  const [verified, setVerified] = useState(false);
  const found = SITES.find((s) => s.url === domain.replace(/^https?:\/\//, "").replace(/\/$/, ""));
  const token = "algerio-site-verification=dzidx-k4p9m2v7";

  if (!signedIn) return <><PlatformHeader /><main className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-6xl items-center gap-12 px-4 py-12 lg:grid-cols-2"><div><p className="text-sm font-semibold text-primary">For website owners</p><h1 className="mt-3 text-4xl font-bold sm:text-5xl">Own your presence on the Algerian web.</h1><p className="mt-5 max-w-lg text-lg text-muted-foreground">Claim your listing, verify ownership, monitor performance, and keep your public profile accurate.</p><div className="mt-8 grid gap-3 sm:grid-cols-3">{[[ShieldCheck,"Verified ownership"],[BarChart3,"Listing insights"],[Globe2,"Profile control"]].map(([Icon,label]) => { const I = Icon as typeof ShieldCheck; return <div key={label as string} className="rounded-2xl border border-border p-4 text-sm"><I className="mb-3 h-5 w-5 text-primary" />{label as string}</div>; })}</div></div><form onSubmit={(e) => { e.preventDefault(); setSignedIn(true); toast.success("Magic link confirmed for this preview"); }} className="rounded-2xl border border-border bg-card p-8 shadow-lg"><Mail className="h-8 w-8 text-primary" /><h2 className="mt-5 text-2xl font-bold">Sign in with a magic link</h2><p className="mt-2 text-sm text-muted-foreground">Use the email connected to your website. No password needed.</p><input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="owner@company.dz" className="mt-6 w-full rounded-xl border border-input px-4 py-3 outline-none focus:ring-2 focus:ring-ring" /><Button type="submit" className="mt-4 w-full rounded-full bg-foreground text-background">Send magic link</Button><p className="mt-4 text-center text-xs text-muted-foreground">Demo mode opens the owner workspace immediately.</p></form></main></>;

  return <><PlatformHeader /><main className="mx-auto max-w-7xl px-4 py-10">{view === "dashboard" ? <>
    <div className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-sm text-muted-foreground">Signed in as {email}</p><h1 className="mt-1 text-3xl font-bold">Owner workspace</h1></div><Button onClick={() => { setView("claim"); setVerified(false); }} className="rounded-full bg-foreground text-background"><Search /> Claim another site</Button></div>
    <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{[["Claimed sites","2"],["Monthly views","936K"],["Average rating","4.55"],["Profile completeness","92%"]].map(([l,v]) => <div key={l} className="rounded-2xl border border-border p-5"><p className="text-sm text-muted-foreground">{l}</p><p className="mt-2 text-2xl font-bold">{v}</p></div>)}</div>
    <section className="mt-8"><h2 className="text-xl font-semibold">Your websites</h2><div className="mt-4 grid gap-4 md:grid-cols-2">{SITES.filter((s) => ["ouedkniss.com","yassir.app"].includes(s.url)).map((s) => <article key={s.url} className="flex items-center gap-4 rounded-2xl border border-border p-5"><img src={favicon(s.url)} alt={`${s.name} icon`} className="h-12 w-12 rounded-xl" /><div className="min-w-0 flex-1"><div className="flex items-center gap-2"><p className="truncate font-semibold">{s.name}</p><BadgeCheck className="h-4 w-4 text-primary" /></div><p className="text-sm text-muted-foreground">{s.url} · {s.views} views</p></div><Button variant="outline" className="rounded-full">Manage</Button></article>)}</div></section>
    <section className="mt-8 rounded-2xl border border-border p-6"><div className="flex items-center justify-between"><div><h2 className="font-semibold">Listing performance</h2><p className="text-sm text-muted-foreground">Last 30 days across your claimed sites</p></div><BarChart3 className="text-primary" /></div><div className="mt-6 flex h-44 items-end gap-3">{[42,58,49,71,64,82,76,92,88,100,84,96].map((h,i) => <div key={i} className="flex-1 rounded-t-md bg-primary/75" style={{ height: `${h}%` }} />)}</div></section>
  </> : <div className="mx-auto max-w-3xl"><Button variant="ghost" className="rounded-full" onClick={() => setView("dashboard")}>← Dashboard</Button><h1 className="mt-6 text-3xl font-bold">Claim a website</h1><p className="mt-2 text-muted-foreground">Find the listing, then choose one ownership check.</p>
    {!verified ? <><div className="mt-8 flex gap-2"><input value={domain} onChange={(e) => setDomain(e.target.value)} placeholder="yourwebsite.dz" className="min-w-0 flex-1 rounded-full border border-input px-5 py-3 outline-none focus:ring-2 focus:ring-ring" /><Button className="rounded-full bg-foreground text-background">Find site</Button></div>{domain && <div className="mt-5 rounded-2xl border border-border p-5">{found ? <div className="flex items-center gap-4"><img src={favicon(found.url)} alt="" className="h-12 w-12 rounded-xl" /><div><p className="font-semibold">{found.name}</p><p className="text-sm text-muted-foreground">{found.url}</p></div></div> : <p className="text-sm text-muted-foreground">No exact listing found. You can still verify this domain before submitting it.</p>}</div>}
    <div className="mt-8 grid gap-3 sm:grid-cols-3">{methods.map((m) => <button key={m.key} onClick={() => setMethod(m.key)} className={`rounded-2xl border p-4 text-left ${method === m.key ? "border-foreground bg-muted" : "border-border"}`}><p className="font-semibold">{m.label}</p><p className="mt-1 text-xs text-muted-foreground">{m.detail}</p></button>)}</div>
    <div className="mt-5 rounded-2xl border border-border bg-muted/40 p-6"><p className="text-sm font-semibold">{method === "meta" ? "Paste before </head>" : method === "file" ? "Create /algerio-verification.html" : "Create a TXT record for @"}</p><div className="mt-3 flex items-center gap-2 rounded-xl border border-border bg-card p-3 font-mono text-xs"><code className="min-w-0 flex-1 overflow-x-auto">{method === "meta" ? `<meta name="algerio-verification" content="dzidx-k4p9m2v7" />` : method === "file" ? token : token}</code><Button size="icon" variant="ghost" onClick={() => { navigator.clipboard?.writeText(token); toast.success("Verification code copied"); }} aria-label="Copy code"><Copy /></Button></div><Button onClick={() => { setVerified(true); toast.success("Ownership verified"); }} className="mt-5 w-full rounded-full bg-foreground text-background">Check verification</Button></div></> : <div className="mt-10 rounded-2xl border border-border p-8 text-center"><div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent"><Check className="h-8 w-8 text-primary" /></div><h2 className="mt-5 text-2xl font-bold">Ownership verified</h2><p className="mt-2 text-muted-foreground">{domain} is now connected to your owner workspace.</p><Button onClick={() => setView("dashboard")} className="mt-6 rounded-full bg-foreground text-background">Open dashboard <ChevronRight /></Button></div>}
  </div>}</main></>;
}
