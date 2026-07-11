export type BusinessTier = 'Small Business' | 'Growing Startup' | 'Large Enterprise' | 'Institution'

/** Only Vendors and Distributors carry a trust/performance score. */
export type BusinessCategory = 'Vendor' | 'Distributor'

export interface TrustProfile {
  /** Overall performance & trust score, 0-100. */
  score: number
  onTimeDelivery: number
  orderAccuracy: number
  disputeRate: number
  responseTime: string
  completedOrders: number
  reviews: number
  /** How long they have been building their track record on KOLOB. */
  trackRecord: string
}

export type CollaborationType =
  | 'Joint Project'
  | 'Supply Chain'
  | 'Distribution'
  | 'Technology Integration'
  | 'Market Expansion'
  | 'Shared Services'

export interface CollaborationArea {
  type: CollaborationType
  detail: string
}

export interface Business {
  id: string
  name: string
  handle: string
  logo: string
  cover: string
  tier: BusinessTier
  industry: string
  country: string
  city: string
  verified: boolean
  tagline: string
  about: string
  employees: string
  founded: string
  followers: number
  connections: number
  services: string[]
  matchScore?: number
  openToPartnership: boolean
  /** Present only for vendor/distributor profiles. */
  category?: BusinessCategory
  /** Trust scoring — only populated for vendors & distributors. */
  trust?: TrustProfile
  /** Potential ways KOLOB businesses can collaborate with this one. */
  collaboration?: CollaborationArea[]
}

export interface Post {
  id: string
  businessId: string
  createdAt: string
  content: string
  image?: string
  tag?: string
  likes: number
  comments: number
  liked?: boolean
}

export interface Notification {
  id: string
  type: 'connection' | 'message' | 'like' | 'match' | 'system'
  businessId?: string
  title: string
  body: string
  time: string
  unread: boolean
}

export interface Conversation {
  id: string
  businessId: string
  lastMessage: string
  time: string
  unread: number
  online: boolean
}

export interface Message {
  id: string
  fromMe: boolean
  text: string
  time: string
}

export interface Idea {
  id: string
  businessId: string
  title: string
  region: string
  summary: string
  category: string
  backers: number
}

export interface MetricPoint {
  label: string
  value: number
}
