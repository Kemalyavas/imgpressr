import type { Metadata } from 'next'
import { ImageCompressor } from '@/components/image-compressor'

export const metadata: Metadata = {
  title: 'WebP to JPG Converter – Convert WebP to JPEG Online Free | ImgPressr',
  description:
    'Convert WebP images to JPG format online for free. Get universally compatible JPEG files from WebP images. No upload – all processing happens in your browser.',
  alternates: { canonical: '/webp-to-jpg' },
}

export default function WebpToJpgPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-5xl px-4 py-8 md:py-16">
        <div className="mb-6 space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            WebP to JPG Converter
          </h1>
          <p className="text-muted-foreground">
            Convert WebP images to universally compatible JPG format.
          </p>
        </div>
        <ImageCompressor defaultFormat="image/jpeg" hideHeader />
      </div>
    </main>
  )
}
