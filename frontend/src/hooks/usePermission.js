import React from "react";
import { useSelector } from "react-redux";

function usePermission(allowedRoles) {
  const user = useSelector((state) => state.auth.user);

  if (!user) {
    return false;
  }

  const userRole = user.role;
  return allowedRoles.includes(userRole);
}

export default usePermission;
