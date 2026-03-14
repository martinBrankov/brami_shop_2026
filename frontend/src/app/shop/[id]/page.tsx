import ProductDetails from "@/components/ProductDetails";
import ProductNotFound from "@/components/ProductNotFound";

import id01 from "@/assets/images/products/0000001/01.jpg";
import id02 from "@/assets/images/products/0000002/01.jpg";
import id03 from "@/assets/images/products/0000003/01.jpg";
import id04 from "@/assets/images/products/0000004/01.jpg";
import id05 from "@/assets/images/products/0000005/01.jpg";
import id06 from "@/assets/images/products/0000006/01.jpg";

const products = [
  { id: "1", name: "Шампоан", imageSrc: id01, price: "19.90 лв", description: "Подхранва косата и придава блясък." },
  { id: "2", name: "Душгел", imageSrc: id02, price: "14.90 лв", description: "Нежно почиства и освежава кожата." },
  { id: "3", name: "Лосион за тяло", imageSrc: id03, price: "24.90 лв", description: "Дълбока хидратация и мекота." },
  { id: "4", name: "Крем за лице", imageSrc: id04, price: "29.90 лв", description: "Поддържа кожата свежа и сияйна." },
  { id: "5", name: "Душгел за мъже", imageSrc: id05, price: "16.90 лв", description: "Свеж аромат и дълготрайно усещане." },
  { id: "6", name: "Комплект", imageSrc: id06, price: "49.90 лв", description: "Идеален подарък за любим човек." },
];

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = products.find((p) => p.id === params.id);

  if (!product) return <ProductNotFound />;

  return (
    <ProductDetails
      name={product.name}
      imageSrc={product.imageSrc}
      price={product.price}
      description={product.description}
    />
  );
}
