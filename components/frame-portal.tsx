'use client'

import { useEffect, useState, type ReactNode } from 'react'
import { createPortal } from 'react-dom'

/**
 * Renders children into the phone frame root so overlays/sheets fill the
 * device area — not whatever sticky/relative ancestor they were declared in.
 */
export function FramePortal({ children }: { children: ReactNode }) {
  const [node, setNode] = useState<HTMLElement | null>(null)

  useEffect(() => {
    setNode(document.getElementById('mobile-frame-root'))
  }, [])

  if (!node) return null
  return createPortal(children, node)
}
