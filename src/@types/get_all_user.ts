export type IUsersListApiResponse = {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    data: Array<{
      id: string;
      email: string;
      index: number;
      passwordHash: string;
      createdAt: string;
      updatedAt: string;
      userType: "user" | "buyer" | "vendor";
      evanAddress: string;

      _count: {
        receivedMessages: number;
        sentMessages: number;
        notifications: number;
        refreshTokens: number;
      };

      buyer: null | {
        id: string;
        userId: string;
        fulllName: string;
        phone: string;
        nidNumber: string;
        profilePhotoUrl: string;
        gender: "male" | "female" | "other";
        createdAt: string;
        updatedAt: string;

        _count: {
          orders: number;
          messages: number;
          couponAssignments: number;
          connections: number;
        };

        orderStats: {
          totalCount: number;
          totalAmount: number;
          byStatus: Record<string, number>;
        };
      };

      vendor: null | {
        id: string;
        userId: string;
        vendorCode: string;
        fulllName: string;
        phone: string;
        address: string;
        storename: string;
        storeDescription: string;
        gender: "male" | "female" | "other";

        businessName: string | null;
        businessDescription: string | null;

        logoUrl: string;
        nationalIdNumber: string;
        bussinessRegNumber: string;
        bussinessIdPhotoUrl: string;

        isActive: boolean;

        createdAt: string;
        updatedAt: string;

        _count: {
          orders: number;
          products: number;
          categories: number;
          coupons: number;
          messages: number;
          connections: number;
        };

        orderStats: {
          totalCount: number;
          totalAmount: number;
          byStatus: Record<string, number>;
        };
        revenue: number;
      };
    }>;

    meta: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
      hasNextPage: boolean;
      hasPrevPage: boolean;
    };
  };
};
