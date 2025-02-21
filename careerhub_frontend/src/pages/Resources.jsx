import { useState } from 'react';
import { motion } from 'framer-motion';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { PlayCircleIcon, BookOpenIcon, CodeBracketIcon, AcademicCapIcon, ChevronDownIcon, HomeIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

const Resources = () => {
  const [openDropdown, setOpenDropdown] = useState(null);

  const categories = [
    {
      id: 1,
      title: 'Software Development',
      description: 'Master the art of building robust and scalable software applications. Learn programming languages, frameworks, and best practices to become a full-stack developer.',
      roadmap: 'https://roadmap.sh/roadmaps',
      resources: [
        {
          title: 'Full Stack Development with MERN',
          type: 'Video Course',
          links: [
            { label: 'Main Course', url: 'https://www.youtube.com/playlist?list=PL4cUxeGkcC9iJ_KkrkBZWZRHVwnzLIoUE' },
            { label: 'MERN Authentication', url: 'https://www.youtube.com/watch?v=WsRBmwNkv3Q' },
            { label: 'Deployment Guide', url: 'https://www.youtube.com/watch?v=7CqJlxBYj-M' }
          ],
          icon: <PlayCircleIcon className="w-6 h-6" />
        },
        {
          title: 'Spring Boot Masterclass',
          type: 'Tutorial Series',
          links: [
            { label: 'Course Link', url: 'https://www.youtube.com/playlist?list=PL0zysOflRCenjuvOwmlYLm-ifOqYXH0H_' }
          ],
          icon: <BookOpenIcon className="w-6 h-6" />
        },
        {
          title: 'Java Programming Basics',
          type: 'Interactive Course',
          link: 'https://www.codecademy.com/learn/learn-java',
          icon: <CodeBracketIcon className="w-6 h-6" />
        }
      ]
    },
    {
      id: 2,
      title: 'Data Structures & Algorithms',
      description: 'Develop strong problem-solving skills and learn to write efficient code. Master fundamental algorithms and data structures essential for technical interviews.',
      roadmap: 'https://roadmap.sh/computer-science',
      resources: [
        {
          title: 'DSA in Python',
          type: 'Video Course',
          link: 'https://www.youtube.com/playlist?list=PLBZBJbE_rGRV8D7XZ08LK6z-4zPoWzu5H',
          icon: <PlayCircleIcon className="w-6 h-6" />
        },
        {
          title: 'LeetCode Patterns',
          type: 'Study Guide',
          link: 'https://seanprashad.com/leetcode-patterns/',
          icon: <BookOpenIcon className="w-6 h-6" />
        },
        {
          title: 'Visualizing Algorithms',
          type: 'Interactive',
          link: 'https://visualgo.net/en',
          icon: <AcademicCapIcon className="w-6 h-6" />
        }
      ]
    },
    {
      id: 3,
      title: 'Web Development',
      description: 'Learn to build modern, responsive websites and web applications. Master front-end and back-end technologies to create full-stack web solutions.',
      roadmap: 'https://roadmap.sh/frontend',
      resources: [
        {
          title: 'React.js Fundamentals',
          type: 'Video Course',
          link: 'https://www.youtube.com/playlist?list=PL4cUxeGkcC9gZD-Tvwfod2gaISzfRiP9d',
          icon: <PlayCircleIcon className="w-6 h-6" />
        },
        {
          title: 'Node.js Crash Course',
          type: 'Tutorial',
          link: 'https://www.youtube.com/watch?v=fBNz5xF-Kx4',
          icon: <BookOpenIcon className="w-6 h-6" />
        },
        {
          title: 'CSS Grid Layout',
          type: 'Interactive Guide',
          link: 'https://cssgrid.io/',
          icon: <AcademicCapIcon className="w-6 h-6" />
        }
      ]
    },
    {
      id: 4,
      title: 'Mobile Development',
      description: 'Create cross-platform mobile applications using popular frameworks. Learn to build, test, and deploy mobile apps for iOS and Android platforms.',
      roadmap: 'https://roadmap.sh/mobile',
      resources: [
        {
          title: 'Flutter Development',
          type: 'Video Course',
          link: 'https://www.youtube.com/playlist?list=PL4cUxeGkcC9jLYyp2Aoh6hcWuxFDX6PBJ',
          icon: <PlayCircleIcon className="w-6 h-6" />
        },
        {
          title: 'React Native Basics',
          type: 'Tutorial',
          link: 'https://www.youtube.com/watch?v=0-S5a0eXPoc',
          icon: <BookOpenIcon className="w-6 h-6" />
        }
      ]
    },
    {
      id: 5,
      title: 'DevOps',
      description: 'Learn to automate and optimize software development processes. Master CI/CD pipelines, containerization, and cloud infrastructure management.',
      roadmap: 'https://roadmap.sh/devops',
      resources: [
        {
          title: 'Docker Mastery',
          type: 'Video Course',
          link: 'https://www.youtube.com/playlist?list=PLhW3qG5bs-L99pQsZ74f-LC-tOEsBp2rK',
          icon: <PlayCircleIcon className="w-6 h-6" />
        },
        {
          title: 'Kubernetes Guide',
          type: 'Interactive Course',
          link: 'https://kubernetes.io/docs/tutorials/',
          icon: <AcademicCapIcon className="w-6 h-6" />
        }
      ]
    },
    {
      id: 6,
      title: 'Artificial Intelligence',
      description: 'Explore the world of machine learning and AI. Learn to build intelligent systems, neural networks, and predictive models.',
      roadmap: 'https://roadmap.sh/ai-data-scientist',
      resources: [
        {
          title: 'Machine Learning Basics',
          type: 'Video Course',
          link: 'https://www.youtube.com/playlist?list=PL9ooVrP1hQOHUfd-g8GUpKI3hHOwM_9Dn',
          icon: <PlayCircleIcon className="w-6 h-6" />
        },
        {
          title: 'Deep Learning with PyTorch',
          type: 'Tutorial',
          link: 'https://pytorch.org/tutorials/',
          icon: <BookOpenIcon className="w-6 h-6" />
        }
      ]
    }
  ];

  const toggleDropdown = (categoryId, index) => {
    const dropdownKey = `${categoryId}-${index}`;
    setOpenDropdown(openDropdown === dropdownKey ? null : dropdownKey);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-slate-900 dark:to-slate-800 mt-10">
      <NavBar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb Navigation */}
        <nav className="flex mb-8" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-4">
            <li>
              <div>
                <a href="/" className="text-gray-400 hover:text-gray-500 dark:text-gray-300 dark:hover:text-gray-400">
                  <HomeIcon className="flex-shrink-0 h-5 w-5" aria-hidden="true" />
                  <span className="sr-only">Home</span>
                </a>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <ChevronRightIcon className="flex-shrink-0 h-5 w-5 text-gray-400 dark:text-gray-300" aria-hidden="true" />
                <span className="ml-4 text-sm font-medium text-gray-500 dark:text-gray-400">Resources</span>
              </div>
            </li>
          </ol>
        </nav>

        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-purple-400">
            Professional Learning Hub
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Master your skills with our comprehensive collection of professional resources
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <motion.div 
              key={category.id} 
              whileHover={{ scale: 1.02 }}
              className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl hover:shadow-3xl transition-all"
            >
              <div className="p-8">
                <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
                  {category.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {category.description}
                </p>
                <a
                  href={category.roadmap}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mb-8 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-800/20 transition-colors"
                >
                  View Roadmap
                </a>
                <div className="space-y-6">
                  {category.resources.map((resource, index) => (
                    <div
                      key={index}
                      className="group relative"
                    >
                      <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-slate-700 dark:to-slate-600 rounded-lg shadow-sm hover:shadow-md transition-all">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="p-3 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl text-blue-600 dark:text-blue-400">
                              {resource.icon}
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                              {resource.title}
                            </h3>
                          </div>
                          {(resource.links || resource.link) && (
                            <button
                              onClick={() => toggleDropdown(category.id, index)}
                              className="p-2 hover:bg-gray-200 dark:hover:bg-slate-600 rounded-lg transition-colors"
                            >
                              <ChevronDownIcon className={`w-5 h-5 text-gray-600 dark:text-gray-300 transition-transform ${openDropdown === `${category.id}-${index}` ? 'rotate-180' : ''}`} />
                            </button>
                          )}
                        </div>
                        <p className="text-gray-600 dark:text-gray-300 mt-2">
                          {resource.type}
                        </p>
                        {openDropdown === `${category.id}-${index}` && (
                          <div className="mt-4 space-y-2">
                            {resource.links ? (
                              resource.links.map((link, linkIndex) => (
                                <a
                                  key={linkIndex}
                                  href={link.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="block px-4 py-2 bg-white dark:bg-slate-600 rounded-md hover:bg-gray-100 dark:hover:bg-slate-500 transition-colors text-gray-700 dark:text-gray-200"
                                >
                                  {link.label}
                                </a>
                              ))
                            ) : (
                              <a
                                href={resource.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block px-4 py-2 bg-white dark:bg-slate-600 rounded-md hover:bg-gray-100 dark:hover:bg-slate-500 transition-colors text-gray-700 dark:text-gray-200"
                              >
                                Go to Resource
                              </a>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Resources;

