"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"
import { ArrowRight, Phone, Mail, MapPin, Shield, CheckCircle, MessageCircle, CreditCard } from "lucide-react"
import { CalBooking } from "./cal-booking"
import { useCal } from "../hooks/use-cal"

export function Footer() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const { isOpen, openCal, closeCal } = useCal()

  return (
    <>
      <footer ref={ref} className="relative overflow-hidden">
      {/* Final CTA Section */}
      <section className="py-32 relative">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-primary-teal/20 via-primary-navy/10 to-primary-teal/20" />
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
              <div className="absolute inset-0 bg-gradient-to-r from-primary-teal to-primary-navy transform rotate-12 scale-150" />
            </div>
            
            <div className="relative z-10">
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-4xl md:text-6xl font-sf font-bold text-white mb-8 leading-tight"
              >
                Ready to Transform Your 
                <span className="text-primary-teal">
                  {" "}Med-Spa Experience?
                </span>
              </motion.h2>
              
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-xl text-foreground/70 mb-12 max-w-3xl mx-auto leading-relaxed"
              >
                Join 200+ premium med-spas already using OptiServe AI to automate client communications, 
                increase bookings, and deliver exceptional patient experiences 24/7.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8"
              >
                <motion.button
                  onClick={openCal}
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 25px 50px rgba(0, 191, 166, 0.5)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="group px-12 py-6 bg-gradient-to-r from-primary-teal to-primary-teal-light text-white rounded-full font-semibold text-xl shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center space-x-3"
                >
                  <span>Book a Demo</span>
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </motion.button>
                
                <motion.button
                  onClick={openCal}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-10 py-5 glass rounded-full font-semibold text-xl text-foreground hover:bg-white/20 dark:hover:bg-white/10 transition-all duration-300"
                >
                  Start Free Trial
                </motion.button>
              </motion.div>
              
              {/* Trust badges */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="flex flex-col sm:flex-row gap-6 justify-center items-center text-sm mb-8"
              >
                <div className="flex items-center space-x-2 text-green-600 dark:text-green-400">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-medium">HIPAA Compliant</span>
                </div>
                <div className="hidden sm:block w-2 h-2 rounded-full bg-foreground/30" />
                <div className="flex items-center space-x-2 text-primary-teal">
                  <MessageCircle className="w-5 h-5" />
                  <span className="font-medium">WhatsApp Business API</span>
                </div>
                <div className="hidden sm:block w-2 h-2 rounded-full bg-foreground/30" />
                <div className="flex items-center space-x-2 text-blue-600 dark:text-blue-400">
                  <CreditCard className="w-5 h-5" />
                  <span className="font-medium">Stripe Secure Payments</span>
                </div>
              </motion.div>

              {/* Additional trust indicators */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto"
              >
                <div className="flex flex-col items-center p-3 glass rounded-xl">
                  <Shield className="w-6 h-6 text-primary-teal mb-2" />
                  <span className="text-xs font-medium text-foreground/70">SSL Encrypted</span>
                </div>
                <div className="flex flex-col items-center p-3 glass rounded-xl">
                  <CheckCircle className="w-6 h-6 text-green-500 mb-2" />
                  <span className="text-xs font-medium text-foreground/70">GDPR Ready</span>
                </div>
                <div className="flex flex-col items-center p-3 glass rounded-xl">
                  <MessageCircle className="w-6 h-6 text-primary-teal mb-2" />
                  <span className="text-xs font-medium text-foreground/70">WhatsApp Verified</span>
                </div>
                <div className="flex flex-col items-center p-3 glass rounded-xl">
                  <CreditCard className="w-6 h-6 text-blue-500 mb-2" />
                  <span className="text-xs font-medium text-foreground/70">PCI Compliant</span>
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
                <div className="w-12 h-12 rounded-lg overflow-hidden flex items-center justify-center">
                  <Image
                    src="/logo.svg"
                    alt="OptiServe AI Logo"
                    width={48}
                    height={48}
                    className="object-contain"
                  />
                </div>
                <span className="font-sf-pro font-semibold text-xl text-foreground">
                  OptiServe AI
                </span>
              </div>
              <p className="text-foreground/70 leading-relaxed mb-6">
                AI-powered WhatsApp automation specifically designed for medical spas. 
                Transform client communications and boost your booking conversions 24/7.
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

    <CalBooking isOpen={isOpen} onClose={closeCal} />
    </>
  )
}
