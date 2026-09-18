export type AuthUser = {
  id: number;
  name: string;
  role: {
    id: number;
    name: string;
    description: string | null;
    code: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
  };
  permissions: string[];
  
};