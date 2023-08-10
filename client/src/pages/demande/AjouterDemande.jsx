import React, { useState } from "react";
import Input from "../../components/Input";
import { NavLink, useNavigate } from "react-router-dom";
import { makeRequest } from "../../axios";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import moment from "moment";

const AjouterDemande = () => {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    demande: "",
    motif: "",
    dateDem: moment().format("YYYY-MM-DD"),
    statutDem: "En Attente",
    immatricule: currentUser?.immatricule,
  });

  const addDemande = async (dem) => {
    try {
      await makeRequest.post(`/dem/create`, dem);
    } catch (err) {
      throw err;
    }
  };

  const addDemMutation = useMutation(addDemande);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(inputs);

    addDemMutation
      .mutateAsync(inputs)
      .then(() => {
        toast.info("Demande Ajouter!");
        navigate("/Demandes");
      })
      .catch((error) => {
        toast.error(error.response.data);
      });
  };

  return (
    <div className=" h-fit  bg-gray-900 flex flex-col align-middle p-5 gap-2">
      <h1 className="text-white">Ajouter Une Désignation</h1>
      <NavLink
        to={"/Demandes"}
        className=" self-start text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
      >
        Retourner
      </NavLink>
      <form className="flex flex-col justify-center align-middle py-10">
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-white">
            Immatricule
          </label>
          <p className="p-2 font-bold bg-blue-400 w-16 text-center rounded-lg">
            {inputs.immatricule}
          </p>
          <p className="mt-2 text-sm text-yellow-500">
            Vous Ne Pouvez Pas Change Votre Immatricule !
          </p>
        </div>

        <div className="mb-5">
          <label
            className="block mb-2 text-sm font-medium text-white"
            htmlFor="demande"
          >
            Type De Demande
          </label>
          <select
            id="demande"
            name="demande"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={handleChange}
          >
            <option value="">--Sélectionnez Le Type De Demande--</option>
            <option value="Demande De Congé">Demande De Congé</option>
            <option value="Attestation De Travail">
              Attestation De Travail
            </option>
          </select>
        </div>

        <div className="mb-5">
          <label
            className="block mb-2 text-sm font-medium text-white"
            htmlFor="demande"
          >
            Motif
          </label>
          <textarea
            name="motif"
            onChange={handleChange}
            id="motif"
            cols="30"
            rows="10"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          ></textarea>
        </div>

        <button
          onClick={handleSubmit}
          type="submit"
          className="text-white self-center  px-20 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto  py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Valider
        </button>
      </form>
    </div>
  );
};

export default AjouterDemande;
