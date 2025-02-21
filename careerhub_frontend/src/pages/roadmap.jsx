import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import config from '../config';
import { motion } from 'framer-motion';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { Suspense } from 'react';
import { StarIcon as SolidStar } from '@heroicons/react/24/solid';
import { StarIcon as OutlineStar } from '@heroicons/react/24/outline';

const Roadmap = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [roadmaps, setRoadmaps] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const itemsPerPage = 6
  
    useEffect(() => {
      const fetchTemplates = async () => {
        try {
          const token = localStorage.getItem('access_token')
          const response = await axios.get(`${config.Backend_Api}/api/careerhub/roadmaps/`, {
            headers: { Authorization: `Bearer ${token}` }
          })
          setRoadmaps(response.data)
        } catch (error) {
          console.error('Error fetching templates:', error)
          setError('Failed to load roadmaps')
        } finally {
          setLoading(false)
        }
      }
      fetchTemplates()
    }, [])
  
    const toggleFavorite = async (id) => {
      try {
        const token = localStorage.getItem('access_token')
        await axios.post(`${config.Backend_Api}/api/careerhub/roadmaps/${id}/toggle_favorite/`, null, {
          headers: { Authorization: `Bearer ${token}` }
        })
        setRoadmaps(prev => prev.map(t => 
          t.id === id ? { ...t, is_favorite: !t.is_favorite } : t
        ))
      } catch (error) {
        console.error('Error toggling favorite:', error)
      }
    }
  
    const totalPages = Math.ceil(roadmaps.length / itemsPerPage)
    const currentRoadmaps = useMemo(() => roadmaps.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    ), [currentPage, itemsPerPage, roadmaps])
  
    if (loading) {
      return (
        <div className="flex justify-center items-center min-h-screen">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600"></div>
        </div>
      )
    }
  

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-slate-900 mt-15">
            <NavBar/>
            <Suspense fallback={
                <div className="flex flex-col justify-center items-center min-h-screen gap-4">
                    <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-blue-600"></div>
                    <p className="text-lg text-gray-600 dark:text-gray-300">Loading Roadmaps...</p>
                </div>
            }>
                <main className="w-full px-4 mx-auto max-w-7xl py-12">
                    <div className="text-center mb-16">
                        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-purple-400">
                            Career Roadmaps
                        </h1>
                        {error && (
                            <div className="text-red-500 mb-4">{error}</div>
                        )}
                        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                            Master your career path with structured learning roadmaps and expert-curated resources
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {roadmaps.length === 0 ? (
                            [1, 2, 3].map((i) => (
                                <div key={i} className="h-64 bg-white dark:bg-slate-800 rounded-xl shadow-lg animate-pulse"></div>
                            ))
                        ) : (
                            roadmaps.map((roadmap) => ({
                                ...roadmap,
                                description: roadmap.description || 'Comprehensive roadmap to master this field'
                            })).map((roadmap) => (
                                <motion.div 
                                    key={roadmap.id}
                                    whileHover={{ scale: 1.03 }}
                                    className="group relative"
                                >
                                    <div className="h-full p-6 bg-white dark:bg-slate-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-200 dark:border-slate-700 flex flex-col">
                                        <div className="flex justify-between items-start mb-4">
                                            <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                                                {roadmap.fieldname}
                                            </h3>
                                            <button 
                                                onClick={() => toggleFavorite(roadmap.id)}
                                                className="p-2 hover:scale-110 transition-transform"
                                            >
                                                {roadmap.is_favorite ? (
                                                    <SolidStar className="w-8 h-8 text-yellow-400" />
                                                ) : (
                                                    <OutlineStar className="w-8 h-8 text-gray-400 dark:text-gray-300" />
                                                )}
                                            </button>
                                        </div>
                                        
                                        <div className="flex-1 mb-6">
                                            <p className="text-gray-600 dark:text-gray-300">
                                                {roadmap.description}
                                            </p>
                                        </div>
                                        
                                        <a
                                            href={roadmap.roadmaplink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-full px-6 py-3 text-center font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg 
                                                   hover:from-purple-600 hover:to-blue-600 transition-all duration-300 transform hover:-translate-y-1 
                                                   shadow-md hover:shadow-lg dark:from-blue-500 dark:to-purple-500"
                                        >
                                            Explore Roadmap →
                                        </a>
                                    </div>
                                </motion.div>
                            ))
                        )}
                    </div>
                </main>
            </Suspense>
            
            <Footer/>
        </div>
    );
};

export default Roadmap;
