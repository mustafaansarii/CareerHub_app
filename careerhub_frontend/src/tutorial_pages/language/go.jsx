import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../../components/NavBar';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import ReactMarkdown from 'react-markdown';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { Tooltip } from 'react-tooltip';
import toast, { Toaster } from 'react-hot-toast';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import js from 'react-syntax-highlighter/dist/esm/languages/hljs/javascript';
import python from 'react-syntax-highlighter/dist/esm/languages/hljs/python';
import { vs2015 } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import config from '../../config'
import Cookies from 'js-cookie';
// Register languages correctly
SyntaxHighlighter.registerLanguage('javascript', js);
SyntaxHighlighter.registerLanguage('python', python);
const GoTutorials = () => {
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [cachedResponses, setCachedResponses] = useState({});

  const topics = [
    {
      category: "Go Basics",
      items: [
        { id: 1, title: "Getting Started", prompt: "Explain Go installation and basic syntax with a simple 'Hello World' example" },
        { id: 2, title: "Variables & Types", prompt: "Explain Go's type system and variable declaration syntax" },
        { id: 3, title: "Packages & Modules", prompt: "How to create and use Go modules and packages" },
        { id: 4, title: "Go Toolchain", prompt: "Explain go build, run, test, and mod commands" },
      ]
    },
    {
      category: "Concurrency",
      items: [
        { id: 5, title: "Goroutines", prompt: "Explain goroutines and how they differ from OS threads" },
        { id: 6, title: "Channels", prompt: "How to use channels for goroutine communication" },
        { id: 7, title: "Select Statement", prompt: "Using select with multiple channels" },
        { id: 8, title: "Sync Package", prompt: "Using WaitGroups, Mutexes, and atomic operations" },
      ]
    },
    {
      category: "Web Development",
      items: [
        { id: 9, title: "HTTP Server", prompt: "Creating a basic HTTP server with net/http" },
        { id: 10, title: "Routing", prompt: "Implementing RESTful routes with Gorilla Mux or Gin" },
        { id: 11, title: "Middleware", prompt: "Creating and chaining middleware in Go web apps" },
        { id: 12, title: "Database Access", prompt: "Using SQL databases with database/sql and ORMs" },
      ]
    },
    {
      category: "Standard Library",
      items: [
        { id: 13, title: "JSON Handling", prompt: "Using encoding/json for marshaling/unmarshaling" },
        { id: 14, title: "File I/O", prompt: "Reading/writing files and working with file paths" },
        { id: 15, title: "Time Handling", prompt: "Working with dates/times and time zones" },
        { id: 16, title: "Testing", prompt: "Writing unit tests and benchmarks with testing package" },
      ]
    },
    {
      category: "Performance",
      items: [
        { id: 17, title: "Profiling", prompt: "Using pprof for CPU and memory profiling" },
        { id: 18, title: "GC Tuning", prompt: "Understanding and optimizing Go's garbage collector" },
        { id: 19, title: "Assembly", prompt: "Writing platform-specific assembly in Go" },
        { id: 20, title: "Benchmarking", prompt: "Writing and interpreting benchmark results" },
      ]
    },
    {
      category: "Distributed Systems",
      items: [
        { id: 21, title: "gRPC", prompt: "Implementing RPC services with gRPC" },
        { id: 22, title: "Protocol Buffers", prompt: "Using protobuf for serialization" },
        { id: 23, title: "Consensus", prompt: "Implementing Raft or Paxos in Go" },
        { id: 24, title: "Service Discovery", prompt: "Patterns for service discovery in microservices" },
      ]
    },
    {
      category: "Advanced Features",
      items: [
        { id: 25, title: "Reflection", prompt: "Using reflect package for meta-programming" },
        { id: 26, title: "CGO", prompt: "Integrating C libraries with Go using CGO" },
        { id: 27, title: "Generics", prompt: "Using type parameters and generic functions" },
        { id: 28, title: "Plugins", prompt: "Creating and loading Go plugins dynamically" },
      ]
    },
    {
      category: "Ecosystem",
      items: [
        { id: 29, title: "Popular Frameworks", prompt: "Comparing Gin, Echo, and Fiber web frameworks" },
        { id: 30, title: "CLI Tools", prompt: "Building CLI applications with Cobra" },
        { id: 31, title: "ORM Libraries", prompt: "Using GORM and Ent for database access" },
        { id: 32, title: "Cloud Native", prompt: "Building cloud-native apps with Go" },
      ]
    },
    {
      category: "Best Practices",
      items: [
        { id: 33, title: "Error Handling", prompt: "Proper error handling patterns in Go" },
        { id: 34, title: "Concurrency Patterns", prompt: "Common concurrency patterns and antipatterns" },
        { id: 35, title: "Project Structure", prompt: "Organizing large Go projects effectively" },
        { id: 36, title: "Code Review", prompt: "Common Go code review comments and best practices" },
      ]
    }
  ];

  useEffect(() => {
    if (topics.length > 0 && topics[0].items.length > 0) {
      const firstTopic = topics[0].items[0];
      setSelectedTopic(firstTopic);
      handleTopicClick(firstTopic.prompt, firstTopic.id);
    }
  }, []);

  useEffect(() => {
    const savedResponses = Cookies.get('djangoResponses');
    if (savedResponses) {
      setCachedResponses(JSON.parse(savedResponses));
    }
  }, []);

  NProgress.configure({ showSpinner: false }); 
  const handleTopicClick = async (topicPrompt, topicId) => {
    if (cachedResponses[topicId]) {
      setResult(cachedResponses[topicId]);
      return;
    }

    setIsLoading(true);
    setProgress(0);
    NProgress.start();
    
    try {
      const response = await fetch(`${config.Backend_Api}/api/careerhub/api/generate/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        },
        body: JSON.stringify({ 
          prompt: topicPrompt,
          format: 'markdown',
          mobile_optimized: true
        })
      });

      const interval = setInterval(() => {
        setProgress(prev => Math.min(prev + 10, 90));
      }, 500);

      const data = await response.json();
      clearInterval(interval);
      setProgress(100);
      
      const responseText = data.response || 'No content received from the server.';
      setResult(responseText);
      
      const newResponses = {
        ...cachedResponses,
        [topicId]: responseText
      };
      setCachedResponses(newResponses);
      Cookies.set('djangoResponses', JSON.stringify(newResponses), { expires: 7 });
    } catch (error) {
      console.error('Fetch error:', error);
      setResult(`Error: ${error.message}. Please try again later.`);
    } finally {
      NProgress.done();
      setIsLoading(false);
      setTimeout(() => setProgress(0), 300);
    }
  };

  const cleanMarkdown = (markdown) => {
    // Remove all numbered list patterns including those with ) or . after numbers
    return markdown
      .replace(/(^\d+[.)]\s+)/gm, '') // Start of line
      .replace(/(\n\d+[.)]\s+)/g, '\n') // Middle of text
      .replace(/(\d+\.)\s+/g, '') // Any remaining numbered items
      .replace(/\n{3,}/g, '\n\n'); // Limit consecutive newlines
  };

  const formatCodeResponse = (text) => {
    const parts = text.split(/(```[\s\S]*?```)/g);
    
    const handleCopy = async (code, index) => {
      await navigator.clipboard.writeText(code);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 1000);
    };

    return parts.map((part, index) => {
      if (part.startsWith('```')) {
        const match = part.match(/```(\w+)?\n?([\s\S]*?)```/);
        const language = match?.[1] || 'text';
        const code = match?.[2] || '';
        
        return (
          <div key={`code-${index}`} className="relative group my-4 md:my-6">
            <div className="flex justify-between items-center bg-gray-800 text-gray-300 px-3 md:px-4 py-1.5 md:py-2 rounded-t-lg">
              <span className="text-xs font-mono">{language}</span>
              <button
                onClick={() => handleCopy(code, index)}
                className="hover:bg-gray-700 p-1 rounded-md transition-colors relative active:scale-95"
                aria-label="Copy code"
              >
                <motion.div
                  className="absolute inset-0"
                  initial={false}
                  animate={copiedIndex === index ? "copied" : "normal"}
                  variants={{
                    copied: { opacity: 1, scale: 1 },
                    normal: { opacity: 0, scale: 0 }
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <svg
                    className="w-4 h-4 text-green-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </motion.div>
                <motion.div
                  className="absolute inset-0"
                  initial={false}
                  animate={copiedIndex === index ? "copied" : "normal"}
                  variants={{
                    copied: { opacity: 0, scale: 0 },
                    normal: { opacity: 1, scale: 1 }
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </motion.div>
              </button>
            </div>
            <SyntaxHighlighter
              language={language}
              style={vs2015}
              showLineNumbers
              wrapLines
              lineNumberStyle={{ 
                color: '#858585', 
                minWidth: '2.5em',
                display: window.innerWidth < 768 ? 'none' : 'block'
              }}
              customStyle={{
                margin: 0,
                borderRadius: '0 0 8px 8px',
                padding: '0.75rem',
                fontSize: '0.875rem',
                lineHeight: '1.5',
                width: 'calc(100vw - 2rem)',
                maxWidth: '100%',
              }}
            >
              {code}
            </SyntaxHighlighter>
          </div>
        );
      }
      
      return (
        <div key={`text-${index}`} className="prose prose-sm md:prose-base max-w-none my-4 md:my-6 w-full overflow-x-hidden">
          <ReactMarkdown
            components={{
              h2: ({ children }) => <h2 className="text-xl md:text-2xl font-bold mt-6 md:mt-8 mb-3 md:mb-4 text-gray-900 border-b pb-2">{children}</h2>,
              h3: ({ children }) => <h3 className="text-lg md:text-xl font-semibold mt-4 md:mt-6 mb-2 md:mb-3 text-gray-800">{children}</h3>,
              code: ({ children }) => <code className="bg-gray-100 text-gray-700 px-1.5 py-0.5 md:px-2 md:py-1 rounded-md font-mono text-sm md:text-base break-words">{
                String(children).replace(/\n$/, '')
              }</code>,
              a: ({ children, href }) => (
                <a 
                  href={href} 
                  className="text-indigo-600 hover:text-indigo-800 underline underline-offset-4"
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  {children}
                </a>
              ),
              table: ({ children }) => (
                <div className="overflow-x-auto w-full my-4 md:my-6">
                  <table className="min-w-full divide-y divide-gray-200 text-sm md:text-base">
                    {children}
                  </table>
                </div>
              ),
              thead: ({ children }) => (
                <thead className="bg-gray-50">
                  {children}
                </thead>
              ),
              tbody: ({ children }) => (
                <tbody className="divide-y divide-gray-200">
                  {children}
                </tbody>
              ),
              tr: ({ children }) => (
                <tr className="hover:bg-gray-50 transition-colors">
                  {children}
                </tr>
              ),
              th: ({ children }) => (
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 whitespace-nowrap">
                  {children}
                </th>
              ),
              td: ({ children }) => (
                <td className="px-4 py-3 text-sm text-gray-700 whitespace-normal">
                  {children}
                </td>
              ),
              p: ({ children }) => (
                <p className="my-3 md:my-4 leading-relaxed">
                  {children}
                </p>
              ),
            }}
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeSlug]}
          >
            {cleanMarkdown(part.replace(/\n/gi, '\n'))}
          </ReactMarkdown>
        </div>
      );
    });
  };

  const renderCategoryButtons = (isMobile = false) => {
    return topics.map((category) => (
      <div key={category.category} className="relative">
        <button
          onClick={() => {
            if (isMobile) setIsMobileMenuOpen(false);
          }}
          className={`${
            isMobile 
              ? 'px-5 py-4 text-sm w-full flex items-center justify-between transition-all duration-200 active:scale-[0.98] group'
              : 'w-full text-left px-4 py-3 rounded-lg'
          } font-medium ${
            isMobile
              ? 'text-gray-700 hover:text-gray-900'
              : 'text-gray-700 hover:bg-gray-100/50'
          }`}
        >
          <span className="flex-1 text-left font-semibold text-gray-800">
            {category.category}
          </span>
          <ChevronRightIcon className="w-4 h-4 ml-3 opacity-90 transform transition-transform group-hover:translate-x-1" />
        </button>
        {isMobile && (
          <div className="pl-4">
            {category.items.map((topic) => (
              <button
                key={topic.id}
                onClick={() => {
                  setSelectedTopic(topic);
                  handleTopicClick(topic.prompt, topic.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                  selectedTopic?.id === topic.id
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'hover:bg-gray-100/50 text-gray-700'
                }`}
              >
                {topic.title}
              </button>
            ))}
          </div>
        )}
        {isMobile && <div className="absolute bottom-0 left-0 right-0 h-px bg-gray-200/50" />}
      </div>
    ));
  };

  return (
    <>
      <NavBar/>
      <Tooltip id="copy-tooltip" className="!rounded-md !text-xs !py-1 !px-2" />
      
      <div className="flex flex-col min-h-screen mt-15 md:mt-15 bg-white">
        {/* Mobile Menu Button */}
        <motion.div 
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="md:hidden sticky top-16 z-20 bg-white/95 border-b border-gray-200 backdrop-blur-sm"
        >
          <div className="px-4 py-3 flex items-center justify-between">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="flex items-center gap-2.5 text-gray-700 group"
            >
              <div className="relative">
                <span className="text-sm font-medium transition-all duration-200 group-hover:text-indigo-600">
                  Angular Topics
                </span>
                <div className="absolute bottom-0 left-0 w-0 h-px bg-indigo-600 transition-all duration-300 group-hover:w-full" />
              </div>
              <ChevronRightIcon 
                className={`w-5 h-5 transition-transform ${
                  isMobileMenuOpen 
                    ? 'rotate-90 text-indigo-600' 
                    : 'text-gray-500'
                }`} 
              />
            </button>
          </div>
        </motion.div>

        {/* Mobile Menu Overlay */}
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
              className="absolute left-0 top-0 h-full w-[90%] max-w-[320px] bg-white shadow-xl mt-16 border-r-2 border-indigo-500/30 overflow-hidden touch-manipulation"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 pt-5 border-b border-gray-200 bg-gradient-to-r from-indigo-50/70 to-blue-50/70">
                <div className="flex justify-between items-center w-full">
                  <h2 className="text-xl font-bold text-gray-900">Angular Topics</h2>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-1.5 rounded-lg hover:bg-gray-100/50 transition-colors w-full max-w-[40px]"
                  >
                    <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="h-[calc(100vh-4.5rem)] overflow-y-auto scroll-smooth pb-4">
                <nav className="p-4 space-y-2">
                  {renderCategoryButtons(true)}
                </nav>
              </div>
              <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-white pointer-events-none" />
              <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white pointer-events-none" />
            </motion.div>
          </motion.div>
        )}

        <div className="flex flex-col md:flex-row">
          {/* Desktop Sidebar */}
          <motion.div 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="hidden md:block w-full md:w-64 lg:w-72 p-4 border-b md:border-r border-gray-200 fixed h-[calc(100vh-5rem)] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent bg-white/50 backdrop-blur-sm"
          >
            <h2 className="text-xl font-bold mb-4 text-gray-900">Angular Tutorials</h2>
            <nav className="space-y-2">
              {topics.map((category) => (
                <div key={category.category} className="mb-4">
                  <h3 className="font-semibold text-gray-700 mb-2 px-2">
                    {category.category}
                  </h3>
                  <ul className="space-y-1">
                    {category.items.map((topic) => (
                      <li key={topic.id}>
                        <button
                          onClick={() => {
                            setSelectedTopic(topic);
                            handleTopicClick(topic.prompt, topic.id);
                          }}
                          className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                            selectedTopic?.id === topic.id
                              ? 'bg-indigo-100 text-indigo-700'
                              : 'hover:bg-gray-100/50 text-gray-700'
                          }`}
                        >
                          {topic.title}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
          </motion.div>

          {/* Main Content */}
          <div className="flex-1 p-4 sm:p-6 md:p-8 bg-white md:ml-64 lg:ml-72">
            <div className="max-w-4xl mx-auto w-full">
              <div className="mb-8">
                <nav className="flex" aria-label="Breadcrumb">
                  <ol className="inline-flex items-center space-x-1 text-sm">
                    <li className="inline-flex items-center">
                      <Link to="/" className="text-gray-500 hover:text-gray-700">Home</Link>
                    </li>
                    <li className="inline-flex items-center">
                      <ChevronRightIcon className="w-4 h-4 mx-2 text-gray-400" />
                      <Link to="/tutorials" className="text-gray-500 hover:text-gray-700">Tutorials</Link>
                    </li>
                    <li className="inline-flex items-center">
                      <ChevronRightIcon className="w-4 h-4 mx-2 text-gray-400" />
                      <span className="text-indigo-600">Go Tutorials</span>
                    </li>
                  </ol>
                </nav>
                <h1 className="text-3xl font-bold mt-4 text-gray-900">{selectedTopic?.title}</h1>
              </div>

              {isLoading ? (
                <div className="space-y-4 md:space-y-6">
                  <SkeletonTheme baseColor="#f3f4f6" highlightColor="#e5e7eb">
                    <Skeleton height={32} width={240} className="md:hidden" />
                    <Skeleton height={40} width={300} className="hidden md:block" />
                    <Skeleton height={160} count={3} className="rounded-lg" />
                  </SkeletonTheme>
                </div>
              ) : result ? (
                <article className="prose prose-indigo max-w-none w-full px-0 md:px-0">
                  {result.startsWith('Error:') ? (
                    <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                      <div className="flex items-center text-red-700">
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                        <span className="font-mono text-sm">{result}</span>
                      </div>
                    </div>
                  ) : (
                    formatCodeResponse(result)
                  )}
                </article>
              ) : null}
            </div>
          </div>
        </div>

        {/* Add progress bar */}
        {isLoading && (
          <div className="fixed top-0 left-0 right-0 h-1 bg-gray-200 z-50">
            <div 
              className="h-full bg-indigo-600 transition-all duration-300 ease-out" 
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default GoTutorials;  