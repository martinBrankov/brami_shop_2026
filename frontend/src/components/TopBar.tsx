'use client'

import Image from 'next/image'
import logoImg from "../assets/images/logo.png";
interface TopBarProps {
  isVertical?: boolean
}

export default function TopBar({ isVertical = false }: TopBarProps) {
  if (isVertical) {
    return (
      <header className="bg-transparent px-3 pb-3 pt-4">
        <div className="flex justify-center">
          <div className="relative h-14 w-16">
            <Image
              src={logoImg}
              alt="Премиум козметика"
              fill
              className="object-contain object-top"
              priority
            />
          </div>
        </div>
      </header>
    )
  }

  return (
    <header className="bg-transparent">
      <div className="grid grid-cols-3 items-center px-4 py-2">
        <button
          disabled={true}
          type="button"
          aria-label="Отвори менюто"
          className="w-8 h-8 flex items-center justify-center"
        >
          {/* <Image
            src={burgerIcon}
            alt="Меню"
            width={28}
            height={28}
            className="object-contain"
            priority
          /> */}
        </button>

        <div className="relative w-28 h-10 mx-auto">
          <Image
            src={logoImg}
            alt="Премиум козметика"
            fill
            className="object-contain object-top"
            priority
          />
        </div>

        <div className="flex justify-end items-center gap-3 text-purple-700">
          <button
            disabled={true}
            type="button"
            aria-label="Отвори търсене"
            className="w-8 h-8 flex items-center justify-center"
          >
            {/* <Image
              src={searchIcon}
              alt="Търсене"
              width={28}
              height={28}
              className="object-contain"
              priority
            /> */}
          </button>

          <button
            disabled={true}
            type="button"
            aria-label="Отвори профил"
            className="w-8 h-8 flex items-center justify-center"
          >
            {/* <Image
              src={userIcon}
              alt="Профил"
              width={28}
              height={28}
              className="object-contain"
              priority
            /> */}
          </button>
        </div>
      </div>
    </header>
  )
}
