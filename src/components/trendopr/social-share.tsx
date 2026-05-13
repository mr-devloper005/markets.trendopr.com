'use client'

import { Facebook, Linkedin, Link2, Mail } from 'lucide-react'

type Props = {
  url: string
  title: string
}

export function SocialShareBar({ url, title }: Props) {
  const enc = encodeURIComponent
  const items = [
    {
      label: 'Share on X',
      href: `https://twitter.com/intent/tweet?url=${enc(url)}&text=${enc(title)}`,
      icon: (
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
    {
      label: 'Share on LinkedIn',
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${enc(url)}`,
      icon: <Linkedin className="h-4 w-4" aria-hidden />,
    },
    {
      label: 'Share on Facebook',
      href: `https://www.facebook.com/sharer/sharer.php?u=${enc(url)}`,
      icon: <Facebook className="h-4 w-4" aria-hidden />,
    },
    {
      label: 'Email this story',
      href: `mailto:?subject=${enc(title)}&body=${enc(`${title}\n\n${url}`)}`,
      icon: <Mail className="h-4 w-4" aria-hidden />,
    },
  ]

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#444444]">Share</span>
      {items.map((item) => (
        <a
          key={item.label}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={item.label}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#e5e5e5] bg-white text-[#171717] transition hover:border-[#DA0037]/40 hover:text-[#DA0037]"
        >
          {item.icon}
        </a>
      ))}
      <button
        type="button"
        aria-label="Copy link"
        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#e5e5e5] bg-white text-[#171717] transition hover:border-[#DA0037]/40 hover:text-[#DA0037]"
        onClick={() => {
          void navigator.clipboard?.writeText(url)
        }}
      >
        <Link2 className="h-4 w-4" aria-hidden />
      </button>
    </div>
  )
}
