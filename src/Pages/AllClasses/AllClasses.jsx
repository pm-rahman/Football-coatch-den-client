import Button from "../../Components/Button/Button";
import SectionTitle from "../../Components/SectionTitle/SectionTitle";

const AllClasses = () => {
    const classes = [{}, {}, {}]
    return (
        <div className="py-16 px-5 md:px-10 lg:px-20">
            <SectionTitle
                title='All Classes'
                subTitle='Learn from the best coaches in the business'
            />
            <div className="grid md:grid-cols-3 gap-5 mt-8">
                {
                    classes.map((item, index) => <div
                        key={index}
                        className="shadow-lg rounded-md"
                    >
                        <figure className="h-60 overflow-hidden"><img className="w-full mx-auto" src="https://www.teambath.com/wp-content/uploads/2023/04/Scotland-Women-Football-040424_3-scaled.jpg" alt="Thumbnail" /></figure>
                        <div className="p-5">
                            <h2 className="pb-1 font-semibold text-xl">
                                Classes name
                                <div className="badge badge-secondary ml-2">$30</div>
                            </h2>
                            <div className="font-semibold">Teacher Name</div>
                            <div className="font-semibold">10 sites Available</div>
                            <div className="mt-2">
                                <Button btnText='Select' full={true} />
                            </div>
                        </div>
                    </div>
                    )
                }
            </div>
        </div>
    );
};

export default AllClasses;