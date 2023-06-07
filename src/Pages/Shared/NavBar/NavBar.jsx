import { Link } from "react-router-dom";

const NavBar = () => {
    const user = null;
    const navLink = <>
        <li><Link>Home</Link></li>
        <li><Link>Instructors</Link></li>
        <li><Link>Classes</Link></li>
        {user ? <>
            <li><Link>Dashboard</Link></li>
            <li><Link>User profile picture</Link></li>
            <li><Link>Logout</Link></li>
        </> : <>
            <li><Link to='/login'>Login</Link></li>
        </>}
    </>
    return (
        <div className="navbar px-5 md:px-10 lg:px-20 py-3 bg-[rgb(1,16,31)] text-white">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 py-2 shadow bg-[rgb(1,16,31)] text-white rounded-box w-52">
                        {navLink}
                    </ul>
                </div>
                <Link to='/' className="btn btn-ghost normal-case text-lg md:text-xl">The Football Coach's Den</Link>
            </div>
            <div className="navbar-end hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navLink}
                </ul>
            </div>
        </div>
    );
};

export default NavBar;