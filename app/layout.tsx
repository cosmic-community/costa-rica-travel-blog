import './globals.css'
import { Inter } from 'next/font/google'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Costa Rica Travel Blog',
  description: 'Discover the wonders of Costa Rica through expert travel guides, wildlife photography, and cultural insights.',
  keywords: 'Costa Rica, travel, adventure, wildlife, beaches, culture, tourism',
  authors: [{ name: 'Costa Rica Travel Blog' }],
  openGraph: {
    title: 'Costa Rica Travel Blog',
    description: 'Discover the wonders of Costa Rica through expert travel guides, wildlife photography, and cultural insights.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Costa Rica Travel Blog',
    description: 'Discover the wonders of Costa Rica through expert travel guides, wildlife photography, and cultural insights.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}