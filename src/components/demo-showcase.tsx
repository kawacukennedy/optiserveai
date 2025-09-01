"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { ChevronLeft, ChevronRight, Play, MessageCircle, Calendar, CreditCard, Star } from "lucide-react"

const demoScreenshots = [
  {
    id: 1,
    title: "Initial Client Inquiry",
    description: "AI instantly responds to WhatsApp messages, asking qualifying questions about desired treatments.",
    mockup: {
      type: "whatsapp",
      messages: [
        { sender: "client", text: "Hi, I'm interested in getting Botox. Can you help?" },
        { sender: "ai", text: "Hello! I'd be happy to help you with Botox information. What specific areas are you looking to treat?" },
        { sender: "client", text: "Forehead lines and crow's feet" },
        { sender: "ai", text: "Perfect! Have you had Botox treatments before? This helps us recommend the right approach for you." }
      ]
    }
  },
  {
    id: 2,
    title: "Treatment Consultation Booking",
    description: "After qualification, AI seamlessly schedules consultation appointments based on availability.",
    mockup: {
      type: "booking",
      content: "Great! Based on your needs, I recommend booking a consultation with Dr. Sarah. I have these time slots available this week..."
    }
  },
  {
    id: 3,
    title: "Payment & Confirmation",
    description: "Secure payment processing and instant confirmation with all appointment details.",
    mockup: {
      type: "payment",
      content: "Consultation confirmed! Your $50 deposit has been processed. You'll receive appointment details and prep instructions shortly."
    }
  }
]

export function DemoShowcase() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [currentDemo, setCurrentDemo] = useState(0)

  const nextDemo = () => {
    setCurrentDemo((prev) => (prev + 1) % demoScreenshots.length)
  }

  const prevDemo = () => {
    setCurrentDemo((prev) => (prev - 1 + demoScreenshots.length) % demoScreenshots.length)
  }

  return (
    <section ref={ref} className="py-32 relative overflow-hidden bg-gradient-to-b from-primary-navy to-dim-lighter">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-4"
          >
            <span className="text-primary-teal font-semibold text-lg">See It In Action</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-sf font-bold text-white mb-6 leading-tight"
          >
            Watch OptiServe AI Transform Your Client Experience
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-foreground/70 max-w-3xl mx-auto leading-relaxed"
          >
            See how real med-spa clients interact with our AI through WhatsApp, from initial inquiry to booking confirmation.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Demo Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-sf font-bold text-foreground mb-4">
                  {demoScreenshots[currentDemo].title}
                </h3>
                <p className="text-lg text-foreground/70 leading-relaxed">
                  {demoScreenshots[currentDemo].description}
                </p>
              </div>

              {/* Demo Navigation */}
              <div className="flex items-center space-x-4">
                <button
                  onClick={prevDemo}
                  className="w-12 h-12 rounded-full glass flex items-center justify-center hover:bg-white/20 transition-all duration-300"
                >
                  <ChevronLeft className="w-6 h-6 text-foreground" />
                </button>
                
                <div className="flex space-x-2">
                  {demoScreenshots.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentDemo(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === currentDemo
                          ? 'bg-gradient-to-r from-primary-teal to-primary-teal-light'
                          : 'bg-foreground/30 hover:bg-foreground/50'
                      }`}
                    />
                  ))}
                </div>
                
                <button
                  onClick={nextDemo}
                  className="w-12 h-12 rounded-full glass flex items-center justify-center hover:bg-white/20 transition-all duration-300"
                >
                  <ChevronRight className="w-6 h-6 text-foreground" />
                </button>
              </div>

              {/* Video CTA */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="inline-flex items-center space-x-3 px-6 py-3 glass rounded-full cursor-pointer group"
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary-teal to-primary-teal-light flex items-center justify-center">
                  <Play className="w-5 h-5 text-white ml-1" />
                </div>
                <div>
                  <div className="font-semibold text-foreground group-hover:text-primary-teal transition-colors">
                    Watch Full Demo Video
                  </div>
                  <div className="text-sm text-foreground/60">3 min overview</div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* WhatsApp Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="relative"
          >
            <div className="max-w-md mx-auto">
              {/* Phone Frame */}
              <div className="relative">
                <div className="dim-card rounded-[3rem] p-6 relative overflow-hidden border-2 border-primary-teal/20">
                  {/* Phone Header */}
                  <div className="flex items-center space-x-3 mb-6 p-4 bg-primary-teal rounded-2xl">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                      <MessageCircle className="w-6 h-6 text-primary-teal" />
                    </div>
                    <div>
                      <div className="font-semibold text-white">Luxe Aesthetics</div>
                      <div className="text-teal-100 text-sm">Online now</div>
                    </div>
                  </div>

                  {/* Chat Messages */}
                  <div className="space-y-4 h-96 overflow-hidden">
                    {currentDemo === 0 && (
                      <div className="space-y-4">
                        <div className="flex justify-end">
                          <div className="bg-primary-navy text-white p-3 rounded-2xl rounded-br-md max-w-xs">
                            Hi, I&apos;m interested in getting Botox. Can you help?
                          </div>
                        </div>
                        <div className="flex justify-start">
                          <div className="bg-gray-100 dark:bg-gray-800 text-foreground p-3 rounded-2xl rounded-bl-md max-w-xs">
                            Hello! I&apos;d be happy to help you with Botox information. What specific areas are you looking to treat?
                          </div>
                        </div>
                        <div className="flex justify-end">
                          <div className="bg-primary-navy text-white p-3 rounded-2xl rounded-br-md max-w-xs">
                            Forehead lines and crow&apos;s feet
                          </div>
                        </div>
                        <div className="flex justify-start">
                          <div className="bg-gray-100 dark:bg-gray-800 text-foreground p-3 rounded-2xl rounded-bl-md max-w-xs">
                            Perfect! Have you had Botox treatments before? This helps us recommend the right approach for you.
                          </div>
                        </div>
                      </div>
                    )}

                    {currentDemo === 1 && (
                      <div className="space-y-4">
                        <div className="flex justify-start">
                          <div className="bg-gray-100 dark:bg-gray-800 text-foreground p-3 rounded-2xl rounded-bl-md max-w-xs">
                            Great! Based on your needs, I recommend booking a consultation with Dr. Sarah. I have these slots available:
                          </div>
                        </div>
                        <div className="flex justify-start">
                          <div className="bg-primary-teal/10 border border-primary-teal/20 p-4 rounded-2xl">
                            <div className="flex items-center space-x-2 mb-2">
                              <Calendar className="w-5 h-5 text-primary-teal" />
                              <span className="font-semibold text-foreground">Available Slots</span>
                            </div>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between items-center p-2 bg-white dark:bg-gray-800 rounded-lg">
                                <span>Tomorrow 2:00 PM</span>
                                <span className="text-primary-teal font-medium">Book</span>
                              </div>
                              <div className="flex justify-between items-center p-2 bg-white dark:bg-gray-800 rounded-lg">
                                <span>Friday 10:30 AM</span>
                                <span className="text-primary-teal font-medium">Book</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {currentDemo === 2 && (
                      <div className="space-y-4">
                        <div className="flex justify-end">
                          <div className="bg-primary-navy text-white p-3 rounded-2xl rounded-br-md max-w-xs">
                            I&apos;ll take the Friday 10:30 AM slot
                          </div>
                        </div>
                        <div className="flex justify-start">
                          <div className="bg-primary-teal/10 border border-primary-teal/20 p-4 rounded-2xl">
                            <div className="flex items-center space-x-2 mb-3">
                              <CreditCard className="w-5 h-5 text-primary-teal" />
                              <span className="font-semibold text-foreground">Secure Payment</span>
                            </div>
                            <div className="text-sm space-y-2">
                              <div>Consultation Fee: $50</div>
                              <button className="w-full bg-primary-teal text-white py-2 rounded-lg font-medium">
                                Pay with Stripe
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-start">
                          <div className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 p-3 rounded-2xl rounded-bl-md max-w-xs">
                            ✅ Confirmed! Friday 10:30 AM with Dr. Sarah. Check your email for prep instructions.
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Typing Indicator */}
                  <div className="flex items-center space-x-2 mt-4 p-3">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce" style={{animationDelay: '0.1s'}} />
                      <div className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce" style={{animationDelay: '0.2s'}} />
                    </div>
                    <span className="text-sm text-foreground/60">OptiServe AI is typing...</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Key Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-24 grid md:grid-cols-3 gap-8"
        >
          <div className="text-center">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-primary-teal to-primary-teal-light flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="w-8 h-8 text-white" />
            </div>
            <h4 className="text-xl font-sf font-bold text-foreground mb-2">Instant Responses</h4>
            <p className="text-foreground/70">Clients get immediate answers to their questions, 24/7</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-primary-navy to-primary-navy-light flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-8 h-8 text-white" />
            </div>
            <h4 className="text-xl font-sf font-bold text-foreground mb-2">Smart Scheduling</h4>
            <p className="text-foreground/70">AI books appointments based on treatment type and availability</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-primary-teal to-primary-navy flex items-center justify-center mx-auto mb-4">
              <Star className="w-8 h-8 text-white" />
            </div>
            <h4 className="text-xl font-sf font-bold text-foreground mb-2">Premium Experience</h4>
            <p className="text-foreground/70">Maintain your high-end brand image with professional AI interactions</p>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 25px 50px rgba(0, 191, 166, 0.4)"
            }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-5 bg-gradient-to-r from-primary-teal to-primary-teal-light text-white rounded-full font-semibold text-xl shadow-2xl transition-all duration-300"
          >
            See Your Med-Spa Demo
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
