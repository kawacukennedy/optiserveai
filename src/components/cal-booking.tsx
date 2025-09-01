"use client"

import { useEffect, useState } from "react"
import { ExternalLink, Calendar } from "lucide-react"

interface CalBookingProps {
  isOpen: boolean
  onClose: () => void
}

export function CalBooking({ isOpen, onClose }: CalBookingProps) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (isOpen) {
      // Reset loading state when modal opens
      setIsLoading(true)
      // Simulate loading time and then show direct booking options
      const timer = setTimeout(() => {
        setIsLoading(false)
      }, 1000)

      return () => clearTimeout(timer)
    }
  }, [isOpen])

  const handleDirectBooking = () => {
    window.open('https://cal.com/kawacu-kent-vnfqcr/30min', '_blank', 'noopener,noreferrer')
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="fixed inset-0 bg-black/75" onClick={onClose} />
        <div className="relative w-full max-w-2xl mx-auto">
          <div className="dim-card p-8 relative">
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-primary-teal text-white hover:bg-primary-teal-light transition-colors flex items-center justify-center text-xl"
            >
              ×
            </button>
            
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-primary-teal to-primary-teal-light flex items-center justify-center">
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-sf font-bold text-foreground mb-3">
                Schedule Your Demo
              </h2>
              <p className="text-lg text-foreground/70 max-w-md mx-auto">
                Book a 30-minute consultation to see how OptiServe AI can transform your med-spa
              </p>
            </div>

            {/* Content */}
            {isLoading ? (
              <div className="flex items-center justify-center py-16">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-teal mx-auto mb-4"></div>
                  <p className="text-foreground/70">Setting up your booking...</p>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Quick booking option */}
                <div className="text-center">
                  <button
                    onClick={handleDirectBooking}
                    className="w-full group px-8 py-6 bg-gradient-to-r from-primary-teal to-primary-teal-light text-white rounded-xl font-semibold text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center justify-center space-x-3"
                  >
                    <Calendar className="w-6 h-6" />
                    <span>Book Your Demo Now</span>
                    <ExternalLink className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <p className="text-sm text-foreground/50 mt-2">Opens in new tab • Secure booking via Cal.com</p>
                </div>

                {/* Features */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                  <div className="flex items-center space-x-3 p-4 glass rounded-lg">
                    <div className="w-10 h-10 rounded-full bg-primary-teal/20 flex items-center justify-center">
                      <span className="text-primary-teal font-bold">✓</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">30 Minutes</h4>
                      <p className="text-sm text-foreground/60">Live demo session</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-4 glass rounded-lg">
                    <div className="w-10 h-10 rounded-full bg-primary-teal/20 flex items-center justify-center">
                      <span className="text-primary-teal font-bold">✓</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">No Obligation</h4>
                      <p className="text-sm text-foreground/60">Free consultation</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-4 glass rounded-lg">
                    <div className="w-10 h-10 rounded-full bg-primary-teal/20 flex items-center justify-center">
                      <span className="text-primary-teal font-bold">✓</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">Custom Setup</h4>
                      <p className="text-sm text-foreground/60">Tailored to your spa</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-4 glass rounded-lg">
                    <div className="w-10 h-10 rounded-full bg-primary-teal/20 flex items-center justify-center">
                      <span className="text-primary-teal font-bold">✓</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">Instant Access</h4>
                      <p className="text-sm text-foreground/60">Start same day</p>
                    </div>
                  </div>
                </div>

                {/* Alternative contact */}
                <div className="text-center pt-6 border-t border-foreground/10">
                  <p className="text-foreground/60 mb-3">Prefer to talk first?</p>
                  <a 
                    href="tel:+250785256553" 
                    className="text-primary-teal hover:text-primary-teal-light transition-colors font-semibold"
                  >
                    Call +250 785 256 553
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
