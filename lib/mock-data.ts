import type {
  Business,
  Conversation,
  Idea,
  Message,
  MetricPoint,
  Notification,
  Post,
} from './types'

export const currentBusiness: Business = {
  id: 'me',
  name: 'Sahara Logistics Co.',
  handle: '@saharalogistics',
  logo: '',
  cover: '',
  tier: 'Growing Startup',
  industry: 'Logistics & Supply Chain',
  country: 'Kenya',
  city: 'Nairobi',
  verified: true,
  tagline: 'Moving Africa forward, one shipment at a time.',
  about:
    'Sahara Logistics is a technology-driven freight and supply chain company connecting manufacturers, retailers and cross-border traders across East Africa.',
  employees: '51-200',
  founded: '2019',
  followers: 4820,
  connections: 312,
  services: ['Freight Forwarding', 'Warehousing', 'Last-mile Delivery', 'Customs Clearance'],
  openToPartnership: true,
}

export const businesses: Business[] = [
  {
    id: 'b1',
    name: 'Kola Fintech',
    handle: '@kolafintech',
    logo: '',
    cover: '',
    tier: 'Large Enterprise',
    industry: 'Financial Technology',
    country: 'Nigeria',
    city: 'Lagos',
    verified: true,
    tagline: 'Payments infrastructure for a borderless Africa.',
    about:
      'Kola Fintech builds the payment rails powering thousands of merchants and banks across West Africa, with expansion into cross-border settlements.',
    employees: '500-1000',
    founded: '2015',
    followers: 128400,
    connections: 1890,
    services: ['Payment Gateway', 'Cross-border Settlement', 'Merchant APIs', 'Fraud Protection'],
    matchScore: 96,
    openToPartnership: true,
    collaboration: [
      {
        type: 'Technology Integration',
        detail: 'Embed Kola payment rails directly into your logistics booking and settlement flow.',
      },
      {
        type: 'Market Expansion',
        detail: 'Co-enter 8 shared markets with a combined payments and delivery offering.',
      },
      {
        type: 'Shared Services',
        detail: 'Bundle escrow and cross-border settlement for mutual enterprise clients.',
      },
    ],
  },
  {
    id: 'b2',
    name: 'Zuri Health',
    handle: '@zurihealth',
    logo: '',
    cover: '',
    tier: 'Growing Startup',
    industry: 'HealthTech',
    country: 'Rwanda',
    city: 'Kigali',
    verified: true,
    tagline: 'Accessible healthcare for every community.',
    about:
      'Zuri Health delivers telemedicine, e-pharmacy and diagnostics to underserved communities through a mobile-first platform.',
    employees: '51-200',
    founded: '2020',
    followers: 34200,
    connections: 640,
    services: ['Telemedicine', 'E-Pharmacy', 'Diagnostics', 'Health Records'],
    matchScore: 91,
    openToPartnership: true,
    collaboration: [
      {
        type: 'Distribution',
        detail: 'Use your last-mile network to deliver e-pharmacy orders across East Africa.',
      },
      {
        type: 'Joint Project',
        detail: 'Launch a mobile diagnostics + delivery pilot in underserved regions.',
      },
      {
        type: 'Supply Chain',
        detail: 'Cold-chain transport for temperature-sensitive medical supplies.',
      },
    ],
  },
  {
    id: 'b3',
    name: 'Baobab Ventures',
    handle: '@baobabvc',
    logo: '',
    cover: '',
    tier: 'Institution',
    industry: 'Venture Capital',
    country: 'South Africa',
    city: 'Cape Town',
    verified: true,
    tagline: 'Backing Africa’s boldest founders.',
    about:
      'Baobab Ventures is an early-stage VC firm investing in African startups across fintech, logistics, climate and health.',
    employees: '11-50',
    founded: '2012',
    followers: 76500,
    connections: 2340,
    services: ['Seed Funding', 'Series A', 'Advisory', 'Market Access'],
    matchScore: 88,
    openToPartnership: true,
    collaboration: [
      {
        type: 'Joint Project',
        detail: 'Co-invest in logistics infrastructure across your operating corridors.',
      },
      {
        type: 'Market Expansion',
        detail: 'Access their portfolio network to enter new African markets faster.',
      },
      {
        type: 'Shared Services',
        detail: 'Shared advisory, legal and market-entry support for portfolio companies.',
      },
    ],
  },
  {
    id: 'b4',
    name: 'Accra Foods Group',
    handle: '@accrafoods',
    logo: '',
    cover: '',
    tier: 'Large Enterprise',
    industry: 'Agriculture & FMCG',
    country: 'Ghana',
    city: 'Accra',
    verified: true,
    tagline: 'From farm to continent.',
    about:
      'Accra Foods Group processes and distributes packaged foods sourced from a network of over 12,000 smallholder farmers.',
    employees: '1000+',
    founded: '2008',
    followers: 98700,
    connections: 1450,
    services: ['Food Processing', 'Distribution', 'Cold Chain', 'Export'],
    matchScore: 84,
    openToPartnership: false,
    collaboration: [
      {
        type: 'Supply Chain',
        detail: 'Manage cold-chain freight for their farm-to-market distribution network.',
      },
      {
        type: 'Distribution',
        detail: 'Extend their packaged-foods reach into Kenya and Uganda through your fleet.',
      },
      {
        type: 'Market Expansion',
        detail: 'Joint export logistics for FMCG goods into new regional markets.',
      },
    ],
  },
  {
    id: 'b5',
    name: 'Meridian Legal',
    handle: '@meridianlegal',
    logo: '',
    cover: '',
    tier: 'Institution',
    industry: 'Legal & Advisory',
    country: 'Egypt',
    city: 'Cairo',
    verified: true,
    tagline: 'Cross-border legal expertise for growing businesses.',
    about:
      'Meridian Legal advises companies on market entry, compliance and cross-border transactions across North Africa and the Gulf.',
    employees: '51-200',
    founded: '2011',
    followers: 21300,
    connections: 980,
    services: ['Corporate Law', 'Compliance', 'M&A', 'Trade Regulation'],
    matchScore: 79,
    openToPartnership: true,
    collaboration: [
      {
        type: 'Shared Services',
        detail: 'Outsourced compliance and trade-regulation support for your expansion.',
      },
      {
        type: 'Technology Integration',
        detail: 'Digitize cross-border contract workflows within your logistics platform.',
      },
      {
        type: 'Market Expansion',
        detail: 'Legal market-entry packages for each new country you scale into.',
      },
    ],
  },
  {
    id: 'b6',
    name: 'SolarNest',
    handle: '@solarnest',
    logo: '',
    cover: '',
    tier: 'Small Business',
    industry: 'Clean Energy',
    country: 'Tanzania',
    city: 'Dar es Salaam',
    verified: false,
    tagline: 'Powering homes and businesses with the sun.',
    about:
      'SolarNest installs and finances solar systems for small businesses and households across Tanzania.',
    employees: '11-50',
    founded: '2021',
    followers: 8600,
    connections: 210,
    services: ['Solar Installation', 'Energy Financing', 'Maintenance'],
    matchScore: 73,
    openToPartnership: true,
    collaboration: [
      {
        type: 'Joint Project',
        detail: 'Solar-power your warehouse network to cut energy costs by up to 40%.',
      },
      {
        type: 'Shared Services',
        detail: 'Energy-as-a-service financing bundled for businesses in your corridors.',
      },
      {
        type: 'Distribution',
        detail: 'Distribute solar kits to your last-mile partners across the region.',
      },
    ],
  },
  {
    id: 'b7',
    name: 'PalmTree Distributors',
    handle: '@palmtreedist',
    logo: '',
    cover: '',
    tier: 'Large Enterprise',
    industry: 'Distribution & Wholesale',
    country: 'Nigeria',
    city: 'Lagos',
    verified: true,
    tagline: 'Reliable FMCG distribution across West Africa.',
    about:
      'PalmTree Distributors moves fast-moving consumer goods from manufacturers to over 8,000 retail outlets across Nigeria, Ghana and Benin.',
    employees: '500-1000',
    founded: '2010',
    followers: 42300,
    connections: 1120,
    services: ['Wholesale Distribution', 'Retail Fulfilment', 'Merchandising', 'Route-to-Market'],
    matchScore: 82,
    openToPartnership: true,
    category: 'Distributor',
    trust: {
      score: 94,
      onTimeDelivery: 96,
      orderAccuracy: 98,
      disputeRate: 1.2,
      responseTime: '< 2 hrs',
      completedOrders: 18400,
      reviews: 1240,
      trackRecord: '6 yrs on KOLOB',
    },
    collaboration: [
      {
        type: 'Distribution',
        detail: 'Plug your products into their 8,000-outlet retail network overnight.',
      },
      {
        type: 'Supply Chain',
        detail: 'Shared warehousing and route-to-market across three countries.',
      },
    ],
  },
  {
    id: 'b8',
    name: 'Sahel Industrial Supply',
    handle: '@sahelsupply',
    logo: '',
    cover: '',
    tier: 'Growing Startup',
    industry: 'Industrial Vendors',
    country: 'Senegal',
    city: 'Dakar',
    verified: true,
    tagline: 'Certified vendor of industrial parts and equipment.',
    about:
      'Sahel Industrial Supply sources and supplies certified industrial components, safety equipment and spare parts to manufacturers and logistics firms.',
    employees: '51-200',
    founded: '2017',
    followers: 15800,
    connections: 430,
    services: ['Industrial Parts', 'Safety Equipment', 'Spare Parts', 'Bulk Procurement'],
    matchScore: 77,
    openToPartnership: true,
    category: 'Vendor',
    trust: {
      score: 88,
      onTimeDelivery: 91,
      orderAccuracy: 95,
      disputeRate: 2.4,
      responseTime: '< 4 hrs',
      completedOrders: 6200,
      reviews: 540,
      trackRecord: '4 yrs on KOLOB',
    },
    collaboration: [
      {
        type: 'Supply Chain',
        detail: 'Just-in-time supply of spare parts for your fleet and warehouses.',
      },
      {
        type: 'Shared Services',
        detail: 'Consolidated bulk procurement to lower your equipment costs.',
      },
    ],
  },
  {
    id: 'b9',
    name: 'Umoja Textiles Vendor',
    handle: '@umojatextiles',
    logo: '',
    cover: '',
    tier: 'Small Business',
    industry: 'Textile Vendors',
    country: 'Tanzania',
    city: 'Arusha',
    verified: false,
    tagline: 'Ethically sourced fabrics and finished garments.',
    about:
      'Umoja Textiles is a growing vendor supplying ethically sourced fabrics and finished garments to retailers and fashion brands across East Africa.',
    employees: '11-50',
    founded: '2020',
    followers: 6400,
    connections: 180,
    services: ['Fabric Supply', 'Garment Manufacturing', 'Custom Orders', 'Bulk Textiles'],
    matchScore: 68,
    openToPartnership: true,
    category: 'Vendor',
    trust: {
      score: 79,
      onTimeDelivery: 84,
      orderAccuracy: 90,
      disputeRate: 3.8,
      responseTime: '< 8 hrs',
      completedOrders: 1450,
      reviews: 210,
      trackRecord: '3 yrs on KOLOB',
    },
    collaboration: [
      {
        type: 'Distribution',
        detail: 'Distribute their fabrics to fashion retailers along your delivery routes.',
      },
      {
        type: 'Joint Project',
        detail: 'Co-develop a made-in-Africa garment line for regional markets.',
      },
    ],
  },
]

export function getBusiness(id: string): Business | undefined {
  if (id === 'me') return currentBusiness
  return businesses.find((b) => b.id === id)
}

export const posts: Post[] = [
  {
    id: 'p1',
    businessId: 'b1',
    createdAt: '2h',
    content:
      'We just processed our 1 billionth transaction. Huge thanks to the 12,000+ merchants across 8 countries who trust Kola to power their payments. Next stop: real-time cross-border settlement.',
    tag: 'Milestone',
    likes: 1240,
    comments: 86,
  },
  {
    id: 'p2',
    businessId: 'b3',
    createdAt: '5h',
    content:
      'Now accepting applications for our 2025 seed cohort. We are looking for founders solving hard problems in logistics, climate and healthcare. Applications close in 3 weeks.',
    tag: 'Opportunity',
    likes: 640,
    comments: 152,
  },
  {
    id: 'p3',
    businessId: 'b2',
    createdAt: '1d',
    content:
      'Excited to announce our partnership with three regional hospitals to bring remote diagnostics to over 200,000 patients. Collaboration is how we scale impact.',
    tag: 'Partnership',
    likes: 892,
    comments: 47,
  },
  {
    id: 'p4',
    businessId: 'b4',
    createdAt: '2d',
    content:
      'Looking for cold-chain logistics partners in East Africa to support our expansion into Kenya and Uganda. If that is you, let us connect.',
    tag: 'Looking for partners',
    likes: 415,
    comments: 63,
  },
]

export const notifications: Notification[] = [
  {
    id: 'n1',
    type: 'match',
    businessId: 'b1',
    title: 'New AI Match',
    body: 'Kola Fintech is a 96% match for your cross-border expansion goals.',
    time: '12m',
    unread: true,
  },
  {
    id: 'n2',
    type: 'connection',
    businessId: 'b3',
    title: 'Connection request',
    body: 'Baobab Ventures wants to connect with you.',
    time: '1h',
    unread: true,
  },
  {
    id: 'n3',
    type: 'like',
    businessId: 'b2',
    title: 'Zuri Health liked your update',
    body: '“Q3 expansion into Uganda is now live.”',
    time: '3h',
    unread: true,
  },
  {
    id: 'n4',
    type: 'message',
    businessId: 'b5',
    title: 'New message',
    body: 'Meridian Legal: Happy to review your cross-border contract.',
    time: '6h',
    unread: false,
  },
  {
    id: 'n5',
    type: 'system',
    title: 'Verification approved',
    body: 'Your business profile is now verified. You have full ecosystem access.',
    time: '1d',
    unread: false,
  },
]

export const conversations: Conversation[] = [
  {
    id: 'c1',
    businessId: 'b1',
    lastMessage: 'Let us set up a call to discuss the settlement integration.',
    time: '10:24',
    unread: 2,
    online: true,
  },
  {
    id: 'c2',
    businessId: 'b3',
    lastMessage: 'Your deck looks strong. Can you share your traction numbers?',
    time: '09:02',
    unread: 0,
    online: true,
  },
  {
    id: 'c3',
    businessId: 'b5',
    lastMessage: 'Happy to review your cross-border contract this week.',
    time: 'Yesterday',
    unread: 0,
    online: false,
  },
  {
    id: 'c4',
    businessId: 'b4',
    lastMessage: 'Thanks for connecting. Are you covering the Mombasa corridor?',
    time: 'Mon',
    unread: 0,
    online: false,
  },
]

export const messagesByConversation: Record<string, Message[]> = {
  c1: [
    { id: 'm1', fromMe: false, text: 'Hi Sahara team, great to connect!', time: '10:02' },
    {
      id: 'm2',
      fromMe: false,
      text: 'We saw you handle cross-border freight in East Africa. We are expanding settlements there.',
      time: '10:03',
    },
    {
      id: 'm3',
      fromMe: true,
      text: 'Absolutely. We move freight across Kenya, Uganda and Tanzania daily.',
      time: '10:15',
    },
    { id: 'm4', fromMe: true, text: 'A payments partnership could be a great fit.', time: '10:16' },
    {
      id: 'm5',
      fromMe: false,
      text: 'Let us set up a call to discuss the settlement integration.',
      time: '10:24',
    },
  ],
  c2: [
    { id: 'm1', fromMe: false, text: 'Loved your application to the seed cohort.', time: '08:40' },
    { id: 'm2', fromMe: true, text: 'Thank you! We are excited about the opportunity.', time: '08:55' },
    {
      id: 'm3',
      fromMe: false,
      text: 'Your deck looks strong. Can you share your traction numbers?',
      time: '09:02',
    },
  ],
  c3: [
    {
      id: 'm1',
      fromMe: true,
      text: 'Hi, we need help reviewing a cross-border logistics contract.',
      time: 'Yesterday',
    },
    {
      id: 'm2',
      fromMe: false,
      text: 'Happy to review your cross-border contract this week.',
      time: 'Yesterday',
    },
  ],
  c4: [
    {
      id: 'm1',
      fromMe: false,
      text: 'Thanks for connecting. Are you covering the Mombasa corridor?',
      time: 'Mon',
    },
  ],
}

export const ideas: Idea[] = [
  {
    id: 'i1',
    businessId: 'b6',
    title: 'Shared solar micro-grids for market clusters',
    region: 'East Africa',
    summary:
      'A collective financing model where clusters of small businesses share a solar micro-grid, cutting energy costs by up to 40%.',
    category: 'Clean Energy',
    backers: 48,
  },
  {
    id: 'i2',
    businessId: 'b2',
    title: 'Cross-border digital health records',
    region: 'Pan-African',
    summary:
      'An interoperable health record standard so patients keep their records when they move between countries.',
    category: 'HealthTech',
    backers: 132,
  },
  {
    id: 'i3',
    businessId: 'b4',
    title: 'Cold-chain sharing network for perishables',
    region: 'West & East Africa',
    summary:
      'A shared cold-chain logistics network letting food producers book refrigerated capacity on demand.',
    category: 'Logistics',
    backers: 87,
  },
]

export const visibilityData: MetricPoint[] = [
  { label: 'Mon', value: 320 },
  { label: 'Tue', value: 410 },
  { label: 'Wed', value: 380 },
  { label: 'Thu', value: 560 },
  { label: 'Fri', value: 720 },
  { label: 'Sat', value: 640 },
  { label: 'Sun', value: 810 },
]

export const industries = [
  'All',
  'Financial Technology',
  'Logistics & Supply Chain',
  'HealthTech',
  'Agriculture & FMCG',
  'Clean Energy',
  'Venture Capital',
  'Legal & Advisory',
  'Distribution & Wholesale',
  'Industrial Vendors',
  'Textile Vendors',
]

/** Vendors and distributors — the only profiles with a trust score. */
export const vendorsAndDistributors = businesses.filter((b) => b.category)

export const marketInsights = [
  {
    id: 'mi1',
    title: 'AfCFTA cuts tariffs on 90% of goods',
    region: 'Continental',
    trend: 'up',
    detail: 'Cross-border trade volume expected to rise 15% across member states this year.',
  },
  {
    id: 'mi2',
    title: 'Fintech funding rebounds in West Africa',
    region: 'West Africa',
    trend: 'up',
    detail: 'Q2 saw $340M raised across 28 deals, led by payments and lending.',
  },
  {
    id: 'mi3',
    title: 'New data protection rules in East Africa',
    region: 'East Africa',
    trend: 'neutral',
    detail: 'Businesses handling customer data must register with local authorities by year end.',
  },
]
