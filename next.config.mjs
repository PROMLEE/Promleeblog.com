/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    domains: ["avatars.githubusercontent.com", "github.com", "img.shields.io"],
  },
};

export default nextConfig;
