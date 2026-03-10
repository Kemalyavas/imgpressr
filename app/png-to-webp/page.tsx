import type { Metadata } from 'next'
import { ImageCompressor } from '@/components/image-compressor'

export const metadata: Metadata = {
  title: 'PNG to WebP Converter – Convert PNG to WebP Online Free | ImgPressr',
  description:
    'Convert PNG images to WebP format online for free. Get up to 30% smaller files with modern WebP compression. No upload – all processing in your browser.',
  alternates: { canonical: '/png-to-webp' },
}

export default function PngToWebpPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-5xl px-4 py-8 md:py-16">
        <div className="mb-6 space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            PNG to WebP Converter
          </h1>
          <p className="text-muted-foreground">
            Convert PNG images to WebP for modern web optimization. Smaller files, same quality.
          </p>
        </div>
        <ImageCompressor defaultFormat="image/webp" hideHeader />
      </div>
    </main>
  )
}
