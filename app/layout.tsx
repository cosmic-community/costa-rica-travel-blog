import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { getCategories } from '@/lib/cosmic'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Costa Rica Travel Blog',
  description: 'Discover the best destinations, adventures, and hidden gems in Costa Rica',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const categories = await getCategories()

  return (
    <html lang="en">
      <body className={inter.className}>
        <Header categories={categories} />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}