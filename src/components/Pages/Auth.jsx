import { useEffect, useState, useRef } from "react";

const Registration = ({url}) => {
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
    } catch(err) {
      console.log(err)
    }
  };

  useEffect(() => {
  }, []);

  return(
    <form className="registration">
      <label htmlFor="email-input"></label>
      <input type="text" id="email-input"/>
      <label htmlFor="password-input"></label>
      <input type="password" id="password-input"/>
      <button onClick={async(e) => {
        e.preventDefault();
        await registerNewUser('my@development.com', 'gdfgdf');
      }}>Register</button>
    </form>
  )
}

export default Registration;