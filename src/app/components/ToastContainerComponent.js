// Importieren der notwendigen Module
import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToastContainerComponent = () => {
  return (
    <ToastContainer
      position="top-center"
      autoClose={5000}
      hideProgressBar={false}
      closeButton={false}
      newestOnTop={false}
      className="toast-position"
    />
  );
};

export default ToastContainerComponent;
