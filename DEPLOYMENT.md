# VayOnline on GitHub Pages

The approved design is a static React site with prerendered HTML. GitHub Pages serves the committed root `index.html`, `assets/`, `images/`, and `favicon.svg`. No application server, database, or Sites account is required for visitors.

## Edit and publish

1. Use Node.js 22.13 or later and run `npm ci`.
2. Edit `src/App.tsx`, `src/styles.css`, or `src/lib/partners.ts`.
3. Run `npm run build`. It checks TypeScript, builds scripts/styles, prerenders the homepage and refreshes root publishing files.
4. Commit both source and generated publishing files. Publish the verified commit to the existing Pages source branch.

Keep `CNAME` set to `vayonline.io.vn`. This migration does not require a DNS or Pages source change. The existing Google Analytics measurement ID and Search Console verification tag are retained in `src/index.html`. The production page is indexable and has the domain's canonical URL.

The approved homepage does not collect names or phone numbers. The existing `admin.html` remains available for historical browser-local records, but the new homepage does not add records to it. The privacy information describes the retained Google Analytics tracking. Legacy ad and verification files are preserved.

## Rollback

The previous live commit is `7adb2bb89b9af562b71ebc65b83ca31c5736bbda` (`Add Facebook ad designs`). Revert the redesign commit on the publishing branch to restore the prior site. Do not force-push over unrelated later changes.

## Validation

TypeScript, the production build, prerendered homepage content, all three exact affiliate URLs, local asset references, canonical URL, Analytics ID, Search Console tag, and CNAME have passed local checks. Automated browser interaction and visual checks could not run because a Chromium executable was unavailable and its download failed. After publishing, check the amount controls, service dialogs, mobile menu and each registration destination in a browser.
