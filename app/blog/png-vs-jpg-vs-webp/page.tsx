import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'PNG vs JPG vs WebP: Which Image Format Should You Use? | ImgPressr',
  description:
    'A detailed comparison of PNG, JPG, and WebP image formats. Learn the differences in compression, quality, transparency, and when to use each format.',
  alternates: { canonical: '/blog/png-vs-jpg-vs-webp' },
}

export default function PngVsJpgVsWebpPage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto max-w-3xl px-4 py-12">
        <article className="prose">
          <h1>PNG vs JPG vs WebP: Which Image Format Should You Use?</h1>

          <p>Choosing the right image format can significantly impact your website&apos;s performance, visual quality, and user experience. Here&apos;s a practical comparison of the three most common formats.</p>

          <h2>JPG (JPEG) — Best for Photos</h2>
          <p>JPG uses lossy compression, meaning it discards some image data to achieve smaller file sizes. This makes it ideal for photographs and complex images with many colors and gradients.</p>
          <ul>
            <li><strong>Pros:</strong> Small file sizes, universal support, great for photos</li>
            <li><strong>Cons:</strong> No transparency, lossy compression, quality degrades on re-saves</li>
            <li><strong>Best for:</strong> Photographs, social media images, email attachments</li>
          </ul>

          <h2>PNG — Best for Graphics & Transparency</h2>
          <p>PNG uses lossless compression, preserving every pixel exactly. It supports full transparency (alpha channel), making it essential for logos, icons, and graphics with transparent backgrounds.</p>
          <ul>
            <li><strong>Pros:</strong> Lossless quality, transparency support, sharp edges</li>
            <li><strong>Cons:</strong> Larger file sizes than JPG for photos</li>
            <li><strong>Best for:</strong> Logos, icons, screenshots, graphics with text</li>
          </ul>

          <h2>WebP — Best of Both Worlds</h2>
          <p>Developed by Google, WebP supports both lossy and lossless compression with transparency. It typically produces files 25-35% smaller than comparable JPG or PNG files.</p>
          <ul>
            <li><strong>Pros:</strong> Superior compression, transparency support, animation support</li>
            <li><strong>Cons:</strong> Not supported by all legacy software</li>
            <li><strong>Best for:</strong> Web images, modern websites, performance optimization</li>
          </ul>

          <h2>Quick Comparison</h2>
          <table>
            <thead>
              <tr><th>Feature</th><th>JPG</th><th>PNG</th><th>WebP</th></tr>
            </thead>
            <tbody>
              <tr><td>Compression</td><td>Lossy</td><td>Lossless</td><td>Both</td></tr>
              <tr><td>Transparency</td><td>No</td><td>Yes</td><td>Yes</td></tr>
              <tr><td>File Size</td><td>Small</td><td>Large</td><td>Smallest</td></tr>
              <tr><td>Browser Support</td><td>Universal</td><td>Universal</td><td>96%+</td></tr>
              <tr><td>Best For</td><td>Photos</td><td>Graphics</td><td>Web</td></tr>
            </tbody>
          </table>

          <h2>Which Format Should You Choose?</h2>
          <p>Use <strong>JPG</strong> for photographs and images where file size matters more than pixel-perfect quality. Use <strong>PNG</strong> when you need transparency or lossless quality. Use <strong>WebP</strong> for web delivery when you want the best balance of quality and file size.</p>
          <p>Need to convert between formats? ImgPressr makes it easy — just drag and drop your images and choose your target format.</p>
        </article>
        <div className="mt-12 text-center">
          <Link href="/"><Button size="lg">Try ImgPressr Now</Button></Link>
        </div>
      </main>
    </div>
  )
}
