import { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../config'
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { PencilSquareIcon, CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';

const fetchProfile = async () => {
  try {
    const token = localStorage.getItem('access_token');
    const response = await axios.get(`${config.Backend_Api}/api/auth/profile/`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching profile:', error);
    throw error;
  }
};

const updateProfileName = async (newName) => {
  try {
    const token = localStorage.getItem('access_token');
    const response = await axios.put(
      `${config.Backend_Api}/api/auth/profile/`,
      { full_name: newName },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error updating profile:', error);
    throw error;
  }
};

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [newName, setNewName] = useState('');
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const getProfile = async () => {
      try {
        const data = await fetchProfile();
        setProfileData(data);
        setNewName(data.full_name);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getProfile();
  }, []);

  const handleUpdateName = async () => {
    try {
      setUpdating(true);
      const updatedProfile = await updateProfileName(newName);
      setProfileData(updatedProfile);
      setEditMode(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 dark:border-gray-100"></div>
    </div>
  );

  if (error) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-100 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Error:</strong>
        <span className="block sm:inline"> {error}</span>
      </div>
    </div>
  );

  return (
    <>
      <NavBar />
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 mt-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 sm:p-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">Your CareerHub Profile</h1>
            {profileData && (
              <div className="space-y-8">
                {/* Profile Section */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b pb-6 border-gray-200 dark:border-gray-700">
                  <div className="flex-1">
                    <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Full Name</h2>
                    {editMode ? (
                      <div className="mt-2 flex items-center gap-3">
                        <input
                          type="text"
                          value={newName}
                          onChange={(e) => setNewName(e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                          placeholder="Enter your full name"
                          disabled={updating}
                        />
                        <button
                          onClick={handleUpdateName}
                          className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors relative"
                          title="Save changes"
                          disabled={updating}
                        >
                          {updating ? (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                            </div>
                          ) : (
                            <CheckIcon className="h-5 w-5" />
                          )}
                        </button>
                        <button
                          onClick={() => setEditMode(false)}
                          className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                          title="Cancel"
                          disabled={updating}
                        >
                          <XMarkIcon className="h-5 w-5" />
                        </button>
                      </div>
                    ) : (
                      <div className="mt-2 flex items-center gap-3">
                        <p className="text-gray-600 dark:text-gray-300">{profileData.full_name}</p>
                        <button
                          onClick={() => setEditMode(true)}
                          className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                          title="Edit name"
                        >
                          <PencilSquareIcon className="h-5 w-5" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Email Section */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
                  <div className="flex-1">
                    <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Email Address</h2>
                    <p className="mt-2 text-gray-600 dark:text-gray-300">{profileData.email}</p>
                  </div>
                </div>

                {/* Career Stats Section */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
                    <h3 className="text-lg font-medium text-blue-800 dark:text-blue-200">Resumes Created</h3>
                    <p className="text-3xl font-bold text-blue-600 dark:text-blue-300 mt-2">12</p>
                  </div>
                  <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg">
                    <h3 className="text-lg font-medium text-purple-800 dark:text-purple-200">Career Assessments Taken</h3>
                    <p className="text-3xl font-bold text-purple-600 dark:text-purple-300 mt-2">3</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Profile;