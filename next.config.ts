import type { NextConfig } from "next";

const databaseurl = process.env.DATABASE_URL

console.log('///////////////',{databaseurl})

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;
