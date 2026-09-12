import { useEffect, useState } from "react";

const KEY = "dz-cookie-consent";

export default function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(KEY)) return;
    const t = setTimeout(() => setShow(true), 1500);
    return () => clearTimeout(t);
  }, []);

  const decide = (choice: "accepted" | "rejected") => {
    localStorage.setItem(KEY, choice);
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm rounded-2xl border border-border bg-card p-6 shadow-xl">
      <p className="text-sm text-muted-foreground">
        We use cookies for analytics and error tracking to improve your experience. By clicking
        Accept, you agree to our use of cookies. You can change your preferences anytime. Read our{" "}
        <a href="#" className="text-primary underline">
          privacy policy
        </a>
        .
      </p>
      <div className="mt-4 flex items-center justify-end gap-4">
        <button onClick={() => decide("rejected")} className="text-sm underline">
          Reject
        </button>
        <button
          onClick={() => decide("accepted")}
          className="rounded-full bg-muted px-6 py-2 text-sm font-medium transition-colors hover:bg-border"
        >
          Accept
        </button>
      </div>
    </div>
  );
}
