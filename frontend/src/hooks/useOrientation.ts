'use client'

import { useState, useEffect } from 'react'

export type Orientation = 'portrait' | 'landscape'

// Функция за засичане на мобилни устройства
export const isMobileDevice = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
}

// Функция за скриване на адрес бар
export const hideAddressBar = () => {
  if (document.documentElement.requestFullscreen) {
    document.documentElement.requestFullscreen().catch(err => {
      console.log('Fullscreen not available:', err)
    })
  } else if ((document.documentElement as any).webkitRequestFullscreen) {
    (document.documentElement as any).webkitRequestFullscreen()
  } else if ((document.documentElement as any).mozRequestFullScreen) {
    (document.documentElement as any).mozRequestFullScreen()
  } else if ((document.documentElement as any).msRequestFullscreen) {
    (document.documentElement as any).msRequestFullscreen()
  }
}

// Функция за показване на адрес бар
export const showAddressBar = () => {
  if (document.exitFullscreen) {
    document.exitFullscreen().catch(err => {
      console.log('Exit fullscreen not available:', err)
    })
  } else if ((document as any).webkitExitFullscreen) {
    (document as any).webkitExitFullscreen()
  } else if ((document as any).mozCancelFullScreen) {
    (document as any).mozCancelFullScreen()
  } else if ((document as any).msExitFullscreen) {
    (document as any).msExitFullscreen()
  }
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
