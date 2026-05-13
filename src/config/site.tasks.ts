export const siteTaskDefinitions = [
  {
    key: 'mediaDistribution',
    label: 'Release media',
    route: '/press-release',
    description: 'Latest announcements, launches, and media updates.',
    contentType: 'mediaDistribution',
    enabled: true,
  },
] as const

export const siteTaskViews = {
  mediaDistribution: '/press-release',
} as const
