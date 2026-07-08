import { SiteFooter } from "../components/site-footer";
import { SiteHeader } from "../components/site-header";
import { ScrollToTop } from "../components/scroll-to-top";
import { Lusitana } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const lusitana = Lusitana({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-lusitana",
});

export const metadata = {
  metadataBase: new URL("https://intelliactind.com"),
  title: {
    default: "Orvion IntelliAct Automation",
    template: "%s | Orvion IntelliAct Automation",
  },
  description:
    "Industrial automation solutions across power, chemicals, steel, refineries, oil and gas, terminal automation, and water SCADA.",
  keywords: [
    "industrial automation",
    "SCADA",
    "PLC programming",
    "process automation",
    "water SCADA",
    "terminal automation",
    "control systems",
    "Orvion IntelliAct",
  ],
  applicationName: "Orvion IntelliAct Automation",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "https://intelliactind.com",
    title: "Orvion IntelliAct Automation",
    description:
      "Industrial automation solutions across power, chemicals, steel, refineries, oil and gas, terminal automation, and water SCADA.",
    siteName: "Orvion IntelliAct Automation",
    images: [
      {
        url: "/images/products/oil+refinery+in+Atlanta-+GA.jpeg",
        width: 1200,
        height: 630,
        alt: "Orvion IntelliAct industrial automation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Orvion IntelliAct Automation",
    description:
      "Industrial automation solutions across power, chemicals, steel, refineries, oil and gas, terminal automation, and water SCADA.",
    images: ["/images/products/oil+refinery+in+Atlanta-+GA.jpeg"],
  },
  icons: {
    icon: "/images/Logo/icon.avif",
    shortcut: "/images/Logo/icon.avif",
    apple: "/images/Logo/icon.avif",
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GSC_VERIFICATION,
  },
};

export default function RootLayout({ children }) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang="en" className={lusitana.variable}>
      <head>
        {gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}');
              `}
            </Script>
          </>
        )}
      </head>
      <body>
        <a href="#main-content" className="skip-link">Skip to main content</a>
        <SiteHeader />
        <main id="main-content">{children}</main>
        <ScrollToTop />
        <SiteFooter />
      </body>
    </html>
  );
}
