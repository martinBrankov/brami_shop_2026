'use client'

import Link from 'next/link'
import { ShoppingCart } from 'lucide-react'
import { Orientation } from '@/hooks/useOrientation'
import { useCart } from '@/contexts/CartContext'

const links = [
  { href: '/', label: 'Начало' },
  { href: '/shop', label: 'Продукти' },
  { href: '/about', label: 'За нас' },
  { href: '/contacts', label: 'Контакти' },
]

interface NavigationMenuProps {
  orientation?: Orientation
  isMobile?: boolean
  isFullscreen?: boolean
  onToggleFullscreen?: () => void
}

export default function NavigationMenu({
  orientation = 'portrait',
  isMobile = false,
  isFullscreen = false,
  onToggleFullscreen,
}: NavigationMenuProps) {
  const { cartState } = useCart()
  const isLandscape = isMobile && orientation === 'landscape'

  if (isLandscape) {
    return (
      <nav className="fixed right-0 top-0 z-30 h-full w-20 border-l border-white/30 bg-white/80 shadow-xl backdrop-blur-xl supports-[backdrop-filter]:bg-white/60">
        <ul className="flex flex-col gap-1 px-2 py-4 text-sm text-purple-900">
          <div className="h-8" />

          <li>
            <button
              onClick={onToggleFullscreen}
              className="w-full rounded px-2 py-3 text-center transition-colors hover:bg-purple-100/80"
              title={isFullscreen ? 'Изход от fullscreen' : 'Fullscreen режим'}
            >
              <svg
                className="mx-auto mb-1 h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isFullscreen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                  />
                )}
              </svg>
              <div className="text-xs leading-none opacity-75">
                {isFullscreen ? 'Изход' : 'Full'}
              </div>
            </button>
          </li>

          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="block rounded px-2 py-3 text-center text-[12px] font-semibold uppercase tracking-[0.16em] text-purple-900/80 transition-colors hover:bg-purple-100/80 hover:text-purple-900"
                title={link.label}
              >
                <div className="text-xs leading-tight">{link.label.charAt(0)}</div>
                <div className="mt-1 text-[10px] leading-none opacity-75">
                  {link.label.length > 6 ? `${link.label.substring(0, 6)}...` : link.label}
                </div>
              </Link>
            </li>
          ))}

          <li>
            <Link
              href="/cart"
              className="relative block rounded px-2 py-3 text-center transition-colors hover:bg-purple-100/80"
              title="Количка"
            >
              <ShoppingCart className="mx-auto mb-1 h-4 w-4" />
              {cartState.cart.totalItems > 0 && (
                <span className="absolute right-2 top-0 flex h-3 w-3 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
                  {cartState.cart.totalItems > 9 ? '9+' : cartState.cart.totalItems}
                </span>
              )}
            </Link>
          </li>
        </ul>
      </nav>
    )
  }

  return (
    <nav>
      <div className="grid grid-cols-3 items-center px-4 py-3">
        <div className="w-8 h-8" />

        <ul className="flex justify-center gap-6 whitespace-nowrap text-[14px] font-semibold uppercase tracking-[0.12em] text-purple-900/80 md:gap-8">
          {links.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="whitespace-nowrap transition-colors hover:text-purple-600">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex justify-end">
          <Link
            href="/cart"
            className="relative flex h-8 w-8 items-center justify-center text-purple-900 transition-colors hover:text-purple-600"
            title="Количка"
          >
            <ShoppingCart className="h-5 w-5" />
            {cartState.cart.totalItems > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
                {cartState.cart.totalItems > 9 ? '9+' : cartState.cart.totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  )
}
