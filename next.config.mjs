/** @type {import('@/models/node_modules/next').NextConfig} */
const nextConfig = {
    images: {
      domains: ['avatars.githubusercontent.com','example.com',"www.thunderclient.com"], // Add external image domains here
    },
    reactStrictMode: false,
  };
export default nextConfig;
