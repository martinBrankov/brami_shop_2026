"use client";

import Image, { StaticImageData } from "next/image";
import Link from "next/link";

interface HomeProps {
  heroImg: StaticImageData;
  isMobile: boolean;
}

export default function Home({ heroImg, isMobile }: HomeProps) {
  return (
    <section className="bg-[#f5f7fa] pt-2 text-purple-900">
      <div className="page-shell">
        <div className="surface-card overflow-hidden">
          <div className={`relative w-full ${isMobile ? "h-[450px]" : "h-[450px] max-[1200px]:h-[420px]"}`}>
            <Image
              src={heroImg}
              alt="Премиум козметика"
              fill
              className="object-contain object-right-bottom"
              priority
            />

            <div
              className={`absolute left-0 top-0 z-20 ${isMobile ? "w-[56%] px-5 pt-4" : "w-[42%] px-8 pt-5 max-[1200px]:w-[48%] max-[1200px]:px-7 max-[1200px]:pt-4"}`}
            >
              <h1
                className={`font-semibold text-purple-900 drop-shadow-[0_2px_8px_rgba(255,255,255,0.35)] ${
                  isMobile
                    ? "text-[30px] leading-[0.98] w-[300px] "
                    : "w-[800px] text-[50px] leading-[1.02] max-[1200px]:text-[42px] max-[1200px]:leading-[1] max-[720px]:w-[420px]"
                }`}
              >
                Премиум козметика с шафран
              </h1>
              <p
                className={`text-purple-900/80 ${
                  isMobile
                    ? "mt-10 w-[240px] text-[20px] leading-[1.35] max-[380px]:text-[18px]"
                    : "mt-10 max-w-[350px] text-[24px] leading-[1.45] max-[1200px]:mt-8 max-[1200px]:max-w-[310px] max-[1200px]:text-[24px] max-[1200px]:leading-[1.35]"
                }`}
              >
                Открийте силата на нашите висококачествени продукти.
              </p>
            </div>

            <div
              className={`absolute bottom-0 left-0 z-10 ${isMobile ? "px-5 pb-8" : "px-8 pb-12 max-[1200px]:px-7 max-[1200px]:pb-9"}`}
            >
              <Link
                href="/shop"
                className={`app-button-primary shadow-md ${
                  isMobile
                    ? "hero-cta-desktop hero-cta-text-mobile py-3"
                    : "hero-cta-desktop py-4 text-[17px] tracking-[0.08em] max-[1300px]:py-3 max-[1300px]:text-[14px] max-[1300px]:tracking-[0.08em] max-[720px]:text-[12px]"
                }`}
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
