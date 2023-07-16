import { useEffect, useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';

const Auth = ({url}) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [currentState, setCurrentState] = useState({
    state: 'login',
    name: 'перейти Логин'
  });

  const registerNewUser = async () => {
    try {
      const data = {
        email,
        password,
        role: 'user'
      }
      const response = await fetch(`${url}:5000/api/auth/registration`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const user = await response.json();
      if (user.token) {
        localStorage.setItem('jwt_token', user.token)
      } else throw Error(user.response)
      navigate('/transactions');
    } catch(err) {
      console.log(err)
    }
  };

  const login = async () => {
    try {
      const data = {
        email,
        password,
      }
      const response = await fetch(`${url}:5000/api/auth/login`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const user = await response.json();
      if (user.token) {
        localStorage.setItem('jwt_token', user.token)
        navigate('/transactions');
      }
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
      <div className="auth_form">
        {
          currentState.state === 'login'
          ? <form className="auth_login">
              <div className="input__container">
                <label htmlFor="email-input">Email</label>
                <input type="text" id="email-input" onChange={(e) => {
                  setEmail(e.target.value);
                }}/>
              </div>
              <div className="input__container">
                <label htmlFor="password-input">Password</label>
                <input type="password" id="password-input" onChange={(e) => {
                  setPassword(e.target.value);
                }}/>
              </div>  
              <button onClick={async(e) => {
                e.preventDefault();
                await login();
              }}>Login</button>
            </form>
          : <form className="auth_registration">
              <div className="input__container">
                <label htmlFor="email-input">Email</label>
                <input type="text" id="email-input" onChange={(e) => {
                  setEmail(e.target.value);
                }}/>
              </div>
              <div className="input__container">
                <label htmlFor="password-input">Password</label>
                <input type="password" id="password-input" onChange={(e) => {
                  setPassword(e.target.value);
                }}/>
              </div>  
              <button onClick={async(e) => {
                e.preventDefault();
                await registerNewUser();
              }}>Register</button>
            </form>
        }
        <div className="auth_state_container" >
          <button className="auth_change_state" onClick={(e) => {
            setCurrentState(prev => {
              if (prev.state === 'login') {
                return ({
                  state: 'register',
                  name: 'перейти Регистрация'
                })
              } else {
                return ({
                  state: 'login',
                  name: 'перейти Логин'
                })
              }
            })
          }}>
            {currentState.name}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Auth;