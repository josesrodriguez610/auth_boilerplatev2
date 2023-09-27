import { useSelector } from "react-redux";
import { selectCurrentToken } from "../features/auth/authSlice";
import jwtDecode from "jwt-decode";

const useAuth = () => {
  const token = useSelector(selectCurrentToken);
  let status = "Employee";
  let isAdmin = false;
  let isSuperAdmin = false;

  if (token) {
    const decoded = jwtDecode(token);
    const { id, email, role } = decoded.UserInfo;

    isAdmin = role === "Admin";
    isSuperAdmin = role === "SuperAdmin";

    if (isAdmin) status = "Admin";
    if (isSuperAdmin) status = "SuperAdmin";

    return { id, email, role, status, isSuperAdmin, isAdmin };
  }

  return { id: "", email: "", role: "", isSuperAdmin, isAdmin, status };
};
export default useAuth;
