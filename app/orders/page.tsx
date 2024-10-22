'use client';

import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';

interface CartItem {
  productId: number;
  name: string;
  price: number;
  quantity: number;
}

const Orders = () => {
  const [orders, setOrders] = useState<CartItem[]>([]);

  useEffect(() => {
    // Fetch orders from localStorage or API
    const storedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    setOrders(storedOrders);
  }, []);

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
          Your Orders
        </motion.h1>

        <section className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          {orders.length > 0 ? (
            <ul>
              {orders.map((item, index) => (
                <li key={index} className="mb-4">
                  <div className="flex justify-between">
                    <span>{item.name} (x{item.quantity})</span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center">You have no orders yet.</p>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Orders;
