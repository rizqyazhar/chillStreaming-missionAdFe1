import { Outlet } from "react-router-dom";
import { AuthProvider } from "../state/AuthContextState";
import AuthContent from "../elements/AuthContent";

const AuthLayout = () => {
  return (
    <AuthProvider>
      <AuthContent>
        <Outlet />
      </AuthContent>
    </AuthProvider>
  );
};

export default AuthLayout;
