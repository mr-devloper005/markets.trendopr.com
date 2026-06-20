'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import type { SitePost } from '@/lib/site-connector'

type NoImagePostPanelProps = {
  posts: SitePost[]
  postBaseRoute: string
}

function excerpt(text?: string | null, max = 180) {
  const value = (text || '').trim()
  if (!value) return ''
  return value.length > max ? `${value.slice(0, max - 1).trimEnd()}...` : value
}

export function NoImagePostPanel({ posts, postBaseRoute }: NoImagePostPanelProps) {
  const [visibleCount, setVisibleCount] = useState(5)

  const visiblePosts = useMemo(() => posts.slice(0, visibleCount), [posts, visibleCount])
  const hasMore = visibleCount < posts.length

  return (
    <section className="mx-auto mt-14 max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
      <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm sm:p-8">
        <div className="border-b border-black/10 pb-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#2a66e5]"></p>
          <h2 className="mt-2 text-3xl font-semibold tracking-[-0.03em] text-[#0a1633]">Quick Reads</h2>
        </div>

        <div className="mt-5 space-y-4">
          {visiblePosts.length ? (
            visiblePosts.map((post, idx) => (
              <Link
                key={post.id}
                href={`${postBaseRoute}/${post.slug}`}
                className="block rounded-2xl border border-black/8 bg-[#f7f9ff] p-5 transition hover:border-[#2a66e5]/40 hover:bg-white"
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-xl font-semibold leading-snug text-[#0a1633]">{post.title}</h3>
                  <span className="shrink-0 text-xs font-semibold text-[#2a66e5]">#{idx + 1}</span>
                </div>
                {excerpt(post.summary) ? (
                  <p className="mt-3 text-sm leading-relaxed text-[#0a1633]/72">{excerpt(post.summary)}</p>
                ) : null}
              </Link>
            ))
          ) : (
            <div className="rounded-2xl border border-dashed border-black/15 bg-[#f8f8f8] p-5 text-sm text-[#0a1633]/70">
              No text-only posts found yet in the current feed.
            </div>
          )}
        </div>

        {hasMore ? (
          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => setVisibleCount((count) => count + 5)}
              className="inline-flex h-11 items-center rounded-xl border border-[#0a1633] bg-white px-6 text-sm font-semibold text-[#0a1633] transition hover:bg-[#f4f7ff]"
            >
              Load More
            </button>
          </div>
        ) : null}
      </div>
    </section>
  )
}
