/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['lematrixai-verify-crop-vs-non-crop.hf.space'],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb'
    }
  }
}

module.exports = nextConfig 