'use client'

import Link from 'next/link'

const links = [
  { href: "/", label: "Начало" },
  { href: "/shop", label: "Продукти" },
  { href: "/about", label: "За нас" },
  { href: "/contacts", label: "Контакти" },
];

export default function NavigationMenu() {
  return (
    <nav className="w-full bg-transparent">
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
    </nav>
  )
}
