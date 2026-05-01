import React from "react";
import Image from "next/image";
import { motion } from "motion/react";
import Link from "next/link";
import { Document as ContentfulDocument } from "@contentful/rich-text-types";
import { ArrowRight } from "lucide-react";

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content?: ContentfulDocument;
  featuredImage: string;
  publishDate: string;
  author: string;
  category: string;
  readTime: string;
  slug: string;
}

interface BlogCardProps {
  post: BlogPost;
  className?: string;
}

export const BlogCard: React.FC<BlogCardProps> = ({ post, className = "" }) => {
  return (
    <Link href={`/blogs/${post.slug}`} className="block">
      <motion.article
        whileHover={{ y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className={`group relative overflow-hidden  border border-white/[0.1] bg-[#101010] backdrop-blur-sm transition-all duration-300 hover:border-white/[0.2] hover:shadow-2xl hover:shadow-blue-500/10 cursor-pointer ${className}`}
      >
        {/* Featured Image */}
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={post.featuredImage}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Category Badge */}
          <div className="absolute top-4 left-4">
            <span className="inline-flex items-center rounded-full bg-blue-500/20 px-3 py-1 text-xs font-light text-blue-300 backdrop-blur-sm text-white">
              {post.category}
            </span>
          </div>

          {/* Read Time */}
          <div className="absolute top-4 right-4">
            <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs font-light text-white backdrop-blur-sm">
              {post.readTime}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Date and Author */}
          <div className="mb-3 flex items-center gap-3 text-[14px] text-white/60 font-light">
            <time dateTime={post.publishDate}>
              {new Date(post.publishDate).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            <span>•</span>
            <span>{post.author}</span>
          </div>

          {/* Title */}
          <h3 className="mb-3 text-xl font-bold text-white line-clamp-2 group-hover:text-blue-300 transition-colors duration-300">
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className="mb-4 text-[14px] text-white/80 line-clamp-3 leading-relaxed font-light">
            {post.excerpt}
          </p>

          {/* Read More Button */}
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-2 text-sm font-medium text-blue-400 group-hover:text-blue-300 transition-colors duration-300 font-light">
              Read More
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </span>
          </div>
        </div>

        {/* Hover Effect Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-purple-500/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none" />
      </motion.article>
    </Link>
  );
};
