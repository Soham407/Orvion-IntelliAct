/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
        protocol: "https",
        hostname: "img1.wsimg.com",
      },
    ],
  },
  output: "standalone",
};

export default nextConfig;
