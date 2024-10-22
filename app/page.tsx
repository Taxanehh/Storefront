'use client';

import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Link from 'next/link';
import { motion } from 'framer-motion';
import axios from 'axios';

interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  description?: string;
}

const Home = () => {
  const [isClient, setIsClient] = useState(false);
  const [dealOfTheWeek, setDealOfTheWeek] = useState<Product | null>(null);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);

  useEffect(() => {
    setIsClient(true);

    // Fetch Deal of the Week
    const fetchDealOfTheWeek = async () => {
      try {
        const response = await axios.get('/api/products/specials?type=dealOfTheWeek');
        setDealOfTheWeek(response.data);
      } catch (error) {
        console.error('Error fetching deal of the week:', error);
      }
    };

    // Fetch Featured Products
    const fetchFeaturedProducts = async () => {
      try {
        const response = await axios.get('/api/products/specials?type=featured');
        setFeaturedProducts(response.data);
      } catch (error) {
        console.error('Error fetching featured products:', error);
      }
    };

    fetchDealOfTheWeek();
    fetchFeaturedProducts();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat mb-8 mt-16" style={{ backgroundImage: 'url("/hero-4bg.jpg")' }}>
        {isClient && (
          <>
            <motion.h1
              className="text-5xl font-bold text-white mb-6 text-center"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              Welcome to Bathroom Bandits
            </motion.h1>
            <motion.p
              className="text-xl text-white mb-1 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              Discover Premium Bathroom Accessories
            </motion.p>
            <motion.div
              className="mt-8"  // Adding margin-top to prevent overlap
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
            >
              <Link legacyBehavior href="/shop">
                <a className="px-8 py-4 bg-yellow-400 text-black font-semibold rounded-full hover:bg-yellow-500 transition duration-300 ease-in-out">
                  Shop Now
                </a>
              </Link>
            </motion.div>
          </>
        )}

        {/* Deal of the Week */}
        <section className="flex flex-col sm:flex-row justify-between items-center p-16 bg-gradient-to-r from-black via-navy-900 mt-16 mb-8">
          <div className="flex-1">
            {isClient && dealOfTheWeek ? (
              <img
                src={dealOfTheWeek.imageUrl}
                alt={dealOfTheWeek.name}
                className="w-full h-auto rounded-lg shadow-lg"
              />
            ) : (
              <p className="text-white">Loading Deal of the Week...</p>
            )}
          </div>
          <div className="flex-1 p-8">
            <h2 className="text-3xl font-bold mb-6">Deal of the Week</h2>
            {isClient && dealOfTheWeek ? (
              <>
                <p className="text-white mb-10 text-lg">{dealOfTheWeek.name}</p>
                <Link legacyBehavior href={`/shop/${dealOfTheWeek.id}`}>
                  <a className="px-8 py-4 bg-yellow-400 text-black font-semibold rounded-full hover:bg-yellow-500 transition duration-300 ease-in-out">
                    Shop Now
                  </a>
                </Link>
              </>
            ) : (
              <p className="text-white">Loading...</p>
            )}
          </div>
        </section>

        <section className="py-16 bg-gradient-to-r from-navy-900 to-navy-700 text-white text-center mb-8">
          <h2 className="text-4xl font-bold mb-10">Why Bathroom Bandits?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex flex-col items-center">
              <img src="/icon1.svg" alt="Reason 1" className="w-12 h-12 mb-4" />
              <p className="text-lg">High-Quality Materials</p>
            </div>
            <div className="flex flex-col items-center">
              <img src="/icon2.svg" alt="Reason 2" className="w-12 h-12 mb-4" />
              <p className="text-lg">Affordable Prices</p>
            </div>
            <div className="flex flex-col items-center">
              <img src="/icon3.svg" alt="Reason 3" className="w-12 h-12 mb-4" />
              <p className="text-lg">Fast Shipping</p>
            </div>
            <div className="flex flex-col items-center">
              <img src="/icon4.svg" alt="Reason 4" className="w-12 h-12 mb-4" />
              <p className="text-lg">Excellent Customer Service</p>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 sm:grid-cols-2 gap-8 py-16 bg-gradient-to-r from-black to-navy-900 pr-10 pl-10">
          <div className="relative">
            <img src="https://images.pexels.com/photos/1304110/pexels-photo-1304110.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Deals" className="w-full h-96 rounded-lg mr-20" />
            <Link legacyBehavior href="/shop?category=Deals">
              <a className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 text-yellow-400 text-lg font-semibold hover:bg-opacity-75">
                Deals
              </a>
            </Link>
          </div>
          <div className="relative">
            <img src="https://images.pexels.com/photos/306739/pexels-photo-306739.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Trending Now" className="w-full h-96 rounded-lg mr-20" />
            <Link legacyBehavior href="/shop?category=Trending Now">
              <a className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 text-yellow-400 text-lg font-semibold hover:bg-opacity-75">
                Trending Now
              </a>
            </Link>
          </div>
        </section>
      </main>

      {/* Featured Products */}
      <FeaturedProducts isClient={isClient} featuredProducts={featuredProducts} />

      <CallToAction />
      <NewsLetter />
      <Footer />
    </div>
  );
};

// Featured Products Component
const FeaturedProducts = ({ isClient, featuredProducts }: { isClient: boolean, featuredProducts: any[] }) => (
  <section className="py-16 bg-gradient-to-r from-black to-navy-900 text-center">
    <h2 className="text-4xl font-bold mb-8">Featured Products</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4 sm:px-8 lg:px-16">
      {featuredProducts.length > 0 ? (
        featuredProducts.map((product) => (
          <div key={product.id} className="bg-navy-900 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out">
            {isClient ? (
              <motion.div whileHover={{ scale: 1.05 }}>
                <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover rounded-lg mb-4" />
                <h3 className="text-2xl font-semibold mb-2">{product.name}</h3>
                <p className="text-lg text-yellow-700">
                  ${product.price ? Number(product.price).toFixed(2) : '0.00'}
                </p>
              </motion.div>
            ) : (
              <div>
                <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover rounded-lg mb-4" />
                <h3 className="text-2xl font-semibold mb-2">{product.name}</h3>
                <p className="text-lg text-gray-700">${product.price.toFixed(2)}</p>
              </div>
            )}
          </div>
        ))
      ) : (
        <p className="text-white">Loading Featured Products...</p>
      )}
    </div>
  </section>
);

const CallToAction = () => (
  <section className="bg-gradient-to-r from-navy-900 to-navy-700 py-16 text-center text-white">
    <h2 className="text-4xl font-bold mb-6">Ready to Upgrade Your Bathroom?</h2>
    <p className="text-lg mb-8">Explore our full collection and find the perfect accessories for your home.</p>
    <Link legacyBehavior href="/shop">
      <a className="px-8 py-4 bg-yellow-400 text-black font-semibold rounded-full hover:bg-yellow-500 transition duration-300 ease-in-out">
        Shop Now
      </a>
    </Link>
  </section>
);

const NewsLetter = () => (
  <section className="py-16 bg-gradient-to-r from-navy-700 to-navy-500 text-white text-center">
    <h2 className="text-3xl font-bold mb-4">Stay Updated with Our Latest Deals</h2>
    <p className="mb-6">Subscribe to our newsletter for exclusive offers and updates!</p>
    <form className="flex justify-center">
      <input type="email" placeholder="Enter your email" className="p-3 rounded-l-lg text-black w-64" />
      <button type="submit" className="px-6 py-3 bg-yellow-400 text-black rounded-r-lg font-semibold hover:bg-yellow-500 transition duration-300">
        Subscribe
      </button>
    </form>
  </section>
);

export default Home;
