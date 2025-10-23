import Link from "next/link";
import {
  Announcement,
  AnnouncementTag,
  AnnouncementTitle,
} from "@/components/kibo/announcement";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

export default function Home() {
  return (
    <main className="mx-auto max-w-3xl p-6">
      <div className="mb-6 flex justify-end">
        <ThemeToggle />
      </div>
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
              href="https://github.com/kik369"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/blog">Blog</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
