'use client'

import { useState, useEffect } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon, UserCircleIcon } from '@heroicons/react/24/outline'
import { Link, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../auth/authSlice'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Resume Templates', href: '/resume-templates' },
  { name: 'DSA Sheet', href: '/dsa-sheet' },
  { name: 'Career Tips', href: '/career-tips' },
  { name: 'Roadmap', href: '/roadmap' },
]

export default function NavBar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token && !user) {
      dispatch({ type: 'auth/setUser', payload: { token } });
    }
  }, [dispatch, user]);

  const handleLogout = () => {
    dispatch(logout());
    setIsMenuOpen(false);
    window.location.href = '/login';
  };

  const handleClickOutside = (event) => {
    if (event.target.closest('.user-menu') === null) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <>
      <div className="dark:text-white">
        <header className="fixed inset-x-0 top-0 z-50 backdrop-blur-sm shadow-sm">
          <nav aria-label="Global" className="flex items-center justify-between p-4 lg:px-8 max-w-7xl mx-auto">
            <div className="flex lg:flex-1">
              <Link to="/" className="-m-1 p-1 flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">C</span>
                </div>
                <div className="text-xl font-bold text-gray-800 dark:text-white">
                  CareerHub
                </div>
              </Link>
            </div>
            <div className="flex lg:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 dark:text-white"
              >
                <span className="sr-only">Open main menu</span>
                <Bars3Icon aria-hidden="true" className="size-6" />
              </button>
            </div>
            <div className="hidden lg:flex lg:gap-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="text-sm/6 font-semibold text-gray-900 dark:text-white hover:text-blue-600 transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-blue-600 hover:after:w-full after:transition-all after:duration-300"
                >
                  {item.name}
                </Link>
              ))}
            </div>
            <div className="hidden lg:flex lg:flex-1 lg:justify-end">
              {user ? (
                <div className="relative user-menu">
                  <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="text-sm/6 font-semibold text-gray-900 dark:text-white hover:text-blue-600 cursor-pointer transition-colors duration-200"
                  >
                    <UserCircleIcon className="h-6 w-6" />
                  </button>
                  {isMenuOpen && (
                    <div className="absolute right-0 mt-2 w-36 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5">
                      <div className="space-y-1">
                        <Link
                          to="/profile"
                          className="block px-3 py-1.5 text-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          Profile
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="block px-3 py-1.5 text-sm text-gray-7 00 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left"
                        >
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link to="/login" className="text-sm/6 font-semibold text-gray-900 dark:text-white bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors duration-200">
                  Log in <span aria-hidden="true">&rarr;</span>
                </Link>
              )}
            </div>
          </nav>
          <div className="border-t border-gray-200 dark:border-gray-700" />
          <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
            <div className="fixed inset-0 z-50 bg-black/50" />
            <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 dark:bg-gray-900 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
              <div className="flex items-center justify-between">
                <Link to="/" className="-m-1.5 p-1.5 flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-xl">C</span>
                  </div>
                  <div className="text-xl font-bold text-gray-800 dark:text-white">
                    CareerHub
                  </div>
                </Link>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="-m-2.5 rounded-md p-2.5 text-gray-700 dark:text-white"
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon aria-hidden="true" className="size-6" />
                </button>
              </div>
              <div className="mt-6 flow-root">
                <div className="-my-6 divide-y divide-gray-500/10">
                  <div className="space-y-2 py-6">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-black dark:text-white hover:text-blue-600 hover:bg-gray-50 dark:hover:bg-gray-8 00 transition-colors duration-200"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                  <div className="py-6">
                    {user ? (
                      <div className="space-y-2">
                        <Link
                          to="/profile"
                          className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-black dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          Profile
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-black dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 w-full text-left"
                        >
                          Logout
                        </button>
                      </div>
                    ) : (
                      <Link
                        to="/login"
                        className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-black dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800"
                      >
                        Log in
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </DialogPanel>
          </Dialog>
        </header>
      </div>
    </>
  )
}
