'use client';

import React from 'react';
import Link from 'next/link';
import { useCart } from '@/contexts/CartContext';
import { CartItem as CartItemType } from '@/types';

interface CartItemProps {
  item: CartItemType;
  showRemoveButton?: boolean;
}

export default function CartItem({ item, showRemoveButton = true }: CartItemProps) {
  const { updateQuantity, removeFromCart } = useCart();
  const { product, quantity } = item;
  
  const productImage = product.metadata.product_images?.[0];
  const totalPrice = product.metadata.price * quantity;

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(product.id);
    } else {
      updateQuantity(product.id, newQuantity);
    }
  };

  return (
    <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Product Image */}
      <Link href={`/products/${product.slug}`}>
        <div className="flex-shrink-0 w-16 h-16 overflow-hidden rounded-md cursor-pointer">
          <img
            src={productImage ? `${productImage.imgix_url}?w=128&h=128&fit=crop&auto=format,compress` : '/placeholder-product.jpg'}
            alt={product.metadata.product_name || product.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            width={64}
            height={64}
          />
        </div>
      </Link>

      {/* Product Info */}
      <div className="flex-1 min-w-0">
        <Link href={`/products/${product.slug}`}>
          <h3 className="text-sm font-medium text-gray-900 hover:text-blue-600 transition-colors cursor-pointer line-clamp-2">
            {product.metadata.product_name || product.title}
          </h3>
        </Link>
        <p className="text-sm text-gray-500 mt-1">
          ${product.metadata.price.toFixed(2)} each
        </p>
        {product.metadata.sku && (
          <p className="text-xs text-gray-400 mt-1">
            SKU: {product.metadata.sku}
          </p>
        )}
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => handleQuantityChange(quantity - 1)}
          className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors duration-200"
          aria-label="Decrease quantity"
        >
          <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
          </svg>
        </button>
        
        <span className="w-8 text-center text-sm font-medium text-gray-900">
          {quantity}
        </span>
        
        <button
          onClick={() => handleQuantityChange(quantity + 1)}
          className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors duration-200"
          aria-label="Increase quantity"
        >
          <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </button>
      </div>

      {/* Total Price */}
      <div className="text-right min-w-0">
        <p className="text-sm font-medium text-gray-900">
          ${totalPrice.toFixed(2)}
        </p>
      </div>

      {/* Remove Button */}
      {showRemoveButton && (
        <button
          onClick={() => removeFromCart(product.id)}
          className="text-red-500 hover:text-red-700 transition-colors duration-200 ml-2"
          aria-label="Remove item from cart"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      )}
    </div>
  );
}