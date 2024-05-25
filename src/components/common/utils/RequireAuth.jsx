import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUserRole } from "../../../features/user/userSlice";
const RequireAuth = ({ requiredRouteRole }) => {
  const role = useSelector(selectCurrentUserRole);
  const location = useLocation();

  const hasPermissionToRoute = (requiredRouteRole) => {
    return role === requiredRouteRole;
  };

  return hasPermissionToRoute(requiredRouteRole) ? (
    <Outlet />
  ) : role ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

export default RequireAuth;
