import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Main/Main";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import Instructors from "../Pages/Instructiors/Instructors";
import InstructorClasses from "../Pages/InstructorClasses/InstructorClasses";
import AllClasses from "../Pages/AllClasses/AllClasses";
import DashboardLayout from "../Layouts/DashboardLayout/DashboardLayout";
import MySelectedClasses from "../Pages/Dashboard/MySelectedClasses/MySelectedClasses";
import MyClasses from "../Pages/Dashboard/MyClasses/MyClasses";
import AddClass from "../Pages/Dashboard/AddClass/AddClass";
import MyEnrolledClasses from "../Pages/Dashboard/MyEnrolledClasses/MyEnrolledClasses";
import ManageClasses from "../Pages/Dashboard/ManageClasses/ManageClasses";
import ManageUsers from "../Pages/Dashboard/ManageUsers/ManageUsers";
import PaymentHistory from "../Pages/Dashboard/PaymentHistory/PaymentHistory";
import PrivateRouter from "./PrivateRouter";
import InstructorRouter from "./InstructorRouter";
import AdminRouter from "./AdminRouter";

const Router = createBrowserRouter([
    {
        path: '/',
        element: <Main />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/register',
                element: <Register />
            },
            {
                path: '/instructors',
                element: <Instructors />
            },
            {
                path: '/instructorClasses',
                element: <InstructorClasses />
            },
            {
                path: '/allClasses',
                element: <AllClasses />
            }
        ]
    },
    {
        path: '/dashboard',
        element: <PrivateRouter><DashboardLayout /></PrivateRouter>,
        children:[
            {
                path:'mySelectedClasses',
                element: <MySelectedClasses/>
            },
            {
                path:'myEnrolledClasses',
                element:<MyEnrolledClasses/>
            },
            {
                path:'paymentHistory',
                element: <PaymentHistory/>
            },
            // instructor
            
            {
                path:'addClasses',
                element:<InstructorRouter><AddClass/></InstructorRouter>
            },
            {
                path:'myClasses',
                element:<InstructorRouter><MyClasses/></InstructorRouter>
            },
            // admin router
            {
                path:'manageClasses',
                element:<AdminRouter><ManageClasses/></AdminRouter>
            },
            {
                path:'manageUsers',
                element:<AdminRouter><ManageUsers/></AdminRouter>
            }
        ]
    }
])
export default Router;