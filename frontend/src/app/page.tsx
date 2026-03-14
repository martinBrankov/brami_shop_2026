'use client'

import { redirect } from 'next/navigation'
import PopularProducts from "@/components/PopularProducts";
import heroImgMobile from "../assets/images/homeScreenImgMobile.jpg";
import heroImgDesktop from "../assets/images/homeScreenImgDesktop.jpg";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useDeviceDetection } from "@/hooks/useDeviceDetection";

export default function HomePage({
  searchParams,
}: {
  searchParams: { productID?: string }
}) {
  const { isMobile, isReady } = useDeviceDetection();
  const [heroImg, setHeroImg] = useState<any>(heroImgMobile);

  useEffect(() => {
    setHeroImg(() => {
      return isMobile ? heroImgMobile : heroImgDesktop;
    });
  }, [isMobile]);

  const productID = searchParams?.productID;
  
  // Server-side redirect ако има productID
  if (productID) {
    redirect(`/shop/${productID}`)
  }

  return (
    isReady ?(
    <div className="bg-[#f5f7fa]">
      <section className="relative text-purple-900 bg-[#f5f7fa]">
        <div className={`relative w-full ${isMobile ? 'h-[260px]' : 'h-[450px]'}`}>
          <Image
            src={heroImg}
            alt="Премиум козметика"
            fill
            className="object-contain object-right-bottom"
            priority
          />

          {/* H1 — ГОРЕ, ЦЯЛАТА ШИРОЧИНА */}
          <div
            className="
              absolute top-0 inset-x-0
              px-4 md:px-8 pt-3 pb-2
              z-20
            "
          >
            <h1 className={`font-semibold leading-snug ${isMobile ? 'text-2xl' : 'text-4xl'}`}>
              Премиум козметика с шафран
            </h1>
          </div>

          {/* Текст + бутон — остават в лявата половина */}
          <div
            className={`absolute inset-y-0 left-0 flex flex-col justify-center px-4 md:px-8 z-10 max-[378px]:mt-16 ${isMobile ? 'w-1/2' : 'w-1/3'}`}
          >
            <p className={`max-w-md mb-5 text-purple-900/80 ${isMobile ? 'text-sm' : 'text-lg'}`}>
              Открийте силата на нашите висококачествени продукти.
            </p>

            <button className={`inline-flex items-center justify-center ${isMobile ? 'max-w-[146px]' : 'max-w-[260px]'} py-3 rounded-lg bg-[#e84356] text-white text-sm font-medium shadow-md whitespace-nowrap`}>
              <a href="/shop">
                Виж продуктите
              </a>
            </button>
          </div>
        </div>
      </section>
      <PopularProducts />
    </div>
  ) : (<div className="bg-[#f5f7fa] flex items-center justify-center h-screen">Loading...</div>))
}
