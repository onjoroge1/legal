import Link from "next/link"
import Image from "next/image"
import type { Metadata } from "next"
import { Scale } from "lucide-react"
import SignupForm from "@/components/signup-form"

export const metadata: Metadata = {
  title: "Sign Up | LegalLawDocs.com",
  description: "Create a new LegalLawDocs.com account",
}

export default function SignupPage() {
  return (
    <div className="container relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
        <div className="absolute inset-0 bg-primary" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <Scale className="mr-2 h-6 w-6" />
          LegalLawDocs.com
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              "Create professional-quality, legally compliant documents instantly with our AI-powered platform. Save
              thousands in legal fees with documents tailored to your specific business needs."
            </p>
          </blockquote>
        </div>
        <div className="relative z-20 mt-auto">
          <Image
            src="/placeholder.svg?height=400&width=500"
            alt="Legal documents illustration"
            width={500}
            height={400}
            className="rounded-md opacity-80"
          />
        </div>
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">Create an account</h1>
            <p className="text-sm text-muted-foreground">Enter your information to create your account</p>
          </div>
          <SignupForm />
          <p className="px-8 text-center text-sm text-muted-foreground">
            By clicking continue, you agree to our{" "}
            <Link href="/terms" className="underline underline-offset-4 hover:text-primary">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="underline underline-offset-4 hover:text-primary">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  )
}

