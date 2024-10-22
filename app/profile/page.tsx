'use client';

import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const Profile = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false); // State for delete confirmation
  const router = useRouter();

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login'); // Redirect to login if no token is found
        return;
      }

      try {
        const response = await axios.get('/api/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          setUser(response.data);
        } else {
          setError('Error fetching profile information');
        }
      } catch (error) {
        setError('Error fetching profile information');
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [router]);

  const handleDeleteAccount = async () => {
    const confirmation = window.confirm('Are you sure you want to delete your account?');
    if (!confirmation) return;
  
    const token = localStorage.getItem('token');
    
    if (!token) {
      alert('You need to log in to delete your account');
      return;
    }
  
    try {
      const response = await fetch('/api/profile', {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        localStorage.removeItem('user');  // Remove user from localStorage
        localStorage.removeItem('token'); // Remove token from localStorage
        router.push('/'); // Redirect to home page after deletion
      } else {
        const data = await response.json();
        alert(data.message || 'Failed to delete account');
      }
    } catch (error) {
      console.error('Error deleting account:', error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex flex-col items-center justify-center py-16 bg-gradient-to-r from-black to-navy-900">
        <motion.h1
          className="text-5xl font-bold text-white mb-6 text-center"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Profile
        </motion.h1>
        <motion.div
          className="bg-navy-900 p-8 rounded-lg shadow-md w-full max-w-lg text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <h2 className="text-3xl font-bold mb-4">Hello, {user?.name || 'User'}</h2>
          <p>Email: {user?.email}</p>
          <p>Joined: {new Date(user?.createdAt).toLocaleDateString()}</p>

          <button
            className="mt-8 px-6 py-3 bg-red-600 text-white rounded-full hover:bg-red-700 transition duration-300"
            onClick={() => setShowConfirmation(true)} // Show confirmation
          >
            Delete Account
          </button>
        </motion.div>

        {/* Confirmation Dialog */}
        {showConfirmation && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-black p-6 rounded-lg shadow-md text-center">
              <h3 className="text-2xl font-bold mb-4">Are you sure?</h3>
              <p className="text-lg mb-6">This action cannot be undone.</p>
              <button
                className="px-6 py-3 bg-red-600 text-white rounded-full hover:bg-red-700 transition duration-300"
                onClick={handleDeleteAccount}
              >
                Yes, delete my account
              </button>
              <button
                className="ml-4 px-6 py-3 bg-gray-400 text-white rounded-full hover:bg-gray-500 transition duration-300"
                onClick={() => setShowConfirmation(false)} // Cancel confirmation
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Profile;
