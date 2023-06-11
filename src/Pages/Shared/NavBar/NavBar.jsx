import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../../Providers/AuthProvider";
import useUserRole from "../../../hooks/useUserRole";

const NavBar = () => {
    const { user, logOut,dark, setDark } = useContext(AuthContext);
    const [role] = useUserRole();

    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(() => { })
    }
    const navLink = <>
        <li><NavLink to='/'>Home</NavLink></li>
        <li><NavLink to='/instructors'>Instructors</NavLink></li>
        <li><NavLink to='/allClasses'>Classes</NavLink></li>
        {user ? <>
            <li><NavLink to={role && role === 'admin' ? '/dashboard/manageClasses' : role === 'instructor' ? '/dashboard/myClasses' : '/dashboard/mySelectedClasses'}>Dashboard</NavLink></li>
            <li onClick={handleLogOut} className='pl-3 cursor-pointer text-sm lg:pl-6 pr-2'>Logout</li>
        </> : <>
            <li><NavLink className='lg:pl-6 pr-2' to='/login'>Login</NavLink></li>
        </>}
    </>
    return (
        <div className={`flex items-center justify-between z-50 fixed w-full px-5 md:px-10 lg:px-20 py-3 bg-[rgb(1,16,31)] text-white ${dark&&'bg-white text-[rgb(1,16,31)]'}`}>
            <div className="">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className={`menu menu-sm text-base uppercase dropdown-content mt-3 py-2 shadow bg-[rgb(1,16,31)] text-white rounded-box w-52 ${dark&&'bg-white text-black'}`}>
                        {navLink}
                    </ul>
                </div>
                <Link to='/' className="btn pl-0 btn-ghost normal-case text-lg md:text-xl">The Football Coach's Den</Link>
            </div>
            <div className="hidden lg:flex">
                <ul className="menu items-center menu-horizontal text-base uppercase px-1">
                    {navLink}
                </ul>
            </div>
            <button className="flex border rounded-full font-semibold cursor-pointer">
                <span className={`px-3 py-1 rounded-l-full ${!dark&&'bg-white text-black'}`} onClick={() => setDark(false)}>Dark</span>
                <span className={`px-3 py-1 rounded-r-full ${dark&&'bg-black text-white'}`} onClick={() => setDark(true)}>Light</span>
            </button>
            {user &&
                <div>
                    <figure className="h-8 w-8 cursor-pointer rounded-full overflow-hidden"><img title={user?.displayName} referrerPolicy="no-referrer" className="h-8" src={user?.photoURL} alt="" /></figure>
                </div>
            }
        </div>
    );
};

export default NavBar;