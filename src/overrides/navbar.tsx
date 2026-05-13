'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, Search, X } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { cn } from '@/lib/utils'

export const NAVBAR_OVERRIDE_ENABLED = true

const primary = SITE_CONFIG.tasks.find((t) => t.enabled)?.route || '/updates'

const navSecondary = [
  { label: 'Latest wire', href: '/updates' },
  { label: 'Business', href: '/updates?category=business' },
  { label: 'Technology', href: '/updates?category=technology' },
  { label: 'News', href: '/updates?category=news' },
  { label: 'Finance', href: '/updates?category=finance' },
]

export function NavbarOverride() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="border-b border-[#ebebeb] bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <Link href="/" className="flex min-w-0 items-center gap-3" onClick={() => setOpen(false)}>
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#171717] text-sm font-bold tracking-tight text-white">
              TP
            </span>
            <span className="truncate text-lg font-semibold tracking-tight text-[#171717] sm:text-xl">{SITE_CONFIG.name}</span>
          </Link>

          <div className="hidden flex-1 items-center justify-end gap-2 md:flex">
            <Link
              href="/updates"
              className={cn(
                'rounded-full px-3 py-2 text-sm font-semibold text-[#444444] transition hover:text-[#171717]',
                pathname.startsWith('/updates') && 'text-[#DA0037]',
              )}
            >
              Release media
            </Link>
            <Link
              href="/about"
              className={cn(
                'rounded-full px-3 py-2 text-sm font-semibold text-[#444444] transition hover:text-[#171717]',
                pathname === '/about' && 'text-[#DA0037]',
              )}
            >
              About
            </Link>
            <Link
              href="/contact"
              className={cn(
                'rounded-full px-3 py-2 text-sm font-semibold text-[#444444] transition hover:text-[#171717]',
                pathname === '/contact' && 'text-[#DA0037]',
              )}
            >
              Contact
            </Link>
            <Link
              href="/search"
              className="rounded-full p-2 text-[#444444] transition hover:bg-[#EDEDED] hover:text-[#171717]"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </Link>
            <Link
              href="/login"
              className="rounded-full px-4 py-2 text-sm font-semibold text-[#444444] transition hover:text-[#171717]"
            >
              Sign in
            </Link>
            <Link
              href="/register"
              className="rounded-full border border-[#DA0037] px-4 py-2 text-sm font-semibold text-[#DA0037] transition hover:bg-[#DA0037] hover:text-white"
            >
              Create account
            </Link>
            <Link
              href="/create/mediaDistribution"
              className="rounded-full bg-[#171717] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#2a2a2a]"
            >
              Submit release
            </Link>
          </div>

          <button
            type="button"
            className="inline-flex rounded-full p-2 text-[#171717] md:hidden"
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <div className="hidden border-b border-[#171717] bg-[#171717] text-white md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2.5 sm:px-6 lg:px-8">
          <nav className="flex flex-wrap gap-x-6 gap-y-1 text-[13px] font-medium">
            {navSecondary.map((item) => (
              <Link key={item.href} href={item.href} className="text-white/85 transition hover:text-white">
                {item.label}
              </Link>
            ))}
          </nav>
          <Link href={primary} className="text-[12px] font-semibold uppercase tracking-[0.2em] text-white/70 hover:text-white">
            View wire →
          </Link>
        </div>
      </div>

      {open ? (
        <div className="border-b border-[#ebebeb] bg-white px-4 py-4 md:hidden">
          <div className="flex flex-col gap-1">
            <Link href="/updates" className="rounded-xl px-3 py-3 text-base font-semibold" onClick={() => setOpen(false)}>
              Release media
            </Link>
            <Link href="/about" className="rounded-xl px-3 py-3 text-base font-semibold" onClick={() => setOpen(false)}>
              About
            </Link>
            <Link href="/contact" className="rounded-xl px-3 py-3 text-base font-semibold" onClick={() => setOpen(false)}>
              Contact
            </Link>
            <Link href="/search" className="rounded-xl px-3 py-3 text-base font-semibold" onClick={() => setOpen(false)}>
              Search
            </Link>
            <Link href="/login" className="rounded-xl px-3 py-3 text-base font-semibold" onClick={() => setOpen(false)}>
              Sign in
            </Link>
            <Link href="/register" className="rounded-xl px-3 py-3 text-base font-semibold" onClick={() => setOpen(false)}>
              Create account
            </Link>
            <Link
              href="/create/mediaDistribution"
              className="mt-2 rounded-xl bg-[#171717] px-3 py-3 text-center text-base font-semibold text-white"
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
