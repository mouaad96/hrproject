import React, { useRef, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { AiOutlineArrowLeft, AiOutlinePrinter } from "react-icons/ai";
import { useReactToPrint } from "react-to-print";
import { MdUpdate } from "react-icons/md";
import PageTitle from "../../components/PageTitle";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import moment from "moment";

const SingleDemande = () => {
  const { demId } = useParams();

  const [values, setValues] = useState({
    demande: "",
    motif: "",
    dateDem: "",
    statutDem: "",
    immatricule: "",
  });

  const getDemande = useQuery(["singleDem", demId], async () => {
    const response = await makeRequest.get(`/dem/demande/${demId}`);

    const { demande, motif, dateDem, statutDem, immatricule } = response.data;
    const formattedDate = moment(dateDem).format("MM-DD-YYYY");
    setValues((prevValues) => ({
      ...prevValues,
      demande,
      motif,
      dateDem: formattedDate,
      statutDem,
      immatricule,
    }));
    return response.data;
  });

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div className="bg-gray-800 py-6  h-max px-5">
      <div className="flex items-center justify-between">
        <NavLink
          to={"/Demandes"}
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
        <PageTitle title="Demande D'employeur" />
        <div className="mb-5">
          <p className="font-bold">Immatricule: </p>
          <span>{values.immatricule}</span>
        </div>
        <div className="mb-5">
          <p className="font-bold">Demande: </p>
          <span>{values.demande}</span>
        </div>
        <div className="mb-5">
          <p className="font-bold">Motif: </p>
          <span>{values.motif}</span>
        </div>
        <div className="mb-5">
          <p className="font-bold">Date: </p>
          <span>{values.dateDem}</span>
        </div>
        <div className="mb-5">
          <p className="font-bold">Statut: </p>
          <span>{values.statutDem}</span>
        </div>
      </div>
      <div className="flex flex-col gap-3 p-3">
        <div className="flex items-center gap-2">
          <label
            className="text-sm font-semibold text-white "
            htmlFor="demande"
          >
            Mettre A Jour Le Statut :
          </label>
          <select
            id="demande"
            name="statut"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm font-bold rounded-lg focus:ring-blue-500 focus:border-blue-500  p-2"
          >
            <option value="">--Sélectionnez Le Statut--</option>
            <option value="Accepté">Accepté</option>
            <option value="Refusé">Refusé</option>
          </select>
        </div>

        <button className="bg-blue-500 rounded-lg text-white self-start hover:bg-blue-600 p-2 font-semibold flex gap-1 items-center justify-center">
          <span>Mettre A Jour</span>
          <MdUpdate className="text-xl" />
        </button>
      </div>
    </div>
  );
};

export default SingleDemande;
