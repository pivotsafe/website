/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    REACT_APP_BACKEND_URL: process.env.REACT_APP_BACKEND_URL,
    NEXT_PUBLIC_BACKEND_URL:
      process.env.NEXT_PUBLIC_BACKEND_URL || process.env.REACT_APP_BACKEND_URL,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.truesec.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "images.ctfassets.net",
      },
      {
        protocol: "https",
        hostname: "www.mdsec.co.uk",
      },
    ],
  },
};

export default nextConfig;
