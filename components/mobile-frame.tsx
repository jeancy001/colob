import type { ReactNode } from 'react'
import { StatusBar } from './status-bar'

export function MobileFrame({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-frame sm:p-6">
      {/* Ambient glow behind the device on larger screens */}
      <div className="pointer-events-none fixed inset-0 hidden overflow-hidden sm:block" aria-hidden="true">
        <div className="absolute left-1/2 top-1/2 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[120px]" />
      </div>

      <div
        id="mobile-frame-root"
        className="relative flex h-dvh w-full flex-col overflow-hidden bg-background sm:h-[880px] sm:max-h-[92vh] sm:w-[400px] sm:rounded-[2.75rem] sm:border-[6px] sm:border-frame-border sm:shadow-2xl sm:shadow-black/50"
      >
        <StatusBar />
        <div className="flex min-h-0 flex-1 flex-col">{children}</div>
        {/* home indicator */}
        <div className="pointer-events-none flex h-3 shrink-0 items-center justify-center">
          <div className="h-1 w-28 rounded-full bg-foreground/25" />
        </div>
      </div>
    </div>
  )
}
