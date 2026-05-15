import Link from 'next/link'
import { Newspaper, Twitter, Linkedin, Facebook, Mail } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { siteContent } from '@/config/site.content'

export const FOOTER_OVERRIDE_ENABLED = true

const categories = [
  { label: 'Business', href: '/updates?category=business' },
  { label: 'Technology', href: '/updates?category=technology' },
  { label: 'Finance', href: '/updates?category=finance' },
  { label: 'Healthcare', href: '/updates?category=healthcare' },
  { label: 'Energy', href: '/updates?category=energy' },
  { label: 'Policy', href: '/updates?category=policy' },
]

const socialLinks = [
  { name: 'Twitter / X', href: 'https://twitter.com', icon: Twitter },
  { name: 'LinkedIn', href: 'https://linkedin.com', icon: Linkedin },
  { name: 'Facebook', href: 'https://facebook.com', icon: Facebook },
  { name: 'Newsletter', href: '/newsletter', icon: Mail },
]

export function FooterOverride() {
  const primary = SITE_CONFIG.tasks.find((t) => t.enabled)

  return (
    <footer className="border-t border-[#843B62]/20 bg-[#0B032D] text-white">
      {/* top gradient accent */}
      <div className="h-1 w-full bg-gradient-to-r from-[#843B62] via-[#F67E7D] to-[#FFB997]" />

      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* Brand column */}
          <div>
            <Link href="/" className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#843B62] to-[#F67E7D]">
                <Newspaper className="h-5 w-5 text-white" />
              </span>
              <span className="text-lg font-semibold">{SITE_CONFIG.name}</span>
            </Link>
            <p className="mt-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#FFB997]/60">{siteContent.footer.tagline}</p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/60">{SITE_CONFIG.description}</p>

            {/* Social links */}
            <div className="mt-6 flex gap-2">
              {socialLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.name}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/60 transition hover:border-[#F67E7D]/40 hover:bg-[#843B62]/20 hover:text-[#FFB997]"
                >
                  <item.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-[#FFB997]/70">Topics</h3>
            <ul className="mt-4 space-y-3 text-sm text-white/65">
              {categories.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="transition hover:text-[#FFB997]">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
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
              <li><Link href="/create/mediaDistribution" className="transition hover:text-[#FFB997]">Submit a release</Link></li>
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
          <p className="text-white/30">Distribution tools for modern communications teams.</p>
        </div>
      </div>
    </footer>
  )
}
