import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import useAxiosSecure from "./useAxiosSecure";
import { AuthContext } from "../Providers/AuthProvider";


const usePayment = () => {
    const {user} = useContext(AuthContext);
    const [axiosSecure] = useAxiosSecure()
    const {data:enrollClass=[]} = useQuery({
        queryKey:['classes',user?.email],
        queryFn:async()=>{
            const res = await axiosSecure.get(`paymentHistory/${user?.email}`)
            return res.data
        }
    })
    return [enrollClass]
};

export default usePayment;