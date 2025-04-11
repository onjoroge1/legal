import { LucideIcon, Briefcase, Scale, Building, Home, FileText, Users, Handshake, Heart, Car, GraduationCap, Gavel, ShieldCheck, Coins, ScrollText } from "lucide-react"

export interface Template {
  id: string
  name: string
  description: string
  type?: string
  category?: string
}

export interface TemplateCategory {
  id: string
  name: string
  description: string
  icon?: LucideIcon
  color?: string
  templates: Template[]
}

export const TEMPLATE_CATEGORIES: TemplateCategory[] = [
  {
    id: "business",
    name: "Business Formation",
    description: "Company formation, partnership agreements, and corporate documents",
    icon: Building,
    color: "text-green-500",
    templates: []
  },
  {
    id: "corporate",
    name: "Corporate Governance",
    description: "Board resolutions, bylaws, and corporate policies",
    icon: Gavel,
    color: "text-red-500",
    templates: []
  },
  {
    id: "cm9bh3u2e0000vbcg33mxuc64",
    name: "Employment & HR",
    description: "Employment contracts, offer letters, NDAs, and other HR documents",
    icon: Users,
    color: "text-blue-500",
    templates: []
  },
  {
    id: "cm9bh3u2s0001vbcg20r64fyg",
    name: "Family & Personal",
    description: "Wills, trusts, power of attorney, and family agreements",
    icon: Heart,
    color: "text-pink-500",
    templates: []
  },
  {
    id: "cm9bh3u330002vbcg4nkjeixo",
    name: "Real Estate",
    description: "Lease agreements, property contracts, and real estate documents",
    icon: Home,
    color: "text-purple-500",
    templates: []
  },
  {
    id: "cm9bh3u3i0003vbcgavmxb9vu",
    name: "Intellectual Property",
    description: "IP assignments, licensing agreements, and patents",
    icon: FileText,
    color: "text-yellow-500",
    templates: []
  },
  {
    id: "cm9bh3u3u0004vbcg1o3il5x1",
    name: "General Contracts",
    description: "Service agreements, sales contracts, and general business contracts",
    icon: Scale,
    color: "text-red-500",
    templates: []
  },
  {
    id: "cm9bh3u490005vbcg65wxaiyn",
    name: "Legal Services",
    description: "Attorney retainers, legal service agreements, and client contracts",
    icon: Gavel,
    color: "text-stone-500",
    templates: []
  },
  {
    id: "cm9bh3u4p0006vbcguz3txabw",
    name: "Privacy & Security",
    description: "Privacy policies, data protection, and security agreements",
    icon: ShieldCheck,
    color: "text-cyan-500",
    templates: []
  },
  {
    id: "cm9bh3u4w0007vbcgha5r77pu",
    name: "Financial & Investment",
    description: "Investment agreements, loans, and financial contracts",
    icon: Coins,
    color: "text-amber-500",
    templates: []
  },
  {
    id: "cm9bh3u580008vbcgdd4aqah0",
    name: "Education & Training",
    description: "Training agreements, student contracts, and education policies",
    icon: GraduationCap,
    color: "text-orange-500",
    templates: []
  },
  {
    id: "cm9bh3u5h0009vbcgofggn4w8",
    name: "Automotive & Transport",
    description: "Vehicle sales, leases, and transport agreements",
    icon: Car,
    color: "text-slate-500",
    templates: []
  }
] 