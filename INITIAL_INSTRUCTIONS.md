These steps create a working Next.js site with Tailwind, shadcn/ui, and Kibo UI. Follow in order. All commands use **pnpm**.

## 0) Prerequisites

- Node 18 or newer: `node -v`
- pnpm: `corepack enable && corepack prepare pnpm@latest --activate`
- Git: `git --version`

## 1) Create project

```bash
mkdir kris-site && cd kris-site
git init
pnpm create next-app@latest . --typescript --eslint --tailwind --app --import-alias "@/*" --no-src-dir
```

This scaffolds Next.js with Tailwind and TypeScript using the App Router.

## 2) Install baseline tools

```bash
pnpm add -D prettier prettier-plugin-tailwindcss
```

Add a `.prettierrc`:

```json
{
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

## 3) Initialise shadcn/ui (CSS variables mode)

```bash
pnpm dlx shadcn@latest init
```

When prompted:

- Framework: Next.js
- Style: Default
- Base colour: leave default or choose Slate
- Use CSS variables: **Yes** (required)
- Components path: `components` (default)

This adds `components.json`, updates Tailwind config, and writes `lib/utils.ts`.

## 4) Add core shadcn components

```bash
pnpm dlx shadcn@latest add button card navigation-menu avatar badge
```

Verify new files under `components/ui/*`.

## 5) Install shared helpers used by shadcn utils (if not already present)

```bash
pnpm add clsx tailwind-merge
```

## 6) Add Kibo UI components

Kibo layers on top of shadcn. Add at least one high level block.

```bash
npx kibo-ui add announcement
```

Kibo will create files under `components/kibo/` (path may vary). Keep these under version control.

## 7) Optional dark mode support

If you want a theme toggle later:

```bash
pnpm add next-themes
```

Create `components/theme-provider.tsx` later when needed. Not required for first render.

## 8) Home page scaffold

Create or replace `app/page.tsx`:

```tsx
import { Button } from "@/components/ui/button";
import {
  Announcement,
  AnnouncementTag,
  AnnouncementTitle,
} from "@/components/kibo/announcement";

export default function Home() {
  return (
    <main className="mx-auto max-w-3xl p-6">
      <Announcement>
        <AnnouncementTag>Now live</AnnouncementTag>
        <AnnouncementTitle>
          Kris Kringelis • data and software projects
        </AnnouncementTitle>
      </Announcement>

      <section className="mt-8 space-y-4">
        <h1 className="text-3xl font-semibold tracking-tight">
          Hello, I am Kris
        </h1>
        <p className="text-muted-foreground">
          Data analyst and software developer. Explore my work and GitHub.
        </p>
        <div className="flex gap-3">
          <Button asChild>
            <a
              href="https://github.com/your-handle"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
          </Button>
          <Button variant="outline" asChild>
            <a href="/blog">Blog</a>
          </Button>
        </div>
      </section>
    </main>
  );
}
```

## 9) Global styles check

Ensure `styles/globals.css` contains Tailwind layers and shadcn variables. The shadcn init writes these. It should include:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
/* :root and .dark variable blocks should be present here */
```

## 10) Verify Tailwind config

`tailwind.config.ts` must include the content paths for App Router and components:

```ts
content: [
  "./app/**/*.{ts,tsx}",
  "./components/**/*.{ts,tsx}",
  "./pages/**/*.{ts,tsx}",
];
```

Ensure the `tailwindcss-animate` plugin entry exists if added by shadcn.

## 11) Run locally

```bash
pnpm install
pnpm dev
```

Open `http://localhost:3000` and confirm:

- Announcement banner displays
- Heading, paragraph, and two buttons render
- No TypeScript or console errors

## 12) Lint, format, and build

```bash
pnpm lint
pnpm prettier --write .
pnpm build
```

## 13) Commit

```bash
git add -A
git commit -m "feat: scaffold Next.js site with Tailwind, shadcn/ui, and Kibo UI; add homepage"
```

## 14) Deploy to Vercel (optional)

- Push to GitHub
- Import the repo in Vercel
- Build command: `next build`
- Output: default

## Troubleshooting

- If `kibo-ui add` fails, ensure shadcn is in **CSS variables** mode and Tailwind is configured. Re-run `pnpm dlx shadcn@latest init`.
- If styles look wrong, confirm `globals.css` contains the shadcn variable blocks and that the file is imported in `app/layout.tsx`.
- If components cannot be imported, confirm their file paths under `components/ui/*` and `components/kibo/*`.

## Next steps (later)

- Add `metadata` in `app/layout.tsx` for SEO
- Add a `/projects` page and a basic `/blog` stub
- Add a simple contact link or mailto
