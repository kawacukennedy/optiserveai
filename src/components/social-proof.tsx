"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Star, Quote } from "lucide-react"

const medSpaLogos = [
  { name: "Luxe Aesthetics", location: "Beverly Hills" },
  { name: "Rejuven Med Spa", location: "Miami" },
  { name: "Elite Beauty", location: "NYC" },
  { name: "Glow Medical Spa", location: "Dallas" },
  { name: "Pure Skin Studio", location: "Atlanta" },
  { name: "Radiance Med Spa", location: "LA" }
]

const quickTestimonials = [
  {
    text: "Bookings increased 300% since we started using OptiServe AI",
    author: "Dr. Sarah Chen",
    clinic: "Luxe Aesthetics"
  },
  {
    text: "Our clients love the instant WhatsApp responses",
    author: "Maria Rodriguez",
    clinic: "Glow Medical Spa"
  },
  {
    text: "Finally, no more missed consultations",
    author: "Dr. Michael Kim",
    clinic: "Elite Beauty"
  }
]

export function SocialProof() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-20 relative overflow-hidden bg-gradient-to-b from-white to-teal-50/30 dark:from-primary-navy dark:to-primary-navy-light">
      <div className="max-w-7xl mx-auto px-4">
        {/* Trusted by section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-foreground/60 mb-8 text-lg font-medium">
            Trusted by 200+ Premium Med-Spas Nationwide
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-16">
            {medSpaLogos.map((logo, index) => (
              <motion.div
                key={logo.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="glass rounded-xl p-4 hover:bg-white/10 transition-all duration-300"
              >
                <div className="h-12 flex flex-col items-center justify-center">
                  <div className="text-sm font-semibold text-foreground/80 mb-1">{logo.name}</div>
                  <div className="text-xs text-foreground/50">{logo.location}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quick testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="grid md:grid-cols-3 gap-6"
        >
          {quickTestimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
              className="glass rounded-2xl p-6 relative overflow-hidden group hover:scale-105 transition-all duration-300"
            >
              {/* Background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-teal/5 to-primary-navy/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative z-10">
                {/* Quote icon */}
                <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-primary-teal to-primary-teal-light flex items-center justify-center mb-4">
                  <Quote className="w-5 h-5 text-white" />
                </div>
                
                {/* Stars */}
                <div className="flex mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                  ))}
                </div>
                
                {/* Testimonial */}
                <blockquote className="text-foreground/80 mb-4 font-medium leading-relaxed">
                  &quot;{testimonial.text}&quot;
                </blockquote>
                
                {/* Author */}
                <div className="text-sm">
                  <div className="font-semibold text-foreground">{testimonial.author}</div>
                  <div className="text-foreground/60">{testimonial.clinic}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
