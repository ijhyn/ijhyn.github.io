/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static HTML export for GitHub Pages; trailing slashes give each post a
  // folder (e.g. /vs-gemini/index.html), matching the old blog's URLs.
  output: 'export',
  trailingSlash: true,
};

export default nextConfig;
