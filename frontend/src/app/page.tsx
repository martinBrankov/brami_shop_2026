'use client'

import { redirect } from 'next/navigation'
import Home from "@/components/home/Home";
import PopularProducts from "@/components/home/bricks/PopularProducts";
import heroImgMobile from "../assets/images/homeScreenImgMobile.jpg";
import heroImgDesktop from "../assets/images/homeScreenImgDesktop.jpg";
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

  if (productID) {
    redirect(`/shop/${productID}`)
  }

  return (
    isReady ?(
    <div className="bg-[#f5f7fa]">
      <Home heroImg={heroImg} isMobile={isMobile} />
      <PopularProducts />
    </div>
  ) : (<div className="bg-[#f5f7fa] flex items-center justify-center h-screen">Loading...</div>))
}
