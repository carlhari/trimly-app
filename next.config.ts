import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: [
    "local-origin.dev",
    "*.local-origin.dev",
    "*.ngrok-free.dev",
  ],

  reactStrictMode: false,
};

export default nextConfig;
