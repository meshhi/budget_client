import ReactDOM from "react-dom";

const Modal = ({visible, setModalVisible, children}) => {
  return ReactDOM.createPortal(
    <div className={`modal_portal`}>
      <div className={`modal_content ${visible ? 'modal_content__active' : 'modal_content__off'}`}>
        <button onClick={() => setModalVisible((prev) => !prev)}>Close modal</button>
        {children}
      </div>
    </div>
    ,
    document.body
  );
}

export default Modal