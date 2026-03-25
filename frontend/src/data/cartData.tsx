// data/cartData.tsx
import { Product } from './productsData';

export interface CartItem {
  id: number;
  product: Product;
  quantity: number;
  addedAt: Date;
}

export interface Cart {
  items: CartItem[];
  totalItems: number;
  totalPrice: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CartState {
  cart: Cart;
  isLoading: boolean;
  error: string | null;
}

// Helper function to calculate total items
export const calculateTotalItems = (items: CartItem[]): number => {
  return items.reduce((total, item) => total + item.quantity, 0);
};

// Helper function to calculate total price
export const calculateTotalPrice = (items: CartItem[]): string => {
  // Extract numeric values from price strings (e.g., "€35.28/69.00лв." -> 35.28)
  const total = items.reduce((sum, item) => {
    const priceMatch = item.product.price.match(/€(\d+\.?\d*)/);
    if (priceMatch) {
      const price = parseFloat(priceMatch[1]);
      return sum + (price * item.quantity);
    }
    return sum;
  }, 0);
  
  return `€${total.toFixed(2)}`;
};

// Initial empty cart state
export const initialCart: Cart = {
  items: [],
  totalItems: 0,
  totalPrice: '€0.00',
  createdAt: new Date(),
  updatedAt: new Date(),
};

// Initial cart state for React state management
export const initialCartState: CartState = {
  cart: initialCart,
  isLoading: false,
  error: null,
};

// Cart actions types
export type CartActionType = 
  | 'ADD_TO_CART'
  | 'REMOVE_FROM_CART'
  | 'UPDATE_QUANTITY'
  | 'CLEAR_CART'
  | 'SET_LOADING'
  | 'SET_ERROR';

export interface CartAction {
  type: CartActionType;
  payload?: {
    productId?: number;
    product?: Product;
    quantity?: number;
    error?: string;
  };
}

// Cart action handlers
const handleAddToCart = (state: CartState, action: CartAction): CartState => {
  if (!action.payload?.product) return state;
  
  const existingItemIndex = state.cart.items.findIndex(
    item => item.product.id === action.payload!.product!.id
  );
  
  let newItems: CartItem[];
  
  if (existingItemIndex >= 0) {
    // Update existing item quantity
    newItems = [...state.cart.items];
    newItems[existingItemIndex] = {
      ...newItems[existingItemIndex],
      quantity: newItems[existingItemIndex].quantity + (action.payload!.quantity || 1),
    };
  } else {
    // Add new item
    const newItem: CartItem = {
      id: Date.now(), // Use timestamp as cart item ID
      product: action.payload!.product!,
      quantity: action.payload!.quantity || 1,
      addedAt: new Date(),
    };
    newItems = [...state.cart.items, newItem];
  }
  
  return {
    ...state,
    cart: {
      items: newItems,
      totalItems: calculateTotalItems(newItems),
      totalPrice: calculateTotalPrice(newItems),
      createdAt: state.cart.createdAt,
      updatedAt: new Date(),
    },
  };
};

const handleRemoveFromCart = (state: CartState, action: CartAction): CartState => {
  if (!action.payload?.productId) return state;
  
  const newItems = state.cart.items.filter(
    item => item.product.id !== action.payload!.productId
  );
  
  return {
    ...state,
    cart: {
      items: newItems,
      totalItems: calculateTotalItems(newItems),
      totalPrice: calculateTotalPrice(newItems),
      createdAt: state.cart.createdAt,
      updatedAt: new Date(),
    },
  };
};

const handleUpdateQuantity = (state: CartState, action: CartAction): CartState => {
  if (!action.payload?.productId || action.payload.quantity === undefined) return state;
  
  const newItems = state.cart.items.map(item => {
    if (item.product.id === action.payload!.productId) {
      return {
        ...item,
        quantity: Math.max(1, action.payload!.quantity!),
      };
    }
    return item;
  });
  
  return {
    ...state,
    cart: {
      items: newItems,
      totalItems: calculateTotalItems(newItems),
      totalPrice: calculateTotalPrice(newItems),
      createdAt: state.cart.createdAt,
      updatedAt: new Date(),
    },
  };
};

const handleClearCart = (state: CartState): CartState => {
  return {
    ...state,
    cart: {
      ...initialCart,
      createdAt: state.cart.createdAt,
      updatedAt: new Date(),
    },
  };
};

const handleSetLoading = (state: CartState, action: CartAction): CartState => {
  return {
    ...state,
    isLoading: action.payload?.error !== undefined ? false : true,
  };
};

const handleSetError = (state: CartState, action: CartAction): CartState => {
  return {
    ...state,
    isLoading: false,
    error: action.payload?.error || null,
  };
};

// Cart reducer function
export const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return handleAddToCart(state, action);
    case 'REMOVE_FROM_CART':
      return handleRemoveFromCart(state, action);
    case 'UPDATE_QUANTITY':
      return handleUpdateQuantity(state, action);
    case 'CLEAR_CART':
      return handleClearCart(state);
    case 'SET_LOADING':
      return handleSetLoading(state, action);
    case 'SET_ERROR':
      return handleSetError(state, action);
    default:
      return state;
  }
};

// Cart utility functions
export const cartUtils = {
  // Add item to cart
  addToCart: (product: Product, quantity: number = 1): CartAction => ({
    type: 'ADD_TO_CART',
    payload: { product, quantity },
  }),
  
  // Remove item from cart
  removeFromCart: (productId: number): CartAction => ({
    type: 'REMOVE_FROM_CART',
    payload: { productId },
  }),
  
  // Update item quantity
  updateQuantity: (productId: number, quantity: number): CartAction => ({
    type: 'UPDATE_QUANTITY',
    payload: { productId, quantity },
  }),
  
  // Clear entire cart
  clearCart: (): CartAction => ({
    type: 'CLEAR_CART',
  }),
  
  // Set loading state
  setLoading: (): CartAction => ({
    type: 'SET_LOADING',
  }),
  
  // Set error state
  setError: (error: string): CartAction => ({
    type: 'SET_ERROR',
    payload: { error },
  }),
};
