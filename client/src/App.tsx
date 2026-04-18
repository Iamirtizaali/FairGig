import { AppRouter } from '@/routes'

/**
 * App.tsx — Root component.
 *
 * Responsibilities:
 *  - Mount the router
 *  - Keep route tree independent from global providers
 */
export default function App() {
  return <AppRouter />
}