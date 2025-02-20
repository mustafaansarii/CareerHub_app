'use client'
import { motion } from 'framer-motion'
import { BookOpenIcon, DocumentChartBarIcon, CodeBracketIcon, MapIcon } from '@heroicons/react/24/outline'

export default function FeaturesGrid() {
  const features = [
    {
      icon: DocumentChartBarIcon,
      title: "Professional Resume Templates",
      description: "Ace your job applications with our ATS-friendly, industry-specific resume templates"
    },
    {
      icon: CodeBracketIcon,
      title: "DSA Roadmaps",
      description: "Master coding interviews with curated problem sets and company-specific preparation guides"
    },
    {
      icon: MapIcon,
      title: "Career Path Explorer",
      description: "Discover personalized career trajectories based on your skills and aspirations"
    },
    {
      icon: BookOpenIcon,
      title: "Learning Resources",
      description: "Access curated tutorials, interview guides, and industry insights"
    }
  ]

  return (
    <section className="py-12 sm:py-12 lg:py-12 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12 lg:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Everything You Need to Succeed
          </h2>
          <p className="mt-3 sm:mt-4 text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Comprehensive tools and resources to accelerate your career growth
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {features.map((feature, index) => (
            <motion.div 
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative p-4 sm:p-6 rounded-xl overflow-hidden bg-white/30 dark:bg-gray-900/30 backdrop-blur-sm hover:backdrop-blur-md transition-all duration-300 border border-white/10 dark:border-gray-800/10 hover:border-white/20 dark:hover:border-gray-800/20"
            >
              <div className="relative z-10">
                <div className="p-2 sm:p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg w-fit mb-4 sm:mb-6">
                  <feature.icon className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 dark:text-white">{feature.title}</h3>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}