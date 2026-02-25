export type OrderResponse = {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    id: string;
    buyerId: string;
    vendorId: string;
    orderNumber: string;
    subtotal: string;
    discountAmount: string;
    totalAmount: string;
    shippingAddress: string;
    couponId: string | null;
    createdAt: string;
    updatedAt: string;
    status: string;
    items: Array<{
      id: string;
      orderId: string;
      productId: string;
      quantity: number;
      unitPrice: string;
      totalPrice: string;
      createdAt: string;
      updatedAt: string;
      product: {
        id: string;
        name: string;
        sku: string;
        price: string;
        imageUrl: string;
        vendorId: string;
        categoryId: string;
        images: string[];
      };
    }>;
    buyer: {
      id: string;
      fullName: string;
      phone: string;
      user: {
        id: string;
        email: string;
      };
    };
    vendor: {
      id: string;
      fullName: string;
      phone: string;
      businessName: string | null;
      vendorCode: string;
      logoUrl: string;
      user: {
        id: string;
        email: string;
      };
    };
    payments: {
      id: string;
      orderId: string;
      stripePaymentId: string | null;
      stripeCustomerId: string | null;
      amount: string;
      adminCommissionAmount: string;
      vendorPayoutAmount: string;
      createdAt: string;
      updatedAt: string;
      status: string;
      paymentMethod: string | null;
      lastFourDigits: string | null;
      cardBrand: string | null;
      expiresAt: string | null;
    } | null;
    coupon: {
      id: string;
      code: string | null;
      discountType: string;
      discountValue: string;
      minPurchaseAmount: string | null;
      maxDiscountAmount: string | null;
    } | null;
    _count: {
      items: number;
      productReviews: number;
      vendorReviews: number;
    };
  };
};
