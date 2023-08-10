import React, { useState } from "react";
import Input from "../../components/Input";
import { NavLink, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { toast } from "react-toastify";
import moment from "moment";

const UpdateFerie = () => {
  const { ferId } = useParams();
  const [inputs, setInputs] = useState({
    titre: "",
    dateDebutFerie: "",
    dateFinFerie: "",
  });

  const getFerie = useQuery(["singleFer", ferId], async () => {
    const response = await makeRequest.get(`/fer/ferie/${ferId}`);

    const { titre, dateDebutFerie, dateFinFerie } = response.data;
    const formattedDateDebFer = moment(dateDebutFerie).format("YYYY-MM-DD");
    const formattedDateFinFer = moment(dateFinFerie).format("YYYY-MM-DD");
    setInputs((prevInputs) => ({
      ...prevInputs,
      titre,
      dateDebutFerie: formattedDateDebFer,
      dateFinFerie: formattedDateFinFer,
    }));
    return response.data;
  });

  const updateFerie = async (fer) => {
    try {
      await makeRequest.put(`/fer/update/${ferId}`, fer);
    } catch (err) {
      throw err;
    }
  };

  const updateFerMutation = useMutation(updateFerie);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //console.log(inputs);
    updateFerMutation
      .mutateAsync(inputs)
      .then(() => {
        toast.info("Férie Mis A Jour!");
      })
      .catch((error) => {
        toast.error(error.response.data);
      });
  };

  return (
    <div className=" h-screen  bg-gray-900 flex flex-col align-middle p-5 gap-2">
      <h1 className="text-white">Mettre A Jour Férie</h1>
      <NavLink
        to={"/Feries"}
        className=" self-start text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
      >
        Retourner
      </NavLink>
      <form className="flex flex-col justify-center align-middle py-10">
        <div className="mb-8">
          <Input
            type="text"
            id="intitule"
            name="titre"
            label="Intitule"
            value={inputs.titre}
            handleChange={handleChange}
          />
        </div>

        <div className="mb-8">
          <Input
            type="date"
            id="dateDebutFerie"
            name="dateDebutFerie"
            label="Date Debut"
            value={inputs.dateDebutFerie}
            handleChange={handleChange}
          />
        </div>

        <div className="mb-8">
          <Input
            type="date"
            id="dateFinFerie"
            name="dateFinFerie"
            label="Date Debut"
            value={inputs.dateFinFerie}
            handleChange={handleChange}
          />
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

export default UpdateFerie;
