import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";

const useSelectedClass = ()=>{
    const {user} = useContext(AuthContext)
    const [axiosSecure] = useAxiosSecure();
    const {data:selectedClasses=[],refetch} = useQuery({
        queryKey:['selectedClasses',user?.email],
        queryFn:async()=>{
            const res = await axiosSecure.get(`/selectedByUser/${user?.email}`)
            return res.data
        }
    })
    return [selectedClasses,refetch]
}
export default useSelectedClass;