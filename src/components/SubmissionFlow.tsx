import { useEffect, useMemo, useState } from "react";
import { BadgeCheck, Bot, Check, ChevronLeft, Globe2, MapPin, ShieldCheck, UserRound, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CATEGORY_META, favicon } from "@/lib/sites";
import { WILAYAS } from "@/lib/platform";

type Step = 1 | 2 | 3;
const iconUrl = (key: string) => `https://3dicons.co/icons/${encodeURIComponent(key.toLowerCase().replaceAll(" ", "-"))}/front/color/${encodeURIComponent(key.toLowerCase().replaceAll(" ", "-"))}-front-color-500.png`;

export default function SubmissionFlow({ onBack, onDone }: { onBack?: () => void; onDone?: () => void }) {
  const [step, setStep] = useState<Step>(1);
  const [url, setUrl] = useState("");
  const [name, setName] = useState("");
  const [category, setCategory] = useState("E-commerce");
  const [wilaya, setWilaya] = useState("Alger");
  const [description, setDescription] = useState("");
  const [evidence, setEvidence] = useState("");
  const [owner, setOwner] = useState(false);
  const [check, setCheck] = useState(0);
  const [approved, setApproved] = useState(true);
  const domain = useMemo(() => url.replace(/^https?:\/\//, "").split("/")[0], [url]);

  useEffect(() => {
    if (step !== 2) return;
    const timers = [650, 1300, 1950, 2600].map((ms, i) => setTimeout(() => setCheck(i + 1), ms));
    const finish = setTimeout(() => { setApproved(Math.random() < 0.7); setStep(3); }, 3300);
    return () => { timers.forEach(clearTimeout); clearTimeout(finish); };
  }, [step]);

  return (
    <main className="mx-auto min-h-[calc(100vh-4rem)] max-w-5xl px-4 py-10">
      <Button variant="ghost" className="rounded-full" onClick={onBack}><ChevronLeft /> Back</Button>
      <div className="mt-5 flex items-center gap-2" aria-label={`Step ${step} of 3`}>
        {[1, 2, 3].map((n) => <span key={n} className={`h-1.5 flex-1 rounded-full ${n <= step ? "bg-foreground" : "bg-muted"}`} />)}
      </div>

      {step === 1 && (
        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_320px]">
          <form onSubmit={(e) => { e.preventDefault(); setStep(2); }} className="space-y-6">
            <div><p className="text-sm font-medium text-primary">Step 1 of 3</p><h1 className="mt-2 text-3xl font-bold">Add an Algerian website</h1><p className="mt-2 text-muted-foreground">Give our review team enough detail to verify the platform.</p></div>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="text-sm font-medium sm:col-span-2">Website URL<input required value={url} onChange={(e) => { setUrl(e.target.value); if (!name) setName(e.target.value.replace(/^https?:\/\//, "").split(".")[0] ?? ""); }} placeholder="https://example.dz" className="mt-2 w-full rounded-xl border border-input px-4 py-3 font-normal outline-none focus:ring-2 focus:ring-ring" /></label>
              <label className="text-sm font-medium">Website name<input required value={name} onChange={(e) => setName(e.target.value)} className="mt-2 w-full rounded-xl border border-input px-4 py-3 font-normal outline-none focus:ring-2 focus:ring-ring" /></label>
              <label className="text-sm font-medium">Wilaya<select value={wilaya} onChange={(e) => setWilaya(e.target.value)} className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-3 font-normal outline-none">{WILAYAS.map((w) => <option key={w}>{w}</option>)}</select></label>
            </div>
            <fieldset><legend className="text-sm font-medium">Category</legend><div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">{CATEGORY_META.map((c) => <button type="button" key={c.key} onClick={() => setCategory(c.key)} className={`flex min-h-20 flex-col items-center justify-center gap-1 rounded-2xl border p-2 text-xs ${category === c.key ? "border-foreground bg-muted" : "border-border"}`}><img src={iconUrl(c.key)} onError={(e) => { e.currentTarget.style.display = "none"; }} alt="" className="h-8 w-8 object-contain" />{c.label}</button>)}</div></fieldset>
            <label className="block text-sm font-medium">Short description<textarea required maxLength={200} value={description} onChange={(e) => setDescription(e.target.value)} rows={3} className="mt-2 w-full rounded-2xl border border-input p-4 font-normal outline-none focus:ring-2 focus:ring-ring" /><span className="float-right mt-1 text-xs text-muted-foreground">{description.length}/200</span></label>
            <label className="block text-sm font-medium">Why is this website Algerian?<textarea required value={evidence} onChange={(e) => setEvidence(e.target.value)} rows={3} placeholder="Team, audience, registration, or local operations" className="mt-2 w-full rounded-2xl border border-input p-4 font-normal outline-none focus:ring-2 focus:ring-ring" /></label>
            <label className="flex items-center gap-3 rounded-2xl border border-border p-4 text-sm"><input type="checkbox" checked={owner} onChange={(e) => setOwner(e.target.checked)} className="h-4 w-4" /><UserRound className="h-5 w-5" /> I own or manage this website</label>
            <Button type="submit" className="w-full rounded-full bg-foreground text-background">Verify my submission</Button>
          </form>
          <aside className="h-fit rounded-2xl border border-border bg-muted/40 p-6 lg:sticky lg:top-24">
            <p className="text-sm font-semibold">Live preview</p><div className="mt-4 rounded-2xl border border-border bg-card p-5"><img src={domain ? favicon(domain) : favicon("algeria.dz")} alt="Website favicon preview" className="h-12 w-12 rounded-xl" /><p className="mt-4 font-semibold">{name || "Website name"}</p><p className="text-sm text-muted-foreground">{domain || "example.dz"}</p><span className="mt-3 inline-flex rounded-full bg-muted px-3 py-1 text-xs">{category}</span></div>
          </aside>
        </div>
      )}

      {step === 2 && <div className="mx-auto mt-24 max-w-xl text-center"><div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-accent"><Bot className="h-10 w-10 text-primary" /></div><h1 className="mt-6 text-3xl font-bold">Verifying {name || domain}</h1><p className="mt-2 text-muted-foreground">Algerio is checking public signals before placing it in the review queue.</p><div className="mt-8 space-y-3 text-left">{["Checking the domain and site availability", "Looking for Algerian location signals", "Reviewing language and audience", "Preparing the moderation report"].map((label, i) => <div key={label} className="flex items-center gap-3 rounded-2xl border border-border p-4"><span className={`flex h-7 w-7 items-center justify-center rounded-full ${check > i ? "bg-foreground text-background" : "bg-muted"}`}>{check > i ? <Check className="h-4 w-4" /> : i + 1}</span><span className="text-sm">{label}</span></div>)}</div></div>}

      {step === 3 && <div className="mx-auto mt-20 max-w-xl text-center"><div className={`mx-auto flex h-20 w-20 items-center justify-center rounded-2xl ${approved ? "bg-accent" : "bg-muted"}`}>{approved ? <BadgeCheck className="h-10 w-10 text-primary" /> : <XCircle className="h-10 w-10" />}</div><h1 className="mt-6 text-3xl font-bold">{approved ? "Algerian signals confirmed" : "Manual review needed"}</h1><p className="mt-3 text-muted-foreground">{approved ? `${name} has been submitted for final approval. We’ll email you when it is listed.` : "We could not confirm enough public signals automatically. Your submission is safely queued for a human review."}</p><div className="mt-8 grid grid-cols-3 gap-3 text-sm"><div className="rounded-2xl border p-4"><Globe2 className="mx-auto mb-2 h-5 w-5" />Domain</div><div className="rounded-2xl border p-4"><MapPin className="mx-auto mb-2 h-5 w-5" />{wilaya}</div><div className="rounded-2xl border p-4"><ShieldCheck className="mx-auto mb-2 h-5 w-5" />Pending</div></div><Button className="mt-8 w-full rounded-full bg-foreground text-background" onClick={onDone}>Return to directory</Button></div>}
    </main>
  );
}
