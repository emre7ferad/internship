import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AuthRedirect = () => {
    const { user, token } = useAuth();

    if (user && token) {
        return <Navigate to="/dashboard" replace />;
    }
    return <Navigate to="/login" replace />
};

export default AuthRedirect;