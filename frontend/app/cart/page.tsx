'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Header from '../components/Header'; // Assuming Header is in components folder
import Footer from '../components/Footer'; // Assuming Footer is in components folder

const dummyCartItems = [
  { id: 1, name: 'Luxury Towel Set', price: 49.99, quantity: 2 },
  { id: 2, name: 'Modern Soap Dispenser', price: 19.99, quantity: 1 },
];

const Cart = () => {
  const totalAmount = dummyCartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex flex-col items-center justify-center py-16">
        <motion.h1
          className="text-5xl font-bold text-white mb-8 text-center"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Your Cart
        </motion.h1>

        {dummyCartItems.length > 0 ? (
          <>
            <section className="w-full max-w-3xl mb-8">
              {dummyCartItems.map((item) => (
                <motion.div
                  key={item.id}
                  className="bg-navy-900 p-6 mb-4 rounded-lg shadow-md flex justify-between items-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div>
                    <h3 className="text-xl text-white">{item.name}</h3>
                    <p className="text-lg text-yellow-400">
                      ${item.price.toFixed(2)} x {item.quantity}
                    </p>
                  </div>
                  <p className="text-lg text-yellow-400">
                    ${ (item.price * item.quantity).toFixed(2) }
                  </p>
                </motion.div>
              ))}
            </section>

            <div className="text-white text-2xl mb-6">
              Total: ${totalAmount.toFixed(2)}
            </div>

            <Link legacyBehavior href="/checkout">
              <a className="px-8 py-4 bg-yellow-400 text-black font-semibold rounded-lg">
                Proceed to Checkout
              </a>
            </Link>
          </>
        ) : (
          <p className="text-white text-lg">Your cart is empty!</p>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Cart;
