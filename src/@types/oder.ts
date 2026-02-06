// Buyer
export enum OrderStatus {
  PENDING = "pending",
  PROCESSING = "processing",
  SHIPPED = "shipped",
  OUT_FOR_DELIVERED = "out_for_delivered",
  DELIVERED = "delivered",
  CANCELLED = "cancelled",
}

export type OrderBuyer = {
  id: string;
  fulllName: string;
  phone: string;
};

// Count
export type OrderCount = {
  items: number;
};

// Order entity
export type Order = {
  id: string;
  orderNumber: string;
  status: OrderStatus; // ✅ enum used here

  subtotal: string;
  discountAmount: string;
  totalAmount: string;

  createdAt: string;
  updatedAt: string;

  buyer: OrderBuyer;
  _count: OrderCount;
};

// Pagination meta
export type PaginationMeta = {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

// Inner wrapper
export type OrderListData = {
  data: Order[];
  meta: PaginationMeta;
};

// API response
export type OrderListResponse = {
  success: boolean;
  statusCode: number;
  message: string;
  data: OrderListData;
};
