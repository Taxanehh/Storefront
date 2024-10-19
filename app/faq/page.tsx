'use client';

import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';

const faqData = [
  {
    question: "What is Bathroom Bandits?",
    answer:
      "Bathroom Bandits is your go-to destination for premium bathroom accessories. We offer a wide range of products that combine style, quality, and affordability."
  },
  {
    question: "How long does shipping take?",
    answer:
      "Shipping times depend on your location, but most orders are delivered within 3-7 business days. We also offer expedited shipping options for faster delivery."
  },
  {
    question: "What is your return policy?",
    answer:
      "We accept returns within 30 days of purchase. Items must be unused and in their original packaging. Please visit our returns page for more information."
  },
  {
    question: "Do you ship internationally?",
    answer:
      "Yes, we offer international shipping to select countries. Please contact our support team for more information on shipping rates and delivery times."
  },
];

const FAQ = () => {
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
          Frequently Asked Questions
        </motion.h1>

        <section className="w-full max-w-4xl p-4">
          {faqData.map((item, index) => (
            <FAQItem key={index} item={item} />
          ))}
        </section>
      </main>
      <Footer />
    </div>
  );
};

const FAQItem = ({ item }: { item: { question: string; answer: string } }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-4">
      <motion.div
        className="bg-navy-900 p-4 rounded-lg cursor-pointer flex justify-between items-center"
        onClick={() => setIsOpen(!isOpen)}
        initial={{ backgroundColor: 'rgba(0, 31, 63, 0.9)' }}
        whileHover={{ backgroundColor: 'rgba(0, 31, 63, 1)' }}
        transition={{ duration: 0.2 }}
      >
        <h3 className="text-lg font-semibold text-white">{item.question}</h3>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-white"
        >
          {isOpen ? '▲' : '▼'}
        </motion.span>
      </motion.div>
      {isOpen && (
        <motion.div
          className="bg-gray-100 text-black p-4 rounded-lg mt-2"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.3 }}
        >
          <p>{item.answer}</p>
        </motion.div>
      )}
    </div>
  );
};

export default FAQ;
