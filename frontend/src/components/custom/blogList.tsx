import React from "react";
import { motion } from "motion/react";
import { BlogCard, BlogPost } from "./blogCard";

interface BlogListProps {
  posts: BlogPost[];
  isLoading?: boolean;
}

export const BlogList: React.FC<BlogListProps> = ({
  posts,
  isLoading = false,
}) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="animate-pulse space-y-4">
            <div className="bg-white/[0.05] h-48 "></div>
            <div className="space-y-2">
              <div className="h-4 bg-white/[0.05] "></div>
              <div className="h-4 bg-white/[0.05]"></div>
              <div className="h-4 bg-white/[0.05] "></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (posts.length === 0 && isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-16"
      >
        <div className="max-w-md mx-auto">
          <div className="w-24 h-24 mx-auto mb-6 bg-white/[0.05]  flex items-center justify-center">
            <svg
              className="w-12 h-12 text-white/30"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">
            No blog posts found
          </h3>
          <p className="text-white/60">
            We couldn&apos;t find any blog posts matching your criteria. Try
            adjusting your search or filters.
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4"
    >
      {posts.map((post, index) => (
        <motion.div
          key={post.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <BlogCard post={post} />
        </motion.div>
      ))}
    </motion.div>
  );
};
