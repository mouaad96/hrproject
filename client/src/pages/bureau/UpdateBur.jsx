import React, { useState } from "react";
import Input from "../../components/Input";
import { NavLink, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { toast } from "react-toastify";
import DropDown from "../../components/DropDown";

const UpdateBur = () => {
  const { idBur } = useParams();
  const [inputs, setInputs] = useState({
    idBureau: "",
    intitule: "",
    etagere: "",
    idSd: "",
  });

  const getBureau = useQuery(["singleBur", idBur], async () => {
    const response = await makeRequest.get(`/bur/bureau/${idBur}`);

    const { idBureau, intitule, etagere, idSd } = response.data;

    setInputs((prevInputs) => ({
      ...prevInputs,
      idBureau,
      intitule,
      etagere,
      idSd,
    }));
    return response.data;
  });

  const updateBureau = async (bureau) => {
    try {
      await makeRequest.put(`/bur/update/${idBur}`, bureau);
    } catch (err) {
      throw err;
    }
  };

  const getAllSubDep = useQuery({
    queryKey: ["subdeps"],
    queryFn: async () =>
      await makeRequest.get(`/subDep/list`).then((res) => {
        return res.data;
      }),
  });
  const subDeps = getAllSubDep.data;

  const updateBureauMutation = useMutation(updateBureau);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //console.log(inputs);

    updateBureauMutation
      .mutateAsync(inputs)
      .then(() => {
        toast.info("Bureau Mis A Jour!");
      })
      .catch((error) => {
        toast.error(error.response.data);
      });
  };

  return (
    <div className=" h-screen  bg-gray-900 flex flex-col align-middle p-5 gap-2">
      <h1 className="text-white">Mettre A jour Une Département</h1>
      <NavLink
        to={"/Bureaux/Liste Des Bureaux"}
        className=" self-start text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
      >
        Retourner
      </NavLink>
      <form className="flex flex-col justify-center align-middle py-10">
        <div className="mb-8">
          <Input
            type="text"
            id="intitule"
            name="intitule"
            value={inputs.intitule}
            label="Intitule De Bureau"
            handleChange={handleChange}
          />
        </div>
        <div className="mb-8">
          <Input
            type="number"
            id="etagere"
            name="etagere"
            value={inputs.etagere}
            label="étage"
            handleChange={handleChange}
          />
        </div>
        <div className="mb-8">
          <DropDown
            handleChange={handleChange}
            name="idSd"
            id="idSd"
            defaultVal={inputs.idSd}
            keyProp="idSd"
            data={subDeps}
            value="idSd"
            option="nomSubDep"
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

export default UpdateBur;
