import EmptyPage from "../../../Components/EmptyPage/EmptyPage";
import { Icon } from '@iconify/react';

const MySelectedClasses = () => {
    const selectedClasses = [{}]
    return (
        <>
            {
                selectedClasses && selectedClasses.length > 0 ? <>
                    <h2 className="text-3xl uppercase font-semibold">Mange Your Selected Classes</h2>
                    <div>
                        <div className="overflow-x-auto">
                            <table className="table">
                                {/* head */}
                                <thead>
                                    <tr className="font-semibold text-sm">
                                        <th>#</th>
                                        <th>Class Name</th>
                                        <th>Instructor</th>
                                        <th>Available Sites</th>
                                        <th>Pay</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {selectedClasses.map((item, index) => <tr
                                        key={index}
                                    >
                                        <th>{index + 1}</th>
                                        <td>Class Name</td>
                                        <td>Instructor Name</td>
                                        <td className="text-right">10</td>
                                        <td><button className="btn bg-blue-600 hover:bg-blue-800 text-white text-base"><Icon icon="heroicons-outline:shopping-cart" /></button></td>
                                        <td><button className="btn bg-red-600 hover:bg-red-800 text-white text-base"><Icon icon="heroicons-outline:trash" /></button></td>
                                    </tr>)}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </> : <>
                    <EmptyPage emptyText='No Classes Selected yet' />
                </>
            }
        </>
    );
};

export default MySelectedClasses;