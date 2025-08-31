"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { 
  MessageCircle, 
  Calendar, 
  CreditCard, 
  Users, 
  Bell, 
  Shield, 
  BarChart3,
  Sparkles,
  Heart,
  CheckCircle
} from "lucide-react"

const features = [
  {
    icon: MessageCircle,
    title: "WhatsApp Integration",
    description: "Seamlessly connect with clients through their preferred messaging platform. Instant responses build trust and convenience.",
    gradient: "from-primary-teal to-primary-teal-light"
  },
  {
    icon: Calendar,
    title: "Smart Appointment Booking",
    description: "AI automatically schedules consultations, treatments, and follow-ups based on your availability and treatment requirements.",
    gradient: "from-primary-navy to-primary-navy-light"
  },
  {
    icon: Sparkles,
    title: "Treatment Recommendations",
    description: "Intelligent AI suggests personalized treatments based on client concerns, skin type, and aesthetic goals.",
    gradient: "from-primary-teal to-primary-navy"
  },
  {
    icon: CreditCard,
    title: "Instant Payment Processing",
    description: "Secure payment collection for deposits and services directly through WhatsApp with Stripe integration.",
    gradient: "from-primary-navy to-primary-teal"
  },
  {
    icon: Bell,
    title: "Automated Reminders",
    description: "Reduce no-shows with intelligent appointment reminders, pre-treatment instructions, and aftercare tips.",
    gradient: "from-primary-teal-light to-primary-teal"
  },
  {
    icon: Users,
    title: "Client Qualification",
    description: "AI pre-qualifies potential clients, ensuring only serious prospects book consultations, saving you time.",
    gradient: "from-primary-navy-light to-primary-navy"
  },
  {
    icon: Heart,
    title: "Aftercare Support",
    description: "Automated post-treatment follow-ups, care instructions, and satisfaction surveys to ensure client satisfaction.",
    gradient: "from-primary-teal to-primary-navy"
  },
  {
    icon: BarChart3,
    title: "Analytics & Insights",
    description: "Track booking patterns, popular treatments, and client preferences to optimize your med-spa operations.",
    gradient: "from-primary-navy to-primary-teal-light"
  },
  {
    icon: Shield,
    title: "HIPAA Compliant",
    description: "Enterprise-grade security ensures all client data and medical information is protected and compliant.",
    gradient: "from-primary-teal-dark to-primary-teal"
  }
]

export function FeaturesGrid() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="features" ref={ref} className="py-32 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-50/50 to-white dark:from-primary-navy dark:via-primary-navy-light/50 dark:to-primary-navy" />
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
            <span className="text-primary-teal font-semibold text-lg">Why Med-Spas Choose OptiServe AI</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-sf font-bold text-foreground mb-6 leading-tight"
          >
            Everything You Need to{" "}
            <span className="bg-gradient-to-r from-primary-teal via-primary-navy to-primary-teal-dark bg-clip-text text-transparent">
              Automate Client Experience
            </span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-foreground/70 max-w-3xl mx-auto leading-relaxed"
          >
            From initial inquiry to post-treatment care, OptiServe AI handles every client touchpoint 
            with the professionalism and attention to detail your med-spa is known for.
          </motion.p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ 
                duration: 0.6, 
                delay: 0.3 + index * 0.1,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              whileHover={{ 
                y: -10,
                scale: 1.05,
                transition: { duration: 0.3 }
              }}
              className="group relative"
            >
              <div className="glass-card h-full relative overflow-hidden">
                {/* Hover gradient background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                
                <div className="relative z-10">
                  {/* Icon */}
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-sf font-bold text-foreground mb-4 group-hover:text-primary-teal transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-foreground/70 leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {/* Subtle glow effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-primary-teal/5 to-primary-navy/5 rounded-2xl" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="text-center mt-20"
        >
          <div className="glass rounded-3xl p-8 max-w-2xl mx-auto">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <CheckCircle className="w-6 h-6 text-primary-teal" />
              <span className="text-lg font-semibold text-foreground">Ready in under 24 hours</span>
            </div>
            <p className="text-foreground/70 mb-6">
              No technical setup required. We handle everything so you can start converting more leads immediately.
            </p>
            <motion.button
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(0, 191, 166, 0.3)"
              }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-primary-teal to-primary-teal-light text-white rounded-full font-semibold text-lg shadow-xl transition-all duration-300"
            >
              Start Your Free Trial
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
