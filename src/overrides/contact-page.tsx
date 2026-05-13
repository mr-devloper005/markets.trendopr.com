import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { SITE_CONFIG } from '@/lib/site-config'
import { ContactForm } from '@/components/trendopr/contact-form'

export const CONTACT_PAGE_OVERRIDE_ENABLED = true

export function ContactPageOverride() {
  return (
    <div className="min-h-screen bg-[#fafafa] text-[#171717]">
      <NavbarShell />
      <main>
        <section className="border-b border-[#ebebeb] bg-white">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#DA0037]">TrendoPR support</p>
            <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">Contact us</h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[#444444]">
              Reach the TrendoPR desk for distribution questions, editorial escalations, or partnership conversations. We route
              every message to the right owner—no anonymous black holes.
            </p>
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:px-8 lg:py-16">
          <div className="rounded-2xl border border-[#e8e8e8] bg-white p-6 shadow-[0_20px_60px_rgba(23,23,23,0.06)] sm:p-8">
            <h2 className="text-xl font-semibold">Send a message</h2>
            <p className="mt-2 text-sm text-[#444444]">
              This form mirrors the workflow on reference PR desks: structured fields, fast triage, and a single thread for follow-up.
            </p>
            <ContactForm />
          </div>

          <div className="space-y-6">
            <div className="rounded-2xl border border-dashed border-[#DA0037]/35 bg-[#fff5f7] p-6 sm:p-8">
              <p className="text-sm font-semibold text-[#171717]">{SITE_CONFIG.name}</p>
              <p className="mt-2 text-sm text-[#444444]">
                Prefer to keep everything inside your workflow? Authenticated teams can continue the conversation from the dashboard
                once your workspace is connected.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
