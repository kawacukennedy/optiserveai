"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { CalBooking } from "./cal-booking"
import { useCal } from "../hooks/use-cal"


export function Hero() {
  const { isOpen, openCal, closeCal } = useCal()

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-dim-bg via-dim-lighter to-primary-navy-light" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary-teal/5 via-primary-navy/10 to-primary-teal/5" />
        {/* Floating elements for dim feel */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary-teal/20 rounded-full blur-xl animate-float" />
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-primary-teal/10 rounded-full blur-xl animate-float" style={{animationDelay: '3s'}} />
        <div className="absolute top-1/2 right-1/4 w-24 h-24 bg-primary-teal/15 rounded-full blur-2xl animate-float" style={{animationDelay: '1.5s'}} />
      </div>
      


      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl lg:text-8xl font-sf-pro font-bold text-white mb-8 leading-tight tracking-tight"
        >
          <span className="block">Turn WhatsApp into your</span>
          <span className="text-primary-teal">
            24/7 Receptionist
          </span>
          <span className="block">for Med-Spas</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl md:text-2xl text-foreground/70 mb-12 max-w-4xl mx-auto leading-relaxed"
        >
          Never miss another consultation booking. Our AI automatically handles appointment scheduling, 
          treatment inquiries, and client follow-ups through WhatsApp—so you can focus on delivering 
          exceptional aesthetic treatments.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
        >
          <motion.button
            onClick={openCal}
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 25px 50px rgba(0, 191, 166, 0.4)"
            }}
            whileTap={{ scale: 0.95 }}
            className="group px-10 py-5 bg-gradient-to-r from-primary-teal to-primary-teal-light text-white rounded-full font-semibold text-xl shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center space-x-3"
          >
            <span>Book a Demo</span>
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
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


      {/* Cal.com Modal */}
      <CalBooking 
        isOpen={isOpen} 
        onClose={closeCal} 
      />
    </section>
  )
}
