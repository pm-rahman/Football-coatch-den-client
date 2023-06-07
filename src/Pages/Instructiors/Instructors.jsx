import { Link } from "react-router-dom";
import Button from "../../Components/Button/Button";

const Instructors = () => {
    return (
        <div className="py-16 px-5 md:px-10 lg:px-20">
            <div className="grid md:grid-cols-2 bg-base-200">
                <figure><img className="w-full" src="https://uploads-ssl.webflow.com/611b68bedd47db37c67ba1b3/613774807794b065ee9e9a77_coach-instructing-football-team-in-field-2R8SJZB.jpeg" alt="Thumbnail" /></figure>
                <div className="p-5 px-8 flex flex-col">
                    <h1 className="text-3xl font-bold">Trainer Name</h1>
                    <p>Email : instructors@gmail.com </p>
                    <p>Total Classes : 10</p>
                    <h5 className="text-xl font-semibold uppercase">Classes Name</h5>
                    <div className="h-52 overflow-y-scroll">
                        <ul className=" flex gap-4">
                            <li>#</li>
                            <li>Name</li>
                        </ul>
                        <ul className=" flex gap-4">
                            <li>1</li>
                            <li>Classes Name</li>
                        </ul>
                    </div>
                    <Link to='/instructorClasses' className="mt-auto"><Button btnText='View All classes'/></Link>
                </div>
            </div>
        </div>
    );
};

export default Instructors;