import React, { useRef, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { AiOutlineArrowLeft, AiOutlinePrinter } from "react-icons/ai";
import { useReactToPrint } from "react-to-print";
import PageTitle from "../../../components/PageTitle";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../../axios";
import moment from "moment";

const EmpSal = () => {
  const { im } = useParams();

  const [values, setValues] = useState({
    NumCompte: "",
    rappelNet: "",
    netMensuel: "",
    dateP: "",
    immatricule: "",
    nom: "",
    prenom: "",
    sexe: "",
  });

  useQuery(["singleSal", im], async () => {
    const response = await makeRequest.get(`/sal/empSal/${im}`);

    const {
      NumCompte,
      rappelNet,
      netMensuel,
      dateP,
      immatricule,
      nom,
      prenom,
      sexe,
    } = response.data[0];
    const formattedDate = moment(dateP).format("MM-DD-YYYY");
    setValues((prevValues) => ({
      ...prevValues,
      NumCompte,
      rappelNet,
      netMensuel,
      dateP: formattedDate,
      immatricule,
      nom,
      prenom,
      sexe,
    }));
    return response.data;
  });

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div className="bg-gray-800 py-6  h-screen px-5">
      <div className="flex items-center justify-between">
        <NavLink
          to={"/Employeurs/Paiements"}
          className="text-white flex items-center justify-center bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-gray-300 font-semibold rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
        >
          <AiOutlineArrowLeft className="text-xl" />
          <span>Retourner</span>
        </NavLink>
        <button
          onClick={handlePrint}
          className="bg-gray-500 rounded-lg text-white hover:bg-gray-600 p-2 font-semibold flex gap-1 items-center justify-center"
        >
          <AiOutlinePrinter className="text-xl" />
          <span> Imprimer</span>
        </button>
      </div>

      <div
        className="px-6 border-2 text-gray-300 border-blue-500 rounded-lg my-3 print:m-6 print:text-black"
        ref={componentRef}
      >
        <h1 className="uppercase flex items-center py-4 font-bold">
          <span className="text-blue-600 text-5xl font-bold">C</span>
          <span>ommune</span>
        </h1>
        <PageTitle title="Fiche De Salaire" />
        <div className="mb-5">
          <p className="font-bold uppercase">
            {values.sexe === "Homme" ? "M." : "MMe"} {values.prenom}{" "}
            {values.nom}
          </p>
        </div>
        <div className="mb-5">
          <p className="font-bold">Immatricule: </p>
          <span>{values.immatricule}</span>
        </div>
        <div className="mb-5">
          <p className="font-bold">Num Compte: </p>
          <span>{values.NumCompte}</span>
        </div>
        <div className="mb-5">
          <p className="font-bold">Rappel Net: </p>
          <span>
            {typeof values.rappelNet === "number"
              ? values.rappelNet.toFixed(2)
              : values.rappelNet}
          </span>
        </div>
        <div className="mb-5">
          <p className="font-bold">net Mensuel:</p>

          <span>
            {typeof values.netMensuel === "number"
              ? values.netMensuel.toFixed(2)
              : values.netMensuel}
          </span>
        </div>
        <div className="mb-5">
          <p className="font-bold">Date Paiement </p>
          <span>{values.dateP}</span>
        </div>
      </div>
    </div>
  );
};

export default EmpSal;
