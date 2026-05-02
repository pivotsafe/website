/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disabled because React 19 strict-mode double-invokes effects in dev,
  // which causes @react-three/postprocessing v3 to read `gl.alpha` on a
  // momentarily-null WebGL state during the forced unmount/remount of the
  // 3D hero scene, crashing with "Cannot read properties of null (reading
  // 'alpha')". Has no effect on production builds.
  reactStrictMode: false,
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
