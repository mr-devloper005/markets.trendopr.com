import type { TaskKey } from '@/lib/site-config'

export const siteContent = {
  navbar: {
    tagline: 'Release media distribution',
  },
  footer: {
    tagline: 'Reach journalists, readers, and partners with structured releases.',
  },
  hero: {
    badge: 'Press desk',
    title: ['Distribute announcements with editorial clarity.'],
    description:
      'TrendoPR.com is built for communications teams that need dependable publishing, consistent formatting, and a public archive visitors can scan in seconds.',
    primaryCta: {
      label: 'Browse release media',
      href: '/press-release',
    },
    secondaryCta: {
      label: 'View pricing',
      href: '/pricing',
    },
    searchPlaceholder: 'Search releases',
    focusLabel: 'Latest',
    featureCardBadge: 'Distribution',
    featureCardTitle: 'Wire-ready structure for every announcement.',
    featureCardDescription:
      'Headlines, hero imagery, and body copy stay readable on every device while your archive stays easy to filter.',
  },
  home: {
    metadata: {
      title: 'TrendoPR.com — Release media distribution',
      description:
        'Publish announcements, reach media lists, and keep a polished public archive with TrendoPR.com.',
      openGraphTitle: 'TrendoPR.com — Release media distribution',
      openGraphDescription:
        'Editorial-grade release media, distribution workflows, and a searchable archive for your organization.',
      keywords: ['release media', 'media distribution', 'announcements', 'PR wire', 'TrendoPR'],
    },
    introBadge: 'Why TrendoPR',
    introTitle: 'Built for communications velocity without noisy feeds.',
    introParagraphs: [
      'The homepage highlights your newest wire stories first, then guides visitors into pricing, archive search, and contact paths.',
      'Every page uses the same ink, accent, and spacing system so the product feels intentional—not like a recolored template.',
      'When your feed is connected, cards populate automatically; when it is quiet, the layout still presents a confident, empty-safe frame.',
    ],
    sideBadge: 'What you get',
    sidePoints: [
      'Structured release pages with hero imagery and share tools.',
      'Archive filters for category and publish window.',
      'Pricing tiers with clear distribution metaphors.',
      'Contact surfaces that mirror enterprise PR workflows.',
    ],
    primaryLink: {
      label: 'Open archive',
      href: '/press-release',
    },
    secondaryLink: {
      label: 'Talk to us',
      href: '/contact',
    },
  },
  cta: {
    badge: 'Ready to publish',
    title: 'Put your next announcement on the wire with confidence.',
    description:
      'Pair TrendoPR.com with your editorial process—draft, approve, publish, and point stakeholders to a single canonical URL.',
    primaryCta: {
      label: 'Contact sales',
      href: '/contact',
    },
    secondaryCta: {
      label: 'See pricing',
      href: '/pricing',
    },
  },
  taskSectionHeading: 'Latest release media',
  taskSectionDescriptionSuffix: 'Fresh stories from the TrendoPR wire.',
} as const

export const taskPageMetadata: Record<Exclude<TaskKey, 'comment' | 'org' | 'social'>, { title: string; description: string }> = {
  article: {
    title: 'Articles',
    description: 'Read the latest posts and long-form updates.',
  },
  listing: {
    title: 'Listings',
    description: 'Explore listings and directory-style entries.',
  },
  classified: {
    title: 'Classifieds',
    description: 'Browse classifieds and short-form notices.',
  },
  image: {
    title: 'Images',
    description: 'Browse image-led updates and visual posts.',
  },
  profile: {
    title: 'Profiles',
    description: 'View profile pages and public identities.',
  },
  sbm: {
    title: 'Bookmarks',
    description: 'Browse curated resources and saved links.',
  },
  pdf: {
    title: 'Resources',
    description: 'Open PDFs and downloadable files.',
  },
  mediaDistribution: {
    title: 'Release media',
    description: 'Browse the TrendoPR.com wire—announcements, launches, and media updates.',
  },
}

export const taskIntroCopy: Record<
  TaskKey,
  { title: string; paragraphs: string[]; links: { label: string; href: string }[] }
> = {
  listing: { title: 'Listings', paragraphs: ['Directory entries and service pages.'], links: [{ label: 'Home', href: '/' }] },
  article: { title: 'Articles', paragraphs: ['General long-form article feed.'], links: [{ label: 'Home', href: '/' }] },
  classified: { title: 'Classifieds', paragraphs: ['Short-form posts and notices.'], links: [{ label: 'Home', href: '/' }] },
  image: { title: 'Images', paragraphs: ['Image-first posts and galleries.'], links: [{ label: 'Home', href: '/' }] },
  profile: { title: 'Profiles', paragraphs: ['Profile pages and identity surfaces.'], links: [{ label: 'Home', href: '/' }] },
  sbm: { title: 'Bookmarks', paragraphs: ['Curated saved links and references.'], links: [{ label: 'Home', href: '/' }] },
  pdf: { title: 'Resources', paragraphs: ['Downloadable files and documents.'], links: [{ label: 'Home', href: '/' }] },
  social: { title: 'Social', paragraphs: ['Short updates and activity.'], links: [{ label: 'Home', href: '/' }] },
  comment: { title: 'Comments', paragraphs: ['Commentary and response posts.'], links: [{ label: 'Home', href: '/' }] },
  org: { title: 'Organizations', paragraphs: ['Organization pages and entities.'], links: [{ label: 'Home', href: '/' }] },
  mediaDistribution: {
    title: 'Release media',
    paragraphs: [
      'This archive mirrors a classic wire: bold headlines, readable summaries, and fast filters for category and publish window.',
      'Open any card to read the full story, share it outward, and explore related releases without leaving the TrendoPR system.',
    ],
    links: [
      { label: 'Home', href: '/' },
      { label: 'Pricing', href: '/pricing' },
    ],
  },
}
