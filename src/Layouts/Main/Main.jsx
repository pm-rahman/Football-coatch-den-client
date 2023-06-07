import { Outlet } from "react-router-dom";
import NavBar from "../../Pages/Shared/NavBar/NavBar";
import Footer from "../../Pages/Shared/Footer/Footer";

const Main = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <NavBar />
            <div className="mt-20">
                <Outlet />
            </div>
            <div className="mt-auto">
                <Footer />
            </div>
        </div>
    );
};

export default Main;