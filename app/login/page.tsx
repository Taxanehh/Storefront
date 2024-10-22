'use client';

import Header from '../components/Header';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

const Login = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (searchParams) {
      const message = searchParams.get('message');
      if (message) {
        setSuccessMessage(message);
        router.replace('/login'); // Remove the message query param from the URL
      }
    }
  }, [searchParams, router]);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Save the token and user info in localStorage
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));

        // Redirect to the home page or any other protected page
        router.push('/');
      } else {
        setErrorMessage(data.message); // Display the error message
      }
    } catch (error) {
      console.error('Error during login:', error);
      setErrorMessage('Failed to log in. Please try again.');
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex flex-col items-center justify-center bg-gradient-to-r from-black to-navy-900 py-16">
        
        {/* Success Message */}
        {successMessage && (
          <motion.p
            className="text-green-500 text-lg mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {successMessage}
          </motion.p>
        )}

        {/* Error Message */}
        {errorMessage && (
          <motion.p
            className="text-red-500 text-lg mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {errorMessage}
          </motion.p>
        )}

        <motion.h1
          className="text-5xl font-bold text-white mb-6 text-center"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Log In to Your Account
        </motion.h1>

        <motion.form
          className="flex flex-col gap-6 bg-navy-900 p-8 rounded-lg shadow-md w-full max-w-md"
          onSubmit={handleSubmit}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <label className="text-white text-lg">
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 p-2 w-full rounded-lg text-black"
              placeholder="Your Email"
              required
            />
          </label>
          <label className="text-white text-lg">
            Password:
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 p-2 w-full rounded-lg text-black"
              placeholder="Your Password"
              required
            />
          </label>

          <motion.button
            type="submit"
            className="px-8 py-4 bg-yellow-400 text-black font-semibold rounded-full hover:bg-yellow-500 transition duration-300 ease-in-out"
            whileHover={{ scale: 1.05 }}
          >
            Log In
          </motion.button>
        </motion.form>

        <p className="text-white mt-8">
          Don't have an account?{' '}
          <a href="/register" className="text-yellow-400 hover:text-yellow-500">
            Register here
          </a>
        </p>
      </main>
      <Footer />
    </div>
  );
};

export default Login;
