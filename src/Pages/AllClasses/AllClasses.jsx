import Swal from "sweetalert2";
import SectionTitle from "../../Components/SectionTitle/SectionTitle";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import EmptyPage from "../../Components/EmptyPage/EmptyPage";
import useUserRole from "../../hooks/useUserRole";
import useClasses from "../../hooks/useClasses";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Button from "../../Components/Button/Button";

const AllClasses = () => {
  const { user } = useContext(AuthContext);
  const naviGate = useNavigate();
  const [axiosSecure] = useAxiosSecure();
  const [role] = useUserRole();
  const [classes, refetch] = useClasses();

  const handleSelectBtn = (item) => {
    if (!user) {
      Swal.fire({
        title: "Are you sure?",
        text: "You need to Login!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Login!",
      }).then((result) => {
        if (result.isConfirmed) {
          naviGate("/login");
          refetch();
        }
      });
    } else {
      const userInfo = {
        email: user?.email,
        id: item._id,
        seats: item.seats,
        price: item.price,
        className: item.className,
        classImage: item.classImage,
        instructorName: item.instructorName,
        instructorEmail: item.instructorEmail,
      };
      axiosSecure
        .put(`/selectedByUser/${user?.email}`, userInfo)
        .then((res) => {
          if (res.data.upsertedCount > 0) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Class Select Successful",
              showConfirmButton: false,
              timer: 1500,
            });
            refetch();
          } else {
            Swal.fire({
              position: "top-end",
              icon: "error",
              title: "You Have been selected before",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
    }
  };
  return (
    <div className="py-16 gradient-t-bg px-5 md:px-10 lg:px-20">
      {classes && classes.length > 0 ? (
        <>
          <SectionTitle
            title="All Classes"
            subTitle="Learn from the best coaches in the business"
          />
          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5 mt-8">
            {classes?.map((item, index) => (
              <div
                key={index}
                className={` bg-[#1C1E2AB3] cart-bg shadow rounded-lg overflow-hidden`}
              >
                <figure className="overflow-hidden md:h-52 lg:h-60 xl:h-48">
                  <img
                    className="w-auto h-full"
                    src={item.classImage}
                    alt="Thumbnail"
                  />
                </figure>
                <div className="p-5">
                  <h2 className="text-xl font-semibold capitalize">
                    {item.className}
                  </h2>
                  <div className="mt-1 text-lg text-[#9b51e0] font-semibold flex items-center">${item.price}</div>
                  <p className="font-semibold text-[#bbacca]">
                    Instructor : {item.instructorName}
                  </p>
                  <p className="font-semibold text-[#bbacca]">
                    {item.seats} sites Available
                  </p>
                  <Button
                    onClick={() => handleSelectBtn(item)}
                    disabled={
                      role === "instructor" ||
                      role === "admin" ||
                      item.seats === 0
                    }
                    full={true}
                    className="mt-5 rounded-full"
                    btnText="Enroll Now"
                  />
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <EmptyPage emptyText="No Classes Available At This Moment!" />
        </>
      )}
    </div>
  );
};

export default AllClasses;
