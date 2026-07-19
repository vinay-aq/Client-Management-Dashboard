// export const ROLES = {
//   ADMIN: "admin",
//   MANAGER: "manager",
//   VIEWER: "viewer",
// };

// export const PERMISSIONS = {
//   CREATE_CLIENT: [ROLES.ADMIN, ROLES.MANAGER],
//   EDIT_CLIENT: [ROLES.ADMIN, ROLES.MANAGER],
//   DELETE_CLIENT: [ROLES.ADMIN],
//   VIEW_CLIENTS: [ROLES.ADMIN, ROLES.MANAGER, ROLES.VIEWER],
//   MANAGER_USERS: [ROLES.ADMIN]

// };

export const PERMISSIONS = {
  CLIENT_CREATE: "client.create",
  CLIENT_EDIT: "client.edit",
  CLIENT_DELETE: "client.delete",
  CLIENT_VIEW: "client.view",
  USERS_VIEW: "user.view",
  USER_ROLE_UPDATE: "user.role.update",
  USER_STATUS_UPDATE: "user.status.update",
  DASHBOARD_VIEW: "dashboard.view",
  MASTER_MANAGE: "master.manage"
};
