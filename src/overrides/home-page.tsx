import Link from 'next/link'
import { ArrowRight, Radio, TrendingUp, Globe2, Newspaper, Megaphone, BarChart2, Clock, ChevronRight } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { ContentImage } from '@/components/shared/content-image'
import { fetchTaskPosts } from '@/lib/task-data'
import { SITE_CONFIG } from '@/lib/site-config'
import type { SitePost } from '@/lib/site-connector'

export const HOME_PAGE_OVERRIDE_ENABLED = true

function getPostImage(post?: SitePost | null) {
  const media = Array.isArray(post?.media) ? post?.media : []
  const mediaUrl = media.find((item) => typeof item?.url === 'string' && item.url)?.url
  const contentImage =
    typeof post?.content === 'object' &&
    post?.content &&
    Array.isArray((post.content as { images?: string[] }).images)
      ? (post.content as { images?: string[] }).images?.find((url) => typeof url === 'string' && url)
      : null
  const logo =
    typeof post?.content === 'object' && post?.content && typeof (post.content as { logo?: string }).logo === 'string'
      ? (post.content as { logo?: string }).logo
      : null
  return mediaUrl || contentImage || logo || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200&q=80&auto=format&fit=crop'
}

function getCategory(post: SitePost): string {
  const content = post.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
  return (typeof content.category === 'string' && content.category) || post.tags?.[0] || 'Press Release'
}

function excerpt(text?: string | null, max = 160) {
  const value = (text || '').trim()
  if (!value) return 'Open the release for the full announcement and supporting context.'
  return value.length > max ? value.slice(0, max - 1).trimEnd() + '…' : value
}

function formatDate(iso?: string | null) {
  if (!iso) return ''
  try {
    return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  } catch {
    return ''
  }
}

export async function HomePageOverride() {
  const posts = await fetchTaskPosts('mediaDistribution', 12, { fresh: true })
  const hero = posts[0]
  const featured = posts.slice(1, 4)
  const grid = posts.slice(4, 10)

  const stats = [
    { label: 'Press Releases', value: '12,000+', icon: Newspaper },
    { label: 'Media Outlets', value: '850+', icon: Radio },
    { label: 'Countries Reached', value: '60+', icon: Globe2 },
    { label: 'Monthly Readers', value: '2.4M', icon: TrendingUp },
  ]

  const categories = [
    { label: 'Business', href: '/updates?category=business', color: 'bg-[#FFB997]/20 text-[#843B62] border-[#FFB997]/40' },
    { label: 'Technology', href: '/updates?category=technology', color: 'bg-[#F67E7D]/15 text-[#843B62] border-[#F67E7D]/35' },
    { label: 'Finance', href: '/updates?category=finance', color: 'bg-[#843B62]/10 text-[#843B62] border-[#843B62]/25' },
    { label: 'Healthcare', href: '/updates?category=healthcare', color: 'bg-[#FFB997]/20 text-[#843B62] border-[#FFB997]/40' },
    { label: 'Energy', href: '/updates?category=energy', color: 'bg-[#F67E7D]/15 text-[#843B62] border-[#F67E7D]/35' },
  ]

  return (
    <div className="min-h-screen bg-[#fdf8f5] text-[#0B032D]">
      <NavbarShell />

      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-[#0B032D]">
        {/* decorative gradient blobs */}
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="absolute -left-32 -top-32 h-[500px] w-[500px] rounded-full bg-[#843B62]/30 blur-[120px]" />
          <div className="absolute -right-20 top-20 h-[400px] w-[400px] rounded-full bg-[#F67E7D]/20 blur-[100px]" />
          <div className="absolute bottom-0 left-1/2 h-[300px] w-[600px] -translate-x-1/2 rounded-full bg-[#FFB997]/10 blur-[80px]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-14 sm:px-6 lg:px-8 lg:pb-20 lg:pt-20">
          {/* ticker bar */}
          <div className="mb-8 flex items-center gap-3 overflow-hidden rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-sm">
            <span className="shrink-0 rounded-full bg-[#F67E7D] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.2em] text-white">
              Live Wire
            </span>
            <p className="truncate text-sm text-white/70">
              {hero?.title || 'Latest press releases and media announcements from global organizations'}
            </p>
            <Link href="/updates" className="ml-auto shrink-0 text-xs font-semibold text-[#FFB997] hover:text-white">
              View all →
            </Link>
          </div>

          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#843B62]/40 bg-[#843B62]/20 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#FFB997]">
                <Megaphone className="h-3.5 w-3.5" />
                Media Press Release Hub
              </div>
              <h1 className="mt-5 font-[family-name:var(--font-display)] text-4xl font-semibold leading-[1.06] tracking-[-0.035em] text-white sm:text-5xl lg:text-[3.2rem]">
                Your source for verified press releases and media announcements.
              </h1>
              <p className="mt-5 text-lg leading-relaxed text-white/75">
                {SITE_CONFIG.description}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/updates"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#843B62] to-[#F67E7D] px-6 text-sm font-semibold text-white shadow-lg shadow-[#843B62]/30 transition hover:opacity-90"
                >
                  Browse Releases
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/create/mediaDistribution"
                  className="inline-flex h-12 items-center justify-center rounded-full border border-white/25 bg-white/8 px-6 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/15"
                >
                  Submit a Release
                </Link>
              </div>

              {/* category pills */}
              <div className="mt-8 flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <Link
                    key={cat.label}
                    href={cat.href}
                    className="rounded-full border border-white/15 bg-white/8 px-3 py-1.5 text-xs font-medium text-white/80 transition hover:bg-white/15 hover:text-white"
                  >
                    {cat.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* hero featured card */}
            {hero ? (
              <Link
                href={`/updates/${hero.slug}`}
                className="group relative overflow-hidden rounded-[2rem] border border-white/10 shadow-[0_40px_100px_rgba(11,3,45,0.5)] transition hover:border-[#F67E7D]/40"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <ContentImage
                    src={getPostImage(hero)}
                    alt={hero.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    priority
                    intrinsicWidth={800}
                    intrinsicHeight={600}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B032D] via-[#0B032D]/40 to-transparent" />
                </div>
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <span className="inline-block rounded-full bg-[#F67E7D] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-white">
                    {getCategory(hero)}
                  </span>
                  <h2 className="mt-3 font-[family-name:var(--font-display)] text-xl font-semibold leading-snug text-white sm:text-2xl">
                    {hero.title}
                  </h2>
                  <p className="mt-2 line-clamp-2 text-sm text-white/70">{excerpt(hero.summary, 120)}</p>
                  <div className="mt-4 flex items-center gap-2 text-xs text-white/50">
                    <Clock className="h-3.5 w-3.5" />
                    {formatDate(hero.publishedAt) || 'Latest release'}
                  </div>
                </div>
              </Link>
            ) : null}
          </div>
        </div>
      </section>

      {/* ── STATS STRIP ── */}
      <section className="border-y border-[#f0d8cc] bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#FFB997]/30 to-[#F67E7D]/20">
                  <stat.icon className="h-5 w-5 text-[#843B62]" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-[#0B032D]">{stat.value}</p>
                  <p className="text-xs text-[#3d2a4a]/70">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED RELEASES ── */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#843B62]/20 bg-[#843B62]/8 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#843B62]">
                <Radio className="h-3.5 w-3.5" />
                Featured Releases
              </div>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">Top stories this week</h2>
            </div>
            <Link href="/updates" className="hidden items-center gap-1.5 text-sm font-semibold text-[#843B62] hover:text-[#F67E7D] sm:flex">
              View all <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          {featured.length ? (
            <div className="mt-10 grid gap-6 lg:grid-cols-3">
              {featured.map((post, i) => (
                <Link
                  key={post.id}
                  href={`/updates/${post.slug}`}
                  className="group flex flex-col overflow-hidden rounded-[1.8rem] border border-[#f0d8cc] bg-white shadow-[0_12px_40px_rgba(11,3,45,0.06)] transition hover:-translate-y-1 hover:border-[#F67E7D]/40 hover:shadow-[0_20px_60px_rgba(132,59,98,0.12)]"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#fce8df]">
                    <ContentImage
                      src={getPostImage(post)}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                      sizes="(max-width: 768px) 100vw, 33vw"
                      intrinsicWidth={640}
                      intrinsicHeight={400}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B032D]/30 to-transparent opacity-60" />
                    <span className="absolute left-4 top-4 rounded-full bg-[#843B62] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white">
                      {getCategory(post)}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="line-clamp-2 text-lg font-semibold leading-snug text-[#0B032D] group-hover:text-[#843B62]">
                      {post.title}
                    </h3>
                    <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-[#3d2a4a]/70">{excerpt(post.summary)}</p>
                    <div className="mt-auto flex items-center justify-between pt-4">
                      <span className="text-xs text-[#3d2a4a]/50">{formatDate(post.publishedAt)}</span>
                      <span className="text-xs font-semibold text-[#843B62]">Read more →</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="mt-10 rounded-[2rem] border border-dashed border-[#f0d8cc] bg-white p-12 text-center">
              <p className="text-lg font-semibold text-[#0B032D]">Your wire is ready for the first announcement.</p>
              <p className="mt-2 text-sm text-[#3d2a4a]/70">Connect your publishing feed or submit a release to see stories appear here.</p>
              <Link href="/create/mediaDistribution" className="mt-6 inline-flex h-11 items-center justify-center rounded-full bg-[#843B62] px-6 text-sm font-semibold text-white">
                Draft a release
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* ── CATEGORIES BAND ── */}
      <section className="border-y border-[#f0d8cc] bg-gradient-to-r from-[#0B032D] to-[#843B62] py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:justify-between sm:text-left">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#FFB997]">Browse by topic</p>
              <h2 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">Find releases in your industry</h2>
            </div>
            <div className="flex flex-wrap justify-center gap-2 sm:justify-end">
              {categories.map((cat) => (
                <Link
                  key={cat.label}
                  href={cat.href}
                  className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/20"
                >
                  {cat.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── LATEST GRID ── */}
      <section className="bg-[#fdf0ea]/50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl font-semibold tracking-[-0.03em]">Latest from the wire</h2>
              <p className="mt-2 text-sm text-[#3d2a4a]/70">Fresh press releases — updated continuously.</p>
            </div>
            <Link href="/updates" className="hidden items-center gap-1.5 text-sm font-semibold text-[#843B62] hover:text-[#F67E7D] sm:flex">
              Full archive <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          {grid.length ? (
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {grid.map((post) => (
                <Link
                  key={post.id}
                  href={`/updates/${post.slug}`}
                  className="group flex gap-4 rounded-2xl border border-[#f0d8cc] bg-white p-4 shadow-sm transition hover:border-[#F67E7D]/40 hover:shadow-md"
                >
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-[#fce8df]">
                    <ContentImage
                      src={getPostImage(post)}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="80px"
                      intrinsicWidth={160}
                      intrinsicHeight={160}
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#F67E7D]">{getCategory(post)}</span>
                    <h3 className="mt-1 line-clamp-2 text-sm font-semibold leading-snug text-[#0B032D] group-hover:text-[#843B62]">
                      {post.title}
                    </h3>
                    <p className="mt-1 text-xs text-[#3d2a4a]/50">{formatDate(post.publishedAt)}</p>
                  </div>
                </Link>
              ))}
            </div>
          ) : null}

          <div className="mt-10 text-center">
            <Link
              href="/updates"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full border-2 border-[#843B62] px-8 text-sm font-semibold text-[#843B62] transition hover:bg-[#843B62] hover:text-white"
            >
              View all press releases
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="border-t border-[#f0d8cc] bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#843B62]/20 bg-[#843B62]/8 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#843B62]">
              <BarChart2 className="h-3.5 w-3.5" />
              How it works
            </div>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">From draft to distribution in minutes</h2>
            <p className="mt-4 text-[#3d2a4a]/70">A streamlined workflow for communications teams that need speed without sacrificing credibility.</p>
          </div>

          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {[
              {
                step: '01',
                title: 'Write & Structure',
                body: 'Compose your release with a clear headline, lead paragraph, and supporting details. Our structured format ensures every element is in the right place.',
                color: 'from-[#FFB997]/30 to-[#FFB997]/10',
                border: 'border-[#FFB997]/40',
              },
              {
                step: '02',
                title: 'Publish to the Wire',
                body: 'Submit your release to the markets.trendopr.com archive with category tags and metadata. Your announcement gets a canonical URL instantly shareable with stakeholders.',
                color: 'from-[#F67E7D]/25 to-[#F67E7D]/8',
                border: 'border-[#F67E7D]/35',
              },
              {
                step: '03',
                title: 'Track & Distribute',
                body: 'Monitor engagement, share with media contacts, and keep a permanent public record. Readers can filter by category and date to find exactly what they need.',
                color: 'from-[#843B62]/20 to-[#843B62]/5',
                border: 'border-[#843B62]/25',
              },
            ].map((item) => (
              <div
                key={item.step}
                className={`relative overflow-hidden rounded-[1.8rem] border ${item.border} bg-gradient-to-br ${item.color} p-7`}
              >
                <span className="text-5xl font-bold text-[#0B032D]/8">{item.step}</span>
                <h3 className="mt-2 text-xl font-semibold text-[#0B032D]">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#3d2a4a]/75">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="relative overflow-hidden bg-[#0B032D] py-16">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="absolute right-0 top-0 h-[300px] w-[300px] rounded-full bg-[#843B62]/25 blur-[80px]" />
          <div className="absolute bottom-0 left-0 h-[200px] w-[400px] rounded-full bg-[#F67E7D]/15 blur-[60px]" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
            <div className="max-w-2xl">
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#FFB997]">Ready to publish?</p>
              <h2 className="mt-3 text-3xl font-semibold leading-snug text-white sm:text-4xl">
                Put your next announcement on the wire with confidence.
              </h2>
              <p className="mt-4 text-white/65">
                Join thousands of communications teams who trust markets.trendopr.com for disciplined, credible press distribution.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/create/mediaDistribution"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#FFB997] to-[#F67E7D] px-6 text-sm font-semibold text-[#0B032D] shadow-lg transition hover:opacity-90"
              >
                Submit a release
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex h-12 items-center justify-center rounded-full border border-white/25 px-6 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Talk to us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── ABOUT STRIP ── */}
      <section className="border-t border-[#f0d8cc] bg-white py-14 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 text-sm leading-relaxed text-[#3d2a4a]/75 sm:px-6 lg:px-8">
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-[#0B032D]">Welcome to {SITE_CONFIG.name}</h2>
          <p className="mt-4">
            {SITE_CONFIG.name} is a press-first distribution surface for teams that care about clarity. We bias toward legible
            headlines, credible metadata, and archive tooling that helps readers find the right story in seconds.
          </p>
          <p className="mt-4">
            Whether you are announcing product milestones, executive moves, or policy updates, the same system powers your public
            record: structured posts, responsive layouts, and shareable URLs you can hand to stakeholders with confidence.
          </p>
          <p className="mt-4">
            Explore the{' '}
            <Link href="/updates" className="font-semibold text-[#843B62] underline-offset-4 hover:underline">
              latest releases
            </Link>
            , or{' '}
            <Link href="/contact" className="font-semibold text-[#843B62] underline-offset-4 hover:underline">
              contact the desk
            </Link>{' '}
            for a tailored walkthrough.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  )
}
