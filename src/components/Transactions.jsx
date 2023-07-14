import { useEffect, useState, useRef } from 'react';


function Transactions() {
  const url = process.env.REACT_APP_DEBUG == 'dev' ? process.env.REACT_APP_BACKEND_BASE_URL_DEV : process.env.REACT_APP_BACKEND_BASE_URL_PROD;
  const [transactions, setTransactions] = useState([]);
  const getTransactions = async() => {
    const response = await fetch(`${url}:5000/api/budget/get-all`);
    const transactions = await response.json();
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
  }

  const titleRef = useRef();
  const textRef = useRef();
  const summaryRef = useRef();
  const isIncomeRef = useRef();
  
  useEffect(() => {
    getTransactions();
  }, [])






  const TransactionItem = ({id, title, text, isIncome}) => {
    const url = process.env.REACT_APP_DEBUG == 'dev' ? process.env.REACT_APP_BACKEND_BASE_URL_DEV : process.env.REACT_APP_BACKEND_BASE_URL_PROD;
    const deleteTransaction = async(id) => {
      const data = {
        id
      };
      const response = await fetch(`${url}:5000/api/budget/transaction`, {
        method: 'delete',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const res = await response.json();
      await getTransactions();
    }
  
    return(
      <>
        <div>{title} {text} {isIncome ? "Доход" : "Расход"}</div>
        <button className="custom_btn" onClick={() => deleteTransaction(id)}>Delete</button>
      </>
    )
  }






  return (
    <>
      <div className="card transactions">
        <div>{transactions.map(item => <TransactionItem key={item.id} id={item.id} title={item.title} text={item.text} isIncome={item.isIncome}></TransactionItem>)}</div>
      </div>
      <form className='create_transaction'>
        <label className='create_transaction__item'>
          <span className="label">Title</span>
          <input className="text_input" type="text" ref={titleRef}></input>
        </label>
        <label className='create_transaction__item'>
        <span className="label">Text</span>
          <input className="text_input" type="text" ref={textRef}></input>
        </label>
        <label className='create_transaction__item'>
        <span className="label">Summary</span>
          <input className="text_input" type="text" ref={summaryRef}></input>
        </label>
        <label className='create_transaction__item'>
        <span className="label">isIncome</span>
          <div className="input__container">
            <input className="text_input" type="checkbox" ref={isIncomeRef}></input>
          </div>
        </label>
        <button 
        className='custom_btn'
        onClick={(e) => {
          e.preventDefault(); 
          createIncome();
        }}>Create income</button>
      </form>
    </>
  );
}

export default Transactions;
