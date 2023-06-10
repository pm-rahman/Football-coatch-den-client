import { useContext } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../Providers/AuthProvider";
import { useLoaderData, useNavigate } from "react-router-dom";
const EditClass = () => {
    const { user } = useContext(AuthContext);
    const {_id,className,seats,price} = useLoaderData();

    const [axiosSecure] = useAxiosSecure();
    const { register, handleSubmit,reset, formState: { errors } } = useForm();

    const naviGate = useNavigate();

    const onSubmit = data => {
        const UpdateClass = {
            instructorEmail: user?.email,
            className: data.className,
            seats: parseInt(data.seats),
            price: parseFloat(data.price),
        }

        axiosSecure.patch(`/editClass/${_id}`, UpdateClass)
            .then(res => {
                console.log(res.data);
                if (res.data.modifiedCount>0) {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Classes Modified Successfully',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    naviGate('/dashboard/myClasses');
                    reset();
                }
            })

    };

    return (
        <div className="bg-slate-100 px-10 py-14 rounded">
            <h2 className="text-2xl font-bold text-center uppercase mb-2">Edit Class</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text font-semibold">Class Name</span>
                    </label>
                    <input type="text" defaultValue={className} {...register("className", { required: true })} placeholder="Class Name" className="input input-bordered w-full" />
                    {errors.className && <span className="text-red-600 mt-1 capitalize block">Class Name is required!</span>}
                </div>
                <div className="grid grid-cols-2 gap-2">
                    <div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-semibold">Instructor name</span>
                            </label>
                            <input type="text" value={user?.displayName} {...register("instructorName")} placeholder="Instructor Name" className="input input-bordered w-full" />
                        </div>
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text font-semibold">Instructor Email</span>
                        </label>
                        <input type="email" value={user?.email} {...register("InstructorEmail")} placeholder="Instructor Email" className="input input-bordered w-full" />
                    </div>

                </div>
                <div className="grid grid-cols-2 gap-2">
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text font-semibold">Available seats</span>
                        </label>
                        <input type="number" defaultValue={seats} {...register("seats", { required: true })} placeholder="Available seats" className="input input-bordered w-full" />
                        {errors.seats && <span className="text-red-600 mt-1 capitalize block">Available seats is required!</span>}
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text font-semibold">Price</span>
                        </label>
                        <input type="number" defaultValue={price} {...register("price", { required: true })} placeholder="Price" className="input input-bordered w-full" />
                    </div>
                </div>

                <button type="submit" className="btn bg-[#e84c3d] hover:bg-[#d0493d] text-white uppercase w-full py-3">Confirm Edit</button>
            </form>
        </div>
    );
};

export default EditClass;