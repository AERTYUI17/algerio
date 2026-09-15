import { createFileRoute, useNavigate } from "@tanstack/react-router";
import PlatformHeader from "@/components/PlatformHeader";
import SubmissionFlow from "@/components/SubmissionFlow";
export const Route = createFileRoute("/submit")({
  head: () => ({ meta: [
    { title: "Submit an Algerian Website — Algerio" },
    { name: "description", content: "Submit an Algerian website to The Algerian Index for verification and review." },
    { property: "og:title", content: "Submit an Algerian Website — Algerio" },
    { property: "og:description", content: "Add an Algerian platform to the national web directory." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" },
  ]}), component: SubmitPage,
});
function SubmitPage() { const navigate = useNavigate(); return <><PlatformHeader /><SubmissionFlow onBack={() => navigate({ to: "/" })} onDone={() => navigate({ to: "/" })} /></>; }
