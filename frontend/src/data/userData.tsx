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
  cardNumber?: string;
  cardBrand?: 'visa' | 'mastercard' | 'amex';
  expiryDate?: string;
  isDefault: boolean;
}

export type UserOrderStatus =
  | 'pending'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled';

export interface UserOrderItem {
  productId: number;
  productName: string;
  productImage: string;
  quantity: number;
  price: string;
  totalPrice: string;
}

export interface UserOrder {
  id: number;
  orderNumber: string;
  items: UserOrderItem[];
  totalAmount: string;
  status: UserOrderStatus;
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

export interface UserActionPayload {
  user?: User;
  profile?: UserProfile;
  address?: UserAddress;
  addressId?: number;
  paymentMethod?: UserPaymentMethod;
  paymentMethodId?: number;
  preferences?: UserPreferences;
  error?: string;
}

export interface UserAction {
  type: UserActionType;
  payload?: UserActionPayload;
}

export const initialUserState: UserState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

export const defaultUserPreferences: UserPreferences = {
  language: 'bg',
  currency: 'EUR',
  newsletter: false,
  smsNotifications: true,
  emailNotifications: true,
};

const DEFAULT_ERROR_MESSAGES = {
  login: 'Login failed',
} as const;

const CURRENCY_SYMBOL = 'EUR ';

const updateUser = (
  state: UserState,
  updater: (user: User) => User,
): UserState => {
  if (!state.user) {
    return state;
  }

  return {
    ...state,
    user: {
      ...updater(state.user),
      updatedAt: new Date(),
    },
  };
};

const parseCurrencyAmount = (value: string): number => {
  const normalizedValue = value.replace(',', '.');
  const amount = Number.parseFloat(
    normalizedValue.replace(/[^\d.]+/g, ''),
  );

  return Number.isFinite(amount) ? amount : 0;
};

export const generateOrderNumber = (): string => {
  const timestamp = Date.now().toString();
  const random = Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, '0');

  return `ORD-${timestamp}-${random}`;
};

export const formatUserFullName = (user: User): string => {
  return `${user.profile.firstName} ${user.profile.lastName}`;
};

export const getUserDefaultAddress = (
  user: User,
  type: UserAddress['type'],
): UserAddress | null => {
  return user.addresses.find(address => address.type === type && address.isDefault) ?? null;
};

export const getUserDefaultPaymentMethod = (
  user: User,
): UserPaymentMethod | null => {
  return user.paymentMethods.find(method => method.isDefault) ?? null;
};

export const getUserOrdersByStatus = (
  user: User,
  status: UserOrderStatus,
): UserOrder[] => {
  return user.orders.filter(order => order.status === status);
};

export const getUserTotalSpent = (user: User): string => {
  const total = getUserOrdersByStatus(user, 'delivered').reduce(
    (sum, order) => sum + parseCurrencyAmount(order.totalAmount),
    0,
  );

  return `${CURRENCY_SYMBOL}${total.toFixed(2)}`;
};

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
    error: action.payload?.error || DEFAULT_ERROR_MESSAGES.login,
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
  const { profile } = action.payload ?? {};
  if (!profile) return state;

  return updateUser(state, user => ({
    ...user,
    profile,
  }));
};

const handleAddAddress = (state: UserState, action: UserAction): UserState => {
  const { address } = action.payload ?? {};
  if (!address) return state;

  const newAddress: UserAddress = {
    ...address,
    id: Date.now(),
  };

  return updateUser(state, user => ({
    ...user,
    addresses: [...user.addresses, newAddress],
  }));
};

const handleUpdateAddress = (state: UserState, action: UserAction): UserState => {
  const { address, addressId } = action.payload ?? {};
  if (!address || addressId === undefined) return state;

  return updateUser(state, user => ({
    ...user,
    addresses: user.addresses.map(existingAddress =>
      existingAddress.id === addressId ? address : existingAddress,
    ),
  }));
};

const handleDeleteAddress = (state: UserState, action: UserAction): UserState => {
  const { addressId } = action.payload ?? {};
  if (addressId === undefined) return state;

  return updateUser(state, user => ({
    ...user,
    addresses: user.addresses.filter(address => address.id !== addressId),
  }));
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

export const userUtils = {
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

  updateProfile: (profile: UserProfile): UserAction => ({
    type: 'UPDATE_PROFILE',
    payload: { profile },
  }),

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

  setLoading: (): UserAction => ({
    type: 'SET_LOADING',
  }),

  setError: (error: string): UserAction => ({
    type: 'SET_ERROR',
    payload: { error },
  }),
};
