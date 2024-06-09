import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ Component,user }) => {

  return user ? <Component /> : <Navigate to="/" />;
};

export default PrivateRoute;
