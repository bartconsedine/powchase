import React, { useState, useEffect } from 'react';
import {
    updateUser,
    readUser
} from '../services/api-helper'



const UserInfo = (props) => {

    const [user, setUser] = useState([])

    console.log(props.currentUser.user.id)

    const getUserInfo = async () => {
        props.navToggle()
        const currentUser = await readUser(props.currentUser.user.id);
        await setUser(currentUser);
        console.log(currentUser)
        console.log(user)

    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        console.log("form submitted", user)

        const currentUser = await updateUser(props.currentUser.user.id, user);
        console.log(currentUser)
       

    }

    useEffect(() => {
        getUserInfo()
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target
        console.log(user)
        setUser(prevUserData => ({
            ...prevUserData,
            [name]: value,
        })
        )
    }

    // if (props.currentUser && props.currentUser.user.id) return <Redirect to='/' />
    return (
        <div>

            {/* <h1>{props.match.params.id}</h1> */}
            <h1>User Info</h1>


            <form className='info-form' onSubmit={handleSubmit}>

                <div className="form-field">
                    <div className="form-label">
                        <label className="info-label" htmlFor='user name'>User Name:</label>
                        <br></br>
                        <label className="info-label" htmlFor='goal'>Goal:</label>
                        <br></br>
                        <label className="info-label" htmlFor='e-mail'>E-mail:</label>
                    </div>
                    <div className="form-select">
                        <input className='select' type='username' name="username" value={user.username} onChange={handleChange} />
                   
                        <input className='select' type='goal' name="goal" value={user.goal} onChange={handleChange} />
                     
                        <input className='select' type='email' name="email" value={user.email} onChange={handleChange} />
                    </div>
                </div>
                
                <button className="register" onClick={handleSubmit}>SUBMIT</button>
            </form>
        </div>
    )
}

export default UserInfo