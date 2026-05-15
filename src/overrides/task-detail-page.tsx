import Link from 'next/link'
import { notFound } from 'next/navigation'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { ContentImage } from '@/components/shared/content-image'
import { SchemaJsonLd } from '@/components/seo/schema-jsonld'
import { buildPostUrl, fetchTaskPostBySlug, fetchTaskPosts } from '@/lib/task-data'
import type { TaskKey } from '@/lib/site-config'
import { SITE_CONFIG, getTaskConfig } from '@/lib/site-config'
import { formatRichHtml, RichContent } from '@/components/shared/rich-content'
import { TaskPostCard } from '@/components/shared/task-post-card'
import { SocialShareBar } from '@/components/trendopr/social-share'
import type { SitePost } from '@/lib/site-connector'
import { Clock, Tag } from 'lucide-react'

export const TASK_DETAIL_PAGE_OVERRIDE_ENABLED = true

const isValidImageUrl = (value?: string | null) =>
  typeof value === 'string' && (value.startsWith('/') || /^https?:\/\//i.test(value))

function getImageUrls(post: SitePost, content: Record<string, unknown>) {
  const media = Array.isArray(post.media) ? post.media : []
  const mediaImages = media.map((item) => item?.url).filter((url): url is string => isValidImageUrl(url))
  const contentImages = Array.isArray(content.images)
    ? content.images.filter((url): url is string => isValidImageUrl(url))
    : []
  const merged = [...mediaImages, ...contentImages]
  if (merged.length) return merged
  if (isValidImageUrl(content.logo as string)) return [content.logo as string]
  return ['/placeholder.svg?height=900&width=1400']
}

function formatDate(iso?: string | null) {
  if (!iso) return ''
  try {
    return new Date(iso).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
  } catch {
    return ''
  }
}

export async function TaskDetailPageOverride({ task, slug }: { task: TaskKey; slug: string }) {
  const post = await fetchTaskPostBySlug('mediaDistribution', slug)
  if (!post) notFound()

  const content = (post.content || {}) as Record<string, unknown>
  const html = formatRichHtml((content.body as string) || post.summary || '', '')
  const subtitle =
    (typeof content.excerpt === 'string' && content.excerpt.trim()) ||
    (post.summary || '').trim() ||
    null
  const images = getImageUrls(post, content)
  const category =
    (typeof content.category === 'string' && content.category) ||
    post.tags?.find((t) => typeof t === 'string') ||
    'Press Release'

  const related = (await fetchTaskPosts('mediaDistribution', 12, { fresh: true }))
    .filter((item) => item.slug !== slug)
    .slice(0, 3)

  const taskConfig = getTaskConfig('mediaDistribution')
  const base = SITE_CONFIG.baseUrl.replace(/\/$/, '')
  const canonical = `${base}${taskConfig?.route || '/updates'}/${post.slug}`
  const toAbs = (u: string) => (u.startsWith('http') ? u : `${base}${u.startsWith('/') ? u : `/${u}`}`)
  const heroImage = images[0] ? toAbs(images[0]) : undefined
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: post.title,
    description: subtitle || post.summary || SITE_CONFIG.description,
    image: heroImage ? [heroImage] : [],
    datePublished: post.publishedAt || undefined,
    author: {
      '@type': 'Person',
      name: post.authorName || SITE_CONFIG.name,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_CONFIG.name,
      url: base,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonical,
    },
  }

  return (
    <div className="min-h-screen bg-[#fdf8f5] text-[#0B032D]">
      <NavbarShell />
      <SchemaJsonLd data={articleSchema} />

      <article>
        {/* Article header */}
        <header className="border-b border-[#f0d8cc] bg-white">
          <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:py-14">
            {/* Breadcrumb */}
            <nav className="text-sm text-[#3d2a4a]/60">
              <Link href="/" className="hover:text-[#843B62]">Home</Link>
              <span className="mx-2 opacity-40">/</span>
              <Link href={taskConfig?.route || '/updates'} className="hover:text-[#843B62]">Press Releases</Link>
              <span className="mx-2 opacity-40">/</span>
              <span className="line-clamp-1 text-[#0B032D]">{post.title}</span>
            </nav>

            {/* Category badge */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#843B62]/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.22em] text-[#843B62]">
                <Tag className="h-3 w-3" />
                {category}
              </span>
              {post.publishedAt ? (
                <span className="inline-flex items-center gap-1.5 text-xs text-[#3d2a4a]/50">
                  <Clock className="h-3.5 w-3.5" />
                  {formatDate(post.publishedAt)}
                </span>
              ) : null}
            </div>

            <h1 className="mt-4 font-[family-name:var(--font-display)] text-4xl font-semibold leading-[1.1] tracking-[-0.035em] sm:text-5xl">
              {post.title}
            </h1>
            {subtitle ? (
              <p className="mt-5 text-lg leading-relaxed text-[#3d2a4a]/75 sm:text-xl">{subtitle}</p>
            ) : null}

            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-[#3d2a4a]/60">
              <span>
                By <span className="font-semibold text-[#0B032D]">{post.authorName || `${SITE_CONFIG.name} Desk`}</span>
              </span>
            </div>

            {/* Share bar */}
            <div className="mt-8 rounded-2xl border border-[#f0d8cc] bg-[#fdf0ea]/50 p-4">
              <SocialShareBar url={canonical} title={post.title} />
            </div>
          </div>
        </header>

        {/* Hero image */}
        {images[0] ? (
          <div className="border-b border-[#f0d8cc] bg-[#fce8df]/30">
            <div className="relative mx-auto aspect-[21/9] max-w-6xl sm:aspect-[2.4/1]">
              <ContentImage
                src={images[0]}
                alt={post.title}
                fill
                className="object-cover"
                priority
                intrinsicWidth={1600}
                intrinsicHeight={900}
              />
            </div>
          </div>
        ) : null}

        {/* Article body */}
        <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:py-16">
          <RichContent
            html={html}
            className="article-content max-w-none text-[1.05rem] leading-[1.85] text-[#1a0f2e]"
          />
        </div>

        {/* Bottom share */}
        <div className="border-t border-[#f0d8cc] bg-white py-8">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <p className="mb-4 text-sm font-semibold text-[#0B032D]">Share this release</p>
            <SocialShareBar url={canonical} title={post.title} />
          </div>
        </div>

        {/* Related releases */}
        {related.length ? (
          <section className="border-t border-[#f0d8cc] bg-[#fdf0ea]/40 py-14">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <h2 className="text-2xl font-semibold tracking-[-0.02em]">Related releases</h2>
              <p className="mt-2 text-sm text-[#3d2a4a]/60">More stories you may want to read next.</p>
              <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((item) => (
                  <TaskPostCard
                    key={item.id}
                    post={item}
                    href={buildPostUrl('mediaDistribution', item.slug)}
                    taskKey="mediaDistribution"
                  />
                ))}
              </div>
            </div>
          </section>
        ) : null}
      </article>

      <Footer />
    </div>
  )
}
