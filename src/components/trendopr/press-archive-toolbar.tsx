'use client'

import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { CATEGORY_OPTIONS } from '@/lib/categories'

function buildUpdatesHref(category: string, range: string) {
  const p = new URLSearchParams()
  if (category && category !== 'all') p.set('category', category)
  if (range && range !== 'all') p.set('range', range)
  const q = p.toString()
  return q ? `/updates?${q}` : '/updates'
}

export function PressArchiveToolbar() {
  const router = useRouter()
  const sp = useSearchParams()
  const category = sp.get('category') || 'all'
  const range = sp.get('range') || 'all'

  const ranges = [
    { label: 'Any time', value: 'all' },
    { label: 'Past 7 days', value: '7d' },
    { label: 'Past 30 days', value: '30d' },
    { label: 'Past year', value: '365d' },
  ] as const

  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
      <div className="min-w-[220px]">
        <label htmlFor="archive-category" className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-[#444444]">
          Category
        </label>
        <select
          id="archive-category"
          value={category}
          onChange={(e) => router.push(buildUpdatesHref(e.target.value, range))}
          className="mt-1.5 h-11 w-full rounded-xl border border-[#e0e0e0] bg-white px-3 text-sm text-[#171717] outline-none ring-[#DA0037]/30 focus:ring-2"
        >
          <option value="all">All categories</option>
          {CATEGORY_OPTIONS.map((item) => (
            <option key={item.slug} value={item.slug}>
              {item.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-wrap gap-2">
        <span className="mr-1 self-center text-[11px] font-semibold uppercase tracking-[0.18em] text-[#444444]">
          Published
        </span>
        {ranges.map((r) => {
          const active = range === r.value || (r.value === 'all' && (!range || range === 'all'))
          return (
            <Link
              key={r.value}
              href={buildUpdatesHref(category, r.value)}
              scroll={false}
              className={`rounded-full px-3 py-1.5 text-sm font-medium transition ${
                active ? 'bg-[#DA0037] text-white shadow-sm' : 'bg-[#EDEDED] text-[#444444] hover:bg-[#e0e0e0]'
              }`}
            >
              {r.label}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
