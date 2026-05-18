'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { cn } from '@/lib/utils'

export const NAVBAR_OVERRIDE_ENABLED = true

const menuItems = [
  { label: 'About', href: '/about' },
  { label: 'Releases', href: '/press-release' },
  { label: 'Help', href: '/help' },
  // { label: 'Company', href: '/contact' },
]

export function NavbarOverride() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-[#f4f4f4]/95 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <div className="h-10 w-10 overflow-hidden rounded-xl border border-black/10 bg-white p-1 shadow-sm">
            <img src="/favicon.png?v=20260401" alt={`${SITE_CONFIG.name} logo`} className="h-full w-full object-contain" />
          </div>
          <span className="text-3xl font-semibold tracking-[-0.03em] text-[#0a1633]">{SITE_CONFIG.name}</span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {menuItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  'inline-flex items-center gap-1 text-[17px] font-semibold transition-colors',
                  isActive ? 'text-[#0a1633]' : 'text-[#0a1633]/80 hover:text-[#0a1633]'
                )}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="/contact"
            className="inline-flex h-11 items-center rounded-xl bg-[#2a66e5] px-6 text-sm font-semibold text-white transition hover:bg-[#1f55c9]"
          >
            Book a Demo
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex rounded-lg p-2 text-[#0a1633] lg:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-black/10 bg-[#f4f4f4] px-4 py-4 lg:hidden">
          <div className="flex flex-col gap-1">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-base font-semibold text-[#0a1633] hover:bg-white"
              >
                {item.label}
              </Link>
            ))}
            <div className="my-2 h-px bg-black/10" />
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="rounded-lg bg-[#2a66e5] px-3 py-3 text-center text-sm font-semibold text-white"
            >
              Book a Demo
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  )
}
