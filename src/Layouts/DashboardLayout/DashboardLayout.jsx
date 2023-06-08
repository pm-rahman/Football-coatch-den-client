import { Link, NavLink, Outlet } from "react-router-dom";
import NavBar from "../../Pages/Shared/NavBar/NavBar";
import Footer from "../../Pages/Shared/Footer/Footer";
import { Icon } from '@iconify/react';
import useUserRole from "../../hooks/useUserRole";
import useAdmin from "../../hooks/useAdmin";
import useInstructor from "../../hooks/useInstructor";

const DashboardLayout = () => {
    const [role] = useUserRole();
    const [isAdmin,isAdminLoading] = useAdmin();
    const [isInstructor,isInstructorLoading] = useInstructor();
    console.log('admin',isAdmin,isAdminLoading);
    console.log('instructor',isInstructor,isInstructorLoading);
    return (
        <div className="min-h-screen flex flex-col">
            <NavBar />
            <div className="mt-[70px] lg:mt-20">
                <div className="pr-5 md:pr-10 lg:pr-20">
                    <div className="drawer lg:drawer-open">
                        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                        <div className="drawer-content h-screen flex flex-col mt-14 ml-14">
                            {/* Page content here */}
                            <Outlet />
                            <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>

                        </div>
                        <div className="drawer-side">
                            <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                            <ul className="menu text-base uppercase font-semibold p-4 w-80 h-full mt-[70px] lg:mt-0 bg-base-200 text-base-content">
                                {role && role === 'admin' ? <>
                                    <li><NavLink to='/dashboard/manageClasses'><Icon icon="iwwa:settings" />Manage Classes</NavLink></li>
                                    <li><NavLink to='/dashboard/manageUsers'><Icon icon="fa-solid:user-cog" />Manage Users</NavLink></li>
                                </> : <>
                                    {
                                        role === 'instructor' ? <>
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