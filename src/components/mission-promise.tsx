"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Shield, Zap, Users, TrendingUp, LucideIcon } from "lucide-react"

const ValueCard = ({ icon: Icon, title, description, delay }: {
  icon: LucideIcon;
  title: string;
  description: string;
  delay: number;
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8, y: 50 }}
    whileInView={{ opacity: 1, scale: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.6, delay, ease: "easeOut" }}
    whileHover={{ 
      scale: 1.05,
      y: -5,
      transition: { duration: 0.2 }
    }}
    className="glass rounded-3xl p-8 text-center group hover:bg-white/20 dark:hover:bg-white/10 transition-all duration-300"
  >
    <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
      <Icon className="w-8 h-8 text-white" />
    </div>
    <h3 className="text-xl font-sf font-bold text-foreground mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
      {title}
    </h3>
    <p className="text-foreground/70 leading-relaxed">
      {description}
    </p>
  </motion.div>
)

export function MissionPromise() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-32 relative overflow-hidden">
      {/* Background with glass effect */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-indigo-600/10" />
        <div className="absolute inset-0 backdrop-blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Mission Section */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <span className="text-blue-600 dark:text-blue-400 font-semibold text-lg">Our Mission</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl font-sf font-bold text-foreground mb-8 leading-tight max-w-5xl mx-auto"
          >
            We help service pros 
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              {" "}reclaim time, reduce overhead,{" "}
            </span>
            and grow their business with focused AI automation.
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-foreground/70 max-w-4xl mx-auto leading-relaxed"
          >
            Every missed call is a missed opportunity. Every manual task is time stolen from what you do best. 
            We&apos;re here to change that with intelligent automation that actually works.
          </motion.p>
        </div>

        {/* Values Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          <ValueCard
            icon={Shield}
            title="Reliability"
            description="24/7 uptime with enterprise-grade infrastructure that never sleeps."
            delay={0.3}
          />
          <ValueCard
            icon={Zap}
            title="Speed"
            description="Instant responses that capture leads before they call your competitors."
            delay={0.4}
          />
          <ValueCard
            icon={Users}
            title="Simplicity"
            description="Easy setup with no complex enterprise software or lengthy training."
            delay={0.5}
          />
          <ValueCard
            icon={TrendingUp}
            title="Growth"
            description="Proven results with 3x more bookings and 95% lead capture rates."
            delay={0.6}
          />
        </div>

        {/* Promise Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="glass rounded-3xl p-12 md:p-16 text-center relative overflow-hidden"
        >
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 transform -skew-y-12 scale-150" />
          </div>
          
          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mb-6"
            >
              <span className="text-blue-600 dark:text-blue-400 font-semibold text-lg">Our Promise</span>
            </motion.div>
            
            <motion.h3
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="text-3xl md:text-5xl font-sf font-bold text-foreground mb-8 leading-tight"
            >
              No complex enterprise software.
              <br />
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Simple tools that turn leads into booked jobs automatically.
              </span>
            </motion.h3>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 1.0 }}
              className="text-xl text-foreground/70 max-w-3xl mx-auto leading-relaxed mb-8"
            >
              We built OptiServe AI for real contractors who need real solutions. No bloatware, 
              no endless configurations, no months of setup. Just intelligent automation that works 
              from day one.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 1.1 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <div className="flex items-center space-x-2 text-green-600 dark:text-green-400">
                <Shield className="w-5 h-5" />
                <span className="font-medium">30-Day Money Back Guarantee</span>
              </div>
              <div className="hidden sm:block w-2 h-2 rounded-full bg-foreground/30" />
              <div className="flex items-center space-x-2 text-blue-600 dark:text-blue-400">
                <Zap className="w-5 h-5" />
                <span className="font-medium">Setup in Under 24 Hours</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
