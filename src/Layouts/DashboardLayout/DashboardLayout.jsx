import { Link, NavLink, Outlet } from "react-router-dom";
import NavBar from "../../Pages/Shared/NavBar/NavBar";
import Footer from "../../Pages/Shared/Footer/Footer";
import { Icon } from '@iconify/react';
import useAdmin from "../../hooks/UseAdmin";
import useInstructor from "../../hooks/useInstructor";

const DashboardLayout = () => {
    const [isAdmin] = useAdmin();
    const [isInstructor] = useInstructor();
    return (
        <div className="min-h-screen flex flex-col">
            <NavBar />
            <div className="mt-[70px] lg:mt-20">
                <div className="pr-5 md:pr-10 lg:pr-20">
                    <div className="drawer lg:drawer-open">
                        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                        <div className="drawer-content flex flex-col mt-10 ml-12">
                            {/* Page content here */}
                            <Outlet />
                            <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>

                        </div>
                        <div className="drawer-side">
                            <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                            <ul className="menu text-base uppercase font-semibold p-4 w-80 h-full mt-[70px] lg:mt-0 bg-base-200 text-base-content">
                                {isAdmin ? <>
                                    <li><NavLink to='/dashboard/manageClasses'><Icon icon="iwwa:settings" />Manage Classes</NavLink></li>
                                    <li><NavLink to='/dashboard/manageUsers'><Icon icon="fa-solid:user-cog" />Manage Users</NavLink></li>
                                </> : <>
                                    {
                                        isInstructor ? <>
                                            <li><NavLink to='/dashboard/addClasses'><Icon icon="fa-solid:book-medical" /> Add a Class</NavLink></li>
                                            <li><NavLink to='/dashboard/myClasses'><Icon icon="fa-solid:book" /> My Classes</NavLink></li>
                                        </> : <>
                                            <li><NavLink to='/dashboard/mySelectedClasses'><Icon icon="fa-regular:bookmark" /> My Selected Classes</NavLink></li>
                                            <li><NavLink to='/dashboard/myEnrolledClasses'><Icon icon="entypo:book" /> My Enrolled Classes</NavLink></li>
                                            <li><NavLink to='/dashboard/paymentHistory'><Icon icon="fontisto:history" /> Payment History</NavLink></li>
                                        </>
                                    }
                                </>}
                                <div className="divider my-0"></div>
                                <li><Link to='/'><Icon icon="fa-solid:home" /> Home</Link></li>
                            </ul>

                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-auto">
                <Footer />
            </div>
        </div>
    );
};

export default DashboardLayout;