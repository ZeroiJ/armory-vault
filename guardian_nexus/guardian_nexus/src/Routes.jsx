import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthenticationAuthorization from "./pages/authentication-authorization";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthenticationAuthorization />} />
        <Route path="/auth/callback" element={<AuthenticationAuthorization />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
