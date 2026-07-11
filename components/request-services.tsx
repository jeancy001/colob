'use client'

import { AnimatePresence, motion } from 'motion/react'
import { PackageCheck, Send, X } from 'lucide-react'
import { useState } from 'react'
import { useToast } from '@/components/toast'
import { cn } from '@/lib/utils'
import type { Business } from '@/lib/types'

interface RequestServicesButtonProps {
  business: Business
  className?: string
}

export function RequestServicesButton({ business, className }: RequestServicesButtonProps) {
  const [open, setOpen] = useState(false)
  const [service, setService] = useState(business.services[0] ?? '')
  const [quantity, setQuantity] = useState('')
  const [details, setDetails] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const toast = useToast()

  function submit() {
    setSubmitted(true)
    toast(`Service request sent to ${business.name}`)
    setTimeout(() => {
      setOpen(false)
      setSubmitted(false)
      setQuantity('')
      setDetails('')
    }, 1400)
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={cn(
          'flex items-center justify-center gap-2 rounded-2xl bg-primary py-3 text-sm font-semibold text-primary-foreground active:scale-[0.98]',
          className,
        )}
      >
        <PackageCheck className="h-4 w-4" /> Request services
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 flex items-end justify-center bg-foreground/40 backdrop-blur-sm"
            onClick={() => !submitted && setOpen(false)}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 32 }}
              className="w-full rounded-t-3xl border-t border-border bg-card p-5"
              onClick={(e) => e.stopPropagation()}
            >
              {submitted ? (
                <div className="flex flex-col items-center py-8 text-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/15 text-primary">
                    <PackageCheck className="h-7 w-7" />
                  </div>
                  <p className="mt-4 font-display text-lg font-bold">Request sent</p>
                  <p className="mt-1 text-[13px] text-muted-foreground">
                    {business.name} will respond in {business.trust?.responseTime ?? 'a few hours'}.
                  </p>
                </div>
              ) : (
                <>
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <h2 className="font-display text-lg font-bold">Request services</h2>
                      <p className="text-[13px] text-muted-foreground">from {business.name}</p>
                    </div>
                    <button
                      onClick={() => setOpen(false)}
                      aria-label="Close"
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-muted-foreground active:scale-90"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>

                  <label className="mb-1.5 block text-xs font-semibold text-muted-foreground">
                    Service needed
                  </label>
                  <div className="mb-3 flex flex-wrap gap-2">
                    {business.services.map((s) => (
                      <button
                        key={s}
                        onClick={() => setService(s)}
                        className={cn(
                          'rounded-full border px-3 py-1.5 text-[13px] font-medium transition-colors',
                          service === s
                            ? 'border-primary bg-primary text-primary-foreground'
                            : 'border-border bg-card text-foreground',
                        )}
                      >
                        {s}
                      </button>
                    ))}
                  </div>

                  <label className="mb-1.5 block text-xs font-semibold text-muted-foreground">
                    Quantity / volume
                  </label>
                  <input
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    placeholder="e.g. 500 units / month"
                    className="mb-3 w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm outline-none placeholder:text-muted-foreground focus:border-primary"
                  />

                  <label className="mb-1.5 block text-xs font-semibold text-muted-foreground">
                    Details
                  </label>
                  <textarea
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    rows={3}
                    placeholder="Describe your requirements, timeline and delivery location."
                    className="mb-4 w-full resize-none rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm outline-none placeholder:text-muted-foreground focus:border-primary"
                  />

                  <button
                    onClick={submit}
                    disabled={!service}
                    className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary py-3.5 text-sm font-semibold text-primary-foreground active:scale-[0.98] disabled:opacity-50"
                  >
                    <Send className="h-4 w-4" /> Send request
                  </button>
                </>
              )}
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  )
}
