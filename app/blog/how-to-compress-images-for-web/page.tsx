import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'How to Compress Images for the Web: Complete Guide | ImgPressr',
  description:
    'Step-by-step guide to optimizing images for faster page loads. Learn the best compression settings, formats, and techniques to reduce image size without losing quality.',
  alternates: { canonical: '/blog/how-to-compress-images-for-web' },
}

export default function HowToCompressPage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto max-w-3xl px-4 py-12">
        <article className="prose">
          <h1>How to Compress Images for the Web: Complete Guide</h1>

          <p>Large images are one of the biggest causes of slow websites. Optimizing your images can reduce page load times by 50% or more, improving both user experience and SEO rankings.</p>

          <h2>Why Image Compression Matters</h2>
          <p>Images typically account for 50-75% of a webpage&apos;s total size. Compressing them reduces bandwidth usage, speeds up page loads, and directly improves Google&apos;s Core Web Vitals metrics like LCP (Largest Contentful Paint).</p>

          <h2>Step 1: Choose the Right Format</h2>
          <p>Before compressing, make sure you&apos;re using the right format:</p>
          <ul>
            <li><strong>WebP</strong> — Best for web delivery. 25-35% smaller than JPG/PNG.</li>
            <li><strong>JPG</strong> — Good for photographs when WebP isn&apos;t an option.</li>
            <li><strong>PNG</strong> — Only when you need transparency or pixel-perfect graphics.</li>
          </ul>

          <h2>Step 2: Set the Right Quality Level</h2>
          <p>Quality 80-85% is the sweet spot for most images. Below that, compression artifacts become noticeable. Above that, file size increases with minimal visual improvement.</p>
          <ul>
            <li><strong>80-85%</strong> — Ideal for most web images</li>
            <li><strong>60-75%</strong> — Acceptable for thumbnails and background images</li>
            <li><strong>90-100%</strong> — Only for hero images or portfolio showcases</li>
          </ul>

          <h2>Step 3: Resize Before Compressing</h2>
          <p>Don&apos;t serve a 4000px wide image in a 800px container. Resize images to their display dimensions first, then compress. This alone can reduce file size by 80%+.</p>

          <h2>Step 4: Compress in Batch</h2>
          <p>If you have multiple images, batch processing saves time. Tools like ImgPressr let you drag and drop multiple files, compress them all at once, and download as a ZIP file.</p>

          <h2>Recommended File Sizes</h2>
          <table>
            <thead>
              <tr><th>Image Type</th><th>Target Size</th></tr>
            </thead>
            <tbody>
              <tr><td>Hero/Banner image</td><td>Under 200 KB</td></tr>
              <tr><td>Content image</td><td>Under 100 KB</td></tr>
              <tr><td>Thumbnail</td><td>Under 30 KB</td></tr>
              <tr><td>Icon/Logo</td><td>Under 10 KB</td></tr>
            </tbody>
          </table>

          <h2>Quick Compression Workflow</h2>
          <ol>
            <li>Resize images to display dimensions</li>
            <li>Convert to WebP (or JPG for compatibility)</li>
            <li>Set quality to 80%</li>
            <li>Compress and compare before/after</li>
            <li>Download and deploy</li>
          </ol>
        </article>
        <div className="mt-12 text-center">
          <Link href="/"><Button size="lg">Compress Your Images Now</Button></Link>
        </div>
      </main>
    </div>
  )
}
