import { useEffect, useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';

const Auth = ({url}) => {
  const navigate = useNavigate();

  const registerNewUser = async (email, password) => {
    try {
      const data = {
        email,
        password,
      }
      const response = await fetch(`${url}:5000/api/auth/registration`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const user = await response.json();
      localStorage.setItem('jwt_token', user.token)
      navigate('/transactions');
    } catch(err) {
      console.log(err)
    }
  };

  useEffect(() => {
    if (localStorage.getItem('jwt_token')) {
      navigate("/transactions");
    };
  }, []);

  return(
    <div className="auth_container">
      <form className="auth_form">
        <div className="input__container">
          <label htmlFor="email-input">Email</label>
          <input type="text" id="email-input"/>
        </div>
        <div className="input__container">
          <label htmlFor="password-input">Password</label>
          <input type="password" id="password-input"/>
        </div>  
        <button onClick={async(e) => {
          e.preventDefault();
          await registerNewUser('my@development.com', 'gdfgdf');
        }}>Register</button>
      </form>
    </div>
  )
}

export default Auth;