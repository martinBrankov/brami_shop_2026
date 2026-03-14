'use client'

import { useState, useEffect } from 'react'

export type Orientation = 'portrait' | 'landscape'

// Функция за засичане на мобилни устройства
export const isMobileDevice = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
}

export function useOrientation() {
  const [orientation, setOrientation] = useState<Orientation>('portrait')
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Проверка дали е мобилно устройство
    const mobile = isMobileDevice()
    setIsMobile(mobile)

    // Ако не е мобилно, не правим нищо
    if (!mobile) {
      setOrientation('portrait')
      return
    }

    const checkOrientation = () => {
      const isLandscape = window.innerWidth > window.innerHeight
      setOrientation(isLandscape ? 'landscape' : 'portrait')
    }

    // Проверка при зареждане
    checkOrientation()

    // Проверка при resize
    window.addEventListener('resize', checkOrientation)
    window.addEventListener('orientationchange', checkOrientation)

    return () => {
      window.removeEventListener('resize', checkOrientation)
      window.removeEventListener('orientationchange', checkOrientation)
    }
  }, [])

  return { orientation, isMobile }
}
