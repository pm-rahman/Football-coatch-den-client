import HomeBanner from "./HomeBanner/HomeBanner";
import PopularClass from "./PopularClass/PopularClass";

const Home = () => {
    return (
        <div>
            <HomeBanner/>
            <div className="px-5 md:px-10 lg:px-20">
                <div>
                    <PopularClass/>
                </div>
            </div>
        </div>
    );
};

export default Home;