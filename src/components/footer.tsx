"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { ArrowRight, Phone, Mail, MapPin } from "lucide-react"
import { CalendlyBooking } from "./calendly-booking"
import { useCalendly } from "../hooks/use-calendly"

export function Footer() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const { isOpen, openCalendly, closeCalendly } = useCalendly()

  return (
    <>
      <footer ref={ref} className="relative overflow-hidden">
      {/* Final CTA Section */}
      <section className="py-32 relative">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-indigo-600/20" />
          <div className="absolute inset-0 backdrop-blur-3xl" />
        </div>
        
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="glass rounded-3xl p-12 md:p-16 relative overflow-hidden"
          >
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 transform rotate-12 scale-150" />
            </div>
            
            <div className="relative z-10">
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-4xl md:text-6xl font-sf font-bold text-foreground mb-8 leading-tight"
              >
                Ready to Stop 
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  {" "}Missing Jobs?
                </span>
              </motion.h2>
              
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-xl text-foreground/70 mb-12 max-w-3xl mx-auto leading-relaxed"
              >
                Join 500+ home service businesses already using OptiServe AI to capture more leads, 
                qualify better prospects, and book more jobs on autopilot.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8"
              >
                <motion.button
                  onClick={openCalendly}
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 25px 50px rgba(59, 130, 246, 0.5)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="group px-10 py-5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold text-xl shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center space-x-3"
                >
                  <span>Get Started</span>
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </motion.button>
                
                <motion.button
                  onClick={openCalendly}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-10 py-5 glass rounded-full font-semibold text-xl text-foreground hover:bg-white/20 dark:hover:bg-white/10 transition-all duration-300"
                >
                  Schedule Demo
                </motion.button>
              </motion.div>
              
              {/* Guarantee badges */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="flex flex-col sm:flex-row gap-6 justify-center items-center text-sm"
              >
                <div className="flex items-center space-x-2 text-green-600 dark:text-green-400">
                  <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <span className="font-medium">30-Day Free Trial</span>
                </div>
                <div className="hidden sm:block w-2 h-2 rounded-full bg-foreground/30" />
                <div className="flex items-center space-x-2 text-blue-600 dark:text-blue-400">
                  <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <span className="font-medium">No Setup Fees</span>
                </div>
                <div className="hidden sm:block w-2 h-2 rounded-full bg-foreground/30" />
                <div className="flex items-center space-x-2 text-purple-600 dark:text-purple-400">
                  <div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <span className="font-medium">Cancel Anytime</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer Links */}
      <section className="py-16 border-t border-foreground/10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            {/* Company Info */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-apple-blue to-apple-blue-light flex items-center justify-center">
                  <span className="text-white font-bold">O</span>
                </div>
                <span className="font-sf-pro font-semibold text-xl text-foreground">
                  OptiServe AI
                </span>
              </div>
              <p className="text-foreground/70 leading-relaxed mb-6">
                AI-powered dispatch and automation tools for home service professionals. 
                Capture more leads, book more jobs, grow your business.
              </p>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-foreground/60">
                  <Phone className="w-4 h-4" />
                  <span>+250785256553</span>
                </div>
                <div className="flex items-center space-x-3 text-foreground/60">
                  <Mail className="w-4 h-4" />
                  <span>kawacukent@gmail.com</span>
                </div>
                <div className="flex items-center space-x-3 text-foreground/60">
                  <MapPin className="w-4 h-4" />
                  <span>Kigali, Rwanda</span>
                </div>
              </div>
            </motion.div>

            {/* Product Links */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <h4 className="font-sf font-semibold text-foreground mb-6">Product</h4>
              <ul className="space-y-3">
                <li><a href="#features" className="text-foreground/60 hover:text-foreground transition-colors">Features</a></li>
                <li><a href="#how-it-works" className="text-foreground/60 hover:text-foreground transition-colors">How It Works</a></li>
                <li><a href="#" className="text-foreground/60 hover:text-foreground transition-colors">Pricing</a></li>
                <li><a href="#" className="text-foreground/60 hover:text-foreground transition-colors">Integrations</a></li>
              </ul>
            </motion.div>

            {/* Resources */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <h4 className="font-sf font-semibold text-foreground mb-6">Resources</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-foreground/60 hover:text-foreground transition-colors">Blog</a></li>
                <li><a href="#" className="text-foreground/60 hover:text-foreground transition-colors">Case Studies</a></li>
                <li><a href="#" className="text-foreground/60 hover:text-foreground transition-colors">Help Center</a></li>
                <li><a href="#" className="text-foreground/60 hover:text-foreground transition-colors">API Docs</a></li>
                <li><a href="#" className="text-foreground/60 hover:text-foreground transition-colors">Webinars</a></li>
              </ul>
            </motion.div>

            {/* Company */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              <h4 className="font-sf font-semibold text-foreground mb-6">Company</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-foreground/60 hover:text-foreground transition-colors">About Us</a></li>
                <li><a href="#" className="text-foreground/60 hover:text-foreground transition-colors">Careers</a></li>
                <li><a href="#" className="text-foreground/60 hover:text-foreground transition-colors">Contact</a></li>
                <li><a href="#" className="text-foreground/60 hover:text-foreground transition-colors">Partners</a></li>
                <li><a href="#" className="text-foreground/60 hover:text-foreground transition-colors">Press</a></li>
              </ul>
            </motion.div>
          </div>

          {/* Bottom Bar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="pt-8 border-t border-foreground/10 flex flex-col md:flex-row justify-between items-center"
          >
            <div className="text-foreground/60 text-sm mb-4 md:mb-0">
              © 2024 OptiServe AI. All rights reserved.
            </div>
            <div className="flex space-x-8">
              <a href="#" className="text-foreground/60 hover:text-foreground text-sm transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-foreground/60 hover:text-foreground text-sm transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-foreground/60 hover:text-foreground text-sm transition-colors">
                Cookie Policy
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </footer>

    <CalendlyBooking isOpen={isOpen} onClose={closeCalendly} />
    </>
  )
}
