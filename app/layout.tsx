import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#FCDD09',
}

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://enkutatash-greeting-app.vercel.app'),
  title: 'Enkutatash Greeting Card Creator | Ethiopian New Year 2019 E.C.',
  description: 'Create and share beautiful Ethiopian New Year (Enkutatash) greeting cards with cultural themes, Adey Abeba designs, and Amharic text support.',
  keywords: ['Enkutatash', 'Ethiopian New Year', 'Enkutatash 2026', '2019 ዓ.ም.', 'greeting cards', 'cultural celebration', 'Meskel flowers', 'Adey Abeba'],
  authors: [{ name: 'Enkutatash App' }],
  icons: {
    icon: '/images/flowers/FW2.webp',
    apple: '/images/flowers/FW2.webp',
  },
  openGraph: {
    title: 'Enkutatash Greeting Card Creator | Ethiopian New Year',
    description: 'Design beautiful personalized Ethiopian New Year greeting cards with cultural themes and Amharic typography.',
    type: 'website',
    locale: 'am_ET',
    images: [
      {
        url: '/images/flowers/backgrounds/EF.jpg',
        width: 1200,
        height: 630,
        alt: 'Enkutatash Ethiopian New Year Greeting Card',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Enkutatash Greeting Card Creator',
    description: 'Celebrate Ethiopian New Year with personalized cultural greeting cards.',
    images: ['/images/flowers/backgrounds/EF.jpg'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/images/flowers/FW2.webp" />
        <link rel="apple-touch-icon" href="/images/flowers/FW2.webp" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Dancing+Script:wght@400;700&family=Pacifico&family=Lobster&family=Cinzel:wght@400;600&family=Fredoka+One&family=Righteous&family=Bungee&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body className={inter.className}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
