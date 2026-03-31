"use client";

import Image, { StaticImageData } from "next/image";
import Link from "next/link";

interface HomeProps {
  heroImg: StaticImageData;
  isMobile: boolean;
}

export default function Home({ heroImg, isMobile }: HomeProps) {
  return (
    <section className="bg-[#f5f7fa] pt-6 text-purple-900">
      <div className="page-shell">
        <div className="surface-card overflow-hidden">
          <div className={`relative w-full ${isMobile ? "h-[260px]" : "h-[450px]"}`}>
            <Image
              src={heroImg}
              alt="Премиум козметика"
              fill
              className="object-contain object-right-bottom"
              priority
            />

            <div
              className="
                absolute top-0 inset-x-0
                px-4 md:px-8 pt-3 pb-2
                z-20
              "
            >
              <h1 className={`font-semibold leading-snug ${isMobile ? "text-2xl" : "text-4xl"}`}>
                Премиум козметика с шафран
              </h1>
            </div>

            <div
              className={`absolute inset-y-0 left-0 flex flex-col justify-center px-4 md:px-8 z-10 max-[378px]:mt-16 ${isMobile ? "w-1/2" : "w-1/3"}`}
            >
              <p className={`max-w-md mb-5 text-purple-900/80 ${isMobile ? "text-sm" : "text-lg"}`}>
                Открийте силата на нашите висококачествени продукти.
              </p>

              <Link
                href="/shop"
                className={`app-button-primary ${isMobile ? "max-w-[146px]" : "max-w-[260px]"} py-3 shadow-md`}
              >
                Виж продуктите
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
