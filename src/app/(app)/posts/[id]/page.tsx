import { formatDate } from 'date-fns'
import { CalendarIcon, Eye, Mail, Users } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { fetchPost } from '@/actions/fetch-posts'
import { Badge } from '@/components/ui/badge'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { currentUser } from '@/lib/current-user'

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const id = (await params).id

  const post = await fetchPost(id)

  if (!post) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 py-40">
        <h2 className="text-2xl font-bold">404 - Not Found</h2>
        <p className="text-lg">The post you are looking for does not exist.</p>

        <Button asChild>
          <Link href="/">Return Home</Link>
        </Button>
      </div>
    )
  }

  const user = await currentUser()

  if (user) {
    // Increment the view count
    await fetch(
      `${process.env.NEXTAUTH_URL}/api/webhooks/waffle?email=${user.email}&id=${id}`,
    )
  }

  return (
    <div className="flex flex-row space-x-4 px-4">
      <div className="container mx-auto">
        <div className="mx-auto max-w-4xl">
          {/* Header Section */}
          <div className="mb-8 space-y-4">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{post.meta_default_title}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <div className="flex flex-wrap gap-2">
              {post.content_tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>

            <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
              {post.meta_default_title}
            </h1>

            <p className="text-xl text-muted-foreground">
              {post.meta_default_description}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <CalendarIcon className="h-4 w-4" />
                <time dateTime={post.publish_date}>
                  {formatDate(post.publish_date, 'LLLL d, yyyy')}
                </time>
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>{post.authors.join(', ')}</span>
              </div>
            </div>
          </div>

          {/* Featured Image */}
          {post.thumbnail_url && (
            <div className="relative mb-8 aspect-video w-full overflow-hidden rounded-lg">
              <Image
                src={'https://ui.shadcn.com/placeholder.svg'}
                alt=""
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          {/* Content */}
          <div className="prose prose-gray dark:prose-invert mx-auto max-w-none">
            <div
              dangerouslySetInnerHTML={{
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                __html: post.content[post.audience].web,
              }}
            />
          </div>

          {/* Stats Section */}
          {user?.role === 'ADMIN' && (
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardContent className="flex items-center gap-4 p-6">
                  <Eye className="h-8 w-8 text-muted-foreground" />
                  <div>
                    <p className="text-2xl font-bold">{post.stats.web.views}</p>
                    <p className="text-sm text-muted-foreground">Page Views</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="flex items-center gap-4 p-6">
                  <Mail className="h-8 w-8 text-muted-foreground" />
                  <div>
                    <p className="text-2xl font-bold">
                      {post.stats.email.opens}
                    </p>
                    <p className="text-sm text-muted-foreground">Email Opens</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="flex items-center gap-4 p-6">
                  <Users className="h-8 w-8 text-muted-foreground" />
                  <div>
                    <p className="text-2xl font-bold">
                      {post.stats.email.unique_opens}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Unique Opens
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
