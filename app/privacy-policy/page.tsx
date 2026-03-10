import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy – ImgPressr',
  description: 'ImgPressr privacy policy. Learn how we handle your data.',
  alternates: { canonical: '/privacy-policy' },
}

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto max-w-3xl px-4 py-12">
        <article className="prose">
          <h1>Privacy Policy</h1>
          <p>Last updated: March 10, 2026</p>

          <h2>Overview</h2>
          <p>
            ImgPressr is a free online image compression and conversion tool. We are committed to
            protecting your privacy. This policy explains what data we collect and how we use it.
          </p>

          <h2>Image Processing</h2>
          <p>
            <strong>Your images never leave your device.</strong> All image compression and format
            conversion is performed entirely in your browser using the Canvas API. No images are
            uploaded to our servers or any third-party service.
          </p>

          <h2>Data Collection</h2>
          <p>We collect minimal, anonymous analytics data through Vercel Analytics to understand how our site is used. This includes:</p>
          <ul>
            <li>Page views (which pages are visited)</li>
            <li>General geographic region</li>
            <li>Browser and device type</li>
          </ul>
          <p>We do not collect:</p>
          <ul>
            <li>Personal information (name, email, etc.)</li>
            <li>Images or file contents</li>
            <li>IP addresses</li>
            <li>Cookies for tracking</li>
          </ul>

          <h2>Third-Party Services</h2>
          <p>
            We use <strong>Vercel Analytics</strong> for anonymous, privacy-friendly page view tracking.
            Vercel Analytics does not use cookies and does not collect personally identifiable information.
          </p>

          <h2>Contact</h2>
          <p>
            If you have questions about this privacy policy, please contact us at{' '}
            <a href="mailto:kemalyavaass@gmail.com">kemalyavaass@gmail.com</a>.
          </p>
        </article>
      </main>
    </div>
  )
}
