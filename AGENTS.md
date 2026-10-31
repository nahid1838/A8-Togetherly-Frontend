# AGENTS.md

Single-package Next.js 16 landing-page app (`togetherly`) — no monorepo, npm only (use `package-lock.json`; don't introduce pnpm/yarn artifacts).

## Commands

- Dev server: `npm run dev` (Turbopack)
- Lint: `npm run lint` (runs bare `eslint` with flat config in `eslint.config.mjs`)
- Typecheck: `npx tsc --noEmit` — there is **no** typecheck script. It depends on generated `.next/types` (typed routes, e.g. the global `LayoutProps<"/">` used in `src/app/layout.tsx`), so run `npm run build` (or `npm run dev`) at least once first or tsc fails on unknown globals.
- No tests, no formatter, no CI.

## Stack quirks (verify against config, not training data)

- Next.js 16.4.3 + React 19.3. `next.config.ts` enables `cacheComponents`, `partialPrefetching`, and `reactCompiler` (via `babel-plugin-react-compiler`). These change caching/fetching semantics — consult `node_modules/next/dist/docs/` before writing data-fetching or caching code.
- Tailwind CSS v4: no `tailwind.config.*`; all theming lives in `src/app/globals.css` (`@import "tailwindcss"`, `@theme inline` with CSS variables). CSS is loaded by `@tailwindcss/turbopack` via a Turbopack rule in `next.config.ts`.
- shadcn components use style **`base-nova`** (see `components.json`): primitives come from **`@base-ui/react`**, not Radix. Only `@radix-ui/react-slot` is present. Generated UI components import `cn` from the `cn` npm package directly (`import { cn } from "cn"`), not from `@/lib/utils` — follow that convention. New components go through the shadcn CLI (`components.json` aliases: `@/components`, `@/components/ui`, `@/lib`).
- Path alias: `@/*` → `./src/*`.

## Structure

- `src/app/` — App Router entry (`layout.tsx` composes Navbar/Footer; `page.tsx` renders home sections).
- `src/components/home/` — page-section components (HeroSection, EventCategories, ..., Newsletter, Footer), one section per file, stacked in `page.tsx`.
- `src/components/ui/` — shadcn primitives; only add `"use client"` here when the component uses state/refs (existing pattern: interactive primitives are client, sections like HeroSection are server components).

## The nextjs-agent-rules block below is auto-generated

Do not edit, reformat, or remove the block at the bottom. `next dev` writes and re-adds it (see `node_modules/next/dist/server/lib/generate-agent-files.js`); deleting it just creates churn on the next run. Commit it as-is with your work.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
