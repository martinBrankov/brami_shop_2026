"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const STORAGE_KEY = "brami-cookie-notice-dismissed";

export default function CookieNotice() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const isDismissed = window.localStorage.getItem(STORAGE_KEY) === "true";
    if (!isDismissed) {
      setIsVisible(true);
    }
  }, []);

  const handleDismiss = () => {
    window.localStorage.setItem(STORAGE_KEY, "true");
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed inset-x-3 bottom-20 z-50 md:bottom-24 md:right-4 md:left-auto md:w-[420px] md:max-w-[calc(100vw-2rem)]">
      <div className="rounded-2xl border border-purple-100 bg-white/95 p-4 shadow-[0_16px_40px_rgba(71,85,105,0.18)] backdrop-blur-xl supports-[backdrop-filter]:bg-white/80">
        <p className="text-sm font-semibold uppercase tracking-[0.12em] text-purple-900">
          Бисквитки
        </p>
        <p className="mt-2 text-sm leading-6 text-purple-800">
          Сайтът използва бисквитки за нормална работа, анализ на трафика и по-добро
          потребителско изживяване. Повече информация можете да намерите в{" "}
          <Link href="/gdpr" className="font-medium text-purple-700 underline hover:text-purple-900">
            GDPR политиката
          </Link>.
        </p>
        <div className="mt-4 flex items-center justify-end gap-3">
          <Link href="/gdpr" className="app-button-text">
            Прочети
          </Link>
          <button onClick={handleDismiss} className="app-button-soft">
            Разбрах
          </button>
        </div>
      </div>
    </div>
  );
}
