import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const [isAuth, setIsAuth] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const verifyUser = async () => {
      if (!token) {
        setIsAuth(false);
        return;
      }
      try {
        const res = await fetch("http://localhost:5000/api/auth/verify", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setIsAuth(res.ok);
      } catch {
        setIsAuth(false);
      }
    };
    verifyUser();
  }, [token]);

  if (isAuth === null) return <p>Loading...</p>;

  return isAuth ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
