import './App.css';
import Transactions from './components/Pages/Transactions';
import Auth from './components/Pages/Auth';
import About from './components/Pages/About';
import Sidebar from './components/UI/Sidebar';
import { Route, Routes } from "react-router-dom";
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function App() {
  const url =
  process.env.REACT_APP_DEBUG == "dev"
    ? process.env.REACT_APP_BACKEND_BASE_URL_DEV
    : process.env.REACT_APP_BACKEND_BASE_URL_PROD;

  const navigate = useNavigate();
  const checkToken = async () => {
    try {
      const token = localStorage.getItem('jwt_token');
      if (!token) {
        navigate("/auth");
        return false;
      } 
      const data = {
        token,
      };
      const response = await fetch(`${url}:5000/api/auth/check`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const res = await response.json();
      if (res.response === 'badToken') {
        localStorage.removeItem('jwt_token');
      }
    } catch(err) {
      console.log(err)
    }
  };
  
  useEffect(() => {
    checkToken();
  }, [])
  
  const MainWindow = ({url}) => {
    return(
      <div className="main-window">
        <Sidebar></Sidebar>
        <main className='content'>
          <Routes>
            <Route path="/transactions" element={<Transactions url={url}/>} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
      </div>
    )
  }

  return (
    <Routes>
      <Route path="/auth" element={<Auth url={url}/>} />
      <Route path="*" element={<MainWindow url={url}/>} />
    </Routes>

  );
}

export default App;
