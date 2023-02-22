import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { getCookie, setCookie } from "../components/utils/Cookie";

const PrivateRoute = () => {
  const isAuth = getCookie("w_auth");
  const isAuthExp = getCookie("w_authExp");
  console.log("isAuthExp", isAuthExp);
  const timezoneOffset = new Date().getTimezoneOffset() * 60 * 1000 * -1;

  console.log("exp to date", new Date(parseInt(isAuthExp)));

  // const authCheck = () => {
  //   new Date(parseInt(isAuthExp)) <
  //   new Date(new Date().getTime() + timezoneOffset)
  //     ? setCookie("w_auth", null)
  //     : null;
  // };

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
