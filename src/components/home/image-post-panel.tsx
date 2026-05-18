'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import type { SitePost } from '@/lib/site-connector'
import { ContentImage } from '@/components/shared/content-image'

type ImagePostPanelProps = {
  posts: SitePost[]
  postBaseRoute: string
}

function excerpt(text?: string | null, max = 120) {
  const value = (text || '').trim()
  if (!value) return ''
  return value.length > max ? `${value.slice(0, max - 1).trimEnd()}...` : value
}

function getPostImage(post?: SitePost | null) {
  const media = Array.isArray(post?.media) ? post?.media : []
  const mediaUrl = media.find((item) => typeof item?.url === 'string' && item.url)?.url
  const content =
    post?.content && typeof post.content === 'object'
      ? (post.content as { images?: string[]; image?: string; logo?: string })
      : {}
  const imageFromArray = Array.isArray(content.images)
    ? content.images.find((url) => typeof url === 'string' && url)
    : null
  return mediaUrl || imageFromArray || content.image || content.logo || '/placeholder.jpg'
}

export function ImagePostPanel({ posts, postBaseRoute }: ImagePostPanelProps) {
  const [visibleCount, setVisibleCount] = useState(5)
  const visiblePosts = useMemo(() => posts.slice(0, visibleCount), [posts, visibleCount])
  const hasMore = visibleCount < posts.length

  if (!posts.length) return null

  return (
    <section className="mx-auto mt-8 max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
      <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm sm:p-8">
        <div className="border-b border-black/10 pb-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#2a66e5]"></p>
          <h2 className="mt-2 text-3xl font-semibold tracking-[-0.03em] text-[#0a1633]">Featured Posts</h2>
        </div>

        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visiblePosts.map((post) => (
            <Link
              key={post.id}
              href={`${postBaseRoute}/${post.slug}`}
              className="group overflow-hidden rounded-2xl border border-black/10 bg-[#f7f9ff] transition hover:border-[#2a66e5]/40 hover:bg-white"
            >
              <div className="relative h-44 overflow-hidden">
                <ContentImage
                  src={getPostImage(post)}
                  alt={post.title}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes="(max-width: 1024px) 50vw, 33vw"
                  intrinsicWidth={600}
                  intrinsicHeight={400}
                />
              </div>
              <div className="p-4">
                <h3 className="line-clamp-2 text-lg font-semibold leading-snug text-[#0a1633]">{post.title}</h3>
                {excerpt(post.summary) ? (
                  <p className="mt-2 line-clamp-2 text-sm text-[#0a1633]/72">{excerpt(post.summary)}</p>
                ) : null}
              </div>
            </Link>
          ))}
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
