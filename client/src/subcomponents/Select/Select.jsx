import React from "react";

function Select({ datas, name, onChange, className, label, value, required }) {
  return (
    <div>
      {label && (
        <label
          htmlFor={name}
          className={`block text-md mb-2 font-medium text-gray-700  `}
        >
          {label} {required && "*"}
        </label>
      )}
      <select
        name={name}
        defaultValue={{ datas }}
        onChange={onChange}
        className={`shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  ${className}`}
      >
        {datas.map((data) => (
          <option value={data.value}>{data.text}</option>
        ))}
      </select>
    </div>
  );
}

export default Select;
