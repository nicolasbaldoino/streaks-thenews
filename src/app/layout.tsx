import './globals.css'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { getServerSession } from 'next-auth'
import { ThemeProvider } from 'next-themes'

import { AuthProvider } from '@/components/auth-provider'
import { QueryClientProvider } from '@/components/query-client-provider'
import { Toaster } from '@/components/ui/toaster'
import { authConfig } from '@/lib/auth-config'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'streaks 🔥',
    template: '%s | streaks 🔥',
  },
  description:
    'Track your daily streak and monitor your newsletter reading progress.',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await getServerSession(authConfig)

  return (
    <AuthProvider session={session}>
      <html lang="en" suppressHydrationWarning>
        <body className={`${inter.className} antialiased`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            disableTransitionOnChange
          >
            <QueryClientProvider>{children}</QueryClientProvider>
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </AuthProvider>
  )
}
