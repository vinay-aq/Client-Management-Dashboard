const roles = [
  {
    name: "admin",
    description: "Full access to the client management system yuu",
    code: "ADMIN",
    isActive: true
  },
  {
    name: "manager",
    description: "Can manage clients and view team activities",
    code: "MANAGER",
    isActive: true

  },
  {
    name: "viewer",
    description: "Can view and manage assigned clients",
    code: "VIEWER",
    isActive: true

  },
];

module.exports = roles;
