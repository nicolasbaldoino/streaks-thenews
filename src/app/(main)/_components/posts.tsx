import { format } from 'date-fns'

import { fetchPosts } from '@/actions/fetch-posts'
import { Separator } from '@/components/ui/separator'

export const Posts = async () => {
  const posts = await fetchPosts()

  return (
    <div>
      <Separator className="mb-6 mt-4" />
      <div className="text-2xl font-semibold leading-none">Latest Posts</div>
      {posts.length === 0 && (
        <div className="mx-auto w-full px-4 py-10">
          <div className="text-center text-muted-foreground">
            No posts available. Subscribe to our newsletter to stay updated.
          </div>
        </div>
      )}
      <div className="mx-auto grid w-full max-w-screen-lg grid-cols-1 gap-4 px-3 py-6 md:grid-cols-3 lg:px-4 xl:px-0">
        {posts.map((post) => (
          <a
            key={post.id}
            href={`/posts/${post.id}`}
            className="flex flex-col rounded-lg border border-border transition-all hover:shadow-lg"
          >
            {/* eslint-disable-next-line jsx-a11y/alt-text, @next/next/no-img-element */}
            <img
              className="aspect-[1200/630] rounded-t-lg object-cover blur-0"
              src="https://ui.shadcn.com/placeholder.svg"
            />
            <div className="flex flex-1 flex-col justify-between rounded-b-lg bg-background p-6">
              <div>
                <h2 className="font-display line-clamp-2 text-lg font-bold text-foreground">
                  {post.meta_default_title}
                </h2>
                <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                  {post.meta_default_description}
                </p>
              </div>
              <div className="mt-4 flex items-center space-x-2">
                <div className="flex items-center -space-x-2">
                  {/* eslint-disable-next-line jsx-a11y/alt-text, @next/next/no-img-element */}
                  <img
                    alt={post.authors[0]}
                    width="32"
                    height="32"
                    className="rounded-full blur-0 transition-all group-hover:brightness-90"
                    src={`https://avatar.vercel.sh/${post.authors[0]}`}
                  />
                </div>
                <div className="text-sm text-muted-foreground">
                  {post.authors[0]}
                  <div className="text-xs text-muted-foreground">
                    {format(new Date(post.publish_date), 'MMMM dd, yyyy')}
                  </div>
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}
