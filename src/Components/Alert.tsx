import React from "react";

interface AlertProps {
  message: string;
  onClose: () => void;
}
const Alert: React.FC<AlertProps> = ({ message, onClose }) => {
  return (
    <div className="modal is-active has-text-centered">
      <div className="modal-background" onClick={onClose}></div>
      <div className="modal-card">
        <header className="modal-card-head has-background-danger">
          <p className="modal-card title has-text-white"> {message} </p>
        </header>
        <footer className="modal-card-foot is-flex is-justify-content-center is-align-content-center">
          <button className="button" onClick={onClose}>
            Close
          </button>
        </footer>
      </div>
    </div>
  );
};

export default Alert;
