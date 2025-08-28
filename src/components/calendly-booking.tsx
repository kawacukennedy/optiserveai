"use client"

import { motion } from "framer-motion"
import { X } from "lucide-react"
import { useEffect } from "react"

interface CalendlyBookingProps {
  isOpen: boolean
  onClose: () => void
}

export function CalendlyBooking({ isOpen, onClose }: CalendlyBookingProps) {
  useEffect(() => {
    // Preload Calendly script immediately when component mounts
    const existingScript = document.querySelector('script[src*="calendly.com"]')
    if (!existingScript) {
      const script = document.createElement('script')
      script.src = 'https://assets.calendly.com/assets/external/widget.js'
      script.async = true
      script.crossOrigin = 'anonymous'
      // Preload hint for faster loading
      const preloadLink = document.createElement('link')
      preloadLink.rel = 'preload'
      preloadLink.href = 'https://assets.calendly.com/assets/external/widget.js'
      preloadLink.as = 'script'
      document.head.appendChild(preloadLink)
      document.head.appendChild(script)
    }
  }, [])

  useEffect(() => {
    if (isOpen) {
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 backdrop-blur-sm" 
        onClick={onClose}
      />
      
      {/* Modal */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative w-full max-w-4xl h-[90vh] bg-white dark:bg-gray-900 rounded-3xl shadow-3xl overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div>
            <h2 className="text-2xl font-sf-pro font-bold text-foreground">
              Schedule Your Demo
            </h2>
            <p className="text-secondary mt-1">
              Book a personalized demo with our team
            </p>
          </div>
          
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full glass hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5 text-foreground" />
          </button>
        </div>
        
        {/* Calendly Widget */}
        <div className="flex-1 h-full">
          <div 
            className="calendly-inline-widget h-full" 
            data-url="https://calendly.com/kawacukent/30min"
            style={{ minWidth: '320px', height: 'calc(100% - 100px)' }}
          />
        </div>
      </motion.div>
    </motion.div>
  )
}
