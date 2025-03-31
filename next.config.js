const { withPayload } = require("@payloadcms/next/withPayload");
/** @type {import('next').NextConfig} */
module.exports = withPayload({
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.shopify.com",
        pathname: "/s/files/**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/password",
        destination: "/",
        permanent: true,
      },
    ];
  },
});
