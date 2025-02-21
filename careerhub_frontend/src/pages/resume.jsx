'use client'
import { useState, useMemo, lazy, Suspense, useEffect } from 'react'
import { ChevronRightIcon, StarIcon } from '@heroicons/react/24/outline'
import { Pagination } from '@heroui/react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import config from '../config'
// Lazy load components
const NavBar = lazy(() => import('../components/NavBar'))
const Footer = lazy(() => import('../components/Footer'))

export default function ResumeTemplates() {
  const [currentPage, setCurrentPage] = useState(1)
  const [templates, setTemplates] = useState([])
  const [loading, setLoading] = useState(true)
  const itemsPerPage = 6

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const token = localStorage.getItem('access_token')
        const response = await axios.get(`${config.Backend_Api}/api/careerhub/resumes/`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        setTemplates(response.data.map(t => ({
          ...t,
          imgLink: t.imglink.replace('.jpg', '.webp?q=20')
        })))
      } catch (error) {
        console.error('Error fetching templates:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchTemplates()
  }, [])

  const toggleFavorite = async (id) => {
    try {
      const token = localStorage.getItem('access_token')
      await axios.post(`${config.Backend_Api}/api/careerhub/questions/${id}/toggle_favorite/`, null, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setTemplates(prev => prev.map(t => 
        t.id === id ? { ...t, is_favorite: !t.is_favorite } : t
      ))
    } catch (error) {
      console.error('Error toggling favorite:', error)
    }
  }

  const totalPages = Math.ceil(templates.length / itemsPerPage)
  const currentTemplates = useMemo(() => templates.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  ), [currentPage, itemsPerPage, templates])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    )
  }

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
            {currentTemplates.map((template) => (
              <div 
                key={template.id}
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
                      width="400"
                      height="600"
                    />
                  </div>
                  <div className="p-3 sm:p-4">
                    <div className="flex justify-between items-start">
                      <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2 dark:text-white">
                        {template.title}
                      </h3>
                      <button 
                        onClick={() => toggleFavorite(template.id)}
                        className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                      >
                        <StarIcon 
                          className={`h-5 w-5 ${
                            template.is_favorite 
                              ? 'text-yellow-400 fill-yellow-400' 
                              : 'text-gray-300 dark:text-gray-500'
                          }`}
                        />
                      </button>
                    </div>
                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-2 sm:mb-3">
                      {template.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <a
                        href={template.hreflink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        View Template
                      </a>
                      <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                        by {template.authorname}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
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
