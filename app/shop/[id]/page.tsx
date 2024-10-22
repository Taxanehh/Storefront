'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { motion } from 'framer-motion';

const ProductPage = ({ params }: { params: { id: string } }) => {
  const [product, setProduct] = useState<any>(null);
  const router = useRouter();
  const productId = params.id;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${productId}`);
        const data = await response.json();
        if (response.ok) {
          setProduct(data.product);
        } else {
          console.error('Product not found:', data.message);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [productId]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex flex-col items-center justify-center bg-gradient-to-r from-black to-navy-900 py-16">
        <motion.div
          className="bg-navy-900 p-8 rounded-lg shadow-lg text-white max-w-lg w-full"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <img src={product.imageUrl} alt={product.name} className="w-full h-64 object-cover rounded-lg mb-4" />
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-xl text-yellow-400 mb-4">${Number(product.price).toFixed(2)}</p>
          <p className="text-lg mb-4">{product.description || 'No description available for this product.'}</p>

          <motion.button
            className="px-6 py-3 bg-yellow-400 text-black font-semibold rounded-full hover:bg-yellow-500 transition duration-300 ease-in-out mb-4"
            whileHover={{ scale: 1.05 }}
          >
            Add to Cart
          </motion.button>

          {/* Back Button */}
          <motion.button
            className="px-6 py-3 bg-gray-500 text-white font-semibold rounded-full hover:bg-gray-600 transition duration-300 ease-in-out ml-5"
            whileHover={{ scale: 1.05 }}
            onClick={() => router.back()}
          >
            Go Back
          </motion.button>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductPage;
