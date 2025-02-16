'use server'

// This is a mock function that simulates an API call to fetch posts
export const fetchPosts = async () => {
  const res = await fetch(
    'https://backend.testeswaffle.org/webhooks/case/publication/teste/post/post_00000000-0000-0000-0000-000000000000',
    {
      cache: 'force-cache',
    },
  )
  const { data } = await res.json()
  return [data]
}
