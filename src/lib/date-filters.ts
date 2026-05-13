/** URL query helpers for archive pages (e.g. ?range=7d). */
export function parsePublishedAfter(dateRange?: string): Date | null {
  if (!dateRange || dateRange === 'all') return null
  const now = Date.now()
  const day = 86400000
  if (dateRange === '7d') return new Date(now - 7 * day)
  if (dateRange === '30d') return new Date(now - 30 * day)
  if (dateRange === '365d') return new Date(now - 365 * day)
  return null
}
