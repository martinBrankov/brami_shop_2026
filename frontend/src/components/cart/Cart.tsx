"use client";

import { useEffect, useState } from "react";
import { UserState, initialUserState } from "@/data/userData";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/contexts/CartContext";

type CheckoutStep = 1 | 2 | 3;

type CheckoutFormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  paymentMethod: "card" | "paypal" | "cash_on_delivery";
  acceptGdpr: boolean;
  acceptDeliveryTerms: boolean;
};

interface CartProps {
  initialUserState?: UserState;
}

const CHECKOUT_STEP_STORAGE_KEY = "brami-cart-checkout-step";
const CHECKOUT_FORM_STORAGE_KEY = "brami-cart-checkout-form";
const COURIER_SERVICE_PRICE = 4;

const getInitialFormData = (userState: UserState): CheckoutFormData => ({
  firstName: userState.user?.profile.firstName || "",
  lastName: userState.user?.profile.lastName || "",
  email: userState.user?.profile.email || "",
  phone: userState.user?.profile.phone || "",
  address: userState.user?.addresses.find((addr) => addr.type === "shipping" && addr.isDefault)?.street || "",
  city: userState.user?.addresses.find((addr) => addr.type === "shipping" && addr.isDefault)?.city || "",
  postalCode: userState.user?.addresses.find((addr) => addr.type === "shipping" && addr.isDefault)?.postalCode || "",
  paymentMethod: (userState.user?.paymentMethods.find((method) => method.isDefault)?.type || "cash_on_delivery") as "card" | "paypal" | "cash_on_delivery",
  acceptGdpr: false,
  acceptDeliveryTerms: false,
});

export default function Cart({ initialUserState: propUserState = initialUserState }: CartProps) {
  const { cartState, removeFromCart, updateQuantity, clearCart } = useCart();
  const [currentStep, setCurrentStep] = useState<CheckoutStep>(1);
  const [formData, setFormData] = useState<CheckoutFormData>(() => getInitialFormData(propUserState));
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderResult, setOrderResult] = useState<{
    success: boolean;
    message: string;
    orderNumber?: string;
  } | null>(null);
  const [didRestoreDraft, setDidRestoreDraft] = useState(false);
  const productsTotal = parseFloat(cartState.cart.totalPrice.replace("€", "")) || 0;
  const totalWithCourier = `€${(productsTotal + COURIER_SERVICE_PRICE).toFixed(2)}`;

  useEffect(() => {
    if (didRestoreDraft) {
      return;
    }

    const savedForm = window.sessionStorage.getItem(CHECKOUT_FORM_STORAGE_KEY);
    const savedStep = window.sessionStorage.getItem(CHECKOUT_STEP_STORAGE_KEY);

    if (savedForm) {
      try {
        setFormData(JSON.parse(savedForm) as CheckoutFormData);
      } catch {
        window.sessionStorage.removeItem(CHECKOUT_FORM_STORAGE_KEY);
      }
    }

    if (savedStep === "2" && cartState.cart.items.length > 0) {
      setCurrentStep(2);
    }

    setDidRestoreDraft(true);
  }, [cartState.cart.items.length, didRestoreDraft]);

  useEffect(() => {
    if (!didRestoreDraft || currentStep === 3) {
      return;
    }

    window.sessionStorage.setItem(CHECKOUT_STEP_STORAGE_KEY, String(currentStep));
    window.sessionStorage.setItem(CHECKOUT_FORM_STORAGE_KEY, JSON.stringify(formData));
  }, [currentStep, didRestoreDraft, formData]);

  const clearCheckoutDraft = () => {
    window.sessionStorage.removeItem(CHECKOUT_STEP_STORAGE_KEY);
    window.sessionStorage.removeItem(CHECKOUT_FORM_STORAGE_KEY);
  };

  const processCheckout = async (userData: CheckoutFormData) => {
    setIsProcessing(true);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    const orderNumber = generateOrderNumber();
    const timestamp = new Date().toLocaleString("bg-BG");

    setOrderResult({
      success: true,
      message: `Поръчката е направена успешно на ${timestamp}!`,
      orderNumber,
    });

    clearCart();
    clearCheckoutDraft();
    setFormData(getInitialFormData(propUserState));
    setIsProcessing(false);
    goToStep(3);
  };

  const generateOrderNumber = (): string => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const random = Math.floor(Math.random() * 10000)
      .toString()
      .padStart(4, "0");
    return `ORD-${year}${month}${day}-${random}`;
  };

  const goToStep = (step: CheckoutStep) => {
    setCurrentStep(step);
    if (step !== 3) {
      setOrderResult(null);
    }
  };

  const CartReview = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-purple-900">Преглед на количката</h2>
        <Link href="/shop" className="app-button-soft">
          Продължи с пазаруването
        </Link>
      </div>

      {cartState.cart.items.length === 0 ? (
        <div className="py-8 text-center">
          <p className="text-purple-700/80">Количката е празна</p>
          <Link href="/shop" className="app-button-soft mt-4">
            Към магазина
          </Link>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {cartState.cart.items.map((item) => (
              <div
                key={item.id}
                className="relative flex gap-4 rounded-xl border border-purple-100 bg-white/80 p-4 shadow-sm backdrop-blur-xl supports-[backdrop-filter]:bg-white/65"
              >
                <button
                  onClick={() => removeFromCart(item.product.id)}
                  className="absolute right-3 top-3 inline-flex h-7 w-7 items-center justify-center rounded-full bg-red-100 text-sm font-semibold uppercase text-red-600 transition-colors hover:bg-red-200 hover:text-red-700"
                  aria-label="Премахни продукт"
                >
                  x
                </button>

                <div className="relative h-20 w-20 flex-shrink-0">
                  <Link href={`/shop/${item.product.id}`} className="block h-full w-full">
                    <Image
                      src={item.product.imageSrc[0]}
                      alt={item.product.name}
                      fill
                      className="rounded object-cover transition-opacity hover:opacity-90"
                    />
                  </Link>
                </div>

                <div className="min-w-0 flex-1 pr-8">
                  <Link
                    href={`/shop/${item.product.id}`}
                    className="text-sm font-medium text-purple-900 transition-colors hover:text-purple-700"
                  >
                    {item.product.name}
                  </Link>

                  <p className="mt-1 text-xs text-purple-700/80">{item.product.price}</p>

                  <div className="mt-2 flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="app-icon-button h-6 w-6 text-xs"
                    >
                      -
                    </button>

                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => updateQuantity(item.product.id, Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-16 rounded border border-purple-200 px-2 py-1 text-center text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                      min="1"
                    />

                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="app-icon-button h-6 w-6 text-xs"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-purple-200 pt-4">
            <div className="mb-3 flex items-center justify-between text-sm text-purple-700">
              <span>Куриерска услуга</span>
              <span className="font-medium text-purple-900">€{COURIER_SERVICE_PRICE.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold text-purple-900">Общо: {totalWithCourier}</span>
              <button onClick={() => goToStep(2)} className="app-button-soft">
                Продължи към доставка
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );

  const UserInformation = () => {
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();

      const { firstName, lastName, email, phone, address, city, postalCode, acceptGdpr, acceptDeliveryTerms } = formData;

      if (!firstName || !lastName || !email || !phone || !address || !city || !postalCode) {
        setOrderResult({
          success: false,
          message: "Моля, попълнете всички задължителни полета.",
        });
        goToStep(3);
        return;
      }

      if (!acceptGdpr || !acceptDeliveryTerms) {
        setOrderResult({
          success: false,
          message: "Моля, потвърдете съгласието си с GDPR и условията за доставка.",
        });
        goToStep(3);
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setOrderResult({
          success: false,
          message: "Моля, въведете валиден имейл адрес.",
        });
        goToStep(3);
        return;
      }

      const phoneRegex = /^[+]?[\d\s\-()]{7,}$/;
      if (!phoneRegex.test(phone)) {
        setOrderResult({
          success: false,
          message: "Моля, въведете валиден телефонен номер (минимум 7 цифри).",
        });
        goToStep(3);
        return;
      }

      if (cartState.cart.items.length === 0) {
        setOrderResult({
          success: false,
          message: "Количката е празна. Моля, добавете продукти преди да завършите поръчката.",
        });
        goToStep(3);
        return;
      }

      processCheckout(formData);
    };

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-purple-900">Данни за доставка</h2>
          <button onClick={() => goToStep(1)} className="app-button-text">
            ← Обратно към количката
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-purple-700">Име</label>
              <input
                type="text"
                required
                autoComplete="given-name"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                className="w-full rounded-lg border border-purple-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-purple-700">Фамилия</label>
              <input
                type="text"
                required
                autoComplete="family-name"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                className="w-full rounded-lg border border-purple-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-purple-700">Имейл</label>
            <input
              type="email"
              required
              autoComplete="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full rounded-lg border border-purple-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-purple-700">Телефон</label>
            <input
              type="tel"
              required
              autoComplete="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full rounded-lg border border-purple-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-purple-700">Адрес</label>
            <input
              type="text"
              required
              autoComplete="street-address"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full rounded-lg border border-purple-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-purple-700">Град</label>
              <input
                type="text"
                required
                autoComplete="address-level2"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="w-full rounded-lg border border-purple-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-purple-700">Пощенски код</label>
              <input
                type="text"
                required
                autoComplete="postal-code"
                value={formData.postalCode}
                onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                className="w-full rounded-lg border border-purple-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-purple-700">Начин на плащане</label>
            <select
              value={formData.paymentMethod}
              onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value as "card" | "paypal" | "cash_on_delivery" })}
              className="w-full rounded-lg border border-purple-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="cash_on_delivery">Плащане при доставка</option>
              <option value="card">Карта</option>
              <option value="paypal">PayPal</option>
            </select>
          </div>

          <div className="space-y-3 rounded-xl border border-purple-100 bg-white/70 p-4">
            <label className="flex items-start gap-3 text-sm text-purple-800">
              <input
                type="checkbox"
                checked={formData.acceptGdpr}
                onChange={(e) => setFormData({ ...formData, acceptGdpr: e.target.checked })}
                className="mt-1 h-4 w-4 rounded border-purple-300 text-purple-700 focus:ring-purple-500"
              />
              <span>
                Съгласен/а съм с{" "}
                <Link href="/gdpr" className="font-medium text-purple-700 underline hover:text-purple-900">
                  GDPR и политиката за защита на личните данни
                </Link>.
              </span>
            </label>

            <label className="flex items-start gap-3 text-sm text-purple-800">
              <input
                type="checkbox"
                checked={formData.acceptDeliveryTerms}
                onChange={(e) => setFormData({ ...formData, acceptDeliveryTerms: e.target.checked })}
                className="mt-1 h-4 w-4 rounded border-purple-300 text-purple-700 focus:ring-purple-500"
              />
              <span>
                Съгласен/а съм с{" "}
                <Link href="/delivery-terms" className="font-medium text-purple-700 underline hover:text-purple-900">
                  условията за доставка
                </Link>.
              </span>
            </label>
          </div>

          <div className="border-t border-purple-200 pt-4">
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold text-purple-900">Общо: {totalWithCourier}</span>
              <button
                type="submit"
                disabled={isProcessing}
                className="app-button-soft disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isProcessing ? "Обработка..." : "Завърши поръчката"}
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  };

  const OrderResult = () => (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-purple-900">
        {orderResult?.success ? "Поръчката е успешна!" : "Грешка при поръчка"}
      </h2>

      <div
        className={`rounded-lg p-6 ${
          orderResult?.success ? "border border-green-200 bg-green-50" : "border border-red-200 bg-red-50"
        }`}
      >
        <div className="space-y-3">
          <p className={orderResult?.success ? "text-green-800" : "text-red-800"}>{orderResult?.message}</p>

          {orderResult?.success && orderResult.orderNumber && (
            <div className="rounded border border-green-300 bg-white p-4">
              <p className="mb-1 text-sm font-medium text-green-700">Номер на поръчка:</p>
              <p className="text-lg font-bold text-green-900">{orderResult.orderNumber}</p>
              <p className="mt-2 text-xs text-green-600">Запазете този номер за бъдещи справки</p>
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-4">
        {orderResult?.success ? (
          <>
            <button onClick={() => goToStep(1)} className="app-button-soft">
              Нова поръчка
            </button>
            <Link href="/shop" className="app-button-neutral">
              Продължи пазаруването
            </Link>
          </>
        ) : (
          <>
            <button onClick={() => goToStep(2)} className="app-button-soft">
              Опитай отново
            </button>

            <button onClick={() => goToStep(1)} className="app-button-neutral">
              Обратно към количката
            </button>
          </>
        )}
      </div>
    </div>
  );

  return (
    <div className="surface-card mx-auto w-full p-6">
      <div className="mb-8 flex items-center justify-center">
        <div className="flex items-center space-x-4">
          <div className={`flex h-8 w-8 items-center justify-center rounded-full ${currentStep >= 1 ? "bg-purple-600 text-white" : "bg-gray-200 text-gray-600"}`}>
            1
          </div>
          <div className={`h-1 w-16 ${currentStep >= 2 ? "bg-purple-600" : "bg-gray-200"}`} />
          <div className={`flex h-8 w-8 items-center justify-center rounded-full ${currentStep >= 2 ? "bg-purple-600 text-white" : "bg-gray-200 text-gray-600"}`}>
            2
          </div>
          <div className={`h-1 w-16 ${currentStep >= 3 ? "bg-purple-600" : "bg-gray-200"}`} />
          <div className={`flex h-8 w-8 items-center justify-center rounded-full ${currentStep >= 3 ? "bg-purple-600 text-white" : "bg-gray-200 text-gray-600"}`}>
            3
          </div>
        </div>
      </div>

      <div className="mb-6 flex justify-center">
        <div className="flex space-x-16 text-sm">
          <span className={`font-medium ${currentStep === 1 ? "text-purple-900" : "text-gray-600"}`}>Количка</span>
          <span className={`font-medium ${currentStep === 2 ? "text-purple-900" : "text-gray-600"}`}>Данни</span>
          <span className={`font-medium ${currentStep === 3 ? "text-purple-900" : "text-gray-600"}`}>Резултат</span>
        </div>
      </div>

      {currentStep === 1 && <CartReview />}
      {currentStep === 2 && <UserInformation />}
      {currentStep === 3 && <OrderResult />}
    </div>
  );
}

