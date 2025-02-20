'use client'
import { motion } from 'framer-motion'

export default function ProcessSteps() {
  const steps = [
    { number: '01', title: 'Assess Your Skills', description: 'Take our skill assessment quiz' },
    { number: '02', title: 'Get Recommendations', description: 'Receive personalized resource suggestions' },
    { number: '03', title: 'Track Progress', description: 'Monitor your learning journey' },
    { number: '04', title: 'Land Opportunities', description: 'Apply to curated job listings' }
  ]

  return (
    <section className="py-12 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Your Career Growth Journey
          </h2>
          <p className="mt-3 sm:mt-4 text-base sm:text-lg text-gray-600 dark:text-white max-w-2xl mx-auto">
            Four simple steps to transform your professional trajectory
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', delay: index * 0.1, stiffness: 300 }}
              viewport={{ once: true }}
              className="group relative p-6 sm:p-8 rounded-xl shadow-md hover:shadow-lg transition-all dark:bg-gray-800"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-0 group-hover:opacity-10 transition-opacity rounded-xl" />
              <div className="relative z-10">
                <span className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {step.number}
                </span>
                <h3 className="text-lg sm:text-xl font-semibold mt-4 sm:mt-6 mb-2 sm:mb-3 dark:text-white">{step.title}</h3>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-200 leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}