import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Geist, Space_Grotesk } from 'next/font/google'
import { MobileFrame } from '@/components/mobile-frame'
import './globals.css'

const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
})

const clash = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-clash',
  weight: ['500', '600', '700'],
})

export const metadata: Metadata = {
  title: 'KOLOB — Business Connection Platform for Africa',
  description:
    'KOLOB connects startups, SMEs, enterprises and institutions across Africa and global markets through AI-powered discovery, partnerships and collaboration.',
  generator: 'v0.app',
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#0f1512',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${clash.variable} bg-background`}>
      <body className="font-sans antialiased">
        <MobileFrame>{children}</MobileFrame>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
