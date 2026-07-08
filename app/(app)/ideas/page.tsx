'use client'

import { motion } from 'motion/react'
import { Lightbulb, MapPin, Plus, TrendingUp, Users, X } from 'lucide-react'
import { useState } from 'react'
import { AppHeader } from '@/components/app-header'
import { BrandAvatar } from '@/components/brand-avatar'
import { Chip, SectionTitle, formatCount } from '@/components/ui-bits'
import { useToast } from '@/components/toast'
import { getBusiness, ideas as seedIdeas, marketInsights } from '@/lib/mock-data'
import type { Idea } from '@/lib/types'

const categories = ['All', 'Clean Energy', 'HealthTech', 'Logistics', 'FinTech']

export default function IdeasPage() {
  const [ideas, setIdeas] = useState<Idea[]>(seedIdeas)
  const [category, setCategory] = useState('All')
  const [backed, setBacked] = useState<Record<string, boolean>>({})
  const [composerOpen, setComposerOpen] = useState(false)
  const toast = useToast()

  const filtered =
    category === 'All' ? ideas : ideas.filter((i) => i.category === category)

  function toggleBack(id: string) {
    setBacked((b) => ({ ...b, [id]: !b[id] }))
    setIdeas((list) =>
      list.map((i) =>
        i.id === id ? { ...i, backers: i.backers + (backed[id] ? -1 : 1) } : i,
      ),
    )
    toast(backed[id] ? 'Support withdrawn' : 'You are backing this idea', backed[id] ? 'info' : 'success')
  }

  return (
    <div className="min-h-full">
      <AppHeader
        title="Ideas Hub"
        subtitle="Collaborate on what's next"
        right={
          <button
            onClick={() => setComposerOpen(true)}
            aria-label="Share an idea"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground active:scale-95"
          >
            <Plus className="h-5 w-5" />
          </button>
        }
      />

      <div className="px-4 py-4">
        <div className="rounded-2xl border border-accent/25 bg-accent/10 p-4">
          <h2 className="flex items-center gap-1.5 font-display text-sm font-semibold text-accent">
            <TrendingUp className="h-4 w-4" /> Market Insights
          </h2>
          <div className="mt-3 space-y-3">
            {marketInsights.map((m) => (
              <div key={m.id} className="flex items-start gap-2.5">
                <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-accent/20 text-accent">
                  <TrendingUp className="h-3.5 w-3.5" />
                </div>
                <div>
                  <p className="text-[13px] font-medium leading-snug">{m.title}</p>
                  <p className="text-xs leading-snug text-muted-foreground">{m.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mb-1 flex gap-2 overflow-x-auto px-4 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {categories.map((c) => (
          <Chip key={c} active={category === c} onClick={() => setCategory(c)}>
            {c}
          </Chip>
        ))}
      </div>

      <div className="px-4 pb-6 pt-2">
        <SectionTitle title="Open Collaborations" />
        <div className="space-y-3">
          {filtered.map((idea, i) => {
            const owner = getBusiness(idea.businessId)
            const isBacked = backed[idea.id]
            return (
              <motion.article
                key={idea.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="rounded-2xl border border-border bg-card p-4"
              >
                <div className="flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary/15 text-primary">
                    <Lightbulb className="h-4 w-4" />
                  </span>
                  <span className="rounded-full bg-secondary px-2.5 py-0.5 text-[11px] font-semibold text-secondary-foreground">
                    {idea.category}
                  </span>
                  <span className="ml-auto flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin className="h-3 w-3" /> {idea.region}
                  </span>
                </div>

                <h3 className="mt-3 font-display text-[15px] font-semibold leading-snug text-balance">
                  {idea.title}
                </h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground">
                  {idea.summary}
                </p>

                {owner ? (
                  <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                    <BrandAvatar name={owner.name} seed={owner.id} className="h-6 w-6 text-[10px]" />
                    Proposed by {owner.name}
                  </div>
                ) : null}

                <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
                  <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Users className="h-3.5 w-3.5" />
                    {formatCount(idea.backers)} backing
                  </span>
                  <button
                    onClick={() => toggleBack(idea.id)}
                    className={`rounded-xl px-4 py-2 text-[13px] font-semibold transition-colors active:scale-95 ${
                      isBacked
                        ? 'border border-border bg-transparent text-foreground'
                        : 'bg-primary text-primary-foreground'
                    }`}
                  >
                    {isBacked ? 'Backing' : 'Back this idea'}
                  </button>
                </div>
              </motion.article>
            )
          })}
        </div>
      </div>

      {composerOpen ? (
        <IdeaComposer
          onClose={() => setComposerOpen(false)}
          onSubmit={(idea) => {
            setIdeas((list) => [idea, ...list])
            setComposerOpen(false)
            toast('Your idea is now live in the hub')
          }}
        />
      ) : null}
    </div>
  )
}

function IdeaComposer({
  onClose,
  onSubmit,
}: {
  onClose: () => void
  onSubmit: (idea: Idea) => void
}) {
  const [title, setTitle] = useState('')
  const [summary, setSummary] = useState('')
  const [category, setCategory] = useState('Logistics')

  return (
    <div className="absolute inset-0 z-40 flex items-end justify-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-background/70 backdrop-blur-sm"
      />
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 320, damping: 32 }}
        className="relative w-full rounded-t-3xl border-t border-border bg-card p-5"
      >
        <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-border" />
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-lg font-bold">Share an idea</h2>
          <button
            onClick={onClose}
            aria-label="Close"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-muted-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="A collaboration the ecosystem needs"
          className="mb-3 w-full rounded-xl border border-border bg-secondary/50 px-3.5 py-3 text-sm outline-none placeholder:text-muted-foreground focus:border-primary"
        />

        <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Summary</label>
        <textarea
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          rows={3}
          placeholder="Describe the opportunity and who you want to collaborate with"
          className="mb-3 w-full resize-none rounded-xl border border-border bg-secondary/50 px-3.5 py-3 text-sm outline-none placeholder:text-muted-foreground focus:border-primary"
        />

        <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Category</label>
        <div className="mb-5 flex flex-wrap gap-2">
          {['Logistics', 'FinTech', 'HealthTech', 'Clean Energy'].map((c) => (
            <Chip key={c} active={category === c} onClick={() => setCategory(c)}>
              {c}
            </Chip>
          ))}
        </div>

        <button
          disabled={!title.trim() || !summary.trim()}
          onClick={() =>
            onSubmit({
              id: `i-${Date.now()}`,
              businessId: 'me',
              title: title.trim(),
              summary: summary.trim(),
              category,
              region: 'East Africa',
              backers: 1,
            })
          }
          className="w-full rounded-xl bg-primary py-3.5 text-sm font-semibold text-primary-foreground disabled:opacity-40 active:scale-[0.98]"
        >
          Publish to Ideas Hub
        </button>
      </motion.div>
    </div>
  )
}
