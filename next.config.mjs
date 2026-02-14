/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: "/documents/non_disclosure_agreement",
        destination: "/documents/nda",
        permanent: true,
      },
    ]
  },
}

export default nextConfig
