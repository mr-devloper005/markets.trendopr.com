import Link from 'next/link'
import { SITE_CONFIG } from '@/lib/site-config'
import { siteContent } from '@/config/site.content'

export const FOOTER_OVERRIDE_ENABLED = true

export function FooterOverride() {
  const primary = SITE_CONFIG.tasks.find((t) => t.enabled)

  return (
    <footer className="border-t border-[#843B62]/20 bg-[#0B032D] text-white">
      {/* top gradient accent */}
      <div className="h-1 w-full bg-gradient-to-r from-[#843B62] via-[#F67E7D] to-[#FFB997]" />

      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr]">
          {/* Brand column */}
          <div>
            <Link href="/" className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl border border-white/15 bg-white p-1">
                <img src="/favicon.png?v=20260401" alt={`${SITE_CONFIG.name} logo`} className="h-full w-full object-contain" />
              </span>
              <span className="text-lg font-semibold">{SITE_CONFIG.name}</span>
            </Link>
            <p className="mt-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#FFB997]/60">{siteContent.footer.tagline}</p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/60">{SITE_CONFIG.description}</p>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-[#FFB997]/70">Product</h3>
            <ul className="mt-4 space-y-3 text-sm text-white/65">
              {primary ? (
                <li>
                  <Link href={primary.route} className="transition hover:text-[#FFB997]">
                    {primary.label}
                  </Link>
                </li>
              ) : null}
              <li><Link href="/search" className="transition hover:text-[#FFB997]">Search archive</Link></li>
              <li><Link href="/create/mediaDistribution" className="transition hover:text-[#FFB997]"></Link></li>
            </ul>
          </div>

          {/* Company + Legal */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-[#FFB997]/70">Company</h3>
            <ul className="mt-4 space-y-3 text-sm text-white/65">
              <li><Link href="/about" className="transition hover:text-[#FFB997]">About</Link></li>
              <li><Link href="/contact" className="transition hover:text-[#FFB997]">Contact</Link></li>
            </ul>
            <h3 className="mt-8 text-xs font-semibold uppercase tracking-[0.22em] text-[#FFB997]/70">Legal</h3>
            <ul className="mt-4 space-y-3 text-sm text-white/65">
              <li><Link href="/privacy" className="transition hover:text-[#FFB997]">Privacy</Link></li>
              <li><Link href="/terms" className="transition hover:text-[#FFB997]">Terms</Link></li>
              <li><Link href="/cookies" className="transition hover:text-[#FFB997]">Cookies</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/8 pt-8 text-sm text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.</p>
          <p className="text-white/30"></p>
        </div>
      </div>
    </footer>
  )
}
