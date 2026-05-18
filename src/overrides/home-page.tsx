import Link from 'next/link'
import { ArrowRight, ChevronRight } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { ContentImage } from '@/components/shared/content-image'
import { NoImagePostPanel } from '@/components/home/no-image-post-panel'
import { ImagePostPanel } from '@/components/home/image-post-panel'
import { fetchTaskPosts } from '@/lib/task-data'
import { SITE_CONFIG } from '@/lib/site-config'
import type { SitePost } from '@/lib/site-connector'

export const HOME_PAGE_OVERRIDE_ENABLED = true
const FEATURE_PANEL_IMAGE = process.env.NEXT_PUBLIC_FEATURE_PANEL_IMAGE
const DEFAULT_FEATURE_PANEL_IMAGE = '/panelimage.png'

const trustedBrands = [
  ]

const awardBadges = [
  'Entrepreneur Awards 2025',
  'Martech+ Awards',
  'IDMA 2025',
  'Best Tech for Media',
  'Best Marketing Startup',
  'Best SaaS Product',
]

const testimonials = [
  {
    quote:
      'Working with us improved publishing speed and discoverability. Their team helped streamline workflow and reduce load bottlenecks across our platform.',
    name: 'Sanjay Sindhwani',
    role: 'CEO, Indian Express',
  },
  {
    quote:
      'The collaboration transformed our CMS and backend operations. We saw better rankings, faster page performance, and sustained audience growth.',
    name: 'Bhuwan Bhatt',
    role: 'Chief Business Officer, News Nation',
  },
  {
    quote:
      'The infrastructure is reliable, and the execution discipline is excellent. Launch velocity is higher while quality checks stay intact.',
    name: 'Rachita Kapoor',
    role: 'Brand & Marketing, Sanjeev Kapoor',
  },
]

function getPostImage(post?: SitePost | null) {
  const media = Array.isArray(post?.media) ? post?.media : []
  const mediaUrl = media.find((item) => typeof item?.url === 'string' && item.url)?.url
  const contentImage =
    typeof post?.content === 'object' &&
    post?.content &&
    Array.isArray((post.content as { images?: string[] }).images)
      ? (post.content as { images?: string[] }).images?.find((url) => typeof url === 'string' && url)
      : null
  return mediaUrl || contentImage || '/placeholder.jpg'
}

function hasPostImage(post?: SitePost | null) {
  if (!post) return false
  const media = Array.isArray(post.media) ? post.media : []
  const mediaUrl = media.find((item) => typeof item?.url === 'string' && item.url)?.url
  const content =
    post.content && typeof post.content === 'object' ? (post.content as { images?: string[]; image?: string }) : {}
  const imageFromArray = Array.isArray(content.images) ? content.images.find((url) => typeof url === 'string' && url) : null
  const anyImage = mediaUrl || imageFromArray || content.image
  if (!anyImage) return false
  const normalized = String(anyImage).toLowerCase()
  if (normalized.includes('placeholder')) return false
  return true
}

function safeSummary(text?: string | null, max = 120) {
  const value = (text || '').trim()
  if (!value) return ''
  return value.length > max ? `${value.slice(0, max - 1).trimEnd()}...` : value
}

export async function HomePageOverride() {
  const posts = await fetchTaskPosts('mediaDistribution', 16, { fresh: true, allowMockFallback: false })
  const sortedPosts = [...posts].sort((a, b) => {
    const aTime = new Date(a.publishedAt || a.createdAt || 0).getTime()
    const bTime = new Date(b.publishedAt || b.createdAt || 0).getTime()
    return bTime - aTime
  })
  const primaryTaskRoute = SITE_CONFIG.tasks.find((t) => t.key === 'mediaDistribution')?.route || '/press-release'
  const heroCards = sortedPosts.slice(0, Math.max(0, sortedPosts.length))
  const caseStudies = sortedPosts.slice(4, 10)
  const noImagePosts = sortedPosts.filter((post) => !hasPostImage(post))
  const imagePosts = sortedPosts.filter((post) => hasPostImage(post))

  return (
    <div className="min-h-screen bg-[#ececec] text-[#0a1633]">
      <NavbarShell />

      <main>
        <section className="bg-[linear-gradient(180deg,#1f2557_0%,#232b66_60%,#252f6e_100%)] text-white">
          <div className="mx-auto max-w-7xl px-4 pb-28 pt-20 text-center sm:px-6 lg:px-8 lg:pb-32 lg:pt-24">
            <h1 className="mx-auto max-w-5xl text-5xl font-semibold tracking-[-0.04em] sm:text-6xl lg:text-7xl">
              Distribute your news everywhere
            </h1>
            <p className="mx-auto mt-9 max-w-5xl text-2xl font-medium text-white/95 sm:text-3xl lg:text-4xl">
              Reach journalists, readers, and business audiences across digital and traditional media.
            </p>

            <ul className="mx-auto mt-10 max-w-3xl space-y-3 text-2xl text-white/90 sm:text-3xl">
              <li>Publish verified press releases quickly</li>
              <li>Improve brand visibility and credibility</li>
              <li>Get targeted exposure in your market</li>
            </ul>

            <div className="mt-12 flex flex-wrap items-center justify-center gap-5">
              <Link
                href="/create/mediaDistribution"
                className="inline-flex h-14 items-center rounded-lg bg-[#2a66e5] px-9 text-lg font-semibold text-white transition hover:bg-[#1f55c9]"
              >
                Submit Press Release
              </Link>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-14 pt-12 sm:px-6 lg:px-8 lg:pb-20 lg:pt-14">
          <NoImagePostPanel posts={noImagePosts} postBaseRoute={primaryTaskRoute} />
          <ImagePostPanel posts={imagePosts} postBaseRoute={primaryTaskRoute} />

          <div className="mt-10 grid grid-cols-2 gap-4 rounded-3xl border border-black/6 bg-white p-5 shadow-sm sm:grid-cols-4">
            {[
              ['24/7', 'News Desk Coverage'],
              ['180+', 'Daily Release Pickups'],
              ['65+', 'Categories Covered'],
              ['99.99%', 'Publishing Uptime'],
            ].map(([value, label]) => (
              <div key={label} className="rounded-2xl border border-black/6 bg-[#f5f7fc] p-5 text-center">
                <p className="text-4xl font-semibold tracking-[-0.03em] text-[#2a66e5]">{value}</p>
                <p className="mt-2 text-sm font-semibold text-[#0a1633]">{label}</p>
              </div>
            ))}
          </div>

          <div className="mt-9 flex flex-wrap justify-center gap-8 text-lg font-semibold text-[#0a1633]/78">
            {trustedBrands.map((brand) => (
              <span key={brand} className="opacity-80">{brand}</span>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
          <h2 className="text-5xl font-semibold tracking-[-0.04em]">Newsroom Services</h2>
          <div className="mt-7 grid gap-5 lg:grid-cols-2">
            <article className="rounded-3xl bg-black p-10 text-white">
              <h3 className="text-5xl font-semibold tracking-[-0.03em]">For Journalists & Editors</h3>
              <p className="mt-5 text-2xl font-semibold">Publish breaking updates quickly with clear structure and reliable distribution</p>
              <ul className="mt-5 space-y-2 text-xl text-white/88">
                <li>Fast press release publishing workflow</li>
                <li>Category-based discovery for readers</li>
                <li>Consistent editorial formatting standards</li>
              </ul>
              <Link href="/about" className="mt-8 inline-flex items-center gap-2 text-base font-semibold text-[#8ec3ff] hover:text-white">
                Learn more <ArrowRight className="h-4 w-4" />
              </Link>
            </article>

            <article className="rounded-3xl bg-[#06106a] p-10 text-white">
              <h3 className="text-5xl font-semibold tracking-[-0.03em]">For PR & Communications Teams</h3>
              <p className="mt-5 text-2xl font-semibold">Share official announcements with better visibility across business and media audiences</p>
              <ul className="mt-5 space-y-2 text-xl text-white/88">
                <li>Verified business and company updates</li>
                <li>Broader media reach for each release</li>
                <li>Stronger brand credibility in search and archives</li>
              </ul>
              <Link href="/contact" className="mt-8 inline-flex items-center gap-2 text-base font-semibold text-[#9abaff] hover:text-white">
                Talk to team <ArrowRight className="h-4 w-4" />
              </Link>
            </article>
          </div>
        </section>

        <section className="mt-8 bg-black py-16 text-white">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
            <div>
              <h2 className="text-5xl font-semibold tracking-[-0.04em]">Editorial Highlights</h2>
              <ul className="mt-8 divide-y divide-white/15 text-3xl font-semibold">
                <li className="py-4 text-[#8cff2d]">Breaking News Coverage</li>
                <li className="py-4">Press Release Distribution</li>
                <li className="py-4">Category-Based News Browsing</li>
                <li className="py-4">Real-Time Publishing Workflow</li>
              </ul>
            </div>
            <div>
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#7a47f2] to-[#4f2be0] p-4 shadow-[0_18px_52px_rgba(122,71,242,0.4)]">
                <div className="relative h-72 overflow-hidden rounded-2xl border border-white/20 bg-[#050c44]">
                  <ContentImage
                    src={FEATURE_PANEL_IMAGE || DEFAULT_FEATURE_PANEL_IMAGE || (heroCards[0] ? getPostImage(heroCards[0]) : '/placeholder.jpg')}
                    alt="Feature visual"
                    fill
                    className="object-cover opacity-85"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    intrinsicWidth={1000}
                    intrinsicHeight={700}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
              </div>
              <h3 className="mt-7 text-4xl font-semibold">Breaking News Distribution</h3>
              <p className="mt-3 max-w-2xl text-lg text-white/78">
                Publish time-sensitive stories, official statements, and category-specific updates to keep audiences informed with speed and clarity.
              </p>
              <Link href={primaryTaskRoute} className="mt-5 inline-flex items-center gap-2 text-base font-semibold text-[#59a5ff] hover:text-white">
                Explore News Feed <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="text-6xl font-semibold tracking-[-0.05em]">What people say...</h2>
          <p className="mt-4 text-2xl font-semibold text-[#0a1633]/84">Hear from our clients about how robust infrastructure elevated their content experiences.</p>

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {testimonials.map((item) => (
              <article key={item.name} className="rounded-3xl border border-black/8 bg-white p-7 shadow-sm">
                <div className="h-1 w-20 bg-[#0a1633]" />
                <p className="mt-5 text-xl leading-relaxed text-[#0a1633]/90">{item.quote}</p>
                <div className="mt-6">
                  <p className="text-xl font-semibold">{item.name}</p>
                  <p className="text-base text-[#0a1633]/70">{item.role}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="bg-black py-16 text-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-6xl font-semibold tracking-[-0.05em]">Case Studies</h2>

            <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {caseStudies.map((post, idx) => (
                <Link
                  key={post.id}
                  href={`${primaryTaskRoute}/${post.slug}`}
                  className="group flex h-full flex-col rounded-3xl border border-[#ff3e3e] bg-[#060606] p-6 transition hover:-translate-y-1 hover:border-[#2a66e5]"
                >
                  <div className="mb-5 flex items-center justify-between">
                    <span className="rounded-full border border-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-white/70">
                      Case {idx + 1}
                    </span>
                    <span className="text-6xl font-semibold tracking-[-0.03em] text-white">{idx === 1 ? '231%' : idx === 2 ? '3x' : idx === 0 ? '7.3x' : '48%'}</span>
                  </div>
                  <h3 className="text-2xl font-semibold leading-snug">{post.title}</h3>
                  <p className="mt-3 text-base text-white/72">{safeSummary(post.summary, 130)}</p>
                  <span className="mt-auto pt-8 text-base font-semibold text-[#7ab4ff]">Read study <ArrowRight className="ml-1 inline h-4 w-4" /></span>
                </Link>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap gap-4 text-sm text-white/70">
              {awardBadges.map((badge) => (
                <span key={badge} className="rounded-full border border-white/20 px-4 py-2">{badge}</span>
              ))}
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  )
}
