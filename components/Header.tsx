'use client';

import React from 'react';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import SearchBar from './SearchBar';

export default function Header() {
  const { getItemCount } = useCart();
  const itemCount = getItemCount();

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl">🌺</span>
            <span className="text-xl font-bold text-gray-900">Costa Rica Travel</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-blue-600 transition-colors">
              Home
            </Link>
            <Link href="/blog" className="text-gray-700 hover:text-blue-600 transition-colors">
              Blog
            </Link>
            <Link href="/products" className="text-gray-700 hover:text-blue-600 transition-colors">
              Shop
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-blue-600 transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-blue-600 transition-colors">
              Contact
            </Link>
          </nav>

          {/* Search and Cart */}
          <div className="flex items-center space-x-4">
            <SearchBar />
            
            {/* Cart Icon */}
            <Link href="/cart" className="relative">
              <div className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <ShoppingCart className="w-6 h-6 text-gray-700" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {itemCount > 99 ? '99+' : itemCount}
                  </span>
                )}
              </div>
            </Link>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden pb-4">
          <nav className="flex flex-wrap gap-4">
            <Link href="/" className="text-gray-700 hover:text-blue-600 transition-colors">
              Home
            </Link>
            <Link href="/blog" className="text-gray-700 hover:text-blue-600 transition-colors">
              Blog
            </Link>
            <Link href="/products" className="text-gray-700 hover:text-blue-600 transition-colors">
              Shop
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-blue-600 transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-blue-600 transition-colors">
              Contact
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}