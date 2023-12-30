import React, { useMemo } from "react";
import { Navigate } from "react-router-dom";
import { ERROR } from "../../utils/routes";
import {
  adminPermissions,
  loggedInPermissions,
  loggedOutPermissions,
} from "../../utils/permissions"

export default function PrivateRoute({ route, element }) {
  const userRole = useMemo(() => localStorage.getItem("user-role"), []);

  if (
    (userRole === "ROLE_ADMINISTRATEUR" && adminPermissions.includes(route))
    || (userRole === "ROLE_UTILISATEUR" && loggedInPermissions.includes(route))
    || ([null, undefined].includes(userRole) && loggedOutPermissions.includes(route))
  ) {
    return element;
  }

  return <Navigate to={ERROR} />;
}
