import ReactDOM from "react-dom";

const Button = ({title, callback, success, customClass, children}) => {
  return (
  <button className={`custom_btn ${success ? 'custom_btn__success' : 'custom_btn__classic'} ${customClass}`} style={{paddingTop: 0, paddingBottom: 0}} onClick={callback}>
    {title}
  </button>);
}

export default Button