"use client"

import { useEffect } from 'react'

declare global {
  interface Window {
    requestIdleCallback: (
      callback: IdleRequestCallback,
      options?: IdleRequestOptions
    ) => number
  }
}

interface CalendlyPreloadProps {
  /** Only preload when user shows intent to use calendar */
  enabled?: boolean
}

export function CalendlyPreload({ enabled = false }: CalendlyPreloadProps) {
  useEffect(() => {
    // Only preload if explicitly enabled to avoid unnecessary resource loading
    if (!enabled) return

    // Check if Calendly resources are already loaded
    if (document.querySelector('link[href*="calendly.com"]')) {
      return // Already loaded
    }

    const preloadCalendlyAssets = () => {
      // DNS prefetch for faster connection when needed
      const dnsPrefetch1 = document.createElement('link')
      dnsPrefetch1.rel = 'dns-prefetch'
      dnsPrefetch1.href = '//calendly.com'
      
      const dnsPrefetch2 = document.createElement('link')
      dnsPrefetch2.rel = 'dns-prefetch'
      dnsPrefetch2.href = '//assets.calendly.com'
      
      const dnsPrefetch3 = document.createElement('link')
      dnsPrefetch3.rel = 'dns-prefetch'
      dnsPrefetch3.href = '//api.calendly.com'
      
      // Preconnect only when we know user will use it
      const preconnect = document.createElement('link')
      preconnect.rel = 'preconnect'
      preconnect.href = 'https://calendly.com'
      preconnect.crossOrigin = 'anonymous'
      
      // Preload the CSS
      const cssPreload = document.createElement('link')
      cssPreload.rel = 'preload'
      cssPreload.href = 'https://assets.calendly.com/assets/external/widget.css'
      cssPreload.as = 'style'
      cssPreload.crossOrigin = 'anonymous'
      
      // Preload the script
      const scriptPreload = document.createElement('link')
      scriptPreload.rel = 'preload'
      scriptPreload.href = 'https://assets.calendly.com/assets/external/widget.js'
      scriptPreload.as = 'script'
      scriptPreload.crossOrigin = 'anonymous'
      
      // Add to head in optimal order
      document.head.appendChild(dnsPrefetch1)
      document.head.appendChild(dnsPrefetch2)
      document.head.appendChild(dnsPrefetch3)
      document.head.appendChild(preconnect)
      document.head.appendChild(cssPreload)
      document.head.appendChild(scriptPreload)
    }

    // Use requestIdleCallback for better performance
    if (typeof window !== 'undefined') {
      if ('requestIdleCallback' in window) {
        window.requestIdleCallback(preloadCalendlyAssets)
      } else {
        setTimeout(preloadCalendlyAssets, 100) // Small delay to not block initial render
      }
    }
  }, [enabled])

  return null // This component doesn't render anything
}
