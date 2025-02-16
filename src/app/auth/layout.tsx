import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Login',
  description:
    'Log in to your streaks account to track your daily streak and monitor your newsletter reading progress.',
}

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <div className="w-full max-w-sm">{children}</div>
    </div>
  )
}
