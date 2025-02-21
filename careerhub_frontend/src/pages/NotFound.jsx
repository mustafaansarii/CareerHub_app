import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

const NotFound = () => {
  return (
    <div className="flex flex-col min-h-screen mt-16">
      <NavBar />
      <div className="flex-grow flex flex-col items-center justify-center  p-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h1 className="text-9xl font-bold text-gray-800 dark:text-white">404</h1>
          <p className="mt-4 text-2xl text-gray-600 dark:text-gray-300">
            Oops! Page not found
          </p>
          <p className="mt-2 text-gray-500 dark:text-gray-400">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Link
            to="/"
            className="mt-6 inline-block px-6 py-3 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors duration-200"
          >
            Go back home
          </Link>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default NotFound; 