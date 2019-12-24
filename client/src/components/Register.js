import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';

// This component handles our register form
const Register = (props) => {

  useEffect(() => {
    props.navToggle()
  }, []);

  const [redirect, setRedirect] = useState(false)
  const loginCheck = () => {
    console.log(props.currentUser)
    if (props.currentUser) {
      return <h1>{props.currentUser}</h1>
    } else {
      return <h1>No User</h1>
    }
  }
  const handleRedirect = () => {
    setRedirect(true)
  }

  if(redirect) return <Redirect to="/" />

  return (
    <div className="auth-container">
      <h2>Register</h2>
      <hr />

      <form onSubmit={(e) => {
        props.navToggle() 
        e.preventDefault();
        props.handleRegister();
        handleRedirect();
        }} >
        <p>Username:</p>
        <input name="username" type="text" value={props.formData.username} onChange={props.handleFormChange} />
        <p>Email:</p>
        <input name="email" type="text" value={props.formData.email} onChange={props.handleFormChange} />
        <p>Password:</p>
        <input name="password" type="password" value={props.formData.password} onChange={props.handleFormChange} />
        <p>Reading Speed Goal (WPM):</p>
        <input name="goal" type="number" value={props.formData.goal} onChange={props.handleFormChange} />
        <hr />
        <button>Register</button>
        {props.currentUser && props.currentUser}
      </form>
    </div>
  );
}

export default Register;
