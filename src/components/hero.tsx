"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { CalendlyBooking } from "./calendly-booking"
import { useCalendly } from "../hooks/use-calendly"


export function Hero() {
  const { isOpen, openCalendly, closeCalendly } = useCalendly()

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-black dark:via-apple-gray-6 dark:to-black" />
        <div className="absolute inset-0 animated-gradient opacity-5" />
      </div>
      


      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl lg:text-8xl font-sf-pro font-bold text-foreground mb-8 leading-tight tracking-tight"
        >
          <span className="block">Automate Scheduling,</span>
          <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
            Qualify Leads 24/7,
          </span>
          <span className="block">and Win More Jobs.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl md:text-2xl text-foreground/70 mb-12 max-w-3xl mx-auto leading-relaxed"
        >
          AI Dispatch for Local Home Service Pros. Transform missed calls into booked jobs 
          with intelligent lead qualification and automated scheduling.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
        >
          <motion.button
            onClick={openCalendly}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group px-8 py-4 bg-black dark:bg-white text-white dark:text-black rounded-full font-semibold text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center space-x-3"
          >
            <span>Book a Demo</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 glass rounded-full font-semibold text-lg text-foreground hover:bg-white/20 dark:hover:bg-white/10 transition-all duration-300"
          >
            Watch Demo
          </motion.button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-20 grid grid-cols-3 gap-8 max-w-2xl mx-auto"
        >
          <div className="text-center">
            <div className="text-3xl font-bold text-foreground mb-2">95%</div>
            <div className="text-sm text-foreground/60">Lead Capture Rate</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-foreground mb-2">24/7</div>
            <div className="text-sm text-foreground/60">AI Availability</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-foreground mb-2">3x</div>
            <div className="text-sm text-foreground/60">More Bookings</div>
          </div>
        </motion.div>
      </div>


      {/* Calendly Modal */}
      <CalendlyBooking 
        isOpen={isOpen} 
        onClose={closeCalendly} 
      />
    </section>
  )
}
