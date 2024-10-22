'use client';

import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import axios from 'axios';

interface CartItem {
  id: number;
  productId: number;
  name: string;
  price: number;
  quantity: number;
}

const Checkout = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Fetch cart items from SQL database via API
    const fetchCartItems = async () => {
      try {
        const token = localStorage.getItem('token'); // Retrieve token from localStorage

        if (!token) {
          setError('User not logged in');
          router.push('/login');
          return;
        }

        const response = await axios.get('/api/cart', {
          headers: {
            Authorization: `Bearer ${token}`, // Send token in headers
          },
        });
        const data: CartItem[] = response.data;

        setCartItems(data);

        // Calculate total amount
        const total = data.reduce((sum, item) => sum + item.price * item.quantity, 0);
        setTotalAmount(total);
      } catch (error) {
        setError('Error fetching cart items');
        console.error('Error fetching cart items:', error);
      }
    };

    fetchCartItems();
  }, []);

  const handlePayment = () => {
    // Fake payment process
    if (cartItems.length > 0) {
      axios
        .post('/api/orders', { cartItems })
        .then(() => {
          axios.delete('/api/cart'); // Clear the cart after checkout
          router.push('/thank-you'); // Redirect to thank you page
        })
        .catch((error) => console.error('Error during payment:', error));
    } else {
      alert('Your cart is empty!');
    }
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
          Checkout
        </motion.h1>

        <section className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          {error ? (
            <p className="text-red-500">{error}</p>
          ) : cartItems.length > 0 ? (
            <>
              <ul>
                {cartItems.map((item) => (
                  <li key={item.id} className="mb-4">
                    <div className="flex justify-between">
                      <span>{item.name} (x{item.quantity})</span>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <p className="text-xl font-bold">Total: ${totalAmount.toFixed(2)}</p>
              </div>
              <motion.button
                className="mt-8 w-full py-3 bg-yellow-400 text-black font-semibold rounded-full hover:bg-yellow-500 transition duration-300 ease-in-out"
                whileHover={{ scale: 1.05 }}
                onClick={handlePayment}
              >
                Proceed to Payment
              </motion.button>
            </>
          ) : (
            <p className="text-center">Your cart is empty.</p>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Checkout;
