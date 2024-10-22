'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const Cart = () => {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchCartItems = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        console.error('No token found, redirecting to login...');
        setError('You need to log in to view your cart');
        setLoading(false);
        router.push('/login');
        return;
      }

      try {
        const response = await axios.get('/api/cart', {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.status === 200) {
          setCartItems(response.data); // Set items, even if empty array
        } else {
          setError(response.data.message || 'Error fetching cart items');
        }
      } catch (error) {
        console.error('Error fetching cart items:', error);
        setError('Error fetching cart items');
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, [router]);

  // Function to decrease quantity of an item
  const handleDecreaseQuantity = async (itemId: number) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.post('/api/cart', {
        productId: itemId,
        quantity: -1, // Decrease the quantity by 1
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        if (response.data.message === 'Item removed from cart') {
          setCartItems(cartItems.filter((item) => item.productId !== itemId));
        } else {
          setCartItems(cartItems.map((item) => 
            item.productId === itemId
              ? { ...item, quantity: item.quantity - 1 }
              : item
          ));
        }
        setSuccessMessage('Item quantity decreased successfully');
        setTimeout(() => setSuccessMessage(null), 2000);
      }
    } catch (error) {
      setError('Failed to decrease item quantity');
      setTimeout(() => setError(null), 2000);
    }
  };

  // Function to delete the item entirely from the cart
  const handleDeleteItem = async (itemId: number) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.delete('/api/cart', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: { productId: itemId }, // Send productId to the API
      });

      if (response.status === 200) {
        setSuccessMessage('Item deleted successfully');
        setCartItems(cartItems.filter((item) => item.productId !== itemId));
        setTimeout(() => setSuccessMessage(null), 2000);
      }
    } catch (error) {
      setError('Failed to delete item');
      setTimeout(() => setError(null), 2000);
    }
  };

  // Function to clear all cart items
  const handleClearCart = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.delete('/api/cart', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setSuccessMessage('Cart cleared successfully');
        setCartItems([]);
        setTimeout(() => setSuccessMessage(null), 2000);
      }
    } catch (error) {
      setError('Failed to clear cart');
      setTimeout(() => setError(null), 2000);
    }
  };

  const totalAmount = cartItems.reduce((sum, item) => sum + (item.Product?.price || 0) * item.quantity, 0);

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

        {loading ? (
          <p className="text-white">Loading cart items...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : cartItems.length > 0 ? (
          <>
            {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}

            <section className="w-full max-w-3xl mb-8">
              {cartItems.map((item) => (
                <motion.div
                  key={item.id}
                  className="bg-navy-900 p-6 mb-4 rounded-lg shadow-md flex justify-between items-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  {/* Small image next to the product title */}
                  <div className="flex items-center">
                    <img
                      src={item.Product?.imageUrl || 'https://via.placeholder.com/50'}
                      alt={item.Product?.name || 'Unknown Product'}
                      className="w-12 h-12 object-cover rounded-full mr-4"
                    />
                    <div>
                      <h3 className="text-xl text-white">{item.Product?.name || 'Unknown Product'}</h3>
                      <p className="text-lg text-yellow-400">
                        ${item.Product?.price ? Number(item.Product.price).toFixed(2) : '0.00'} x {item.quantity}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <p className="text-lg text-yellow-400">
                      ${item.Product?.price ? (item.Product.price * item.quantity).toFixed(2) : '0.00'}
                    </p>

                    <button
                      className="px-4 py-2 bg-yellow-500 text-white font-semibold rounded-lg"
                      onClick={() => handleDecreaseQuantity(item.productId)}
                    >
                      Remove 1 item
                    </button>

                    <button
                      className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg"
                      onClick={() => handleDeleteItem(item.productId)}
                    >
                      Delete
                    </button>
                  </div>
                </motion.div>
              ))}
            </section>

            <div className="text-white text-2xl mb-6">
              Total: ${totalAmount.toFixed(2)}
            </div>

            <div className="flex gap-4">
              <Link legacyBehavior href="/checkout">
                <a className="px-8 py-4 bg-yellow-400 text-black font-semibold rounded-lg">
                  Proceed to Checkout
                </a>
              </Link>

              <button
                className="px-8 py-4 bg-red-500 text-white font-semibold rounded-lg"
                onClick={handleClearCart}
              >
                Clear Cart
              </button>
            </div>
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
