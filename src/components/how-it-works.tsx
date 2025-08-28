"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Search, Calculator, CalendarCheck, ArrowRight, LucideIcon } from "lucide-react"

const StepCard = ({ step, title, description, icon: Icon, delay }: {
  step: number;
  title: string;
  description: string;
  icon: LucideIcon;
  delay: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 80, scale: 0.9 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.8, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    whileHover={{ 
      y: -20,
      rotateX: 5,
      scale: 1.05,
      transition: { duration: 0.3 }
    }}
    className="relative group"
    style={{ transformStyle: 'preserve-3d' }}
  >
    {/* Glass Card */}
    <div className="glass-card relative overflow-hidden h-full">
      {/* Step Number */}
      <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold text-xl group-hover:scale-110 transition-transform duration-300">
        {step}
      </div>

      {/* Icon */}
      <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
        <Icon className="w-8 h-8 text-white" />
      </div>

      {/* Content */}
      <h3 className="text-2xl font-sf font-bold text-foreground mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
        {title}
      </h3>
      <p className="text-foreground/70 leading-relaxed text-lg">
        {description}
      </p>

      {/* Glow effect on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-blue-600/5 to-purple-600/5 rounded-2xl" />
    </div>

    {/* Arrow for desktop */}
    {step < 3 && (
      <div className="hidden lg:block absolute -right-8 top-1/2 transform -translate-y-1/2 z-10">
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{ delay: delay + 0.5, duration: 0.5 }}
          className="w-16 h-16 glass rounded-full flex items-center justify-center"
        >
          <ArrowRight className="w-8 h-8 text-blue-600 dark:text-blue-400" />
        </motion.div>
      </div>
    )}
  </motion.div>
)

export function HowItWorks() {
  const ref = useRef(null)
  const isInView = useInView(ref, { 
    once: false, 
    margin: "-100px",
    amount: 0.3 
  })

  return (
    <section id="how-it-works" ref={ref} className="py-32 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-50/40 to-transparent dark:via-apple-gray-5/20" />
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
            <span className="text-blue-600 dark:text-blue-400 font-semibold text-lg">How It Works</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-sf font-bold text-foreground mb-6 leading-tight"
          >
            Simple 3-Step Process to 
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              {" "}Transform Your Business
            </span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-foreground/70 max-w-3xl mx-auto leading-relaxed"
          >
            Our AI dispatcher seamlessly handles customer inquiries from qualification to booking, 
            so you can focus on delivering outstanding service.
          </motion.p>
        </div>

        {/* Steps */}
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-16 relative">
          <StepCard
            step={1}
            title="Qualify"
            description="AI engages with potential customers, asking intelligent questions to understand their needs, budget, and urgency. Only qualified leads make it through."
            icon={Search}
            delay={0.3}
          />
          
          <StepCard
            step={2}
            title="Estimate"
            description="Based on the qualification, our system provides instant, accurate estimates using your pricing rules and service parameters. No more back-and-forth."
            icon={Calculator}
            delay={0.5}
          />
          
          <StepCard
            step={3}
            title="Book"
            description="Qualified leads with approved estimates are automatically scheduled into your calendar based on availability, location, and service requirements."
            icon={CalendarCheck}
            delay={0.7}
          />
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="text-center mt-20"
        >
          <motion.button
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 20px 40px rgba(59, 130, 246, 0.4)"
            }}
            whileTap={{ scale: 0.95 }}
            className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center space-x-3 mx-auto"
          >
            <span>See It In Action</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
