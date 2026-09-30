# Relay — Background Job Queue Landing Page Template

A landing page template for developer tools and infrastructure SaaS, built with
Next.js, Tailwind v4, and shadcn/ui. It ships pre-filled with a fictional demo
product — **Relay**, a background job queue — so you're looking at real content
in context instead of lorem ipsum. Swap the demo for your own product and ship.

Dark and light themes, keyboard-accessible throughout, respects
`prefers-reduced-motion`, and the code blocks are syntax-highlighted at build
time with a custom color theme rather than a generic editor theme dropped in.
The "Start free" CTA opens a real waitlist dialog backed by a validated API
route — not a dead link.

## Stack

- **[Next.js](https://nextjs.org)** (App Router, TypeScript)
- **[Tailwind CSS v4](https://tailwindcss.com)** — tokens defined in `@theme`, no config file
- **[shadcn/ui](https://ui.shadcn.com)** on Radix primitives (Button, Card, Tabs, Accordion, Tooltip, Avatar, Navigation Menu, Sonner, Dialog)
- **[Motion](https://motion.dev)** for the restrained scroll-reveal and entrance animation
- **[Shiki](https://shiki.style)** for build-time syntax highlighting
- **[next-themes](https://github.com/pacocoursey/next-themes)** for dark/light mode
- **[Zod](https://zod.dev)** for the waitlist form's shared client/server validation
- **[Vitest](https://vitest.dev)** + **[Playwright](https://playwright.dev)** for unit and end-to-end tests

## Getting started

Requires Node 20.9 or later.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build      # production build
npm run start      # serve the production build
npm run lint       # eslint
npm run test       # unit tests (vitest)
npm run test:e2e   # end-to-end tests (playwright)
npm run analyze    # webpack bundle analyzer report
```

## Project structure

```
src/
  app/
    layout.tsx            # fonts, metadata, theme + motion providers
    page.tsx               # composes the sections, in order
    globals.css              # design tokens (see Colors, below)
    api/waitlist/route.ts    # waitlist signup endpoint
    opengraph-image.tsx      # OG image, generated at build time
    icon.tsx / apple-icon.tsx
  components/
    hero.tsx, trust-bar.tsx, features-grid.tsx, pricing.tsx,
    integration-showcase.tsx, social-proof.tsx, faq.tsx, final-cta.tsx  # sections
    site-header.tsx, site-footer.tsx, mobile-nav.tsx
    copy-install.tsx, code-card.tsx, code-tabs.tsx    # signature pieces
    waitlist-dialog.tsx, waitlist-dialog-content.tsx  # the waitlist form
    ui/                    # shadcn components — generated, edit with care (see below)
  hooks/
    use-waitlist.ts, use-copy-to-clipboard.ts
  lib/
    highlight.ts            # shared Shiki helper
    waitlist-schema.ts       # zod schema shared by the API route and the form
    nav-links.ts
e2e/
  smoke.spec.ts            # Playwright: section rendering, tabs, FAQ, waitlist flow
```

## Customizing

### Swap the demo content

Relay's copy and data live directly in the section components, not in a
separate content file — open the one you're changing and edit the JSX/arrays
in place:

| Section | File |
|---|---|
| Headline, subhead, install command | `src/components/hero.tsx` |
| Trust bar logos and stat line | `src/components/trust-bar.tsx` |
| Feature cards | `src/components/features-grid.tsx` |
| Pricing plans | `src/components/pricing.tsx` |
| Runtime code snippets | `src/components/integration-showcase.tsx` |
| Testimonial quote | `src/components/social-proof.tsx` |
| FAQ questions and answers | `src/components/faq.tsx` |
| Nav links, GitHub star count | `src/lib/nav-links.ts` |
| Footer columns, social links | `src/components/site-footer.tsx` |

Every link that isn't wired to a real destination yet (`Docs`, `GitHub`,
`Discord`, footer links, the Pro/Enterprise pricing CTAs) currently points at
`#` as a placeholder — search for `href="#"` and point them at your real URLs
before shipping.

### The waitlist

`POST /api/waitlist` ([route.ts](src/app/api/waitlist/route.ts)) validates the
submitted email against `waitlistSchema` and records it. It currently keeps
signups in an in-memory `Set` for the life of the process — swap the body of
`recordSignup` for a real sink (an email provider's API, a database insert)
and nothing else in the route, the hook, or the dialog needs to change.

### Colors

Every color in the site is a CSS variable in `src/app/globals.css` — nothing is
hardcoded in components. There are only eight tokens, defined once for light
(`:root`) and once for dark (`.dark`):

```css
--bg                 /* page background */
--surface            /* cards, code blocks, nav-on-scroll */
--border             /* hairline borders and dividers */
--text               /* primary text */
--muted              /* secondary text, captions */
--accent             /* the one accent color — CTAs, links, focus rings */
--accent-fg          /* text/icon color on top of --accent */
--accent-on-surface  /* --accent used as foreground text/stroke on a surface */
```

Change the hex values for these two blocks and the whole site — including
every shadcn component, since they're bridged to the same tokens in the
`@theme inline` block right above — follows. Dark is the default theme
(`defaultTheme="dark"` in `layout.tsx`); flip that if you'd rather default to
light.

The code blocks have their own color theme in `src/lib/shiki-themes.ts`
(`darkCodeTheme` / `lightCodeTheme`) so syntax highlighting matches your
palette instead of shipping a generic editor theme — update the hex values
there to match if you change `--accent`.

### Fonts

Three type roles are wired up in `src/app/layout.tsx` via `next/font/google`:
display (headings), sans (body), and mono (code, eyebrows, labels — used as a
real type role here, not just for `<code>`). To swap one out, change the
import and the font call there, keeping the same `variable` name so
`globals.css`'s `--font-*` tokens keep resolving:

```tsx
const display = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk" });
```

### Adding a section

The shadcn primitives in `src/components/ui/` are generated by the shadcn CLI
— editing them by hand still works, but running `npx shadcn@latest add <component>`
again later will overwrite your changes. Prefer wrapping or extending them
from your own components (see `code-card.tsx` or `copy-install.tsx` for the
pattern) rather than editing `ui/*.tsx` directly, so `shadcn diff`/`add
--overwrite` stay usable if you update later.

## Deploying

Works out of the box on [Vercel](https://vercel.com/new). After your first
deploy, set the `NEXT_PUBLIC_SITE_URL` environment variable to your
production URL and redeploy — it's what the Open Graph image uses to build an
absolute URL, and without it, link previews will point at `localhost`.

## License

MIT — see [LICENSE](./LICENSE). Use it, modify it, ship it, no attribution required.
