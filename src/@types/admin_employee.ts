export type AdminEmployeePermission = {
  id?: number;
  key: string;
  name: string;
  description?: string;
};

export type AdminEmployee = {
  id: number;
  email: string;
  role: string;
  createdAt?: string;
  permissions: AdminEmployeePermission[] | string[];
};

export type CreateAdminEmployeeRequest = {
  email: string;
  password: string;
  permissions?: string[];
};

export type CreateAdminEmployeeResponse = {
  success: boolean;
  message: string;
  employee: {
    id: number;
    email: string;
    role: string;
  };
};

export type GetAdminEmployeesResponse = {
  success: boolean;
  statusCode: number;
  message: string;
  data: AdminEmployee[];
};

export type UpdateAdminEmployeePermissionsRequest = {
  id: number | string;
  permissions: string[];
};

export type UpdateAdminEmployeePermissionsResponse = {
  success?: boolean;
  message?: string;
  permissions?: string[];
};
