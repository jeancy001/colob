export type BusinessTier = 'Small Business' | 'Growing Startup' | 'Large Enterprise' | 'Institution'

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
