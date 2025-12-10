import { createFileRoute } from '@tanstack/react-router'
import TanStackQueryDemo from '../../components/TanStackQueryDemo'

export const Route = createFileRoute('/demo/tanstack-query')({
  component: TanStackQueryDemo,
})
