import Link from 'next/link'
import type { Metadata } from 'next'
import { Check } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { SITE_CONFIG } from '@/lib/site-config'
import { buildPageMetadata } from '@/lib/seo'

export const revalidate = 3600

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    path: '/pricing',
    title: `Pricing | ${SITE_CONFIG.name}`,
    description: 'Compare Basic, Pro, and Premium press distribution on TrendoPR.com.',
    openGraphTitle: `Pricing | ${SITE_CONFIG.name}`,
    openGraphDescription: 'Transparent tiers for distribution depth, analytics, and add-ons.',
    image: SITE_CONFIG.defaultOgImage,
    keywords: ['press release pricing', 'distribution plans', 'TrendoPR'],
  })
}

const tiers = [
  {
    name: 'Basic',
    price: '$199',
    cadence: 'per month',
    blurb: 'Foundational distribution for lean teams publishing a steady cadence of updates.',
    popular: false,
    features: ['Standard wire formatting', 'Public archive & search', 'Category tagging', 'Email capture on detail pages'],
  },
  {
    name: 'Pro',
    price: '$449',
    cadence: 'per month',
    blurb: 'The balanced plan for communications teams coordinating launches across regions.',
    popular: true,
    features: [
      'Everything in Basic',
      'Deeper analytics snapshots',
      'Priority rendering in archive grids',
      'Secondary hero imagery slot',
      'Quarterly coverage review call',
    ],
  },
  {
    name: 'Premium',
    price: 'Custom',
    cadence: 'annual agreement',
    blurb: 'Enterprise distribution with bespoke routing, governance, and success oversight.',
    popular: false,
    features: [
      'Everything in Pro',
      'Named distribution strategist',
      'Custom media lists & regions',
      'Embargo scheduling windows',
      'SLA-backed support',
    ],
  },
]

const comparison = [
  { label: 'Distribution depth', basic: 'Standard', pro: 'Elevated', premium: 'Custom routing' },
  { label: 'Analytics', basic: 'Core', pro: 'Advanced', premium: 'Executive dashboards' },
  { label: 'Media reach', basic: 'Organic archive', pro: 'Boosted surfaces', premium: 'Programmatic extensions' },
]

const addOns = [
  { title: 'Extra regional pack', body: 'Add another geography or language bundle without changing your base tier.' },
  { title: 'Crisis comms runbook', body: 'Pre-approved templates and fast-lane review for sensitive disclosures.' },
  { title: 'Data room PDF sync', body: 'Attach investor-ready PDFs with version control on the release detail page.' },
]

const faqs = [
  {
    q: 'Can we switch tiers mid-cycle?',
    a: 'Yes. Upgrades take effect immediately; downgrades align with your next invoice window so teams keep continuity.',
  },
  {
    q: 'Do you offer annual discounts?',
    a: 'Annual agreements include two months complimentary on Pro when prepaid, and bespoke incentives on Premium.',
  },
  {
    q: 'How does analytics differ between plans?',
    a: 'Basic shows archive engagement, Pro adds trend snapshots and referrer context, Premium layers executive rollups.',
  },
  {
    q: 'What counts as a seat?',
    a: 'Seats map to authenticated publishers who can draft or approve releases. Viewers can stay read-only without consuming seats.',
  },
]

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[#fafafa] text-[#171717]">
      <NavbarShell />
      <main>
        <section className="border-b border-[#ebebeb] bg-[linear-gradient(180deg,#ffffff_0%,#f4f4f4_100%)]">
          <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#DA0037]">Plans &amp; packaging</p>
            <h1 className="mt-4 max-w-3xl font-[family-name:var(--font-display)] text-4xl font-semibold tracking-[-0.035em] sm:text-5xl">
              Pricing built around distribution depth—not surprise limits.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[#444444]">
              Choose the lane that matches your publishing tempo. Every tier includes the TrendoPR archive, responsive release
              pages, and share tooling—so you are never buying a hollow skeleton tier.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
          <div className="grid gap-6 lg:grid-cols-3">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={`relative flex flex-col rounded-2xl border bg-white p-7 shadow-[0_18px_50px_rgba(23,23,23,0.06)] ${
                  tier.popular ? 'border-[#DA0037] ring-2 ring-[#DA0037]/25' : 'border-[#e5e5e5]'
                }`}
              >
                {tier.popular ? (
                  <span className="absolute -top-3 left-6 rounded-full bg-[#DA0037] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-white">
                    Most popular
                  </span>
                ) : null}
                <h2 className="text-xl font-semibold">{tier.name}</h2>
                <p className="mt-3 text-sm text-[#444444]">{tier.blurb}</p>
                <div className="mt-6 flex items-baseline gap-2">
                  <span className="text-4xl font-semibold tracking-tight">{tier.price}</span>
                  <span className="text-sm text-[#444444]">{tier.cadence}</span>
                </div>
                <ul className="mt-8 flex-1 space-y-3 text-sm text-[#444444]">
                  {tier.features.map((f) => (
                    <li key={f} className="flex gap-2">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#DA0037]" aria-hidden />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className={`mt-8 inline-flex h-11 items-center justify-center rounded-full px-5 text-sm font-semibold transition ${
                    tier.popular
                      ? 'bg-[#DA0037] text-white hover:bg-[#b8002d]'
                      : 'border border-[#171717] text-[#171717] hover:bg-[#171717] hover:text-white'
                  }`}
                >
                  Talk to sales
                </Link>
              </div>
            ))}
          </div>
        </section>

        <section className="border-y border-[#ebebeb] bg-white py-14 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-semibold tracking-[-0.02em]">Feature comparison</h2>
            <p className="mt-2 text-sm text-[#444444]">Distribution level, analytics, and reach—side by side.</p>
            <div className="mt-8 overflow-x-auto rounded-2xl border border-[#e8e8e8]">
              <table className="min-w-full divide-y divide-[#e8e8e8] text-left text-sm">
                <thead className="bg-[#fafafa] text-[11px] font-semibold uppercase tracking-[0.18em] text-[#444444]">
                  <tr>
                    <th className="px-4 py-3 sm:px-6">Capability</th>
                    <th className="px-4 py-3 sm:px-6">Basic</th>
                    <th className="px-4 py-3 sm:px-6">Pro</th>
                    <th className="px-4 py-3 sm:px-6">Premium</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#ededed] bg-white text-[#444444]">
                  {comparison.map((row) => (
                    <tr key={row.label}>
                      <td className="px-4 py-4 font-medium text-[#171717] sm:px-6">{row.label}</td>
                      <td className="px-4 py-4 sm:px-6">{row.basic}</td>
                      <td className="px-4 py-4 sm:px-6">{row.pro}</td>
                      <td className="px-4 py-4 sm:px-6">{row.premium}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="bg-[#EDEDED] py-14 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-semibold tracking-[-0.02em]">Add-ons</h2>
            <p className="mt-2 max-w-2xl text-sm text-[#444444]">Extend any tier with focused bundles—priced during onboarding.</p>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {addOns.map((item) => (
                <div key={item.title} className="rounded-2xl border border-[#dcdcdc] bg-white p-6 shadow-sm">
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#444444]">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
          <h2 className="text-2xl font-semibold tracking-[-0.02em]">FAQ</h2>
          <p className="mt-2 text-sm text-[#444444]">Straight answers about how TrendoPR plans behave in production.</p>
          <div className="mt-8 space-y-3">
            {faqs.map((item) => (
              <details
                key={item.q}
                className="group rounded-2xl border border-[#e8e8e8] bg-white px-4 open:shadow-sm sm:px-5"
              >
                <summary className="cursor-pointer list-none py-4 text-base font-semibold text-[#171717] marker:content-none [&::-webkit-details-marker]:hidden">
                  <span className="flex items-center justify-between gap-3">
                    {item.q}
                    <span className="text-[#444444] transition group-open:rotate-180">⌄</span>
                  </span>
                </summary>
                <p className="pb-4 text-sm leading-relaxed text-[#444444]">{item.a}</p>
              </details>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
