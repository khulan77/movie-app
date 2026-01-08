import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_TMDB_KEY: process.env.NEXT_PUBLIC_TMDB_KEY ?? "",
  },
};

export default nextConfig;
