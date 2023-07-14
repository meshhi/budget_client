import { useEffect, useState, useRef } from 'react';

const TransactionItem = ({title, text, isIncome}) => {
  return(
    <div>{title} {text} {isIncome}</div>
  )
}

// https://fa1c-95-54-231-7.ngrok-free.app/api/budget/get-all

function Transactions() {
  console.log(process.env.REACT_APP_DEBUG == 'dev')
  const url = process.env.REACT_APP_DEBUG == 'dev' ? process.env.REACT_APP_BACKEND_BASE_URL_DEV : process.env.REACT_APP_BACKEND_BASE_URL_PROD;
  const [transactions, setTransactions] = useState([]);
  const getTransactions = async() => {
    const response = await fetch(`${url}:5000/api/budget/get-all`);
    const transactions = await response.json();
    console.log(transactions)
    setTransactions(transactions)
  }

  const createIncome = async() => {
    const data = {
      title: titleRef.current.value,
      text: textRef.current.value,
      summary: summaryRef.current.value,
      isIncome: isIncomeRef.current.value,
    }
    const response = await fetch(`${url}:5000/api/budget/transaction`, {
      method: 'post',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const res = await response.json();
    await getTransactions();
    console.log(res)
  }

  const titleRef = useRef();
  const textRef = useRef();
  const summaryRef = useRef();
  const isIncomeRef = useRef();
  
  useEffect(() => {
    getTransactions();
  }, [])

  return (
    <>
      <div className="transactions">
        <div>{transactions.map(item => <TransactionItem key={item.id} title={item.title} text={item.text} isIncome={item.isIncome}></TransactionItem>)}</div>
      </div>
      <form>
        <input type="text" ref={titleRef}></input>
        <input type="text" ref={textRef}></input>
        <input type="text" ref={summaryRef}></input>
        <input type="radio" ref={isIncomeRef}></input>
        <button onClick={(e) => {
          e.preventDefault(); 
          createIncome();
        }}>Create income</button>
      </form>
    </>
  );
}

export default Transactions;
