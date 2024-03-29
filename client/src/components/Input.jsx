import React from "react";

const Input = ({ type, id, name, handleChange, label, value, isDisabled }) => {
  return (
    <>
      <label htmlFor={id} className="block mb-2 text-sm font-medium text-white">
        {label}
      </label>
      <input
        onChange={handleChange}
        type={type}
        id={id}
        defaultValue={value}
        name={name}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        required
        disabled={isDisabled}
      />
    </>
  );
};

export default Input;
