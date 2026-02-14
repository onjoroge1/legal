export function getStateWarnings(
  slug: string,
  state: string | undefined | null,
  intentId?: string | null
): string[] {
  if (!state) return []
  const warnings: string[] = []

  if (slug === "non_compete_agreement") {
    if (state === "California") {
      warnings.push("Non-compete clauses are generally not enforceable in California.")
    }
    if (state === "Washington") {
      warnings.push("Washington restricts non-competes; consider income thresholds and duration limits.")
    }
    if (state === "Colorado") {
      warnings.push("Colorado limits non-competes and requires advance notice.")
    }
  }

  if (slug === "employment_contract") {
    if (state === "California") {
      warnings.push("California prohibits non-competes; avoid restrictive covenants.")
    }
    if (state === "Illinois") {
      warnings.push("Illinois restricts non-competes for lower-wage employees.")
    }
  }

  if (slug === "residential_lease_agreement") {
    if (state === "California") {
      warnings.push("California has strict tenant protections; ensure compliance with local ordinances.")
    }
    if (state === "New York") {
      warnings.push("New York has rent stabilization rules in some jurisdictions.")
    }
  }

  if (slug === "power_of_attorney") {
    warnings.push("Some states require notarization and/or witnesses for Power of Attorney.")
  }

  if (slug === "last_will_testament") {
    warnings.push("Most states require witness signatures for wills; some require notarization.")
  }

  if (slug === "llc_operating_agreement") {
    warnings.push("State filing and publication requirements vary by state.")
  }

  if (slug === "purchase_agreement") {
    warnings.push("Certain states require specific disclosures for property or consumer sales.")
  }

  if (slug === "commercial_lease_agreement") {
    warnings.push("Commercial lease rules vary by state and municipality.")
  }

  if (slug === "service_agreement" && intentId === "retainer") {
    warnings.push("Some states require clear refund and scope terms for retainers.")
  }

  if (slug === "nda" && state === "California") {
    warnings.push("California restricts non-competes; avoid overly restrictive clauses.")
  }

  return warnings
}
