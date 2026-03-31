"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const STORAGE_KEY = "brami-data-privacy-notice-dismissed";

export default function DataPrivacyNotice() {
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
    <div className="fixed inset-x-3 bottom-20 z-50 md:inset-x-auto md:right-4 md:w-[420px] md:max-w-[calc(100vw-2rem)] md:bottom-24">
      <div className="rounded-2xl border border-purple-100 bg-white/95 p-4 shadow-[0_16px_40px_rgba(71,85,105,0.18)] backdrop-blur-xl supports-[backdrop-filter]:bg-white/80">
        <p className="text-sm font-semibold uppercase tracking-[0.12em] text-purple-900">
          Лични данни
        </p>
        <p className="mt-2 text-sm leading-6 text-purple-800">
          Сайтът събира лични данни, необходими за обработка на поръчки, доставка и връзка с клиента.
          Повече информация можете да намерите в{" "}
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
