import type { AuthUser } from "../auth/auth.types.js";

type User = AuthUser;

type CreateClientData = {
  name: string;
  email: string;
  phone: string;
  company: string;
  avatar?: string | null;
  user: User;
  clientTypeId: string | number;
  industryId: string | number;
};

type UpdateClientType = {
  name: string;
  email: string;
  phone: string;
  company: string;
  status_id: string;
  type_id: string;
  industry_id: string;
  avatar?: string | null;
  user: User;
};

export type { User, CreateClientData, UpdateClientType };
