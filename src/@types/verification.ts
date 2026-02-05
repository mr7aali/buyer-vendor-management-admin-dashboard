export type PendingBuyer = {
  id: string;
  userId: string;
  fulllName: string;
  phone: string;
  nidNumber: string;
  nidFontPhotoUrl: string;
  nidBackPhotoUrl: string;
  profilePhotoUrl: string;
  gender: string;
  createdAt: string;
  updatedAt: string;
  user: {
    id: string;
    email: string;
  };
};

export type PendingVendor = {
  id: string;
  userId: string;
  vendorCode: string;
  fulllName: string;
  phone: string;
  address: string;
  storename: string;
  storeDescription: string;
  gender: string;
  businessName: string | null;
  businessDescription: string | null;
  logoUrl: string;
  nationalIdNumber: string;
  nidFontPhotoUrl: string;
  nidBackPhotoUrl: string;
  bussinessIdPhotoUrl: string;
  isNidVerify: boolean;
  isBussinessIdVerified: boolean;
  createdAt: string;
  updatedAt: string;
  user: {
    id: string;
    email: string;
  };
};

export type PendingBuyersResponse = {
  success: boolean;
  statusCode: number;
  message: string;
  data: PendingBuyer[];
};

export type PendingVendorsResponse = {
  success: boolean;
  statusCode: number;
  message: string;
  data: PendingVendor[];
};
