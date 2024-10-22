'use client';

import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';

const ThankYou = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex flex-col items-center justify-center bg-gradient-to-r from-black to-navy-900 py-16">
        <motion.h1
          className="text-5xl font-bold text-white mb-8 text-center"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Thank You for Your Order!
        </motion.h1>

        <motion.p
          className="text-xl text-white mb-6 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          Your order has been placed successfully.
        </motion.p>

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <Link href="/orders">
            <a className="px-8 py-4 bg-yellow-400 text-black font-semibold rounded-full hover:bg-yellow-500 transition duration-300 ease-in-out">
              View Orders
            </a>
          </Link>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default ThankYou;
