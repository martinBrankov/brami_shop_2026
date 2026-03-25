// app/cart/page.tsx
import Cart from "@/components/Cart";

export default function CartPage() {
  return (
    <div className="min-h-screen bg-[#f5f7fa] py-8">
      <div className="container mx-auto px-4">
        <Cart />
      </div>
    </div>
  );
}
