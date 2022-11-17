/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'bioconductor.org',
        port: '',
        pathname: '/shields/**',
      },
    ],
  },
}

module.exports = nextConfig
