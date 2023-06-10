import { useContext } from 'react';
import { useForm } from "react-hook-form";
import Modal from 'react-modal';
import { AuthContext } from '../../../Providers/AuthProvider';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Icon } from '@iconify/react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
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

const SendFeedback = () => {
    const {id} = useParams();
    const { setIsOpen, modalIsOpen } = useContext(AuthContext);
    const [axiosSecure] = useAxiosSecure();
    const naviGate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = (data) => {
        axiosSecure.patch(`/updateFeedback/${id}`,data)
        .then(res=>{
            console.log(res.data);
            if(res.data.modifiedCount>0){
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Your Feedback Added',
                    showConfirmButton: false,
                    timer: 1500
                })
                naviGate('/dashboard/manageClasses')
            }
        })
    };
    return (
        <div>
            <div>
                <Modal
                    isOpen={modalIsOpen}
                    ariaHideApp={false}
                    onRequestClose={() => {
                        setIsOpen(false)
                        naviGate('/dashboard/manageClasses')
                    }}
                    style={customStyles}
                    contentLabel="Example Modal"
                >
                    {/* TODO: write a meaningful message */}
                    <h2 className='text-2xl font-semibold mb-4'>Write A Feedback</h2>
                    <form onSubmit={handleSubmit(onSubmit)} className='w-[450px]'>
                        <div className="form-control">
                            <textarea {...register("feedback", { required: true })} className="textarea textarea-bordered h-40" placeholder="Feedback"></textarea>
                            {errors.feedback && <span className='mt-1 flex items-center gap-1 text-red-600'><Icon className='inline-block' icon="heroicons-outline:exclamation-circle" />Feedback is required</span>}
                        </div>
                        <div className='flex justify-end gap-2 mt-2'>
                            <input type="submit" value="send" className="btn bg-[rgba(1,16,31,.9)] hover:bg-[rgb(1,16,31)] text-white text-base" />
                            {/* <button  onClick={() => setIsOpen(true)} className="btn bg-[rgba(1,16,31,.9)] hover:bg-[rgb(1,16,31)] text-white text-base">Send</button> */}
                            <Link to='/dashboard/manageClasses' className="btn bg-red-600 hover:bg-red-800 text-white text-base" onClick={() => setIsOpen(false)}><Icon className="text-lg" icon="heroicons-outline:x" /></Link>
                        </div>
                    </form>
                </Modal>
            </div>
        </div>
    );
};

export default SendFeedback;