/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,

  async rewrites() {
    return [
      {
        source: "/api/:slugs*",
        destination: "http://localhost:1337/api/:slugs*",
      },
    ];
  },
}

module.exports = nextConfig
