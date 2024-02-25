import React, { useEffect, useState } from 'react';

function PaymentVerify() {
    const apiUrl = process.env.REACT_APP_SERVER_URL;

    const [originalData, setOriginalData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [displayTable, setDisplayTable] = useState(false);
    const [selectedDbName, setSelectedDbName] = useState('');

    async function fetchUnverifiedPayment() {
        try {
            const response = await fetch(`${apiUrl}/unverified_delivery`, {
                method: 'GET', // Assuming no body is required, changed to GET
                headers: {
                    'Content-Type': 'application/json'
                }
            });
    
            if (response.ok) {
                const data = await response.json();
                setOriginalData(data);
                setFilteredData(data);
                setDisplayTable(data.length > 0);
            } else {
                // Handle non-2xx responses, possibly by updating the UI or logging more specific errors
                console.log("Failed to fetch data: ", response.status);
                setDisplayTable(false);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            // Consider setting an error state here and displaying it in the UI
        }
    }
    

    useEffect(() => {
        fetchUnverifiedPayment();
    }, []);

    async function paymentVerify(item) {
        try {
            const response = await fetch(`${apiUrl}/update_payment_status`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ paymentDetails: item })
            });
    
            if (response.ok) {
 
                await fetchUnverifiedPayment();
            } else {
                console.log("Error in updating payment status");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }
    


    function handleDbNameChange(event) {
        const selectedName = event.target.value;
        setSelectedDbName(selectedName);
        if (selectedName) {
            const filtered = originalData.filter(item => item.db_name === selectedName);
            setFilteredData(filtered);
        } else {
            setFilteredData(originalData);
        }
    }

    return (
        <div className='vh-100' style={{ backgroundColor: "rgb(239, 244, 249)" }}>
            <div className='col-sm-3'></div>

            {displayTable ? (
                <div>
                    <label className="fw-bold" htmlFor="">Delivery Boy Name</label>
                    <select className="ms-2" onChange={handleDbNameChange} value={selectedDbName}>
                        <option value="">All</option>
                        <option value="rajan">Rajan</option>
                        <option value="shubham">Shubham</option>
                        <option value="mayank">Mayank</option>
                    </select>

                    <div className='col-sm-6 mt-4   mx-auto text-center'>
                        <table className='table table-striped ms-2 me-2'>
                            <thead>
                                <tr>
                                    <th>Delivery Boy Name</th>
                                    <th>Bill</th>
                                    <th>Paid Amount</th>
                                    <th>Payment Mode</th>
                                    <th>Verify Payment</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredData.map((item) => (
                                    <tr key={item.cust_mobile}>
                                        <td>{item.db_name}</td>
                                        <td>{item.bill}</td>
                                        <td>{item.paid_amount}</td>
                                        <td>{item.payment_mode}</td>
                                        <td><button className="btn btn-primary" onClick={() => paymentVerify(item)}>Verify Payment</button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <p>No Records Found</p>
            )}
            <div className='col-sm-3'></div>
        </div>
    );
}

export default PaymentVerify;
