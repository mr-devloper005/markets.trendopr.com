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
    openGraphDescription: 'The story behind TrendoPR.com and how we approach modern press rooms.',
    image: SITE_CONFIG.defaultOgImage,
  })
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#fafafa] text-[#171717]">
      <NavbarShell />
      <main>
        <section className="border-b border-[#ebebeb] bg-white">
          <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#DA0037]">About TrendoPR</p>
            <h1 className="mt-4 max-w-3xl font-[family-name:var(--font-display)] text-4xl font-semibold tracking-[-0.035em] sm:text-5xl">
              A press desk for teams who care about clarity, not clutter.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[#444444]">
              {SITE_CONFIG.name} exists to give communications teams a credible public surface: fast archives, disciplined release
              pages, and pricing that maps to how distribution actually works.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
            <div className="space-y-6 text-sm leading-relaxed text-[#444444]">
              <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-[#171717]">Why we built it</h2>
              <p>
                Most “PR” templates borrow patterns from consumer apps or directories. That mismatch shows up in typography,
                spacing, and navigation—readers feel it instantly. TrendoPR takes cues from wire services and modern SaaS: strong
                hierarchy, generous whitespace, and flows that respect how journalists scan.
              </p>
              <p>
                We bias toward modular surfaces so your team can ship announcements without wrestling a one-off landing page for
                every launch. The same system powers your homepage spotlight, archive filters, and detail pages—so messaging stays
                coherent end to end.
              </p>
            </div>
            <div className="rounded-2xl border border-[#e8e8e8] bg-white p-6 shadow-[0_18px_50px_rgba(23,23,23,0.06)] sm:p-8">
              <h3 className="text-lg font-semibold text-[#171717]">Operating principles</h3>
              <ul className="mt-4 space-y-3 text-sm text-[#444444]">
                <li className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#DA0037]" />
                  Ship readable releases first—decorative chrome second.
                </li>
                <li className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#DA0037]" />
                  Keep archives honest: categories and dates you can trust.
                </li>
                <li className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#DA0037]" />
                  Make pricing explicit so procurement conversations stay grounded.
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="border-t border-[#ebebeb] bg-[#EDEDED] py-14 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-semibold tracking-[-0.02em]">What happens next</h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#444444]">
              Explore the live archive, compare plans, or talk with us about mapping TrendoPR into your existing approval
              workflow—without ripping out the systems your legal team already trusts.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/updates"
                className="inline-flex h-11 items-center justify-center rounded-full bg-[#171717] px-6 text-sm font-semibold text-white hover:bg-black"
              >
                Browse releases
              </Link>
              <Link
                href="/contact"
                className="inline-flex h-11 items-center justify-center rounded-full border border-transparent px-6 text-sm font-semibold text-[#DA0037] hover:underline"
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
