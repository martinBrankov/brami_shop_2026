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
    <div className="min-h-screen bg-[#f5f7fa] pt-2 pb-6">
      <div className="page-shell">
        <div className="surface-card-tight text-center">
          <div className="mb-4 mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
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

          <h1 className="mb-2 text-2xl font-semibold text-purple-900">
            Продуктът не е намерен
          </h1>

          <p className="mb-6 text-gray-600">
            За съжаление, продуктът, който търсите, не съществува или е премахнат от нашия каталог.
          </p>

          <div className="mb-6 rounded-2xl border border-yellow-200 bg-yellow-50 p-4">
            <p className="mb-2 text-sm text-yellow-800">
              Ще бъдете пренасочени към магазина след:
            </p>
            <div className="text-3xl font-bold text-yellow-600">
              {countdown}
            </div>
            <p className="mt-1 text-xs text-yellow-700">
              секунди
            </p>
          </div>

          <button
            onClick={() => router.push('/shop')}
            className="app-button-primary w-full py-3"
          >
            Отидете в магазина сега
          </button>
        </div>
      </div>
    </div>
  )
}
