'use client'; // This ensures the component runs on the client side

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // useRouter hook for navigation
import Image from 'next/image';
import Link from 'next/link';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Redirect to the shop page with the search query in the URL
    router.push(`/shop?search=${searchQuery}`);
  };

  return (
    <header className="flex justify-between items-center p-4 bg-gradient-to-r from-black to-navy-900 text-white sticky top-0 z-50">
      {/* Left side: Logo + Primary Links */}
      <div className="flex items-center gap-8">
        {/* Logo */}
        <Image
          src="/logo.svg"
          alt="Bathroom Bandits Logo"
          width={50}
          height={50}
        />

        {/* Main Links */}
        <nav className="flex gap-8 items-center">
          <Link href="/" className="text-lg font-semibold hover:text-yellow-400">Home</Link>
          <Link href="/shop" className="text-lg font-semibold hover:text-yellow-400">Shop</Link>
          <Link href="/cart" className="text-lg font-semibold hover:text-yellow-400">Cart</Link>
        </nav>
      </div>

      {/* Right side: Additional Links + Search Bar */}
      <div className="flex gap-8 items-center">
        <Link href="/contact" className="text-lg font-semibold hover:text-yellow-400">Contact</Link>
        <Link href="/about" className="text-lg font-semibold hover:text-yellow-400">About</Link>
        <Link href="/faq" className="text-lg font-semibold hover:text-yellow-400">FAQ</Link>
        <Link href="/register" className="text-lg font-semibold hover:text-yellow-400">Register</Link>
        <Link href="/login" className="text-lg font-semibold hover:text-yellow-400">Login</Link>
        
        {/* Search Form */}
        <form onSubmit={handleSearch} className="flex items-center">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="p-2 text-black rounded-lg"
          />
          <button type="submit" className="ml-2 px-4 py-2 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-500">
            Search
          </button>
        </form>
      </div>
    </header>
  );
};

export default Header;
