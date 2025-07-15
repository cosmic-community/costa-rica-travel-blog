'use client';

import React from 'react';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import CartItem from '@/components/CartItem';
import CartSummary from '@/components/CartSummary';

export default function CartPage() {
  const { state, clearCart, getCartSummary } = useCart();
  const summary = getCartSummary();

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
              <ShoppingCart className="w-12 h-12 text-gray-400" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Your Cart is Empty</h1>
            <p className="text-gray-600 mb-8">
              Looks like you haven't added any items to your cart yet.
            </p>
            <Link
              href="/products"
              className="bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors duration-200"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
          <p className="text-gray-600 mt-2">
            {summary.totalItems} {summary.totalItems === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {state.items.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>

            {/* Cart Actions */}
            <div className="flex flex-col sm:flex-row justify-between items-center mt-8 gap-4">
              <button
                onClick={clearCart}
                className="text-red-600 hover:text-red-800 font-medium transition-colors duration-200"
              >
                Clear Cart
              </button>
              
              <Link
                href="/products"
                className="bg-gray-100 text-gray-700 px-6 py-3 rounded-md font-medium hover:bg-gray-200 transition-colors duration-200"
              >
                Continue Shopping
              </Link>
            </div>
          </div>

          {/* Cart Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <CartSummary />
              
              <div className="mt-6 space-y-4">
                <Link
                  href="/checkout"
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-md font-medium hover:bg-blue-700 transition-colors duration-200 block text-center"
                >
                  Proceed to Checkout
                </Link>
                
                <Link
                  href="/products"
                  className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-md font-medium hover:bg-gray-200 transition-colors duration-200 block text-center"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}