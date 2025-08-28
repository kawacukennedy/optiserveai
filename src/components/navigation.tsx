"use client"

import { motion } from "framer-motion"
import { CalendlyBooking } from "./calendly-booking"
import { useCalendly } from "../hooks/use-calendly"

export function Navigation() {
  const { isOpen, openCalendly, closeCalendly } = useCalendly()

  return (
    <>
      <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 p-4"
    >
      <div className="max-w-7xl mx-auto">
        <div className="glass rounded-2xl px-6 py-3 flex items-center justify-between">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-3"
          >
            <div className="w-7 h-7 rounded-lg bg-gradient-to-r from-apple-blue to-apple-blue-light flex items-center justify-center">
              <span className="text-white font-bold text-sm">O</span>
            </div>
            <span className="font-sf-pro font-semibold text-lg text-foreground">
              OptiServe AI
            </span>
          </motion.div>

          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-secondary hover:text-foreground transition-colors font-medium text-sm">
              Features
            </a>
            <a href="#how-it-works" className="text-secondary hover:text-foreground transition-colors font-medium text-sm">
              How It Works
            </a>
          </div>

          <div className="flex items-center space-x-3">
            <motion.button
              onClick={openCalendly}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-5 py-2 bg-apple-blue hover:bg-apple-blue-light text-white rounded-full font-medium text-sm shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Book Demo
            </motion.button>
          </div>
        </div>
      </div>
    </motion.nav>

    <CalendlyBooking isOpen={isOpen} onClose={closeCalendly} />
    </>
  )
}
