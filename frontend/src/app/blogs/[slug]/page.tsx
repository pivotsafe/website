import React from "react";
import Image from "next/image";
import { fetchBlogPostBySlug, fetchBlogPosts } from "@/lib/blogService";
import { BlogPost } from "@/components/custom/blogCard";
import { notFound } from "next/navigation";
import { Clock, User } from "lucide-react";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import {
  BLOCKS,
  Document as ContentfulDocument,
  INLINES,
} from "@contentful/rich-text-types";
import RecentBlogs from "@/components/custom/recentBlogs";

const options = {
  renderNode: {
    [BLOCKS.HEADING_1]: (node: any, children: any) => (
      <h1 className="text-3xl font-bold">{children}</h1>
    ),
    [BLOCKS.HEADING_2]: (node: any, children: any) => (
      <h2 className="text-2xl font-bold">{children}</h2>
    ),
    [BLOCKS.HEADING_3]: (node: any, children: any) => (
      <h3 className="text-xl font-bold">{children}</h3>
    ),
    [BLOCKS.HEADING_4]: (node: any, children: any) => (
      <h4 className="text-lg font-bold">{children}</h4>
    ),
    [BLOCKS.HEADING_5]: (node: any, children: any) => (
      <h5 className="text-base font-bold">{children}</h5>
    ),
    [BLOCKS.HEADING_6]: (node: any, children: any) => (
      <h6 className="text-sm font-bold">{children}</h6>
    ),
    [BLOCKS.OL_LIST]: (node: any, children: any) => (
      <ol className="list-decimal list-inside mb-4 text-base text-white/80 font-light leading-relaxed">
        {children}
      </ol>
    ),
    [BLOCKS.UL_LIST]: (node: any, children: any) => (
      <ul className="list-disc list-inside mb-4 text-base text-white/80 font-light leading-relaxed">
        {children}
      </ul>
    ),
    [BLOCKS.LIST_ITEM]: (node: any, children: any) => (
      <li className="mb-2 text-base text-white/80 font-light leading-relaxed [&_p]:inline">
        {children}
      </li>
    ),
    [BLOCKS.PARAGRAPH]: (node: any, children: any) => (
      <p className="mb-4 text-base text-white/80 font-light leading-relaxed">
        {children}
      </p>
    ),
    [INLINES.HYPERLINK]: (node: any, children: any) => (
      <a href={node.data.uri} className="text-blue-600 underline">
        {children}
      </a>
    ),
  },
};

// Generate static params for better performance
export async function generateStaticParams() {
  try {
    const posts = await fetchBlogPosts();
    return posts.map((post) => ({
      slug: post.slug,
    }));
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("Error generating static params:", error);
    }
    return [];
  }
}

// Generate metadata for the page
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params; // ✅ await here
  const post = await fetchBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "Blog Post Not Found | Pivot Safe",
      description: "The blog post you're looking for doesn't exist.",
    };
  }

  return {
    title: `${post.title} | Pivot Safe`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.featuredImage],
      type: "article",
      publishedTime: post.publishDate,
      authors: [post.author],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.featuredImage],
    },
  };
}

interface BlogDetailProps {
  params: Promise<{ slug: string }>;
}

const BlogDetail = async ({ params }: BlogDetailProps) => {
  const { slug } = await params;

  if (!slug) {
    notFound();
  }

  const post = await fetchBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="relative container-fluid mx-auto overflow-hidden bg-[#101010] border-l">
      <div className="container mx-auto border-white/[0.1] border-r border-white/[0.1] border-l">
        {/* Header */}
        <div className="flex flex-col items-center gap-2 mb-2 px-4 border-b border-white/[0.1]">
          <div className="logo w-[100%] my-10 flex items-center justify-between">
            <h1 className="text-[24px] text-white">Pivot Safe</h1>
            <div className="text-white">⎑</div>
          </div>
        </div>

        {/* Breadcrumb */}
        <div className="flex flex-col items-center gap-2 mb-0 px-4 border-b border-white/[0.1]">
          <div className="logo w-[100%] my-1 flex items-center justify-between">
            <div className="text-[#ffffff50] text-sm mb-2">
              <a href="/" className="hover:text-white">
                Home
              </a>{" "}
              /{" "}
              <a href="/blogs" className="hover:text-white">
                Blogs
              </a>{" "}
              / <span className="text-white">{post.title}</span>
            </div>
          </div>
        </div>

        {/* Blog Content */}
        <article className="max-w-full mx-auto  pb-16">
          {/* Featured Image */}
          <div className="relative h-96 w-full mb-8  overflow-hidden">
            {post.featuredImage && (
              <Image
                src={post.featuredImage}
                alt={post.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

            {/* Category Badge */}
            <div className="absolute top-6 left-6">
              <span className="inline-flex items-center rounded-full bg-blue-500/20 px-4 py-2 text-sm font-medium text-blue-300 backdrop-blur-sm border border-blue-500/30">
                {post.category}
              </span>
            </div>

            {/* Read Time */}
            <div className="absolute top-6 right-6">
              <span className="inline-flex items-center rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm border border-white/20">
                {post.readTime}
              </span>
            </div>
          </div>

          {/* Article Header */}
          <header className="mb-8 px-4 max-w-7xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-white/70 text-sm">
              <time
                dateTime={post.publishDate}
                className="flex items-center gap-2"
              >
                <Clock className="w-4 h-4" />
                {new Date(post.publishDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>

              <span className="flex items-center gap-2">
                <User className="w-4 h-4" />
                {post.author}
              </span>
            </div>
          </header>

          {/* Article Content */}
          <div className="prose prose-lg prose-invert  px-4 max-w-7xl mx-auto">
            <div className="text-white/90 leading-relaxed text-lg">
              <p className="text-base text-white/80 mb-8 font-light leading-relaxed">
                {post.excerpt}
              </p>

              {/* Blog Content */}
              {post.content ? (
                <div className="space-y-6 text-white/80 prose prose-lg prose-invert max-w-none prose-p:text-base prose-p:leading-relaxed prose-p:font-light prose-p:text-white/80 prose-p:mb-4">
                  {documentToReactComponents(
                    post.content as unknown as ContentfulDocument,
                    options
                  )}
                </div>
              ) : (
                <div className="space-y-6 text-white/80">
                  <p>
                    This is where the full blog post content would be displayed.
                    The content would typically come from the `content` field in
                    your Contentful data, which can include rich text, markdown,
                    or HTML content.
                  </p>
                  <p>
                    You can customize this section to render different types of
                    content based on your Contentful content model. For example,
                    you might want to render rich text content, handle different
                    content blocks, or add additional formatting.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Back to Blogs Button */}
          <div className="mt-12 pt-8 border-t border-white/[0.1]">
            <RecentBlogs />
          </div>
        </article>
      </div>
    </div>
  );
};

export default BlogDetail;
