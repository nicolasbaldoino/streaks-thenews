'use client'

import { QueryClientProvider as Provider } from '@tanstack/react-query'

import { queryClient } from '@/lib/react-query'

export const QueryClientProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return <Provider client={queryClient}>{children}</Provider>
}
