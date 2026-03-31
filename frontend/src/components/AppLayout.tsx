'use client'

import React, { ReactNode, useState, useEffect } from 'react'
import { useOrientation, hideAddressBar, showAddressBar } from '@/hooks/useOrientation'
import TopBar from './TopBar'
import NavigationMenu from './NavigationMenu'
import BottomBar from './BottomBar'
import CookieNotice from './CookieNotice'

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
        <div className="fixed inset-x-0 top-0 z-40 border-0 bg-[linear-gradient(180deg,rgba(221,225,229,0.96)_0%,rgba(234,237,240,0.92)_44%,rgba(245,247,249,0.88)_100%)] shadow-[0_10px_24px_rgba(71,85,105,0.12)] backdrop-blur-xl supports-[backdrop-filter]:bg-[linear-gradient(180deg,rgba(221,225,229,0.88)_0%,rgba(234,237,240,0.82)_44%,rgba(245,247,249,0.76)_100%)]">
          <TopBar />
          <NavigationMenu
            orientation={orientation}
            isMobile={isMobile}
          />
        </div>
      )}

      {isLandscapeMobile && (
        <div className="fixed inset-y-0 left-0 z-40 w-32 border-0 bg-[linear-gradient(180deg,rgba(221,225,229,0.96)_0%,rgba(234,237,240,0.92)_44%,rgba(245,247,249,0.88)_100%)] shadow-[10px_0_24px_rgba(71,85,105,0.12)] backdrop-blur-xl supports-[backdrop-filter]:bg-[linear-gradient(180deg,rgba(221,225,229,0.88)_0%,rgba(234,237,240,0.82)_44%,rgba(245,247,249,0.76)_100%)]">
          <TopBar isVertical />
          <NavigationMenu
            orientation={orientation}
            isMobile={isMobile}
          />
        </div>
      )}

      <main className={`${isLandscapeMobile ? 'pl-32 pt-2 pb-16' : 'pt-32 pb-28'}`}>
        {children}
      </main>

      <CookieNotice />

      {!isLandscapeMobile && <BottomBar />}
    </div>
  )
}
