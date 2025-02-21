'use client'

import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import StatsSection from '../components/Stats'
export default function Hero() {
  return (
    <section className="relative flex items-center justify-center mt-20 sm:mt-24 md:mt-32">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="flex flex-col items-center justify-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 dark:text-white px-4 text-center leading-tight sm:leading-tight md:leading-tight"
          >
            Unlock Your Career Potential
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 sm:mt-5 text-base sm:text-lg text-center text-gray-600 dark:text-gray-300 max-w-2xl mx-auto px-4 leading-relaxed"
          >
            Get personalized career guidance, access exclusive job opportunities, and connect with industry experts to accelerate your professional growth.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 px-4 w-full sm:w-auto"
          >
            <Link
              to="/career-tips"
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 sm:px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
            >
              Get Career Advice
            </Link>
            <Link
              to="/dsa-sheet"
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 sm:px-8 py-3 border border-blue-600 text-base font-medium rounded-md text-blue-600 bg-transparent hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors duration-200"
            >
              Prepare for DSA
            </Link>
          </motion.div>
          <div className="w-full mt-12 sm:mt-16 md:mt-20">
            <StatsSection/>
          </div>
        </div>
      </div>
    </section>
  )
}
