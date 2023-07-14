import './App.css';
import Transactions from './components/Transactions';

function App() {
  const auth = async () => {
    const response = await fetch('http://127.0.0.1:5000/api/budget/get-all');
    console.log(await response.json);
  }

  return (
    <div className="App">
      <button onClick={() => auth()}>Login</button>
      <Transactions></Transactions>
    </div>
  );
}

export default App;
