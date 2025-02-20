'use client'
import { motion } from 'framer-motion'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'

export default function FAQSection() {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    { 
      question: "How do I access the resume templates?",
      answer: "Create a free account to access our library of professional templates"
    },
    {
      question: "Are the coding problems updated regularly?",
      answer: "We update our question bank weekly with new problems"
    }
  ]

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 100 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white"
        >
          Frequently Asked Questions
        </motion.h2>
        <div className="space-y-6 max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', delay: index * 0.1, stiffness: 300 }}
              viewport={{ once: true }}
              className="group relative p-6 sm:p-8 rounded-2xl border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all"
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              <div className="relative z-10 flex items-start justify-between">
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-100">{faq.question}</h3>
                  {activeIndex === index && (
                    <p className="mt-3 text-gray-600 dark:text-gray-300 leading-relaxed">{faq.answer}</p>
                  )}
                </div>
                <ChevronDownIcon className={`h-6 w-6 text-gray-400 dark:text-gray-300 ml-4 flex-shrink-0 transition-transform ${
                  activeIndex === index ? 'rotate-180' : ''
                }`} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}