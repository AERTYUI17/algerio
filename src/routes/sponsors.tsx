import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Building2, CheckCircle2, Copy, Landmark, Upload } from "lucide-react";
import { toast } from "sonner";
import PlatformHeader from "@/components/PlatformHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AD_SPACES, INDUSTRIES, WEEKLY_AD_VIEWS, money, tierFor, type AdSpace } from "@/lib/platform";

export const Route = createFileRoute("/sponsors")({
  head: () => ({
    meta: [
      { title: "Advertise on Algerio — Sponsor the Algerian web" },
      { name: "description", content: "Book an ad space on Algerio, Algeria's website directory: pick a placement, upload your banner and pay by bank transfer." },
      { property: "og:title", content: "Advertise on Algerio" },
      { property: "og:description", content: "Pick a placement, upload your banner and reach thousands of Algerian visitors monthly." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: SponsorsPage,
});

type Duration = "week" | "monthly" | "quarter";
const DURATIONS: { key: Duration; label: string }[] = [
  { key: "week", label: "1 week" },
  { key: "monthly", label: "1 month" },
  { key: "quarter", label: "3 months" },
];

function SponsorsPage() {
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [industry, setIndustry] = useState(INDUSTRIES[0]!.label);
  const [spaceKey, setSpaceKey] = useState<string>("");
  const [duration, setDuration] = useState<Duration>("monthly");
  const [banner, setBanner] = useState("");

  const available = AD_SPACES.filter((s) => s.status === "Available");
  const space = useMemo<AdSpace | undefined>(() => AD_SPACES.find((s) => s.key === spaceKey), [spaceKey]);
  const amount = space ? space[duration] : 0;

  return (
    <>
      <PlatformHeader />
      <main className="mx-auto max-w-5xl px-4 py-14">
        {step < 5 ? (
          <>
            <div className="mx-auto max-w-2xl text-center">
              <Building2 className="mx-auto h-10 w-10 text-primary" />
              <h1 className="mt-4 text-4xl font-bold tracking-tight">Advertise on Algerio</h1>
              <p className="mt-3 text-muted-foreground">
                Reach thousands of people exploring Algerian websites every month. Four short steps.
              </p>
            </div>

            <div className="mx-auto mt-8 flex max-w-md items-center gap-2">
              {[1, 2, 3, 4].map((n) => (
                <div key={n} className={`h-1.5 flex-1 rounded-full ${step >= n ? "bg-primary" : "bg-muted"}`} />
              ))}
            </div>

            <div className="mx-auto mt-8 max-w-2xl rounded-2xl border border-border bg-card p-8">
              {step === 1 && (
                <div className="grid gap-4">
                  <h2 className="text-xl font-bold">Your company</h2>
                  <div className="grid gap-2">
                    <Label htmlFor="company">Company name</Label>
                    <Input id="company" value={company} onChange={(e) => setCompany(e.target.value)} placeholder="TechDZ" className="rounded-full" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Contact email</Label>
                    <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.dz" className="rounded-full" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="industry">Industry</Label>
                    <select id="industry" value={industry} onChange={(e) => setIndustry(e.target.value)} className="h-10 rounded-full border border-input bg-background px-4 text-sm">
                      {INDUSTRIES.map((i) => (
                        <option key={i.label} value={i.label}>{i.icon} {i.label}</option>
                      ))}
                    </select>
                  </div>
                  <Button
                    className="mt-2 rounded-full bg-foreground text-background hover:bg-foreground/90"
                    disabled={!company.trim() || !email.includes("@")}
                    onClick={() => setStep(2)}
                  >
                    Continue
                  </Button>
                </div>
              )}

              {step === 2 && (
                <div className="grid gap-4">
                  <h2 className="text-xl font-bold">Choose an ad space</h2>
                  {available.map((s) => (
                    <button
                      key={s.key}
                      onClick={() => setSpaceKey(s.key)}
                      className={`rounded-2xl border p-4 text-left transition-colors ${spaceKey === s.key ? "border-primary bg-accent" : "border-border hover:bg-muted"}`}
                    >
                      <p className="font-semibold">{s.name}</p>
                      <p className="text-sm text-muted-foreground">{s.location}</p>
                      <p className="mt-2 text-xs text-muted-foreground">{s.width} × {s.height} · {s.views}</p>
                    </button>
                  ))}
                  <div className="grid gap-2">
                    <Label>Duration</Label>
                    <div className="flex flex-wrap gap-2">
                      {DURATIONS.map((d) => (
                        <button
                          key={d.key}
                          onClick={() => setDuration(d.key)}
                          className={`rounded-full border px-4 py-1.5 text-sm ${duration === d.key ? "border-primary bg-accent" : "border-border hover:bg-muted"}`}
                        >
                          {d.label}{space ? ` — ${money(space[d.key])}` : ""}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" className="rounded-full" onClick={() => setStep(1)}>Back</Button>
                    <Button className="flex-1 rounded-full bg-foreground text-background hover:bg-foreground/90" disabled={!space} onClick={() => setStep(3)}>
                      Continue
                    </Button>
                  </div>
                </div>
              )}

              {step === 3 && space && (
                <div className="grid gap-4">
                  <h2 className="text-xl font-bold">Upload your banner</h2>
                  <p className="text-sm text-muted-foreground">Required size: {space.width} × {space.height} px, PNG or JPG.</p>
                  <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-border py-10 text-sm text-muted-foreground hover:bg-muted">
                    <Upload className="h-6 w-6" />
                    {banner ? <span className="font-medium text-foreground">{banner}</span> : "Click to select an image"}
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => setBanner(e.target.files?.[0]?.name ?? "")}
                    />
                  </label>
                  <div className="grid gap-2">
                    <Label htmlFor="dest">Destination link</Label>
                    <Input id="dest" placeholder="https://your-site.dz" className="rounded-full" />
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" className="rounded-full" onClick={() => setStep(2)}>Back</Button>
                    <Button className="flex-1 rounded-full bg-foreground text-background hover:bg-foreground/90" disabled={!banner} onClick={() => setStep(4)}>
                      Continue to payment
                    </Button>
                  </div>
                </div>
              )}

              {step === 4 && space && (
                <div className="grid gap-4">
                  <h2 className="text-xl font-bold">Payment by bank transfer</h2>
                  <div className="rounded-2xl bg-muted p-4 text-sm">
                    <p className="flex justify-between"><span className="text-muted-foreground">Ad space</span><span className="font-medium">{space.name}</span></p>
                    <p className="mt-1 flex justify-between"><span className="text-muted-foreground">Duration</span><span className="font-medium">{DURATIONS.find((d) => d.key === duration)?.label}</span></p>
                    <p className="mt-1 flex justify-between"><span className="text-muted-foreground">Total</span><span className="font-semibold">{money(amount)}</span></p>
                  </div>
                  <div className="rounded-2xl border border-border p-4 text-sm">
                    <p className="flex items-center gap-2 font-semibold"><Landmark className="h-4 w-4" /> M7M Holdings — BNA Alger</p>
                    <p className="mt-2 text-muted-foreground">RIB</p>
                    <div className="flex items-center justify-between gap-2">
                      <code className="font-mono">005 00123 4567891011 21</code>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full"
                        aria-label="Copy account number"
                        onClick={() => {
                          void navigator.clipboard?.writeText("005 00123 4567891011 21");
                          toast.success("Account number copied");
                        }}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" className="rounded-full" onClick={() => setStep(3)}>Back</Button>
                    <Button
                      className="flex-1 rounded-full bg-foreground text-background hover:bg-foreground/90"
                      onClick={() => {
                        setStep(5);
                        toast.success("Booking received — we'll confirm your transfer within 24 hours");
                      }}
                    >
                      I have sent the transfer
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          <section>
            <div className="rounded-2xl border border-border bg-card p-8">
              <CheckCircle2 className="h-10 w-10 text-primary" />
              <h1 className="mt-4 text-3xl font-bold">Welcome, {company || "Sponsor"}</h1>
              <p className="mt-2 text-muted-foreground">
                Your booking is pending payment confirmation. Once confirmed, your banner goes live automatically.
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl bg-muted p-4">
                  <p className="text-xs uppercase text-muted-foreground">Ad space</p>
                  <p className="mt-1 font-semibold">{space?.name ?? "—"}</p>
                </div>
                <div className="rounded-2xl bg-muted p-4">
                  <p className="text-xs uppercase text-muted-foreground">Invested</p>
                  <p className="mt-1 font-semibold">{money(amount)}</p>
                </div>
                <div className="rounded-2xl bg-muted p-4">
                  <p className="text-xs uppercase text-muted-foreground">Badge</p>
                  <p className="mt-1 font-semibold">{tierFor(amount).icon} {tierFor(amount).name}</p>
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-border bg-card p-8">
              <h2 className="text-lg font-bold">Views this week</h2>
              <div className="mt-4 flex items-end gap-3">
                {WEEKLY_AD_VIEWS.map((d) => (
                  <div key={d.d} className="flex flex-1 flex-col items-center gap-2">
                    <div className="w-full rounded-t-xl bg-primary/80" style={{ height: `${(d.v / 1500) * 140}px` }} />
                    <span className="text-xs text-muted-foreground">{d.d}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </>
  );
}
