// lib/products.ts
import id01 from "@/assets/images/products/0000001/01.jpg";
import id02 from "@/assets/images/products/0000002/01.jpg";
import id03 from "@/assets/images/products/0000003/01.jpg";
import id04 from "@/assets/images/products/0000004/01.jpg";
import id05 from "@/assets/images/products/0000005/01.jpg";
import id06 from "@/assets/images/products/0000006/01.jpg";

export type Product = {
  id: number;
  name: string;
  imageSrc: any;
  price: string;
  description: string;
};

export const products: Product[] = [
  {
    id: 1,
    name: "Шампоан",
    imageSrc: id01,
    price: "19.90 лв",
    description: "Подхранва косата и придава естествен блясък.",
  },
  {
    id: 2,
    name: "Душгел",
    imageSrc: id02,
    price: "14.90 лв",
    description: "Нежно почиства и освежава кожата.",
  },
  {
    id: 3,
    name: "Лосион за тяло",
    imageSrc: id03,
    price: "24.90 лв",
    description: "Дълбока хидратация с копринено усещане.",
  },
  {
    id: 4,
    name: "Крем за лице",
    imageSrc: id04,
    price: "29.90 лв",
    description: "Възстановява кожата и поддържа младежки вид.",
  },
  {
    id: 5,
    name: "Душгел за мъже",
    imageSrc: id05,
    price: "16.90 лв",
    description: "Свеж аромат и чиста кожа през целия ден.",
  },
  {
    id: 6,
    name: "Комплект",
    imageSrc: id06,
    price: "49.90 лв",
    description: "Перфектен подарък за специални поводи.",
  },
];

export const popularProducts: Product[] = getPopularProducts([4,3,5,1])

function getPopularProducts(ids: number[]): Product[] {
  return ids
    .map(id => products.find(p => p.id === id))
    .filter((p): p is Product => Boolean(p)); // премахва null/undefined
}
