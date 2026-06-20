import Link from 'next/link'
import { ArrowRight, BookOpen, CircleHelp, FileText, MessageSquare } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { mockFaqs } from '@/data/mock-data'
import { SITE_CONFIG } from '@/lib/site-config'

const topics = [
  {
    icon: BookOpen,
    title: 'Getting started',
    description: 'Set up your account, prepare your release draft, and publish your first announcement quickly.',
  },
  {
    icon: FileText,
    title: 'Publishing workflow',
    description: 'Format headlines, summaries, and metadata so your archive stays clear and searchable.',
  },
  {
    icon: CircleHelp,
    title: 'Account and billing',
    description: 'Find answers for access issues, subscription changes, and team-level workspace questions.',
  },
  {
    icon: MessageSquare,
    title: 'Distribution support',
    description: 'Understand category filters, feed behavior, and best practices for recurring releases.',
  },
]

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-[#fdf8f5] text-[#0B032D]">
      <NavbarShell />
      <main>
        <section className="border-b border-[#f0d8cc] bg-white">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#843B62]">{SITE_CONFIG.name} support</p>
            <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">Help Center</h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[#3d2a4a]/70">
              Clear guides, practical answers, and fast support paths for your publishing workflow.
            </p>
            <div className="mt-7">
              <Link
                href="/contact"
                className="inline-flex h-11 items-center gap-2 rounded-full bg-gradient-to-r from-[#843B62] to-[#F67E7D] px-6 text-sm font-semibold text-white shadow-md transition hover:opacity-90"
              >
                Contact support
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:px-8 lg:py-16">
          <div className="grid gap-4 sm:grid-cols-2">
            {topics.map((topic) => (
              <article key={topic.title} className="rounded-[1.4rem] border border-[#f0d8cc] bg-white p-5 shadow-[0_12px_36px_rgba(11,3,45,0.05)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(132,59,98,0.1)]">
                <topic.icon className="h-5 w-5 text-[#843B62]" />
                <h2 className="mt-3 text-lg font-semibold text-[#0B032D]">{topic.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-[#3d2a4a]/70">{topic.description}</p>
              </article>
            ))}
          </div>

          <div className="rounded-[1.8rem] border border-[#f0d8cc] bg-white p-6 shadow-[0_16px_44px_rgba(11,3,45,0.06)] sm:p-7">
            <h3 className="text-xl font-semibold text-[#0B032D]">Frequently asked questions</h3>
            <p className="mt-2 text-sm text-[#3d2a4a]/65">Quick answers for common requests from release and communications teams.</p>
            <Accordion type="single" collapsible className="mt-5">
              {mockFaqs.map((faq) => (
                <AccordionItem key={faq.id} value={faq.id} className="border-b border-[#f0d8cc]">
                  <AccordionTrigger className="text-left text-[#0B032D] hover:text-[#843B62]">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-sm leading-7 text-[#3d2a4a]/75">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
