'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/contexts/CartContext';
import CheckoutForm from '@/components/CheckoutForm';
import CartSummary from '@/components/CartSummary';
import CartItem from '@/components/CartItem';
import { CheckoutFormData } from '@/types';

export default function CheckoutPage() {
  const { state, clearCart, getCartSummary } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderNumber, setOrderNumber] = useState<string>('');
  const router = useRouter();
  const summary = getCartSummary();

  // Redirect to cart if empty
  if (state.items.length === 0 && !orderComplete) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 9M7 13l-1.5 9m0 0h9" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Your Cart is Empty</h1>
            <p className="text-gray-600 mb-8">
              Please add some items to your cart before checking out.
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

  const handleOrderSubmit = async (formData: CheckoutFormData) => {
    setIsSubmitting(true);

    try {
      // Simulate order processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate order number
      const newOrderNumber = `CR${Date.now().toString().slice(-6)}`;
      setOrderNumber(newOrderNumber);
      
      // Clear cart and show success
      clearCart();
      setOrderComplete(true);
      
      // In a real app, you would:
      // 1. Send order data to your backend
      // 2. Process payment
      // 3. Send confirmation email
      // 4. Store order in database
      
      console.log('Order submitted:', {
        orderNumber: newOrderNumber,
        customer: formData,
        items: state.items,
        summary: summary,
      });
      
    } catch (error) {
      console.error('Order submission failed:', error);
      // Handle error - show error message to user
    } finally {
      setIsSubmitting(false);
    }
  };

  // Order success page
  if (orderComplete) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <div className="mx-auto w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6">
              <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
            <p className="text-gray-600 mb-2">
              Thank you for your order. Your order number is:
            </p>
            <p className="text-2xl font-bold text-blue-600 mb-8">
              {orderNumber}
            </p>
            <p className="text-gray-600 mb-8">
              You will receive an email confirmation shortly with your order details and tracking information.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/products"
                className="bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors duration-200"
              >
                Continue Shopping
              </Link>
              <Link
                href="/"
                className="bg-gray-100 text-gray-700 px-6 py-3 rounded-md font-medium hover:bg-gray-200 transition-colors duration-200"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
          <p className="text-gray-600 mt-2">
            Complete your order below
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <CheckoutForm onSubmit={handleOrderSubmit} isSubmitting={isSubmitting} />
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Cart Summary */}
              <CartSummary />
              
              {/* Order Items */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Items</h3>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {state.items.map((item) => (
                    <CartItem key={item.id} item={item} showRemoveButton={false} />
                  ))}
                </div>
              </div>

              {/* Security Notice */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <span className="text-sm text-blue-800">
                    Your information is secure and encrypted
                  </span>
                </div>
              </div>

              {/* Back to Cart */}
              <Link
                href="/cart"
                className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-md font-medium hover:bg-gray-200 transition-colors duration-200 block text-center"
              >
                Back to Cart
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}