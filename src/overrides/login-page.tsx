import Link from 'next/link'
import { Newspaper, ArrowRight, Sparkles } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { SITE_CONFIG } from '@/lib/site-config'

export const LOGIN_PAGE_OVERRIDE_ENABLED = true

export function LoginPageOverride() {
  return (
    <div className="min-h-screen bg-[#fdf8f5] text-[#0B032D]">
      <NavbarShell />
      <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-stretch">

          {/* Left — brand panel */}
          <div className="relative overflow-hidden rounded-[2rem] bg-[#0B032D] p-10 text-white">
            {/* decorative blobs */}
            <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-[#843B62]/40 blur-[80px]" aria-hidden />
            <div className="pointer-events-none absolute -bottom-10 -left-10 h-48 w-48 rounded-full bg-[#F67E7D]/25 blur-[60px]" aria-hidden />

            <div className="relative">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#843B62] to-[#F67E7D]">
                <Newspaper className="h-6 w-6 text-white" />
              </div>
              <h1 className="mt-6 text-3xl font-semibold leading-snug tracking-[-0.03em] sm:text-4xl">
                Sign in to your press workspace
              </h1>
              <p className="mt-4 text-sm leading-relaxed text-white/65">
                Access your {SITE_CONFIG.name} dashboard to manage releases, track distribution, and keep your public archive up to date.
              </p>

              <div className="mt-10 space-y-3">
                {[
                  'Submit and manage press releases',
                  'Track engagement across your archive',
                  'Share canonical URLs with stakeholders',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#FFB997]" />
                    {item}
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
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#843B62]">Welcome back</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-[-0.02em]">Sign in to your account</h2>
            <p className="mt-2 text-sm text-[#3d2a4a]/60">
              Don&apos;t have an account?{' '}
              <Link href="/register" className="font-semibold text-[#843B62] hover:underline">
                Create one free
              </Link>
            </p>

            <form className="mt-8 grid gap-4">
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
                  autoComplete="current-password"
                  placeholder="••••••••"
                  className="h-12 w-full rounded-xl border border-[#f0d8cc] bg-[#fdf8f5] px-4 text-sm text-[#0B032D] outline-none ring-[#843B62]/30 placeholder:text-[#3d2a4a]/35 focus:ring-2"
                />
              </div>

              <div className="flex items-center justify-end">
                <Link href="/forgot-password" className="text-xs font-semibold text-[#843B62] hover:underline">
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#843B62] to-[#F67E7D] px-6 text-sm font-semibold text-white shadow-md transition hover:opacity-90"
              >
                Sign in
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>

            <div className="mt-8 flex items-center gap-3">
              <div className="h-px flex-1 bg-[#f0d8cc]" />
              <span className="text-xs text-[#3d2a4a]/40">or</span>
              <div className="h-px flex-1 bg-[#f0d8cc]" />
            </div>

            <Link
              href="/register"
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full border-2 border-[#843B62]/25 px-6 py-3 text-sm font-semibold text-[#843B62] transition hover:border-[#843B62] hover:bg-[#843B62]/5"
            >
              <Sparkles className="h-4 w-4" />
              Create a new account
            </Link>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  )
}
