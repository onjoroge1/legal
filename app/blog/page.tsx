import type { Metadata } from "next"
import { BlogListingClient } from "./blog-listing-client"

export const metadata: Metadata = {
  title: "Legal Blog | LegalLawDocs - Expert Legal Guides & Articles",
  description:
    "Expert guides on legal documents, business formation, employment law, real estate agreements, and estate planning. Learn how to protect your rights and interests.",
  keywords: [
    "legal blog",
    "legal guides",
    "business law articles",
    "employment law",
    "real estate law",
    "estate planning",
    "legal documents guide",
  ],
  openGraph: {
    title: "Legal Blog | LegalLawDocs",
    description:
      "Expert guides on legal documents, business formation, employment law, and more.",
    type: "website",
  },
}

export default function BlogPage() {
  return <BlogListingClient />
}
