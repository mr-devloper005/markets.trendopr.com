import { NavbarShell } from "@/components/shared/navbar-shell";
import { Footer } from "@/components/shared/footer";
import { Search } from "lucide-react";
import { fetchSiteFeed } from "@/lib/site-connector";
import { buildPostUrl, getPostTaskKey } from "@/lib/task-data";
import { getMockPostsForTask } from "@/lib/mock-posts";
import { SITE_CONFIG } from "@/lib/site-config";
import { TaskPostCard } from "@/components/shared/task-post-card";
import { CATEGORY_OPTIONS } from "@/lib/categories";

export const revalidate = 3;

const matchText = (value: string, query: string) =>
  value.toLowerCase().includes(query);

const stripHtml = (value: string) => value.replace(/<[^>]*>/g, " ");

const compactText = (value: unknown) => {
  if (typeof value !== "string") return "";
  return stripHtml(value).replace(/\s+/g, " ").trim().toLowerCase();
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams?: Promise<{ q?: string; category?: string; task?: string; master?: string }>;
}) {
  const resolved = (await searchParams) || {};
  const query = (resolved.q || "").trim();
  const normalized = query.toLowerCase();
  const rawCategory = (resolved.category || "").trim().toLowerCase();
  const rawTask = (resolved.task || "").trim().toLowerCase();
  const category = rawCategory === "all" ? "" : rawCategory;
  const task = rawTask === "all" ? "" : rawTask;
  const useMaster = resolved.master !== "0";
  const feed = await fetchSiteFeed(
    useMaster ? 1000 : 300,
    useMaster
      ? { fresh: true, category: category || undefined, task: task || undefined }
      : undefined
  );
  const posts =
    feed?.posts?.length
      ? feed.posts
      : useMaster
        ? []
        : SITE_CONFIG.tasks.flatMap((task) => getMockPostsForTask(task.key));

  const filtered = posts.filter((post) => {
    const content = post.content && typeof post.content === "object" ? post.content : {};
    const typeText = compactText((content as any).type);
    if (typeText === "comment") return false;
    const description = compactText((content as any).description);
    const body = compactText((content as any).body);
    const excerpt = compactText((content as any).excerpt);
    const categoryText = compactText((content as any).category);
    const tags = Array.isArray(post.tags) ? post.tags.join(" ") : "";
    const tagsText = compactText(tags);
    const derivedCategory = categoryText || tagsText;
    if (category && !derivedCategory.includes(category)) return false;
    if (task && typeText && typeText !== task) return false;
    if (!normalized.length) return true;
    return (
      matchText(compactText(post.title || ""), normalized) ||
      matchText(compactText(post.summary || ""), normalized) ||
      matchText(description, normalized) ||
      matchText(body, normalized) ||
      matchText(excerpt, normalized) ||
      matchText(tagsText, normalized)
    );
  });

  const results = normalized.length > 0 ? filtered : filtered.slice(0, 24);

  return (
    <div className="min-h-screen bg-[#fdf8f5] text-[#0B032D]">
      <NavbarShell />
      <main>
        <section className="border-b border-[#f0d8cc] bg-white">
          <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
            <div className="max-w-3xl">
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#843B62]">Wire room</p>
              <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">Search Archive</h1>
              <p className="mt-4 text-base leading-relaxed text-[#3d2a4a]/70">
                {query
                  ? `Showing results for "${query}". Refine by category and lane to narrow your search.`
                  : "Browse the latest announcements across categories and publishing lanes."}
              </p>
            </div>

            <form action="/search" className="mt-10 rounded-2xl border border-[#f0d8cc] bg-[#fdf0ea]/60 p-5 sm:p-6">
              <input type="hidden" name="master" value="1" />
              <div className="grid gap-3 lg:grid-cols-[1.6fr_0.9fr_0.9fr_auto]">
                <div className="relative">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#3d2a4a]/55" />
                  <input
                    name="q"
                    defaultValue={query}
                    placeholder="Search headlines..."
                    className="h-11 w-full rounded-xl border border-[#f0d8cc] bg-white pl-9 pr-3 text-sm text-[#0B032D] outline-none ring-[#843B62]/25 focus:ring-2"
                  />
                </div>
                <select
                  name="category"
                  defaultValue={category || "all"}
                  className="h-11 w-full rounded-xl border border-[#f0d8cc] bg-white px-3 text-sm text-[#0B032D] outline-none ring-[#843B62]/25 focus:ring-2"
                >
                  <option value="all">All categories</option>
                  {CATEGORY_OPTIONS.map((item) => (
                    <option key={item.slug} value={item.slug}>
                      {item.name}
                    </option>
                  ))}
                </select>
                <select
                  name="task"
                  defaultValue={task || "all"}
                  className="h-11 w-full rounded-xl border border-[#f0d8cc] bg-white px-3 text-sm text-[#0B032D] outline-none ring-[#843B62]/25 focus:ring-2"
                >
                  <option value="all">All lanes</option>
                  {SITE_CONFIG.tasks
                    .filter((item) => item.enabled)
                    .map((item) => (
                      <option key={item.key} value={item.contentType || item.key}>
                        {item.label}
                      </option>
                    ))}
                </select>
                <button
                  type="submit"
                  className="h-11 rounded-xl bg-[#843B62] px-5 text-sm font-semibold text-white transition hover:bg-[#6e2f52]"
                >
                  Search
                </button>
              </div>
            </form>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          {results.length ? (
            <>
              <p className="mb-6 text-sm text-[#3d2a4a]/70">
                Found <span className="font-semibold text-[#0B032D]">{results.length}</span> result{results.length === 1 ? "" : "s"}
              </p>
              <div className="space-y-5">
                {results.map((post) => {
                  const taskKey = getPostTaskKey(post);
                  const href = taskKey ? buildPostUrl(taskKey, post.slug) : `/posts/${post.slug}`;
                  return <TaskPostCard key={post.id} post={post} href={href} taskKey={taskKey || "mediaDistribution"} />;
                })}
              </div>
            </>
          ) : (
            <div className="rounded-2xl border border-dashed border-[#f0d8cc] bg-white p-10 text-center text-[#3d2a4a]/70">
              No matching posts yet.
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}
