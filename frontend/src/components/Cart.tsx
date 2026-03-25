"use client";

// components/Cart.tsx
import { useState } from "react";
import { UserState, User, initialUserState } from "@/data/userData";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/contexts/CartContext";

type CheckoutStep = 1 | 2 | 3;

interface CartProps {
  initialUserState?: UserState;
}

export default function Cart({ 
  initialUserState: propUserState = initialUserState 
}: CartProps) {
  const { cartState, addToCart, removeFromCart, updateQuantity, clearCart } = useCart();
  const [userState, setUserState] = useState<UserState>(propUserState);
  const [currentStep, setCurrentStep] = useState<CheckoutStep>(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderResult, setOrderResult] = useState<{
    success: boolean;
    message: string;
    orderNumber?: string;
  } | null>(null);

  // Mock checkout process
  const processCheckout = async (userData: any) => {
    setIsProcessing(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Always success for demo - generate order and show success
    const orderNumber = generateOrderNumber();
    const timestamp = new Date().toLocaleString('bg-BG');
    
    // Set success result
    setOrderResult({
      success: true,
      message: `Поръчката е направена успешно на ${timestamp}!`,
      orderNumber
    });
    
    // Clear cart only on success
    clearCart();
    
    // Stop processing and go to result
    setIsProcessing(false);
    goToStep(3);
  };

  // Helper function to generate order number
  const generateOrderNumber = (): string => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    return `ORD-${year}${month}${day}-${random}`;
  };

  // Navigate between steps
  const goToStep = (step: CheckoutStep) => {
    setCurrentStep(step);
    // Only clear order result when going back to step 1 or 2, not when going to step 3
    if (step !== 3) {
      setOrderResult(null);
    }
  };

  // Step 1: Cart Review
  const CartReview = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-purple-900">Преглед на количката</h2>
        <Link
          href="/shop"
          className="px-6 py-2 bg-purple-600 text-white text-sm rounded-lg hover:bg-purple-700 transition-colors"
        >
          Продължи с пазаруването
        </Link>
      </div>
      
      {cartState.cart.items.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-purple-700/80">Количката е празна</p>
          <Link 
            href="/shop" 
            className="inline-block mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Към магазина
          </Link>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {cartState.cart.items.map((item) => (
              <div key={item.id} className="flex gap-4 p-4 bg-white border border-purple-200 rounded-lg">
                <div className="relative w-20 h-20 flex-shrink-0">
                  <Link 
                    href={`/shop/${item.product.id}`}
                    className="block w-full h-full"
                  >
                    <Image
                      src={item.product.imageSrc[0]}
                      alt={item.product.name}
                      fill
                      className="object-cover rounded hover:opacity-90 transition-opacity"
                    />
                  </Link>
                </div>
                
                <div className="flex-1 min-w-0">
                  <Link 
                    href={`/shop/${item.product.id}`}
                    className="text-sm font-medium text-purple-900 hover:text-purple-700 transition-colors"
                  >
                    {item.product.name}
                  </Link>
                  
                  <p className="text-xs text-purple-700/80 mt-1">
                    {item.product.price}
                  </p>
                  
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="w-6 h-6 rounded bg-purple-200 text-purple-900 flex items-center justify-center hover:bg-purple-300 transition-colors text-xs"
                    >
                      -
                    </button>
                    
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => updateQuantity(item.product.id, Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-16 px-2 py-1 text-center border border-purple-200 rounded focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                      min="1"
                    />
                    
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="w-6 h-6 rounded bg-purple-200 text-purple-900 flex items-center justify-center hover:bg-purple-300 transition-colors text-xs"
                    >
                      +
                    </button>
                    
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="ml-auto text-red-500 hover:text-red-700 transition-colors text-xs"
                    >
                      Премахни
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="border-t border-purple-200 pt-4">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold text-purple-900">
                Общо: {cartState.cart.totalPrice}
              </span>
              <button
                onClick={() => goToStep(2)}
                className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                Продължи към доставка
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );

  // Step 2: User Information
  const UserInformation = () => {
    const [formData, setFormData] = useState({
      firstName: userState.user?.profile.firstName || '',
      lastName: userState.user?.profile.lastName || '',
      email: userState.user?.profile.email || '',
      phone: userState.user?.profile.phone || '',
      address: userState.user?.addresses.find(addr => addr.type === 'shipping' && addr.isDefault)?.street || '',
      city: userState.user?.addresses.find(addr => addr.type === 'shipping' && addr.isDefault)?.city || '',
      postalCode: userState.user?.addresses.find(addr => addr.type === 'shipping' && addr.isDefault)?.postalCode || '',
      paymentMethod: (userState.user?.paymentMethods.find(method => method.isDefault)?.type || 'cash_on_delivery') as 'card' | 'paypal' | 'cash_on_delivery'
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      
      // Debug: Log form data
      console.log('Form data:', formData);
      console.log('Cart items:', cartState.cart.items);
      
      // Validate form data
      const { firstName, lastName, email, phone, address, city, postalCode } = formData;
      
      if (!firstName || !lastName || !email || !phone || !address || !city || !postalCode) {
        console.log('Validation failed: empty fields');
        setOrderResult({
          success: false,
          message: "Моля, попълнете всички задължителни полета."
        });
        goToStep(3);
        return;
      }
      
      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        console.log('Validation failed: email', email);
        setOrderResult({
          success: false,
          message: "Моля, въведете валиден имейл адрес."
        });
        goToStep(3);
        return;
      }
      
      // Phone validation (more flexible)
      const phoneRegex = /^[+]?[\d\s\-\(\)]{7,}$/;
      if (!phoneRegex.test(phone)) {
        console.log('Validation failed: phone', phone);
        setOrderResult({
          success: false,
          message: "Моля, въведете валиден телефонен номер (минимум 7 цифри)."
        });
        goToStep(3);
        return;
      }
      
      // Check if cart is empty
      if (cartState.cart.items.length === 0) {
        console.log('Validation failed: empty cart');
        setOrderResult({
          success: false,
          message: "Количката е празна. Моля, добавете продукти преди да завършите поръчката."
        });
        goToStep(3);
        return;
      }
      
      console.log('All validations passed, processing checkout...');
      processCheckout(formData);
    };

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-purple-900">Данни за доставка</h2>
          <button
            onClick={() => goToStep(1)}
            className="text-purple-600 hover:text-purple-700 transition-colors text-sm"
          >
            ← Обратно към количката
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-purple-700 mb-1">Име</label>
              <input
                type="text"
                required
                autoComplete="given-name"
                value={formData.firstName}
                onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                className="w-full px-3 py-2 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-purple-700 mb-1">Фамилия</label>
              <input
                type="text"
                required
                autoComplete="family-name"
                value={formData.lastName}
                onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                className="w-full px-3 py-2 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-purple-700 mb-1">Имейл</label>
            <input
              type="email"
              required
              autoComplete="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full px-3 py-2 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-purple-700 mb-1">Телефон</label>
            <input
              type="tel"
              required
              autoComplete="tel"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              className="w-full px-3 py-2 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-purple-700 mb-1">Адрес</label>
            <input
              type="text"
              required
              autoComplete="street-address"
              value={formData.address}
              onChange={(e) => setFormData({...formData, address: e.target.value})}
              className="w-full px-3 py-2 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-purple-700 mb-1">Град</label>
              <input
                type="text"
                required
                autoComplete="address-level2"
                value={formData.city}
                onChange={(e) => setFormData({...formData, city: e.target.value})}
                className="w-full px-3 py-2 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-purple-700 mb-1">Пощенски код</label>
              <input
                type="text"
                required
                autoComplete="postal-code"
                value={formData.postalCode}
                onChange={(e) => setFormData({...formData, postalCode: e.target.value})}
                className="w-full px-3 py-2 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-purple-700 mb-1">Начин на плащане</label>
            <select
              value={formData.paymentMethod}
              onChange={(e) => setFormData({...formData, paymentMethod: e.target.value as 'card' | 'paypal' | 'cash_on_delivery'})}
              className="w-full px-3 py-2 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="cash_on_delivery">Плащане при доставка</option>
              <option value="card">Карта</option>
              <option value="paypal">PayPal</option>
            </select>
          </div>

          <div className="border-t border-purple-200 pt-4">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold text-purple-900">
                Общо: {cartState.cart.totalPrice}
              </span>
              <button
                type="submit"
                disabled={isProcessing}
                className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? 'Обработка...' : 'Завърши поръчката'}
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  };

  // Step 3: Order Result
  const OrderResult = () => {    
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-purple-900">
          {orderResult?.success ? 'Поръчката е успешна!' : 'Грешка при поръчка'}
        </h2>
        
        <div className={`p-6 rounded-lg ${
          orderResult?.success 
            ? 'bg-green-50 border border-green-200' 
            : 'bg-red-50 border border-red-200'
        }`}>
          <div className="space-y-3">
            <p className={`${
              orderResult?.success ? 'text-green-800' : 'text-red-800'
            }`}>
              {orderResult?.message}
            </p>
            
            {orderResult?.success && orderResult.orderNumber && (
              <div className="bg-white p-4 rounded border border-green-300">
                <p className="text-sm text-green-700 font-medium mb-1">
                  Номер на поръчка:
                </p>
                <p className="text-lg font-bold text-green-900">
                  {orderResult.orderNumber}
                </p>
                <p className="text-xs text-green-600 mt-2">
                  Запазете този номер за бъдещи справки
                </p>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex gap-4">
          {orderResult?.success ? (
            <>
              <button
                onClick={() => goToStep(1)}
                className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                Нова поръчка
              </button>
              <Link
                href="/shop"
                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Продължи пазаруването
              </Link>
            </>
          ) : (
            <>
              <button
                onClick={() => goToStep(2)}
                className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                Опитай отново
              </button>
              
              <button
                onClick={() => goToStep(1)}
                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Обратно към количката
              </button>
            </>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-sm">
      {/* Progress indicator */}
      <div className="flex items-center justify-center mb-8">
        <div className="flex items-center space-x-4">
          <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
            currentStep >= 1 ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-600'
          }`}>
            1
          </div>
          <div className={`w-16 h-1 ${
            currentStep >= 2 ? 'bg-purple-600' : 'bg-gray-200'
          }`} />
          <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
            currentStep >= 2 ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-600'
          }`}>
            2
          </div>
          <div className={`w-16 h-1 ${
            currentStep >= 3 ? 'bg-purple-600' : 'bg-gray-200'
          }`} />
          <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
            currentStep >= 3 ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-600'
          }`}>
            3
          </div>
        </div>
      </div>

      {/* Step labels */}
      <div className="flex justify-center mb-6">
        <div className="flex space-x-16 text-sm">
          <span className={`font-medium ${
            currentStep === 1 ? 'text-purple-900' : 'text-gray-600'
          }`}>Количка</span>
          <span className={`font-medium ${
            currentStep === 2 ? 'text-purple-900' : 'text-gray-600'
          }`}>Данни</span>
          <span className={`font-medium ${
            currentStep === 3 ? 'text-purple-900' : 'text-gray-600'
          }`}>Резултат</span>
        </div>
      </div>

      {/* Current step content */}
      {currentStep === 1 && <CartReview />}
      {currentStep === 2 && <UserInformation />}
      {currentStep === 3 && <OrderResult />}
    </div>
  );
}
