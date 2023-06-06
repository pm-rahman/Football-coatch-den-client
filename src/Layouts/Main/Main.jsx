import { Outlet } from "react-router-dom";

const Main = () => {
    return (
        <div>
            <h3>This is main page</h3>
            <Outlet/>
        </div>
    );
};

export default Main;