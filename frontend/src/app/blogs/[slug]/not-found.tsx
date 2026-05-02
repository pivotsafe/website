import { ArrowLeftIcon, FileX2 } from "lucide-react";
import Link from "next/link";
import BrandLogo from "@/components/custom/brandLogo";

export default function NotFound() {
  return (

    <>

      <div className="w-full px-6 sm:px-10 lg:px-16 pt-8 pb-2 relative z-20">

        <BrandLogo size="lg" />

      </div>
    <div className="relative container-fluid mx-auto overflow-hidden bg-[#101010] border-l  ">
      <div className="container mx-auto border-white/[0.1] border-r border-white/[0.1] border-l">
        {/* Header */}

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
              / <span className="text-white">Not Found</span>
            </div>
          </div>
        </div>

        {/* Not Found Content */}
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <div className="w-24 h-24 mx-auto mb-6 bg-white/[0.05] rounded-full flex items-center justify-center">
            <FileX2 className="w-12 h-12 text-white/30" />
          </div>

          <h1 className="text-3xl font-bold text-white mb-4">
            Blog Post Not Found
          </h1>

          <p className="text-white/60 mb-8">
            The blog post you are looking for does not exist or has been
            removed.
          </p>

          <Link
            href="/blogs"
            className="text-[#9147ff] inline-flex items-center gap-2 hover:text-[#20ffa0] transition-colors duration-300"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            Back to Blogs
          </Link>
        </div>
      </div>
    </div>
  </>
  );
}
