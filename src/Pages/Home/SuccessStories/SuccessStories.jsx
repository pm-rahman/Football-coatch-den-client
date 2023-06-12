import { useContext } from "react";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import student1 from '../../../assets/home/student-image1.jpg'
import student2 from '../../../assets/home/student-image2.jpg'
import { AuthContext } from "../../../Providers/AuthProvider";

const SuccessStories = () => {
    const {dark} = useContext(AuthContext);
    return (
        <div className={`py-16 px-5 md:px-10 lg:px-20 ${!dark?'bg-white text-[rgb(1,16,31)]':'text-white'}`}>
            <SectionTitle
                title='How Our Students Achieved Success'
                subTitle='Real-life stories of students who have achieved success on and off the field'
            />
            <div className="mt-8 grid md:grid-cols-2 gap-6">
                <div className="bg-base-200 rounded grid md:grid-cols-2 md:h-[300px]">
                    <img src={student1} className="rounded h-full shadow-2xl" />
                    <div className={`p-4 h-[300px] overflow-y-scroll ${!dark?'':'text-black'}`}>
                        <h1 className="text-2xl font-bold">John Thompson</h1>
                        <p className="py-2">
                            John Thompson joined his high school football team with little experience and initially struggled to find his place on the field. However, with the guidance and training provided by The Football Coach's Den, John's skills improved significantly. Through hard work and determination, he transformed from a benchwarmer to a key player, eventually earning the position of team captain in his senior year. John's success story is a testament to the transformative power of dedicated coaching and personal growth.</p>
                    </div>
                </div>
                <div className={`bg-base-200 grid rounded md:grid-cols-2 md:h-[300px] ${!dark?'':'text-black'}`}>
                    <img src={student2} className="rounded h-full shadow-2xl" />
                    <div className="p-4 h-[300px] overflow-y-scroll">
                        <h1 className="text-2xl font-bold">Michael Rodriguez</h1>
                        <p className="py-2">Overcoming Adversity Michael Rodriguez faced numerous obstacles on his journey to becoming a successful football player. Coming from a disadvantaged background, he lacked the resources and opportunities that many other players had. The Football Coach's Den recognized his potential and offered him a scholarship, providing him with top-notch training and mentorship. Despite the challenges, Michael's perseverance and the support he received helped him rise above adversity. He not only became a star player but also inspired others by showing that hard work and determination can overcome any obstacle.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SuccessStories;