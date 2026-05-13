"use client";

import { useMemo } from "react";
import { TaskPostCard } from "@/components/shared/task-post-card";
import { buildPostUrl } from "@/lib/task-data";
import { normalizeCategory, isValidCategory } from "@/lib/categories";
import type { TaskKey } from "@/lib/site-config";
import type { SitePost } from "@/lib/site-connector";
import { getLocalPostsForTask } from "@/lib/local-posts";

type Props = {
  task: TaskKey;
  initialPosts: SitePost[];
  category?: string;
  /** When set, only posts published on or after this instant are shown (merged list). */
  publishedAfter?: Date | null;
};

export function TaskListClient({ task, initialPosts, category, publishedAfter }: Props) {
  const localPosts = getLocalPostsForTask(task);

  const merged = useMemo(() => {
    const bySlug = new Set<string>();
    const combined: Array<SitePost & { localOnly?: boolean; task?: TaskKey }> = [];

    localPosts.forEach((post) => {
      if (post.slug) {
        bySlug.add(post.slug);
      }
      combined.push(post);
    });

    initialPosts.forEach((post) => {
      if (post.slug && bySlug.has(post.slug)) return;
      combined.push(post);
    });

    const normalizedCategory = category ? normalizeCategory(category) : "all";
    const categoryFiltered =
      normalizedCategory === "all"
        ? combined.filter((post) => {
            const content = post.content && typeof post.content === "object" ? post.content : {};
            const value = typeof (content as any).category === "string" ? (content as any).category : "";
            return !value || isValidCategory(value);
          })
        : combined.filter((post) => {
            const content = post.content && typeof post.content === "object" ? post.content : {};
            const value =
              typeof (content as any).category === "string"
                ? normalizeCategory((content as any).category)
                : "";
            return value === normalizedCategory;
          });

    if (!publishedAfter) return categoryFiltered;

    const t0 = publishedAfter.getTime();
    return categoryFiltered.filter((post) => {
      const t = post.publishedAt ? new Date(post.publishedAt).getTime() : 0;
      return t >= t0;
    });
  }, [category, initialPosts, localPosts, publishedAfter]);

  if (!merged.length) {
    return (
      <div className="rounded-2xl border border-dashed border-border p-10 text-center text-muted-foreground">
        No posts yet for this section.
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {merged.map((post) => {
        const localOnly = (post as any).localOnly;
        const href = localOnly
          ? `/local/${task}/${post.slug}`
          : buildPostUrl(task, post.slug);
        return <TaskPostCard key={post.id} post={post} href={href} taskKey={task} />;
      })}
    </div>
  );
}
