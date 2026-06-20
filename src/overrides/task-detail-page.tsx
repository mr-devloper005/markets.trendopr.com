import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight, Facebook, Linkedin, Link2, Mail, Twitter } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { ContentImage } from '@/components/shared/content-image'
import { fetchTaskPostBySlug, fetchTaskPosts, buildPostUrl } from '@/lib/task-data'
import type { TaskKey } from '@/lib/site-config'
import type { SitePost } from '@/lib/site-connector'
import { SITE_CONFIG } from '@/lib/site-config'
import { formatRichHtml, RichContent } from '@/components/shared/rich-content'
import { CATEGORY_OPTIONS, normalizeCategory } from '@/lib/categories'

export const TASK_DETAIL_PAGE_OVERRIDE_ENABLED = true

const isValidImageUrl = (value?: string | null) =>
  typeof value === 'string' && (value.startsWith('/') || /^https?:\/\//i.test(value))

const getContent = (post: SitePost) => {
  const content = post.content && typeof post.content === 'object' ? post.content : {}
  return content as Record<string, unknown>
}

const getImageUrls = (post: SitePost, content: Record<string, unknown>) => {
  const media = Array.isArray(post.media) ? post.media : []
  const mediaImages = media.map((item) => item?.url).filter((url): url is string => isValidImageUrl(url))
  const contentImages = Array.isArray(content.images)
    ? content.images.filter((url): url is string => typeof url === 'string' && isValidImageUrl(url))
    : []
  const merged = [...mediaImages, ...contentImages]
  if (merged.length) return merged
  if (isValidImageUrl(content.logo as string)) return [content.logo as string]
  return [] as string[]
}

const getCategoryLabel = (post: SitePost, content: Record<string, unknown>) => {
  const raw =
    (typeof content.category === 'string' && content.category.trim()) ||
    (Array.isArray(post.tags) ? post.tags.find((tag) => typeof tag === 'string' && tag !== 'mediaDistribution') : '') ||
    ''
  if (!raw || typeof raw !== 'string') return 'Press releases'
  const normalized = normalizeCategory(raw)
  return CATEGORY_OPTIONS.find((item) => item.slug === normalized)?.name || raw.trim()
}

export async function TaskDetailPageOverride({ slug }: { task: TaskKey; slug: string }) {
  const post = await fetchTaskPostBySlug('mediaDistribution', slug)
  if (!post) notFound()

  const related = (await fetchTaskPosts('mediaDistribution', 8, { fresh: true }))
    .filter((item) => item.slug !== slug)
    .slice(0, 4)

  const content = getContent(post)
  const rawBody =
    (typeof content.body === 'string' && content.body.trim()) ||
    (typeof content.description === 'string' && content.description.trim()) ||
    post.summary ||
    ''
  const html = formatRichHtml(rawBody, '')
  const images = getImageUrls(post, content)
  const hero = images[0]
  const archivePath = SITE_CONFIG.taskViews.mediaDistribution || '/updates'
  const categoryLabel = getCategoryLabel(post, content)
  const categorySlug = normalizeCategory(categoryLabel)
  const pageUrl = `${SITE_CONFIG.baseUrl.replace(/\/$/, '')}${buildPostUrl('mediaDistribution', post.slug)}`
  const shareText = encodeURIComponent(post.title)
  const shareUrl = encodeURIComponent(pageUrl)
  return (
    <div className="min-h-screen bg-[#ececec] text-[#0a1633]">
      <NavbarShell />

      <article className="mx-auto max-w-7xl px-4 pb-16 pt-8 sm:px-6 lg:pt-12">
        <nav className="text-xs font-medium text-[#0a1633]/65">
          <Link href="/" className="hover:text-[#2a66e5]">
            Home
          </Link>
          <span className="mx-2 opacity-40">/</span>
          <Link href={archivePath} className="hover:text-[#2a66e5]">
            Press releases
          </Link>
          <span className="mx-2 opacity-40">/</span>
          <Link href={`${archivePath}?category=${categorySlug}`} className="hover:text-[#2a66e5]">
            {categoryLabel}
          </Link>
        </nav>

        <div className="mt-8 overflow-hidden rounded-[2rem] border border-[#0a1633]/10 bg-white shadow-[0_28px_70px_rgba(10,22,51,0.08)]">
          <div className="bg-[linear-gradient(180deg,#1f2557_0%,#232b66_60%,#252f6e_100%)] px-6 py-10 text-white sm:px-8 lg:px-10">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/75">{categoryLabel}</p>
            <h1 className="mt-4 max-w-4xl text-3xl font-semibold leading-[1.1] tracking-[-0.03em] sm:text-4xl lg:text-5xl">
              {post.title}
            </h1>
            <div className="mt-6 flex flex-wrap gap-2">
              <a
                href={`https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white transition hover:bg-white/20"
                aria-label="Share on X"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white transition hover:bg-white/20"
                aria-label="Share on LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white transition hover:bg-white/20"
                aria-label="Share on Facebook"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href={`mailto:?subject=${shareText}&body=${shareUrl}`}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white transition hover:bg-white/20"
                aria-label="Email this release"
              >
                <Mail className="h-4 w-4" />
              </a>
              <span className="inline-flex items-center gap-1 rounded-full border border-white/30 px-3 py-2 text-xs text-white/80">
                <Link2 className="h-3.5 w-3.5" />
                {pageUrl.replace(/^https?:\/\//, '')}
              </span>
            </div>
          </div>

          <div className="grid gap-12 px-6 py-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-14 lg:px-10">
          <div className="min-w-0">
            {hero ? (
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[1.25rem] border border-[#0a1633]/12 bg-[#f5f7fc] shadow-sm">
                <ContentImage src={hero} alt={post.title} fill className="object-cover" priority />
              </div>
            ) : null}

            <RichContent html={html} className="article-content mt-10 max-w-none text-[1.05rem] leading-[1.75] text-[#0a1633]/90" />
          </div>

          <aside className="space-y-6 lg:pt-2">
            <div className="rounded-[1.25rem] border border-[#0a1633]/10 bg-[#f5f7fc] p-6 shadow-sm">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#0a1633]/60">More releases</p>
              <ul className="mt-4 space-y-4">
                {related.map((item) => (
                  <li key={item.id}>
                    <Link href={buildPostUrl('mediaDistribution', item.slug)} className="block text-sm font-semibold leading-snug text-[#0a1633] hover:text-[#2a66e5]">
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                href={archivePath}
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#2a66e5] hover:text-[#1f55c9]"
              >
                Back to archive
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </aside>
        </div>
        </div>
      </article>

      <Footer />
    </div>
  )
}
