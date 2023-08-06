import React from "react";

const TopBar = ({ data }) => {
  return (
    <div className="bg-gray-800 text-gray-300 flex flex-row w-full p-2 gap-1 justify-end">
      <p>{`${data.prenom} ${data.nom}`}</p>
      <div className="h-6 w-0.5 mx-1 bg-white"></div>
      <p>Rôle : {data.isAdmin ? "Gestion R.H" : "Employeur"}</p>
    </div>
  );
};

export default TopBar;
