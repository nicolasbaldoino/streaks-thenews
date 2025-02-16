export const fetchRead = async ({
  email,
}: {
  email: string
}): Promise<{ success: boolean; message: string }> => {
  const res = await fetch(
    `https://backend.testeswaffle.org/webhooks/case/fetch?email=${email}`,
  )
  const data = await res.json()
  return data
}
