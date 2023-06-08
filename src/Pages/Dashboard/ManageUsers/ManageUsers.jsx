import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import EmptyPage from "../../../Components/EmptyPage/EmptyPage";
import { Icon } from "@iconify/react";
import { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";

const ManageUsers = () => {
    const {user} = useContext(AuthContext)
    const [axiosSecure] = useAxiosSecure();
    const { data: users = [],refetch } = useQuery({
        queryKey: ['users',user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user?.email}`)
            return res.data;
        }
    })
    const handleMakeInstructor=(id)=>{
        console.log(id)
        axiosSecure.patch(`${import.meta.env.VITE_SERVER_API}/user/promote/${id}`)
        .then(res=>{
            console.log(res.data);
            refetch();
        })
    }
    return (
        <div>
            {
                users && users.length > 0 ? <>
                    <h2 className="text-3xl uppercase font-semibold">Mange Your Selected Classes</h2>
                    <div>
                        <div className="overflow-x-auto">
                            <table className="table">
                                {/* head */}
                                <thead>
                                    <tr className="font-semibold text-sm">
                                        <th>#</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Role</th>
                                        <th>Promote</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((user, index) => <tr
                                        key={index}
                                    >
                                        <th>{index + 1}</th>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user?.role?user.role:'user'}</td>
                                        <td>{user?.role
                                            ? <>
                                                {user?.role === 'admin' ? 'admin' : 
                                                <button onClick={()=>handleMakeInstructor(user._id)} className="btn bg-blue-600 hover:bg-blue-800 text-white text-lg"><Icon icon="heroicons-outline:arrow-up" /></button>}
                                            </>
                                            : <button onClick={()=>handleMakeInstructor(user._id)} className="btn bg-blue-600 hover:bg-blue-800 text-white text-sm"><Icon icon="heroicons-outline:arrow-up" /><Icon icon="heroicons-outline:arrow-up" /></button>}</td>
                                        <td><button disabled={user?.role==='admin'&&true} className="btn bg-red-600 hover:bg-red-800 text-white text-base"><Icon icon="heroicons-outline:trash" /></button></td>
                                    </tr>)}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </> : <>
                    <EmptyPage emptyText='No Classes Selected yet' />
                </>
            }
        </div>
    );
};

export default ManageUsers;