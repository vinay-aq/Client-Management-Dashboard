const MASTER_TYPES = {
  USER_ROLE: "role",
  CLIENT_TYPE: "clientType",
  CLIENT_STATUS: "clientStatus",
  CLIENT_INDUSTRY: "industry",
};

const masterTypes = Object.values(MASTER_TYPES);

type MasterTypeData = (typeof MASTER_TYPES)[keyof typeof MASTER_TYPES];

module.exports = {
  masterTypes,
  MASTER_TYPES,
};
