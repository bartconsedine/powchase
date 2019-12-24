import React from 'react';
import { Link } from 'react-router-dom';
import './nav-module.css'


const Nav = (props) => {

    return(
        <div className="nav">
            
            {!props.currentUser &&
            <div className="register-login">
                <Link className="links underline--magical" to="/register">Register</Link> / <Link className="links underline--magical" to="/login">Login</Link>
            </div>
            }
            
            {/* {props.showEx &&  
                <Link className="links underline--magical" to="/chunkpage">Page</Link>
            }
            {props.showEx &&  
                <Link className="links underline--magical" to="/chunksingle">Single</Link>
            }
            {props.showEx &&  
                <Link className="links underline--magical" to="/reverse">Reverse</Link>
            }
            <Link className="links underline--magical" to="/concentrater">Concentration</Link>
            <Link className="links underline--magical" to="/custom">Custom</Link> */}

        </div>
    )

}

export default Nav