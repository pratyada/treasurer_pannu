/** @type {import('next').NextConfig} */
const nextConfig = {
  // Required for Prisma on Vercel serverless
  experimental: {
    serverComponentsExternalPackages: ["@prisma/client"],
  },
};

export default nextConfig;
