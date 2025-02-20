'use client'
import { motion } from 'framer-motion'
import { BookOpenIcon, DocumentChartBarIcon, AcademicCapIcon } from '@heroicons/react/24/outline'

export default function ResourceShowcase() {
  const resources = [
    {
      icon: BookOpenIcon,
      title: "Interview Preparation Guides",
      description: "Master technical interviews with our curated collection of coding challenges and system design resources"
    },
    {
      icon: DocumentChartBarIcon,
      title: "Resume Building Toolkit",
      description: "Create ATS-optimized resumes with our smart builder and industry-specific templates"
    },
    {
      icon: AcademicCapIcon,
      title: "Data Structure and Algorithms",
      description: "Master data structures and algorithms with our interactive tutorials and practice problems"
    }
  ]

  return (
    <section className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Career Accelerators
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Essential resources to power your professional development
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map((resource, index) => (
            <motion.div
              key={resource.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', delay: index * 0.1, stiffness: 300 }}
              viewport={{ once: true }}
              className="group relative p-8 rounded-2xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-0 group-hover:opacity-10 transition-opacity rounded-2xl" />
              <div className="relative z-10">
                <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg w-fit mb-6">
                  <resource.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 dark:text-white">{resource.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">{resource.description}</p>
                <div className="inline-flex items-center font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors">
                  Explore Resources
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}