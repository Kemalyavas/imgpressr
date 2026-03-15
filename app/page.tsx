import Link from 'next/link'
import { ImageCompressor } from '@/components/image-compressor'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { ArrowRight } from 'lucide-react'

const TOOLS = [
  {
    href: '/png-to-jpg',
    title: 'PNG to JPG',
    description: 'Convert PNG images to JPG format for smaller file sizes.',
  },
  {
    href: '/jpg-to-png',
    title: 'JPG to PNG',
    description: 'Convert JPG images to PNG format with transparency support.',
  },
  {
    href: '/png-to-webp',
    title: 'PNG to WebP',
    description: 'Convert PNG to WebP for modern web optimization.',
  },
  {
    href: '/jpg-to-webp',
    title: 'JPG to WebP',
    description: 'Convert JPG to WebP for better compression ratios.',
  },
  {
    href: '/webp-to-jpg',
    title: 'WebP to JPG',
    description: 'Convert WebP images to universally compatible JPG format.',
  },
  {
    href: '/webp-to-png',
    title: 'WebP to PNG',
    description: 'Convert WebP to PNG for lossless quality and transparency.',
  },
]

const FAQS = [
  {
    q: 'Is it safe to use ImgPressr?',
    a: 'Yes! All processing happens locally in your browser using the Canvas API. Your images never leave your device — nothing is uploaded to any server.',
  },
  {
    q: 'What image formats are supported?',
    a: 'ImgPressr supports PNG, JPG (JPEG), and WebP formats. You can compress images in their original format or convert between any of these formats.',
  },
  {
    q: 'Is there a file size limit?',
    a: 'There is no hard file size limit. Since all processing happens in your browser, performance depends on your device\'s memory and processing power. Most images up to 50MB work well.',
  },
  {
    q: 'Do I need to create an account?',
    a: 'No. ImgPressr is completely free with no signup, no login, and no watermarks. Just open the page and start compressing.',
  },
  {
    q: 'How does the compression work?',
    a: 'ImgPressr uses your browser\'s built-in Canvas API to re-encode images at your chosen quality level. The quality slider lets you control the balance between file size and visual quality.',
  },
  {
    q: 'Can I compress multiple images at once?',
    a: 'Yes! Drag and drop or select multiple files at once. ImgPressr processes them in batch and lets you download all compressed images as a single ZIP file.',
  },
]

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-5xl px-4 py-8 md:py-16">
        <ImageCompressor />

        {/* Conversion Tools */}
        <section className="mt-16 md:mt-24">
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            Image Conversion Tools
          </h2>
          <p className="mt-2 text-muted-foreground">
            Convert between PNG, JPG, and WebP formats instantly.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {TOOLS.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="group rounded-lg border border-border bg-card p-5 transition-colors hover:border-foreground/20 hover:bg-muted/50"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-foreground">{tool.title}</h3>
                  <ArrowRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{tool.description}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Compress to Specific Size */}
        <section className="mt-16 md:mt-24">
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            Compress to Specific Size
          </h2>
          <p className="mt-2 text-muted-foreground">
            Need your image under a specific file size? Choose your target below.
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {[
              { size: '10kb', label: '10 KB' },
              { size: '20kb', label: '20 KB' },
              { size: '50kb', label: '50 KB' },
              { size: '100kb', label: '100 KB' },
              { size: '200kb', label: '200 KB' },
              { size: '500kb', label: '500 KB' },
              { size: '1mb', label: '1 MB' },
              { size: '2mb', label: '2 MB' },
              { size: '5mb', label: '5 MB' },
            ].map((t) => (
              <Link
                key={t.size}
                href={`/compress-to-${t.size}`}
                className="group flex items-center justify-between rounded-lg border border-border p-3 transition-colors hover:border-foreground/20 hover:bg-muted/50"
              >
                <span className="text-sm font-medium text-foreground">
                  to {t.label}
                </span>
                <ArrowRight className="size-3.5 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
              </Link>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="mt-16 md:mt-24">
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            Frequently Asked Questions
          </h2>

          <Accordion type="single" collapsible className="mt-6 w-full">
            {FAQS.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger className="text-left text-sm font-medium">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        {/* Footer */}
        <footer className="mt-16 border-t border-border pt-8 md:mt-24">
          <div className="mb-5 pb-5 border-b border-border">
            <p className="text-xs font-semibold text-foreground mb-2">More Free Tools</p>
            <div className="flex flex-wrap gap-x-5 gap-y-1">
              <a href="https://jsonshift.com" target="_blank" rel="noopener noreferrer" className="text-xs text-muted-foreground hover:text-foreground transition-colors">JSONShift — Convert JSON, CSV, YAML, XML</a>
              <a href="https://thepercentcalc.com" target="_blank" rel="noopener noreferrer" className="text-xs text-muted-foreground hover:text-foreground transition-colors">PercentCalc — Percentage calculator</a>
              <a href="https://caseformat.com" target="_blank" rel="noopener noreferrer" className="text-xs text-muted-foreground hover:text-foreground transition-colors">CaseFormat — Text case converter</a>
              <a href="https://faviconator.com" target="_blank" rel="noopener noreferrer" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Faviconator — Favicon generator</a>
            </div>
          </div>
          <div className="flex flex-col items-center justify-between gap-4 text-sm text-muted-foreground sm:flex-row">
            <p>&copy; {new Date().getFullYear()} ImgPressr. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <Link href="/privacy-policy" className="hover:text-foreground transition-colors">
                Privacy Policy
              </Link>
              <Link href="/blog" className="hover:text-foreground transition-colors">
                Blog
              </Link>
              <span className="rounded bg-secondary px-2 py-1 text-xs font-mono">
                100% client-side
              </span>
            </div>
          </div>
        </footer>
      </div>
    </main>
  )
}
