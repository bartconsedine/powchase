import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';


// This component handles our login form and has a link to the register form
const Login = (props) => {

  useEffect(() => {
    props.navToggle()
  }, []);

  const [redirect, setRedirect] = useState(false)

  const handleRedirect = () => {
    setRedirect(true)
  }

  if(redirect) return <Redirect to="/" />

  return (
    <div className="auth-container">
      <h2>login</h2>
      <hr />
      <form onSubmit={(e) => {
        e.preventDefault();
        props.handleLogin();
        handleRedirect();
        }} >
        <p>Username:</p>
        <input name="username" type="text" value={props.formData.username} onChange={props.handleChange} />
        <p>Password:</p>
        <input name="password" type="password" value={props.formData.password} onChange={props.handleChange} />
        <hr/>
        <input type="submit" title="login"/>
      </form>
    </div>
  );
}

export default Login;
