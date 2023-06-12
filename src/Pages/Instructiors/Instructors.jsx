import { useLoaderData } from "react-router-dom";
import EmptyPage from "../../Components/EmptyPage/EmptyPage";
import SectionTitle from "../../Components/SectionTitle/SectionTitle";

const Instructors = () => {
    const instructors = useLoaderData();
    return (
        <div className="py-16 px-5 md:px-10 lg:px-20">
            <SectionTitle
                title='All Instructors'
                // TODO: make good description
                subTitle='Find a best Instructors for you'
            />
            {
                instructors && instructors.length > 0 ? <>
                    <div className="grid grid-cols-3 gap-5 mt-8">
                        {
                            instructors.map((instructor, index) => <div
                                key={index}
                                className="shadow-lg rounded-md capitalize"
                            >
                                <figure className="h-64 overflow-hidden"><img className="w-full min-h-full" src={instructor.photo} alt="Thumbnail" /></figure>
                                <div className="p-4">
                                    <h2 className="card-title uppercase">{instructor.name}</h2>
                                    <p>Email : {instructor.email}</p>
                                </div>
                            </div>
                            )
                        }
                    </div>
                </> : <>
                    <EmptyPage emptyText='No Instructor Available At This Moment!' />
                </>
            }
        </div>
    );
};

export default Instructors;