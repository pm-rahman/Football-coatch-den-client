import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRouter = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();
    if (loading) {
        return <div className="text-center mt-10"><span className="loading loading-ring loading-lg"></span></div>
    }
    if (user) {
        return children
    }
    else {
        return <Navigate to='/login' state={{ from: location }} replace ></Navigate>
    }
};

export default PrivateRouter;