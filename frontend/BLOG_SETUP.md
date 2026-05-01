# Blog Setup Guide

This guide explains how to set up and configure the blog functionality for the Pivot Safe website.

## Features

The blog system includes:

- ✅ Responsive blog card grid layout
- ✅ Search functionality
- ✅ Category filtering
- ✅ Pagination
- ✅ Loading states and error handling
- ✅ Mock data for development
- ✅ Contentful CMS integration

## Components Created

1. **BlogCard** (`src/components/custom/blogCard.tsx`)

   - Individual blog post display
   - Hover animations and effects
   - Responsive image handling

2. **BlogSearch** (`src/components/custom/blogSearch.tsx`)

   - Search input with submit button
   - Category filter buttons
   - Responsive design

3. **BlogList** (`src/components/custom/blogList.tsx`)

   - Grid layout for blog posts
   - Loading skeleton states
   - Empty state handling

4. **BlogPagination** (`src/components/custom/blogPagination.tsx`)

   - Page navigation
   - Smart page number display
   - Previous/Next buttons

5. **BlogService** (`src/lib/blogService.ts`)
   - Contentful API integration
   - Mock data fallback
   - Data transformation utilities

## Contentful Setup

### 1. Create Content Model

Create a content type called `blogPost` in Contentful with these fields:

```
- title (Text, Short text)
- slug (Text, Short text, unique)
- excerpt (Text, Long text)
- content (Rich Text)
- featuredImage (Media, Single media)
- author (Text, Short text)
- category (Text, Short text)
- readTime (Text, Short text)
- publishDate (Date)
```

### 2. Environment Variables

Add these to your `.env.local` file:

```bash
CONTENTFUL_SPACE_ID=your_space_id_here
CONTENTFUL_ACCESS_TOKEN=your_access_token_here
```

### 3. Contentful Client

The service automatically uses the configured client from `src/lib/contentful.ts`.

## Mock Data

If Contentful is not configured, the system automatically falls back to mock data with 6 sample blog posts covering various cybersecurity topics.

## Usage

The blog page is automatically available at `/blogs` and includes:

- **Search**: Type to search through titles, excerpts, authors, and categories
- **Filters**: Click category buttons to filter posts
- **Pagination**: Navigate through multiple pages of results
- **Responsive**: Works on all device sizes

## Customization

### Styling

- All components use Tailwind CSS classes
- Colors and spacing match the existing design system
- Hover effects and animations are included

### Content

- Modify mock data in `blogService.ts` for development
- Update Contentful content model for production
- Add new categories by creating posts with different category values

### Layout

- Adjust `POSTS_PER_PAGE` constant in the main page for different pagination
- Modify grid columns in `BlogList` component
- Update card dimensions in `BlogCard` component

## Development

1. Start the development server: `npm run dev`
2. Navigate to `/blogs` to see the blog page
3. Test search, filtering, and pagination
4. Modify components as needed

## Production

1. Set up Contentful with proper content model
2. Configure environment variables
3. Build and deploy: `npm run build && npm start`

## Troubleshooting

- **No posts showing**: Check Contentful configuration or verify mock data
- **Search not working**: Ensure posts have content in searchable fields
- **Images not loading**: Verify image URLs in Contentful or mock data
- **Build errors**: Check TypeScript types and component imports
