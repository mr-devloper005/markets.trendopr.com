import Link from 'next/link'
import type { Metadata } from 'next'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { SITE_CONFIG } from '@/lib/site-config'
import { buildPageMetadata } from '@/lib/seo'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    path: '/about',
    title: `About | ${SITE_CONFIG.name}`,
    description: `Learn how ${SITE_CONFIG.name} supports disciplined press distribution and editorial-grade releases.`,
    openGraphTitle: `About | ${SITE_CONFIG.name}`,
    openGraphDescription: 'The story behind markets.trendopr.com and how we approach modern press rooms.',
    image: SITE_CONFIG.defaultOgImage,
  })
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#eef1f7] text-[#0a1633]">
      <NavbarShell />
      <main>
        <section className="border-b border-[#d5dced] bg-[linear-gradient(180deg,#1f2557_0%,#232b66_100%)] text-white">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#a9bfff]">About {SITE_CONFIG.name}</p>
            <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-[-0.04em] sm:text-5xl lg:text-6xl">
              An independent newsroom surface for modern press communication.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-white/78">
              {SITE_CONFIG.name} is designed for announcements that need trust, speed, and permanence. We help teams publish releases in a format that readers, editors, and search engines can scan in seconds.
            </p>
            <div className="mt-8 grid max-w-4xl gap-3 sm:grid-cols-3">
              {[
                ['Desk first', 'Editorial structure over marketing clutter'],
                ['Fast publish', 'Clear workflow from draft to release'],
                ['Permanent archive', 'Searchable history by date and category'],
              ].map(([title, text]) => (
                <div key={title} className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur">
                  <p className="text-sm font-semibold">{title}</p>
                  <p className="mt-1 text-xs text-white/75">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
            <div className="space-y-6 text-[15px] leading-relaxed text-[#1d2b52]/80">
              <h2 className="text-3xl font-semibold tracking-[-0.03em] text-[#0a1633]">Why this newsroom exists</h2>
              <p>
                Most press portals either look like ad-heavy blogs or rigid corporate pages. We built this desk to keep a middle path: fast publication, clean hierarchy, and disciplined categorization that respects how news is consumed.
              </p>
              <p>
                Every release is treated as a record: headline, summary, topic, and timestamp in a consistent format. That consistency improves discoverability and helps editorial teams avoid reinventing layout for every update.
              </p>
            </div>
            <div className="rounded-2xl border border-[#d5dced] bg-white p-6 shadow-[0_18px_50px_rgba(10,22,51,0.08)] sm:p-8">
              <h3 className="text-lg font-semibold text-[#0a1633]">Editorial standards we follow</h3>
              <ul className="mt-4 space-y-3 text-sm text-[#1d2b52]/75">
                <li className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#2a66e5]" />
                  Verification-first publishing with clear source ownership.
                </li>
                <li className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#4a7fff]" />
                  Date and category metadata that remain consistent in archives.
                </li>
                <li className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#6c97ff]" />
                  Reader-first formatting optimized for fast scanning on every device.
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-[#d5dced] bg-white p-7 shadow-sm sm:p-9">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#2a66e5]">How our desk works</p>
            <div className="mt-5 grid gap-4 md:grid-cols-3">
              {[
                ['1. Intake', 'Teams submit official statements with clear category and context.'],
                ['2. Editorial Pass', 'Structure is checked for readability, tone, and publish readiness.'],
                ['3. Distribution', 'Release goes live to the archive and becomes share-ready instantly.'],
              ].map(([title, text]) => (
                <div key={title} className="rounded-2xl border border-[#e1e6f4] bg-[#f6f8ff] p-5">
                  <h3 className="text-lg font-semibold text-[#0a1633]">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#1d2b52]/72">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-[#d5dced] bg-[linear-gradient(180deg,#1f2557_0%,#232b66_100%)] py-14 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-semibold tracking-[-0.03em] text-white">Work with a newsroom built for announcements</h2>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-white/75">
              Browse live releases, publish your next company update, or connect with us to streamline your editorial and PR workflow.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/press-release"
                className="inline-flex h-11 items-center justify-center rounded-lg bg-[#2a66e5] px-6 text-sm font-semibold text-white transition hover:bg-[#1f55c9]"
              >
                Browse Releases
              </Link>
              <Link
                href="/contact"
                className="inline-flex h-11 items-center justify-center rounded-lg border border-white/30 px-6 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Contact
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
