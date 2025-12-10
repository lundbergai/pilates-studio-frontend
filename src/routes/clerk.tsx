import { createFileRoute } from '@tanstack/react-router'
import ClerkDemo from '../components/ClerkDemo'

export const Route = createFileRoute('/clerk')({
  component: ClerkDemo,
})
