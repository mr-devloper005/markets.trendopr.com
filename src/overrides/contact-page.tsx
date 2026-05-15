import Link from 'next/link'
import { FileText, Mail, Sparkles, ArrowRight, Radio } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { SITE_CONFIG } from '@/lib/site-config'

export const CONTACT_PAGE_OVERRIDE_ENABLED = true

const lanes = [
  {
    icon: FileText,
    title: 'Press release submissions',
    body: 'Submit a new announcement, request editorial review, or ask about formatting standards for wire-ready releases.',
    color: 'bg-[#FFB997]/20 border-[#FFB997]/40',
    iconColor: 'text-[#843B62]',
  },
  {
    icon: Radio,
    title: 'Distribution & partnerships',
    body: 'Talk through media list access, bulk publishing workflows, and distribution tier questions.',
    color: 'bg-[#F67E7D]/15 border-[#F67E7D]/35',
    iconColor: 'text-[#843B62]',
  },
  {
    icon: Mail,
    title: 'General enquiries',
    body: 'Billing, account access, technical issues, or anything else — we route every message to the right owner.',
    color: 'bg-[#843B62]/10 border-[#843B62]/25',
    iconColor: 'text-[#843B62]',
  },
]

export function ContactPageOverride() {
  return (
    <div className="min-h-screen bg-[#fdf8f5] text-[#0B032D]">
      <NavbarShell />
      <main>

        {/* Page header */}
        <section className="border-b border-[#f0d8cc] bg-white">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#843B62]">{SITE_CONFIG.name} support</p>
            <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
              Get in touch with the press desk
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[#3d2a4a]/70">
              Reach the {SITE_CONFIG.name} team for distribution questions, editorial escalations, or partnership conversations.
              We route every message to the right owner — no anonymous black holes.
            </p>
          </div>
        </section>

        {/* Main grid */}
        <section className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:px-8 lg:py-16">

          {/* Left — lanes + info */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold tracking-[-0.02em]">How can we help?</h2>
            {lanes.map((lane) => (
              <div
                key={lane.title}
                className={`rounded-[1.6rem] border p-5 ${lane.color}`}
              >
                <lane.icon className={`h-5 w-5 ${lane.iconColor}`} />
                <h3 className="mt-3 text-lg font-semibold text-[#0B032D]">{lane.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#3d2a4a]/70">{lane.body}</p>
              </div>
            ))}

            {/* Info card */}
            <div className="rounded-[1.6rem] border border-[#843B62]/20 bg-gradient-to-br from-[#0B032D] to-[#843B62] p-6 text-white">
              <Sparkles className="h-5 w-5 text-[#FFB997]" />
              <p className="mt-3 font-semibold">{SITE_CONFIG.name}</p>
              <p className="mt-2 text-sm leading-relaxed text-white/65">
                Authenticated teams can continue conversations directly from the dashboard once your workspace is connected.
              </p>
              <Link
                href="/updates"
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#FFB997] hover:text-white"
              >
                Browse releases <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Right — form */}
          <div className="rounded-[2rem] border border-[#f0d8cc] bg-white p-7 shadow-[0_20px_60px_rgba(11,3,45,0.07)] sm:p-8">
            <h2 className="text-2xl font-semibold tracking-[-0.02em]">Send a message</h2>
            <p className="mt-2 text-sm text-[#3d2a4a]/60">
              Structured fields, fast triage, and a single thread for follow-up.
            </p>

            <form className="mt-7 grid gap-4">
              <div>
                <label htmlFor="contact-name" className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.16em] text-[#3d2a4a]/60">
                  Your name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  placeholder="Jane Smith"
                  className="h-12 w-full rounded-xl border border-[#f0d8cc] bg-[#fdf8f5] px-4 text-sm text-[#0B032D] outline-none ring-[#843B62]/30 placeholder:text-[#3d2a4a]/35 focus:ring-2"
                />
              </div>
              <div>
                <label htmlFor="contact-email" className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.16em] text-[#3d2a4a]/60">
                  Email address
                </label>
                <input
                  id="contact-email"
                  type="email"
                  placeholder="you@example.com"
                  className="h-12 w-full rounded-xl border border-[#f0d8cc] bg-[#fdf8f5] px-4 text-sm text-[#0B032D] outline-none ring-[#843B62]/30 placeholder:text-[#3d2a4a]/35 focus:ring-2"
                />
              </div>
              <div>
                <label htmlFor="contact-subject" className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.16em] text-[#3d2a4a]/60">
                  Subject
                </label>
                <input
                  id="contact-subject"
                  type="text"
                  placeholder="What do you need help with?"
                  className="h-12 w-full rounded-xl border border-[#f0d8cc] bg-[#fdf8f5] px-4 text-sm text-[#0B032D] outline-none ring-[#843B62]/30 placeholder:text-[#3d2a4a]/35 focus:ring-2"
                />
              </div>
              <div>
                <label htmlFor="contact-message" className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.16em] text-[#3d2a4a]/60">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  rows={6}
                  placeholder="Share the full context so we can respond with the right next step."
                  className="w-full rounded-2xl border border-[#f0d8cc] bg-[#fdf8f5] px-4 py-3 text-sm text-[#0B032D] outline-none ring-[#843B62]/30 placeholder:text-[#3d2a4a]/35 focus:ring-2"
                />
              </div>

              <button
                type="submit"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#843B62] to-[#F67E7D] px-6 text-sm font-semibold text-white shadow-md transition hover:opacity-90"
              >
                Send message
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          </div>

        </section>
      </main>
      <Footer />
    </div>
  )
}
