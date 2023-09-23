import moment from "moment/moment";
import EmptyPage from "../../../Components/EmptyPage/EmptyPage";
import usePayment from "../../../hooks/usePayment";

const PaymentHistory = () => {
    const [enrollClass] = usePayment();
    return (
        <>
            {
                enrollClass && enrollClass.length > 0 ? <>
                    <h2 className="text-2xl sm:text-3xl mb-5 uppercase font-bold">Mange Your Selected Classes</h2>
                    <div>
                        <div className="overflow-x-auto">
                            <table className="table">
                                {/* head */}
                                <thead>
                                    <tr className="font-semibold text-sm">
                                        <th>#</th>
                                        <th>classes</th>
                                        <th className="text-end">Amount</th>
                                        <th>Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {enrollClass.map((item, index) => <tr
                                        key={index}
                                    >
                                        <th>{index + 1}</th>
                                        <td>{item.className}</td>
                                        <td className="text-right">${item.amount}</td>
                                        <td>{moment(item.date).format()} {}</td>
                                    </tr>)}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </> : <>
                    <EmptyPage emptyText='No Payment yet' />
                </>
            }
        </>
    );
};

export default PaymentHistory;