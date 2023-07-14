import './App.css';
import Transactions from './components/Transactions';
import About from './components/Pages/About';
import Sidebar from './components/UI/Sidebar';
import { Route, Routes } from "react-router-dom";

function App() {
  const auth = async () => {
    const response = await fetch('http://127.0.0.1:5000/api/budget/get-all');
    console.log(await response.json);
  }

  return (
    <div className="main-window">
      <Sidebar></Sidebar>
      <main className='content'>
        <Routes>
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
