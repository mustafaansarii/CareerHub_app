import { useState } from 'react';
import ReactMarkdown from 'react-markdown';

const LLm = () => {
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);

  // Example topics - you can expand this based on your needs
  const topics = [
    {
      category: "JavaScript Basics",
      items: [
        { id: 1, title: "Variables and Data Types", prompt: "Explain JavaScript variables and data types with examples" },
        { id: 2, title: "Functions", prompt: "Explain JavaScript functions with examples" },
        { id: 3, title: "Arrays", prompt: "Explain JavaScript arrays and their methods with examples" },
      ]
    },
    {
      category: "React Fundamentals",
      items: [
        { id: 4, title: "Components", prompt: "Explain React components with examples" },
        { id: 5, title: "Hooks", prompt: "Explain React hooks (useState, useEffect) with examples" },
        { id: 6, title: "Props", prompt: "Explain React props with examples" },
      ]
    }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setResult('');

    try {
      const response = await fetch(`${config.apiUrl}/api/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error(
          `Server returned ${response.status}: ${response.statusText}`
        );
      }

      const data = await response.json();
      setResult(data.result);
    } catch (error) {
      console.error('Error:', error);
      setResult(
        `Error: ${error.message || 'Could not connect to the server. Please make sure the server is running on http://localhost:5000'}`
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleTopicClick = async (topicPrompt) => {
    setIsLoading(true);
    setResult('');
    
    try {
      const response = await fetch('http://localhost:5000/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: topicPrompt }),
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      setResult(data.result);
    } catch (error) {
      console.error('Error:', error);
      setResult(`Error: ${error.message || 'Could not connect to the server'}`);
    } finally {
      setIsLoading(false);
    }
  };

  const formatCodeResponse = (text) => {
    const parts = text.split(/(```[\s\S]*?```)/g);
    
    const handleCopy = async (code, index) => {
      await navigator.clipboard.writeText(code);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000); // Reset after 2 seconds
    };
    
    return parts.map((part, index) => {
      if (part.startsWith('```')) {
        const match = part.match(/```(\w+)?\n?([\s\S]*?)```/);
        const language = match?.[1] || '';
        const code = match?.[2] || '';
        
        return (
          <div key={index} className="my-4">
            <div className="flex justify-between items-center bg-gray-800 text-gray-300 px-4 py-2 rounded-t-lg">
              <span className="text-sm font-mono">{language}</span>
              <button
                onClick={() => handleCopy(code, index)}
                className="text-gray-300 hover:text-white transition-colors duration-200"
                title="Copy code"
              >
                {copiedIndex === index ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                )}
              </button>
            </div>
            <pre className="bg-gray-900 text-gray-100 p-4 overflow-x-auto rounded-b-lg">
              <code>{code}</code>
            </pre>
          </div>
        );
      }
      
      // Handle markdown for non-code parts
      return (
        <div key={index} className="my-4">
          <ReactMarkdown
            components={{
              p: ({ children }) => <p className="my-4 text-gray-700">{children}</p>,
              h1: ({ children }) => <h1 className="text-3xl font-bold my-4">{children}</h1>,
              h2: ({ children }) => <h2 className="text-2xl font-bold my-3">{children}</h2>,
              h3: ({ children }) => <h3 className="text-xl font-bold my-2">{children}</h3>,
              strong: ({ children }) => <strong className="font-bold">{children}</strong>,
              em: ({ children }) => <em className="italic">{children}</em>,
              code: ({ children }) => (
                <code className="bg-gray-100 rounded px-1 font-mono text-sm">{children}</code>
              ),
              ul: ({ children }) => <ul className="list-disc ml-6 my-4">{children}</ul>,
              ol: ({ children }) => <ol className="list-decimal ml-6 my-4">{children}</ol>,
              li: ({ children }) => <li className="my-1">{children}</li>,
              blockquote: ({ children }) => (
                <blockquote className="border-l-4 border-gray-300 pl-4 my-4 italic">
                  {children}
                </blockquote>
              ),
            }}
          >
            {part}
          </ReactMarkdown>
        </div>
      );
    });
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-4 bg-green-500 text-white">
          <h2 className="text-xl font-bold">Topics</h2>
        </div>
        <nav className="p-4">
          {topics.map((category) => (
            <div key={category.category} className="mb-4">
              <h3 className="font-semibold text-gray-700 mb-2">{category.category}</h3>
              <ul className="space-y-2">
                {category.items.map((topic) => (
                  <li key={topic.id}>
                    <button
                      onClick={() => {
                        setSelectedTopic(topic);
                        handleTopicClick(topic.prompt);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                        selectedTopic?.id === topic.id
                          ? 'bg-green-100 text-green-700'
                          : 'hover:bg-gray-100'
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
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-8">Programming Tutorials</h1>

        {isLoading && (
          <div className="text-center my-4">
            <div className="animate-pulse text-green-500">Loading tutorial content...</div>
          </div>
        )}

        {selectedTopic && result && (
          <div className="border border-gray-200 rounded-lg p-6 bg-white shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">{selectedTopic.title}</h2>
            <div className={`prose prose-lg max-w-none ${result.startsWith('Error:') ? 'text-red-500' : ''}`}>
              {result.startsWith('Error:') ? result : formatCodeResponse(result)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LLm; 