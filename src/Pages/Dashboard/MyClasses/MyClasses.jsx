import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import EmptyPage from "../../../Components/EmptyPage/EmptyPage";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import Modal from 'react-modal';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

const MyClasses = () => {
    const { user, modalIsOpen, setIsOpen } = useContext(AuthContext);
    const [feedback, setFeedback] = useState('');

    const [axiosSecure] = useAxiosSecure();
    const [myClasses, setMyClasses] = useState([]);
    useEffect(() => {
        axiosSecure.get(`/instructor/class/${user?.email}`)
            .then(res => {
                setMyClasses(res.data);
            })
    }, [axiosSecure, user?.email]);

    const showFeedbackHandler = feedbackMessage => {
        setIsOpen(true);
        setFeedback(feedbackMessage)
    }

    return (
        <>
            {
                myClasses && myClasses.length > 0 ? <>
                    <h2 className="text-3xl uppercase font-semibold mb-4">Your Added Classes</h2>
                    <div className="overflow-x-auto mb-4">
                        <table className="table capitalize">
                            {/* head */}
                            <thead>
                                <tr className="font-semibold text-sm">
                                    <th>#</th>
                                    <th>Class Name</th>
                                    <th>Available Seats</th>
                                    <th className="text-right">Price</th>
                                    <th className="text-right">Total Students</th>
                                    <th>Status</th>
                                    <th>Feedback</th>
                                    <th>update</th>
                                </tr>
                            </thead>
                            <tbody>
                                {myClasses.map((item, index) => <tr
                                    key={index}
                                >
                                    <th>{index + 1}</th>
                                    <td>{item.className}</td>
                                    <td>{item.seats}</td>
                                    <td className="text-right">${item.price}</td>
                                    <td className="text-right">{item.enrolled ? item.enrolled : 0}</td>
                                    <td className={`font-semibold ${item.status === 'denied' ? 'text-red-600'
                                        : item.status === 'approved' ? 'text-green-600' : ''}`}>{item.status ? item.status : 'pending'}</td>
                                    <td>{item.feedback ? <button onClick={() => showFeedbackHandler(item.feedback)} className="btn bg-[rgba(1,16,31,.9)] hover:bg-[rgb(1,16,31)] text-white">Feedback</button> : 'no feedback'}</td>
                                    <td><Link to={`/dashboard/editClasses/${item._id}`} className="btn bg-[rgba(1,16,31,.9)] hover:bg-[rgb(1,16,31)] text-white text-sm"><Icon icon="fa-regular:edit" /></Link></td>
                                </tr>)}
                            </tbody>
                        </table>
                    </div>
                </> : <>
                    <EmptyPage emptyText="You Have No Added Classes" />
                </>
            }
            <div>

                <Modal
                    isOpen={modalIsOpen}
                    ariaHideApp={false}
                    onRequestClose={() => setIsOpen(false)}
                    style={customStyles}
                    contentLabel="Example Modal"
                >
                    <div className="md:w-[450px]">
                        <h2 className="text-2xl font-semibold">Hello!</h2>
                        <div>{feedback}</div>
                        <div className="flex justify-end gap-1">
                            <button className="btn text-white bg-[rgba(1,16,31,.9)] hover:bg-[rgb(1,16,31)]" onClick={() => setIsOpen(false)}><Icon className="text-lg" icon="heroicons-solid:check" /></button>
                            <button className="btn bg-red-500 text-white hover:bg-red-700" onClick={() => setIsOpen(false)}><Icon className="text-lg" icon="heroicons-outline:x" /></button>
                            </div>
                    </div>
                </Modal>
            </div>
        </>
    );
};

export default MyClasses;