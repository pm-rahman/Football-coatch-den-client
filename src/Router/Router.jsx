import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Main/Main";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import Instructors from "../Pages/Instructiors/Instructors";
import InstructorClasses from "../Pages/InstructorClasses/InstructorClasses";

const Router = createBrowserRouter([
    {
        path:'/',
        element:<Main/>,
        children:[
            {
                path:'/',
                element:<Home/>
            },
            {
                path:'/login',
                element:<Login/>
            },
            {
                path:'/register',
                element:<Register/>
            },
            {
                path:'/instructors',
                element:<Instructors/>
            },
            {
                path:'/instructorClasses',
                element:<InstructorClasses/>
            }
        ]
    }
])
export default Router;