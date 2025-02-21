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
    },
    {
      question: "How can I improve my problem-solving skills?",
      answer: "Start with basic problems, analyze patterns, and practice consistently. Our DSA sheet provides a structured approach to build your skills"
    },
    {
      question: "I'm confused about my career path. Can you help?",
      answer: "Absolutely! We provide comprehensive roadmaps for various tech careers to help you make informed decisions"
    },
    {
      question: "What resources are best for beginners?",
      answer: "We recommend starting with our beginner-friendly resources section, which includes curated tutorials and learning paths"
    },
    {
      question: "How do I prepare for technical interviews?",
      answer: "Our platform offers interview preparation guides, mock interview questions, and coding challenges to help you ace your interviews"
    },
    {
      question: "Is there guidance for non-CS students entering tech?",
      answer: "Yes, we have special resources and roadmaps tailored for students transitioning from other fields into tech careers"
    },
    {
      question: "How can I stay motivated during my learning journey?",
      answer: "Set small achievable goals, track your progress, and connect with our community for support and encouragement"
    }
  ]

  return (
    <section className="py-8 md:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 100 }}
          viewport={{ once: true }}
          className="text-2xl sm:text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white"
        >
          Frequently Asked Questions
        </motion.h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.01 }}
              transition={{ type: 'spring', delay: index * 0.1, stiffness: 300 }}
              viewport={{ once: true }}
              className="group relative p-4 sm:p-5 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all"
              onClick={() => setActiveIndex(activeIndex === index ? null : index)}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-base sm:text-lg font-medium text-gray-900 dark:text-gray-100">{faq.question}</h3>
                  {activeIndex === index && (
                    <p className="mt-2 text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">{faq.answer}</p>
                  )}
                </div>
                <ChevronDownIcon className={`h-5 w-5 text-gray-400 dark:text-gray-300 ml-3 flex-shrink-0 transition-transform ${
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