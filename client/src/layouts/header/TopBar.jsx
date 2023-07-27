import React from "react";

const TopBar = ({ data }) => {
  return (
    <div className="bg-slate-900 flex flex-row w-full p-2 text-white  justify-end">
      <p>Bonjour : {`${data.prenom} ${data.nom}`}</p>
      <div className="h-6 w-0.5 mx-1 bg-white"></div>
      <p>Role : {data.isAdmin ? "Admin" : "Employeur"}</p>
    </div>
  );
};

export default TopBar;
