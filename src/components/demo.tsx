"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Play, Calendar, ArrowRight } from "lucide-react"

export function Demo() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)

  return (
    <section id="demo" ref={ref} className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 gradient-bg dark:gradient-bg-dark opacity-30" />
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-4"
          >
            <span className="text-blue-600 dark:text-blue-400 font-semibold text-lg">See It In Action</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-sf font-bold text-foreground mb-6 leading-tight"
          >
            Watch How OptiServe AI 
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              {" "}Transforms Your Business
            </span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-foreground/70 max-w-3xl mx-auto leading-relaxed"
          >
            See real conversations between our AI and potential customers. 
            Watch how seamlessly leads are qualified, estimated, and booked.
          </motion.p>
        </div>

        {/* Video Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 50 }}
          animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative max-w-5xl mx-auto mb-16"
        >
          {/* Glass Panel */}
          <div className="glass rounded-3xl p-4 md:p-8 relative overflow-hidden">
            {/* Background gradient effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-purple-600/5 to-indigo-600/5" />
            
            {/* Video Player */}
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-black/20 backdrop-blur-sm">
              {!isVideoLoaded ? (
                <div className="absolute inset-0 flex items-center justify-center group cursor-pointer"
                     onClick={() => setIsVideoLoaded(true)}>
                  {/* Play Button */}
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center shadow-2xl group-hover:shadow-3xl transition-all duration-300"
                  >
                    <Play className="w-8 h-8 md:w-10 md:h-10 text-white ml-1" fill="currentColor" />
                  </motion.div>
                  
                  {/* Background overlay with grid pattern */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 opacity-50" />
                  <div className="absolute inset-0" 
                       style={{
                         backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
                         backgroundSize: '20px 20px'
                       }} />
                  
                  {/* Demo preview text */}
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="glass rounded-xl p-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                        <span className="text-foreground font-medium">AI Assistant: &quot;Hello! I can help you schedule your HVAC service...&quot;</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-900 rounded-2xl">
                  <div className="text-center p-8">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center mx-auto mb-4">
                      <Play className="w-8 h-8 text-white" fill="currentColor" />
                    </div>
                    <p className="text-white/80 mb-4">Demo video would be embedded here</p>
                    <p className="text-white/60 text-sm">
                      In a real implementation, you&apos;d embed your Loom video or other video player here
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Floating stats */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="absolute -left-4 md:-left-8 top-1/4 glass rounded-2xl p-4 hidden lg:block"
          >
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 mb-1">2.3x</div>
              <div className="text-xs text-foreground/60">Faster Response</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="absolute -right-4 md:-right-8 top-3/4 glass rounded-2xl p-4 hidden lg:block"
          >
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600 mb-1">95%</div>
              <div className="text-xs text-foreground/60">Lead Capture</div>
            </div>
          </motion.div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
        >
          <motion.button
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 20px 40px rgba(59, 130, 246, 0.4)"
            }}
            whileTap={{ scale: 0.95 }}
            className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center space-x-3"
          >
            <Calendar className="w-5 h-5" />
            <span>Schedule a Live Demo</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 glass rounded-full font-semibold text-lg text-foreground hover:bg-white/20 dark:hover:bg-white/10 transition-all duration-300"
          >
            Try Free for 30 Days
          </motion.button>
        </motion.div>

        {/* Features list */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="mt-16 grid sm:grid-cols-3 gap-8 max-w-4xl mx-auto"
        >
          <div className="text-center">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold">1</span>
            </div>
            <h4 className="font-semibold text-foreground mb-2">Quick Setup</h4>
            <p className="text-sm text-foreground/60">Get started in under 24 hours with our guided onboarding</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold">2</span>
            </div>
            <h4 className="font-semibold text-foreground mb-2">Instant Results</h4>
            <p className="text-sm text-foreground/60">Start capturing and qualifying leads immediately</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold">3</span>
            </div>
            <h4 className="font-semibold text-foreground mb-2">Grow Revenue</h4>
            <p className="text-sm text-foreground/60">Watch your booking rate increase by 3x or more</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
