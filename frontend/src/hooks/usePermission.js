import React from "react";
import { useSelector } from "react-redux";

function usePermission(allowedPermission) {
  const user = useSelector((state) => state.auth.user);

  if (!user) {
    return false;
  }

  const userPermissions = user?.permissions;
  return userPermissions.includes(allowedPermission);
}

export default usePermission;
