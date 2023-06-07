import SectionTitle from "../../../Components/SectionTitle/SectionTitle";

const PopularClass = () => {
    const classes = [{}, {}, {}]
    return (
        <div className="py-16 px-5 md:px-10 lg:px-20">
            <SectionTitle
                title='Popular Classes'
                subTitle='Learn from the best coaches in the business'
            />
            <div className="grid md:grid-cols-3 gap-5 mt-8">
                {
                    classes.map((item, index) => <div
                        key={index}
                        className="shadow-lg rounded-md"
                    >
                        <figure><img className="h-60" src="https://www.teambath.com/wp-content/uploads/2023/04/Scotland-Women-Football-040424_3-scaled.jpg" alt="Thumbnail" /></figure>
                        <div className="card-body">
                            <h2 className="card-title">
                                Classes name
                                <div className="badge badge-secondary">28 students</div>
                            </h2>
                            <p>If a dog chews shoes whose shoes does he choose?</p>
                            <div className="card-actions justify-end">
                                <div className="badge badge-outline">Teacher Name</div>
                                <div className="badge badge-outline">Rating</div>
                            </div>
                        </div>
                    </div>
                    )
                }
            </div>
        </div>
    );
};

export default PopularClass;