/** @type {import('next').NextConfig} */
const nextConfig = {
  // Required for Prisma on Vercel serverless
  serverExternalPackages: ["@prisma/client"],
};

export default nextConfig;
