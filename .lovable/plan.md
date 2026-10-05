# ALGERIO — Live Directory and Professional Admin

## Goal
Turn ALGERIO into a focused, database-backed directory: remove Sponsors and Our Products, replace the decorative app-logo cloud with a live carousel of listed websites, make search and submissions real, improve account access, and rebuild `/admin` as a polished shadcn-style operations dashboard.

## Scope

### 1. Remove Sponsors and Our Products
- Remove Sponsors and Our Products from desktop/mobile navigation, footer, mock data, and admin navigation.
- Remove sponsor hall, advertising flow, ad-space panels, and unused sponsor/ad components.
- Keep public navigation focused on Explore, Categories, Submit, Sign in, and Admin access where appropriate.
- Update route references and generated routing through source route files only.

### 2. Live directory and search
- Read approved websites from Lovable Cloud with TanStack Query, falling back to the existing local site records only when the live read fails.
- Use the same live dataset for landing cards, category totals, sorting, search results, and website detail views.
- Make both landing and compact navigation searches filter by name, domain, description, and category.
- Preserve the current cards and detail experience while removing fake reviews and similar-site clutter.
- Add clear loading, empty, and retry states without changing the existing database schema or seeded records.

### 3. Live app carousel and licensed icons
- Replace the floating favicon grid with two continuous rows of real website screenshots/logos sourced from the live directory.
- Make rows move in opposite directions, pause on interaction, remain readable on mobile, and respect reduced-motion settings.
- Use real website favicons/screenshots for brands; use locally stored, license-safe 3Dicons/icoon assets only for category and interface decoration where they improve clarity.
- Remove decorative emoji from the directory, account, submission, and dashboard experiences.

### 4. Improved sign-in and sign-up
- Replace the decorative account popup with working email sign-in/sign-up, password visibility, validation, useful error states, loading states, and password reset.
- Add Google sign-in only after configuring the provider correctly; keep all account redirects on the ALGERIO origin.
- Keep rating protected behind an authenticated account and simplify it to a five-star interaction.

### 5. Improved public submission
- Replace the simulated/random submission with a validated, multi-step form.
- Validate URLs and text limits in the browser and before persistence; preview the detected domain and favicon.
- Save every public submission as `pending` with safe defaults so nothing becomes public automatically.
- Handle duplicates and database errors with plain-language feedback and show a manual-review confirmation.
- Use only fields supported by the current database because the request preserves the existing schema.

### 6. Professional shadcn-style admin dashboard
- Rebuild `/admin` with a collapsible icon sidebar, compact top bar, search/command control, metric cards, activity area, and responsive tables inspired by the referenced shadcn admin template.
- Remove Sponsors, Ad Spaces, and fake Users sections.
- Show real approved, pending, and rejected site records from the database.
- Add professional filtering, search, sorting, row menus, preview, approve, reject-with-reason, edit, and direct-add workflows.
- Replace emoji navigation with consistent icons and use existing semantic design tokens.
- Keep admin operations server-side and password-protected; never expose privileged database access or the admin password in browser code.

### 7. Verification
- Confirm all remaining routes have unique ALGERIO metadata and removed routes have no links.
- Test search, category counts, sorting, account forms, submission persistence, and admin desktop/mobile interactions.
- Check the preview for console/network failures and verify the final build signal.

## Technical details
- Database reads use TanStack Query and the generated browser client; approved rows remain protected by existing row-level rules.
- Public submission inserts are constrained to the existing safe columns and pending defaults.
- Privileged moderation uses TanStack server functions with server-only authorization and the generated server client loaded only inside handlers.
- No database schema, legal pages, current site records, or ALGERIO color tokens will be changed.
- Actual website logos remain their own favicons; 3D artwork will not impersonate brand identities.
