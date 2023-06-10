import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useClasses = ()=>{
    const {data:classes=[],refetch} = useQuery({
        queryKey:['classes'],
        queryFn:async()=>{
            const res = await axios.get(`${import.meta.env.VITE_SERVER_API}/approvedClasses`)
            return res.data
        }
    })
    return [classes,refetch]
}
export default useClasses;