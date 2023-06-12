import { useContext, useEffect, useState } from "react";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import axios from "axios";
import { Icon } from "@iconify/react";
import { AuthContext } from "../../../Providers/AuthProvider";

const PopularClass = () => {
    const [classes,setClasses] = useState([])
    const {dark} = useContext(AuthContext);
    useEffect(()=>{
        axios.get(`${import.meta.env.VITE_SERVER_API}/popularClasses`)
        .then(res=>{
            setClasses(res.data)
        })
    },[setClasses]);
    return (
        <div className={`py-16 px-5 md:px-10 lg:px-20 ${!dark?'bg-white text-[rgb(1,16,31)]':'text-back lg:text-white'}`}>
            <SectionTitle
                title='Popular Classes'
                subTitle='Learn from the best coaches in the business'
            />
            <div className="grid md:grid-cols-3 gap-5 mt-8">
                {
                    classes.map((item, index) => <div
                        key={index}
                        className={`shadow rounded-md ${!dark?'':'shadow-white'}`}
                    >
                        <figure className="h-64 overflow-hidden"><img className="w-full" src={item.classImage} alt="Thumbnail" /></figure>
                        <div className="p-5">
                            <h2 className="card-title capitalize">
                                {item.className}
                                <div className="badge bg-[#071f37] text-white px-3 py-2 font-semibold"><Icon className="inline-block" icon="fa-solid:dollar-sign"  />{item.price}</div>
                            </h2>
                            <p className="font-semibold ">Instructor {item.instructorName}</p>
                            <p><Icon className="inline-block mr-1" icon="fa-regular:envelope" /> {item.instructorEmail}</p>
                            <p className="font-semibold">{item.enrolled?item.enrolled:0} Students</p>
                        </div>
                    </div>
                    )
                }
            </div>
        </div>
    );
};

export default PopularClass;