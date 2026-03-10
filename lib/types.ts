// Tool types
export interface Tool {
  slug: string
  name: string
  description: string
  longDescription?: string
  icon: string
  tags: string[]
  badge?: "FREE" | "BETA" | "NEW" | "PRO"
  href: string
  available: boolean
}

// Blog types
export interface BlogPost {
  id: string
  slug: string
  title: string
  excerpt: string
  content?: string
  coverImage?: string
  category: BlogCategory
  tags: string[]
  authorId: string
  status: "draft" | "published"
  publishedAt?: string
  readingTime?: number
  views?: number
  createdAt: string
  updatedAt: string
}

export type BlogCategory =
  | "tutorials"
  | "tips"
  | "use-cases"
  | "news"
  | "tools"

export interface Author {
  id: string
  username: string
  displayName: string
  avatarUrl?: string
  bio?: string
  website?: string
  twitter?: string
}

// Marketplace types (Phase 3)
export interface MarketplaceTemplate {
  id: string
  sellerId: string
  title: string
  slug: string
  description: string
  previewImage?: string
  priceCents: number
  category: string
  appsUsed: string[]
  downloads: number
  status: "pending" | "approved" | "rejected"
  createdAt: string
}

// Navigation types
export interface NavItem {
  label: string
  href: string
  description?: string
  icon?: string
  disabled?: boolean
}

export interface NavSection {
  label: string
  items: NavItem[]
}
