import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Geist, Space_Grotesk } from 'next/font/google'
import { MobileFrame } from '@/components/mobile-frame'
import { ThemeProvider } from '@/components/theme-provider'
import { LanguageProvider } from '@/lib/i18n'
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
  title: 'KOLOB — Business Ecosystem for Africa',
  description:
    'KOLOB connects businesses across Africa and global markets through AI-powered matching, collaboration, trusted vendors and distributors, and multilingual access.',
  generator: 'v0.app',
}

export const viewport: Viewport = {
  colorScheme: 'dark light',
  themeColor: '#12183a',
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
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${clash.variable} bg-background`}
    >
      <body className="font-sans antialiased">
        <ThemeProvider>
          <LanguageProvider>
            <MobileFrame>{children}</MobileFrame>
          </LanguageProvider>
        </ThemeProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
