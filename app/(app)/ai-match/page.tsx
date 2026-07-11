'use client'

import { AnimatePresence, motion } from 'motion/react'
import { Building2, Check, MapPin, Sparkles, X } from 'lucide-react'
import { useMemo, useState } from 'react'
import { AppHeader } from '@/components/app-header'
import { BrandAvatar } from '@/components/brand-avatar'
import { CollaborationList } from '@/components/collaboration-list'
import { TrustBadge } from '@/components/trust-score'
import { EmptyState, TierBadge, VerifiedTick } from '@/components/ui-bits'
import { useToast } from '@/components/toast'
import { businesses } from '@/lib/mock-data'
import { Handshake } from 'lucide-react'

const reasons: Record<string, string[]> = {
  b1: [
    'Complements your cross-border logistics with payment rails',
    'Active in 8 markets you are expanding into',
    'Open to partnership and settlement integrations',
  ],
  b2: [
    'Shared focus on underserved East African markets',
    'Potential logistics partner for e-pharmacy delivery',
    'Similar company stage and growth trajectory',
  ],
  b3: [
    'Actively backing logistics and climate startups',
    'Seed cohort open now — matches your funding stage',
    'Strong network across your target regions',
  ],
  b4: [
    'Needs cold-chain logistics in East Africa — your specialty',
    'Established distribution you can plug into',
    'Explicitly looking for logistics partners',
  ],
  b5: [
    'Cross-border legal expertise for your expansion',
    'Supports trade regulation and compliance',
    'Advisory fit for market-entry contracts',
  ],
  b6: [
    'Energy-cost savings for your warehouse network',
    'Growing regional footprint in your corridors',
    'Open to B2B financing partnerships',
  ],
}

export default function MatchPage() {
  const ranked = useMemo(
    () => [...businesses].sort((a, b) => (b.matchScore ?? 0) - (a.matchScore ?? 0)),
    [],
  )
  const [index, setIndex] = useState(0)
  const [saved, setSaved] = useState(0)
  const toast = useToast()

  const current = ranked[index]

  function advance(pass: boolean, name: string) {
    if (pass) {
      setSaved((s) => s + 1)
      toast(`Saved ${name} to your matches`)
    } else {
      toast('Skipped', 'info')
    }
    setIndex((i) => i + 1)
  }

  return (
    <div className="flex min-h-full flex-col">
      <AppHeader
        title="AI Match"
        subtitle="Curated partners for your goals"
        right={
          <span className="flex items-center gap-1 rounded-full bg-primary/15 px-2.5 py-1 text-xs font-semibold text-primary">
            <Sparkles className="h-3.5 w-3.5" /> {saved} saved
          </span>
        }
      />

      <div className="relative flex flex-1 flex-col px-4 pb-6 pt-4">
        {current ? (
          <>
            <p className="mb-4 text-center text-[13px] text-muted-foreground">
              Based on your profile as a logistics company expanding across East Africa
            </p>
            <div className="relative flex-1">
              <AnimatePresence>
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, scale: 0.94, y: 24 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, x: -40 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 28 }}
                  className="flex flex-col overflow-hidden rounded-3xl border border-border bg-card"
                >
                  <div className="relative flex flex-col items-center bg-gradient-to-b from-primary/15 to-transparent px-6 pb-5 pt-8">
                    <span className="absolute right-4 top-4 flex flex-col items-center rounded-2xl bg-primary px-3 py-1.5 text-primary-foreground">
                      <span className="font-display text-lg font-bold leading-none">
                        {current.matchScore}%
                      </span>
                      <span className="text-[9px] font-semibold uppercase tracking-wide">
                        match
                      </span>
                    </span>
                    <BrandAvatar
                      name={current.name}
                      seed={current.id}
                      className="h-20 w-20 text-2xl"
                    />
                    <div className="mt-3 flex items-center gap-1">
                      <h2 className="font-display text-xl font-bold">{current.name}</h2>
                      {current.verified ? <VerifiedTick className="h-5 w-5" /> : null}
                    </div>
                    <p className="text-sm text-muted-foreground">{current.industry}</p>
                    <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3" /> {current.city}, {current.country}
                    </div>
                    <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
                      <TierBadge tier={current.tier} />
                      {current.category ? (
                        <span className="rounded-full bg-accent/15 px-2.5 py-0.5 text-[11px] font-semibold text-accent">
                          {current.category}
                        </span>
                      ) : null}
                    </div>
                    {current.trust ? (
                      <div className="mt-3 w-full">
                        <TrustBadge score={current.trust.score} />
                      </div>
                    ) : null}
                  </div>

                  <div className="px-6 pb-6">
                    <p className="text-center text-[13px] leading-relaxed text-foreground">
                      {current.tagline}
                    </p>

                    <div className="mt-5 rounded-2xl bg-secondary/50 p-4">
                      <h3 className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-primary">
                        <Sparkles className="h-3.5 w-3.5" /> Why KOLOB matched you
                      </h3>
                      <ul className="space-y-2">
                        {(reasons[current.id] ?? []).map((r) => (
                          <li key={r} className="flex items-start gap-2 text-[13px] leading-snug">
                            <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                            <span>{r}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {current.collaboration && current.collaboration.length > 0 ? (
                      <div className="mt-4">
                        <h3 className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-accent">
                          <Handshake className="h-3.5 w-3.5" /> Ways to collaborate
                        </h3>
                        <CollaborationList items={current.collaboration.slice(0, 2)} />
                      </div>
                    ) : null}

                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {current.services.slice(0, 4).map((s) => (
                        <span
                          key={s}
                          className="rounded-full bg-secondary px-2.5 py-1 text-[11px] font-medium text-secondary-foreground"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="mt-5 flex items-center justify-center gap-5">
              <button
                onClick={() => advance(false, current.name)}
                aria-label="Skip"
                className="flex h-14 w-14 items-center justify-center rounded-full border border-border bg-card text-muted-foreground active:scale-90"
              >
                <X className="h-6 w-6" />
              </button>
              <button
                onClick={() => advance(true, current.name)}
                aria-label="Save match"
                className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/30 active:scale-90"
              >
                <Check className="h-7 w-7" />
              </button>
            </div>
          </>
        ) : (
          <div className="flex flex-1 items-center justify-center">
            <EmptyState
              icon={<Building2 className="h-7 w-7" />}
              title="You are all caught up"
              description="We will surface new matches as businesses join and your goals evolve."
              action={
                <button
                  onClick={() => {
                    setIndex(0)
                    setSaved(0)
                  }}
                  className="rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground active:scale-95"
                >
                  Review again
                </button>
              }
            />
          </div>
        )}
      </div>
    </div>
  )
}
