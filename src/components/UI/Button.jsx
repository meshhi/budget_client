import ReactDOM from "react-dom";

const Button = ({title, callback, success}) => {
  return (
  <button className={`custom_btn ${success ? 'custom_btn__success' : 'custom_btn__classic'}`} onClick={callback}>
    {title}
  </button>);
}

export default Button