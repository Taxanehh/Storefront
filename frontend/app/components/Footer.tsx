import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="py-12 bg-gradient-to-r from-black to-navy-900 text-white grid grid-cols-1 sm:grid-cols-4 gap-8 px-4 sm:px-16">
        <div>
            <h3 className="font-bold mb-4">Customer Service</h3>
            <p className="text-sm">Call us at: 123-456-7890</p>
            <p className="text-sm">Email: support@bathroombandits.com</p>
        </div>
        <div>
            <h3 className="font-bold mb-4">About Us</h3>
            <p className="text-sm">Bathroom Bandits is dedicated to providing premium bathroom accessories at affordable prices.</p>
        </div>
        <div>
            <h3 className="font-bold mb-4">Opening Times</h3>
            <p className="text-sm">Mon-Fri: 9am - 5pm</p>
            <p className="text-sm">Sat: 10am - 4pm</p>
        </div>
        <div>
            <h3 className="font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
            <Link legacyBehavior href="#"><a>Facebook</a></Link>
            <Link legacyBehavior href="#"><a>Instagram</a></Link>
            <Link legacyBehavior href="#"><a>Twitter</a></Link>
            </div>
        </div>
        <p className="text-sm text-yellow-400">
            © {new Date().getFullYear()} | Built by{' '}
            <Link legacyBehavior href="https://www.stokreef.com" className="underline hover:text-yellow-400">
            Paul S.
            </Link>
        </p>
    </footer>

  );
};

export default Footer;
