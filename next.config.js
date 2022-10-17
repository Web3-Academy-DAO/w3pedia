/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  assetPrefix: "./",
  trailingSlash: false,
  swcMinify: true,
  experimental: {
    images: {
      unoptimized: true,
    },
  },

  async rewrites() {
    return [
      {
        source: "/api/:slugs*",
        destination: "http://localhost:1337/api/:slugs*",
      },
    ];
  },
};

module.exports = nextConfig;
