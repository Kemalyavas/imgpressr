import type { Metadata } from 'next'
import { ImageCompressor } from '@/components/image-compressor'

export const metadata: Metadata = {
  title: 'JPG to PNG Converter – Convert JPEG to PNG Online Free | ImgPressr',
  description:
    'Convert JPG images to PNG format online for free. Get lossless quality with transparency support. No upload needed – all processing happens in your browser.',
  alternates: { canonical: '/jpg-to-png' },
}

export default function JpgToPngPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-5xl px-4 py-8 md:py-16">
        <div className="mb-6 space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            JPG to PNG Converter
          </h1>
          <p className="text-muted-foreground">
            Convert JPG images to PNG format. Lossless quality with transparency support.
          </p>
        </div>
        <ImageCompressor defaultFormat="image/png" hideHeader />
      </div>
    </main>
  )
}
