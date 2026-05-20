"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Loader2 } from "lucide-react"

const PRACTICE_AREAS = [
  { slug: "business-contracts", label: "Business Contracts" },
  { slug: "intellectual-property", label: "Intellectual Property" },
  { slug: "startups", label: "Startups" },
  { slug: "real-estate", label: "Real Estate" },
  { slug: "landlord-tenant", label: "Landlord-Tenant" },
  { slug: "property-management", label: "Property Management" },
  { slug: "estate-planning", label: "Estate Planning" },
  { slug: "elder-law", label: "Elder Law" },
  { slug: "probate", label: "Probate" },
  { slug: "employment-law", label: "Employment Law" },
  { slug: "litigation", label: "Litigation" },
  { slug: "collections", label: "Collections" },
  { slug: "banking-finance", label: "Banking & Finance" },
  { slug: "consumer-protection", label: "Consumer Protection" },
  { slug: "personal-injury", label: "Personal Injury" },
  { slug: "immigration", label: "Immigration" },
  { slug: "family-law", label: "Family Law" },
]

const US_STATES = [
  "AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA",
  "HI","ID","IL","IN","IA","KS","KY","LA","ME","MD",
  "MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ",
  "NM","NY","NC","ND","OH","OK","OR","PA","RI","SC",
  "SD","TN","TX","UT","VT","VA","WA","WV","WI","WY",
]

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
}

interface LawyerFormData {
  name: string
  slug: string
  email: string
  phone: string
  tagline: string
  bio: string
  firmName: string
  photoUrl: string
  websiteUrl: string
  city: string
  stateAbbr: string
  practiceAreas: string[]
  licensedStates: string[]
  yearsExperience: string
  featured: boolean
  verified: boolean
  active: boolean
  tier: string
}

interface LawyerFormProps {
  initialData?: Partial<LawyerFormData>
  lawyerId?: string
}

const defaultData: LawyerFormData = {
  name: "",
  slug: "",
  email: "",
  phone: "",
  tagline: "",
  bio: "",
  firmName: "",
  photoUrl: "",
  websiteUrl: "",
  city: "",
  stateAbbr: "",
  practiceAreas: [],
  licensedStates: [],
  yearsExperience: "",
  featured: false,
  verified: false,
  active: true,
  tier: "basic",
}

export default function LawyerForm({ initialData, lawyerId }: LawyerFormProps) {
  const router = useRouter()
  const [form, setForm] = useState<LawyerFormData>({
    ...defaultData,
    ...initialData,
  })
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(!!lawyerId)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Auto-generate slug from name (only when not manually edited and in create mode)
  useEffect(() => {
    if (!slugManuallyEdited && !lawyerId) {
      setForm((prev) => ({ ...prev, slug: slugify(prev.name) }))
    }
  }, [form.name, slugManuallyEdited, lawyerId])

  function set<K extends keyof LawyerFormData>(key: K, value: LawyerFormData[K]) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  function toggleArrayItem(key: "practiceAreas" | "licensedStates", item: string) {
    setForm((prev) => {
      const arr = prev[key]
      return {
        ...prev,
        [key]: arr.includes(item) ? arr.filter((v) => v !== item) : [...arr, item],
      }
    })
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    setError(null)

    const payload = {
      ...form,
      yearsExperience: form.yearsExperience ? parseInt(form.yearsExperience, 10) : null,
      phone: form.phone || null,
      tagline: form.tagline || null,
      firmName: form.firmName || null,
      photoUrl: form.photoUrl || null,
      websiteUrl: form.websiteUrl || null,
      city: form.city || null,
      stateAbbr: form.stateAbbr || null,
    }

    try {
      const url = lawyerId ? `/api/admin/lawyers/${lawyerId}` : "/api/admin/lawyers"
      const method = lawyerId ? "PATCH" : "POST"

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        setError(data.error ?? "An error occurred. Please try again.")
        return
      }

      router.push("/admin/lawyers")
      router.refresh()
    } catch {
      setError("Network error. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {error && (
        <div className="rounded-md border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}

      {/* Basic info */}
      <section className="space-y-4">
        <h2 className="text-base font-semibold">Basic Information</h2>
        <Separator />
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="name">
              Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="name"
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
              placeholder="Jane Smith"
              required
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="slug">
              Slug <span className="text-destructive">*</span>
            </Label>
            <Input
              id="slug"
              value={form.slug}
              onChange={(e) => {
                setSlugManuallyEdited(true)
                set("slug", e.target.value)
              }}
              placeholder="jane-smith"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="email">
              Email <span className="text-destructive">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              value={form.email}
              onChange={(e) => set("email", e.target.value)}
              placeholder="jane@example.com"
              required
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              type="tel"
              value={form.phone}
              onChange={(e) => set("phone", e.target.value)}
              placeholder="(555) 555-5555"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="tagline">Tagline</Label>
          <Input
            id="tagline"
            value={form.tagline}
            onChange={(e) => set("tagline", e.target.value)}
            placeholder="Experienced business attorney serving startups"
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="bio">
            Bio <span className="text-destructive">*</span>
          </Label>
          <Textarea
            id="bio"
            value={form.bio}
            onChange={(e) => set("bio", e.target.value)}
            placeholder="Attorney biography…"
            className="min-h-[120px] resize-y"
            required
          />
        </div>
      </section>

      {/* Firm & web */}
      <section className="space-y-4">
        <h2 className="text-base font-semibold">Firm & Web</h2>
        <Separator />
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="firmName">Firm Name</Label>
            <Input
              id="firmName"
              value={form.firmName}
              onChange={(e) => set("firmName", e.target.value)}
              placeholder="Smith & Associates"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="websiteUrl">Website URL</Label>
            <Input
              id="websiteUrl"
              type="url"
              value={form.websiteUrl}
              onChange={(e) => set("websiteUrl", e.target.value)}
              placeholder="https://smithlaw.com"
            />
          </div>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="photoUrl">Photo URL</Label>
          <Input
            id="photoUrl"
            type="url"
            value={form.photoUrl}
            onChange={(e) => set("photoUrl", e.target.value)}
            placeholder="https://cdn.example.com/photo.jpg"
          />
        </div>
      </section>

      {/* Location */}
      <section className="space-y-4">
        <h2 className="text-base font-semibold">Location & Experience</h2>
        <Separator />
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              value={form.city}
              onChange={(e) => set("city", e.target.value)}
              placeholder="San Francisco"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="stateAbbr">State</Label>
            <Select value={form.stateAbbr} onValueChange={(v) => set("stateAbbr", v)}>
              <SelectTrigger id="stateAbbr">
                <SelectValue placeholder="Select state" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">— None —</SelectItem>
                {US_STATES.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="yearsExperience">Years of Experience</Label>
            <Input
              id="yearsExperience"
              type="number"
              min={0}
              max={70}
              value={form.yearsExperience}
              onChange={(e) => set("yearsExperience", e.target.value)}
              placeholder="10"
            />
          </div>
        </div>
      </section>

      {/* Practice areas */}
      <section className="space-y-4">
        <h2 className="text-base font-semibold">Practice Areas</h2>
        <Separator />
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          {PRACTICE_AREAS.map((area) => (
            <label
              key={area.slug}
              className="flex items-center gap-2 cursor-pointer text-sm"
            >
              <Checkbox
                checked={form.practiceAreas.includes(area.slug)}
                onCheckedChange={() => toggleArrayItem("practiceAreas", area.slug)}
              />
              {area.label}
            </label>
          ))}
        </div>
      </section>

      {/* Licensed states */}
      <section className="space-y-4">
        <h2 className="text-base font-semibold">Licensed States</h2>
        <Separator />
        <div className="grid grid-cols-5 sm:grid-cols-8 gap-2">
          {US_STATES.map((state) => (
            <label
              key={state}
              className="flex items-center gap-1.5 cursor-pointer text-sm"
            >
              <Checkbox
                checked={form.licensedStates.includes(state)}
                onCheckedChange={() => toggleArrayItem("licensedStates", state)}
              />
              {state}
            </label>
          ))}
        </div>
      </section>

      {/* Listing settings */}
      <section className="space-y-4">
        <h2 className="text-base font-semibold">Listing Settings</h2>
        <Separator />
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="tier">Tier</Label>
            <Select value={form.tier} onValueChange={(v) => set("tier", v)}>
              <SelectTrigger id="tier">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="basic">Basic</SelectItem>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="premium">Premium</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex flex-wrap gap-6 pt-1">
          <label className="flex items-center gap-2 cursor-pointer text-sm">
            <Checkbox
              checked={form.featured}
              onCheckedChange={(checked) => set("featured", !!checked)}
            />
            Featured
          </label>
          <label className="flex items-center gap-2 cursor-pointer text-sm">
            <Checkbox
              checked={form.verified}
              onCheckedChange={(checked) => set("verified", !!checked)}
            />
            Verified
          </label>
          <label className="flex items-center gap-2 cursor-pointer text-sm">
            <Checkbox
              checked={form.active}
              onCheckedChange={(checked) => set("active", !!checked)}
            />
            Active
          </label>
        </div>
      </section>

      {/* Actions */}
      <div className="flex items-center gap-3 pt-2">
        <Button type="submit" disabled={submitting}>
          {submitting && <Loader2 className="h-4 w-4 mr-1.5 animate-spin" />}
          {lawyerId ? "Save Changes" : "Create Listing"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/admin/lawyers")}
          disabled={submitting}
        >
          Cancel
        </Button>
      </div>
    </form>
  )
}
