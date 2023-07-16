import ReactDOM from "react-dom";

const Button = ({title, callback}) => {
  return (
  <button onClick={callback}>
    {title}
  </button>);
}

export default Button