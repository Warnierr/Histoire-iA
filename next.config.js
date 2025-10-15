/** @type {import('next').NextConfig} */
const nextConfig = {
  // Empêche Next de remonter au mauvais workspace root
  outputFileTracingRoot: __dirname,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  serverExternalPackages: ['@prisma/client'],
};

module.exports = nextConfig;

