import ReactDOM from "react-dom";
import { useRef } from "react";

const Modal = ({visible, setModalVisible, children}) => {
  return ReactDOM.createPortal(
    <div className={`modal_portal modal_portal__active`}>
      <div className={`modal_content modal_content__active`}>
        <div className="close_modal__button" onClick={() => {
          setTimeout(() => setModalVisible((prev) => !prev), 100);
          document.querySelector('.modal_content__active').classList.add('modal_content__off');
          document.querySelector('.modal_content__active').classList.remove('modal_content__active');
          document.querySelector('.modal_portal__active').classList.add('modal_portal__off');
          document.querySelector('.modal_portal__active').classList.remove('modal_portal__active');
        }}>
          <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>
        </div>
        {children}
      </div>
    </div>
    ,
    document.body
  );
}

export default Modal