import { Link } from "react-router-dom";
import EmptyPage from "../../../Components/EmptyPage/EmptyPage";
import { Icon } from "@iconify/react";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";



const ManageClasses = () => {
    const [classes, setClasses] = useState([]);
    const [axiosSecure] = useAxiosSecure()
    const { user, setIsOpen } = useContext(AuthContext);
    useEffect(() => {
        axiosSecure.get(`/classes/${user?.email}`)
            .then(res => {
                setClasses(res.data);
            })
    }, [axiosSecure, user?.email,classes])

    const handleStatus = (id, status) => {
        axiosSecure.patch(`/updateClassStatus/${id}`, { status,email:user?.email })
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Your Feedback Added',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })
    }

    return (
        <div className="max-w-full">
            {
                classes && classes.length > 0 ? <>
                    <h2 className="text-3xl uppercase font-semibold">Mange Class</h2>
                    <div className="w-full overflow-x-auto">
                        <div className="mb-4">
                            <table className="table">
                                {/* head */}
                                <thead>
                                    <tr className="font-semibold text-sm">
                                        <th>#</th>
                                        <th>Class Image</th>
                                        <th> Class Name</th>
                                        <th>Instructor Name</th>
                                        <th>Instructor Email</th>
                                        <th className="text-right">Available seats</th>
                                        <th className="text-right">Price</th>
                                        <th>Status</th>
                                        <th>Approve</th>
                                        <th>Deny</th>
                                        <th>send feedback</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {classes.map((item, index) => <tr
                                        key={index}
                                    >
                                        <th>{index + 1}</th>
                                        <td><img className="w-20" src={item.classImage} alt="" /></td>
                                        <td>{item.className}</td>
                                        <td>{item.instructorName}</td>
                                        <td>{item.instructorEmail}</td>
                                        <td className="text-right">{item.seats}</td>
                                        <td className="text-right">${item.price}</td>
                                        <td className={`capitalize ${item.status === 'denied' ? 'text-red-600'
                                            : item.status === 'approved' ? 'text-green-600' : ''}`}>{item.status}</td>
                                        <td><button onClick={() => handleStatus(item._id, 'approved')} disabled={item.status === 'denied' || item.status === 'approved'} className="btn bg-green-600 hover:bg-green-800 text-white text-sm"><Icon className="text-lg" icon="heroicons-solid:check" /></button></td>
                                        <td><button onClick={() => handleStatus(item._id, 'denied')} disabled={item.status === 'denied' || item.status === 'approved'} className="btn bg-red-600 hover:bg-red-800 text-white text-base"><Icon className="text-lg" icon="heroicons-outline:x" /></button></td>
                                        <td>
                                            <Link to={`/dashboard/sendFeedback/${item._id}`} onClick={() => setIsOpen(true)} className="btn bg-[rgba(1,16,31,.9)] hover:bg-[rgb(1,16,31)] text-white text-base"><Icon icon="fa-regular:envelope" /></Link>
                                        </td>
                                    </tr>)}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </> : <>
                    <EmptyPage emptyText='No Classes added yet' />
                </>
            }
        </div>
    );
};

export default ManageClasses;