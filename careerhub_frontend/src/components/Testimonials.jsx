'use client'
import { motion } from 'framer-motion'
import { SparklesIcon } from '@heroicons/react/24/outline'

export default function Testimonials() {
  const testimonials = [
    {
      text: "The resume templates helped me land interviews at 3 FAANG companies!",
      author: "Sarah, Software Engineer"
    },
    {
      text: "Their DSA roadmap completely transformed my problem-solving approach.",
      author: "Raj, CS Student"
    },
    {
      text: "Finally found a platform that understands what recruiters look for!",
      author: "Michael, Hiring Manager"
    }
  ]

  return (
    <section className="py-12 md:py-12 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 100 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12 lg:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Success Stories
          </h2>
          <SparklesIcon className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 text-purple-500 mx-auto mt-3 sm:mt-4 lg:mt-5" />
        </motion.div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', delay: index * 0.1, stiffness: 300 }}
              viewport={{ once: true }}
              className="group relative p-4 sm:p-6 lg:p-8 rounded-lg shadow-md hover:shadow-lg transition-all"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg" />
              <div className="relative z-10">
                <p className="text-gray-600 dark:text-gray-300 italic text-base sm:text-lg leading-relaxed">"{testimonial.text}"</p>
                <p className="mt-4 sm:mt-5 lg:mt-6 font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {testimonial.author}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}