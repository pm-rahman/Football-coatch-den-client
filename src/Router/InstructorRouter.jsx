import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import { Navigate } from "react-router-dom";
import useInstructor from "../hooks/useInstructor";

const InstructorRouter = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const [isInstructor, isInstructorLoading] = useInstructor();
    if (loading && isInstructorLoading) {
        return <div className="text-center mt-10"><span className="loading loading-ring loading-lg"></span></div>
    }
    if (user && isInstructor) {
        return children
    }
    else {
        return <Navigate to='/' replace ></Navigate>
    }
};

export default InstructorRouter;