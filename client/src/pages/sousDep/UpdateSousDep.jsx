import React, { useState } from "react";
import Input from "../../components/Input";
import { NavLink, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { toast } from "react-toastify";
import DropDown from "../../components/DropDown";

const UpdateSousDep = () => {
  const { sdId } = useParams();
  const [inputs, setInputs] = useState({
    nomSubDep: "",
    idDep: "",
  });

  const getSubDepartement = useQuery(["singleDep", sdId], async () => {
    const response = await makeRequest.get(`/subDep/sousDep/${sdId}`);

    const { idSd, nomSubDep, idDep } = response.data;

    setInputs((prevInputs) => ({
      ...prevInputs,
      idSd,
      nomSubDep,
      idDep,
    }));
    return response.data;
  });

  const updateSubDepartment = async (subDep) => {
    try {
      await makeRequest.put(`/subDep/update/${sdId}`, subDep);
    } catch (err) {
      throw err;
    }
  };

  const getAllDeps = useQuery({
    queryKey: ["departs"],
    queryFn: async () =>
      await makeRequest.get(`/dep/list`).then((res) => {
        return res.data;
      }),
  });
  const departements = getAllDeps.data;

  const updateSubDepMutation = useMutation(updateSubDepartment);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //  console.log(inputs);

    updateSubDepMutation
      .mutateAsync(inputs)
      .then(() => {
        toast.info("Sous Département Mis A Jour!");
      })
      .catch((error) => {
        toast.error(error.response.data);
      });
  };

  return (
    <div className=" h-screen  bg-gray-900 flex flex-col align-middle p-5 gap-2">
      <h1 className="text-white">Mettre A jour Une Département</h1>
      <NavLink
        to={"/Départements/Sous Département"}
        className=" self-start text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
      >
        Retourner
      </NavLink>
      <form className="flex flex-col justify-center align-middle py-10">
        <div className="mb-8">
          <Input
            type="text"
            id="nomSubDep"
            name="nomSubDep"
            value={inputs.nomSubDep}
            label="Nom Du Département"
            handleChange={handleChange}
          />
        </div>
        <div className="mb-8">
          <DropDown
            handleChange={handleChange}
            name="idDep"
            id="idDep"
            defaultVal={inputs.idDep}
            keyProp="idDep"
            data={departements}
            value="idDep"
            option="nomDep"
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

export default UpdateSousDep;
