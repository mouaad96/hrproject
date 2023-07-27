import React, { useState } from "react";
import Input from "../../components/Input";
import { NavLink, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { toast } from "react-toastify";

const UpdateDep = () => {
  const { depId } = useParams();
  const [inputs, setInputs] = useState({
    nomDep: "",
  });

  const getDepartement = useQuery(["singleDep", depId], async () => {
    const response = await makeRequest.get(`/dep/departement/${depId}`);

    const { idDep, nomDep } = response.data;

    setInputs((prevInputs) => ({
      ...prevInputs,
      idDep,
      nomDep,
    }));
    return response.data;
  });

  const updateDepartment = async (dep) => {
    try {
      await makeRequest.put(`/dep/update/${depId}`, dep);
    } catch (err) {
      throw err;
    }
  };

  const updateMutation = useMutation(updateDepartment);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //console.log(inputs);

    updateMutation
      .mutateAsync(inputs)
      .then(() => {
        toast.info("Departement Mis A Jour!");
      })
      .catch((error) => {
        toast.error(error.response.data);
      });
  };

  return (
    <div className=" h-screen  bg-gray-900 flex flex-col align-middle p-5 gap-2">
      <h1 className="text-white">Mettre A jour Une Département</h1>
      <NavLink
        to={"/Départements/Liste"}
        className=" self-start text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
      >
        Retourner
      </NavLink>
      <form className="flex flex-col justify-center align-middle py-10">
        <div className="mb-8">
          <Input
            type="text"
            id="nomDep"
            name="nomDep"
            value={inputs.nomDep}
            label="Nom Du Département"
            handleChange={handleChange}
          />
        </div>
        <button
          onClick={handleSubmit}
          type="submit"
          className="text-white self-center  px-20 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Valider
        </button>
      </form>
    </div>
  );
};

export default UpdateDep;
