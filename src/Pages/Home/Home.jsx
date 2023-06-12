import HomeBanner from "./HomeBanner/HomeBanner";
import PopularClass from "./PopularClass/PopularClass";
import PopularInstructors from "./PopularInstructors/PopularInstructors";
import SuccessStories from "./SuccessStories/SuccessStories";

const Home = () => {
    return (
        <>
            <HomeBanner />
            <PopularClass />
            <PopularInstructors />
            <SuccessStories />
        </>
    );
};

export default Home;