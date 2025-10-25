import { ArrowUpRight } from "lucide-react";
import {
  Announcement,
  AnnouncementTitle,
} from "@/components/kibo/announcement";
import {
  Glimpse,
  GlimpseContent,
  GlimpseDescription,
  GlimpseImage,
  GlimpseTitle,
  GlimpseTrigger,
} from "@/components/kibo/glimpse";
import { glimpse } from "@/components/kibo/glimpse/server";
import type { GlimpseMetadata } from "@/components/kibo/glimpse/server";
import { ThemeToggle } from "@/components/theme-toggle";

type SocialLink = {
  id: string;
  label: string;
  href: string;
  handle: string;
  fallbackTitle: string;
  fallbackDescription: string;
};

const SOCIAL_LINKS: SocialLink[] = [
  {
    id: "x",
    label: "X",
    href: "https://x.com/refaktor_dev",
    handle: "@refaktor_dev",
    fallbackTitle: "refaktor.dev on X",
    fallbackDescription: "Quick notes on builds, experiments, and shipping logs.",
  },
  {
    id: "github",
    label: "GitHub",
    href: "https://github.com/kik369",
    handle: "@kik369",
    fallbackTitle: "kik369 on GitHub",
    fallbackDescription: "Source for refaktor.dev, prototypes, and data tooling.",
  },
];

const fetchPreview = async (url: string): Promise<GlimpseMetadata> => {
  try {
    return await glimpse(url);
  } catch {
    return {
      title: null,
      description: null,
      image: null,
    };
  }
};

export default async function Home() {
  const previews = await Promise.all(
    SOCIAL_LINKS.map((link) => fetchPreview(link.href))
  );

  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col gap-10 p-6">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Announcement themed className="w-fit px-4 py-3">
          <AnnouncementTitle className="text-lg font-semibold tracking-tight">
            refaktor.dev
          </AnnouncementTitle>
        </Announcement>

        <ThemeToggle />
      </header>

      <section className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          {SOCIAL_LINKS.map((link, index) => {
            const preview = previews[index];
            const title = preview.title ?? link.fallbackTitle;
            const description = preview.description ?? link.fallbackDescription;

            return (
              <Glimpse key={link.id}>
                <GlimpseTrigger asChild>
                  <a
                    className="group flex items-center justify-between rounded-2xl border border-border bg-card px-5 py-4 text-left transition hover:border-foreground hover:bg-card/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    href={link.href}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <div>
                      <span className="text-xs uppercase tracking-wide text-muted-foreground">
                        {link.label}
                      </span>
                      <p className="text-xl font-semibold tracking-tight">
                        {link.handle}
                      </p>
                    </div>
                    <ArrowUpRight className="h-5 w-5 text-muted-foreground transition group-hover:text-foreground" />
                  </a>
                </GlimpseTrigger>
                <GlimpseContent className="w-72 space-y-3">
                  {preview.image ? (
                    <GlimpseImage
                      alt={`${link.label} preview`}
                      src={preview.image}
                    />
                  ) : (
                    <div
                      aria-hidden="true"
                      className="mb-4 h-32 rounded-md border border-dashed border-border/70 bg-muted"
                    />
                  )}
                  <div className="space-y-1">
                    <GlimpseTitle>{title}</GlimpseTitle>
                    <GlimpseDescription>{description}</GlimpseDescription>
                  </div>
                </GlimpseContent>
              </Glimpse>
            );
          })}
        </div>
      </section>
    </main>
  );
}
