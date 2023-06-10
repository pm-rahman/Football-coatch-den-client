import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../Providers/AuthProvider";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
const AddClass = () => {
    const { user } = useContext(AuthContext);
    const [axiosSecure] = useAxiosSecure();
    const [imageName, setImageName] = useState('Upload Class Image');
    const [image, setImage] = useState(null);
    const [imageError, setImageError] = useState(false);
    const [imageUploading, setImageUploading] = useState(false);
    const { register, handleSubmit,reset, formState: { errors } } = useForm();
 
    const naviGate = useNavigate()
    
    const onSubmit = data => {
        setImageError(false);
        if (!image) {
            console.log('clicked');
            setImageError(true)
            return;
        }
        const newClass = {
            className: data.className,
            classImage: image,
            instructorName: user?.displayName,
            instructorEmail: user?.email,
            seats: parseInt(data.seats),
            price: parseFloat(data.price),
            status: "pending",
        }

        axiosSecure.post(`/class/${user?.email}`, newClass)
            .then(res => {
                if (res.data.acknowledged) {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Classes Added Successfully',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    reset()
                    naviGate('/dashboard/myClasses')
                }
            })

    };
    const handleImage = ({ target: { files } }) => {
        const formData = new FormData();
        formData.append('image', files[0]);
        setImageUploading(true);
        fetch(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imageBBCode}`, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data.data.display_url)
                setImage(data.data.display_url);
                setImageUploading(false)
            })
        setImageName(files[0].name);

    }
    return (
        <div className="bg-slate-100 px-10 py-14 rounded">
            <h2 className="text-2xl font-bold text-center uppercase mb-2">Add A class</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text font-semibold">Class Name</span>
                    </label>
                    <input type="text" {...register("className", { required: true })} placeholder="Class Name" className="input input-bordered w-full" />
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
                        <input type="number" {...register("seats", { required: true })} placeholder="Available seats" className="input input-bordered w-full" />
                        {errors.seats && <span className="text-red-600 mt-1 capitalize block">Available seats is required!</span>}
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text font-semibold">Price</span>
                        </label>
                        <input type="number" {...register("price", { required: true })} placeholder="Price" className="input input-bordered w-full" />
                        {errors.price && <span className="text-red-600 mt-1 capitalize block">Available seats is required!</span>}
                    </div>
                </div>
                <div>
                    <label>
                        <span className="text-base text-[rgb(33,141,250)] border-dashed border-2 border-[rgb(33,141,250)] justify-center flex items-center uppercase h-20 rounded font-semibold">{imageName}</span>
                        <input onChange={handleImage} name="image" type="file" className="file-input hidden w-full" />
                        {imageError && <span className="text-red-600 mt-1 capitalize block">Class Image required!</span>}
                    </label>
                </div>

                <button type="submit" disabled={imageUploading} className="btn bg-[#e84c3d] hover:bg-[#d0493d] text-white uppercase w-full py-3">{imageUploading ? <>Image Uploading <span className="loading loading-ring loading-sm"></span></> : "Add Class"}</button>
            </form>
        </div>
    );
};

export default AddClass;