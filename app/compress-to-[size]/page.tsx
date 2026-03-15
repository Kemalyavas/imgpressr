import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { ImageCompressor } from '@/components/image-compressor'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

interface SizeConfig {
  slug: string
  label: string
  bytes: string
  description: string
  longDescription: string
  useCases: string[]
  faqs: { q: string; a: string }[]
}

const SIZES: SizeConfig[] = [
  {
    slug: '10kb',
    label: '10 KB',
    bytes: '10,000 bytes',
    description: 'Compress your images to 10KB or less. Perfect for thumbnails, avatars, and icons that need to load instantly.',
    longDescription: 'Compressing images to 10KB is ideal for tiny graphics like profile pictures, favicons, and thumbnail previews. At this size, images load almost instantly even on slow connections. Use the Low preset for best results — it aggressively reduces file size while keeping the image recognizable.',
    useCases: ['Profile avatars', 'Email signatures', 'Thumbnail previews', 'Low-bandwidth applications'],
    faqs: [
      { q: 'How do I compress an image to 10KB?', a: 'Upload your image above, select the Low compression preset, and download the result. For best results, resize your image to 200x200 pixels or smaller before compressing.' },
      { q: 'What image dimensions work best for 10KB?', a: 'Images under 300x300 pixels compress well to 10KB. Larger images may lose significant quality at this file size.' },
      { q: 'Can I compress a photo to 10KB without losing quality?', a: 'At 10KB, some quality loss is inevitable for photographs. However, simple graphics, logos, and icons can often reach 10KB with minimal visible difference.' },
      { q: 'What format is best for 10KB images?', a: 'WebP offers the best quality at small file sizes. JPG is also good for photos. PNG is not recommended for 10KB targets as it produces larger files for photographic content.' },
    ],
  },
  {
    slug: '20kb',
    label: '20 KB',
    bytes: '20,000 bytes',
    description: 'Compress images to 20KB for fast-loading web graphics. Ideal for email images and small web elements.',
    longDescription: 'At 20KB, you can achieve reasonable quality for small to medium web graphics. This size is commonly required for email newsletters, social media thumbnails, and mobile-optimized web pages where bandwidth is limited.',
    useCases: ['Email newsletter images', 'Social media thumbnails', 'Mobile web optimization', 'Blog post thumbnails'],
    faqs: [
      { q: 'How to compress image to 20KB online?', a: 'Upload your image using the tool above. Select the Low preset for aggressive compression. The tool processes everything in your browser — your images never leave your device.' },
      { q: 'What size image can be compressed to 20KB?', a: 'Images up to 800x600 pixels can typically be compressed to 20KB in JPG format with acceptable quality. Larger images will need more aggressive compression.' },
      { q: 'Is 20KB good for website images?', a: 'Yes, 20KB is excellent for small web elements like icons, thumbnails, and decorative graphics. For hero images or large photos, you may want a larger target size.' },
      { q: 'How to compress image to 20KB for government forms?', a: 'Many government applications require photos under 20KB. Upload your photo, use the Low preset, and if needed, resize to the required dimensions first.' },
    ],
  },
  {
    slug: '50kb',
    label: '50 KB',
    bytes: '50,000 bytes',
    description: 'Compress images to 50KB — great balance of quality and file size for web use and document attachments.',
    longDescription: '50KB is a sweet spot for many web applications. Images at this size load quickly while maintaining good visual quality. This target is commonly used for product thumbnails in e-commerce, blog featured images on mobile, and document attachments.',
    useCases: ['Product listing images', 'Blog thumbnails', 'Document attachments', 'WhatsApp profile photos'],
    faqs: [
      { q: 'How to compress image to 50KB?', a: 'Upload your image above and select the Low or Medium preset depending on your quality requirements. The compressor will optimize your image to be as small as possible while maintaining visual quality.' },
      { q: 'Can I compress a high-resolution photo to 50KB?', a: 'Yes, but the image will need significant compression. For best results, resize the image to web dimensions (e.g., 800x600) before compressing. This preserves more detail than compressing a large image directly.' },
      { q: 'What is the best format for 50KB images?', a: 'WebP provides the best quality-to-size ratio. JPG is universally supported and works well. Use our format conversion tools to switch between formats.' },
      { q: 'How to reduce image size to 50KB for online applications?', a: 'Upload your image, compress it with the Medium preset, and check the output size. If it is still too large, try the Low preset or resize the image first.' },
    ],
  },
  {
    slug: '100kb',
    label: '100 KB',
    bytes: '100,000 bytes',
    description: 'Compress images to 100KB for web-optimized photos. Good quality with fast loading times.',
    longDescription: 'At 100KB, you can maintain good visual quality for most web photos. This size is ideal for blog post images, product photos, and social media content. Most web performance tools recommend keeping images under 100KB when possible.',
    useCases: ['Blog post images', 'Product photos', 'Social media posts', 'Online portfolio images'],
    faqs: [
      { q: 'How to compress image to 100KB without losing quality?', a: 'Use the Medium preset for the best balance of quality and file size. WebP format typically achieves 100KB with better quality than JPG at the same size.' },
      { q: 'Is 100KB a good size for website images?', a: 'Yes, 100KB is generally considered a good target for web images. Google PageSpeed Insights recommends keeping images optimized, and 100KB per image helps achieve fast load times.' },
      { q: 'How many pixels is a 100KB image?', a: 'File size depends on content complexity, not just dimensions. A 1200x800 photo can be compressed to 100KB in JPG format with medium quality settings.' },
      { q: 'How to compress multiple images to 100KB?', a: 'You can upload multiple images at once using our tool. All images will be processed simultaneously in your browser.' },
    ],
  },
  {
    slug: '200kb',
    label: '200 KB',
    bytes: '200,000 bytes',
    description: 'Compress images to 200KB for high-quality web images that still load fast.',
    longDescription: '200KB allows for high-quality images suitable for most web applications. This is a good target for hero images on mobile, detailed product shots, and portfolio pieces where quality matters but performance is still important.',
    useCases: ['Hero images (mobile)', 'Detailed product shots', 'Portfolio images', 'Landing page graphics'],
    faqs: [
      { q: 'How to compress image to 200KB?', a: 'Upload your image and use the Medium preset. Most images between 1-5MB will compress to around 200KB with good visual quality.' },
      { q: 'Is 200KB too large for a website image?', a: 'For most web images, 200KB is acceptable. However, if you have many images on a single page, consider compressing further or using lazy loading.' },
      { q: 'What resolution works best at 200KB?', a: 'At 200KB, you can maintain good quality at resolutions up to 1920x1080 in JPG format, or even higher with WebP compression.' },
      { q: 'How to compress image to 200KB for email?', a: 'Upload your image and compress with Medium preset. Most email services accept attachments up to 25MB, so 200KB per image leaves plenty of room for multiple images.' },
    ],
  },
  {
    slug: '500kb',
    label: '500 KB',
    bytes: '500,000 bytes',
    description: 'Compress images to 500KB — high quality images optimized for web performance.',
    longDescription: '500KB is suitable for large, high-quality web images where visual detail is important. This target works well for desktop hero images, photography portfolios, and detailed infographics.',
    useCases: ['Desktop hero images', 'Photography portfolios', 'Infographics', 'High-detail product images'],
    faqs: [
      { q: 'How to compress image to 500KB?', a: 'Upload your image and use the Medium or High preset. Most smartphone photos (3-10MB) will compress to under 500KB while retaining excellent quality.' },
      { q: 'Is 500KB a good image size for websites?', a: 'For large hero images and photography, 500KB is acceptable. For regular content images, consider a smaller target like 100-200KB.' },
      { q: 'How to reduce image file size to 500KB?', a: 'Our compressor automatically optimizes your image. For the best results, choose WebP format which achieves smaller sizes at the same quality level compared to JPG or PNG.' },
      { q: 'Can I compress RAW photos to 500KB?', a: 'Yes, but RAW photos must first be converted to JPG, PNG, or WebP. Our tool handles standard web formats. Export your RAW file as JPG first, then compress it here.' },
    ],
  },
  {
    slug: '1mb',
    label: '1 MB',
    bytes: '1,000,000 bytes',
    description: 'Compress images to 1MB for high-resolution photos with excellent quality preservation.',
    longDescription: 'At 1MB, images retain excellent quality and detail. This target is ideal for high-resolution photography, print-ready web previews, and large format images where quality is the top priority.',
    useCases: ['High-resolution photography', 'Print preview images', 'Full-screen backgrounds', 'Retina display images'],
    faqs: [
      { q: 'How to compress image to 1MB?', a: 'Upload your image and use the High preset. This provides minimal compression while still reducing file size from the original.' },
      { q: 'Is 1MB too large for a web image?', a: 'For regular web content, 1MB is large. However, for full-screen backgrounds, photography galleries, and hero images on fast connections, it can be acceptable with lazy loading.' },
      { q: 'How to compress a 10MB photo to 1MB?', a: 'Upload the photo and use the Medium preset. A 10MB image can typically be compressed to 1MB with minimal visible quality loss, especially in WebP format.' },
      { q: 'What is the quality difference between 1MB and 500KB?', a: 'The difference is often subtle for web viewing. At 1MB you retain more fine detail and color accuracy, which matters for photography and print but is rarely noticed on screens.' },
    ],
  },
  {
    slug: '2mb',
    label: '2 MB',
    bytes: '2,000,000 bytes',
    description: 'Compress images to 2MB — minimal compression for near-original quality.',
    longDescription: '2MB provides near-original quality for most photographs. Use this target when you need to reduce file size slightly while preserving maximum detail, such as for client deliverables or archival web copies.',
    useCases: ['Client photo deliverables', 'Archival web copies', 'High-DPI displays', 'Photography submissions'],
    faqs: [
      { q: 'How to compress image to 2MB?', a: 'Upload your image and use the High preset. This applies gentle compression that reduces file size while preserving nearly all visual quality.' },
      { q: 'Why compress to 2MB instead of uploading the original?', a: 'Even light compression can reduce a 8-15MB camera photo to 2MB with virtually no visible difference. This saves storage space and bandwidth while maintaining quality.' },
      { q: 'What file format is best for 2MB images?', a: 'At 2MB, all formats work well. JPG is the most universally compatible. WebP offers better compression. PNG is best for graphics with text or transparency.' },
      { q: 'Can I upload 2MB images to social media?', a: 'Yes, most social media platforms accept images up to 5-20MB. However, they will recompress your image, so 2MB is often more than sufficient quality for social media.' },
    ],
  },
  {
    slug: '5mb',
    label: '5 MB',
    bytes: '5,000,000 bytes',
    description: 'Compress images to 5MB for light optimization of large photos and graphics.',
    longDescription: '5MB allows for very light compression of large, high-resolution images. This target is useful for reducing camera photos for easier sharing while maintaining virtually all original detail.',
    useCases: ['Camera photo optimization', 'Large format prints', 'Professional photography sharing', 'High-res graphic design files'],
    faqs: [
      { q: 'How to compress image to 5MB?', a: 'Upload your image and use the High or Lossless preset. This applies minimal compression, ideal for large professional photos that need slight size reduction.' },
      { q: 'When should I compress to 5MB?', a: 'Use 5MB when you need to share large photos via email or messaging apps that have file size limits, but want to preserve maximum quality.' },
      { q: 'Is 5MB too large for email attachments?', a: 'Most email services allow 25MB total attachment size. A single 5MB image is fine, but if sending multiple images, consider a smaller target.' },
      { q: 'How much quality is lost at 5MB?', a: 'At 5MB, quality loss is negligible for most images. The compression mainly removes invisible metadata and applies light optimization that is not perceptible to the human eye.' },
    ],
  },
]

export function generateStaticParams() {
  return SIZES.map((s) => ({ size: s.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ size: string }>
}): Promise<Metadata> {
  const { size } = await params
  const config = SIZES.find((s) => s.slug === size)
  if (!config) return {}

  return {
    title: `Compress Image to ${config.label} Online Free | ImgPressr`,
    description: config.description,
    alternates: { canonical: `/compress-to-${config.slug}` },
  }
}

export default async function CompressToSizePage({
  params,
}: {
  params: Promise<{ size: string }>
}) {
  const { size } = await params
  const config = SIZES.find((s) => s.slug === size)

  if (!config) {
    return <p>Not found</p>
  }

  const otherSizes = SIZES.filter((s) => s.slug !== size)

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-5xl px-4 py-8 md:py-16">
        {/* Header */}
        <div className="mb-6 space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Compress Image to {config.label}
          </h1>
          <p className="text-muted-foreground">{config.description}</p>
        </div>

        {/* Compressor */}
        <ImageCompressor hideHeader />

        {/* About this size */}
        <section className="mx-auto mt-16 max-w-3xl">
          <h2 className="mb-4 text-2xl font-bold text-foreground">
            About {config.label} Image Compression
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {config.longDescription}
          </p>

          {/* Use cases */}
          <h3 className="mt-6 mb-3 text-lg font-semibold text-foreground">
            Common Use Cases
          </h3>
          <ul className="grid gap-2 sm:grid-cols-2">
            {config.useCases.map((uc) => (
              <li
                key={uc}
                className="flex items-center gap-2 text-sm text-muted-foreground"
              >
                <span className="size-1.5 rounded-full bg-primary flex-shrink-0" />
                {uc}
              </li>
            ))}
          </ul>
        </section>

        {/* FAQ */}
        <section className="mx-auto mt-16 max-w-3xl">
          <h2 className="mb-6 text-center text-2xl font-bold text-foreground">
            Frequently Asked Questions
          </h2>
          <Accordion type="single" collapsible className="w-full">
            {config.faqs.map((faq, i) => (
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

        {/* Other sizes */}
        <section className="mx-auto mt-16 max-w-3xl">
          <h2 className="mb-6 text-xl font-bold text-foreground">
            Other Compression Targets
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {otherSizes.map((s) => (
              <Link
                key={s.slug}
                href={`/compress-to-${s.slug}`}
                className="group flex items-center justify-between rounded-lg border border-border p-3 transition-colors hover:bg-secondary/50"
              >
                <span className="text-sm font-medium text-foreground">
                  Compress to {s.label}
                </span>
                <ArrowRight className="size-3.5 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
              </Link>
            ))}
          </div>
        </section>

        {/* Back to home */}
        <div className="mt-12 text-center">
          <Link
            href="/"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Back to Image Compressor
          </Link>
        </div>
      </div>
    </main>
  )
}
