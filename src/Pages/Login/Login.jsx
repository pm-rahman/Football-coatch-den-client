import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Icon } from '@iconify/react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";
import axios from "axios";
import Swal from "sweetalert2";
import Button from "../../Components/Button/Button";

const Login = () => {
    const { signIn, googleSignIn } = useContext(AuthContext);
    const [showPassword, setShowPassword] = useState(false);
    const [confirmError, setConfirmError] = useState(false);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const naviGate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const onSubmit = data => {
        setConfirmError(false)
        signIn(data.email, data.password)
            .then(() => {
                reset();
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Login Successful',
                    showConfirmButton: false,
                    timer: 1500
                })
                naviGate(from);
            })
            .catch(error => {
                setConfirmError(error.message);
            })
    }
    const handleGoogleUser = () => {
        setConfirmError(false)
        googleSignIn()
            .then(result => {
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
                    })
                naviGate(from);
            })
            .catch(error => {
                setConfirmError(error.message);
            })
    }
    return (
        <div className="py-16">
            <div className="bg-[#310758] w-1/3 mx-auto px-9 py-10 rounded">
            <h4 className="text-2xl font-semibold mb-4">Login!</h4>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-control w-full">
                    <input type="email" {...register("email", { required: true })} placeholder="Email" className="input input-bordered w-full" />
                    {errors.email && <span className="text-red-500 mt-2">Email is required</span>}
                </div>
                <div className="form-control w-full mt-3">
                    <div className="relative">
                        <input type={showPassword ? 'text' : 'password'} {...register("password", { required: true })} placeholder="Password" className="input input-bordered w-full" />
                        <Icon onClick={() => setShowPassword(true)} className={`absolute right-3 top-[32%] text-slate-600 text-xl ${showPassword ? 'hidden' : 'block'}`} icon="fa-regular:eye" />
                        <Icon onClick={() => setShowPassword(false)} className={`absolute right-3 top-[32%] text-slate-600 text-xl ${!showPassword ? 'hidden' : 'block'}`} icon="fa-regular:eye-slash" />
                    </div>
                    {errors.password && <span className="text-red-500 mt-2">Password is required</span>}
                    {confirmError && <span className="text-red-500 mt-2">{confirmError}</span>}
                </div>
                <Button type="submit" full={true} className="mt-3 rounded py-3" btnText="Login"/>
            </form>
            <p className="mt-1">I do not have account <Link to='/register' className="text-[#9b51e0] font-semibold hover:underline">Register</Link></p>
            <div className="text-center mt-3">
                <button onClick={handleGoogleUser} className="btn btn-square py-3 font-semibold bg-blue-600 hover:bg-blue-700  text-white">
                    <Icon icon="fa-brands:google" />
                </button>
            </div>
            </div>
        </div>
    );
};

export default Login;