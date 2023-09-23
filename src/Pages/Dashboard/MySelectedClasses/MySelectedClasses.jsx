import EmptyPage from "../../../Components/EmptyPage/EmptyPage";
import { Icon } from '@iconify/react';
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import useSelectedClass from "../../../hooks/useSelectedClass";

const MySelectedClasses = () => {
    const { user,setPaymentClass } = useContext(AuthContext);
    const [selectedClasses,refetch] =useSelectedClass();
    const [axiosSecure] = useAxiosSecure();


    const handleDelete = id => {
        axiosSecure.delete(`/cancelByUser/${id}?email=${user?.email}`)
            .then(res => {
                if (res.data.deletedCount > 0) {
                    refetch();
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Class Deleted Successfully',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })
    }
    return (
        <>
            {
                selectedClasses && selectedClasses.length > 0 ? <>
                    <h2 className="text-2xl sm:text-3xl mb-5 uppercase font-bold">Mange Your Selected Classes</h2>
                    <div>
                        <div className="overflow-x-auto">
                            <table className="table">
                                {/* head */}
                                <thead>
                                    <tr className="font-semibold text-sm">
                                        <th>#</th>
                                        <th>Class Name</th>
                                        <th>Instructor Name</th>
                                        <th className="text-end">Price</th>
                                        <th className="text-end">Available Sites</th>
                                        <th>Pay</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {selectedClasses.map((item, index) => <tr
                                        key={index}
                                    >
                                        <th>{index + 1}</th>
                                        <td>{item.className}</td>
                                        <td>{item.instructorName}</td>
                                        <td className="text-end">${item.price}</td>
                                        <td className="text-right">{item.seats}</td>
                                        <td><Link onClick={()=>setPaymentClass(item)} to='/dashboard/paymentPage' className="btn bg-[rgba(1,16,31,.9)] hover:bg-[rgb(1,16,31)] text-white text-base"><Icon icon="heroicons-outline:shopping-cart" /></Link></td>
                                        <td><button onClick={() => handleDelete(item._id)} className="btn bg-red-600 hover:bg-red-800 text-white text-base"><Icon icon="heroicons-outline:trash" /></button></td>
                                    </tr>)}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </> : <>
                    <EmptyPage emptyText='No Classes Selected yet' />
                </>
            }
        </>
    );
};

export default MySelectedClasses;