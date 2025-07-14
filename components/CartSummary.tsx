'use client';

import React from 'react';
import { useCart } from '@/contexts/CartContext';

interface CartSummaryProps {
  showTitle?: boolean;
  className?: string;
}

export default function CartSummary({ showTitle = true, className = '' }: CartSummaryProps) {
  const { getCartSummary } = useCart();
  const summary = getCartSummary();

  if (summary.totalItems === 0) {
    return null;
  }

  return (
    <div className={`bg-white rounded-lg shadow-sm border border-gray-200 p-6 ${className}`}>
      {showTitle && (
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
      )}
      
      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Items ({summary.totalItems})</span>
          <span className="text-gray-900">${summary.subtotal.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Tax (8%)</span>
          <span className="text-gray-900">${summary.tax.toFixed(2)}</span>
        </div>
        
        <div className="border-t border-gray-200 pt-3">
          <div className="flex justify-between">
            <span className="text-base font-medium text-gray-900">Total</span>
            <span className="text-base font-medium text-gray-900">${summary.total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}