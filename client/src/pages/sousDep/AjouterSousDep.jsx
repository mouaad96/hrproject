import React, { useState } from "react";
import Input from "../../components/Input";
import { NavLink, useNavigate } from "react-router-dom";
import { makeRequest } from "../../axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import DropDown from "../../components/DropDown";

const AjouterSousDep = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    idSd: "",
    nomSubDep: "",
    idDep: "",
  });

  const getAllDeps = useQuery({
    queryKey: ["departs"],
    queryFn: async () =>
      await makeRequest.get(`/dep/list`).then((res) => {
        return res.data;
      }),
  });

  const departements = getAllDeps.data;

  const addSubDepartement = async (subDepartement) => {
    try {
      await makeRequest.post(`/subDep/create`, subDepartement);
    } catch (err) {
      throw err;
    }
  };

  const addSubDepMutation = useMutation(addSubDepartement);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    //   console.log(inputs);

    addSubDepMutation
      .mutateAsync(inputs) // Use mutateAsync to await the Promise returned by addEmployee
      .then(() => {
        // This block will run if the API call is successful

        toast.info("Sous Département Ajouter!");
        navigate("/Départements/Sous Département");
      })
      .catch((error) => {
        // This block will run if the API call encounters an error
        toast.error(error.response.data);
      });
  };

  return (
    <div className=" h-screen  bg-gray-900 flex flex-col align-middle p-5 gap-2">
      <h1 className="text-white">Ajouter Sous Département</h1>
      <NavLink
        to={"/Départements/Sous Département"}
        className=" self-start text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
      >
        Retourner
      </NavLink>
      <form className="flex flex-col justify-center align-middle py-10">
        <div className="mb-8">
          <Input
            type="number"
            id="idSd"
            name="idSd"
            label="Numero De Sous Département"
            handleChange={handleChange}
          />
        </div>

        <div className="mb-8">
          <Input
            type="text"
            id="nomSubDep"
            name="nomSubDep"
            label="Nom Sous Département"
            handleChange={handleChange}
          />
        </div>
        <div className="mb-6">
          <DropDown
            handleChange={handleChange}
            name="idDep"
            id="idDep"
            keyProp="idDep"
            data={departements}
            value="idDep"
            option="nomDep"
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

export default AjouterSousDep;
