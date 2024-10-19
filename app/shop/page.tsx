'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation'; // Hook to access query parameters
import Header from '../components/Header';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';

const productData = [
  { id: 1, name: 'Luxury Towel Set', price: 49.99, category: 'Towels', image: 'https://picsum.photos/400/300?random=1' },
  { id: 2, name: 'Modern Soap Dispenser', price: 19.99, category: 'Accessories', image: 'https://picsum.photos/400/300?random=2' },
  { id: 3, name: 'Elegant Shower Curtain', price: 34.99, category: 'Curtains', image: 'https://picsum.photos/400/300?random=3' },
  { id: 4, name: 'Classic Bath Mat', price: 29.99, category: 'Mats', image: 'https://picsum.photos/400/300?random=4' },
  { id: 5, name: 'Luxury Bathroom Mirror', price: 99.99, category: 'Mirrors', image: 'https://picsum.photos/400/300?random=5' },
  { id: 6, name: 'Designer Toothbrush Holder', price: 15.99, category: 'Accessories', image: 'https://picsum.photos/400/300?random=6' },
  { id: 7, name: 'Soft Cotton Bathrobe', price: 79.99, category: 'Towels', image: 'https://picsum.photos/400/300?random=7' },
  { id: 8, name: 'Eco-Friendly Showerhead', price: 59.99, category: 'Accessories', image: 'https://picsum.photos/400/300?random=8' },
  { id: 9, name: 'Waterproof Bluetooth Speaker', price: 39.99, category: 'Accessories', image: 'https://picsum.photos/400/300?random=9' },
  { id: 10, name: 'Anti-Slip Bath Mat', price: 24.99, category: 'Mats', image: 'https://picsum.photos/400/300?random=10' },
  { id: 11, name: 'Gold-Framed Bathroom Mirror', price: 120.00, category: 'Mirrors', image: 'https://picsum.photos/400/300?random=11' },
  { id: 12, name: 'Minimalist Toothbrush Holder', price: 12.99, category: 'Accessories', image: 'https://picsum.photos/400/300?random=12' },
];

const categories = ['All', 'Towels', 'Accessories', 'Curtains', 'Mats', 'Mirrors'];

const Shop = () => {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('search') || ''; // Get search query from the URL

  const [searchText, setSearchText] = useState(searchQuery); // Independent search bar in shop page
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredProducts, setFilteredProducts] = useState(productData);

  useEffect(() => {
    // Filter products by search query and selected category
    const filtered = productData.filter((product) =>
      (selectedCategory === 'All' || product.category === selectedCategory) &&
      product.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchText, selectedCategory]);

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
          Shop Our Collection
        </motion.h1>

        {/* Search Bar in Shop */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 mb-8 w-full max-w-3xl px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <input
            type="text"
            className="p-3 w-full rounded-lg text-black"
            placeholder="Search for products..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </motion.div>

        {/* Categories */}
        <div className="flex flex-wrap gap-4 justify-center mb-8">
          {categories.map((category) => (
            <motion.button
              key={category}
              className={`px-6 py-2 rounded-full font-semibold transition-colors duration-300 ${
                selectedCategory === category
                  ? 'bg-yellow-400 text-black'
                  : 'bg-navy-700 text-white hover:bg-yellow-500'
              }`}
              onClick={() => setSelectedCategory(category)}
              whileHover={{ scale: 1.05 }}
            >
              {category}
            </motion.button>
          ))}
        </div>

        {/* Products Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4 sm:px-8 lg:px-16">
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              className="bg-navy-900 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out"
              whileHover={{ scale: 1.05 }}
            >
              <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-lg mb-4" />
              <h3 className="text-2xl font-semibold text-white mb-2">{product.name}</h3>
              <p className="text-lg text-yellow-400">${product.price.toFixed(2)}</p>
            </motion.div>
          ))}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Shop;
