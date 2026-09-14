import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { Modal } from "@/components/modals";
import {
  AD_SPACES,
  ACTIVITY,
  SPONSORS,
  SUBMISSIONS,
  REJECT_REASONS,
  money,
  tierFor,
  type AdSpace,
  type AdSpaceStatus,
  type Submission,
} from "@/lib/platform";
import { CATEGORY_META } from "@/lib/sites";
import logoAsset from "@/assets/logo.png.asset.json";
import logoWhiteAsset from "@/assets/logo-white.png.asset.json";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin Dashboard — The Algerian Index" },
      { name: "description", content: "Moderate submissions, ad spaces and sponsors of The Algerian Index." },
      { property: "og:title", content: "Admin Dashboard — The Algerian Index" },
      { property: "og:description", content: "Internal moderation dashboard for The Algerian Index." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminPage,
});

const SESSION_KEY = "dz-admin-session";
const PASSWORD = (import.meta.env["VITE_ADMIN_PASSWORD"] as string | undefined) ?? "M7M_ADMIN_2026";

const NAV = [
  { key: "overview", label: "Overview", icon: "📊" },
  { key: "pending", label: "Pending Submissions", icon: "⏳" },
  { key: "approved", label: "Approved Sites", icon: "✅" },
  { key: "rejected", label: "Rejected Sites", icon: "❌" },
  { key: "ads", label: "Ad Spaces", icon: "📢" },
  { key: "sponsors", label: "Sponsors", icon: "💰" },
  { key: "users", label: "Users", icon: "👥" },
  { key: "settings", label: "Settings", icon: "⚙️" },
] as const;

type NavKey = (typeof NAV)[number]["key"];

const USERS = [
  { email: "amine@startup.dz", role: "Submitter", joined: "2026-08-02", sites: 2 },
  { email: "hello@weilo.dz", role: "Site owner", joined: "2026-06-14", sites: 1 },
  { email: "ads@techdz.com", role: "Sponsor", joined: "2026-01-09", sites: 0 },
  { email: "sara.b@gmail.com", role: "Reviewer", joined: "2026-03-21", sites: 0 },
];

function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [tab, setTab] = useState<NavKey>("overview");
  const [sidebar, setSidebar] = useState(false);
  const [rows, setRows] = useState<Submission[]>(SUBMISSIONS);
  const [spaces, setSpaces] = useState<AdSpace[]>(AD_SPACES);
  const [rejecting, setRejecting] = useState<Submission | null>(null);
  const [editing, setEditing] = useState<Submission | null>(null);

  useEffect(() => {
    if (localStorage.getItem(SESSION_KEY) === "1") setAuthed(true);
  }, []);

  if (!authed) return <Login onSuccess={() => setAuthed(true)} />;

  const pending = rows.filter((r) => r.status === "pending");
  const approved = rows.filter((r) => r.status === "approved");
  const rejected = rows.filter((r) => r.status === "rejected");

  const patch = (id: string, next: Partial<Submission>) =>
    setRows((list) => list.map((r) => (r.id === id ? { ...r, ...next } : r)));

  const signOut = () => {
    localStorage.removeItem(SESSION_KEY);
    setAuthed(false);
  };

  return (
    <div className="flex min-h-screen bg-background font-sans">
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 shrink-0 bg-[#0A0A0F] p-4 text-white transition-transform lg:static lg:translate-x-0 ${
          sidebar ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <p className="flex items-center gap-2 px-3 text-sm font-bold">
          <img src={logoWhiteAsset.url} alt="The Algerian Index logo" className="h-6 w-6 object-contain" />
          Admin Console
        </p>
        <nav className="mt-6 space-y-1">
          {NAV.map((n) => (
            <button
              key={n.key}
              onClick={() => {
                setTab(n.key);
                setSidebar(false);
              }}
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm transition-colors ${
                tab === n.key ? "bg-white text-[#0A0A0F]" : "text-white/70 hover:bg-white/10 hover:text-white"
              }`}
            >
              <span>{n.icon}</span>
              {n.label}
            </button>
          ))}
        </nav>
        <button
          onClick={signOut}
          className="mt-8 w-full rounded-full border border-white/20 py-2 text-sm text-white/80 transition-colors hover:bg-white/10"
        >
          Sign out
        </button>
      </aside>

      <main className="min-w-0 flex-1 bg-background p-4 sm:p-8">
        <button
          onClick={() => setSidebar((v) => !v)}
          className="mb-4 rounded-full border border-border px-4 py-2 text-sm lg:hidden"
        >
          ☰ Menu
        </button>

        {tab === "overview" && (
          <Overview
            total={rows.length}
            pending={pending.length}
            approved={approved.length}
            rejected={rejected.length}
          />
        )}

        {tab === "pending" && (
          <SubmissionTable
            title="Pending Submissions"
            rows={pending}
            empty="No pending submissions."
            actions={(r) => (
              <>
                <PreviewBtn url={r.url} />
                <Btn
                  tone="green"
                  onClick={() => {
                    patch(r.id, { status: "approved", claimed: false });
                    toast.success(`${r.url} approved — notification sent to ${r.submittedBy}`);
                  }}
                >
                  Approve
                </Btn>
                <Btn tone="red" onClick={() => setRejecting(r)}>
                  Reject
                </Btn>
                <Btn
                  tone="yellow"
                  onClick={() => toast.success(`Info request sent to ${r.submittedBy}`)}
                >
                  Request Info
                </Btn>
              </>
            )}
          />
        )}

        {tab === "approved" && (
          <SubmissionTable
            title="Approved Sites"
            rows={approved}
            empty="No approved sites yet."
            extraHeaders={["Flags"]}
            extraCells={(r) => (
              <td className="px-3 py-3 text-xs">
                <span className="mr-1 rounded-full bg-muted px-2 py-0.5">
                  {r.featured ? "Featured" : "Standard"}
                </span>
                <span className="rounded-full bg-muted px-2 py-0.5">
                  {r.claimed ? "Claimed" : "Unclaimed"}
                </span>
              </td>
            )}
            actions={(r) => (
              <>
                <PreviewBtn url={r.url} />
                <Btn onClick={() => setEditing(r)}>Edit</Btn>
                <Btn
                  onClick={() => {
                    patch(r.id, { status: "pending" });
                    toast.success(`${r.url} moved back to pending`);
                  }}
                >
                  Move to pending
                </Btn>
                <Btn
                  onClick={() => {
                    patch(r.id, { featured: !r.featured });
                    toast.success(r.featured ? "Feature removed" : "Marked as Featured");
                  }}
                >
                  {r.featured ? "Unfeature" : "Feature"}
                </Btn>
                <Btn
                  onClick={() => {
                    patch(r.id, { claimed: !r.claimed });
                    toast.success(r.claimed ? "Marked Unclaimed" : "Marked Claimed");
                  }}
                >
                  {r.claimed ? "Mark Unclaimed" : "Mark Claimed"}
                </Btn>
              </>
            )}
          />
        )}

        {tab === "rejected" && (
          <SubmissionTable
            title="Rejected Sites"
            rows={rejected}
            empty="No rejected sites."
            extraHeaders={["Reason"]}
            extraCells={(r) => <td className="px-3 py-3 text-xs text-muted-foreground">{r.reason ?? "—"}</td>}
            actions={(r) => (
              <>
                <PreviewBtn url={r.url} />
                <Btn
                  onClick={() => {
                    patch(r.id, { status: "pending", reason: undefined });
                    toast.success(`${r.url} restored to pending`);
                  }}
                >
                  Move to pending
                </Btn>
              </>
            )}
          />
        )}

        {tab === "ads" && <AdSpacesPanel spaces={spaces} setSpaces={setSpaces} />}
        {tab === "sponsors" && <SponsorsPanel />}
        {tab === "users" && <UsersPanel />}
        {tab === "settings" && <SettingsPanel />}
      </main>

      <RejectModal
        row={rejecting}
        onClose={() => setRejecting(null)}
        onConfirm={(reason) => {
          if (rejecting) {
            patch(rejecting.id, { status: "rejected", reason });
            toast.success(`${rejecting.url} rejected — ${reason}`);
          }
          setRejecting(null);
        }}
      />

      <EditModal
        row={editing}
        onClose={() => setEditing(null)}
        onSave={(next) => {
          if (editing) patch(editing.id, next);
          setEditing(null);
          toast.success("Site details updated");
        }}
      />
    </div>
  );
}

function Login({ onSuccess }: { onSuccess: () => void }) {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value === PASSWORD) {
      localStorage.setItem(SESSION_KEY, "1");
      onSuccess();
    } else {
      setError("Incorrect password.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 px-4 font-sans">
      <form onSubmit={submit} className="w-full max-w-sm rounded-2xl border border-border bg-card p-8 shadow-lg">
        <p className="flex items-center gap-2 text-lg font-bold">
          <img src={logoAsset.url} alt="The Algerian Index logo" className="h-7 w-7 object-contain" />
          Admin access
        </p>
        <p className="mt-1 text-sm text-muted-foreground">Enter the admin password to continue.</p>
        <input
          type="password"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            setError("");
          }}
          placeholder="Password"
          className="mt-5 w-full rounded-xl border border-border px-4 py-3 text-sm outline-none focus:border-foreground"
        />
        {error && <p className="mt-2 text-sm text-destructive">{error}</p>}
        <button
          type="submit"
          className="mt-4 w-full rounded-full bg-primary py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
        >
          Sign in
        </button>
      </form>
    </div>
  );
}

function Overview({
  total,
  pending,
  approved,
  rejected,
}: {
  total: number;
  pending: number;
  approved: number;
  rejected: number;
}) {
  const revenue = useMemo(() => SPONSORS.reduce((sum, s) => sum + s.spent, 0), []);
  const cards = [
    { label: "Total Sites", value: total },
    { label: "Pending", value: pending },
    { label: "Approved", value: approved },
    { label: "Rejected", value: rejected },
    { label: "Total Sponsors", value: SPONSORS.length },
    { label: "Ad Revenue", value: money(revenue) },
    { label: "This Month Views", value: "128,400" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight">Overview</h1>
      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {cards.map((c) => (
          <div key={c.label} className="rounded-2xl border border-border bg-card p-5">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">{c.label}</p>
            <p className="mt-2 text-2xl font-bold">{c.value}</p>
          </div>
        ))}
      </div>

      <h2 className="mt-10 text-lg font-semibold">Recent activity</h2>
      <ul className="mt-4 space-y-2 rounded-2xl border border-border bg-card p-5 text-sm text-muted-foreground">
        {ACTIVITY.map((a) => (
          <li key={a} className="border-b border-border pb-2 last:border-0 last:pb-0">
            {a}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Btn({
  children,
  onClick,
  tone = "plain",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  tone?: "plain" | "green" | "red" | "yellow";
}) {
  const styles: Record<string, string> = {
    plain: "border-border bg-card hover:bg-muted",
    green: "border-green-600 bg-green-600 text-white hover:opacity-90",
    red: "border-red-600 bg-red-600 text-white hover:opacity-90",
    yellow: "border-yellow-500 bg-yellow-400 text-[#111111] hover:opacity-90",
  };
  return (
    <button
      onClick={onClick}
      className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${styles[tone]}`}
    >
      {children}
    </button>
  );
}

function PreviewBtn({ url }: { url: string }) {
  return (
    <a
      href={`https://${url}`}
      target="_blank"
      rel="noreferrer noopener"
      className="rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium transition-colors hover:bg-muted"
    >
      Preview
    </a>
  );
}

function SubmissionTable({
  title,
  rows,
  empty,
  actions,
  extraHeaders = [],
  extraCells,
}: {
  title: string;
  rows: Submission[];
  empty: string;
  actions: (r: Submission) => React.ReactNode;
  extraHeaders?: string[];
  extraCells?: (r: Submission) => React.ReactNode;
}) {
  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight">
        {title} ({rows.length})
      </h1>
      <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-card">
        <table className="w-full min-w-[900px] text-left text-sm">
          <thead className="border-b border-border text-xs uppercase tracking-wide text-muted-foreground">
            <tr>
              {["Site Name", "URL", "Category", "Submitted By", "Date", "AI Notes", ...extraHeaders, "Actions"].map(
                (h) => (
                  <th key={h} className="px-3 py-3 font-medium">
                    {h}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-b border-border last:border-0">
                <td className="px-3 py-3 font-medium">{r.name}</td>
                <td className="px-3 py-3 text-muted-foreground">{r.url}</td>
                <td className="px-3 py-3">{r.category}</td>
                <td className="px-3 py-3 text-muted-foreground">{r.submittedBy}</td>
                <td className="px-3 py-3 text-muted-foreground">{r.date}</td>
                <td className="max-w-[220px] px-3 py-3 text-xs text-muted-foreground">{r.aiNotes}</td>
                {extraCells?.(r)}
                <td className="px-3 py-3">
                  <div className="flex flex-wrap gap-2">{actions(r)}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {rows.length === 0 && <p className="p-8 text-center text-sm text-muted-foreground">{empty}</p>}
      </div>
    </div>
  );
}

function RejectModal({
  row,
  onClose,
  onConfirm,
}: {
  row: Submission | null;
  onClose: () => void;
  onConfirm: (reason: string) => void;
}) {
  const [reason, setReason] = useState(REJECT_REASONS[0]!);
  const [other, setOther] = useState("");

  return (
    <Modal open={!!row} onClose={onClose}>
      <h2 className="text-xl font-bold">Reject {row?.name}</h2>
      <p className="mt-1 text-sm text-muted-foreground">Pick a rejection reason.</p>
      <div className="mt-4 space-y-2">
        {REJECT_REASONS.map((r) => (
          <label key={r} className="flex items-center gap-3 text-sm">
            <input type="radio" checked={reason === r} onChange={() => setReason(r)} />
            {r}
          </label>
        ))}
        {reason === "Other" && (
          <input
            value={other}
            onChange={(e) => setOther(e.target.value)}
            placeholder="Tell the submitter why"
            className="w-full rounded-xl border border-border px-4 py-3 text-sm outline-none focus:border-foreground"
          />
        )}
      </div>
      <button
        onClick={() => onConfirm(reason === "Other" ? other.trim() || "Other" : reason)}
        className="mt-5 w-full rounded-full bg-primary py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
      >
        Confirm rejection
      </button>
    </Modal>
  );
}

function EditModal({
  row,
  onClose,
  onSave,
}: {
  row: Submission | null;
  onClose: () => void;
  onSave: (next: Partial<Submission>) => void;
}) {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    if (row) {
      setName(row.name);
      setUrl(row.url);
      setCategory(row.category);
    }
  }, [row]);

  return (
    <Modal open={!!row} onClose={onClose}>
      <h2 className="text-xl font-bold">Edit site</h2>
      <div className="mt-4 space-y-3">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-xl border border-border px-4 py-3 text-sm outline-none focus:border-foreground"
          placeholder="Site name"
        />
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full rounded-xl border border-border px-4 py-3 text-sm outline-none focus:border-foreground"
          placeholder="URL"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm outline-none"
        >
          {CATEGORY_META.map((c) => (
            <option key={c.key} value={c.key}>
              {c.label}
            </option>
          ))}
        </select>
        <button
          onClick={() => onSave({ name, url, category })}
          className="w-full rounded-full bg-primary py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
        >
          Save changes
        </button>
      </div>
    </Modal>
  );
}

function AdSpacesPanel({
  spaces,
  setSpaces,
}: {
  spaces: AdSpace[];
  setSpaces: (v: AdSpace[]) => void;
}) {
  const [editKey, setEditKey] = useState<string | null>(null);
  const [price, setPrice] = useState("");

  const update = (key: string, next: Partial<AdSpace>) =>
    setSpaces(spaces.map((s) => (s.key === key ? { ...s, ...next } : s)));

  const dot: Record<AdSpaceStatus, string> = {
    Available: "🟢",
    Rented: "🔴",
    Reserved: "🟡",
  };

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight">Ad Spaces</h1>
      <div className="mt-6 space-y-4">
        {spaces.map((s) => (
          <div key={s.key} className="rounded-2xl border border-border bg-card p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="font-semibold">📍 {s.name}</p>
                <p className="text-sm text-muted-foreground">{s.location}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {s.width} × {s.height} px · {s.views}
                </p>
              </div>
              <div className="text-right text-sm">
                <p className="font-semibold">{money(s.monthly)}/month</p>
                <p className="text-muted-foreground">
                  {dot[s.status]} {s.status}
                </p>
                {s.renter && (
                  <p className="text-xs text-muted-foreground">
                    {s.renter} · until {s.expiry}
                  </p>
                )}
              </div>
            </div>

            {editKey === s.key ? (
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <input
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  inputMode="numeric"
                  placeholder="Monthly price (دج)"
                  className="rounded-xl border border-border px-4 py-2 text-sm outline-none focus:border-foreground"
                />
                <Btn
                  tone="green"
                  onClick={() => {
                    const n = Number(price);
                    if (!Number.isFinite(n) || n <= 0) {
                      toast.error("Enter a valid price");
                      return;
                    }
                    update(s.key, { monthly: n });
                    setEditKey(null);
                    toast.success(`${s.name} price updated`);
                  }}
                >
                  Save price
                </Btn>
                <Btn onClick={() => setEditKey(null)}>Cancel</Btn>
              </div>
            ) : (
              <div className="mt-4 flex flex-wrap gap-2">
                <Btn
                  onClick={() => {
                    setEditKey(s.key);
                    setPrice(String(s.monthly));
                  }}
                >
                  Edit Price
                </Btn>
                <Btn
                  onClick={() => {
                    update(s.key, { status: "Available", renter: undefined, expiry: undefined });
                    toast.success(`${s.name} is now available`);
                  }}
                >
                  Mark Available
                </Btn>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function SponsorsPanel() {
  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight">Sponsors</h1>
      <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-card">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="border-b border-border text-xs uppercase tracking-wide text-muted-foreground">
            <tr>
              {["Company", "Industry", "Total Spent", "Active Since", "Tier"].map((h) => (
                <th key={h} className="px-3 py-3 font-medium">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {SPONSORS.map((s) => {
              const tier = tierFor(s.spent);
              return (
                <tr key={s.name} className="border-b border-border last:border-0">
                  <td className="px-3 py-3 font-medium">
                    {s.logo} {s.name}
                  </td>
                  <td className="px-3 py-3 text-muted-foreground">{s.industry}</td>
                  <td className="px-3 py-3">{money(s.spent)}</td>
                  <td className="px-3 py-3 text-muted-foreground">{s.since}</td>
                  <td className="px-3 py-3">
                    {tier.icon} {tier.name}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function UsersPanel() {
  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight">Users</h1>
      <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-card">
        <table className="w-full min-w-[560px] text-left text-sm">
          <thead className="border-b border-border text-xs uppercase tracking-wide text-muted-foreground">
            <tr>
              {["Email", "Role", "Joined", "Sites"].map((h) => (
                <th key={h} className="px-3 py-3 font-medium">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {USERS.map((u) => (
              <tr key={u.email} className="border-b border-border last:border-0">
                <td className="px-3 py-3 font-medium">{u.email}</td>
                <td className="px-3 py-3 text-muted-foreground">{u.role}</td>
                <td className="px-3 py-3 text-muted-foreground">{u.joined}</td>
                <td className="px-3 py-3">{u.sites}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function SettingsPanel() {
  const [autoApprove, setAutoApprove] = useState(false);
  const [email, setEmail] = useState("contact@algerian-index.dz");

  return (
    <div className="max-w-xl">
      <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
      <div className="mt-6 space-y-4 rounded-2xl border border-border bg-card p-6">
        <label className="flex items-center justify-between gap-4 text-sm">
          Auto-approve verified .dz domains
          <input type="checkbox" checked={autoApprove} onChange={(e) => setAutoApprove(e.target.checked)} />
        </label>
        <label className="block text-sm">
          Contact email for advertisers
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-2 w-full rounded-xl border border-border px-4 py-3 text-sm outline-none focus:border-foreground"
          />
        </label>
        <button
          onClick={() => toast.success("Settings saved")}
          className="w-full rounded-full bg-primary py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
        >
          Save settings
        </button>
      </div>
    </div>
  );
}
