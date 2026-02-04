// Admin Role Enum
export enum AdminRole {
  SUPER_ADMIN = "SUPER_ADMIN",
  //   ADMIN = "ADMIN",
  MODERATOR = "EMPLOYEE",
}

// Admin Permission (if needed for future)
type AdminPermission = {
  id: string;
  name: string;
  description?: string;
};

// Admin Profile
type AdminProfile = {
  avatar: string;
  email: string;
  fullName: string;
  id: number;
  role: AdminRole | string;
  permissions: AdminPermission[];
  _count: {
    permissions: number;
  };
  updatedAt: string;
  createdAt: string;
};

// API Response
export type AdminMeResponse = {
  success: boolean;
  statusCode: number;
  message: string;
  data: AdminProfile;
};
