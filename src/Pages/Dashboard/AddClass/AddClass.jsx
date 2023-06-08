import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../Providers/AuthProvider";
const AddClass = () => {
    const [imageName, setImageName] = useState('Upload Class Image');
    const [image, setImage] = useState({});
    const { user } = useContext(AuthContext);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {
        console.log(data, image)

    };
    const handleImage = ({ target: { files } }) => {
        setImage(files[0]);
        console.log(image)
        setImageName(files[0].name)
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
                </div>
                <div className="grid grid-cols-2 gap-2">
                    <div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-semibold">Instructor name</span>
                            </label>
                            <input type="text" value={user?.displayName} {...register("instructorName", { required: true })} placeholder="Instructor Name" className="input input-bordered w-full" />
                        </div>
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text font-semibold">Instructor Email</span>
                        </label>
                        <input type="email" value={user?.email} {...register("InstructorEmail", { required: true })} placeholder="Instructor Email" className="input input-bordered w-full" />
                    </div>

                </div>
                <div className="grid grid-cols-2 gap-2">
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text font-semibold">Available seats</span>
                        </label>
                        <input type="number" {...register("seats", { required: true })} placeholder="Available seats" className="input input-bordered w-full" />
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text font-semibold">Price</span>
                        </label>
                        <input type="number" {...register("price", { required: true })} placeholder="Price" className="input input-bordered w-full" />
                    </div>
                </div>
                <div>
                    <label>
                        <span className="text-base text-indigo-600 border-dashed border-2 border-indigo-600 justify-center flex items-center uppercase h-20 rounded font-semibold">{imageName}</span>
                        <input onChange={handleImage} required type="file" className="file-input hidden w-full" />
                    </label>
                </div>
                {errors.exampleRequired && <span className="text-red-600">This field is required</span>}
                <button type="submit" className="bg-[#e84c3d] hover:bg-[#d0493d] text-white uppercase w-full py-3">Add Class</button>
            </form>
        </div>
    );
};

export default AddClass;