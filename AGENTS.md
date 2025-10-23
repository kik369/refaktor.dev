# agents.md

## Purpose

This document instructs an AI agent how to build and maintain Kris’s personal website using the agreed stack. Treat this as the single source of truth for architecture, tooling, conventions, and constraints.

## Project snapshot

- **Framework**: Next.js (App Router) with TypeScript
- **Styling**: Tailwind CSS using **shadcn/ui** in CSS variables mode
- **UI extensions**: **Kibo UI** components layered on top of shadcn/ui
- **Icons**: lucide-react
- **Animation**: framer-motion (only when needed)
- **Package manager**: pnpm
- **Lint/format**: ESLint, Prettier, prettier-plugin-tailwindcss
- **Targets**: Static or serverless on Vercel
- **Node**: ≥ 18
- **Browser support**: Evergreen browsers

## Non-goals

- No database, auth, or CMS in the initial version
- No server state libraries
- No CSS-in-JS libraries

## Directory contract

- `app/` Next.js App Router pages
- `components/ui/` shadcn/ui primitives (owned, editable)
- `components/kibo/` Kibo UI components (owned, editable)
- `lib/` utilities (`utils.ts` from shadcn, helpers)
- `styles/` `globals.css` only
- `public/` static assets

Keep import alias `@/*` pointing to project root.

## Theming and tokens

- Use shadcn/ui **CSS variables** mode. Do not switch to class mode.
- Define tokens in `globals.css` under `:root` and `.dark`.
- Dark mode optional; if added, use `next-themes` and a ThemeProvider.

## UI policy

- Prefer **shadcn/ui** primitives for buttons, inputs, cards, menus.
- Use **Kibo UI** for higher level blocks (announcements, complex layouts).
- Components are **copied into the repo** and may be edited. Follow Tailwind utility approach, no external design system added.

## Accessibility

- Use semantic HTML and Radix primitives from shadcn components.
- Provide meaningful `alt` text for images.
- Maintain focus states; never remove outlines without replacement.
- Ensure colour contrast meets WCAG AA.

## Performance

- Favour server components by default.
- Mark components with `use client` only when interactive.
- Use `next/image` and `next/link`.
- Lazy load heavy client components with `dynamic(() => import(...))`.

## SEO

- Use the `metadata` export in `app/layout.tsx` and `app/page.tsx`.
- Add `robots.txt` and `sitemap.xml` later via `next-sitemap` if required.
- Set Open Graph and Twitter tags in `metadata`.

## Content and links

- Show links to GitHub, projects, and a short bio on the home page.
- Blog is optional later; do not scaffold MDX in v1 unless asked.

## Coding conventions

- TypeScript strict mode on.
- Use named exports where practical.
- Keep components small and composable. Split when files exceed 200 lines.
- Use `clsx` and `tailwind-merge` helpers from `lib/utils.ts`.
- Prettier handles formatting. Do not commit code that fails lint or format.

## Dependency constraints

- Allowed: next, react, tailwindcss, postcss, autoprefixer, lucide-react, framer-motion (optional), next-themes (optional), class-variance-authority (from shadcn), tailwind-merge, clsx.
- Do not add state managers, CSS-in-JS, or UI kits outside shadcn/Kibo.

## Git policy

- One logical change per commit, with clear messages.
- Do not commit `.env*` or build artefacts.

## Commands cheat sheet

- Dev: `pnpm dev`
- Build: `pnpm build`
- Lint: `pnpm lint`
- Format: `pnpm prettier --write .`
- Add shadcn component: `pnpm dlx shadcn@latest add <name>`
- Add Kibo component: `npx kibo-ui add <name>`

### Suggested initial components

- shadcn: `button`, `card`, `navigation-menu`, `avatar`, `badge`
- Kibo: `announcement` (for top banner)

## Acceptance checklist (Definition of Done v1)

- Home page renders with hero, short bio, and two buttons linking to GitHub and a future blog route.
- Uses at least one shadcn component and one Kibo component.
- Passes `pnpm lint` and `pnpm build`.
- No client components unless needed.
- Lighthouse score in dev for Performance ≥ 90, Accessibility ≥ 95, SEO ≥ 90.
