import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Enkutatash Greeting Card Creator',
  description: 'Create beautiful Ethiopian New Year greeting cards with custom messages and cultural designs',
  keywords: 'Enkutatash, Ethiopian New Year, greeting cards, cultural celebration, Meskel flowers',
  authors: [{ name: 'Enkutatash App' }],
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
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
