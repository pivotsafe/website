export default function Loading() {
  return (
    <div className="relative container-fluid mx-auto overflow-hidden bg-[#101010] border-l">
      <div className="container mx-auto border-white/[0.1] border-r border-white/[0.1] border-l">
        {/* Header */}
        <div className="flex flex-col items-center gap-2 mb-2 px-4 border-b border-white/[0.1]">          <div className="logo w-[100%] my-10 flex items-center">
            <BrandLogo size="lg" />
          </div>
        </div>

        {/* Breadcrumb */}
        <div className="flex flex-col items-center gap-2 mb-20 px-4 border-b border-white/[0.1]">
          <div className="logo w-[100%] my-1 flex items-center justify-between">
            <div className="text-[#ffffff50] text-sm mb-2">
              <a href="/" className="hover:text-white">
                Home
              </a>{" "}
              /{" "}
              <a href="/blogs" className="hover:text-white">
                Blogs
              </a>{" "}
              / <span className="text-white">Loading...</span>
            </div>
          </div>
        </div>

        {/* Loading Content */}
        <div className="max-w-4xl mx-auto px-4 py-16">
          <div className="animate-pulse space-y-8">
            {/* Title skeleton */}
            <div className="h-12 bg-white/[0.05] rounded w-3/4"></div>

            {/* Featured image skeleton */}
            <div className="h-96 bg-white/[0.05] rounded-2xl"></div>

            {/* Meta info skeleton */}
            <div className="flex gap-4">
              <div className="h-4 bg-white/[0.05] rounded w-32"></div>
              <div className="h-4 bg-white/[0.05] rounded w-24"></div>
            </div>

            {/* Content skeleton */}
            <div className="space-y-4">
              <div className="h-4 bg-white/[0.05] rounded w-full"></div>
              <div className="h-4 bg-white/[0.05] rounded w-5/6"></div>
              <div className="h-4 bg-white/[0.05] rounded w-4/6"></div>
              <div className="h-4 bg-white/[0.05] rounded w-full"></div>
              <div className="h-4 bg-white/[0.05] rounded w-3/4"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
