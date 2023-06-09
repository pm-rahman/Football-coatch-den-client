import Swal from "sweetalert2";
import Button from "../../Components/Button/Button";
import SectionTitle from "../../Components/SectionTitle/SectionTitle";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import EmptyPage from "../../Components/EmptyPage/EmptyPage";

const AllClasses = () => {
    const { user } = useContext(AuthContext);
    const classes = useLoaderData();
    const naviGate = useNavigate();

    const handleSelectBtn = () => {
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
                    naviGate('/login')
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
                classes && classes.length>0?<div className="grid md:grid-cols-3 gap-5 mt-8">
                {
                    classes.map((item, index) => <div
                        key={index}
                        className="shadow-lg rounded-md"
                    >
                        <figure className="h-60 overflow-hidden"><img className="w-full mx-auto" src={item.classImage} alt="Thumbnail" /></figure>
                        <div className="p-5">
                            <h2 className="pb-1 font-semibold text-xl">
                                {item.className}
                                <div className="badge badge-secondary ml-2">${item.price}</div>
                            </h2>
                            <div className="font-semibold">Instructor : {item.instructorName}</div>
                            <div className="font-semibold">{item.seats} sites Available</div>
                            <div onClick={handleSelectBtn} className="mt-2">
                                <Button btnText='Select' full={true} />
                            </div>
                        </div>
                    </div>
                    )
                }
            </div>
            :<>
            <EmptyPage emptyText='No Classes Available At This Moment!' />
            </>
            }
        </div>
    );
};

export default AllClasses;