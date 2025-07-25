export interface CosmicFile {
  url: string;
  imgix_url: string;
}

export interface CosmicSelectOption {
  key: string;
  value: string;
}

export interface ProductMetadata {
  product_name: string;
  description: string;
  price: number;
  product_images: CosmicFile[];
  category: CosmicSelectOption;
  stock_status: CosmicSelectOption;
  featured: boolean;
  sku?: string;
}

export interface Product {
  id: string;
  title: string;
  slug: string;
  metadata: ProductMetadata;
  created_at: string;
}

export interface AuthorMetadata {
  name: string;
  bio?: string;
  profile_photo?: CosmicFile;
  email?: string;
  website?: string;
  instagram?: string;
  twitter?: string;
}

export interface Author {
  id: string;
  title: string;
  slug: string;
  metadata: AuthorMetadata;
}

export interface CategoryMetadata {
  name: string;
  description?: string;
  color?: string;
}

export interface Category {
  id: string;
  title: string;
  slug: string;
  metadata: CategoryMetadata;
}

export interface PostMetadata {
  title: string;
  excerpt?: string;
  content: string;
  featured_image?: CosmicFile;
  author?: Author;
  category?: Category;
  tags?: string;
  read_time?: number;
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  metadata: PostMetadata;
  created_at: string;
  published_at?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface SearchResult {
  id: string;
  title: string;
  slug: string;
  type: 'posts' | 'products' | 'authors' | 'categories';
  excerpt?: string;
  metadata: any;
}

// Cart and Checkout Types
export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  addedAt: string;
}

export interface CartSummary {
  items: CartItem[];
  totalItems: number;
  subtotal: number;
  tax: number;
  total: number;
}

export interface CheckoutFormData {
  // Customer Information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  
  // Shipping Address
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  
  // Additional Information
  orderNotes?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerInfo: CheckoutFormData;
  items: CartItem[];
  summary: CartSummary;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}

// Cosmic SDK response types
export interface CosmicResponse<T = any> {
  objects: T[];
  total: number;
  limit: number;
  skip: number;
}

export interface CosmicSingleResponse<T = any> {
  object: T;
}