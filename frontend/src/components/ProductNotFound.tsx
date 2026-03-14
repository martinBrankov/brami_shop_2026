'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function ProductNotFound() {
  const [countdown, setCountdown] = useState(10)
  const router = useRouter()

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          router.push('/shop')
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [router])

  return (
    <div className="min-h-screen bg-[#f5f7fa] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
        {/* Икона за грешка */}
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8 text-red-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>

        {/* Заглавие */}
        <h1 className="text-2xl font-semibold text-purple-900 mb-2">
          Продуктът не е намерен
        </h1>

        {/* Описание */}
        <p className="text-gray-600 mb-6">
          За съжаление, продуктът, който търсите, не съществува или е премахнат от нашия каталог.
        </p>

        {/* Countdown */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-yellow-800 mb-2">
            Ще бъдете пренасочени към магазина след:
          </p>
          <div className="text-3xl font-bold text-yellow-600">
            {countdown}
          </div>
          <p className="text-xs text-yellow-700 mt-1">
            секунди
          </p>
        </div>

        {/* Бутон за незабавно пренасочване */}
        <button
          onClick={() => router.push('/shop')}
          className="w-full bg-[#e84356] text-white py-3 rounded-lg font-medium hover:bg-[#d63448] transition-colors"
        >
          Отидете в магазина сега
        </button>
      </div>
    </div>
  )
}
