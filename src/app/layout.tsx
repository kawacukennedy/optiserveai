import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: "OptiServe AI - AI-Powered Dispatch for Home Service Professionals",
  description: "Automate scheduling, qualify leads 24/7, and win more jobs with intelligent AI dispatch for HVAC, plumbing, and electrical businesses.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link 
          rel="preload" 
          href="https://assets.calendly.com/assets/external/widget.js" 
          as="script" 
          crossOrigin="anonymous"
        />
        <link 
          rel="dns-prefetch" 
          href="https://calendly.com" 
        />
        <link 
          rel="preconnect" 
          href="https://assets.calendly.com" 
          crossOrigin="anonymous"
        />
      </head>
      <body className="font-sf-pro antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange={false}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
