// Base Cosmic object interface
interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
  status?: string;
  published_at?: string;
  thumbnail?: string;
}

// Category interface
interface Category extends CosmicObject {
  type: 'categories';
  metadata: {
    name?: string;
    description?: string;
    color?: string;
  };
}

// Author interface
interface Author extends CosmicObject {
  type: 'authors';
  metadata: {
    name?: string;
    bio?: string;
    profile_photo?: {
      url: string;
      imgix_url: string;
    };
    email?: string;
    website?: string;
    instagram?: string;
    twitter?: string;
  };
}

// Post interface
interface Post extends CosmicObject {
  type: 'posts';
  metadata: {
    title?: string;
    excerpt?: string;
    content?: string;
    featured_image?: {
      url: string;
      imgix_url: string;
    };
    author?: Author;
    category?: Category;
    tags?: string;
    read_time?: number;
  };
}

// API response types
interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit?: number;
  skip?: number;
}

interface CosmicSingleResponse<T> {
  object: T;
}

// Type guards
function isPost(obj: CosmicObject): obj is Post {
  return obj.type === 'posts';
}

function isAuthor(obj: CosmicObject): obj is Author {
  return obj.type === 'authors';
}

function isCategory(obj: CosmicObject): obj is Category {
  return obj.type === 'categories';
}

// Utility types - Fixed to properly constrain generic type
type OptionalMetadata<T extends CosmicObject> = Partial<T['metadata']>;
type CreatePostData = Omit<Post, 'id' | 'created_at' | 'modified_at'>;

export type {
  CosmicObject,
  Category,
  Author,
  Post,
  CosmicResponse,
  CosmicSingleResponse,
  OptionalMetadata,
  CreatePostData,
};

export { isPost, isAuthor, isCategory };