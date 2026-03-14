// components/ProductDetails.tsx
import Image from "next/image";

type ProductDetailsProps = {
  name: string;
  imageSrc: any;
  price: string;
  description: string;
};

export default function ProductDetails({
  name,
  imageSrc,
  price,
  description,
}: ProductDetailsProps) {
  return (
    <section className="px-4 py-6 bg-white rounded-3xl shadow-sm max-w-5xl mx-auto">
      <div className="grid md:grid-cols-2 gap-6 items-start">
        
        {/* Снимка */}
        <div className="relative w-3/4 mx-auto aspect-square">
          <Image
            src={imageSrc}
            alt={name}
            fill
            className="object-cover rounded-2xl"
          />
        </div>

        {/* Информация */}
        <div className="flex flex-col gap-3 text-purple-900">
          <h1 className="text-2xl font-semibold">{name}</h1>

          <p className="text-sm text-purple-700/80 leading-relaxed">
            {description}
          </p>

          <div className="text-lg font-semibold mt-2">{price}</div>

          {/* <button className="mt-3 inline-flex items-center justify-center w-full py-3 rounded-lg bg-[#e84356] text-white text-sm font-medium shadow-md">
            Добави в количката
          </button> */}
        </div>
      </div>
    </section>
  );
}
