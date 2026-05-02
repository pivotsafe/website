import React, { useState } from "react";
import { motion } from "motion/react";
import { SearchIcon } from "lucide-react";

interface BlogSearchProps {
  onSearch: (query: string) => void;
  onCategoryFilter: (category: string) => void;
  categories: string[];
  selectedCategory: string;
}

export const BlogSearch: React.FC<BlogSearchProps> = ({
  onSearch,
  onCategoryFilter,
  categories,
  selectedCategory,
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const handleCategoryClick = (category: string) => {
    onCategoryFilter(category === selectedCategory ? "all" : category);
  };

  return (
    <div className="w-full ">
      {/* Search Bar */}
      <form onSubmit={handleSearch} className="relative">
        <div className="relative">
          <input
            type="text"
            placeholder="Search blogs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-6 py-4 pl-14 bg-[#101010] border border-white/[0.1]  text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 backdrop-blur-sm font-light text-sm"
          />
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <SearchIcon className="h-6 w-6 text-white/50" />
          </div>
          <button
            type="submit"
            className="absolute inset-y-0 right-0 px-10  border border-white/[0.1] bg-[#101010]  text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 font-light text-sm"
          >
            Search
          </button>
        </div>
      </form>

      {/* Category Filters */}
      {/* <div className="flex flex-wrap gap-3">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleCategoryClick("all")}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
            selectedCategory === "all"
              ? "bg-blue-500 text-white shadow-lg shadow-blue-500/25"
              : "bg-white/[0.05] text-white/70 hover:bg-white/[0.1] hover:text-white border border-white/[0.1]"
          }`}
        >
          All Posts
        </motion.button>

        {categories.map((category) => (
          <motion.button
            key={category}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleCategoryClick(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              selectedCategory === category
                ? "bg-blue-500 text-white shadow-lg shadow-blue-500/25"
                : "bg-white/[0.05] text-white/70 hover:bg-white/[0.1] hover:text-white border border-white/[0.1]"
            }`}
          >
            {category}
          </motion.button>
        ))}
      </div> */}
    </div>
  );
};
