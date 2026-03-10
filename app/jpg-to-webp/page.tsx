import type { Metadata } from 'next'
import { ImageCompressor } from '@/components/image-compressor'

export const metadata: Metadata = {
  title: 'JPG to WebP Converter – Convert JPEG to WebP Online Free | ImgPressr',
  description:
    'Convert JPG images to WebP format online for free. WebP offers superior compression – get smaller files without visible quality loss. All processing in your browser.',
  alternates: { canonical: '/jpg-to-webp' },
}

export default function JpgToWebpPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-5xl px-4 py-8 md:py-16">
        <div className="mb-6 space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            JPG to WebP Converter
          </h1>
          <p className="text-muted-foreground">
            Convert JPG images to WebP for better compression and faster page loads.
          </p>
        </div>
        <ImageCompressor defaultFormat="image/webp" hideHeader />
      </div>
    </main>
  )
}
