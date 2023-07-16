import ReactDOM from "react-dom";
import { useRef } from "react";

const Modal = ({visible, setModalVisible, children}) => {
  return ReactDOM.createPortal(
    <div className={`modal_portal modal_portal__active`}>
      <div className={`modal_content modal_content__active`}>
        <button onClick={() => {
          setTimeout(() => setModalVisible((prev) => !prev), 100);
          document.querySelector('.modal_content__active').classList.add('modal_content__off');
          document.querySelector('.modal_content__active').classList.remove('modal_content__active');
          document.querySelector('.modal_portal__active').classList.add('modal_portal__off');
          document.querySelector('.modal_portal__active').classList.remove('modal_portal__active');
        }}>Close modal</button>
        {children}
      </div>
    </div>
    ,
    document.body
  );
}

export default Modal