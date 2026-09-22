# ALGERIO Platform Expansion

## Goal

Turn ALGERIO into a multilingual, SEO-ready Algerian web directory with licensed 3D interface artwork, real public pages, a richer information footer, and a secure administration area that controls the platform’s public content and settings.

## Confirmed decisions

- Replace interface emojis and suitable flat interface illustrations with 3D artwork; keep real website favicons/logos intact for brand accuracy.
- Use the CC0 collection from 3dicons.co as the default source. Do not copy paid assets from icoon.co or IconScout without a project-owned license.
- Remove **Our Products** and all DLAL, Weilo, KHIDMA, RABET, and BADIL product-menu/footer entries. Research did not verify them as ALGERIO-owned products.
- Support English, French, and Arabic, including correct right-to-left behavior for Arabic.
- Make the administration area the control center for public content, navigation, footer, SEO, directory records, categories, sponsors, ads, submissions, users, and site settings.

## Public platform

### 1. Licensed 3D icon system

- Audit all user-visible emojis and interface illustrations across the directory, categories, admin navigation, sponsors, submission, owner, and advertising screens.
- Download a coherent set from the CC0 3dicons.co library, run the required asset inventory, and request final confirmation before uploading binaries to the project CDN.
- Add a reusable icon registry with consistent sizes, accessible labels, and graceful Lucide fallbacks.
- Preserve authentic website favicons/logos in listings and detail views instead of replacing brands with generic artwork.

### 2. Real navigation and public pages

- Remove the Our Products dropdown from desktop, mobile, and footer navigation.
- Standardize navigation across all public pages: Explore, Categories, Our Sponsors, Advertise, Site Owners, Submit, and Sign In.
- Add dedicated routes for About, How It Works, Contact, FAQ, Privacy, Terms, Editorial Policy, and Claim Your Site.
- Connect every navigation and footer item to a working route or action; remove decorative dead links.

### 3. Rich multilingual footer

- Rebuild the footer with ALGERIO’s purpose, directory links, owner resources, advertiser resources, company/legal pages, contact details, language control, live directory statistics, sponsor entry points, and newsletter/contact actions.
- Replace empty sponsor placeholders with real sponsor records or a clear advertise call-to-action.
- Translate public navigation, footer, utility pages, core calls-to-action, and metadata into English, French, and Arabic.
- Store language preference locally and set document language/direction correctly.

### 4. SEO and discoverability

- Give every public route a unique translated title, description, Open Graph title/description, canonical path, `og:type`, and Twitter card metadata.
- Add appropriate JSON-LD: WebSite/Organization for ALGERIO, CollectionPage for the directory, and BreadcrumbList for deeper public pages.
- Add indexable route content, semantic headings, internal links, and accessible labels without keyword stuffing or invented claims.
- Keep admin and private dashboard pages `noindex`.
- Improve `robots.txt`; defer a new sitemap until a public domain exists, per current project constraints.

## Powerful administration

### 5. Secure admin foundation

- Replace browser-only password checking and local-only changes with server-validated admin access and protected server functions.
- Keep the approved admin password, store its verifier as a project secret rather than shipping it to visitors, and use a secure server-issued session.
- Add a separate roles table for authenticated user roles; never store roles on profiles or trust browser storage for authorization.
- Apply explicit grants, row-level security, validation, and audit fields to every new public database table.

### 6. Admin-managed content and settings

Create persistent admin sections for:

- **Dashboard:** totals, recent activity, moderation queue, incomplete content, and quick actions.
- **Sites:** create, edit, verify, feature, claim status, categorize, publish/unpublish, and delete.
- **Categories:** names, translations, 3D icon assignment, ordering, visibility, and SEO fields.
- **Submissions:** approve, reject, request information, and convert approved entries into listings.
- **Navigation:** labels, ordering, visibility, and valid internal/external destinations.
- **Pages:** English/French/Arabic page copy, publication status, and page-level SEO.
- **Footer:** columns, links, contact details, social links, legal links, statistics, and calls-to-action.
- **Sponsors and ads:** sponsor records, logo/creative, placement, pricing, dates, status, and destination URLs.
- **FAQs:** translated questions, answers, ordering, and visibility.
- **SEO:** route metadata, social previews when a valid absolute image exists, structured-data fields, and index/noindex controls.
- **Brand and appearance:** approved logo/mark, 3D icon assignment, core theme settings, and homepage copy while preserving safe layout constraints.
- **Users and roles:** view users and manage roles through server-authorized actions.
- **Audit history:** record who changed what and when.

### 7. Data model and runtime behavior

- Keep the existing `sites` table and migrate current mock records into database-backed reads without losing the present card/detail experience.
- Add focused tables for categories, localized content/pages, platform settings, navigation, footer links, FAQs, sponsors, ad placements, user roles, and audit events.
- Seed the current visible content in migrations so the first database-backed render is not empty.
- Use server functions for privileged writes and public database reads for published content only.
- Add loading, empty, validation, success, and error states to all admin editors.

## Technical details

- Preserve TanStack Start routing, existing modals, ratings, directory filters, detail views, owner flow, sponsor flow, and submission behavior.
- Use TanStack Query for database-backed route data and cache invalidation after admin changes.
- Keep design tokens and the approved IBM Plex/blue ALGERIO identity.
- Use the project asset flow for downloaded 3D binaries; do not hotlink marketplace assets.
- Keep controls responsive and accessible; Arabic layouts must mirror correctly without text overlap.

## Validation

- Verify all public and admin routes at desktop and mobile sizes in English, French, and Arabic.
- Confirm every navigation/footer link works and no Our Products entry remains.
- Confirm real data edits persist after refresh and appear publicly only when published.
- Test admin authorization, role enforcement, CRUD operations, icon assignments, translations, SEO output, and audit history.
- Check browser console/network errors, route metadata, RTL rendering, image loading, and the full build signal.
