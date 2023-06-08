import useAxiosSecure from "./useAxiosSecure";
import { useContext, useState } from "react";
import { AuthContext } from "../Providers/AuthProvider";

const useUserRole = () => {
    const { user } = useContext(AuthContext);
    const [axiosSecure] = useAxiosSecure();
    const [role, setRole] = useState();
    if (user) {
        axiosSecure.get(`/user/role/${user?.email}`)
            .then(res => {
                setRole(res.data);
            })
    }
    return [role]
}
export default useUserRole;