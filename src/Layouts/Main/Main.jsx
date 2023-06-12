import { Outlet, useLocation } from "react-router-dom";
import NavBar from "../../Pages/Shared/NavBar/NavBar";
import Footer from "../../Pages/Shared/Footer/Footer";
import { Parallax, ParallaxLayer } from '@react-spring/parallax';
import darkImage from '../../assets/home/dark.svg'
import darkImage2 from '../../assets/home/dark-1.svg'

const Main = () => {
    const location = useLocation();
    return (
        <>
            {
                location.pathname === '/' ? <> <div className="hidden lg:block">
                    <div className='min-h-screen flex flex-col'>
                        <NavBar />
                        <Parallax pages={2} style={{ top: '0', left: '0' }}>
                            <ParallaxLayer className="mt-[70px]" offset={0} speed={.2}>
                                <img src={darkImage2} className="w-full" alt="" />
                                <img src={darkImage2} className="w-full" alt="" />
                                <img src={darkImage} className="w-full" alt="" />
                            </ParallaxLayer>
                            <ParallaxLayer offset={0} speed={2.5}>
                                <div className="mt-[70px] lg:mt-20">
                                    <Outlet />
                                </div>
                                <div className="mt-auto">
                                    <Footer />
                                </div>
                            </ParallaxLayer>
                        </Parallax>
                    </div>
                </div>
                    <div className='lg:hidden min-h-screen flex flex-col'>
                        <NavBar />
                        <div className="mt-[70px] lg:mt-20">
                            <Outlet />
                        </div>
                        <div className="mt-auto">
                            <Footer />
                        </div>
                    </div>
                </>
                    : <div className={`${location.pathname === '/' && 'hidden'} min-h-screen flex flex-col`}>
                        <NavBar />
                        <div className="mt-[70px] lg:mt-20">
                            <Outlet />
                        </div>
                        <div className="mt-auto">
                            <Footer />
                        </div>
                    </div>
            }


        </>
    );
};

export default Main;