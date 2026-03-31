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
}

export default function NavigationMenu({
  orientation = 'portrait',
  isMobile = false,
}: NavigationMenuProps) {
  const { cartState } = useCart()
  const isLandscape = isMobile && orientation === 'landscape'
  const isPortraitMobile = isMobile && orientation === 'portrait'

  if (isLandscape) {
    return (
      <nav className="border-0 px-2 pb-4 text-sm text-purple-900">
        <ul className="flex flex-col gap-1">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="block rounded-xl px-3 py-3 text-center text-[11px] font-semibold uppercase tracking-[0.08em] text-purple-900/80 transition-colors hover:bg-white/35 hover:text-purple-900"
                title={link.label}
              >
                <div className="leading-tight">{link.label}</div>
              </Link>
            </li>
          ))}

          <li>
            <Link
              href="/cart"
              className="relative block rounded-xl px-3 py-3 text-center transition-colors hover:bg-white/35"
              title="Количка"
            >
              <span className="relative inline-flex">
                <ShoppingCart className="h-4 w-4" />
                {cartState.cart.totalItems > 0 && (
                  <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] text-white">
                    {cartState.cart.totalItems > 9 ? '9+' : cartState.cart.totalItems}
                  </span>
                )}
              </span>
            </Link>
          </li>
        </ul>
      </nav>
    )
  }

  return (
    <nav className="border-0 bg-white/10">
      <div className={`${isPortraitMobile ? 'grid grid-cols-[1fr_auto] items-center px-4 py-2' : 'grid grid-cols-[1fr_auto_1fr] items-center px-4 py-3'}`}>
        {isPortraitMobile ? (
          <>
            <ul className="flex justify-start gap-4 whitespace-nowrap font-semibold uppercase text-[12px] tracking-[0.03em] text-purple-950">
              {links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="whitespace-nowrap transition-colors hover:text-purple-700">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="flex justify-end justify-self-end">
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
          </>
        ) : (
          <>
            <div className="h-8 w-8 justify-self-start" />

            <ul className="flex justify-center gap-6 whitespace-nowrap text-[14px] font-semibold uppercase tracking-[0.12em] text-purple-950 md:gap-8">
              {links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="whitespace-nowrap transition-colors hover:text-purple-700">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="flex justify-end justify-self-end">
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
          </>
        )}
      </div>
    </nav>
  )
}
