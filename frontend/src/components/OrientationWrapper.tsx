'use client'

import React, { ReactNode, useEffect, useState } from 'react'
import { useOrientation } from '@/hooks/useOrientation'
import LandscapePrompt from './LandscapePrompt'

interface OrientationWrapperProps {
  children: ReactNode
  showLandscapePrompt?: boolean
}

export default function OrientationWrapper({ 
  children, 
  showLandscapePrompt = true 
}: OrientationWrapperProps) {
  const { orientation, isMobile } = useOrientation()
  const [showPrompt, setShowPrompt] = useState(false)

  useEffect(() => {
    // Показваме prompt само ако сме в landscape, е мобилно и е разрешено
    setShowPrompt(orientation === 'landscape' && isMobile && showLandscapePrompt)
  }, [orientation, isMobile, showLandscapePrompt])

  if (showPrompt && orientation === 'landscape' && isMobile) {
    return <LandscapePrompt currentContent={children} />
  }

  return <>{children}</>
}
