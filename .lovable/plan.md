# ALGERIO Sprint 01

## Goal
Complete the requested rebrand, visual system, navigation, and footer while preserving the existing screen state, site cards, modal behavior, and data access.

## Implementation
1. **Rebrand**
   - Add shared platform constants for the ALGERIO name, tagline, company, team, and contact email.
   - Replace visible legacy company and product wording across public and admin screens.
   - Update the home-page title and description, global defaults, and favicon branding.

2. **Design system**
   - Update the existing Tailwind v4 theme tokens to ALGERIO blue, off-white backgrounds, dark text/sidebar, 12px radius, and semantic success/error colors.
   - Load IBM Plex Sans Arabic and IBM Plex Mono through the document head.
   - Replace hardcoded component colors in the touched interface with semantic tokens.

3. **Navigation**
   - Extract the existing home navigation into a reusable Navbar without changing its callbacks or state-driven routing.
   - Add the requested Explore, Categories, Our Sponsors, and Our Products controls; preserve the category dropdown.
   - Add the products menu and complete mobile menu, with Submit and Sign in retaining the current modal controls.

4. **Footer**
   - Rebuild the existing footer with the supplied FAQ, current dataset-derived stats, sponsor placeholders, advertiser form, toast confirmation, link columns, copyright, tagline, and watermark.
   - Keep footer actions inside the current screen flow where possible and use existing routes for dedicated pages.

5. **Verification**
   - Search the complete source for visible legacy names and old contact details.
   - Validate the build log and test desktop/mobile navigation, dropdowns, FAQ, advertiser modal, and toast in the live preview.

## Technical notes
- The project uses `src/styles.css` and route-level `head()` metadata, so those replace the brief's `src/index.css` and `index.html` locations.
- Existing TanStack file routes remain intact. The homepage's internal landing/directory/detail navigation remains state-based.
- Existing supplied ALGERIO image assets remain available, while the requested dark square triangle mark becomes the navbar/footer identity and favicon.
