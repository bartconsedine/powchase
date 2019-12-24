import React, { Component } from 'react';
import { Link } from 'react-router-dom';


const RegLog = (props) => {

    return(
        <div className="reglog">

            <Link className="links" to="/register">Register</Link>
            <Link className="links" to="/login">Login</Link>


        </div>
    )

}

export default RegLog