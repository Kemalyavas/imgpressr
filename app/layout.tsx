import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from '@/components/theme-provider'
import { Navbar } from '@/components/navbar'
import './globals.css'

const geist = Geist({ subsets: ['latin'], variable: '--font-geist' })
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono' })

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://imgpressr.com'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: '/' },
  title: {
    default: 'ImgPressr – Free Online Image Compressor & Format Converter',
    template: '%s | ImgPressr',
  },
  description:
    'Compress and convert PNG, JPG, and WebP images for free. Reduce file sizes up to 90% without losing quality. All processing happens in your browser – your images never leave your device.',
  keywords: [
    'image compressor',
    'compress image online',
    'png to jpg',
    'jpg to webp',
    'webp converter',
    'image converter',
    'reduce image size',
    'compress png',
    'compress jpg',
    'image optimizer',
    'webp to jpg',
    'png to webp',
    'image compression tool',
    'free image compressor',
  ],
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '48x48' },
      { url: '/favicon-dark-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-dark-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: { url: '/apple-touch-icon.png', sizes: '180x180' },
    other: [
      { rel: 'icon', url: '/favicon-dark-192x192.png', sizes: '192x192', type: 'image/png' },
      { rel: 'icon', url: '/favicon-dark-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
  },
  manifest: '/manifest.json',
  openGraph: {
    title: 'ImgPressr – Free Online Image Compressor & Format Converter',
    description:
      'Compress and convert PNG, JPG, and WebP images for free. All processing happens in your browser.',
    type: 'website',
    url: SITE_URL,
    siteName: 'ImgPressr',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'ImgPressr – Image Compressor & Converter',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ImgPressr – Free Online Image Compressor & Format Converter',
    description:
      'Compress and convert PNG, JPG, and WebP images for free. All processing happens in your browser.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geist.variable} ${geistMono.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <Navbar />
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
