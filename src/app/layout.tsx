import type { Metadata } from 'next';
import { Fraunces, Manrope, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/global/Header';
import { Footer } from '@/components/global/Footer';
import { CookieBanner } from '@/components/global/CookieBanner';
import { SmoothScrollProvider } from '@/components/global/SmoothScrollProvider';
import { getSiteSettings, getServiceTimes } from '@/lib/data/db';
import { mockSiteSettings } from '@/lib/data/mock-data';

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
});

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Open Heavens Christian Centre | Church in Edgware, London',
    template: '%s | Open Heavens Christian Centre',
  },
  description:
    'Open Heavens Christian Centre is a registered UK charity (No. 1138247) and Bible-believing Christian church in Edgware, London. Join us for Sunday celebration and community outreach.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  robots: {
    index: true,
    follow: true,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [fetchedSettings, serviceTimes] = await Promise.all([
    getSiteSettings(),
    getServiceTimes(),
  ]);

  const settings = fetchedSettings || mockSiteSettings;

  // Structured Data (JSON-LD) for Church / LocalBusiness
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Church',
    name: settings.church_name,
    description: 'A vibrant Bible-believing church and registered charity in Edgware, London.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: settings.address_line1,
      addressLocality: settings.city,
      postalCode: settings.postcode,
      addressCountry: 'GB',
    },
    telephone: settings.primary_phone,
    email: settings.contact_email,
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://openheavens.org.uk',
  };

  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${manrope.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-paper text-ink font-body antialiased">
        <SmoothScrollProvider>
          <Header serviceTimes={serviceTimes} />
          <div className="flex-1 flex flex-col">{children}</div>
          <Footer settings={settings} serviceTimes={serviceTimes} />
          <CookieBanner />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
