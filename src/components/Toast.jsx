import React from "react";

const Toast = ({ message, type, onClose }) => {
  return (
    <div
      className={`fixed top-5 right-5 z-50 px-6 py-4 rounded-lg shadow-lg text-white ${
        type === "success" ? "bg-green-600" : "bg-red-500"
      }`}
    >
      <div className="flex items-center">
        <p>{message}</p>
        <button className="ml-4 text-lg font-bold" onClick={onClose}>
          ✖
        </button>
      </div>
    </div>
  );
};

export default Toast;
