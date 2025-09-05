/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['fonts.googleapis.com'],
  },
}

module.exports = nextConfig
