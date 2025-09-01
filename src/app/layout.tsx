import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ChatWidget } from "@/components/chat-widget";

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
        {/* Calendly Resource Preloading */}
        <link 
          rel="preload" 
          href="https://assets.calendly.com/assets/external/widget.js" 
          as="script" 
          crossOrigin="anonymous"
        />
        <link 
          rel="preload" 
          href="https://assets.calendly.com/assets/external/widget.css" 
          as="style" 
          crossOrigin="anonymous"
        />
        <link 
          rel="dns-prefetch" 
          href="//calendly.com" 
        />
        <link 
          rel="dns-prefetch" 
          href="//assets.calendly.com" 
        />
        <link 
          rel="dns-prefetch" 
          href="//api.calendly.com" 
        />
        <link 
          rel="preconnect" 
          href="https://calendly.com" 
          crossOrigin="anonymous"
        />
        <link 
          rel="preconnect" 
          href="https://assets.calendly.com" 
          crossOrigin="anonymous"
        />
        
        {/* SEO and Performance Meta Tags */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#000000" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="font-sf-pro antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange={false}
        >
          {children}
          <ChatWidget />
        </ThemeProvider>
      </body>
    </html>
  );
}
