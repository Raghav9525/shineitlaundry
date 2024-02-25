import React from 'react';
import { useNavigate } from 'react-router-dom';

function Admin() {
    const navigate = useNavigate();

    return (
        <div className='vh-100' style={{ backgroundColor: "rgb(239, 244, 249)" }}>

            <div className='d-flex justify-content-center pt-2'>
                <button className="fw-bold btn btn-primary" onClick={() => navigate('/payment_varify')}>Staff Pending Payment</button>
                <button className="fw-bold btn btn-success ms-2" onClick={() => navigate('/cust_pending_payment')}>Customer Pending Payment</button>

            </div>
        </div>
    );
}

export default Admin;
