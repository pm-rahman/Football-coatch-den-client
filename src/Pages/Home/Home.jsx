import HomeBanner from "./HomeBanner/HomeBanner";
import PopularClass from "./PopularClass/PopularClass";
import PopularInstructors from "./PopularInstructors/PopularInstructors";
import SuccessStories from "./SuccessStories/SuccessStories";

const Home = () => {
    return (
        <div>
            <HomeBanner />
            <PopularClass />
            <PopularInstructors />
            <SuccessStories/>
        </div>
    );
};

export default Home;