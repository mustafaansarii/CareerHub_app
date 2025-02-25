import { useState } from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';
import { ChevronRightIcon } from '@heroicons/react/24/outline';

const Tutorials = () => {
  const [activeCategory, setActiveCategory] = useState('Core CS');
  const [activeSubject, setActiveSubject] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const categories = [
    {
      name: 'Core CS',
      subjects: [
        { name: 'Algorithms', description: 'Learn about the principles of algorithms and their implementation in various programming languages.', url: 'algorithms' },
        { name: 'Compiler Design', description: 'Explore the design and implementation of compilers, including lexical analysis, parsing, and code generation.', url: 'compiler-design' },
        { name: 'Computer Networks', description: 'Study the principles of computer networks, including protocols, topologies, and network security.', url: 'computer-networks' },
        { name: 'Cybersecurity', description: 'Learn about the principles of cybersecurity, including cryptography, network security, and ethical hacking.', url: 'cybersecurity' },
        { name: 'Databases', description: 'Study the design and implementation of databases, including relational and non-relational databases.', url: 'databases' },
        { name: 'Data Structures', description: 'Learn about the principles of data structures and their implementation in various programming languages.', url: 'data-structures' },
        { name: 'Distributed Computing', description: 'Study the principles of distributed computing, including distributed systems, parallel computing, and cloud computing.', url: 'distributed-computing' },
        { name: 'Operating Systems', description: 'Study the principles of operating systems, including process management, memory management, and file systems.', url: 'operating-systems' },
        { name: 'Software Engineering', description: 'Learn about the principles of software engineering, including software development, testing, and maintenance.', url: 'software-engineering' },
        { name: 'Theory of Computation', description: 'Study the principles of theory of computation, including automata theory, computability, and complexity theory.', url: 'theory-of-computation' },
      ]
    },
    {
      name: 'Frontend',
      subjects: [
        { name: 'React', description: 'Learn about the principles of React, including state management, component-based architecture, and virtual DOM.', url: 'react' },
        { name: 'Angular', description: 'Learn about the principles of Angular, including dependency injection, routing, and testing.', url: 'angular' },
        { name: 'Vue', description: 'Learn about the principles of Vue, including reactive programming, component-based architecture, and virtual DOM.', url: 'vue' },
        { name: 'Svelte', description: 'Learn about the principles of Svelte, including reactive programming, component-based architecture, and virtual DOM.', url: 'svelte' },
        { name: 'Next.js', description: 'Learn about the principles of Next.js, including server-side rendering, static site generation, and API routes.', url: 'nextjs' },
      ]
    },
    {
      name: 'Backend',
      subjects: [
        { name: 'Spring Boot', description: 'Learn about the principles of Spring Boot, including dependency injection, routing, and testing.', url: 'spring-boot' },
        { name: 'Flask', description: 'Learn about the principles of Flask, including dependency injection, routing, and testing.', url: 'flask' },
        { name: 'Express', description: 'Learn about the principles of Express, including dependency injection, routing, and testing.', url: 'express' },
        { name: 'Django', description: 'Learn about the principles of Django, including dependency injection, routing, and testing.', url: 'django' },
        { name: 'Node.js', description: 'Learn about the principles of Node.js, including dependency injection, routing, and testing.', url: 'nodejs' },
      ]
    },
    {
      name: 'Languages',
      subjects: [
        { name: 'C++', description: 'Learn about the principles of C++, including object-oriented programming, polymorphism, and inheritance.', url: 'c++' },
        { name: 'C#', description: 'Learn about the principles of C#, including object-oriented programming, polymorphism, and inheritance.', url: 'csharp' },
        { name: 'Go', description: 'Learn about the principles of Go, including concurrency, garbage collection, and memory management.', url: 'go' },
        { name: 'Java', description: 'Learn about the principles of Java, including object-oriented programming, polymorphism, and inheritance.', url: 'java' },
        { name: 'JavaScript', description: 'Learn about the principles of JavaScript, including object-oriented programming, polymorphism, and inheritance.', url: 'javascript' },
        { name: 'PHP', description: 'Learn about the principles of PHP, including object-oriented programming, polymorphism, and inheritance.', url: 'php' },
        { name: 'Python', description: 'Learn about the principles of Python, including object-oriented programming, polymorphism, and inheritance.', url: 'python' },
        { name: 'Ruby', description: 'Learn about the principles of Ruby, including object-oriented programming, polymorphism, and inheritance.', url: 'ruby' },
        { name: 'Swift', description: 'Learn about the principles of Swift, including object-oriented programming, polymorphism, and inheritance.', url: 'swift' },
        { name: 'TypeScript', description: 'Learn about the principles of TypeScript, including object-oriented programming, polymorphism, and inheritance.', url: 'typescript' },
      ]
    },
  ];

  const descriptions = {
    'Algorithms': 'Learn about the principles of algorithms and their implementation in various programming languages.',
    'Compiler Design': 'Explore the design and implementation of compilers, including lexical analysis, parsing, and code generation.',
    'Computer Networks': 'Study the principles of computer networks, including protocols, topologies, and network security.',
    'Cybersecurity': 'Learn about the principles of cybersecurity, including cryptography, network security, and ethical hacking.',
    'Databases': 'Study the design and implementation of databases, including relational and non-relational databases.',
    'Data Structures': 'Learn about the principles of data structures and their implementation in various programming languages.',
    'Distributed Computing': 'Study the principles of distributed computing, including distributed systems, parallel computing, and cloud computing.',
    'Operating Systems': 'Study the principles of operating systems, including process management, memory management, and file systems.',
    'Software Engineering': 'Learn about the principles of software engineering, including software development, testing, and maintenance.',
    'Theory of Computation': 'Study the principles of theory of computation, including automata theory, computability, and complexity theory.',
    'React': 'Learn about the principles of React, including state management, component-based architecture, and virtual DOM.',
    'Angular': 'Learn about the principles of Angular, including dependency injection, routing, and testing.',
    'Vue': 'Learn about the principles of Vue, including reactive programming, component-based architecture, and virtual DOM.',
    'Svelte': 'Learn about the principles of Svelte, including reactive programming, component-based architecture, and virtual DOM.',
    'Next.js': 'Learn about the principles of Next.js, including server-side rendering, static site generation, and API routes.',
    'Spring Boot': 'Learn about the principles of Spring Boot, including dependency injection, routing, and testing.',
    'Flask': 'Learn about the principles of Flask, including dependency injection, routing, and testing.',
    'Express': 'Learn about the principles of Express, including dependency injection, routing, and testing.',
    'Django': 'Learn about the principles of Django, including dependency injection, routing, and testing.',
    'Node.js': 'Learn about the principles of Node.js, including dependency injection, routing, and testing.', 
    'C++': 'Learn about the principles of C++, including object-oriented programming, polymorphism, and inheritance.',
    'C#': 'Learn about the principles of C#, including object-oriented programming, polymorphism, and inheritance.',
    'Go': 'Learn about the principles of Go, including concurrency, garbage collection, and memory management.',
    'Java': 'Learn about the principles of Java, including object-oriented programming, polymorphism, and inheritance.',
    'JavaScript': 'Learn about the principles of JavaScript, including object-oriented programming, polymorphism, and inheritance.',
    'PHP': 'Learn about the principles of PHP, including object-oriented programming, polymorphism, and inheritance.',
    'Python': 'Learn about the principles of Python, including object-oriented programming, polymorphism, and inheritance.',
    'Ruby': 'Learn about the principles of Ruby, including object-oriented programming, polymorphism, and inheritance.',
    'Swift': 'Learn about the principles of Swift, including object-oriented programming, polymorphism, and inheritance.',
    'TypeScript': 'Learn about the principles of TypeScript, including object-oriented programming, polymorphism, and inheritance.'
  };

  const renderCategoryButtons = (isMobile = false) => {
    return categories.map((category) => (
      <div key={category.name} className="relative">
        <button
          onClick={() => {
            setActiveCategory(category.name);
            setActiveSubject(null);
            if (isMobile) setIsMobileMenuOpen(false);
          }}
          className={`${
            isMobile 
              ? 'px-5 py-4 text-sm w-full flex items-center justify-between transition-all duration-200 active:scale-[0.98] group'
              : 'w-full text-left px-3 py-2 rounded-lg'
          } font-medium ${
            activeCategory === category.name
              ? isMobile
                ? 'text-indigo-600 dark:text-indigo-300'
                : 'text-indigo-600 font-semibold bg-indigo-50/80 dark:bg-indigo-900/30 dark:text-indigo-200'
              : isMobile
                ? 'text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-gray-100'
                : 'text-gray-700 hover:bg-gray-100/50 dark:text-gray-200 dark:hover:bg-gray-800/50'
          }`}
        >
          <span className="flex-1 text-left">{category.name}</span>
          {activeCategory === category.name && isMobile ? (
            <ChevronRightIcon className="w-4 h-4 ml-3 opacity-90 transform transition-transform group-hover:translate-x-1" />
          ) : (
            <div className="w-4 h-4 ml-3 opacity-0 group-hover:opacity-100 transition-opacity">
              <ChevronRightIcon className="w-full h-full" />
            </div>
          )}
        </button>
        {!isMobile && <div className="absolute bottom-0 left-0 right-0 h-px bg-gray-200/50 dark:bg-gray-700/30" />}
      </div>
    ));
  };

  const renderSubcategories = () => {
    const activeCategoryData = categories.find(cat => cat.name === activeCategory);
    
    if (activeCategoryData) {
      return activeCategoryData.subjects.map((subject) => (
        <motion.div
          key={subject.name}
          whileHover={{ scale: 1.02 }}
          className="relative p-3 sm:p-4 md:p-6 rounded-lg sm:rounded-xl transition-all duration-300 border-2 border-gray-200 hover:border-indigo-200 dark:border-gray-700 dark:hover:border-indigo-400 cursor-pointer group bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-sm hover:shadow-md"
        >
          <div className="space-y-1.5 sm:space-y-2 md:space-y-3">
            <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 group-hover:text-indigo-600 dark:text-gray-100 dark:group-hover:text-indigo-300">
              {subject.name}
            </h3>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-1.5 sm:space-y-2 md:space-y-4"
            >
              <p className="text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                {subject.description}
              </p>
              <Link
                to={`/tutorials/${subject.url}`}
                className="inline-flex items-center gap-1 mt-1 text-indigo-600 hover:text-indigo-700 dark:text-indigo-300 dark:hover:text-indigo-200 font-medium text-xs sm:text-sm md:text-base"
              >
                Start Learning
                <ChevronRightIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 mt-0.5" />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      ));
    }

    return null;
  };

  return (
    <>
      <NavBar/>
      <div className="flex flex-col mt-16 md:mt-20">
        {/* Enhanced Mobile Category Switcher */}
        <motion.div 
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="md:hidden sticky top-16 z-20 bg-white/95 dark:bg-gray-900/95 border-b border-gray-200 dark:border-gray-800 backdrop-blur-sm"
        >
          <div className="px-4 py-3 flex items-center justify-between">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="flex items-center gap-2.5 text-gray-700 dark:text-gray-300 group"
            >
              <div className="relative">
                <span className="text-sm font-medium transition-all duration-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                  Browse Categories
                </span>
                <div className="absolute bottom-0 left-0 w-0 h-px bg-indigo-600 transition-all duration-300 group-hover:w-full" />
              </div>
              <ChevronRightIcon 
                className={`w-5 h-5 transition-transform ${
                  isMobileMenuOpen 
                    ? 'rotate-90 text-indigo-600 dark:text-indigo-400' 
                    : 'text-gray-500 dark:text-gray-400'
                }`} 
              />
            </button>
          </div>
        </motion.div>

        {/* Enhanced Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="absolute left-0 top-0 h-full w-[80%] max-w-sm bg-white dark:bg-gray-900 shadow-2xl mt-16 border-r-2 border-indigo-500/30 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 pt-5 border-b border-gray-200 dark:border-gray-800 bg-gradient-to-r from-indigo-50/70 to-blue-50/70 dark:from-indigo-900/20 dark:to-blue-900/20">
                <div className="flex justify-between items-center w-full">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">Learning Paths</h2>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-1.5 rounded-lg hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-colors w-full max-w-[40px]"
                  >
                    <svg className="w-6 h-6 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="h-[calc(100vh-4.5rem)] overflow-y-auto scroll-smooth scrollbar-thin scrollbar-thumb-gray-400/30 dark:scrollbar-thumb-gray-600/50 scrollbar-track-transparent pb-4">
                <div className="p-4 space-y-3">
                  {renderCategoryButtons(true)}
                </div>
              </div>
              {/* Scrolled gradient indicators */}
              <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-white dark:from-gray-900 pointer-events-none" />
              <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white dark:from-gray-900 pointer-events-none" />
            </motion.div>
          </motion.div>
        )}

        {/* Desktop Layout */}
        <div className="flex flex-col md:flex-row">
          {/* Left Navigation (Desktop) */}
          <motion.div 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="hidden md:block w-full md:w-64 lg:w-72 p-4 border-b md:border-r border-gray-200 dark:border-gray-800 h-[calc(100vh-5rem)] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent"
          >
            <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Career Path Tutorials</h2>
            <div className="space-y-0.5">
              {renderCategoryButtons()}
            </div>
          </motion.div>

          {/* Content Area */}
          <div className="flex-1 p-4 sm:p-6 md:p-8">
            {activeCategory && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6 md:space-y-8"
              >
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">
                  Master <span className="bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">{activeCategory}</span>
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {renderSubcategories()}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default Tutorials;
