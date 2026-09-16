export type AuthUser = {
  id: number;
  name: string;
  role: {
    id: number;
    name: string;
    description: string;
    code: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
  };
  permissions: string[];
  iat: number;
  exp: number;
};