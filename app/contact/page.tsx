'use client';

import Header from '../components/Header';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';
import Link from 'next/link';

const Contact = () => {
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
          Contact Us
        </motion.h1>
        <motion.p
          className="text-xl text-white mb-10 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          We're here to help! Reach out to us for any inquiries.
        </motion.p>

        <motion.form
          className="flex flex-col gap-6 bg-navy-900 p-8 rounded-lg shadow-md w-full max-w-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <label className="text-white text-lg">
            Name:
            <input
              type="text"
              className="mt-1 p-2 w-full rounded-lg text-black"
              placeholder="Your Name"
              required
            />
          </label>
          <label className="text-white text-lg">
            Email:
            <input
              type="email"
              className="mt-1 p-2 w-full rounded-lg text-black"
              placeholder="Your Email"
              required
            />
          </label>
          <label className="text-white text-lg">
            Message:
            <textarea
              className="mt-1 p-2 w-full h-32 rounded-lg text-black"
              placeholder="Your Message"
              required
            ></textarea>
          </label>
          <motion.button
            type="submit"
            className="px-8 py-4 bg-yellow-400 text-black font-semibold rounded-full hover:bg-yellow-500 transition duration-300 ease-in-out"
            whileHover={{ scale: 1.05 }}
          >
            Send Message
          </motion.button>
        </motion.form>

        <div className="text-white text-lg mt-16 text-center">
          <p>Alternatively, you can reach us at:</p>
          <p className="mt-4">Phone: 123-456-7890</p>
          <p>Email: support@bathroombandits.com</p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
