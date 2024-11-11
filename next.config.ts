import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "hzybpwjbphioxthrqnuw.supabase.co",
      },
    ],
  },
};

export default nextConfig;
