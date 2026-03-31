// app/cart/page.tsx
import Cart from "@/components/cart/Cart";

export default function CartPage() {
  return (
    <div className="min-h-screen bg-[#f5f7fa] pt-2 pb-8">
      <div className="page-shell">
        <Cart />
      </div>
    </div>
  );
}
