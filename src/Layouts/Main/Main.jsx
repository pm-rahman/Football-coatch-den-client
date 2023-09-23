import { Outlet, useLocation } from "react-router-dom";
import NavBar from "../../Pages/Shared/NavBar/NavBar";
import Footer from "../../Pages/Shared/Footer/Footer";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import darkImage from "../../assets/home/dark.svg";
import darkImage2 from "../../assets/home/dark-1.svg";

const Main = () => {
  const location = useLocation();
  return (
    <>
    <NavBar/>
    <Outlet/>
    <Footer/>
      {/* {location.pathname === "/" ? (
        <>
          {" "}
          <NavBar />
          <div className="mt-[70px] lg:mt-20">
            <Outlet />
          </div>
          <div className="mt-auto">
            <Footer />
          </div>
        </>
      ) : (
        <div
          className={`${
            location.pathname === "/" && "hidden"
          } min-h-screen flex flex-col`}
        >
          <NavBar />
          <div className="mt-[70px] lg:mt-20">
            <Outlet />
          </div>
          <div className="mt-auto">
            <Footer />
          </div>
        </div>
      )} */}
    </>
  );
};

export default Main;
