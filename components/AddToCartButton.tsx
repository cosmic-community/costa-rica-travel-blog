'use client';

import React, { useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { Product } from '@/types';

interface AddToCartButtonProps {
  product: Product;
  quantity?: number;
  className?: string;
  disabled?: boolean;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  showQuantity?: boolean;
}

export default function AddToCartButton({
  product,
  quantity = 1,
  className = '',
  disabled = false,
  variant = 'primary',
  size = 'md',
  showQuantity = false,
}: AddToCartButtonProps) {
  const { addToCart, isInCart, getItemQuantity } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  const [localQuantity, setLocalQuantity] = useState(quantity);

  const stockStatus = product.metadata.stock_status?.value || 'In Stock';
  const isOutOfStock = stockStatus === 'Out of Stock';
  const isDisabled = disabled || isOutOfStock;

  const handleAddToCart = async () => {
    setIsAdding(true);
    
    try {
      addToCart(product, localQuantity);
      
      // Brief loading state for UX feedback
      setTimeout(() => {
        setIsAdding(false);
      }, 500);
    } catch (error) {
      console.error('Error adding to cart:', error);
      setIsAdding(false);
    }
  };

  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 disabled:bg-gray-400',
    secondary: 'bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-gray-500 disabled:bg-gray-100 disabled:text-gray-400',
  };

  const sizeClasses = {
    sm: 'px-3 py-1 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  const buttonClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  const currentQuantity = getItemQuantity(product.id);

  return (
    <div className="flex items-center gap-2">
      {showQuantity && (
        <div className="flex items-center">
          <label htmlFor={`quantity-${product.id}`} className="sr-only">
            Quantity
          </label>
          <select
            id={`quantity-${product.id}`}
            value={localQuantity}
            onChange={(e) => setLocalQuantity(Number(e.target.value))}
            className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isDisabled}
          >
            {[...Array(10)].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
        </div>
      )}
      
      <button
        onClick={handleAddToCart}
        disabled={isDisabled || isAdding}
        className={buttonClasses}
      >
        {isAdding ? (
          <>
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Adding...
          </>
        ) : isOutOfStock ? (
          'Out of Stock'
        ) : (
          <>
            <ShoppingCart className="w-4 h-4 mr-1" />
            {currentQuantity > 0 ? `In Cart (${currentQuantity})` : 'Add to Cart'}
          </>
        )}
      </button>
    </div>
  );
}