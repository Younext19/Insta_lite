import React, { useMemo } from "react";
import { Navigate } from "react-router-dom";
import { useAtom } from "jotai";
import { ERROR } from "../../utils/routes";
import {
  adminPermissions,
  loggedInPermissions,
  loggedOutPermissions,
} from "../../utils/permissions"
import { userAtom } from "../../services/userService";

export default function PrivateRoute({ route, element }) {
  const [user] = useAtom(userAtom);
  const userRole = useMemo(() => localStorage.getItem("user-role"), [user]);

  if (
    (userRole === "ROLE_ADMINISTRATEUR" && adminPermissions.includes(route))
    || (userRole === "ROLE_UTILISATEUR" && loggedInPermissions.includes(route))
    || ([null, undefined].includes(userRole) && loggedOutPermissions.includes(route))
  ) {
    return element;
  }

  return <Navigate to={ERROR} />;
}
