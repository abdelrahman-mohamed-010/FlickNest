import { useEffect } from "react";
import "./modal.scss";
import { useRef } from "react";

// eslint-disable-next-line react/prop-types
const Modal = ({ open, children, className = "" }) => {
  const dialog = useRef();

  useEffect(() => {
    if (open) {
      dialog.current.showModal();
    } else {
      dialog.current.close();
    }
  }, [open]);

  return (
    <dialog ref={dialog} className={`modal ${className}`}>
      {children}
    </dialog>
  );
};

export default Modal;
