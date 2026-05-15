'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, Search, X, Newspaper } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { cn } from '@/lib/utils'

export const NAVBAR_OVERRIDE_ENABLED = true

const primary = SITE_CONFIG.tasks.find((t) => t.enabled)?.route || '/updates'

const navSecondary = [
  { label: 'Latest wire', href: '/updates' },
  { label: 'Business', href: '/updates?category=business' },
  { label: 'Technology', href: '/updates?category=technology' },
  { label: 'Finance', href: '/updates?category=finance' },
  { label: 'Healthcare', href: '/updates?category=healthcare' },
]

export function NavbarOverride() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Top bar */}
      <div className="border-b border-[#f0d8cc] bg-white/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <Link href="/" className="flex min-w-0 items-center gap-3" onClick={() => setOpen(false)}>
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#843B62] to-[#F67E7D] shadow-sm">
              <Newspaper className="h-5 w-5 text-white" />
            </span>
            <div className="min-w-0 hidden sm:block">
              <span className="block truncate text-lg font-semibold tracking-tight text-[#0B032D]">{SITE_CONFIG.name}</span>
              <span className="block text-[10px] uppercase tracking-[0.22em] text-[#843B62]/70">Press Release Hub</span>
            </div>
          </Link>

          <div className="hidden flex-1 items-center justify-end gap-1 md:flex">
            <Link
              href="/updates"
              className={cn(
                'rounded-full px-3 py-2 text-sm font-semibold transition',
                pathname.startsWith('/updates')
                  ? 'bg-[#843B62]/10 text-[#843B62]'
                  : 'text-[#3d2a4a]/70 hover:bg-[#fce8df] hover:text-[#0B032D]',
              )}
            >
              Release media
            </Link>
            <Link
              href="/about"
              className={cn(
                'rounded-full px-3 py-2 text-sm font-semibold transition',
                pathname === '/about'
                  ? 'bg-[#843B62]/10 text-[#843B62]'
                  : 'text-[#3d2a4a]/70 hover:bg-[#fce8df] hover:text-[#0B032D]',
              )}
            >
              About
            </Link>
            <Link
              href="/contact"
              className={cn(
                'rounded-full px-3 py-2 text-sm font-semibold transition',
                pathname === '/contact'
                  ? 'bg-[#843B62]/10 text-[#843B62]'
                  : 'text-[#3d2a4a]/70 hover:bg-[#fce8df] hover:text-[#0B032D]',
              )}
            >
              Contact
            </Link>
            <Link
              href="/search"
              className="rounded-full p-2 text-[#3d2a4a]/70 transition hover:bg-[#fce8df] hover:text-[#0B032D]"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </Link>
            <div className="mx-2 h-5 w-px bg-[#f0d8cc]" />
            <Link
              href="/login"
              className="rounded-full px-4 py-2 text-sm font-semibold text-[#3d2a4a]/70 transition hover:text-[#0B032D]"
            >
              Sign in
            </Link>
            <Link
              href="/register"
              className="rounded-full border border-[#843B62]/30 px-4 py-2 text-sm font-semibold text-[#843B62] transition hover:border-[#843B62] hover:bg-[#843B62]/5"
            >
              Create account
            </Link>
            <Link
              href="/create/mediaDistribution"
              className="rounded-full bg-gradient-to-r from-[#843B62] to-[#F67E7D] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:opacity-90"
            >
              Submit release
            </Link>
          </div>

          <button
            type="button"
            className="inline-flex rounded-full p-2 text-[#0B032D] md:hidden"
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Category bar */}
      <div className="hidden border-b border-[#843B62]/20 bg-[#0B032D] md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2.5 sm:px-6 lg:px-8">
          <nav className="flex flex-wrap gap-x-6 gap-y-1 text-[13px] font-medium">
            {navSecondary.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'transition',
                  pathname === item.href || (item.href !== '/updates' && pathname.includes(item.href.split('?')[0]))
                    ? 'text-[#FFB997]'
                    : 'text-white/70 hover:text-white',
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <Link href={primary} className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#FFB997]/80 hover:text-[#FFB997]">
            View wire →
          </Link>
        </div>
      </div>

      {/* Mobile menu */}
      {open ? (
        <div className="border-b border-[#f0d8cc] bg-white px-4 py-4 md:hidden">
          <div className="flex flex-col gap-1">
            <Link href="/updates" className="rounded-xl px-3 py-3 text-base font-semibold text-[#0B032D]" onClick={() => setOpen(false)}>
              Release media
            </Link>
            <Link href="/about" className="rounded-xl px-3 py-3 text-base font-semibold text-[#0B032D]" onClick={() => setOpen(false)}>
              About
            </Link>
            <Link href="/contact" className="rounded-xl px-3 py-3 text-base font-semibold text-[#0B032D]" onClick={() => setOpen(false)}>
              Contact
            </Link>
            <Link href="/search" className="rounded-xl px-3 py-3 text-base font-semibold text-[#0B032D]" onClick={() => setOpen(false)}>
              Search
            </Link>
            <div className="my-2 border-t border-[#f0d8cc]" />
            <Link href="/login" className="rounded-xl px-3 py-3 text-base font-semibold text-[#3d2a4a]/70" onClick={() => setOpen(false)}>
              Sign in
            </Link>
            <Link href="/register" className="rounded-xl border border-[#843B62]/30 px-3 py-3 text-center text-base font-semibold text-[#843B62]" onClick={() => setOpen(false)}>
              Create account
            </Link>
            <Link
              href="/create/mediaDistribution"
              className="mt-1 rounded-xl bg-gradient-to-r from-[#843B62] to-[#F67E7D] px-3 py-3 text-center text-base font-semibold text-white"
              onClick={() => setOpen(false)}
            >
              Submit release
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  )
}
