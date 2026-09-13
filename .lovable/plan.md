# Complete The Algerian Index

## Goal
Move the directory from hardcoded records to Lovable Cloud, preserve the current visual structure, and complete the requested icons, modals, filters, sponsor form, cookie banner, hero behavior, and similar-sites row.

## Verified baseline
- Opened the directory and selected **Most Viewed**.
- Clicked **All Sites** plus all 20 categories.
- Every sidebar count matched the number of cards shown, including zero-result categories.
- The current app has 12 seeded sites; the new database will preserve all 12 exactly.

## Implementation

### 1. Persistent website directory
- Create a public `sites` table with the current fields plus moderation status and timestamps.
- Seed every existing site from `sites.ts` in the migration so the first database-backed screen is never empty.
- Allow anyone to read approved sites and submit a pending site; prevent public edits and deletes.
- Add a small client data module and TanStack Query hooks for loading sites and creating submissions.
- Keep the existing `Site` shape and helper functions, but remove the hardcoded `SITES` runtime source.
- Update landing cards, category counts, directory sorting/filtering, details, and similar sites to use fetched data.

### 2. 3D icon system
- Add one shared 3dicons URL helper and the exact 20-category icon mapping.
- Replace category emojis in the sidebar and mega menu with 3dicons images.
- Add globe, folder, and shield icons to footer stats, and cookie icon to the consent card.
- Replace remaining decorative emoji with image or vector icons while preserving required text meaning.

### 3. Directory controls
- Add category text filtering, all 20 categories, active styling, and accurate count badges.
- Add the collapsible mobile category panel plus a horizontal category row.
- Support Most Viewed, Most Liked, Newest, A–Z, and Verified First sorting.
- Show the current result count against the directory total.

### 4. Modal experiences
- Rebuild the sign-up wall with blurred site previews, inline provider logos, divider, email input, and terms copy while preserving existing open/close props.
- Rebuild submission as form → timed verification → success/manual-review flow.
- Auto-detect domain/favicon/name, support icon category selection, counters, and tag entry.
- Save every valid submission to the database as pending; verification outcome only changes the confirmation shown.
- Rebuild rating with large hoverable stars, staged positive/negative tags, 280-character comment, and a Sonner success toast.

### 5. Footer, cookie, hero, and details
- Make sponsor placeholders match the requested dimensions and open a working advertiser contact form.
- Preserve consent in local storage and use the delayed slide-up presentation.
- Enlarge hero tiles, add three motion paths, a subtle search glow, live counter, and real-time preview filtering.
- Add snap scrolling, fixed-width cards, category badges, visit links, and arrow controls to Similar Sites.

### 6. Validation
- Verify database seed count and a pending submission write.
- Re-run the full category/count walk after migration, checking every sort option.
- Test the landing search, all modal steps, sponsor form, cookie decisions, and Similar Sites controls.
- Check desktop and mobile screenshots, browser console/network failures, and the final build log.

## Technical details
- Public reads are limited to approved sites through row-level access rules.
- Public submissions can only create pending entries; generated values such as approval state, views, likes, rating, and verification cannot be self-promoted by the browser.
- The currently requested Google, Facebook, GitHub, and X controls will be completed as the specified prototype UI; this scope does not add live third-party authentication.
- Sponsor messages remain a front-end demonstration because email delivery was not requested.
