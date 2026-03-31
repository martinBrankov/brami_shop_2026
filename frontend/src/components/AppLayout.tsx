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
    const checkFullscreen = () => {
      const fullscreen = !!(
        document.fullscreenElement ||
        (document as any).webkitFullscreenElement ||
        (document as any).mozFullScreenElement ||
        (document as any).msFullscreenElement
      )
      setIsFullscreen(fullscreen)

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
    if (isLandscapeMobile && !userEnteredFullscreen) {
      const timer = setTimeout(() => {
        hideAddressBar()
      }, 500)

      return () => clearTimeout(timer)
    }
  }, [isLandscapeMobile, userEnteredFullscreen])

  useEffect(() => {
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
    <div id="root" className="min-h-screen bg-[#f5f7fa]">
      {!isLandscapeMobile && (
        <div className="fixed inset-x-0 top-0 z-40">
          <div className="page-shell">
            <div className="surface-card overflow-hidden rounded-t-none rounded-b-xl border-t-0">
              <TopBar />
              <NavigationMenu
                orientation={orientation}
                isMobile={isMobile}
                isFullscreen={isFullscreen}
                onToggleFullscreen={toggleFullscreen}
              />
            </div>
          </div>
        </div>
      )}

      {isLandscapeMobile && (
        <NavigationMenu
          orientation={orientation}
          isMobile={isMobile}
          isFullscreen={isFullscreen}
          onToggleFullscreen={toggleFullscreen}
        />
      )}

      <main className={`pb-16 pt-32 ${isLandscapeMobile ? 'pr-24 pt-4' : ''}`}>
        {children}
      </main>

      {!isLandscapeMobile && <BottomBar />}
    </div>
  )
}
