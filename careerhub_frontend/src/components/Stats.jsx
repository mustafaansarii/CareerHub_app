'use client'
import { motion } from 'framer-motion'

export default function StatsSection() {
  const stats = [
    { value: '10K+', label: 'Students Helped', color: 'text-blue-600' },
    { value: '500+', label: 'Resume Templates', color: 'text-purple-600' },
    { value: '1M+', label: 'Practice Problems', color: 'text-blue-600' },
    { value: '95%', label: 'Success Rate', color: 'text-purple-600' }
  ]

  return (
    <section className="mt-12 sm:mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 text-center">
          {stats.map((stat, index) => (
            <motion.div 
              key={stat.label}
              className="p-4 sm:p-6 rounded-xl transition-colors duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className={`text-3xl sm:text-5xl font-bold ${stat.color}`}>{stat.value}</div>
              <div className="mt-2 sm:mt-3 text-base sm:text-lg text-gray-600 dark:text-gray-300">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}