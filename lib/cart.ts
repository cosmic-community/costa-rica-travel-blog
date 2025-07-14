import { CartItem, Product } from '@/types';

export const CART_STORAGE_KEY = 'costa-rica-cart';

export function getCartFromStorage(): CartItem[] {
  if (typeof window === 'undefined') return [];
  
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error reading cart from storage:', error);
    return [];
  }
}

export function saveCartToStorage(items: CartItem[]): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  } catch (error) {
    console.error('Error saving cart to storage:', error);
  }
}

export function addToCart(items: CartItem[], product: Product, quantity: number = 1): CartItem[] {
  const existingItem = items.find(item => item.id === product.id);
  
  if (existingItem) {
    return items.map(item =>
      item.id === product.id
        ? { ...item, quantity: item.quantity + quantity }
        : item
    );
  }
  
  return [
    ...items,
    {
      id: product.id,
      product,
      quantity,
      addedAt: new Date().toISOString(),
    },
  ];
}

export function removeFromCart(items: CartItem[], productId: string): CartItem[] {
  return items.filter(item => item.id !== productId);
}

export function updateCartItemQuantity(items: CartItem[], productId: string, quantity: number): CartItem[] {
  if (quantity <= 0) {
    return removeFromCart(items, productId);
  }
  
  return items.map(item =>
    item.id === productId
      ? { ...item, quantity }
      : item
  );
}

export function calculateCartTotal(items: CartItem[]): number {
  return items.reduce((total, item) => total + (item.product.metadata.price * item.quantity), 0);
}

export function calculateCartTax(subtotal: number, taxRate: number = 0.08): number {
  return subtotal * taxRate;
}

export function getCartItemCount(items: CartItem[]): number {
  return items.reduce((count, item) => count + item.quantity, 0);
}

export function isProductInCart(items: CartItem[], productId: string): boolean {
  return items.some(item => item.id === productId);
}

export function getCartItemQuantity(items: CartItem[], productId: string): number {
  const item = items.find(item => item.id === productId);
  return item ? item.quantity : 0;
}

export function clearCart(): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.removeItem(CART_STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing cart:', error);
  }
}