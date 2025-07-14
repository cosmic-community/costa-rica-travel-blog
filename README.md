# Costa Rica Travel Blog

![Costa Rica Travel Blog](https://imgix.cosmicjs.com/218634a0-607c-11f0-a051-23c10f41277a-photo-1447933601403-0c6688de566e-1752474670097.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A beautiful, responsive travel blog showcasing the wonders of Costa Rica. Built with Next.js and powered by [Cosmic](https://www.cosmicjs.com), this application provides an immersive experience for readers interested in Costa Rican culture, wildlife, adventures, and stunning beaches.

## ✨ Features

- **Dynamic Content Display** - Automatically displays all your existing posts, authors, and categories
- **Category-Based Navigation** - Filter posts by Adventure, Beaches, Wildlife, and Culture
- **Author Profiles** - Detailed author pages with bio, social links, and their published articles
- **Responsive Design** - Perfect viewing experience on desktop, tablet, and mobile devices
- **SEO Optimized** - Built-in metadata and structured data for better search engine visibility
- **Fast Performance** - Server-side rendering and optimized images for lightning-fast load times

## Clone this Bucket

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket to get started instantly:

[![Clone this Bucket](https://img.shields.io/badge/Clone%20this%20Bucket-4F46E5?style=for-the-badge&logo=cosmic&logoColor=white)](http://localhost:3040/projects/new?clone_bucket=blog-production-9478bd30-607b-11f0-ae82-21883a5866db)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> Create a content model for a Costa Rica travel blog with posts, authors, and categories.

### Code Generation Prompt

> Build a Next.js website that uses my existing objects in this bucket. Set apiEnvironment: "staging" to cosmic config

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## 🛠️ Technologies Used

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type safety and better developer experience
- **Tailwind CSS** - Utility-first CSS framework
- **Cosmic** - Headless CMS for content management
- **React Markdown** - Markdown rendering for blog content

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- A [Cosmic](https://www.cosmicjs.com) account
- Bun package manager (recommended)

### Installation

1. Clone this repository
2. Install dependencies:
   ```bash
   bun install
   ```

3. Create a `.env.local` file in the root directory:
   ```env
   COSMIC_BUCKET_SLUG=your-bucket-slug
   COSMIC_READ_KEY=your-read-key
   COSMIC_WRITE_KEY=your-write-key
   ```

4. Run the development server:
   ```bash
   bun dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) to view the application

## 📖 Cosmic SDK Examples

### Fetching All Posts
```typescript
import { cosmic } from '@/lib/cosmic'

const { objects: posts } = await cosmic.objects
  .find({ type: 'posts' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

### Fetching Single Post
```typescript
const { object: post } = await cosmic.objects
  .findOne({ type: 'posts', slug: 'your-post-slug' })
  .depth(1)
```

### Fetching Posts by Category
```typescript
const { objects: posts } = await cosmic.objects
  .find({ 
    type: 'posts',
    'metadata.category': categoryId 
  })
  .depth(1)
```

## 🌐 Cosmic CMS Integration

This application integrates with [Cosmic](https://www.cosmicjs.com) to manage:

- **Posts** - Travel articles with title, excerpt, content, featured image, author, category, tags, and read time
- **Authors** - Writer profiles with name, bio, profile photo, and social links
- **Categories** - Content organization with name, description, and color coding

For more information about Cosmic's features, visit the [Cosmic documentation](https://www.cosmicjs.com/docs).

## 🚀 Deployment Options

### Deploy to Vercel
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Deploy to Netlify
1. Push your code to GitHub
2. Connect your repository to Netlify
3. Add environment variables in Netlify dashboard
4. Deploy automatically

### Environment Variables for Production
Set these environment variables in your hosting platform:
- `COSMIC_BUCKET_SLUG` - Your Cosmic bucket slug
- `COSMIC_READ_KEY` - Your Cosmic read key
- `COSMIC_WRITE_KEY` - Your Cosmic write key

<!-- README_END -->