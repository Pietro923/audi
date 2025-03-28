/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000'], // Ajusta según sea necesario
    },
  },
}

module.exports = nextConfig