import { Briefcase, Building2, CalendarDays, Handshake, MapPin, MessageSquare, Store, Users } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { BrandAvatar } from '@/components/brand-avatar'
import { CollaborationList } from '@/components/collaboration-list'
import { ConnectButton, FollowButton } from '@/components/connect-button'
import { PostCard } from '@/components/post-card'
import { RequestServicesButton } from '@/components/request-services'
import { TrustPanel } from '@/components/trust-score'
import { AppHeader } from '@/components/app-header'
import { SectionTitle, TierBadge, VerifiedTick, formatCount } from '@/components/ui-bits'
import { getBusiness, posts } from '@/lib/mock-data'

export default async function BusinessProfilePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const business = getBusiness(id)
  if (!business) notFound()

  const businessPosts = posts.filter((p) => p.businessId === id)

  const stats = [
    { icon: Users, label: 'Followers', value: formatCount(business.followers) },
    { icon: Briefcase, label: 'Connections', value: formatCount(business.connections) },
    { icon: Building2, label: 'Team', value: business.employees },
    { icon: CalendarDays, label: 'Founded', value: business.founded },
  ]

  return (
    <div className="pb-8">
      <AppHeader title={business.name} back />

      {/* Cover */}
      <div className="relative h-28 bg-gradient-to-br from-primary/30 via-card to-accent/20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,oklch(0.74_0.15_162/0.25),transparent_60%)]" />
      </div>

      <div className="px-4">
        <div className="-mt-10 flex items-end justify-between">
          <BrandAvatar
            name={business.name}
            seed={business.id}
            className="h-20 w-20 rounded-3xl text-2xl ring-4 ring-background"
          />
          <div className="mb-1 flex items-center gap-2">
            <FollowButton name={business.name} />
            <ConnectButton name={business.name} />
          </div>
        </div>

        <div className="mt-3 flex items-center gap-1.5">
          <h1 className="font-display text-xl font-bold tracking-tight">{business.name}</h1>
          {business.verified ? <VerifiedTick className="h-5 w-5" /> : null}
        </div>
        <p className="text-sm text-muted-foreground">{business.handle}</p>

        <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
          <TierBadge tier={business.tier} />
          {business.category ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-accent/15 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-accent">
              <Store className="h-3 w-3" /> {business.category}
            </span>
          ) : null}
          <span className="flex items-center gap-1">
            <Briefcase className="h-3.5 w-3.5" /> {business.industry}
          </span>
          <span className="flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5" /> {business.city}, {business.country}
          </span>
        </div>

        <p className="mt-3 text-pretty text-sm leading-relaxed text-foreground">{business.tagline}</p>

        <div className="mt-4 grid grid-cols-2 gap-2">
          <Link
            href="/network"
            className="flex items-center justify-center gap-2 rounded-2xl border border-border bg-card py-3 text-sm font-semibold active:scale-[0.98]"
          >
            <MessageSquare className="h-4 w-4" /> Message
          </Link>
          <RequestServicesButton business={business} />
        </div>

        {/* Stats */}
        <div className="mt-4 grid grid-cols-4 gap-2">
          {stats.map((s) => (
            <div
              key={s.label}
              className="flex flex-col items-center rounded-2xl border border-border bg-card px-1 py-3"
            >
              <s.icon className="h-4 w-4 text-primary" />
              <span className="mt-1.5 font-display text-sm font-bold">{s.value}</span>
              <span className="text-[10px] text-muted-foreground">{s.label}</span>
            </div>
          ))}
        </div>

        {/* Trust & Performance — vendors & distributors only */}
        {business.trust ? (
          <div className="mt-6">
            <SectionTitle title="Trust & Performance" />
            <TrustPanel trust={business.trust} />
          </div>
        ) : null}

        {/* About */}
        <div className="mt-6">
          <SectionTitle title="About" />
          <p className="text-[13px] leading-relaxed text-muted-foreground">{business.about}</p>
        </div>

        {/* Services */}
        <div className="mt-6">
          <SectionTitle title="Services" />
          <div className="flex flex-wrap gap-2">
            {business.services.map((s) => (
              <span
                key={s}
                className="rounded-full border border-border bg-card px-3 py-1.5 text-[13px] font-medium text-foreground"
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* Collaboration opportunities */}
        {business.collaboration && business.collaboration.length > 0 ? (
          <div className="mt-6">
            <SectionTitle
              title="Ways to collaborate"
              action={<Handshake className="h-4 w-4 text-accent" />}
            />
            <CollaborationList items={business.collaboration} />
          </div>
        ) : null}

        {business.openToPartnership ? (
          <div className="mt-6 rounded-2xl border border-primary/30 bg-primary/10 p-4">
            <p className="font-display text-sm font-semibold text-primary">Open to partnerships</p>
            <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">
              This business is actively seeking collaborations and partnership opportunities.
            </p>
          </div>
        ) : null}

        {/* Posts */}
        {businessPosts.length > 0 ? (
          <div className="mt-6">
            <SectionTitle title="Recent updates" />
            <div className="flex flex-col gap-3">
              {businessPosts.map((p) => (
                <PostCard key={p.id} post={p} />
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}
