import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  redirects: async () => [
    {
      source: '/auth',
      destination: '/auth/login',
      permanent: true,
    },
    {
      source: '/login',
      destination: '/auth/login',
      permanent: true,
    },
    {
      source: '/dashboard',
      destination: '/dashboard/analytics',
      permanent: true,
    },
  ],
}

export default nextConfig
