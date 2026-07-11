'use client'

import { AnimatePresence, motion } from 'motion/react'
import { Check, Globe, X } from 'lucide-react'
import { useState } from 'react'
import { languages, useLanguage } from '@/lib/i18n'
import { FramePortal } from './frame-portal'
import { useToast } from './toast'
import { cn } from '@/lib/utils'

export function LanguageSwitcher({ className }: { className?: string }) {
  const { lang, setLang, t } = useLanguage()
  const [open, setOpen] = useState(false)
  const toast = useToast()

  return (
    <>
      <button
        type="button"
        aria-label={t('action.language')}
        onClick={() => setOpen(true)}
        className={cn(
          'flex h-9 items-center gap-1.5 rounded-full bg-card px-2.5 text-foreground transition-colors active:scale-95',
          className,
        )}
      >
        <Globe className="h-5 w-5" />
        <span className="font-display text-xs font-bold uppercase">{lang.code}</span>
      </button>

      <FramePortal>
      <AnimatePresence>
        {open ? (
          <motion.div
            className="absolute inset-0 z-50 flex flex-col justify-end"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              aria-label="Close"
              className="absolute inset-0 bg-foreground/40 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 32 }}
              className="relative max-h-[80%] overflow-y-auto rounded-t-3xl border-t border-border bg-card px-5 pb-8 pt-4 no-scrollbar"
            >
              <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-muted-foreground/30" />
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h2 className="font-display text-lg font-bold">Choose your language</h2>
                  <p className="text-xs text-muted-foreground">
                    KOLOB speaks your language across Africa
                  </p>
                </div>
                <button
                  aria-label="Close"
                  onClick={() => setOpen(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-muted-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="flex flex-col gap-2">
                {languages.map((l) => {
                  const active = l.code === lang.code
                  return (
                    <button
                      key={l.code}
                      onClick={() => {
                        setLang(l.code)
                        setOpen(false)
                        toast(`Language set to ${l.label}`)
                      }}
                      className={cn(
                        'flex items-center gap-3 rounded-2xl border px-4 py-3 text-left transition-colors',
                        active
                          ? 'border-primary bg-primary/10'
                          : 'border-border bg-background active:bg-secondary/50',
                      )}
                    >
                      <span
                        className={cn(
                          'flex h-9 w-9 shrink-0 items-center justify-center rounded-xl font-display text-xs font-bold uppercase',
                          active ? 'bg-primary text-primary-foreground' : 'bg-secondary text-foreground',
                        )}
                      >
                        {l.code}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-semibold">{l.native}</span>
                        <span className="block text-xs text-muted-foreground">
                          {l.label} · {l.region}
                        </span>
                      </span>
                      {active ? <Check className="h-5 w-5 shrink-0 text-primary" /> : null}
                    </button>
                  )
                })}
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
      </FramePortal>
    </>
  )
}
