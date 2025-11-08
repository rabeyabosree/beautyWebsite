import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-[#ddf8c4b9] text-gray-700 py-8 mt-12">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Left: Quick Links */}
        <div>
          <h3 className="font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-1">
            <li>
              <Link to="/" className="hover:text-green-600 transition">Home</Link>
            </li>
            <li>
              <Link to="/products" className="hover:text-green-600 transition">Products</Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-green-600 transition">About</Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-green-600 transition">Contact</Link>
            </li>
          </ul>
        </div>

        {/* Middle: Privacy Links */}
        <div>
          <h3 className="font-semibold mb-2">Legal</h3>
          <ul className="space-y-1">
            <li>
              <Link to="/privacy" className="hover:text-green-600 transition">Privacy Policy</Link>
            </li>
            <li>
              <Link to="/terms" className="hover:text-green-600 transition">Terms of Service</Link>
            </li>
          </ul>
        </div>

        {/* Right: Social Icons */}
        <div>
          <h3 className="font-semibold mb-2">Follow Us</h3>
          <div className="flex gap-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition">
              <FaFacebookF />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition">
              <FaTwitter />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500 transition">
              <FaInstagram />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-700 transition">
              <FaLinkedinIn />
            </a>
          </div>
        </div>

      </div>

      {/* Bottom copyright */}
      <div className="mt-6 text-center text-sm text-gray-500">
        &copy; 2025 YourBrand. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
