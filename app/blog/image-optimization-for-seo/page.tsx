import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Image Optimization for SEO: Best Practices | ImgPressr',
  description:
    'How image size, format, and compression affect your search rankings. Practical tips to improve Core Web Vitals and page speed through image optimization.',
  alternates: { canonical: '/blog/image-optimization-for-seo' },
}

export default function ImageOptimizationSeoPage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto max-w-3xl px-4 py-12">
        <article className="prose">
          <h1>Image Optimization for SEO: Best Practices</h1>

          <p>Google uses page speed as a ranking factor, and images are often the heaviest elements on a page. Properly optimized images can dramatically improve your Core Web Vitals scores and search rankings.</p>

          <h2>How Images Affect SEO</h2>
          <p>Unoptimized images impact three key metrics that Google measures:</p>
          <ul>
            <li><strong>LCP (Largest Contentful Paint):</strong> Large hero images delay LCP, directly hurting rankings.</li>
            <li><strong>CLS (Cumulative Layout Shift):</strong> Images without width/height attributes cause layout shifts.</li>
            <li><strong>Page Speed Score:</strong> Heavy images lower your overall Lighthouse score.</li>
          </ul>

          <h2>Best Practices</h2>

          <h3>1. Use Modern Formats</h3>
          <p>Serve WebP images whenever possible. They&apos;re 25-35% smaller than JPEG/PNG at equivalent quality. Use the HTML <code>&lt;picture&gt;</code> element to provide WebP with JPG fallback.</p>

          <h3>2. Compress Aggressively</h3>
          <p>Most images look identical at 80% quality but are 60-70% smaller. Test with your specific images — you might be able to go as low as 70% without visible artifacts.</p>

          <h3>3. Serve Correct Dimensions</h3>
          <p>Never serve a 2000px image that displays at 400px. Use responsive images with <code>srcset</code> to serve the right size for each device.</p>

          <h3>4. Add Alt Text</h3>
          <p>Descriptive alt text helps Google understand your images and improves accessibility. Keep it concise and descriptive — don&apos;t stuff keywords.</p>

          <h3>5. Use Lazy Loading</h3>
          <p>Add <code>loading=&quot;lazy&quot;</code> to images below the fold. This defers loading until the user scrolls near them, improving initial page load time.</p>

          <h3>6. Set Width and Height</h3>
          <p>Always specify <code>width</code> and <code>height</code> attributes on <code>&lt;img&gt;</code> tags. This prevents layout shifts (CLS) as the browser reserves space before the image loads.</p>

          <h2>Quick Checklist</h2>
          <ol>
            <li>Convert images to WebP format</li>
            <li>Compress to 80% quality or lower</li>
            <li>Resize to display dimensions</li>
            <li>Add descriptive alt text</li>
            <li>Set width and height attributes</li>
            <li>Enable lazy loading for below-fold images</li>
            <li>Use a CDN for faster delivery</li>
          </ol>

          <p>Start by compressing your images — it&apos;s the single biggest impact you can have on page speed with the least effort.</p>
        </article>
        <div className="mt-12 text-center">
          <Link href="/"><Button size="lg">Optimize Your Images Now</Button></Link>
        </div>
      </main>
    </div>
  )
}
