import { fileURLToPath } from 'node:url';

import createJiti from 'jiti';

const jiti = createJiti(fileURLToPath(import.meta.url));

// Import env here to validate during build. Using jiti we can import .ts files
jiti('./src/env');

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: false, // true for `yarn export`
    formats: ['image/webp'],
    minimumCacheTTL: 60,
    domains: ['lh3.googleusercontent.com', 'domkitchenstorrage.blob.core.windows.net'], // TODO: need move all domains in env variable
    deviceSizes: [340, 640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [
      20, 21, 24, 37, 40, 67, 77, 140, 160, 280, 320, 549, 557, 558, 865, 1920,
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '4mb',
    },
  },
};

export default nextConfig;
