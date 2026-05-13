import Link from 'next/link'
import { SITE_CONFIG } from '@/lib/site-config'
import { siteContent } from '@/config/site.content'

export const FOOTER_OVERRIDE_ENABLED = true

export function FooterOverride() {
  const primary = SITE_CONFIG.tasks.find((t) => t.enabled)

  return (
    <footer className="border-t border-[#2a2a2a] bg-[#171717] text-white">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-lg font-semibold">{SITE_CONFIG.name}</p>
            <p className="mt-2 text-xs font-semibold uppercase tracking-[0.22em] text-white/50">{siteContent.footer.tagline}</p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/70">{SITE_CONFIG.description}</p>
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-white/50">Product</h3>
            <ul className="mt-4 space-y-3 text-sm text-white/80">
              {primary ? (
                <li>
                  <Link href={primary.route} className="hover:text-white">
                    {primary.label}
                  </Link>
                </li>
              ) : null}
              <li>
                <Link href="/search" className="hover:text-white">
                  Search archive
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-white/50">Company</h3>
            <ul className="mt-4 space-y-3 text-sm text-white/80">
              <li>
                <Link href="/about" className="hover:text-white">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-white/50">Legal</h3>
            <ul className="mt-4 space-y-3 text-sm text-white/80">
              <li>
                <Link href="/privacy" className="hover:text-white">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white">
                  Terms
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="hover:text-white">
                  Cookies
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-8 text-sm text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.</p>
          <p className="text-white/45">Distribution tools for modern communications teams.</p>
        </div>
      </div>
    </footer>
  )
}
