/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_API_URL: "https://apix.aroxbit.com/5007",
    ORG_ID: "672a0e3d560d5ff39bbaf84b",
    ORG_NAME: "Indie Spiral",
  },

  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
};

export default nextConfig;
