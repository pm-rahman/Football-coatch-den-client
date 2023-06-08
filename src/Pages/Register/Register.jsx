import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Icon } from '@iconify/react';
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";

const Register = () => {
    const { createUser,updateUser } = useContext(AuthContext);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [ConfirmError, setConfirmError] = useState(false)
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const naviGate = useNavigate();

    const onSubmit = data => {
        setConfirmError(false);
        const { password, confirmPassword } = data;
        console.log(password, confirmPassword);
        if (password !== confirmPassword) {
            return setConfirmError('Your password does not match');
        }
        createUser(data.email, data.password)
            .then(result => {
                const user = result.user;
                updateUser(data.name,data.photoURL)
                .then(()=>{})
                .catch(error=>{
                    setConfirmError(error.message);
                })
                // TODO : user will navigate in home
                // reset();
                // naviGate('/');
                console.log(user);
            })
            .catch(error => {
                setConfirmError(error.message)
            })
    };
    return (
        <div className="w-2/4 mx-auto bg-slate-200 px-12 py-8 rounded my-16">
            <h3 className="text-2xl font-semibold">Register!</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text font-semibold">Your Name</span>
                    </label>
                    <input type="text" {...register("name", { required: true })} placeholder="Type Name" className="input input-bordered w-full" />
                    {errors.name && <span className="text-red-500 mt-2">Name is required</span>}
                </div>
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text font-semibold">Your Email</span>
                    </label>
                    <input type="email" {...register("email", { required: true })} placeholder="Type Email" className="input input-bordered w-full" />
                    {errors.email && <span className="text-red-500 mt-2">Email is required</span>}
                </div>
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text font-semibold">Your PhotoURL</span>
                    </label>
                    <input type="url" {...register("photoURL", { required: true })} placeholder="Type PhotoURL" className="input input-bordered w-full" />
                    {errors.photoURL && <span className="text-red-500 mt-2">PhotoURL is required</span>}
                </div>
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text font-semibold">Your Password</span>
                    </label>
                    <div className="relative">
                        <input type={showPassword ? 'text' : 'password'} {...register("password", { required: true, minLength: 6, pattern: /(?=.*[A-Z])(?=.*[!@#$&*])/ })} placeholder="Type Password" className="input input-bordered w-full" />
                        <Icon onClick={() => setShowPassword(true)} className={`absolute right-3 top-[32%] text-slate-600 text-xl ${showPassword ? 'hidden' : 'block'}`} icon="fa-regular:eye" />
                        <Icon onClick={() => setShowPassword(false)} className={`absolute right-3 top-[32%] text-slate-600 text-xl ${!showPassword ? 'hidden' : 'block'}`} icon="fa-regular:eye-slash" />
                    </div>
                    {errors.password?.type === 'required' && <span className="text-red-500 mt-2">Password is required</span>}
                    {errors.password?.type === 'minLength' && <span className="text-red-500 mt-2">Minimum 6 character Password required</span>}
                    {errors.password?.type === 'pattern' && <span className="text-red-500 mt-2">At least 1 Capital letter and 1 Spatial character required</span>}
                </div>
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text font-semibold">Confirm Password</span>
                    </label>
                    <div className="relative">
                        <input type={showConfirmPassword ? 'text' : 'password'} {...register("confirmPassword", { required: true })} placeholder="Type Password" className="input input-bordered w-full" />
                        <Icon onClick={() => setShowConfirmPassword(true)} className={`absolute right-3 top-[32%] text-slate-600 text-xl ${showConfirmPassword ? 'hidden' : 'block'}`} icon="fa-regular:eye" />
                        <Icon onClick={() => setShowConfirmPassword(false)} className={`absolute right-3 top-[32%] text-slate-600 text-xl ${!showConfirmPassword ? 'hidden' : 'block'}`} icon="fa-regular:eye-slash" />
                    </div>
                    {errors.confirmPassword && <span className="text-red-500 mt-2">Password is required</span>}
                    {ConfirmError && <span className="text-red-500 mt-2">{ConfirmError}</span>}
                </div>
                <input type="submit" value="Register" className="py-3 btn hover:bg-[#d0493d] font-semibold rounded w-full mt-3 bg-[#e84c3d] text-white" />
            </form>
            <p className="mt-1">I have an account <Link to='/login' className="text-red-500 hover:underline">Login</Link></p>
            <div className="divider"></div>
            <div className="text-center">
                <button className="btn btn-square py-3 font-semibold bg-blue-600 hover:bg-blue-700  text-white">
                    <Icon icon="fa-brands:google" />
                </button>
            </div>
        </div>
    );
};

export default Register;