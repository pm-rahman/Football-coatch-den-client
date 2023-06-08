import EmptyPage from "../../../Components/EmptyPage/EmptyPage";

const PaymentHistory = () => {
    const payments = [{},{}]
    return (
        <>
            {
                payments && payments.length > 0 ? <>
                    <h2 className="text-3xl uppercase font-semibold">Mange Your Selected Classes</h2>
                    <div>
                        <div className="overflow-x-auto">
                            <table className="table">
                                {/* head */}
                                <thead>
                                    <tr className="font-semibold text-sm">
                                        <th>#</th>
                                        <th>classes</th>
                                        <th>Amount</th>
                                        <th>Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {payments.map((item, index) => <tr
                                        key={index}
                                    >
                                        <th>{index + 1}</th>
                                        <td>Class Name</td>
                                        <td className="text-right">$100</td>
                                        <td>10/11/2023</td>
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