"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Phone, MessageSquare, Clock, Target, LucideIcon } from "lucide-react"

const FeatureCard = ({ icon: Icon, title, description, delay }: {
  icon: LucideIcon;
  title: string;
  description: string;
  delay: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 50, scale: 0.9 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.6, delay, ease: "easeOut" }}
    whileHover={{ 
      y: -10,
      transition: { duration: 0.2 }
    }}
    className="glass-card group cursor-pointer"
  >
    <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
      <Icon className="w-6 h-6 text-white" />
    </div>
    <h3 className="text-xl font-semibold text-foreground mb-3">{title}</h3>
    <p className="text-foreground/70 leading-relaxed">{description}</p>
  </motion.div>
)

export function WhoWeAre() {
  const ref = useRef(null)
  const isInView = useInView(ref, { 
    once: false, 
    margin: "-100px",
    amount: 0.3 
  })

  return (
    <section id="features" ref={ref} className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gray-50/50 dark:bg-apple-gray-6/30" />
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="mb-6"
            >
              <span className="text-blue-600 dark:text-blue-400 font-semibold text-lg">Who We Are</span>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-4xl md:text-5xl font-sf font-bold text-foreground mb-8 leading-tight"
            >
              <span className="text-foreground">AI-Powered Solutions for </span>
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Home Service Pros
              </span>
            </motion.h2>
            
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6 text-lg text-foreground/70 leading-relaxed"
            >
              <p>
                OptiServe AI builds AI-powered dispatchers for HVAC, plumbing, and electrical 
                businesses drowning in admin tasks and missed calls.
              </p>
              <p>
                Our intelligent system qualifies leads, provides instant estimates, and books 
                jobs directly into your calendar—so you can focus on what you do best: 
                delivering exceptional service to your customers.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mt-8 flex flex-wrap gap-4"
            >
              <div className="px-4 py-2 glass rounded-full text-sm font-medium text-foreground">
                HVAC Services
              </div>
              <div className="px-4 py-2 glass rounded-full text-sm font-medium text-foreground">
                Plumbing
              </div>
              <div className="px-4 py-2 glass rounded-full text-sm font-medium text-foreground">
                Electrical
              </div>
              <div className="px-4 py-2 glass rounded-full text-sm font-medium text-foreground">
                General Contractors
              </div>
            </motion.div>
          </div>

          {/* Glass Cards */}
          <div className="grid sm:grid-cols-2 gap-6">
            <FeatureCard
              icon={Phone}
              title="Never Miss a Call"
              description="AI handles every inquiry 24/7, ensuring no potential customer slips through the cracks."
              delay={0.4}
            />
            <FeatureCard
              icon={MessageSquare}
              title="Smart Qualification"
              description="Intelligent conversation flows identify high-value leads and filter out time-wasters."
              delay={0.5}
            />
            <FeatureCard
              icon={Clock}
              title="Instant Scheduling"
              description="Seamlessly book appointments into your calendar with real-time availability checking."
              delay={0.6}
            />
            <FeatureCard
              icon={Target}
              title="Revenue Growth"
              description="Convert more leads into paying customers with AI-optimized response strategies."
              delay={0.7}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
