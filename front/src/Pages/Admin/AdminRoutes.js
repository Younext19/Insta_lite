// AdminRoutes.js

import React from "react";
import { Route, Routes } from "react-router-dom";
import Users from "./Users/Users";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route element={<Users />} path="/users" />
      {/* Add more admin-specific routes as needed */}
    </Routes>
  );
};

export default AdminRoutes;
