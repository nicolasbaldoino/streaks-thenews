export const subscribe = async ({
  email,
}: {
  email: string
}): Promise<{
  data: {
    id: string
    email: string
    status: string
    utm_source: string
    utm_medium: string
    utm_campaign: string
    utm_channel: string
    referring_site: string
    created_at: string
  }
}> => {
  const res = await fetch(
    'https://backend.testeswaffle.org/webhooks/case/subscribe',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
      }),
    },
  )
  const data = await res.json()
  return data
}
