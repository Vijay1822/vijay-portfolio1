import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { PERSONAL_INFO } from "@/lib/data";
import { ClientLayout } from "@/components/layout/client-layout";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const viewport: Viewport = {
  themeColor: "#070B14",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: `${PERSONAL_INFO.name} | ${PERSONAL_INFO.title}`,
  description: `${PERSONAL_INFO.preferredName} Kumar is a CSE-IoT student at ${PERSONAL_INFO.college} building AI, machine learning, full-stack and IoT solutions.`,
  keywords: [
    "Mamidala Vijay Kumar",
    "Vijay Kumar",
    "AI Engineer",
    "Full-Stack Developer",
    "CSE-IoT",
    "VNR VJIET",
    "Next.js Developer",
    "Machine Learning",
    "IoT Systems",
    "Hyderabad Developer",
  ],
  authors: [{ name: PERSONAL_INFO.name, url: PERSONAL_INFO.social.github }],
  creator: PERSONAL_INFO.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://vijay-portfolio18.netlify.app",
    title: `${PERSONAL_INFO.name} | ${PERSONAL_INFO.title}`,
    description: `${PERSONAL_INFO.tagline} B.Tech CSE-IoT at ${PERSONAL_INFO.college}.`,
    siteName: `${PERSONAL_INFO.name} Portfolio`,
  },
  twitter: {
    card: "summary_large_image",
    title: `${PERSONAL_INFO.name} | ${PERSONAL_INFO.title}`,
    description: `${PERSONAL_INFO.tagline} B.Tech CSE-IoT at ${PERSONAL_INFO.college}.`,
    creator: "@Vijay1822",
  },
  metadataBase: new URL("https://vijay-portfolio18.netlify.app"),
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: PERSONAL_INFO.name,
    jobTitle: PERSONAL_INFO.title,
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: PERSONAL_INFO.collegeFullName,
    },
    url: "https://vijay-portfolio18.netlify.app",
    sameAs: [PERSONAL_INFO.social.github, PERSONAL_INFO.social.linkedin],
    knowsAbout: [
      "Artificial Intelligence",
      "Machine Learning",
      "Internet of Things",
      "Full-Stack Web Development",
      "Next.js",
      "TypeScript",
      "Python",
      "Embedded Systems",
    ],
  };

  return (
    <html lang="en" className={`dark ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="relative bg-[#070B14] text-[#F8FAFC] antialiased selection:bg-cyan-500/20 selection:text-cyan-300 min-h-screen">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
