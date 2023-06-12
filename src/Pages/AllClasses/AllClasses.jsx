import Swal from "sweetalert2";
import SectionTitle from "../../Components/SectionTitle/SectionTitle";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import EmptyPage from "../../Components/EmptyPage/EmptyPage";
import useUserRole from "../../hooks/useUserRole";
import useClasses from "../../hooks/useClasses";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const AllClasses = () => {
    const { user } = useContext(AuthContext);
    const naviGate = useNavigate();
    const [axiosSecure] = useAxiosSecure();
    const [role] = useUserRole();
    const [classes, refetch] = useClasses();

    const handleSelectBtn = item => {
        if (!user) {
            Swal.fire({
                title: 'Are you sure?',
                text: "You need to Login!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Login!'
            }).then((result) => {
                if (result.isConfirmed) {
                    naviGate('/login');
                    refetch();
                }
            })
        }
        else {
            const userInfo = {
                email: user?.email,
                id: item._id,
                seats: item.seats,
                price: item.price,
                className: item.className,
                classImage: item.classImage,
                instructorName: item.instructorName,
                instructorEmail: item.instructorEmail
            }
            axiosSecure.put(`/selectedByUser/${user?.email}`, userInfo)
                .then(res => {
                    if (res.data.upsertedCount > 0) {
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Class Select Successful',
                            showConfirmButton: false,
                            timer: 1500
                        })
                        refetch();
                    }
                    else {
                        Swal.fire({
                            position: 'top-end',
                            icon: 'error',
                            title: 'You Have been selected before',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    }
                })
        }
    }
    return (
        <div className="py-16 px-5 md:px-10 lg:px-20">
            <SectionTitle
                title='All Classes'
                subTitle='Learn from the best coaches in the business'
            />
            {
                classes && classes.length > 0 ? <div className="grid md:grid-cols-3 gap-5 mt-8">
                    {
                        classes.map((item, index) => <div
                            key={index}
                            className='shadow-lg rounded-md'
                        >
                            <figure className="h-64 overflow-hidden"><img className="w-full min-h-full" src={item.classImage} alt="Thumbnail" /></figure>
                            
                            <div className={`p-5 ${item.seats === 0 && 'bg-red-400'}`}>
                                <h2 className="pb-1 font-semibold text-xl">
                                    {item.className}
                                    <div className="badge badge-secondary ml-2">${item.price}</div>
                                </h2>
                                <div className="font-semibold">Instructor : {item.instructorName}</div>
                                <div className="font-semibold">{item.seats} sites Available</div>
                                <div className="mt-2">
                                    <button onClick={() => handleSelectBtn(item)} disabled={role === 'instructor' || role === 'admin' || item.seats === 0} className='btn bg-[#e84c3d] hover:bg-[#d0493d] text-white text-lg capitalize w-full py-2'>Select</button>
                                </div>
                            </div>
                        </div>
                        )
                    }
                </div>
                    : <>
                        <EmptyPage emptyText='No Classes Available At This Moment!' />
                    </>
            }
        </div>
    );
};

export default AllClasses;