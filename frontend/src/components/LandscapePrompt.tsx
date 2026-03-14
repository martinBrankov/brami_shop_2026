'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface LandscapePromptProps {
  currentContent?: React.ReactNode
}

export default function LandscapePrompt({ currentContent }: LandscapePromptProps) {
  const [countdown, setCountdown] = useState(10)
  const router = useRouter()

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [router])

  const handleContinue = () => {
    // Продължаваме с текущото съдържание
    router.back()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90">
      {/* Заден фон с размито текущо съдържание */}
      <div className="absolute inset-0">
        {currentContent && (
          <div className="w-full h-full backdrop-blur-md bg-black bg-opacity-30">
            <div className="blur-xl opacity-30">
              {currentContent}
            </div>
          </div>
        )}
      </div>

      {/* Централна карта с призив */}
      <div className="relative z-10 bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full mx-4">
        {/* Икона за телефон */}
        {/* <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
          <svg
            className="w-10 h-10 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div> */}

        {/* Заглавие */}
        <h1 className=" text-gray-900 mb-3 text-center">
          За да продължите моля завъртете мобилното си устойство в портрет!
        </h1>

        {/* Икони за ориентация */}
        <div className="mt-6 flex justify-center items-center space-x-4">
          {/* Portrait (активен) */}

          {/* Landscape (неактивен) */}
          <div className="flex flex-col items-center">
            <div className="w-20 h-12 bg-gray-100 border-2 border-gray-300 rounded-lg flex items-center justify-center opacity-50">
              <svg className="w-6 h-6 text-gray-400 transform rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <span className="text-xs text-gray-400 mt-1">лендскейп</span>
          </div>
          {/* Стрелка */}
          {/* <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg> */}
          <div className="flex flex-col items-center">
            <div className="w-12 h-20 bg-purple-100 border-2 border-purple-500 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <span className="text-xs text-purple-600 font-medium mt-1">портрет</span>
          </div>

        </div>

      </div>
    </div>
  )
}
