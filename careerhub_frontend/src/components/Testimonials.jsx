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
    <section className="py-5 md:py-5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 100 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-20"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold gradient-to-r from-blue-600 to-purple-600 clip-text text-transparent dark:text-white">
            Success Stories
          </h2>
          <SparklesIcon className="h-10 w-10 sm:h-12 sm:w-12 text-purple-500 mx-auto mt-4 sm:mt-6" />
        </motion.div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', delay: index * 0.1, stiffness: 300 }}
              viewport={{ once: true }}
              className="group relative p-6 sm:p-8 rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              <div className="absolute inset-0 gradient-to-r from-blue-500/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />
              <div className="relative z-10">
                <p className="text-gray-600 dark:text-gray-300 italic text-lg leading-relaxed">"{testimonial.text}"</p>
                <p className="mt-6 font-semibold gradient-to-r from-blue-600 to-purple-600 clip-text text-transparent">
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