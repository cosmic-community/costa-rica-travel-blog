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