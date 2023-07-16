import { useEffect, useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import Button from '../UI/Button';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

const Auth = ({url}) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [currentState, setCurrentState] = useState({
    state: 'login',
    name: 'Нет аккаунта?',
    action: ' Регистрация'
  });
  const [authError, setAuthError] = useState('');
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
      if (response.status != '201') {
        setAuthError(user.response);
        setShowA(true);
      }
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
      if (response.status != '200') {
        setAuthError(user.response);
        setShowA(true);
      }
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

  const [showA, setShowA] = useState(false);
  const toggleShowA = () => setShowA(!showA);

  return(
    <div className="auth_container">
      <div className="auth_form">
        {
          currentState.state === 'login'
          ? <form className="auth_login">
              <div className="input__container">
                <label className="custom_label" htmlFor="email-input">Email</label>
                <input className="custom_input" type="text" id="email-input" onChange={(e) => {
                  setEmail(e.target.value);
                }}/>
                
              </div>
              <div className="input__container" style={{marginTop: '1rem'}}>
                <label className="custom_label" htmlFor="password-input">Password</label>
                <input className="custom_input" type="password" id="password-input" onChange={(e) => {
                  setPassword(e.target.value);
                }}/>
              </div>  
              <Button callback={async(e) => {
                e.preventDefault();
                await login();
              }}
              title="Войти"
              ></Button>
            </form>
          : <form className="auth_registration">
              <div className="input__container">
                <label className="custom_label" htmlFor="email-input">Email</label>
                <input className="custom_input" type="text" id="email-input" onChange={(e) => {
                  setEmail(e.target.value);
                }}/>
              </div>
              <div className="input__container" style={{marginTop: '1rem'}}>
                <label className="custom_label" htmlFor="password-input">Password</label>
                <input className="custom_input" type="password" id="password-input" onChange={(e) => {
                  setPassword(e.target.value);
                }}/>
              </div>  
              <Button callback={async(e) => {
                e.preventDefault();
                await registerNewUser();
              }}
              title="Зарегистрироваться"></Button>
            </form>
        }
        <div className="auth_state_container" >
          <span className="auth_change_state">{currentState.name}</span>
          <span className="auth_change_state__link" onClick={(e) => {
            setCurrentState(prev => {
              if (prev.state === 'login') {
                return ({
                  state: 'register',
                  name: 'Уже есть аккаунт?',
                  action: ' Авторизация'
                })
              } else {
                return ({
                  state: 'login',
                  name: 'Нет аккаунта?',
                  action: ' Регистрация'
                })
              }
            })
          }}>{currentState.action}</span>
        </div>
      </div>

      <ToastContainer className="toasts-container">
        <Toast 
          onClose={toggleShowA} 
          show={showA} 
          animation={true}
          autohide={true}
          delay={5000}
        >
          <Toast.Header
            closeButton={true}
            >
            <strong className="me-auto">Не удалось войти</strong>
            <small>{new Date().toISOString()}</small>
          </Toast.Header>
          <Toast.Body>{authError}</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  )
}

export default Auth;