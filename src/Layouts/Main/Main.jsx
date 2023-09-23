import { Outlet, useLocation } from "react-router-dom";
import NavBar from "../../Pages/Shared/NavBar/NavBar";
import Footer from "../../Pages/Shared/Footer/Footer";
const Main = () => {
//   const location = useLocation();
  return (
    <>
    <NavBar/>
    <div className="bg-color text-white">
    <Outlet/>
    </div>
    <Footer/>
    </>
  );
};

export default Main;
