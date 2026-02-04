// User Type Enum
export enum UserType {
  BUYER = "buyer",
  VENDOR = "vendor",
  ADMIN = "admin",
}

// Gender Enum
export enum Gender {
  MALE = "male",
  FEMALE = "female",
  OTHER = "other",
}

// Order Status Enum (reusing from previous)
export enum OrderStatus {
  PENDING = "pending",
  PROCESSING = "processing",
  SHIPPED = "shipped",
  OUT_FOR_DELIVERED = "out_for_delivered",
  DELIVERED = "delivered",
  CANCELLED = "cancelled",
}

// User
type User = {
  id: string;
  email: string;
  userType: UserType | string;
  evanAddress: string;
  createdAt: string;
  updatedAt: string;
};

// Vendor in Order
type OrderVendor = {
  id: string;
  businessName: string | null;
  vendorCode: string;
};

// Order Count
type OrderCount = {
  items: number;
  productReviews: number;
  vendorReviews: number;
};

// Buyer Order
type BuyerOrder = {
  id: string;
  orderNumber: string;
  status: OrderStatus | string;
  subtotal: string;
  discountAmount: string;
  totalAmount: string;
  createdAt: string;
  vendor: OrderVendor;
  _count: OrderCount;
};

// Buyer Profile Count
type BuyerCount = {
  orders: number;
  messages: number;
  couponAssignments: number;
  connections: number;
};

// Buyer Details
type BuyerDetails = {
  id: string;
  userId: string;
  fulllName: string;
  phone: string;
  nidNumber: string;
  nidFontPhotoUrl: string;
  nidBackPhotoUrl: string;
  profilePhotoUrl: string;
  createdAt: string;
  updatedAt: string;
  gender: Gender | string;
  user: User;
  orders: BuyerOrder[];
  _count: BuyerCount;
};

// API Response
export type AdminUserDetailsResponse = {
  success: boolean;
  statusCode: number;
  message: string;
  data: BuyerDetails;
};
