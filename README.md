# Natural Kitchen

The editorial redesign: cream and slate (#4c5c66), a light Natural Kitchen logo on slate header and footer backgrounds, Cormorant Garamond headings, DM Sans text, and the restaurant’s own photography.

Built with Next.js 16, React 19 and TypeScript. The entire website exports to static files for **Cloudflare Pages**. No runtime server or database is required.

## Run locally

Use Node.js 22 or newer.

```bash
npm ci
npm run dev
```

Open http://localhost:3000.

To build and preview the production export:

```bash
npm run build
npm run verify
npm run verify:cloudflare
npm run preview
```

Open http://localhost:4173. Do not use `next start` for this static-export project, or open `out/index.html` directly from the filesystem.

Optional browser checks (after building):

```bash
npx playwright install chromium
npm run test:browser
```

These check all public routes at desktop, tablet and mobile widths, menu navigation and search, dietary filters, booking links, the email-draft flow, and the 404 page. Screenshots are written to `test-results/`.

## Add this project to the existing GitHub repository

The project belongs at the **root** of `calebxlargi/NaturalKitchen`, alongside the original JPG photographs. The original repository photographs have been preserved. The website uses optimized WebP copies in `public/images/`.

If using the downloadable source package, extract it and copy the contents of its `NaturalKitchen` folder into your local repository. Include `.github`, `.gitignore` and `.node-version`. Do not copy `node_modules`, `.next` or `out` into Git.

```bash
git clone https://github.com/calebxlargi/NaturalKitchen.git
cd NaturalKitchen
# Copy the supplied project files into this folder.
npm ci
npm run build
npm run verify
git add .
git commit -m "Build Natural Kitchen website with on-site menus"
git push origin main
```

If you already have a local clone, use that clone. Review your changes before committing.

## Connect Cloudflare Pages

In Cloudflare, open **Workers & Pages → Create application → Pages → Import an existing Git repository** and choose `calebxlargi/NaturalKitchen`.

| Setting | Value |
| --- | --- |
| Production branch | `main` |
| Framework preset | Next.js (Static HTML Export) |
| Root directory | Repository root; leave blank |
| Build command | `npm run build` |
| Build output directory | `out` |
| Node version | `22` (provided by `.node-version`; alternatively set `NODE_VERSION=22`) |

The project uses `output: "export"` and `trailingSlash: true`. Images are optimized in advance, and fonts are served locally. No image server, Workers adapter, server actions, environment secrets, or runtime API routes are needed.

### Cloudflare Workers Git deployment

Cloudflare may create a **Worker** rather than a Pages project when the deploy command is `npx wrangler deploy`. This repository supports that route too. The committed `wrangler.jsonc` tells Wrangler to run the static build and publish `out` as static assets.

Use this deploy command:

```bash
npx wrangler deploy
```

Do not select or add the OpenNext adapter. OpenNext expects a server build under `.next/standalone`, while this project intentionally produces a static export under `out`.

After the initial connection, pushes to the production branch trigger new builds. Attach `naturalkitchen.co.uk` and `www.naturalkitchen.co.uk` through Cloudflare’s custom-domain settings when you are ready to replace the current website.

Official guide: https://developers.cloudflare.com/pages/framework-guides/nextjs/deploy-a-static-nextjs-site/

## What is included

- Homepage, menu directory, eight dedicated menu pages, restaurant directory, three restaurant pages, booking contacts, our story, catering enquiries, and a custom 404 page.
- 162 menu entries, including entries repeated across their original menus. This is not a count of unique dishes.
- Search within each menu; source-labelled dietary filters; section links; mobile menu picker; visible prices, portion sizes, extras, serving conditions and notices.
- Menus are pre-rendered as real HTML. Visitors do not need to download PDFs or open a PDF viewer.
- Responsive layouts, keyboard navigation, labelled form controls, reduced-motion support, print styles, locally hosted fonts, page metadata, sitemap and robots file.
- A GitHub Actions workflow that builds the project and checks menu data and exported routes.

## Update the menus

Edit **`src/data/menus.json`**, then build and push. This file is the single source of truth for on-site menu content.

Each menu has a title, edition, source filename, introductory text, sections and items. Each item supports:

```json
{
  "name": "Example dish",
  "description": "Ingredients and preparation.",
  "price": 12.5,
  "tags": ["Vegetarian"],
  "extras": ["Optional addition £2.00."]
}
```

For multiple sizes, use `prices` instead of `price`:

```json
{
  "name": "Example sharing dish",
  "prices": [
    { "label": "Regular", "amount": 12.5 },
    { "label": "To share", "amount": 20 }
  ]
}
```

Only apply dietary labels that the restaurant has confirmed. Do not infer allergen suitability from an ingredient list.

The supplied PDFs are retained in `docs/source-menus/` for editorial reference; they are not published in the static export. Text has been converted to sentence case and obvious spelling errors normalized. Prices, variants and terms retain their source-menu context.

When replacing the monthly specials, update its `edition`, `title`, descriptions and entries in `menus.json`. The homepage reads the specials content from this same menu data. If the number of entries changes, update the intentionally fixed source-audit counts in `scripts/verify-content.mjs` after checking the new menu.

## Source details to confirm

1. Both drinks PDFs print the standard smoothie boosts as **“1.25p each”**. The site lists all boost choices with **“Ask our team”** instead of assuming this means £1.25. The acai boost remains £2.75.
2. Squid and Korean chicken have different prices on the main and bar menus. They are deliberately kept separate, including sharing prices.
3. Bananaberry has a different juice description in the drinks menu and the dedicated smoothies menu. Each page retains its own source description.
4. The main-menu soup has no numeric price and points to specials. It is shown with “Ask our team”.
5. The September specials specify a 10% discretionary service charge. Other menus retain their own, more general wording; the percentage is not applied globally.
6. Restaurant contact details and opening hours were taken from the live website on 21 September 2026. Its about page refers to an older venue count; the redesign lists the three venues on the current homepage. Confirm any bank-holiday or later changes before launch.
7. No current kids menu was supplied, so the older kids-menu PDF on the existing site has not been republished. Catering remains an enquiry flow; the eight supplied restaurant menus are fully transcribed.

## Booking and enquiries

The existing website exposes phone and email contacts rather than a booking-provider integration. **Book a table** opens a venue chooser with working telephone and email links. A reservation is not automatically confirmed by the website.

The catering form prepares a draft in the visitor’s email application, which the visitor must review and send. It does not submit to a backend or store personal information. A direct email address is also visible as a fallback.

If an online booking provider or a form delivery service is added later, replace these contact actions with that provider’s verified integration. Existing contacts live in `src/data/restaurants.ts`.

## Main files

| File | Purpose |
| --- | --- |
| `src/data/menus.json` | Complete on-site menus |
| `src/data/restaurants.ts` | Venues, contact details and opening hours |
| `src/app/globals.css` | Responsive design, colours and typography |
| `src/app/page.tsx` | Homepage |
| `src/components/menu-browser.tsx` | Menu search, filters and price display |
| `src/components/catering-enquiry.tsx` | Email-draft enquiry form |
| `public/images/` | Optimized repository photography |
| `next.config.ts` | Cloudflare Pages-compatible static export |
| `scripts/verify-content.mjs` | Source-sensitive menu and build checks |

All visitor-facing photography is local. There are no stock-photo substitutions, remote font requests, tracking scripts or cookies added by this implementation.
