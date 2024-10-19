'use client';

import Header from '../components/Header';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex flex-col items-center justify-center bg-gradient-to-r from-black to-navy-900 py-18">
        <motion.h1
          className="text-5xl font-bold text-white mb-6 text-center"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          About Bathroom Bandits
        </motion.h1>
        <motion.p
          className="text-xl text-white mb-10 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          Our mission is to provide premium bathroom accessories that combine style, quality, and affordability.
        </motion.p>

        <section className="flex flex-col items-center max-w-4xl text-white">
          <motion.p
            className="text-lg mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
          >
            At Bathroom Bandits, we believe that your bathroom deserves to be more than just functional. It should reflect your personal style and provide a touch of luxury and comfort. Our wide selection of high-quality bathroom accessories has been carefully curated to meet the needs of every homeowner, from those who prefer modern minimalism to those seeking timeless elegance.
          </motion.p>
          <motion.p
            className="text-lg mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
          >
            Founded by design enthusiasts, Bathroom Bandits is committed to delivering products that are not only beautiful but also durable and affordable. We work closely with our suppliers to ensure that every product we offer meets our high standards of quality and craftsmanship.
          </motion.p>
          <motion.p
            className="text-lg mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
          >
            Whether you're looking to refresh your bathroom with stylish accessories or find the perfect gift, Bathroom Bandits has you covered. We pride ourselves on excellent customer service and fast, reliable shipping.
          </motion.p>
        </section>

        <motion.div
          className="mt-8"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
        >
          <a
            href="/shop"
            className="px-8 py-4 bg-yellow-400 text-black font-semibold rounded-full hover:bg-yellow-500 transition duration-300 ease-in-out"
          >
            Shop Now
          </a>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default About;
