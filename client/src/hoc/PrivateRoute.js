// import { Route, Navigate } from "react-router-dom";
// import { getCookie } from "../components/utils/Cookie";

// export default function PrivateRoute({ element }) {
//   const isAuth = getCookie("w_auth");

//   console.log("element:::", element);

//   return isAuth ? element : <Navigate to="/login" />;
// }

import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { getCookie } from "../components/utils/Cookie";

const PrivateRoute = () => {
  const isAuth = getCookie("w_auth");
  const location = useLocation();
  const { authUserData } = useSelector((state) => state.user);

  // If authorized, return an outlet that will render child elements
  // If not, return element that will navigate to login page
  return authUserData && authUserData.isAuth && isAuth ? (
    <Outlet />
  ) : (
    <Navigate replace to="/login" state={{ originalPath: location }} />
  );
};

export default PrivateRoute;
