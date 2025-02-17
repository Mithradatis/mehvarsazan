/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    includePaths: ['./styles'],
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  trailingSlash: true,
  env: {
    WORDPRESS_API_URL: process.env.NEXT_PUBLIC_WORDPRESS_API_URL,
    WORDPRESS_API_HOSTNAME: process.env.NEXT_PUBLIC_WORDPRESS_API_HOSTNAME,
    WP_USER: process.env.NEXT_PUBLIC_WP_USER,
    WP_APP_PASS: process.env.NEXT_PUBLIC_WP_APP_PASS,
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: process.env.NEXT_PUBLIC_WORDPRESS_API_HOSTNAME,
        port: "",
      },
    ],
  },
};

module.exports = nextConfig;
