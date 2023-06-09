import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import useInstructor from "../hooks/useInstructor";
import useAdmin from "../hooks/useAdmin";

const PrivateRouter = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();
    const [isInstructor,isInstructorLoading] = useInstructor();
    const [isAdmin,isAdminLoading] = useAdmin();
    if (loading || isInstructorLoading || isAdminLoading) {
        return <div className="text-center mt-10"><span className="loading loading-ring loading-lg"></span></div>
    }
    if (user ||isInstructor ||isAdmin) {
        return children
    }
    else {
        return <Navigate to='/login' state={{ from: location }} replace ></Navigate>
    }
};

export default PrivateRouter;