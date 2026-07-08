import { cn } from '@/lib/utils'

const palettes = [
  'bg-[oklch(0.74_0.15_162)] text-[oklch(0.18_0.02_162)]',
  'bg-[oklch(0.82_0.13_82)] text-[oklch(0.2_0.02_82)]',
  'bg-[oklch(0.66_0.14_240)] text-[oklch(0.98_0_0)]',
  'bg-[oklch(0.68_0.16_25)] text-[oklch(0.98_0_0)]',
  'bg-[oklch(0.7_0.13_300)] text-[oklch(0.98_0_0)]',
  'bg-[oklch(0.75_0.13_140)] text-[oklch(0.2_0.02_140)]',
]

function hashIndex(seed: string, mod: number) {
  let h = 0
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0
  return h % mod
}

export function initials(name: string) {
  return name
    .replace(/[^a-zA-Z ]/g, '')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join('')
}

export function BrandAvatar({
  name,
  seed,
  className,
}: {
  name: string
  seed?: string
  className?: string
}) {
  const palette = palettes[hashIndex(seed ?? name, palettes.length)]
  return (
    <span
      className={cn(
        'inline-flex shrink-0 items-center justify-center rounded-2xl font-display text-sm font-bold',
        palette,
        className,
      )}
      aria-hidden="true"
    >
      {initials(name)}
    </span>
  )
}
