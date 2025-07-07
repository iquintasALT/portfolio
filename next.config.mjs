import withMDX from "@next/mdx";

const mdx = withMDX();
export default mdx({
  pageExtensions: ["js", "jsx", "ts", "tsx", "mdx"],
  images: {
    domains: ["github.com"],
  },
});
