"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Check, Star, Crown, Zap, ArrowRight } from "lucide-react"
import { CalendlyBooking } from "./calendly-booking"
import { useCalendly } from "../hooks/use-calendly"

const pricingPlans = [
  {
    name: "Starter",
    price: 197,
    description: "Perfect for single-location med-spas starting their automation journey",
    features: [
      "Up to 500 WhatsApp conversations/month",
      "Basic appointment scheduling",
      "Client qualification",
      "Payment processing",
      "Email support",
      "Standard integrations"
    ],
    icon: Zap,
    gradient: "from-gray-400 to-gray-500",
    popular: false
  },
  {
    name: "Professional", 
    price: 397,
    description: "Most popular choice for established med-spas ready to scale",
    features: [
      "Up to 2,000 WhatsApp conversations/month",
      "Advanced AI treatment recommendations",
      "Automated follow-up sequences",
      "Analytics dashboard",
      "Priority phone support",
      "Custom integrations",
      "HIPAA compliance tools",
      "Multi-staff calendar sync"
    ],
    icon: Crown,
    gradient: "from-primary-teal to-primary-teal-light",
    popular: true
  },
  {
    name: "Enterprise",
    price: 797,
    description: "Complete automation suite for multi-location med-spa chains",
    features: [
      "Unlimited WhatsApp conversations",
      "Multi-location management",
      "Custom AI training",
      "Advanced analytics & reporting",
      "Dedicated account manager",
      "White-label options",
      "Custom integrations",
      "24/7 priority support"
    ],
    icon: Star,
    gradient: "from-primary-navy to-primary-navy-light",
    popular: false
  }
]

export function Pricing() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const { isOpen, openCalendly, closeCalendly } = useCalendly()

  return (
    <>
      <section id="pricing" ref={ref} className="py-32 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-primary-navy via-dim-lighter to-dim-bg" />
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
              <span className="text-primary-teal font-semibold text-lg">Simple, Transparent Pricing</span>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl font-sf font-bold text-foreground mb-6 leading-tight"
            >
              Choose the Perfect Plan{" "}
              <span className="bg-gradient-to-r from-primary-teal to-primary-navy bg-clip-text text-transparent">
                for Your Med-Spa
              </span>
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-foreground/70 max-w-3xl mx-auto leading-relaxed"
            >
              All plans include a 14-day free trial. No setup fees, no contracts. 
              Start capturing more leads today.
            </motion.p>
          </div>

          {/* Pricing Cards */}
          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ 
                  duration: 0.6, 
                  delay: 0.3 + index * 0.1,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
                whileHover={{ 
                  y: plan.popular ? -20 : -10,
                  scale: plan.popular ? 1.05 : 1.02,
                  transition: { duration: 0.3 }
                }}
                className={`relative group ${plan.popular ? 'lg:scale-110 lg:-translate-y-4' : ''}`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
                    <div className="bg-gradient-to-r from-primary-teal to-primary-teal-light text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
                      Most Popular
                    </div>
                  </div>
                )}

                <div className={`dim-card h-full relative overflow-hidden ${plan.popular ? 'border-2 border-primary-teal' : 'border border-primary-teal/20'}`}>
                  {/* Background gradient for popular plan */}
                  {plan.popular && (
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-teal/5 to-primary-navy/5" />
                  )}
                  
                  <div className="relative z-10">
                    {/* Plan Header */}
                    <div className="text-center mb-8">
                      {/* Icon */}
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${plan.gradient} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-all duration-300`}>
                        <plan.icon className="w-8 h-8 text-white" />
                      </div>
                      
                      <h3 className="text-2xl font-sf font-bold text-foreground mb-2">
                        {plan.name}
                      </h3>
                      <p className="text-foreground/60 text-sm leading-relaxed mb-6">
                        {plan.description}
                      </p>
                      
                      {/* Price */}
                      <div className="mb-2">
                        <span className="text-5xl font-bold text-foreground">${plan.price}</span>
                        <span className="text-foreground/60 text-lg">/month</span>
                      </div>
                      <div className="text-sm text-foreground/60">
                        Billed monthly • Cancel anytime
                      </div>
                    </div>

                    {/* Features */}
                    <div className="space-y-4 mb-8">
                      {plan.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-start space-x-3">
                          <div className="w-5 h-5 rounded-full bg-gradient-to-r from-primary-teal to-primary-teal-light flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Check className="w-3 h-3 text-white" />
                          </div>
                          <span className="text-foreground/80 text-sm leading-relaxed">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* CTA Button */}
                    <motion.button
                      onClick={openCalendly}
                      whileHover={{ 
                        scale: 1.05,
                        boxShadow: plan.popular ? "0 25px 50px rgba(0, 191, 166, 0.4)" : "0 15px 30px rgba(0, 0, 0, 0.1)"
                      }}
                      whileTap={{ scale: 0.95 }}
                      className={`w-full py-4 rounded-full font-semibold text-lg transition-all duration-300 flex items-center justify-center space-x-2 ${
                        plan.popular
                          ? 'bg-gradient-to-r from-primary-teal to-primary-teal-light text-white shadow-xl'
                          : 'glass text-foreground hover:bg-white/20 dark:hover:bg-white/10'
                      }`}
                    >
                      <span>Start Free Trial</span>
                      <ArrowRight className="w-5 h-5" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Money Back Guarantee */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-center mt-16"
          >
            <div className="glass rounded-2xl p-8 max-w-2xl mx-auto">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center">
                  <Check className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-foreground text-lg">30-Day Money-Back Guarantee</div>
                  <div className="text-foreground/60">Risk-free trial with full refund if not satisfied</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <CalendlyBooking isOpen={isOpen} onClose={closeCalendly} />
    </>
  )
}
