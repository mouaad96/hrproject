import React, { useRef, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { AiOutlineArrowLeft, AiOutlinePrinter } from "react-icons/ai";
import { useReactToPrint } from "react-to-print";

import PageTitle from "../../components/PageTitle";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import moment from "moment";
import myimg from "../../assets/avatar.jpg";

const SingleEmp = () => {
  const { eId } = useParams();

  const [values, setValues] = useState({
    immatricule: "",
    prenom: "",
    nom: "",
    dateN: "",
    sexe: "",
    adresse: "",
    tel: "",
    email: "",
    isAdmin: "",
    etatFam: "",
    image: "",
    echelle: "",
    echelant: "",
    prenomConj: "",
    nomConj: "",
    nombreEnf: "",
    intitule: "",
    designation: "",
  });

  const getEmpInfos = useQuery(["empInfos", eId], async () => {
    const response = await makeRequest.get(`/emp/empInfos/${eId}`);
    const {
      immatricule,
      prenom,
      nom,
      dateN,
      sexe,
      adresse,
      tel,
      email,
      isAdmin,
      etatFam,
      image,
      echelle,
      echelant,
      prenomConj,
      nomConj,
      nombreEnf,
      intitule,
      designation,
    } = response.data;

    const formattedDate = moment(dateN).format("YYYY-MM-DD"); // Adjust the date format as needed

    setValues((prevValues) => ({
      ...prevValues,
      immatricule,
      prenom,
      nom,
      dateN: formattedDate,
      sexe,
      adresse,
      tel,
      email,
      isAdmin,
      etatFam,
      image,
      echelle,
      echelant,
      prenomConj,
      nomConj,
      nombreEnf,
      intitule,
      designation,
    }));

    return response.data;
  });

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div className="bg-gray-800 py-6  h-fit px-5">
      <div className="flex items-center justify-between">
        <NavLink
          to={"/Employeurs/Liste%20Des%20Employeurs"}
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
        <PageTitle title="Fiche D'employeur" />
        <div>
          <div className="mb-3">
            <img
              className="w-24 h-24   rounded-full  object-fill "
              src={values.image ? values.image : myimg}
              alt="humane"
            />
          </div>
          <div className="flex py-6 ">
            <div className="flex-1 ">
              <h1 className="uppercase font-bold py-3">
                Informations Personnel
              </h1>

              <div className="py-3">
                <div className="mb-5 flex gap-2 items-center">
                  <p className="font-bold">Immatricule: </p>
                  <span>{values.immatricule}</span>
                </div>
                <div className="mb-3 flex gap-2 items-center">
                  <p className="font-bold">Nom Complet: </p>
                  <span>
                    {values.prenom} {values.nom}
                  </span>
                </div>

                <div className="mb-3 flex gap-2 items-center">
                  <p className="font-bold">Date De Naissance: </p>
                  <span>{values.dateN}</span>
                </div>
                <div className="mb-3 flex gap-2 items-center">
                  <p className="font-bold">Sexe: </p>
                  <span>{values.sexe}</span>
                </div>
                <div className="mb-3 flex gap-2 items-center">
                  <p className="font-bold">Adresse: </p>
                  <span>{values.adresse}</span>
                </div>
                <div className="mb-3 flex gap-2 items-center">
                  <p className="font-bold">Tél: </p>
                  <span>{values.tel}</span>
                </div>

                <div className="mb-3 flex gap-2 items-center">
                  <p className="font-bold">Etat Familial: </p>
                  <span>{values.etatFam}</span>
                </div>
                <div className="mb-3 flex gap-2 items-center">
                  <p className="font-bold">Email: </p>
                  <span>{values.email}</span>
                </div>
              </div>
            </div>
            <div className="bg-blue-500 w-0.5 my-6 mx-5"></div>
            <div className="flex-1">
              <h1 className="uppercase font-bold py-3">Affectation</h1>
              <div className="py-3">
                <div className="mb-3 flex gap-2 items-center">
                  <p className="font-semibold">Désignation: </p>
                  <span>{values.designation}</span>
                </div>
                <div className="mb-3 flex gap-2 items-center">
                  <p className="font-semibold">Bureau: </p>
                  <span>{values.intitule}</span>
                </div>
                <div className="mb-3 flex gap-2 items-center">
                  <p className="font-semibold">Echelle: </p>
                  <span>{values.echelle}</span>
                </div>
                <div className="mb-3 flex gap-2 items-center">
                  <p className="font-semibold">Echelon: </p>
                  <span>{values.echelant}</span>
                </div>
              </div>
            </div>
          </div>
          {(values.etatFam === "Marrier" || values.etatFam === "Divorcer") && (
            <>
              <div className="bg-blue-500 h-0.5 my-3 mx-5"></div>
              <div>
                <h1 className="uppercase font-bold py-3">Famille</h1>
                <div className="mb-3 flex gap-2 items-center">
                  <p className="font-semibold">Nom Complet Du Conjoint: </p>
                  <span>
                    {values.prenomConj} {values.nomConj}
                  </span>
                </div>
                <div className="mb-3 flex gap-2 items-center">
                  <p className="font-semibold">Nombre D'enfants: </p>
                  <span>{values.nombreEnf}</span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleEmp;
