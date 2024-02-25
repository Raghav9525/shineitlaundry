import React, { useState, useEffect } from 'react';

function CustomerPendingPayment() {
  const apiUrl = process.env.REACT_APP_SERVER_URL;

  const [custData, setCustData] = useState([]);
  const [displayTable, setDisplayTable] = useState(false);

  useEffect(() => {
    fetchUnverifiedPayment();
  }, []);

  async function fetchUnverifiedPayment() {
    try {
      const response = await fetch(`${apiUrl}/customer_pending_payment`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        if (data.length > 0) {
          setCustData(data); // Corrected from setCustData(CustData);
          setDisplayTable(true);
        } else {
          setDisplayTable(false);
        }
      } else {
        console.log("Error in fetching data");
        setDisplayTable(false);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  //Table css
  const tableStyle = {
    borderCollapse: 'collapse',
    width: '100%',
    borderRadius: '8px', // Rounded border
    overflow: 'hidden', // Ensures the border radius applies correctly
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)' // 3D shadow effect
  };

  return (
    <div className='vh-100' style={{ backgroundColor: "rgb(239, 244, 249)" }}>
      <div className='col-sm-3'></div>

      {displayTable ? (
        <div className='col-sm-6 mt-4   mx-auto text-center'>
          <table className='table table-striped ms-2 me-2' style={tableStyle}>
            <thead id="table-head "  >

              <tr>
                <th>Customer Mobile</th>
                <th>Remaining Bill</th>
              </tr>
            </thead>
            <tbody>
              {custData.map((item) => (
                <tr key={item.cust_mobile}>
                  <td>{item.cust_mobile}</td>
                  <td>{item.remaining_bill}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No Records Found</p>
      )}
      <div className='col-sm-3'></div>

    </div>
  );
}

export default CustomerPendingPayment;
