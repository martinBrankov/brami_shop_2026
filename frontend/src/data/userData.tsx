// data/userData.tsx

export interface UserAddress {
  id: number;
  type: 'shipping' | 'billing';
  street: string;
  city: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
}

export interface UserPaymentMethod {
  id: number;
  type: 'card' | 'paypal' | 'cash_on_delivery';
  cardNumber?: string; // Last 4 digits only for security
  cardBrand?: 'visa' | 'mastercard' | 'amex';
  expiryDate?: string;
  isDefault: boolean;
}

export interface UserOrder {
  id: number;
  orderNumber: string;
  items: Array<{
    productId: number;
    productName: string;
    productImage: string;
    quantity: number;
    price: string;
    totalPrice: string;
  }>;
  totalAmount: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: UserAddress;
  billingAddress?: UserAddress;
  paymentMethod: UserPaymentMethod;
  createdAt: Date;
  updatedAt: Date;
  estimatedDelivery?: Date;
  trackingNumber?: string;
}

export interface UserPreferences {
  language: 'bg' | 'en';
  currency: 'EUR' | 'BGN';
  newsletter: boolean;
  smsNotifications: boolean;
  emailNotifications: boolean;
}

export interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth?: Date;
  gender?: 'male' | 'female' | 'other';
  avatar?: string;
}

export interface User {
  id: number;
  email: string;
  isEmailVerified: boolean;
  profile: UserProfile;
  addresses: UserAddress[];
  paymentMethods: UserPaymentMethod[];
  orders: UserOrder[];
  preferences: UserPreferences;
  createdAt: Date;
  updatedAt: Date;
  lastLoginAt?: Date;
}

export interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

// User action types
export type UserActionType = 
  | 'LOGIN_SUCCESS'
  | 'LOGIN_ERROR'
  | 'LOGOUT'
  | 'REGISTER_SUCCESS'
  | 'REGISTER_ERROR'
  | 'UPDATE_PROFILE'
  | 'ADD_ADDRESS'
  | 'UPDATE_ADDRESS'
  | 'DELETE_ADDRESS'
  | 'ADD_PAYMENT_METHOD'
  | 'UPDATE_PAYMENT_METHOD'
  | 'DELETE_PAYMENT_METHOD'
  | 'SET_PREFERENCES'
  | 'SET_LOADING'
  | 'SET_ERROR';

export interface UserAction {
  type: UserActionType;
  payload?: {
    user?: User;
    profile?: UserProfile;
    address?: UserAddress;
    addressId?: number;
    paymentMethod?: UserPaymentMethod;
    paymentMethodId?: number;
    preferences?: UserPreferences;
    error?: string;
  };
}

// Initial user state
export const initialUserState: UserState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

// Default user preferences
export const defaultUserPreferences: UserPreferences = {
  language: 'bg',
  currency: 'EUR',
  newsletter: false,
  smsNotifications: true,
  emailNotifications: true,
};

// Helper functions
export const generateOrderNumber = (): string => {
  const timestamp = Date.now().toString();
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `ORD-${timestamp}-${random}`;
};

export const formatUserFullName = (user: User): string => {
  return `${user.profile.firstName} ${user.profile.lastName}`;
};

export const getUserDefaultAddress = (user: User, type: 'shipping' | 'billing'): UserAddress | null => {
  return user.addresses.find(addr => addr.type === type && addr.isDefault) || null;
};

export const getUserDefaultPaymentMethod = (user: User): UserPaymentMethod | null => {
  return user.paymentMethods.find(method => method.isDefault) || null;
};

export const getUserOrdersByStatus = (user: User, status: UserOrder['status']): UserOrder[] => {
  return user.orders.filter(order => order.status === status);
};

export const getUserTotalSpent = (user: User): string => {
  const deliveredOrders = getUserOrdersByStatus(user, 'delivered');
  const total = deliveredOrders.reduce((sum, order) => {
    const priceMatch = order.totalAmount.match(/€(\d+\.?\d*)/);
    if (priceMatch) {
      return sum + parseFloat(priceMatch[1]);
    }
    return sum;
  }, 0);
  return `€${total.toFixed(2)}`;
};

// User action handlers
const handleLoginSuccess = (state: UserState, action: UserAction): UserState => {
  if (!action.payload?.user) return state;
  
  return {
    ...state,
    user: action.payload.user,
    isAuthenticated: true,
    isLoading: false,
    error: null,
  };
};

const handleLoginError = (state: UserState, action: UserAction): UserState => {
  return {
    ...state,
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: action.payload?.error || 'Login failed',
  };
};

const handleLogout = (state: UserState): UserState => {
  return {
    ...state,
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
  };
};

const handleUpdateProfile = (state: UserState, action: UserAction): UserState => {
  if (!state.user || !action.payload?.profile) return state;
  
  return {
    ...state,
    user: {
      ...state.user,
      profile: action.payload.profile,
      updatedAt: new Date(),
    },
  };
};

const handleAddAddress = (state: UserState, action: UserAction): UserState => {
  if (!state.user || !action.payload?.address) return state;
  
  const newAddress = {
    ...action.payload.address,
    id: Date.now(),
  };
  
  return {
    ...state,
    user: {
      ...state.user,
      addresses: [...state.user.addresses, newAddress],
      updatedAt: new Date(),
    },
  };
};

const handleUpdateAddress = (state: UserState, action: UserAction): UserState => {
  if (!state.user || !action.payload?.address || !action.payload.addressId) return state;
  
  const updatedAddresses = state.user.addresses.map(addr =>
    addr.id === action.payload!.addressId ? action.payload!.address! : addr
  );
  
  return {
    ...state,
    user: {
      ...state.user,
      addresses: updatedAddresses,
      updatedAt: new Date(),
    },
  };
};

const handleDeleteAddress = (state: UserState, action: UserAction): UserState => {
  if (!state.user || !action.payload?.addressId) return state;
  
  const updatedAddresses = state.user.addresses.filter(
    addr => addr.id !== action.payload!.addressId
  );
  
  return {
    ...state,
    user: {
      ...state.user,
      addresses: updatedAddresses,
      updatedAt: new Date(),
    },
  };
};

const handleSetLoading = (state: UserState): UserState => {
  return {
    ...state,
    isLoading: true,
  };
};

const handleSetError = (state: UserState, action: UserAction): UserState => {
  return {
    ...state,
    isLoading: false,
    error: action.payload?.error || null,
  };
};

// User reducer function
export const userReducer = (state: UserState, action: UserAction): UserState => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return handleLoginSuccess(state, action);
    case 'LOGIN_ERROR':
      return handleLoginError(state, action);
    case 'LOGOUT':
      return handleLogout(state);
    case 'UPDATE_PROFILE':
      return handleUpdateProfile(state, action);
    case 'ADD_ADDRESS':
      return handleAddAddress(state, action);
    case 'UPDATE_ADDRESS':
      return handleUpdateAddress(state, action);
    case 'DELETE_ADDRESS':
      return handleDeleteAddress(state, action);
    case 'SET_LOADING':
      return handleSetLoading(state);
    case 'SET_ERROR':
      return handleSetError(state, action);
    default:
      return state;
  }
};

// User utility functions
export const userUtils = {
  // Login actions
  loginSuccess: (user: User): UserAction => ({
    type: 'LOGIN_SUCCESS',
    payload: { user },
  }),
  
  loginError: (error: string): UserAction => ({
    type: 'LOGIN_ERROR',
    payload: { error },
  }),
  
  logout: (): UserAction => ({
    type: 'LOGOUT',
  }),
  
  // Profile actions
  updateProfile: (profile: UserProfile): UserAction => ({
    type: 'UPDATE_PROFILE',
    payload: { profile },
  }),
  
  // Address actions
  addAddress: (address: UserAddress): UserAction => ({
    type: 'ADD_ADDRESS',
    payload: { address },
  }),
  
  updateAddress: (addressId: number, address: UserAddress): UserAction => ({
    type: 'UPDATE_ADDRESS',
    payload: { addressId, address },
  }),
  
  deleteAddress: (addressId: number): UserAction => ({
    type: 'DELETE_ADDRESS',
    payload: { addressId },
  }),
  
  // Loading and error actions
  setLoading: (): UserAction => ({
    type: 'SET_LOADING',
  }),
  
  setError: (error: string): UserAction => ({
    type: 'SET_ERROR',
    payload: { error },
  }),
};
