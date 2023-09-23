import { useEffect, useState } from "react";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import axios from "axios";
import { Icon } from "@iconify/react";
import Button from "../../../Components/Button/Button";

const PopularClass = () => {
  const [classes, setClasses] = useState([]);
  const [displaySlideStart,setDisplaySlideStart]=useState(0);
  const [displaySlideEnd,setDisplaySlideEnd]=useState(4);
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_SERVER_API}/popularClasses`)
      .then((res) => {
        setClasses(res.data);
      });
  }, [setClasses]);
  const displayClassStartHandler=(i)=>{
        setDisplaySlideStart(i);
        setDisplaySlideEnd(i+4);
  }
  return (
    <div className={`pt-16 px-5 md:px-10 lg:px-20 text-white`}>
      <SectionTitle
        title="Popular Classes"
        subTitle="Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus ipsa doloremque aspernatur odio alias atque dolore autem quaerat non id."
      />
      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5 mt-8">
        {classes?.slice(displaySlideStart, displaySlideEnd)?.map((item, index) => (
          <div
            key={index}
            className={` bg-[#1C1E2AB3] cart-bg shadow rounded-lg overflow-hidden`}
          >
            <figure className="overflow-hidden md:h-52 lg:h-60 xl:h-48">
              <img
                className="w-auto h-full"
                src={item.classImage}
                alt="Thumbnail"
              />
            </figure>
            <div className="p-5">
              <h2 className="text-xl font-semibold capitalize">{item.className}</h2>
              <div className="mt-1 text-lg text-[#9b51e0] font-semibold flex items-center">
                <Icon icon="fa-solid:dollar-sign" />
                {item.price}
              </div>
              <p className="font-semibold text-[#bbacca]">Instructor {item.instructorName}</p>
              <p className="font-semibold text-[#bbacca]">
                {item.enrolled ? item.enrolled : 0} Students
              </p>
              <Button full={true} className="mt-5 rounded-full" btnText="Enroll Now" />
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-7">
        {classes.length>4&&classes?.slice(3)?.map((item,i)=><span key={i} onClick={()=>displayClassStartHandler(i)} className={`cursor-pointer w-10 py-1 rounded-r-full flex-1 ${displaySlideStart===i?"bg-[#9b51e0]":"bg-[#541c89]"} `}></span>)}
      </div>
    </div>
  );
};

export default PopularClass;
