import React from "react";
import { NavLink } from "react-router-dom";

const TopBar = ({ data }) => {
  return (
    <div className="bg-gray-800 text-gray-300 flex flex-row w-full p-2 gap-1 items-center justify-end">
      <p>Rôle : {data.isAdmin ? "Gestion R.H" : "Employeur"}</p>
      <div className="h-6 w-0.5 mx-1 bg-white"></div>
      <NavLink
        className="flex items-center gap-2"
        to={"/Compte"}
        title="Compte"
      >
        <p>{`${data.prenom} ${data.nom}`}</p>
        <img className="rounded-full w-8 h-8" src={data.image} alt="profile" />
      </NavLink>
    </div>
  );
};

export default TopBar;
