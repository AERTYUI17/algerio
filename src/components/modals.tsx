import { useState, type ReactNode } from "react";
import { Star, X, Loader2 } from "lucide-react";
import { CATEGORIES } from "@/lib/sites";

export function Modal({
  open,
  onClose,
  children,
  width = "max-w-lg",
}: {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  width?: string;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-foreground/40 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />
      <div
        role="dialog"
        aria-modal="true"
        className={`relative z-10 w-full ${width} max-h-[90vh] overflow-y-auto rounded-2xl border border-border bg-card p-6 shadow-2xl`}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </button>
        {children}
      </div>
    </div>
  );
}

function Pill({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-3 py-1.5 text-sm transition-colors ${
        active
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border bg-card text-foreground hover:bg-muted"
      }`}
    >
      {label}
    </button>
  );
}

const GOOD = [
  "🎨 Good design",
  "⚡ Fast",
  "📱 Mobile-friendly",
  "🔒 Trustworthy",
  "🆓 Free",
  "🇩🇿 Very Algerian",
];
const BAD = [
  "🐢 Slow",
  "📵 No mobile app",
  "🌍 Not enough content",
  "🔧 Bugs",
  "💰 Too expensive",
];

export function RatingModal({
  open,
  onClose,
  siteName,
}: {
  open: boolean;
  onClose: () => void;
  siteName: string;
}) {
  const [stars, setStars] = useState(0);
  const [good, setGood] = useState<string[]>([]);
  const [bad, setBad] = useState<string[]>([]);
  const [sent, setSent] = useState(false);

  const toggle = (arr: string[], set: (v: string[]) => void, v: string) =>
    set(arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);

  const submit = () => {
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setStars(0);
      setGood([]);
      setBad([]);
      onClose();
    }, 1500);
  };

  return (
    <Modal open={open} onClose={onClose}>
      {sent ? (
        <p className="py-10 text-center text-lg font-semibold">
          ✅ Thank you! Your rating was submitted.
        </p>
      ) : (
        <div className="space-y-5">
          <h2 className="text-xl font-bold">Rate {siteName}</h2>

          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                onClick={() => setStars(n)}
                aria-label={`${n} stars`}
                className="transition-transform hover:scale-110"
              >
                <Star
                  className={`h-9 w-9 ${n <= stars ? "fill-foreground text-foreground" : "text-border"}`}
                />
              </button>
            ))}
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium">What&apos;s good about it?</p>
            <div className="flex flex-wrap gap-2">
              {GOOD.map((g) => (
                <Pill
                  key={g}
                  label={g}
                  active={good.includes(g)}
                  onClick={() => toggle(good, setGood, g)}
                />
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium">What could improve?</p>
            <div className="flex flex-wrap gap-2">
              {BAD.map((b) => (
                <Pill
                  key={b}
                  label={b}
                  active={bad.includes(b)}
                  onClick={() => toggle(bad, setBad, b)}
                />
              ))}
            </div>
          </div>

          <textarea
            rows={3}
            placeholder="Share your experience... (optional)"
            className="w-full rounded-2xl border border-border bg-card p-3 text-sm outline-none focus:border-foreground"
          />

          <button
            onClick={submit}
            className="w-full rounded-full bg-primary py-3 font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            Submit Rating
          </button>
        </div>
      )}
    </Modal>
  );
}

const PROVIDERS = [
  { key: "G", label: "Continue with Google" },
  { key: "𝕏", label: "Continue with X (Twitter)" },
  { key: "f", label: "Continue with Facebook" },
  { key: "GH", label: "Continue with GitHub" },
];

export function AuthModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <Modal open={open} onClose={onClose} width="max-w-md">
      <div className="space-y-4">
        <div>
          <h2 className="text-xl font-bold">Join Algerian Index</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Sign in to rate, comment and submit sites
          </p>
        </div>
        <div className="space-y-2">
          {PROVIDERS.map((p) => (
            <button
              key={p.key}
              className="flex w-full items-center gap-3 rounded-xl border border-border px-4 py-3 text-sm font-medium transition-colors hover:bg-muted"
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-muted text-xs font-bold">
                {p.key}
              </span>
              {p.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="h-px flex-1 bg-border" /> or <span className="h-px flex-1 bg-border" />
        </div>
        <input
          type="email"
          placeholder="you@example.com"
          className="w-full rounded-xl border border-border px-4 py-3 text-sm outline-none focus:border-foreground"
        />
        <button className="w-full rounded-xl bg-primary py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90">
          Continue with email
        </button>
        <p className="text-center text-xs text-muted-foreground">
          By joining you agree to our Terms · Privacy
        </p>
      </div>
    </Modal>
  );
}

export function SubmitModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState(true);

  const close = () => {
    onClose();
    setTimeout(() => {
      setStep(1);
      setLoading(false);
    }, 200);
  };

  const next = () => {
    setStep(2);
    setLoading(true);
    setOk(Math.random() > 0.25);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <Modal open={open} onClose={close}>
      <h2 className="text-xl font-bold">Submit an Algerian Site</h2>
      {step === 1 ? (
        <div className="mt-4 space-y-3">
          <p className="text-sm text-muted-foreground">Step 1 of 2</p>
          <input
            required
            placeholder="Website URL *"
            className="w-full rounded-xl border border-border px-4 py-3 text-sm outline-none focus:border-foreground"
          />
          <input
            required
            placeholder="Website Name *"
            className="w-full rounded-xl border border-border px-4 py-3 text-sm outline-none focus:border-foreground"
          />
          <select className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm outline-none focus:border-foreground">
            {CATEGORIES.filter((c) => c !== "All").map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
          <textarea
            rows={2}
            maxLength={200}
            placeholder="Short description (max 200 chars)"
            className="w-full rounded-xl border border-border px-4 py-3 text-sm outline-none focus:border-foreground"
          />
          <textarea
            rows={2}
            placeholder="Why is it Algerian? *"
            className="w-full rounded-xl border border-border px-4 py-3 text-sm outline-none focus:border-foreground"
          />
          <button
            onClick={next}
            className="w-full rounded-full bg-primary py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            Next →
          </button>
        </div>
      ) : (
        <div className="mt-6 space-y-5 text-center">
          {loading ? (
            <>
              <Loader2 className="mx-auto h-8 w-8 animate-spin text-muted-foreground" />
              <p className="font-medium">🤖 AI is verifying your site...</p>
            </>
          ) : (
            <>
              <p className="font-medium">
                {ok
                  ? "✅ Verified! Your site looks Algerian."
                  : "⚠️ We couldn't confirm this site is Algerian. It will be reviewed manually."}
              </p>
              <button
                onClick={close}
                className="w-full rounded-full bg-primary py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
              >
                Done
              </button>
            </>
          )}
        </div>
      )}
    </Modal>
  );
}
