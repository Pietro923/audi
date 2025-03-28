// app/page.tsx
import Hero from '@/components/home/hero'
import Models from '@/components/home/models'
import Contact from '@/components/home/contact'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-gray-50 dark:bg-gray-900">
      <Hero />
      <Models />
      <Contact />
    </main>
  )
}