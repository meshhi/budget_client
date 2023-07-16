import { useEffect, useState, useRef } from "react";
import Modal from "../UI/Modal";
import Button from "../UI/Button";
import Spinner from "react-bootstrap/Spinner";
import Table from "../UI/Table";
import TableMaterial from "../UI/TableMaterial";
import TransactionItem from "../Transactions/TransactionItem";

function Transactions({ url }) {
  const [transactions, setTransactions] = useState([]);
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

  useEffect(() => {
    const run = async () => {
      await getTransactions();
    }
    
    run()
      .catch(console.error)
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
          <label className="create_transaction__item">
            <span className="label">Title</span>
            <input className="text_input" type="text" ref={titleRef}></input>
          </label>
          <label className="create_transaction__item">
            <span className="label">Text</span>
            <input className="text_input" type="text" ref={textRef}></input>
          </label>
          <label className="create_transaction__item">
            <span className="label">Summary</span>
            <input className="text_input" type="text" ref={summaryRef}></input>
          </label>
          <label className="create_transaction__item">
            <span className="label">isIncome</span>
            <div className="input__container">
              <input
                className="text_input"
                type="checkbox"
                ref={isIncomeRef}
              ></input>
            </div>
          </label>
          <button
            className="custom_btn"
            onClick={(e) => {
              e.preventDefault();
              createIncome();
            }}
          >
            Create income
          </button>
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
        {/* <Table></Table> */}
        <div className="transactions__list">
          <Button
            callback={() => setModalVisible((prev) => !prev)}
            title={"Create new transaction(ui)"}
            success={true}
          ></Button>
          <TableMaterial data={transactions}></TableMaterial>
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
