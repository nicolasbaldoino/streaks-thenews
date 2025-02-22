'use server'

export interface Post {
  id: string
  subtitle: string
  title: string
  authors: string[]
  created: string
  status: string
  split_tested: boolean
  subject_line: string
  preview_text: string
  slug: string
  thumbnail_url: string
  web_url: string
  audience: string
  platform: string
  content_tags: string[]
  hidden_from_feed: boolean
  publish_date: string
  displayed_date: string
  meta_default_description: string
  meta_default_title: string
  content: {
    free: {
      web: string
      email: string
      rss: string
    }
    premium: {
      web: string
      email: string
    }
  }
  stats: {
    email: {
      recipients: number
      delivered: number
      opens: number
      unique_opens: number
      clicks: number
      unique_clicks: number
      unsubscribes: number
      spam_reports: number
    }
    web: {
      views: number
      clicks: number
    }
    clicks: {
      total_clicks: number
      total_unique_clicks: number
      total_click_through_rate: number
    }[]
  }
}

// This is a mock function that simulates an API call to fetch posts
export const fetchPosts = async (): Promise<Post[]> => {
  const res = await fetch(
    'https://backend.testeswaffle.org/webhooks/case/publication/teste/post/post_00000000-0000-0000-0000-000000000000',
    {
      cache: 'force-cache',
    },
  )
  const { data } = await res.json()
  return [data]
}

// This is a mock function that simulates an API call to fetch a post
export const fetchPost = async (id: string): Promise<Post> => {
  const res = await fetch(
    `https://backend.testeswaffle.org/webhooks/case/publication/teste/post/${id}`,
    {
      cache: 'force-cache',
    },
  )
  const { data } = await res.json()
  return data
}
