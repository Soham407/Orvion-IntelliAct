import { SiteFooter } from "../components/site-footer";
import { SiteHeader } from "../components/site-header";
import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://intelliactind.com"),
  title: {
    default: "Orvion IntelliAct Automation Pvt. Ltd.",
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
    title: "Orvion IntelliAct Automation Pvt. Ltd.",
    description:
      "Industrial automation solutions across power, chemicals, steel, refineries, oil and gas, terminal automation, and water SCADA.",
    siteName: "Orvion IntelliAct Automation",
    images: [
      {
        url: "/images/oil+refinery+in+Atlanta-+GA.jpeg",
        width: 1200,
        height: 630,
        alt: "Orvion IntelliAct industrial automation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Orvion IntelliAct Automation Pvt. Ltd.",
    description:
      "Industrial automation solutions across power, chemicals, steel, refineries, oil and gas, terminal automation, and water SCADA.",
    images: ["/images/oil+refinery+in+Atlanta-+GA.jpeg"],
  },
  icons: {
    icon: "/images/Logo/icon.png",
    shortcut: "/images/Logo/icon.png",
    apple: "/images/Logo/icon.png",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
