import axios from "axios";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import { useEffect, useState } from "react";
import Button from "../../../Components/Button/Button";
import { Link } from "react-router-dom";

const PopularInstructors = () => {
    const [instructors,setInstructors] = useState([])
    useEffect(()=>{
        axios.get(`${import.meta.env.VITE_SERVER_API}/popularInstructor`)
        .then(res=>{
            setInstructors(res.data)
        })
    },[setInstructors]);
    return (
        <div className={`pt-16 px-5 md:px-10 lg:px-20 text-white`}>
            <SectionTitle
                title='Meet Our Instructors'
                subTitle='Meet the experts who will help you take your coaching to the next level'
            />
            <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5 mt-8">
                {
                    instructors?.slice(0,4)?.map((item, index) => <div
                    key={index}
                    className={` bg-[#1C1E2AB3] cart-bg shadow rounded-lg overflow-hidden`}
                  >
                        <figure className="overflow-hidden md:h-52 lg:h-60 xl:h-48"><img className="w-auto h-full" src={item.photo} alt="Thumbnail" /></figure>
                        <div className="px-4 py-4">
                            <h2 className="text-xl font-semibold capitalize">
                               {item.name}
                            </h2>
                            <p className="font-semibold text-[#bbacca]">{item.student?item.student:0} Students</p>
                            <Link to="/instructors"><Button full={true} className="mt-4 rounded-full" btnText="View all" /></Link>
                        </div>
                    </div>
                    )
                }
            </div>
        </div>
    );
};

export default PopularInstructors;