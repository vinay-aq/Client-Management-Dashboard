export const ROLES = {
  ADMIN: "admin",

  MANAGER: "manager",

  VIEWER: "viewer",
} as const;

export type RoleType = (typeof ROLES)[keyof typeof ROLES];

export const ROLE_VALUES = Object.values(ROLES);

export function isRoleType(role: string): role is RoleType {
  return ROLE_VALUES.includes(role as RoleType);
}
