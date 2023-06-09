import { useLoaderData } from "react-router-dom";
import EmptyPage from "../../../Components/EmptyPage/EmptyPage";
import { Icon } from "@iconify/react";

const ManageClasses = () => {
    const classes = useLoaderData();
    
    const handleFeedbackPopup = ()=>{
        // TODO: modal will open another page
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
                                        <th> Class Name</th>
                                        <th>Class Image</th>
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
                                        <td>{item.className}</td>
                                        <td><img className="w-20" src={item.classImage} alt="" /></td>
                                        <td>{item.instructorName}</td>
                                        <td>{item.instructorEmail}</td>
                                        <td className="text-right">{item.seats}</td>
                                        <td className="text-right">${item.price}</td>
                                        <td className={item.status === 'denied'?'text-red-600' 
                                            : item.status === 'approved'?'text-green-600':''}>{item.status}</td>
                                        <td><button disabled={item.status==='denied'||item.status==='approved'} className="btn bg-green-600 hover:bg-green-800 text-white text-sm"><Icon className="text-lg" icon="heroicons-solid:check" /></button></td>
                                        <td><button disabled={item.status==='denied'||item.status==='approved'} className="btn bg-red-600 hover:bg-red-800 text-white text-base"><Icon className="text-lg" icon="heroicons-outline:x" /></button></td>
                                        <td><button onClick={handleFeedbackPopup} className="btn bg-[rgba(1,16,31,.9)] hover:bg-[rgb(1,16,31)] text-white text-base"><Icon icon="fa-regular:envelope" /></button></td>
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