import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import EmptyPage from "../../../Components/EmptyPage/EmptyPage";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";



const MyClasses = () => {
    const { user } = useContext(AuthContext);
    const [axiosSecure] = useAxiosSecure();
    const [myClasses, setMyClasses] = useState([]);
    useEffect(() => {
        axiosSecure.get(`/instructor/class/${user?.email}`)
            .then(res => {
                setMyClasses(res.data);
            })
    }, [axiosSecure, user?.email]);

    return (
        <>
            {
                myClasses && myClasses.length > 0 ? <>
                    <h2 className="text-3xl uppercase font-semibold mb-4">Your Added Classes</h2>
                    <div className="grid grid-cols-3 gap-5">
                        {
                            myClasses.map((item, index) => <div
                                key={index}
                                className="shadow-lg rounded-md capitalize"
                            >
                                <figure className="h-40 overflow-hidden"><img className="w-full mx-auto" src={item.classImage} alt="Thumbnail" /></figure>
                                <div className="p-4">
                                    <h2 className="card-title uppercase">{item.className}</h2>
                                    <p>Available Seats {item.seats}</p>
                                    <p>price : ${item.price}</p>
                                    <div className="flex justify-between mb-3">
                                        <div>
                                            <p>Status : <span className={`font-semibold ${item.status === 'denied'?'text-red-600' 
                                            : item.status === 'approved'?'text-green-600':''}`}>{item.status}</span></p>
                                            <p>Enrolled : {item.enrolled ? item.enrolled : 0}</p>
                                        </div>
                                        <Link to={`/dashboard/editClasses/${item._id}`} className="btn bg-blue-600 hover:bg-blue-800 text-white text-sm"><Icon icon="fa-regular:edit" /></Link>
                                    </div>

                                    <div>{item.feedback ?
                                        <div tabIndex={0} className="collapse bg-base-200">
                                            <div className="btn">
                                                Feedback
                                            </div>
                                            <div className="collapse-content font-normal">
                                                <p className="max-h-40 overflow-y-scroll">{item?.feedback}</p>
                                            </div>
                                        </div>
                                        : 'No Feedback'}</div>
                                </div>
                            </div>
                            )
                        }
                    </div>
                </> : <>
                    <EmptyPage emptyText="You can add class for your own" />
                </>
            }
        </>
    );
};

export default MyClasses;