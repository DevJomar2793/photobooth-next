import Link from "next/link";
import type { ReactNode } from "react";

type PageName = "home" | "gallery" | "about";

interface SchoolBoothLayoutProps {
  activePage: PageName;
  children: ReactNode;
  footer?: ReactNode;
}

const pages: { name: PageName; href: string; label: string }[] = [
  { name: "home", href: "/", label: "Home" },
  { name: "gallery", href: "/gallery", label: "Gallery" },
  { name: "about", href: "/about", label: "About" },
];

export default function SchoolBoothLayout({
  activePage,
  children,
  footer,
}: SchoolBoothLayoutProps) {
  const isHome = activePage === "home";

  return (
    <main className="min-h-dvh overflow-hidden bg-[#fdfdff] text-[#09245a] lg:flex lg:h-dvh lg:flex-col">
      <header
        className={`mx-auto flex w-full max-w-[1600px] shrink-0 items-center justify-between px-6 sm:px-10 ${isHome ? "py-6 lg:px-16 lg:py-5" : "border-b border-[#dbeaff] py-5 lg:px-14"}`}
      >
        <Link
          href="/"
          className="flex items-center gap-3"
          aria-label="School Booth home"
        >
          <span
            className={`flex size-12 items-center justify-center rounded-xl bg-[#09265c] text-2xl text-white ${isHome ? "shadow-lg shadow-blue-950/10 sm:size-14" : ""}`}
          >
            ◉
          </span>
          <span>
            <strong className="block text-xl font-black tracking-[-0.07em] sm:text-2xl">
              SCHOOL BOOTH
            </strong>
            {!isHome && (
              <small className="hidden font-bold tracking-[0.12em] text-[#536797] sm:block">
                SNAP • SMILE • CREATE MEMORIES
              </small>
            )}
          </span>
        </Link>

        <nav
          className={`hidden items-center md:flex ${isHome ? "gap-3 text-lg font-semibold text-[#576a99]" : "gap-4 text-lg font-bold text-[#586b9a]"}`}
          aria-label="Main navigation"
        >
          {pages.map((page) => (
            <Link
              key={page.name}
              href={page.href}
              className={`rounded-full transition hover:bg-blue-50 hover:text-[#09245a] ${activePage === page.name ? "bg-[#dbeeff] text-[#09245a]" : ""} ${isHome && activePage === page.name ? "px-8 py-3" : isHome ? "px-6 py-3" : activePage === page.name ? "px-8 py-3" : "px-7 py-3"}`}
            >
              {page.label}
            </Link>
          ))}
        </nav>

        {!isHome && (
          <Link
            href="/"
            className="rounded-xl border border-[#c8e0ff] bg-[#eef7ff] px-4 py-3 font-bold text-[#09245a] shadow-sm transition hover:bg-[#dbeeff] sm:px-6"
          >
            ↪ <span className="hidden sm:inline">Exit Booth</span>
          </Link>
        )}
      </header>

      {children}

      {footer ?? (
        <footer className="relative mt-8 bg-[#eaf5ff] px-6 py-8 text-sm text-[#5870a7] sm:px-10 lg:mt-0 lg:shrink-0 lg:px-14">
          <svg
            className="absolute inset-x-0 top-0 h-8 w-full -translate-y-px fill-[#fdfdff]"
            viewBox="0 0 1440 80"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path d="M0 0v41c187 62 369 42 539 17 214-31 364 35 545 9 154-22 239-42 356-18V0H0Z" />
          </svg>
          <div className="mx-auto flex max-w-[1600px] flex-col justify-between gap-3 pt-2 sm:flex-row">
            <p>
              © 2026 <strong>DevJomar</strong>. All rights reserved.
            </p>
            <p>Capture Good Vibes! ♥</p>
          </div>
        </footer>
      )}
    </main>
  );
}
