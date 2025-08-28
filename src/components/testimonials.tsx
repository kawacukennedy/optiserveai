"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "Mike Johnson",
    company: "Johnson HVAC Services",
    role: "Owner",
    content: "OptiServe AI transformed our business overnight. We went from missing 3-4 calls a day to capturing every single lead. Our booking rate increased by 280% in the first month.",
    rating: 5,
    avatar: "M.J",
    gradient: "from-blue-600 to-purple-600"
  },
  {
    id: 2,
    name: "Sarah Martinez",
    company: "Elite Plumbing Co.",
    role: "Operations Manager",
    content: "The AI qualification process is incredible. It filters out tire-kickers and sends us only serious customers ready to book. Our conversion rate has never been higher.",
    rating: 5,
    avatar: "S.M",
    gradient: "from-purple-600 to-indigo-600"
  },
  {
    id: 3,
    name: "David Chen",
    company: "Chen Electrical",
    role: "Founder",
    content: "I was skeptical about AI, but OptiServe proved me wrong. It handles customer inquiries better than my previous receptionist, and it works 24/7 without breaks.",
    rating: 5,
    avatar: "D.C",
    gradient: "from-indigo-600 to-blue-600"
  },
  {
    id: 4,
    name: "Lisa Thompson",
    company: "Thompson Home Services",
    role: "CEO",
    content: "The automated scheduling integration is seamless. Customers love the instant response time, and I love not having to manage a call center anymore.",
    rating: 5,
    avatar: "L.T",
    gradient: "from-blue-600 to-purple-600"
  }
]

const companyLogos = [
  { name: "Johnson HVAC", width: 120 },
  { name: "Elite Plumbing", width: 140 },
  { name: "Chen Electrical", width: 130 },
  { name: "Thompson Services", width: 150 },
  { name: "Apex Contractors", width: 135 },
  { name: "Pro Home Care", width: 125 }
]

export function Testimonials() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section ref={ref} className="py-32 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-50/20 to-transparent dark:via-purple-900/10" />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-4"
          >
            <span className="text-blue-600 dark:text-blue-400 font-semibold text-lg">What Our Clients Say</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-sf font-bold text-foreground mb-6 leading-tight"
          >
            Trusted by Home Service 
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              {" "}Professionals Nationwide
            </span>
          </motion.h2>
        </div>

        {/* Testimonial Carousel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative max-w-4xl mx-auto mb-16"
        >
          {/* Main Testimonial */}
          <div className="glass rounded-3xl p-8 md:p-12 relative overflow-hidden">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-purple-600/5 to-indigo-600/5" />
            
            <div className="relative z-10">
              {/* Quote Icon */}
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center mb-8 mx-auto">
                <Quote className="w-8 h-8 text-white" />
              </div>

              {/* Stars */}
              <div className="flex justify-center mb-6">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-6 h-6 text-yellow-500 fill-current" />
                ))}
              </div>

              {/* Testimonial Content */}
              <motion.blockquote
                key={currentTestimonial}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-xl md:text-2xl text-foreground/90 leading-relaxed text-center mb-8 font-medium"
              >
                &quot;{testimonials[currentTestimonial].content}&quot;
              </motion.blockquote>

              {/* Author */}
              <motion.div
                key={`author-${currentTestimonial}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex items-center justify-center space-x-4"
              >
                <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${testimonials[currentTestimonial].gradient} flex items-center justify-center text-white font-bold text-lg`}>
                  {testimonials[currentTestimonial].avatar}
                </div>
                <div className="text-left">
                  <div className="font-sf font-semibold text-foreground text-lg">
                    {testimonials[currentTestimonial].name}
                  </div>
                  <div className="text-foreground/60">
                    {testimonials[currentTestimonial].role}, {testimonials[currentTestimonial].company}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Navigation Buttons */}
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={prevTestimonial}
                className="w-12 h-12 rounded-full glass flex items-center justify-center hover:bg-white/20 dark:hover:bg-white/10 transition-all duration-300"
              >
                <ChevronLeft className="w-6 h-6 text-foreground" />
              </motion.button>
            </div>

            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={nextTestimonial}
                className="w-12 h-12 rounded-full glass flex items-center justify-center hover:bg-white/20 dark:hover:bg-white/10 transition-all duration-300"
              >
                <ChevronRight className="w-6 h-6 text-foreground" />
              </motion.button>
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center space-x-3 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonial
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600'
                      : 'bg-foreground/30 hover:bg-foreground/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Company Logos */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center"
        >
          <p className="text-foreground/60 mb-12 text-lg">
            Trusted by 500+ home service businesses
          </p>
          
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-60">
            {companyLogos.map((logo, index) => (
              <motion.div
                key={logo.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                whileHover={{ scale: 1.1, opacity: 0.8 }}
                className="glass rounded-xl p-4 hover:bg-white/10 transition-all duration-300"
                style={{ width: logo.width }}
              >
                <div className="h-8 bg-gradient-to-r from-foreground/40 to-foreground/60 rounded flex items-center justify-center">
                  <span className="text-xs font-medium text-foreground/70">{logo.name}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
