import { useEffect, useState, useRef } from "react";
import Modal from "../UI/Modal";
import Button from "../UI/Button";
import Spinner from "react-bootstrap/Spinner";
import TableMaterial from "../UI/TableMaterial";
import { BsPlus } from "react-icons/bs";

function Transactions({ url }) {
  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);

  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [response, setResponse] = useState(false);

  const getTransactions = async () => {
    const response = await fetch(`${url}:5000/api/budget/get-all`, {
      method: "get",
      headers: {
        Authorization: `JWT ${localStorage.getItem("jwt_token")}`,
      },
    });
    const transactions = await response.json();
    setTransactions(transactions);
    console.log(transactions)
  };

  const getCategories = async () => {
    const response = await fetch(`${url}:5000/api/budget/categories`, {
      method: "get",
      headers: {
        Authorization: `JWT ${localStorage.getItem("jwt_token")}`,
      },
    });
    const categories = await response.json();
    setCategories(categories);
    console.log('categories')
    console.log(categories)
  };

  const createIncome = async () => {
    try {
      setLoading(true);
      setError(false);
      setResponse(false);
      const data = {
        title: titleRef.current.value,
        text: textRef.current.value,
        summary: summaryRef.current.value,
        isIncome: isIncomeRef.current.checked,
        categoryId: categoryRef.current.value,
      };
      const response = await fetch(`${url}:5000/api/budget/transaction`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${localStorage.getItem("jwt_token")}`,
        },
        body: JSON.stringify(data),
      });
      const res = await response.json();
      if (response.status !== 201) {
        throw new Error(`${response.statusText}: ${res.response}`);
      }
      await getTransactions();
      setResponse(res.response);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const titleRef = useRef();
  const textRef = useRef();
  const summaryRef = useRef();
  const isIncomeRef = useRef();
  const categoryRef = useRef();

  useEffect(() => {
    const run = async () => {
      await getTransactions();
      await getCategories();
    };

    run().catch(console.error);
  }, []);

  const IncomeCreation = () => {
    if (isLoading) {
      return (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      );
    } else {
      return (
        <form className="create_transaction">
          <div className="input__container">
            <label className="custom_label" htmlFor="title-input">Название</label>
            <input className="custom_input" type="text" id="title-input" ref={titleRef}/>      
          </div>
          <div className="input__container">
            <label className="custom_label" htmlFor="text-input">Описание</label>
            <input className="custom_input" type="text" id="text-input" ref={textRef}/>      
          </div>
          <div className="input__container">
            <label className="custom_label" htmlFor="summary-input">Сумма</label>
            <input className="custom_input" type="text" id="summary-input" ref={summaryRef}/>      
          </div>
          <div className="input__container">
            <label className="custom_label" htmlFor="income-input">Доход</label>
            <input className="custom_input" type="checkbox" id="income-input" ref={isIncomeRef}/>      
          </div>
          <div className="input__container">
            <label className="custom_label" htmlFor="category-input">Категория</label>
            <select className="custom_input" id="category-input" ref={categoryRef}>
              {
                categories.map((category) => {
                  return(
                    <option value={category.id}>{category.title}</option>
                  )
                })
              }
            </select>  
          </div>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '2rem'}}>
            <Button
              title="Добавить"
              callback={(e) => {
                e.preventDefault();
                createIncome();
              }}
            >
            </Button>
          </div>
          {error ? (
            <div className="create_transaction__error">{error}</div>
          ) : (
            false
          )}
          {response ? (
            <div className="create_transaction__response">{response}</div>
          ) : (
            false
          )}
        </form>
      );
    }
  };

  return (
    <>
      <div className="card transactions">
        <header className="card__header">Транзакции</header>
        <div className="transactions__list">
          <TableMaterial
            data={transactions}
            callback={() => setModalVisible((prev) => !prev)}
          ></TableMaterial>
        </div>
        {isModalVisible ? (
          <Modal visible={isModalVisible} setModalVisible={setModalVisible}>
            <IncomeCreation></IncomeCreation>
          </Modal>
        ) : (
          false
        )}
      </div>
    </>
  );
}

export default Transactions;
