import type { Metadata } from "next";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "JARVIS - Just A Rather Very Intelligent System",
  description: "Mithurn Jeromme's portfolio - Full-Stack Developer, AI/ML Engineer, and Computer Science student. Expert in Next.js, Python, and embedded systems.",
  keywords: ["Mithurn Jeromme", "Computer Science", "AI/ML", "Embedded Systems", "Full Stack", "Next.js", "Python", "Portfolio", "JARVIS", "React", "TypeScript", "Machine Learning"],
  authors: [{ name: "Mithurn Jeromme" }],
  creator: "Mithurn Jeromme",
  publisher: "Mithurn Jeromme",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: "JARVIS - Just A Rather Very Intelligent System",
    description: "Mithurn Jeromme's portfolio - Full-Stack Developer, AI/ML Engineer, and Computer Science student.",
    type: "website",
    url: "https://jarvis-mithurn.vercel.app",
    siteName: "JARVIS Portfolio",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "JARVIS - Just A Rather Very Intelligent System",
    description: "Mithurn Jeromme's portfolio - Full-Stack Developer & AI/ML Engineer",
    creator: "@mithurnjeromme",
  },
  alternates: {
    canonical: "https://jarvis-mithurn.vercel.app",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Mithurn Jeromme",
    "alternateName": "JARVIS",
    "description": "Full-Stack Developer, AI/ML Engineer, and Computer Science student passionate about creating intelligent systems",
    "url": "https://jarvis-mithurn.vercel.app",
    "image": "https://jarvis-mithurn.vercel.app/images/profile.jpg",
    "sameAs": [
      "https://github.com/Mithurn",
      "https://linkedin.com/in/mithurn-jeromme",
      "https://twitter.com/mithurnjeromme"
    ],
    "jobTitle": "Full-Stack Developer & AI/ML Engineer",
    "worksFor": {
      "@type": "Organization",
      "name": "Freelance"
    },
    "alumniOf": {
      "@type": "EducationalOrganization",
      "name": "SRM Institute of Science and Technology"
    },
    "knowsAbout": [
      "Full Stack Development",
      "Artificial Intelligence",
      "Machine Learning",
      "Embedded Systems",
      "Next.js",
      "React",
      "Python",
      "JavaScript",
      "TypeScript"
    ],
    "hasOccupation": {
      "@type": "Occupation",
      "name": "Software Developer",
      "occupationLocation": {
        "@type": "Country",
        "name": "India"
      }
    }
  };

  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/favicon.ico" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="font-orbitron antialiased bg-jarvis-bg text-jarvis-text">
        {children}
      </body>
    </html>
  );
}
