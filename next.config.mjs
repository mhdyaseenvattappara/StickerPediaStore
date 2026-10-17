/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'cfyqsmgwppwsdyhmhbcn.supabase.co',
      },
    ],
  },
};

export default nextConfig;
