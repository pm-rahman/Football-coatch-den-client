import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import { Navigate } from "react-router-dom";
import useInstructor from "../hooks/useInstructor";
import useAdmin from "../hooks/UseAdmin";

const StudentRouter = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const [isInstructor, isInstructorLoading] = useInstructor();
    const [isAdmin, isAdminLoading] = useAdmin();
    if (loading || isInstructorLoading || isAdminLoading) {
        return <div className="text-center mt-10"><span className="loading loading-ring loading-lg"></span></div>
    }
    if (isInstructor || isAdmin) {
        return <Navigate to='/' replace ></Navigate>
    }
    if (user) {
        return children
    }
};

export default StudentRouter;