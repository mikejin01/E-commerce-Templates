// Static export serves images as plain files from /public — no optimizer.
// The loader's only job is prefixing the deploy base path (GitHub Pages
// project sites live under /<repo-name>).
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export default function imageLoader({ src }: { src: string }) {
  return `${basePath}${src}`;
}
