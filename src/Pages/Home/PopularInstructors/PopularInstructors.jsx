import axios from "axios";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import { useContext, useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { AuthContext } from "../../../Providers/AuthProvider";

const PopularInstructors = () => {
    const {dark} = useContext(AuthContext);
    const [instructors,setInstructors] = useState([])
    useEffect(()=>{
        axios.get(`${import.meta.env.VITE_SERVER_API}/popularInstructor`)
        .then(res=>{
            setInstructors(res.data)
        })
    },[setInstructors]);
    return (
        <div className={`py-16 px-5 md:px-10 lg:px-20  ${dark?'bg-slate-100 text-[rgb(1,16,31)]':' text-white'}`}>
            <SectionTitle
                title='Meet Our Instructors'
                subTitle='Meet the experts who will help you take your coaching to the next level'
            />
            <div className="grid md:grid-cols-3 gap-5 mt-8">
                {
                    instructors.map((item, index) => <div
                        key={index}
                        className={`shadow rounded-md ${dark?'text-[rgb(1,16,31)]':'shadow-white  text-white'}`}
                    >
                        <figure className="h-64 overflow-hidden"><img className="w-full min-h-full" src={item.photo} alt="Thumbnail" /></figure>
                        <div className="px-4 py-4">
                            <h2 className="card-title uppercase">
                               {item.name}
                            </h2>
                            <p><Icon className="inline-block mr-1" icon="fa-regular:envelope" /> {item.email}</p>
                            <p>{item.student?item.student:0} Students</p>
                        </div>
                    </div>
                    )
                }
            </div>
        </div>
    );
};

export default PopularInstructors;