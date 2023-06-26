import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import PageNotFound from "../pages/PageNotFound";

const ClientRoute = () => {
  return (
    <Routes>
      {/* Client Access */}
      {/* Redirect from "/" to "/Store" */}
      <Route path="/" element={<Navigate to="/Home" />} />

      <Route path="/Home" element={<HomePage />} />

      {/* Redirect from anywhere to pageNotFound  */}
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default ClientRoute;
