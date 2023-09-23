import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../../Providers/AuthProvider";
import useUserRole from "../../../hooks/useUserRole";

const NavBar = () => {
    const { user, logOut, dark } = useContext(AuthContext);
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
        {user && <li><NavLink to={role && role === 'admin' ? '/dashboard/manageClasses' : role === 'instructor' ? '/dashboard/myClasses' : '/dashboard/mySelectedClasses'}>Dashboard</NavLink></li>}
        {/* <button className="flex ml-3 lg:ml-0 border w-fit rounded-full font-semibold cursor-pointer">
            <span className={`px-3 py-1 text-xl rounded-l-full ${!dark && 'bg-slate-100 text-black'}`} onClick={() => setDark(false)}><Icon icon="heroicons-outline:moon" /></span>
            <span className={`px-3 py-1 text-xl rounded-r-full ${dark && 'bg-black text-slate-100'}`} onClick={() => setDark(true)}><Icon icon="entypo:adjust" /></span>
        </button> */}
    </>
    return (
        <div className={`flex items-center justify-between z-50 sticky top-0 w-full px-5 md:px-10 lg:px-20 py-3 bg-[#12141D] text-white`}>
            <div className="flex items-center">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className={`menu menu-sm text-base uppercase dropdown-content mt-3 py-2 shadow rounded-box w-52 ${dark ? 'bg-slate-100 text-black' : 'bg-[rgb(1,16,31)] text-white'}`}>
                        {navLink}
                    </ul>
                </div>
                <Link to='/' className="btn pl-0 btn-ghost sm:text-lg text-sm uppercase">The Football Coach's Den</Link>
            </div>
            <div className="hidden lg:flex">
                <ul className={`menu items-center menu-horizontal text-base uppercase px-1`}>
                    {navLink}
                </ul>
            </div>
            <div className="flex items-center gap-1">
                {user ? <>
                    <button onClick={handleLogOut} className={`${!dark ? 'btn-outline text-white' : 'text-dark '} border rounded-lg btn-sm mr-1 text-sm`}>Logout</button>
                    <figure className="h-8 w-8 cursor-pointer rounded-full overflow-hidden"><img title={user?.displayName} referrerPolicy="no-referrer" className="h-8 w-auto" src={user?.photoURL} alt="" /></figure>
                </> : <>
                    <div><NavLink className={`${!dark ? 'text-white' : 'text-dark '} btn-outline border py-1 px-3 rounded-lg btn-sm mr-1 text-sm`} to='/login'>Login</NavLink></div>
                </>}
            </div>
        </div>
    );
};

export default NavBar;