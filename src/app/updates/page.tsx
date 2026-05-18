import { TaskListPage } from '@/components/tasks/task-list-page'
import { buildTaskMetadata } from '@/lib/seo'

export const revalidate = 3
export const generateMetadata = () => buildTaskMetadata('mediaDistribution')

export default async function UpdatesPage({
  searchParams,
}: {
  searchParams?: Promise<{ category?: string; range?: string }>
}) {
  const params = await searchParams

  return (
    <TaskListPage task="mediaDistribution" category={params?.category} dateRange={params?.range} />
  )
}
