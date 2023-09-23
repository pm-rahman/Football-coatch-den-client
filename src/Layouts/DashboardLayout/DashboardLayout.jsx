import { Link, NavLink, Outlet } from "react-router-dom";
import NavBar from "../../Pages/Shared/NavBar/NavBar";
import Footer from "../../Pages/Shared/Footer/Footer";
import { Icon } from "@iconify/react";
import useAdmin from "../../hooks/UseAdmin";
import useInstructor from "../../hooks/useInstructor";

const DashboardLayout = () => {
  const [isAdmin] = useAdmin();
  const [isInstructor] = useInstructor();
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <div className="gradient-t-bg">
        <div>
          <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="text-white container drawer-content w-2/2 overflow-hidden flex flex-col my-10">
              <label
                htmlFor="my-drawer-2"
                className="lg:hidden mb-6 cursor-pointer py-3 rounded text-center font-semibold bg-[#9b51e0] hover:bg-[#8643c5] text-white capitalize"
              >
                Open Menu
              </label>
              {/* Page content here */}
              <Outlet />
            </div>
            <div className="drawer-side w-1/4 min-h-full">
              <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
              <ul className="menu bg-[#18012d] text-base uppercase font-semibold p-4 w-full h-full mt-[70px] lg:mt-0">
                {isAdmin ? (
                  <>
                    <li>
                      <NavLink to="/dashboard/manageClasses">
                        <Icon icon="iwwa:settings" />
                        Manage Classes
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/dashboard/manageUsers">
                        <Icon icon="fa-solid:user-cog" />
                        Manage Users
                      </NavLink>
                    </li>
                  </>
                ) : (
                  <>
                    {isInstructor ? (
                      <>
                        <li>
                          <NavLink to="/dashboard/myClasses">
                            <Icon icon="fa-solid:book" /> My Classes
                          </NavLink>
                        </li>
                        <li>
                          <NavLink to="/dashboard/addClasses">
                            <Icon icon="fa-solid:book-medical" /> Add a Class
                          </NavLink>
                        </li>
                      </>
                    ) : (
                      <>
                        <li>
                          <NavLink to="/dashboard/mySelectedClasses">
                            <Icon icon="fa-regular:bookmark" /> My Selected
                            Classes
                          </NavLink>
                        </li>
                        <li>
                          <NavLink to="/dashboard/myEnrolledClasses">
                            <Icon icon="entypo:book" /> My Enrolled Classes
                          </NavLink>
                        </li>
                        <li>
                          <NavLink to="/dashboard/paymentHistory">
                            <Icon icon="fontisto:history" /> Payment History
                          </NavLink>
                        </li>
                      </>
                    )}
                  </>
                )}
                <hr className="border-[#6d6477]" />
                <li>
                  <Link to="/">
                    <Icon icon="fa-solid:home" /> Home
                  </Link>
                </li>
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
