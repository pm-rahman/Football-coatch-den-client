import { Link } from "react-router-dom";
import errorImage from '../../assets/error.jpg'

const ErrorPage = () => {
    return (
        <>
            <div
                className="w-3/4 relative space-y-3 mx-auto text-center">
                <img className="w-full mx-auto" src={errorImage} alt="" />
                <Link className="absolute right-[18%] bottom-[20%] text-white btn bg-[rgba(1,16,31,.9)] hover:bg-[rgb(1,16,31)]" to='/'>Go Back to Home</Link>
            </div>
        </>
    );
};

export default ErrorPage;