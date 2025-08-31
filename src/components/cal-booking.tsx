"use client"

import { useEffect, useRef } from "react"

// Declare Cal globally to avoid TypeScript errors
declare global {
  interface Window {
    Cal: {
      (action: string, namespace: string, options: Record<string, unknown>): void
      ns: Record<string, (action: string, options: Record<string, unknown>) => void>
      loaded?: boolean
      q?: unknown[]
    }
  }
}

interface CalBookingProps {
  isOpen: boolean
  onClose: () => void
}

export function CalBooking({ isOpen, onClose }: CalBookingProps) {
  const calContainerRef = useRef<HTMLDivElement>(null)
  const scriptLoadedRef = useRef(false)

  useEffect(() => {
    if (isOpen && typeof window !== 'undefined' && !scriptLoadedRef.current) {
      // Load Cal.com embed script
      const script = document.createElement('script')
      script.src = 'https://app.cal.com/embed/embed.js'
      script.async = true
      
      script.onload = () => {
        scriptLoadedRef.current = true
        initializeCal()
      }
      
      document.head.appendChild(script)
    } else if (isOpen && scriptLoadedRef.current) {
      initializeCal()
    }
  }, [isOpen])

  const initializeCal = () => {
    if (window.Cal && calContainerRef.current) {
      // Clear any existing content
      calContainerRef.current.innerHTML = ''
      
      try {
        window.Cal('init', 'demo-30min', {
          origin: 'https://app.cal.com'
        })
        
        window.Cal.ns['demo-30min']('inline', {
          elementOrSelector: calContainerRef.current,
          config: {
            layout: 'month_view',
            theme: 'dark'
          },
          calLink: 'kawacu-kent-vnfqcr/30min'
        })
        
        window.Cal.ns['demo-30min']('ui', {
          hideEventTypeDetails: false,
          layout: 'month_view',
          theme: 'dark'
        })
      } catch (error) {
        console.error('Cal.com initialization error:', error)
        // Fallback: redirect to Cal.com directly
        if (calContainerRef.current) {
          calContainerRef.current.innerHTML = `
            <div class="text-center p-8">
              <p class="text-foreground/70 mb-6">Loading booking calendar...</p>
              <a 
                href="https://cal.com/kawacu-kent-vnfqcr/30min" 
                target="_blank" 
                rel="noopener noreferrer"
                class="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary-teal to-primary-teal-light text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-200"
              >
                Book on Cal.com →
              </a>
            </div>
          `
        }
      }
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="fixed inset-0 bg-black/75" onClick={onClose} />
        <div className="relative w-full max-w-4xl mx-auto">
          <div className="dim-card p-6 relative">
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-primary-teal text-white hover:bg-primary-teal-light transition-colors"
            >
              ×
            </button>
            
            {/* Header */}
            <div className="text-center mb-6">
              <h2 className="text-2xl font-sf font-bold text-foreground mb-2">
                Schedule Your Demo
              </h2>
              <p className="text-foreground/70">
                Book a 30-minute consultation to see OptiServe AI in action
              </p>
            </div>

            {/* Cal.com embed */}
            <div 
              ref={calContainerRef}
              style={{width:'100%', height:'600px', overflow:'auto'}} 
              className="rounded-lg border border-primary-teal/20 bg-background/5"
            >
              {!scriptLoadedRef.current && (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-teal mx-auto mb-4"></div>
                    <p className="text-foreground/70">Loading booking calendar...</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
