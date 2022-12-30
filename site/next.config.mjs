import mkWithMDX from "@next/mdx";
import rehypeSlug from "rehype-slug";
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
    rehypePlugins: [rehypeSlug],
    remarkPlugins: [remarkGFM],
  },
});

export default withMDX(nextConfig);
