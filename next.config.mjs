/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/network-tools',
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
