'use client'
import { useState, useMemo, lazy, Suspense } from 'react'
import { ChevronRightIcon } from '@heroicons/react/24/outline'
import { Pagination } from '@heroui/react'
import { Link } from 'react-router-dom'

// Lazy load components
const NavBar = lazy(() => import('../components/NavBar'))
const Footer = lazy(() => import('../components/Footer'))

const templates = [
  {
    imgLink: "https://i.ibb.co/GQLp66B8/16158.jpg",
    title: "Modern Tech Resume",
    description: "Clean and professional design optimized for tech roles",
    hrefLink: "https://www.overleaf.com/latex/templates/altacv-template/trgqjpwnmtgv",
    author: "CareerHub Team",
    pick: "Top Pick"
  },
  {
    imgLink: "https://i.ibb.co/GQLp66B8/16158.jpg",
    title: "Creative Professional",
    description: "Eye-catching design for creative industries",
    hrefLink: "mustafa",
    author: "Jane Doe",
    pick: "Top Pick"
  },
  {
    imgLink: "https://i.ibb.co/GQLp66B8/16158.jpg",
    title: "Creative Professional",
    description: "Eye-catching design for creative industries",
    hrefLink: "mustafa",
    author: "Jane Doe",
    pick: "Top Pick"
  },
  {
    imgLink: "https://i.ibb.co/GQLp66B8/16158.jpg",
    title: "Creative Professional",
    description: "Eye-catching design for creative industries",
    hrefLink: "mustafa",
    author: "Jane Doe",
    pick: "Top Pick"
  },
  {
    imgLink: "https://i.ibb.co/GQLp66B8/16158.jpg",
    title: "Creative Professional",
    description: "Eye-catching design for creative industries",
    hrefLink: "mustafa",
    author: "Jane Doe",
    pick: "Top Pick"
  },
  {
    imgLink: "https://i.ibb.co/GQLp66B8/16158.jpg",
    title: "Creative Professional",
    description: "Eye-catching design for creative industries",
    hrefLink: "mustafa",
    author: "Jane Doe",
    pick: "Top Pick"
  },
  {
    imgLink: "https://i.ibb.co/GQLp66B8/16158.jpg",
    title: "Creative Professional",
    description: "Eye-catching design for creative industries",
    hrefLink: "mustafa",
    author: "Jane Doe",
    pick: "Top Pick"
  },
  {
    imgLink: "https://i.ibb.co/GQLp66B8/16158.jpg",
    title: "Creative Professional",
    description: "Eye-catching design for creative industries",
    hrefLink: "mustafa",
    author: "Jane Doe",
    pick: "Top Pick"
  },
  {
    imgLink: "https://i.ibb.co/GQLp66B8/16158.jpg",
    title: "Creative Professional",
    description: "Eye-catching design for creative industries",
    hrefLink: "mustafa",
    author: "Jane Doe",
    pick: "Top Pick"
  },
  {
    imgLink: "https://i.ibb.co/GQLp66B8/16158.jpg",
    title: "Creative Professional",
    description: "Eye-catching design for creative industries",
    hrefLink: "mustafa",
    author: "Jane Doe",
    pick: "Top Pick"
  },
  {
    imgLink: "https://i.ibb.co/GQLp66B8/16158.jpg",
    title: "Creative Professional",
    description: "Eye-catching design for creative industries",
    hrefLink: "mustafa",
    author: "Jane Doe",
    pick: "Top Pick"
  },
  {
    imgLink: "https://i.ibb.co/GQLp66B8/16158.jpg",
    title: "Resume Template",
    description: "Eye-catching design for creative industries",
    hrefLink: "mustafa",
    author: "Jane Doe",
    pick: "Top Pick"
  },
  // Add more templates here...
]

// Optimize images with lower quality placeholders
const optimizedImages = templates.map(template => ({
  ...template,
  imgLink: template.imgLink.replace('.jpg', '.webp?q=20') // Convert to webp and lower quality
}))

export default function ResumeTemplates() {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6
  const totalPages = Math.ceil(optimizedImages.length / itemsPerPage)

  const currentTemplates = useMemo(() => optimizedImages.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  ), [currentPage, itemsPerPage])

  return (
    <>
      <Suspense fallback={
        <div className="flex justify-center items-center min-h-screen">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600"></div>
        </div>
      }>
        <NavBar />
      </Suspense>
      <section className="py-6 sm:py-10 bg-white dark:bg-gray-900 mt-15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb Navigation */}
          <nav className="mb-4 sm:mb-6" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-1 sm:space-x-2">
              <li>
                <Link to="/" className="text-xs sm:text-sm md:text-base text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <ChevronRightIcon className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400" />
              </li>
              <li className="text-xs sm:text-sm md:text-base text-gray-700 dark:text-gray-200" aria-current="page">
                Resume Templates
              </li>
            </ol>
          </nav>

          <div className="text-center mb-6 sm:mb-10">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent leading-tight">
              Professional Resume Templates
            </h1>
            <p className="mt-2 sm:mt-3 text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Choose from our collection of ATS-optimized, professionally designed templates tailored for various industries
            </p>
          </div>

          {/* Template Grid */}
          <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {currentTemplates.map((template, index) => (
              <a 
                key={index} 
                href={template.hrefLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="group relative rounded-lg sm:rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-0 group-hover:opacity-10 transition-opacity" />
                <div className="relative z-10">
                  <div className="w-full h-auto max-h-[80vh] overflow-auto">
                    <img 
                      src={template.imgLink} 
                      alt={template.title} 
                      className="w-full h-auto object-contain"
                      loading="lazy"
                      width="400"  // Add explicit dimensions
                      height="600"
                    />
                  </div>
                  <div className="p-3 sm:p-4">
                    <div className="flex justify-between items-start">
                      <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2 dark:text-white">{template.title}</h3>
                      {template.pick && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100">
                          {template.pick}
                        </span>
                      )}
                    </div>
                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-2 sm:mb-3">{template.description}</p>
                    <div className="flex justify-end">
                      <span className="text-xs sm:text-sm text-gray-5 00 dark:text-gray-400">by {template.author}</span>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="mt-8 sm:mt-10 flex justify-center">
              <Pagination
                total={totalPages}
                initialPage={currentPage}
                onChange={setCurrentPage}
                color="primary"
                size="lg"
                classNames={{
                  item: "bg-transparent text-gray-700 dark:text-gray-300",
                  cursor: "bg-gradient-to-r from-blue-600 to-purple-600",
                }}
              />
            </div>
          )}
        </div>
      </section>
      <Suspense fallback={
        <div className="flex justify-center items-center min-h-screen">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600"></div>
        </div>
      }>
        <Footer />
      </Suspense>
    </>
  )
}
