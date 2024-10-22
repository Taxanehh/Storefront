'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

interface User {
  name: string;
  email: string;
}

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [user, setUser] = useState<User | null>(null); // Track logged-in user
  const [dropdownOpen, setDropdownOpen] = useState(false); // Control dropdown visibility
  const router = useRouter();

  // Simplified useEffect to set user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser: User = JSON.parse(storedUser);
      console.log('User found in localStorage:', parsedUser);
      setUser(parsedUser);
    } else {
      console.log('No user found in localStorage');
    }
  }, []); // Empty dependency array to run only once on component mount

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/shop?search=${searchQuery}`);
  };

  const handleLogOut = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    router.push('/');
  };

  return (
    <header className="flex justify-between items-center p-4 bg-gradient-to-r from-black to-navy-900 text-white sticky top-0 z-50">
      {/* Left side: Logo + Primary Links */}
      <div className="flex items-center gap-8">
        <Image
          src="/logo.svg"
          alt="Bathroom Bandits Logo"
          width={50}
          height={50}
        />

        <nav className="flex gap-8 items-center">
          <Link href="/" className="text-lg font-semibold hover:text-yellow-400">Home</Link>
          <Link href="/shop" className="text-lg font-semibold hover:text-yellow-400">Shop</Link>
          <Link href="/cart" className="text-lg font-semibold hover:text-yellow-400">Cart</Link>
        </nav>
      </div>

      {/* Right side: User Links + Search Bar */}
      <div className="flex gap-8 items-center">
        <Link href="/contact" className="text-lg font-semibold hover:text-yellow-400">Contact</Link>
        <Link href="/about" className="text-lg font-semibold hover:text-yellow-400">About</Link>
        <Link href="/faq" className="text-lg font-semibold hover:text-yellow-400">FAQ</Link>

        {/* Show user name if logged in, or Register/Login links otherwise */}
        {user ? (
          <div className="relative">
            <button
              className="text-lg font-semibold hover:text-yellow-400"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              {user.name}
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg">
                <Link href="/orders" className="block px-4 py-2 hover:bg-gray-200">Orders</Link>
                <Link href="/profile" className="block px-4 py-2 hover:bg-gray-200">Profile</Link>
                <button
                  onClick={handleLogOut}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                >
                  Log Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link href="/register" className="text-lg font-semibold hover:text-yellow-400">Register</Link>
            <Link href="/login" className="text-lg font-semibold hover:text-yellow-400">Login</Link>
          </>
        )}

        {/* Search Form */}
        <form onSubmit={handleSearch} className="flex items-center">
          <button type="submit" className="ml-2 px-4 py-2 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-500">
            Search
          </button>
        </form>
      </div>
    </header>
  );
};

export default Header;
