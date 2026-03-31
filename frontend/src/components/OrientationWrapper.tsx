'use client'

import React, { ReactNode } from 'react'

interface OrientationWrapperProps {
  children: ReactNode
}

export default function OrientationWrapper({
  children,
}: OrientationWrapperProps) {
  return <>{children}</>
}
