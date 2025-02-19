'use server'

export const subscribe = async (formData: FormData) => {
  const email = formData.get('email')

  await fetch('https://backend.testeswaffle.org/webhooks/case/subscribe', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
    }),
  })
}
