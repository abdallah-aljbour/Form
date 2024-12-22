import React from "react";

const Checkbox = ({
  label,
  checked,
  onChange,
  error,
  required = false,
  helperText,
  name,
  ...props
}) => {
  return (
    <div className="mb-4">
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          name={name}
          className={`h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500`}
          {...props}
        />
        <label className="ml-2 block text-sm text-gray-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      </div>
      {helperText && <p className="mt-1 text-sm text-gray-500">{helperText}</p>}
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default Checkbox;
