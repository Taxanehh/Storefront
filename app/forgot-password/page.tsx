'use client';

import Header from '../components/Header';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';
import { useState } from 'react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle forgot password logic here, such as sending a reset email
    console.log('Password reset request for:', email);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex flex-col items-center justify-center bg-gradient-to-r from-black to-navy-900 py-16">
        <motion.h1
          className="text-5xl font-bold text-white mb-6 text-center"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Reset Your Password
        </motion.h1>

        <motion.p
          className="text-xl text-white mb-10 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          Enter your email address to request a password reset link.
        </motion.p>

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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 p-2 w-full rounded-lg text-black"
              placeholder="Your Email"
              required
            />
          </label>

          <motion.button
            type="submit"
            className="px-8 py-4 bg-yellow-400 text-black font-semibold rounded-full hover:bg-yellow-500 transition duration-300 ease-in-out"
            whileHover={{ scale: 1.05 }}
          >
            Send Reset Link
          </motion.button>
        </motion.form>

        <p className="text-white mt-8">
          Remember your password?{' '}
          <a href="/login" className="text-yellow-400 hover:text-yellow-500">
            Log in here
          </a>
        </p>
      </main>
      <Footer />
    </div>
  );
};

export default ForgotPassword;
