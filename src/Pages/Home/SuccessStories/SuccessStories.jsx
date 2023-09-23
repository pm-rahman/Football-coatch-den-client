import { useState } from "react";
import student1 from "../../../assets/home/student-image1.jpg";
import student2 from "../../../assets/home/student-image2.jpg";

const successStory = [
  {
    id: 1,
    name: "John Thompson",
    thumbnail: student1,
    article: `John Thompson joined his high school football team with little experience and initially struggled to find his place on the field. However, with the guidance and training provided by The Football Coach's Den, John's skills improved significantly. Through hard work and determination, he transformed from a benchwarmer to a key player, eventually earning the position of team captain in his senior year. John's success story is a testament to the transformative power of dedicated coaching and personal growth.`,
  },
  {
    id: 2,
    name: "Michael Rodriguez",
    thumbnail: student2,
    article: `Overcoming Adversity Michael Rodriguez faced numerous obstacles on his journey to becoming a successful football player. Coming from a disadvantaged background, he lacked the resources and opportunities that many other players had. The Football Coach's Den recognized his potential and offered him a scholarship, providing him with top-notch training and mentorship. Despite the challenges, Michael's perseverance and the support he received helped him rise above adversity. He not only became a star player but also inspired others by showing that hard work and determination can overcome any obstacle.`,
  },
];

const SuccessStories = () => {
  const [displaySlideNumber,SetDisplaySlideNumber]=useState(0)
  const displayArticle = successStory[displaySlideNumber];
  console.log(displaySlideNumber);
  return (
    <div className={`container py-16 md:px-10 lg:px-20 text-white`}>
      <div className="gradient-t-bg p-10 md:p-16 rounded-3xl">
        <div className={`lg:mt-8 flex flex-col-reverse lg:flex-row gap-10 xl:gap-32 lg:items-center rounded`}>
          <div className="lg:w-[50%]">
            <h6 className="mb-2 text-[#9b51e0] uppercase font-semibold">How Our Students Achieved Success</h6>
            <h1 className="text-2xl md:text-4xl font-bold mb-3">{displayArticle?.name}</h1>
            <p className="text-[#bbacca]">{displayArticle?.article}</p>
          </div>
          <div className="rounded lg:w-[50%] xl:h-[430px] overflow-hidden">
            <img className="w-full rounded h-auto" src={displayArticle?.thumbnail}/>
          </div>
        </div>
      </div>
      <div className="flex justify-center gap-2">
      {successStory.map((item,i)=><span key={i} onClick={()=>SetDisplaySlideNumber(i)} className={`inline-block cursor-pointer h-3 w-3 border-2 rounded-full border-[#9b51e0] ${displaySlideNumber===i&&"bg-[#9b51e0]"}`}></span>)}
      </div>
    </div>
  );
};

export default SuccessStories;
