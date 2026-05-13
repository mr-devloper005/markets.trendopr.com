import { Suspense } from 'react'
import Link from 'next/link'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { TaskListClient } from '@/components/tasks/task-list-client'
import { fetchTaskPosts } from '@/lib/task-data'
import type { TaskKey } from '@/lib/site-config'
import { normalizeCategory } from '@/lib/categories'
import { parsePublishedAfter } from '@/lib/date-filters'
import { PressArchiveToolbar } from '@/components/trendopr/press-archive-toolbar'
import { SITE_CONFIG } from '@/lib/site-config'

export const TASK_LIST_PAGE_OVERRIDE_ENABLED = true

export async function TaskListPageOverride({
  category,
  dateRange,
}: {
  task: TaskKey
  category?: string
  dateRange?: string
}) {
  const posts = await fetchTaskPosts('mediaDistribution', 48, { fresh: true })
  const normalizedCategory = category ? normalizeCategory(category) : 'all'
  const publishedAfter = parsePublishedAfter(dateRange)

  return (
    <div className="min-h-screen bg-[#f4f4f4] text-[#171717]">
      <NavbarShell />
      <main>
        <section className="border-b border-[#e8e8e8] bg-white">
          <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#DA0037]">Wire room</p>
                <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">Release media archive</h1>
                <p className="mt-4 text-base leading-relaxed text-[#444444]">
                  Browse announcements by category or narrow the feed by publish window. Open any card for the full story,
                  imagery, and share tools.
                </p>
              </div>
              <Link
                href="/create/mediaDistribution"
                className="inline-flex h-12 shrink-0 items-center justify-center rounded-full border-2 border-[#DA0037] bg-white px-6 text-sm font-semibold text-[#DA0037] transition hover:bg-[#DA0037] hover:text-white"
              >
                Submit a release
              </Link>
            </div>

            <div className="mt-10 rounded-2xl border border-[#ededed] bg-[#fafafa] p-5 sm:p-6">
              <Suspense
                fallback={
                  <div className="h-11 w-full max-w-md animate-pulse rounded-xl bg-[#ededed]" aria-hidden />
                }
              >
                <PressArchiveToolbar />
              </Suspense>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <p className="text-sm text-[#444444]">
              Showing releases for <span className="font-semibold text-[#171717]">{SITE_CONFIG.name}</span>
            </p>
            <form action="/search" method="get" className="flex w-full max-w-md gap-2 sm:w-auto">
              <input
                name="q"
                type="search"
                placeholder="Search headlines…"
                className="h-11 flex-1 rounded-xl border border-[#e0e0e0] bg-white px-4 text-sm outline-none ring-[#DA0037]/25 focus:ring-2"
              />
              <button
                type="submit"
                className="h-11 rounded-xl bg-[#171717] px-5 text-sm font-semibold text-white transition hover:bg-[#2a2a2a]"
              >
                Search
              </button>
            </form>
          </div>

          <TaskListClient
            task="mediaDistribution"
            initialPosts={posts}
            category={normalizedCategory}
            publishedAfter={publishedAfter}
          />
        </section>
      </main>
      <Footer />
    </div>
  )
}
