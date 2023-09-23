import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Icon } from '@iconify/react';
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";
import axios from "axios";
import Swal from "sweetalert2";
import Button from "../../Components/Button/Button";

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
        <div className="py-16">
            <div className="bg-[#310758] w-2/4 mx-auto px-12 py-8 rounded">
            <h3 className="text-2xl font-semibold mb-4">Register!</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-control w-full">
                    <input type="text" {...register("name", { required: true })} placeholder="Name" className="input input-bordered w-full" />
                    {errors.name && <span className="text-red-500 mt-2">Name is required</span>}
                </div>
                <div className="form-control w-full mt-4">
                    <input type="email" {...register("email", { required: true })} placeholder="Email" className="input input-bordered w-full" />
                    {errors.email && <span className="text-red-500 mt-2">Email is required</span>}
                </div>
                <div className="form-control w-full mt-4">
                    <input type="url" {...register("photoURL", { required: true })} placeholder="PhotoURL" className="input input-bordered w-full" />
                    {errors.photoURL && <span className="text-red-500 mt-2">PhotoURL is required</span>}
                </div>
                <div className="form-control w-full mt-4">
                    <div className="relative">
                        <input type={showPassword ? 'text' : 'password'} {...register("password", { required: true, minLength: 6, pattern: /(?=.*[A-Z])(?=.*[!@#$&*])/ })} placeholder="Password" className="input input-bordered w-full" />
                        <Icon onClick={() => setShowPassword(true)} className={`absolute right-3 top-[32%] text-slate-600 text-xl ${showPassword ? 'hidden' : 'block'}`} icon="fa-regular:eye" />
                        <Icon onClick={() => setShowPassword(false)} className={`absolute right-3 top-[32%] text-slate-600 text-xl ${!showPassword ? 'hidden' : 'block'}`} icon="fa-regular:eye-slash" />
                    </div>
                    {errors.password?.type === 'required' && <span className="text-red-500 mt-2">Password is required</span>}
                    {errors.password?.type === 'minLength' && <span className="text-red-500 mt-2">Minimum 6 character Password required</span>}
                    {errors.password?.type === 'pattern' && <span className="text-red-500 mt-2">At least 1 Capital letter and 1 Spatial character required</span>}
                </div>
                <div className="form-control w-full mt-4">
                    <div className="relative">
                        <input type={showConfirmPassword ? 'text' : 'password'} {...register("confirmPassword", { required: true })} placeholder="Password" className="input input-bordered w-full" />
                        <Icon onClick={() => setShowConfirmPassword(true)} className={`absolute right-3 top-[32%] text-slate-600 text-xl ${showConfirmPassword ? 'hidden' : 'block'}`} icon="fa-regular:eye" />
                        <Icon onClick={() => setShowConfirmPassword(false)} className={`absolute right-3 top-[32%] text-slate-600 text-xl ${!showConfirmPassword ? 'hidden' : 'block'}`} icon="fa-regular:eye-slash" />
                    </div>
                    {errors.confirmPassword && <span className="text-red-500 mt-2">Password is required</span>}
                    {ConfirmError && <span className="text-red-500 mt-2">{ConfirmError}</span>}
                </div>
                <Button type="submit" full={true} className="mt-4 rounded py-3" btnText="register"/>
            </form>
            <p className="mt-1">I have an account <Link to='/login' className="text-[#9b51e0] font-semibold hover:underline">Login</Link></p>
            <div className="text-center mt-4">
                <button onClick={handlerGoogleUser} className="btn btn-square py-3 font-semibold bg-blue-600 hover:bg-blue-700  text-white">
                    <Icon icon="fa-brands:google" />
                </button>
            </div>
        </div>
        </div>
    );
};

export default Register;