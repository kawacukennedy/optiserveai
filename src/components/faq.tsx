"use client"

import { motion, useInView, AnimatePresence } from "framer-motion"
import { useRef, useState } from "react"
import { ChevronDown, HelpCircle } from "lucide-react"

const faqs = [
  {
    question: "How quickly can OptiServe AI be set up for my med-spa?",
    answer: "Setup is incredibly fast! Once you provide your treatment menu and availability, we can have your AI receptionist live and handling WhatsApp inquiries within 24 hours. No technical knowledge required on your end."
  },
  {
    question: "Is OptiServe AI HIPAA compliant for medical spa operations?",
    answer: "Absolutely. We maintain full HIPAA compliance with enterprise-grade encryption, secure data handling, and proper consent management. All client information is protected according to medical privacy standards."
  },
  {
    question: "Can the AI handle complex treatment consultations and pricing?",
    answer: "Yes! Our AI is trained specifically for medical spa services. It can discuss treatment options, provide pricing estimates, explain procedures, and even recommend combination treatments based on client goals and skin concerns."
  },
  {
    question: "How does WhatsApp integration work with my existing booking system?",
    answer: "OptiServe AI seamlessly integrates with popular med-spa software like Acuity, Vagaro, Booker, and others. When a client books through WhatsApp, it automatically syncs with your existing calendar and client management system."
  },
  {
    question: "What happens if the AI encounters a question it can't answer?",
    answer: "Our AI is designed to handle 95% of common inquiries. For complex medical questions or special cases, it smoothly transitions the conversation to your staff while maintaining all conversation context for seamless handoff."
  },
  {
    question: "Can I customize the AI's responses to match my med-spa's brand voice?",
    answer: "Definitely! We train the AI to match your brand's tone, terminology, and communication style. Whether you prefer a clinical, luxury, or friendly approach, the AI adapts to represent your med-spa authentically."
  },
  {
    question: "How does payment processing work through WhatsApp?",
    answer: "Our Stripe integration allows secure payment collection directly in the WhatsApp conversation. Clients can pay consultation fees, deposits, or full treatment costs with a simple, secure checkout process."
  },
  {
    question: "What kind of analytics and insights do I get?",
    answer: "You'll receive detailed reports on conversation volume, booking conversion rates, popular treatments, peak inquiry times, and client satisfaction scores. This helps optimize your operations and marketing efforts."
  },
  {
    question: "Can the AI handle multiple languages for diverse clientele?",
    answer: "Yes! Our AI supports multiple languages including Spanish, French, and others common in your area. This helps you serve a broader client base and capture leads you might otherwise miss."
  },
  {
    question: "What if I want to cancel my subscription?",
    answer: "No problem at all. There are no long-term contracts. You can cancel anytime with 30 days notice, and we provide all your conversation data and client information for easy transition."
  }
]

export function FAQ() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" ref={ref} className="py-32 relative overflow-hidden bg-gradient-to-b from-teal-50/30 to-white dark:from-primary-navy-light to-primary-navy">
      <div className="max-w-4xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-4"
          >
            <span className="text-primary-teal font-semibold text-lg">Frequently Asked Questions</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-sf font-bold text-white mb-6 leading-tight"
          >
            Everything You Need to Know
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-foreground/70 leading-relaxed"
          >
            Common questions about implementing AI automation in your med-spa practice.
          </motion.p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.05 }}
              className="glass rounded-2xl overflow-hidden group"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-white/10 transition-all duration-300 group"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-primary-teal to-primary-teal-light flex items-center justify-center flex-shrink-0 mt-1">
                    <HelpCircle className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-lg font-sf font-semibold text-foreground leading-relaxed group-hover:text-primary-teal transition-colors duration-300">
                    {faq.question}
                  </h3>
                </div>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0 ml-4"
                >
                  <ChevronDown className="w-6 h-6 text-foreground/60" />
                </motion.div>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-8 pb-6 ml-12">
                      <div className="h-px bg-gradient-to-r from-primary-teal/20 to-transparent mb-6" />
                      <p className="text-foreground/70 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-16"
        >
          <div className="glass rounded-2xl p-8">
            <h3 className="text-2xl font-sf font-bold text-foreground mb-4">
              Still have questions?
            </h3>
            <p className="text-foreground/70 mb-6">
              Our team is here to help you understand how OptiServe AI can transform your med-spa operations.
            </p>
            <motion.button
              onClick={() => {
                // Since we don't have useCal hook here, we can make it scroll to the top or use window to open booking
                // For now, let's make it functional by scrolling to top and assuming main booking is there
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(0, 191, 166, 0.3)"
              }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-primary-teal to-primary-teal-light text-white rounded-full font-semibold text-lg shadow-xl transition-all duration-300"
            >
              Schedule a Consultation
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
