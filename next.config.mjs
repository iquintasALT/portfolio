import fs from "node:fs";
import nextMDX from "@next/mdx";
import rehypePrettyCode from "rehype-pretty-code";

/** @type {import('rehype-pretty-code').Options} */
const options = {
  theme: "one-dark-pro",
};

const withMDX = nextMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [[rehypePrettyCode, options]],
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "github.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "github.io",
        port: "",
        pathname: "/Veiled/**",
      },
      // Add more patterns here if you need to support other GitHub image URLs
    ],
    domains: [
      ...(process.env.NEXT_BLOB_BASE_URL ? [new URL(process.env.NEXT_BLOB_BASE_URL).hostname] : []),
      "aarmor01.github.io",
    ],
  },
};

export default withMDX(nextConfig);
