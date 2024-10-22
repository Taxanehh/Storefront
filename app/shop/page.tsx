'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';

// Define the Product type
interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  imageUrl: string;
}

const Shop = () => {
  const [searchText, setSearchText] = useState(''); // Independent search bar in shop page
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]); // Initialize as an empty array of Product type
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state
  const router = useRouter(); // For navigation

  const categories = ['All', 'Towels', 'Accessories', 'Curtains', 'Mats', 'Mirrors'];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        const data: Product[] = await response.json();

        if (response.ok) {
          setFilteredProducts(data);
        } else {
          setError('Error fetching products');
        }
      } catch (err) {
        setError('Error fetching products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter products by search query and selected category
  const filtered = filteredProducts.filter((product) =>
    (selectedCategory === 'All' || product.category === selectedCategory) &&
    product.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleProductClick = (productId: number) => {
    router.push(`/shop/${productId}`); // Navigate to the product detail page
  };

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
        {loading ? (
          <p className="text-white">Loading products...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4 sm:px-8 lg:px-16">
            {filtered.length > 0 ? (
              filtered.map((product) => (
                <motion.div
                  key={product.id}
                  className="bg-navy-900 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  onClick={() => handleProductClick(product.id)} // Click to navigate
                >
                  <img
                    src={product.imageUrl || 'https://via.placeholder.com/400x300'}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <h3 className="text-2xl font-semibold text-white mb-2">{product.name}</h3>
                  <p className="text-lg text-yellow-400">
                    ${Number(product.price).toFixed(2)}
                  </p>
                </motion.div>
              ))
            ) : (
              <p className="text-white">No products found.</p>
            )}
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Shop;
