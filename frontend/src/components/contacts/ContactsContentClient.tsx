"use client";

import { useEffect, useState } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import { useOrientation } from "@/hooks/useOrientation";

export default function ContactsContentClient() {
  const { orientation, isMobile } = useOrientation();
  const isLandscapeMobile = isMobile && orientation === "landscape";
  const [isCompactDesktop, setIsCompactDesktop] = useState(false);

  useEffect(() => {
    const updateCompactLayout = () => {
      setIsCompactDesktop(window.innerWidth < 1200);
    };

    updateCompactLayout();
    window.addEventListener("resize", updateCompactLayout);

    return () => window.removeEventListener("resize", updateCompactLayout);
  }, []);

  const useCompactLayout = isLandscapeMobile || isCompactDesktop;

  return (
    <main className="bg-[#f5f7fa] pt-2 pb-10">
      <div className="page-shell">
        <div className={`surface-card text-purple-900 ${useCompactLayout ? "p-4" : "p-6 md:p-8"}`}>
          <h1 className={`text-center font-semibold ${useCompactLayout ? "mb-4 text-xl" : "mb-6 text-2xl md:text-3xl"}`}>
            Свържете се с нас
          </h1>

          <div
            className={
              useCompactLayout
                ? "space-y-3 text-xs"
                : "grid gap-6 text-sm leading-relaxed md:grid-cols-3 md:text-base"
            }
          >
            <div
              className={`rounded-xl bg-purple-50/70 ${
                useCompactLayout
                  ? "flex items-center gap-2 whitespace-nowrap px-3 py-2"
                  : "flex items-start gap-3 p-4"
              }`}
            >
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-purple-700" />
              {useCompactLayout ? (
                <p>Гр. София, кв. Кривина, ул. „Демокрация“ 13</p>
              ) : (
                <p>
                  Гр. София, кв. Кривина
                  <br />
                  ул. „Демокрация“ 13
                </p>
              )}
            </div>

            <div
              className={`rounded-xl bg-purple-50/70 ${
                useCompactLayout
                  ? "flex items-center gap-2 whitespace-nowrap px-3 py-2"
                  : "flex items-center gap-3 p-4"
              }`}
            >
              <Phone className="h-5 w-5 shrink-0 text-purple-700" />
              <a href="tel:+359889342781" className="hover:underline">
                +359 889 342 781
              </a>
            </div>

            <div
              className={`rounded-xl bg-purple-50/70 ${
                useCompactLayout
                  ? "flex items-center gap-2 whitespace-nowrap px-3 py-2"
                  : "flex items-center gap-3 p-4"
              }`}
            >
              <Mail className="h-5 w-5 shrink-0 text-purple-700" />
              {useCompactLayout ? (
                <div className="flex items-center gap-2 whitespace-nowrap">
                  <a href="mailto:info@brami-trade.com" className="hover:underline">
                    info@brami-trade.com
                  </a>
                  <span className="text-purple-400">|</span>
                  <a href="mailto:sales@brami-trade.com" className="hover:underline">
                    sales@brami-trade.com
                  </a>
                </div>
              ) : (
                <div className="flex flex-col">
                  <a href="mailto:info@brami-trade.com" className="hover:underline">
                    info@brami-trade.com
                  </a>
                  <a href="mailto:sales@brami-trade.com" className="hover:underline">
                    sales@brami-trade.com
                  </a>
                </div>
              )}
            </div>
          </div>

          <div className={`text-center text-purple-600 ${useCompactLayout ? "mt-4 text-xs leading-[1.35]" : "mt-8 text-sm"}`}>
            {useCompactLayout ? (
              "Можете да се свържете с нас в работни дни от 09:00 до 18:00"
            ) : (
              <>
                Можете да се свържете с нас в работни дни от
                <br />
                09:00 до 18:00
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
