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
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Everything You Need to Succeed
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Comprehensive tools and resources to accelerate your career growth
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div 
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative p-6 rounded-2xl overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/30 dark:bg-gray-800/30 backdrop-blur-lg rounded-2xl transition-all duration-300 group-hover:backdrop-blur-xl" />
              <div className="relative z-10">
                <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg w-fit mb-6">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 dark:text-white">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}