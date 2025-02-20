'use client'

import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import StatsSection from '../components/Stats'
export default function Hero() {
  return (
    <section className="relative min-h-[90vh] sm:min-h-[70vh] flex items-center justify-center mt-40">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
        <div className="flex flex-col items-center justify-center h-full">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white px-4 text-center"
          >
            Unlock Your Career Potential
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 sm:mt-6 text-sm sm:text-sm text-center text-gray-600 dark:text-gray-300 max-w-2xl mx-auto px-4"
          >
            Get personalized career guidance, access exclusive job opportunities, and connect with industry experts to accelerate your professional growth.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 px-4"
          >
            <Link
              to="/career-tips"
              className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
            >
              Get Career Advice
            </Link>
            <Link
              to="/jobs"
              className="inline-flex items-center justify-center px-8 py-3 border border-blue-600 text-base font-medium rounded-md text-blue-600 bg-transparent hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors duration-200"
            >
              Find Your Dream Job
            </Link>
          </motion.div>
          <StatsSection/>
        </div>
      </div>
    </section>
  )
}
