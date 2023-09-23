import { Outlet } from "react-router-dom";
import NavBar from "../../Pages/Shared/NavBar/NavBar";
import Footer from "../../Pages/Shared/Footer/Footer";
const Main = () => {
//   const location = useLocation();
  return (
    <>
    <NavBar/>
    <div className="gradient-t-bg text-white min-h-[55vh]">
    <Outlet/>
    </div>
    <Footer/>
    </>
  );
};

export default Main;
