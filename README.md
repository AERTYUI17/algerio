# Algerian Digital Hub

Build a single-page React app called "The Algerian Index" — a directory 

of Algerian websites. Use Tailwind CSS. No backend needed for this UI 

prototype — use hardcoded mock data.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SECTION 1 — LANDING HERO (above the fold)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Pure white background (#FFFFFF).

Behind the hero text: a large floating grid of website logo icons 

(rounded squares, 56×56px, with drop shadows, like Screenlane.com). 

Use these real Algerian site logos fetched via:

  https://www.google.com/s2/favicons?domain={domain}&sz=128

Domains to use:

  ouedkniss.com, djezzy.dz, ooredoo.dz, mobilis.dz, 

  echoroukonline.com, ennaharonline.com, elmouwatin.com,

  andi.dz, algerie-telecom.dz, weilo.dz, dlal.dz,

  emploialgerie.com, yassir.app, temtem.one, izara.com

Display ~20–30 of these as a background grid that fills the full 

viewport. The icons are arranged in a CSS grid, slightly tilted 5deg, 

with slow floating animation (up/down, different delays per icon, 

keyframe animation, very subtle — not distracting).

Empty placeholder squares (bg-gray-100, rounded-2xl) fill the gaps 

where no icon exists.

CENTER CONTENT (above the floating grid, z-index higher):

  - Navbar: logo left ("🇩🇿 Algerian Index"), links center 

    (Explore · Categories · Submit), Sign in button right (black, 

    rounded-full)

  - Headline (bold, 64px): "Every Algerian Website."

    Subline (bold, 64px, text-gray-400): "In One Place."

  - Search bar below headline:

      - Large pill shape, white, border, shadow-lg

      - Inside: search icon + animated placeholder text that cycles 

        through trending site names every 2s using a typewriter effect:

        "Search ouedkniss.com...", "Search yassir.app...", 

        "Search weilo.dz..."

      - Right side of search bar: small camera icon button 

        (for image search — show tooltip "Search by image, coming soon")

      - Below search bar: pill tags for trending searches:

        🔥 Ouedkniss  · 💼 Emploi Algérie · 🛵 Yassir · 📰 Echorouk

  

  - "Explore Directory →" button (black, rounded-full, large) 

    that scrolls down to the grid

━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SECTION 2 — DIRECTORY GRID (scroll down from hero)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Exact clone of V0.dev's template gallery layout:

- White/light gray background (#FAFAFA)

- Navbar becomes sticky at top (same navbar, now with search bar 

  visible inline, compact)

- Category filter pills row (scrollable horizontal):

  All · News · Jobs · E-commerce · Gov · Education · 

  Startups · Finance · Entertainment · Tools

GRID: 3 columns on desktop, 2 on tablet, 1 on mobile.

Each card = exact V0 card structure:

┌─────────────────────────────┐

│                             │

│   [SCREENSHOT of website]   │  ← 16:10 ratio image area

│   Use placeholder image:    │

│   https://api.microlink.io  │

│   ?url={site_url}           │

│   &screenshot=true          │

│   &meta=false&embed=        │

│   screenshot.url            │

│   (fallback: gray bg with   │

│    centered favicon 64px)   │

│                             │

├─────────────────────────────┤

│ 🟢 [favicon 20px] Site Name │  ← left: verified badge + favicon + name

│ [avatar] username  👁 1.2K ❤️ 340 │  ← bottom row like V0

└─────────────────────────────┘

Card hover: subtle scale(1.02) + shadow-xl transition 200ms

Card click: opens detail page (see Section 3)

Mock data — use these 12 sites:

[

  { name: "Ouedkniss", url: "ouedkniss.com", category: "E-commerce", 

    description: "Algeria's largest classifieds marketplace", 

    founder: "Mohamed Afifi", rating: 4.7, views: "2.3M", 

    likes: 1240, verified: true, year: 2006 },

  { name: "Yassir", url: "yassir.app", category: "Startups",

    description: "Ride-hailing and delivery super-app",

    founder: "Noureddine Tayebi", rating: 4.5, views: "890K",

    likes: 987, verified: true, year: 2017 },

  { name: "Temtem One", url: "temtem.one", category: "Startups",

    description: "Book intercity buses online",

    founder: "Belkacem Bargui", rating: 4.3, views: "340K",

    likes: 654, verified: true, year: 2019 },

  { name: "Weilo", url: "weilo.dz", category: "Education",

    description: "Maghreb-first online learning platform",

    founder: "M7M Holdings", rating: 4.6, views: "120K",

    likes: 432, verified: true, year: 2024 },

  { name: "Echorouk Online", url: "echoroukonline.com", category: "News",

    description: "Algeria's most-read Arabic news site",

    founder: "Echorouk Media", rating: 4.0, views: "5.1M",

    likes: 2100, verified: true, year: 2000 },

  { name: "Emploi Algérie", url: "emploialgerie.com", category: "Jobs",

    description: "Top job board for Algerian professionals",

    founder: "", rating: 3.9, views: "780K",

    likes: 543, verified: true, year: 2010 },

  { name: "DLAL", url: "dlal.dz", category: "E-commerce",

    description: "Arabic-first classifieds — Ouedkniss competitor",

    founder: "M7M Holdings", rating: 4.2, views: "45K",

    likes: 231, verified: true, year: 2024 },

  { name: "Djezzy", url: "djezzy.dz", category: "Telecom",

    description: "Algeria's second-largest telecom operator",

    founder: "", rating: 3.7, views: "1.2M",

    likes: 445, verified: false, year: 1999 },

  { name: "Algérie Télécom", url: "algerie-telecom.dz", category: "Gov",

    description: "National telecom operator & internet provider",

    founder: "", rating: 3.5, views: "900K",

    likes: 320, verified: true, year: 2003 },

  { name: "ANDI", url: "andi.dz", category: "Gov",

    description: "National investment development agency",

    founder: "", rating: 3.8, views: "200K",

    likes: 178, verified: true, year: 2001 },

  { name: "Izara", url: "izara.com", category: "E-commerce",

    description: "Algerian online fashion marketplace",

    founder: "", rating: 4.1, views: "95K",

    likes: 312, verified: false, year: 2020 },

  { name: "Ennahar Online", url: "ennaharonline.com", category: "News",

    description: "Major Arabic-language news portal",

    founder: "", rating: 3.9, views: "3.2M",

    likes: 876, verified: true, year: 2011 }

]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SECTION 3 — SITE DETAIL PAGE

━━━━━━━━━━━━━━━━━━━━━━━━━━━━

When user clicks a card, render a new "page" (useState-based routing, 

no react-router needed — just conditional render).

Layout = EXACT Airbnb listing page structure:

TOP: back arrow ← + breadcrumb "Algerian Index / {category} / {name}"

HEADER BLOCK:

  - Site name (32px bold) left

  - Right: ⭐ {rating} · {views} views · ❤️ {likes} · 

    Share button · Save button

PHOTO/SCREENSHOT GRID (like Airbnb's 5-photo grid):

  - Left: 1 large screenshot (60% width)

  - Right: 2×2 grid of 4 more images (40% width)

  - All images: website screenshot via microlink OR 

    fallback colored gradient with favicon centered

  - "Show all photos" button bottom-right (decorative for now)

CONTENT SPLIT (like Airbnb — left 60%, right 40%):

LEFT COLUMN:

  ├─ "About {name}" section

  │    Category badge · Founded year · Verified badge

  │    Full description paragraph

  │

  ├─ Divider ───────────────

  │

  ├─ "What this platform offers" (like Airbnb amenities)

  │    Icon grid of features:

  │    🌐 Available online · 📱 Has mobile app · 

  │    🇩🇿 Algeria-focused · ✅ AI Verified · 

  │    🔒 Secure · 🆓 Free to use

  │

  ├─ Divider ───────────────

  │

  ├─ "Founders & Team" 

  │    Founder name + avatar placeholder + short bio

  │    (if founder known)

  │

  ├─ Divider ───────────────

  │

  └─ "Ratings & Reviews"

       Star distribution bar (like Airbnb)

       ⭐⭐⭐⭐⭐ — 5 stars — ████░ 60%

       ⭐⭐⭐⭐  — 4 stars — ███░░ 30%

       etc.

       

       Review cards (3 mock reviews per site):

       [Avatar] Username (via Google/GitHub icon badge)

         ⭐⭐⭐⭐⭐ · "Great platform, very useful for..."

         [Link icon] → their profile (decorative)

       

       "Add your rating" button (black, opens rating modal)

RIGHT COLUMN (sticky):

  ┌─────────────────────────┐

  │  ⭐ {rating} · {views}  │

  │                         │

  │  [VISIT WEBSITE →]      │  ← big black button, opens URL

  │  (opens in new tab)     │

  │                         │

  │  ─────────────────────  │

  │  🇩🇿 Algerian Platform  │

  │  📅 Founded: {year}     │

  │  🏷️ Category: {cat}    │

  │  ✅ AI Verified         │

  │                         │

  │  ─────────────────────  │

  │  Share this site:       │

  │  [Twitter] [WhatsApp]   │

  │  [Copy link]            │

  └─────────────────────────┘

━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SECTION 4 — RATING MODAL

━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Opens when clicking ❤️ on card OR "Add your rating" on detail page.

Centered modal, white, rounded-2xl, shadow-2xl.

Content:

  "Rate {site name}" (title)

  

  Star selector (large, interactive — click to select 1–5)

  

  3 quick questions (pill multi-select, not required):

  "What's good about it?"

  → [🎨 Good design] [⚡ Fast] [📱 Mobile-friendly] 

    [🔒 Trustworthy] [🆓 Free] [🇩🇿 Very Algerian]

  

  "What could improve?"

  → [🐢 Slow] [📵 No mobile app] [🌍 Not enough content]

    [🔧 Bugs] [💰 Too expensive]

  

  Comment box (optional, placeholder: 

  "Share your experience... (optional)")

  

  [Submit Rating] button — black, full width

  On submit: show "✅ Thank you! Your rating was submitted." 

  then close modal after 1.5s

━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SECTION 5 — AUTH MODAL

━━━━━━━━━━━━━━━━━━━━━━━━━━━━

"Sign in" button in navbar → opens modal:

  Title: "Join Algerian Index"

  Subtitle: "Sign in to rate, comment and submit sites"

  

  Buttons (full width, rounded-xl, bordered):

  [G] Continue with Google

  [𝕏] Continue with X (Twitter)  

  [f] Continue with Facebook

  [GH] Continue with GitHub

  

  Divider: ── or ──

  

  Email input + "Continue with email" button

  

  Small text: "By joining you agree to our Terms · Privacy"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SECTION 6 — SUBMIT A SITE MODAL

━━━━━━━━━━━━━━━━━━━━━━━━━━━━

"Submit" in navbar → opens modal:

  Title: "Submit an Algerian Site"

  

  Step 1 of 2:

    Website URL input (required)

    Website Name input (required)

    Category dropdown

    Short description (textarea, max 200 chars)

    "Why is it Algerian?" (textarea, required)

    [Next →] button

  

  Step 2 of 2 (after clicking Next):

    Show: "🤖 AI is verifying your site..."

    Spinner for 2 seconds

    Then show: "✅ Verified! Your site looks Algerian."

    Or: "⚠️ We couldn't confirm this site is Algerian. 

         It will be reviewed manually."

    [Done] button closes modal

━━━━━━━━━━━━━━━━━━━━━━━━━━━━

FOOTER

━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Clean, minimal, white background:

Left: 🇩🇿 Algerian Index — "Discover the Algerian web"

Center links: About · Submit a Site · Categories · Contact · Privacy

Right: "Made in Algeria" + © 2026 M7M Holdings

Bottom strip: Ad banner placeholder (728×90, dashed border, 

label "Advertisement")

━━━━━━━━━━━━━━━━━━━━━━━━━━━━

GLOBAL DESIGN RULES

━━━━━━━━━━━━━━━━━━━━━━━━━━━━

- Background: white (#FFFFFF) and light gray (#FAFAFA) only

- Text: #111111 primary, #6B7280 secondary

- Accent / CTA buttons: pure black (#000000) with white text

- NO dark mode. NO purple. NO gradients. NO glass.

- Font: system-ui or Inter

- Border radius: rounded-2xl on cards, rounded-full on pills/buttons

- All modals: backdrop blur + overlay + centered + rounded-2xl

- Hover states on all interactive elements

- Smooth scroll between sections

- State management: useState only (no redux, no context needed)

- Single file if possible, or max 3 components

- Mobile responsive (hamburger menu on mobile for navbar)

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/ed9f2c3c-f287-4c01-8484-f013e4ef0ca3).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
