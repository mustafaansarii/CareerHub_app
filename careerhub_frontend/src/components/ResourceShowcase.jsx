'use client'
import { motion } from 'framer-motion'
import { BookOpenIcon, DocumentChartBarIcon, AcademicCapIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'

export default function ResourceShowcase() {
  const resources = [
    {
      icon: BookOpenIcon,
      title: "Interview Preparation Guides",
      description: "Master technical interviews with our curated collection of coding challenges and system design resources",
      link: "/career-tips"
    },
    {
      icon: DocumentChartBarIcon,
      title: "Resume Building Toolkit",
      description: "Create ATS-optimized resumes with our smart builder and industry-specific templates",
      link: "/resume-templates"
    },
    {
      icon: AcademicCapIcon,
      title: "Data Structure and Algorithms",
      description: "Master data structures and algorithms with our interactive tutorials and practice problems",
      link: "/dsa-sheet"
    }
  ]

  return (
    <section className="py-8 sm:py-12 lg:py-16 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Career Accelerators
          </h2>
          <p className="mt-3 sm:mt-4 text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Essential resources to power your professional development
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {resources.map((resource, index) => (
            <motion.div
              key={resource.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', delay: index * 0.1, stiffness: 300 }}
              viewport={{ once: true }}
              className="group relative p-6 sm:p-8 rounded-xl shadow-md hover:shadow-lg transition-all border border-gray-200 dark:border-gray-700"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-0 group-hover:opacity-10 transition-opacity rounded-xl" />
              <div className="relative z-10">
                <div className="p-2 sm:p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg w-fit mb-4 sm:mb-6">
                  <resource.icon className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 dark:text-white">{resource.title}</h3>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed mb-4 sm:mb-6">{resource.description}</p>
                <Link 
                  to={resource.link}
                  className="inline-flex items-center font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
                >
                  Explore Resources
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}