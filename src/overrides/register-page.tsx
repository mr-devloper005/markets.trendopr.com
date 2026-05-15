import Link from 'next/link'
import { Newspaper, ArrowRight, CheckCircle2 } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { SITE_CONFIG } from '@/lib/site-config'

export const REGISTER_PAGE_OVERRIDE_ENABLED = true

export function RegisterPageOverride() {
  return (
    <div className="min-h-screen bg-[#fdf8f5] text-[#0B032D]">
      <NavbarShell />
      <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-stretch">

          {/* Left — brand panel */}
          <div className="relative overflow-hidden rounded-[2rem] bg-[#0B032D] p-10 text-white">
            <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-[#843B62]/40 blur-[80px]" aria-hidden />
            <div className="pointer-events-none absolute -bottom-10 -left-10 h-48 w-48 rounded-full bg-[#FFB997]/20 blur-[60px]" aria-hidden />

            <div className="relative">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#843B62] to-[#F67E7D]">
                <Newspaper className="h-6 w-6 text-white" />
              </div>
              <h1 className="mt-6 text-3xl font-semibold leading-snug tracking-[-0.03em] sm:text-4xl">
                Start distributing press releases today
              </h1>
              <p className="mt-4 text-sm leading-relaxed text-white/65">
                Join {SITE_CONFIG.name} and give your communications team a credible, fast, and searchable public archive.
              </p>

              <div className="mt-10 space-y-3">
                {[
                  { label: 'Publish wire-ready announcements', color: 'bg-[#FFB997]' },
                  { label: 'Reach journalists and media contacts', color: 'bg-[#F67E7D]' },
                  { label: 'Permanent canonical URLs for every release', color: 'bg-[#843B62]' },
                  { label: 'Category filters and date-range archive', color: 'bg-[#FFB997]' },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80">
                    <CheckCircle2 className={`h-4 w-4 shrink-0 text-[#FFB997]`} />
                    {item.label}
                  </div>
                ))}
              </div>

              <p className="mt-10 text-xs text-white/35">
                {SITE_CONFIG.name} · Press Release Distribution
              </p>
            </div>
          </div>

          {/* Right — form panel */}
          <div className="rounded-[2rem] border border-[#f0d8cc] bg-white p-8 shadow-[0_20px_60px_rgba(11,3,45,0.07)] sm:p-10">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#843B62]">Get started</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-[-0.02em]">Create your account</h2>
            <p className="mt-2 text-sm text-[#3d2a4a]/60">
              Already have an account?{' '}
              <Link href="/login" className="font-semibold text-[#843B62] hover:underline">
                Sign in
              </Link>
            </p>

            <form className="mt-8 grid gap-4">
              <div>
                <label htmlFor="name" className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.16em] text-[#3d2a4a]/60">
                  Full name
                </label>
                <input
                  id="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Jane Smith"
                  className="h-12 w-full rounded-xl border border-[#f0d8cc] bg-[#fdf8f5] px-4 text-sm text-[#0B032D] outline-none ring-[#843B62]/30 placeholder:text-[#3d2a4a]/35 focus:ring-2"
                />
              </div>
              <div>
                <label htmlFor="email" className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.16em] text-[#3d2a4a]/60">
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  className="h-12 w-full rounded-xl border border-[#f0d8cc] bg-[#fdf8f5] px-4 text-sm text-[#0B032D] outline-none ring-[#843B62]/30 placeholder:text-[#3d2a4a]/35 focus:ring-2"
                />
              </div>
              <div>
                <label htmlFor="password" className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.16em] text-[#3d2a4a]/60">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  autoComplete="new-password"
                  placeholder="••••••••"
                  className="h-12 w-full rounded-xl border border-[#f0d8cc] bg-[#fdf8f5] px-4 text-sm text-[#0B032D] outline-none ring-[#843B62]/30 placeholder:text-[#3d2a4a]/35 focus:ring-2"
                />
              </div>
              <div>
                <label htmlFor="org" className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.16em] text-[#3d2a4a]/60">
                  Organization / Publication
                </label>
                <input
                  id="org"
                  type="text"
                  placeholder="Acme Corp"
                  className="h-12 w-full rounded-xl border border-[#f0d8cc] bg-[#fdf8f5] px-4 text-sm text-[#0B032D] outline-none ring-[#843B62]/30 placeholder:text-[#3d2a4a]/35 focus:ring-2"
                />
              </div>

              <button
                type="submit"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#843B62] to-[#F67E7D] px-6 text-sm font-semibold text-white shadow-md transition hover:opacity-90"
              >
                Create account
                <ArrowRight className="h-4 w-4" />
              </button>

              <p className="text-center text-xs text-[#3d2a4a]/45">
                By creating an account you agree to our{' '}
                <Link href="/terms" className="underline hover:text-[#843B62]">Terms</Link>
                {' '}and{' '}
                <Link href="/privacy" className="underline hover:text-[#843B62]">Privacy Policy</Link>.
              </p>
            </form>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  )
}
