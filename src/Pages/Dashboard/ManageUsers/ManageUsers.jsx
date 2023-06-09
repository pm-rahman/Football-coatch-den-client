import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import EmptyPage from "../../../Components/EmptyPage/EmptyPage";
import { Icon } from "@iconify/react";
import { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import Swal from "sweetalert2";

const ManageUsers = () => {
    const { user } = useContext(AuthContext)
    const [axiosSecure] = useAxiosSecure();
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user?.email}`)
            return res.data;
        }
    })
    const handleMakeInstructor = (id) => {
        console.log(id)
        axiosSecure.patch(`${import.meta.env.VITE_SERVER_API}/user/promote/instructor/${id}`)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'User is Instructor Now',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    refetch();
                }
            })
    }
    const handleMakeAdmin = (id) => {
        axiosSecure.patch(`${import.meta.env.VITE_SERVER_API}/user/promote/admin/${id}`)
        .then(res=>{
            if(res.data.modifiedCount>0){
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'User is Admin Now',
                    showConfirmButton: false,
                    timer: 1500
                })
                refetch();
            }
        })
    }
    return (
        <div>
            {
                users && users.length > 0 ? <>
                    <h2 className="text-3xl uppercase font-semibold">Mange Users</h2>
                    <div>
                        <div className="overflow-x-auto mb-4">
                            <table className="table">
                                {/* head */}
                                <thead>
                                    <tr className="font-semibold text-sm">
                                        <th>#</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Role</th>
                                        <th>Make Instructor</th>
                                        <th>Make Admin</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((user, index) => <tr
                                        key={index}
                                    >
                                        <th>{index + 1}</th>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user?.role ? user.role : 'Student'}</td>
                                        <td><button disabled={user.role} onClick={() => handleMakeInstructor(user._id)} className="btn bg-blue-600 hover:bg-blue-800 text-white text-sm"><Icon icon="heroicons-outline:arrow-up" /></button></td>
                                        <td><button disabled={user.role && user.role === 'admin'} onClick={() => handleMakeAdmin(user._id)} className="btn bg-blue-600 hover:bg-blue-800 text-white text-sm"><Icon icon="heroicons-outline:arrow-up" /><Icon icon="heroicons-outline:arrow-up" /></button></td>
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