const TransactionItem = ({ id, title, text, isIncome, summary, getTransactions, url }) => {
  const deleteTransaction = async (id) => {
    const data = {
      id,
    };
    const response = await fetch(`${url}:5000/api/budget/transaction`, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${localStorage.getItem("jwt_token")}`,
      },
      body: JSON.stringify(data),
    });
    const res = await response.json();
    await getTransactions();
  };

  return (
    <div className="transaction__item">
      {title} {text} {summary} {isIncome ? "Доход" : "Расход"}
      <button className="transaction__item_btn custom_btn" onClick={() => deleteTransaction(id)}>
        Delete
      </button>
    </div>
  );
};

export default TransactionItem