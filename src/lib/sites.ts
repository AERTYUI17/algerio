export type Site = {
  name: string;
  url: string;
  category: string;
  description: string;
  founder: string;
  rating: number;
  views: string;
  likes: number;
  verified: boolean;
  year: number;
};

export const SITES: Site[] = [
  {
    name: "Ouedkniss",
    url: "ouedkniss.com",
    category: "E-commerce",
    description: "Algeria's largest classifieds marketplace",
    founder: "Mohamed Afifi",
    rating: 4.7,
    views: "2.3M",
    likes: 1240,
    verified: true,
    year: 2006,
  },
  {
    name: "Yassir",
    url: "yassir.app",
    category: "Startups",
    description: "Ride-hailing and delivery super-app",
    founder: "Noureddine Tayebi",
    rating: 4.5,
    views: "890K",
    likes: 987,
    verified: true,
    year: 2017,
  },
  {
    name: "Temtem One",
    url: "temtem.one",
    category: "Startups",
    description: "Book intercity buses online",
    founder: "Belkacem Bargui",
    rating: 4.3,
    views: "340K",
    likes: 654,
    verified: true,
    year: 2019,
  },
  {
    name: "Weilo",
    url: "weilo.dz",
    category: "Education",
    description: "Maghreb-first online learning platform",
    founder: "M7M Holdings",
    rating: 4.6,
    views: "120K",
    likes: 432,
    verified: true,
    year: 2024,
  },
  {
    name: "Echorouk Online",
    url: "echoroukonline.com",
    category: "News",
    description: "Algeria's most-read Arabic news site",
    founder: "Echorouk Media",
    rating: 4.0,
    views: "5.1M",
    likes: 2100,
    verified: true,
    year: 2000,
  },
  {
    name: "Emploi Algérie",
    url: "emploialgerie.com",
    category: "Jobs",
    description: "Top job board for Algerian professionals",
    founder: "",
    rating: 3.9,
    views: "780K",
    likes: 543,
    verified: true,
    year: 2010,
  },
  {
    name: "DLAL",
    url: "dlal.dz",
    category: "E-commerce",
    description: "Arabic-first classifieds — Ouedkniss competitor",
    founder: "M7M Holdings",
    rating: 4.2,
    views: "45K",
    likes: 231,
    verified: true,
    year: 2024,
  },
  {
    name: "Djezzy",
    url: "djezzy.dz",
    category: "Telecom",
    description: "Algeria's second-largest telecom operator",
    founder: "",
    rating: 3.7,
    views: "1.2M",
    likes: 445,
    verified: false,
    year: 1999,
  },
  {
    name: "Algérie Télécom",
    url: "algerie-telecom.dz",
    category: "Gov",
    description: "National telecom operator & internet provider",
    founder: "",
    rating: 3.5,
    views: "900K",
    likes: 320,
    verified: true,
    year: 2003,
  },
  {
    name: "ANDI",
    url: "andi.dz",
    category: "Gov",
    description: "National investment development agency",
    founder: "",
    rating: 3.8,
    views: "200K",
    likes: 178,
    verified: true,
    year: 2001,
  },
  {
    name: "Izara",
    url: "izara.com",
    category: "E-commerce",
    description: "Algerian online fashion marketplace",
    founder: "",
    rating: 4.1,
    views: "95K",
    likes: 312,
    verified: false,
    year: 2020,
  },
  {
    name: "Ennahar Online",
    url: "ennaharonline.com",
    category: "News",
    description: "Major Arabic-language news portal",
    founder: "",
    rating: 3.9,
    views: "3.2M",
    likes: 876,
    verified: true,
    year: 2011,
  },
];

export const CATEGORIES = [
  "All",
  "News",
  "Jobs",
  "E-commerce",
  "Gov",
  "Education",
  "Startups",
  "Finance",
  "Entertainment",
  "Tools",
];

export const HERO_DOMAINS = [
  "ouedkniss.com",
  "djezzy.dz",
  "ooredoo.dz",
  "mobilis.dz",
  "echoroukonline.com",
  "ennaharonline.com",
  "elmouwatin.com",
  "andi.dz",
  "algerie-telecom.dz",
  "weilo.dz",
  "dlal.dz",
  "emploialgerie.com",
  "yassir.app",
  "temtem.one",
  "izara.com",
];

export const favicon = (domain: string, size = 128) =>
  `https://www.google.com/s2/favicons?domain=${domain}&sz=${size}`;

export const shot = (domain: string) =>
  `https://api.microlink.io?url=${encodeURIComponent(`https://${domain}`)}&screenshot=true&meta=false&embed=screenshot.url`;

export const REVIEWS = [
  {
    user: "amine_dz",
    provider: "Google",
    stars: 5,
    text: "Great platform, very useful for everyday needs here in Algiers.",
  },
  {
    user: "sara.b",
    provider: "GitHub",
    stars: 4,
    text: "Solid experience overall, though the mobile version could be faster.",
  },
  {
    user: "karim_m7m",
    provider: "Google",
    stars: 5,
    text: "I use it weekly. Easily one of the best Algerian sites out there.",
  },
];
