import type { Metadata } from 'next'
import { supabase } from '@/lib/supabase'
import { BlogSearch } from '@/components/blog-search'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Blog – ImgPressr | Image Optimization Guides & Tutorials',
  description:
    'Learn about image compression, format conversion, and web optimization. Guides, tutorials, and tips for working with PNG, JPG, and WebP images.',
  alternates: { canonical: '/blog' },
}

const STATIC_POSTS = [
  {
    href: '/blog/png-vs-jpg-vs-webp',
    title: 'PNG vs JPG vs WebP: Which Image Format Should You Use?',
    description:
      'A detailed comparison of the three most popular image formats. Learn when to use PNG, JPG, or WebP for your projects.',
    date: 'March 10, 2026',
  },
  {
    href: '/blog/how-to-compress-images-for-web',
    title: 'How to Compress Images for the Web: Complete Guide',
    description:
      'Step-by-step guide to optimizing images for faster page loads without sacrificing visual quality.',
    date: 'March 10, 2026',
  },
  {
    href: '/blog/what-is-webp',
    title: 'What Is WebP? The Modern Image Format Explained',
    description:
      'Everything you need to know about WebP — Google\'s image format that offers superior compression for the web.',
    date: 'March 10, 2026',
  },
  {
    href: '/blog/image-optimization-for-seo',
    title: 'Image Optimization for SEO: Best Practices',
    description:
      'How image size, format, and compression affect your search rankings. Practical tips to improve Core Web Vitals.',
    date: 'March 10, 2026',
  },
]

export default async function BlogPage() {
  const { data: dynamicBlogs } = await supabase
    .from('blogs')
    .select('title, slug, meta_description, created_at')
    .eq('site', 'imgpressr')
    .eq('status', 'published')
    .order('created_at', { ascending: false })

  const dynamicPosts = (dynamicBlogs || []).map((blog) => ({
    href: `/blog/${blog.slug}`,
    title: blog.title,
    description: blog.meta_description,
    date: new Date(blog.created_at).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
  }))

  const allPosts = [...dynamicPosts, ...STATIC_POSTS]

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto max-w-3xl px-4 py-12">
        <h1 className="text-3xl font-bold text-foreground sm:text-4xl">Blog</h1>
        <p className="mt-2 text-muted-foreground">
          Guides and tutorials for image compression and optimization
        </p>

        <BlogSearch posts={allPosts} />
      </main>
    </div>
  )
}
