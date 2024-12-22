import React from "react";

const Select = ({
  label,
  options,
  value,
  onChange,
  error,
  required = false,
  helperText,
  name,
  ...props
}) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <select
        value={value}
        onChange={onChange}
        name={name}
        className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 
          ${error ? "border-red-500" : "border-gray-300"}`}
        {...props}
      >
        <option value="">Select {label}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {helperText && <p className="mt-1 text-sm text-gray-500">{helperText}</p>}
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default Select;
