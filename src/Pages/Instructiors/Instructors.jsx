import { useLoaderData } from "react-router-dom";
import EmptyPage from "../../Components/EmptyPage/EmptyPage";
import SectionTitle from "../../Components/SectionTitle/SectionTitle";
import Button from "../../Components/Button/Button";

const Instructors = () => {
  const instructors = useLoaderData();
  return (
    <div className="gradient-t-bg py-16 px-5 md:px-10 lg:px-20">
      {instructors && instructors.length > 0 ? (
        <>
          <SectionTitle
            title="All Instructors"
            subTitle="Find a best Instructors for you"
          />
          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5 mt-8">
            {instructors?.map((item, index) => (
              <div
                key={index}
                className={` bg-[#1C1E2AB3] cart-bg shadow rounded-lg overflow-hidden`}
              >
                <figure className="overflow-hidden md:h-52 lg:h-60 xl:h-48">
                  <img
                    className="w-auto h-full"
                    src={item.photo}
                    alt="Thumbnail"
                  />
                </figure>
                <div className="px-4 py-4">
                  <h2 className="text-xl font-semibold capitalize">
                    {item.name}
                  </h2>
                  <p className="font-semibold text-[#bbacca]">
                    Email : {item.email}
                  </p>
                  <p className="font-semibold text-[#bbacca]">
                    {item.student ? item.student : 0} Students
                  </p>
                  <Button
                    full={true}
                    className="mt-4 rounded-full"
                    btnText="View Classes"
                  />
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <EmptyPage emptyText="No Instructor Available At This Moment!" />
        </>
      )}
    </div>
  );
};

export default Instructors;
