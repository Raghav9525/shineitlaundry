
import { React, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
// import { BiSolidUser } from 'react-icons/bi6';

import { GiHamburgerMenu } from 'react-icons/gi';
import { Link } from 'react-router-dom';
import './Navbar.css'

function Navbar() {
    const [isNavOpen, setIsNavOpen] = useState(false);


    return (
        <>
        <nav className="navbar navbar-expand-lg navbar-light m-0 p-0" >
            <div className="container-fluid  me-4">
                <a className="navbar-brand" href="/">
                    <img className="ms-4" src={require("./img/logo.png")} style={{width:"60px",height:"60px"}} />
                </a>
                <button className="navbar-toggler" type="button" onClick={() => setIsNavOpen(!isNavOpen)} style={{ fontSize: "28px" }}>
                    <span style={{width:"60px",height:"60px", color:"rgb(56, 182, 255)"}}> <GiHamburgerMenu /></span>
                </button>

                <div className={`collapse navbar-collapse ${isNavOpen ? 'show' : ""}`} id="navbarNav">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a id="nav-link1" className="nav-link" aria-current="page" href="/" >Home</a>
                        </li>
                        <li className="nav-item">
                            <a id="nav-link1" className="nav-link" href="/order">Order</a>
                        </li>
                        <li className="nav-item">
                            <a id="nav-link1" className="nav-link" href="/delivery" >Delivery</a>
                        </li>

                        <li className="nav-item">
                            <a id="nav-link1" className="nav-link" href="/about" >About Us</a>
                        </li>

                        <li className="nav-item">
                            <a id="nav-link1" className="nav-link" href="/login">Login</a>
                        </li> 

                        <li className="nav-item">
                            <a id="nav-link1" className="nav-link" href="/admin">Admin</a>
                        </li> 
                    </ul>
                </div>
            </div>
        </nav>
        </>
    );
}

export default Navbar