import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable experimental features for better performance
  experimental: {
    optimizePackageImports: ['framer-motion', 'lucide-react']
  },
  
  // Configure headers for security and external resource loading
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://assets.calendly.com https://calendly.com",
              "style-src 'self' 'unsafe-inline' https://assets.calendly.com https://calendly.com",
              "img-src 'self' data: https: blob:",
              "font-src 'self' https://assets.calendly.com",
              "connect-src 'self' https://api.calendly.com https://calendly.com wss://calendly.com",
              "frame-src 'self' https://calendly.com",
              "media-src 'self' https://assets.calendly.com",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self' https://calendly.com",
              "frame-ancestors 'self'"
            ].join('; ')
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()'
          }
        ]
      }
    ]
  },
  
  // Configure images for optimization
  images: {
    domains: ['assets.calendly.com', 'calendly.com'],
    formats: ['image/webp', 'image/avif']
  },
  
  // Configure redirects for better SEO
  async redirects() {
    return [
      {
        source: '/demo',
        destination: '/#demo',
        permanent: true
      }
    ]
  },
  
  // Enable compression
  compress: true,
  
  // Configure output for static export if needed
  output: process.env.NODE_ENV === 'production' ? 'standalone' : undefined,
  
  // Minimal webpack configuration (when not using Turbopack)
  webpack: (config, { dev }) => {
    if (dev) {
      // Enable source maps in development
      config.devtool = 'eval-source-map'
    }
    return config
  }
};

export default nextConfig;
