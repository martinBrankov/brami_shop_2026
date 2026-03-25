"use client";

// contexts/CartContext.tsx
import { createContext, useContext, useReducer, ReactNode } from "react";
import { CartState, CartAction, initialCartState, cartReducer } from "@/data/cartData";
import { Product } from "@/data/productsData";

interface CartContextType {
  cartState: CartState;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartState, dispatch] = useReducer(cartReducer, initialCartState);

  const addToCart = (product: Product, quantity: number = 1) => {
    dispatch({
      type: 'ADD_TO_CART',
      payload: { product, quantity }
    });
  };

  const removeFromCart = (productId: number) => {
    dispatch({
      type: 'REMOVE_FROM_CART',
      payload: { productId }
    });
  };

  const updateQuantity = (productId: number, quantity: number) => {
    dispatch({
      type: 'UPDATE_QUANTITY',
      payload: { productId, quantity }
    });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  return (
    <CartContext.Provider value={{
      cartState,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
