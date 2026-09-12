export const MASTER_TYPES = {
  USER_ROLE: "role",
  CLIENT_TYPE: "clientType",
  CLIENT_STATUS: "clientStatus",
  CLIENT_INDUSTRY: "industry",
} as const;

export const masterTypes = Object.values(MASTER_TYPES);

export type MasterTypeData = (typeof MASTER_TYPES)[keyof typeof MASTER_TYPES];
