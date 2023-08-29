import React, { useContext, useRef, useState } from "react";
import { useParams } from "react-router-dom";

import { useReactToPrint } from "react-to-print";

import PageTitle from "../../components/PageTitle";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import moment from "moment";
import myimg from "../../assets/avatar.jpg";
import { AuthContext } from "../../context/AuthContext";

const EmpHome = () => {
  const { currentUser } = useContext(AuthContext);

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

  useQuery(["empInfos", currentUser.immatricule], async () => {
    const response = await makeRequest.get(
      `/emp/empInfos/${currentUser.immatricule}`
    );
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

  return (
    <div className="p-6 my-6 bg-white shadow-2xl">
      <div className="   text-gray-900  rounded-lg my-3 print:m-6 print:text-black">
        <div>
          <div className="mb-3">
            <img
              className="w-24 h-24 shadow-2xl object-fill "
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

export default EmpHome;
