/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_API_URL: "https://apix.aroxbit.com/5007",
    ORG_ID: "672b927f560d5ff39bbb0c28",
    ORG_NAME: "Indie Spiral",
  },

  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
};

export default nextConfig;
