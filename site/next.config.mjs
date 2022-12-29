import mkWithMDX from "@next/mdx";
import remarkGFM from "remark-gfm";

/** @type {import("next").NextConfig} */
const nextConfig = {
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  reactStrictMode: true,
  swcMinify: true,
};

const withMDX = mkWithMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [ remarkGFM ],
    rehypePlugins: [],
  },
});

export default withMDX(nextConfig);
