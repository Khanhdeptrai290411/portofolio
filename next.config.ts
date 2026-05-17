import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    // All images are local (public/images/), no external domains needed.
    // Add domains here if you later load images from an external CDN.
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
