/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  output: 'export',
  // async rewrites() {
  //   return [
  //     {
  //       source: '/v1/:path*',
  //       destination: 'http://localhost:8080/v1/:path*',
  //     },
  //   ];
  // },
  trailingSlash: true,
}

export default nextConfig
