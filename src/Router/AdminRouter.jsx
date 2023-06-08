import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import { Navigate } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";

const AdminRouter = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const [isAdmin, isAdminLoading] = useAdmin();
    if (loading && isAdminLoading) {
        return <div className="text-center mt-10"><span className="loading loading-ring loading-lg"></span></div>
    }
    if (user || isAdmin) {
        return children
    }
    else {
        return <Navigate to='/' replace ></Navigate>
    }
};

export default AdminRouter;