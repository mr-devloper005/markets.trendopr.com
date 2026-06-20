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
    <div className="flex flex-col gap-5">
      <div className="rounded-xl border border-[#f0d8cc] bg-white p-4 sm:p-5">
        <label htmlFor="archive-category-select" className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-[#3d2a4a]/60">
          Category-wise search
        </label>
        <select
          id="archive-category-select"
          value={category}
          onChange={(e) => {
            router.push(buildUpdatesHref(e.target.value, range))
          }}
          className="mt-2 h-11 w-full rounded-xl border border-[#f0d8cc] bg-[#fff8f4] px-3 text-sm text-[#0B032D] outline-none ring-[#843B62]/30 focus:ring-2"
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
        <span className="mr-1 self-center text-[11px] font-semibold uppercase tracking-[0.18em] text-[#3d2a4a]/60">
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
                active ? 'bg-[#843B62] text-white shadow-sm' : 'bg-[#fce8df] text-[#3d2a4a] hover:bg-[#f0d8cc]'
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
