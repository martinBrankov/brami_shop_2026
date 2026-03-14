'use client'

import React, { ReactNode, useState, useEffect } from 'react'
import { useOrientation, hideAddressBar, showAddressBar } from '@/hooks/useOrientation'
import TopBar from './TopBar'
import NavigationMenu from './NavigationMenu'
import BottomBar from './BottomBar'

interface AppLayoutProps {
  children: ReactNode
}

export default function AppLayout({ children }: AppLayoutProps) {
  const { orientation, isMobile } = useOrientation()
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [userEnteredFullscreen, setUserEnteredFullscreen] = useState(false)
  const isLandscapeMobile = isMobile && orientation === 'landscape'

  useEffect(() => {
    // Проверяваме дали сме във fullscreen режим
    const checkFullscreen = () => {
      const fullscreen = !!(
        document.fullscreenElement ||
        (document as any).webkitFullscreenElement ||
        (document as any).mozFullScreenElement ||
        (document as any).msFullscreenElement
      )
      setIsFullscreen(fullscreen)
      
      // Запомняме ако потребителят е влязъл във fullscreen
      if (fullscreen && !userEnteredFullscreen) {
        setUserEnteredFullscreen(true)
      }
    }

    document.addEventListener('fullscreenchange', checkFullscreen)
    document.addEventListener('webkitfullscreenchange', checkFullscreen)
    document.addEventListener('mozfullscreenchange', checkFullscreen)
    document.addEventListener('MSFullscreenChange', checkFullscreen)

    return () => {
      document.removeEventListener('fullscreenchange', checkFullscreen)
      document.removeEventListener('webkitfullscreenchange', checkFullscreen)
      document.removeEventListener('mozfullscreenchange', checkFullscreen)
      document.removeEventListener('MSFullscreenChange', checkFullscreen)
    }
  }, [userEnteredFullscreen])

  useEffect(() => {
    // Автоматично влизане във fullscreen само в лендскейп и само ако потребителят не е влизал вече
    if (isLandscapeMobile && !userEnteredFullscreen) {
      const timer = setTimeout(() => {
        hideAddressBar()
      }, 500)
      
      return () => clearTimeout(timer)
    }
    // Не излизаме автоматично от fullscreen - оставаме в режима докато потребителят не реши
  }, [isLandscapeMobile, userEnteredFullscreen])

  useEffect(() => {
    // Добавяне на event listeners за изход от fullscreen
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFullscreen) {
        showAddressBar()
        setUserEnteredFullscreen(false)
      }
    }

    const handleDoubleClick = (e: MouseEvent) => {
      if (isFullscreen && e.detail === 2) {
        showAddressBar()
        setUserEnteredFullscreen(false)
      }
    }

    if (isFullscreen) {
      document.addEventListener('keydown', handleEscape)
      document.addEventListener('dblclick', handleDoubleClick)
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.removeEventListener('dblclick', handleDoubleClick)
    }
  }, [isFullscreen])

  const toggleFullscreen = () => {
    if (isFullscreen) {
      showAddressBar()
      setUserEnteredFullscreen(false)
    } else {
      hideAddressBar()
    }
  }

  return (
    <div id="root">
      {/* горна лента - винаги видима */}
      <TopBar />

      {/* менюто „виси" над съдържанието */}
      <div className="relative z-20 -mb-8">
        <NavigationMenu 
          orientation={orientation} 
          isMobile={isMobile} 
          isFullscreen={isFullscreen}
          onToggleFullscreen={toggleFullscreen}
        />
      </div>

      {/* отстъп, за да не влиза съдържанието под менюто */}
      <main className={`pt-8 pb-16 ${isLandscapeMobile ? 'pt-2' : ''} ${isLandscapeMobile ? 'pr-24' : ''}`}>
        {children}
      </main>
      
      {/* долна лента */}
      {!isLandscapeMobile && <BottomBar />}
    </div>
  )
}
