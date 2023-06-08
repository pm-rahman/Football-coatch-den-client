import SectionTitle from "../../../Components/SectionTitle/SectionTitle";

const PopularInstructors = () => {
    const instructors = [{}, {}, {}]
    return (
        <div className="py-16 px-5 md:px-10 lg:px-20 bg-[rgb(1,16,31)] text-white">
            <SectionTitle
                title='Meet Our Instructors'
                subTitle='Meet the experts who will help you take your coaching to the next level'
            />
            <div className="grid md:grid-cols-3 gap-5 mt-8">
                {
                    instructors.map((item, index) => <div
                        key={index}
                        className="shadow-lg bg-[#071f37] rounded-md"
                    >
                        <figure><img className="w-full" src="https://uploads-ssl.webflow.com/611b68bedd47db37c67ba1b3/613774807794b065ee9e9a77_coach-instructing-football-team-in-field-2R8SJZB.jpeg" alt="Thumbnail" /></figure>
                        <div className="card-body">
                            <h2 className="card-title">
                                Instructors Name
                            </h2>
                            <p>If a dog chews shoes whose shoes does he choose?</p>
                            <div className="flex justify-end gap-2">
                                <div className="badge badge-outline hero-content">Classes Number</div>
                                <div className="badge badge-outline hero-content">Student Number</div>
                            </div>
                        </div>
                    </div>
                    )
                }
            </div>
        </div>
    );
};

export default PopularInstructors;