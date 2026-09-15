# Finish Algerio Platform

## Goal

Apply the supplied Algerio identity, preserve the working directory and admin area, and complete the previously requested owner, sponsor, advertising, submission, and navigation experiences.

## Branding

- Upload the supplied Algerio wordmark as the primary static brand asset and use it in the public navigation, footer, sign-in presentation, and admin branding where appropriate.
- Build a crisp 64px favicon from the supplied blue “A” symbol and replace the current browser icon.
- Keep the directory offer recognizable as **The Algerian Index by Algerio**, while using **Algerio** as the platform brand.
- Preserve the established teal design tokens, white/light-gray surfaces, black primary calls-to-action, rounded cards, and pill controls.

## Remaining features

### 1. Owner dashboard and claims

- Add `/owner-dashboard` with email magic-link sign-in presentation, owned-site overview, traffic/rating summaries, and claim status.
- Add a claim flow that searches a domain and supports Meta Tag, HTML File, or DNS TXT verification instructions.
- Add the unclaimed-site notice and claim entry point on site detail views without restructuring the existing detail content.

### 2. Sponsor experience

- Add `/sponsors` with public sponsor registration, ad-space selection, creative upload preview, duration/pricing selection, bank-transfer instructions, and an active-campaign dashboard state.
- Add `/sponsors-hall` with a top-three podium, ranked sponsor table, spend totals, and Star/Premium/Elite badges.
- Connect the public “Sponsored by” area and advertiser contact action to these experiences.

### 3. Advertising placements

- Place the six defined ad formats in their requested positions: homepage banner, directory sidebar box, site-detail banner, footer banner, category-top banner, and mobile interstitial.
- Keep the existing reusable ad block and its available/rented/reserved data behavior.

### 4. Full-page submission flow

- Replace the navbar’s modal entry with a full-page, state-driven submission experience while keeping the existing modal API untouched for compatibility.
- Step 1 collects URL, auto-fetched favicon/name, category with visual icon, wilaya, description, Algerian evidence, and owner status.
- Step 2 shows the staged verification checks.
- Step 3 shows either verified success or flagged-for-review, then returns users cleanly to the directory.

### 5. Final public navigation

- Add Explore, Categories, Our Sponsors List, and an Our Products menu for DLAL, Weilo, KHIDMA, RABET, and BADIL (Coming Soon).
- Use a black **Submit a Site** pill and outlined **Sign in** pill, with a complete mobile menu.
- Keep category selection, directory navigation, detail navigation, ratings, authentication modal, cookie consent, and existing admin behavior working.

## Technical details

- Use TanStack file routes for the three new shareable dashboard/hall URLs and local React state for their internal steps.
- Give every new content route unique title, description, Open Graph, and Twitter metadata.
- Keep all data demonstrational in the existing mock platform layer unless an already-connected database operation is required by current working code.
- Use existing semantic color tokens and Lucide icons; no purple, gradients, dark public theme, or new routing library.
- Keep uploaded binaries out of the repository by using the project asset flow; the favicon remains a small real file under `public/`.

## Validation

- Confirm the current build log is clean after every implementation batch.
- Verify `/`, `/admin`, `/owner-dashboard`, `/sponsors`, and `/sponsors-hall` load successfully.
- Walk the claim methods, sponsor signup/payment/dashboard states, submission outcomes, navbar menus, ad placements, and mobile layouts in the browser.
- Confirm the Algerio wordmark and blue “A” favicon render correctly and that no console or runtime errors remain.
