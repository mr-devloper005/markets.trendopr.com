import Link from 'next/link'
import { ArrowRight, BarChart3, FileText, Share2 } from 'lucide-react'
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

function excerpt(text?: string | null) {
  const value = (text || '').trim()
  if (!value) return 'Open the release for the full announcement and supporting context.'
  return value.length > 180 ? value.slice(0, 177).trimEnd() + '…' : value
}

export async function HomePageOverride() {
  const posts = await fetchTaskPosts('mediaDistribution', 12, { fresh: true })
  const grid = posts.slice(0, 9)

  const trust = [
    { src: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=320&q=70&auto=format&fit=crop', alt: 'Media partner spotlight one' },
    { src: 'https://images.unsplash.com/photo-1586339949916-3e9457bef6d3?w=320&q=70&auto=format&fit=crop', alt: 'Media partner spotlight two' },
    { src: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=320&q=70&auto=format&fit=crop', alt: 'Media partner spotlight three' },
    { src: 'https://images.unsplash.com/photo-1520607162513-77705c0f310d?w=320&q=70&auto=format&fit=crop', alt: 'Media partner spotlight four' },
    { src: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=320&q=70&auto=format&fit=crop', alt: 'Media partner spotlight five' },
  ]

  return (
    <div className="min-h-screen bg-[#fafafa] text-[#171717]">
      <NavbarShell />

      <section className="relative overflow-hidden bg-[#DA0037] text-white">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.18]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.35'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
          aria-hidden
        />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:flex lg:items-center lg:gap-12 lg:px-8 lg:py-20">
          <div className="max-w-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-white/80">Release media distribution</p>
            <h1 className="mt-4 font-[family-name:var(--font-display)] text-4xl font-semibold leading-[1.08] tracking-[-0.035em] sm:text-5xl lg:text-[3.15rem]">
              Reach journalists, readers, and search with wire-ready announcements.
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-white/90">{SITE_CONFIG.description}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/create/mediaDistribution"
                className="inline-flex h-12 items-center justify-center rounded-full bg-[#171717] px-6 text-sm font-semibold text-white shadow-lg shadow-black/20 transition hover:bg-black"
              >
                Submit a release
              </Link>
              <Link
                href="/updates"
                className="inline-flex h-12 items-center justify-center rounded-full border border-white/70 bg-white/10 px-6 text-sm font-semibold text-white backdrop-blur transition hover:bg-white hover:text-[#DA0037]"
              >
                Browse latest news
              </Link>
            </div>
          </div>
          <div className="relative mt-12 hidden flex-1 lg:mt-0 lg:block">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] border border-white/25 shadow-[0_40px_120px_rgba(0,0,0,0.35)]">
              <ContentImage
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=85&auto=format&fit=crop"
                alt="Communications team collaborating"
                fill
                className="object-cover"
                priority
                intrinsicWidth={1200}
                intrinsicHeight={900}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-[#ebebeb] bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">How TrendoPR works</h2>
            <p className="mt-4 text-[#444444]">
              A calm, repeatable flow from draft to distribution—without turning your newsroom into a generic feed template.
            </p>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {[
              {
                title: 'Prepare',
                body: 'Structure headlines, hero imagery, and compliance-friendly body copy in one editor.',
                icon: FileText,
              },
              {
                title: 'Distribute',
                body: 'Publish to your TrendoPR archive with categories that map cleanly to search and social previews.',
                icon: Share2,
              },
              {
                title: 'Track',
                body: 'Measure pickup momentum with engagement-friendly layouts designed for scanning on mobile and desktop.',
                icon: BarChart3,
              },
            ].map((step) => (
              <div
                key={step.title}
                className="rounded-2xl border border-[#e8e8e8] bg-[#fafafa] p-6 text-left shadow-[0_12px_40px_rgba(23,23,23,0.05)] transition hover:-translate-y-0.5 hover:border-[#DA0037]/25"
              >
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#171717] text-white">
                  <step.icon className="h-5 w-5" aria-hidden />
                </div>
                <h3 className="mt-5 text-xl font-semibold">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#444444]">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#EDEDED] py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-3xl font-semibold tracking-[-0.03em]">Latest release media</h2>
              <p className="mt-2 text-[#444444]">Fresh entries from the TrendoPR wire—optimized for fast scanning.</p>
            </div>
            <Link
              href="/updates"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#DA0037] hover:underline"
            >
              View all
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {grid.length ? (
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {grid.map((post) => (
                <Link
                  key={post.id}
                  href={`/updates/${post.slug}`}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-[#e0e0e0] bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#e5e5e5]">
                    <ContentImage
                      src={getPostImage(post)}
                      alt=""
                      fill
                      className="object-cover transition duration-500 group-hover:scale-[1.03]"
                      sizes="(max-width: 768px) 100vw, 33vw"
                      intrinsicWidth={800}
                      intrinsicHeight={500}
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#DA0037]">
                      {String((post.content as { category?: string } | undefined)?.category || 'Release media')}
                    </p>
                    <h3 className="mt-2 line-clamp-2 text-lg font-semibold leading-snug text-[#171717] group-hover:text-[#DA0037]">
                      {post.title}
                    </h3>
                    <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-[#444444]">{excerpt(post.summary)}</p>
                    <span className="mt-4 text-xs font-semibold uppercase tracking-[0.16em] text-[#171717]">Read story →</span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="mt-10 rounded-2xl border border-dashed border-[#cfcfcf] bg-white p-12 text-center text-[#444444]">
              <p className="text-lg font-semibold text-[#171717]">Your wire is ready for the first announcement.</p>
              <p className="mt-2 text-sm">Connect your publishing feed or submit a release to see stories appear here.</p>
              <Link
                href="/create/mediaDistribution"
                className="mt-6 inline-flex h-11 items-center justify-center rounded-full bg-[#DA0037] px-6 text-sm font-semibold text-white"
              >
                Draft a release
              </Link>
            </div>
          )}
        </div>
      </section>

      <section className="border-y border-[#ebebeb] bg-white py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-center text-[11px] font-semibold uppercase tracking-[0.28em] text-[#444444]">
            Trusted by teams who need disciplined coverage
          </p>
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-5">
            {trust.map((item) => (
              <div
                key={item.alt}
                className="relative aspect-[5/3] overflow-hidden rounded-xl border border-[#e8e8e8] bg-[#f4f4f4]"
              >
                <ContentImage
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover grayscale contrast-125"
                  sizes="(max-width: 640px) 50vw, 20vw"
                  intrinsicWidth={320}
                  intrinsicHeight={192}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <h2 className="text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">Distribution without the clutter</h2>
              <p className="mt-4 text-[#444444]">
                TrendoPR keeps the story first: readable type, confident spacing, and surfaces that feel like a modern wire—not a
                repurposed directory skin.
              </p>
              <ul className="mt-8 space-y-4 text-sm text-[#444444]">
                <li className="flex gap-3">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#DA0037]" />
                  Category-aware archive with publish-window filters for busy readers.
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#DA0037]" />
                  Detail pages with hero imagery, share tools, and related releases.
                </li>
              </ul>
            </div>
            <div className="relative overflow-hidden rounded-[2rem] border border-[#e8e8e8] bg-[#EDEDED] shadow-[0_30px_80px_rgba(23,23,23,0.08)]">
              <div className="relative aspect-[4/5] max-h-[520px]">
                <ContentImage
                  src="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=900&q=85&auto=format&fit=crop"
                  alt="Analyst reviewing coverage"
                  fill
                  className="object-cover"
                  intrinsicWidth={900}
                  intrinsicHeight={1120}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#DA0037] py-14 text-white">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-4 sm:px-6 lg:flex-row lg:items-center lg:px-8">
          <p className="max-w-3xl text-2xl font-semibold leading-snug sm:text-3xl">
            Ready to put your next launch on the wire?
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="inline-flex h-12 items-center justify-center rounded-full border border-white/70 px-6 text-sm font-semibold text-white hover:bg-white/10"
            >
              Talk to us
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-[#ebebeb] bg-white py-14 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 text-sm leading-relaxed text-[#444444] sm:px-6 lg:px-8">
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-[#171717]">Welcome to TrendoPR</h2>
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
            <Link href="/updates" className="font-semibold text-[#DA0037] underline-offset-4 hover:underline">
              latest releases
            </Link>
            , or{' '}
            <Link href="/contact" className="font-semibold text-[#DA0037] underline-offset-4 hover:underline">
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
