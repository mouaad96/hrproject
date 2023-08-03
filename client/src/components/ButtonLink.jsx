import React from "react";
import { NavLink } from "react-router-dom";

const ButtonLink = ({ text, icon, nav }) => {
  return (
    <NavLink
      to={nav}
      className="bg-blue-500 flex items-center justify-center hover:bg-blue-700 text-white  font-semibold py-2 px-5 rounded-full"
    >
      {icon} {text}
    </NavLink>
  );
};

export default ButtonLink;
