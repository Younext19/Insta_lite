import {
  LOGIN,
  POSTS,
  PROFILE,
  SIGNUP,
  USERS,
} from "./routes";

export const adminPermissions = [USERS, POSTS];
export const loggedInPermissions = [PROFILE];
export const loggedOutPermissions = [LOGIN, SIGNUP];