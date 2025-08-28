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

export function CalendlyPreload() {
  useEffect(() => {
    // Early preload of Calendly resources
    const preloadCalendlyAssets = () => {
      // Early load of the CSS
      const cssLink = document.createElement('link')
      cssLink.rel = 'stylesheet'
      cssLink.href = 'https://assets.calendly.com/assets/external/widget.css'
      
      // Preload the main Calendly widget script
      const scriptPreload = document.createElement('link')
      scriptPreload.rel = 'preload'
      scriptPreload.href = 'https://assets.calendly.com/assets/external/widget.js'
      scriptPreload.as = 'script'
      scriptPreload.crossOrigin = 'anonymous'
      
      // Preload Calendly CSS
      const cssPreload = document.createElement('link')
      cssPreload.rel = 'preload'
      cssPreload.href = 'https://assets.calendly.com/assets/external/widget.css'
      cssPreload.as = 'style'
      cssPreload.crossOrigin = 'anonymous'
      
      // DNS prefetch for Calendly domains
      const dnsPrefetch1 = document.createElement('link')
      dnsPrefetch1.rel = 'dns-prefetch'
      dnsPrefetch1.href = '//calendly.com'
      
      const dnsPrefetch2 = document.createElement('link')
      dnsPrefetch2.rel = 'dns-prefetch'
      dnsPrefetch2.href = '//assets.calendly.com'
      
      const dnsPrefetch3 = document.createElement('link')
      dnsPrefetch3.rel = 'dns-prefetch'
      dnsPrefetch3.href = '//api.calendly.com'
      
      // Preconnect to Calendly
      const preconnect = document.createElement('link')
      preconnect.rel = 'preconnect'
      preconnect.href = 'https://calendly.com'
      preconnect.crossOrigin = 'anonymous'
      
      // Add all to head in optimal order
      document.head.appendChild(dnsPrefetch1)
      document.head.appendChild(dnsPrefetch2)
      document.head.appendChild(dnsPrefetch3)
      document.head.appendChild(preconnect)
      document.head.appendChild(cssLink)
      document.head.appendChild(scriptPreload)
      document.head.appendChild(cssPreload)

      // Start loading the script early
      const earlyScript = document.createElement('script')
      earlyScript.src = scriptPreload.href
      earlyScript.async = true
      earlyScript.crossOrigin = 'anonymous'
      document.head.appendChild(earlyScript)
    }

    // Run on component mount with requestIdleCallback for better performance
    if (typeof window !== 'undefined') {
      if ('requestIdleCallback' in window) {
        window.requestIdleCallback(preloadCalendlyAssets)
      } else {
        setTimeout(preloadCalendlyAssets, 1)
      }
    }
  }, [])

  // This component doesn't render anything
  return null
}
