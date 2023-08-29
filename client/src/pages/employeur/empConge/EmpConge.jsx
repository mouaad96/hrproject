import React, { useRef, useState, useContext } from "react";
import { NavLink, useParams } from "react-router-dom";
import { AiOutlineArrowLeft, AiOutlinePrinter } from "react-icons/ai";
import { useReactToPrint } from "react-to-print";
import PageTitle from "../../../components/PageTitle";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../../axios";
import moment from "moment";

const EmpConge = () => {
  const { congId } = useParams();

  const [values, setValues] = useState({
    motif: "",
    dateDebCong: "",
    dateFinCong: "",
    joursCong: "",
    immatricule: "",
    nom: "",
    prenom: "",
    sexe: "",
  });

  useQuery(["employeeConge", congId], async () => {
    const response = await makeRequest.get(`/conge/conge/${congId}`);
    const {
      motif,
      dateDebCong,
      dateFinCong,
      joursCong,
      immatricule,
      nom,
      prenom,
      sexe,
    } = response.data;

    const formattedDateDeb = moment(dateDebCong).format("MM-DD-YYYY");
    const formattedDateFin = moment(dateFinCong).format("MM-DD-YYYY");
    setValues((prevValues) => ({
      ...prevValues,
      motif,
      dateDebCong: formattedDateDeb,
      dateFinCong: formattedDateFin,
      joursCong,
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

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();

  return (
    <div className="bg-gray-800 py-6 px-5 ">
      <div className="flex items-center justify-between">
        <NavLink
          to={"/Employeurs/Congés"}
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
        className="px-6 py-16 border-2 h-fit text-gray-300 border-blue-500 rounded-lg my-3 print:m-6 print:text-black"
        ref={componentRef}
      >
        <h1 className="uppercase flex items-center py-4 font-bold">
          <span className="text-blue-600 text-5xl font-bold">C</span>
          <span>ommune</span>
        </h1>
        <PageTitle title="Congé Administratif" />
        <div>
          <p className="text-justify p-4">
            En vertu du dahir chérifien numéro : 1.58.008, en date du 24 février
            1958, relatif au statut de la fonction publique, et conformément à
            la loi organique numéro 113.14 relative aux municipalités, en
            application du dahir chérifien numéro 1.15.85 du 7 juillet 2015.
            Royaume du Maroc, Ministère de l'Intérieur, Préfecture d'El Jadida,
            Municipalité d'Azemmour,
          </p>
          <p className="text-center font-bold p-2">Décide :</p>
          <p className="text-justify p-4">
            D'accorder un congé administratif de {values.joursCong} jours à{" "}
            {values.sexe === "Homme" ? "M." : "Mme"} {values.nom}{" "}
            {values.prenom} , portant l'immatricule {values.immatricule} du{" "}
            {values.dateDebCong} au {values.dateFinCong} , pour en bénéficier au
            cours de l'année {currentYear}, en raison de {values.motif}.
          </p>
          <p className="p-5 text-left font-bold ">Signature: </p>
        </div>
      </div>
    </div>
  );
};

export default EmpConge;
