import EmptyPage from "../../../Components/EmptyPage/EmptyPage";
import usePayment from "../../../hooks/usePayment";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";

const MyEnrolledClasses = () => {
    const [enrollClass] = usePayment();
    return (
        <div className="pb-5 pl-5 md:pl-10 lg:pl-20">

            {
                enrollClass && enrollClass.length > 0 ? <>
                    <SectionTitle
                        title='Your Enroll Classes'
                    />
                    <div className="grid md:grid-cols-2 gap-5 mt-8">

                        {
                            enrollClass.map((item, index) => <div
                                key={index}
                                className='shadow-lg rounded-md'
                            >
                                <figure className="h-60 overflow-hidden"><img className="w-full mx-auto" src={item.classImage} alt="Thumbnail" /></figure>
                                <div className={`p-5 ${item.seats === 0 && 'bg-red-400'}`}>
                                    <h2 className="pb-1 font-semibold text-xl">
                                        {item.className}
                                        <div className="badge badge-secondary ml-2">${item.amount}</div>
                                    </h2>
                                    <div className="font-semibold">Instructor : {item.instructorName}</div>
                                    <div className="font-semibold">{item.seats} sites Available</div>
                                </div>
                            </div>
                            )
                        }
                    </div>
                </>
                    : <>
                        <EmptyPage emptyText="You do not enrol any classes yet" />
                    </>
            }
        </div>
    );
};

export default MyEnrolledClasses;