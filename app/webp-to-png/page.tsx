import type { Metadata } from 'next'
import { ImageCompressor } from '@/components/image-compressor'

export const metadata: Metadata = {
  title: 'WebP to PNG Converter – Convert WebP to PNG Online Free | ImgPressr',
  description:
    'Convert WebP images to PNG format online for free. Get lossless quality with full transparency support. No upload – all processing happens in your browser.',
  alternates: { canonical: '/webp-to-png' },
}

export default function WebpToPngPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-5xl px-4 py-8 md:py-16">
        <div className="mb-6 space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            WebP to PNG Converter
          </h1>
          <p className="text-muted-foreground">
            Convert WebP images to PNG for lossless quality and transparency support.
          </p>
        </div>
        <ImageCompressor defaultFormat="image/png" hideHeader />
      </div>
    </main>
  )
}
