import './App.css';
import Transactions from './components/Transactions';
import Sidebar from './components/UI/Sidebar';

function App() {
  const auth = async () => {
    const response = await fetch('http://127.0.0.1:5000/api/budget/get-all');
    console.log(await response.json);
  }

  return (
    <div className="main-window">
      <Sidebar></Sidebar>
      <main className='content'>
        <Transactions></Transactions>
      </main>
    </div>
  );
}

export default App;
