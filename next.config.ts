import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Preserving your local network fix from Phase 1
  allowedDevOrigins: ["192.168.0.103"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;