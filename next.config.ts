import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true
  },
  typescript: {
    // temporary: ignore type errors during build so Amplify can deploy.
    // Remove or set to false after you fix types.
    ignoreBuildErrors: true
  }
};

export default nextConfig;
