import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Main/Main";

const Router = createBrowserRouter([
    {
        path:'/',
        element:<Main/>
    }
])
export default Router;