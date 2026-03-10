import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'What Is WebP? The Modern Image Format Explained | ImgPressr',
  description:
    'Everything you need to know about WebP — Google\'s image format that offers superior compression, transparency, and animation support for the web.',
  alternates: { canonical: '/blog/what-is-webp' },
}

export default function WhatIsWebpPage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto max-w-3xl px-4 py-12">
        <article className="prose">
          <h1>What Is WebP? The Modern Image Format Explained</h1>

          <p>WebP is an image format developed by Google that provides superior lossless and lossy compression for images on the web. Since its release in 2010, it has become the go-to format for web optimization.</p>

          <h2>How WebP Works</h2>
          <p>WebP uses predictive coding to encode an image. For lossy compression, it uses a method based on VP8 video codec technology. For lossless compression, it uses techniques like advanced entropy coding and transform coding to achieve smaller files than PNG.</p>

          <h2>Key Advantages</h2>
          <ul>
            <li><strong>Smaller files:</strong> WebP lossy images are 25-34% smaller than comparable JPEG images. Lossless WebP images are 26% smaller than PNGs.</li>
            <li><strong>Transparency:</strong> WebP supports alpha channel transparency, unlike JPEG.</li>
            <li><strong>Animation:</strong> WebP supports animation, offering a lighter alternative to GIF files.</li>
            <li><strong>Both lossy and lossless:</strong> One format handles both compression types.</li>
          </ul>

          <h2>Browser Support</h2>
          <p>As of 2026, WebP is supported by over 97% of browsers worldwide, including Chrome, Firefox, Safari, Edge, and Opera. The only notable holdout is very old browser versions that are rarely used.</p>

          <h2>When to Use WebP</h2>
          <ul>
            <li><strong>Website images:</strong> Use WebP as your default format for all web images.</li>
            <li><strong>E-commerce product photos:</strong> Faster loads mean better conversion rates.</li>
            <li><strong>Blog and content images:</strong> Reduce bandwidth costs while keeping quality high.</li>
            <li><strong>Social media:</strong> Some platforms now accept WebP uploads directly.</li>
          </ul>

          <h2>When NOT to Use WebP</h2>
          <ul>
            <li><strong>Print design:</strong> Use TIFF or high-quality PNG for print workflows.</li>
            <li><strong>Professional photography:</strong> RAW or TIFF formats preserve maximum editing flexibility.</li>
            <li><strong>Email attachments:</strong> JPG is more universally supported in email clients.</li>
          </ul>

          <h2>Converting to WebP</h2>
          <p>Converting your existing JPG and PNG images to WebP is straightforward. With ImgPressr, you can batch convert images to WebP directly in your browser — no upload needed, completely free.</p>
        </article>
        <div className="mt-12 text-center">
          <Link href="/jpg-to-webp"><Button size="lg">Convert to WebP Now</Button></Link>
        </div>
      </main>
    </div>
  )
}
