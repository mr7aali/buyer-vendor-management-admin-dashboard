export type AdminLoginRequest = {
  email: string;
  password: string;
};

export type Admin = {
  id: number;
  email: string;
  role: string;
  permissions: string[];
};

export type AdminLoginResponse = {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    accessToken: string;
    admin: Admin;
  };
};
