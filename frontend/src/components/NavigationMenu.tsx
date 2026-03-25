'use client'

import Link from 'next/link'
import { ShoppingCart } from 'lucide-react'
import { Orientation } from '@/hooks/useOrientation'
import { useCart } from '@/contexts/CartContext'

const links = [
  { href: "/", label: "Начало" },
  { href: "/shop", label: "Продукти" },
  { href: "/about", label: "За нас" },
  { href: "/contacts", label: "Контакти" },
];

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
  onToggleFullscreen 
}: NavigationMenuProps) {
  const { cartState } = useCart();
  const isLandscape = isMobile && orientation === 'landscape'
  
  if (isLandscape) {
    // В лендскейп на мобилни устройства - вертикално меню отгоре-долу отдясно
    return (
      <nav className="fixed right-0 top-0 h-full w-20 bg-white bg-opacity-95 backdrop-blur-sm shadow-xl z-30 border-l border-gray-200">
        <ul className="flex flex-col gap-1 text-sm text-purple-900 py-4 px-2">
          {/* Празно пространство отгоре */}
          <div className="h-8"></div>
          
          {/* Бутон за fullscreen като част от менюто */}
          <li>
            <button
              onClick={onToggleFullscreen}
              className="w-full px-2 py-3 hover:bg-purple-100 rounded transition-colors text-center"
              title={isFullscreen ? "Изход от fullscreen" : "Fullscreen режим"}
            >
              <svg 
                className="w-4 h-4 mx-auto mb-1" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                {isFullscreen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                )}
              </svg>
              <div className="text-xs opacity-75 leading-none">
                {isFullscreen ? "Изход" : "Full"}
              </div>
            </button>
          </li>
          
          {/* Навигационни линкове */}
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="block px-2 py-3 hover:bg-purple-100 rounded transition-colors text-center"
                title={link.label}
              >
                <div className="text-xs font-medium leading-tight">
                  {link.label.charAt(0)}
                </div>
                <div className="text-xs mt-1 opacity-75 leading-none">
                  {link.label.length > 6 ? link.label.substring(0, 6) + '...' : link.label}
                </div>
              </Link>
            </li>
          ))}
          
          {/* Cart icon */}
          <li>
            <Link
              href="/cart"
              className="block px-2 py-3 hover:bg-purple-100 rounded transition-colors text-center relative"
              title="Количка"
            >
              <ShoppingCart className="w-4 h-4 mx-auto mb-1" />
              {cartState.cart.totalItems > 0 && (
                <span className="absolute top-0 right-2 bg-red-500 text-white text-xs rounded-full w-3 h-3 flex items-center justify-center text-[10px]">
                  {cartState.cart.totalItems > 9 ? '9+' : cartState.cart.totalItems}
                </span>
              )}
            </Link>
          </li>
        </ul>
      </nav>
    )
  }

  // В портрет или на десктоп - стандартно хоризонтално меню отдолу на TopBar
  return (
    <nav className="w-full bg-transparent">
      <div className="flex items-center justify-between">
        {/* Left spacer */}
        <div className="flex-1"></div>
        
        {/* Center - existing navigation */}
        <ul className="flex justify-center gap-8 text-sm text-purple-900 py-3">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="hover:text-purple-600 transition-colors"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        
        {/* Right side - cart icon */}
        <div className="flex-1 flex justify-end pr-4">
          <ul className="flex items-center text-sm text-purple-900 py-3">
            <li>
              <Link
                href="/cart"
                className="flex items-center gap-2 hover:text-purple-600 transition-colors relative"
                title="Количка"
              >
                <ShoppingCart className="w-5 h-5" />
                {cartState.cart.totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center text-[10px]">
                    {cartState.cart.totalItems > 9 ? '9+' : cartState.cart.totalItems}
                  </span>
                )}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
