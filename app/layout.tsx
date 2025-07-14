import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Costa Rica Travel Blog',
  description: 'Discover the beauty of Costa Rica through our travel blog. Get insider tips, travel guides, and authentic stories from the land of Pura Vida.',
  keywords: 'Costa Rica, travel blog, Pura Vida, Central America, travel guides, adventure, nature, wildlife',
  authors: [{ name: 'Costa Rica Travel Blog Team' }],
  openGraph: {
    title: 'Costa Rica Travel Blog',
    description: 'Discover the beauty of Costa Rica through our travel blog.',
    url: 'https://costa-rica-travel-blog.vercel.app',
    siteName: 'Costa Rica Travel Blog',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?w=1200&h=630&fit=crop&auto=format,compress',
        width: 1200,
        height: 630,
        alt: 'Costa Rica Travel Blog',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Costa Rica Travel Blog',
    description: 'Discover the beauty of Costa Rica through our travel blog.',
    images: ['https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?w=1200&h=630&fit=crop&auto=format,compress'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}