import { QueryClient } from '@tanstack/react-query'

type ErrorWithStatus = {
  status?: number
}

const isErrorWithStatus = (error: unknown): error is ErrorWithStatus => {
  return typeof error === 'object' && error !== null && 'status' in error
}

const shouldRetry = (failureCount: number, error: unknown): boolean => {
  if (isErrorWithStatus(error) && typeof error.status === 'number') {
    // Avoid retry loops for auth/client-side errors.
    if (error.status >= 400 && error.status < 500) {
      return false
    }
  }

  return failureCount < 3
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      gcTime: 10 * 60 * 1000,
      retry: shouldRetry,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30_000),
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      networkMode: 'online',
    },
    mutations: {
      retry: shouldRetry,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30_000),
      networkMode: 'online',
    },
  },
})