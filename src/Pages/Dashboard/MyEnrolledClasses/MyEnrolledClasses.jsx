import EmptyPage from "../../../Components/EmptyPage/EmptyPage";

const MyEnrolledClasses = () => {
    const enrolledClasses = [{},{}]
    return (
        <>
            {
                enrolledClasses && enrolledClasses.length > 0 ? <>
                    <h2 className="text-3xl uppercase font-semibold">Mange Your Selected Classes</h2>
                    <div className="grid md:grid-cols-2 gap-5 mt-8">
                        {
                            enrolledClasses.map((item, index) => <div
                                key={index}
                                className="shadow-lg rounded-md"
                            >
                                <figure className="h-60 overflow-hidden"><img className="w-full mx-auto" src="https://www.teambath.com/wp-content/uploads/2023/04/Scotland-Women-Football-040424_3-scaled.jpg" alt="Thumbnail" /></figure>
                                <div className="p-5">
                                    <h2 className="pb-1 font-semibold text-xl">Classes name</h2>
                                    <div className="font-semibold">Teacher Name</div>
                                </div>
                            </div>
                            )
                        }
                    </div>
                </> : <>
                    <EmptyPage emptyText='No Classes Enrolled yet' />
                </>
            }
        </>
    );
};

export default MyEnrolledClasses;