// app/shop/page.tsx
import { products } from "@/data/productsData";
import Image from "next/image";
import Link from "next/link";


export default function ShopPage() {
  return (
    <div className="min-h-screen bg-[#f5f7fa] px-4 pt-6 pb-6">
      <div className="max-w-5xl mx-auto flex justify-center">
        {/* Гъвкав grid с центриране и max-width 150px */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 justify-items-center">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/shop/${product.id}`}
              className="bg-white shadow-sm rounded-2xl overflow-hidden flex flex-col cursor-pointer hover:shadow-md transition-shadow w-full max-w-[200px]"
            >
              <div className="relative w-full aspect-square">
                <Image
                  src={product.imageSrc}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-3 flex flex-col gap-1">
                <div className="text-sm font-medium text-purple-900">
                  {product.name}
                </div>

                {/* кратко описание между име и цена */}
                <p className="text-xs text-purple-700/80 leading-snug line-clamp-2">
                  {product.description}
                </p>

                <div className="text-sm text-purple-700 mt-1">
                  {product.price}
                </div>

                {/* <button className="mt-2 inline-flex items-center justify-center w-full py-2 rounded-lg bg-[#e84356] text-white text-xs font-medium shadow-sm">
                  Добави в количката
                </button> */}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
