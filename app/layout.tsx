import type { Metadata, Viewport } from "next";
import { Archivo, Big_Shoulders } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { business } from "@/lib/business";
import { QuoteProvider } from "@/components/QuotePlanner/QuoteContext";
import Nav from "@/components/Nav";
import MobileBar from "@/components/MobileBar";
import BackToTop from "@/components/BackToTop";
import "./globals.css";

// "Big Shoulders Display" now ships as "Big Shoulders" with an optical-size axis.
// The display cut is pinned with `opsz 72` in the font-display utility.
const display = Big_Shoulders({
  subsets: ["latin"],
  axes: ["opsz"],
  variable: "--font-big-shoulders",
  display: "swap",
});

const body = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-archivo",
  display: "swap",
});

const title = "SkidPro Services | Skid Steer & Land Clearing in Enid, OK";
const description =
  "Land clearing, cedar removal, gravel driveways, building pads, grading and snow plowing in Enid and Northwest Oklahoma. Free estimates. Call or text (580) 747-6677.";

export const metadata: Metadata = {
  metadataBase: new URL(business.siteUrl),
  title,
  description,
  alternates: { canonical: "/" },
  // Spec site: keep it out of search so it never competes with the owner's own listings.
  robots: { index: false, follow: false },
  openGraph: {
    type: "website",
    url: "/",
    siteName: business.brand,
    title,
    description,
    locale: "en_US",
  },
  twitter: { card: "summary_large_image", title, description },
};

export const viewport: Viewport = {
  themeColor: "#0E0C0A",
  colorScheme: "dark",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${business.siteUrl}/#business`,
  name: business.name,
  alternateName: business.brand,
  slogan: business.tagline,
  url: business.siteUrl,
  telephone: business.phoneE164,
  email: business.email,
  image: `${business.siteUrl}/opengraph-image`,
  logo: `${business.siteUrl}/images/00-logo-skidpro-transparent.png`,
  foundingDate: String(business.established),
  founder: { "@type": "Person", name: business.owner },
  address: {
    "@type": "PostalAddress",
    addressLocality: business.city,
    addressRegion: business.state,
    addressCountry: "US",
  },
  areaServed: { "@type": "Place", name: business.region },
  sameAs: [business.facebook],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="min-h-screen">
        <a
          href="#main"
          className="btn btn-primary sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100]"
        >
          Skip to content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
        <QuoteProvider>
          <Nav />
          {children}
          <MobileBar />
          <BackToTop />
        </QuoteProvider>
        <Analytics />
      </body>
    </html>
  );
}
