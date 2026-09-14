/* Mock platform data: ad spaces, sponsors, submissions, owner claims. */

export type AdSpaceKey = "homepage" | "sidebar" | "detail" | "footer" | "category" | "mobile";

export type AdSpaceStatus = "Available" | "Rented" | "Reserved";

export type AdSpace = {
  key: AdSpaceKey;
  name: string;
  location: string;
  width: number;
  height: number;
  views: string;
  week: number;
  monthly: number;
  quarter: number;
  status: AdSpaceStatus;
  renter?: string | undefined;
  expiry?: string | undefined;
};

export const AD_SPACES: AdSpace[] = [
  {
    key: "homepage",
    name: "Homepage Hero Banner",
    location: "Between the hero and the site preview grid",
    width: 728,
    height: 90,
    views: "~50K views/month",
    week: 5000,
    monthly: 15000,
    quarter: 35000,
    status: "Rented",
    renter: "TechDZ",
    expiry: "2026-11-30",
  },
  {
    key: "sidebar",
    name: "Directory Sidebar Box",
    location: "Bottom of the directory category sidebar",
    width: 300,
    height: 250,
    views: "~28K views/month",
    week: 3000,
    monthly: 8000,
    quarter: 20000,
    status: "Available",
  },
  {
    key: "detail",
    name: "Site Detail Banner",
    location: "Between screenshots and description on a site page",
    width: 728,
    height: 90,
    views: "~18K views/month",
    week: 2000,
    monthly: 5000,
    quarter: 12000,
    status: "Reserved",
    renter: "Baridi Pay",
    expiry: "2026-10-05",
  },
  {
    key: "footer",
    name: "Footer Banner",
    location: "Just above the footer FAQ section",
    width: 728,
    height: 90,
    views: "~40K views/month",
    week: 1500,
    monthly: 4000,
    quarter: 10000,
    status: "Available",
  },
  {
    key: "category",
    name: "Category Page Top",
    location: "Between the category filter and the results grid",
    width: 970,
    height: 90,
    views: "~22K views/month",
    week: 2200,
    monthly: 6000,
    quarter: 14000,
    status: "Available",
  },
  {
    key: "mobile",
    name: "Mobile Interstitial",
    location: "Mobile-only slot shown between sections",
    width: 320,
    height: 50,
    views: "~35K views/month",
    week: 1200,
    monthly: 3000,
    quarter: 7500,
    status: "Available",
  },
];

/** Live creatives per space. Empty entries render the "space available" placeholder. */
export const ACTIVE_ADS: Partial<Record<AdSpaceKey, { image: string; url: string; sponsor: string }>> =
  {};

export const AD_CONTACT = "contact@algerian-index.dz";

export const money = (n: number) => `${n.toLocaleString("en-US")} دج`;

export type SponsorTier = "Star Sponsor" | "Premium Sponsor" | "Elite Sponsor";

export const tierFor = (spent: number): { name: SponsorTier; icon: string } =>
  spent >= 50000
    ? { name: "Elite Sponsor", icon: "👑" }
    : spent >= 20000
      ? { name: "Premium Sponsor", icon: "💎" }
      : { name: "Star Sponsor", icon: "🌟" };

export type Sponsor = {
  name: string;
  industry: string;
  logo: string;
  spent: number;
  since: string;
};

export const SPONSORS: Sponsor[] = [
  { name: "TechDZ", industry: "Technology", logo: "🖥️", spent: 78000, since: "Jan 2025" },
  { name: "Baridi Pay", industry: "Finance", logo: "🏦", spent: 54000, since: "Mar 2025" },
  { name: "Sahla Delivery", industry: "Logistics", logo: "🛵", spent: 41000, since: "Jun 2025" },
  { name: "Zitouna Foods", industry: "Food & Beverage", logo: "🫒", spent: 33500, since: "Aug 2025" },
  { name: "El Djazair Immo", industry: "Real Estate", logo: "🏗️", spent: 24000, since: "Sep 2025" },
  { name: "Nedjma Academy", industry: "Education", logo: "🎓", spent: 18500, since: "Nov 2025" },
  { name: "Casbah Tours", industry: "Travel", logo: "🧭", spent: 12000, since: "Jan 2026" },
  { name: "Souk Mobile", industry: "Retail", logo: "📱", spent: 7500, since: "Mar 2026" },
];

export const INDUSTRIES = [
  { label: "Technology", icon: "🖥️" },
  { label: "Finance", icon: "🏦" },
  { label: "Retail", icon: "🛍️" },
  { label: "Food & Beverage", icon: "🍔" },
  { label: "Education", icon: "🎓" },
  { label: "Real Estate", icon: "🏗️" },
  { label: "Logistics", icon: "🚚" },
  { label: "Travel", icon: "🧭" },
  { label: "Health", icon: "🏥" },
  { label: "Telecom", icon: "📡" },
];

export type SubmissionStatus = "pending" | "approved" | "rejected";

export type Submission = {
  id: string;
  name: string;
  url: string;
  category: string;
  submittedBy: string;
  date: string;
  aiNotes: string;
  status: SubmissionStatus;
  reason?: string | undefined;
  featured?: boolean | undefined;
  claimed?: boolean | undefined;
};

export const SUBMISSIONS: Submission[] = [
  {
    id: "s1",
    name: "Startup DZ",
    url: "startup.dz",
    category: "Startups",
    submittedBy: "amine@startup.dz",
    date: "2026-09-13",
    aiNotes: "Domain .dz · French content · Algerian origin likely",
    status: "pending",
  },
  {
    id: "s2",
    name: "Chifa Santé",
    url: "chifa-sante.dz",
    category: "Health",
    submittedBy: "contact@chifa-sante.dz",
    date: "2026-09-12",
    aiNotes: "Arabic content · Hosted in Algiers",
    status: "pending",
  },
  {
    id: "s3",
    name: "Kraa Books",
    url: "kraabooks.com",
    category: "Education",
    submittedBy: "hello@kraabooks.com",
    date: "2026-09-11",
    aiNotes: "Origin unclear · needs manual review",
    status: "pending",
  },
  {
    id: "s4",
    name: "Ouedkniss",
    url: "ouedkniss.com",
    category: "E-commerce",
    submittedBy: "team@ouedkniss.com",
    date: "2026-09-10",
    aiNotes: "Algerian origin confirmed",
    status: "approved",
    featured: true,
    claimed: true,
  },
  {
    id: "s5",
    name: "Weilo",
    url: "weilo.dz",
    category: "Education",
    submittedBy: "hello@weilo.dz",
    date: "2026-09-09",
    aiNotes: "Algerian origin confirmed",
    status: "approved",
    claimed: false,
  },
  {
    id: "s6",
    name: "Yassir",
    url: "yassir.app",
    category: "Startups",
    submittedBy: "press@yassir.app",
    date: "2026-09-08",
    aiNotes: "Algerian origin confirmed",
    status: "approved",
    claimed: true,
  },
  {
    id: "s7",
    name: "Global Shop 24",
    url: "globalshop24.net",
    category: "E-commerce",
    submittedBy: "spam@globalshop24.net",
    date: "2026-09-06",
    aiNotes: "No Algerian signals detected",
    status: "rejected",
    reason: "Not Algerian",
  },
];

export const ACTIVITY = [
  "ouedkniss.com was approved — 2 hours ago",
  "New submission: startup.dz — 5 hours ago",
  "New sponsor: TechDZ — 1 day ago",
  "chifa-sante.dz entered the review queue — 1 day ago",
  "Footer Banner ad space marked available — 3 days ago",
];

export const REJECT_REASONS = [
  "Not Algerian",
  "Broken/offline website",
  "Duplicate listing",
  "Inappropriate content",
  "Other",
];

/** Sites considered claimed by their owner. Anything else shows the unclaimed banner. */
export const CLAIMED_SITES = ["ouedkniss.com", "yassir.app", "djezzy.dz"];

export const isClaimed = (url: string) => CLAIMED_SITES.includes(url);

export type AdRequest = {
  id: string;
  sponsor: string;
  logo: string;
  image: string;
  duration: string;
  amount: number;
};

export const AD_REQUESTS: AdRequest[] = [
  { id: "r1", sponsor: "TechDZ", logo: "🖥️", image: "728 × 90 banner", duration: "1 month", amount: 15000 },
  { id: "r2", sponsor: "Sahla Delivery", logo: "🛵", image: "300 × 250 box", duration: "1 week", amount: 3000 },
  { id: "r3", sponsor: "Nedjma Academy", logo: "🎓", image: "728 × 90 banner", duration: "3 months", amount: 12000 },
];

export const MONTHLY_VIEWS = [
  { m: "Apr", v: 4200 },
  { m: "May", v: 5100 },
  { m: "Jun", v: 4800 },
  { m: "Jul", v: 6400 },
  { m: "Aug", v: 7300 },
  { m: "Sep", v: 8100 },
];

export const RATING_TREND = [
  { m: "Apr", v: 4.1 },
  { m: "May", v: 4.2 },
  { m: "Jun", v: 4.2 },
  { m: "Jul", v: 4.4 },
  { m: "Aug", v: 4.5 },
  { m: "Sep", v: 4.6 },
];

export const WEEKLY_AD_VIEWS = [
  { d: "Mon", v: 820 },
  { d: "Tue", v: 940 },
  { d: "Wed", v: 1120 },
  { d: "Thu", v: 990 },
  { d: "Fri", v: 1340 },
  { d: "Sat", v: 1480 },
  { d: "Sun", v: 1210 },
];

export const WILAYAS = [
  "Adrar", "Chlef", "Laghouat", "Oum El Bouaghi", "Batna", "Béjaïa", "Biskra", "Béchar",
  "Blida", "Bouira", "Tamanrasset", "Tébessa", "Tlemcen", "Tiaret", "Tizi Ouzou", "Alger",
  "Djelfa", "Jijel", "Sétif", "Saïda", "Skikda", "Sidi Bel Abbès", "Annaba", "Guelma",
  "Constantine", "Médéa", "Mostaganem", "M'Sila", "Mascara", "Ouargla", "Oran", "El Bayadh",
  "Illizi", "Bordj Bou Arreridj", "Boumerdès", "El Tarf", "Tindouf", "Tissemsilt", "El Oued",
  "Khenchela", "Souk Ahras", "Tipaza", "Mila", "Aïn Defla", "Naâma", "Aïn Témouchent",
  "Ghardaïa", "Relizane", "Timimoun", "Bordj Badji Mokhtar", "Ouled Djellal",
  "Béni Abbès", "In Salah", "In Guezzam", "Touggourt", "Djanet", "El M'Ghair", "El Meniaa",
];

export const M7M_PRODUCTS = [
  { name: "DLAL", desc: "Classifieds", soon: false },
  { name: "Weilo", desc: "Education", soon: false },
  { name: "KHIDMA", desc: "Services", soon: false },
  { name: "RABET", desc: "Link-in-bio", soon: false },
  { name: "BADIL", desc: "Coming soon", soon: true },
];

export const uniqueCode = () =>
  `dzidx-${Math.random().toString(36).slice(2, 10)}${Math.random().toString(36).slice(2, 6)}`;
