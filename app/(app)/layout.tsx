import type { ReactNode } from 'react'
import { BottomNav } from '@/components/bottom-nav'
import { RouteTransition } from '@/components/route-transition'
import { ToastProvider } from '@/components/toast'

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <ToastProvider>
      <div className="flex min-h-0 flex-1 flex-col">
        <main className="no-scrollbar min-h-0 flex-1 overflow-y-auto">
          <RouteTransition>{children}</RouteTransition>
        </main>
        <BottomNav />
      </div>
    </ToastProvider>
  )
}
