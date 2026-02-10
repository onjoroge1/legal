import { getUserSubscriptionInfo, type SubscriptionInfo } from "./subscription"

/**
 * Feature permissions based on subscription tier
 */
export interface FeaturePermissions {
  // Document generation
  canGenerateDocuments: boolean
  maxDocumentsPerMonth: number | null // null = unlimited
  canGenerateAdvancedDocuments: boolean
  
  // Templates
  canAccessBasicTemplates: boolean
  canAccessAdvancedTemplates: boolean
  canAccessAllTemplates: boolean
  
  // Document features
  canDownloadPDF: boolean
  canDownloadDOCX: boolean
  canDownloadBoth: boolean
  canPreviewDocuments: boolean
  canUseWatermarkedPreview: boolean
  
  // AI features
  canUseBasicAIReview: boolean
  canUsePriorityAIReview: boolean
  
  // Support
  hasCommunitySupport: boolean
  hasEmailSupport: boolean
  hasPrioritySupport: boolean
  
  // Collaboration
  canCollaborate: boolean
  canUseElectronicSignatures: boolean
  
  // Customization
  canUseBasicCustomization: boolean
  canUseAdvancedCustomization: boolean
  canUseCustomBranding: boolean
  
  // Document management
  canViewDocumentHistory: boolean
  canUseDocumentRevisionHistory: boolean
}

/**
 * Get feature permissions for a subscription tier
 */
export function getPermissionsForTier(tier: string): FeaturePermissions {
  switch (tier) {
    case "free":
      return {
        // Document generation
        canGenerateDocuments: false,
        maxDocumentsPerMonth: 0,
        canGenerateAdvancedDocuments: false,
        
        // Templates
        canAccessBasicTemplates: true,
        canAccessAdvancedTemplates: false,
        canAccessAllTemplates: false,
        
        // Document features
        canDownloadPDF: false,
        canDownloadDOCX: false,
        canDownloadBoth: false,
        canPreviewDocuments: true,
        canUseWatermarkedPreview: true,
        
        // AI features
        canUseBasicAIReview: false,
        canUsePriorityAIReview: false,
        
        // Support
        hasCommunitySupport: true,
        hasEmailSupport: false,
        hasPrioritySupport: false,
        
        // Collaboration
        canCollaborate: false,
        canUseElectronicSignatures: false,
        
        // Customization
        canUseBasicCustomization: false,
        canUseAdvancedCustomization: false,
        canUseCustomBranding: false,
        
        // Document management
        canViewDocumentHistory: false,
        canUseDocumentRevisionHistory: false,
      }
      
    case "starter":
      return {
        // Document generation
        canGenerateDocuments: true,
        maxDocumentsPerMonth: null, // Pay per document, no monthly limit
        canGenerateAdvancedDocuments: true,
        
        // Templates
        canAccessBasicTemplates: true,
        canAccessAdvancedTemplates: true,
        canAccessAllTemplates: true,
        
        // Document features
        canDownloadPDF: true,
        canDownloadDOCX: true,
        canDownloadBoth: true,
        canPreviewDocuments: true,
        canUseWatermarkedPreview: true,
        
        // AI features
        canUseBasicAIReview: true,
        canUsePriorityAIReview: false,
        
        // Support
        hasCommunitySupport: true,
        hasEmailSupport: true,
        hasPrioritySupport: false,
        
        // Collaboration
        canCollaborate: false,
        canUseElectronicSignatures: false,
        
        // Customization
        canUseBasicCustomization: true,
        canUseAdvancedCustomization: false,
        canUseCustomBranding: false,
        
        // Document management
        canViewDocumentHistory: true,
        canUseDocumentRevisionHistory: false,
      }
      
    case "professional":
      return {
        // Document generation
        canGenerateDocuments: true,
        maxDocumentsPerMonth: null, // Unlimited
        canGenerateAdvancedDocuments: true,
        
        // Templates
        canAccessBasicTemplates: true,
        canAccessAdvancedTemplates: true,
        canAccessAllTemplates: true,
        
        // Document features
        canDownloadPDF: true,
        canDownloadDOCX: true,
        canDownloadBoth: true,
        canPreviewDocuments: true,
        canUseWatermarkedPreview: false, // No watermark for subscribers
        
        // AI features
        canUseBasicAIReview: true,
        canUsePriorityAIReview: true,
        
        // Support
        hasCommunitySupport: true,
        hasEmailSupport: true,
        hasPrioritySupport: true,
        
        // Collaboration
        canCollaborate: true,
        canUseElectronicSignatures: true,
        
        // Customization
        canUseBasicCustomization: true,
        canUseAdvancedCustomization: true,
        canUseCustomBranding: true,
        
        // Document management
        canViewDocumentHistory: true,
        canUseDocumentRevisionHistory: true,
      }
      
    default:
      // Default to free tier permissions
      return getPermissionsForTier("free")
  }
}

/**
 * Get user's feature permissions
 */
export async function getUserPermissions(userEmail?: string): Promise<FeaturePermissions> {
  if (!userEmail) {
    return getPermissionsForTier("free")
  }
  
  const subscriptionInfo = await getUserSubscriptionInfo(userEmail)
  const tier = subscriptionInfo?.tier || "free"
  
  return getPermissionsForTier(tier)
}

/**
 * Check if user has permission for a specific feature
 */
export async function hasPermission(
  userEmail: string | undefined,
  permission: keyof FeaturePermissions
): Promise<boolean> {
  const permissions = await getUserPermissions(userEmail)
  return permissions[permission] === true
}

/**
 * Check if user can perform an action
 */
export async function canPerformAction(
  userEmail: string | undefined,
  action: "generate" | "download" | "preview" | "collaborate" | "customize" | "ai-review"
): Promise<boolean> {
  const permissions = await getUserPermissions(userEmail)
  
  switch (action) {
    case "generate":
      return permissions.canGenerateDocuments
    case "download":
      return permissions.canDownloadPDF || permissions.canDownloadDOCX
    case "preview":
      return permissions.canPreviewDocuments
    case "collaborate":
      return permissions.canCollaborate
    case "customize":
      return permissions.canUseBasicCustomization || permissions.canUseAdvancedCustomization
    case "ai-review":
      return permissions.canUseBasicAIReview || permissions.canUsePriorityAIReview
    default:
      return false
  }
}

/**
 * Check if user can access a template
 */
export async function canAccessTemplate(
  userEmail: string | undefined,
  templateType: "basic" | "advanced" | "all"
): Promise<boolean> {
  const permissions = await getUserPermissions(userEmail)
  
  switch (templateType) {
    case "basic":
      return permissions.canAccessBasicTemplates
    case "advanced":
      return permissions.canAccessAdvancedTemplates
    case "all":
      return permissions.canAccessAllTemplates
    default:
      return false
  }
}

/**
 * Get upgrade message for a feature
 */
export function getUpgradeMessage(feature: string, currentTier: string): string {
  if (currentTier === "free") {
    return `Upgrade to Starter plan ($9 per document) to ${feature}`
  } else if (currentTier === "starter") {
    return `Upgrade to Professional plan ($49/month) to ${feature}`
  }
  
  return `This feature requires a higher plan`
}

