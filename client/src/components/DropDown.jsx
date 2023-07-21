import React from "react";

const DropDown = ({
  data,
  handleChange,
  keyProp,
  value,
  option,
  id,
  name,
  defaultVal,
}) => {
  return (
    <>
      <label
        htmlFor={id}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {id.charAt(0).toUpperCase() + id.slice(1)}
      </label>
      <select
        id={id}
        onChange={handleChange}
        name={name}
        required
        value={defaultVal}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option value="">--selectionez {id}--</option>
        {data?.map((item) => {
          return (
            <option key={item[keyProp]} value={item[value]}>
              {item[option]}
            </option>
          );
        })}
      </select>
    </>
  );
};

export default DropDown;
