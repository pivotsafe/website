import { client } from "./contentful";
import { BlogPost } from "@/components/custom/blogCard";
import { Document as ContentfulDocument } from "@contentful/rich-text-types";

export interface ContentfulBlogEntry {
  sys: {
    id: string;
    createdAt: string;
    updatedAt: string;
  };
  fields: {
    title: string;
    slug: string;
    excerpt: string;
    content: ContentfulDocument;
    featuredImage?: {
      fields: {
        file: {
          url: string;
        };
      };
    };
    authorName: string;
    category: string;
    readTime: string;
    publishDate: string;
  };
}

// Helper function to safely get featured image URL
const getFeaturedImageUrl = (item: any): string => {
  try {
    if (item.fields?.coverImage?.fields?.file?.url) {
      return `https:${item.fields.coverImage.fields.file.url}`;
    }
  } catch (error) {
    console.warn("Error parsing featured image:", error);
  }

  // Return a default image if featuredImage is not available
  return "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80";
};

export const fetchBlogPosts = async (): Promise<BlogPost[]> => {
  try {
    const response = await client.getEntries({
      content_type: "blogPost", // You'll need to create this content type in Contentful
      order: ["-sys.createdAt"],
      limit: 100,
    });

    return response.items.map((item: any) => ({
      id: item.sys.id,
      title: item.fields.title || "Untitled Post",
      excerpt: item.fields.excerpt || "No excerpt available",
      content: item.fields.content || "",
      featuredImage: getFeaturedImageUrl(item),
      publishDate: item.fields.publishDate || item.sys.createdAt,
      author: item.fields.authorName || "Anonymous",
      category: item.fields.category || "General",
      readTime: item.fields.readTime || "5 min read",
      slug: item.fields.slug || `post-${item.sys.id}`,
    }));
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    // Return empty array for development/testing
    return [];
  }
};

export const fetchBlogPostBySlug = async (
  slug: string
): Promise<BlogPost | null> => {
  try {
    const response = await client.getEntries({
      content_type: "blogPost",
      "fields.slug": slug,
      limit: 1,
    });

    if (response.items.length === 0) {
      return null;
    }

    const item = response.items[0] as any;

    return {
      id: item.sys.id,
      title: item.fields.title || "Untitled Post",
      excerpt: item.fields.excerpt || "No excerpt available",
      content: item.fields.content || "",
      featuredImage: getFeaturedImageUrl(item),
      publishDate: item.fields.publishDate || item.sys.createdAt,
      author: item.fields.authorName || "Anonymous",
      category: item.fields.category || "General",
      readTime: item.fields.readTime || "5 min read",
      slug: item.fields.slug || `post-${item.sys.id}`,
    };
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return null;
  }
};

export const getCategories = (posts: BlogPost[]): string[] => {
  const categories = posts.map((post) => post.category);
  return [...new Set(categories)].sort();
};
