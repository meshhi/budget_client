import { useEffect, useState } from 'react';

const TransactionItem = ({title, text, isIncome}) => {
  return(
    <div>{title} {text} {isIncome}</div>
  )
}

// https://fa1c-95-54-231-7.ngrok-free.app/api/budget/get-all

function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const getTransactions = async() => {
    const response = await fetch('http://localhost:5000/api/budget/get-all', {
      headers: {
        "ngrok-skip-browser-warning": "no_preview",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    const transactions = await response.json();
    console.log(transactions)
    setTransactions(transactions)
  }

  useEffect(() => {
    getTransactions();
  }, [])

  return (
    <div className="transactions">
      <div>{transactions.map(item => <TransactionItem key={item.id} title={item.title} text={item.text} isIncome={item.isIncome}></TransactionItem>)}</div>
    </div>
  );
}

export default Transactions;
