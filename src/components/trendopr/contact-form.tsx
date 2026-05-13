'use client'

import Link from 'next/link'

export function ContactForm() {
  return (
    <form
      className="mt-8 grid gap-4"
      onSubmit={(e) => {
        e.preventDefault()
      }}
    >
      <div>
        <label htmlFor="c-name" className="text-sm font-medium text-[#171717]">
          Name
        </label>
        <input
          id="c-name"
          name="name"
          className="mt-1.5 h-12 w-full rounded-xl border border-[#e0e0e0] bg-white px-4 text-sm outline-none ring-[#DA0037]/25 focus:ring-2"
          placeholder="Your name"
          autoComplete="name"
        />
      </div>
      <div>
        <label htmlFor="c-email" className="text-sm font-medium text-[#171717]">
          Work email
        </label>
        <input
          id="c-email"
          name="email"
          type="email"
          className="mt-1.5 h-12 w-full rounded-xl border border-[#e0e0e0] bg-white px-4 text-sm outline-none ring-[#DA0037]/25 focus:ring-2"
          placeholder="you@company.com"
          autoComplete="email"
        />
      </div>
      <div>
        <label htmlFor="c-org" className="text-sm font-medium text-[#171717]">
          Organization type
        </label>
        <select
          id="c-org"
          name="org"
          className="mt-1.5 h-12 w-full rounded-xl border border-[#e0e0e0] bg-white px-4 text-sm outline-none ring-[#DA0037]/25 focus:ring-2"
          defaultValue=""
        >
          <option value="" disabled>
            Select…
          </option>
          <option value="company">Company</option>
          <option value="agency">Agency</option>
          <option value="nonprofit">Nonprofit</option>
          <option value="media">Media</option>
        </select>
      </div>
      <div>
        <label htmlFor="c-subject" className="text-sm font-medium text-[#171717]">
          How can we help?
        </label>
        <select
          id="c-subject"
          name="subject"
          className="mt-1.5 h-12 w-full rounded-xl border border-[#e0e0e0] bg-white px-4 text-sm outline-none ring-[#DA0037]/25 focus:ring-2"
          defaultValue="general"
        >
          <option value="general">General enquiry</option>
          <option value="distribution">Distribution &amp; reach</option>
          <option value="billing">Billing &amp; plans</option>
          <option value="press">Editorial / corrections</option>
        </select>
      </div>
      <div>
        <label htmlFor="c-msg" className="text-sm font-medium text-[#171717]">
          Message
        </label>
        <textarea
          id="c-msg"
          name="message"
          rows={5}
          className="mt-1.5 w-full rounded-xl border border-[#e0e0e0] bg-white px-4 py-3 text-sm outline-none ring-[#DA0037]/25 focus:ring-2"
          placeholder="Tell us timelines, markets, and what success looks like."
        />
      </div>
      <p className="text-xs text-[#666]">
        By continuing you acknowledge our{' '}
        <Link href="/terms" className="font-medium text-[#DA0037] underline-offset-4 hover:underline">
          Terms
        </Link>{' '}
        and{' '}
        <Link href="/privacy" className="font-medium text-[#DA0037] underline-offset-4 hover:underline">
          Privacy Policy
        </Link>
        .
      </p>
      <button
        type="submit"
        className="h-12 rounded-xl bg-[#DA0037] text-sm font-semibold text-white shadow-sm transition hover:bg-[#b8002d]"
      >
        Submit enquiry
      </button>
    </form>
  )
}
