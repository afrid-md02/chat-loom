import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const UnProtectedRoutes = ({ children }) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      return navigate("/admin", { replace: true });
    }
  }, [isLoggedIn, navigate]);

  return children;
};

export default UnProtectedRoutes;
