import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import toast from "react-hot-toast";

function PrivateRoute() {
  const user = useSelector((state) => state.user.userDetails);
  if (user) {
    return <Outlet />;
  } else {
    toast.error("Please Login First");
    return <Navigate to="/signin" />;
  }
}

export default PrivateRoute;
