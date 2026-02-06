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
export type AdminProfile = {
  avatar: string;
  email: string;
  fullName: string;
  id: number;
  role: AdminRole | string;
  permissions: string[];
  _count?: {
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

export type UpdateAdminProfileRequest = {
  fullName: string;
  email: string;
  avatar?: File | null;
  bio?: string;
};

export type UpdateAdminProfileResponse = {
  success: boolean;
  statusCode: number;
  message: string;
  data: AdminProfile;
};

export type ChangeAdminPasswordRequest = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export type ChangeAdminPasswordResponse = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};
