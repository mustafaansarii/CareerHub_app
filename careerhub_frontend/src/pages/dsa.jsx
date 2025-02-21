'use client'
import { motion } from 'framer-motion'
import { ChevronDownIcon, StarIcon, LinkIcon, HomeIcon, CheckIcon } from '@heroicons/react/24/outline'
import { useState, useEffect } from 'react'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import config from '../config'
import useSWR from 'swr'

export default function DSAPage() {
  const [activeTopic, setActiveTopic] = useState(null);
  const accessToken = localStorage.getItem('access_token');
  const [loadingFavorite, setLoadingFavorite] = useState(null);
  const [loadingComplete, setLoadingComplete] = useState(null);

  const fetcher = (url) => fetch(url, {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  }).then(res => res.json());

  const { data: questions, mutate } = useSWR(`${config.Backend_Api}/api/careerhub/questions/`, fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    refreshWhenOffline: false,
    refreshWhenHidden: false,
    refreshInterval: 0,
    dedupingInterval: 60000,
    focusThrottleInterval: 60000,
    shouldRetryOnError: false,
    keepPreviousData: true
  });

  // Group questions by topic
  const topics = questions?.reduce((acc, question) => {
    if (!acc[question.topic]) {
      acc[question.topic] = [];
    }
    acc[question.topic].push(question);
    return acc;
  }, {});

  const toggleFavorite = async (id) => {
    setLoadingFavorite(id);
    try {
      const response = await fetch(`${config.Backend_Api}/api/careerhub/questions/${id}/toggle_favorite/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to toggle favorite');
      }
      
      const data = await response.json();
      console.log('Favorite toggled successfully:', data);
      
      // Optimistic UI update
      mutate(questions.map(question => 
        question.id === id ? { ...question, is_favorite: !question.is_favorite } : question
      ), false);
      
    } catch (error) {
      console.error('Error toggling favorite:', error);
    } finally {
      setLoadingFavorite(null);
    }
  };

  const toggleCompleted = async (id) => {
    setLoadingComplete(id);
    try {
      const response = await fetch(`${config.Backend_Api}/api/careerhub/questions/${id}/toggle_done/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to toggle completed status');
      }
      
      const data = await response.json();
      console.log('Completion status toggled successfully:', data);
      
      // Optimistic UI update
      mutate(questions.map(question => 
        question.id === id ? { ...question, is_done: !question.is_done } : question
      ), false);
      
    } catch (error) {
      console.error('Error toggling completed status:', error);
    } finally {
      setLoadingComplete(null);
    }
  };

  // Calculate progress
  const totalQuestions = questions?.length || 0;
  const completedCount = questions?.filter(q => q.is_done).length || 0;
  const progress = (completedCount / totalQuestions) * 100;

  if (!questions) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600"></div>
    </div>
  );

  return (
    <>
      <NavBar />
      <section className="py-8 md:py-12 mt-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          {/* Breadcrumb */}
          <nav className="flex mb-6" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-2">
              <li className="inline-flex items-center">
                <a href="/" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
                  <HomeIcon className="w-4 h-4 mr-2" />
                  Home
                </a>
              </li>
              <li aria-current="page">
                <div className="flex items-center">
                  <ChevronDownIcon className="w-4 h-4 text-gray-400 transform rotate-90" />
                  <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400">DSA Sheet</span>
                </div>
              </li>
            </ol>
          </nav>

          {/* Global Progress */}
          <div className="mb-8">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Progress</span>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{completedCount}/{totalQuestions} ({Math.round(progress)}%)</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
              <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
            </div>
          </div>

          {/* Description */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 100 }}
            viewport={{ once: true }}
            className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mb-8"
          >
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Top Coding Interview Problems</h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              SDE Sheet contains very handily crafted and picked top coding interview questions from different topics of Data Structures & Algorithms. These questions are one of the most asked coding interview questions in coding interviews of companies like Google, Amazon, Microsoft, Facebook, Swiggy, Flipkart, etc, and cover almost all of the concepts related to Data Structure & Algorithms.
            </p>
          </motion.div>

          <div className="space-y-4">
            {Object.entries(topics).map(([topic, questions], index) => {
              const topicCompleted = questions.filter(q => q.is_done).length;
              const topicProgress = (topicCompleted / questions.length) * 100;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ type: 'spring', delay: index * 0.1, stiffness: 300 }}
                  viewport={{ once: true }}
                  className="group relative p-4 sm:p-5 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all"
                  onClick={() => setActiveTopic(activeTopic === index ? null : index)}
                >
                  <div className="flex items-start justify-between">
                    <div className="w-full">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-base sm:text-lg font-medium text-gray-900 dark:text-gray-100">
                          {topic}
                        </h3>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {topicCompleted}/{questions.length}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-700 mb-2">
                        <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: `${topicProgress}%` }}></div>
                      </div>
                      {activeTopic === index && (
                        <div className="mt-4 overflow-x-auto">
                          <table className="w-full text-xs sm:text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                              <tr>
                                <th scope="col" className="px-2 py-2">#</th>
                                <th scope="col" className="px-2 py-2">Title</th>
                                <th scope="col" className="px-2 py-2">Link</th>
                                <th scope="col" className="px-2 py-2">Status</th>
                                <th scope="col" className="px-2 py-2">Favorite</th>
                              </tr>
                            </thead>
                            <tbody>
                              {questions.map((question) => (
                                <tr key={question.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                  <td className="px-2 py-2">{question.id}</td>
                                  <td className="px-2 py-2 font-medium text-gray-900 dark:text-white">
                                    {question.title}
                                  </td>
                                  <td className="px-2 py-2">
                                    <a 
                                      href={question.link} 
                                      target="_blank" 
                                      rel="noopener noreferrer"
                                      className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                                    >
                                      <LinkIcon className="h-4 w-4" />
                                    </a>
                                  </td>
                                  <td className="px-2 py-2">
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        toggleCompleted(question.id);
                                      }}
                                      disabled={loadingComplete === question.id}
                                      className={`text-sm px-2 py-1 rounded ${
                                        question.is_done 
                                          ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                                          : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                                      }`}
                                    >
                                      {loadingComplete === question.id ? (
                                        <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                                      ) : (
                                        question.is_done ? 'Completed' : 'Mark Complete'
                                      )}
                                    </button>
                                  </td>
                                  <td className="px-2 py-2">
                                    <button 
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        toggleFavorite(question.id);
                                      }}
                                      disabled={loadingFavorite === question.id}
                                      className="text-yellow-400 hover:text-yellow-500"
                                    >
                                      {loadingFavorite === question.id ? (
                                        <div className="w-4 h-4 border-2 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
                                      ) : (
                                        <StarIcon className={`h-4 w-4 ${question.is_favorite ? 'fill-current' : ''}`} />
                                      )}
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                    <ChevronDownIcon className={`h-5 w-5 text-gray-400 dark:text-gray-300 ml-3 flex-shrink-0 transition-transform ${
                      activeTopic === index ? 'rotate-180' : ''
                    }`} />
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
} 