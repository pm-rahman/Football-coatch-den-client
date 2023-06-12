import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Icon } from '@iconify/react';
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";
import axios from "axios";
import Swal from "sweetalert2";

const Register = () => {
    const { createUser, updateUser, googleSignIn } = useContext(AuthContext);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [ConfirmError, setConfirmError] = useState(false)
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const naviGate = useNavigate();

    const onSubmit = data => {
        setConfirmError(false);
        const { password, confirmPassword } = data;
        if (password !== confirmPassword) {
            return setConfirmError('Your password does not match');
        }
        createUser(data.email, data.password)
            .then(result => {
                const user = result.user;
                updateUser(data.name, data.photoURL)
                    .then(() => {
                        reset();
                        const loggedUser = {
                            name: user?.displayName,
                            email: user?.email,
                            photo: user?.photoURL
                        }
                        axios.put(`${import.meta.env.VITE_SERVER_API}/user`, loggedUser)
                            .then((data) => {
                                if (data.data.upsertedCount > 0) {
                                    Swal.fire({
                                        position: 'top-end',
                                        icon: 'success',
                                        title: 'Your Profile has been Created',
                                        showConfirmButton: false,
                                        timer: 1500
                                    })
                                }
                                naviGate('/');
                            })
                    })
                    .catch(error => {
                        setConfirmError(error.message);
                    })

            })
            .catch(error => {
                setConfirmError(error.message)
            })
    };
    const handlerGoogleUser = () => {
        setConfirmError(false)
        googleSignIn()
            .then((result) => {
                const user = result.user;
                const loggedUser = {
                    name: user?.displayName,
                    email: user?.email,
                    photo: user?.photoURL
                }
                axios.put(`${import.meta.env.VITE_SERVER_API}/user`, loggedUser)
                    .then((data) => {
                        if (data.data.upsertedCount > 0) {
                            Swal.fire({
                                position: 'top-end',
                                icon: 'success',
                                title: 'Your Profile has been Created',
                                showConfirmButton: false,
                                timer: 1500
                            })
                        }
                        else {
                            Swal.fire({
                                position: 'top-end',
                                icon: 'success',
                                title: 'Login Successful',
                                showConfirmButton: false,
                                timer: 1500
                            })
                        }
                        naviGate('/')
                    })
            })
            .catch(error => {
                setConfirmError(error.message);
            })
    }
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
                <input type="submit" value="Register" className="py-3 btn hover:bg-[rgb(1,16,31)] font-semibold rounded w-full mt-3 bg-[rgba(1,16,31,.9)] text-white" />
            </form>
            <p className="mt-1">I have an account <Link to='/login' className="text-red-500 hover:underline">Login</Link></p>
            <div className="divider"></div>
            <div className="text-center">
                <button onClick={handlerGoogleUser} className="btn btn-square py-3 font-semibold bg-blue-600 hover:bg-blue-700  text-white">
                    <Icon icon="fa-brands:google" />
                </button>
            </div>
        </div>
    );
};

export default Register;