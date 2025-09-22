import type { Metadata } from "next";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "JARVIS - Just A Rather Very Intelligent System",
  description: "Mithurn Jeromme's personal portfolio - Computer Science student passionate about AI/ML, embedded systems, and full-stack development. Currently pursuing B.Tech at SRM Institute with CGPA 8.83.",
  keywords: ["Mithurn Jeromme", "Computer Science", "AI/ML", "Embedded Systems", "Full Stack", "Next.js", "Python", "Portfolio", "JARVIS"],
  authors: [{ name: "Mithurn Jeromme" }],
  creator: "Mithurn Jeromme",
  openGraph: {
    title: "JARVIS - Just A Rather Very Intelligent System",
    description: "Mithurn Jeromme's personal portfolio - Computer Science student passionate about AI/ML and embedded systems",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "JARVIS - Just A Rather Very Intelligent System",
    description: "Mithurn Jeromme's personal portfolio",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-orbitron antialiased bg-jarvis-bg text-jarvis-text">
        {children}
      </body>
    </html>
  );
}
