import React from "react";

const Button = ({
  children,
  type = "button",
  disabled = false,
  onClick,
  className = "",
  ...props
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`px-4 py-2 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 
        ${
          disabled
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700 text-white"
        } ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
