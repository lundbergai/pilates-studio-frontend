import { createFileRoute } from '@tanstack/react-router'
import TanStackQueryDemo from '../components/TanStackQueryDemo'

export const Route = createFileRoute('/tanstack-query')({
  component: TanStackQueryDemo,
})
